uniform float viscosity;
uniform vec2 resolution;
uniform sampler2D dataTex;

uniform vec2 pointerPos;
uniform vec2 pointerVec;
uniform float pointerSize;

uniform float screenAspect;

float sampleData( sampler2D tex, vec2 uv, vec2 resolution ){

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
  vec4 data = texture2D(dataTex, uv);
  
  vec2 v = data.xy;

  vec2 offsetX = vec2(1.0, 0.0);
  vec2 offsetY = vec2(0.0, 1.0);

  float l = sampleData(dataTex, (gl_FragCoord.xy - offsetX) / resolution, resolution);
  float r = sampleData(dataTex, (gl_FragCoord.xy + offsetX) / resolution, resolution);
  float t = sampleData(dataTex, (gl_FragCoord.xy - offsetY) / resolution, resolution);
  float b = sampleData(dataTex, (gl_FragCoord.xy + offsetY) / resolution, resolution);

  v += vec2(r - l, b - t) * 0.1;

  float pointerW = 1.0 - smoothstep( 0.0, pointerSize * 0.1, length(uv * vec2( screenAspect, 1.0 ) - pointerPos * vec2( screenAspect, 1.0 ) ) );
  
  v += pointerW * pointerVec;

  v *= viscosity;
  
  gl_FragColor = vec4(v, data.zw);
}