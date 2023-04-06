var F = Object.defineProperty;
var N = (u, c, e) => c in u ? F(u, c, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[c] = e;
var f = (u, c, e) => (N(u, typeof c != "symbol" ? c + "" : c, e), e);
import * as m from "three";
class Q extends m.EventDispatcher {
  constructor(e) {
    super();
    f(this, "info");
    f(this, "renderer");
    f(this, "scene");
    f(this, "camera");
    f(this, "time", 0);
    f(this, "commonUniforms");
    f(this, "readyAnimate", !1);
    this.renderer = new m.WebGLRenderer(e), this.renderer.setPixelRatio(e.pixelRatio || window.devicePixelRatio), this.renderer.debug.checkShaderErrors = !0, this.info = {
      canvas: this.renderer.domElement,
      aspectSetting: {
        mainAspect: 16 / 9,
        wideAspect: 10 / 1,
        portraitAspect: 1 / 2
      },
      size: {
        windowSize: new m.Vector2(),
        windowAspectRatio: 1,
        canvasSize: new m.Vector2(),
        canvasPixelSize: new m.Vector2(),
        canvasAspectRatio: 1,
        pixelRatio: this.renderer.getPixelRatio(),
        portraitWeight: 0,
        wideWeight: 0
      },
      ...e
    }, e.wrapperElement && this.setWrapperElement(e.wrapperElement || null, !1), this.commonUniforms = {
      time: {
        value: 0
      }
    }, this.scene = new m.Scene(), this.camera = new m.PerspectiveCamera(50, 1, 0.1, 1e3);
  }
  tick(e) {
    this.time += e, this.commonUniforms.time.value = this.time, this.readyAnimate && this.animate(e);
  }
  animate(e) {
  }
  onBind() {
    setTimeout(() => {
      this.onResize(), this.readyAnimate = !0;
    }, 0);
  }
  onUnbind() {
    this.dispatchEvent({
      type: "dispose"
    }), this.removeChildrens(this.scene), this.readyAnimate = !1;
  }
  removeChildrens(e) {
    const t = e.children.length;
    for (let i = t - 1; i >= 0; i--) {
      this.removeChildrens(e.children[i]);
      let n, r;
      e.children[i].isMesh && (n = e.children[i].geometry, r = e.children[i].material), e.remove(e.children[i]), n && n.dispose(), r && r.dispose();
    }
  }
  setWrapperElement(e, t = !0) {
    this.info.wrapperElement = e, this.info.wrapperElementRect = e ? e.getBoundingClientRect() : null, t && this.onResize();
  }
  onResize() {
    if (this.renderer == null)
      return;
    const e = new m.Vector2(document.body.clientWidth, window.innerHeight), t = new m.Vector2();
    this.info.wrapperElement ? t.set(this.info.wrapperElement.clientWidth, this.info.wrapperElement.clientHeight) : t.copy(e);
    let i = 1 - (t.x / t.y - this.info.aspectSetting.portraitAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.portraitAspect);
    i = Math.min(1, Math.max(0, i));
    let n = 1 - (t.x / t.y - this.info.aspectSetting.wideAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.wideAspect);
    n = Math.min(1, Math.max(0, n)), this.info.size.windowSize.copy(e), this.info.size.windowAspectRatio = e.x / e.y, this.info.size.canvasSize.copy(t), this.info.size.canvasPixelSize.copy(t.clone().multiplyScalar(this.renderer.getPixelRatio())), this.info.size.canvasAspectRatio = t.x / t.y, this.info.size.portraitWeight = i, this.info.size.wideWeight = n, this.renderer.setPixelRatio(this.info.size.pixelRatio), this.renderer.setSize(this.info.size.canvasSize.x, this.info.size.canvasSize.y), this.camera.aspect = this.info.size.canvasAspectRatio, this.camera.updateProjectionMatrix(), this.info.wrapperElement && (this.info.wrapperElementRect = this.info.wrapperElement.getBoundingClientRect());
  }
  pointerEvent(e) {
    const t = new m.Vector2();
    if (t.copy(e.position), this.info.canvas) {
      const r = this.info.canvas.getBoundingClientRect();
      t.sub(new m.Vector2(r.x, r.y));
    }
    const i = t.clone();
    i.divide(this.info.size.canvasSize), i.y = 1 - i.y, i.multiplyScalar(2).subScalar(1);
    const n = {
      event: e.pointerEvent,
      position: t.clone(),
      delta: e.delta.clone(),
      screenPosition: i.clone(),
      windowPosition: e.position.clone()
    };
    e.pointerEventType == "hover" ? this.onHover(n) : e.pointerEventType == "start" ? this.onTouchStart(n) : e.pointerEventType == "move" ? this.onTouchMove(n) : e.pointerEventType == "end" && this.onTouchEnd(n);
  }
  onTouchStart(e) {
  }
  onTouchMove(e) {
  }
  onTouchEnd(e) {
  }
  onHover(e) {
  }
  onWheel(e) {
  }
  onWheelOptimized(e) {
  }
}
var V = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, C = {};
(function(u) {
  (function() {
    var c;
    c = u !== null ? u : this, c.Lethargy = function() {
      function e(t, i, n, r) {
        this.stability = t != null ? Math.abs(t) : 8, this.sensitivity = i != null ? 1 + Math.abs(i) : 100, this.tolerance = n != null ? 1 + Math.abs(n) : 1.1, this.delay = r ?? 150, this.lastUpDeltas = function() {
          var a, l, s;
          for (s = [], a = 1, l = this.stability * 2; 1 <= l ? a <= l : a >= l; 1 <= l ? a++ : a--)
            s.push(null);
          return s;
        }.call(this), this.lastDownDeltas = function() {
          var a, l, s;
          for (s = [], a = 1, l = this.stability * 2; 1 <= l ? a <= l : a >= l; 1 <= l ? a++ : a--)
            s.push(null);
          return s;
        }.call(this), this.deltasTimestamp = function() {
          var a, l, s;
          for (s = [], a = 1, l = this.stability * 2; 1 <= l ? a <= l : a >= l; 1 <= l ? a++ : a--)
            s.push(null);
          return s;
        }.call(this);
      }
      return e.prototype.check = function(t) {
        var i;
        return t = t.originalEvent || t, t.wheelDelta != null ? i = t.wheelDelta : t.deltaY != null ? i = t.deltaY * -40 : (t.detail != null || t.detail === 0) && (i = t.detail * -40), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), i > 0 ? (this.lastUpDeltas.push(i), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(i), this.lastDownDeltas.shift(), this.isInertia(-1));
      }, e.prototype.isInertia = function(t) {
        var i, n, r, a, l, s, o;
        return i = t === -1 ? this.lastDownDeltas : this.lastUpDeltas, i[0] === null ? t : this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && i[0] === i[this.stability * 2 - 1] ? !1 : (r = i.slice(0, this.stability), n = i.slice(this.stability, this.stability * 2), o = r.reduce(function(d, p) {
          return d + p;
        }), l = n.reduce(function(d, p) {
          return d + p;
        }), s = o / r.length, a = l / n.length, Math.abs(s) < Math.abs(a * this.tolerance) && this.sensitivity < Math.abs(a) ? t : !1);
      }, e.prototype.showLastUpDeltas = function() {
        return this.lastUpDeltas;
      }, e.prototype.showLastDownDeltas = function() {
        return this.lastDownDeltas;
      }, e;
    }();
  }).call(V);
})(C);
class _ extends m.EventDispatcher {
  constructor() {
    super();
    f(this, "isSP");
    f(this, "isTouching");
    f(this, "element", null);
    // cursor
    f(this, "position");
    f(this, "delta");
    // wheel
    f(this, "lethargy");
    f(this, "memDelta", 0);
    f(this, "riseDelta", !1);
    f(this, "trackpadMemDelta", 0);
    f(this, "trackpadMax", !1);
    this.position = new m.Vector2(NaN, NaN), this.delta = new m.Vector2(NaN, NaN);
    const e = navigator.userAgent;
    this.isSP = e.indexOf("iPhone") >= 0 || e.indexOf("iPad") >= 0 || e.indexOf("Android") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, this.position.set(NaN, NaN), this.isTouching = !1;
    const t = this.onTouch.bind(this, "move"), i = this.onPointer.bind(this, "move"), n = this.onTouch.bind(this, "end"), r = this.onPointer.bind(this, "end");
    window.addEventListener("touchmove", t, { passive: !1 }), window.addEventListener("pointermove", i), window.addEventListener("touchend", n, { passive: !1 }), window.addEventListener("pointerup", r), window.addEventListener("dragend", r);
    const a = () => {
      this.element && this.unregisterElement(this.element), window.removeEventListener("touchmove", t), window.removeEventListener("pointermove", i), window.removeEventListener("touchend", n), window.removeEventListener("pointerup", r), window.removeEventListener("dragend", r), this.removeEventListener("dispose", a);
    };
    this.addEventListener("dispose", a), this.lethargy = new C.Lethargy();
  }
  registerElement(e) {
    this.element && this.unregisterElement(this.element), this.element = e;
    const t = this.onTouch.bind(this, "start"), i = this.onPointer.bind(this, "start"), n = this.wheel.bind(this);
    e.addEventListener("touchstart", t, { passive: !1 }), e.addEventListener("pointerdown", i), e.addEventListener("wheel", n, { passive: !1 });
    const r = (a) => {
      e.isEqualNode(a.elm) && (e.removeEventListener("touchstart", t), e.removeEventListener("pointerdown", i), e.removeEventListener("wheel", n), this.removeEventListener("unregister", r));
    };
    this.addEventListener("unregister", r);
  }
  unregisterElement(e) {
    this.dispatchEvent({
      type: "unregister",
      elm: e
    });
  }
  getScreenPosition(e) {
    if (this.position.x != this.position.x)
      return new m.Vector2(NaN, NaN);
    const t = this.position.clone().divide(e).multiplyScalar(2).subScalar(1);
    return t.y *= -1, t;
  }
  getRelativePosition(e, t) {
    const i = e.getClientRects()[0];
    let n = this.position.x - i.left, r = this.position.y - i.top;
    return t && (n /= i.width, r /= i.height), new m.Vector2(n, r);
  }
  setPos(e, t) {
    this.position.x !== this.position.x || this.position.y !== this.position.y || this.delta.set(e - this.position.x, t - this.position.y), this.position.set(e, t);
  }
  onTouch(e, t) {
    const i = t.touches[0];
    i ? this.touchEventHandler(i.pageX, i.pageY, e, t) : e == "end" && this.touchEventHandler(NaN, NaN, e, t);
  }
  onPointer(e, t) {
    const i = t.pointerType;
    i != null ? i == "mouse" && (t.button == -1 || t.button == 0) && this.touchEventHandler(t.pageX, t.pageY, e, t) : this.touchEventHandler(t.pageX, t.pageY, e, t);
  }
  touchEventHandler(e, t, i, n) {
    let r = !1;
    const a = e - window.pageXOffset, l = t - window.pageYOffset;
    i == "start" ? (this.isTouching = !0, this.setPos(a, l), this.delta.set(0, 0), r = !0) : i == "move" ? (this.setPos(a, l), this.isTouching && (r = !0)) : i == "end" && ("targetTouches" in n ? n.targetTouches.length == 0 && (this.isTouching = !1) : this.isTouching = !1, r = !0), r && this.dispatchEvent({
      type: "update",
      pointerEvent: n,
      pointerEventType: i,
      position: this.position.clone(),
      delta: this.delta.clone()
    });
  }
  update() {
    this.isSP || (this.dispatchEvent({
      type: "update",
      pointerEvent: null,
      pointerEventType: "hover",
      position: this.position.clone(),
      delta: this.delta.clone()
    }), this.delta.set(0, 0));
  }
  wheelOptimized(e) {
    this.dispatchEvent({
      type: "wheelOptimized",
      wheelEvent: e
    });
  }
  wheel(e) {
    if (this.dispatchEvent({
      type: "wheel",
      wheelEvent: e
    }), this.lethargy.check(e) !== !1)
      this.wheelOptimized(e);
    else {
      const t = e.deltaY - this.memDelta;
      Math.abs(t) > 50 ? (this.memDelta = t, this.wheelOptimized(e), this.riseDelta = !0) : t == 0 ? this.riseDelta && this.wheelOptimized(e) : t < 0 && (this.riseDelta = !1), this.memDelta = e.deltaY;
    }
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class Z extends m.EventDispatcher {
  constructor(e) {
    super();
    f(this, "pointer");
    f(this, "clock");
    f(this, "layers", []);
    f(this, "pointerEventElement");
    e && e.silent || console.log("%c- ore-three -", "padding: 5px 10px ;background-color: black; color: white;font-size:11px"), this.clock = new m.Clock(), this.pointer = new _(), this.setPointerEventElement(e && e.pointerEventElement || document.body);
    const t = this.pointerEvent.bind(this), i = this.onWheel.bind(this), n = this.onWheelOptimized.bind(this), r = this.onOrientationDevice.bind(this), a = this.onWindowResize.bind(this);
    this.pointer.addEventListener("update", t), this.pointer.addEventListener("wheel", i), this.pointer.addEventListener("wheelOptimized", n), window.addEventListener("orientationchange", r), window.addEventListener("resize", a), this.addEventListener("dispose", () => {
      this.pointer.removeEventListener("update", t), this.pointer.removeEventListener("wheel", i), this.pointer.removeEventListener("wheelOptimized", n), window.removeEventListener("orientationchange", r), window.removeEventListener("resize", a);
    }), this.tick();
  }
  tick() {
    const e = this.clock.getDelta();
    this.pointer.update();
    for (let t = 0; t < this.layers.length; t++)
      this.layers[t].tick(e);
    requestAnimationFrame(this.tick.bind(this));
  }
  onWindowResize() {
    for (let e = 0; e < this.layers.length; e++)
      this.layers[e].onResize();
  }
  onOrientationDevice() {
    this.onWindowResize();
  }
  pointerEvent(e) {
    for (let t = 0; t < this.layers.length; t++)
      this.layers[t].pointerEvent(e);
  }
  onWheel(e) {
    for (let t = 0; t < this.layers.length; t++)
      this.layers[t].onWheel(e.wheelEvent);
  }
  onWheelOptimized(e) {
    for (let t = 0; t < this.layers.length; t++)
      this.layers[t].onWheelOptimized(e.wheelEvent);
  }
  /*-------------------------------
  	API
  -------------------------------*/
  addLayer(e) {
    this.layers.push(e), e.onBind();
  }
  getLayer(e) {
    for (let t = 0; t < this.layers.length; t++)
      if (this.layers[t].info.name == e)
        return this.layers[t];
    return null;
  }
  removeLayer(e) {
    for (let t = this.layers.length - 1; t >= 0; t--) {
      const i = this.layers[t];
      i.info.name == e && (i.onUnbind(), this.layers.splice(t, 1));
    }
  }
  setPointerEventElement(e) {
    this.pointerEventElement && this.pointer.unregisterElement(this.pointerEventElement), this.pointer.registerElement(e), this.pointerEventElement = e;
  }
  dispose() {
    this.layers.map((t) => t.info.name).forEach((t) => {
      this.removeLayer(t);
    }), this.tick = () => {
    }, this.dispatchEvent({ type: "dispose" });
  }
}
var S;
((u) => {
  u.NEWTON_ITERATIONS = 4, u.NEWTON_MIN_SLOPE = 1e-3, u.SUBDIVISION_PRECISION = 1e-7, u.SUBDIVISION_MAX_ITERATIONS = 10, u.BEZIER_EASING_CACHE_SIZE = 11, u.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / u.BEZIER_EASING_CACHE_SIZE;
  function c(s) {
    return -s.p0 + 3 * s.p1 - 3 * s.p2 + s.p3;
  }
  function e(s) {
    return 3 * s.p0 - 6 * s.p1 + 3 * s.p2;
  }
  function t(s) {
    return -3 * s.p0 + 3 * s.p1;
  }
  function i(s, o) {
    return 3 * c(s) * o * o + 2 * e(s) * o + t(s);
  }
  u.calcBezierSlope = i;
  function n(s, o) {
    return ((c(s) * o + e(s)) * o + t(s)) * o + s.p0;
  }
  u.calcBezier = n;
  function r(s, o, d, p) {
    let v = 0, g = 0;
    for (let y = 0; y < u.SUBDIVISION_MAX_ITERATIONS; y++)
      g = o + (d - o) / 2, v = n(p, g), v > s ? d = g : o = g;
    return g;
  }
  function a(s, o, d) {
    for (let p = 0; p < u.NEWTON_ITERATIONS; p++) {
      const v = i(o, d);
      if (v == 0)
        return d;
      const g = n(o, d) - s;
      d -= g / v;
    }
    return d;
  }
  function l(s, o, d) {
    s.p1 = Math.max(s.p0, Math.min(s.p3, s.p1)), s.p2 = Math.max(s.p0, Math.min(s.p3, s.p2));
    let p = 0;
    for (let y = 1; y < d.length && (p = y - 1, !(o < d[y])); y++)
      ;
    const v = p / (u.BEZIER_EASING_CACHE_SIZE - 1), g = i(s, v) / (s.p3 - s.p0);
    return g == 0 ? v : g > 0.01 ? a(o, s, v) : r(o, v, v + u.BEZIER_EASING_SAMPLE_STEP_SIZE, s);
  }
  u.getBezierTfromX = l;
})(S || (S = {}));
var T;
((u) => {
  function c(h = 6) {
    return (b) => {
      var w = Math.exp(-h * (2 * b - 1)), E = Math.exp(-h);
      return (1 + (1 - w) / (1 + w) * (1 + E) / (1 - E)) / 2;
    };
  }
  u.sigmoid = c;
  function e(h, b, w) {
    const E = Math.max(0, Math.min(1, (w - h) / (b - h)));
    return E * E * (3 - 2 * E);
  }
  u.smoothstep = e;
  function t(h) {
    return h;
  }
  u.linear = t;
  function i(h) {
    return h * h;
  }
  u.easeInQuad = i;
  function n(h) {
    return h * (2 - h);
  }
  u.easeOutQuad = n;
  function r(h) {
    return h < 0.5 ? 2 * h * h : -1 + (4 - 2 * h) * h;
  }
  u.easeInOutQuad = r;
  function a(h) {
    return h * h * h;
  }
  u.easeInCubic = a;
  function l(h) {
    return --h * h * h + 1;
  }
  u.easeOutCubic = l;
  function s(h) {
    return h < 0.5 ? 4 * h * h * h : (h - 1) * (2 * h - 2) * (2 * h - 2) + 1;
  }
  u.easeInOutCubic = s;
  function o(h) {
    return h * h * h * h;
  }
  u.easeInQuart = o;
  function d(h) {
    return 1 - --h * h * h * h;
  }
  u.easeOutQuart = d;
  function p(h) {
    return h < 0.5 ? 8 * h * h * h * h : 1 - 8 * --h * h * h * h;
  }
  u.easeInOutQuart = p;
  function v(h) {
    return h * h * h * h * h;
  }
  u.easeInQuint = v;
  function g(h) {
    return 1 + --h * h * h * h * h;
  }
  u.easeOutQuint = g;
  function y(h) {
    return h < 0.5 ? 16 * h * h * h * h * h : 1 + 16 * --h * h * h * h * h;
  }
  u.easeInOutQuint = y;
  function A(h, b, w, E) {
    for (var z = new Array(S.BEZIER_EASING_CACHE_SIZE), L = 0; L < S.BEZIER_EASING_CACHE_SIZE; ++L)
      z[L] = S.calcBezier({ p0: h.x, p1: b.x, p2: w.x, p3: E.x }, L / (S.BEZIER_EASING_CACHE_SIZE - 1));
    return (O) => O <= h.x ? h.y : E.x <= O ? E.y : S.calcBezier({ p0: h.y, p1: b.y, p2: w.y, p3: E.y }, S.getBezierTfromX({ p0: h.x, p1: b.x, p2: w.x, p3: E.x }, O, z));
  }
  u.bezier = A;
  function D(h, b, w, E) {
    return A(
      { x: 0, y: 0 },
      { x: h, y: b },
      { x: w, y: E },
      { x: 1, y: 1 }
    );
  }
  u.cubicBezier = D;
})(T || (T = {}));
var I;
((u) => {
  function c(a, l, s) {
    return a + (l - a) * s;
  }
  u.number = c;
  function e(a, l, s) {
    if (a.length == l.length) {
      const o = [];
      for (let d = 0; d < a.length; d++)
        o.push(a[d] + (l[d] - a[d]) * s);
      return o;
    } else
      return console.log("Different length Arrays!!!"), !1;
  }
  u.numberArray = e;
  function t(a, l, s) {
    return a.clone().lerp(l, s);
  }
  u.THREEVectors = t;
  function i(a, l, s) {
    return a.clone().slerp(l, s);
  }
  u.THREEQuaternion = i;
  function n(a, l, s) {
    const o = a.clone(), d = l.clone();
    return o.x = o.x + (d.x - o.x) * s, o.y = o.y + (d.y - o.y) * s, o.z = o.z + (d.z - o.z) * s, o;
  }
  u.THREEEuler = n;
  function r(a) {
    if (typeof a == "number")
      return u.number;
    if (a instanceof Array)
      return u.numberArray;
    if ("isVector2" in a || "isVector3" in a || "isVector4" in a || "isColor" in a)
      return u.THREEVectors;
    if ("isQuaternion" in a)
      return u.THREEQuaternion;
    if ("isEuler" in a)
      return u.THREEEuler;
  }
  u.getLerpFunc = r;
})(I || (I = {}));
class K extends m.EventDispatcher {
  constructor() {
    super();
    f(this, "dataBase");
    f(this, "variables");
    f(this, "dispatchEvents", []);
    f(this, "_isAnimating", !1);
    this.variables = {}, this.dataBase = {};
  }
  add(e) {
    const t = {
      time: 0,
      duration: 0,
      value: this.getValueClone(e.initValue),
      startValue: this.getValueClone(e.initValue),
      goalValue: this.getValueClone(e.initValue),
      easing: e.easing || T.sigmoid(),
      lerpFunc: e.customLerpFunc || I.getLerpFunc(e.initValue),
      userData: e.userData,
      isAnimating: !1,
      isAnimatingReseve: !1
    };
    return this.dataBase[e.name] = t.value, this.variables[e.name] = t, this.dispatchEvent({
      type: "added",
      varName: e.name,
      variable: t
    }), t;
  }
  /*-------------------------------
  	Set
  -------------------------------*/
  setEasing(e, t) {
    const i = this.variables[e];
    i ? i.easing = t : console.warn('"' + e + '" is not exist');
  }
  setValue(e, t) {
    let i = this.dataBase[e];
    if (i !== void 0)
      typeof i == "number" ? this.dataBase[e] = t : "copy" in i ? i.copy(t) : i instanceof Array && (i = t.concat()), this.updateDataBase(e), this.cancelAnimate(e);
    else
      return console.warn('"' + e + '" is not exist'), null;
  }
  /*-------------------------------
  	Animate
  -------------------------------*/
  animate(e, t, i = 1, n) {
    const r = this.variables[e];
    r ? (this.cancelAnimate(e), this.animateVariableInit(r, t, i, null, () => {
      r.onAnimationFinished = null, n && n();
    }), this._isAnimating = !0) : console.error('"' + e + '" is not exist');
  }
  animateAsync(e, t, i = 1, n) {
    return new Promise((r, a) => {
      const l = this.variables[e];
      l ? (this.cancelAnimate(e), this.animateVariableInit(l, t, i, () => {
        l.onAnimationFinished = null, a("animation canceled");
      }, () => {
        l.onAnimationFinished = null, n && n(), r(null);
      }), this._isAnimating = !0) : a('"' + e + '" is not exist');
    });
  }
  animateVariableInit(e, t, i, n, r) {
    e.time = 0, e.isAnimating = !0, e.isAnimatingReseve = !0, e.duration = i, e.startValue = this.getValueClone(e.value), e.goalValue = this.getValueClone(t), e.onAnimationCanceled = n, e.onAnimationFinished = r;
  }
  cancelAnimate(e) {
    const t = this.variables[e];
    t ? (t.time = -1, t.onAnimationFinished = null, t.onAnimationCanceled && t.onAnimationCanceled()) : console.warn('"' + e + '" is not exist');
  }
  /*-------------------------------
  	Get
  -------------------------------*/
  get(e) {
    return this.variables[e] ? this.variables[e].value : (console.warn('"' + e + '" is not exist'), null);
  }
  getVariableObject(e, t = !1) {
    return this.variables[e] ? this.variables[e] : (t || console.warn('"' + e + '" is not exist'), null);
  }
  /*-------------------------------
  	Utils
  -------------------------------*/
  applyToUniforms(e) {
    const t = Object.keys(this.variables);
    for (let i = 0; i < t.length; i++) {
      const n = this.getVariableObject(t[i]);
      n && (e[t[i]] = n);
    }
  }
  isAnimating(e) {
    return e !== void 0 ? this.variables[e] ? this.variables[e].isAnimating : !1 : this._isAnimating;
  }
  /*-------------------------------
  	Utils
  -------------------------------*/
  getValueClone(e) {
    return typeof e == "number" ? e : e instanceof Array ? e.concat() : "clone" in e ? e.clone() : e;
  }
  wait(e) {
    return new Promise((i) => {
      setTimeout(() => {
        i();
      }, e * 1e3);
    });
  }
  /*-------------------------------
  	Update
  -------------------------------*/
  update(e) {
    this._isAnimating = !1;
    const t = Object.keys(this.variables);
    for (let i = 0; i < t.length; i++) {
      const n = t[i], r = this.variables[n];
      if (r.isAnimating && r.isAnimatingReseve) {
        this._isAnimating = !0;
        let a = !1;
        const l = r.duration, s = r.easing, o = r.lerpFunc;
        l == 0 ? r.time = 1 : r.time += (e || 0.016) / l, r.time >= 1 && (a = !0, r.time = 1);
        let d = r.goalValue;
        o && (d = o(r.startValue, r.goalValue, s(r.time)));
        const p = this.dataBase[n];
        typeof p == "number" || !("copy" in p) ? this.dataBase[n] = d : "copy" in p && p.copy(d), this.dispatchEvent({
          type: "update/" + t[i],
          deltaTime: e,
          value: r.value
        }), a && (r.onAnimationFinished && this.dispatchEvents.push(r.onAnimationFinished), r.isAnimatingReseve = !1);
      } else
        r.isAnimating = !1, r.time = 0;
    }
    for (; this.dispatchEvents.length != 0; ) {
      const i = this.dispatchEvents.pop();
      i && i();
    }
    this.updateDataBase(), this.dispatchEvent({
      type: "update",
      deltaTime: e
    }), this._isAnimating && this.dispatchEvent({
      type: "animate",
      deltaTime: e
    });
  }
  updateDataBase(e) {
    if (e) {
      const i = this.variables[e], n = this.dataBase[e];
      i && n !== void 0 && (typeof i.value == "number" || !("copy" in i.value)) && (i.value = n);
      return;
    }
    const t = Object.keys(this.dataBase);
    for (let i = 0; i < t.length; i++) {
      const n = this.variables[t[i]], r = this.dataBase[t[i]];
      n && r !== void 0 && (typeof n.value == "number" || !("copy" in n.value)) && (n.value = r);
    }
  }
}
var x = {}, k = {
  get exports() {
    return x;
  },
  set exports(u) {
    x = u;
  }
};
/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
(function(u) {
  (function(c) {
    function e() {
    }
    var t = e.prototype, i = c.EventEmitter;
    function n(l, s) {
      for (var o = l.length; o--; )
        if (l[o].listener === s)
          return o;
      return -1;
    }
    function r(l) {
      return function() {
        return this[l].apply(this, arguments);
      };
    }
    t.getListeners = function(s) {
      var o = this._getEvents(), d, p;
      if (s instanceof RegExp) {
        d = {};
        for (p in o)
          o.hasOwnProperty(p) && s.test(p) && (d[p] = o[p]);
      } else
        d = o[s] || (o[s] = []);
      return d;
    }, t.flattenListeners = function(s) {
      var o = [], d;
      for (d = 0; d < s.length; d += 1)
        o.push(s[d].listener);
      return o;
    }, t.getListenersAsObject = function(s) {
      var o = this.getListeners(s), d;
      return o instanceof Array && (d = {}, d[s] = o), d || o;
    };
    function a(l) {
      return typeof l == "function" || l instanceof RegExp ? !0 : l && typeof l == "object" ? a(l.listener) : !1;
    }
    t.addListener = function(s, o) {
      if (!a(o))
        throw new TypeError("listener must be a function");
      var d = this.getListenersAsObject(s), p = typeof o == "object", v;
      for (v in d)
        d.hasOwnProperty(v) && n(d[v], o) === -1 && d[v].push(p ? o : {
          listener: o,
          once: !1
        });
      return this;
    }, t.on = r("addListener"), t.addOnceListener = function(s, o) {
      return this.addListener(s, {
        listener: o,
        once: !0
      });
    }, t.once = r("addOnceListener"), t.defineEvent = function(s) {
      return this.getListeners(s), this;
    }, t.defineEvents = function(s) {
      for (var o = 0; o < s.length; o += 1)
        this.defineEvent(s[o]);
      return this;
    }, t.removeListener = function(s, o) {
      var d = this.getListenersAsObject(s), p, v;
      for (v in d)
        d.hasOwnProperty(v) && (p = n(d[v], o), p !== -1 && d[v].splice(p, 1));
      return this;
    }, t.off = r("removeListener"), t.addListeners = function(s, o) {
      return this.manipulateListeners(!1, s, o);
    }, t.removeListeners = function(s, o) {
      return this.manipulateListeners(!0, s, o);
    }, t.manipulateListeners = function(s, o, d) {
      var p, v, g = s ? this.removeListener : this.addListener, y = s ? this.removeListeners : this.addListeners;
      if (typeof o == "object" && !(o instanceof RegExp))
        for (p in o)
          o.hasOwnProperty(p) && (v = o[p]) && (typeof v == "function" ? g.call(this, p, v) : y.call(this, p, v));
      else
        for (p = d.length; p--; )
          g.call(this, o, d[p]);
      return this;
    }, t.removeEvent = function(s) {
      var o = typeof s, d = this._getEvents(), p;
      if (o === "string")
        delete d[s];
      else if (s instanceof RegExp)
        for (p in d)
          d.hasOwnProperty(p) && s.test(p) && delete d[p];
      else
        delete this._events;
      return this;
    }, t.removeAllListeners = r("removeEvent"), t.emitEvent = function(s, o) {
      var d = this.getListenersAsObject(s), p, v, g, y, A;
      for (y in d)
        if (d.hasOwnProperty(y))
          for (p = d[y].slice(0), g = 0; g < p.length; g++)
            v = p[g], v.once === !0 && this.removeListener(s, v.listener), A = v.listener.apply(this, o || []), A === this._getOnceReturnValue() && this.removeListener(s, v.listener);
      return this;
    }, t.trigger = r("emitEvent"), t.emit = function(s) {
      var o = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(s, o);
    }, t.setOnceReturnValue = function(s) {
      return this._onceReturnValue = s, this;
    }, t._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, t._getEvents = function() {
      return this._events || (this._events = {});
    }, e.noConflict = function() {
      return c.EventEmitter = i, e;
    }, u.exports ? u.exports = e : c.EventEmitter = e;
  })(typeof window < "u" ? window : V || {});
})(k);
class P extends x {
  constructor(e) {
    super();
    f(this, "name");
    f(this, "curves", {});
    f(this, "uniforms");
    f(this, "frame");
    this.name = e || "", this.uniforms = {}, this.frame = {
      start: 0,
      end: 0,
      duration: 0
    };
  }
  addFcurveGroup(e, t) {
    this.curves[e] = t, this.calcFrame();
  }
  removeFCurve(e) {
    delete this.curves[e], this.calcFrame();
  }
  calcFrame() {
    const e = Object.keys(this.curves);
    let t = 1 / 0, i = -1 / 0;
    for (let n = 0; n < e.length; n++) {
      const r = this.curves[e[n]];
      r.frameStart < t && (t = r.frameStart), r.frameEnd > i && (i = r.frameEnd);
    }
    (t == -1 / 0 || i == 1 / 0) && (t = 0, i = 1), this.frame.start = t, this.frame.end = i, this.frame.duration = this.frame.end - this.frame.start;
  }
  getFCurveGroup(e) {
    return this.curves[e] || null;
  }
  /*-------------------------------
  	get values
  -------------------------------*/
  assignUniforms(e, t) {
    this.uniforms[e] = t;
  }
  getUniforms(e) {
    if (this.uniforms[e])
      return this.uniforms[e];
    const t = this.getFCurveGroup(e);
    if (t) {
      const i = {
        value: t.createInitValue()
      };
      return this.uniforms[e] = i, i;
    }
    return null;
  }
  getValue(e, t) {
    const i = this.getUniforms(e);
    if (!i)
      return t || null;
    const n = i.value;
    return t ? typeof n == "number" ? (t.x = n, t) : (t.x = n.x, t.y = n.y, "z" in t && "z" in n && (t.z = n.z), "w" in t && "w" in n && (t.w = n.w), t || null) : n;
  }
  getValueAt(e, t, i) {
    const n = this.getFCurveGroup(e);
    return i ? n ? n.getValue(t || 0, i) : i : n ? n.getValue(t) : null;
  }
  /*-------------------------------
  	UpdateFrame
  -------------------------------*/
  updateFrame(e) {
    const t = Object.keys(this.curves);
    for (let i = 0; i < t.length; i++) {
      const n = this.curves[t[i]], r = this.getUniforms(t[i]);
      r && (typeof r.value == "number" ? r.value = n.getValue(e) || 0 : n.getValue(e, r.value));
    }
    this.emitEvent("update", [this]);
  }
}
class B extends x {
  constructor(e) {
    super();
    f(this, "keyframes", []);
    f(this, "cache", { frame: NaN, value: NaN });
    f(this, "frameStart");
    f(this, "frameEnd");
    f(this, "frameDuration");
    this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.set(e);
  }
  set(e) {
    e && (this.keyframes.length = 0, e.forEach((t) => {
      this.addKeyFrame(t);
    }));
  }
  addKeyFrame(e) {
    let t = 0;
    for (let i = 0; i < this.keyframes.length && this.keyframes[i].coordinate.x < e.coordinate.x; i++)
      t++;
    this.keyframes.splice(t, 0, e), this.frameStart = this.keyframes[0].coordinate.x, this.frameEnd = this.keyframes[this.keyframes.length - 1].coordinate.x;
  }
  getValue(e) {
    if (e == this.cache.frame)
      return this.cache.value;
    let t = null;
    for (let i = 0; i < this.keyframes.length; i++) {
      const n = this.keyframes[i];
      if (e <= n.coordinate.x) {
        const r = this.keyframes[i - 1];
        r ? t = r.to(n, e) : t = n.coordinate.y;
        break;
      }
    }
    return t === null && this.keyframes.length > 0 && (t = this.keyframes[this.keyframes.length - 1].coordinate.y), t !== null ? (this.cache = {
      frame: e,
      value: t
    }, t) : 0;
  }
}
class M extends x {
  constructor(e, t, i, n, r, a) {
    super();
    f(this, "name");
    f(this, "curve");
    f(this, "type", "scalar");
    f(this, "frameStart");
    f(this, "frameEnd");
    f(this, "frameDuration");
    this.name = e || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curve = {
      x: null,
      y: null,
      z: null,
      w: null,
      scalar: null
    }, t && this.setFCurve(t, "x"), i && this.setFCurve(i, "y"), n && this.setFCurve(n, "z"), r && this.setFCurve(r, "w");
  }
  setFCurve(e, t) {
    this.curve[t] = e, this.calcType(), this.calcFrame();
  }
  calcType() {
    this.curve.scalar && (this.type = "scalar"), this.curve.w ? this.type = "vec4" : this.curve.z ? this.type = "vec3" : this.curve.y ? this.type = "vec2" : this.curve.x && (this.type = "scalar");
  }
  calcFrame() {
    const e = Object.keys(this.curve);
    let t = 1 / 0, i = -1 / 0;
    for (let n = 0; n < e.length; n++) {
      const r = this.curve[e[n]];
      r && (r.frameStart < t && (t = r.frameStart), r.frameEnd > i && (i = r.frameEnd));
    }
    (t == -1 / 0 || i == 1 / 0) && (t = 0, i = 1), this.frameStart = t, this.frameEnd = i, this.frameDuration = this.frameEnd - this.frameStart;
  }
  createInitValue() {
    return this.type == "vec2" ? new m.Vector2() : this.type == "vec3" ? new m.Vector3() : this.type == "vec4" ? new m.Vector4() : 0;
  }
  getValue(e, t) {
    return t ? (this.curve.x && (t.x = this.curve.x.getValue(e)), this.curve.y && (t.y = this.curve.y.getValue(e)), this.curve.z && "z" in t && (t.z = this.curve.z.getValue(e)), this.curve.w && "w" in t && (t.w = this.curve.w.getValue(e)), t) : this.curve.scalar ? this.curve.scalar.getValue(e) : null;
  }
}
class W extends x {
  constructor(e, t, i, n) {
    super();
    f(this, "coordinate", { x: 0, y: 0 });
    f(this, "handleLeft", { x: 0, y: 0 });
    f(this, "handleRight", { x: 0, y: 0 });
    f(this, "interpolation", "BEZIER");
    f(this, "easing", null);
    f(this, "nextFrame", null);
    this.set(e, t, i, n);
  }
  set(e, t, i, n) {
    this.coordinate = e, this.handleLeft = t || e, this.handleRight = i || e, this.interpolation = n || "BEZIER";
  }
  getEasing(e, t) {
    return e == "BEZIER" ? T.bezier(this.coordinate, this.handleRight, t.handleLeft, t.coordinate) : (i) => {
      const n = t.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (t.coordinate.x - this.coordinate.x), this.coordinate.y + i * n;
    };
  }
  to(e, t) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != e.coordinate.x || this.nextFrame.coordinate.y != e.coordinate.y) && (this.easing = this.getEasing(this.interpolation, e), this.nextFrame = e), this.easing ? this.easing(t) : 0;
  }
}
class X extends x {
  constructor(e) {
    super();
    // ws
    f(this, "url");
    f(this, "ws");
    f(this, "connected", !1);
    // frame
    f(this, "frameCurrent", 0);
    f(this, "frameStart", 0);
    f(this, "frameEnd", 0);
    // animation
    f(this, "objects", []);
    f(this, "actions", []);
    e && (this.url = e, this.connect(this.url));
  }
  connect(e) {
    this.url = e, this.ws = new WebSocket(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = (t) => {
      console.error(t);
    };
  }
  syncJsonScene(e) {
    const t = new XMLHttpRequest();
    t.onreadystatechange = () => {
      t.readyState == 4 && t.status == 200 && this.onSyncScene(JSON.parse(t.response));
    }, t.open("GET", e), t.send();
  }
  /*-------------------------------
  	Events
  -------------------------------*/
  onSyncScene(e) {
    this.actions.length = 0, this.objects.length = 0, e.actions.forEach((t) => {
      const i = new P(t.name), n = Object.keys(t.fcurve_groups);
      for (let r = 0; r < n.length; r++) {
        const a = n[r], l = new M(a);
        t.fcurve_groups[a].forEach((s) => {
          const o = new B();
          o.set(s.keyframes.map((d) => new W(d.c, d.h_l, d.h_r, d.i))), l.setFCurve(o, s.axis);
        }), i.addFcurveGroup(l.name, l);
      }
      this.actions.push(i);
    }), e.objects.forEach((t) => {
      this.objects.push(t);
    }), this.emitEvent("update/scene", [this]), this.setTimeline(this.frameCurrent);
  }
  onSyncTimeline(e) {
    this.setTimeline(e.current, e.start, e.end);
  }
  /*-------------------------------
  	WS Events
  -------------------------------*/
  onOpen(e) {
    this.connected = !0;
  }
  onMessage(e) {
    const t = JSON.parse(e.data);
    t.type == "sync/scene" ? this.onSyncScene(t.data) : t.type == "sync/timeline" && this.onSyncTimeline(t.data);
  }
  onClose(e) {
    this.disposeWS();
  }
  /*-------------------------------
  	API
  -------------------------------*/
  getActionNameList(e) {
    for (let t = 0; t < this.objects.length; t++)
      if (this.objects[t].name == e)
        return this.objects[t].actions;
    return [];
  }
  getAction(e) {
    for (let t = 0; t < this.actions.length; t++)
      if (this.actions[t].name == e)
        return this.actions[t];
    return null;
  }
  getActionList(e) {
    const t = [];
    return this.getActionNameList(e).forEach((n) => {
      const r = this.getAction(n);
      r && t.push(r);
    }), t;
  }
  getActionContainsAccessor(e) {
    return this.actions.find((t) => Object.keys(t.curves).some((n) => n == e)) || null;
  }
  setTimeline(e, t, i) {
    this.frameCurrent = e, this.frameStart = t || this.frameStart, this.frameEnd = i || this.frameEnd, this.emitEvent("update/timeline", [this.frameCurrent, this.frameStart, this.frameEnd]);
  }
  /*-------------------------------
  	Dispose
  -------------------------------*/
  dispose() {
    this.disposeWS();
  }
  disposeWS() {
    this.ws && (this.ws.close(), this.ws.onmessage = null, this.ws.onclose = null, this.ws.onopen = null, this.connected = !1);
  }
}
const U = `#define GLSLIFY 1
varying vec2 vUv;void main(){gl_Position=vec4(position,1.0);vUv=uv;}`, j = `#define GLSLIFY 1
uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=texture2D(tex,vUv);}`;
var R;
((u) => {
  function c(...e) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      e[i] != null && Object.assign(t, e[i]);
    return t;
  }
  u.mergeUniforms = c;
})(R || (R = {}));
class Y {
  constructor(c, e) {
    f(this, "renderer");
    f(this, "dataSize");
    f(this, "uniforms");
    f(this, "scene");
    f(this, "camera");
    f(this, "mesh");
    f(this, "materials");
    f(this, "tempDataLinear");
    f(this, "tempDataNear");
    f(this, "renderTargets", []);
    this.renderer = c, this.dataSize = e.clone(), this.uniforms = {
      dataSize: {
        value: this.dataSize
      }
    }, this.tempDataLinear = this.createData({
      minFilter: m.LinearFilter,
      magFilter: m.LinearFilter
    }), this.tempDataNear = this.createData({
      minFilter: m.NearestFilter,
      magFilter: m.NearestFilter
    }), this.scene = new m.Scene(), this.camera = new m.Camera(), this.materials = [], this.mesh = new m.Mesh(new m.PlaneGeometry(2, 2)), this.scene.add(this.mesh);
  }
  get isSupported() {
    return this.renderer.extensions.get("OES_texture_float");
  }
  createInitializeTexture() {
    const c = new Float32Array(this.uniforms.dataSize.value.x * this.uniforms.dataSize.value.y * 4), e = new m.DataTexture(c, this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, m.RGBAFormat, m.FloatType);
    return e.needsUpdate = !0, e;
  }
  createData(c, e) {
    const t = navigator.userAgent, i = t.indexOf("iPhone") >= 0 || t.indexOf("iPad") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, n = {
      wrapS: m.ClampToEdgeWrapping,
      wrapT: m.ClampToEdgeWrapping,
      minFilter: m.NearestFilter,
      magFilter: m.NearestFilter,
      format: m.RGBAFormat,
      type: i ? m.HalfFloatType : m.FloatType,
      stencilBuffer: !1,
      depthBuffer: !1
    };
    let r = null, a = null;
    c && (c.isDataTexture ? (r = c, e && (a = e)) : a = c), a && (n.wrapS = a.wrapS || n.wrapS, n.wrapT = a.wrapT || n.wrapT, n.minFilter = a.minFilter || n.minFilter, n.magFilter = a.magFilter || n.magFilter, n.format = a.format || n.format, n.type = a.type || n.type, n.stencilBuffer = a.stencilBuffer || n.stencilBuffer, n.depthBuffer = a.depthBuffer || n.depthBuffer);
    const l = new m.WebGLRenderTarget(this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, n), s = { buffer: l };
    if (this.renderTargets.push(l), r) {
      const o = this.createKernel({
        fragmentShader: j,
        uniforms: {
          tex: {
            value: r
          }
        }
      });
      this.compute(o, s);
    }
    return s;
  }
  createKernel(c) {
    const e = R.mergeUniforms(c.uniforms, this.uniforms);
    c.uniforms = e, c.vertexShader = c.vertexShader || U;
    const t = new m.ShaderMaterial(c);
    return this.materials.push(t), {
      material: t,
      uniforms: c.uniforms
    };
  }
  compute(c, e, t) {
    let i;
    e.buffer.texture.magFilter == m.LinearFilter ? i = this.tempDataLinear : i = this.tempDataNear, this.mesh.material = c.material;
    const n = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(i.buffer), this.renderer.render(this.scene, t || this.camera), this.swapBuffers(e, i), this.renderer.setRenderTarget(n);
  }
  swapBuffers(c, e) {
    const t = c.buffer;
    c.buffer = e.buffer, e.buffer = t;
  }
  dispose() {
    this.mesh.geometry.dispose();
    for (let e = 0; e < this.materials.length; e++)
      this.materials[e].dispose();
    this.scene.remove(this.mesh), this.tempDataLinear.buffer.dispose(), this.tempDataNear.buffer.dispose();
  }
  resizeData(c) {
    this.dataSize.copy(c);
    for (let e = 0; e < this.renderTargets.length; e++)
      this.renderTargets[e].setSize(c.x, c.y);
  }
}
const G = `#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
class q {
  constructor(c, e, t) {
    f(this, "renderer");
    f(this, "scene");
    f(this, "camera");
    f(this, "screen");
    f(this, "effect");
    this.renderer = c, this.scene = new m.Scene(), this.camera = new m.OrthographicCamera(-1, 1, 1, -1), this.screen = new m.Mesh(t || new m.PlaneGeometry(2, 2)), this.scene.add(this.screen), e.vertexShader = e.vertexShader || G, e.uniforms = e.uniforms || {}, e.uniforms.resolution = {
      value: new m.Vector2()
    }, this.effect = {
      material: new m.ShaderMaterial(e)
    };
  }
  render(c, e = null) {
    const t = this.renderer.getRenderTarget(), i = this.effect, n = i.material, r = n.uniforms;
    if (c) {
      const a = Object.keys(c);
      for (let l = 0; l < a.length; l++)
        r[a[l]] ? r[a[l]].value = c[a[l]] : (r[a[l]] = { value: c[a[l]] }, i.material.needsUpdate = !0, i.material.uniforms = r);
    }
    e ? r.resolution.value.set(e.width, e.height) : this.renderer.getSize(r.resolution.value), this.screen.material = n, this.renderer.setRenderTarget(e), this.renderer.render(this.scene, this.camera), this.renderer.setRenderTarget(t);
  }
}
class J {
  constructor(c, e, t) {
    f(this, "obj");
    f(this, "baseTransform");
    f(this, "transform");
    this.obj = c, this.baseTransform = {
      position: this.obj.position.clone(),
      rotation: this.obj.quaternion.clone(),
      scale: this.obj.scale.clone()
    }, this.transform = e, t || (this.transform.position && this.transform.position.add(this.obj.position), this.transform.rotation && this.transform.rotation.multiply(this.obj.quaternion));
  }
  updateTransform(c) {
    this.transform.position && this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position, c)), this.transform.rotation && this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation, c)), this.transform.scale && this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale * c + 1 - c));
  }
}
class $ extends m.EventDispatcher {
  constructor() {
    super();
  }
  goHome() {
    this.dispatchEvent({ type: "gohome" });
  }
  wait(c) {
    return new Promise((e, t) => {
      const i = () => {
        t(), this.removeEventListener("gohome", i);
      };
      this.addEventListener("gohome", i), setTimeout(() => {
        this.removeEventListener("gohome", i), e();
      }, c * 1e3);
    });
  }
}
export {
  P as AnimationAction,
  K as Animator,
  Q as BaseLayer,
  X as BlenderConnector,
  Z as Controller,
  T as Easings,
  B as FCurve,
  M as FCurveGroup,
  W as FCurveKeyFrame,
  Y as GPUComputationController,
  J as LayoutController,
  I as Lerps,
  _ as Pointer,
  q as PostProcessing,
  R as UniformsLib,
  $ as WaitMan
};
//# sourceMappingURL=ore-three.js.map
