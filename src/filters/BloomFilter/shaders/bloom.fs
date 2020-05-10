varying vec2 vUv;
uniform sampler2D backbuffer;
uniform vec2 resolution;

uniform sampler2D sceneTex;
uniform float brightness;

void main(){
	gl_FragColor = texture2D(sceneTex, vUv) * 1.0 + texture2D(backbuffer, vUv) * brightness;
}