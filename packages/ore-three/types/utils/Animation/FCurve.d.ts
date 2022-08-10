import EventEmitter from 'wolfy87-eventemitter';
import { FCurveKeyFrame } from './FCurveKeyFrame';
export declare type FCurveAxis = 'x' | 'y' | 'z' | 'w' | 'scalar';
export declare class FCurve extends EventEmitter {
    keyframes: FCurveKeyFrame[];
    private cache;
    frameStart: number;
    frameEnd: number;
    frameDuration: number;
    constructor(frames?: FCurveKeyFrame[]);
    set(frames?: FCurveKeyFrame[]): void;
    addKeyFrame(keyframe: FCurveKeyFrame): void;
    getValue(frame: number): number;
}
//# sourceMappingURL=FCurve.d.ts.map