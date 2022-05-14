varying vec2 vUv;

uniform float time;
uniform vec2 resolution;


void main(void){

	vec3 c;
	vec2 uv = (vUv * 2.0 - 1.0) * vec2(resolution.x / resolution.y,1.0);
	c.x = sin(time * 5.0 - length(uv) * 10.0);
	c.y = sin(0.7 + time * 5.0 - length(uv) * 10.0);
	c.z = sin(1.4 + time * 5.0 - length(uv) * 10.0);

	gl_FragColor = vec4(c,1.0);
}