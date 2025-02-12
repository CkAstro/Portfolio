import { texture } from '@/components/Canvas/Canvas3d/textures';
import { createShaderProgram } from './createShaderProgram';
import type { mat4 } from 'gl-matrix';

let frame = 0;
const debug = false;
const glUniform1f = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform1f', arg);
   if (frame < 2) gl.uniform1f(l, v);
};
const glUniform1i = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform1i', arg);
   if (frame < 2) gl.uniform1i(l, v);
};
const glUniform2f = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v1: number,
   v2: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform2f', arg);
   if (frame < 2) gl.uniform2f(l, v1, v2);
};
const glUniform2i = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v1: number,
   v2: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform2i', arg);
   if (frame < 2) gl.uniform2i(l, v1, v2);
};
const glUniform2fv = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v: number[] | mat4,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform2fv', arg);
   if (frame < 2) gl.uniform2fv(l, v);
};
const glUniform3fv = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v: number[] | mat4,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform3fv', arg);
   // if (frame < 2) gl.uniform3fv(l, v);
   gl.uniform3fv(l, v);
};
const glUniform4fv = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   v: number[] | mat4,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniform4fv', arg);
   if (frame < 2) gl.uniform4fv(l, v);
};
const glUniformMatrix4fv = (
   gl: WebGL2RenderingContext,
   l: WebGLUniformLocation,
   t: boolean,
   v: number[] | mat4,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.uniformMatrix4fv', arg);
   // if (frame < 2) gl.uniformMatrix4fv(l, t, v);
   gl.uniformMatrix4fv(l, t, v);
};

const glActiveTexture = (gl: WebGL2RenderingContext, t: number, arg: string): void => {
   if (debug && frame < 5) console.log('gl.activeTexture', arg);
   gl.activeTexture(t);
};
const glGetAttribLocation = (
   gl: WebGL2RenderingContext,
   p: WebGLProgram,
   a: string,
   arg: string
): number => {
   if (debug && frame < 5) console.log('gl.getAttribLocation', arg);
   if (frame < 2) return gl.getAttribLocation(p, a);
   return gl.getAttribLocation(p, a);
};
const glGetUniformLocation = (
   gl: WebGL2RenderingContext,
   p: WebGLProgram,
   a: string,
   arg: string
): WebGLUniformLocation | null => {
   if (debug && frame < 5) console.log('gl.getUniformLocation', arg);
   if (frame < 2) return gl.getUniformLocation(p, a);
   return gl.getUniformLocation(p, a);
};
const glUseProgram = (gl: WebGL2RenderingContext, p: WebGLProgram, arg: string): void => {
   if (debug && frame < 5) console.log('gl.useProgram', arg);
   if (frame < 2) gl.useProgram(p);
};
const glBindBuffer = (
   gl: WebGL2RenderingContext,
   t: number,
   b: WebGLBuffer | null,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.bindBuffer', arg);
   if (frame < 2) gl.bindBuffer(t, b);
};
const glBindTexture = (
   gl: WebGL2RenderingContext,
   t: number,
   b: WebGLBuffer | null,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.bindTexture', arg);
   if (frame < 2) gl.bindTexture(t, b);
};
const glBindFramebuffer = (
   gl: WebGL2RenderingContext,
   t: number,
   b: WebGLFramebuffer | null,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.bindFramebuffer', arg);
   if (frame < 2) gl.bindFramebuffer(t, b);
};
const glBindRenderbuffer = (
   gl: WebGL2RenderingContext,
   t: number,
   b: WebGLBuffer | null,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.bindRenderbuffer', arg);
   if (frame < 2) gl.bindRenderbuffer(t, b);
};
const glBufferData = (
   gl: WebGL2RenderingContext,
   t: number,
   // d: WebGLBuffer | null,
   d: Float32Array<ArrayBufferLike> | Uint16Array<ArrayBufferLike>,
   n: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.bufferData', arg);
   if (frame < 2) gl.bufferData(t, d, n);
};
const glEnableVertexAttribArray = (gl: WebGL2RenderingContext, l: number, arg: string): void => {
   if (debug && frame < 5) console.log('gl.enableVertexAttribArray', arg);
   gl.enableVertexAttribArray(l);
};
const glVertexAttribPointer = (
   gl: WebGL2RenderingContext,
   l: number,
   s: number,
   d: number,
   f: boolean,
   a: number,
   b: number,
   arg: string
): void => {
   if (debug && frame < 5) console.log('gl.vertexAttribPointer', arg);
   if (frame < 2) gl.vertexAttribPointer(l, s, d, f, a, b);
};
const glCreateBuffer = (gl: WebGL2RenderingContext, arg: string): WebGLBuffer => {
   if (debug && frame < 5) console.log('gl.createBuffer', arg);
   if (frame < 2) return gl.createBuffer();
   return gl.createBuffer();
};

