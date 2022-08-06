(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define(["three"], factory);
	else if(typeof exports === 'object')
		exports["ORE"] = factory(require("three"));
	else
		root["ORE"] = factory(root["THREE"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_three__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/GPUComputationController/shaders/passThrough.fs":
/*!*******************************************************************!*\
  !*** ./src/utils/GPUComputationController/shaders/passThrough.fs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nuniform sampler2D tex;\nvarying vec2 vUv;\n\nvoid main() {\n    gl_FragColor = texture2D(tex,vUv);\n}");

/***/ }),

/***/ "./src/utils/GPUComputationController/shaders/passThrough.vs":
/*!*******************************************************************!*\
  !*** ./src/utils/GPUComputationController/shaders/passThrough.vs ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    gl_Position = vec4( position, 1.0 );\n    vUv = uv;\n}");

/***/ }),

/***/ "./src/utils/PostProcessing/shaders/passThrow.vs":
/*!*******************************************************!*\
  !*** ./src/utils/PostProcessing/shaders/passThrow.vs ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4( position, 1.0 );\n}   ");

/***/ }),

/***/ "./src/core/BaseLayer.ts":
/*!*******************************!*\
  !*** ./src/core/BaseLayer.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseLayer": () => (/* binding */ BaseLayer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class BaseLayer extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor() {
        super();
        this.readyAnimate = false;
        this.time = 0;
        this.info = {
            name: '',
            aspectSetting: {
                mainAspect: 16 / 9,
                wideAspect: 10 / 1,
                portraitAspect: 1 / 2,
            },
            size: {
                windowSize: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(),
                windowAspectRatio: 1.0,
                canvasSize: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(),
                canvasPixelSize: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(),
                canvasAspectRatio: 1.0,
                pixelRatio: window.devicePixelRatio,
                portraitWeight: 0.0,
                wideWeight: 0.0
            }
        };
        this.commonUniforms = {
            time: {
                value: 0
            }
        };
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(50, 1, 0.1, 1000);
    }
    tick(deltaTime) {
        this.time += deltaTime;
        this.commonUniforms.time.value = this.time;
        if (this.readyAnimate) {
            this.animate(deltaTime);
        }
    }
    animate(deltaTime) { }
    onBind(layerInfo) {
        this.info.name = layerInfo.name;
        this.info.canvas = layerInfo.canvas;
        if (layerInfo.wrapperElement) {
            this.setWrapperElement(layerInfo.wrapperElement || null, false);
        }
        this.info.aspectSetting = layerInfo.aspectSetting || this.info.aspectSetting;
        this.info.alpha = layerInfo.alpha;
        this.info.size.pixelRatio = layerInfo.pixelRatio || this.info.size.pixelRatio;
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer(this.info);
        this.renderer.setPixelRatio(this.info.size.pixelRatio);
        this.renderer.debug.checkShaderErrors = true;
        this.info.canvas = this.renderer.domElement;
        setTimeout(() => {
            this.onResize();
            this.readyAnimate = true;
        }, 0);
    }
    onUnbind() {
        this.dispatchEvent({
            type: 'dispose'
        });
        this.removeChildrens(this.scene);
        this.readyAnimate = false;
    }
    removeChildrens(object) {
        const length = object.children.length;
        for (let i = length - 1; i >= 0; i--) {
            this.removeChildrens(object.children[i]);
            let geo = undefined;
            let mat = undefined;
            if (object.children[i].isMesh) {
                geo = object.children[i].geometry;
                mat = object.children[i].material;
            }
            object.remove((object.children[i]));
            if (geo) {
                geo.dispose();
            }
            if (mat) {
                mat.dispose();
            }
        }
    }
    setWrapperElement(wrapperElm, dispatchResize = true) {
        this.info.wrapperElement = wrapperElm;
        this.info.wrapperElementRect = wrapperElm ? wrapperElm.getBoundingClientRect() : null;
        if (dispatchResize) {
            this.onResize();
        }
    }
    onResize() {
        if (this.renderer == null)
            return;
        const newWindowSize = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(document.body.clientWidth, window.innerHeight);
        const newCanvasSize = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        if (this.info.wrapperElement) {
            newCanvasSize.set(this.info.wrapperElement.clientWidth, this.info.wrapperElement.clientHeight);
        }
        else {
            newCanvasSize.copy(newWindowSize);
        }
        let portraitWeight = 1.0 - ((newCanvasSize.x / newCanvasSize.y) - this.info.aspectSetting.portraitAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.portraitAspect);
        portraitWeight = Math.min(1.0, Math.max(0.0, portraitWeight));
        let wideWeight = 1.0 - ((newCanvasSize.x / newCanvasSize.y) - this.info.aspectSetting.wideAspect) / (this.info.aspectSetting.mainAspect - this.info.aspectSetting.wideAspect);
        wideWeight = Math.min(1.0, Math.max(0.0, wideWeight));
        this.info.size.windowSize.copy(newWindowSize);
        this.info.size.windowAspectRatio = newWindowSize.x / newWindowSize.y;
        this.info.size.canvasSize.copy(newCanvasSize);
        this.info.size.canvasPixelSize.copy(newCanvasSize.clone().multiplyScalar(this.renderer.getPixelRatio()));
        this.info.size.canvasAspectRatio = newCanvasSize.x / newCanvasSize.y;
        this.info.size.portraitWeight = portraitWeight;
        this.info.size.wideWeight = wideWeight;
        this.renderer.setPixelRatio(this.info.size.pixelRatio);
        this.renderer.setSize(this.info.size.canvasSize.x, this.info.size.canvasSize.y);
        this.camera.aspect = this.info.size.canvasAspectRatio;
        this.camera.updateProjectionMatrix();
        if (this.info.wrapperElement) {
            this.info.wrapperElementRect = this.info.wrapperElement.getBoundingClientRect();
        }
    }
    pointerEvent(e) {
        const canvasPointerPos = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        canvasPointerPos.copy(e.position);
        if (this.info.canvas) {
            const canvasRect = this.info.canvas.getBoundingClientRect();
            canvasPointerPos.sub(new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(canvasRect.x, canvasRect.y));
        }
        const screenPosition = canvasPointerPos.clone();
        screenPosition.divide(this.info.size.canvasSize);
        screenPosition.y = 1.0 - screenPosition.y;
        screenPosition.multiplyScalar(2.0).subScalar(1.0);
        const args = {
            event: e.pointerEvent,
            position: canvasPointerPos.clone(),
            delta: e.delta.clone(),
            screenPosition: screenPosition.clone(),
            windowPosition: e.position.clone()
        };
        if (e.pointerEventType == 'hover') {
            this.onHover(args);
        }
        else if (e.pointerEventType == 'start') {
            this.onTouchStart(args);
        }
        else if (e.pointerEventType == 'move') {
            this.onTouchMove(args);
        }
        else if (e.pointerEventType == 'end') {
            this.onTouchEnd(args);
        }
    }
    onTouchStart(args) { }
    onTouchMove(args) { }
    onTouchEnd(args) { }
    onHover(args) { }
    onWheel(event, trackpadDelta) { }
}


/***/ }),

/***/ "./src/core/Controller.ts":
/*!********************************!*\
  !*** ./src/core/Controller.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_Pointer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Pointer */ "./src/utils/Pointer.ts");


class Controller extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor(parameter) {
        super();
        this.layers = [];
        if (!(parameter && parameter.silent)) {
            console.log("%c- ore-three " + (__webpack_require__(/*! ../../package.json */ "./package.json").version) + " -", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px');
        }
        this.clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock();
        /*-------------------------------
            Pointer
        -------------------------------*/
        this.pointer = new _utils_Pointer__WEBPACK_IMPORTED_MODULE_1__.Pointer();
        this.setPointerEventElement((parameter && parameter.pointerEventElement) || document.body);
        /*-------------------------------
            Events
        -------------------------------*/
        let pointerUpdate = this.pointerEvent.bind(this);
        let pointerWheel = this.onWheel.bind(this);
        let orientationchange = this.onOrientationDevice.bind(this);
        let windowResize = this.onWindowResize.bind(this);
        this.pointer.addEventListener('update', pointerUpdate);
        this.pointer.addEventListener('wheel', pointerWheel);
        window.addEventListener('orientationchange', orientationchange);
        window.addEventListener('resize', windowResize);
        this.addEventListener('dispose', () => {
            this.pointer.removeEventListener('update', pointerUpdate);
            this.pointer.removeEventListener('wheel', pointerWheel);
            window.removeEventListener('orientationchange', orientationchange);
            window.removeEventListener('resize', windowResize);
        });
        this.tick();
    }
    tick() {
        const deltaTime = this.clock.getDelta();
        this.pointer.update();
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].tick(deltaTime);
        }
        requestAnimationFrame(this.tick.bind(this));
    }
    onWindowResize() {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].onResize();
        }
    }
    onOrientationDevice() {
        this.onWindowResize();
    }
    pointerEvent(e) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].pointerEvent(e);
        }
    }
    onWheel(e) {
        for (let i = 0; i < this.layers.length; i++) {
            this.layers[i].onWheel(e.wheelEvent, e.trackpadDelta);
        }
    }
    /*-------------------------------
        API
    -------------------------------*/
    addLayer(layer, layerInfo) {
        while (this.getLayer(layerInfo.name)) {
            layerInfo.name += '_';
        }
        this.layers.push(layer);
        layer.onBind(layerInfo);
    }
    getLayer(layerName) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].info.name == layerName)
                return this.layers[i];
        }
        return null;
    }
    removeLayer(layerNmae) {
        for (let i = this.layers.length - 1; i >= 0; i--) {
            const layer = this.layers[i];
            if (layer.info.name == layerNmae) {
                layer.onUnbind();
                this.layers.splice(i, 1);
            }
        }
    }
    setPointerEventElement(elm) {
        if (this.pointerEventElement) {
            this.pointer.unregisterElement(this.pointerEventElement);
        }
        this.pointer.registerElement(elm);
        this.pointerEventElement = elm;
    }
    dispose() {
        this.layers.forEach(item => {
            this.removeLayer(item.info.name);
        });
        this.tick = () => {
            return;
        };
        this.dispatchEvent({ type: 'dispose' });
    }
}


/***/ }),

/***/ "./src/utils/Animation/AnimationAction.ts":
/*!************************************************!*\
  !*** ./src/utils/Animation/AnimationAction.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationAction": () => (/* binding */ AnimationAction)
/* harmony export */ });
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../node_modules/wolfy87-eventemitter/EventEmitter.js");
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__);

class AnimationAction extends (wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default()) {
    constructor(name) {
        super();
        this.curves = {};
        this.name = name || '';
        this.uniforms = {};
        this.frame = {
            start: 0,
            end: 0,
            duration: 0,
        };
    }
    addFcurveGroup(propertyName, fcurveGroup) {
        this.curves[propertyName] = fcurveGroup;
        this.calcFrame();
    }
    removeFCurve(propertyName) {
        delete this.curves[propertyName];
        this.calcFrame();
    }
    calcFrame() {
        let curveKeys = Object.keys(this.curves);
        let minStart = Infinity;
        let maxEnd = -Infinity;
        for (let i = 0; i < curveKeys.length; i++) {
            let curve = (this.curves)[curveKeys[i]];
            if (curve.frameStart < minStart) {
                minStart = curve.frameStart;
            }
            if (curve.frameEnd > maxEnd) {
                maxEnd = curve.frameEnd;
            }
        }
        if (minStart == -Infinity || maxEnd == Infinity) {
            minStart = 0;
            maxEnd = 1;
        }
        this.frame.start = minStart;
        this.frame.end = maxEnd;
        this.frame.duration = this.frame.end - this.frame.start;
    }
    getFCurveGroup(propertyName) {
        return this.curves[propertyName] || null;
    }
    /*-------------------------------
        get values
    -------------------------------*/
    assignUniforms(propertyName, uniform) {
        this.uniforms[propertyName] = uniform;
    }
    getUniforms(propertyName) {
        if (this.uniforms[propertyName]) {
            return this.uniforms[propertyName];
        }
        let curveGroup = this.getFCurveGroup(propertyName);
        if (curveGroup) {
            let uni = {
                value: curveGroup.createInitValue()
            };
            this.uniforms[propertyName] = uni;
            return uni;
        }
        return null;
    }
    getValue(propertyName, target) {
        let uniform = this.getUniforms(propertyName);
        if (!uniform)
            return target || null;
        let value = uniform.value;
        if (!target)
            return value;
        if (typeof value == 'number') {
            target.x = value;
            return target;
        }
        target.x = value.x;
        target.y = value.y;
        if ('z' in target && 'z' in value) {
            target.z = value.z;
        }
        if ('w' in target && 'w' in value) {
            target.w = value.w;
        }
        return target || null;
    }
    getValueAt(propertyName, frame, target) {
        let curve = this.getFCurveGroup(propertyName);
        if (target) {
            if (!curve)
                return target;
            return curve.getValue(frame || 0, target);
        }
        else {
            if (!curve)
                return null;
            return curve.getValue(frame);
        }
    }
    /*-------------------------------
        UpdateFrame
    -------------------------------*/
    updateFrame(frame) {
        let curveKeys = Object.keys(this.curves);
        for (let i = 0; i < curveKeys.length; i++) {
            let fcurveGroup = this.curves[curveKeys[i]];
            let uni = this.getUniforms(curveKeys[i]);
            if (!uni)
                continue;
            if (typeof uni.value == 'number') {
                uni.value = fcurveGroup.getValue(frame) || 0;
            }
            else {
                fcurveGroup.getValue(frame, uni.value);
            }
        }
        this.emitEvent('update', [this]);
    }
}


/***/ }),

/***/ "./src/utils/Animation/FCurve.ts":
/*!***************************************!*\
  !*** ./src/utils/Animation/FCurve.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FCurve": () => (/* binding */ FCurve)
/* harmony export */ });
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../node_modules/wolfy87-eventemitter/EventEmitter.js");
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__);

class FCurve extends (wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default()) {
    constructor(frames) {
        super();
        this.keyframes = [];
        this.cache = { frame: NaN, value: NaN };
        this.frameStart = 0;
        this.frameEnd = 0;
        this.frameDuration = 0;
        this.set(frames);
    }
    set(frames) {
        if (frames) {
            this.keyframes.length = 0;
            frames.forEach(keyframe => {
                this.addKeyFrame(keyframe);
            });
        }
    }
    addKeyFrame(keyframe) {
        let index = 0;
        for (let i = 0; i < this.keyframes.length; i++) {
            let frame = this.keyframes[i];
            if (frame.coordinate.x < keyframe.coordinate.x) {
                index++;
            }
            else {
                break;
            }
        }
        this.keyframes.splice(index, 0, keyframe);
        // set frame info
        this.frameStart = this.keyframes[0].coordinate.x;
        this.frameEnd = this.keyframes[this.keyframes.length - 1].coordinate.x;
    }
    getValue(frame) {
        if (frame == this.cache.frame) {
            return this.cache.value;
        }
        let value = null;
        for (let i = 0; i < this.keyframes.length; i++) {
            let keyframe = this.keyframes[i];
            if (frame <= keyframe.coordinate.x) {
                let beforeKeyFrame = this.keyframes[i - 1];
                if (beforeKeyFrame) {
                    value = beforeKeyFrame.to(keyframe, frame);
                }
                else {
                    value = keyframe.coordinate.y;
                }
                break;
            }
        }
        if (value === null && this.keyframes.length > 0) {
            value = this.keyframes[this.keyframes.length - 1].coordinate.y;
        }
        if (value !== null) {
            this.cache = {
                frame: frame,
                value: value
            };
            return value;
        }
        return 0;
    }
}


/***/ }),

/***/ "./src/utils/Animation/FCurveGroup.ts":
/*!********************************************!*\
  !*** ./src/utils/Animation/FCurveGroup.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FCurveGroup": () => (/* binding */ FCurveGroup)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../node_modules/wolfy87-eventemitter/EventEmitter.js");
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_1__);


class FCurveGroup extends (wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_1___default()) {
    constructor(name, x, y, z, w, scalar) {
        super();
        this.type = 'scalar';
        this.name = name || '';
        this.frameStart = 0;
        this.frameEnd = 0;
        this.frameDuration = 0;
        this.curve = {
            x: null,
            y: null,
            z: null,
            w: null,
            scalar: null
        };
        if (x) {
            this.setFCurve(x, 'x');
        }
        if (y) {
            this.setFCurve(y, 'y');
        }
        if (z) {
            this.setFCurve(z, 'z');
        }
        if (w) {
            this.setFCurve(w, 'w');
        }
    }
    setFCurve(curve, axis) {
        this.curve[axis] = curve;
        this.calcType();
        this.calcFrame();
    }
    calcType() {
        if (this.curve.scalar) {
            this.type = 'scalar';
        }
        if (this.curve.w) {
            this.type = 'vec4';
        }
        else if (this.curve.z) {
            this.type = 'vec3';
        }
        else if (this.curve.y) {
            this.type = 'vec2';
        }
        else if (this.curve.x) {
            this.type = 'scalar';
        }
    }
    calcFrame() {
        let curveKeys = Object.keys(this.curve);
        let minStart = Infinity;
        let maxEnd = -Infinity;
        for (let i = 0; i < curveKeys.length; i++) {
            let curve = this.curve[curveKeys[i]];
            if (!curve)
                continue;
            if (curve.frameStart < minStart) {
                minStart = curve.frameStart;
            }
            if (curve.frameEnd > maxEnd) {
                maxEnd = curve.frameEnd;
            }
        }
        if (minStart == -Infinity || maxEnd == Infinity) {
            minStart = 0;
            maxEnd = 1;
        }
        this.frameStart = minStart;
        this.frameEnd = maxEnd;
        this.frameDuration = this.frameEnd - this.frameStart;
    }
    createInitValue() {
        if (this.type == 'vec2') {
            return new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        }
        else if (this.type == 'vec3') {
            return new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        }
        else if (this.type == 'vec4') {
            return new three__WEBPACK_IMPORTED_MODULE_0__.Vector4();
        }
        return 0;
    }
    getValue(frame, target) {
        if (target) {
            if (this.curve.x) {
                target.x = this.curve.x.getValue(frame);
            }
            if (this.curve.y) {
                target.y = this.curve.y.getValue(frame);
            }
            if (this.curve.z && 'z' in target) {
                target.z = this.curve.z.getValue(frame);
            }
            if (this.curve.w && 'w' in target) {
                target.w = this.curve.w.getValue(frame);
            }
            return target;
        }
        else {
            if (this.curve.scalar) {
                return this.curve.scalar.getValue(frame);
            }
            return null;
        }
    }
}


/***/ }),

/***/ "./src/utils/Animation/FCurveKeyFrame.ts":
/*!***********************************************!*\
  !*** ./src/utils/Animation/FCurveKeyFrame.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FCurveKeyFrame": () => (/* binding */ FCurveKeyFrame)
/* harmony export */ });
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../node_modules/wolfy87-eventemitter/EventEmitter.js");
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Easings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Easings */ "./src/utils/Easings.ts");


class FCurveKeyFrame extends (wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default()) {
    constructor(coordinate, handleLeft, handleRight, interpolation) {
        super();
        this.coordinate = { x: 0, y: 0 };
        this.handleLeft = { x: 0, y: 0 };
        this.handleRight = { x: 0, y: 0 };
        this.interpolation = 'BEZIER';
        this.easing = null;
        this.nextFrame = null;
        this.set(coordinate, handleLeft, handleRight, interpolation);
    }
    set(coordinate, handleLeft, handleRight, interpolation) {
        this.coordinate = coordinate;
        this.handleLeft = handleLeft || coordinate;
        this.handleRight = handleRight || coordinate;
        this.interpolation = interpolation || 'BEZIER';
    }
    getEasing(interpolation, nextFrame) {
        if (interpolation == 'BEZIER') {
            return _Easings__WEBPACK_IMPORTED_MODULE_1__.Easings.bezier(this.coordinate, this.handleRight, nextFrame.handleLeft, nextFrame.coordinate);
        }
        else {
            return (t) => {
                let d = (nextFrame.coordinate.y - this.coordinate.y);
                t = (t - this.coordinate.x) / (nextFrame.coordinate.x - this.coordinate.x);
                return this.coordinate.y + t * d;
            };
        }
    }
    to(nextFrame, t) {
        if (this.nextFrame == null || this.nextFrame.coordinate.x != nextFrame.coordinate.x || this.nextFrame.coordinate.y != nextFrame.coordinate.y) {
            this.easing = this.getEasing(this.interpolation, nextFrame);
            this.nextFrame = nextFrame;
        }
        if (this.easing) {
            return this.easing(t);
        }
        else {
            return 0;
        }
    }
}


