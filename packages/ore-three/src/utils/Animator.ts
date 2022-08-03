import * as THREE from 'three';
import { threadId } from 'worker_threads';
import { Easings, EasingFunc } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";

export type AnimatorVariableType = number | number[] | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Quaternion | THREE.Euler

export declare interface AnimatorVariable<T>{
	time: number;
	duration?: number;
	value: T;
	startValue: T;
	goalValue: T;
	onAnimationFinished?: Function | null;
	lerpFunc?: LerpFunc<T>;
	easing: EasingFunc;
}

export declare interface AnimatorVariableParams<T> {
	name: string;
	initValue: T;
	easing?: EasingFunc;
	customLerpFunc?: LerpFunc<T>;
}

export class Animator extends THREE.EventDispatcher {

	public dataBase: {[ key: string ]: AnimatorVariableType };
	public isAnimating: boolean = false;

	protected variables: { [ key: string ]: AnimatorVariable<AnimatorVariableType> };
	protected animatingCount: number = 0;
	protected dispatchEvents: Function[] = [];

	constructor() {

		super();

		this.variables = {};
		this.dataBase = {};

	}

	public add<T extends AnimatorVariableType>( params: AnimatorVariableParams<T> ) {

		let variable: AnimatorVariable<T> = {
			time: - 1,
			value: this.getValueClone( params.initValue ),
			startValue: this.getValueClone( params.initValue ),
			goalValue: this.getValueClone( params.initValue ),
			easing: params.easing || Easings.sigmoid(),
			lerpFunc: ( params.customLerpFunc || Lerps.getLerpFunc( params.initValue ) ) as LerpFunc<T>,
		};

		this.dataBase[ params.name ] = variable.value;
		this.variables[ params.name ] = variable as unknown as AnimatorVariable<AnimatorVariableType>;

		return variable;

	}

	/*-------------------------------
		Set
	-------------------------------*/

	public setEasing( name: string, easing: EasingFunc ) {

		let variable = this.variables[ name ];

		if ( variable ) {

			variable.easing = easing;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public setValue<T extends AnimatorVariableType>( name: string, value: T ) {

		let variable = this.dataBase[ name ] as unknown as AnimatorVariableType;

		if ( variable ) {

			if ( typeof variable == 'number' ) {

				variable = value;

			} else if ( "copy" in variable ) {

				variable.copy( value as any );

			} else if ( variable instanceof Array ) {

				( variable as number [] ) = ( value as number[] ).concat();

			}

			this.updateDataBase( name );
			this.cancelAnimate( name );

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	/*-------------------------------
		Animate
	-------------------------------*/

	public animate<T extends AnimatorVariableType>( name: string, goalValue: T, duration: number = 1, callback?: Function, easing?: EasingFunc ) {

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

					this.isAnimating = true;
					this.animatingCount ++;

				}

				variable.time = 0;
				variable.duration = duration;
				variable.startValue = this.getValueClone( variable.value );
				variable.goalValue = this.getValueClone( goalValue );

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

	/*-------------------------------
		Get
	-------------------------------*/

	public get<T extends AnimatorVariableType>( name: string ): T | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ].value as unknown as T;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

			return null;

		}

	}

	public getVariableObject<T extends AnimatorVariableType>( name: string, mute: boolean = false ): AnimatorVariable<T> | null {

		if ( this.variables[ name ] ) {

			return this.variables[ name ] as unknown as AnimatorVariable<T>;

		} else {

			if ( ! mute ) {

				console.warn( '"' + name + '"' + ' is not exist' );

			}

			return null;

		}

	}

	/*-------------------------------
		Utils
	-------------------------------*/

	public applyToUniforms( uniforms: Uniforms ) {

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let variable = this.getVariableObject( keys[ i ] );

			if ( variable ) {

				uniforms[ keys[ i ] ] = variable;

			}

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

	/*-------------------------------
		Utils
	-------------------------------*/

	private getValueClone<T extends AnimatorVariableType>( value: T ): T {

		if ( typeof value == 'number' ) {

			return value;

		} else if ( 'clone' in value ) {

			return value.clone() as T;

		} else if ( value instanceof Array ) {

			return value.concat() as T;

		}

		return value;

	}

	public wait( t: number ) {

		let prm = new Promise<void>( ( r ) =>{

			setTimeout( () => {

				r();

			}, ( t * 1000 ) );

		} );

		return prm;

	}

	/*-------------------------------
		Update
	-------------------------------*/

	public update( deltaTime?: number ) {

		if ( this.animatingCount == 0 ) {

			this.isAnimating = false;

		}

		let keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			let variableName = keys[ i ];
			let variable = this.variables[ variableName ];
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

				let value: AnimatorVariableType = variable.goalValue;

				if ( time < 1.0 ) {

					if ( lerpFunc ) {

						value = lerpFunc( variable.startValue, variable.goalValue, easing( time ) );

					}

				}

				let dataBaseValue = this.dataBase[ variableName ];

				if ( typeof dataBaseValue == 'number' || ! ( 'copy' in dataBaseValue ) ) {

					this.dataBase[ variableName ] = value;

				} else if ( 'copy' in dataBaseValue ) {

					dataBaseValue.copy( value as any );

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

		this.updateDataBase();

		this.dispatchEvent( {
			type: 'update',
			deltaTime: deltaTime
		} );

		if ( this.isAnimating ) {

			this.dispatchEvent( {
				type: 'animate',
				deltaTime: deltaTime
			} );

		}

	}

	public updateDataBase( target?: string ) {

		if ( target ) {

			let variable = this.variables[ target ];
			let databaseValue = this.dataBase[ target ];

			if ( variable && databaseValue ) {

				if ( typeof variable.value == 'number' || ! ( 'copy' in variable.value ) ) {

					variable.value = databaseValue;

				}

			}

			return;

		}

		let key = Object.keys( this.dataBase );

		for ( let i = 0; i < key.length; i ++ ) {

			let variable = this.variables[ key[ i ] ];
			let databaseValue = this.dataBase[ key[ i ] ];

			if ( variable && databaseValue ) {

				// Vector系は参照なのでnumberとnumber[]あたりだけ更新

				if ( typeof variable.value == 'number' || ! ( 'copy' in variable.value ) ) {

					variable.value = databaseValue;

				}

			}


		}


	}

}
