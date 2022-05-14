varying vec2 vUv;
varying vec3 vNormal;
varying vec4 vColor;

uniform float spWeight;

void main( void ) {

  gl_FragColor = vec4( vNormal, vColor.w * ( 1.0 - 0.1 * spWeight) );

}