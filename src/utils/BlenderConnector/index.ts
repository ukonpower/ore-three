import * as THREE from 'three';

import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurve } from "../Animation/FCurve";
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";
import { Uniforms } from '../Uniforms';

export type BCMessage = BCSyncSceneMessage | BCSyncFrameMessage

export type BCSyncSceneMessage = {
	type: "sync/scene",
    data: BCSceneData;
}

export type BCSceneData = {
    actions: BCAnimationActionParam[];
    objects: BCSceneObjectData[];
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

export type BCSceneObjectData = {
	name: string,
	actions: string[]
}

export type BCSyncFrameMessage = {
	type: "sync/timeline";
	data: BCFrameData;
}

export type BCFrameData = {
	start: number;
	end: number;
	current: number;
}

export class BlenderConnector extends EventEmitter {

	// ws

	private url: string;
	private ws?: WebSocket;
	public connected: boolean = false;

	// frame

	public frameCurrent: number = 0;
	public frameStart: number = 0;
	public frameEnd: number = 0;

	// animation

	public actions: AnimationAction[] = [];
	public objects: BCSceneObjectData[] = [];

	// uniforms
	private uniformsList:{[actionName:string]: Uniforms} = {};

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

	public syncJsonScene( jsonPath: string ) {

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {

			if ( req.readyState == 4 ) {

				if ( req.status == 200 ) {

					this.onSyncScene( JSON.parse( req.response ) );

				}

			}

		};

		req.open( 'GET', jsonPath );
		req.send( );

	}

	/*-------------------------------
		Events
	-------------------------------*/

	private onSyncScene( data: BCSceneData ) {

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

			let actionUniforms = this.uniformsList[ actionData.name ];

			if ( actionUniforms ) {

				let actionUniKeys = Object.keys( actionUniforms );

				for ( let i = 0; i < actionUniKeys.length; i ++ ) {

					let uniName = actionUniKeys[ i ];

					action.assignUniformAsProperty( uniName, actionUniforms[ uniName ] );

				}

			}

			this.actions.push( action );

		} );

		// objects

		data.objects.forEach( objectData => {

			this.objects.push( objectData );

		} );

	}

	private onSyncFrame( data: BCFrameData ) {

		this.setFrame( data.current, data.start, data.end );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( event: Event ) {

		this.connected = true;

	}

	private onMessage( e: MessageEvent ) {

		let msg = JSON.parse( e.data ) as BCMessage;

		if ( msg.type == 'sync/scene' ) {

			this.onSyncScene( msg.data );
			console.log( msg.data );

		} else if ( msg.type == "sync/timeline" ) {

			this.onSyncFrame( msg.data );


		}

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

	public getUniform<T>( actionName: string, propertyName: string, initialValue: T ) {

		let action = this.getAction( actionName );

		if ( action ) {

			return action.getPropertyAsUniform( 'propertyName' );

		}

		if ( ! this.uniformsList[ actionName ] ) {

			this.uniformsList[ actionName ] = {};

		}

		let uniforms = this.uniformsList[ actionName ];

		if ( ! uniforms[ propertyName ] ) {

			uniforms[ propertyName ] = {
				value: initialValue
			};

		}

		return uniforms[ propertyName ];

	}

	public setFrame( current: number, start?:number, end?:number ) {

		this.frameCurrent = current;
		this.frameStart = start || this.frameStart;
		this.frameEnd = end || this.frameEnd;

		for ( let i = 0; i < this.actions.length; i ++ ) {

			this.actions[ i ].updateFrame( this.frameCurrent );

		}

		this.emitEvent( 'sync/timeline', [ this.frameCurrent, this.frameStart, this.frameEnd ] );

	}

	/*-------------------------------
		Dispose
	-------------------------------*/

	public dispose() {

		this.disposeWS();

	}

	public disposeWS() {

		if ( this.ws ) {

			this.ws.close();
			this.ws.onmessage = null;
			this.ws.onclose = null;
			this.ws.onopen = null;

			this.connected = false;

		}

	}

}
