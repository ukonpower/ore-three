uniform float time;
varying vec2 vUv;

void main( void ) {
	
	vec3 c = vec3(
		sin( vUv.x * 10.0 + time * 10.0),
		sin( vUv.x * 10.0 + time * 10.1 ),
		sin( vUv.x * 10.0 + time * 10.2 )
	);
	
	gl_FragColor = vec4( c, 1.0 );

}