uniform sampler2D texturePosition;
uniform sampler2D textureVelocity;
uniform vec2 resolution;

void main() {
    if(gl_FragCoord.x <= 1.0){
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec3 pos = texture2D( texturePosition, uv ).xyz;
        vec3 vel = texture2D( textureVelocity, uv ).xyz;

        pos += vel * 0.01;
        gl_FragColor = vec4(pos,1.0);
        
    }else{
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        vec2 bUV = (gl_FragCoord.xy - vec2(1.0,0.0)) / resolution.xy;
        vec3 bPos = texture2D( texturePosition, bUV ).xyz;;
        gl_FragColor = vec4(bPos,1.0);
    }
}