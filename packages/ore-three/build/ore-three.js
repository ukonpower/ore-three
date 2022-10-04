import * as d from "three";
class j extends d.EventDispatcher {
  constructor(e) {
    super(), this.time = 0, this.readyAnimate = !1, this.renderer = new d.WebGLRenderer(e), this.renderer.setPixelRatio(e.pixelRatio || window.devicePixelRatio), this.renderer.debug.checkShaderErrors = !0, this.info = {
      canvas: this.renderer.domElement,
      aspectSetting: {
        mainAspect: 16 / 9,
        wideAspect: 10 / 1,
        portraitAspect: 1 / 2
      },
      size: {
        windowSize: new d.Vector2(),
        windowAspectRatio: 1,
        canvasSize: new d.Vector2(),
        canvasPixelSize: new d.Vector2(),
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
    }, this.scene = new d.Scene(), this.camera = new d.PerspectiveCamera(50, 1, 0.1, 1e3);
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
    const e = new d.Vector2(document.body.clientWidth, window.innerHeight), t = new d.Vector2();
    this.info.wrapperElement ? t.set(this.info.wrapperElement.clientWidth, this.info.wrapperElement.clientHeight) : t.copy(e);
    let i = 1 - (t.x / t.y - this.info.aspectSetting.portraitAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.portraitAspect);
    i = Math.min(1, Math.max(0, i));
    let n = 1 - (t.x / t.y - this.info.aspectSetting.wideAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.wideAspect);
    n = Math.min(1, Math.max(0, n)), this.info.size.windowSize.copy(e), this.info.size.windowAspectRatio = e.x / e.y, this.info.size.canvasSize.copy(t), this.info.size.canvasPixelSize.copy(t.clone().multiplyScalar(this.renderer.getPixelRatio())), this.info.size.canvasAspectRatio = t.x / t.y, this.info.size.portraitWeight = i, this.info.size.wideWeight = n, this.renderer.setPixelRatio(this.info.size.pixelRatio), this.renderer.setSize(this.info.size.canvasSize.x, this.info.size.canvasSize.y), this.camera.aspect = this.info.size.canvasAspectRatio, this.camera.updateProjectionMatrix(), this.info.wrapperElement && (this.info.wrapperElementRect = this.info.wrapperElement.getBoundingClientRect());
  }
  pointerEvent(e) {
    const t = new d.Vector2();
    if (t.copy(e.position), this.info.canvas) {
      const r = this.info.canvas.getBoundingClientRect();
      t.sub(new d.Vector2(r.x, r.y));
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
  onWheel(e, t) {
  }
}
class F extends d.EventDispatcher {
  constructor() {
    super(), this.element = null, this.trackpadMemDelta = 0, this.trackpadMax = !1, this.position = new d.Vector2(NaN, NaN), this.delta = new d.Vector2(NaN, NaN);
    const e = navigator.userAgent;
    this.isSP = e.indexOf("iPhone") >= 0 || e.indexOf("iPad") >= 0 || e.indexOf("Android") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, this.position.set(NaN, NaN), this.isTouching = !1;
  }
  registerElement(e) {
    this.element = e;
    const t = this.onTouch.bind(this, "start"), i = this.onTouch.bind(this, "move"), n = this.onTouch.bind(this, "end"), r = this.onPointer.bind(this, "start"), f = this.onPointer.bind(this, "move"), h = this.onPointer.bind(this, "end"), l = this.wheel.bind(this);
    e.addEventListener("touchstart", t, { passive: !1 }), e.addEventListener("touchmove", i, { passive: !1 }), e.addEventListener("touchend", n, { passive: !1 }), e.addEventListener("pointerdown", r), e.addEventListener("pointermove", f), e.addEventListener("pointerup", h), e.addEventListener("dragend", h), e.addEventListener("wheel", l, { passive: !1 });
    const s = (o) => {
      e.isEqualNode(o.elm) && (e.removeEventListener("touchstart", t), e.removeEventListener("touchmove", i), e.removeEventListener("touchend", n), e.removeEventListener("pointerdown", r), e.removeEventListener("pointermove", f), e.removeEventListener("pointerup", h), e.removeEventListener("dragend", h), e.removeEventListener("wheel", l), this.removeEventListener("unregister", s));
    };
    this.addEventListener("unregister", s);
  }
  unregisterElement(e) {
    this.dispatchEvent({
      type: "unregister",
      elm: e
    });
  }
  getScreenPosition(e) {
    if (this.position.x != this.position.x)
      return new d.Vector2(NaN, NaN);
    const t = this.position.clone().divide(e).multiplyScalar(2).subScalar(1);
    return t.y *= -1, t;
  }
  getRelativePosition(e, t) {
    const i = e.getClientRects()[0];
    let n = this.position.x - i.left, r = this.position.y - i.top;
    return t && (n /= i.width, r /= i.height), new d.Vector2(n, r);
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
    const f = e - window.pageXOffset, h = t - window.pageYOffset;
    i == "start" ? (this.isTouching = !0, this.setPos(f, h), this.delta.set(0, 0), r = !0) : i == "move" ? (this.setPos(f, h), this.isTouching && (r = !0)) : i == "end" && ("targetTouches" in n ? n.targetTouches.length == 0 && (this.isTouching = !1) : this.isTouching = !1, r = !0), r && this.dispatchEvent({
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
  wheel(e) {
    this.dispatchEvent({
      type: "wheel",
      wheelEvent: e
    });
  }
}
class G extends d.EventDispatcher {
  constructor(e) {
    super(), this.layers = [], e && e.silent || console.log("%c- ore-three -", "padding: 5px 10px ;background-color: black; color: white;font-size:11px"), this.clock = new d.Clock(), this.pointer = new F(), this.setPointerEventElement(e && e.pointerEventElement || document.body);
    const t = this.pointerEvent.bind(this), i = this.onWheel.bind(this), n = this.onOrientationDevice.bind(this), r = this.onWindowResize.bind(this);
    this.pointer.addEventListener("update", t), this.pointer.addEventListener("wheel", i), window.addEventListener("orientationchange", n), window.addEventListener("resize", r), this.addEventListener("dispose", () => {
      this.pointer.removeEventListener("update", t), this.pointer.removeEventListener("wheel", i), window.removeEventListener("orientationchange", n), window.removeEventListener("resize", r);
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
      this.layers[t].onWheel(e.wheelEvent, e.trackpadDelta);
  }
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
  function e(s) {
    return -s.p0 + 3 * s.p1 - 3 * s.p2 + s.p3;
  }
  function t(s) {
    return 3 * s.p0 - 6 * s.p1 + 3 * s.p2;
  }
  function i(s) {
    return -3 * s.p0 + 3 * s.p1;
  }
  function n(s, o) {
    return 3 * e(s) * o * o + 2 * t(s) * o + i(s);
  }
  c.calcBezierSlope = n;
  function r(s, o) {
    return ((e(s) * o + t(s)) * o + i(s)) * o + s.p0;
  }
  c.calcBezier = r;
  function f(s, o, u, p) {
    let v = 0, m = 0;
    for (let g = 0; g < c.SUBDIVISION_MAX_ITERATIONS; g++)
      m = o + (u - o) / 2, v = r(p, m), v > s ? u = m : o = m;
    return m;
  }
  function h(s, o, u) {
    for (let p = 0; p < c.NEWTON_ITERATIONS; p++) {
      const v = n(o, u);
      if (v == 0)
        return u;
      u -= (r(o, u) - s) / v;
    }
    return u;
  }
  function l(s, o, u) {
    s.p1 = Math.max(s.p0, Math.min(s.p3, s.p1)), s.p2 = Math.max(s.p0, Math.min(s.p3, s.p2));
    let p = 0;
    for (let g = 1; g < u.length && (p = g - 1, !(o < u[g])); g++)
      ;
    const v = p / (c.BEZIER_EASING_CACHE_SIZE - 1), m = n(s, v) / (s.p3 - s.p0);
    return m == 0 ? v : m > 0.01 ? h(o, s, v) : f(o, v, v + c.BEZIER_EASING_SAMPLE_STEP_SIZE, s);
  }
  c.getBezierTfromX = l;
})(b || (b = {}));
var A;
((c) => {
  function e(a = 6) {
    return (w) => {
      var E = Math.exp(-a * (2 * w - 1)), y = Math.exp(-a);
      return (1 + (1 - E) / (1 + E) * (1 + y) / (1 - y)) / 2;
    };
  }
  c.sigmoid = e;
  function t(a, w, E) {
    const y = Math.max(0, Math.min(1, (E - a) / (w - a)));
    return y * y * (3 - 2 * y);
  }
  c.smoothstep = t;
  function i(a) {
    return a;
  }
  c.linear = i;
  function n(a) {
    return a * a;
  }
  c.easeInQuad = n;
  function r(a) {
    return a * (2 - a);
  }
  c.easeOutQuad = r;
  function f(a) {
    return a < 0.5 ? 2 * a * a : -1 + (4 - 2 * a) * a;
  }
  c.easeInOutQuad = f;
  function h(a) {
    return a * a * a;
  }
  c.easeInCubic = h;
  function l(a) {
    return --a * a * a + 1;
  }
  c.easeOutCubic = l;
  function s(a) {
    return a < 0.5 ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1;
  }
  c.easeInOutCubic = s;
  function o(a) {
    return a * a * a * a;
  }
  c.easeInQuart = o;
  function u(a) {
    return 1 - --a * a * a * a;
  }
  c.easeOutQuart = u;
  function p(a) {
    return a < 0.5 ? 8 * a * a * a * a : 1 - 8 * --a * a * a * a;
  }
  c.easeInOutQuart = p;
  function v(a) {
    return a * a * a * a * a;
  }
  c.easeInQuint = v;
  function m(a) {
    return 1 + --a * a * a * a * a;
  }
  c.easeOutQuint = m;
  function g(a) {
    return a < 0.5 ? 16 * a * a * a * a * a : 1 + 16 * --a * a * a * a * a;
  }
  c.easeInOutQuint = g;
  function S(a, w, E, y) {
    for (var R = new Array(b.BEZIER_EASING_CACHE_SIZE), L = 0; L < b.BEZIER_EASING_CACHE_SIZE; ++L)
      R[L] = b.calcBezier({ p0: a.x, p1: w.x, p2: E.x, p3: y.x }, L / (b.BEZIER_EASING_CACHE_SIZE - 1));
    return (T) => T <= a.x ? a.y : y.x <= T ? y.y : b.calcBezier({ p0: a.y, p1: w.y, p2: E.y, p3: y.y }, b.getBezierTfromX({ p0: a.x, p1: w.x, p2: E.x, p3: y.x }, T, R));
  }
  c.bezier = S;
  function V(a, w, E, y) {
    return S(
      { x: 0, y: 0 },
      { x: a, y: w },
      { x: E, y },
      { x: 1, y: 1 }
    );
  }
  c.cubicBezier = V;
})(A || (A = {}));
var O;
((c) => {
  function e(h, l, s) {
    return h + (l - h) * s;
  }
  c.number = e;
  function t(h, l, s) {
    if (h.length == l.length) {
      const o = [];
      for (let u = 0; u < h.length; u++)
        o.push(h[u] + (l[u] - h[u]) * s);
      return o;
    } else
      return console.log("Different length Arrays!!!"), !1;
  }
  c.numberArray = t;
  function i(h, l, s) {
    return h.clone().lerp(l, s);
  }
  c.THREEVectors = i;
  function n(h, l, s) {
    return h.clone().slerp(l, s);
  }
  c.THREEQuaternion = n;
  function r(h, l, s) {
    const o = h.clone(), u = l.clone();
    return o.x = o.x + (u.x - o.x) * s, o.y = o.y + (u.y - o.y) * s, o.z = o.z + (u.z - o.z) * s, o;
  }
  c.THREEEuler = r;
  function f(h) {
    if (typeof h == "number")
      return c.number;
    if (h instanceof Array)
      return c.numberArray;
    if ("isVector2" in h || "isVector3" in h || "isVector4" in h || "isColor" in h)
      return c.THREEVectors;
    if ("isQuaternion" in h)
      return c.THREEQuaternion;
    if ("isEuler" in h)
      return c.THREEEuler;
  }
  c.getLerpFunc = f;
})(O || (O = {}));
class W extends d.EventDispatcher {
  constructor() {
    super(), this.isAnimating = !1, this.animatingCount = 0, this.dispatchEvents = [], this.variables = {}, this.dataBase = {};
  }
  add(e) {
    const t = {
      time: -1,
      value: this.getValueClone(e.initValue),
      startValue: this.getValueClone(e.initValue),
      goalValue: this.getValueClone(e.initValue),
      easing: e.easing || A.sigmoid(),
      lerpFunc: e.customLerpFunc || O.getLerpFunc(e.initValue),
      userData: e.userData
    };
    return this.dataBase[e.name] = t.value, this.variables[e.name] = t, this.dispatchEvent({
      type: "added",
      varName: e.name,
      variable: t
    }), t;
  }
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
  animate(e, t, i = 1, n, r) {
    const f = this.variables[e];
    return new Promise((l) => {
      if (f) {
        if (i <= 0) {
          this.setValue(e, t), f.time = 1, f.onAnimationFinished = () => {
            n && n(), l(null);
          };
          return;
        }
        f.time == -1 && (this.isAnimating = !0, this.animatingCount++), f.time = 0, f.duration = i, f.startValue = this.getValueClone(f.value), f.goalValue = this.getValueClone(t), f.onAnimationFinished = () => {
          n && n(), l(null);
        }, r && this.setEasing(e, r);
      } else
        console.warn('"' + e + '" is not exist');
    });
  }
  cancelAnimate(e) {
    const t = this.variables[e];
    t ? (t.time = 1, t.onAnimationFinished = null) : console.warn('"' + e + '" is not exist');
  }
  get(e) {
    return this.variables[e] ? this.variables[e].value : (console.warn('"' + e + '" is not exist'), null);
  }
  getVariableObject(e, t = !1) {
    return this.variables[e] ? this.variables[e] : (t || console.warn('"' + e + '" is not exist'), null);
  }
  applyToUniforms(e) {
    const t = Object.keys(this.variables);
    for (let i = 0; i < t.length; i++) {
      const n = this.getVariableObject(t[i]);
      n && (e[t[i]] = n);
    }
  }
  isAnimatingVariable(e, t = !1) {
    return this.variables[e] ? this.variables[e].time != -1 : (t || console.warn('"' + e + '" is not exist'), null);
  }
  getValueClone(e) {
    return typeof e == "number" ? e : "clone" in e ? e.clone() : e instanceof Array ? e.concat() : e;
  }
  wait(e) {
    return new Promise((i) => {
      setTimeout(() => {
        i();
      }, e * 1e3);
    });
  }
  update(e) {
    this.animatingCount == 0 && (this.isAnimating = !1);
    const t = Object.keys(this.variables);
    for (let i = 0; i < t.length; i++) {
      const n = t[i], r = this.variables[n];
      let f = r.time;
      if (f == 1 && (this.animatingCount--, f = -1, r.onAnimationFinished && this.dispatchEvents.push(r.onAnimationFinished)), f >= 0 && f < 1) {
        const h = r.duration, l = r.easing, s = r.lerpFunc;
        h && (f += (e || 0.016) / h, (h == 0 || f >= 1) && (f = 1));
        let o = r.goalValue;
        f < 1 && s && (o = s(r.startValue, r.goalValue, l(f)));
        const u = this.dataBase[n];
        typeof u == "number" || !("copy" in u) ? this.dataBase[n] = o : "copy" in u && u.copy(o), this.dispatchEvent({
          type: "update/" + t[i],
          deltaTime: e,
          value: r.value
        });
      }
      r.time = f;
    }
    for (; this.dispatchEvents.length != 0; ) {
      const i = this.dispatchEvents.pop();
      i && i();
    }
    this.updateDataBase(), this.dispatchEvent({
      type: "update",
      deltaTime: e
    }), this.isAnimating && this.dispatchEvent({
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
var z = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, C = { exports: {} };
/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */
(function(c) {
  (function(e) {
    function t() {
    }
    var i = t.prototype, n = e.EventEmitter;
    function r(l, s) {
      for (var o = l.length; o--; )
        if (l[o].listener === s)
          return o;
      return -1;
    }
    function f(l) {
      return function() {
        return this[l].apply(this, arguments);
      };
    }
    i.getListeners = function(s) {
      var o = this._getEvents(), u, p;
      if (s instanceof RegExp) {
        u = {};
        for (p in o)
          o.hasOwnProperty(p) && s.test(p) && (u[p] = o[p]);
      } else
        u = o[s] || (o[s] = []);
      return u;
    }, i.flattenListeners = function(s) {
      var o = [], u;
      for (u = 0; u < s.length; u += 1)
        o.push(s[u].listener);
      return o;
    }, i.getListenersAsObject = function(s) {
      var o = this.getListeners(s), u;
      return o instanceof Array && (u = {}, u[s] = o), u || o;
    };
    function h(l) {
      return typeof l == "function" || l instanceof RegExp ? !0 : l && typeof l == "object" ? h(l.listener) : !1;
    }
    i.addListener = function(s, o) {
      if (!h(o))
        throw new TypeError("listener must be a function");
      var u = this.getListenersAsObject(s), p = typeof o == "object", v;
      for (v in u)
        u.hasOwnProperty(v) && r(u[v], o) === -1 && u[v].push(p ? o : {
          listener: o,
          once: !1
        });
      return this;
    }, i.on = f("addListener"), i.addOnceListener = function(s, o) {
      return this.addListener(s, {
        listener: o,
        once: !0
      });
    }, i.once = f("addOnceListener"), i.defineEvent = function(s) {
      return this.getListeners(s), this;
    }, i.defineEvents = function(s) {
      for (var o = 0; o < s.length; o += 1)
        this.defineEvent(s[o]);
      return this;
    }, i.removeListener = function(s, o) {
      var u = this.getListenersAsObject(s), p, v;
      for (v in u)
        u.hasOwnProperty(v) && (p = r(u[v], o), p !== -1 && u[v].splice(p, 1));
      return this;
    }, i.off = f("removeListener"), i.addListeners = function(s, o) {
      return this.manipulateListeners(!1, s, o);
    }, i.removeListeners = function(s, o) {
      return this.manipulateListeners(!0, s, o);
    }, i.manipulateListeners = function(s, o, u) {
      var p, v, m = s ? this.removeListener : this.addListener, g = s ? this.removeListeners : this.addListeners;
      if (typeof o == "object" && !(o instanceof RegExp))
        for (p in o)
          o.hasOwnProperty(p) && (v = o[p]) && (typeof v == "function" ? m.call(this, p, v) : g.call(this, p, v));
      else
        for (p = u.length; p--; )
          m.call(this, o, u[p]);
      return this;
    }, i.removeEvent = function(s) {
      var o = typeof s, u = this._getEvents(), p;
      if (o === "string")
        delete u[s];
      else if (s instanceof RegExp)
        for (p in u)
          u.hasOwnProperty(p) && s.test(p) && delete u[p];
      else
        delete this._events;
      return this;
    }, i.removeAllListeners = f("removeEvent"), i.emitEvent = function(s, o) {
      var u = this.getListenersAsObject(s), p, v, m, g, S;
      for (g in u)
        if (u.hasOwnProperty(g))
          for (p = u[g].slice(0), m = 0; m < p.length; m++)
            v = p[m], v.once === !0 && this.removeListener(s, v.listener), S = v.listener.apply(this, o || []), S === this._getOnceReturnValue() && this.removeListener(s, v.listener);
      return this;
    }, i.trigger = f("emitEvent"), i.emit = function(s) {
      var o = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(s, o);
    }, i.setOnceReturnValue = function(s) {
      return this._onceReturnValue = s, this;
    }, i._getOnceReturnValue = function() {
      return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, i._getEvents = function() {
      return this._events || (this._events = {});
    }, t.noConflict = function() {
      return e.EventEmitter = n, t;
    }, c.exports ? c.exports = t : e.EventEmitter = t;
  })(typeof window < "u" ? window : z || {});
})(C);
const x = C.exports;
class N extends x {
  constructor(e) {
    super(), this.curves = {}, this.name = e || "", this.uniforms = {}, this.frame = {
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
    let e = Object.keys(this.curves), t = 1 / 0, i = -1 / 0;
    for (let n = 0; n < e.length; n++) {
      let r = this.curves[e[n]];
      r.frameStart < t && (t = r.frameStart), r.frameEnd > i && (i = r.frameEnd);
    }
    (t == -1 / 0 || i == 1 / 0) && (t = 0, i = 1), this.frame.start = t, this.frame.end = i, this.frame.duration = this.frame.end - this.frame.start;
  }
  getFCurveGroup(e) {
    return this.curves[e] || null;
  }
  assignUniforms(e, t) {
    this.uniforms[e] = t;
  }
  getUniforms(e) {
    if (this.uniforms[e])
      return this.uniforms[e];
    let t = this.getFCurveGroup(e);
    if (t) {
      let i = {
        value: t.createInitValue()
      };
      return this.uniforms[e] = i, i;
    }
    return null;
  }
  getValue(e, t) {
    let i = this.getUniforms(e);
    if (!i)
      return t || null;
    let n = i.value;
    return t ? typeof n == "number" ? (t.x = n, t) : (t.x = n.x, t.y = n.y, "z" in t && "z" in n && (t.z = n.z), "w" in t && "w" in n && (t.w = n.w), t || null) : n;
  }
  getValueAt(e, t, i) {
    let n = this.getFCurveGroup(e);
    return i ? n ? n.getValue(t || 0, i) : i : n ? n.getValue(t) : null;
  }
  updateFrame(e) {
    let t = Object.keys(this.curves);
    for (let i = 0; i < t.length; i++) {
      let n = this.curves[t[i]], r = this.getUniforms(t[i]);
      !r || (typeof r.value == "number" ? r.value = n.getValue(e) || 0 : n.getValue(e, r.value));
    }
    this.emitEvent("update", [this]);
  }
}
class _ extends x {
  constructor(e) {
    super(), this.keyframes = [], this.cache = { frame: NaN, value: NaN }, this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.set(e);
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
      let n = this.keyframes[i];
      if (e <= n.coordinate.x) {
        let r = this.keyframes[i - 1];
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
class k extends x {
  constructor(e, t, i, n, r, f) {
    super(), this.type = "scalar", this.name = e || "", this.frameStart = 0, this.frameEnd = 0, this.frameDuration = 0, this.curve = {
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
    let e = Object.keys(this.curve), t = 1 / 0, i = -1 / 0;
    for (let n = 0; n < e.length; n++) {
      let r = this.curve[e[n]];
      !r || (r.frameStart < t && (t = r.frameStart), r.frameEnd > i && (i = r.frameEnd));
    }
    (t == -1 / 0 || i == 1 / 0) && (t = 0, i = 1), this.frameStart = t, this.frameEnd = i, this.frameDuration = this.frameEnd - this.frameStart;
  }
  createInitValue() {
    return this.type == "vec2" ? new d.Vector2() : this.type == "vec3" ? new d.Vector3() : this.type == "vec4" ? new d.Vector4() : 0;
  }
  getValue(e, t) {
    return t ? (this.curve.x && (t.x = this.curve.x.getValue(e)), this.curve.y && (t.y = this.curve.y.getValue(e)), this.curve.z && "z" in t && (t.z = this.curve.z.getValue(e)), this.curve.w && "w" in t && (t.w = this.curve.w.getValue(e)), t) : this.curve.scalar ? this.curve.scalar.getValue(e) : null;
  }
}
class P extends x {
  constructor(e, t, i, n) {
    super(), this.coordinate = { x: 0, y: 0 }, this.handleLeft = { x: 0, y: 0 }, this.handleRight = { x: 0, y: 0 }, this.interpolation = "BEZIER", this.easing = null, this.nextFrame = null, this.set(e, t, i, n);
  }
  set(e, t, i, n) {
    this.coordinate = e, this.handleLeft = t || e, this.handleRight = i || e, this.interpolation = n || "BEZIER";
  }
  getEasing(e, t) {
    return e == "BEZIER" ? A.bezier(this.coordinate, this.handleRight, t.handleLeft, t.coordinate) : (i) => {
      let n = t.coordinate.y - this.coordinate.y;
      return i = (i - this.coordinate.x) / (t.coordinate.x - this.coordinate.x), this.coordinate.y + i * n;
    };
  }
  to(e, t) {
    return (this.nextFrame == null || this.nextFrame.coordinate.x != e.coordinate.x || this.nextFrame.coordinate.y != e.coordinate.y) && (this.easing = this.getEasing(this.interpolation, e), this.nextFrame = e), this.easing ? this.easing(t) : 0;
  }
}
class H extends x {
  constructor(e) {
    super(), this.connected = !1, this.frameCurrent = 0, this.frameStart = 0, this.frameEnd = 0, this.objects = [], this.actions = [], e && (this.url = e, this.connect(this.url));
  }
  connect(e) {
    this.url = e, this.ws = new WebSocket(this.url), this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = (t) => {
      console.error(t);
    };
  }
  syncJsonScene(e) {
    let t = new XMLHttpRequest();
    t.onreadystatechange = () => {
      t.readyState == 4 && t.status == 200 && this.onSyncScene(JSON.parse(t.response));
    }, t.open("GET", e), t.send();
  }
  onSyncScene(e) {
    this.actions.length = 0, this.objects.length = 0, e.actions.forEach((t) => {
      let i = new N(t.name), n = Object.keys(t.fcurve_groups);
      for (let r = 0; r < n.length; r++) {
        let f = n[r], h = new k(f);
        t.fcurve_groups[f].forEach((l) => {
          let s = new _();
          s.set(l.keyframes.map((o) => new P(o.c, o.h_l, o.h_r, o.i))), h.setFCurve(s, l.axis);
        }), i.addFcurveGroup(h.name, h);
      }
      this.actions.push(i);
    }), e.objects.forEach((t) => {
      this.objects.push(t);
    }), this.emitEvent("update/scene", [this]), this.setTimeline(this.frameCurrent);
  }
  onSyncTimeline(e) {
    this.setTimeline(e.current, e.start, e.end);
  }
  onOpen(e) {
    this.connected = !0;
  }
  onMessage(e) {
    let t = JSON.parse(e.data);
    t.type == "sync/scene" ? this.onSyncScene(t.data) : t.type == "sync/timeline" && this.onSyncTimeline(t.data);
  }
  onClose(e) {
    this.disposeWS();
  }
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
    let t = [];
    return this.getActionNameList(e).forEach((n) => {
      let r = this.getAction(n);
      r && t.push(r);
    }), t;
  }
  getActionContainsAccessor(e) {
    return this.actions.find((t) => Object.keys(t.curves).some((n) => n == e)) || null;
  }
  setTimeline(e, t, i) {
    this.frameCurrent = e, this.frameStart = t || this.frameStart, this.frameEnd = i || this.frameEnd, this.emitEvent("update/timeline", [this.frameCurrent, this.frameStart, this.frameEnd]);
  }
  dispose() {
    this.disposeWS();
  }
  disposeWS() {
    this.ws && (this.ws.close(), this.ws.onmessage = null, this.ws.onclose = null, this.ws.onopen = null, this.connected = !1);
  }
}
const B = `#define GLSLIFY 1
varying vec2 vUv;void main(){gl_Position=vec4(position,1.0);vUv=uv;}`, M = `#define GLSLIFY 1
uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=texture2D(tex,vUv);}`;
var I;
((c) => {
  function e(...t) {
    const i = {};
    for (let n = 0; n < t.length; n++)
      t[n] != null && Object.assign(i, t[n]);
    return i;
  }
  c.mergeUniforms = e;
})(I || (I = {}));
class U {
  constructor(e, t) {
    this.renderTargets = [], this.renderer = e, this.dataSize = t.clone(), this.uniforms = {
      dataSize: {
        value: this.dataSize
      }
    }, this.tempDataLinear = this.createData({
      minFilter: d.LinearFilter,
      magFilter: d.LinearFilter
    }), this.tempDataNear = this.createData({
      minFilter: d.NearestFilter,
      magFilter: d.NearestFilter
    }), this.scene = new d.Scene(), this.camera = new d.Camera(), this.materials = [], this.mesh = new d.Mesh(new d.PlaneGeometry(2, 2)), this.scene.add(this.mesh);
  }
  get isSupported() {
    return this.renderer.extensions.get("OES_texture_float");
  }
  createInitializeTexture() {
    let e = new Float32Array(this.uniforms.dataSize.value.x * this.uniforms.dataSize.value.y * 4), t = new d.DataTexture(e, this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, d.RGBAFormat, d.FloatType);
    return t.needsUpdate = !0, t;
  }
  createData(e, t) {
    let i = navigator.userAgent, n = i.indexOf("iPhone") >= 0 || i.indexOf("iPad") >= 0 || navigator.platform == "iPad" || navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== void 0, r = {
      wrapS: d.ClampToEdgeWrapping,
      wrapT: d.ClampToEdgeWrapping,
      minFilter: d.NearestFilter,
      magFilter: d.NearestFilter,
      format: d.RGBAFormat,
      type: n ? d.HalfFloatType : d.FloatType,
      stencilBuffer: !1,
      depthBuffer: !1
    }, f = null, h = null;
    e && (e.isDataTexture ? (f = e, t && (h = t)) : h = e), h && (r.wrapS = h.wrapS || r.wrapS, r.wrapT = h.wrapT || r.wrapT, r.minFilter = h.minFilter || r.minFilter, r.magFilter = h.magFilter || r.magFilter, r.format = h.format || r.format, r.type = h.type || r.type, r.stencilBuffer = h.stencilBuffer || r.stencilBuffer, r.depthBuffer = h.depthBuffer || r.depthBuffer);
    let l = new d.WebGLRenderTarget(this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, r), s = { buffer: l };
    if (this.renderTargets.push(l), f) {
      let o = this.createKernel({
        fragmentShader: M,
        uniforms: {
          tex: {
            value: f
          }
        }
      });
      this.compute(o, s);
    }
    return s;
  }
  createKernel(e) {
    let t = I.mergeUniforms(e.uniforms, this.uniforms);
    e.uniforms = t, e.vertexShader = e.vertexShader || B;
    let i = new d.ShaderMaterial(e);
    return this.materials.push(i), {
      material: i,
      uniforms: e.uniforms
    };
  }
  compute(e, t, i) {
    let n;
    t.buffer.texture.magFilter == d.LinearFilter ? n = this.tempDataLinear : n = this.tempDataNear, this.mesh.material = e.material;
    let r = this.renderer.getRenderTarget();
    this.renderer.setRenderTarget(n.buffer), this.renderer.render(this.scene, i || this.camera), this.swapBuffers(t, n), this.renderer.setRenderTarget(r);
  }
  swapBuffers(e, t) {
    let i = e.buffer;
    e.buffer = t.buffer, t.buffer = i;
  }
  dispose() {
    this.mesh.geometry.dispose();
    for (let t = 0; t < this.materials.length; t++)
      this.materials[t].dispose();
    this.scene.remove(this.mesh), this.tempDataLinear.buffer.dispose(), this.tempDataNear.buffer.dispose();
  }
  resizeData(e) {
    this.dataSize.copy(e);
    for (let t = 0; t < this.renderTargets.length; t++)
      this.renderTargets[t].setSize(e.x, e.y);
  }
}
const D = `#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
class Q {
  constructor(e, t, i) {
    this.renderer = e, this.scene = new d.Scene(), this.camera = new d.OrthographicCamera(-1, 1, 1, -1), this.screen = new d.Mesh(i || new d.PlaneGeometry(2, 2)), this.scene.add(this.screen), t.vertexShader = t.vertexShader || D, t.uniforms = t.uniforms || {}, t.uniforms.resolution = {
      value: new d.Vector2()
    }, this.effect = {
      material: new d.ShaderMaterial(t)
    };
  }
  render(e, t = null) {
    let i = this.renderer.getRenderTarget(), n = this.effect, r = n.material, f = r.uniforms;
    if (e) {
      let h = Object.keys(e);
      for (let l = 0; l < h.length; l++)
        f[h[l]] ? f[h[l]].value = e[h[l]] : (f[h[l]] = { value: e[h[l]] }, n.material.needsUpdate = !0, n.material.uniforms = f);
    }
    t ? f.resolution.value.set(t.width, t.height) : this.renderer.getSize(f.resolution.value), this.screen.material = r, this.renderer.setRenderTarget(t), this.renderer.render(this.scene, this.camera), this.renderer.setRenderTarget(i);
  }
}
class Z {
  constructor(e, t, i) {
    this.obj = e, this.baseTransform = {
      position: this.obj.position.clone(),
      rotation: this.obj.quaternion.clone(),
      scale: this.obj.scale.clone()
    }, this.transform = t, i || (this.transform.position && this.transform.position.add(this.obj.position), this.transform.rotation && this.transform.rotation.multiply(this.obj.quaternion));
  }
  updateTransform(e) {
    this.transform.position && this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position, e)), this.transform.rotation && this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation, e)), this.transform.scale && this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale * e + 1 - e));
  }
}
class X extends d.EventDispatcher {
  constructor() {
    super();
  }
  goHome() {
    this.dispatchEvent({ type: "gohome" });
  }
  wait(e) {
    return new Promise((t, i) => {
      const n = () => {
        i(), this.removeEventListener("gohome", n);
      };
      this.addEventListener("gohome", n), setTimeout(() => {
        this.removeEventListener("gohome", n), t();
      }, e * 1e3);
    });
  }
}
export {
  N as AnimationAction,
  W as Animator,
  j as BaseLayer,
  H as BlenderConnector,
  G as Controller,
  A as Easings,
  _ as FCurve,
  k as FCurveGroup,
  P as FCurveKeyFrame,
  U as GPUComputationController,
  Z as LayoutController,
  O as Lerps,
  F as Pointer,
  Q as PostProcessing,
  I as UniformsLib,
  X as WaitMan
};
//# sourceMappingURL=ore-three.js.map
