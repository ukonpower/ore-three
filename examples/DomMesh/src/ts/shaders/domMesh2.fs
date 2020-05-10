uniform float time;
varying vec2 vUv;

void main( void ) {
	
	vec3 c = vec3(
		sin( length( vUv * 2.0 - 1.0 ) * 10.0 - time * 10.0),
		sin( length( vUv * 2.0 - 1.0 ) * 10.0 - time * 10.1 ),
		sin( length( vUv * 2.0 - 1.0 ) * 10.0 - time * 10.2 )
	);
	
	gl_FragColor = vec4( c, 1.0 );

}