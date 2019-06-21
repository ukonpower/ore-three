uniform sampler2D texture;
varying vec2 vUv;

void main( void ){

	vec4 tex = texture2D( texture, vUv );

	vec3 c = vec3( length(tex.xy) );
	
	gl_FragColor = vec4( c, 1.0) ;

}