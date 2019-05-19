uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

uniform sampler2D sceneTex;

void main(){
	vec4 bloom = texture2D(backbuffer,vUv);
	vec4 base = texture2D(sceneTex,vUv);

	// vec4 c = bloom;
	vec4 c = bloom + base;
	gl_FragColor = vec4(c);
}