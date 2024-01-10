uniform sampler2D uBackBuffer;
// uniform sampler2D sampler1; // depth
uniform sampler2D uBloomTexture[4];
uniform float cameraNear;
uniform float cameraFar;

in vec2 vUv;

layout (location = 0) out vec4 outColor;

vec2 lens_distortion(vec2 r, float alpha) {
    return r * (1.0 - alpha * dot(r, r));
}

// https://github.com/dmnsgn/glsl-tone-map/blob/main/filmic.glsl

vec3 filmic(vec3 x) {
  vec3 X = max(vec3(0.0), x - 0.004);
  vec3 result = (X * (6.2 * X + 0.5)) / (X * (6.2 * X + 1.7) + 0.06);
  return pow(result, vec3(2.2));
}

void main( void ) {


	vec3 col = vec3( 0.0, 0.0, 0.0 );
	vec2 uv = vUv;
	vec2 cuv = uv - 0.5;
	float len = length(cuv);

	col = texture( uBackBuffer, vUv ).xyz;

	#pragma unroll_loop_start
	for ( int i = 0; i < 4; i ++ ) {

		col += texture( uBloomTexture[ UNROLLED_LOOP_INDEX ], uv ).xyz * ( 0.5 + float(UNROLLED_LOOP_INDEX) * 0.5 ) * 0.2;

	}
	#pragma unroll_loop_end

	col *= smoothstep( 1.5, 0.3, len );

	// col = texture( sampler1, vUv ).xyz;

	outColor = vec4( col, 1.0 );

}