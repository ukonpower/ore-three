varying vec2 vUv;
uniform float time;

$noise3D

void main(){
    vec3 c = vec3(0.3,0.3,1.0);
    float t = time;
    vec2 uv = vUv;

    t *= 0.1;
    uv *= 0.5;
    // c.x += snoise(vec3(uv + vec2(200.0),t));
    float n = snoise(vec3(uv,t)) * 0.5;
    c.x -= n;
    c.y -= n * 2.0;
    c.z -= n;
    gl_FragColor = vec4(c,1.0);
}