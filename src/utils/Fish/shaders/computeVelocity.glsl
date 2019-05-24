uniform float time;
uniform float seed;

$noise4D;

void main() {
    if(gl_FragCoord.x >= 1.0) return;    
    
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec3 pos = texture2D( texturePosition, uv ).xyz;
    vec3 vel = texture2D( textureVelocity, uv ).xyz;
    float idParticle = uv.y * resolution.x + uv.x;
    float scale = 0.08;
    
    vel.xyz += 40.0 * vec3(
      snoise( vec4( scale * pos.xyz, 7.225 * seed * 200.0 + 0.4 * time ) ),
      snoise( vec4( scale * pos.xyz, 3.553 * seed + 0.4 * time ) ),
      snoise( vec4( scale * pos.xyz, 1.259 * seed * 10.0 + 0.4 * time ) )
    ) * 0.05;

    vec3 gpos = pos - vec3(0.0,0.0,0.0);
    vel += -(gpos)* length(gpos) * 0.005;

    vel.xyz *= 0.9 + abs(sin(uv.y * 9.0)) * 0.05;

    gl_FragColor = vec4( vel.xyz, 1.0 );
}