import * as THREE from 'three';
import { Easings, EasingSet } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";

export declare interface AnimatorVariable<T>{
	time: number;
	duration?: number;
	value: T;
	startValue: T;
	goalValue: T;
	onAnimationFinished?: Function | null;
	lerpFunc?: LerpFunc<T>;
	easing: EasingSet;
}

export declare interface AnimatorValiableParams<T> {
	name: string;
	initValue: T;
	easing?: EasingSet;
	customLerpFunc?: LerpFunc<T>;
}

export class Animator extends THREE.EventDispatcher {

	protected variables: { [ key: string ]: AnimatorVariable<any> };
	protected _isAnimating: boolean = false;
	protected animatingCount: number = 0;
	protected dispatchEvents: Function[] = [];

	constructor() {

		super();

		this.variables = {};

	}

	public get isAnimating() {

		return this._isAnimating;

	}

	public add<T>( params: AnimatorValiableParams<T> ) {

		let lerpFunc = params.customLerpFunc || Lerps.getLerpFunc( params.initValue );

		let variable = {
			time: - 1,
			value: params.initValue,
			startValue: params.initValue,
			goalValue: null,
			easing: params.easing || { func: Easings.sigmoid, args: 6 },
			lerpFunc: lerpFunc,
		};

		this.variables[ params.name ] = variable;

		return variable;

	}

	public setEasing( name: string, easing: EasingSet ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			variable.easing = easing;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public animate<T>( name: string, goalValue: T, duration: number = 1, callback?: Function, easing?: EasingSet ) {

		let variable = this.variables[ name ];
		let promise = new Promise( resolve => {

			if ( variable ) {

				if ( duration <= 0 ) {

					this.setValue( name, goalValue );

					variable.time = 1.0;
					variable.onAnimationFinished = () => {

						callback && callback();
						resolve( null );

					};

					return;

				}

				if ( variable.time == - 1 ) {

					this._isAnimating = true;
					this.animatingCount ++;

				}

				variable.time = 0;
				variable.duration = duration;
				variable.startValue = variable.value;
				variable.goalValue = goalValue;
				variable.onAnimationFinished = () => {

					callback && callback();
					resolve( null );

				};

				if ( easing ) {

					this.setEasing( name, easing );

				}

			} else {

				console.warn( '"' + name + '"' + ' is not exist' );

			}

		} );

		return promise;

	}

	public cancelAnimate( name: string ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			variable.time = 1.0;
			variable.onAnimationFinished = null;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public setValue<T>( name: string, value: T ) {

		if ( this.variables[ name ] ) {

			this.variables[ name ].value = value;
			this.cancelAnimate( name );

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public get<T>( name: string ): T | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ].value;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public getVariableObject<T>( name: string, mute: boolean = false ): AnimatorVariable<T> | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ];

		} else {

			if ( ! mute ) {

				console.warn( '"' + name + '"' + ' is not exist' );

			}

			return null;

		}

	}

	public isAnimatingVariable( name: string, mute: boolean = false ) {

		if ( this.variables[ name ] ) {

			let time = this.variables[ name ].time;

			return time != - 1.0;

		} else {

			if ( ! mute ) {

				console.warn( '"' + name + '"' + ' is not exist' );

			}

			return null;

		}

	}

	public applyToUniforms( uniforms: Uniforms ) {

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let variable = this.getVariableObject( keys[ i ] );

			if ( variable ) {

				uniforms[ keys[ i ] ] = variable;

			}

		}

	}

	public update( deltaTime?: number ) {

		if ( this.animatingCount == 0 ) {

			this._isAnimating = false;

		}

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let variable = this.variables[ keys[ i ] ];
			let time = variable.time;

			if ( time == 1.0 ) {

				this.animatingCount --;
				time = - 1;

				if ( variable.onAnimationFinished ) {

					this.dispatchEvents.push( variable.onAnimationFinished );

				}

			}

			if ( time >= 0.0 && time < 1.0 ) {

				let duration = variable.duration;
				let easing = variable.easing;
				let lerpFunc = variable.lerpFunc;

				if ( duration ) {

					time += ( deltaTime || 0.016 ) / duration;

					if ( duration == 0 || time >= 1.0 ) {

						time = 1.0;

					}

				}

				if ( lerpFunc ) {

					variable.value = lerpFunc( variable.startValue, variable.goalValue, easing.func( time, easing.args ) );

				}

				if ( time == 1.0 ) {

					variable.value = variable.goalValue;

				}

				this.dispatchEvent( {
					type: 'update/' + keys[ i ],
					deltaTime: deltaTime,
					value: variable.value
				} );

			}

			variable.time = time;

		}

		while ( this.dispatchEvents.length != 0 ) {

			let func = this.dispatchEvents.pop();

			if ( func ) {

				func();

			}

		}

		this.dispatchEvent( {
			type: 'update',
			deltaTime: deltaTime
		} );

		if ( this._isAnimating ) {

			this.dispatchEvent( {
				type: 'animate',
				deltaTime: deltaTime
			} );

		}

	}

}
