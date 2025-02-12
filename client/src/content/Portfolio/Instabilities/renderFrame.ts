import { api } from '@/api';
import { camera, shader, primitives } from '@/components/Canvas/Canvas3d';
import { emission } from './shader';
import type { mat4 } from 'gl-matrix';

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

const initWebGL = (gl: WebGL2RenderingContext): void => {
   if (hasActiveHold()) return;
   glStatus.holdFrame = true;

   // init camera
   camera.resetCamera();
   camera.setZoom(-4);
   camera.setAzimuthal(0);
   camera.setPolar(0);
   const { width, height } = gl.canvas;
   const projectionMatrix = camera.getProjectionMatrix(width, height);
   const modelViewMatrix = camera.getModelViewMatrix();
   const eyePos = camera.getEyePosition(modelViewMatrix);

   // init shader
   shader.clearBufferStore();
   shader.clearShaderStore();
   shader.clearModelStore();
   shader.clearMaterialStore();

   shader.registerShaderProgram(gl, 'emission', emission);
   shader.setMaterialProperties('emissionMaterial', {
      uProjectionMatrix: projectionMatrix,
      uModelViewMatrix: modelViewMatrix,
      // uResolution: [256, 256, 256],
      uResolution: [64],
      // uHideCSM: [1.0],
      uEyePos: eyePos,
      // nu: [10 ** 9.5],
   });
   shader.setModelProperties(gl, 'emissionModel', {
      aPosition: cuboid.vertices,
      indices: cuboid.indices,
   });

   // init textures
   const dataUrl = api.getUrl('textures/instability/instability_64__25.png');
   // const cmapUrl = api.getUrl('textures/emission/emission_cmap.png');
   const cmapUrl = api.getUrl('textures/instability/instability_cmap.png');

   glStatus.dataLoading = true;
   shader.createImageTextureBuffer(gl, 'cmap', cmapUrl);
   shader.createVolumetricTextureBuffer(gl, 'data', dataUrl, (err) => {
      if (!err) glStatus.dataLoading = false;
   });

   glStatus.lastGl = gl;
   glStatus.isInit = true;
   glStatus.holdFrame = false;
};

const renderSomething = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   updates: {
      material?: { [property: string]: number[] | mat4 };
      texture?: { [texture: string]: string };
      model?: { [property: string]: number[] | Float32Array | Uint16Array };
   }
): void => {
   const {
      material: materialUpdates = {},
      texture: textureUpdates = {},
      model: modelUpdates = {},
   } = updates;

   shader.useShader(gl, shaderName);
   shader.setMaterialProperties(`${shaderName}Material`, materialUpdates);
   shader.activateMaterial(gl, shaderName, textureUpdates);
   shader.setModelProperties(gl, `${shaderName}Model`, modelUpdates);
   shader.activateModel(gl, shaderName);

   const nTriangles = 36;
   gl.drawElements(gl.TRIANGLES, nTriangles, gl.UNSIGNED_SHORT, 0);
};

type DrawTrigger = Partial<{ [property: string]: number }>;
export const renderFrame = (gl: WebGL2RenderingContext | null, options: DrawTrigger): void => {
   if (gl === null) return;
   if (isNotInit(gl)) initWebGL(gl);
   if (hasActiveHold()) return;

   camera.setZoom(options.zoom ?? -4);
   camera.setAzimuthal(options.azimuthal ?? 0);
   camera.setPolar(options.polar ?? 0);
   const uModelViewMatrix = camera.getModelViewMatrix();
   const uEyePos = camera.getEyePosition(uModelViewMatrix);

   shader.renderPipelineItem(gl, '', (): void =>
      renderSomething(gl, 'emission', {
         material: { uModelViewMatrix, uEyePos },
         texture: { volumeData: 'data', colorMap: 'cmap' },
      })
   );
};
