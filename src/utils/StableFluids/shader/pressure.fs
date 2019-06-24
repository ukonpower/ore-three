uniform float alpha;
uniform float beta;
uniform vec2 resolution;
uniform sampler2D dataTex;

float sampleData( sampler2D tex, vec2 uv, vec2 resolution ){

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
  vec4 data = texture2D(dataTex, gl_FragCoord.xy / resolution);

  float l = sampleData(dataTex, (gl_FragCoord.xy - vec2(1.0, 0.0)) / resolution, resolution);
  float r = sampleData(dataTex, (gl_FragCoord.xy + vec2(1.0, 0.0)) / resolution, resolution);
  float t = sampleData(dataTex, (gl_FragCoord.xy - vec2(0.0, 1.0)) / resolution, resolution);
  float b = sampleData(dataTex, (gl_FragCoord.xy + vec2(0.0, 1.0)) / resolution, resolution);

  float divergence = data.w;
  float pressure = (divergence * alpha + (l + r + t + b)) * 0.25 * beta;

  gl_FragColor = vec4(data.xy, pressure, divergence);
}