varying vec2 vUv;

void main( void ) {

    vec3 pos = position;

    gl_Position = vec4( pos.xy, 0.99, 1.0 );

    vUv = uv;

}