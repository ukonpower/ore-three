varying vec3 vViewPosition;
varying vec3 vNormal;
varying vec4 vColor;
uniform vec3 pointer;
uniform float objTransform;
uniform float time;

uniform float spWeight;
uniform float num;
uniform float objSelector;

$noise4D
$rotate

vec3 snoise3D( vec4 p ) {

    return vec3(
        snoise( p + vec4( 0.0, 0.0, 0.0, 0.0 ) ),
        snoise( p + vec4( 0.10, 200.0, 4.0, 34.0 ) ),
        snoise( p + vec4( -10.0, -200.0, -4.0, 5344.0 ) )
    );
    
}

void main() {
    vec3 pos = position;
    
    float selector = max( 0.0 , 1.0 - abs( num - objSelector ) );
    pos *= smoothstep( 0.0, 1.0, selector );

    float face =  max( 0.0 , 1.0 - abs( num - 3.0 ) );

    pos.xy += vec2( sin( time * 10.0 ), cos( time * 7.0 ) ) * face * ( 0.2);

    mat2 rot = rotate( time * ( 1.0 - face ) );
    pos.xz *= rot;
    vec3 n = normal;
    n.xz *= rot;
    // pos *= 1.0 - objTransform + 1.0;

    float nPower = smoothstep( 0.0, 0.4, objTransform );

    pos += ( snoise3D( vec4( pos * ( 0.3 + nPower ), time ) ) * 1.0 ) * objTransform;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0 );
    gl_Position = projectionMatrix * mvPosition;
    vViewPosition = -mvPosition.xyz; 
    
    vNormal = normalize( normalMatrix * n ) + 0.5;
    vColor = vec4( 1.0, 1.0, 1.0, 1.0 );
}