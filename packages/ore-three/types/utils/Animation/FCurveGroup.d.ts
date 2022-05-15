import * as THREE from 'three';
import EventEmitter from 'wolfy87-eventemitter';
import { FCurve, FCurveAxis } from './FCurve';
export declare type FCurveGroupType = 'scalar' | 'vec2' | 'vec3' | 'vec4';
export declare class FCurveGroup extends EventEmitter {
    name: string;
    curve: {
        [axis in FCurveAxis]: FCurve | null;
    };
    type: FCurveGroupType;
    constructor(name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve, scalar?: FCurve);
    setFCurve(curve: FCurve, axis: FCurveAxis): void;
    calcType(): void;
    createInitValue(): THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | 0;
}
