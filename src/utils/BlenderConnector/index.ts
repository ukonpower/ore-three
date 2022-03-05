import EventEmitter from "wolfy87-eventemitter";
import { AnimationAction } from "../Animation/AnimationAction";
import { FCurve } from "../Animation/FCurve";
import { FCurveInterpolation, FCurveKeyFrame } from "../Animation/FCurveKeyFrame";
import { Uniforms } from "../Uniforms";

export type BCMessage = BCSyncAnimationMessage | BCSyncFrameMessage

export type BCSyncAnimationMessage = {
	type: "sync/animation",
    data: BCAnimationData;
}

export type BCAnimationData = {
    actions: BCAnimationActionParam[];
    objects: any[];
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

	}

	/*-------------------------------
		Events
	-------------------------------*/

	private onSyncAnimation( data: BCAnimationData ) {

		this.actions.length = 0;

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

	public getTransform( objectName: string ) {

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
