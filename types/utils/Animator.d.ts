export declare class Animator {
    private variables;
    constructor();
    addVariable(name: string, initValue?: number): void;
    animate(name: string, goalValue: number, duration?: number, callback?: Function): void;
    getValue(name: string): number;
    update(deltaTime?: number): void;
    private sigmoid;
}
