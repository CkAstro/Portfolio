import { api } from '@/api';
import { primitives, textureLoader, createShaderProgram } from '@/components/Canvas/Canvas3d';
import { animator, camera, pipeline, viewport } from '@/components/Canvas/Canvas3d/pipeline';
import { volumeShader } from './shader';

const glStatus = {
   isInit: false,
   lastGl: null as WebGL2RenderingContext | null,
   dataLoading: false,
   holdFrame: false,
};

const isNotInit = (gl: WebGL2RenderingContext | null): boolean => {
   return !glStatus.isInit || glStatus.lastGl !== gl;
};

const hasActiveHold = (): boolean => glStatus.dataLoading || glStatus.holdFrame;

const cuboid = {
   vertices: new Float32Array(primitives.cube.vertices),
   texCoords: new Float32Array(primitives.cube.texCoords),
   indices: new Uint16Array(primitives.cube.indices),
};

const uniforms = [
   'uProjectionMatrix',
   'uModelViewMatrix',
   'uResolution',
   'volumeData',
   'colorMap',
   'uEyePos',
];
const uniformLocations: { [uniform: string]: WebGLUniformLocation } = {};

const attributes = ['aPosition'];
const attributeLocations: { [attribute: string]: number } = {};

const textures: { [frame: number]: WebGLTexture } = {};
const programs: { [program: string]: WebGLProgram } = {};

const initWebGL = (gl: WebGL2RenderingContext): void => {
   if (hasActiveHold()) return;
   glStatus.holdFrame = true;

   programs['volumeShader'] = createShaderProgram(gl, volumeShader.vsSource, volumeShader.fsSource);
   gl.useProgram(programs['volumeShader']);

   uniforms.forEach((uniform) => {
      const location = gl.getUniformLocation(programs['volumeShader'], uniform);
      if (location === null)
         console.warn(
            `property ${uniform} likely does not exist on shader and could not be added.`
         );
      else uniformLocations[uniform] = location;
   });

   attributes.forEach((attribute) => {
      const location = gl.getAttribLocation(programs['volumeShader'], attribute);
      if (location === -1)
         console.warn(
            `property ${attribute} likely does not exist on shader and could not be added.`
         );
      else attributeLocations[attribute] = location;
   });

   const { width, height } = gl.canvas;
   viewport.setOnUpdate((p) => {
      console.log('updating');
      gl.uniformMatrix4fv(uniformLocations['uProjectionMatrix'], false, p);
   });
   viewport.updateViewport({ width, height, fov: 45, zNear: 0.1, zFar: 100 });
   camera.setOnQueue(({ modelView, eyePos }) => {
      gl.uniformMatrix4fv(uniformLocations['uModelViewMatrix'], false, modelView);
      gl.uniform3fv(uniformLocations['uEyePos'], eyePos);
   });

   const arrayBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, cuboid.vertices, gl.STATIC_DRAW);
   gl.enableVertexAttribArray(attributeLocations['aPosition']);
   gl.vertexAttribPointer(
      attributeLocations['aPosition'],
      volumeShader.model['aPosition'].size,
      gl.FLOAT,
      false,
      0,
      0
   );

   const indexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, cuboid.indices, gl.STATIC_DRAW);

   const getDataUrl = (n: number): string =>
      api.getUrl(`textures/instability/instability_64__${n.toString().padStart(2, '0')}.png`);
   const cmapUrl = api.getUrl('textures/instability/instability_cmap.png');

   textureLoader
      .loadImageTexture(gl, cmapUrl, (texture) => {
         gl.activeTexture(gl.TEXTURE1);
         gl.bindTexture(gl.TEXTURE_2D, texture);
         gl.uniform1i(uniformLocations['colorMap'], 1);
      })
      .catch(() => console.warn('unable to load color map'));

   glStatus.dataLoading = true;
   const frames = Array.from({ length: 41 }, (_, i) => i);
   frames.forEach((frame, index) => {
      textureLoader
         .loadVolumetricImageTexture2(gl, getDataUrl(frame), (texture) => {
            textures[index] = texture;
            if (index === frames.length - 1) glStatus.dataLoading = false;
         })
         .catch(() => console.warn('unable to load volume texture'));
   });
   gl.uniform1f(uniformLocations['uResolution'], 2 * 64);

   // ---
   animator.resetAnimator();
   animator.setFrameCount(41);
   animator.setOnFrameUpdate((f) => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_3D, textures[f]);
      gl.uniform1i(uniformLocations['volumeData'], 0);
   });

   // ---
   pipeline.runQueue();
   gl.clearColor(0, 0, 0, 1);
   gl.enable(gl.DEPTH_TEST);
   gl.depthFunc(gl.LEQUAL);

   // ---
   glStatus.lastGl = gl;
   glStatus.isInit = true;
   glStatus.holdFrame = false;
};

type DrawTrigger = Partial<{ [property: string]: number }>;
export const renderFrame = (gl: WebGL2RenderingContext | null, options: DrawTrigger): void => {
   if (gl === null) return;
   if (isNotInit(gl)) initWebGL(gl);
   if (hasActiveHold()) return;

   const { width, height } = gl.canvas;
   viewport.updateViewport({ width, height });

   camera.setZoom(options.zoom ?? -4);
   camera.setAzimuthal(options.azimuthal ?? 0);
   camera.setPolar(options.polar ?? 0);

   // --- render loop
   pipeline.runQueue();
   animator.increment();

   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
};