// --- pipeline --- //
type PipelineBuffer = WebGLBuffer | WebGLFramebuffer | WebGLRenderbuffer;
type PipelineBufferType = 'Texture' | 'Texture3D' | 'Buffer' | 'FrameBuffer' | 'RenderBuffer';
type BufferTarget =
   | 'ARRAY_BUFFER'
   | 'ELEMENT_ARRAY_BUFFER'
   | 'FRAMEBUFFER'
   | 'RENDERBUFFER'
   | 'TEXTURE_2D'
   | 'TEXTURE_3D'
   | 'READ_FRAMEBUFFER'
   | 'DRAW_FRAMEBUFFER';

const bufferStore: BufferStore = {};
interface BufferStore {
   [bufferName: string]: {
      buffer: PipelineBuffer;
      type: PipelineBufferType;
      target: BufferTarget;
   };
}

const clearBufferStore = (): void => {
   Object.keys(bufferStore).forEach((buffer) => {
      delete bufferStore[buffer];
   });
};

const bufferTypeToTarget: Record<PipelineBufferType, BufferTarget> = {
   Texture: 'TEXTURE_2D',
   Texture3D: 'TEXTURE_3D',
   FrameBuffer: 'FRAMEBUFFER',
   RenderBuffer: 'RENDERBUFFER',
   Buffer: 'ARRAY_BUFFER',
};
const registerBuffer = (
   bufferName: string,
   buffer: PipelineBuffer,
   type: PipelineBufferType,
   nonStandardTarget?: BufferTarget
): void => {
   if (bufferName in bufferStore)
      throw new Error(`attempting to create buffer '${bufferName}' but it already exists`);

   const target: BufferTarget = nonStandardTarget ?? bufferTypeToTarget[type];
   bufferStore[bufferName] = { buffer, type, target };
};

const clearBuffer = (gl: WebGL2RenderingContext, bufferName: string): void => {
   if (!(bufferName in bufferStore))
      throw new Error(`attempting to unbind buffer '${bufferName}' but it does not exist`);

   const { type, target } = bufferStore[bufferName];
   // if (type === 'Buffer') gl.bindBuffer(gl[target], null);
   if (type === 'Buffer') glBindBuffer(gl, gl[target], null, bufferName);
   // else if (type === 'Texture' || type === 'Texture3D') gl.bindTexture(gl[target], null);
   else if (type === 'Texture' || type === 'Texture3D')
      glBindTexture(gl, gl[target], null, bufferName);
   // else if (type === 'FrameBuffer') gl.bindFramebuffer(gl[target], null);
   else if (type === 'FrameBuffer') glBindFramebuffer(gl, gl[target], null, bufferName);
   // else gl.bindRenderbuffer(gl[target], null);
   else glBindRenderbuffer(gl, gl[target], null, bufferName);
};

