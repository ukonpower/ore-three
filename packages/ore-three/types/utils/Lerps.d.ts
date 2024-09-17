import { AnimatorVariableType } from "./Animation/Animator";
export declare interface LerpFunc<T> {
    (a: T, b: T, t: number): T;
}
export declare namespace Lerps {
    function number(a: number, b: number, t: number): number;
    function numberArray(a: number[], b: number[], t: number): false | number[];
    function THREEVectors<T extends THREE.Vector2 | THREE.Vector3 | THREE.Vector4 | THREE.Color>(a: T, b: T, t: number): import("three").Vector3 | import("three").Color | import("three").Vector2 | import("three").Vector4;
    function THREEQuaternion(a: THREE.Quaternion, b: THREE.Quaternion, t: number): import("three").Quaternion;
    function THREEEuler(a: THREE.Euler, b: THREE.Euler, t: number): import("three").Euler;
    function getLerpFunc(value: AnimatorVariableType): typeof number | typeof numberArray | typeof THREEVectors | typeof THREEQuaternion | typeof THREEEuler | undefined;
}
//# sourceMappingURL=Lerps.d.ts.map