varying vec2 vUv;
uniform vec2 domPos;
uniform vec2 domSize;
uniform vec2 windowSize;
uniform float aspectRatio;

void main(  )
{
  float width = domSize.x / windowSize.x;

  //左上( 0,0 )に
  vec3 pos = position + vec3( 1.0,-1.0,0.0 );

  //size
  pos.x *= width;
  pos.y *= ( width * aspectRatio ) * ( domSize.y / domSize.x );

  pos += vec3( -1.0, 1.0, 0.0 );

  pos += vec3( domPos.x / windowSize.x * 2.0, -domPos.y / windowSize.y * 2.0, 0.0 );

  gl_Position = vec4( pos, 1.0 );
  vUv = uv;
}
