import * as ORE from '../..';
export declare class Background extends ORE.BaseObject {
    private uni;
    private frag;
    private test;
    constructor(fragmentShader: string, uniforms: any);
    createMesh(): void;
}
