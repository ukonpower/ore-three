export declare type EasingFunc = (t: number) => any;
export declare namespace Easings {
    function sigmoid(weight?: number): EasingFunc;
    function smoothstep(min: number, max: number, value: number): number;
    function linear(t: number): number;
    function easeInQuad(t: number): number;
    function easeOutQuad(t: number): number;
    function easeInOutQuad(t: number): number;
    function easeInCubic(t: number): number;
    function easeOutCubic(t: number): number;
    function easeInOutCubic(t: number): number;
    function easeInQuart(t: number): number;
    function easeOutQuart(t: number): number;
    function easeInOutQuart(t: number): number;
    function easeInQuint(t: number): number;
    function easeOutQuint(t: number): number;
    function easeInOutQuint(t: number): number;
    function bezier(c1: THREE.Vec2, h1: THREE.Vec2, h2: THREE.Vec2, c2: THREE.Vec2): EasingFunc;
    function cubicBezier(h1X: number, h1Y: number, h2X: number, h2Y: number): EasingFunc;
}
//# sourceMappingURL=Easings.d.ts.map