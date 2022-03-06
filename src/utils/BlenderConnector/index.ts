import * as THREE from 'three';

import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurve } from "../Animation/FCurve";
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";

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

		} else if ( msg.type == "sync/frame" ) {

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

				let posXCurve = action.getCurve( 'location_x' );
				let posYCurve = action.getCurve( 'location_y' );
				let posZCurve = action.getCurve( 'location_z' );

				if ( posXCurve || posYCurve || posZCurve ) {

					res.position = new THREE.Vector3();
					res.position.x = posXCurve ? posXCurve.getValue( this.frameCurrent ) : 0;
					res.position.y = posYCurve ? posYCurve.getValue( this.frameCurrent ) : 0;
					res.position.z = posZCurve ? posZCurve.getValue( this.frameCurrent ) : 0;

				}

				// rotation

				let rotXCurve = action.getCurve( 'rotation_euler_x' );
				let rotYCurve = action.getCurve( 'rotation_euler_y' );
				let rotZCurve = action.getCurve( 'rotation_euler_z' );

				if ( rotXCurve || rotYCurve || rotZCurve ) {

					res.rotation = new THREE.Euler();
					res.rotation.x = rotXCurve ? rotXCurve.getValue( this.frameCurrent ) : 0;
					res.rotation.y = rotYCurve ? rotYCurve.getValue( this.frameCurrent ) : 0;
					res.rotation.z = rotZCurve ? rotZCurve.getValue( this.frameCurrent ) : 0;
					res.rotation.order = 'YZX';

				}

				// scale

				let scaleXCurve = action.getCurve( 'scale_x' );
				let scaleYCurve = action.getCurve( 'scale_y' );
				let scaleZCurve = action.getCurve( 'scale_z' );

				if ( scaleXCurve || scaleYCurve || scaleZCurve ) {

					res.scale = new THREE.Vector3();
					res.scale.x = scaleXCurve ? scaleXCurve.getValue( this.frameCurrent ) : 0;
					res.scale.y = scaleYCurve ? scaleYCurve.getValue( this.frameCurrent ) : 0;
					res.scale.z = scaleZCurve ? scaleZCurve.getValue( this.frameCurrent ) : 0;

				}

				return res;

			}

		}

		return res;

	}

	public getUniform( propertyName: string ) {

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
