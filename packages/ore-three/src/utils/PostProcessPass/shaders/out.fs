uniform sampler2D uBackBuffer;
varying vec2 vUv;

void main( void ) {

	vec4 col = texture2D( uBackBuffer, vUv );

	gl_FragColor = col;

}