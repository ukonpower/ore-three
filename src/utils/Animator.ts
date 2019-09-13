declare interface variable{
	x: number;
	duration: number;
	value: number;
	base: number;
	distance: number;
	onMoved?: Function;
}

export class Animator{

	private variables: { [key: string]: variable };

	constructor(){

		this.variables = {};

	}

	public addVariable( name: string, initValue?: number ){

		this.variables[name] = {
			x: 1,
			duration: 1,
			value: initValue ? initValue : 0,
			base: 0,		
			distance: 0
		}

	}

	public animate( name: string, goalValue: number, duration?: number, callback?: Function ){

		let variable = this.variables[name];

		variable.x = 0;
		variable.duration = duration || 1;
		variable.base = variable.value;
		variable.distance = goalValue - variable.base;
		variable.onMoved = callback;		

	}

	public getValue( name: string ): number{

		if( this.variables[name] ){

			return this.variables[name].value;

		}else{

			console.warn( 'not exist variable:' + name );

			return null;

		}
		
	}

	public update( deltaTime?: number ){

		let keys = Object.keys( this.variables );

		for( let i = 0; i < keys.length; i++ ){

			let variable = this.variables[keys[i]];

			if( variable.x < 1.0 ){

				variable.x += ( deltaTime || 0.016 ) / variable.duration;

				let w = this.sigmoid( 6, variable.x );

				variable.value = variable.base + variable.distance * w;

				if( variable.x >= 1.0 ){

					variable.x = 1.0;

					variable.value = variable.base + variable.distance;

					if( variable.onMoved ){

						variable.onMoved();

						variable.onMoved = null;

					}

				}

			}

		}

	}

	private sigmoid( a, x ) {
		
		var e1 = Math.exp( -a * ( 2 * x - 1 ) );
		var e2 = Math.exp( -a );
		return ( 1 + ( 1 - e1 ) / ( 1 + e1 ) * ( 1 + e2 ) / ( 1 - e2 ) ) / 2;

	}

}