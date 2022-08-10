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
    frameStart: number;
    frameEnd: number;
    frameDuration: number;
    constructor(name?: string, x?: FCurve, y?: FCurve, z?: FCurve, w?: FCurve, scalar?: FCurve);
    setFCurve(curve: FCurve, axis: FCurveAxis): void;
    calcType(): void;
    private calcFrame;
    createInitValue(): 0 | THREE.Vector3 | THREE.Vector2 | THREE.Vector4;
    getValue<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Euler>(frame: number, target: T): T;
    getValue(frame: number): number | null;
}
//# sourceMappingURL=FCurveGroup.d.ts.map