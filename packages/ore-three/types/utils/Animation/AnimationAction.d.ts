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
    addFcurveGroup(propertyName: string, fcurveGroup: FCurveGroup): void;
    removeFCurve(propertyName: string): void;
    getFCurveGroup(propertyName: string): FCurveGroup | null;
    assignUniforms(propertyName: string, uniform: THREE.IUniform): void;
    getUniforms<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | number>(propertyName: string): THREE.IUniform<T> | null;
    getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler | number>(propertyName: string): T | null;
    getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler>(propertyName: string, target: T): T;
    updateFrame(frame: number): void;
}
