// cspell:words logdx

const loadVolumetricTexture = async (
   gl: WebGL2RenderingContext,
   imageUri: string,
   callback: (texture: WebGLTexture) => void
): Promise<void> => {
   const texture = gl.createTexture();

   const jvMin = -31.0;
   const jvMax = -9.010531;
   const kvMin = -9.660855;
   const kvMax = 20.051066;
   const logdx = 15.355365;

   const image = new Image();
   image.onload = (): void => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) throw new Error();
      ctx.drawImage(image, 0, 0);

      let volRes;
      if (image.width === image.height) {
         const guess = image.width ** (2 / 3);
         if (Math.abs(guess - Math.round(guess)) < 0.1) volRes = Math.round(guess);
      }
      if (volRes === undefined)
         throw new Error('non-pow(2)**3 image dimensions not yet accounted for');

      // init 3D texture
      gl.bindTexture(gl.TEXTURE_3D, texture);
      gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RG32F, volRes, volRes, volRes);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // loop through image and fill texture
      let sliceCount = Math.floor(volRes ** 0.5);
      if (volRes % sliceCount !== 0) sliceCount += 1; // add one if not perfect square
      const dataBuffer = new Float32Array(2 * volRes * volRes * volRes);
      for (let k = 0; k < volRes; k++) {
         // grab each slice, scale, and add to dataBuffer
         const x = k % sliceCount;
         const y = Math.floor(k / sliceCount);
         const img = ctx.getImageData(x * volRes, y * volRes, volRes, volRes);

         for (let j = 0; j < volRes; j++) {
            for (let i = 0; i < volRes; i++) {
               const jvExp =
                  (img.data[4 * j * volRes + 4 * i + 0] / 255.0) * (jvMax - jvMin) + jvMin + logdx;
               const kvExp =
                  (img.data[4 * j * volRes + 4 * i + 1] / 255.0) * (kvMax - kvMin) + kvMin + logdx;
               dataBuffer[2 * k * volRes * volRes + 2 * j * volRes + 2 * i + 0] = 10.0 ** jvExp;
               dataBuffer[2 * k * volRes * volRes + 2 * j * volRes + 2 * i + 1] = 10.0 ** kvExp;
            }
         }
      }

      // add to texture layer by layer
      gl.texSubImage3D(
         gl.TEXTURE_3D,
         0,
         0,
         0,
         0,
         volRes,
         volRes,
         volRes,
         gl.RG,
         gl.FLOAT,
         dataBuffer
      );

      console.log('tex init');
      callback(texture);
   };
   image.crossOrigin = '';
   image.src = imageUri;

   return Promise.resolve();
};

const loadVolumetricImageTexture = async (
   gl: WebGL2RenderingContext,
   imageUri: string,
   callback?: (texture: WebGLTexture) => void
): Promise<void> => {
   const texture = gl.createTexture();

   const image = new Image();
   image.onload = (): void => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) throw new Error();
      ctx.drawImage(image, 0, 0);

      let volRes;
      if (image.width === image.height) {
         const guess = image.width ** (2.0 / 3.0);
         if (Math.abs(guess - Math.round(guess)) < 0.1) volRes = Math.round(guess);
      }
      if (volRes === undefined) {
         console.error('non-pow(2)**3 image dimensions not yet accounted for');
         return;
      }

      // init 3D texture
      gl.bindTexture(gl.TEXTURE_3D, texture);
      gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA32F, volRes, volRes, volRes);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // loop through image and fill texture
      let sliceCount = Math.floor(volRes ** 0.5);
      if (volRes % sliceCount !== 0) sliceCount += 1; // add one if not perfect square
      const dataBuffer = new Float32Array(4 * volRes * volRes * volRes);
      for (let k = 0; k < volRes; k++) {
         // grab each slice, scale, and add to dataBuffer
         const x = k % sliceCount;
         const y = Math.floor(k / sliceCount);
         const img = ctx.getImageData(x * volRes, y * volRes, volRes, volRes);

         for (let j = 0; j < volRes; j++) {
            for (let i = 0; i < volRes; i++) {
               for (let n = 0; n < 3; n++) {
                  // NOTE, this is (j,i,k) instead of (k,i,j) to re-orient incorrect images
                  dataBuffer[4 * j * volRes * volRes + 4 * i * volRes + 4 * k + n] =
                     img.data[4 * j * volRes + 4 * i + n] / 255.0;
               }
            }
         }
      }

      // add to texture layer by layer
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false); // not sure why this turns on...
      gl.texSubImage3D(
         gl.TEXTURE_3D,
         0,
         0,
         0,
         0,
         volRes,
         volRes,
         volRes,
         gl.RGBA,
         gl.FLOAT,
         dataBuffer
      );
      if (callback !== undefined) callback(texture);
   };
   image.crossOrigin = '';
   image.src = imageUri;

   return Promise.resolve();
};

const __loadVolumetricImageTexture = async (
   gl: WebGL2RenderingContext,
   imageUri: string,
   callback?: (texture: WebGLTexture) => void
): Promise<void> => {
   const texture = gl.createTexture();

   const image = new Image();
   image.onload = (): void => {
      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (ctx === null) throw new Error();
      ctx.drawImage(image, 0, 0);

      let volRes;
      if (image.width === image.height) {
         const guess = image.width ** (2 / 3);
         if (Math.abs(guess - Math.round(guess)) < 0.1) volRes = Math.round(guess);
      }
      if (volRes === undefined)
         throw new Error('non-pow(2)**3 image dimensions not yet accounted for');

      // init 3D texture
      gl.bindTexture(gl.TEXTURE_3D, texture);
      gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RG32F, volRes, volRes, volRes);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      // loop through image and fill texture
      let sliceCount = Math.floor(volRes ** 0.5);
      if (volRes % sliceCount !== 0) sliceCount += 1; // add one if not perfect square
      const dataBuffer = new Float32Array(2 * volRes * volRes * volRes);
      for (let k = 0; k < volRes; k++) {
         // grab each slice, scale, and add to dataBuffer
         const x = k % sliceCount;
         const y = Math.floor(k / sliceCount);
         const img = ctx.getImageData(x * volRes, y * volRes, volRes, volRes);

         for (let j = 0; j < volRes; j++) {
            for (let i = 0; i < volRes; i++) {
               dataBuffer[2 * k * volRes * volRes + 2 * j * volRes + 2 * i + 0] =
                  img.data[4 * j * volRes + 4 * i + 0] / 255.0;
            }
         }
      }

      // add to texture layer by layer
      gl.texSubImage3D(
         gl.TEXTURE_3D,
         0,
         0,
         0,
         0,
         volRes,
         volRes,
         volRes,
         gl.RG,
         gl.FLOAT,
         dataBuffer
      );

      console.log('tex init');
      if (callback !== undefined) callback(texture);
   };
   image.crossOrigin = '';
   image.src = imageUri;

   return Promise.resolve();
};

const loadImageTexture = async (
   gl: WebGL2RenderingContext,
   imageUri: string,
   callback?: (texture: WebGLTexture) => void
): Promise<void> => {
   const texture = gl.createTexture();

   const image = new Image();
   image.onload = (): void => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl['CLAMP_TO_EDGE']);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl['CLAMP_TO_EDGE']);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl['LINEAR']);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl['LINEAR']);

      if (callback !== undefined) callback(texture);
   };

   image.crossOrigin = '';
   image.src = imageUri;

   return Promise.resolve();
};

export const texture = {
   loadVolumetricTexture,
   loadVolumetricImageTexture,
   loadImageTexture,
};
