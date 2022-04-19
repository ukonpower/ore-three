import { resourceUsage } from 'process';
import * as THREE from 'three';

import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurve } from "../Animation/FCurve";
import { FCurveGroup } from '../Animation/FCurveGroup';
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";
import { Uniforms } from '../Uniforms';

export type BCMessage = BCSyncSceneMessage | BCSyncFrameMessage
export type BCAnimationCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scalar'

export type BCSyncSceneMessage = {
	type: "sync/scene",
    data: BCSceneData;
}

export type BCSceneData = {
    fcurves: BCAnimationCurveParam[];
	actions: BCAnimationActionParam[];
    objects: BCSceneObjectData[];
}

export type BCAnimationActionParam = {
    name: string;
    fcurves: string[];
}

export type BCAnimationCurveParam = {
    name: string;
    keyframes: BCAnimationCurveKeyFrameParam[];
	axis: BCAnimationCurveAxis
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

	private url?: string;
	private ws?: WebSocket;
	public connected: boolean = false;

	// frame

	public frameCurrent: number = 0;
	public frameStart: number = 0;
	public frameEnd: number = 0;

	// animation

	public objects: BCSceneObjectData[] = [];
	public actions: AnimationAction[] = [];
	public fcurveGroupList: {[name:string]:FCurveGroup} = {};

	// uniforms

	private uniforms: Uniforms = {};

	constructor( url?: string ) {

		super();

		if ( url ) {

			this.url = url;
			this.connect( this.url );

		}

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

		// curves

		data.fcurves.forEach( fcurveData => {

			let curve = new FCurve();

			curve.set( fcurveData.keyframes.map( frame => {

				return new FCurveKeyFrame( frame.c, frame.h_l, frame.h_r, frame.i );

			} ) );

			let fcurveGroup = this.fcurveGroupList[ fcurveData.name ];

			if ( ! fcurveGroup ) {

				fcurveGroup = new FCurveGroup( fcurveData.name );

				this.fcurveGroupList[ fcurveData.name ] = fcurveGroup;

			}

			fcurveGroup.setFCurve( curve, fcurveData.axis );

		} );

		// actions

		data.actions.forEach( actionData => {

			let action = new AnimationAction( actionData.name );

			actionData.fcurves.forEach( fcurveGroupName => {

				let fcurveGroup = this.fcurveGroupList[ fcurveGroupName ];

				if ( fcurveGroup ) {

					action.addFcurveGroup( fcurveGroupName, fcurveGroup );

					let uni = this.uniforms[ fcurveGroupName ];

					if ( uni ) {

						action.assignUniforms( fcurveGroupName, uni );

					} else {

						this.uniforms[ fcurveGroupName ] = action.getUniforms( fcurveGroupName );
						this.uniforms[ fcurveGroupName ].value = fcurveGroup.createInitValue();

					}

				}

			} );

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

	public getValue<T>( propertyName: string ): T | null {

		let uni = this.uniforms[ propertyName ];

		if ( uni ) {

			return uni.value;

		}

		let fcurveGroup = this.fcurveGroupList[ propertyName ];

		if ( fcurveGroup ) {

			let initValue = fcurveGroup.createInitValue();

			return this.getUniform( propertyName, initValue ).value;

		}

		return null;

	}

	public getValueAsScalar( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( typeof value == 'number' ) {

				return value;

			} else {

				return value.x;

			}

		}

		return 0;

	}

	public getValueAsVector2( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( typeof value == 'number' ) {

				return new THREE.Vector2( value, 0.0 );

			} else if ( 'isVector2' in value ) {

				return value;

			} else {

				return new THREE.Vector2( value.x, value.y );

			}

		} else {

			return new THREE.Vector2();

		}

	}

	public getValueAsVector3( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( ( value as THREE.Vector3 ).isVector3 ) {

				return value as THREE.Vector3;

			}

			if ( typeof value == 'number' ) {

				return new THREE.Vector3( value, value, value );

			} else {

				let res = new THREE.Vector3( value.x, value.y );

				if ( 'isVector4' in value ) {

					res.z = value.z;

				}

				return res;

			}

		} else {

			return new THREE.Vector3();

		}

	}

	public getValueAsVector4( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		if ( value ) {

			if ( ( value as THREE.Vector4 ).isVector4 ) {

				return value as THREE.Vector4;

			}

			if ( typeof value == 'number' ) {

				return new THREE.Vector4( value, value, value, value );

			} else {

				let res = new THREE.Vector4( value.x, value.y );

				if ( 'isVector3' in value ) {

					res.z = value.z;

				}

			}

		} else {

			return new THREE.Vector4();

		}

	}

	public getValueAsEuler( propertyName: string ) {

		let value = this.getValue<THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>( propertyName );

		let res = new THREE.Euler();
		res.order = 'YXZ';

		if ( value ) {

			if ( typeof value == 'number' ) {

				res.x = value;

			} else {

				res.x = value.x;
				res.y = value.y;

				if ( 'isVector3' in value || 'isVector4' in value ) {

					res.z = value.z;

				}

			}

		}

		return res;

	}

	public getUniform<T>( propertyName: string, initialValue: T ) {

		if ( ! this.uniforms[ propertyName ] ) {

			this.uniforms[ propertyName ] = {
				value: initialValue
			};

		}

		return this.uniforms[ propertyName ];

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
