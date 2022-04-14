import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { FCurveGroup } from './FCurveGroup';
export declare class AnimationAction extends EventEmitter {
    name: string;
    curves: {
        [key: string]: FCurveGroup;
    };
    private uniforms;
    constructor(name?: string);
    addFcurveGroup(curveName: string, fcurveGroup: FCurveGroup): void;
    removeFCurve(curveName: string): void;
    getFCurveGroup(curveName: string): FCurveGroup | null;
    assignUniforms(curveName: string, uniform: THREE.IUniform): void;
    getUniforms<T>(curveName: string): THREE.IUniform<T>;
    updateFrame(frame: number): void;
}
