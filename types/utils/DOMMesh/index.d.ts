import * as THREE from 'three';
import { Uniforms } from '../Uniforms';
export declare class DOMMesh extends THREE.Mesh {
    protected _uniforms: Uniforms;
    protected element: HTMLElement;
    constructor(element: HTMLElement, parameter: THREE.ShaderMaterialParameters);
    get uniforms(): Uniforms;
    update(): void;
}
