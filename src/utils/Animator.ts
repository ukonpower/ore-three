import { Easings, EasingSet } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "../shaders/shader";

declare interface variable<T>{
	time: number;
	duration?: number;
	value: T;
	startValue: T;
	goalValue: T;
	onAnimationFinished?: Function;
	lerpFunc: LerpFunc<T>;
	easing: EasingSet;
}

export declare interface AnimatorValiableParams<T> {
	name: string;
	initValue: T;
	easing?: EasingSet;
	customLerpFunc?: LerpFunc<T>;
}

export class Animator{

	private variables: { [ key: string ]: variable<any> };
	private _isAnimating: boolean = false;
	private animatingCount: number = 0;
	private dispatchEvents: Function[] = [];

	constructor(){

		this.variables = {};

	}

	public get isAnimating(){

		return this._isAnimating;

	}

	public add<T>( params: AnimatorValiableParams<T> ){

		let lerpFunc = params.customLerpFunc || Lerps.getLerpFunc( params.initValue );
		
		this.variables[ params.name ] = {
			time: 1,
			value: params.initValue,
			startValue: params.initValue,
			goalValue: null,
			easing: params.easing || { func: Easings.sigmoid, variables: [ 6 ] },
			lerpFunc: lerpFunc,
		}

	}

	public setEasing( name: string, easing: EasingSet ){

		let variable = this.variables[ name ];

		if( variable ){

			variable.easing = easing;

		}else{

			console.warn( '"' + name + '"' + ' is not exist' );
			
		}

	}

	public animate<T>( name: string, goalValue: T, duration: number = 1, callback?: Function ){

		let variable = this.variables[name];

		if( variable ){
			
			variable.duration = duration;

			if( variable.time >= 1.0 ){

				this._isAnimating = true;
				this.animatingCount++;
				
			}

			variable.time = 0;
			variable.duration = ( duration != null ) ? duration : 1;
			variable.startValue = variable.value;
			variable.goalValue = goalValue;
			variable.onAnimationFinished = callback;

		}else{

			console.warn( '"' + name + '"' + ' is not exist' );
			
		}

	}

	public setValue<T>( name: string, value: T ){

		if( this.variables[name] ){

			this.variables[name].value = value;

		}else{

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}
		
	}

	public get<T>( name: string ): T{

		if( this.variables[name] ){

			return this.variables[name].value;

		}else{

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}
		
	}

	public applyToUniforms( uniforms: Uniforms ) {

		let keys = Object.keys( this.variables );

		for( let i = 0; i < keys.length; i++ ){

			if( !uniforms[ keys[ i ] ] ) uniforms[ keys[ i ] ] = { value: null }

			uniforms[ keys[ i ]  ].value = this.variables[ keys[ i ] ].value;
			
		}

	}
	
	public update( deltaTime?: number ){

		let keys = Object.keys( this.variables );
		
		for( let i = 0; i < keys.length; i++ ){

			let variable = this.variables[ keys[ i ] ];

			if( variable.time < 1.0 ){

				variable.time += ( deltaTime || 0.016 ) / variable.duration;

				if( variable.duration == 0 || variable.time >= 1.0 ){
					
					variable.time = 1.0;
					
				}

				let t = variable.time;

				if( variable.easing ) {

					t = variable.easing.func( t, variable.easing.variables );
					
				}

				variable.value = variable.lerpFunc( variable.startValue, variable.goalValue, t );
				
				if( variable.time == 1.0 ){
					
					this.animatingCount--;

					if( this.animatingCount == 0 ){

						this._isAnimating = false;

					}

					if( variable.onAnimationFinished ){
						
						this.dispatchEvents.push( variable.onAnimationFinished );

					}

				}

			}

		}

		while( this.dispatchEvents.length != 0 ){

			this.dispatchEvents.pop()();
			
		}

	}

}