uniform sampler2D posTex;
uniform sampler2D velTex;

varying vec2 vUv;
varying vec4 vColor;

#pragma glslify: import( './constants' )

void main( void ) {
	
	vec3 pos = position;

	vec4 posData = texture2D( posTex, uv );
	vec4 velData = texture2D( velTex, uv );

	pos += posData.xyz * 10.0;
	
	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	
	vUv = uv;
	vColor = vec4( 1.0 * smoothstep( 0.5, 0.7, ( 1.0 - gl_Position.z * 0.04 )) );

	gl_PointSize = 10.0 * sin( ( posData.w / velData.w ) * PI );


}