import { mat4 } from 'gl-matrix';

const cameraInfo = {
   azimuthal: 0,
   polar: 0,
   zoom: 0,
};

const setAzimuthal = (value: number): void => {
   cameraInfo.azimuthal = value;
};

const setPolar = (value: number): void => {
   cameraInfo.polar = value;
};

const setZoom = (value: number): void => {
   cameraInfo.zoom = value;
};

const incrementAzimuthal = (value: number): void => {
   cameraInfo.azimuthal += value;
};

const incrementPolar = (value: number): void => {
   cameraInfo.polar += value;
};

const incrementZoom = (value: number): void => {
   cameraInfo.zoom += value;
};

const resetCamera = (): void => {
   cameraInfo.azimuthal = 0;
   cameraInfo.polar = 0;
   cameraInfo.zoom = 0;
};

// ---
interface ProjectionMatrixOptions {
   zNear?: number;
   zFar?: number;
   fov?: number;
}
const defaultOptions: ProjectionMatrixOptions = {
   zNear: 0.1,
   zFar: 100.0,
   fov: Math.PI * (45 / 180), // 45 degree fov
};

const getProjectionMatrix = (
   width: number,
   height: number,
   {
      zNear = defaultOptions['zNear'],
      zFar = defaultOptions['zFar'],
      fov = defaultOptions['fov'],
   } = defaultOptions
): mat4 => {
   const aspect = width / height;
   return mat4.perspective(mat4.create(), fov!, aspect, zNear!, zFar!);
};

const getModelViewMatrix = (): mat4 => {
   const { azimuthal, polar, zoom } = cameraInfo;

   const modelViewMatrix = mat4.create();
   mat4.translate(modelViewMatrix, modelViewMatrix, [0, 0, zoom]);
   mat4.rotate(modelViewMatrix, modelViewMatrix, azimuthal, [0, 1, 0]);
   mat4.rotate(modelViewMatrix, modelViewMatrix, polar, [
      Math.cos(azimuthal),
      0,
      Math.sin(azimuthal),
   ]);

   return modelViewMatrix;
};

const getEyePosition = (modelViewMatrix: mat4): Float32Array | number[] => {
   const invertedView = mat4.invert(mat4.create(), modelViewMatrix);
   return invertedView.slice(12, 15);
};

// ---
export const camera = {
   getProjectionMatrix,
   getModelViewMatrix,
   getEyePosition,
   setAzimuthal,
   setPolar,
   setZoom,
   incrementAzimuthal,
   incrementPolar,
   incrementZoom,
   resetCamera,
};
