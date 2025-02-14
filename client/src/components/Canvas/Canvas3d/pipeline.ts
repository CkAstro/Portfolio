import { mat4, vec3 } from 'gl-matrix';

type QueueCameraFunction = (camera: CameraInfo) => void;
const queue: (() => void)[] = [];
const idQueue = new Set<string>();

const addToQueue = (id: string, fn: () => void): void => {
   if (idQueue.has(id)) return;
   idQueue.add(id);
   queue.push(fn);
};

const runQueue = (): void => {
   while (queue.length > 0) queue.shift()!();
   idQueue.clear();
};

export const pipeline = {
   runQueue,
};

// ---
type QueueViewportFunction = (projection: mat4) => void;
const viewportInfo = {
   width: 1,
   height: 1,
   fov: 45,
   zNear: 0.1,
   zFar: 0.1,
   projection: mat4.create(),
   onUpdate: (() => undefined) as QueueViewportFunction,
};

const setOnUpdate = (fn: QueueViewportFunction): void => {
   viewportInfo.onUpdate = fn;
};

const updateProjectionMatrix = (): void => {
   const aspect = viewportInfo.width / viewportInfo.height;
   viewportInfo.projection = mat4.perspective(
      viewportInfo.projection,
      viewportInfo.fov,
      aspect,
      viewportInfo.zNear,
      viewportInfo.zFar
   );

   viewportInfo.onUpdate(viewportInfo.projection);
};

const updateViewport = ({
   width = viewportInfo.width,
   height = viewportInfo.height,
   fov = viewportInfo.fov,
   zNear = viewportInfo.zNear,
   zFar = viewportInfo.zFar,
}: Partial<typeof viewportInfo>): void => {
   let update = false;
   if (width !== viewportInfo.width) {
      update = true;
      viewportInfo.width = width;
   }
   if (height !== viewportInfo.height) {
      update = true;
      viewportInfo.height = height;
   }

   if (fov !== viewportInfo.fov) {
      update = true;
      viewportInfo.fov = fov;
   }

   if (zNear !== viewportInfo.zNear) {
      update = true;
      viewportInfo.zNear = zNear;
   }

   if (zFar !== viewportInfo.zFar) {
      update = true;
      viewportInfo.zFar = zFar;
   }

   if (update) addToQueue('viewport', updateProjectionMatrix);
};

export const viewport = {
   setOnUpdate,
   updateViewport,
};

// ---
const cameraInfo = {
   angles: { azimuthal: 0, polar: 0, zoom: 0 },
   // origin: { x: 0, y: 0, z: 0 },
   projection: mat4.create(),
   modelView: mat4.create(),
   eyePos: vec3.create(),
   onQueue: (() => undefined) as QueueCameraFunction,
   hasUpdate: false,
};

export type CameraInfo = typeof cameraInfo;

const resetCamera = (): void => {
   cameraInfo.angles = { azimuthal: 0, polar: 0, zoom: 0 };
   // cameraInfo.origin = { x: 0, y: 0, z: 0 };
   cameraInfo.projection = mat4.create();
   cameraInfo.modelView = mat4.create();
   cameraInfo.eyePos = vec3.create();
   cameraInfo.onQueue = (): void => undefined;
   cameraInfo.hasUpdate = false;
};

const setProjectionMatrix = (
   width: number,
   height: number,
   fov: number,
   zNear: number,
   zFar: number,
   callback: (projectionMatrix: mat4) => void
): void => {
   const aspect = width / height;
   cameraInfo.projection = mat4.perspective(cameraInfo.projection, fov, aspect, zNear, zFar);

   callback(cameraInfo.projection);
};

const setOnQueue = (fn: QueueCameraFunction): void => {
   cameraInfo.onQueue = fn;
};

const updateCameraMatrices = (): void => {
   const { azimuthal, polar, zoom } = cameraInfo.angles;
   // const { x, y, z } = cameraInfo.origin;

   mat4.translate(cameraInfo.modelView, mat4.create(), [0, 0, zoom]);
   mat4.rotate(cameraInfo.modelView, cameraInfo.modelView, azimuthal, [0, 1, 0]);
   mat4.rotate(cameraInfo.modelView, cameraInfo.modelView, polar, [
      Math.cos(azimuthal),
      0,
      Math.sin(azimuthal),
   ]);
   // mat4.translate(cameraInfo.modelView, cameraInfo.modelView, [x, y, z]);

   cameraInfo.eyePos = vec3.fromValues(
      zoom * Math.cos(polar) * Math.sin(azimuthal),
      -zoom * Math.sin(polar),
      -zoom * Math.cos(polar) * Math.cos(azimuthal)
   );
};

const queueCamera = (): void => {
   addToQueue('camera', () => {
      updateCameraMatrices();
      cameraInfo.onQueue(cameraInfo);
   });
};

const setAzimuthal = (value: number): void => {
   if (value === cameraInfo.angles.azimuthal) return;

   cameraInfo.angles.azimuthal = value;
   queueCamera();
};

const setPolar = (value: number): void => {
   if (value === cameraInfo.angles.polar) return;

   cameraInfo.angles.polar = value;
   queueCamera();
};

const setZoom = (value: number): void => {
   if (value === cameraInfo.angles.zoom) return;

   cameraInfo.angles.zoom = value;
   queueCamera();
};

export const camera = {
   resetCamera,
   setProjectionMatrix,
   setOnQueue,
   setAzimuthal,
   setPolar,
   setZoom,
};

// ---
const animationInfo = {
   frameCount: 1,
   stepsPerFrame: 4,
   currentFrame: -1,
   onFrameUpdate: (_frame: number): void => undefined,
   lastFrame: 0,
};

const resetAnimator = (): void => {
   animationInfo.frameCount = 1;
   animationInfo.stepsPerFrame = 4;
   animationInfo.currentFrame = -1;
   animationInfo.onFrameUpdate = (_frame: number): void => undefined;
   animationInfo.lastFrame = 0;
};

const setFrameCount = (value: number): void => {
   animationInfo.frameCount = value;
};

const setStepsPerFrame = (value: number): void => {
   animationInfo.stepsPerFrame = 1000 / value;
};

const setOnFrameUpdate = (fn: (frame: number) => void): void => {
   animationInfo.onFrameUpdate = fn;
};

const increment = (): void => {
   animationInfo.lastFrame++;
   if (animationInfo.lastFrame < animationInfo.stepsPerFrame) return;

   animationInfo.lastFrame = 0;

   animationInfo.currentFrame++;
   if (animationInfo.currentFrame >= animationInfo.frameCount) animationInfo.currentFrame = 0;
   animationInfo.onFrameUpdate(animationInfo.currentFrame);
};

export const animator = {
   resetAnimator,
   setFrameCount,
   setStepsPerFrame,
   setOnFrameUpdate,
   increment,
};
