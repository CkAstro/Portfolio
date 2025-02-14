import type { mat4 } from 'gl-matrix';

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
type MaterialData = number[] | mat4;

interface MaterialProperty {
   size: UniformSize;
   value: MaterialData;
}
interface MaterialInformation {
   [property: string]: Omit<MaterialProperty, 'value'>;
}

type ModelBufferType = 'ARRAY_BUFFER' | 'ELEMENT_ARRAY_BUFFER';
type ModelDataType = 'FLOAT' | 'UNSIGNED_BYTE';
type ModelBuffer = WebGLBuffer;
interface ModelProperty {
   type: ModelBufferType;
   size: number;
   dataType: ModelDataType;
   buffer: ModelBuffer;
}
interface ModelInformation {
   [property: string]: Omit<ModelProperty, 'location' | 'value' | 'buffer'>;
}

export interface ShaderProgram {
   vsSource: string;
   fsSource: string;
   material: MaterialInformation;
   model: ModelInformation;
}
