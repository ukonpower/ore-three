export declare interface AnimatorEasing {
    func: Function;
    variables?: number[];
}
export declare class Animator {
    private variables;
    constructor();
    addVariable(name: string, initValue?: number, easing?: AnimatorEasing): void;
    setEasing(name: string, easing: AnimatorEasing): void;
    animate(name: string, goalValue: number, duration?: number, callback?: Function): void;
    getValue(name: string): number;
    update(deltaTime?: number): void;
}
