varying vec2 vUv;
uniform sampler2D backbuffer;

uniform float time;


void main(void){
	vec2 uv = vUv * 2.0 - 1.0;
	vec3 c = texture2D(backbuffer,vUv).xyz;
	c -= smoothstep(0.1,1.0,length(uv) * 0.5);
	gl_FragColor = vec4(c,1.0);
}