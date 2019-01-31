// Author @patriciogv - 2015

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,
                        _size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float cross(in vec2 _st, float _size){
    return  box(_st, vec2(_size,_size/8.)) +
            box(_st, vec2(_size/8.,_size));
}

vec2 tile(in vec2 _st, in float _scale) {
    _st *= _scale; // Scale up the space by 3
    _st = fract(_st); // Wrap around 1.0
    return _st;
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);
    float scale = 5.0;

    float col = floor(st.x * scale);
    float col2 = floor(st.x * scale + 1.0);
    float row = floor(st.y * scale);
    float loc = mod(col+row, 2.0);
    float loc2 = mod(col2+row, 2.0);

    st = tile(st, scale);



    // Now we have 3 spaces that goes from 0-1

    color = vec3(st,loc);
    color = vec3(circle(st,0.5)*loc);
    color += vec3(cross(st,0.5)*loc2);

	gl_FragColor = vec4(color,1.0);
}
