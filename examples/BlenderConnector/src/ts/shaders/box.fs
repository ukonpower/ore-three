varying vec2 vUv;
uniform vec4 color;

void main( void ) {

	vec4 c = LinearTosRGB( color );

	gl_FragColor = vec4( c.xyz, 1.0 );

}