export declare namespace Bezier {
    type BezierControlPoints = {
        p0: number;
        p1: number;
        p2: number;
        p3: number;
    };
    const NEWTON_ITERATIONS = 4;
    const NEWTON_MIN_SLOPE = 0.001;
    const SUBDIVISION_PRECISION = 1e-7;
    const SUBDIVISION_MAX_ITERATIONS = 10;
    const BEZIER_EASING_CACHE_SIZE = 11;
    const BEZIER_EASING_SAMPLE_STEP_SIZE: number;
    function calcBezierSlope(p: BezierControlPoints, t: number): number;
    function calcBezier(p: BezierControlPoints, t: number): number;
    function getBezierTfromX(p: BezierControlPoints, x: number, cache: number[]): number;
}
//# sourceMappingURL=Bezier.d.ts.map