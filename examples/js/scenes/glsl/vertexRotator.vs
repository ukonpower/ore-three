varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec2 vUv;

uniform mat4 rotation;
uniform vec2 rotVec;

void main(void){
	vec3 pos = position;
	
	//apply rotation
	pos = (rotation * vec4(pos,1.0)).xyz;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = -mvPosition.xyz;
	vUv = uv;
}