// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float pixelArtBorder (vec2 st, float scale, float vignette) {
    // bottom-left
    vec2 bl = floor(st*scale);
    float pct = bl.x * bl.y;

    // top-right
    vec2 tr = floor((1.0-st)*scale);
    pct *= tr.x * tr.y;
    pct = pct/(scale*vignette);
   	return pct;
}


void main(){
    vec2 st =  gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.0);

    float pct = pixelArtBorder(st, 50.0, 1000.0);

    color = vec3(pct);

    gl_FragColor = vec4(pct*0.4,pct*0.2,0.0,1.0);
}
