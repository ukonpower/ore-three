uniform vec2 dataSize;

uniform sampler2D dataPos;
uniform sampler2D dataVel;

varying vec2 vUv;

void main( void ){

	// vec2 uv = gl_FragCoord.xy / ( dataSize );

	vec4 posData = texture2D( dataPos, vUv );
	vec3 pos = posData.xyz;
	float pTime = posData.w;

	vec4 velData = texture2D( dataVel, vUv );
	vec3 vel = velData.xyz;
	float lifeTime = velData.w;

	if( pTime < 0.0 ) {
		
		pTime = 0.0;

	} else if( pTime <= lifeTime ){

		pTime += 0.016;

	} else if( pTime > lifeTime) {

		pos = vec3( 0.0 );
		pTime = -1.0;
		
	}

	pos.xyz += vel.xyz;

	gl_FragColor = vec4( pos, pTime );

}