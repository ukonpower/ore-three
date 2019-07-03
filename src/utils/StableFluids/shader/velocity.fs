
uniform float time;
uniform vec2 resolution;

uniform sampler2D dataTex;
uniform sampler2D curlTex;

uniform vec2 pointerPos;
uniform vec2 pointerVec;
uniform float pointerSize;

uniform float screenAspect;

vec2 smapleVelocity( sampler2D tex, vec2 uv, vec2 resolution ){

	vec2 offset = vec2( 0.0, 0.0 );
	float w = 1.0;
	
	if( uv.x < 0.0 ){

		offset.x = 1.0;
		w = -1.0;

	}else if( uv.x > 1.0 ){

		offset.x = -1.0;
		w = -1.0;
	
	}

	if( uv.y < 0.0 ){

		offset.y = 1.0;
		w = -1.0;

	}else if( uv.y > 1.0 ){
		
		offset.y = -1.0;
		w = -1.0;
	
	}

	return w * texture2D( tex, uv + offset / resolution ).xy;

}

float samplePressure( sampler2D tex, vec2 uv, vec2 resolution ){

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

	return w * texture2D( tex, uv + offset / resolution ).z;

}

void main(){
	vec2 uv = gl_FragCoord.xy / resolution;

	vec2 offsetX = vec2(1.0, 0.0);
	vec2 offsetY = vec2(0.0, 1.0);

	float l = smapleVelocity(curlTex, (gl_FragCoord.xy - offsetX) / resolution, resolution).x;
	float r = smapleVelocity(curlTex, (gl_FragCoord.xy + offsetX) / resolution, resolution).x;
	float t = smapleVelocity(curlTex, (gl_FragCoord.xy - offsetY) / resolution, resolution).x;
	float b = smapleVelocity(curlTex, (gl_FragCoord.xy + offsetY) / resolution, resolution).x;
	float c = texture2D(curlTex, uv).x;
	
	vec2 force = 0.5 * vec2(abs(b) - abs(t), abs(r) - abs(l));
	force /= length(force) + 0.0001;
	force *= 1.0 * c;
	force.y *= -1.0;

	vec4 data = texture2D( dataTex, uv);

	float pointerW = 1.0 - smoothstep( 0.0, pointerSize * 0.15, length(uv * vec2( screenAspect, 1.0 ) - pointerPos * vec2( screenAspect, 1.0 ) ) );
	vec2 mouse = vec2( 0.0, 0.0 );
	mouse += pointerW * pointerVec * 0.1;
	// data.xy = mix( data.xy, pointerVec * 0.3, pointerW);

	gl_FragColor = vec4(data.xy + mouse + force * 0.5, data.zw);
}