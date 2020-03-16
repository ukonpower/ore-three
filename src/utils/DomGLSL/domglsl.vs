varying vec2 vUv;
uniform vec2 domPos;
uniform vec2 domSize;
uniform vec2 windowSize;
uniform float depth;
uniform float time;

void main()
{
  float aspect = windowSize.x / windowSize.y;
  float width = domSize.x / windowSize.x;

  //左上(0,0)に
  vec3 pos = position + vec3(1.0,-1.0,0.0);

  //size
  pos.x *= width;
  pos.y *= (width * aspect) * (domSize.y / domSize.x);

  //left top
  pos += vec3(-1.0,1.0,0.0);

  //dom position (windowは(-1.0,-1.0)-(1.0,1.0)なので *2 が必要)
  pos += vec3(domPos.x / windowSize.x * 2.0,-domPos.y / windowSize.y * 2.0, depth);

  gl_Position = vec4(pos, 1.0);
  vUv = uv;
}
