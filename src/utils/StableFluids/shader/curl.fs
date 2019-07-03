uniform sampler2D dataTex;
uniform vec2 resolution;
uniform float curl;

vec2 sampleData( sampler2D tex, vec2 uv, vec2 res ){

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

	return w * texture2D( tex, uv + offset / res ).xy;

}

void main () {
	vec2 uv = gl_FragCoord.xy / resolution;

	vec2 offsetX = vec2(1.0, 0.0);
	vec2 offsetY = vec2(0.0, 1.0);

	float l = sampleData(dataTex, (gl_FragCoord.xy - offsetX) / resolution, resolution).y;
	float r = sampleData(dataTex, (gl_FragCoord.xy + offsetX) / resolution, resolution).y;
	float t = sampleData(dataTex, (gl_FragCoord.xy - offsetY) / resolution, resolution).x;
	float b = sampleData(dataTex, (gl_FragCoord.xy + offsetY) / resolution, resolution).x;

	float c = (r - l - b + t);
	gl_FragColor = vec4(curl * c, 0.0, 0.0, 1.0);
}