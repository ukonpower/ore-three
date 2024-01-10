uniform sampler2D uBackBuffer;
uniform float threshold;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

void main( void ) {

	vec4 c = texture( uBackBuffer, vUv );
  
	vec3 f;
	f.x = max(0.0, c.x - threshold);
	f.y = max(0.0, c.y - threshold);
	f.z = max(0.0, c.z - threshold);

	outColor = vec4(vec3(c) * f, 1.0 );
	
}