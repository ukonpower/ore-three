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
	actions: BCAnimationActionParam[];
    objects: BCSceneObjectData[];
}

export type BCAnimationActionParam = {
    name: string;
    fcurve_groups: {[key: string]: BCAnimationCurveParam[]};
}

export type BCAnimationCurveParam = {
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
	data: BCTimelineData;
}

export type BCTimelineData = {
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

		const req = new XMLHttpRequest();

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

			const action = new AnimationAction( actionData.name );

			const fcurveGroupNames = Object.keys( actionData.fcurve_groups );

			for ( let i = 0; i < fcurveGroupNames.length; i ++ ) {

				const fcurveGroupName = fcurveGroupNames[ i ];

				const fcurveGroup = new FCurveGroup( fcurveGroupName );

				actionData.fcurve_groups[ fcurveGroupName ].forEach( fcurveData => {

					const curve = new FCurve();

					curve.set( fcurveData.keyframes.map( frame => {

						return new FCurveKeyFrame( frame.c, frame.h_l, frame.h_r, frame.i );

					} ) );

					fcurveGroup.setFCurve( curve, fcurveData.axis );

				} );

				action.addFcurveGroup( fcurveGroup.name, fcurveGroup );

			}

			this.actions.push( action );

		} );

		// objects

		data.objects.forEach( objectData => {

			this.objects.push( objectData );

		} );

		// dispatch event

		this.emitEvent( 'update/scene', [ this ] );

		this.setTimeline( this.frameCurrent );

	}

	private onSyncTimeline( data: BCTimelineData ) {

		this.setTimeline( data.current, data.start, data.end );

	}

	/*-------------------------------
		WS Events
	-------------------------------*/

	private onOpen( event: Event ) {

		this.connected = true;

	}

	private onMessage( e: MessageEvent ) {

		const msg = JSON.parse( e.data ) as BCMessage;

		if ( msg.type == 'sync/scene' ) {

			this.onSyncScene( msg.data );

		} else if ( msg.type == "sync/timeline" ) {

			this.onSyncTimeline( msg.data );


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

		const actions: AnimationAction[] = [];
		const actionNameList = this.getActionNameList( objectName );

		actionNameList.forEach( actionName => {

			const action = this.getAction( actionName );

			if ( action ) {

				actions.push( action );

			}

		} );

		return actions;

	}

	public getActionContainsAccessor( accessor: string ) {

		return this.actions.find( action => {

			const curveKeys = Object.keys( action.curves );

			return curveKeys.some( curveName => curveName == accessor );

		} ) || null;

	}

	public setTimeline( current: number, start?:number, end?:number ) {

		this.frameCurrent = current;
		this.frameStart = start || this.frameStart;
		this.frameEnd = end || this.frameEnd;

		this.emitEvent( 'update/timeline', [ this.frameCurrent, this.frameStart, this.frameEnd ] );

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
