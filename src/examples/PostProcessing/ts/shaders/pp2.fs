varying vec2 vUv;
uniform sampler2D uBackBuffer;

uniform float time;


void main(void){
	vec2 uv = vUv * 2.0 - 1.0;
	vec3 c = texture2D(uBackBuffer,vUv).xyz;

	float d = length( vec2( uv ) ) * 4.0;
	c.x += sin( d - time * 2.0 + 0.0 ) * 0.4;
	c.y += sin( d - time * 2.0 + 0.4 ) * 0.4;
	c.z += sin( d - time * 2.0 + 0.8 ) * 0.4;
	gl_FragColor = vec4(c,1.0);
}