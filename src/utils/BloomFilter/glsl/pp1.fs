uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

uniform float threshold;

void main(){
	vec3 c = texture2D(backbuffer,vUv).xyz;
	float h = c.x + c.y + c.z - threshold * 3.0;
	// h = step(0.0,h);
	gl_FragColor = vec4(vec3(h * 1.0),1.0);
}