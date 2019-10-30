precision mediump float;

attribute vec2 aPosition;
uniform float theta;

void main() {
  
  mat4 rotate = mat4(
    cos(theta), -sin(theta), 0.0, 0.5 * cos(theta) - 0.5,
    sin(theta), cos(theta), 0.0, 0.5 * sin(theta) - 0.14,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  gl_Position = vec4(aPosition, 0.0, 1.0) * rotate;
}
