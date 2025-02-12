const verifyShaderCreationStatus = (
   gl: WebGLRenderingContext,
   shader: WebGLShader | null
): shader is WebGLShader => {
   if (shader === null) return false;

   const status = gl.getShaderParameter(shader, gl.COMPILE_STATUS) as unknown;
   if (status === undefined || status === null) return false;

   return true;
};

const verifyProgramLinkStatus = (
   gl: WebGL2RenderingContext,
   program: WebGLProgram | null
): program is WebGLProgram => {
   if (program === null) return false;

   const status = gl.getProgramParameter(program, gl.LINK_STATUS) as unknown;
   if (status === undefined || status === null) return false;

   return true;
};

export const createShaderProgram = (
   gl: WebGL2RenderingContext,
   vsSource: string,
   fsSource: string
): WebGLProgram => {
   const vertexShader = gl.createShader(gl.VERTEX_SHADER);
   if (!verifyShaderCreationStatus(gl, vertexShader))
      throw new Error(`failed to compile vertex shader`);
   const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   if (!verifyShaderCreationStatus(gl, fragmentShader))
      throw new Error(`failed to compile fragment shader`);

   // compile shaders
   gl.shaderSource(vertexShader, vsSource);
   gl.compileShader(vertexShader);

   gl.shaderSource(fragmentShader, fsSource);
   gl.compileShader(fragmentShader);

   // and link
   const program = gl.createProgram();
   if (!verifyProgramLinkStatus(gl, program)) throw new Error(`failed to create shader program`);
   gl.attachShader(program, vertexShader);
   gl.attachShader(program, fragmentShader);
   gl.linkProgram(program);

   return program;
};
