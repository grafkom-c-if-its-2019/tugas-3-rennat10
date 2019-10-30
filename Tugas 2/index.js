(function(global) {
  var canvas, gl, program, program2;
  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
  
    window.addEventListener('resize', resizer);
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);

    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

    resizer();
  }

    function draw() {
    

    var thetaLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0.0;

    var scaleXLocation = gl.getUniformLocation(program2, 'scaleX');
    var scaleX = 1.0;
    var melebar = 1;

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.colorMask(true, true, true, true);
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      theta += 0.0103;
      gl.uniform1f(thetaLocation, theta);
      n = initBuffers(gl);
      if(n < 0) {
        console.log('Gagal untuk set posisi dari vertex');
        return;
      }
      gl.drawArrays(gl.LINE_STRIP, 0, n);
      var n2 = initBuffersCircle(gl, -0.5, -0.14, 0.2, 0.4);
      gl.drawArrays(gl.LINE_STRIP, 0, n2);

      gl.useProgram(program2);
      if (scaleX >= 1) melebar = -1;
      else if (scaleX <= -1) melebar = 1;
      scaleX += 0.0103 * melebar;
      gl.uniform1f(scaleXLocation, scaleX);

      var n3 = initBuffers2(gl);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n3);
       var n5 = initBuffers3(gl);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, n5);

      var n4 = initBuffersCircle(gl, +0.5, -0.14, 0.18, 0.36);
      gl.drawArrays(gl.LINE_STRIP, 0, n4);

      requestAnimationFrame(render);
    }
    render();

  }

  function initBuffersCircle(gl, x, y, x2, y2) {
    var circle = []
    var vertCount = 2;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
      console.log('Gagal membuat objek buffer');
      return -1;
    }
    for(var i = 0; i <= 360; i += 1) {
      j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.2 + x,
        Math.cos(j) * 0.4 + y
      ]

      var vert2 = [
        Math.sin(j) * x2 + x,
        Math.cos(j) * y2 + y
      ]
      circle = circle.concat(vert1);
      circle = circle.concat(vert2);
    }
    var n2 = circle.length / vertCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(circle), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if(aPosition < 0) {
      console.log('Gagal mendapatkan lokasi storage dari aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    return n2;
  }

  function initBuffers2() {
    var vertices = [];
    var vertCount = 2;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
      console.log('Gagal membuat objek buffer');
      return -1;
    }

    var vert5 = [
      -0.66 + 1.07, -0.27
    ]

    vertices = vertices.concat(vert5);

    for(var i = 270; i >= 180; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.61 + 1.07,
        Math.cos(j) * 0.08 - 0.27,
      ]
    
      var vert2 = [
        Math.sin(j) * 0.05 - 0.61 + 1.07,
        Math.cos(j) * 0.08 - 0.27,
      ]

      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert6 = [
      -0.5 + 1.07, -0.35
    ]

    vertices = vertices.concat(vert6);

    for(var i = 180; i >= 0; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.5 + 1.07,
        Math.cos(j) * 0.05 - 0.3,
      ]

      var vert2 = [
        Math.sin(j) * 0.05 - 0.5 + 1.07,
        Math.cos(j) * 0.05 - 0.3,
      ]
      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert3 = [
      -0.6 + 1.07, -0.25,
      -0.6 + 1.07, -0.11,
    ]

    vertices = vertices.concat(vert3);

    var vert4 = [
      -0.6 + 1.07, -0.01
    ]

    vertices = vertices.concat(vert4);
    for(var i = 90; i >= -90; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.03 - 0.63 + 1.07,
        Math.cos(j) * 0.04 + 0.08,
      ]
    
      var vert2 = [
        Math.sin(j) * 0.03 - 0.63 + 1.07,
        Math.cos(j) * 0.04 + 0.08,
      ]

      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    
    var n = vertices.length / vertCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if(aPosition < 0) {
      console.log('Gagal mendapatkan lokasi storage dari aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function initBuffers() {
    var vertices = [];
    var vertCount = 2;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
      console.log('Gagal membuat objek buffer');
      return -1;
    }

    for(var i = 180; i >= 0; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.5 + 0.07,
        Math.cos(j) * 0.05 - 0.3,
      ]

      var vert2 = [
        Math.sin(j) * 0.05 - 0.5 + 0.07,
        Math.cos(j) * 0.05 - 0.3,
      ]
      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert3 = [
      -0.6 + 0.07, -0.25,
      -0.6 + 0.07, -0.11,
    ]

    vertices = vertices.concat(vert3);

    for(var i = 180; i >= 0; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.5 + 0.07,
        Math.cos(j) * 0.05 - 0.06,
      ]

      var vert2 = [
        Math.sin(j) * 0.05 - 0.5 + 0.07,
        Math.cos(j) * 0.05 - 0.06,
      ]
      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert4 = [
      -0.6 + 0.07, -0.01
    ]

    vertices = vertices.concat(vert4);
    for(var i = 90; i >= -90; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.03 - 0.63 + 0.07,
        Math.cos(j) * 0.04 + 0.08,
      ]
    
      var vert2 = [
        Math.sin(j) * 0.03 - 0.63 + 0.07,
        Math.cos(j) * 0.04 + 0.08,
      ]

      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert5 = [
      -0.66 + 0.07, -0.27
    ]

    vertices = vertices.concat(vert5);

    for(var i = 270; i >= 180; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.61 + 0.07,
        Math.cos(j) * 0.08 - 0.27,
      ]
    
      var vert2 = [
        Math.sin(j) * 0.05 - 0.61 + 0.07,
        Math.cos(j) * 0.08 - 0.27,
      ]

      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }

    var vert6 = [
      -0.5 + 0.07, -0.35
    ]

    vertices = vertices.concat(vert6);
    var n = vertices.length / vertCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if(aPosition < 0) {
      console.log('Gagal mendapatkan lokasi storage dari aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    return n;
  }

  function initBuffers3() {
    var vertices = [];
    var vertCount = 2;
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
      console.log('Gagal membuat objek buffer');
      return -1;
    }

    for(var i = 180; i >= 0; i-=1) {
      var j = i * Math.PI / 180;
      var vert1 = [
        Math.sin(j) * 0.05 - 0.5 + 1.07,
        Math.cos(j) * 0.05 - 0.06,
      ]

      var vert2 = [
        Math.sin(j) * 0.05 - 0.5 + 1.07,
        Math.cos(j) * 0.05 - 0.06,
      ]
      vertices = vertices.concat(vert2);
      vertices = vertices.concat(vert1);

    }
    
    var vert3 = [
      -0.5 + 0.91, -0.01,
      -0.5 + 0.91, -0.11
    ]
    vertices = vertices.concat(vert3);

    var n5 = vertices.length / vertCount;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var aPosition = gl.getAttribLocation(program, 'aPosition');
    if(aPosition < 0) {
      console.log('Gagal mendapatkan lokasi storage dari aPosition');
      return -1;
    }

    gl.vertexAttribPointer(aPosition, vertCount, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    return n5;
  }
  
  function resizer() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    draw();
  }
  
})(window || this);