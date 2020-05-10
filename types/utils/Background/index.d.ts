import * as ORE from '../../';
import * as THREE from 'three';
import { ResizeArgs } from '../../core/Controller';
export declare class Background extends THREE.Mesh {
    protected uniforms: ORE.Uniforms;
    constructor(param: THREE.ShaderMaterialParameters);
    resize(args: ResizeArgs): void;
}
