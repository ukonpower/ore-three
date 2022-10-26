import { get } from 'http';
import * as THREE from 'three';
import { Easings, EasingFunc } from "./Easings";
import { LerpFunc, Lerps } from "./Lerps";
import { Uniforms } from "./Uniforms";

export type AnimatorVariableType = number | number[] | THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Quaternion | THREE.Euler

export declare interface AnimatorVariable<T>{
	isAnimating: boolean
	isAnimatingReseve: boolean,
	time: number;
	duration: number;
	value: T;
	startValue: T;
	goalValue: T;
	onAnimationFinished?: ( () => void ) | null;
	onAnimationCanceled?: ( () => void ) | null;
	lerpFunc?: LerpFunc<T>;
	easing: EasingFunc;
	userData?: any;
}

export declare interface AnimatorVariableParams<T> {
	name: string;
	initValue: T;
	easing?: EasingFunc;
	customLerpFunc?: LerpFunc<T>;
	userData?: any;
}

export class Animator extends THREE.EventDispatcher {

	public dataBase: {[ key: string ]: AnimatorVariableType };

	protected variables: { [ key: string ]: AnimatorVariable<AnimatorVariableType> };
	protected dispatchEvents: Function[] = [];
	protected _isAnimating: boolean = false;

	constructor() {

		super();

		this.variables = {};
		this.dataBase = {};

	}

	public add<T extends AnimatorVariableType>( params: AnimatorVariableParams<T> ) {

		const variable: AnimatorVariable<T> = {
			time: 0,
			duration: 0,
			value: this.getValueClone( params.initValue ),
			startValue: this.getValueClone( params.initValue ),
			goalValue: this.getValueClone( params.initValue ),
			easing: params.easing || Easings.sigmoid(),
			lerpFunc: ( params.customLerpFunc || Lerps.getLerpFunc( params.initValue ) ) as LerpFunc<T>,
			userData: params.userData,
			isAnimating: false,
			isAnimatingReseve: false,
		};

		this.dataBase[ params.name ] = variable.value;
		this.variables[ params.name ] = variable as unknown as AnimatorVariable<AnimatorVariableType>;

		this.dispatchEvent( {
			type: 'added',
			varName: params.name,
			variable,
		} );

		return variable;

	}

	/*-------------------------------
		Set
	-------------------------------*/

	public setEasing( name: string, easing: EasingFunc ) {

		const variable = this.variables[ name ];

		if ( variable ) {

			variable.easing = easing;

		} else {

			console.warn( '"' + name + '"' + ' is not exist' );

		}

	}

	public setValue<T extends AnimatorVariableType>( name: string, value: T ) {

		let variable = this.dataBase[ name ] as unknown as AnimatorVariableType;

		if ( variable !== undefined ) {

			if ( typeof variable == 'number' ) {

				this.dataBase[ name ] = value;

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

	public animate<T extends AnimatorVariableType>( name: string, goalValue: T, duration: number = 1, callback?: Function ) {

		const variable = this.variables[ name ];

		if ( variable ) {

			this.cancelAnimate( name );

			this.animateVariableInit( variable, goalValue, duration, null, () => {

				variable.onAnimationFinished = null;
				callback && callback();

			} );

			this._isAnimating = true;

		} else {

			console.error( '"' + name + '"' + ' is not exist' );

		}

	}

	public animateAsync<T extends AnimatorVariableType>( name: string, goalValue: T, duration: number = 1, callback?: Function ) {

		return new Promise( ( resolve, reject ) => {

			const variable = this.variables[ name ];

			if ( variable ) {

				this.cancelAnimate( name );

				this.animateVariableInit( variable, goalValue, duration, () => {

					variable.onAnimationFinished = null;
					reject( 'animation canceled' );

				}, () => {

					variable.onAnimationFinished = null;
					callback && callback();
					resolve( null );

				} );

				this._isAnimating = true;

			} else {

				reject( '"' + name + '"' + ' is not exist' );

			}

		} );

	}

	protected animateVariableInit<T extends AnimatorVariableType>( variable: AnimatorVariable<T>, goalValue: T, duration: number, onAnimationCanceled: ( () => void ) | null, onAnimationFinished: ( () => void )| null ) {

		variable.time = 0;
		variable.isAnimating = true;
		variable.isAnimatingReseve = true;
		variable.duration = duration;
		variable.startValue = this.getValueClone( variable.value );
		variable.goalValue = this.getValueClone( goalValue );
		variable.onAnimationCanceled = onAnimationCanceled;
		variable.onAnimationFinished = onAnimationFinished;

	}

	public cancelAnimate( name: string ) {

		const variable = this.variables[ name ];

		if ( variable ) {

			variable.time = - 1.0;
			variable.onAnimationFinished = null;
			variable.onAnimationCanceled && variable.onAnimationCanceled();

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

		const keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			const variable = this.getVariableObject( keys[ i ] );

			if ( variable ) {

				uniforms[ keys[ i ] ] = variable;

			}

		}

	}

	public isAnimating(): boolean

	public isAnimating( variableName: string ): boolean

	public isAnimating( variableName?: string ): boolean {

		if ( variableName !== undefined ) {

			if ( this.variables[ variableName ] ) {

				return this.variables[ variableName ].isAnimating;

			}

			return false;

		} else {

			return this._isAnimating;

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

		const prm = new Promise<void>( ( r ) =>{

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

		this._isAnimating = false;

		const keys = Object.keys( this.variables );

		for ( let i = 0; i < keys.length; i ++ ) {

			const variableName = keys[ i ];
			const variable = this.variables[ variableName ];

			if ( variable.isAnimating && variable.isAnimatingReseve ) {

				this._isAnimating = true;

				let finished = false;

				const duration = variable.duration;
				const easing = variable.easing;
				const lerpFunc = variable.lerpFunc;

				if ( duration == 0 ) {

					variable.time = 1.0;

				} else {

					variable.time += ( deltaTime || 0.016 ) / duration;

				}

				if ( variable.time >= 1.0 ) {

					finished = true;
					variable.time = 1.0;

				}

				let value: AnimatorVariableType = variable.goalValue;

				if ( lerpFunc ) {

					value = lerpFunc( variable.startValue, variable.goalValue, easing( variable.time ) );

				}

				const dataBaseValue = this.dataBase[ variableName ];

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

				if ( finished ) {

					if ( variable.onAnimationFinished ) {

						this.dispatchEvents.push( variable.onAnimationFinished );

					}

					variable.isAnimatingReseve = false;

				}

			} else {

				variable.isAnimating = false;
				variable.time = 0.0;

			}

		}

		while ( this.dispatchEvents.length != 0 ) {

			const func = this.dispatchEvents.pop();

			if ( func ) {

				func();

			}

		}

		this.updateDataBase();

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

	public updateDataBase( target?: string ) {

		if ( target ) {

			const variable = this.variables[ target ];
			const databaseValue = this.dataBase[ target ];

			if ( variable && databaseValue !== undefined ) {

				if ( typeof variable.value == 'number' || ! ( 'copy' in variable.value ) ) {

					variable.value = databaseValue;

				}

			}

			return;

		}

		const key = Object.keys( this.dataBase );

		for ( let i = 0; i < key.length; i ++ ) {

			const variable = this.variables[ key[ i ] ];
			const databaseValue = this.dataBase[ key[ i ] ];

			if ( variable && databaseValue !== undefined ) {

				// Vector系は参照なのでnumberとnumber[]あたりだけ更新

				if ( typeof variable.value == 'number' || ! ( 'copy' in variable.value ) ) {

					variable.value = databaseValue;

				}

			}


		}


	}

}