const bindBuffer = (
   gl: WebGL2RenderingContext,
   bufferName: string | null,
   specifiedTarget?: BufferTarget
): void => {
   if (bufferName !== null && !(bufferName in bufferStore)) return undefined;

   if (bufferName === null && specifiedTarget === undefined)
      throw new Error('specifiedTarget must be supplied when binding a null buffer');

   if (bufferName === null && specifiedTarget!.includes('FRAMEBUFFER'))
      // return void gl.bindFramebuffer(gl[specifiedTarget!], null);
      return void glBindFramebuffer(gl, gl[specifiedTarget!], null, 'null');
   else if (bufferName === null)
      throw new Error('binding null buffer currently only supported for framebuffer');

   const { buffer, type, target: registeredTarget } = bufferStore[bufferName];
   const target = specifiedTarget ?? registeredTarget;
   // if (type === 'Buffer') gl.bindBuffer(gl[target], buffer);
   if (type === 'Buffer') glBindBuffer(gl, gl[target], buffer, bufferName);
   // else if (type === 'Texture' || type === 'Texture3D') gl.bindTexture(gl[target], buffer);
   else if (type === 'Texture' || type === 'Texture3D')
      glBindTexture(gl, gl[target], buffer, bufferName);
   // else if (type === 'FrameBuffer') gl.bindFramebuffer(gl[target], buffer);
   else if (type === 'FrameBuffer') glBindFramebuffer(gl, gl[target], buffer, bufferName);
   // else gl.bindRenderbuffer(gl[target], buffer);
   else glBindRenderbuffer(gl, gl[target], buffer, bufferName);
   return undefined;
};

const createVolumetricTextureBuffer = (
   gl: WebGL2RenderingContext,
   bufferName: string,
   imageUri: string,
   callback?: (error: boolean) => void
): void => {
   if (bufferName in bufferStore)
      throw new Error(`attempting to create texture '${bufferName}' but it already exists`);

   texture
      .loadVolumetricImageTexture(gl, imageUri, (buffer) => {
         registerBuffer(bufferName, buffer, 'Texture3D');
         clearBuffer(gl, bufferName);
         if (callback !== undefined) callback(false);
      })
      .catch(() => undefined);
};

const createImageTextureBuffer = (
   gl: WebGL2RenderingContext,
   bufferName: string,
   imageUri: string,
   callback?: (error: boolean) => void
): void => {
   if (bufferName in bufferStore)
      throw new Error(`attempting to create texture '${bufferName}' but it already exists`);

   texture
      .loadImageTexture(gl, imageUri, (buffer) => {
         registerBuffer(bufferName, buffer, 'Texture');
         clearBuffer(gl, bufferName);
         if (callback !== undefined) callback(false);
      })
      .catch(() => undefined);
};

interface MethodUpdate {
   material?: { [property: string]: number[] | mat4 };
   texture?: { [texture: string]: string };
   model?: { [property: string]: number[] | Float32Array | Uint16Array };
}
type RenderMethod = () => void;
let n = 0;
const renderPipelineItem = (
   gl: WebGL2RenderingContext,
   itemName: string,
   renderMethod: RenderMethod
): void => {
   if (debug && frame < 5) console.log('rendering frame', frame);
   // const buffer = bufferStore[itemName];
   bindBuffer(gl, itemName);

   const { width, height } = gl.canvas;
   // if (n === 0) gl.viewport(0, 0, width, height);
   if (n === 0) gl.clearColor(0, 0, 0, 1);
   // if (n === 0) gl.clearDepth(1.0);
   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
   // if (n === 0) gl.enable(gl.DEPTH_TEST);
   // if (n === 0) gl.depthFunc(gl.LEQUAL);
   renderMethod();

   if (debug && frame < 5) console.log('end rendering frame', frame);
   n++;
   frame++;
};

// --- models --- //
interface ModelProperty {
   type: 'ARRAY_BUFFER' | 'ELEMENT_ARRAY_BUFFER';
   size: number;
   dataType: 'FLOAT' | 'UNSIGNED_BYTE';
   buffer: WebGLBuffer;
}

interface Model {
   [property: string]: ModelProperty;
}

const modelStore: ModelStore = {};
interface ModelStore {
   [model: string]: Model;
}

let warnCount = 0;
let lastClear: number | null = null;
const warnMessage =
   'Model store is clearing too frequently. Ensure gl instance is not being reset.';
const maxWarnMessage = 'Max warnings reached (8) - Further warnings will be suppressed.';
const clearModelStore = (): void => {
   const now = Date.now();
   if (warnCount === 8) console.warn([warnMessage, maxWarnMessage].join('\n   '));
   else if (warnCount > 8) {
      // suppress warnings
   } else if (now - (lastClear ?? 0) < 1000) {
      console.warn(warnMessage);
      warnCount++;
   } else lastClear = now;

   Object.keys(modelStore).forEach((model) => {
      delete modelStore[model];
   });
};

