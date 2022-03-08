import * as THREE from 'three';

import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurve } from "../Animation/FCurve";
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";
import { Uniforms } from '../Uniforms';

export type BCMessage = BCSyncAnimationMessage | BCSyncFrameMessage

export type BCSyncAnimationMessage = {
	type: "sync/animation",
    data: BCAnimationData;
}

export type BCAnimationData = {
    actions: BCAnimationActionParam[];
    objects: BCAnimationObjectData[];
}

export type BCAnimationActionParam = {
    name: string;
    curves: BCAnimationCurveParam[];
}

export type BCAnimationCurveParam = {
    name: string;
    frames: BCAnimationCurveKeyFrameParam[];
}

export type BCAnimationCurveKeyFrameParam = {
    c: THREE.Vec2;
    h_l: THREE.Vec2;
    h_r: THREE.Vec2;
    e: string;
    i: FCurveInterpolation;
}

export type BCAnimationObjectData = {
	name: string,
	actions: string[]
}

export type BCSyncFrameMessage = {
	type: "sync/frame";
	data: BCFrameData;
}

export type BCFrameData = {
	start: number;
	end: number;
	current: number;
}

export class BlenderConnector extends EventEmitter {

	private ws?: WebSocket;
	private url: string;

	// frame

	public frameCurrent: number = 0;
	public frameStart: number = 0;
	public frameEnd: number = 0;

	// animation

	public actions: AnimationAction[] = [];
	public objects: BCAnimationObjectData[] = [];

	// uniforms

	private uniforms: Uniforms = {};

	constructor( url: string ) {

		super();

		this.url = url;

		this.connect( this.url );

	}

	public connect( url: string ) {

		this.url = url;
		this.ws = new WebSocket( this.url );
		this.ws.onopen = this.onOpen.bind( this );
		this.ws.onmessage = this.onMessage.bind( this );
		this.ws.onclose = this.onClose.bind( this );
		this.ws.onerror = ( e ) => {

			console.error( e );

		};

	}

	/*-------------------------------
		Events
	-------------------------------*/

	private onSyncAnimation( data: BCAnimationData ) {

		this.actions.length = 0;
		this.objects.length = 0;

		// actions

		data.actions.forEach( actionData => {

			let action = new AnimationAction( actionData.name );

			actionData.curves.forEach( curveData => {

				let curve = new FCurve();

				curveData.frames.forEach( frame => {

					curve.addKeyFrame( new FCurveKeyFrame( frame.c, frame.h_l, frame.h_r, frame.i ) );

				} );

				action.addCurve( curveData.name, curve );

			} );

			this.actions.push( action );

		} );

		// objects

		data.objects.forEach( objectData => {

			this.objects.push( objectData );

		} );

	}

	private updateUniforms( frame: number ) {

		let keys = Object.keys( this.uniforms );

		for ( let i = 0; i < keys.length; i ++ ) {

			let key = keys[ i ];
			let splitKey = key.split( '/' );
			let objName = splitKey[ 0 ] || '';
			let propertyName = splitKey[ 1 ] || '';

			let actions = this.getActionList( objName );


			for ( let i = 0; i < actions.length; i ++ ) {

				let action = actions[ i ];

				let curve = action.getCurves( propertyName );

				let uni = this.uniforms[ key ];

				if ( curve.length == 1 ) {

					uni.value = curve[ 0 ].getValue( this.frameCurrent );

				} else if ( curve.length > 1 ) {

					if ( uni.value == null ) {

						uni.value = new THREE.Vector4(
							curve[ 0 ] ? curve[ 0 ].getValue( this.frameCurrent ) : 0,
							curve[ 1 ] ? curve[ 1 ].getValue( this.frameCurrent ) : 0,
							curve[ 2 ] ? curve[ 2 ].getValue( this.frameCurrent ) : 0,
							curve[ 3 ] ? curve[ 3 ].getValue( this.frameCurrent ) : 0,
						);

					} else if ( uni.value.isVector4 ) {

						uni.value.set(
							curve[ 0 ] ? curve[ 0 ].getValue( this.frameCurrent ) : 0,
							curve[ 1 ] ? curve[ 1 ].getValue( this.frameCurrent ) : 0,
							curve[ 2 ] ? curve[ 2 ].getValue( this.frameCurrent ) : 0,
							curve[ 3 ] ? curve[ 3 ].getValue( this.frameCurrent ) : 0,
						);

					}


				}


			}


		}

	}

