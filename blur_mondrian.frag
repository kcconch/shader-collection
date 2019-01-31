//https://github.com/michaelbromley/shader-playground/blob/47d73106378e650454adbd1df351b3b1732d458d/mondrian.glsl

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rectangle(in vec2 st, in vec2 origin, in vec2 dimensions) {
    float blur = 0.05;
    vec2 bl = smoothstep(origin-blur, origin+blur, st);
    float pct = bl.x * bl.y;
    vec2 tr = smoothstep(1.0 - origin - dimensions-blur, 1.0 - origin - dimensions + blur, 1.0 - st);
    pct *= tr.x * tr.y;
    return pct;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    color += rectangle(st, vec2(0.0, 0.0), vec2(0.2, 0.65));
    color += rectangle(st, vec2(0.22, 0.0), vec2(0.5, 0.1));
    color.b += rectangle(st, vec2(0.74, 0.0), vec2(0.2, 0.1));
    color.b += rectangle(st, vec2(0.96, 0.0), vec2(0.04, 0.1));
    color += rectangle(st, vec2(0.22, 0.12), vec2(0.5, 0.53));
    color += rectangle(st, vec2(0.74, 0.12), vec2(0.2, 0.53));
    color += rectangle(st, vec2(0.96, 0.12), vec2(0.04, 0.53));
    color.r += rectangle(st, vec2(0.0, 0.67), vec2(0.07, 0.17));
    color.r += rectangle(st, vec2(0.09, 0.67), vec2(0.11, 0.17));
    color += rectangle(st, vec2(0.22, 0.67), vec2(0.5, 0.17));
    color += rectangle(st, vec2(0.74, 0.67), vec2(0.2, 0.17));
    color.rg += vec2(rectangle(st, vec2(0.96, 0.67), vec2(0.04, 0.17)));
    color.r += rectangle(st, vec2(0.0, 0.86), vec2(0.07, 0.17));
    color.r += rectangle(st, vec2(0.09, 0.86), vec2(0.11, 0.17));
    color += rectangle(st, vec2(0.22, 0.86), vec2(0.5, 0.17));
    color += rectangle(st, vec2(0.74, 0.86), vec2(0.2, 0.17));
    color.rg += vec2(rectangle(st, vec2(0.96, 0.86), vec2(0.04, 0.17)));

    gl_FragColor = vec4(color, 1.0);
}
