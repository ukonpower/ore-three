uniform float buff[256];
uniform float volume;

varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main(void){
	vec3 pos = position;

	pos.y = buff[int(vUv.x * 256.0)];
	// pos.z += volume * 0.01;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = -mvPosition.xyz;
	vUv = uv;
}