	private onSyncFrame( data: BCFrameData ) {

		this.frameCurrent = data.current;
		this.frameStart = data.start;
		this.frameEnd = data.end;

		this.emitEvent( 'sync/frame', [ this.frameCurrent, this.frameStart, this.frameEnd ] );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( event: Event ) {

	}

	private onMessage( e: MessageEvent ) {

		let msg = JSON.parse( e.data ) as BCMessage;

		if ( msg.type == 'sync/animation' ) {

			this.onSyncAnimation( msg.data );
			console.log( msg );


		} else if ( msg.type == "sync/frame" ) {

			this.onSyncFrame( msg.data );

		}

		this.updateUniforms( this.frameCurrent );

	}

	private onClose( e:CloseEvent ) {

		this.disposeWS();

	}

	/*-------------------------------
		API
	-------------------------------*/

	public getActionNameList( objectName: string ) {

		for ( let i = 0; i < this.objects.length; i ++ ) {

			if ( this.objects[ i ].name == objectName ) {

				return this.objects[ i ].actions;

			}

		}

		return [];

	}

	public getAction( actionName: string ) {

		for ( let i = 0; i < this.actions.length; i ++ ) {

			if ( this.actions[ i ].name == actionName ) {

				return this.actions[ i ];

			}

		}

		return null;

	}

	public getActionList( objectName: string ) {

		let actions: AnimationAction[] = [];
		let actionNameList = this.getActionNameList( objectName );

		actionNameList.forEach( actionName => {

			let action = this.getAction( actionName );

			if ( action ) {

				actions.push( action );

			}

		} );

		return actions;

	}

	public getTransform( objectName: string ) {

		let actionNames = this.getActionNameList( objectName );

		let res: {
			position: THREE.Vector3 | null,
			rotation: THREE.Euler | null,
			scale: THREE.Vector3 | null
		} = {
			position: null,
			rotation: null,
			scale: null
		};

		for ( let i = 0; i < actionNames.length; i ++ ) {

			let action = this.getAction( actionNames[ i ] );

			if ( action ) {

				// position

				let posCurve = action.getCurves( 'location' );

				if ( posCurve.length > 0 ) {

					res.position = new THREE.Vector3();
					res.position.x = posCurve[ 0 ] ? posCurve[ 0 ].getValue( this.frameCurrent ) : 0;
					res.position.y = posCurve[ 1 ] ? posCurve[ 1 ].getValue( this.frameCurrent ) : 0;
					res.position.z = posCurve[ 2 ] ? posCurve[ 2 ].getValue( this.frameCurrent ) : 0;

				}

				// rotation

				let rotCurve = action.getCurves( 'rotation_euler' );

				if ( rotCurve.length > 0 ) {

					res.rotation = new THREE.Euler();
					res.rotation.x = rotCurve[ 0 ] ? rotCurve[ 0 ].getValue( this.frameCurrent ) : 0;
					res.rotation.y = rotCurve[ 1 ] ? rotCurve[ 1 ].getValue( this.frameCurrent ) : 0;
					res.rotation.z = rotCurve[ 2 ] ? rotCurve[ 2 ].getValue( this.frameCurrent ) : 0;
					res.rotation.order = 'YZX';

				}

				// scale

				let scaleCurve = action.getCurves( 'scale' );

				if ( scaleCurve.length > 0 ) {

					res.scale = new THREE.Vector3();
					res.scale.x = scaleCurve[ 0 ] ? scaleCurve[ 0 ].getValue( this.frameCurrent ) : 0;
					res.scale.y = scaleCurve[ 1 ] ? scaleCurve[ 1 ].getValue( this.frameCurrent ) : 0;
					res.scale.z = scaleCurve[ 2 ] ? scaleCurve[ 2 ].getValue( this.frameCurrent ) : 0;

				}

				return res;

			}

		}

		return res;

	}

	public getUniform( objectName: string, propertyName: string ) {

		let uniName = objectName + '/' + propertyName;

		if ( this.uniforms[ uniName ] ) {

			return this.uniforms[ uniName ];

		}

		this.uniforms[ uniName ] = {
			value: null
		};

		this.updateUniforms( this.frameCurrent );

		return this.uniforms[ uniName ];

	}

	public dispose() {

		this.disposeWS();

	}

	public disposeWS() {

		if ( this.ws ) {

			this.ws.close();
			this.ws.onmessage = null;
			this.ws.onclose = null;
			this.ws.onopen = null;

		}

	}

}
