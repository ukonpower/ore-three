varying vec2 vUv;
varying vec4 vColor;
	
uniform sampler2D posTex;
uniform sampler2D velTex;
uniform float selector;

void main( void ) {
	
	vec4 tex = selector > 0.5 ? texture2D( posTex, vUv ) :  texture2D( velTex, vUv ) * 50.0;
	gl_FragColor = vec4( tex );

}