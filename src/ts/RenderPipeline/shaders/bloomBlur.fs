// https://qiita.com/aa_debdeb/items/26ab808de6745611df53

in vec2 vUv;

uniform sampler2D uBloomBackBuffer;

uniform vec2 uResolution;
uniform bool uIsVertical;
uniform float blurRange;

layout (location = 0) out vec4 outColor;

// Gaussianブラーの重み
//[
uniform float[GAUSS_WEIGHTS] uWeights;
//]

void main(void) {
  vec2 coord = vec2(gl_FragCoord.xy);
  vec3 sum = uWeights[0] * texture(uBloomBackBuffer, vUv).rgb;
  
  for (int i = 1; i < GAUSS_WEIGHTS; i++) {
    vec2 offset = (uIsVertical ? vec2(0, i) : vec2(i, 0)) * 1.7;
    sum += uWeights[i] * texture(uBloomBackBuffer, vUv + offset / uResolution).rgb;
    sum += uWeights[i] * texture(uBloomBackBuffer, vUv - offset / uResolution).rgb;
  }
  outColor = vec4(sum, 1.0);
}