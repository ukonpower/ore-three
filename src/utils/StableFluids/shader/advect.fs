uniform float attenuation;
uniform vec2 resolution;
uniform sampler2D dataTex;

vec2 sampleVelocity( sampler2D tex, vec2 uv, vec2 resolution ){

	vec2 offset = vec2( 0.0, 0.0 );
	
	if( uv.x <= 0.0 ){

		offset.x = 1.0;

	}else if( uv.x >= 1.0 ){

		offset.x = -1.0;
	
	}

	if( uv.y <= 0.0 ){

		offset.y = 1.0;

	}else if( uv.y >= 1.0 ){
		
		offset.y = -1.0;
	
	}

	return texture2D( tex, uv + offset / resolution ).xy;

}

float samplePressure( sampler2D tex, vec2 uv, vec2 resolution ){

	vec2 offset = vec2( 0.0, 0.0 );
	
	if( uv.x <= 0.0 ){

		offset.x = 1.0;

	}else if( uv.x >= 1.0 ){

		offset.x = -1.0;
	
	}

	if( uv.y <= 0.0 ){

		offset.y = 1.0;

	}else if( uv.y >= 1.0 ){
		
		offset.y = -1.0;
	
	}

	return texture2D( tex, uv + offset / resolution ).z;

}


vec2 bilerp(sampler2D tex, vec2 p, vec2 resolution) {
    vec4 ij; // i0, j0, i1, j1
    ij.xy = floor(p - 0.5) + 0.5;
    ij.zw = ij.xy + 1.0;

    vec4 uv = ij / resolution.xyxy;
    vec2 d11 = sampleVelocity(tex, uv.xy, resolution);
    vec2 d21 = sampleVelocity(tex, uv.zy, resolution);
    vec2 d12 = sampleVelocity(tex, uv.xw, resolution);
    vec2 d22 = sampleVelocity(tex, uv.zw, resolution);

    vec2 a = p - ij.xy;

    return mix(mix(d11, d21, a.x), mix(d12, d22, a.x), a.y);
}

void main(){
  vec2 r = resolution * 1.0;
  vec2 p = gl_FragCoord.xy - sampleVelocity(dataTex, gl_FragCoord.xy / r, r);
  gl_FragColor = vec4(bilerp(dataTex, p, r) * attenuation, samplePressure(dataTex, gl_FragCoord.xy / r, r), 0.0);
}