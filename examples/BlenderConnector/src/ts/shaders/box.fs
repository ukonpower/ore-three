uniform vec4 color;

varying vec2 vUv;
varying vec3 vNormal;

void main( void ) {

	vec4 c = LinearTosRGB( color );
	c *= 0.7 + dot( vNormal, vec3( 1.0, 1.0 , 1.0 ) ) * 0.3;

	gl_FragColor = vec4( c.xyz, 1.0 );

}