uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

uniform float spWeight;
uniform float time;
uniform float dark;

$random

void main(){

	vec4 tex = texture2D( backbuffer, vUv );
	tex.xyz *= 1.0 - ( dark ) * 0.4 * ( 1.0 - spWeight * 0.7 );
	gl_FragColor = tex;
	
}