const createModel = (
   gl: WebGL2RenderingContext,
   modelInfo: ShaderProgramModelInformation
): Model => {
   const model: Model = {};
   Object.entries(modelInfo).forEach(([property, value]) => {
      const { type, size, dataType } = value;
      // const buffer = gl.createBuffer();
      const buffer = glCreateBuffer(gl, property);

      model[property] = {
         type,
         size,
         dataType,
         buffer,
      };
   });

   return model;
};

const registerModel = (
   gl: WebGL2RenderingContext,
   modelName: string,
   modelInfo: ShaderProgramModelInformation
): void => {
   const model = createModel(gl, modelInfo);
   modelStore[modelName] = model;
};

const setModelProperty = (
   gl: WebGL2RenderingContext,
   modelName: string,
   property: string,
   value: number[] | Float32Array | Uint16Array
): void => {
   if (!(modelName in modelStore)) throw new Error(`cannot find model ${modelName}`);
   const model = modelStore[modelName];

   if (!(property in model))
      throw new Error(`property ${property} does not exist on model ${modelName}`);

   const { type, buffer } = model[property];
   const data =
      value instanceof Float32Array || value instanceof Uint16Array
         ? value
         : new Float32Array(value);

   // gl.bindBuffer(gl[type], buffer);
   glBindBuffer(gl, gl[type], buffer, property);
   // gl.bufferData(gl[type], data, gl.STATIC_DRAW);
   glBufferData(gl, gl[type], data, gl.STATIC_DRAW, property);
   // gl.bindBuffer(gl[type], null);
   glBindBuffer(gl, gl[type], null, 'null');
};

const setModelProperties = (
   gl: WebGL2RenderingContext,
   modelName: string,
   properties: { [property: string]: number[] | Float32Array | Uint16Array }
): void => {
   Object.entries(properties).forEach(([propertyName, value]) => {
      setModelProperty(gl, modelName, propertyName, value);
   });
};

let m = 0;
const useModelProperty = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   modelName: string,
   property: string
): void => {
   if (m++ > 1) return;
   if (!(shaderName in shaderStore)) throw new Error();
   const { locations } = shaderStore[shaderName];

   if (!(modelName in modelStore)) throw new Error();
   const model = modelStore[modelName];

   if (!(property in model)) throw new Error();

   const { type, size, dataType, buffer } = model[property];
   // console.log(`binding : gl[${type}], property: ${property}`);
   // gl.bindBuffer(gl[type], buffer);
   glBindBuffer(gl, gl[type], buffer, property);

   if (type === 'ELEMENT_ARRAY_BUFFER' || property === 'indices') return;

   if (!(modelName in locations)) throw new Error();
   if (!(property in locations[modelName])) throw new Error();

   const location = locations[modelName][property] as number;
   // gl.enableVertexAttribArray(location);
   glEnableVertexAttribArray(gl, location, property);
   // gl.vertexAttribPointer(location, size, gl[dataType], false, 0, 0);
   glVertexAttribPointer(gl, location, size, gl[dataType], false, 0, 0, property);
};

const activateModel = (gl: WebGL2RenderingContext, shaderName: string): void => {
   if (!(shaderName in shaderStore))
      throw new Error(`attempted to access shader '${shaderName}' but it does not exist`);
   const modelName = `${shaderName}Model`;
   if (!(modelName in shaderStore[shaderName].locations))
      throw new Error(
         `attempted to access model '${modelName}' but it does not exist on shader '${shaderName}'`
      );

   const attributes = shaderStore[shaderName].locations[modelName];
   Object.keys(attributes).forEach((attribute) =>
      useModelProperty(gl, shaderName, modelName, attribute)
   );
};

// --- materials --- //
type UniformSize =
   | '1i'
   | '2i'
   | '1f'
   | '2f'
   | '2fv'
   | '3fv'
   | '4fv'
   | 'Matrix4fv'
   | 'texture2D'
   | 'texture3D';

