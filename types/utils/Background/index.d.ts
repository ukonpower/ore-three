import * as ORE from '../../';
import * as THREE from 'three';
import { LayerSize as LayerSizeInfo } from '../../core/BaseLayer';
export declare class Background extends THREE.Mesh {
    protected uniforms: ORE.Uniforms;
    constructor(param: THREE.ShaderMaterialParameters);
    resize(args: LayerSizeInfo): void;
}
