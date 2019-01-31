// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float concentricCircles(in vec2 st, in vec2 radius, in float resolution, in float scale) {
    float dist = distance(st,radius);
    float pct = floor(dist*resolution)/scale;
    return pct;
}

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct =
        concentricCircles(st,vec2(0.2,0.5), 10.0, 30.0) +
        concentricCircles(st,vec2(0.8,0.5), 10.0, 30.0);

    // b. The LENGTH of the vector
    //    from the pixel to the center
    // vec2 toCenter = vec2(0.5)-st;
    // pct = length(toCenter);

    // c. The SQUARE ROOT of the vector
    //    from the pixel to the center
    // vec2 tC = vec2(0.5)-st;
    // pct = sqrt(tC.x*tC.x+tC.y*tC.y);

	// pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
	// pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
	// pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
	// pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));

    vec3 color = vec3(pct*2.5,0.5,pct*2.0);

	gl_FragColor = vec4( color, 1.0 );
}
