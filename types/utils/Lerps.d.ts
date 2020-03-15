export declare interface LerpFunc<T> {
    (a: T, b: T, t: number): T;
}
export declare namespace Lerps {
    function number(a: number, b: number, t: number): number;
    function numberArray(a: number[], b: number[], t: number): false | any[];
    function THREEVectors(a: THREE.Vector2, b: THREE.Vector2, t: number): any;
    function THREEVectors(a: THREE.Vector3, b: THREE.Vector3, t: number): any;
    function THREEVectors(a: THREE.Vector4, b: THREE.Vector4, t: number): any;
    function THREEVectors(a: THREE.Color, b: THREE.Color, t: number): any;
    function THREEQuaternion(a: THREE.Quaternion, b: THREE.Quaternion, t: number): import("three").Quaternion;
    function THREEEuler(a: THREE.Euler, b: THREE.Euler, t: number): import("three").Euler;
    function getLerpFunc(value: any): typeof number | typeof numberArray | typeof THREEVectors | typeof THREEQuaternion | typeof THREEEuler;
}