/***/ }),

/***/ "./src/utils/Animator.ts":
/*!*******************************!*\
  !*** ./src/utils/Animator.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Animator": () => (/* binding */ Animator)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Easings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Easings */ "./src/utils/Easings.ts");
/* harmony import */ var _Lerps__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Lerps */ "./src/utils/Lerps.ts");



class Animator extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor() {
        super();
        this.isAnimating = false;
        this.animatingCount = 0;
        this.dispatchEvents = [];
        this.variables = {};
        this.dataBase = {};
    }
    add(params) {
        let variable = {
            time: -1,
            value: this.getValueClone(params.initValue),
            startValue: this.getValueClone(params.initValue),
            goalValue: this.getValueClone(params.initValue),
            easing: params.easing || _Easings__WEBPACK_IMPORTED_MODULE_1__.Easings.sigmoid(),
            lerpFunc: (params.customLerpFunc || _Lerps__WEBPACK_IMPORTED_MODULE_2__.Lerps.getLerpFunc(params.initValue)),
            userData: params.userData,
        };
        this.dataBase[params.name] = variable.value;
        this.variables[params.name] = variable;
        this.dispatchEvent({
            type: 'added',
            varName: params.name,
            variable,
        });
        return variable;
    }
    /*-------------------------------
        Set
    -------------------------------*/
    setEasing(name, easing) {
        let variable = this.variables[name];
        if (variable) {
            variable.easing = easing;
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
        }
    }
    setValue(name, value) {
        let variable = this.dataBase[name];
        if (variable !== undefined) {
            if (typeof variable == 'number') {
                this.dataBase[name] = value;
            }
            else if ("copy" in variable) {
                variable.copy(value);
            }
            else if (variable instanceof Array) {
                variable = value.concat();
            }
            this.updateDataBase(name);
            this.cancelAnimate(name);
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
            return null;
        }
    }
    /*-------------------------------
        Animate
    -------------------------------*/
    animate(name, goalValue, duration = 1, callback, easing) {
        let variable = this.variables[name];
        let promise = new Promise(resolve => {
            if (variable) {
                if (duration <= 0) {
                    this.setValue(name, goalValue);
                    variable.time = 1.0;
                    variable.onAnimationFinished = () => {
                        callback && callback();
                        resolve(null);
                    };
                    return;
                }
                if (variable.time == -1) {
                    this.isAnimating = true;
                    this.animatingCount++;
                }
                variable.time = 0;
                variable.duration = duration;
                variable.startValue = this.getValueClone(variable.value);
                variable.goalValue = this.getValueClone(goalValue);
                variable.onAnimationFinished = () => {
                    callback && callback();
                    resolve(null);
                };
                if (easing) {
                    this.setEasing(name, easing);
                }
            }
            else {
                console.warn('"' + name + '"' + ' is not exist');
            }
        });
        return promise;
    }
    cancelAnimate(name) {
        let variable = this.variables[name];
        if (variable) {
            variable.time = 1.0;
            variable.onAnimationFinished = null;
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
        }
    }
    /*-------------------------------
        Get
    -------------------------------*/
    get(name) {
        if (this.variables[name]) {
            return this.variables[name].value;
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
            return null;
        }
    }
    getVariableObject(name, mute = false) {
        if (this.variables[name]) {
            return this.variables[name];
        }
        else {
            if (!mute) {
                console.warn('"' + name + '"' + ' is not exist');
            }
            return null;
        }
    }
    /*-------------------------------
        Utils
    -------------------------------*/
    applyToUniforms(uniforms) {
        let keys = Object.keys(this.variables);
        for (let i = 0; i < keys.length; i++) {
            let variable = this.getVariableObject(keys[i]);
            if (variable) {
                uniforms[keys[i]] = variable;
            }
        }
    }
    isAnimatingVariable(name, mute = false) {
        if (this.variables[name]) {
            let time = this.variables[name].time;
            return time != -1.0;
        }
        else {
            if (!mute) {
                console.warn('"' + name + '"' + ' is not exist');
            }
            return null;
        }
    }
    /*-------------------------------
        Utils
    -------------------------------*/
    getValueClone(value) {
        if (typeof value == 'number') {
            return value;
        }
        else if ('clone' in value) {
            return value.clone();
        }
        else if (value instanceof Array) {
            return value.concat();
        }
        return value;
    }
    wait(t) {
        let prm = new Promise((r) => {
            setTimeout(() => {
                r();
            }, (t * 1000));
        });
        return prm;
    }
    /*-------------------------------
        Update
    -------------------------------*/
    update(deltaTime) {
        if (this.animatingCount == 0) {
            this.isAnimating = false;
        }
        let keys = Object.keys(this.variables);
        for (let i = 0; i < keys.length; i++) {
            let variableName = keys[i];
            let variable = this.variables[variableName];
            let time = variable.time;
            if (time == 1.0) {
                this.animatingCount--;
                time = -1;
                if (variable.onAnimationFinished) {
                    this.dispatchEvents.push(variable.onAnimationFinished);
                }
            }
            if (time >= 0.0 && time < 1.0) {
                let duration = variable.duration;
                let easing = variable.easing;
                let lerpFunc = variable.lerpFunc;
                if (duration) {
                    time += (deltaTime || 0.016) / duration;
                    if (duration == 0 || time >= 1.0) {
                        time = 1.0;
                    }
                }
                let value = variable.goalValue;
                if (time < 1.0) {
                    if (lerpFunc) {
                        value = lerpFunc(variable.startValue, variable.goalValue, easing(time));
                    }
                }
                let dataBaseValue = this.dataBase[variableName];
                if (typeof dataBaseValue == 'number' || !('copy' in dataBaseValue)) {
                    this.dataBase[variableName] = value;
                }
                else if ('copy' in dataBaseValue) {
                    dataBaseValue.copy(value);
                }
                this.dispatchEvent({
                    type: 'update/' + keys[i],
                    deltaTime: deltaTime,
                    value: variable.value
                });
            }
            variable.time = time;
        }
        while (this.dispatchEvents.length != 0) {
            let func = this.dispatchEvents.pop();
            if (func) {
                func();
            }
        }
        this.updateDataBase();
        this.dispatchEvent({
            type: 'update',
            deltaTime: deltaTime
        });
        if (this.isAnimating) {
            this.dispatchEvent({
                type: 'animate',
                deltaTime: deltaTime
            });
        }
    }
    updateDataBase(target) {
        if (target) {
            let variable = this.variables[target];
            let databaseValue = this.dataBase[target];
            if (variable && databaseValue !== undefined) {
                if (typeof variable.value == 'number' || !('copy' in variable.value)) {
                    variable.value = databaseValue;
                }
            }
            return;
        }
        let key = Object.keys(this.dataBase);
        for (let i = 0; i < key.length; i++) {
            let variable = this.variables[key[i]];
            let databaseValue = this.dataBase[key[i]];
            if (variable && databaseValue !== undefined) {
                // Vector系は参照なのでnumberとnumber[]あたりだけ更新
                if (typeof variable.value == 'number' || !('copy' in variable.value)) {
                    variable.value = databaseValue;
                }
            }
        }
    }
}


/***/ }),

/***/ "./src/utils/Bezier.ts":
/*!*****************************!*\
  !*** ./src/utils/Bezier.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bezier": () => (/* binding */ Bezier)
/* harmony export */ });
/*-------------------------------
        Bezier
-------------------------------*/
var Bezier;
(function (Bezier) {
    // inspired https://github.com/gre/bezier-easing/blob/master/src/index.js and https://github.com/0b5vr/automaton/blob/872420e798d9054d4a7a06c972cbb4261a67b4bc/src/bezierEasing.ts
    Bezier.NEWTON_ITERATIONS = 4;
    Bezier.NEWTON_MIN_SLOPE = 0.001;
    Bezier.SUBDIVISION_PRECISION = 0.0000001;
    Bezier.SUBDIVISION_MAX_ITERATIONS = 10;
    Bezier.BEZIER_EASING_CACHE_SIZE = 11;
    Bezier.BEZIER_EASING_SAMPLE_STEP_SIZE = 1.0 / Bezier.BEZIER_EASING_CACHE_SIZE;
    function calcBezierA(p) {
        return -p.p0 + 3.0 * p.p1 - 3.0 * p.p2 + p.p3;
    }
    function calcBezierB(p) {
        return 3.0 * p.p0 - 6.0 * p.p1 + 3.0 * p.p2;
    }
    function calcBezierC(p) {
        return -3.0 * p.p0 + 3.0 * p.p1;
    }
    function calcBezierSlope(p, t) {
        return 3.0 * calcBezierA(p) * t * t + 2.0 * calcBezierB(p) * t + calcBezierC(p);
    }
    Bezier.calcBezierSlope = calcBezierSlope;
    function calcBezier(p, t) {
        return ((calcBezierA(p) * t + calcBezierB(p)) * t + calcBezierC(p)) * t + p.p0;
    }
    Bezier.calcBezier = calcBezier;
    function subdiv(x, startT, endT, p) {
        let currentX = 0;
        let currentT = 0;
        for (let i = 0; i < Bezier.SUBDIVISION_MAX_ITERATIONS; i++) {
            currentT = startT + (endT - startT) / 2;
            currentX = calcBezier(p, currentT);
            if (currentX > x) {
                endT = currentT;
            }
            else {
                startT = currentT;
            }
        }
        return currentT;
    }
    function newton(x, p, t) {
        for (let i = 0; i < Bezier.NEWTON_ITERATIONS; i++) {
            let slope = calcBezierSlope(p, t);
            if (slope == 0.0) {
                return t;
            }
            let currentX = (calcBezier(p, t)) - x;
            t -= currentX / slope;
        }
        return t;
    }
    function getBezierTfromX(p, x, cache) {
        p.p1 = Math.max(p.p0, Math.min(p.p3, p.p1));
        p.p2 = Math.max(p.p0, Math.min(p.p3, p.p2));
        let sample = 0;
        for (let i = 1; i < cache.length; i++) {
            sample = i - 1;
            if (x < cache[i])
                break;
        }
        let t = sample / (Bezier.BEZIER_EASING_CACHE_SIZE - 1.0);
        let diff = calcBezierSlope(p, t) / (p.p3 - p.p0);
        if (diff == 0.0) {
            return t;
        }
        else if (diff > 0.01) {
            return newton(x, p, t);
        }
        else {
            return subdiv(x, t, t + Bezier.BEZIER_EASING_SAMPLE_STEP_SIZE, p);
        }
    }
    Bezier.getBezierTfromX = getBezierTfromX;
})(Bezier || (Bezier = {}));


/***/ }),

/***/ "./src/utils/BlenderConnector/index.ts":
/*!*********************************************!*\
  !*** ./src/utils/BlenderConnector/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlenderConnector": () => (/* binding */ BlenderConnector)
/* harmony export */ });
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../node_modules/wolfy87-eventemitter/EventEmitter.js");
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Animation_AnimationAction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Animation/AnimationAction */ "./src/utils/Animation/AnimationAction.ts");
/* harmony import */ var _Animation_FCurve__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Animation/FCurve */ "./src/utils/Animation/FCurve.ts");
/* harmony import */ var _Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Animation/FCurveGroup */ "./src/utils/Animation/FCurveGroup.ts");
/* harmony import */ var _Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Animation/FCurveKeyFrame */ "./src/utils/Animation/FCurveKeyFrame.ts");





class BlenderConnector extends (wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0___default()) {
    constructor(url) {
        super();
        this.connected = false;
        // frame
        this.frameCurrent = 0;
        this.frameStart = 0;
        this.frameEnd = 0;
        // animation
        this.objects = [];
        this.actions = [];
        if (url) {
            this.url = url;
            this.connect(this.url);
        }
    }
    connect(url) {
        this.url = url;
        this.ws = new WebSocket(this.url);
        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onclose = this.onClose.bind(this);
        this.ws.onerror = (e) => {
            console.error(e);
        };
    }
    syncJsonScene(jsonPath) {
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    this.onSyncScene(JSON.parse(req.response));
                }
            }
        };
        req.open('GET', jsonPath);
        req.send();
    }
    /*-------------------------------
        Events
    -------------------------------*/
    onSyncScene(data) {
        this.actions.length = 0;
        this.objects.length = 0;
        // actions
        data.actions.forEach(actionData => {
            let action = new _Animation_AnimationAction__WEBPACK_IMPORTED_MODULE_1__.AnimationAction(actionData.name);
            let fcurveGroupNames = Object.keys(actionData.fcurve_groups);
            for (let i = 0; i < fcurveGroupNames.length; i++) {
                let fcurveGroupName = fcurveGroupNames[i];
                let fcurveGroup = new _Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_3__.FCurveGroup(fcurveGroupName);
                actionData.fcurve_groups[fcurveGroupName].forEach(fcurveData => {
                    let curve = new _Animation_FCurve__WEBPACK_IMPORTED_MODULE_2__.FCurve();
                    curve.set(fcurveData.keyframes.map(frame => {
                        return new _Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_4__.FCurveKeyFrame(frame.c, frame.h_l, frame.h_r, frame.i);
                    }));
                    fcurveGroup.setFCurve(curve, fcurveData.axis);
                });
                action.addFcurveGroup(fcurveGroup.name, fcurveGroup);
            }
            this.actions.push(action);
        });
        // objects
        data.objects.forEach(objectData => {
            this.objects.push(objectData);
        });
        // dispatch event
        this.emitEvent('update/scene', [this]);
        this.setTimeline(this.frameCurrent);
    }
    onSyncTimeline(data) {
        this.setTimeline(data.current, data.start, data.end);
    }
    /*-------------------------------
        WS Events
    -------------------------------*/
    onOpen(event) {
        this.connected = true;
    }
    onMessage(e) {
        let msg = JSON.parse(e.data);
        if (msg.type == 'sync/scene') {
            this.onSyncScene(msg.data);
        }
        else if (msg.type == "sync/timeline") {
            this.onSyncTimeline(msg.data);
        }
    }
    onClose(e) {
        this.disposeWS();
    }
    /*-------------------------------
        API
    -------------------------------*/
    getActionNameList(objectName) {
        for (let i = 0; i < this.objects.length; i++) {
            if (this.objects[i].name == objectName) {
                return this.objects[i].actions;
            }
        }
        return [];
    }
    getAction(actionName) {
        for (let i = 0; i < this.actions.length; i++) {
            if (this.actions[i].name == actionName) {
                return this.actions[i];
            }
        }
        return null;
    }
    getActionList(objectName) {
        let actions = [];
        let actionNameList = this.getActionNameList(objectName);
        actionNameList.forEach(actionName => {
            let action = this.getAction(actionName);
            if (action) {
                actions.push(action);
            }
        });
        return actions;
    }
    getActionContainsAccessor(accessor) {
        return this.actions.find(action => {
            let curveKeys = Object.keys(action.curves);
            return curveKeys.some(curveName => curveName == accessor);
        }) || null;
    }
    setTimeline(current, start, end) {
        this.frameCurrent = current;
        this.frameStart = start || this.frameStart;
        this.frameEnd = end || this.frameEnd;
        this.emitEvent('update/timeline', [this.frameCurrent, this.frameStart, this.frameEnd]);
    }
    /*-------------------------------
        Dispose
    -------------------------------*/
    dispose() {
        this.disposeWS();
    }
    disposeWS() {
        if (this.ws) {
            this.ws.close();
            this.ws.onmessage = null;
            this.ws.onclose = null;
            this.ws.onopen = null;
            this.connected = false;
        }
    }
}


/***/ }),

/***/ "./src/utils/Easings.ts":
/*!******************************!*\
  !*** ./src/utils/Easings.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Easings": () => (/* binding */ Easings)
/* harmony export */ });
/* harmony import */ var _Bezier__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Bezier */ "./src/utils/Bezier.ts");

var Easings;
(function (Easings) {
    function sigmoid(weight = 6) {
        return (x) => {
            var e1 = Math.exp(-weight * (2 * x - 1));
            var e2 = Math.exp(-weight);
            return (1 + (1 - e1) / (1 + e1) * (1 + e2) / (1 - e2)) / 2;
        };
    }
    Easings.sigmoid = sigmoid;
    function smoothstep(min, max, value) {
        let x = Math.max(0, Math.min(1, (value - min) / (max - min)));
        return x * x * (3 - 2 * x);
    }
    Easings.smoothstep = smoothstep;
    /*
    @auther https://gist.github.com/gre/1650294
    */
    function linear(t) {
        return t;
    }
    Easings.linear = linear;
    function easeInQuad(t) {
        return t * t;
    }
    Easings.easeInQuad = easeInQuad;
    function easeOutQuad(t) {
        return t * (2 - t);
    }
    Easings.easeOutQuad = easeOutQuad;
    function easeInOutQuad(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
    Easings.easeInOutQuad = easeInOutQuad;
    function easeInCubic(t) {
        return t * t * t;
    }
    Easings.easeInCubic = easeInCubic;
    function easeOutCubic(t) {
        return (--t) * t * t + 1;
    }
    Easings.easeOutCubic = easeOutCubic;
    function easeInOutCubic(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    Easings.easeInOutCubic = easeInOutCubic;
    function easeInQuart(t) {
        return t * t * t * t;
    }
    Easings.easeInQuart = easeInQuart;
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    Easings.easeOutQuart = easeOutQuart;
    function easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
    }
    Easings.easeInOutQuart = easeInOutQuart;
    function easeInQuint(t) {
        return t * t * t * t * t;
    }
    Easings.easeInQuint = easeInQuint;
    function easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
    }
    Easings.easeOutQuint = easeOutQuint;
    function easeInOutQuint(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
    }
    Easings.easeInOutQuint = easeInOutQuint;
    function bezier(c1, h1, h2, c2) {
        var cache = new Array(_Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.BEZIER_EASING_CACHE_SIZE);
        for (var i = 0; i < _Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.BEZIER_EASING_CACHE_SIZE; ++i) {
            cache[i] = _Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.calcBezier({ p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, i / (_Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.BEZIER_EASING_CACHE_SIZE - 1.0));
        }
        return (x) => {
            if (x <= c1.x)
                return c1.y;
            if (c2.x <= x)
                return c2.y;
            return _Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.calcBezier({ p0: c1.y, p1: h1.y, p2: h2.y, p3: c2.y }, _Bezier__WEBPACK_IMPORTED_MODULE_0__.Bezier.getBezierTfromX({ p0: c1.x, p1: h1.x, p2: h2.x, p3: c2.x }, x, cache));
        };
    }
    Easings.bezier = bezier;
    function cubicBezier(h1X, h1Y, h2X, h2Y) {
        return bezier({ x: 0.0, y: 0.0 }, { x: h1X, y: h1Y }, { x: h2X, y: h2Y }, { x: 1.0, y: 1.0 });
    }
    Easings.cubicBezier = cubicBezier;
})(Easings || (Easings = {}));


/***/ }),

/***/ "./src/utils/GPUComputationController/index.ts":
/*!*****************************************************!*\
  !*** ./src/utils/GPUComputationController/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GPUComputationController": () => (/* binding */ GPUComputationController)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders_passThrough_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/passThrough.vs */ "./src/utils/GPUComputationController/shaders/passThrough.vs");
