uniform sampler2D texture;
varying vec2 vUv;

void main( void ){

	vec4 c = texture2D( texture, vUv );

	gl_FragColor = c;

}