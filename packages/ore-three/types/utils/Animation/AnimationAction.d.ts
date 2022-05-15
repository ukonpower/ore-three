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
    getUniforms<T>(propertyName: string): THREE.IUniform<T> | null;
    getValue<T>(propertyName: string): T | null;
    getValueAsScalar(propertyName: string): number;
    getValueAsVector2(propertyName: string): THREE.Vector2;
    getValueAsVector3(propertyName: string): THREE.Vector3;
    getValueAsVector4(propertyName: string): THREE.Vector4 | undefined;
    getValueAsEuler(propertyName: string): THREE.Euler;
    updateFrame(frame: number): void;
}