/* harmony import */ var _shaders_passThrough_fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shaders/passThrough.fs */ "./src/utils/GPUComputationController/shaders/passThrough.fs");
/* harmony import */ var _Uniforms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Uniforms */ "./src/utils/Uniforms.ts");




class GPUComputationController {
    constructor(renderer, dataSize) {
        this.renderTargets = [];
        this.renderer = renderer;
        this.dataSize = dataSize.clone();
        this.uniforms = {
            dataSize: {
                value: this.dataSize
            }
        };
        this.tempDataLinear = this.createData({
            minFilter: three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,
            magFilter: three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter
        });
        this.tempDataNear = this.createData({
            minFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter,
            magFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter
        });
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.Camera();
        this.materials = [];
        this.mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2, 2));
        this.scene.add(this.mesh);
    }
    get isSupported() {
        return this.renderer.extensions.get("OES_texture_float");
    }
    createInitializeTexture() {
        let a = new Float32Array(this.uniforms.dataSize.value.x * this.uniforms.dataSize.value.y * 4);
        let texture = new three__WEBPACK_IMPORTED_MODULE_0__.DataTexture(a, this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat, three__WEBPACK_IMPORTED_MODULE_0__.FloatType);
        texture.needsUpdate = true;
        return texture;
    }
    createData(initTex_texParam, textureParam) {
        let userAgent = navigator.userAgent;
        let isiOS = userAgent.indexOf('iPhone') >= 0 || userAgent.indexOf('iPad') >= 0 || navigator.platform == "iPad" || (navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== undefined);
        let param = {
            wrapS: three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping,
            wrapT: three__WEBPACK_IMPORTED_MODULE_0__.ClampToEdgeWrapping,
            minFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter,
            magFilter: three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter,
            format: three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat,
            type: isiOS ? three__WEBPACK_IMPORTED_MODULE_0__.HalfFloatType : three__WEBPACK_IMPORTED_MODULE_0__.FloatType,
            stencilBuffer: false,
            depthBuffer: false
        };
        let initTex = null;
        let customParam = null;
        if (initTex_texParam) {
            if (initTex_texParam.isDataTexture) {
                initTex = initTex_texParam;
                if (textureParam) {
                    customParam = textureParam;
                }
            }
            else {
                customParam = initTex_texParam;
            }
        }
        if (customParam) {
            param.wrapS = customParam.wrapS || param.wrapS;
            param.wrapT = customParam.wrapT || param.wrapT;
            param.minFilter = customParam.minFilter || param.minFilter;
            param.magFilter = customParam.magFilter || param.magFilter;
            param.format = customParam.format || param.format;
            param.type = customParam.type || param.type;
            param.stencilBuffer = customParam.stencilBuffer || param.stencilBuffer;
            param.depthBuffer = customParam.depthBuffer || param.depthBuffer;
        }
        let buf = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget(this.uniforms.dataSize.value.x, this.uniforms.dataSize.value.y, param);
        let data = { buffer: buf };
        this.renderTargets.push(buf);
        if (initTex) {
            let initKernel = this.createKernel({
                fragmentShader: _shaders_passThrough_fs__WEBPACK_IMPORTED_MODULE_2__["default"],
                uniforms: {
                    tex: {
                        value: initTex
                    }
                }
            });
            this.compute(initKernel, data);
        }
        return data;
    }
    createKernel(param) {
        let uni = _Uniforms__WEBPACK_IMPORTED_MODULE_3__.UniformsLib.mergeUniforms(param.uniforms, this.uniforms);
        param.uniforms = uni;
        param.vertexShader = param.vertexShader || _shaders_passThrough_vs__WEBPACK_IMPORTED_MODULE_1__["default"];
        let mat = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial(param);
        this.materials.push(mat);
        let kernel = {
            material: mat,
            uniforms: param.uniforms
        };
        return kernel;
    }
    compute(kernel, data, camera) {
        let temp;
        if (data.buffer.texture.magFilter == three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter) {
            temp = this.tempDataLinear;
        }
        else {
            temp = this.tempDataNear;
        }
        this.mesh.material = kernel.material;
        let currentRenderTarget = this.renderer.getRenderTarget();
        this.renderer.setRenderTarget(temp.buffer);
        this.renderer.render(this.scene, camera || this.camera);
        this.swapBuffers(data, temp);
        this.renderer.setRenderTarget(currentRenderTarget);
    }
    swapBuffers(b1, b2) {
        let tmp = b1.buffer;
        b1.buffer = b2.buffer;
        b2.buffer = tmp;
    }
    dispose() {
        let geo = this.mesh.geometry;
        geo.dispose();
        for (let i = 0; i < this.materials.length; i++) {
            this.materials[i].dispose();
        }
        this.scene.remove(this.mesh);
        this.tempDataLinear.buffer.dispose();
        this.tempDataNear.buffer.dispose();
    }
    resizeData(dataSize) {
        this.dataSize.copy(dataSize);
        for (let i = 0; i < this.renderTargets.length; i++) {
            let target = this.renderTargets[i];
            target.setSize(dataSize.x, dataSize.y);
        }
    }
}


/***/ }),

/***/ "./src/utils/LayoutController.ts":
/*!***************************************!*\
  !*** ./src/utils/LayoutController.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LayoutController": () => (/* binding */ LayoutController)
/* harmony export */ });
class LayoutController {
    constructor(object, transform, isAbsolutePosition) {
        this.obj = object;
        this.baseTransform = {
            position: this.obj.position.clone(),
            rotation: this.obj.quaternion.clone(),
            scale: this.obj.scale.clone()
        };
        this.transform = transform;
        if (!isAbsolutePosition) {
            this.transform.position && this.transform.position.add(this.obj.position);
            this.transform.rotation && this.transform.rotation.multiply(this.obj.quaternion);
        }
    }
    updateTransform(weight) {
        if (this.transform.position) {
            this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position, weight));
        }
        if (this.transform.rotation) {
            this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation, weight));
        }
        if (this.transform.scale) {
            this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale * (weight) + 1.0 - weight));
        }
    }
}


/***/ }),

/***/ "./src/utils/Lerps.ts":
/*!****************************!*\
  !*** ./src/utils/Lerps.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lerps": () => (/* binding */ Lerps)
/* harmony export */ });
var Lerps;
(function (Lerps) {
    function number(a, b, t) {
        return a + (b - a) * t;
    }
    Lerps.number = number;
    function numberArray(a, b, t) {
        if (a.length == b.length) {
            let c = [];
            for (let i = 0; i < a.length; i++) {
                c.push(a[i] + (b[i] - a[i]) * t);
            }
            return c;
        }
        else {
            console.log('Different length Arrays!!!');
            return false;
        }
    }
    Lerps.numberArray = numberArray;
    function THREEVectors(a, b, t) {
        return a.clone().lerp(b, t);
    }
    Lerps.THREEVectors = THREEVectors;
    function THREEQuaternion(a, b, t) {
        return a.clone().slerp(b, t);
    }
    Lerps.THREEQuaternion = THREEQuaternion;
    function THREEEuler(a, b, t) {
        let ac = a.clone();
        let bc = b.clone();
        ac.x = ac.x + (bc.x - ac.x) * t;
        ac.y = ac.y + (bc.y - ac.y) * t;
        ac.z = ac.z + (bc.z - ac.z) * t;
        return ac;
    }
    Lerps.THREEEuler = THREEEuler;
    function getLerpFunc(value) {
        if (typeof (value) == 'number') {
            return Lerps.number;
        }
        else if (value instanceof Array) {
            return Lerps.numberArray;
        }
        else if ("isVector2" in value || "isVector3" in value || "isVector4" in value || "isColor" in value) {
            return Lerps.THREEVectors;
        }
        else if ("isQuaternion" in value) {
            return Lerps.THREEQuaternion;
        }
        else if ("isEuler" in value) {
            return Lerps.THREEEuler;
        }
    }
    Lerps.getLerpFunc = getLerpFunc;
})(Lerps || (Lerps = {}));


/***/ }),

/***/ "./src/utils/Pointer.ts":
/*!******************************!*\
  !*** ./src/utils/Pointer.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pointer": () => (/* binding */ Pointer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class Pointer extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor() {
        super();
        this.trackpadMemDelta = 0;
        this.trackpadMax = false;
        this.position = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(NaN, NaN);
        this.delta = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(NaN, NaN);
        const userAgent = navigator.userAgent;
        this.isSP = userAgent.indexOf('iPhone') >= 0 || userAgent.indexOf('iPad') >= 0 || userAgent.indexOf('Android') >= 0 || navigator.platform == "iPad" || (navigator.platform == "MacIntel" && navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1 && navigator.standalone !== undefined);
        this.position.set(NaN, NaN);
        this.isTouching = false;
    }
    registerElement(elm) {
        const onTouchStart = this.onTouch.bind(this, "start");
        const onTouchMove = this.onTouch.bind(this, "move");
        const onToucEnd = this.onTouch.bind(this, "end");
        const onPointerDown = this.onPointer.bind(this, "start");
        const onPointerMove = this.onPointer.bind(this, "move");
        const onPointerUp = this.onPointer.bind(this, "end");
        const onWheel = this.wheel.bind(this);
        elm.addEventListener('touchstart', onTouchStart, { passive: false });
        elm.addEventListener('touchmove', onTouchMove, { passive: false });
        elm.addEventListener('touchend', onToucEnd, { passive: false });
        elm.addEventListener('pointerdown', onPointerDown);
        elm.addEventListener('pointermove', onPointerMove);
        elm.addEventListener('pointerup', onPointerUp);
        elm.addEventListener("dragend", onPointerUp);
        elm.addEventListener("wheel", onWheel, { passive: false });
        const onUnRegister = (e) => {
            if (elm.isEqualNode(e.elm)) {
                elm.removeEventListener('touchstart', onTouchStart);
                elm.removeEventListener('touchmove', onTouchMove);
                elm.removeEventListener('touchend', onToucEnd);
                elm.removeEventListener('pointerdown', onPointerDown);
                elm.removeEventListener('pointermove', onPointerMove);
                elm.removeEventListener('pointerup', onPointerUp);
                elm.removeEventListener("dragend", onPointerUp);
                elm.removeEventListener("wheel", onWheel);
                this.removeEventListener('unregister', onUnRegister);
            }
        };
        this.addEventListener('unregister', onUnRegister);
    }
    unregisterElement(elm) {
        this.dispatchEvent({
            type: 'unregister',
            elm: elm,
        });
    }
    getScreenPosition(windowSize) {
        if (this.position.x != this.position.x)
            return new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(NaN, NaN);
        const p = this.position.clone()
            .divide(windowSize)
            .multiplyScalar(2.0)
            .subScalar(1.0);
        p.y *= -1;
        return p;
    }
    getRelativePosition(elm, screen) {
        const rect = elm.getClientRects()[0];
        let x = this.position.x - rect.left;
        let y = this.position.y - rect.top;
        if (screen) {
            x /= rect.width;
            y /= rect.height;
        }
        const p = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(x, y);
        return p;
    }
    setPos(x, y) {
        if (this.position.x !== this.position.x ||
            this.position.y !== this.position.y) {
            this.delta.set(0, 0);
        }
        else {
            this.delta.set(x - this.position.x, y - this.position.y);
        }
        this.position.set(x, y);
    }
    onTouch(type, e) {
        const touch = e.touches[0];
        if (touch) {
            this.touchEventHandler(touch.pageX, touch.pageY, type, e);
        }
        else {
            if (type == 'end') {
                this.touchEventHandler(NaN, NaN, type, e);
            }
        }
    }
    onPointer(type, e) {
        const pointerType = e.pointerType;
        if (pointerType != null) {
            if (pointerType == 'mouse' && (e.button == -1 || e.button == 0)) {
                this.touchEventHandler(e.pageX, e.pageY, type, e);
            }
        }
        else {
            this.touchEventHandler(e.pageX, e.pageY, type, e);
        }
    }
    touchEventHandler(posX, posY, type, e) {
        let dispatch = false;
        const x = posX - window.pageXOffset;
        const y = posY - window.pageYOffset;
        if (type == "start") {
            this.isTouching = true;
            this.setPos(x, y);
            this.delta.set(0, 0);
            dispatch = true;
        }
        else if (type == "move") {
            this.setPos(x, y);
            if (this.isTouching) {
                dispatch = true;
            }
        }
        else if (type == "end") {
            if ('targetTouches' in e) {
                if (e.targetTouches.length == 0) {
                    this.isTouching = false;
                }
            }
            else {
                this.isTouching = false;
            }
            dispatch = true;
        }
        if (dispatch) {
            this.dispatchEvent({
                type: 'update',
                pointerEvent: e,
                pointerEventType: type,
                position: this.position.clone(),
                delta: this.delta.clone()
            });
        }
    }
    update() {
        if (!this.isSP) {
            this.dispatchEvent({
                type: 'update',
                pointerEvent: null,
                pointerEventType: 'hover',
                position: this.position.clone(),
                delta: this.delta.clone()
            });
        }
    }
    wheel(e) {
        this.dispatchEvent({
            type: 'wheel',
            wheelEvent: e,
        });
    }
}


/***/ }),

/***/ "./src/utils/PostProcessing/index.ts":
/*!*******************************************!*\
  !*** ./src/utils/PostProcessing/index.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PostProcessing": () => (/* binding */ PostProcessing)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders_passThrow_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/passThrow.vs */ "./src/utils/PostProcessing/shaders/passThrow.vs");


class PostProcessing {
    constructor(renderer, ppParam, customGeometry) {
        this.renderer = renderer;
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(-1.0, 1.0, 1.0, -1.0);
        this.screen = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(customGeometry || new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2, 2));
        this.scene.add(this.screen);
        ppParam.vertexShader = ppParam.vertexShader || _shaders_passThrow_vs__WEBPACK_IMPORTED_MODULE_1__["default"];
        ppParam.uniforms = ppParam.uniforms || {};
        ppParam.uniforms.resolution = {
            value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()
        };
        this.effect = {
            material: new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial(ppParam),
        };
    }
    render(inputRenderTargets, renderTarget = null) {
        let renderTargetMem = this.renderer.getRenderTarget();
        let effect = this.effect;
        let material = effect.material;
        let uniforms = material.uniforms;
        if (inputRenderTargets) {
            let keys = Object.keys(inputRenderTargets);
            for (let j = 0; j < keys.length; j++) {
                if (uniforms[keys[j]]) {
                    uniforms[keys[j]].value = inputRenderTargets[keys[j]];
                }
                else {
                    uniforms[keys[j]] = { value: inputRenderTargets[keys[j]] };
                    effect.material.needsUpdate = true;
                    effect.material.uniforms = uniforms;
                }
            }
        }
        if (renderTarget) {
            uniforms.resolution.value.set(renderTarget.width, renderTarget.height);
        }
        else {
            this.renderer.getSize(uniforms.resolution.value);
        }
        this.screen.material = material;
        this.renderer.setRenderTarget(renderTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(renderTargetMem);
    }
}


/***/ }),

/***/ "./src/utils/Uniforms.ts":
/*!*******************************!*\
  !*** ./src/utils/Uniforms.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UniformsLib": () => (/* binding */ UniformsLib)
/* harmony export */ });
var UniformsLib;
(function (UniformsLib) {
    function mergeUniforms(...uniforms) {
        let res = {};
        for (let i = 0; i < uniforms.length; i++) {
            if (uniforms[i] != undefined) {
                Object.assign(res, uniforms[i]);
            }
        }
        return res;
    }
    UniformsLib.mergeUniforms = mergeUniforms;
})(UniformsLib || (UniformsLib = {}));


/***/ }),

/***/ "./src/utils/WaitMan.ts":
/*!******************************!*\
  !*** ./src/utils/WaitMan.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WaitMan": () => (/* binding */ WaitMan)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class WaitMan extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor() {
        super();
    }
    goHome() {
        this.dispatchEvent({ type: 'gohome' });
    }
    wait(time) {
        return new Promise((resolve, reject) => {
            const onGoHome = () => {
                reject();
                this.removeEventListener('gohome', onGoHome);
            };
            this.addEventListener('gohome', onGoHome);
            setTimeout(() => {
                this.removeEventListener('gohome', onGoHome);
                resolve();
            }, time * 1000.0);
        });
    }
}


/***/ }),

/***/ "../../node_modules/wolfy87-eventemitter/EventEmitter.js":
/*!***************************************************************!*\
  !*** ../../node_modules/wolfy87-eventemitter/EventEmitter.js ***!
  \***************************************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */

;(function (exports) {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    function isValidListener (listener) {
        if (typeof listener === 'function' || listener instanceof RegExp) {
            return true
        } else if (listener && typeof listener === 'object') {
            return isValidListener(listener.listener)
        } else {
            return false
        }
    }

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        if (!isValidListener(listener)) {
            throw new TypeError('listener must be a function');
        }

        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);

                for (i = 0; i < listeners.length; i++) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (true) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return EventEmitter;
        }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    else {}
}(typeof window !== 'undefined' ? window : this || {}));


/***/ }),

