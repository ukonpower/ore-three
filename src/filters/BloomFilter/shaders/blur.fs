varying vec2 vUv;
uniform sampler2D backbuffer;
uniform vec2 resolution;

uniform bool direction;
uniform float gaussVar;

$guassBlur9

void main(){

	vec4 c = blur9(backbuffer,vUv,resolution,direction ? vec2(1.0,0.0) : vec2(0.0, 1.0));

	gl_FragColor = c;
}