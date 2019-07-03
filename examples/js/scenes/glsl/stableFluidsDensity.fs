uniform vec2 resolution;
uniform sampler2D dataTex;
uniform sampler2D densityTex;
uniform vec2 pointerPos;
uniform float pow;
uniform float screenAspect;
uniform float time;


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
	vec2 p = gl_FragCoord.xy - texture2D(dataTex, uv).xy * 30.0;
	vec4 c = texture2D(densityTex, p / resolution) * 0.97;

	float pointerW = 1.0 - smoothstep( 0.0, 0.15, length(uv * vec2( screenAspect, 1.0 ) - (pointerPos) * vec2( screenAspect, 1.0 ) ) );
  	c += pointerW * vec4( max( 0.0, sin(time * 8.0)), max( 0.0, cos(time * 23.0)), max( 0.0, cos(time * 3.0)), 1.0) * pow;

	gl_FragColor = c;
	
  	// gl_FragColor = vec4(texture2D(dataTex, uv));
}