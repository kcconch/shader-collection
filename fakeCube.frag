#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Reference to
// http://thndl.com/square-shaped-shaders.html

float dField (vec2 st, int N, float angle) {

  // Angle and radius from the current pixel
  float a = atan(st.x,st.y)+PI*angle;
  float r = TWO_PI/float(N);
  // Shaping function that modulate the distance
  float d = cos(floor(.5+a/r)*r-a)*length(st);
  return d;

}

void main(){
  float d = 0.0;
  float f = 0.0;
  float df = 0.0;

  float cTime = cos(u_time);
  float sTime = sin(u_time);

  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  vec3 color = vec3(0.0);

  // Remap the space to -1. to 1.
  st = st *2.-1.;

  // Number of sides of your shape
  int N = 3;

  d = dField(st, N, cTime);
  f = dField(st, N, sTime);
  df = max(d,f);

  color = vec3(1.0-smoothstep(.4,.41,df), 1.0-smoothstep(.4,.41,df), df*sTime );
  // color = vec3(d);

  gl_FragColor = vec4(color,1.0);
}