interface MaterialProperty {
   size: UniformSize;
   value: number[] | mat4;
}

interface Material {
   [property: string]: MaterialProperty;
}

const materialStore: MaterialStore = {};
interface MaterialStore {
   [material: string]: Material;
}

const clearMaterialStore = (): void => {
   Object.keys(materialStore).forEach((material) => {
      delete materialStore[material];
   });
};

const createMaterial = (materialInfo: ShaderProgramMaterialInformation): Material => {
   const material: Material = {};
   Object.entries(materialInfo).forEach(([property, { size }]) => {
      material[property] = {
         size,
         value: [],
      };
   });

   return material;
};

const registerMaterial = (
   materialName: string,
   materialInfo: ShaderProgramMaterialInformation
): void => {
   const material = createMaterial(materialInfo);
   materialStore[materialName] = material;
};

const setMaterialProperty = (
   materialName: string,
   property: string,
   value: MaterialProperty['value']
): void => {
   if (!(materialName in materialStore)) throw new Error(`cannot find material ${materialName}`);
   const material = materialStore[materialName];

   if (!(property in material))
      throw new Error(`property ${property} does not exist on material ${materialName}`);

   material[property].value = value;
};

const setMaterialProperties = (
   materialName: string,
   properties: { [property: string]: MaterialProperty['value'] }
): void => {
   Object.entries(properties).forEach(([property, value]) => {
      setMaterialProperty(materialName, property, value);
   });
};

let l = 0;
const activateMaterial = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   extraBuffers?: { [bufferName: string]: string }
): void => {
   if (!(shaderName in shaderStore)) throw new Error(`cannot find shader ${shaderName}`);
   const { locations } = shaderStore[shaderName];

   const materialName = `${shaderName}Material`;
   if (!(materialName in locations))
      throw new Error(`cannot find material ${materialName} in shader ${shaderName}`);

   const materialLocations = locations[materialName];

   if (!(materialName in materialStore))
      throw new Error(`cannot find material ${materialName} in material store`);
   const material = materialStore[materialName];

   let texIndex = 0;
   Object.entries(material).forEach(([property, { size, value }]) => {
      if (!(property in materialLocations)) {
         console.warn('properties:', Object.keys(materialLocations));
         throw new Error(
            `location of property ${property} within material ${materialName} is unknown`
         );
      }

      const location = materialLocations[property];

      // if (size === '1f') gl.uniform1f(location, value[0]);
      if (size === '1f') glUniform1f(gl, location, value[0], property);
      // else if (size === '1i') gl.uniform1i(location, value[0]);
      else if (size === '1i') glUniform1i(gl, location, value[0], property);
      // else if (size === '2f') gl.uniform2f(location, 0.0 * value[0], 0.0 + value[1]);
      else if (size === '2f') glUniform2f(gl, location, 0.0 * value[0], 0.0 + value[1], property);
      // else if (size === '2i') gl.uniform2i(location, value[0], value[1]);
      else if (size === '2i') glUniform2i(gl, location, value[0], value[1], property);
      // else if (size === '2fv') gl.uniform2fv(location, value);
      else if (size === '2fv') glUniform2fv(gl, location, value, property);
      // else if (size === '3fv') gl.uniform3fv(location, value);
      else if (size === '3fv') glUniform3fv(gl, location, value, property);
      // else if (size === '4fv') gl.uniform4fv(location, value);
      else if (size === '4fv') glUniform4fv(gl, location, value, property);
      // else if (size === 'Matrix4fv') gl.uniformMatrix4fv(location, false, value);
      else if (size === 'Matrix4fv') glUniformMatrix4fv(gl, location, false, value, property);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      else if (size === 'texture2D' || size === 'texture3D') {
         if (extraBuffers === undefined || !(property in extraBuffers))
            throw new Error(`Attempting to bind texture, but it is not provided.`);
         // if (l === 0) gl.activeTexture(gl.TEXTURE0 + texIndex);
         glActiveTexture(gl, gl.TEXTURE0 + texIndex, property);
         if (l === 0) bindBuffer(gl, extraBuffers[property]);
         // if (l === 0) gl.uniform1i(location, texIndex++);
         glUniform1i(gl, location, texIndex++, property);
      } else throw new Error('data type is missing in useMaterialValue');
   });

   l++;
};

