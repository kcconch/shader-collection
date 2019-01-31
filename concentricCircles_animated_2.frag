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

	vec2 st = (gl_FragCoord.xy/u_resolution*2.0)-0.5;
    float pct = 0.0;

    float stime = abs(sin(u_time));
    float ctime = abs(cos(u_time));


    // a. The DISTANCE from the pixel to the center
    pct =
        min(concentricCircles(st,vec2(0.2,0.5), 10.0, 30.0*stime) , 			concentricCircles(st,vec2(0.8,0.5), 10.0, 30.0*ctime));

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

    float cScale = 1.0;

    vec3 color = vec3(pct*stime*cScale,pct*sqrt(ctime*stime)*cScale,pct*ctime*cScale);

	gl_FragColor = vec4( color*4.0, 1.0 );
}
