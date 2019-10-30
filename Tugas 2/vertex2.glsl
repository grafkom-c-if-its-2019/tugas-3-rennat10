precision mediump float;

attribute vec2 aPosition;
uniform float scaleX;

void main() {
  
  mat4 scale = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0 , 1.0
  );
  gl_Position = (vec4(aPosition, 0.0, 1.0) - vec4(0.5, 0.14, 0.0, 0.0)) * scale + vec4(0.5, 0.0, 0.0, 0.0);
}
