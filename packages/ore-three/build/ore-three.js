var P = Object.defineProperty;
var V = (c, u, e) => u in c ? P(c, u, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[u] = e;
var d = (c, u, e) => (V(c, typeof u != "symbol" ? u + "" : u, e), e);
import * as p from "three";
class j extends p.EventDispatcher {
  constructor(e) {
    super();
    d(this, "info");
    d(this, "renderer");
    d(this, "scene");
    d(this, "camera");
    d(this, "time", 0);
    d(this, "commonUniforms");
    d(this, "readyAnimate", !1);
    this.renderer = new p.WebGLRenderer(e), this.renderer.setPixelRatio(e.pixelRatio || window.devicePixelRatio), this.renderer.debug.checkShaderErrors = !0, this.info = {
      canvas: this.renderer.domElement,
      aspectSetting: {
        mainAspect: 16 / 9,
        wideAspect: 10 / 1,
        portraitAspect: 1 / 2
      },
      size: {
        windowSize: new p.Vector2(),
        windowAspectRatio: 1,
        canvasSize: new p.Vector2(),
        canvasPixelSize: new p.Vector2(),
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
    }, this.scene = new p.Scene(), this.camera = new p.PerspectiveCamera(50, 1, 0.1, 1e3);
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
      let s, a;
      e.children[i].isMesh && (s = e.children[i].geometry, a = e.children[i].material), e.remove(e.children[i]), s && s.dispose(), a && a.dispose();
    }
  }
  setWrapperElement(e, t = !0) {
    this.info.wrapperElement = e, this.info.wrapperElementRect = e ? e.getBoundingClientRect() : null, t && this.onResize();
  }
  onResize() {
    if (this.renderer == null)
      return;
    const e = new p.Vector2(document.body.clientWidth, window.innerHeight), t = new p.Vector2();
    this.info.wrapperElement ? t.set(this.info.wrapperElement.clientWidth, this.info.wrapperElement.clientHeight) : t.copy(e);
    let i = 1 - (t.x / t.y - this.info.aspectSetting.portraitAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.portraitAspect);
    i = Math.min(1, Math.max(0, i));
    let s = 1 - (t.x / t.y - this.info.aspectSetting.wideAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.wideAspect);
    s = Math.min(1, Math.max(0, s)), this.info.size.windowSize.copy(e), this.info.size.windowAspectRatio = e.x / e.y, this.info.size.canvasSize.copy(t), this.info.size.canvasPixelSize.copy(t.clone().multiplyScalar(this.renderer.getPixelRatio())), this.info.size.canvasAspectRatio = t.x / t.y, this.info.size.portraitWeight = i, this.info.size.wideWeight = s, this.renderer.setPixelRatio(this.info.size.pixelRatio), this.renderer.setSize(this.info.size.canvasSize.x, this.info.size.canvasSize.y), this.camera.aspect = this.info.size.canvasAspectRatio, this.camera.updateProjectionMatrix(), this.info.wrapperElement && (this.info.wrapperElementRect = this.info.wrapperElement.getBoundingClientRect());
  }
  pointerEvent(e) {
    const t = new p.Vector2();
    t.copy(e.position);
    const i = this.info.canvas.getBoundingClientRect();
    t.sub(new p.Vector2(i.x, i.y));
    const s = t.clone();
    s.divide(this.info.size.canvasSize), s.y = 1 - s.y, s.multiplyScalar(2).subScalar(1);
    const a = {
      event: e.pointerEvent,
      position: t.clone(),
      delta: e.delta.clone(),
      screenPosition: s.clone(),
      windowPosition: e.position.clone()
    };
    e.pointerEventType == "hover" ? this.onHover(a) : e.pointerEventType == "start" ? this.onTouchStart(a) : e.pointerEventType == "move" ? this.onTouchMove(a) : e.pointerEventType == "end" && this.onTouchEnd(a);
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
var z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, M = {};
(function(c) {
  (function() {
    var u;
    u = c !== null ? c : this, u.Lethargy = function() {
      function e(t, i, s, a) {
        this.stability = t != null ? Math.abs(t) : 8, this.sensitivity = i != null ? 1 + Math.abs(i) : 100, this.tolerance = s != null ? 1 + Math.abs(s) : 1.1, this.delay = a ?? 150, this.lastUpDeltas = function() {
          var r, h, n;
          for (n = [], r = 1, h = this.stability * 2; 1 <= h ? r <= h : r >= h; 1 <= h ? r++ : r--)
            n.push(null);
          return n;
        }.call(this), this.lastDownDeltas = function() {
          var r, h, n;
          for (n = [], r = 1, h = this.stability * 2; 1 <= h ? r <= h : r >= h; 1 <= h ? r++ : r--)
            n.push(null);
          return n;
        }.call(this), this.deltasTimestamp = function() {
          var r, h, n;
          for (n = [], r = 1, h = this.stability * 2; 1 <= h ? r <= h : r >= h; 1 <= h ? r++ : r--)
            n.push(null);
          return n;
        }.call(this);
      }
      return e.prototype.check = function(t) {
        var i;
        return t = t.originalEvent || t, t.wheelDelta != null ? i = t.wheelDelta : t.deltaY != null ? i = t.deltaY * -40 : (t.detail != null || t.detail === 0) && (i = t.detail * -40), this.deltasTimestamp.push(Date.now()), this.deltasTimestamp.shift(), i > 0 ? (this.lastUpDeltas.push(i), this.lastUpDeltas.shift(), this.isInertia(1)) : (this.lastDownDeltas.push(i), this.lastDownDeltas.shift(), this.isInertia(-1));
      }, e.prototype.isInertia = function(t) {
        var i, s, a, r, h, n, o;
        return i = t === -1 ? this.lastDownDeltas : this.lastUpDeltas, i[0] === null ? t : this.deltasTimestamp[this.stability * 2 - 2] + this.delay > Date.now() && i[0] === i[this.stability * 2 - 1] ? !1 : (a = i.slice(0, this.stability), s = i.slice(this.stability, this.stability * 2), o = a.reduce(function(f, m) {
          return f + m;
        }), h = s.reduce(function(f, m) {
          return f + m;
        }), n = o / a.length, r = h / s.length, Math.abs(n) < Math.abs(r * this.tolerance) && this.sensitivity < Math.abs(r) ? t : !1);
      }, e.prototype.showLastUpDeltas = function() {
        return this.lastUpDeltas;
      }, e.prototype.showLastDownDeltas = function() {
        return this.lastDownDeltas;
      }, e;
    }();
  }).call(z);
})(M);
class N extends p.EventDispatcher {
  constructor() {
    super();
    d(this, "isSP");
    d(this, "isTouching");
    d(this, "element", null);
    // cursor
    d(this, "position");
    d(this, "delta");
    // wheel
    d(this, "lethargy");
    d(this, "memDelta", 0);
    d(this, "riseDelta", !1);
    d(this, "trackpadMemDelta", 0);
    d(this, "trackpadMax", !1);
    this.position = new p.Vector2(NaN, NaN), this.delta = new p.Vector2(NaN, NaN);
    const e = navigator.userAgent;
    this.isSP = e.indexOf("iPhone") >= 0 || e.indexOf("iPad") >= 0 || e.indexOf("Android") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, this.position.set(NaN, NaN), this.isTouching = !1;
    const t = this.onTouch.bind(this, "move"), i = this.onPointer.bind(this, "move"), s = this.onTouch.bind(this, "end"), a = this.onPointer.bind(this, "end");
    window.addEventListener("touchmove", t, { passive: !1 }), window.addEventListener("pointermove", i), window.addEventListener("touchend", s, { passive: !1 }), window.addEventListener("pointerup", a), window.addEventListener("dragend", a);
    const r = () => {
      this.element && this.unregisterElement(this.element), window.removeEventListener("touchmove", t), window.removeEventListener("pointermove", i), window.removeEventListener("touchend", s), window.removeEventListener("pointerup", a), window.removeEventListener("dragend", a), this.removeEventListener("dispose", r);
    };
    this.addEventListener("dispose", r), this.lethargy = new M.Lethargy();
  }
  registerElement(e) {
    this.element && this.unregisterElement(this.element), this.element = e;
    const t = this.onTouch.bind(this, "start"), i = this.onPointer.bind(this, "start"), s = this.wheel.bind(this);
    e.addEventListener("touchstart", t, { passive: !1 }), e.addEventListener("pointerdown", i), e.addEventListener("wheel", s, { passive: !1 });
    const a = (r) => {
      e.isEqualNode(r.elm) && (e.removeEventListener("touchstart", t), e.removeEventListener("pointerdown", i), e.removeEventListener("wheel", s), this.removeEventListener("unregister", a));
    };
    this.addEventListener("unregister", a);
  }
  unregisterElement(e) {
    this.dispatchEvent({
      type: "unregister",
      elm: e
    });
  }
  getScreenPosition(e) {
    if (this.position.x != this.position.x)
      return new p.Vector2(NaN, NaN);
    const t = this.position.clone().divide(e).multiplyScalar(2).subScalar(1);
    return t.y *= -1, t;
  }
  getRelativePosition(e, t) {
    const i = e.getClientRects()[0];
    let s = this.position.x - i.left, a = this.position.y - i.top;
    return t && (s /= i.width, a /= i.height), new p.Vector2(s, a);
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
  touchEventHandler(e, t, i, s) {
    let a = !1;
    const r = e - window.pageXOffset, h = t - window.pageYOffset;
    i == "start" ? (this.isTouching = !0, this.setPos(r, h), this.delta.set(0, 0), a = !0) : i == "move" ? (this.setPos(r, h), this.isTouching && (a = !0)) : i == "end" && ("targetTouches" in s ? s.targetTouches.length == 0 && (this.isTouching = !1) : this.isTouching = !1, a = !0), a && this.dispatchEvent({
      type: "update",
      pointerEvent: s,
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
class H extends p.EventDispatcher {
  constructor(e) {
    super();
    d(this, "pointer");
    d(this, "clock");
    d(this, "layers", []);
    d(this, "pointerEventElement");
    e && e.silent || console.log("%c- ore-three -", "padding: 5px 10px ;background-color: black; color: white;font-size:11px"), this.clock = new p.Clock(), this.pointer = new N(), this.setPointerEventElement(e && e.pointerEventElement || document.body);
    const t = this.pointerEvent.bind(this), i = this.onWheel.bind(this), s = this.onWheelOptimized.bind(this), a = this.onOrientationDevice.bind(this), r = this.onWindowResize.bind(this);
    this.pointer.addEventListener("update", t), this.pointer.addEventListener("wheel", i), this.pointer.addEventListener("wheelOptimized", s), window.addEventListener("orientationchange", a), window.addEventListener("resize", r), this.addEventListener("dispose", () => {
      this.pointer.removeEventListener("update", t), this.pointer.removeEventListener("wheel", i), this.pointer.removeEventListener("wheelOptimized", s), window.removeEventListener("orientationchange", a), window.removeEventListener("resize", r);
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
var b;
((c) => {
  c.NEWTON_ITERATIONS = 4, c.NEWTON_MIN_SLOPE = 1e-3, c.SUBDIVISION_PRECISION = 1e-7, c.SUBDIVISION_MAX_ITERATIONS = 10, c.BEZIER_EASING_CACHE_SIZE = 11, c.BEZIER_EASING_SAMPLE_STEP_SIZE = 1 / c.BEZIER_EASING_CACHE_SIZE;
  function u(n) {
    return -n.p0 + 3 * n.p1 - 3 * n.p2 + n.p3;
  }
  function e(n) {
    return 3 * n.p0 - 6 * n.p1 + 3 * n.p2;
  }
  function t(n) {
    return -3 * n.p0 + 3 * n.p1;
  }
  function i(n, o) {
    return 3 * u(n) * o * o + 2 * e(n) * o + t(n);
  }
  c.calcBezierSlope = i;
  function s(n, o) {
    return ((u(n) * o + e(n)) * o + t(n)) * o + n.p0;
  }
  c.calcBezier = s;
  function a(n, o, f, m) {
    let v = 0, g = 0;
    for (let y = 0; y < c.SUBDIVISION_MAX_ITERATIONS; y++)
      g = o + (f - o) / 2, v = s(m, g), v > n ? f = g : o = g;
    return g;
  }
  function r(n, o, f) {
    for (let m = 0; m < c.NEWTON_ITERATIONS; m++) {
      const v = i(o, f);
      if (v == 0)
        return f;
      const g = s(o, f) - n;
      f -= g / v;
    }
    return f;
  }
  function h(n, o, f) {
    n.p1 = Math.max(n.p0, Math.min(n.p3, n.p1)), n.p2 = Math.max(n.p0, Math.min(n.p3, n.p2));
    let m = 0;
    for (let y = 1; y < f.length && (m = y - 1, !(o < f[y])); y++)
      ;
    const v = m / (c.BEZIER_EASING_CACHE_SIZE - 1), g = i(n, v) / (n.p3 - n.p0);
    return g == 0 ? v : g > 0.01 ? r(o, n, v) : a(o, v, v + c.BEZIER_EASING_SAMPLE_STEP_SIZE, n);
  }
  c.getBezierTfromX = h;
})(b || (b = {}));
var L;
((c) => {
  function u(l = 6) {
    return (x) => {
      var w = Math.exp(-l * (2 * x - 1)), E = Math.exp(-l);
      return (1 + (1 - w) / (1 + w) * (1 + E) / (1 - E)) / 2;
    };
  }
  c.sigmoid = u;
  function e(l, x, w) {
    const E = Math.max(0, Math.min(1, (w - l) / (x - l)));
    return E * E * (3 - 2 * E);
  }
  c.smoothstep = e;
  function t(l) {
    return l;
  }
  c.linear = t;
  function i(l) {
    return l * l;
  }
  c.easeInQuad = i;
  function s(l) {
    return l * (2 - l);
  }
  c.easeOutQuad = s;
  function a(l) {
    return l < 0.5 ? 2 * l * l : -1 + (4 - 2 * l) * l;
  }
  c.easeInOutQuad = a;
  function r(l) {
    return l * l * l;
  }
  c.easeInCubic = r;
  function h(l) {
    return --l * l * l + 1;
  }
  c.easeOutCubic = h;
  function n(l) {
    return l < 0.5 ? 4 * l * l * l : (l - 1) * (2 * l - 2) * (2 * l - 2) + 1;
  }
  c.easeInOutCubic = n;
  function o(l) {
    return l * l * l * l;
  }
  c.easeInQuart = o;
  function f(l) {
    return 1 - --l * l * l * l;
  }
  c.easeOutQuart = f;
  function m(l) {
    return l < 0.5 ? 8 * l * l * l * l : 1 - 8 * --l * l * l * l;
  }
  c.easeInOutQuart = m;
  function v(l) {
    return l * l * l * l * l;
  }
  c.easeInQuint = v;
  function g(l) {
    return 1 + --l * l * l * l * l;
  }
  c.easeOutQuint = g;
  function y(l) {
    return l < 0.5 ? 16 * l * l * l * l * l : 1 + 16 * --l * l * l * l * l;
  }
  c.easeInOutQuint = y;
  function S(l, x, w, E) {
    for (var D = new Array(b.BEZIER_EASING_CACHE_SIZE), T = 0; T < b.BEZIER_EASING_CACHE_SIZE; ++T)
      D[T] = b.calcBezier({ p0: l.x, p1: x.x, p2: w.x, p3: E.x }, T / (b.BEZIER_EASING_CACHE_SIZE - 1));
    return (I) => I <= l.x ? l.y : E.x <= I ? E.y : b.calcBezier({ p0: l.y, p1: x.y, p2: w.y, p3: E.y }, b.getBezierTfromX({ p0: l.x, p1: x.x, p2: w.x, p3: E.x }, I, D));
  }
  c.bezier = S;
  function C(l, x, w, E) {
    return S(
      { x: 0, y: 0 },
      { x: l, y: x },
      { x: w, y: E },
      { x: 1, y: 1 }
    );
  }
  c.cubicBezier = C;
})(L || (L = {}));
var O;
((c) => {
  function u(r, h, n) {
    return r + (h - r) * n;
  }
  c.number = u;
  function e(r, h, n) {
    if (r.length == h.length) {
      const o = [];
      for (let f = 0; f < r.length; f++)
        o.push(r[f] + (h[f] - r[f]) * n);
      return o;
    } else
      return console.log("Different length Arrays!!!"), !1;
  }
  c.numberArray = e;
  function t(r, h, n) {
    return r.clone().lerp(h, n);
  }
  c.THREEVectors = t;
  function i(r, h, n) {
    return r.clone().slerp(h, n);
  }
  c.THREEQuaternion = i;
  function s(r, h, n) {
    const o = r.clone(), f = h.clone();
    return o.x = o.x + (f.x - o.x) * n, o.y = o.y + (f.y - o.y) * n, o.z = o.z + (f.z - o.z) * n, o;
  }
  c.THREEEuler = s;
  function a(r) {
    if (typeof r == "number")
      return c.number;
    if (r instanceof Array)
      return c.numberArray;
    if ("isVector2" in r || "isVector3" in r || "isVector4" in r || "isColor" in r)
      return c.THREEVectors;
    if ("isQuaternion" in r)
      return c.THREEQuaternion;
    if ("isEuler" in r)
      return c.THREEEuler;
  }
  c.getLerpFunc = a;
})(O || (O = {}));
class G extends p.EventDispatcher {
  constructor() {
    super();
    d(this, "dataBase");
    d(this, "variables");
    d(this, "dispatchEvents", []);
    d(this, "_isAnimating", !1);
    this.variables = {}, this.dataBase = {};
  }
  add(e) {
    const t = {
      time: 0,
      duration: 0,
      value: this.getValueClone(e.initValue),
      startValue: this.getValueClone(e.initValue),
      goalValue: this.getValueClone(e.initValue),
      easing: e.easing || L.sigmoid(),
      lerpFunc: e.customLerpFunc || O.getLerpFunc(e.initValue),
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
  animate(e, t, i = 1, s) {
    const a = this.variables[e];
    a ? (this.cancelAnimate(e), this.animateVariableInit(a, t, i, null, () => {
      a.onAnimationFinished = null, s && s();
    }), this._isAnimating = !0) : console.error('"' + e + '" is not exist');
  }
  animateAsync(e, t, i = 1, s) {
    return new Promise((a, r) => {
      const h = this.variables[e];
      h ? (this.cancelAnimate(e), this.animateVariableInit(h, t, i, () => {
        h.onAnimationFinished = null, r("animation canceled");
      }, () => {
        h.onAnimationFinished = null, s && s(), a(null);
      }), this._isAnimating = !0) : r('"' + e + '" is not exist');
    });
  }
  animateVariableInit(e, t, i, s, a) {
    e.time = 0, e.isAnimating = !0, e.isAnimatingReseve = !0, e.duration = i, e.startValue = this.getValueClone(e.value), e.goalValue = this.getValueClone(t), e.onAnimationCanceled = s, e.onAnimationFinished = a;
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
      const s = this.getVariableObject(t[i]);
      s && (e[t[i]] = s);
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
      const s = t[i], a = this.variables[s];
      if (a.isAnimating && a.isAnimatingReseve) {
        this._isAnimating = !0;
        let r = !1;
        const h = a.duration, n = a.easing, o = a.lerpFunc;
        h == 0 ? a.time = 1 : a.time += (e || 0.016) / h, a.time >= 1 && (r = !0, a.time = 1);
        let f = a.goalValue;
        o && (f = o(a.startValue, a.goalValue, n(a.time)));
        const m = this.dataBase[s];
        typeof m == "number" || !("copy" in m) ? this.dataBase[s] = f : "copy" in m && m.copy(f), this.dispatchEvent({
          type: "update/" + t[i],
          deltaTime: e,
          value: a.value
        }), r && (a.onAnimationFinished && this.dispatchEvents.push(a.onAnimationFinished), a.isAnimatingReseve = !1);
      } else
        a.isAnimating = !1, a.time = 0;
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
      const i = this.variables[e], s = this.dataBase[e];
      i && s !== void 0 && (typeof i.value == "number" || !("copy" in i.value)) && (i.value = s);
      return;
    }
    const t = Object.keys(this.dataBase);
    for (let i = 0; i < t.length; i++) {
      const s = this.variables[t[i]], a = this.dataBase[t[i]];
      s && a !== void 0 && (typeof s.value == "number" || !("copy" in s.value)) && (s.value = a);
    }
  }
}
var A = {}, _ = {
  get exports() {
    return A;
  },
  set exports(c) {
    A = c;
  }
};
/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
(function(c) {
  (function(u) {
    function e() {
    }
    var t = e.prototype, i = u.EventEmitter;
    function s(h, n) {
      for (var o = h.length; o--; )
        if (h[o].listener === n)
          return o;
      return -1;
    }
    function a(h) {
      return function() {
        return this[h].apply(this, arguments);
      };
    }
    t.getListeners = function(n) {
      var o = this._getEvents(), f, m;
      if (n instanceof RegExp) {
        f = {};
        for (m in o)
          o.hasOwnProperty(m) && n.test(m) && (f[m] = o[m]);
      } else
        f = o[n] || (o[n] = []);
      return f;
    }, t.flattenListeners = function(n) {
      var o = [], f;
      for (f = 0; f < n.length; f += 1)
        o.push(n[f].listener);
      return o;
    }, t.getListenersAsObject = function(n) {
      var o = this.getListeners(n), f;
      return o instanceof Array && (f = {}, f[n] = o), f || o;
    };
    function r(h) {
      return typeof h == "function" || h instanceof RegExp ? !0 : h && typeof h == "object" ? r(h.listener) : !1;
    }
    t.addListener = function(n, o) {
      if (!r(o))
        throw new TypeError("listener must be a function");
      var f = this.getListenersAsObject(n), m = typeof o == "object", v;
      for (v in f)
        f.hasOwnProperty(v) && s(f[v], o) === -1 && f[v].push(m ? o : {
          listener: o,
          once: !1
        });
      return this;
    }, t.on = a("addListener"), t.addOnceListener = function(n, o) {
      return this.addListener(n, {
        listener: o,
        once: !0
      });
    }, t.once = a("addOnceListener"), t.defineEvent = function(n) {
      return this.getListeners(n), this;
    }, t.defineEvents = function(n) {
      for (var o = 0; o < n.length; o += 1)
        this.defineEvent(n[o]);
      return this;
    }, t.removeListener = function(n, o) {
      var f = this.getListenersAsObject(n), m, v;
      for (v in f)
        f.hasOwnProperty(v) && (m = s(f[v], o), m !== -1 && f[v].splice(m, 1));
      return this;
    }, t.off = a("removeListener"), t.addListeners = function(n, o) {
      return this.manipulateListeners(!1, n, o);
    }, t.removeListeners = function(n, o) {
      return this.manipulateListeners(!0, n, o);
    }, t.manipulateListeners = function(n, o, f) {
      var m, v, g = n ? this.removeListener : this.addListener, y = n ? this.removeListeners : this.addListeners;
      if (typeof o == "object" && !(o instanceof RegExp))
        for (m in o)
          o.hasOwnProperty(m) && (v = o[m]) && (typeof v == "function" ? g.call(this, m, v) : y.call(this, m, v));
      else
        for (m = f.length; m--; )
          g.call(this, o, f[m]);
      return this;
    }, t.removeEvent = function(n) {
      var o = typeof n, f = this._getEvents(), m;
      if (o === "string")
        delete f[n];
      else if (n instanceof RegExp)
        for (m in f)
          f.hasOwnProperty(m) && n.test(m) && delete f[m];
      else
        delete this._events;
      return this;
    }, t.removeAllListeners = a("removeEvent"), t.emitEvent = function(n, o) {
      var f = this.getListenersAsObject(n), m, v, g, y, S;
      for (y in f)
        if (f.hasOwnProperty(y))
          for (m = f[y].slice(0), g = 0; g < m.length; g++)
            v = m[g], v.once === !0 && this.removeListener(n, v.listener), S = v.listener.apply(this, o || []), S === this._getOnceReturnValue() && this.removeListener(n, v.listener);
      return this;
    }, t.trigger = a("emitEvent"), t.emit = function(n) {
      var o = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(n, o);
    }, t.setOnceReturnValue = function(n) {
      return this._onceReturnValue = n, this;
    }, t._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, t._getEvents = function() {
      return this._events || (this._events = {});
    }, e.noConflict = function() {
      return u.EventEmitter = i, e;
    }, c.exports ? c.exports = e : u.EventEmitter = e;
  })(typeof window < "u" ? window : z || {});
})(_);
class Q extends A {
  constructor(e) {
    super();
    d(this, "keyframes", []);
    d(this, "cache", { frame: NaN, value: NaN });
    d(this, "frameStart");
    d(this, "frameEnd");
    d(this, "frameDuration");
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
      const s = this.keyframes[i];
      if (e <= s.coordinate.x) {
        const a = this.keyframes[i - 1];
        a ? t = a.to(s, e) : t = s.coordinate.y;
        break;
      }
    }
    return t === null && this.keyframes.length > 0 && (t = this.keyframes[this.keyframes.length - 1].coordinate.y), t !== null ? (this.cache = {
      frame: e,
      value: t
    }, t) : 0;
  }
}
class Z extends A {
  constructor(e, t, i, s) {
    super();
    d(this, "coordinate", { x: 0, y: 0 });
    d(this, "handleLeft", { x: 0, y: 0 });
    d(this, "handleRight", { x: 0, y: 0 });
    d(this, "interpolation", "BEZIER");
    d(this, "easing", null);
    d(this, "nextFrame", null);
    this.set(e, t, i, s);
  }
  set(e, t, i, s) {
    this.coordinate = e, this.handleLeft = t || e, this.handleRight = i || e, this.interpolation = s || "BEZIER";
  }
  getEasing(e, t) {
    return e == "BEZIER" ? L.bezier(this.coordinate, this.handleRight, t.handleLeft, t.coordinate) : (i) => {
      const s = t.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (t.coordinate.x - this.coordinate.x), this.coordinate.y + i * s;
    };
  }
  to(e, t) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != e.coordinate.x || this.nextFrame.coordinate.y != e.coordinate.y) && (this.easing = this.getEasing(this.interpolation, e), this.nextFrame = e), this.easing ? this.easing(t) : 0;
  }
}
const B = `#define GLSLIFY 1
varying vec2 vUv;void main(){gl_Position=vec4(position,1.0);vUv=uv;}`, F = `#define GLSLIFY 1
uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=texture2D(tex,vUv);}`;
var R;
((c) => {
  function u(...e) {
    const t = {};
    for (let i = 0; i < e.length; i++)
      e[i] != null && Object.assign(t, e[i]);
    return t;
  }
  c.mergeUniforms = u;
})(R || (R = {}));
class Y {
  constructor(u, e) {
    d(this, "renderer");
    d(this, "dataSize");
    d(this, "uniforms");
    d(this, "scene");
    d(this, "camera");
    d(this, "mesh");
    d(this, "materials");
    d(this, "tempDataLinear");
    d(this, "tempDataNear");
    d(this, "renderTargets", []);
    this.renderer = u, this.dataSize = e.clone(), this.uniforms = {
      dataSize: {
        value: this.dataSize
      }
    }, this.tempDataLinear = this.createData({
      minFilter: p.LinearFilter,
      magFilter: p.LinearFilter
    }), this.tempDataNear = this.createData({
      minFilter: p.NearestFilter,
      magFilter: p.NearestFilter
    }), this.scene = new p.Scene(), this.camera = new p.Camera(), this.materials = [], this.mesh = new p.Mesh(new p.PlaneGeometry(2, 2)), this.scene.add(this.mesh);
  }
  get isSupported() {
    return this.renderer.extensions.get("OES_texture_float");
  }
  createInitializeTexture() {
    const u = new Float32Array(this.uniforms.dataSize.value.x * this.uniforms.dataSize.value.y * 4), e = new p.DataTexture(u, this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, p.RGBAFormat, p.FloatType);
    return e.needsUpdate = !0, e;
  }
  createData(u, e) {
    const t = navigator.userAgent, i = t.indexOf("iPhone") >= 0 || t.indexOf("iPad") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, s = {
      wrapS: p.ClampToEdgeWrapping,
      wrapT: p.ClampToEdgeWrapping,
      minFilter: p.NearestFilter,
      magFilter: p.NearestFilter,
      format: p.RGBAFormat,
      type: i ? p.HalfFloatType : p.FloatType,
      stencilBuffer: !1,
      depthBuffer: !1
    };
    let a = null, r = null;
    u && (u.isDataTexture ? (a = u, e && (r = e)) : r = u), r && (s.wrapS = r.wrapS || s.wrapS, s.wrapT = r.wrapT || s.wrapT, s.minFilter = r.minFilter || s.minFilter, s.magFilter = r.magFilter || s.magFilter, s.format = r.format || s.format, s.type = r.type || s.type, s.stencilBuffer = r.stencilBuffer || s.stencilBuffer, s.depthBuffer = r.depthBuffer || s.depthBuffer);
    const h = new p.WebGLRenderTarget(this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, s), n = { buffer: h };
    if (this.renderTargets.push(h), a) {
      const o = this.createKernel({
        fragmentShader: F,
        uniforms: {
          tex: {
            value: a
          }
        }
      });
      this.compute(o, n);
    }
    return n;
  }
  createKernel(u) {
    const e = R.mergeUniforms(u.uniforms, this.uniforms);
    u.uniforms = e, u.vertexShader = u.vertexShader || B;
    const t = new p.ShaderMaterial(u);
    return this.materials.push(t), {
      material: t,
      uniforms: u.uniforms
    };
  }
  compute(u, e, t) {
    let i;
    e.buffer.texture.magFilter == p.LinearFilter ? i = this.tempDataLinear : i = this.tempDataNear, this.mesh.material = u.material;
    const s = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(i.buffer), this.renderer.render(this.scene, t || this.camera), this.swapBuffers(e, i), this.renderer.setRenderTarget(s);
  }
  swapBuffers(u, e) {
    const t = u.buffer;
    u.buffer = e.buffer, e.buffer = t;
  }
  dispose() {
    this.mesh.geometry.dispose();
    for (let e = 0; e < this.materials.length; e++)
      this.materials[e].dispose();
    this.scene.remove(this.mesh), this.tempDataLinear.buffer.dispose(), this.tempDataNear.buffer.dispose();
  }
  resizeData(u) {
    this.dataSize.copy(u);
    for (let e = 0; e < this.renderTargets.length; e++)
      this.renderTargets[e].setSize(u.x, u.y);
  }
}
class X {
  constructor(u) {
    d(this, "renderer");
    d(this, "passes");
    d(this, "scene");
    d(this, "quad");
    d(this, "camera");
    d(this, "projectionMatrix");
    d(this, "projectionMatrixInverse");
    d(this, "cameraMatrix");
    d(this, "viewMatrix");
    this.renderer = u.renderer, this.passes = u.passes, this.scene = new p.Scene(), this.quad = new p.Mesh(new p.PlaneGeometry(2, 2)), this.scene.add(this.quad), this.camera = new p.Camera(), this.projectionMatrix = new p.Matrix4(), this.projectionMatrixInverse = new p.Matrix4(), this.cameraMatrix = new p.Matrix4(), this.viewMatrix = new p.Matrix4();
  }
  render(u, e) {
    const t = this.renderer.getRenderTarget(), i = this.renderer.autoClear;
    this.renderer.autoClear = !1, e && e.camera && (this.projectionMatrix.copy(e.camera.projectionMatrix), this.projectionMatrixInverse.copy(this.projectionMatrix).invert(), this.cameraMatrix.copy(e.camera.matrixWorld), this.viewMatrix.copy(e.camera.matrixWorld).invert());
    let s = u || null;
    for (let a = 0; a < this.passes.length; a++) {
      const r = this.passes[a];
      this.quad.material = r, r.uniforms.uBackBuffer = {
        value: s
      }, e && e.camera && (r.uniforms.pProjectionMatrix = {
        value: this.projectionMatrix
      }, r.uniforms.pProjectionMatrixInverse = {
        value: this.projectionMatrixInverse
      }, r.uniforms.pCameraMatrix = {
        value: this.cameraMatrix
      }, r.uniforms.pViewMatrix = {
        value: this.viewMatrix
      }), this.renderer.setRenderTarget(r.renderTarget), this.renderer.render(this.scene, this.camera), !r.passThrough && r.renderTarget && (s = r.renderTarget.texture);
    }
    this.renderer.setRenderTarget(t), this.renderer.autoClear = i;
  }
  resize(u) {
    for (let e = 0; e < this.passes.length; e++)
      this.passes[e].resize(u);
  }
}
const k = `#define GLSLIFY 1
out vec2 vUv;void main(void){vec3 pos=position;gl_Position=vec4(pos.xy,0.0,1.0);vUv=uv;}`, W = `#define GLSLIFY 1
uniform sampler2D uBackBuffer;varying vec2 vUv;void main(void){vec4 col=texture2D(uBackBuffer,vUv);gl_FragColor=col;}`;
class q extends p.ShaderMaterial {
  constructor(e) {
    e = e || {};
    const { renderTarget: t, resolutionRatio: i, passThrough: s, ...a } = e, r = R.mergeUniforms(a.uniforms, {
      uResolution: {
        value: new p.Vector2()
      },
      uResolutionInv: {
        value: new p.Vector2()
      }
    });
    super({
      ...a,
      vertexShader: e.vertexShader ?? k,
      fragmentShader: e.fragmentShader ?? W,
      uniforms: r
    });
    d(this, "renderTarget");
    d(this, "clearColor");
    d(this, "clearDepth");
    d(this, "passThrough");
    d(this, "resolution");
    d(this, "resolutionInv");
    d(this, "resolutionRatio");
    t === void 0 ? this.renderTarget = new p.WebGLRenderTarget(1, 1) : this.renderTarget = t, this.clearColor = e.clearColor ?? null, this.clearDepth = e.clearDepth ?? null, this.passThrough = s || !1, this.resolution = r.uResolution.value, this.resolutionInv = r.uResolutionInv.value, this.resolutionRatio = i || 1;
  }
  resize(e) {
    this.resolution.copy(e).multiplyScalar(this.resolutionRatio).floor(), this.resolutionInv.set(1, 1).divide(this.resolution), this.renderTarget && this.renderTarget.setSize(this.resolution.x, this.resolution.y);
  }
  setRendertarget(e) {
    this.renderTarget = e, this.renderTarget && (this.renderTarget.width != this.resolution.x || this.renderTarget.height != this.resolution.y) && this.resize(this.resolution);
  }
}
class K {
  constructor(u, e, t) {
    d(this, "obj");
    d(this, "baseTransform");
    d(this, "transform");
    this.obj = u, this.baseTransform = {
      position: this.obj.position.clone(),
      rotation: this.obj.quaternion.clone(),
      scale: this.obj.scale.clone()
    }, this.transform = e, t || (this.transform.position && this.transform.position.add(this.obj.position), this.transform.rotation && this.transform.rotation.multiply(this.obj.quaternion));
  }
  updateTransform(u) {
    this.transform.position && this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position, u)), this.transform.rotation && this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation, u)), this.transform.scale && this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale * u + 1 - u));
  }
}
class J extends p.EventDispatcher {
  constructor() {
    super();
  }
  goHome() {
    this.dispatchEvent({ type: "gohome" });
  }
  wait(u) {
    return new Promise((e, t) => {
      const i = () => {
        t(), this.removeEventListener("gohome", i);
      };
      this.addEventListener("gohome", i), setTimeout(() => {
        this.removeEventListener("gohome", i), e();
      }, u * 1e3);
    });
  }
}
export {
  G as Animator,
  j as BaseLayer,
  b as Bezier,
  H as Controller,
  L as Easings,
  Q as FCurve,
  Z as FCurveKeyFrame,
  Y as GPUComputationController,
  K as LayoutController,
  O as Lerps,
  N as Pointer,
  X as PostProcess,
  q as PostProcessPass,
  R as UniformsLib,
  J as WaitMan
};
//# sourceMappingURL=ore-three.js.map
