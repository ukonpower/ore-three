uniform sampler2D soundData;
varying vec3 vViewPosition;

void main(void){
	vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = -mvPosition.xyz;
}