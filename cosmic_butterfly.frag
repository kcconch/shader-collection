// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.05, pct, st.y) -
          smoothstep( pct, pct+0.05, st.y);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float smove = sin(u_time)*3.0;
    float cmove = cos(u_time)*3.0;

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y*smove,pos.x*cmove);

    float f = cos(a*3.*smove);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    f = abs(sin(a*15.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    float pct = plot(st,st.x+f) + plot(st,st.x-f) + plot(st+f,st.x) + plot(st-f,st.x) ;

    vec3 color = vec3( cmove-smoothstep(f,f+0.02,r), cmove-smoothstep(f,f+0.02,r), smove-smoothstep(f,f+0.02,r)/2.0 );
    color = (1.0-pct)*color+pct*vec3(f,f*smove,f*cmove);

    gl_FragColor = vec4(color, 1.0);
}