// --- shaders --- //
const shaderStore: ShaderStore = {};
interface ShaderStore {
   [shader: string]: {
      program: WebGLProgram;
      locations: {
         [model: string]: {
            [attribute: string]: WebGLUniformLocation;
         };
      };
   };
}

const clearShaderStore = (): void => {
   Object.keys(shaderStore).forEach((shader) => {
      delete shaderStore[shader];
   });
};

const addModelToShader = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   modelName: string,
   includeAttributes?: string[]
): void => {
   if (!(shaderName in shaderStore)) throw new Error();
   const { program: shaderProgram } = shaderStore[shaderName];

   if (!(modelName in modelStore)) throw new Error();
   const model = modelStore[modelName];

   const attributes = includeAttributes ?? Object.keys(model);
   const locations: { [property: string]: WebGLUniformLocation } = {};
   attributes.forEach((attribute) => {
      const location =
         // attribute === 'indices' ? -1 : gl.getAttribLocation(shaderProgram, attribute);
         attribute === 'indices'
            ? -1
            : glGetAttribLocation(gl, shaderProgram, attribute, attribute);
      if (location === -1)
         console.warn('attribute', attribute, 'could not be added to shader', shaderName);
      locations[attribute] = location;
   });

   shaderStore[shaderName].locations[modelName] = locations;
};

const addMaterialToShader = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   includeProperties?: string[]
): void => {
   if (!(shaderName in shaderStore)) throw new Error('shader not found');
   const { program: shaderProgram } = shaderStore[shaderName];

   const materialName = `${shaderName}Material`;
   if (!(materialName in materialStore)) throw new Error('material not found');
   const material = materialStore[materialName];

   const properties = includeProperties ?? Object.keys(material);
   const locations: { [property: string]: WebGLUniformLocation } = {};
   properties.forEach((property) => {
      // const location = gl.getUniformLocation(shaderProgram, property);
      const location = glGetUniformLocation(gl, shaderProgram, property, property);
      if (location === null)
         console.warn('property', property, 'could not be added to shader', shaderName);
      else locations[property] = location;
   });

   shaderStore[shaderName].locations[materialName] = locations;
};

interface ShaderProgramMaterialInformation {
   [property: string]: Omit<MaterialProperty, 'value'>;
}
interface ShaderProgramModelInformation {
   [property: string]: Omit<ModelProperty, 'location' | 'value' | 'buffer'>;
}

export interface ShaderProgram {
   vsSource: string;
   fsSource: string;
   material: ShaderProgramMaterialInformation;
   model: ShaderProgramModelInformation;
}

const registerShaderProgram = (
   gl: WebGL2RenderingContext,
   shaderName: string,
   program: ShaderProgram
): void => {
   const shaderProgram = createShaderProgram(gl, program.vsSource, program.fsSource);
   shaderStore[shaderName] = { program: shaderProgram, locations: {} };

   registerModel(gl, `${shaderName}Model`, program.model);
   registerMaterial(`${shaderName}Material`, program.material);
   addModelToShader(gl, shaderName, `${shaderName}Model`);
   addMaterialToShader(gl, shaderName);
};

const useShader = (gl: WebGL2RenderingContext, shaderName: string): void => {
   if (!(shaderName in shaderStore))
      throw new Error(
         `Attempting to enable shader '${shaderName}', but it does not exist in shader store.`
      );

   const { program } = shaderStore[shaderName];
   // gl.useProgram(program);
   glUseProgram(gl, program, shaderName);
};

export const shader = {
   clearBufferStore,
   createVolumetricTextureBuffer,
   createImageTextureBuffer,
   renderPipelineItem,
   clearModelStore,
   setModelProperties,
   activateModel,
   clearMaterialStore,
   setMaterialProperties,
   activateMaterial,
   clearShaderStore,
   registerShaderProgram,
   useShader,
};
