varying vec2 vUv;
varying vec4 vColor;

void main( void ) {
    
    vec3 pos = position;

    pos.z = 1.0;
    
    gl_Position = vec4( pos, 1.0 );
    
    vUv = uv;
    vColor = vec4( 1.0 );

}