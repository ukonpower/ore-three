uniform sampler2D uBackBuffer;
uniform vec2 uResolution;
uniform vec2 uResolutionInv;

in vec2 vUv;

layout ( location = 0 ) out vec4 outColor;

// source: https://github.com/unity3d-jp/NVIDIAHairWorksIntegration/blob/master/HairWorksIntegration/Assets/Standard%20Assets/Effects/ImageEffects/Shaders/_Antialiasing/FXAA2.shader

vec4 texOffset( sampler2D tex, vec2 uv, vec2 offsetPixel, vec2 resolutionInv ) {

	return texture( tex, uv + offsetPixel * resolutionInv );

}

#define FXAA_REDUCE_MIN   ( 1.0 / 128.0 )
#define FXAA_REDUCE_MUL   ( 1.0 / 8.0 )
#define FXAA_SPAN_MAX    8.0

void main( void ) {

	/*--------------------------------------------------------------------------*/

    vec3 rgbNW = texOffset( uBackBuffer, vUv, vec2( -1.0, 1.0 ), uResolutionInv ).xyz;
    vec3 rgbNE = texOffset( uBackBuffer, vUv, vec2( 1.0, 1.0 ), uResolutionInv ).xyz;
    vec3 rgbSW = texOffset( uBackBuffer, vUv, vec2( -1.0, -1.0 ), uResolutionInv ).xyz;
    vec3 rgbSE = texOffset( uBackBuffer, vUv, vec2( 1.0, -1.0 ), uResolutionInv ).xyz;
    vec3 rgbM  = texture( uBackBuffer, vUv ).xyz;
	
	/*--------------------------------------------------------------------------*/

    vec3 luma = vec3( 0.299, 0.587, 0.114 );

    float lumaNW = dot( rgbNW, luma );
    float lumaNE = dot( rgbNE, luma );
    float lumaSW = dot( rgbSW, luma );
    float lumaSE = dot( rgbSE, luma );
    float lumaM  = dot( rgbM,  luma );

	/*--------------------------------------------------------------------------*/

    float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );
    float lumaMax = max( lumaM, max( max( lumaNW, lumaNE ), max( lumaSW, lumaSE ) ) );

	/*--------------------------------------------------------------------------*/

    vec2 dir; 
    dir.x = -( ( lumaNW + lumaNE ) - ( lumaSW + lumaSE ) );
    dir.y =  ( ( lumaNW + lumaSW ) - ( lumaNE + lumaSE ) );

	/*--------------------------------------------------------------------------*/

    float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );
    float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );
    dir = min( vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX ), max( vec2( -FXAA_SPAN_MAX, -FXAA_SPAN_MAX ), dir * rcpDirMin ) ) * uResolutionInv.xy;

	/*--------------------------------------------------------------------------*/
	
    vec3 rgbA = ( 1.0 / 2.0 ) * ( 
        texture( uBackBuffer, vUv + dir * ( 1.0 / 3.0 - 0.5 ) ).xyz +
        texture( uBackBuffer, vUv + dir * ( 2.0 / 3.0 - 0.5 ) ).xyz
    );

    vec3 rgbB = rgbA * 0.5  + 0.25  * ( 
        texture( uBackBuffer, vUv + dir * -0.5 ).xyz +
        texture( uBackBuffer, vUv + dir *  0.5 ).xyz 
    );
		
    float lumaB = dot( rgbB, luma );

    if( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) ) {

		outColor = vec4( rgbA, 1.0 );

	} else {

		outColor = vec4( rgbB, 1.0 );

	};

    // outColor = vec4( 0.0 );

}