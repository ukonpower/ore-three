uniform sampler2D audioSpectrum;
uniform float audioVolume;

varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main(void){
	vec3 pos = position;

	pos.z += texture2D(audioSpectrum,vec2(uv.x,0.0)).x;

	// pos.z += volume * 0.01;

	vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
	gl_Position = projectionMatrix * mvPosition;
	vViewPosition = -mvPosition.xyz;
	vUv = uv;
}