/***/ "three":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"three","commonjs2":"three","amd":"three","root":"THREE"} ***!
  \**************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"ore-three","version":"3.1.0","description":"","author":"ukonpower","license":"MIT","keywords":["threejs","webgl"],"repository":{"type":"git","url":"https://github.com/ukonpower/ore-three"},"bugs":{"url":"https://github.com/ukonpower/ore-three/issues"},"main":"./build/ore-three.js","types":"./types/index.d.ts","files":["build","types"],"scripts":{"dev":"webpack --config ./config/webpack/base.webpack.config.js --watch & tsc --declaration --emitDeclarationOnly -preserveWatchOutput -w","build":"webpack --config ./config/webpack/base.webpack.config.js & webpack --config ./config/webpack/min.webpack.config.js && tsc --declaration --emitDeclarationOnly"},"dependencies":{"wolfy87-eventemitter":"^5.2.9"},"devDependencies":{"@types/node":"^17.0.31","@types/offscreencanvas":"^2019.6.4","@types/three":">=0.130.0","@types/webgl2":"0.0.6","@typescript-eslint/eslint-plugin":"^5.19.0","@typescript-eslint/parser":"^5.19.0","del":"^6.0.0","eslint":"^8.13.0","eslint-config-mdcs":"^5.0.0","fancy-log":"^2.0.0","glslify-hex":"^2.1.1","glslify-import":"^3.1.0","glslify-loader":"^2.0.0","raw-loader":"^4.0.2","sass":"^1.50.0","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-merge":"^5.8.0","webpack-stream":"^7.0.0"},"peerDependencies":{"@types/three":">=0.130.0","three":">=0.130.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AnimationAction": () => (/* reexport safe */ _utils_Animation_AnimationAction__WEBPACK_IMPORTED_MODULE_3__.AnimationAction),
/* harmony export */   "Animator": () => (/* reexport safe */ _utils_Animator__WEBPACK_IMPORTED_MODULE_2__.Animator),
/* harmony export */   "BaseLayer": () => (/* reexport safe */ _core_BaseLayer__WEBPACK_IMPORTED_MODULE_0__.BaseLayer),
/* harmony export */   "BlenderConnector": () => (/* reexport safe */ _utils_BlenderConnector__WEBPACK_IMPORTED_MODULE_7__.BlenderConnector),
/* harmony export */   "Controller": () => (/* reexport safe */ _core_Controller__WEBPACK_IMPORTED_MODULE_1__.Controller),
/* harmony export */   "Easings": () => (/* reexport safe */ _utils_Easings__WEBPACK_IMPORTED_MODULE_9__.Easings),
/* harmony export */   "FCurve": () => (/* reexport safe */ _utils_Animation_FCurve__WEBPACK_IMPORTED_MODULE_4__.FCurve),
/* harmony export */   "FCurveGroup": () => (/* reexport safe */ _utils_Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_5__.FCurveGroup),
/* harmony export */   "FCurveKeyFrame": () => (/* reexport safe */ _utils_Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_6__.FCurveKeyFrame),
/* harmony export */   "GPUComputationController": () => (/* reexport safe */ _utils_GPUComputationController__WEBPACK_IMPORTED_MODULE_10__.GPUComputationController),
/* harmony export */   "LayoutController": () => (/* reexport safe */ _utils_LayoutController__WEBPACK_IMPORTED_MODULE_12__.LayoutController),
/* harmony export */   "Lerps": () => (/* reexport safe */ _utils_Lerps__WEBPACK_IMPORTED_MODULE_14__.Lerps),
/* harmony export */   "Pointer": () => (/* reexport safe */ _utils_Pointer__WEBPACK_IMPORTED_MODULE_8__.Pointer),
/* harmony export */   "PostProcessing": () => (/* reexport safe */ _utils_PostProcessing__WEBPACK_IMPORTED_MODULE_11__.PostProcessing),
/* harmony export */   "UniformsLib": () => (/* reexport safe */ _utils_Uniforms__WEBPACK_IMPORTED_MODULE_13__.UniformsLib),
/* harmony export */   "WaitMan": () => (/* reexport safe */ _utils_WaitMan__WEBPACK_IMPORTED_MODULE_15__.WaitMan)
/* harmony export */ });
/* harmony import */ var _core_BaseLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/BaseLayer */ "./src/core/BaseLayer.ts");
/* harmony import */ var _core_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Controller */ "./src/core/Controller.ts");
/* harmony import */ var _utils_Animator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Animator */ "./src/utils/Animator.ts");
/* harmony import */ var _utils_Animation_AnimationAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Animation/AnimationAction */ "./src/utils/Animation/AnimationAction.ts");
/* harmony import */ var _utils_Animation_FCurve__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Animation/FCurve */ "./src/utils/Animation/FCurve.ts");
/* harmony import */ var _utils_Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/Animation/FCurveGroup */ "./src/utils/Animation/FCurveGroup.ts");
/* harmony import */ var _utils_Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/Animation/FCurveKeyFrame */ "./src/utils/Animation/FCurveKeyFrame.ts");
/* harmony import */ var _utils_BlenderConnector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/BlenderConnector */ "./src/utils/BlenderConnector/index.ts");
/* harmony import */ var _utils_Pointer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/Pointer */ "./src/utils/Pointer.ts");
/* harmony import */ var _utils_Easings__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/Easings */ "./src/utils/Easings.ts");
/* harmony import */ var _utils_GPUComputationController__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/GPUComputationController */ "./src/utils/GPUComputationController/index.ts");
/* harmony import */ var _utils_PostProcessing__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/PostProcessing */ "./src/utils/PostProcessing/index.ts");
/* harmony import */ var _utils_LayoutController__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/LayoutController */ "./src/utils/LayoutController.ts");
/* harmony import */ var _utils_Uniforms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/Uniforms */ "./src/utils/Uniforms.ts");
/* harmony import */ var _utils_Lerps__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/Lerps */ "./src/utils/Lerps.ts");
/* harmony import */ var _utils_WaitMan__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/WaitMan */ "./src/utils/WaitMan.ts");

















})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZUFBZSxNQUFNO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7O0FBRUE7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBMEM7QUFDbEQsUUFBUSxtQ0FBTztBQUNmO0FBQ0EsU0FBUztBQUFBLGtHQUFDO0FBQ1Y7QUFDQSxTQUFTLEVBS0o7QUFDTCxDQUFDLG9EQUFvRDs7Ozs7Ozs7Ozs7O0FDcmVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNDO0FBRUQ7QUFDZ0I7QUFDVDtBQUNLO0FBQ0c7QUFDUDtBQUNUO0FBQ0E7QUFDaUI7QUFDVjtBQUNFO0FBQ1I7QUFDSDtBQUNFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL3NoYWRlcnMvcGFzc1Rocm91Z2guZnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9zaGFkZXJzL3Bhc3NUaHJvdWdoLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb3N0UHJvY2Vzc2luZy9zaGFkZXJzL3Bhc3NUaHJvdy52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvY29yZS9CYXNlTGF5ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2NvcmUvQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbi50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZS50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CZXppZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JsZW5kZXJDb25uZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0Vhc2luZ3MudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGF5b3V0Q29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGVycHMudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BvaW50ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1Bvc3RQcm9jZXNzaW5nL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Vbmlmb3Jtcy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvV2FpdE1hbi50cyIsIndlYnBhY2s6Ly9PUkUvLi4vLi4vbm9kZV9tb2R1bGVzL3dvbGZ5ODctZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9PUkUvZXh0ZXJuYWwgdW1kIHtcImNvbW1vbmpzXCI6XCJ0aHJlZVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZVwiLFwiYW1kXCI6XCJ0aHJlZVwiLFwicm9vdFwiOlwiVEhSRUVcIn0iLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09SRS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ0aHJlZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJPUkVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiT1JFXCJdID0gZmFjdG9yeShyb290W1wiVEhSRUVcIl0pO1xufSkodGhpcywgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdGhyZWVfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXg7XFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXgsdlV2KTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXG4gICAgdlV2ID0gdXY7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZvaWQgbWFpbigpIHtcXG4gICAgdlV2ID0gdXY7XFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1xcbn0gICBcIjsiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vdXRpbHMvVW5pZm9ybXMnO1xuaW1wb3J0IHsgUG9pbnRlckV2ZW50QXJncyB9IGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllckJpbmRQYXJhbSBleHRlbmRzIFRIUkVFLldlYkdMUmVuZGVyZXJQYXJhbWV0ZXJzIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudDtcblx0YXNwZWN0U2V0dGluZz86IEFzcGVjdFNldHRpbmc7XG5cdHdyYXBwZXJFbGVtZW50PzogSFRNTEVsZW1lbnQgfCBudWxsO1xuXHR3cmFwcGVyRWxlbWVudFJlY3Q/OiBET01SZWN0IHwgbnVsbDtcblx0cGl4ZWxSYXRpbz86IG51bWJlclxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJJbmZvIGV4dGVuZHMgTGF5ZXJCaW5kUGFyYW0ge1xuXHRzaXplOiBMYXllclNpemU7XG5cdGFzcGVjdFNldHRpbmc6IEFzcGVjdFNldHRpbmc7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllclNpemUge1xuXHRjYW52YXNBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHR3aW5kb3dTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHRjYW52YXNTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRjYW52YXNQaXhlbFNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHBpeGVsUmF0aW86IG51bWJlclxuXHRwb3J0cmFpdFdlaWdodDogbnVtYmVyO1xuXHR3aWRlV2VpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBc3BlY3RTZXR0aW5nIHtcblx0bWFpbkFzcGVjdDogbnVtYmVyO1xuXHRwb3J0cmFpdEFzcGVjdDogbnVtYmVyO1xuXHR3aWRlQXNwZWN0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUb3VjaEV2ZW50QXJncyB7XG5cdGV2ZW50OiBQb2ludGVyRXZlbnQgfCBUb3VjaEV2ZW50O1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0ZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cdHNjcmVlblBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dQb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VMYXllciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIGluZm86IExheWVySW5mbztcblxuXHRwdWJsaWMgcmVuZGVyZXI/OiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXG5cdHB1YmxpYyBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHB1YmxpYyBjYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG5cdHByb3RlY3RlZCByZWFkeUFuaW1hdGUgPSBmYWxzZTtcblx0cHVibGljIHRpbWUgPSAwO1xuXHRwdWJsaWMgY29tbW9uVW5pZm9ybXM6IFVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuaW5mbyA9IHtcblx0XHRcdG5hbWU6ICcnLFxuXHRcdFx0YXNwZWN0U2V0dGluZzoge1xuXHRcdFx0XHRtYWluQXNwZWN0OiAxNiAvIDksXG5cdFx0XHRcdHdpZGVBc3BlY3Q6IDEwIC8gMSxcblx0XHRcdFx0cG9ydHJhaXRBc3BlY3Q6IDEgLyAyLFxuXHRcdFx0fSxcblx0XHRcdHNpemU6IHtcblx0XHRcdFx0d2luZG93U2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0d2luZG93QXNwZWN0UmF0aW86IDEuMCxcblx0XHRcdFx0Y2FudmFzU2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0Y2FudmFzUGl4ZWxTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRjYW52YXNBc3BlY3RSYXRpbzogMS4wLFxuXHRcdFx0XHRwaXhlbFJhdGlvOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcblx0XHRcdFx0cG9ydHJhaXRXZWlnaHQ6IDAuMCxcblx0XHRcdFx0d2lkZVdlaWdodDogMC4wXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuY29tbW9uVW5pZm9ybXMgPSB7XG5cdFx0XHR0aW1lOiB7XG5cdFx0XHRcdHZhbHVlOiAwXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSggNTAsIDEsIDAuMSwgMTAwMCApO1xuXG5cdH1cblxuXHRwdWJsaWMgdGljayggZGVsdGFUaW1lOiBudW1iZXIgKSB7XG5cblx0XHR0aGlzLnRpbWUgKz0gZGVsdGFUaW1lO1xuXG5cdFx0dGhpcy5jb21tb25Vbmlmb3Jtcy50aW1lLnZhbHVlID0gdGhpcy50aW1lO1xuXG5cdFx0aWYgKCB0aGlzLnJlYWR5QW5pbWF0ZSApIHtcblxuXHRcdFx0dGhpcy5hbmltYXRlKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGFuaW1hdGUoIGRlbHRhVGltZTogbnVtYmVyICkgeyB9XG5cblx0cHVibGljIG9uQmluZCggbGF5ZXJJbmZvOiBMYXllckJpbmRQYXJhbSApIHtcblxuXHRcdHRoaXMuaW5mby5uYW1lID0gbGF5ZXJJbmZvLm5hbWU7XG5cdFx0dGhpcy5pbmZvLmNhbnZhcyA9IGxheWVySW5mby5jYW52YXM7XG5cblx0XHRpZiAoIGxheWVySW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5zZXRXcmFwcGVyRWxlbWVudCggbGF5ZXJJbmZvLndyYXBwZXJFbGVtZW50IHx8IG51bGwsIGZhbHNlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLmluZm8uYXNwZWN0U2V0dGluZyA9IGxheWVySW5mby5hc3BlY3RTZXR0aW5nIHx8IHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nO1xuXHRcdHRoaXMuaW5mby5hbHBoYSA9IGxheWVySW5mby5hbHBoYTtcblx0XHR0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvID0gbGF5ZXJJbmZvLnBpeGVsUmF0aW8gfHwgdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbztcblxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciggdGhpcy5pbmZvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyA9IHRydWU7XG5cblx0XHR0aGlzLmluZm8uY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHR0aGlzLm9uUmVzaXplKCk7XG5cdFx0XHR0aGlzLnJlYWR5QW5pbWF0ZSA9IHRydWU7XG5cblx0XHR9LCAwICk7XG5cblx0fVxuXG5cdHB1YmxpYyBvblVuYmluZCgpIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ2Rpc3Bvc2UnXG5cdFx0fSApO1xuXG5cdFx0dGhpcy5yZW1vdmVDaGlsZHJlbnMoIHRoaXMuc2NlbmUgKTtcblxuXHRcdHRoaXMucmVhZHlBbmltYXRlID0gZmFsc2U7XG5cblx0fVxuXG5cdHByb3RlY3RlZCByZW1vdmVDaGlsZHJlbnMoIG9iamVjdDogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHRjb25zdCBsZW5ndGggPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoO1xuXG5cdFx0Zm9yICggbGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdHRoaXMucmVtb3ZlQ2hpbGRyZW5zKCBvYmplY3QuY2hpbGRyZW5bIGkgXSApO1xuXG5cdFx0XHRsZXQgZ2VvOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCBtYXQ6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLmlzTWVzaCApIHtcblxuXHRcdFx0XHRnZW8gPSAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5nZW9tZXRyeTtcblx0XHRcdFx0bWF0ID0gKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdG9iamVjdC5yZW1vdmUoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gKSApO1xuXG5cdFx0XHRpZiAoIGdlbyApIHtcblxuXHRcdFx0XHRnZW8uZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggbWF0ICkge1xuXG5cdFx0XHRcdG1hdC5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFdyYXBwZXJFbGVtZW50KCB3cmFwcGVyRWxtOiBIVE1MRWxlbWVudCB8IG51bGwsIGRpc3BhdGNoUmVzaXplOiBib29sZWFuID0gdHJ1ZSApIHtcblxuXHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCA9IHdyYXBwZXJFbG07XG5cdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHdyYXBwZXJFbG0gPyB3cmFwcGVyRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogbnVsbDtcblxuXHRcdGlmICggZGlzcGF0Y2hSZXNpemUgKSB7XG5cblx0XHRcdHRoaXMub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIG9uUmVzaXplKCkge1xuXG5cdFx0aWYgKCB0aGlzLnJlbmRlcmVyID09IG51bGwgKSByZXR1cm47XG5cblx0XHRjb25zdCBuZXdXaW5kb3dTaXplID0gbmV3IFRIUkVFLlZlY3RvcjIoIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRcdGNvbnN0IG5ld0NhbnZhc1NpemUgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuc2V0KCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5jbGllbnRIZWlnaHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuY29weSggbmV3V2luZG93U2l6ZSApO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHBvcnRyYWl0V2VpZ2h0ID0gMS4wIC0gKCAoIG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueSApIC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcucG9ydHJhaXRBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLnBvcnRyYWl0QXNwZWN0ICk7XG5cdFx0cG9ydHJhaXRXZWlnaHQgPSBNYXRoLm1pbiggMS4wLCBNYXRoLm1heCggMC4wLCBwb3J0cmFpdFdlaWdodCApICk7XG5cblx0XHRsZXQgd2lkZVdlaWdodCA9IDEuMCAtICggKCBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnkgKSAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKTtcblx0XHR3aWRlV2VpZ2h0ID0gTWF0aC5taW4oIDEuMCwgTWF0aC5tYXgoIDAuMCwgd2lkZVdlaWdodCApICk7XG5cblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dTaXplLmNvcHkoIG5ld1dpbmRvd1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dBc3BlY3RSYXRpbyA9IG5ld1dpbmRvd1NpemUueCAvIG5ld1dpbmRvd1NpemUueTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLmNvcHkoIG5ld0NhbnZhc1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNQaXhlbFNpemUuY29weSggbmV3Q2FudmFzU2l6ZS5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKSApICk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzQXNwZWN0UmF0aW8gPSBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnk7XG5cdFx0dGhpcy5pbmZvLnNpemUucG9ydHJhaXRXZWlnaHQgPSBwb3J0cmFpdFdlaWdodDtcblx0XHR0aGlzLmluZm8uc2l6ZS53aWRlV2VpZ2h0ID0gd2lkZVdlaWdodDtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS54LCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLnkgKTtcblx0XHR0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmluZm8uc2l6ZS5jYW52YXNBc3BlY3RSYXRpbztcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHBvaW50ZXJFdmVudCggZTogUG9pbnRlckV2ZW50QXJncyApIHtcblxuXHRcdGNvbnN0IGNhbnZhc1BvaW50ZXJQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdGNhbnZhc1BvaW50ZXJQb3MuY29weSggZS5wb3NpdGlvbiApO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8uY2FudmFzICkge1xuXG5cdFx0XHRjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5pbmZvLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNhbnZhc1BvaW50ZXJQb3Muc3ViKCBuZXcgVEhSRUUuVmVjdG9yMiggY2FudmFzUmVjdC54LCBjYW52YXNSZWN0LnkgKSApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSBjYW52YXNQb2ludGVyUG9zLmNsb25lKCk7XG5cdFx0c2NyZWVuUG9zaXRpb24uZGl2aWRlKCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplICk7XG5cdFx0c2NyZWVuUG9zaXRpb24ueSA9IDEuMCAtIHNjcmVlblBvc2l0aW9uLnk7XG5cdFx0c2NyZWVuUG9zaXRpb24ubXVsdGlwbHlTY2FsYXIoIDIuMCApLnN1YlNjYWxhciggMS4wICk7XG5cblxuXHRcdGNvbnN0IGFyZ3M6IFRvdWNoRXZlbnRBcmdzID0ge1xuXHRcdFx0ZXZlbnQ6IGUucG9pbnRlckV2ZW50LFxuXHRcdFx0cG9zaXRpb246IGNhbnZhc1BvaW50ZXJQb3MuY2xvbmUoKSxcblx0XHRcdGRlbHRhOiBlLmRlbHRhLmNsb25lKCksXG5cdFx0XHRzY3JlZW5Qb3NpdGlvbjogc2NyZWVuUG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdHdpbmRvd1Bvc2l0aW9uOiBlLnBvc2l0aW9uLmNsb25lKClcblx0XHR9O1xuXG5cdFx0aWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ2hvdmVyJyApIHtcblxuXHRcdFx0dGhpcy5vbkhvdmVyKCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ3N0YXJ0JyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoU3RhcnQoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnbW92ZScgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaE1vdmUoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnZW5kJyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoRW5kKCBhcmdzICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBvblRvdWNoU3RhcnQoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uVG91Y2hNb3ZlKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvblRvdWNoRW5kKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbkhvdmVyKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbldoZWVsKCBldmVudDogV2hlZWxFdmVudCwgdHJhY2twYWREZWx0YTogbnVtYmVyICkgeyB9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFBvaW50ZXIgfSBmcm9tICcuLi91dGlscy9Qb2ludGVyJztcbmltcG9ydCB7IEJhc2VMYXllciwgTGF5ZXJCaW5kUGFyYW0gfSBmcm9tICcuL0Jhc2VMYXllcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQb2ludGVyRXZlbnRBcmdzIHtcblx0cG9pbnRlckV2ZW50OiBQb2ludGVyRXZlbnQ7XG5cdHBvaW50ZXJFdmVudFR5cGU6IHN0cmluZztcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQ29udHJvbGxlclBhcmFtIHtcblx0c2lsZW50PzogYm9vbGVhbjtcblx0cG9pbnRlckV2ZW50RWxlbWVudD86IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIHBvaW50ZXI6IFBvaW50ZXI7XG5cdHB1YmxpYyBjbG9jazogVEhSRUUuQ2xvY2s7XG5cblx0cHJvdGVjdGVkIGxheWVyczogQmFzZUxheWVyW10gPSBbXTtcblx0cHJvdGVjdGVkIHBvaW50ZXJFdmVudEVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggcGFyYW1ldGVyPzogQ29udHJvbGxlclBhcmFtICkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdGlmICggISAoIHBhcmFtZXRlciAmJiBwYXJhbWV0ZXIuc2lsZW50ICkgKSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCBcIiVjLSBvcmUtdGhyZWUgXCIgKyByZXF1aXJlKCBcIi4uLy4uL3BhY2thZ2UuanNvblwiICkudmVyc2lvbiArIFwiIC1cIiAsICdwYWRkaW5nOiA1cHggMTBweCA7YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IGNvbG9yOiB3aGl0ZTtmb250LXNpemU6MTFweCcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0UG9pbnRlclxuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5wb2ludGVyID0gbmV3IFBvaW50ZXIoKTtcblx0XHR0aGlzLnNldFBvaW50ZXJFdmVudEVsZW1lbnQoICggcGFyYW1ldGVyICYmIHBhcmFtZXRlci5wb2ludGVyRXZlbnRFbGVtZW50ICkgfHwgZG9jdW1lbnQuYm9keSApO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRFdmVudHNcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBwb2ludGVyVXBkYXRlID0gdGhpcy5wb2ludGVyRXZlbnQuYmluZCggdGhpcyApO1xuXHRcdGxldCBwb2ludGVyV2hlZWwgPSB0aGlzLm9uV2hlZWwuYmluZCggdGhpcyApO1xuXHRcdGxldCBvcmllbnRhdGlvbmNoYW5nZSA9IHRoaXMub25PcmllbnRhdGlvbkRldmljZS5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IHdpbmRvd1Jlc2l6ZSA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApO1xuXG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd1cGRhdGUnLCBwb2ludGVyVXBkYXRlICk7XG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd3aGVlbCcsIHBvaW50ZXJXaGVlbCApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgd2luZG93UmVzaXplICk7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdkaXNwb3NlJywgKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VwZGF0ZScsIHBvaW50ZXJVcGRhdGUgKTtcblx0XHRcdHRoaXMucG9pbnRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBwb2ludGVyV2hlZWwgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB3aW5kb3dSZXNpemUgKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMudGljaygpO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdGljaygpIHtcblxuXHRcdGNvbnN0IGRlbHRhVGltZSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcblxuXHRcdHRoaXMucG9pbnRlci51cGRhdGUoKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS50aWNrKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy50aWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25XaW5kb3dSZXNpemUoKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uT3JpZW50YXRpb25EZXZpY2UoKSB7XG5cblx0XHR0aGlzLm9uV2luZG93UmVzaXplKCk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBwb2ludGVyRXZlbnQoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLnBvaW50ZXJFdmVudCggZSBhcyB1bmtub3duIGFzIFBvaW50ZXJFdmVudEFyZ3MgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uV2hlZWwoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLm9uV2hlZWwoIGUud2hlZWxFdmVudCwgZS50cmFja3BhZERlbHRhICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFQSVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgYWRkTGF5ZXIoIGxheWVyOiBCYXNlTGF5ZXIsIGxheWVySW5mbzogTGF5ZXJCaW5kUGFyYW0gKSB7XG5cblx0XHR3aGlsZSAoIHRoaXMuZ2V0TGF5ZXIoIGxheWVySW5mby5uYW1lICkgKSB7XG5cblx0XHRcdGxheWVySW5mby5uYW1lICs9ICdfJztcblxuXHRcdH1cblxuXHRcdHRoaXMubGF5ZXJzLnB1c2goIGxheWVyICk7XG5cblx0XHRsYXllci5vbkJpbmQoIGxheWVySW5mbyApO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0TGF5ZXIoIGxheWVyTmFtZTogc3RyaW5nICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIHRoaXMubGF5ZXJzWyBpIF0uaW5mby5uYW1lID09IGxheWVyTmFtZSApIHJldHVybiB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0fVxuXG5cdHB1YmxpYyByZW1vdmVMYXllciggbGF5ZXJObWFlOiBzdHJpbmcgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IHRoaXMubGF5ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0Y29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0XHRpZiAoIGxheWVyLmluZm8ubmFtZSA9PSBsYXllck5tYWUgKSB7XG5cblx0XHRcdFx0bGF5ZXIub25VbmJpbmQoKTtcblxuXHRcdFx0XHR0aGlzLmxheWVycy5zcGxpY2UoIGksIDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0UG9pbnRlckV2ZW50RWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGlmICggdGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIudW5yZWdpc3RlckVsZW1lbnQoIHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5wb2ludGVyLnJlZ2lzdGVyRWxlbWVudCggZWxtICk7XG5cblx0XHR0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgPSBlbG07XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xuXG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCggaXRlbSA9PiB7XG5cblx0XHRcdHRoaXMucmVtb3ZlTGF5ZXIoIGl0ZW0uaW5mby5uYW1lICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLnRpY2sgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH07XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc3Bvc2UnIH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5pbXBvcnQgeyBGQ3VydmVHcm91cCB9IGZyb20gJy4vRkN1cnZlR3JvdXAnO1xyXG5cclxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uRnJhbWVJbmZvID0ge1xyXG5cdHN0YXJ0OiBudW1iZXJcclxuXHRlbmQ6IG51bWJlclxyXG5cdGR1cmF0aW9uOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkFjdGlvbiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlczoge1trZXk6c3RyaW5nXTpGQ3VydmVHcm91cH0gPSB7fTtcclxuXHRwcml2YXRlIHVuaWZvcm1zOiBVbmlmb3JtcztcclxuXHRcclxuXHRwdWJsaWMgZnJhbWU6IEFuaW1hdGlvbkZyYW1lSW5mbztcclxuXHJcblx0Y29uc3RydWN0b3IoIG5hbWU/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xyXG5cdFx0dGhpcy51bmlmb3JtcyA9IHt9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWUgPSB7XHJcblx0XHRcdHN0YXJ0OiAwLFxyXG5cdFx0XHRlbmQ6IDAsXHJcblx0XHRcdGR1cmF0aW9uOiAwLFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkRmN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmY3VydmVHcm91cDogRkN1cnZlR3JvdXAgKSB7XHJcblxyXG5cdFx0dGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdID0gZmN1cnZlR3JvdXA7XHJcblxyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVtb3ZlRkN1cnZlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY2FsY0ZyYW1lKCkge1xyXG5cclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZXMgKVxyXG5cclxuXHRcdGxldCBtaW5TdGFydCA9IEluZmluaXR5XHJcblx0XHRsZXQgbWF4RW5kID0gLUluZmluaXR5XHJcblx0XHRcclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZSA9ICh0aGlzLmN1cnZlcylbIGN1cnZlS2V5c1sgaSBdIF07XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVTdGFydCA8IG1pblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHRtaW5TdGFydCA9IGN1cnZlLmZyYW1lU3RhcnQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZUVuZCA+IG1heEVuZCApIHtcclxuXHJcblx0XHRcdFx0bWF4RW5kID0gY3VydmUuZnJhbWVFbmQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIG1pblN0YXJ0ID09IC1JbmZpbml0eSB8fCBtYXhFbmQgPT0gSW5maW5pdHkpIHtcclxuXHJcblx0XHRcdG1pblN0YXJ0ID0gMDtcclxuXHRcdFx0bWF4RW5kID0gMVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZyYW1lLnN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lLmVuZCA9IG1heEVuZDtcclxuXHRcdHRoaXMuZnJhbWUuZHVyYXRpb24gPSB0aGlzLmZyYW1lLmVuZCAtIHRoaXMuZnJhbWUuc3RhcnQ7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBGQ3VydmVHcm91cCB8IG51bGwge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF0gfHwgbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGdldCB2YWx1ZXNcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGFzc2lnblVuaWZvcm1zKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdW5pZm9ybTogVEhSRUUuSVVuaWZvcm0gKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmlmb3JtO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRVbmlmb3JtczxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVEhSRUUuSVVuaWZvcm08VD4gfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdICkge1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IGN1cnZlR3JvdXAgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKHByb3BlcnR5TmFtZSlcclxuXHJcblx0XHRpZiggY3VydmVHcm91cCApIHtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB1bmkgPSB7XHJcblx0XHRcdFx0dmFsdWU6IGN1cnZlR3JvdXAuY3JlYXRlSW5pdFZhbHVlKCkgYXMgVFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdW5pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVCB8IG51bGw7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciA+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0OiBUICk6IFQ7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgdW5pZm9ybSA9IHRoaXMuZ2V0VW5pZm9ybXMocHJvcGVydHlOYW1lKTtcclxuXHJcblx0XHRpZiggIXVuaWZvcm0gKSByZXR1cm4gdGFyZ2V0IHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHZhbHVlID0gdW5pZm9ybS52YWx1ZTtcclxuXHRcdFxyXG5cdFx0aWYoICF0YXJnZXQgKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0aWYoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdHRhcmdldC54ID0gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXQueCA9IHZhbHVlLng7XHJcblx0XHR0YXJnZXQueSA9IHZhbHVlLnk7XHJcblxyXG5cdFx0aWYoICd6JyBpbiB0YXJnZXQgJiYgJ3onIGluIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LnogPSB2YWx1ZS56XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCAndycgaW4gdGFyZ2V0ICYmICd3JyBpbiB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRhcmdldC53ID0gdmFsdWUud1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRhcmdldCB8fCBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0PFQgZXh0ZW5kcyBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciApOiBUIHwgbnVsbDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWVBdDxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIsIHRhcmdldDogVCApOiBUO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciwgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgY3VydmUgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWUgKTtcclxuXHJcblx0XHRpZiggdGFyZ2V0ICkgIHtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSByZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGN1cnZlLmdldFZhbHVlKCBmcmFtZSB8fCAwLCB0YXJnZXQgKVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgcmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiBjdXJ2ZS5nZXRWYWx1ZSggZnJhbWUgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRVcGRhdGVGcmFtZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cdFxyXG5cdHB1YmxpYyB1cGRhdGVGcmFtZSggZnJhbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cCA9IHRoaXMuY3VydmVzWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cdFx0XHRsZXQgdW5pID0gdGhpcy5nZXRVbmlmb3JtcyggY3VydmVLZXlzWyBpIF0gKTtcclxuXHJcblx0XHRcdGlmKCAhdW5pICkgY29udGludWU7XHJcblxyXG5cdFx0XHRpZiggdHlwZW9mIHVuaS52YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdFx0dW5pLnZhbHVlID0gZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUpIHx8IDBcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0ZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUsIHVuaS52YWx1ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlJywgW3RoaXNdICk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEZDdXJ2ZUtleUZyYW1lIH0gZnJvbSAnLi9GQ3VydmVLZXlGcmFtZSc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMga2V5ZnJhbWVzOiBGQ3VydmVLZXlGcmFtZVtdID0gW107XHJcblxyXG5cdHByaXZhdGUgY2FjaGU6IHsgZnJhbWU6IG51bWJlciwgdmFsdWU6IG51bWJlciB9ID0geyBmcmFtZTogTmFOLCB2YWx1ZTogTmFOIH07XHJcblxyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRHVyYXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXQoIGZyYW1lcyApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0aWYgKCBmcmFtZXMgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmtleWZyYW1lcy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdFx0ZnJhbWVzLmZvckVhY2goIGtleWZyYW1lID0+IHtcclxuXHJcblx0XHRcdFx0dGhpcy5hZGRLZXlGcmFtZSgga2V5ZnJhbWUgKTtcclxuXHJcblx0XHRcdH0gKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZEtleUZyYW1lKCBrZXlmcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0bGV0IGluZGV4ID0gMDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmtleWZyYW1lcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgZnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSBdO1xyXG5cclxuXHRcdFx0aWYgKCBmcmFtZS5jb29yZGluYXRlLnggPCBrZXlmcmFtZS5jb29yZGluYXRlLnggKSB7XHJcblxyXG5cdFx0XHRcdGluZGV4ICsrO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMua2V5ZnJhbWVzLnNwbGljZSggaW5kZXgsIDAsIGtleWZyYW1lICk7XHJcblxyXG5cdFx0Ly8gc2V0IGZyYW1lIGluZm9cclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gdGhpcy5rZXlmcmFtZXNbMF0uY29vcmRpbmF0ZS54XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gdGhpcy5rZXlmcmFtZXNbdGhpcy5rZXlmcmFtZXMubGVuZ3RoIC0gMV0uY29vcmRpbmF0ZS54XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggZnJhbWUgPT0gdGhpcy5jYWNoZS5mcmFtZSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLnZhbHVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMua2V5ZnJhbWVzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBrZXlmcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIF07XHJcblxyXG5cdFx0XHRpZiAoIGZyYW1lIDw9IGtleWZyYW1lLmNvb3JkaW5hdGUueCApIHtcclxuXHJcblx0XHRcdFx0bGV0IGJlZm9yZUtleUZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgLSAxIF07XHJcblxyXG5cdFx0XHRcdGlmICggYmVmb3JlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBiZWZvcmVLZXlGcmFtZS50bygga2V5ZnJhbWUsIGZyYW1lICk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBrZXlmcmFtZS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgPT09IG51bGwgJiYgdGhpcy5rZXlmcmFtZXMubGVuZ3RoID4gMCApIHtcclxuXHJcblx0XHRcdHZhbHVlID0gdGhpcy5rZXlmcmFtZXNbIHRoaXMua2V5ZnJhbWVzLmxlbmd0aCAtIDEgXS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhY2hlID0ge1xyXG5cdFx0XHRcdGZyYW1lOiBmcmFtZSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRkN1cnZlLCBGQ3VydmVBeGlzIH0gZnJvbSAnLi9GQ3VydmUnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlR3JvdXBUeXBlID0gJ3NjYWxhcicgfCAndmVjMicgfCAndmVjMycgfCAndmVjNCdcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmVHcm91cCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlOiB7W2F4aXMgaW4gRkN1cnZlQXhpc106IEZDdXJ2ZSB8IG51bGx9O1xyXG5cdHB1YmxpYyB0eXBlOiBGQ3VydmVHcm91cFR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVEdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggbmFtZT86IHN0cmluZywgeD86IEZDdXJ2ZSwgeT86IEZDdXJ2ZSwgej86IEZDdXJ2ZSwgdz86IEZDdXJ2ZSwgc2NhbGFyPzogRkN1cnZlICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gbmFtZSB8fCAnJztcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jdXJ2ZSA9IHtcclxuXHRcdFx0eDogbnVsbCxcclxuXHRcdFx0eTogbnVsbCxcclxuXHRcdFx0ejogbnVsbCxcclxuXHRcdFx0dzogbnVsbCxcclxuXHRcdFx0c2NhbGFyOiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmKCB4ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHgsICd4JyApXHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiggeSApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB5LCAneScgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIHogKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeiwgJ3onIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIHcgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggdywgJ3cnIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEZDdXJ2ZSggY3VydmU6IEZDdXJ2ZSwgYXhpczogRkN1cnZlQXhpcyApIHtcclxuXHJcblx0XHR0aGlzLmN1cnZlWyBheGlzIF0gPSBjdXJ2ZTtcclxuXHJcblx0XHR0aGlzLmNhbGNUeXBlKCk7XHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYWxjVHlwZSgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY3VydmUuc2NhbGFyICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5jdXJ2ZS53ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzQnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueiApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWMzJztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjMic7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS54ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBjYWxjRnJhbWUoKSB7XHJcblx0XHRcclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZSApXHJcblxyXG5cdFx0bGV0IG1pblN0YXJ0ID0gSW5maW5pdHlcclxuXHRcdGxldCBtYXhFbmQgPSAtSW5maW5pdHlcclxuXHRcdFxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlID0gKHRoaXMuY3VydmUgYXMge1trZXk6IHN0cmluZ106IEZDdXJ2ZX0pWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lU3RhcnQgPCBtaW5TdGFydCApIHtcclxuXHJcblx0XHRcdFx0bWluU3RhcnQgPSBjdXJ2ZS5mcmFtZVN0YXJ0O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVFbmQgPiBtYXhFbmQgKSB7XHJcblxyXG5cdFx0XHRcdG1heEVuZCA9IGN1cnZlLmZyYW1lRW5kO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBtaW5TdGFydCA9PSAtSW5maW5pdHkgfHwgbWF4RW5kID09IEluZmluaXR5KSB7XHJcblxyXG5cdFx0XHRtaW5TdGFydCA9IDA7XHJcblx0XHRcdG1heEVuZCA9IDFcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gbWF4RW5kO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gdGhpcy5mcmFtZUVuZCAtIHRoaXMuZnJhbWVTdGFydDtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY3JlYXRlSW5pdFZhbHVlKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy50eXBlID09ICd2ZWMyJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMigpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PSAndmVjMycgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzQnICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3I0KCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ6IFQgKTogVDtcclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICk6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ/OiBUKTogVCB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGlmKCB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnggPSB0aGlzLmN1cnZlLnguZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueSApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnkgPSB0aGlzLmN1cnZlLnkuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueiAmJiAneicgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueiA9IHRoaXMuY3VydmUuei5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS53ICAmJiAndycgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQudyA9IHRoaXMuY3VydmUudy5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS5zY2FsYXIgKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiAgdGhpcy5jdXJ2ZS5zY2FsYXIuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYywgRWFzaW5ncyB9IGZyb20gJy4uL0Vhc2luZ3MnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlSW50ZXJwb2xhdGlvbiA9IFwiQkVaSUVSXCIgfCBcIkxJTkVBUlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZUtleUZyYW1lIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaGFuZGxlTGVmdDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBoYW5kbGVSaWdodDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBpbnRlcnBvbGF0aW9uOiBGQ3VydmVJbnRlcnBvbGF0aW9uID0gJ0JFWklFUic7XHJcblxyXG5cdHByaXZhdGUgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCA9IG51bGw7XHJcblx0cHJpdmF0ZSBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBjb29yZGluYXRlOiBUSFJFRS5WZWMyLCBoYW5kbGVMZWZ0PzogVEhSRUUuVmVjMiwgaGFuZGxlUmlnaHQ/OiBUSFJFRS5WZWMyLCBpbnRlcnBvbGF0aW9uPzogRkN1cnZlSW50ZXJwb2xhdGlvbiApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuc2V0KCBjb29yZGluYXRlLCBoYW5kbGVMZWZ0LCBoYW5kbGVSaWdodCwgaW50ZXJwb2xhdGlvbiApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIsIGhhbmRsZUxlZnQ/OiBUSFJFRS5WZWMyLCBoYW5kbGVSaWdodD86IFRIUkVFLlZlYzIsIGludGVycG9sYXRpb24/OiBGQ3VydmVJbnRlcnBvbGF0aW9uICkge1xyXG5cclxuXHRcdHRoaXMuY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZUxlZnQgPSBoYW5kbGVMZWZ0IHx8IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZVJpZ2h0ID0gaGFuZGxlUmlnaHQgfHwgY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaW50ZXJwb2xhdGlvbiA9IGludGVycG9sYXRpb24gfHwgJ0JFWklFUic7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRFYXNpbmcoIGludGVycG9sYXRpb246IEZDdXJ2ZUludGVycG9sYXRpb24sIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0aWYgKCBpbnRlcnBvbGF0aW9uID09ICdCRVpJRVInICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIEVhc2luZ3MuYmV6aWVyKCB0aGlzLmNvb3JkaW5hdGUsIHRoaXMuaGFuZGxlUmlnaHQsIG5leHRGcmFtZS5oYW5kbGVMZWZ0LCBuZXh0RnJhbWUuY29vcmRpbmF0ZSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCB0OiBudW1iZXIgKSA9PiB7XHJcblxyXG5cdFx0XHRcdGxldCBkID0gKCBuZXh0RnJhbWUuY29vcmRpbmF0ZS55IC0gdGhpcy5jb29yZGluYXRlLnkgKTtcclxuXHRcdFx0XHR0ID0gKCB0IC0gdGhpcy5jb29yZGluYXRlLnggKSAvICggbmV4dEZyYW1lLmNvb3JkaW5hdGUueCAtIHRoaXMuY29vcmRpbmF0ZS54ICk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGUueSArIHQgKiBkO1xyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHRvKCBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lLCB0OiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm5leHRGcmFtZSA9PSBudWxsIHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueCAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS54IHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueSAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS55ICkge1xyXG5cclxuXHRcdFx0dGhpcy5lYXNpbmcgPSB0aGlzLmdldEVhc2luZyggdGhpcy5pbnRlcnBvbGF0aW9uLCBuZXh0RnJhbWUgKTtcclxuXHRcdFx0dGhpcy5uZXh0RnJhbWUgPSBuZXh0RnJhbWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5lYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5lYXNpbmcoIHQgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHRocmVhZElkIH0gZnJvbSAnd29ya2VyX3RocmVhZHMnO1xuaW1wb3J0IHsgRWFzaW5ncywgRWFzaW5nRnVuYyB9IGZyb20gXCIuL0Vhc2luZ3NcIjtcbmltcG9ydCB7IExlcnBGdW5jLCBMZXJwcyB9IGZyb20gXCIuL0xlcnBzXCI7XG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gXCIuL1VuaWZvcm1zXCI7XG5cbmV4cG9ydCB0eXBlIEFuaW1hdG9yVmFyaWFibGVUeXBlID0gbnVtYmVyIHwgbnVtYmVyW10gfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5RdWF0ZXJuaW9uIHwgVEhSRUUuRXVsZXJcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdG9yVmFyaWFibGU8VD57XG5cdHRpbWU6IG51bWJlcjtcblx0ZHVyYXRpb24/OiBudW1iZXI7XG5cdHZhbHVlOiBUO1xuXHRzdGFydFZhbHVlOiBUO1xuXHRnb2FsVmFsdWU6IFQ7XG5cdG9uQW5pbWF0aW9uRmluaXNoZWQ/OiBGdW5jdGlvbiB8IG51bGw7XG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdGVhc2luZzogRWFzaW5nRnVuYztcblx0dXNlckRhdGE/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+IHtcblx0bmFtZTogc3RyaW5nO1xuXHRpbml0VmFsdWU6IFQ7XG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XG5cdGN1c3RvbUxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdHVzZXJEYXRhPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0b3IgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBkYXRhQmFzZToge1sga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZVR5cGUgfTtcblx0cHVibGljIGlzQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbIGtleTogc3RyaW5nIF06IEFuaW1hdG9yVmFyaWFibGU8QW5pbWF0b3JWYXJpYWJsZVR5cGU+IH07XG5cdHByb3RlY3RlZCBhbmltYXRpbmdDb3VudDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGRpc3BhdGNoRXZlbnRzOiBGdW5jdGlvbltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy52YXJpYWJsZXMgPSB7fTtcblx0XHR0aGlzLmRhdGFCYXNlID0ge307XG5cblx0fVxuXG5cdHB1YmxpYyBhZGQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggcGFyYW1zOiBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+ICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlOiBBbmltYXRvclZhcmlhYmxlPFQ+ID0ge1xuXHRcdFx0dGltZTogLSAxLFxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0c3RhcnRWYWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRnb2FsVmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0ZWFzaW5nOiBwYXJhbXMuZWFzaW5nIHx8IEVhc2luZ3Muc2lnbW9pZCgpLFxuXHRcdFx0bGVycEZ1bmM6ICggcGFyYW1zLmN1c3RvbUxlcnBGdW5jIHx8IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMuaW5pdFZhbHVlICkgKSBhcyBMZXJwRnVuYzxUPixcblx0XHRcdHVzZXJEYXRhOiBwYXJhbXMudXNlckRhdGEsXG5cdFx0fTtcblxuXHRcdHRoaXMuZGF0YUJhc2VbIHBhcmFtcy5uYW1lIF0gPSB2YXJpYWJsZS52YWx1ZTtcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHZhcmlhYmxlIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxBbmltYXRvclZhcmlhYmxlVHlwZT47XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoe1xuXHRcdFx0dHlwZTogJ2FkZGVkJyxcblx0XHRcdHZhck5hbWU6IHBhcmFtcy5uYW1lLFxuXHRcdFx0dmFyaWFibGUsXG5cdFx0fSlcblxuXHRcdHJldHVybiB2YXJpYWJsZTtcblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0U2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBzZXRFYXNpbmcoIG5hbWU6IHN0cmluZywgZWFzaW5nOiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLmVhc2luZyA9IGVhc2luZztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRWYWx1ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBUICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5kYXRhQmFzZVsgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZVR5cGU7XG5cblx0XHRpZiAoIHZhcmlhYmxlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIHZhcmlhYmxlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRcdHRoaXMuZGF0YUJhc2VbIG5hbWUgXSA9IHZhbHVlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBcImNvcHlcIiBpbiB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR2YXJpYWJsZS5jb3B5KCB2YWx1ZSBhcyBhbnkgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggdmFyaWFibGUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0XHQoIHZhcmlhYmxlIGFzIG51bWJlciBbXSApID0gKCB2YWx1ZSBhcyBudW1iZXJbXSApLmNvbmNhdCgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoIG5hbWUgKTtcblx0XHRcdHRoaXMuY2FuY2VsQW5pbWF0ZSggbmFtZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFuaW1hdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFuaW1hdGU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nLCBnb2FsVmFsdWU6IFQsIGR1cmF0aW9uOiBudW1iZXIgPSAxLCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBlYXNpbmc/OiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHRpZiAoIGR1cmF0aW9uIDw9IDAgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFZhbHVlKCBuYW1lLCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAxLjA7XG5cdFx0XHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdmFyaWFibGUudGltZSA9PSAtIDEgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50ICsrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXJpYWJsZS50aW1lID0gMDtcblx0XHRcdFx0dmFyaWFibGUuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0dmFyaWFibGUuc3RhcnRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVDbG9uZSggdmFyaWFibGUudmFsdWUgKTtcblx0XHRcdFx0dmFyaWFibGUuZ29hbFZhbHVlID0gdGhpcy5nZXRWYWx1ZUNsb25lKCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRyZXNvbHZlKCBudWxsICk7XG5cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIGVhc2luZyApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0RWFzaW5nKCBuYW1lLCBlYXNpbmcgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cblx0fVxuXG5cdHB1YmxpYyBjYW5jZWxBbmltYXRlKCBuYW1lOiBzdHJpbmcgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSBudWxsO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0R2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWUgYXMgdW5rbm93biBhcyBUO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIG11dGU6IGJvb2xlYW4gPSBmYWxzZSApOiBBbmltYXRvclZhcmlhYmxlPFQ+IHwgbnVsbCB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxUPjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFV0aWxzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBhcHBseVRvVW5pZm9ybXMoIHVuaWZvcm1zOiBVbmlmb3JtcyApIHtcblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5nZXRWYXJpYWJsZU9iamVjdCgga2V5c1sgaSBdICk7XG5cblx0XHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdFx0dW5pZm9ybXNbIGtleXNbIGkgXSBdID0gdmFyaWFibGU7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGlzQW5pbWF0aW5nVmFyaWFibGUoIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICkge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRsZXQgdGltZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF0udGltZTtcblxuXHRcdFx0cmV0dXJuIHRpbWUgIT0gLSAxLjA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoICEgbXV0ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVdGlsc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcml2YXRlIGdldFZhbHVlQ2xvbmU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggdmFsdWU6IFQgKTogVCB7XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXG5cdFx0fSBlbHNlIGlmICggJ2Nsb25lJyBpbiB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlLmNsb25lKCkgYXMgVDtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cblx0XHRcdHJldHVybiB2YWx1ZS5jb25jYXQoKSBhcyBUO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXG5cdH1cblxuXHRwdWJsaWMgd2FpdCggdDogbnVtYmVyICkge1xuXG5cdFx0bGV0IHBybSA9IG5ldyBQcm9taXNlPHZvaWQ+KCAoIHIgKSA9PntcblxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHRcdHIoKTtcblxuXHRcdFx0fSwgKCB0ICogMTAwMCApICk7XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJtO1xuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVcGRhdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIHVwZGF0ZSggZGVsdGFUaW1lPzogbnVtYmVyICkge1xuXG5cdFx0aWYgKCB0aGlzLmFuaW1hdGluZ0NvdW50ID09IDAgKSB7XG5cblx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuXHRcdH1cblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlTmFtZSA9IGtleXNbIGkgXTtcblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyB2YXJpYWJsZU5hbWUgXTtcblx0XHRcdGxldCB0aW1lID0gdmFyaWFibGUudGltZTtcblxuXHRcdFx0aWYgKCB0aW1lID09IDEuMCApIHtcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50IC0tO1xuXHRcdFx0XHR0aW1lID0gLSAxO1xuXG5cdFx0XHRcdGlmICggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudHMucHVzaCggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRpbWUgPj0gMC4wICYmIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0bGV0IGR1cmF0aW9uID0gdmFyaWFibGUuZHVyYXRpb247XG5cdFx0XHRcdGxldCBlYXNpbmcgPSB2YXJpYWJsZS5lYXNpbmc7XG5cdFx0XHRcdGxldCBsZXJwRnVuYyA9IHZhcmlhYmxlLmxlcnBGdW5jO1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gKSB7XG5cblx0XHRcdFx0XHR0aW1lICs9ICggZGVsdGFUaW1lIHx8IDAuMDE2ICkgLyBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmICggZHVyYXRpb24gPT0gMCB8fCB0aW1lID49IDEuMCApIHtcblxuXHRcdFx0XHRcdFx0dGltZSA9IDEuMDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHZhbHVlOiBBbmltYXRvclZhcmlhYmxlVHlwZSA9IHZhcmlhYmxlLmdvYWxWYWx1ZTtcblxuXHRcdFx0XHRpZiAoIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGxlcnBGdW5jICkge1xuXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGxlcnBGdW5jKCB2YXJpYWJsZS5zdGFydFZhbHVlLCB2YXJpYWJsZS5nb2FsVmFsdWUsIGVhc2luZyggdGltZSApICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBkYXRhQmFzZVZhbHVlID0gdGhpcy5kYXRhQmFzZVsgdmFyaWFibGVOYW1lIF07XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YUJhc2VWYWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGF0YUJhc2VbIHZhcmlhYmxlTmFtZSBdID0gdmFsdWU7XG5cblx0XHRcdFx0fSBlbHNlIGlmICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0XHRkYXRhQmFzZVZhbHVlLmNvcHkoIHZhbHVlIGFzIGFueSApO1xuXG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHRcdHR5cGU6ICd1cGRhdGUvJyArIGtleXNbIGkgXSxcblx0XHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFyaWFibGUudmFsdWVcblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhcmlhYmxlLnRpbWUgPSB0aW1lO1xuXG5cdFx0fVxuXG5cdFx0d2hpbGUgKCB0aGlzLmRpc3BhdGNoRXZlbnRzLmxlbmd0aCAhPSAwICkge1xuXG5cdFx0XHRsZXQgZnVuYyA9IHRoaXMuZGlzcGF0Y2hFdmVudHMucG9wKCk7XG5cblx0XHRcdGlmICggZnVuYyApIHtcblxuXHRcdFx0XHRmdW5jKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdH0gKTtcblxuXHRcdGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICdhbmltYXRlJyxcblx0XHRcdFx0ZGVsdGFUaW1lOiBkZWx0YVRpbWVcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZURhdGFCYXNlKCB0YXJnZXQ/OiBzdHJpbmcgKSB7XG5cblx0XHRpZiAoIHRhcmdldCApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIHRhcmdldCBdO1xuXHRcdFx0bGV0IGRhdGFiYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyB0YXJnZXQgXTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSAmJiBkYXRhYmFzZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGxldCBrZXkgPSBPYmplY3Qua2V5cyggdGhpcy5kYXRhQmFzZSApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIGtleVsgaSBdIF07XG5cdFx0XHRsZXQgZGF0YWJhc2VWYWx1ZSA9IHRoaXMuZGF0YUJhc2VbIGtleVsgaSBdIF07XG5cblx0XHRcdGlmICggdmFyaWFibGUgJiYgZGF0YWJhc2VWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHRcdFx0Ly8gVmVjdG9y57O744Gv5Y+C54Wn44Gq44Gu44GnbnVtYmVy44GobnVtYmVyW13jgYLjgZ/jgorjgaDjgZHmm7TmlrBcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRCZXppZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5leHBvcnQgbmFtZXNwYWNlIEJlemllciB7XG5cblx0ZXhwb3J0IHR5cGUgQmV6aWVyQ29udHJvbFBvaW50cyA9IHtcblx0XHRwMDogbnVtYmVyO1xuXHRcdHAxOiBudW1iZXI7XG5cdFx0cDI6IG51bWJlcjtcblx0XHRwMzogbnVtYmVyO1xuXHR9XG5cblx0Ly8gaW5zcGlyZWQgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qcyBhbmQgaHR0cHM6Ly9naXRodWIuY29tLzBiNXZyL2F1dG9tYXRvbi9ibG9iLzg3MjQyMGU3OThkOTA1NGQ0YTdhMDZjOTcyY2JiNDI2MWE2N2I0YmMvc3JjL2JlemllckVhc2luZy50c1xuXG5cdGV4cG9ydCBjb25zdCBORVdUT05fSVRFUkFUSU9OUyA9IDQ7XG5cdGV4cG9ydCBjb25zdCBORVdUT05fTUlOX1NMT1BFID0gMC4wMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9QUkVDSVNJT04gPSAwLjAwMDAwMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwO1xuXHRleHBvcnQgY29uc3QgQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFID0gMTE7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUgPSAxLjAgLyBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkU7XG5cblx0ZnVuY3Rpb24gY2FsY0JlemllckEoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSBwLnAwICsgMy4wICogcC5wMSAtIDMuMCAqIHAucDIgKyBwLnAzO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckIoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogcC5wMCAtIDYuMCAqIHAucDEgKyAzLjAgKiBwLnAyO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckMoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSAzLjAgKiBwLnAwICsgMy4wICogcC5wMTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXJTbG9wZSggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIDMuMCAqIGNhbGNCZXppZXJBKCBwICkgKiB0ICogdCArIDIuMCAqIGNhbGNCZXppZXJCKCBwICkgKiB0ICsgY2FsY0JlemllckMoIHAgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXIoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAoICggY2FsY0JlemllckEoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQiggcCApICkgKiB0ICsgY2FsY0JlemllckMoIHAgKSApICogdCArIHAucDA7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHN1YmRpdiggeDogbnVtYmVyLCBzdGFydFQ6IG51bWJlciwgZW5kVDogbnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0bGV0IGN1cnJlbnRYID0gMDtcblx0XHRsZXQgY3VycmVudFQgPSAwO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGN1cnJlbnRUID0gc3RhcnRUICsgKCBlbmRUIC0gc3RhcnRUICkgLyAyO1xuXHRcdFx0Y3VycmVudFggPSBjYWxjQmV6aWVyKCBwLCBjdXJyZW50VCApO1xuXG5cdFx0XHRpZiAoIGN1cnJlbnRYID4geCApIHtcblxuXHRcdFx0XHRlbmRUID0gY3VycmVudFQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0c3RhcnRUID0gY3VycmVudFQ7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBjdXJyZW50VDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gbmV3dG9uKCB4Om51bWJlciwgcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgTkVXVE9OX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGxldCBzbG9wZSA9IGNhbGNCZXppZXJTbG9wZSggcCwgdCApO1xuXG5cdFx0XHRpZiAoIHNsb3BlID09IDAuMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gdDtcblxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgY3VycmVudFggPSAoIGNhbGNCZXppZXIoIHAsIHQgKSApIC0geDtcblx0XHRcdHQgLT0gY3VycmVudFggLyBzbG9wZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0QmV6aWVyVGZyb21YKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB4OiBudW1iZXIsIGNhY2hlOiBudW1iZXJbXSApIHtcblxuXHRcdHAucDEgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDEgKSApO1xuXHRcdHAucDIgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDIgKSApO1xuXG5cdFx0bGV0IHNhbXBsZSA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDE7IGkgPCBjYWNoZS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHNhbXBsZSA9IGkgLSAxO1xuXHRcdFx0aWYgKCB4IDwgY2FjaGVbIGkgXSApIGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHQgPSBzYW1wbGUgLyAoIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSAtIDEuMCApO1xuXHRcdGxldCBkaWZmID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICkgLyAoIHAucDMgLSBwLnAwICk7XG5cblx0XHRpZiAoIGRpZmYgPT0gMC4wICkge1xuXG5cdFx0XHRyZXR1cm4gdDtcblxuXHRcdH0gZWxzZSBpZiAoIGRpZmYgPiAwLjAxICkge1xuXG5cdFx0XHRyZXR1cm4gbmV3dG9uKCB4LCBwLCB0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gc3ViZGl2KCB4LCB0LCB0ICsgQkVaSUVSX0VBU0lOR19TQU1QTEVfU1RFUF9TSVpFLCBwICk7XG5cblx0XHR9XG5cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIndvbGZ5ODctZXZlbnRlbWl0dGVyXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkFjdGlvbiB9IGZyb20gXCIuLi9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZUdyb3VwIH0gZnJvbSAnLi4vQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwJztcclxuaW1wb3J0IHsgRkN1cnZlSW50ZXJwb2xhdGlvbiwgRkN1cnZlS2V5RnJhbWUgfSBmcm9tIFwiLi4vQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lXCI7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5cclxuZXhwb3J0IHR5cGUgQkNNZXNzYWdlID0gQkNTeW5jU2NlbmVNZXNzYWdlIHwgQkNTeW5jRnJhbWVNZXNzYWdlXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY1NjZW5lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvc2NlbmVcIixcclxuICAgIGRhdGE6IEJDU2NlbmVEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1NjZW5lRGF0YSA9IHtcclxuXHRhY3Rpb25zOiBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtW107XHJcbiAgICBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtID0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZmN1cnZlX2dyb3Vwczoge1trZXk6IHN0cmluZ106IEJDQW5pbWF0aW9uQ3VydmVQYXJhbVtdfTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZVBhcmFtID0ge1xyXG4gICAga2V5ZnJhbWVzOiBCQ0FuaW1hdGlvbkN1cnZlS2V5RnJhbWVQYXJhbVtdO1xyXG5cdGF4aXM6IEJDQW5pbWF0aW9uQ3VydmVBeGlzXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtID0ge1xyXG4gICAgYzogVEhSRUUuVmVjMjtcclxuICAgIGhfbDogVEhSRUUuVmVjMjtcclxuICAgIGhfcjogVEhSRUUuVmVjMjtcclxuICAgIGU6IHN0cmluZztcclxuICAgIGk6IEZDdXJ2ZUludGVycG9sYXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVPYmplY3REYXRhID0ge1xyXG5cdG5hbWU6IHN0cmluZyxcclxuXHRhY3Rpb25zOiBzdHJpbmdbXVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1N5bmNGcmFtZU1lc3NhZ2UgPSB7XHJcblx0dHlwZTogXCJzeW5jL3RpbWVsaW5lXCI7XHJcblx0ZGF0YTogQkNUaW1lbGluZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDVGltZWxpbmVEYXRhID0ge1xyXG5cdHN0YXJ0OiBudW1iZXI7XHJcblx0ZW5kOiBudW1iZXI7XHJcblx0Y3VycmVudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxlbmRlckNvbm5lY3RvciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdC8vIHdzXHJcblxyXG5cdHByaXZhdGUgdXJsPzogc3RyaW5nO1xyXG5cdHByaXZhdGUgd3M/OiBXZWJTb2NrZXQ7XHJcblx0cHVibGljIGNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvLyBmcmFtZVxyXG5cclxuXHRwdWJsaWMgZnJhbWVDdXJyZW50OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyID0gMDtcclxuXHJcblx0Ly8gYW5pbWF0aW9uXHJcblxyXG5cdHB1YmxpYyBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdID0gW107XHJcblx0cHVibGljIGFjdGlvbnM6IEFuaW1hdGlvbkFjdGlvbltdID0gW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKCB1cmw/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRpZiAoIHVybCApIHtcclxuXHJcblx0XHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0XHR0aGlzLmNvbm5lY3QoIHRoaXMudXJsICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb25uZWN0KCB1cmw6IHN0cmluZyApIHtcclxuXHJcblx0XHR0aGlzLnVybCA9IHVybDtcclxuXHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KCB0aGlzLnVybCApO1xyXG5cdFx0dGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9uZXJyb3IgPSAoIGUgKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmVycm9yKCBlICk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3luY0pzb25TY2VuZSgganNvblBhdGg6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0cmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcmVxLnJlYWR5U3RhdGUgPT0gNCApIHtcclxuXHJcblx0XHRcdFx0aWYgKCByZXEuc3RhdHVzID09IDIwMCApIHtcclxuXHJcblx0XHRcdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBKU09OLnBhcnNlKCByZXEucmVzcG9uc2UgKSApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXEub3BlbiggJ0dFVCcsIGpzb25QYXRoICk7XHJcblx0XHRyZXEuc2VuZCggKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uU3luY1NjZW5lKCBkYXRhOiBCQ1NjZW5lRGF0YSApIHtcclxuXHJcblx0XHR0aGlzLmFjdGlvbnMubGVuZ3RoID0gMDtcclxuXHRcdHRoaXMub2JqZWN0cy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdC8vIGFjdGlvbnNcclxuXHJcblx0XHRkYXRhLmFjdGlvbnMuZm9yRWFjaCggYWN0aW9uRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgYWN0aW9uID0gbmV3IEFuaW1hdGlvbkFjdGlvbiggYWN0aW9uRGF0YS5uYW1lICk7XHJcblxyXG5cdFx0XHRsZXQgZmN1cnZlR3JvdXBOYW1lcyA9IE9iamVjdC5rZXlzKGFjdGlvbkRhdGEuZmN1cnZlX2dyb3VwcylcclxuXHJcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGZjdXJ2ZUdyb3VwTmFtZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cE5hbWUgPSBmY3VydmVHcm91cE5hbWVzW2ldO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cCA9IG5ldyBGQ3VydmVHcm91cCggZmN1cnZlR3JvdXBOYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzW2ZjdXJ2ZUdyb3VwTmFtZV0uZm9yRWFjaCggZmN1cnZlRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGN1cnZlID0gbmV3IEZDdXJ2ZSgpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRjdXJ2ZS5zZXQoIGZjdXJ2ZURhdGEua2V5ZnJhbWVzLm1hcCggZnJhbWUgPT4ge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEZDdXJ2ZUtleUZyYW1lKCBmcmFtZS5jLCBmcmFtZS5oX2wsIGZyYW1lLmhfciwgZnJhbWUuaSApO1xyXG5cdFxyXG5cdFx0XHRcdFx0fSApICk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZjdXJ2ZUdyb3VwLnNldEZDdXJ2ZSggY3VydmUsIGZjdXJ2ZURhdGEuYXhpcyApO1xyXG5cdFxyXG5cdFx0XHRcdH0gKTtcclxuXHJcblx0XHRcdFx0YWN0aW9uLmFkZEZjdXJ2ZUdyb3VwKCBmY3VydmVHcm91cC5uYW1lLCBmY3VydmVHcm91cCApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIG9iamVjdHNcclxuXHJcblx0XHRkYXRhLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0RGF0YSA9PiB7XHJcblxyXG5cdFx0XHR0aGlzLm9iamVjdHMucHVzaCggb2JqZWN0RGF0YSApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyBkaXNwYXRjaCBldmVudFxyXG5cdFx0XHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlL3NjZW5lJywgW3RoaXNdKVxyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUodGhpcy5mcmFtZUN1cnJlbnQpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25TeW5jVGltZWxpbmUoIGRhdGE6IEJDVGltZWxpbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUoIGRhdGEuY3VycmVudCwgZGF0YS5zdGFydCwgZGF0YS5lbmQgKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFdTIEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uT3BlbiggZXZlbnQ6IEV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uTWVzc2FnZSggZTogTWVzc2FnZUV2ZW50ICkge1xyXG5cclxuXHRcdGxldCBtc2cgPSBKU09OLnBhcnNlKCBlLmRhdGEgKSBhcyBCQ01lc3NhZ2U7XHJcblxyXG5cdFx0aWYgKCBtc2cudHlwZSA9PSAnc3luYy9zY2VuZScgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIG1zZy50eXBlID09IFwic3luYy90aW1lbGluZVwiICkge1xyXG5cclxuXHRcdFx0dGhpcy5vblN5bmNUaW1lbGluZSggbXNnLmRhdGEgKTtcclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25DbG9zZSggZTpDbG9zZUV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZVdTKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRBUElcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGdldEFjdGlvbk5hbWVMaXN0KCBvYmplY3ROYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5vYmplY3RzWyBpIF0ubmFtZSA9PSBvYmplY3ROYW1lICkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vYmplY3RzWyBpIF0uYWN0aW9ucztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFtdO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb24oIGFjdGlvbk5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmFjdGlvbnNbIGkgXS5uYW1lID09IGFjdGlvbk5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHRcdGxldCBhY3Rpb25OYW1lTGlzdCA9IHRoaXMuZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWUgKTtcclxuXHJcblx0XHRhY3Rpb25OYW1lTGlzdC5mb3JFYWNoKCBhY3Rpb25OYW1lID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSB0aGlzLmdldEFjdGlvbiggYWN0aW9uTmFtZSApO1xyXG5cclxuXHRcdFx0aWYgKCBhY3Rpb24gKSB7XHJcblxyXG5cdFx0XHRcdGFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdHJldHVybiBhY3Rpb25zO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb25Db250YWluc0FjY2Vzc29yKCBhY2Nlc3Nvcjogc3RyaW5nICkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4ge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCBhY3Rpb24uY3VydmVzICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gY3VydmVLZXlzLnNvbWUoY3VydmVOYW1lID0+IGN1cnZlTmFtZT09YWNjZXNzb3IpXHJcblx0XHRcdFxyXG5cdFx0fSkgfHwgbnVsbFxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VGltZWxpbmUoIGN1cnJlbnQ6IG51bWJlciwgc3RhcnQ/Om51bWJlciwgZW5kPzpudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUN1cnJlbnQgPSBjdXJyZW50O1xyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gc3RhcnQgfHwgdGhpcy5mcmFtZVN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IGVuZCB8fCB0aGlzLmZyYW1lRW5kO1xyXG5cclxuXHRcdHRoaXMuZW1pdEV2ZW50KCAndXBkYXRlL3RpbWVsaW5lJywgWyB0aGlzLmZyYW1lQ3VycmVudCwgdGhpcy5mcmFtZVN0YXJ0LCB0aGlzLmZyYW1lRW5kIF0gKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdERpc3Bvc2VcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGlzcG9zZVdTKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy53cyApIHtcclxuXHJcblx0XHRcdHRoaXMud3MuY2xvc2UoKTtcclxuXHRcdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9uY2xvc2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9ub3BlbiA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBCZXppZXIgfSBmcm9tIFwiLi9CZXppZXJcIjtcblxuZXhwb3J0IHR5cGUgRWFzaW5nRnVuYyA9ICggdDogbnVtYmVyICkgPT4gYW55XG5cbmV4cG9ydCBuYW1lc3BhY2UgRWFzaW5ncyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNpZ21vaWQoIHdlaWdodDogbnVtYmVyID0gNiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0dmFyIGUxID0gTWF0aC5leHAoIC0gd2VpZ2h0ICogKCAyICogeCAtIDEgKSApO1xuXHRcdFx0dmFyIGUyID0gTWF0aC5leHAoIC0gd2VpZ2h0ICk7XG5cblx0XHRcdHJldHVybiAoIDEgKyAoIDEgLSBlMSApIC8gKCAxICsgZTEgKSAqICggMSArIGUyICkgLyAoIDEgLSBlMiApICkgLyAyO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdmFsdWU6IG51bWJlciApOiBudW1iZXIge1xuXG5cdFx0bGV0IHggPSBNYXRoLm1heCggMCwgTWF0aC5taW4oIDEsICggdmFsdWUgLSBtaW4gKSAvICggbWF4IC0gbWluICkgKSApO1xuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fVxuXG5cdC8qXG5cdEBhdXRoZXIgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcblx0Ki9cblxuXHRleHBvcnQgZnVuY3Rpb24gbGluZWFyKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqICggMiAtIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyAyICogdCAqIHQgOiAtIDEgKyAoIDQgLSAyICogdCApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gKCAtLSB0ICkgKiB0ICogdCArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAoIHQgLSAxICkgKiAoIDIgKiB0IC0gMiApICogKCAyICogdCAtIDIgKSArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxIC0gKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoIC0tIHQgKSAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxICsgKCAtLSB0ICkgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuICBcdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCggdDogbnVtYmVyICkge1xuXG4gIFx0XHRyZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuICBcdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gYmV6aWVyKCBjMTogVEhSRUUuVmVjMiwgaDE6IFRIUkVFLlZlYzIsIGgyOiBUSFJFRS5WZWMyLCBjMjogVEhSRUUuVmVjMiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHZhciBjYWNoZSA9IG5ldyBBcnJheSggQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTsgKysgaSApIHtcblxuXHRcdFx0Y2FjaGVbIGkgXSA9IEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIGkgLyAoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgLSAxLjAgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuICggeDogbnVtYmVyICkgPT4ge1xuXG5cdFx0XHRpZiAoIHggPD0gYzEueCApIHJldHVybiBjMS55O1xuXHRcdFx0aWYgKCBjMi54IDw9IHggKSByZXR1cm4gYzIueTtcblxuXHRcdFx0cmV0dXJuIEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS55LCBwMTogaDEueSwgcDI6IGgyLnksIHAzOiBjMi55IH0sIEJlemllci5nZXRCZXppZXJUZnJvbVgoIHsgcDA6IGMxLngsIHAxOiBoMS54LCBwMjogaDIueCwgcDM6IGMyLnggfSwgeCwgY2FjaGUgKSApO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGN1YmljQmV6aWVyKCBoMVg6IG51bWJlciwgaDFZOiBudW1iZXIsIGgyWDogbnVtYmVyLCBoMlk6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBiZXppZXIoXG5cdFx0XHR7IHg6IDAuMCwgeTogMC4wIH0sXG5cdFx0XHR7IHg6IGgxWCBhcyBudW1iZXIsIHk6IGgxWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogaDJYIGFzIG51bWJlciwgeTogaDJZIGFzIG51bWJlciB9LFxuXHRcdFx0eyB4OiAxLjAsIHk6IDEuMCB9LFxuXHRcdCk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC52cyc7XG5pbXBvcnQgcGFzc1Rocm91Z2hGcmFnIGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC5mcyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVQ29tcHV0YXRpb25LZXJuZWx7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsLFxuICAgIHVuaWZvcm1zOiBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVY29tcHV0YXRpb25EYXRhe1xuICAgIGJ1ZmZlcjogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRcbn1cblxuZXhwb3J0IGNsYXNzIEdQVUNvbXB1dGF0aW9uQ29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXHRwdWJsaWMgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHByb3RlY3RlZCB1bmlmb3JtczogYW55O1xuXG5cdHByb3RlY3RlZCBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByb3RlY3RlZCBjYW1lcmE6IFRIUkVFLkNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgbWVzaDogVEhSRUUuTWVzaDtcblx0cHJvdGVjdGVkIG1hdGVyaWFsczogVEhSRUUuU2hhZGVyTWF0ZXJpYWxbXTtcblxuXHRwcm90ZWN0ZWQgdGVtcERhdGFMaW5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblx0cHJvdGVjdGVkIHRlbXBEYXRhTmVhcjogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHByaXZhdGUgcmVuZGVyVGFyZ2V0czogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRbXSA9IFtdO1xuXG5cdHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuXG4gICAgXHRyZXR1cm4gdGhpcy5yZW5kZXJlci5leHRlbnNpb25zLmdldCggXCJPRVNfdGV4dHVyZV9mbG9hdFwiICk7XG5cblx0fVxuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICBcdHRoaXMuZGF0YVNpemUgPSBkYXRhU2l6ZS5jbG9uZSgpO1xuXG4gICAgXHR0aGlzLnVuaWZvcm1zID0ge1xuICAgIFx0XHRkYXRhU2l6ZToge1xuICAgIFx0XHRcdHZhbHVlOiB0aGlzLmRhdGFTaXplXG4gICAgXHRcdH1cbiAgICBcdH07XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIgPSB0aGlzLmNyZWF0ZURhdGEoIHtcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFOZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLkNhbWVyYSgpO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuICAgIFx0dGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcbiAgICBcdHRoaXMuc2NlbmUuYWRkKCB0aGlzLm1lc2ggKTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUluaXRpYWxpemVUZXh0dXJlKCkge1xuXG4gICAgXHRsZXQgYSA9IG5ldyBGbG9hdDMyQXJyYXkoIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCAqIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSAqIDQgKTtcbiAgICBcdGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLkRhdGFUZXh0dXJlKCBhLCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgVEhSRUUuUkdCQUZvcm1hdCwgVEhSRUUuRmxvYXRUeXBlICk7XG4gICAgXHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIFx0cmV0dXJuIHRleHR1cmU7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggdGV4dHVyZVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0aWFsaXplVGV4dHVyZTogVEhSRUUuRGF0YVRleHR1cmUsIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdFRleF90ZXhQYXJhbT86IGFueSwgdGV4dHVyZVBhcmFtPyA6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGEge1xuXG4gICAgXHRsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBcdGxldCBpc2lPUyA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgXHRsZXQgcGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyA9IHtcbiAgICBcdFx0d3JhcFM6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgXHRcdHdyYXBUOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0Zm9ybWF0OiBUSFJFRS5SR0JBRm9ybWF0LFxuICAgIFx0XHR0eXBlOiBpc2lPUyA/IFRIUkVFLkhhbGZGbG9hdFR5cGUgOiBUSFJFRS5GbG9hdFR5cGUsXG4gICAgXHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxuICAgIFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcbiAgICBcdH07XG4gICAgXHRsZXQgaW5pdFRleDogVEhSRUUuRGF0YVRleHR1cmUgfCBudWxsID0gbnVsbDtcbiAgICBcdGxldCBjdXN0b21QYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zIHwgbnVsbCA9IG51bGw7XG5cbiAgICBcdGlmICggaW5pdFRleF90ZXhQYXJhbSApIHtcblxuICAgIFx0XHRpZiAoIGluaXRUZXhfdGV4UGFyYW0uaXNEYXRhVGV4dHVyZSApIHtcblxuICAgIFx0XHRcdGluaXRUZXggPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdFx0aWYgKCB0ZXh0dXJlUGFyYW0gKSB7XG5cbiAgICBcdFx0XHRcdGN1c3RvbVBhcmFtID0gdGV4dHVyZVBhcmFtO1xuXG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdH0gZWxzZSB7XG5cbiAgICBcdFx0XHRjdXN0b21QYXJhbSA9IGluaXRUZXhfdGV4UGFyYW07XG5cbiAgICBcdFx0fVxuXG4gICAgXHR9XG5cbiAgICBcdGlmICggY3VzdG9tUGFyYW0gKSB7XG5cbiAgICBcdFx0cGFyYW0ud3JhcFMgPSBjdXN0b21QYXJhbS53cmFwUyB8fCBwYXJhbS53cmFwUztcbiAgICBcdFx0cGFyYW0ud3JhcFQgPSBjdXN0b21QYXJhbS53cmFwVCB8fCBwYXJhbS53cmFwVDtcbiAgICBcdFx0cGFyYW0ubWluRmlsdGVyID0gY3VzdG9tUGFyYW0ubWluRmlsdGVyIHx8IHBhcmFtLm1pbkZpbHRlcjtcbiAgICBcdFx0cGFyYW0ubWFnRmlsdGVyID0gY3VzdG9tUGFyYW0ubWFnRmlsdGVyIHx8IHBhcmFtLm1hZ0ZpbHRlcjtcbiAgICBcdFx0cGFyYW0uZm9ybWF0ID0gY3VzdG9tUGFyYW0uZm9ybWF0IHx8IHBhcmFtLmZvcm1hdDtcbiAgICBcdFx0cGFyYW0udHlwZSA9IGN1c3RvbVBhcmFtLnR5cGUgfHwgcGFyYW0udHlwZTtcbiAgICBcdFx0cGFyYW0uc3RlbmNpbEJ1ZmZlciA9IGN1c3RvbVBhcmFtLnN0ZW5jaWxCdWZmZXIgfHwgcGFyYW0uc3RlbmNpbEJ1ZmZlcjtcbiAgICBcdFx0cGFyYW0uZGVwdGhCdWZmZXIgPSBjdXN0b21QYXJhbS5kZXB0aEJ1ZmZlciB8fCBwYXJhbS5kZXB0aEJ1ZmZlcjtcblxuICAgIFx0fVxuXG4gICAgXHRsZXQgYnVmID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgcGFyYW0gKTtcblxuXHRcdGxldCBkYXRhID0geyBidWZmZXI6IGJ1ZiB9O1xuXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRzLnB1c2goIGJ1ZiApO1xuXG4gICAgXHRpZiAoIGluaXRUZXggKSB7XG5cbiAgICBcdFx0bGV0IGluaXRLZXJuZWwgPSB0aGlzLmNyZWF0ZUtlcm5lbCgge1xuXHRcdFx0XHRmcmFnbWVudFNoYWRlcjogcGFzc1Rocm91Z2hGcmFnLFxuXHRcdFx0XHR1bmlmb3Jtczoge1xuXHRcdFx0XHRcdHRleDoge1xuXHRcdFx0XHRcdFx0dmFsdWU6IGluaXRUZXhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuICAgIFx0XHR0aGlzLmNvbXB1dGUoIGluaXRLZXJuZWwsIGRhdGEgKTtcblxuICAgIFx0fVxuXG4gICAgXHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUtlcm5lbCggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApOiBHUFVDb21wdXRhdGlvbktlcm5lbCB7XG5cbiAgICBcdGxldCB1bmk6IFVuaWZvcm1zID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW0udW5pZm9ybXMsIHRoaXMudW5pZm9ybXMgKTtcblxuXHRcdHBhcmFtLnVuaWZvcm1zID0gdW5pO1xuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXG4gICAgXHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscy5wdXNoKCBtYXQgKTtcblxuICAgIFx0bGV0IGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwgPSB7XG4gICAgXHRcdG1hdGVyaWFsOiBtYXQsXG4gICAgXHRcdHVuaWZvcm1zOiBwYXJhbS51bmlmb3Jtc1xuICAgIFx0fTtcblxuICAgIFx0cmV0dXJuIGtlcm5lbDtcblxuXHR9XG5cblx0cHVibGljIGNvbXB1dGUoIGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwsIGRhdGE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgY2FtZXJhPzogVEhSRUUuQ2FtZXJhICkge1xuXG4gICAgXHRsZXQgdGVtcDogR1BVY29tcHV0YXRpb25EYXRhO1xuXG4gICAgXHRpZiAoIGRhdGEuYnVmZmVyLnRleHR1cmUubWFnRmlsdGVyID09IFRIUkVFLkxpbmVhckZpbHRlciApIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YUxpbmVhcjtcblxuICAgIFx0fSBlbHNlIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YU5lYXI7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5tZXNoLm1hdGVyaWFsID0ga2VybmVsLm1hdGVyaWFsO1xuXG4gICAgXHRsZXQgY3VycmVudFJlbmRlclRhcmdldCA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCB0ZW1wLmJ1ZmZlciApO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgY2FtZXJhIHx8IHRoaXMuY2FtZXJhICk7XG5cbiAgICBcdHRoaXMuc3dhcEJ1ZmZlcnMoIGRhdGEsIHRlbXAgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIGN1cnJlbnRSZW5kZXJUYXJnZXQgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHN3YXBCdWZmZXJzKCBiMTogR1BVY29tcHV0YXRpb25EYXRhLCBiMjogR1BVY29tcHV0YXRpb25EYXRhICkge1xuXG4gICAgXHRsZXQgdG1wID0gYjEuYnVmZmVyO1xuICAgIFx0YjEuYnVmZmVyID0gYjIuYnVmZmVyO1xuICAgIFx0YjIuYnVmZmVyID0gdG1wO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuICAgIFx0bGV0IGdlbyA9IHRoaXMubWVzaC5nZW9tZXRyeTtcbiAgICBcdGdlby5kaXNwb3NlKCk7XG5cbiAgICBcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgaSArKyApIHtcblxuICAgIFx0XHR0aGlzLm1hdGVyaWFsc1sgaSBdLmRpc3Bvc2UoKTtcblxuICAgIFx0fVxuXG4gICAgXHR0aGlzLnNjZW5lLnJlbW92ZSggdGhpcy5tZXNoICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIuYnVmZmVyLmRpc3Bvc2UoKTtcbiAgICBcdHRoaXMudGVtcERhdGFOZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemVEYXRhKCBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdHRoaXMuZGF0YVNpemUuY29weSggZGF0YVNpemUgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMucmVuZGVyVGFyZ2V0cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLnJlbmRlclRhcmdldHNbIGkgXTtcblxuXHRcdFx0dGFyZ2V0LnNldFNpemUoIGRhdGFTaXplLngsIGRhdGFTaXplLnkgKTtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG5cdHBvc2l0aW9uPzogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEJhc2VUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cdHNjYWxlOiBUSFJFRS5WZWN0b3IzXG59XG5cbmV4cG9ydCBjbGFzcyBMYXlvdXRDb250cm9sbGVyIHtcblxuXHRwcm90ZWN0ZWQgb2JqOiBUSFJFRS5PYmplY3QzRDtcblx0cHJvdGVjdGVkIGJhc2VUcmFuc2Zvcm06IEJhc2VUcmFuc2Zvcm07XG5cdHByb3RlY3RlZCB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0sIGlzQWJzb2x1dGVQb3NpdGlvbj86IGJvb2xlYW4gKSB7XG5cblx0XHR0aGlzLm9iaiA9IG9iamVjdDtcblxuXHRcdHRoaXMuYmFzZVRyYW5zZm9ybSA9IHtcblx0XHRcdHBvc2l0aW9uOiB0aGlzLm9iai5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0cm90YXRpb246IHRoaXMub2JqLnF1YXRlcm5pb24uY2xvbmUoKSxcblx0XHRcdHNjYWxlOiB0aGlzLm9iai5zY2FsZS5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG5cdFx0aWYgKCAhIGlzQWJzb2x1dGVQb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uYWRkKCB0aGlzLm9iai5wb3NpdGlvbiApO1xuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucm90YXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucm90YXRpb24ubXVsdGlwbHkoIHRoaXMub2JqLnF1YXRlcm5pb24gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZVRyYW5zZm9ybSggd2VpZ2h0OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5wb3NpdGlvbi5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKS5sZXJwKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0ucm90YXRpb24gKSB7XG5cblx0XHRcdHRoaXMub2JqLnF1YXRlcm5pb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCkuc2xlcnAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLCB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSApIHtcblxuXHRcdFx0dGhpcy5vYmouc2NhbGUuY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnNjYWxlLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMudHJhbnNmb3JtLnNjYWxlICogKCB3ZWlnaHQgKSArIDEuMCAtIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBBbmltYXRvclZhcmlhYmxlVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMZXJwRnVuYzxUPntcblx0KCBhOiBULCBiOiBULCB0OiBudW1iZXIgKTogVDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMZXJwcyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlciggYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhICsgKCBiIC0gYSApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlckFycmF5KCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggYS5sZW5ndGggPT0gYi5sZW5ndGggKSB7XG5cblx0XHRcdGxldCBjID0gW107XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGMucHVzaCggYVsgaSBdICsgKCBiWyBpIF0gLSBhWyBpIF0gKSAqIHQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCAnRGlmZmVyZW50IGxlbmd0aCBBcnJheXMhISEnICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFVmVjdG9ycyggYTogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIGI6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLmxlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFUXVhdGVybmlvbiggYTogVEhSRUUuUXVhdGVybmlvbiwgYjogVEhSRUUuUXVhdGVybmlvbiwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5zbGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVFdWxlciggYTogVEhSRUUuRXVsZXIsIGI6IFRIUkVFLkV1bGVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgYWMgPSBhLmNsb25lKCk7XG5cdFx0bGV0IGJjID0gYi5jbG9uZSgpO1xuXG5cdFx0YWMueCA9IGFjLnggKyAoIGJjLnggLSBhYy54ICkgKiB0O1xuXHRcdGFjLnkgPSBhYy55ICsgKCBiYy55IC0gYWMueSApICogdDtcblx0XHRhYy56ID0gYWMueiArICggYmMueiAtIGFjLnogKSAqIHQ7XG5cblx0XHRyZXR1cm4gYWM7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRMZXJwRnVuYyggdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgKCB2YWx1ZSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlckFycmF5O1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc1ZlY3RvcjJcIiBpbiB2YWx1ZSB8fCBcImlzVmVjdG9yM1wiIGluIHZhbHVlIHx8IFwiaXNWZWN0b3I0XCIgaW4gdmFsdWUgfHwgXCJpc0NvbG9yXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVZlY3RvcnM7XG5cblx0XHR9IGVsc2UgaWYgKCBcImlzUXVhdGVybmlvblwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVRdWF0ZXJuaW9uO1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc0V1bGVyXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRUV1bGVyO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2ludGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcm90ZWN0ZWQgaXNTUDogYm9vbGVhbjtcblx0cHJvdGVjdGVkIGlzVG91Y2hpbmc6IGJvb2xlYW47XG5cblx0cHVibGljIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRwdWJsaWMgZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXHRcdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0dGhpcy5pc1NQID0gdXNlckFnZW50LmluZGV4T2YoICdpUGhvbmUnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQYWQnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ0FuZHJvaWQnICkgPj0gMCB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJpUGFkXCIgfHwgKCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJTYWZhcmlcIiApICE9IC0gMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiQ2hyb21lXCIgKSA9PSAtIDEgJiYgKCBuYXZpZ2F0b3IgYXMgYW55ICkuc3RhbmRhbG9uZSAhPT0gdW5kZWZpbmVkICk7XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGNvbnN0IG9uVG91Y2hTdGFydCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblRvdWNoTW92ZSA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uVG91Y0VuZCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcImVuZFwiICk7XG5cdFx0Y29uc3Qgb25Qb2ludGVyRG93biA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwic3RhcnRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlck1vdmUgPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlclVwID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uV2hlZWwgPSB0aGlzLndoZWVsLmJpbmQoIHRoaXMgKTtcblxuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgb25Qb2ludGVyVXAgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnZW5kXCIsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cblx0XHRjb25zdCBvblVuUmVnaXN0ZXIgPSAoIGU6IGFueSApID0+IHtcblxuXHRcdFx0aWYgKCBlbG0uaXNFcXVhbE5vZGUoIGUuZWxtICkgKSB7XG5cblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0ICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93biApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdlbmRcIiwgb25Qb2ludGVyVXAgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCApO1xuXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHR9XG5cblx0cHVibGljIHVucmVnaXN0ZXJFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndW5yZWdpc3RlcicsXG5cdFx0XHRlbG06IGVsbSxcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRTY3JlZW5Qb3NpdGlvbiggd2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdGlmICggdGhpcy5wb3NpdGlvbi54ICE9IHRoaXMucG9zaXRpb24ueCApIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uLmNsb25lKClcblx0XHRcdC5kaXZpZGUoIHdpbmRvd1NpemUgKVxuXHRcdFx0Lm11bHRpcGx5U2NhbGFyKCAyLjAgKVxuXHRcdFx0LnN1YlNjYWxhciggMS4wICk7XG5cdFx0cC55ICo9IC0gMTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbiggZWxtOiBIVE1MRWxlbWVudCwgc2NyZWVuPzogYm9vbGVhbiApIHtcblxuXHRcdGNvbnN0IHJlY3Q6IERPTVJlY3QgPSBlbG0uZ2V0Q2xpZW50UmVjdHMoKVsgMCBdIGFzIERPTVJlY3Q7XG5cblx0XHRsZXQgeCA9IHRoaXMucG9zaXRpb24ueCAtIHJlY3QubGVmdDtcblx0XHRsZXQgeSA9IHRoaXMucG9zaXRpb24ueSAtIHJlY3QudG9wO1xuXG5cdFx0aWYgKCBzY3JlZW4gKSB7XG5cblx0XHRcdHggLz0gcmVjdC53aWR0aDtcblx0XHRcdHkgLz0gcmVjdC5oZWlnaHQ7XG5cblx0XHR9XG5cblx0XHRjb25zdCBwID0gbmV3IFRIUkVFLlZlY3RvcjIoIHgsIHkgKTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0UG9zKCB4OiBudW1iZXIsIHk6IG51bWJlciApIHtcblxuXHRcdGlmIChcblx0XHRcdHRoaXMucG9zaXRpb24ueCAhPT0gdGhpcy5wb3NpdGlvbi54IHx8XG5cdFx0XHR0aGlzLnBvc2l0aW9uLnkgIT09IHRoaXMucG9zaXRpb24ueVxuXHRcdCkge1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIHggLSB0aGlzLnBvc2l0aW9uLngsIHkgLSB0aGlzLnBvc2l0aW9uLnkgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMucG9zaXRpb24uc2V0KCB4LCB5ICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvblRvdWNoKCB0eXBlOiBzdHJpbmcsIGU6IFRvdWNoRXZlbnQgKSB7XG5cblx0XHRjb25zdCB0b3VjaCA9IGUudG91Y2hlc1sgMCBdO1xuXG5cdFx0aWYgKCB0b3VjaCApIHtcblxuXHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggdG91Y2gucGFnZVgsIHRvdWNoLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIHR5cGUgPT0gJ2VuZCcgKSB7XG5cblx0XHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggTmFOLCBOYU4sIHR5cGUsIGUgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Qb2ludGVyKCB0eXBlOiBzdHJpbmcsIGU6IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGNvbnN0IHBvaW50ZXJUeXBlID0gKCBlIGFzIFBvaW50ZXJFdmVudCApLnBvaW50ZXJUeXBlO1xuXG5cdFx0aWYgKCBwb2ludGVyVHlwZSAhPSBudWxsICkge1xuXG5cdFx0XHRpZiAoIHBvaW50ZXJUeXBlID09ICdtb3VzZScgJiYgKCBlLmJ1dHRvbiA9PSAtIDEgfHwgZS5idXR0b24gPT0gMCApICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgYXMgUG9pbnRlckV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRvdWNoRXZlbnRIYW5kbGVyKCBwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlciwgdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50IHwgUG9pbnRlckV2ZW50IHwgRHJhZ0V2ZW50ICkge1xuXG5cdFx0bGV0IGRpc3BhdGNoID0gZmFsc2U7XG5cblx0XHRjb25zdCB4ID0gcG9zWCAtIHdpbmRvdy5wYWdlWE9mZnNldDtcblx0XHRjb25zdCB5ID0gcG9zWSAtIHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdGlmICggdHlwZSA9PSBcInN0YXJ0XCIgKSB7XG5cblx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IHRydWU7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCAwLCAwICk7XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJtb3ZlXCIgKSB7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdGlmICggdGhpcy5pc1RvdWNoaW5nICkge1xuXG5cdFx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PSBcImVuZFwiICkge1xuXG5cdFx0XHRpZiAoICd0YXJnZXRUb3VjaGVzJyBpbiBlICkge1xuXG5cdFx0XHRcdGlmICggZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAwICkge1xuXG5cdFx0XHRcdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGlmICggZGlzcGF0Y2ggKSB7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdFx0cG9pbnRlckV2ZW50OiBlLFxuXHRcdFx0XHRwb2ludGVyRXZlbnRUeXBlOiB0eXBlLFxuXHRcdFx0XHRwb3NpdGlvbjogdGhpcy5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0XHRkZWx0YTogdGhpcy5kZWx0YS5jbG9uZSgpXG5cdFx0XHR9ICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRpZiAoICEgdGhpcy5pc1NQICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogbnVsbCxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogJ2hvdmVyJyxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdHJhY2twYWRNZW1EZWx0YSA9IDA7XG5cdHByb3RlY3RlZCB0cmFja3BhZE1heCA9IGZhbHNlO1xuXG5cdHByb3RlY3RlZCB3aGVlbCggZTogV2hlZWxFdmVudCApIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3doZWVsJyxcblx0XHRcdHdoZWVsRXZlbnQ6IGUsXG5cdFx0fSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgcGFzc1Rocm93VmVydCBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm93LnZzJztcblxudHlwZSBJbnB1dFJlbmRlclRhcmdldCA9IHsgW2tleTpzdHJpbmddOiBUSFJFRS5UZXh0dXJlIHwgVEhSRUUuVGV4dHVyZVtdIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUFBQYXJhbSBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVyc3tcblx0aW5wdXRSZW5kZXJUYXJnZXRzPzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc2luZyB7XG5cblx0cHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblx0cHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByaXZhdGUgY2FtZXJhOiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmE7XG5cdHByaXZhdGUgc2NyZWVuOiBUSFJFRS5NZXNoO1xuXG5cdHB1YmxpYyBlZmZlY3Q6IHtcblx0XHRtYXRlcmlhbDogVEhSRUUuU2hhZGVyTWF0ZXJpYWwsXG5cdH07XG5cblx0Y29uc3RydWN0b3IoIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyLCBwcFBhcmFtOiBQUFBhcmFtLCBjdXN0b21HZW9tZXRyeT86IFRIUkVFLkJ1ZmZlckdlb21ldHJ5ICkge1xuXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIC0gMS4wLCAxLjAsIDEuMCwgLSAxLjAgKTtcblxuXHRcdHRoaXMuc2NyZWVuID0gbmV3IFRIUkVFLk1lc2goIGN1c3RvbUdlb21ldHJ5IHx8IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcblx0XHR0aGlzLnNjZW5lLmFkZCggdGhpcy5zY3JlZW4gKTtcblxuXHRcdHBwUGFyYW0udmVydGV4U2hhZGVyID0gcHBQYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgcGFzc1Rocm93VmVydDtcblx0XHRwcFBhcmFtLnVuaWZvcm1zID0gcHBQYXJhbS51bmlmb3JtcyB8fCB7fTtcblx0XHRwcFBhcmFtLnVuaWZvcm1zLnJlc29sdXRpb24gPSB7XG5cdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdH07XG5cblx0XHR0aGlzLmVmZmVjdCA9IHtcblx0XHRcdG1hdGVyaWFsOiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBwUGFyYW0gKSxcblx0XHR9O1xuXG5cdH1cblxuXHRwdWJsaWMgcmVuZGVyKCBpbnB1dFJlbmRlclRhcmdldHM6IElucHV0UmVuZGVyVGFyZ2V0IHwgbnVsbCwgcmVuZGVyVGFyZ2V0OiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCB8IG51bGwgPSBudWxsICkge1xuXG5cdFx0bGV0IHJlbmRlclRhcmdldE1lbSA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cblx0XHRsZXQgZWZmZWN0ID0gdGhpcy5lZmZlY3Q7XG5cdFx0bGV0IG1hdGVyaWFsID0gZWZmZWN0Lm1hdGVyaWFsO1xuXHRcdGxldCB1bmlmb3JtcyA9IG1hdGVyaWFsLnVuaWZvcm1zO1xuXG5cdFx0aWYgKCBpbnB1dFJlbmRlclRhcmdldHMgKSB7XG5cblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIGlucHV0UmVuZGVyVGFyZ2V0cyApO1xuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaiArKyApIHtcblxuXHRcdFx0XHRpZiAoIHVuaWZvcm1zWyBrZXlzWyBqIF0gXSApIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXS52YWx1ZSA9IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF07XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXSA9IHsgdmFsdWU6IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF0gfTtcblxuXHRcdFx0XHRcdGVmZmVjdC5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwudW5pZm9ybXMgPSB1bmlmb3JtcztcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHR1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlLnNldCggcmVuZGVyVGFyZ2V0LndpZHRoLCByZW5kZXJUYXJnZXQuaGVpZ2h0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmdldFNpemUoIHVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2NyZWVuLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCByZW5kZXJUYXJnZXRNZW0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5pZm9ybXN7IFsga2V5OiBzdHJpbmcgXSA6IFRIUkVFLklVbmlmb3JtIH1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVW5pZm9ybXNMaWIge1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbWVyZ2VVbmlmb3JtcyggLi4udW5pZm9ybXM6ICggVW5pZm9ybXN8dW5kZWZpbmVkIClbXSApIDogVW5pZm9ybXMge1xyXG5cclxuXHRcdGxldCByZXMgPSB7fTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHVuaWZvcm1zWyBpIF0gIT0gdW5kZWZpbmVkICkge1xyXG5cclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXMsIHVuaWZvcm1zWyBpIF0gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdE1hbiBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdvSG9tZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2dvaG9tZScgfSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB3YWl0KCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IG9uR29Ib21lID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblxyXG5cdFx0XHR9LCB0aW1lICogMTAwMC4wICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyIHY1LjIuOSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwczovL29saS5tZS51ay9cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50IGluIGl0cyBzdG9yYWdlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBsaXN0ZW5lcnMgQXJyYXkgb2YgbGlzdGVuZXJzIHRvIHNlYXJjaCB0aHJvdWdoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCBtZXRob2QuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFsaWFzQ2xvc3VyZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2lsbCBpbml0aWFsaXNlIHRoZSBldmVudCBvYmplY3QgYW5kIGxpc3RlbmVyIGFycmF5cyBpZiByZXF1aXJlZC5cbiAgICAgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG4gICAgICogRWFjaCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0IHJlc3BvbnNlIGlzIGFuIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXXxPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJldHVybiBhIGNvbmNhdGVuYXRlZCBhcnJheSBvZiBhbGwgbWF0Y2hpbmcgZXZlbnRzIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RvciBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGV2ZW50c1tldnRdIHx8IChldmVudHNbZXZ0XSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGxpc3RlbmVycyBSYXcgbGlzdGVuZXIgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgcHJvdG8uZmxhdHRlbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGZsYXR0ZW5MaXN0ZW5lcnMobGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBmbGF0TGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsYXRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVyc0FzT2JqZWN0ID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgcmVzcG9uc2VbZXZ0XSA9IGxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCBsaXN0ZW5lciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lciAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZExpc3RlbmVyKGxpc3RlbmVyLmxpc3RlbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIWlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKHRydWUsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWRpdHMgbGlzdGVuZXJzIGluIGJ1bGsuIFRoZSBhZGRMaXN0ZW5lcnMgYW5kIHJlbW92ZUxpc3RlbmVycyBtZXRob2RzIGJvdGggdXNlIHRoaXMgdG8gZG8gdGhlaXIgam9iLiBZb3Ugc2hvdWxkIHJlYWxseSB1c2UgdGhvc2UgaW5zdGVhZCwgdGhpcyBpcyBhIGxpdHRsZSBsb3dlciBsZXZlbC5cbiAgICAgKiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCAodHJ1ZSkgb3IgYWRkZWQgKGZhbHNlKS5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC9yZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hbmlwdWxhdGUgdGhlIGxpc3RlbmVycyBvZiBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG4gICAgICAgIHZhciBtdWx0aXBsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXJzIDogdGhpcy5hZGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgLy8gSWYgZXZ0IGlzIGFuIG9iamVjdCB0aGVuIHBhc3MgZWFjaCBvZiBpdHMgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAodmFsdWUgPSBldnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU28gZXZ0IG11c3QgYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIC8vIEFuZCBsaXN0ZW5lcnMgbXVzdCBiZSBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBpdCBhbmQgcGFzcyBlYWNoIG9uZSB0byB0aGUgbXVsdGlwbGUgbWV0aG9kXG4gICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBbZXZ0XSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuIFdpbGwgcmVtb3ZlIGZyb20gZXZlcnkgZXZlbnQgaWYgbm90IHBhc3NlZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBldnQ7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZW1vdmUgZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIGV2dFxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2dF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBtYXRjaGluZyB0aGUgcmVnZXguXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVFdmVudC5cbiAgICAgKlxuICAgICAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlQWxsTGlzdGVuZXJzID0gYWxpYXMoJ3JlbW92ZUV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyc01hcCA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVyc01hcCkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzTWFwW2tleV0uc2xpY2UoMCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgfHwge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tICcuL2NvcmUvQmFzZUxheWVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL0NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbidcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cCdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmxlbmRlckNvbm5lY3Rvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9pbnRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRWFzaW5ncyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Qb3N0UHJvY2Vzc2luZyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvTGF5b3V0Q29udHJvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvVW5pZm9ybXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0xlcnBzJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9XYWl0TWFuJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9