varying vec2 vUv;
varying vec4 vColor;
varying float depth;
	
void main( void ) {
	
	vec3 pos = position;
	
	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	
	vUv = uv;
	vColor = vec4( 1.0 );

}