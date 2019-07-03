uniform sampler2D texture;
varying vec2 vUv;

void main( void ){

	vec4 tex = texture2D( texture, vUv );

	vec3 c = tex.xyz;
	
	gl_FragColor = vec4( c , 1.0) ;

}