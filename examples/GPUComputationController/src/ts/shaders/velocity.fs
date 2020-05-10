uniform vec2 dataSize;
uniform sampler2D dataPos;
uniform sampler2D dataVel;

uniform float time;
uniform float seed;

varying vec2 vUv;
#define NOISE_SCALE 1.5
#define TIME_SCALE 2.5

$noise4D
$random

vec3 snoise3D( vec3 p ){
	return vec3(
      snoise( vec4( NOISE_SCALE * p, 7.225 * seed + TIME_SCALE * time ) ),
      snoise( vec4( NOISE_SCALE * p, 3.553 * seed + TIME_SCALE * time ) ),
      snoise( vec4( NOISE_SCALE * p, 1.259 * seed + TIME_SCALE * time ) )
    ) * 0.6;
}

void main( void ){

	vec4 posData = texture2D( dataPos, vUv );
	vec3 pos = posData.xyz;
	float pTime = posData.w;

	vec4 velData = texture2D( dataVel, vUv );

	vec3 vel = velData.xyz;
	float lifeTime = velData.w;

	if( pTime < 0.0 ){

		lifeTime = snoise( vec4( vUv.xy * 1.0, time, time ) ) * 1.0 + 1.0;

		vel = vec3( 
			random( vUv + vec2( 0.0, 0.0 ) ) - 0.5,
			random( vUv + vec2( 10.0, -100.0 ) ) - 0.5,
			random( vUv + vec2( 34.0, 354.0 ) ) - 0.5
		) * 0.01;
		
	} else if( pTime < lifeTime ){

		vel *= 0.9;
		vel += snoise3D( pos * 7.0 ) * 0.005;

	}

	gl_FragColor = vec4( vel, lifeTime );

}