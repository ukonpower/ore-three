uniform vec2 resolution;
uniform sampler2D dataTex;

uniform float velocityAttenuation;
uniform float pressureAttenuation;

vec2 sampleVelocity( sampler2D tex, vec2 uv, vec2 resolution ){

	vec2 offset = vec2( 0.0, 0.0 );
	float w = 1.0;
	
	if( uv.x < 0.0 ){

		offset.x = 1.0;
		w = - 1.0;

	}else if( uv.x > 1.0 ){

		offset.x = -1.0;
		w = - 1.0;
	
	}

	if( uv.y < 0.0 ){

		offset.y = 1.0;
		w = - 1.0;

	}else if( uv.y > 1.0 ){
		
		offset.y = -1.0;
		w = - 1.0;
	
	}

	return w * texture2D( tex, uv + offset / resolution ).xy;

}

float samplePressure( sampler2D tex, vec2 uv, vec2 resolution ){

	vec2 offset = vec2( 0.0, 0.0 );
	
	if( uv.x < 0.0 ){

		offset.x = 1.0;

	}else if( uv.x > 1.0 ){

		offset.x = -1.0;
	
	}

	if( uv.y < 0.0 ){

		offset.y = 1.0;

	}else if( uv.y > 1.0 ){
		
		offset.y = -1.0;
	
	}

	return texture2D( tex, uv + offset / resolution ).z;

}

void main(){
	vec2 uv =  gl_FragCoord.xy / resolution;
	vec2 p = gl_FragCoord.xy - sampleVelocity(dataTex, uv, resolution);
	gl_FragColor = vec4(sampleVelocity(dataTex, p / resolution,resolution) * velocityAttenuation, samplePressure(dataTex, uv, resolution) * pressureAttenuation, 0.0);
}