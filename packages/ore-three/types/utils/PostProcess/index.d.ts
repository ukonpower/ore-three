import * as THREE from 'three';
import { PostProcessPass } from '../PostProcessPass';
export interface PostProcessParam {
    renderer: THREE.WebGLRenderer;
    passes: PostProcessPass[];
}
export interface PostProcessRenderOpt {
    camera?: THREE.Camera;
}
export declare class PostProcess {
    renderer: THREE.WebGLRenderer;
    passes: PostProcessPass[];
    private scene;
    private quad;
    private camera;
    private projectionMatrix;
    private projectionMatrixInverse;
    private cameraMatrix;
    private viewMatrix;
    constructor(param: PostProcessParam);
    render(input?: THREE.Texture, opt?: PostProcessRenderOpt): void;
    resize(resolution: THREE.Vector2): void;
}
//# sourceMappingURL=index.d.ts.map