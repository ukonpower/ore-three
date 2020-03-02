uniform sampler2D backbuffer;
uniform vec2 resolution;
varying vec2 vUv;

uniform float threshold;

void main(){
	vec3 c = texture2D(backbuffer,vUv).xyz;
	vec3 f;
	f.x = max( 0.0, c.x * 1.0 - threshold * 1.0);
	f.y = max( 0.0, c.y * 1.0 - threshold * 1.0);
	f.z = max( 0.0, c.z * 1.0 - threshold * 1.0);

	f *= 1.0 + ( 1.0 / threshold);

	gl_FragColor = vec4(vec3(c) * f,1.0);
}