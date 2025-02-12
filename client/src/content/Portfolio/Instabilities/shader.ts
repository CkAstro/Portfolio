// cSpell:words cval, highp

// import type { ShaderProgram } from '@/components';

// const vsSource: ShaderProgram['vsSource'] = `#version 300 es
//    in vec4 aPosition;
//    uniform mat4 uModelViewMatrix;
//    uniform mat4 uProjectionMatrix;
//    uniform vec3 uEyePos;               // effective camera position

//    out vec3 rayDirection;
//    flat out vec3 eyePos;

//    void main(void) {
//       gl_Position = uProjectionMatrix * uModelViewMatrix * aPosition;
//       eyePos = uEyePos;
//       rayDirection = aPosition.xyz - uEyePos;
//    }
// `;

// const fsSource: ShaderProgram['fsSource'] = `#version 300 es
//    precision highp float;

//    in vec3 rayDirection;
//    flat in vec3 eyePos;

//    out vec4 color;

//    uniform float uResolution;

//    uniform highp sampler3D volumeData;
//    uniform highp sampler2D colorMap;

//    // determine if LoS intersects cube
//    vec2 intersectCube(vec3 eye, vec3 dir) {
//       vec3 cubeMin = vec3(-0.5);
//       vec3 cubeMax = vec3(0.5);
//       vec3 invDir = 1.0 / dir;
//       vec3 tmpMin = invDir * (cubeMin - eye);
//       vec3 tmpMax = invDir * (cubeMax - eye);
//       vec3 vecMin = min(tmpMin, tmpMax);
//       vec3 vecMax = max(tmpMin, tmpMax);
//       return vec2(
//          max(vecMin.x, max(vecMin.y, vecMin.z)),
//          min(vecMax.x, min(vecMax.y, vecMax.z))
//       );
//    }

//    void main (void) {
//       vec3 rayDir = normalize(rayDirection);
//       vec2 cube = intersectCube(eyePos, rayDir);
//       if (cube.x > cube.y) discard;

//       cube.x = max(cube.x, 0.0);
//       vec3 dlVec = 1.0 / (vec3(2.0*uResolution) * abs(rayDir));
//       float dl = min(dlVec.x, min(dlVec.y, dlVec.z)) ;
//       // dl *= 0.01;

//       vec3 p = eyePos + cube.x * rayDir;
//       color = vec4(0.0);

//       for (float l=cube.x; l<cube.y; l+=dl) {
//          float val = texture(volumeData, 0.5 + p).r;
//          vec4 cval = texture(colorMap, vec2(val, 0.5));
//          // cval.a *= 0.01;

//          color.rgb += (1.0 - color.a) * cval.a * cval.rgb;
//          color.a += (1.0 - color.a) * cval.a * val;

//          if (color.a > 0.95) break;
//          p += rayDir * dl;
//       }
//       color.a = 1.0;
//    }
// `;

// const material: ShaderProgram['material'] = {
//    uProjectionMatrix: { size: 'Matrix4fv' },
//    uModelViewMatrix: { size: 'Matrix4fv' },
//    // uResolution: { size: '3fv' },
//    uResolution: { size: '1f' },
//    volumeData: { size: 'texture3D' },
//    colorMap: { size: 'texture2D' },
//    // uHideCSM: { size: '1f' },
//    uEyePos: { size: '3fv' },
//    // nu: { size: '1f' },
// };

// const model: ShaderProgram['model'] = {
//    aPosition: { size: 3, type: 'ARRAY_BUFFER', dataType: 'FLOAT' },
//    indices: { size: 3, type: 'ELEMENT_ARRAY_BUFFER', dataType: 'UNSIGNED_BYTE' },
// };

// export const emission: ShaderProgram = {
//    vsSource,
//    fsSource,
//    material,
//    model,
// };
