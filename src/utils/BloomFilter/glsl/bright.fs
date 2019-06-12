uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

uniform float threshold;

void main(){
	vec3 c = texture2D(backbuffer,vUv).xyz;
	float f = max(0.0,length(c) * 1.2 - length(vec3(threshold)));
	gl_FragColor = vec4(vec3(c) * f,1.0);
}