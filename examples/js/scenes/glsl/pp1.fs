varying vec2 vUv;
uniform sampler2D backbuffer;

uniform float time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main(void){
	vec3 c = texture2D(backbuffer,vUv).xyz;
	c += random(vUv + time);
	gl_FragColor = vec4(c,1.0);
}