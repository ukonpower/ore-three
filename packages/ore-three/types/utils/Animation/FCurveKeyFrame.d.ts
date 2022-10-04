import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
export declare type FCurveInterpolation = "BEZIER" | "LINEAR";
export declare class FCurveKeyFrame extends EventEmitter {
    coordinate: THREE.Vec2;
    handleLeft: THREE.Vec2;
    handleRight: THREE.Vec2;
    interpolation: FCurveInterpolation;
    private easing;
    private nextFrame;
    constructor(coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation);
    set(coordinate: THREE.Vec2, handleLeft?: THREE.Vec2, handleRight?: THREE.Vec2, interpolation?: FCurveInterpolation): void;
    private getEasing;
    to(nextFrame: FCurveKeyFrame, t: number): any;
}
//# sourceMappingURL=FCurveKeyFrame.d.ts.map