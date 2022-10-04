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

/***/ "./src/utils/Background/shaders/background.vs":
/*!****************************************************!*\
  !*** ./src/utils/Background/shaders/background.vs ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec4 vColor;\n\nvoid main( void ) {\n    \n    vec3 pos = position;\n\n    pos.z = 1.0;\n    \n    gl_Position = vec4( pos, 1.0 );\n    \n    vUv = uv;\n    vColor = vec4( 1.0 );\n\n}");

/***/ }),

/***/ "./src/utils/DOMMesh/domMesh.vs":
/*!**************************************!*\
  !*** ./src/utils/DOMMesh/domMesh.vs ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#define GLSLIFY 1\nvarying vec2 vUv;\nuniform vec2 domPos;\nuniform vec2 domSize;\nuniform vec2 windowSize;\nuniform float aspectRatio;\n\nvoid main(  )\n{\n  float width = domSize.x / windowSize.x;\n\n  //左上( 0,0 )に\n  vec3 pos = position + vec3( 1.0,-1.0,0.0 );\n\n  //size\n  pos.x *= width;\n  pos.y *= ( width * aspectRatio ) * ( domSize.y / domSize.x );\n\n  pos += vec3( -1.0, 1.0, 0.0 );\n\n  pos += vec3( domPos.x / windowSize.x * 2.0, -domPos.y / windowSize.y * 2.0, 0.0 );\n\n  gl_Position = vec4( pos, 1.0 );\n  vUv = uv;\n}\n");

/***/ }),

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

/***/ "./src/utils/Background/index.ts":
/*!***************************************!*\
  !*** ./src/utils/Background/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Background": () => (/* binding */ Background)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders_background_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders/background.vs */ "./src/utils/Background/shaders/background.vs");


class Background extends three__WEBPACK_IMPORTED_MODULE_0__.Mesh {
    constructor(param) {
        let geo = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        let posArray = [];
        let indexArray = [];
        let uvArray = [];
        posArray.push(-1, 1, 0);
        posArray.push(1, 1, 0);
        posArray.push(1, -1, 0);
        posArray.push(-1, -1, 0);
        uvArray.push(0, 1);
        uvArray.push(1, 1);
        uvArray.push(1, 0);
        uvArray.push(0, 0);
        indexArray.push(0, 2, 1, 0, 3, 2);
        let pos = new Float32Array(posArray);
        let indices = new Uint32Array(indexArray);
        let uv = new Float32Array(uvArray);
        geo.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(pos, 3));
        geo.setAttribute('uv', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(uv, 2));
        geo.setIndex(new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(indices, 1));
        param.vertexShader = param.vertexShader || _shaders_background_vs__WEBPACK_IMPORTED_MODULE_1__["default"];
        param.transparent = param.transparent != undefined ? param.transparent : true;
        param.depthFunc = param.depthFunc != undefined ? param.depthFunc : three__WEBPACK_IMPORTED_MODULE_0__.NeverDepth;
        let mat = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial(param);
        super(geo, mat);
        this.uniforms = param.uniforms || {};
        this.frustumCulled = false;
    }
    resize(args) {
        this.uniforms.resolution = { value: args.canvasSize };
        this.uniforms.aspectRatio = { value: args.canvasAspectRatio };
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

/***/ "./src/utils/DOMMesh/index.ts":
/*!************************************!*\
  !*** ./src/utils/DOMMesh/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DOMMesh": () => (/* binding */ DOMMesh)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _domMesh_vs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domMesh.vs */ "./src/utils/DOMMesh/domMesh.vs");
/* harmony import */ var _Uniforms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Uniforms */ "./src/utils/Uniforms.ts");



class DOMMesh extends three__WEBPACK_IMPORTED_MODULE_0__.Mesh {
    constructor(element, parameter) {
        let geo = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(2, 2);
        parameter.vertexShader = _domMesh_vs__WEBPACK_IMPORTED_MODULE_1__["default"];
        let uni = _Uniforms__WEBPACK_IMPORTED_MODULE_2__.UniformsLib.mergeUniforms(parameter.uniforms, {
            domPos: {
                value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()
            },
            domSize: {
                value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()
            },
            windowSize: {
                value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2()
            },
            aspectRatio: {
                value: 1.0
            }
        });
        parameter.uniforms = uni;
        let mat = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial(parameter);
        super(geo, mat);
        this.frustumCulled = false;
        this._uniforms = uni;
        this.element = element;
        this.update();
    }
    get uniforms() {
        return this._uniforms;
    }
    update() {
        let rect = this.element.getBoundingClientRect();
        this._uniforms.windowSize.value.set(window.innerWidth, window.innerHeight);
        this._uniforms.aspectRatio.value = window.innerWidth / window.innerHeight;
        this._uniforms.domSize.value.set(rect.width, rect.height);
        this._uniforms.domPos.value.set(rect.left, rect.top);
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

/***/ "./src/utils/EventDispatcher.ts":
/*!**************************************!*\
  !*** ./src/utils/EventDispatcher.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventDispatcher": () => (/* binding */ EventDispatcher)
/* harmony export */ });
class EventDispatcher {
    constructor() {
        this.events = [];
    }
    addEventListener(type, listener) {
        this.events.push({
            type: type,
            listener: listener
        });
    }
    dispatchEvent(event) {
        event.target = this;
        for (let i = 0; i < this.events.length; i++) {
            if (event.type == this.events[i].type) {
                this.events[i].listener(event);
            }
        }
    }
    removeEventListener(type, listener) {
        for (let i = this.events.length; i >= 0; i--) {
            if (type == this.events[i].type && listener == this.events[i].listener) {
                this.events.splice(i, 1);
            }
        }
    }
}


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
        this.mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(2, 2));
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

/***/ "./src/utils/MouseRotator.ts":
/*!***********************************!*\
  !*** ./src/utils/MouseRotator.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MouseRotator": () => (/* binding */ MouseRotator)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class MouseRotator {
    constructor(objs) {
        this.target = objs;
        this.scrollVel = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
    }
    update() {
        this.scrollVel.multiplyScalar(0.96);
        let axis = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this.scrollVel.y, this.scrollVel.x, 0.0).normalize();
        let q = new three__WEBPACK_IMPORTED_MODULE_0__.Quaternion().setFromAxisAngle(axis, this.scrollVel.length());
        q.multiply(this.target.quaternion);
        this.target.quaternion.copy(q);
    }
    addVelocity(scrollDelta) {
        this.scrollVel.addVectors(this.scrollVel, scrollDelta.multiplyScalar(0.001));
    }
}


/***/ }),

/***/ "./src/utils/PageScroller/PageScrollerSection.ts":
/*!*******************************************************!*\
  !*** ./src/utils/PageScroller/PageScrollerSection.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageScrollerSection": () => (/* binding */ PageScrollerSection)
/* harmony export */ });
class PageScrollerSection {
    constructor(params) {
        this.timelinePercentage = 0;
        this.name = params.name;
        this.element = params.element;
        this.rect = this.element.getBoundingClientRect();
        this.stop = params.stop;
        this.events = params.events;
        this.bottom = params.bottom;
        this.startScrollDown = params.startScrollDown || 0;
        this.startScrollUp = params.startScrollUp || 0;
        this.updateRect(0);
    }
    get isPageScrollerSection() {
        return true;
    }
    updateRect(scrollPos) {
        this.rect = {
            x: this.element.offsetLeft,
            y: this.element.offsetTop - scrollPos,
            width: this.element.offsetWidth,
            height: this.element.offsetHeight
        };
    }
    getScrollPercentage(offsetPos) {
        let bottomOffset = (this.bottom ? this.rect.height - window.innerHeight : 0);
        let pos = (this.rect.y + bottomOffset) - (offsetPos || 0);
        let firstHalfHeight = this.bottom ? this.rect.height : window.innerHeight;
        let firstHalf = Math.min(1.0, 1.0 - (pos / firstHalfHeight));
        let secondHalfHeight = this.bottom ? window.innerHeight : this.rect.height;
        let secondHalf = Math.max(0.0, -pos / secondHalfHeight);
        let percentage = firstHalf + secondHalf;
        return percentage;
    }
}


/***/ }),

/***/ "./src/utils/PageScroller/index.ts":
/*!*****************************************!*\
  !*** ./src/utils/PageScroller/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PageScroller": () => (/* binding */ PageScroller)
/* harmony export */ });
/* harmony import */ var _Easings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Easings */ "./src/utils/Easings.ts");
/* harmony import */ var _Animator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Animator */ "./src/utils/Animator.ts");


class PageScroller {
    constructor(parentElement) {
        this.isAutoMove = false;
        this.delaySpeed = 0.1;
        this.dragDelaySpeed = 0.4;
        this.isTouching = false;
        this.deltaMem = 0;
        this.scrollReady = false;
        this.sumDelta = 0;
        this._scrollPos = 0;
        this._scrollPosMem = 0;
        this._scrollPercentage = 0;
        this._scrollPosDelay = 0;
        this._scrollPercentageDelay = 0;
        this.dragStop = false;
        this.dragUnlockReady = true;
        this.parentElement = parentElement;
        this.parentElementHeight = parentElement.getBoundingClientRect().height;
        this.sections = [];
        this.caughtSection = null;
        /*------------------------
            init Animator
        ------------------------*/
        this.animator = new _Animator__WEBPACK_IMPORTED_MODULE_1__.Animator();
        this.animator.add({
            name: 'scrollPos',
            initValue: 0,
            easing: _Easings__WEBPACK_IMPORTED_MODULE_0__.Easings.sigmoid()
        });
    }
    get scrollPos() {
        return this._scrollPos;
    }
    get scrollPosDelay() {
        return this._scrollPosDelay;
    }
    get scrollPercentage() {
        return this._scrollPercentage;
    }
    get scrollPercentageDelay() {
        return this._scrollPercentageDelay;
    }
    get scrollTimelinePercentage() {
        let sum = 0;
        for (let i = 0; i < this.sections.length; i++) {
            let sec = this.sections[i];
            let secBef = this.sections[i - 1];
            let a = Math.max(0.0, sec.element.offsetTop - this.scrollPosDelay + (sec.bottom ? sec.rect.height - window.innerHeight : 0));
            let b = ((secBef ? secBef.rect.height - (secBef.bottom ? window.innerHeight : 0) : 0) + (sec.bottom ? sec.rect.height - window.innerHeight : 0)) || 1;
            let d = 1.0 - (a / b);
            d = Math.max(0.0, d);
            sum += d;
            if (d < 1.0)
                break;
        }
        return sum / this.sections.length;
    }
    add(section) {
        this.sections.push(section);
        this.sortSections();
        return section;
    }
    sortSections() {
        this.sections.sort((a, b) => {
            return a.rect.y > b.rect.y ? 1 : -1;
        });
        for (let i = 0; i < this.sections.length; i++) {
            this.sections[i].timelinePercentage = (i + 1) / this.sections.length;
        }
    }
    get(name) {
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].name == name)
                return this.sections[i];
        }
        console.warn('section "' + name + '" is not exist.');
        return null;
    }
    update(deltaTime) {
        this.updateParentElement();
        this.updateScrollPos(deltaTime);
        this.applyParentElementTransform();
        this.sumDelta = 0.0;
    }
    updateScrollPos(deltaTime) {
        this.updateAutoMove(deltaTime);
        this.addScrollPos();
        this.calcScrollProperties(deltaTime);
    }
    updateAutoMove(deltaTime) {
        this.animator.update(deltaTime);
        if (this.isAutoMove) {
            let pos = this.animator.get('scrollPos');
            if (pos) {
                this.sumDelta = pos - this.scrollPos;
            }
        }
    }
    addScrollPos() {
        if (this.checkUnlockStopScroll(this.sumDelta)) {
            let stopPos = this.checkThrow(this.sumDelta);
            if (stopPos !== null) {
                this._scrollPos = stopPos;
            }
            else {
                this._scrollPos += this.sumDelta;
            }
            this._scrollPos = Math.max(Math.min(this._scrollPos, this.parentElementHeight - window.innerHeight), 0);
        }
    }
    checkUnlockStopScroll(scrollDelta) {
        let unlockDir = 0;
        let unlock = false;
        if (this.caughtSection) {
            let distance = this.scrollPos - this.scrollPosDelay;
            if (scrollDelta * distance < 0 || Math.abs(distance) < 10.0 || this.isAutoMove) {
                if (scrollDelta < 0) {
                    if (-scrollDelta > (this.caughtSection.startScrollUp || 0) || this.isAutoMove) {
                        unlockDir = -1;
                    }
                }
                else if (scrollDelta > 0) {
                    if (scrollDelta > (this.caughtSection.startScrollDown || 0) || this.isAutoMove) {
                        unlockDir = 1;
                    }
                }
            }
            if (unlockDir != 0 && this.caughtSection.events) {
                if (this.caughtSection.events.onStartScroll) {
                    let args = {
                        scroller: this,
                        section: this.caughtSection,
                        scrollMode: this.isAutoMove ? 'auto' : 'manual',
                        scrollDelta: scrollDelta,
                        scrollPower: Math.abs(scrollDelta),
                    };
                    let unlock;
                    let commonUnlock = this.caughtSection.events.onStartScroll.common && this.caughtSection.events.onStartScroll.common(args);
                    if (unlockDir == -1)
                        unlock = this.caughtSection.events.onStartScroll.up && this.caughtSection.events.onStartScroll.up(args);
                    if (unlockDir == 1)
                        unlock = this.caughtSection.events.onStartScroll.down && this.caughtSection.events.onStartScroll.down(args);
                    if (commonUnlock === false || unlock === false) {
                        unlockDir = 0;
                    }
                }
            }
            unlock = unlockDir != 0;
        }
        else {
            unlock = true;
        }
        if (unlockDir) {
            this.caughtSection = null;
        }
        return unlock;
    }
    checkThrow(scrollDelta) {
        for (let i = 0; i < this.sections.length; i++) {
            let sec = this.sections[i];
            sec.updateRect(this._scrollPos);
            let stopPos = this.checkThrowSectionEvents(sec, scrollDelta);
            if (stopPos !== null) {
                this.caughtSection = sec;
                return this.isAutoMove ? null : stopPos;
            }
        }
        return null;
    }
    checkThrowSectionEvents(section, scrollDelta) {
        let percentage = section.getScrollPercentage();
        let movedPercentage = section.getScrollPercentage(scrollDelta);
        if (section.events) {
            let args = {
                scroller: this,
                section: section,
                scrollMode: this.isAutoMove ? 'auto' : 'manual',
                scrollDelta: scrollDelta,
                scrollPower: Math.abs(scrollDelta),
            };
            if (section.events.onArrivals) {
                for (let i = 0; i < section.events.onArrivals.length; i++) {
                    let arrivalEvent = section.events.onArrivals[i];
                    let isThrow = this.checkThrowLine(percentage, movedPercentage, arrivalEvent.percentage);
                    if (isThrow != 0) {
                        arrivalEvent.event.common && arrivalEvent.event.common(args);
                        if (isThrow < 0) {
                            arrivalEvent.event.up && arrivalEvent.event.up(args);
                        }
                        else {
                            arrivalEvent.event.down && arrivalEvent.event.down(args);
                        }
                    }
                }
            }
        }
        if (section.stop) {
            if (this.checkThrowLine(percentage, movedPercentage, 1)) {
                this.dragUnlockReady = false;
                return section.element.offsetTop + (section.bottom ? section.rect.height - window.innerHeight : 0);
            }
        }
        return null;
    }
    checkThrowLine(a, b, line) {
        if (a < line && line <= b) {
            return 1;
        }
        else if (a > line && line >= b) {
            return -1;
        }
        else if (a == line && line == b) {
            return 2;
        }
        else {
            return 0;
        }
    }
    calcScrollProperties(deltaTime) {
        this._scrollPosDelay += (this._scrollPos - this._scrollPosDelay) * (this.isTouching && !this.caughtSection ? this.dragDelaySpeed : this.delaySpeed) * Math.min(1.0, deltaTime * 60);
        this._scrollPercentage = this.scrollPosToPerecntage(this.scrollPos);
        this._scrollPercentageDelay = this.scrollPosToPerecntage(this.scrollPosDelay);
    }
    scrollPosToPerecntage(scrollPos) {
        return scrollPos / (this.parentElementHeight - window.innerHeight);
    }
    updateParentElement() {
        this.parentElementHeight = this.parentElement.getBoundingClientRect().height;
    }
    applyParentElementTransform() {
        this.parentElement.style.transform = 'translate3d( 0,' + -this.scrollPosDelay.toString() + 'px, 0 )';
    }
    scroll(delta) {
        this.deltaMem = (this.deltaMem + delta) / 2;
        this.sumDelta += delta;
    }
    catch() {
        if (this.isAutoMove)
            return;
        this.isTouching = true;
        this.deltaMem = 0;
        if (!this.caughtSection) {
            this._scrollPos = this._scrollPosDelay;
        }
    }
    drag(delta) {
        if (!this.isTouching)
            return;
        this.scroll(delta);
    }
    release(snap = 10.0) {
        if (!this.isTouching)
            return;
        this.isTouching = false;
        if (!this.caughtSection) {
            this.scroll(this.deltaMem * snap);
        }
    }
    autoMove(param) {
        let targetPos = 0;
        if (param.target.isPageScrollerSection) {
            let target = param.target;
            let bottomOffset = param.bottom ? target.rect.height - window.innerHeight : 0;
            targetPos = target.element.offsetTop + bottomOffset;
        }
        else if (typeof param.target == 'string') {
            let target = this.get(param.target);
            if (target) {
                let bottomOffset = param.bottom ? target.rect.height - window.innerHeight : 0;
                targetPos = target.element.offsetTop + bottomOffset;
            }
        }
        else if (typeof param.target == 'number') {
            targetPos = param.target;
        }
        this.animator.setValue('scrollPos', this._scrollPos);
        this.animator.animate('scrollPos', targetPos, param.duration, () => {
            if (param.callBack)
                param.callBack();
            this.isAutoMove = false;
        }, param.easing);
        //onStartScroll内でAutoMoveしたとき、無限ループに陥るのを阻止
        this.sumDelta = (targetPos - this.sumDelta) / Math.abs(targetPos - this.sumDelta) * 0.00001;
        this.isAutoMove = true;
    }
}


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
        if (!(this.position.x !== this.position.x || this.position.y !== this.position.y)) {
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
            this.delta.set(0, 0);
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
        this.screen = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(customGeometry || new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(2, 2));
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

/***/ "./src/utils/TimelineAnimator.ts":
/*!***************************************!*\
  !*** ./src/utils/TimelineAnimator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimelineAnimator": () => (/* binding */ TimelineAnimator)
/* harmony export */ });
/* harmony import */ var _Lerps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lerps */ "./src/utils/Lerps.ts");

class TimelineAnimator {
    constructor() {
        this.variables = {};
        this.time = 0;
    }
    add(params) {
        if (params.keyframes.length == 0) {
            console.warn('"' + params.name + '"', 'Keyframe length is 0!!');
            return;
        }
        this.variables[params.name] = {
            keyframes: params.keyframes,
            lerpFunc: params.customLerp,
            easing: params.easing,
            value: null
        };
        this.variables[params.name].keyframes.sort((a, b) => {
            return (a.time < b.time) ? -1 : 1;
        });
        if (!this.variables[params.name].lerpFunc) {
            this.variables[params.name].lerpFunc = _Lerps__WEBPACK_IMPORTED_MODULE_0__.Lerps.getLerpFunc(params.keyframes[0].value);
        }
        this.calc();
        return params.name;
    }
    get(name) {
        if (this.variables[name]) {
            return this.variables[name].value;
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
            return null;
        }
    }
    getVariableObject(name) {
        if (this.variables[name]) {
            return this.variables[name];
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
            return null;
        }
    }
    update(time) {
        this.time = time;
        this.calc();
    }
    calc() {
        let keys = Object.keys(this.variables);
        for (let i = 0; i < keys.length; i++) {
            let valiable = this.variables[keys[i]];
            let kfs = valiable.keyframes;
            let a = null;
            let b = null;
            let t = Math.max(kfs[0].time, Math.min(kfs[kfs.length - 1].time, this.time));
            let easing = null;
            if (kfs.length == 1) {
                t = kfs[0].time;
                a = b = kfs[0];
            }
            else {
                for (let j = 0; j < kfs.length - 1; j++) {
                    a = kfs[j];
                    b = kfs[j + 1];
                    easing = a.easing;
                    if (a.time <= t && t <= b.time)
                        break;
                }
                if (a != null && b != null) {
                    t = (t - a.time) / (b.time - a.time);
                }
            }
            if (easing) {
                t = easing(t);
            }
            else if (valiable.easing) {
                t = valiable.easing(t);
            }
            else if (this.defaultEasing) {
                t = this.defaultEasing(t);
            }
            if (valiable.lerpFunc) {
                if (a != null && b != null) {
                    valiable.value = valiable.lerpFunc(a.value, b.value, t);
                }
                if (valiable.value === false) {
                    console.log('error at ' + '"' + keys[i] + '"');
                }
            }
            else {
                console.warn('"' + keys[i] + '"', 'lerp function is not set.');
            }
        }
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
module.exports = JSON.parse('{"name":"ore-three","version":"3.1.0","description":"","author":"ukonpower","license":"MIT","keywords":["threejs","webgl"],"repository":{"type":"git","url":"https://github.com/ukonpower/ore-three"},"bugs":{"url":"https://github.com/ukonpower/ore-three/issues"},"main":"./build/ore-three.js","types":"./types/index.d.ts","files":["build","types"],"scripts":{"dev":"webpack --config ./config/webpack/base.webpack.config.js --watch & tsc --declaration --emitDeclarationOnly -preserveWatchOutput -w","build":"webpack --config ./config/webpack/base.webpack.config.js & webpack --config ./config/webpack/min.webpack.config.js && tsc --declaration --emitDeclarationOnly"},"dependencies":{"wolfy87-eventemitter":"^5.2.9"},"devDependencies":{"@types/node":"^17.0.31","@types/offscreencanvas":"^2019.6.4","@types/three":">=0.144.0","@types/webgl2":"0.0.6","@typescript-eslint/eslint-plugin":"^5.19.0","@typescript-eslint/parser":"^5.19.0","del":"^6.0.0","eslint":"^8.13.0","eslint-config-mdcs":"^5.0.0","fancy-log":"^2.0.0","glslify-hex":"^2.1.1","glslify-import":"^3.1.0","glslify-loader":"^2.0.0","raw-loader":"^4.0.2","sass":"^1.50.0","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-merge":"^5.8.0","webpack-stream":"^7.0.0"},"peerDependencies":{"@types/three":">=0.144.0","three":">=0.144.0"}}');

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
/* harmony export */   "Background": () => (/* reexport safe */ _utils_Background__WEBPACK_IMPORTED_MODULE_7__.Background),
/* harmony export */   "BaseLayer": () => (/* reexport safe */ _core_BaseLayer__WEBPACK_IMPORTED_MODULE_0__.BaseLayer),
/* harmony export */   "BlenderConnector": () => (/* reexport safe */ _utils_BlenderConnector__WEBPACK_IMPORTED_MODULE_8__.BlenderConnector),
/* harmony export */   "Controller": () => (/* reexport safe */ _core_Controller__WEBPACK_IMPORTED_MODULE_1__.Controller),
/* harmony export */   "DOMMesh": () => (/* reexport safe */ _utils_DOMMesh__WEBPACK_IMPORTED_MODULE_10__.DOMMesh),
/* harmony export */   "Easings": () => (/* reexport safe */ _utils_Easings__WEBPACK_IMPORTED_MODULE_11__.Easings),
/* harmony export */   "EventDispatcher": () => (/* reexport safe */ _utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_12__.EventDispatcher),
/* harmony export */   "FCurve": () => (/* reexport safe */ _utils_Animation_FCurve__WEBPACK_IMPORTED_MODULE_4__.FCurve),
/* harmony export */   "FCurveGroup": () => (/* reexport safe */ _utils_Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_5__.FCurveGroup),
/* harmony export */   "FCurveKeyFrame": () => (/* reexport safe */ _utils_Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_6__.FCurveKeyFrame),
/* harmony export */   "GPUComputationController": () => (/* reexport safe */ _utils_GPUComputationController__WEBPACK_IMPORTED_MODULE_13__.GPUComputationController),
/* harmony export */   "LayoutController": () => (/* reexport safe */ _utils_LayoutController__WEBPACK_IMPORTED_MODULE_18__.LayoutController),
/* harmony export */   "Lerps": () => (/* reexport safe */ _utils_Lerps__WEBPACK_IMPORTED_MODULE_21__.Lerps),
/* harmony export */   "MouseRotator": () => (/* reexport safe */ _utils_MouseRotator__WEBPACK_IMPORTED_MODULE_14__.MouseRotator),
/* harmony export */   "PageScroller": () => (/* reexport safe */ _utils_PageScroller__WEBPACK_IMPORTED_MODULE_16__.PageScroller),
/* harmony export */   "PageScrollerSection": () => (/* reexport safe */ _utils_PageScroller_PageScrollerSection__WEBPACK_IMPORTED_MODULE_17__.PageScrollerSection),
/* harmony export */   "Pointer": () => (/* reexport safe */ _utils_Pointer__WEBPACK_IMPORTED_MODULE_9__.Pointer),
/* harmony export */   "PostProcessing": () => (/* reexport safe */ _utils_PostProcessing__WEBPACK_IMPORTED_MODULE_15__.PostProcessing),
/* harmony export */   "TimelineAnimator": () => (/* reexport safe */ _utils_TimelineAnimator__WEBPACK_IMPORTED_MODULE_19__.TimelineAnimator),
/* harmony export */   "UniformsLib": () => (/* reexport safe */ _utils_Uniforms__WEBPACK_IMPORTED_MODULE_20__.UniformsLib),
/* harmony export */   "WaitMan": () => (/* reexport safe */ _utils_WaitMan__WEBPACK_IMPORTED_MODULE_22__.WaitMan)
/* harmony export */ });
/* harmony import */ var _core_BaseLayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/BaseLayer */ "./src/core/BaseLayer.ts");
/* harmony import */ var _core_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Controller */ "./src/core/Controller.ts");
/* harmony import */ var _utils_Animator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Animator */ "./src/utils/Animator.ts");
/* harmony import */ var _utils_Animation_AnimationAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/Animation/AnimationAction */ "./src/utils/Animation/AnimationAction.ts");
/* harmony import */ var _utils_Animation_FCurve__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/Animation/FCurve */ "./src/utils/Animation/FCurve.ts");
/* harmony import */ var _utils_Animation_FCurveGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/Animation/FCurveGroup */ "./src/utils/Animation/FCurveGroup.ts");
/* harmony import */ var _utils_Animation_FCurveKeyFrame__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/Animation/FCurveKeyFrame */ "./src/utils/Animation/FCurveKeyFrame.ts");
/* harmony import */ var _utils_Background__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/Background */ "./src/utils/Background/index.ts");
/* harmony import */ var _utils_BlenderConnector__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/BlenderConnector */ "./src/utils/BlenderConnector/index.ts");
/* harmony import */ var _utils_Pointer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./utils/Pointer */ "./src/utils/Pointer.ts");
/* harmony import */ var _utils_DOMMesh__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils/DOMMesh */ "./src/utils/DOMMesh/index.ts");
/* harmony import */ var _utils_Easings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./utils/Easings */ "./src/utils/Easings.ts");
/* harmony import */ var _utils_EventDispatcher__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/EventDispatcher */ "./src/utils/EventDispatcher.ts");
/* harmony import */ var _utils_GPUComputationController__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/GPUComputationController */ "./src/utils/GPUComputationController/index.ts");
/* harmony import */ var _utils_MouseRotator__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils/MouseRotator */ "./src/utils/MouseRotator.ts");
/* harmony import */ var _utils_PostProcessing__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./utils/PostProcessing */ "./src/utils/PostProcessing/index.ts");
/* harmony import */ var _utils_PageScroller__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./utils/PageScroller */ "./src/utils/PageScroller/index.ts");
/* harmony import */ var _utils_PageScroller_PageScrollerSection__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./utils/PageScroller/PageScrollerSection */ "./src/utils/PageScroller/PageScrollerSection.ts");
/* harmony import */ var _utils_LayoutController__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./utils/LayoutController */ "./src/utils/LayoutController.ts");
/* harmony import */ var _utils_TimelineAnimator__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./utils/TimelineAnimator */ "./src/utils/TimelineAnimator.ts");
/* harmony import */ var _utils_Uniforms__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./utils/Uniforms */ "./src/utils/Uniforms.ts");
/* harmony import */ var _utils_Lerps__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./utils/Lerps */ "./src/utils/Lerps.ts");
/* harmony import */ var _utils_WaitMan__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./utils/WaitMan */ "./src/utils/WaitMan.ts");
























})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFNBQVMsRUFLSjtBQUNMLENBQUMsb0RBQW9EOzs7Ozs7Ozs7Ozs7QUNyZXJEOzs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDQztBQUVEO0FBQ2dCO0FBQ1Q7QUFDSztBQUNHO0FBQ2I7QUFDTTtBQUNUO0FBQ0E7QUFDQTtBQUNRO0FBQ1M7QUFDWjtBQUNFO0FBQ0Y7QUFDb0I7QUFDaEI7QUFDQTtBQUNSO0FBQ0g7QUFDRSIsInNvdXJjZXMiOlsid2VicGFjazovL09SRS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JhY2tncm91bmQvc2hhZGVycy9iYWNrZ3JvdW5kLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9ET01NZXNoL2RvbU1lc2gudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9zaGFkZXJzL3Bhc3NUaHJvdWdoLmZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvc2hhZGVycy9wYXNzVGhyb3VnaC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9zdFByb2Nlc3Npbmcvc2hhZGVycy9wYXNzVGhyb3cudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2NvcmUvQmFzZUxheWVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy9jb3JlL0NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb24udHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmUudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmFja2dyb3VuZC9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmV6aWVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CbGVuZGVyQ29ubmVjdG9yL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9ET01NZXNoL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9FYXNpbmdzLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9FdmVudERpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGF5b3V0Q29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGVycHMudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL01vdXNlUm90YXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUGFnZVNjcm9sbGVyL1BhZ2VTY3JvbGxlclNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BhZ2VTY3JvbGxlci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9pbnRlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9zdFByb2Nlc3NpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1RpbWVsaW5lQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1VuaWZvcm1zLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9XYWl0TWFuLnRzIiwid2VicGFjazovL09SRS8uLi8uLi9ub2RlX21vZHVsZXMvd29sZnk4Ny1ldmVudGVtaXR0ZXIvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovL09SRS9leHRlcm5hbCB1bWQge1wiY29tbW9uanNcIjpcInRocmVlXCIsXCJjb21tb25qczJcIjpcInRocmVlXCIsXCJhbWRcIjpcInRocmVlXCIsXCJyb290XCI6XCJUSFJFRVwifSIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInRocmVlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInRocmVlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9SRVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInRocmVlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJPUkVcIl0gPSBmYWN0b3J5KHJvb3RbXCJUSFJFRVwiXSk7XG59KSh0aGlzLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudmFyeWluZyB2ZWM0IHZDb2xvcjtcXG5cXG52b2lkIG1haW4oIHZvaWQgKSB7XFxuICAgIFxcbiAgICB2ZWMzIHBvcyA9IHBvc2l0aW9uO1xcblxcbiAgICBwb3MueiA9IDEuMDtcXG4gICAgXFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zLCAxLjAgKTtcXG4gICAgXFxuICAgIHZVdiA9IHV2O1xcbiAgICB2Q29sb3IgPSB2ZWM0KCAxLjAgKTtcXG5cXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudW5pZm9ybSB2ZWMyIGRvbVBvcztcXG51bmlmb3JtIHZlYzIgZG9tU2l6ZTtcXG51bmlmb3JtIHZlYzIgd2luZG93U2l6ZTtcXG51bmlmb3JtIGZsb2F0IGFzcGVjdFJhdGlvO1xcblxcbnZvaWQgbWFpbiggIClcXG57XFxuICBmbG9hdCB3aWR0aCA9IGRvbVNpemUueCAvIHdpbmRvd1NpemUueDtcXG5cXG4gIC8v5bem5LiKKCAwLDAgKeOBq1xcbiAgdmVjMyBwb3MgPSBwb3NpdGlvbiArIHZlYzMoIDEuMCwtMS4wLDAuMCApO1xcblxcbiAgLy9zaXplXFxuICBwb3MueCAqPSB3aWR0aDtcXG4gIHBvcy55ICo9ICggd2lkdGggKiBhc3BlY3RSYXRpbyApICogKCBkb21TaXplLnkgLyBkb21TaXplLnggKTtcXG5cXG4gIHBvcyArPSB2ZWMzKCAtMS4wLCAxLjAsIDAuMCApO1xcblxcbiAgcG9zICs9IHZlYzMoIGRvbVBvcy54IC8gd2luZG93U2l6ZS54ICogMi4wLCAtZG9tUG9zLnkgLyB3aW5kb3dTaXplLnkgKiAyLjAsIDAuMCApO1xcblxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3MsIDEuMCApO1xcbiAgdlV2ID0gdXY7XFxufVxcblwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXg7XFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXgsdlV2KTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXG4gICAgdlV2ID0gdXY7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZvaWQgbWFpbigpIHtcXG4gICAgdlV2ID0gdXY7XFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1xcbn0gICBcIjsiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vdXRpbHMvVW5pZm9ybXMnO1xuaW1wb3J0IHsgUG9pbnRlckV2ZW50QXJncyB9IGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllckJpbmRQYXJhbSBleHRlbmRzIFRIUkVFLldlYkdMUmVuZGVyZXJQYXJhbWV0ZXJzIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudDtcblx0YXNwZWN0U2V0dGluZz86IEFzcGVjdFNldHRpbmc7XG5cdHdyYXBwZXJFbGVtZW50PzogSFRNTEVsZW1lbnQgfCBudWxsO1xuXHR3cmFwcGVyRWxlbWVudFJlY3Q/OiBET01SZWN0IHwgbnVsbDtcblx0cGl4ZWxSYXRpbz86IG51bWJlclxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJJbmZvIGV4dGVuZHMgTGF5ZXJCaW5kUGFyYW0ge1xuXHRzaXplOiBMYXllclNpemU7XG5cdGFzcGVjdFNldHRpbmc6IEFzcGVjdFNldHRpbmc7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllclNpemUge1xuXHRjYW52YXNBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHR3aW5kb3dTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHRjYW52YXNTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRjYW52YXNQaXhlbFNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHBpeGVsUmF0aW86IG51bWJlclxuXHRwb3J0cmFpdFdlaWdodDogbnVtYmVyO1xuXHR3aWRlV2VpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBc3BlY3RTZXR0aW5nIHtcblx0bWFpbkFzcGVjdDogbnVtYmVyO1xuXHRwb3J0cmFpdEFzcGVjdDogbnVtYmVyO1xuXHR3aWRlQXNwZWN0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUb3VjaEV2ZW50QXJncyB7XG5cdGV2ZW50OiBQb2ludGVyRXZlbnQgfCBUb3VjaEV2ZW50O1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0ZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cdHNjcmVlblBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dQb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VMYXllciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIGluZm86IExheWVySW5mbztcblxuXHRwdWJsaWMgcmVuZGVyZXI/OiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXG5cdHB1YmxpYyBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHB1YmxpYyBjYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG5cdHByb3RlY3RlZCByZWFkeUFuaW1hdGUgPSBmYWxzZTtcblx0cHVibGljIHRpbWUgPSAwO1xuXHRwdWJsaWMgY29tbW9uVW5pZm9ybXM6IFVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuaW5mbyA9IHtcblx0XHRcdG5hbWU6ICcnLFxuXHRcdFx0YXNwZWN0U2V0dGluZzoge1xuXHRcdFx0XHRtYWluQXNwZWN0OiAxNiAvIDksXG5cdFx0XHRcdHdpZGVBc3BlY3Q6IDEwIC8gMSxcblx0XHRcdFx0cG9ydHJhaXRBc3BlY3Q6IDEgLyAyLFxuXHRcdFx0fSxcblx0XHRcdHNpemU6IHtcblx0XHRcdFx0d2luZG93U2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0d2luZG93QXNwZWN0UmF0aW86IDEuMCxcblx0XHRcdFx0Y2FudmFzU2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0Y2FudmFzUGl4ZWxTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRjYW52YXNBc3BlY3RSYXRpbzogMS4wLFxuXHRcdFx0XHRwaXhlbFJhdGlvOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcblx0XHRcdFx0cG9ydHJhaXRXZWlnaHQ6IDAuMCxcblx0XHRcdFx0d2lkZVdlaWdodDogMC4wXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuY29tbW9uVW5pZm9ybXMgPSB7XG5cdFx0XHR0aW1lOiB7XG5cdFx0XHRcdHZhbHVlOiAwXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSggNTAsIDEsIDAuMSwgMTAwMCApO1xuXG5cdH1cblxuXHRwdWJsaWMgdGljayggZGVsdGFUaW1lOiBudW1iZXIgKSB7XG5cblx0XHR0aGlzLnRpbWUgKz0gZGVsdGFUaW1lO1xuXG5cdFx0dGhpcy5jb21tb25Vbmlmb3Jtcy50aW1lLnZhbHVlID0gdGhpcy50aW1lO1xuXG5cdFx0aWYgKCB0aGlzLnJlYWR5QW5pbWF0ZSApIHtcblxuXHRcdFx0dGhpcy5hbmltYXRlKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGFuaW1hdGUoIGRlbHRhVGltZTogbnVtYmVyICkgeyB9XG5cblx0cHVibGljIG9uQmluZCggbGF5ZXJJbmZvOiBMYXllckJpbmRQYXJhbSApIHtcblxuXHRcdHRoaXMuaW5mby5uYW1lID0gbGF5ZXJJbmZvLm5hbWU7XG5cdFx0dGhpcy5pbmZvLmNhbnZhcyA9IGxheWVySW5mby5jYW52YXM7XG5cblx0XHRpZiAoIGxheWVySW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5zZXRXcmFwcGVyRWxlbWVudCggbGF5ZXJJbmZvLndyYXBwZXJFbGVtZW50IHx8IG51bGwsIGZhbHNlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLmluZm8uYXNwZWN0U2V0dGluZyA9IGxheWVySW5mby5hc3BlY3RTZXR0aW5nIHx8IHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nO1xuXHRcdHRoaXMuaW5mby5hbHBoYSA9IGxheWVySW5mby5hbHBoYTtcblx0XHR0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvID0gbGF5ZXJJbmZvLnBpeGVsUmF0aW8gfHwgdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbztcblxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciggdGhpcy5pbmZvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyA9IHRydWU7XG5cblx0XHR0aGlzLmluZm8uY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHR0aGlzLm9uUmVzaXplKCk7XG5cdFx0XHR0aGlzLnJlYWR5QW5pbWF0ZSA9IHRydWU7XG5cblx0XHR9LCAwICk7XG5cblx0fVxuXG5cdHB1YmxpYyBvblVuYmluZCgpIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ2Rpc3Bvc2UnXG5cdFx0fSApO1xuXG5cdFx0dGhpcy5yZW1vdmVDaGlsZHJlbnMoIHRoaXMuc2NlbmUgKTtcblxuXHRcdHRoaXMucmVhZHlBbmltYXRlID0gZmFsc2U7XG5cblx0fVxuXG5cdHByb3RlY3RlZCByZW1vdmVDaGlsZHJlbnMoIG9iamVjdDogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHRjb25zdCBsZW5ndGggPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoO1xuXG5cdFx0Zm9yICggbGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdHRoaXMucmVtb3ZlQ2hpbGRyZW5zKCBvYmplY3QuY2hpbGRyZW5bIGkgXSApO1xuXG5cdFx0XHRsZXQgZ2VvOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCBtYXQ6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLmlzTWVzaCApIHtcblxuXHRcdFx0XHRnZW8gPSAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5nZW9tZXRyeTtcblx0XHRcdFx0bWF0ID0gKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdG9iamVjdC5yZW1vdmUoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gKSApO1xuXG5cdFx0XHRpZiAoIGdlbyApIHtcblxuXHRcdFx0XHRnZW8uZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggbWF0ICkge1xuXG5cdFx0XHRcdG1hdC5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFdyYXBwZXJFbGVtZW50KCB3cmFwcGVyRWxtOiBIVE1MRWxlbWVudCB8IG51bGwsIGRpc3BhdGNoUmVzaXplOiBib29sZWFuID0gdHJ1ZSApIHtcblxuXHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCA9IHdyYXBwZXJFbG07XG5cdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHdyYXBwZXJFbG0gPyB3cmFwcGVyRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogbnVsbDtcblxuXHRcdGlmICggZGlzcGF0Y2hSZXNpemUgKSB7XG5cblx0XHRcdHRoaXMub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIG9uUmVzaXplKCkge1xuXG5cdFx0aWYgKCB0aGlzLnJlbmRlcmVyID09IG51bGwgKSByZXR1cm47XG5cblx0XHRjb25zdCBuZXdXaW5kb3dTaXplID0gbmV3IFRIUkVFLlZlY3RvcjIoIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRcdGNvbnN0IG5ld0NhbnZhc1NpemUgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuc2V0KCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5jbGllbnRIZWlnaHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuY29weSggbmV3V2luZG93U2l6ZSApO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHBvcnRyYWl0V2VpZ2h0ID0gMS4wIC0gKCAoIG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueSApIC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcucG9ydHJhaXRBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLnBvcnRyYWl0QXNwZWN0ICk7XG5cdFx0cG9ydHJhaXRXZWlnaHQgPSBNYXRoLm1pbiggMS4wLCBNYXRoLm1heCggMC4wLCBwb3J0cmFpdFdlaWdodCApICk7XG5cblx0XHRsZXQgd2lkZVdlaWdodCA9IDEuMCAtICggKCBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnkgKSAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKTtcblx0XHR3aWRlV2VpZ2h0ID0gTWF0aC5taW4oIDEuMCwgTWF0aC5tYXgoIDAuMCwgd2lkZVdlaWdodCApICk7XG5cblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dTaXplLmNvcHkoIG5ld1dpbmRvd1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dBc3BlY3RSYXRpbyA9IG5ld1dpbmRvd1NpemUueCAvIG5ld1dpbmRvd1NpemUueTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLmNvcHkoIG5ld0NhbnZhc1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNQaXhlbFNpemUuY29weSggbmV3Q2FudmFzU2l6ZS5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKSApICk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzQXNwZWN0UmF0aW8gPSBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnk7XG5cdFx0dGhpcy5pbmZvLnNpemUucG9ydHJhaXRXZWlnaHQgPSBwb3J0cmFpdFdlaWdodDtcblx0XHR0aGlzLmluZm8uc2l6ZS53aWRlV2VpZ2h0ID0gd2lkZVdlaWdodDtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS54LCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLnkgKTtcblx0XHR0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmluZm8uc2l6ZS5jYW52YXNBc3BlY3RSYXRpbztcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHBvaW50ZXJFdmVudCggZTogUG9pbnRlckV2ZW50QXJncyApIHtcblxuXHRcdGNvbnN0IGNhbnZhc1BvaW50ZXJQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdGNhbnZhc1BvaW50ZXJQb3MuY29weSggZS5wb3NpdGlvbiApO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8uY2FudmFzICkge1xuXG5cdFx0XHRjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5pbmZvLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNhbnZhc1BvaW50ZXJQb3Muc3ViKCBuZXcgVEhSRUUuVmVjdG9yMiggY2FudmFzUmVjdC54LCBjYW52YXNSZWN0LnkgKSApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSBjYW52YXNQb2ludGVyUG9zLmNsb25lKCk7XG5cdFx0c2NyZWVuUG9zaXRpb24uZGl2aWRlKCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplICk7XG5cdFx0c2NyZWVuUG9zaXRpb24ueSA9IDEuMCAtIHNjcmVlblBvc2l0aW9uLnk7XG5cdFx0c2NyZWVuUG9zaXRpb24ubXVsdGlwbHlTY2FsYXIoIDIuMCApLnN1YlNjYWxhciggMS4wICk7XG5cblxuXHRcdGNvbnN0IGFyZ3M6IFRvdWNoRXZlbnRBcmdzID0ge1xuXHRcdFx0ZXZlbnQ6IGUucG9pbnRlckV2ZW50LFxuXHRcdFx0cG9zaXRpb246IGNhbnZhc1BvaW50ZXJQb3MuY2xvbmUoKSxcblx0XHRcdGRlbHRhOiBlLmRlbHRhLmNsb25lKCksXG5cdFx0XHRzY3JlZW5Qb3NpdGlvbjogc2NyZWVuUG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdHdpbmRvd1Bvc2l0aW9uOiBlLnBvc2l0aW9uLmNsb25lKClcblx0XHR9O1xuXG5cdFx0aWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ2hvdmVyJyApIHtcblxuXHRcdFx0dGhpcy5vbkhvdmVyKCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ3N0YXJ0JyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoU3RhcnQoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnbW92ZScgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaE1vdmUoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnZW5kJyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoRW5kKCBhcmdzICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBvblRvdWNoU3RhcnQoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uVG91Y2hNb3ZlKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvblRvdWNoRW5kKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbkhvdmVyKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbldoZWVsKCBldmVudDogV2hlZWxFdmVudCwgdHJhY2twYWREZWx0YTogbnVtYmVyICkgeyB9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFBvaW50ZXIgfSBmcm9tICcuLi91dGlscy9Qb2ludGVyJztcbmltcG9ydCB7IEJhc2VMYXllciwgTGF5ZXJCaW5kUGFyYW0gfSBmcm9tICcuL0Jhc2VMYXllcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQb2ludGVyRXZlbnRBcmdzIHtcblx0cG9pbnRlckV2ZW50OiBQb2ludGVyRXZlbnQ7XG5cdHBvaW50ZXJFdmVudFR5cGU6IHN0cmluZztcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQ29udHJvbGxlclBhcmFtIHtcblx0c2lsZW50PzogYm9vbGVhbjtcblx0cG9pbnRlckV2ZW50RWxlbWVudD86IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIHBvaW50ZXI6IFBvaW50ZXI7XG5cdHB1YmxpYyBjbG9jazogVEhSRUUuQ2xvY2s7XG5cblx0cHJvdGVjdGVkIGxheWVyczogQmFzZUxheWVyW10gPSBbXTtcblx0cHJvdGVjdGVkIHBvaW50ZXJFdmVudEVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggcGFyYW1ldGVyPzogQ29udHJvbGxlclBhcmFtICkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdGlmICggISAoIHBhcmFtZXRlciAmJiBwYXJhbWV0ZXIuc2lsZW50ICkgKSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCBcIiVjLSBvcmUtdGhyZWUgXCIgKyByZXF1aXJlKCBcIi4uLy4uL3BhY2thZ2UuanNvblwiICkudmVyc2lvbiArIFwiIC1cIiAsICdwYWRkaW5nOiA1cHggMTBweCA7YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IGNvbG9yOiB3aGl0ZTtmb250LXNpemU6MTFweCcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0UG9pbnRlclxuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5wb2ludGVyID0gbmV3IFBvaW50ZXIoKTtcblx0XHR0aGlzLnNldFBvaW50ZXJFdmVudEVsZW1lbnQoICggcGFyYW1ldGVyICYmIHBhcmFtZXRlci5wb2ludGVyRXZlbnRFbGVtZW50ICkgfHwgZG9jdW1lbnQuYm9keSApO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRFdmVudHNcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBwb2ludGVyVXBkYXRlID0gdGhpcy5wb2ludGVyRXZlbnQuYmluZCggdGhpcyApO1xuXHRcdGxldCBwb2ludGVyV2hlZWwgPSB0aGlzLm9uV2hlZWwuYmluZCggdGhpcyApO1xuXHRcdGxldCBvcmllbnRhdGlvbmNoYW5nZSA9IHRoaXMub25PcmllbnRhdGlvbkRldmljZS5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IHdpbmRvd1Jlc2l6ZSA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApO1xuXG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd1cGRhdGUnLCBwb2ludGVyVXBkYXRlICk7XG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd3aGVlbCcsIHBvaW50ZXJXaGVlbCApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgd2luZG93UmVzaXplICk7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdkaXNwb3NlJywgKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VwZGF0ZScsIHBvaW50ZXJVcGRhdGUgKTtcblx0XHRcdHRoaXMucG9pbnRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBwb2ludGVyV2hlZWwgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB3aW5kb3dSZXNpemUgKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMudGljaygpO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdGljaygpIHtcblxuXHRcdGNvbnN0IGRlbHRhVGltZSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcblxuXHRcdHRoaXMucG9pbnRlci51cGRhdGUoKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS50aWNrKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy50aWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25XaW5kb3dSZXNpemUoKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uT3JpZW50YXRpb25EZXZpY2UoKSB7XG5cblx0XHR0aGlzLm9uV2luZG93UmVzaXplKCk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBwb2ludGVyRXZlbnQoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLnBvaW50ZXJFdmVudCggZSBhcyB1bmtub3duIGFzIFBvaW50ZXJFdmVudEFyZ3MgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uV2hlZWwoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLm9uV2hlZWwoIGUud2hlZWxFdmVudCwgZS50cmFja3BhZERlbHRhICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFQSVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgYWRkTGF5ZXIoIGxheWVyOiBCYXNlTGF5ZXIsIGxheWVySW5mbzogTGF5ZXJCaW5kUGFyYW0gKSB7XG5cblx0XHR3aGlsZSAoIHRoaXMuZ2V0TGF5ZXIoIGxheWVySW5mby5uYW1lICkgKSB7XG5cblx0XHRcdGxheWVySW5mby5uYW1lICs9ICdfJztcblxuXHRcdH1cblxuXHRcdHRoaXMubGF5ZXJzLnB1c2goIGxheWVyICk7XG5cblx0XHRsYXllci5vbkJpbmQoIGxheWVySW5mbyApO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0TGF5ZXIoIGxheWVyTmFtZTogc3RyaW5nICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIHRoaXMubGF5ZXJzWyBpIF0uaW5mby5uYW1lID09IGxheWVyTmFtZSApIHJldHVybiB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0fVxuXG5cdHB1YmxpYyByZW1vdmVMYXllciggbGF5ZXJObWFlOiBzdHJpbmcgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IHRoaXMubGF5ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0Y29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0XHRpZiAoIGxheWVyLmluZm8ubmFtZSA9PSBsYXllck5tYWUgKSB7XG5cblx0XHRcdFx0bGF5ZXIub25VbmJpbmQoKTtcblxuXHRcdFx0XHR0aGlzLmxheWVycy5zcGxpY2UoIGksIDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0UG9pbnRlckV2ZW50RWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGlmICggdGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIudW5yZWdpc3RlckVsZW1lbnQoIHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5wb2ludGVyLnJlZ2lzdGVyRWxlbWVudCggZWxtICk7XG5cblx0XHR0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgPSBlbG07XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xuXG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCggaXRlbSA9PiB7XG5cblx0XHRcdHRoaXMucmVtb3ZlTGF5ZXIoIGl0ZW0uaW5mby5uYW1lICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLnRpY2sgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH07XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc3Bvc2UnIH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5pbXBvcnQgeyBGQ3VydmVHcm91cCB9IGZyb20gJy4vRkN1cnZlR3JvdXAnO1xyXG5cclxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uRnJhbWVJbmZvID0ge1xyXG5cdHN0YXJ0OiBudW1iZXJcclxuXHRlbmQ6IG51bWJlclxyXG5cdGR1cmF0aW9uOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkFjdGlvbiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlczoge1trZXk6c3RyaW5nXTpGQ3VydmVHcm91cH0gPSB7fTtcclxuXHRwcml2YXRlIHVuaWZvcm1zOiBVbmlmb3JtcztcclxuXHRcclxuXHRwdWJsaWMgZnJhbWU6IEFuaW1hdGlvbkZyYW1lSW5mbztcclxuXHJcblx0Y29uc3RydWN0b3IoIG5hbWU/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xyXG5cdFx0dGhpcy51bmlmb3JtcyA9IHt9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWUgPSB7XHJcblx0XHRcdHN0YXJ0OiAwLFxyXG5cdFx0XHRlbmQ6IDAsXHJcblx0XHRcdGR1cmF0aW9uOiAwLFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkRmN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmY3VydmVHcm91cDogRkN1cnZlR3JvdXAgKSB7XHJcblxyXG5cdFx0dGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdID0gZmN1cnZlR3JvdXA7XHJcblxyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVtb3ZlRkN1cnZlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY2FsY0ZyYW1lKCkge1xyXG5cclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZXMgKVxyXG5cclxuXHRcdGxldCBtaW5TdGFydCA9IEluZmluaXR5XHJcblx0XHRsZXQgbWF4RW5kID0gLUluZmluaXR5XHJcblx0XHRcclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZSA9ICh0aGlzLmN1cnZlcylbIGN1cnZlS2V5c1sgaSBdIF07XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVTdGFydCA8IG1pblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHRtaW5TdGFydCA9IGN1cnZlLmZyYW1lU3RhcnQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZUVuZCA+IG1heEVuZCApIHtcclxuXHJcblx0XHRcdFx0bWF4RW5kID0gY3VydmUuZnJhbWVFbmQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIG1pblN0YXJ0ID09IC1JbmZpbml0eSB8fCBtYXhFbmQgPT0gSW5maW5pdHkpIHtcclxuXHJcblx0XHRcdG1pblN0YXJ0ID0gMDtcclxuXHRcdFx0bWF4RW5kID0gMVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZyYW1lLnN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lLmVuZCA9IG1heEVuZDtcclxuXHRcdHRoaXMuZnJhbWUuZHVyYXRpb24gPSB0aGlzLmZyYW1lLmVuZCAtIHRoaXMuZnJhbWUuc3RhcnQ7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBGQ3VydmVHcm91cCB8IG51bGwge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF0gfHwgbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGdldCB2YWx1ZXNcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGFzc2lnblVuaWZvcm1zKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdW5pZm9ybTogVEhSRUUuSVVuaWZvcm0gKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmlmb3JtO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRVbmlmb3JtczxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVEhSRUUuSVVuaWZvcm08VD4gfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdICkge1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IGN1cnZlR3JvdXAgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKHByb3BlcnR5TmFtZSlcclxuXHJcblx0XHRpZiggY3VydmVHcm91cCApIHtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB1bmkgPSB7XHJcblx0XHRcdFx0dmFsdWU6IGN1cnZlR3JvdXAuY3JlYXRlSW5pdFZhbHVlKCkgYXMgVFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdW5pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVCB8IG51bGw7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciA+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0OiBUICk6IFQ7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgdW5pZm9ybSA9IHRoaXMuZ2V0VW5pZm9ybXMocHJvcGVydHlOYW1lKTtcclxuXHJcblx0XHRpZiggIXVuaWZvcm0gKSByZXR1cm4gdGFyZ2V0IHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHZhbHVlID0gdW5pZm9ybS52YWx1ZTtcclxuXHRcdFxyXG5cdFx0aWYoICF0YXJnZXQgKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0aWYoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdHRhcmdldC54ID0gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXQueCA9IHZhbHVlLng7XHJcblx0XHR0YXJnZXQueSA9IHZhbHVlLnk7XHJcblxyXG5cdFx0aWYoICd6JyBpbiB0YXJnZXQgJiYgJ3onIGluIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LnogPSB2YWx1ZS56XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCAndycgaW4gdGFyZ2V0ICYmICd3JyBpbiB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRhcmdldC53ID0gdmFsdWUud1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRhcmdldCB8fCBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0PFQgZXh0ZW5kcyBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciApOiBUIHwgbnVsbDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWVBdDxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIsIHRhcmdldDogVCApOiBUO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciwgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgY3VydmUgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWUgKTtcclxuXHJcblx0XHRpZiggdGFyZ2V0ICkgIHtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSByZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGN1cnZlLmdldFZhbHVlKCBmcmFtZSB8fCAwLCB0YXJnZXQgKVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgcmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiBjdXJ2ZS5nZXRWYWx1ZSggZnJhbWUgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRVcGRhdGVGcmFtZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cdFxyXG5cdHB1YmxpYyB1cGRhdGVGcmFtZSggZnJhbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cCA9IHRoaXMuY3VydmVzWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cdFx0XHRsZXQgdW5pID0gdGhpcy5nZXRVbmlmb3JtcyggY3VydmVLZXlzWyBpIF0gKTtcclxuXHJcblx0XHRcdGlmKCAhdW5pICkgY29udGludWU7XHJcblxyXG5cdFx0XHRpZiggdHlwZW9mIHVuaS52YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdFx0dW5pLnZhbHVlID0gZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUpIHx8IDBcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0ZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUsIHVuaS52YWx1ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlJywgW3RoaXNdICk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEZDdXJ2ZUtleUZyYW1lIH0gZnJvbSAnLi9GQ3VydmVLZXlGcmFtZSc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMga2V5ZnJhbWVzOiBGQ3VydmVLZXlGcmFtZVtdID0gW107XHJcblxyXG5cdHByaXZhdGUgY2FjaGU6IHsgZnJhbWU6IG51bWJlciwgdmFsdWU6IG51bWJlciB9ID0geyBmcmFtZTogTmFOLCB2YWx1ZTogTmFOIH07XHJcblxyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRHVyYXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXQoIGZyYW1lcyApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0aWYgKCBmcmFtZXMgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmtleWZyYW1lcy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdFx0ZnJhbWVzLmZvckVhY2goIGtleWZyYW1lID0+IHtcclxuXHJcblx0XHRcdFx0dGhpcy5hZGRLZXlGcmFtZSgga2V5ZnJhbWUgKTtcclxuXHJcblx0XHRcdH0gKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZEtleUZyYW1lKCBrZXlmcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0bGV0IGluZGV4ID0gMDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmtleWZyYW1lcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgZnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSBdO1xyXG5cclxuXHRcdFx0aWYgKCBmcmFtZS5jb29yZGluYXRlLnggPCBrZXlmcmFtZS5jb29yZGluYXRlLnggKSB7XHJcblxyXG5cdFx0XHRcdGluZGV4ICsrO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMua2V5ZnJhbWVzLnNwbGljZSggaW5kZXgsIDAsIGtleWZyYW1lICk7XHJcblxyXG5cdFx0Ly8gc2V0IGZyYW1lIGluZm9cclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gdGhpcy5rZXlmcmFtZXNbMF0uY29vcmRpbmF0ZS54XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gdGhpcy5rZXlmcmFtZXNbdGhpcy5rZXlmcmFtZXMubGVuZ3RoIC0gMV0uY29vcmRpbmF0ZS54XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggZnJhbWUgPT0gdGhpcy5jYWNoZS5mcmFtZSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLnZhbHVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMua2V5ZnJhbWVzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBrZXlmcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIF07XHJcblxyXG5cdFx0XHRpZiAoIGZyYW1lIDw9IGtleWZyYW1lLmNvb3JkaW5hdGUueCApIHtcclxuXHJcblx0XHRcdFx0bGV0IGJlZm9yZUtleUZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgLSAxIF07XHJcblxyXG5cdFx0XHRcdGlmICggYmVmb3JlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBiZWZvcmVLZXlGcmFtZS50bygga2V5ZnJhbWUsIGZyYW1lICk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBrZXlmcmFtZS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgPT09IG51bGwgJiYgdGhpcy5rZXlmcmFtZXMubGVuZ3RoID4gMCApIHtcclxuXHJcblx0XHRcdHZhbHVlID0gdGhpcy5rZXlmcmFtZXNbIHRoaXMua2V5ZnJhbWVzLmxlbmd0aCAtIDEgXS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhY2hlID0ge1xyXG5cdFx0XHRcdGZyYW1lOiBmcmFtZSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRkN1cnZlLCBGQ3VydmVBeGlzIH0gZnJvbSAnLi9GQ3VydmUnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlR3JvdXBUeXBlID0gJ3NjYWxhcicgfCAndmVjMicgfCAndmVjMycgfCAndmVjNCdcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmVHcm91cCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlOiB7W2F4aXMgaW4gRkN1cnZlQXhpc106IEZDdXJ2ZSB8IG51bGx9O1xyXG5cdHB1YmxpYyB0eXBlOiBGQ3VydmVHcm91cFR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVEdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggbmFtZT86IHN0cmluZywgeD86IEZDdXJ2ZSwgeT86IEZDdXJ2ZSwgej86IEZDdXJ2ZSwgdz86IEZDdXJ2ZSwgc2NhbGFyPzogRkN1cnZlICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gbmFtZSB8fCAnJztcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jdXJ2ZSA9IHtcclxuXHRcdFx0eDogbnVsbCxcclxuXHRcdFx0eTogbnVsbCxcclxuXHRcdFx0ejogbnVsbCxcclxuXHRcdFx0dzogbnVsbCxcclxuXHRcdFx0c2NhbGFyOiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmKCB4ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHgsICd4JyApXHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiggeSApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB5LCAneScgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIHogKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeiwgJ3onIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIHcgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggdywgJ3cnIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEZDdXJ2ZSggY3VydmU6IEZDdXJ2ZSwgYXhpczogRkN1cnZlQXhpcyApIHtcclxuXHJcblx0XHR0aGlzLmN1cnZlWyBheGlzIF0gPSBjdXJ2ZTtcclxuXHJcblx0XHR0aGlzLmNhbGNUeXBlKCk7XHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYWxjVHlwZSgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY3VydmUuc2NhbGFyICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5jdXJ2ZS53ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzQnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueiApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWMzJztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjMic7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS54ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBjYWxjRnJhbWUoKSB7XHJcblx0XHRcclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZSApXHJcblxyXG5cdFx0bGV0IG1pblN0YXJ0ID0gSW5maW5pdHlcclxuXHRcdGxldCBtYXhFbmQgPSAtSW5maW5pdHlcclxuXHRcdFxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlID0gKHRoaXMuY3VydmUgYXMge1trZXk6IHN0cmluZ106IEZDdXJ2ZX0pWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lU3RhcnQgPCBtaW5TdGFydCApIHtcclxuXHJcblx0XHRcdFx0bWluU3RhcnQgPSBjdXJ2ZS5mcmFtZVN0YXJ0O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVFbmQgPiBtYXhFbmQgKSB7XHJcblxyXG5cdFx0XHRcdG1heEVuZCA9IGN1cnZlLmZyYW1lRW5kO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBtaW5TdGFydCA9PSAtSW5maW5pdHkgfHwgbWF4RW5kID09IEluZmluaXR5KSB7XHJcblxyXG5cdFx0XHRtaW5TdGFydCA9IDA7XHJcblx0XHRcdG1heEVuZCA9IDFcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gbWF4RW5kO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gdGhpcy5mcmFtZUVuZCAtIHRoaXMuZnJhbWVTdGFydDtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY3JlYXRlSW5pdFZhbHVlKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy50eXBlID09ICd2ZWMyJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMigpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PSAndmVjMycgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzQnICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3I0KCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ6IFQgKTogVDtcclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICk6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ/OiBUKTogVCB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGlmKCB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnggPSB0aGlzLmN1cnZlLnguZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueSApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnkgPSB0aGlzLmN1cnZlLnkuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueiAmJiAneicgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueiA9IHRoaXMuY3VydmUuei5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS53ICAmJiAndycgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQudyA9IHRoaXMuY3VydmUudy5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS5zY2FsYXIgKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiAgdGhpcy5jdXJ2ZS5zY2FsYXIuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYywgRWFzaW5ncyB9IGZyb20gJy4uL0Vhc2luZ3MnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlSW50ZXJwb2xhdGlvbiA9IFwiQkVaSUVSXCIgfCBcIkxJTkVBUlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZUtleUZyYW1lIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaGFuZGxlTGVmdDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBoYW5kbGVSaWdodDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBpbnRlcnBvbGF0aW9uOiBGQ3VydmVJbnRlcnBvbGF0aW9uID0gJ0JFWklFUic7XHJcblxyXG5cdHByaXZhdGUgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCA9IG51bGw7XHJcblx0cHJpdmF0ZSBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBjb29yZGluYXRlOiBUSFJFRS5WZWMyLCBoYW5kbGVMZWZ0PzogVEhSRUUuVmVjMiwgaGFuZGxlUmlnaHQ/OiBUSFJFRS5WZWMyLCBpbnRlcnBvbGF0aW9uPzogRkN1cnZlSW50ZXJwb2xhdGlvbiApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuc2V0KCBjb29yZGluYXRlLCBoYW5kbGVMZWZ0LCBoYW5kbGVSaWdodCwgaW50ZXJwb2xhdGlvbiApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIsIGhhbmRsZUxlZnQ/OiBUSFJFRS5WZWMyLCBoYW5kbGVSaWdodD86IFRIUkVFLlZlYzIsIGludGVycG9sYXRpb24/OiBGQ3VydmVJbnRlcnBvbGF0aW9uICkge1xyXG5cclxuXHRcdHRoaXMuY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZUxlZnQgPSBoYW5kbGVMZWZ0IHx8IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZVJpZ2h0ID0gaGFuZGxlUmlnaHQgfHwgY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaW50ZXJwb2xhdGlvbiA9IGludGVycG9sYXRpb24gfHwgJ0JFWklFUic7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRFYXNpbmcoIGludGVycG9sYXRpb246IEZDdXJ2ZUludGVycG9sYXRpb24sIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0aWYgKCBpbnRlcnBvbGF0aW9uID09ICdCRVpJRVInICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIEVhc2luZ3MuYmV6aWVyKCB0aGlzLmNvb3JkaW5hdGUsIHRoaXMuaGFuZGxlUmlnaHQsIG5leHRGcmFtZS5oYW5kbGVMZWZ0LCBuZXh0RnJhbWUuY29vcmRpbmF0ZSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCB0OiBudW1iZXIgKSA9PiB7XHJcblxyXG5cdFx0XHRcdGxldCBkID0gKCBuZXh0RnJhbWUuY29vcmRpbmF0ZS55IC0gdGhpcy5jb29yZGluYXRlLnkgKTtcclxuXHRcdFx0XHR0ID0gKCB0IC0gdGhpcy5jb29yZGluYXRlLnggKSAvICggbmV4dEZyYW1lLmNvb3JkaW5hdGUueCAtIHRoaXMuY29vcmRpbmF0ZS54ICk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGUueSArIHQgKiBkO1xyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHRvKCBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lLCB0OiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm5leHRGcmFtZSA9PSBudWxsIHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueCAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS54IHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueSAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS55ICkge1xyXG5cclxuXHRcdFx0dGhpcy5lYXNpbmcgPSB0aGlzLmdldEVhc2luZyggdGhpcy5pbnRlcnBvbGF0aW9uLCBuZXh0RnJhbWUgKTtcclxuXHRcdFx0dGhpcy5uZXh0RnJhbWUgPSBuZXh0RnJhbWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5lYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5lYXNpbmcoIHQgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHRocmVhZElkIH0gZnJvbSAnd29ya2VyX3RocmVhZHMnO1xuaW1wb3J0IHsgRWFzaW5ncywgRWFzaW5nRnVuYyB9IGZyb20gXCIuL0Vhc2luZ3NcIjtcbmltcG9ydCB7IExlcnBGdW5jLCBMZXJwcyB9IGZyb20gXCIuL0xlcnBzXCI7XG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gXCIuL1VuaWZvcm1zXCI7XG5cbmV4cG9ydCB0eXBlIEFuaW1hdG9yVmFyaWFibGVUeXBlID0gbnVtYmVyIHwgbnVtYmVyW10gfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5RdWF0ZXJuaW9uIHwgVEhSRUUuRXVsZXJcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdG9yVmFyaWFibGU8VD57XG5cdHRpbWU6IG51bWJlcjtcblx0ZHVyYXRpb24/OiBudW1iZXI7XG5cdHZhbHVlOiBUO1xuXHRzdGFydFZhbHVlOiBUO1xuXHRnb2FsVmFsdWU6IFQ7XG5cdG9uQW5pbWF0aW9uRmluaXNoZWQ/OiBGdW5jdGlvbiB8IG51bGw7XG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdGVhc2luZzogRWFzaW5nRnVuYztcblx0dXNlckRhdGE/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+IHtcblx0bmFtZTogc3RyaW5nO1xuXHRpbml0VmFsdWU6IFQ7XG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XG5cdGN1c3RvbUxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdHVzZXJEYXRhPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0b3IgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBkYXRhQmFzZToge1sga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZVR5cGUgfTtcblx0cHVibGljIGlzQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbIGtleTogc3RyaW5nIF06IEFuaW1hdG9yVmFyaWFibGU8QW5pbWF0b3JWYXJpYWJsZVR5cGU+IH07XG5cdHByb3RlY3RlZCBhbmltYXRpbmdDb3VudDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGRpc3BhdGNoRXZlbnRzOiBGdW5jdGlvbltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy52YXJpYWJsZXMgPSB7fTtcblx0XHR0aGlzLmRhdGFCYXNlID0ge307XG5cblx0fVxuXG5cdHB1YmxpYyBhZGQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggcGFyYW1zOiBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+ICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlOiBBbmltYXRvclZhcmlhYmxlPFQ+ID0ge1xuXHRcdFx0dGltZTogLSAxLFxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0c3RhcnRWYWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRnb2FsVmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0ZWFzaW5nOiBwYXJhbXMuZWFzaW5nIHx8IEVhc2luZ3Muc2lnbW9pZCgpLFxuXHRcdFx0bGVycEZ1bmM6ICggcGFyYW1zLmN1c3RvbUxlcnBGdW5jIHx8IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMuaW5pdFZhbHVlICkgKSBhcyBMZXJwRnVuYzxUPixcblx0XHRcdHVzZXJEYXRhOiBwYXJhbXMudXNlckRhdGEsXG5cdFx0fTtcblxuXHRcdHRoaXMuZGF0YUJhc2VbIHBhcmFtcy5uYW1lIF0gPSB2YXJpYWJsZS52YWx1ZTtcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHZhcmlhYmxlIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxBbmltYXRvclZhcmlhYmxlVHlwZT47XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoe1xuXHRcdFx0dHlwZTogJ2FkZGVkJyxcblx0XHRcdHZhck5hbWU6IHBhcmFtcy5uYW1lLFxuXHRcdFx0dmFyaWFibGUsXG5cdFx0fSlcblxuXHRcdHJldHVybiB2YXJpYWJsZTtcblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0U2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBzZXRFYXNpbmcoIG5hbWU6IHN0cmluZywgZWFzaW5nOiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLmVhc2luZyA9IGVhc2luZztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRWYWx1ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBUICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5kYXRhQmFzZVsgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZVR5cGU7XG5cblx0XHRpZiAoIHZhcmlhYmxlICE9PSB1bmRlZmluZWQgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIHZhcmlhYmxlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRcdHRoaXMuZGF0YUJhc2VbIG5hbWUgXSA9IHZhbHVlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBcImNvcHlcIiBpbiB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR2YXJpYWJsZS5jb3B5KCB2YWx1ZSBhcyBhbnkgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggdmFyaWFibGUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0XHQoIHZhcmlhYmxlIGFzIG51bWJlciBbXSApID0gKCB2YWx1ZSBhcyBudW1iZXJbXSApLmNvbmNhdCgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoIG5hbWUgKTtcblx0XHRcdHRoaXMuY2FuY2VsQW5pbWF0ZSggbmFtZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFuaW1hdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFuaW1hdGU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nLCBnb2FsVmFsdWU6IFQsIGR1cmF0aW9uOiBudW1iZXIgPSAxLCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBlYXNpbmc/OiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHRpZiAoIGR1cmF0aW9uIDw9IDAgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFZhbHVlKCBuYW1lLCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAxLjA7XG5cdFx0XHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdmFyaWFibGUudGltZSA9PSAtIDEgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50ICsrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXJpYWJsZS50aW1lID0gMDtcblx0XHRcdFx0dmFyaWFibGUuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0dmFyaWFibGUuc3RhcnRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVDbG9uZSggdmFyaWFibGUudmFsdWUgKTtcblx0XHRcdFx0dmFyaWFibGUuZ29hbFZhbHVlID0gdGhpcy5nZXRWYWx1ZUNsb25lKCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRyZXNvbHZlKCBudWxsICk7XG5cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIGVhc2luZyApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0RWFzaW5nKCBuYW1lLCBlYXNpbmcgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cblx0fVxuXG5cdHB1YmxpYyBjYW5jZWxBbmltYXRlKCBuYW1lOiBzdHJpbmcgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSBudWxsO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0R2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWUgYXMgdW5rbm93biBhcyBUO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIG11dGU6IGJvb2xlYW4gPSBmYWxzZSApOiBBbmltYXRvclZhcmlhYmxlPFQ+IHwgbnVsbCB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxUPjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFV0aWxzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBhcHBseVRvVW5pZm9ybXMoIHVuaWZvcm1zOiBVbmlmb3JtcyApIHtcblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5nZXRWYXJpYWJsZU9iamVjdCgga2V5c1sgaSBdICk7XG5cblx0XHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdFx0dW5pZm9ybXNbIGtleXNbIGkgXSBdID0gdmFyaWFibGU7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGlzQW5pbWF0aW5nVmFyaWFibGUoIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICkge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRsZXQgdGltZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF0udGltZTtcblxuXHRcdFx0cmV0dXJuIHRpbWUgIT0gLSAxLjA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoICEgbXV0ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVdGlsc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcml2YXRlIGdldFZhbHVlQ2xvbmU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggdmFsdWU6IFQgKTogVCB7XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXG5cdFx0fSBlbHNlIGlmICggJ2Nsb25lJyBpbiB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlLmNsb25lKCkgYXMgVDtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cblx0XHRcdHJldHVybiB2YWx1ZS5jb25jYXQoKSBhcyBUO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXG5cdH1cblxuXHRwdWJsaWMgd2FpdCggdDogbnVtYmVyICkge1xuXG5cdFx0bGV0IHBybSA9IG5ldyBQcm9taXNlPHZvaWQ+KCAoIHIgKSA9PntcblxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHRcdHIoKTtcblxuXHRcdFx0fSwgKCB0ICogMTAwMCApICk7XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJtO1xuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVcGRhdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIHVwZGF0ZSggZGVsdGFUaW1lPzogbnVtYmVyICkge1xuXG5cdFx0aWYgKCB0aGlzLmFuaW1hdGluZ0NvdW50ID09IDAgKSB7XG5cblx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuXHRcdH1cblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlTmFtZSA9IGtleXNbIGkgXTtcblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyB2YXJpYWJsZU5hbWUgXTtcblx0XHRcdGxldCB0aW1lID0gdmFyaWFibGUudGltZTtcblxuXHRcdFx0aWYgKCB0aW1lID09IDEuMCApIHtcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50IC0tO1xuXHRcdFx0XHR0aW1lID0gLSAxO1xuXG5cdFx0XHRcdGlmICggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudHMucHVzaCggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRpbWUgPj0gMC4wICYmIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0bGV0IGR1cmF0aW9uID0gdmFyaWFibGUuZHVyYXRpb247XG5cdFx0XHRcdGxldCBlYXNpbmcgPSB2YXJpYWJsZS5lYXNpbmc7XG5cdFx0XHRcdGxldCBsZXJwRnVuYyA9IHZhcmlhYmxlLmxlcnBGdW5jO1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gKSB7XG5cblx0XHRcdFx0XHR0aW1lICs9ICggZGVsdGFUaW1lIHx8IDAuMDE2ICkgLyBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmICggZHVyYXRpb24gPT0gMCB8fCB0aW1lID49IDEuMCApIHtcblxuXHRcdFx0XHRcdFx0dGltZSA9IDEuMDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHZhbHVlOiBBbmltYXRvclZhcmlhYmxlVHlwZSA9IHZhcmlhYmxlLmdvYWxWYWx1ZTtcblxuXHRcdFx0XHRpZiAoIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGxlcnBGdW5jICkge1xuXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGxlcnBGdW5jKCB2YXJpYWJsZS5zdGFydFZhbHVlLCB2YXJpYWJsZS5nb2FsVmFsdWUsIGVhc2luZyggdGltZSApICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBkYXRhQmFzZVZhbHVlID0gdGhpcy5kYXRhQmFzZVsgdmFyaWFibGVOYW1lIF07XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YUJhc2VWYWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGF0YUJhc2VbIHZhcmlhYmxlTmFtZSBdID0gdmFsdWU7XG5cblx0XHRcdFx0fSBlbHNlIGlmICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0XHRkYXRhQmFzZVZhbHVlLmNvcHkoIHZhbHVlIGFzIGFueSApO1xuXG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHRcdHR5cGU6ICd1cGRhdGUvJyArIGtleXNbIGkgXSxcblx0XHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFyaWFibGUudmFsdWVcblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhcmlhYmxlLnRpbWUgPSB0aW1lO1xuXG5cdFx0fVxuXG5cdFx0d2hpbGUgKCB0aGlzLmRpc3BhdGNoRXZlbnRzLmxlbmd0aCAhPSAwICkge1xuXG5cdFx0XHRsZXQgZnVuYyA9IHRoaXMuZGlzcGF0Y2hFdmVudHMucG9wKCk7XG5cblx0XHRcdGlmICggZnVuYyApIHtcblxuXHRcdFx0XHRmdW5jKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdH0gKTtcblxuXHRcdGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICdhbmltYXRlJyxcblx0XHRcdFx0ZGVsdGFUaW1lOiBkZWx0YVRpbWVcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZURhdGFCYXNlKCB0YXJnZXQ/OiBzdHJpbmcgKSB7XG5cblx0XHRpZiAoIHRhcmdldCApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIHRhcmdldCBdO1xuXHRcdFx0bGV0IGRhdGFiYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyB0YXJnZXQgXTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSAmJiBkYXRhYmFzZVZhbHVlICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH1cblxuXHRcdGxldCBrZXkgPSBPYmplY3Qua2V5cyggdGhpcy5kYXRhQmFzZSApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5Lmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIGtleVsgaSBdIF07XG5cdFx0XHRsZXQgZGF0YWJhc2VWYWx1ZSA9IHRoaXMuZGF0YUJhc2VbIGtleVsgaSBdIF07XG5cblx0XHRcdGlmICggdmFyaWFibGUgJiYgZGF0YWJhc2VWYWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHRcdFx0Ly8gVmVjdG9y57O744Gv5Y+C54Wn44Gq44Gu44GnbnVtYmVy44GobnVtYmVyW13jgYLjgZ/jgorjgaDjgZHmm7TmlrBcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgT1JFIGZyb20gJy4uLy4uLyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9iYWNrZ3JvdW5kLnZzJztcbmltcG9ydCB7IExheWVyU2l6ZSBhcyBMYXllclNpemVJbmZvIH0gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGF5ZXInO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFRIUkVFLk1lc2gge1xuXG5cdHByb3RlY3RlZCB1bmlmb3JtczogT1JFLlVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJhbTogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0bGV0IHBvc0FycmF5ID0gW107XG5cdFx0bGV0IGluZGV4QXJyYXkgPSBbXTtcblx0XHRsZXQgdXZBcnJheSA9IFtdO1xuXG5cdFx0cG9zQXJyYXkucHVzaCggLSAxLCAxLCAwICk7XG5cdFx0cG9zQXJyYXkucHVzaCggMSwgMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIDEsIC0gMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIC0gMSwgLSAxLCAwICk7XG5cblx0XHR1dkFycmF5LnB1c2goIDAsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDAgKTtcblx0XHR1dkFycmF5LnB1c2goIDAsIDAgKTtcblxuXHRcdGluZGV4QXJyYXkucHVzaCggMCwgMiwgMSwgMCwgMywgMiApO1xuXG5cdFx0bGV0IHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoIHBvc0FycmF5ICk7XG5cdFx0bGV0IGluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoIGluZGV4QXJyYXkgKTtcblx0XHRsZXQgdXYgPSBuZXcgRmxvYXQzMkFycmF5KCB1dkFycmF5ICk7XG5cblx0XHRnZW8uc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBwb3MsIDMgKSApO1xuXHRcdGdlby5zZXRBdHRyaWJ1dGUoICd1dicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIHV2LCAyICkgKTtcblx0XHRnZW8uc2V0SW5kZXgoIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIGluZGljZXMsIDEgKSApO1xuXG5cdFx0cGFyYW0udmVydGV4U2hhZGVyID0gcGFyYW0udmVydGV4U2hhZGVyIHx8IHZlcnQ7XG5cdFx0cGFyYW0udHJhbnNwYXJlbnQgPSBwYXJhbS50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBwYXJhbS50cmFuc3BhcmVudCA6IHRydWU7XG5cdFx0cGFyYW0uZGVwdGhGdW5jID0gcGFyYW0uZGVwdGhGdW5jICE9IHVuZGVmaW5lZCA/IHBhcmFtLmRlcHRoRnVuYyA6IFRIUkVFLk5ldmVyRGVwdGg7XG5cblx0XHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLnVuaWZvcm1zID0gcGFyYW0udW5pZm9ybXMgfHwge307XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlc2l6ZSggYXJnczogTGF5ZXJTaXplSW5mbyApIHtcblxuXHRcdHRoaXMudW5pZm9ybXMucmVzb2x1dGlvbiA9IHsgdmFsdWU6IGFyZ3MuY2FudmFzU2l6ZSB9O1xuXHRcdHRoaXMudW5pZm9ybXMuYXNwZWN0UmF0aW8gPSB7IHZhbHVlOiBhcmdzLmNhbnZhc0FzcGVjdFJhdGlvIH07XG5cblx0fVxuXG59XG4iLCJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEJlemllclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQmV6aWVyIHtcblxuXHRleHBvcnQgdHlwZSBCZXppZXJDb250cm9sUG9pbnRzID0ge1xuXHRcdHAwOiBudW1iZXI7XG5cdFx0cDE6IG51bWJlcjtcblx0XHRwMjogbnVtYmVyO1xuXHRcdHAzOiBudW1iZXI7XG5cdH1cblxuXHQvLyBpbnNwaXJlZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmcvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzIGFuZCBodHRwczovL2dpdGh1Yi5jb20vMGI1dnIvYXV0b21hdG9uL2Jsb2IvODcyNDIwZTc5OGQ5MDU0ZDRhN2EwNmM5NzJjYmI0MjYxYTY3YjRiYy9zcmMvYmV6aWVyRWFzaW5nLnRzXG5cblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9JVEVSQVRJT05TID0gNDtcblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9NSU5fU0xPUEUgPSAwLjAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX01BWF9JVEVSQVRJT05TID0gMTA7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgPSAxMTtcblx0ZXhwb3J0IGNvbnN0IEJFWklFUl9FQVNJTkdfU0FNUExFX1NURVBfU0laRSA9IDEuMCAvIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTtcblxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQSggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIHAucDAgKyAzLjAgKiBwLnAxIC0gMy4wICogcC5wMiArIHAucDM7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQiggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAzLjAgKiBwLnAwIC0gNi4wICogcC5wMSArIDMuMCAqIHAucDI7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQyggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIDMuMCAqIHAucDAgKyAzLjAgKiBwLnAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllclNsb3BlKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogY2FsY0JlemllckEoIHAgKSAqIHQgKiB0ICsgMi4wICogY2FsY0JlemllckIoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllciggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuICggKCBjYWxjQmV6aWVyQSggcCApICogdCArIGNhbGNCZXppZXJCKCBwICkgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApICkgKiB0ICsgcC5wMDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc3ViZGl2KCB4OiBudW1iZXIsIHN0YXJ0VDogbnVtYmVyLCBlbmRUOiBudW1iZXIsIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRsZXQgY3VycmVudFggPSAwO1xuXHRcdGxldCBjdXJyZW50VCA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0Y3VycmVudFQgPSBzdGFydFQgKyAoIGVuZFQgLSBzdGFydFQgKSAvIDI7XG5cdFx0XHRjdXJyZW50WCA9IGNhbGNCZXppZXIoIHAsIGN1cnJlbnRUICk7XG5cblx0XHRcdGlmICggY3VycmVudFggPiB4ICkge1xuXG5cdFx0XHRcdGVuZFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzdGFydFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnRUO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBuZXd0b24oIHg6bnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBORVdUT05fSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0bGV0IHNsb3BlID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICk7XG5cblx0XHRcdGlmICggc2xvcGUgPT0gMC4wICkge1xuXG5cdFx0XHRcdHJldHVybiB0O1xuXG5cdFx0XHR9XG5cblx0XHRcdGxldCBjdXJyZW50WCA9ICggY2FsY0JlemllciggcCwgdCApICkgLSB4O1xuXHRcdFx0dCAtPSBjdXJyZW50WCAvIHNsb3BlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRCZXppZXJUZnJvbVgoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHg6IG51bWJlciwgY2FjaGU6IG51bWJlcltdICkge1xuXG5cdFx0cC5wMSA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMSApICk7XG5cdFx0cC5wMiA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMiApICk7XG5cblx0XHRsZXQgc2FtcGxlID0gMDtcblxuXHRcdGZvciAoIGxldCBpID0gMTsgaSA8IGNhY2hlLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0c2FtcGxlID0gaSAtIDE7XG5cdFx0XHRpZiAoIHggPCBjYWNoZVsgaSBdICkgYnJlYWs7XG5cblx0XHR9XG5cblx0XHRsZXQgdCA9IHNhbXBsZSAvICggQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFIC0gMS4wICk7XG5cdFx0bGV0IGRpZmYgPSBjYWxjQmV6aWVyU2xvcGUoIHAsIHQgKSAvICggcC5wMyAtIHAucDAgKTtcblxuXHRcdGlmICggZGlmZiA9PSAwLjAgKSB7XG5cblx0XHRcdHJldHVybiB0O1xuXG5cdFx0fSBlbHNlIGlmICggZGlmZiA+IDAuMDEgKSB7XG5cblx0XHRcdHJldHVybiBuZXd0b24oIHgsIHAsIHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldHVybiBzdWJkaXYoIHgsIHQsIHQgKyBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUsIHAgKTtcblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwid29sZnk4Ny1ldmVudGVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQWN0aW9uIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb25cIjtcclxuaW1wb3J0IHsgRkN1cnZlIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9GQ3VydmVcIjtcclxuaW1wb3J0IHsgRkN1cnZlR3JvdXAgfSBmcm9tICcuLi9BbmltYXRpb24vRkN1cnZlR3JvdXAnO1xyXG5pbXBvcnQgeyBGQ3VydmVJbnRlcnBvbGF0aW9uLCBGQ3VydmVLZXlGcmFtZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWVcIjtcclxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XHJcblxyXG5leHBvcnQgdHlwZSBCQ01lc3NhZ2UgPSBCQ1N5bmNTY2VuZU1lc3NhZ2UgfCBCQ1N5bmNGcmFtZU1lc3NhZ2VcclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAndycgfCAnc2NhbGFyJ1xyXG5cclxuZXhwb3J0IHR5cGUgQkNTeW5jU2NlbmVNZXNzYWdlID0ge1xyXG5cdHR5cGU6IFwic3luYy9zY2VuZVwiLFxyXG4gICAgZGF0YTogQkNTY2VuZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVEYXRhID0ge1xyXG5cdGFjdGlvbnM6IEJDQW5pbWF0aW9uQWN0aW9uUGFyYW1bXTtcclxuICAgIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW107XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQWN0aW9uUGFyYW0gPSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmY3VydmVfZ3JvdXBzOiB7W2tleTogc3RyaW5nXTogQkNBbmltYXRpb25DdXJ2ZVBhcmFtW119O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkN1cnZlUGFyYW0gPSB7XHJcbiAgICBrZXlmcmFtZXM6IEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtW107XHJcblx0YXhpczogQkNBbmltYXRpb25DdXJ2ZUF4aXNcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUtleUZyYW1lUGFyYW0gPSB7XHJcbiAgICBjOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9sOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9yOiBUSFJFRS5WZWMyO1xyXG4gICAgZTogc3RyaW5nO1xyXG4gICAgaTogRkN1cnZlSW50ZXJwb2xhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNTY2VuZU9iamVjdERhdGEgPSB7XHJcblx0bmFtZTogc3RyaW5nLFxyXG5cdGFjdGlvbnM6IHN0cmluZ1tdXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY0ZyYW1lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvdGltZWxpbmVcIjtcclxuXHRkYXRhOiBCQ1RpbWVsaW5lRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNUaW1lbGluZURhdGEgPSB7XHJcblx0c3RhcnQ6IG51bWJlcjtcclxuXHRlbmQ6IG51bWJlcjtcclxuXHRjdXJyZW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbGVuZGVyQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0Ly8gd3NcclxuXHJcblx0cHJpdmF0ZSB1cmw/OiBzdHJpbmc7XHJcblx0cHJpdmF0ZSB3cz86IFdlYlNvY2tldDtcclxuXHRwdWJsaWMgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8vIGZyYW1lXHJcblxyXG5cdHB1YmxpYyBmcmFtZUN1cnJlbnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXIgPSAwO1xyXG5cclxuXHQvLyBhbmltYXRpb25cclxuXHJcblx0cHVibGljIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW10gPSBbXTtcclxuXHRwdWJsaWMgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHJcblx0Y29uc3RydWN0b3IoIHVybD86IHN0cmluZyApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdGlmICggdXJsICkge1xyXG5cclxuXHRcdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0XHRcdHRoaXMuY29ubmVjdCggdGhpcy51cmwgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNvbm5lY3QoIHVybDogc3RyaW5nICkge1xyXG5cclxuXHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0dGhpcy53cyA9IG5ldyBXZWJTb2NrZXQoIHRoaXMudXJsICk7XHJcblx0XHR0aGlzLndzLm9ub3BlbiA9IHRoaXMub25PcGVuLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy53cy5vbmNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25lcnJvciA9ICggZSApID0+IHtcclxuXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGUgKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzeW5jSnNvblNjZW5lKCBqc29uUGF0aDogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCByZXEucmVhZHlTdGF0ZSA9PSA0ICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHJlcS5zdGF0dXMgPT0gMjAwICkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub25TeW5jU2NlbmUoIEpTT04ucGFyc2UoIHJlcS5yZXNwb25zZSApICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdHJlcS5vcGVuKCAnR0VUJywganNvblBhdGggKTtcclxuXHRcdHJlcS5zZW5kKCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25TeW5jU2NlbmUoIGRhdGE6IEJDU2NlbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuYWN0aW9ucy5sZW5ndGggPSAwO1xyXG5cdFx0dGhpcy5vYmplY3RzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0Ly8gYWN0aW9uc1xyXG5cclxuXHRcdGRhdGEuYWN0aW9ucy5mb3JFYWNoKCBhY3Rpb25EYXRhID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSBuZXcgQW5pbWF0aW9uQWN0aW9uKCBhY3Rpb25EYXRhLm5hbWUgKTtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cE5hbWVzID0gT2JqZWN0LmtleXMoYWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzKVxyXG5cclxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgZmN1cnZlR3JvdXBOYW1lcy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwTmFtZSA9IGZjdXJ2ZUdyb3VwTmFtZXNbaV07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwID0gbmV3IEZDdXJ2ZUdyb3VwKCBmY3VydmVHcm91cE5hbWUgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhY3Rpb25EYXRhLmZjdXJ2ZV9ncm91cHNbZmN1cnZlR3JvdXBOYW1lXS5mb3JFYWNoKCBmY3VydmVEYXRhID0+IHtcclxuXHJcblx0XHRcdFx0XHRsZXQgY3VydmUgPSBuZXcgRkN1cnZlKCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnZlLnNldCggZmN1cnZlRGF0YS5rZXlmcmFtZXMubWFwKCBmcmFtZSA9PiB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgRkN1cnZlS2V5RnJhbWUoIGZyYW1lLmMsIGZyYW1lLmhfbCwgZnJhbWUuaF9yLCBmcmFtZS5pICk7XHJcblx0XHJcblx0XHRcdFx0XHR9ICkgKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ZmN1cnZlR3JvdXAuc2V0RkN1cnZlKCBjdXJ2ZSwgZmN1cnZlRGF0YS5heGlzICk7XHJcblx0XHJcblx0XHRcdFx0fSApO1xyXG5cclxuXHRcdFx0XHRhY3Rpb24uYWRkRmN1cnZlR3JvdXAoIGZjdXJ2ZUdyb3VwLm5hbWUsIGZjdXJ2ZUdyb3VwICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Ly8gb2JqZWN0c1xyXG5cclxuXHRcdGRhdGEub2JqZWN0cy5mb3JFYWNoKCBvYmplY3REYXRhID0+IHtcclxuXHJcblx0XHRcdHRoaXMub2JqZWN0cy5wdXNoKCBvYmplY3REYXRhICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIGRpc3BhdGNoIGV2ZW50XHJcblx0XHRcclxuXHRcdHRoaXMuZW1pdEV2ZW50KCd1cGRhdGUvc2NlbmUnLCBbdGhpc10pXHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSh0aGlzLmZyYW1lQ3VycmVudCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvblN5bmNUaW1lbGluZSggZGF0YTogQkNUaW1lbGluZURhdGEgKSB7XHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSggZGF0YS5jdXJyZW50LCBkYXRhLnN0YXJ0LCBkYXRhLmVuZCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0V1MgRXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25PcGVuKCBldmVudDogRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25NZXNzYWdlKCBlOiBNZXNzYWdlRXZlbnQgKSB7XHJcblxyXG5cdFx0bGV0IG1zZyA9IEpTT04ucGFyc2UoIGUuZGF0YSApIGFzIEJDTWVzc2FnZTtcclxuXHJcblx0XHRpZiAoIG1zZy50eXBlID09ICdzeW5jL3NjZW5lJyApIHtcclxuXHJcblx0XHRcdHRoaXMub25TeW5jU2NlbmUoIG1zZy5kYXRhICk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggbXNnLnR5cGUgPT0gXCJzeW5jL3RpbWVsaW5lXCIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1RpbWVsaW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkNsb3NlKCBlOkNsb3NlRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEFQSVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLm9iamVjdHNbIGkgXS5uYW1lID09IG9iamVjdE5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLm9iamVjdHNbIGkgXS5hY3Rpb25zO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gW107XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbiggYWN0aW9uTmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuYWN0aW9uc1sgaSBdLm5hbWUgPT0gYWN0aW9uTmFtZSApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTGlzdCggb2JqZWN0TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCBhY3Rpb25zOiBBbmltYXRpb25BY3Rpb25bXSA9IFtdO1xyXG5cdFx0bGV0IGFjdGlvbk5hbWVMaXN0ID0gdGhpcy5nZXRBY3Rpb25OYW1lTGlzdCggb2JqZWN0TmFtZSApO1xyXG5cclxuXHRcdGFjdGlvbk5hbWVMaXN0LmZvckVhY2goIGFjdGlvbk5hbWUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IGFjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCBhY3Rpb25OYW1lICk7XHJcblxyXG5cdFx0XHRpZiAoIGFjdGlvbiApIHtcclxuXHJcblx0XHRcdFx0YWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0cmV0dXJuIGFjdGlvbnM7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkNvbnRhaW5zQWNjZXNzb3IoIGFjY2Vzc29yOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIGFjdGlvbi5jdXJ2ZXMgKTtcclxuXHJcblx0XHRcdHJldHVybiBjdXJ2ZUtleXMuc29tZShjdXJ2ZU5hbWUgPT4gY3VydmVOYW1lPT1hY2Nlc3NvcilcclxuXHRcdFx0XHJcblx0XHR9KSB8fCBudWxsXHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUaW1lbGluZSggY3VycmVudDogbnVtYmVyLCBzdGFydD86bnVtYmVyLCBlbmQ/Om51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmZyYW1lQ3VycmVudCA9IGN1cnJlbnQ7XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSBzdGFydCB8fCB0aGlzLmZyYW1lU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gZW5kIHx8IHRoaXMuZnJhbWVFbmQ7XHJcblxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoICd1cGRhdGUvdGltZWxpbmUnLCBbIHRoaXMuZnJhbWVDdXJyZW50LCB0aGlzLmZyYW1lU3RhcnQsIHRoaXMuZnJhbWVFbmQgXSApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RGlzcG9zZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2VXUygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlV1MoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLndzICkge1xyXG5cclxuXHRcdFx0dGhpcy53cy5jbG9zZSgpO1xyXG5cdFx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25jbG9zZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25vcGVuID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB2ZXJ0IGZyb20gJy4vZG9tTWVzaC52cyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBjbGFzcyBET01NZXNoIGV4dGVuZHMgVEhSRUUuTWVzaCB7XG5cblx0cHJvdGVjdGVkIF91bmlmb3JtczogVW5pZm9ybXM7XG5cdHByb3RlY3RlZCBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggZWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmFtZXRlcjogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCAyLCAyICk7XG5cblx0XHRwYXJhbWV0ZXIudmVydGV4U2hhZGVyID0gdmVydDtcblxuXHRcdGxldCB1bmkgPSBVbmlmb3Jtc0xpYi5tZXJnZVVuaWZvcm1zKCBwYXJhbWV0ZXIudW5pZm9ybXMsIHtcblx0XHRcdGRvbVBvczoge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdGRvbVNpemU6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHR3aW5kb3dTaXplOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0YXNwZWN0UmF0aW86IHtcblx0XHRcdFx0dmFsdWU6IDEuMFxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdHBhcmFtZXRlci51bmlmb3JtcyA9IHVuaTtcblxuXHRcdGxldCBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBhcmFtZXRlciApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zID0gdW5pO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQgdW5pZm9ybXMoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fdW5pZm9ybXM7XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zLndpbmRvd1NpemUudmFsdWUuc2V0KCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0dGhpcy5fdW5pZm9ybXMuYXNwZWN0UmF0aW8udmFsdWUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21TaXplLnZhbHVlLnNldCggcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQgKTtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21Qb3MudmFsdWUuc2V0KCByZWN0LmxlZnQsIHJlY3QudG9wICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBCZXppZXIgfSBmcm9tIFwiLi9CZXppZXJcIjtcblxuZXhwb3J0IHR5cGUgRWFzaW5nRnVuYyA9ICggdDogbnVtYmVyICkgPT4gYW55XG5cbmV4cG9ydCBuYW1lc3BhY2UgRWFzaW5ncyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNpZ21vaWQoIHdlaWdodDogbnVtYmVyID0gNiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0dmFyIGUxID0gTWF0aC5leHAoIC0gd2VpZ2h0ICogKCAyICogeCAtIDEgKSApO1xuXHRcdFx0dmFyIGUyID0gTWF0aC5leHAoIC0gd2VpZ2h0ICk7XG5cblx0XHRcdHJldHVybiAoIDEgKyAoIDEgLSBlMSApIC8gKCAxICsgZTEgKSAqICggMSArIGUyICkgLyAoIDEgLSBlMiApICkgLyAyO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdmFsdWU6IG51bWJlciApOiBudW1iZXIge1xuXG5cdFx0bGV0IHggPSBNYXRoLm1heCggMCwgTWF0aC5taW4oIDEsICggdmFsdWUgLSBtaW4gKSAvICggbWF4IC0gbWluICkgKSApO1xuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fVxuXG5cdC8qXG5cdEBhdXRoZXIgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcblx0Ki9cblxuXHRleHBvcnQgZnVuY3Rpb24gbGluZWFyKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqICggMiAtIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyAyICogdCAqIHQgOiAtIDEgKyAoIDQgLSAyICogdCApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gKCAtLSB0ICkgKiB0ICogdCArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAoIHQgLSAxICkgKiAoIDIgKiB0IC0gMiApICogKCAyICogdCAtIDIgKSArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxIC0gKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoIC0tIHQgKSAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxICsgKCAtLSB0ICkgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuICBcdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCggdDogbnVtYmVyICkge1xuXG4gIFx0XHRyZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuICBcdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gYmV6aWVyKCBjMTogVEhSRUUuVmVjMiwgaDE6IFRIUkVFLlZlYzIsIGgyOiBUSFJFRS5WZWMyLCBjMjogVEhSRUUuVmVjMiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHZhciBjYWNoZSA9IG5ldyBBcnJheSggQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTsgKysgaSApIHtcblxuXHRcdFx0Y2FjaGVbIGkgXSA9IEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIGkgLyAoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgLSAxLjAgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuICggeDogbnVtYmVyICkgPT4ge1xuXG5cdFx0XHRpZiAoIHggPD0gYzEueCApIHJldHVybiBjMS55O1xuXHRcdFx0aWYgKCBjMi54IDw9IHggKSByZXR1cm4gYzIueTtcblxuXHRcdFx0cmV0dXJuIEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS55LCBwMTogaDEueSwgcDI6IGgyLnksIHAzOiBjMi55IH0sIEJlemllci5nZXRCZXppZXJUZnJvbVgoIHsgcDA6IGMxLngsIHAxOiBoMS54LCBwMjogaDIueCwgcDM6IGMyLnggfSwgeCwgY2FjaGUgKSApO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGN1YmljQmV6aWVyKCBoMVg6IG51bWJlciwgaDFZOiBudW1iZXIsIGgyWDogbnVtYmVyLCBoMlk6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBiZXppZXIoXG5cdFx0XHR7IHg6IDAuMCwgeTogMC4wIH0sXG5cdFx0XHR7IHg6IGgxWCBhcyBudW1iZXIsIHk6IGgxWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogaDJYIGFzIG51bWJlciwgeTogaDJZIGFzIG51bWJlciB9LFxuXHRcdFx0eyB4OiAxLjAsIHk6IDEuMCB9LFxuXHRcdCk7XG5cblx0fVxuXG59XG4iLCJleHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnQge1xuXHR0eXBlOiBzdHJpbmc7XG5cdFtrZXk6c3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnRMaXN0ZW5lciB7XG5cdHR5cGU6IHN0cmluZyxcblx0bGlzdGVuZXI6ICggZTogRXZlbnQgKSA9PiB2b2lkLFxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcml2YXRlIGV2ZW50czogRXZlbnRMaXN0ZW5lcltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiAoIGU6IEV2ZW50ICkgPT4gdm9pZCApIHtcblxuXHRcdHRoaXMuZXZlbnRzLnB1c2goIHtcblx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRsaXN0ZW5lcjogbGlzdGVuZXJcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwYXRjaEV2ZW50KCBldmVudDogRXZlbnQgKSB7XG5cblx0XHRldmVudC50YXJnZXQgPSB0aGlzO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIGV2ZW50LnR5cGUgPT0gdGhpcy5ldmVudHNbIGkgXS50eXBlICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzWyBpIF0ubGlzdGVuZXIoIGV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSB0aGlzLmV2ZW50cy5sZW5ndGg7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0aWYgKCB0eXBlID09IHRoaXMuZXZlbnRzWyBpIF0udHlwZSAmJiBsaXN0ZW5lciA9PSB0aGlzLmV2ZW50c1sgaSBdLmxpc3RlbmVyICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzLnNwbGljZSggaSwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC52cyc7XG5pbXBvcnQgcGFzc1Rocm91Z2hGcmFnIGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC5mcyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVQ29tcHV0YXRpb25LZXJuZWx7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsLFxuICAgIHVuaWZvcm1zOiBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVY29tcHV0YXRpb25EYXRhe1xuICAgIGJ1ZmZlcjogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRcbn1cblxuZXhwb3J0IGNsYXNzIEdQVUNvbXB1dGF0aW9uQ29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXHRwdWJsaWMgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHByb3RlY3RlZCB1bmlmb3JtczogYW55O1xuXG5cdHByb3RlY3RlZCBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByb3RlY3RlZCBjYW1lcmE6IFRIUkVFLkNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgbWVzaDogVEhSRUUuTWVzaDtcblx0cHJvdGVjdGVkIG1hdGVyaWFsczogVEhSRUUuU2hhZGVyTWF0ZXJpYWxbXTtcblxuXHRwcm90ZWN0ZWQgdGVtcERhdGFMaW5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblx0cHJvdGVjdGVkIHRlbXBEYXRhTmVhcjogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHByaXZhdGUgcmVuZGVyVGFyZ2V0czogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRbXSA9IFtdO1xuXG5cdHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuXG4gICAgXHRyZXR1cm4gdGhpcy5yZW5kZXJlci5leHRlbnNpb25zLmdldCggXCJPRVNfdGV4dHVyZV9mbG9hdFwiICk7XG5cblx0fVxuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICBcdHRoaXMuZGF0YVNpemUgPSBkYXRhU2l6ZS5jbG9uZSgpO1xuXG4gICAgXHR0aGlzLnVuaWZvcm1zID0ge1xuICAgIFx0XHRkYXRhU2l6ZToge1xuICAgIFx0XHRcdHZhbHVlOiB0aGlzLmRhdGFTaXplXG4gICAgXHRcdH1cbiAgICBcdH07XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIgPSB0aGlzLmNyZWF0ZURhdGEoIHtcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFOZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLkNhbWVyYSgpO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuICAgIFx0dGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5QbGFuZUdlb21ldHJ5KCAyLCAyICkgKTtcbiAgICBcdHRoaXMuc2NlbmUuYWRkKCB0aGlzLm1lc2ggKTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUluaXRpYWxpemVUZXh0dXJlKCkge1xuXG4gICAgXHRsZXQgYSA9IG5ldyBGbG9hdDMyQXJyYXkoIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCAqIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSAqIDQgKTtcbiAgICBcdGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLkRhdGFUZXh0dXJlKCBhLCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgVEhSRUUuUkdCQUZvcm1hdCwgVEhSRUUuRmxvYXRUeXBlICk7XG4gICAgXHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIFx0cmV0dXJuIHRleHR1cmU7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggdGV4dHVyZVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0aWFsaXplVGV4dHVyZTogVEhSRUUuRGF0YVRleHR1cmUsIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdFRleF90ZXhQYXJhbT86IGFueSwgdGV4dHVyZVBhcmFtPyA6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGEge1xuXG4gICAgXHRsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBcdGxldCBpc2lPUyA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgXHRsZXQgcGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyA9IHtcbiAgICBcdFx0d3JhcFM6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgXHRcdHdyYXBUOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0Zm9ybWF0OiBUSFJFRS5SR0JBRm9ybWF0LFxuICAgIFx0XHR0eXBlOiBpc2lPUyA/IFRIUkVFLkhhbGZGbG9hdFR5cGUgOiBUSFJFRS5GbG9hdFR5cGUsXG4gICAgXHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxuICAgIFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcbiAgICBcdH07XG4gICAgXHRsZXQgaW5pdFRleDogVEhSRUUuRGF0YVRleHR1cmUgfCBudWxsID0gbnVsbDtcbiAgICBcdGxldCBjdXN0b21QYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zIHwgbnVsbCA9IG51bGw7XG5cbiAgICBcdGlmICggaW5pdFRleF90ZXhQYXJhbSApIHtcblxuICAgIFx0XHRpZiAoIGluaXRUZXhfdGV4UGFyYW0uaXNEYXRhVGV4dHVyZSApIHtcblxuICAgIFx0XHRcdGluaXRUZXggPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdFx0aWYgKCB0ZXh0dXJlUGFyYW0gKSB7XG5cbiAgICBcdFx0XHRcdGN1c3RvbVBhcmFtID0gdGV4dHVyZVBhcmFtO1xuXG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdH0gZWxzZSB7XG5cbiAgICBcdFx0XHRjdXN0b21QYXJhbSA9IGluaXRUZXhfdGV4UGFyYW07XG5cbiAgICBcdFx0fVxuXG4gICAgXHR9XG5cbiAgICBcdGlmICggY3VzdG9tUGFyYW0gKSB7XG5cbiAgICBcdFx0cGFyYW0ud3JhcFMgPSBjdXN0b21QYXJhbS53cmFwUyB8fCBwYXJhbS53cmFwUztcbiAgICBcdFx0cGFyYW0ud3JhcFQgPSBjdXN0b21QYXJhbS53cmFwVCB8fCBwYXJhbS53cmFwVDtcbiAgICBcdFx0cGFyYW0ubWluRmlsdGVyID0gY3VzdG9tUGFyYW0ubWluRmlsdGVyIHx8IHBhcmFtLm1pbkZpbHRlcjtcbiAgICBcdFx0cGFyYW0ubWFnRmlsdGVyID0gY3VzdG9tUGFyYW0ubWFnRmlsdGVyIHx8IHBhcmFtLm1hZ0ZpbHRlcjtcbiAgICBcdFx0cGFyYW0uZm9ybWF0ID0gY3VzdG9tUGFyYW0uZm9ybWF0IHx8IHBhcmFtLmZvcm1hdDtcbiAgICBcdFx0cGFyYW0udHlwZSA9IGN1c3RvbVBhcmFtLnR5cGUgfHwgcGFyYW0udHlwZTtcbiAgICBcdFx0cGFyYW0uc3RlbmNpbEJ1ZmZlciA9IGN1c3RvbVBhcmFtLnN0ZW5jaWxCdWZmZXIgfHwgcGFyYW0uc3RlbmNpbEJ1ZmZlcjtcbiAgICBcdFx0cGFyYW0uZGVwdGhCdWZmZXIgPSBjdXN0b21QYXJhbS5kZXB0aEJ1ZmZlciB8fCBwYXJhbS5kZXB0aEJ1ZmZlcjtcblxuICAgIFx0fVxuXG4gICAgXHRsZXQgYnVmID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgcGFyYW0gKTtcblxuXHRcdGxldCBkYXRhID0geyBidWZmZXI6IGJ1ZiB9O1xuXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRzLnB1c2goIGJ1ZiApO1xuXG4gICAgXHRpZiAoIGluaXRUZXggKSB7XG5cbiAgICBcdFx0bGV0IGluaXRLZXJuZWwgPSB0aGlzLmNyZWF0ZUtlcm5lbCgge1xuXHRcdFx0XHRmcmFnbWVudFNoYWRlcjogcGFzc1Rocm91Z2hGcmFnLFxuXHRcdFx0XHR1bmlmb3Jtczoge1xuXHRcdFx0XHRcdHRleDoge1xuXHRcdFx0XHRcdFx0dmFsdWU6IGluaXRUZXhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuICAgIFx0XHR0aGlzLmNvbXB1dGUoIGluaXRLZXJuZWwsIGRhdGEgKTtcblxuICAgIFx0fVxuXG4gICAgXHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUtlcm5lbCggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApOiBHUFVDb21wdXRhdGlvbktlcm5lbCB7XG5cbiAgICBcdGxldCB1bmk6IFVuaWZvcm1zID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW0udW5pZm9ybXMsIHRoaXMudW5pZm9ybXMgKTtcblxuXHRcdHBhcmFtLnVuaWZvcm1zID0gdW5pO1xuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXG4gICAgXHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscy5wdXNoKCBtYXQgKTtcblxuICAgIFx0bGV0IGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwgPSB7XG4gICAgXHRcdG1hdGVyaWFsOiBtYXQsXG4gICAgXHRcdHVuaWZvcm1zOiBwYXJhbS51bmlmb3Jtc1xuICAgIFx0fTtcblxuICAgIFx0cmV0dXJuIGtlcm5lbDtcblxuXHR9XG5cblx0cHVibGljIGNvbXB1dGUoIGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwsIGRhdGE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgY2FtZXJhPzogVEhSRUUuQ2FtZXJhICkge1xuXG4gICAgXHRsZXQgdGVtcDogR1BVY29tcHV0YXRpb25EYXRhO1xuXG4gICAgXHRpZiAoIGRhdGEuYnVmZmVyLnRleHR1cmUubWFnRmlsdGVyID09IFRIUkVFLkxpbmVhckZpbHRlciApIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YUxpbmVhcjtcblxuICAgIFx0fSBlbHNlIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YU5lYXI7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5tZXNoLm1hdGVyaWFsID0ga2VybmVsLm1hdGVyaWFsO1xuXG4gICAgXHRsZXQgY3VycmVudFJlbmRlclRhcmdldCA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCB0ZW1wLmJ1ZmZlciApO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgY2FtZXJhIHx8IHRoaXMuY2FtZXJhICk7XG5cbiAgICBcdHRoaXMuc3dhcEJ1ZmZlcnMoIGRhdGEsIHRlbXAgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIGN1cnJlbnRSZW5kZXJUYXJnZXQgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHN3YXBCdWZmZXJzKCBiMTogR1BVY29tcHV0YXRpb25EYXRhLCBiMjogR1BVY29tcHV0YXRpb25EYXRhICkge1xuXG4gICAgXHRsZXQgdG1wID0gYjEuYnVmZmVyO1xuICAgIFx0YjEuYnVmZmVyID0gYjIuYnVmZmVyO1xuICAgIFx0YjIuYnVmZmVyID0gdG1wO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuICAgIFx0bGV0IGdlbyA9IHRoaXMubWVzaC5nZW9tZXRyeTtcbiAgICBcdGdlby5kaXNwb3NlKCk7XG5cbiAgICBcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgaSArKyApIHtcblxuICAgIFx0XHR0aGlzLm1hdGVyaWFsc1sgaSBdLmRpc3Bvc2UoKTtcblxuICAgIFx0fVxuXG4gICAgXHR0aGlzLnNjZW5lLnJlbW92ZSggdGhpcy5tZXNoICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIuYnVmZmVyLmRpc3Bvc2UoKTtcbiAgICBcdHRoaXMudGVtcERhdGFOZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemVEYXRhKCBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdHRoaXMuZGF0YVNpemUuY29weSggZGF0YVNpemUgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMucmVuZGVyVGFyZ2V0cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLnJlbmRlclRhcmdldHNbIGkgXTtcblxuXHRcdFx0dGFyZ2V0LnNldFNpemUoIGRhdGFTaXplLngsIGRhdGFTaXplLnkgKTtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG5cdHBvc2l0aW9uPzogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEJhc2VUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cdHNjYWxlOiBUSFJFRS5WZWN0b3IzXG59XG5cbmV4cG9ydCBjbGFzcyBMYXlvdXRDb250cm9sbGVyIHtcblxuXHRwcm90ZWN0ZWQgb2JqOiBUSFJFRS5PYmplY3QzRDtcblx0cHJvdGVjdGVkIGJhc2VUcmFuc2Zvcm06IEJhc2VUcmFuc2Zvcm07XG5cdHByb3RlY3RlZCB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0sIGlzQWJzb2x1dGVQb3NpdGlvbj86IGJvb2xlYW4gKSB7XG5cblx0XHR0aGlzLm9iaiA9IG9iamVjdDtcblxuXHRcdHRoaXMuYmFzZVRyYW5zZm9ybSA9IHtcblx0XHRcdHBvc2l0aW9uOiB0aGlzLm9iai5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0cm90YXRpb246IHRoaXMub2JqLnF1YXRlcm5pb24uY2xvbmUoKSxcblx0XHRcdHNjYWxlOiB0aGlzLm9iai5zY2FsZS5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG5cdFx0aWYgKCAhIGlzQWJzb2x1dGVQb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uYWRkKCB0aGlzLm9iai5wb3NpdGlvbiApO1xuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucm90YXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucm90YXRpb24ubXVsdGlwbHkoIHRoaXMub2JqLnF1YXRlcm5pb24gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZVRyYW5zZm9ybSggd2VpZ2h0OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5wb3NpdGlvbi5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKS5sZXJwKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0ucm90YXRpb24gKSB7XG5cblx0XHRcdHRoaXMub2JqLnF1YXRlcm5pb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCkuc2xlcnAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLCB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSApIHtcblxuXHRcdFx0dGhpcy5vYmouc2NhbGUuY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnNjYWxlLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMudHJhbnNmb3JtLnNjYWxlICogKCB3ZWlnaHQgKSArIDEuMCAtIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBBbmltYXRvclZhcmlhYmxlVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMZXJwRnVuYzxUPntcblx0KCBhOiBULCBiOiBULCB0OiBudW1iZXIgKTogVDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMZXJwcyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlciggYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhICsgKCBiIC0gYSApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlckFycmF5KCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggYS5sZW5ndGggPT0gYi5sZW5ndGggKSB7XG5cblx0XHRcdGxldCBjID0gW107XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGMucHVzaCggYVsgaSBdICsgKCBiWyBpIF0gLSBhWyBpIF0gKSAqIHQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCAnRGlmZmVyZW50IGxlbmd0aCBBcnJheXMhISEnICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFVmVjdG9ycyggYTogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIGI6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLmxlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFUXVhdGVybmlvbiggYTogVEhSRUUuUXVhdGVybmlvbiwgYjogVEhSRUUuUXVhdGVybmlvbiwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5zbGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVFdWxlciggYTogVEhSRUUuRXVsZXIsIGI6IFRIUkVFLkV1bGVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgYWMgPSBhLmNsb25lKCk7XG5cdFx0bGV0IGJjID0gYi5jbG9uZSgpO1xuXG5cdFx0YWMueCA9IGFjLnggKyAoIGJjLnggLSBhYy54ICkgKiB0O1xuXHRcdGFjLnkgPSBhYy55ICsgKCBiYy55IC0gYWMueSApICogdDtcblx0XHRhYy56ID0gYWMueiArICggYmMueiAtIGFjLnogKSAqIHQ7XG5cblx0XHRyZXR1cm4gYWM7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRMZXJwRnVuYyggdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgKCB2YWx1ZSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlckFycmF5O1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc1ZlY3RvcjJcIiBpbiB2YWx1ZSB8fCBcImlzVmVjdG9yM1wiIGluIHZhbHVlIHx8IFwiaXNWZWN0b3I0XCIgaW4gdmFsdWUgfHwgXCJpc0NvbG9yXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVZlY3RvcnM7XG5cblx0XHR9IGVsc2UgaWYgKCBcImlzUXVhdGVybmlvblwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVRdWF0ZXJuaW9uO1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc0V1bGVyXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRUV1bGVyO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTW91c2VSb3RhdG9yIHtcblxuXHRwdWJsaWMgdGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblx0cHVibGljIHNjcm9sbFZlbDogVEhSRUUuVmVjdG9yMjtcblxuXHRjb25zdHJ1Y3Rvciggb2JqczogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHR0aGlzLnRhcmdldCA9IG9ianM7XG5cblx0XHR0aGlzLnNjcm9sbFZlbCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMuc2Nyb2xsVmVsLm11bHRpcGx5U2NhbGFyKCAwLjk2ICk7XG5cblx0XHRsZXQgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCB0aGlzLnNjcm9sbFZlbC55LCB0aGlzLnNjcm9sbFZlbC54LCAwLjAgKS5ub3JtYWxpemUoKTtcblxuXHRcdGxldCBxID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tQXhpc0FuZ2xlKCBheGlzLCB0aGlzLnNjcm9sbFZlbC5sZW5ndGgoKSApO1xuXHRcdHEubXVsdGlwbHkoIHRoaXMudGFyZ2V0LnF1YXRlcm5pb24gKTtcblxuXHRcdHRoaXMudGFyZ2V0LnF1YXRlcm5pb24uY29weSggcSApO1xuXG5cdH1cblxuXHRhZGRWZWxvY2l0eSggc2Nyb2xsRGVsdGE6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHR0aGlzLnNjcm9sbFZlbC5hZGRWZWN0b3JzKCB0aGlzLnNjcm9sbFZlbCwgc2Nyb2xsRGVsdGEubXVsdGlwbHlTY2FsYXIoIDAuMDAxICkgKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgUGFnZVNjcm9sbGVyIH0gZnJvbSAnLic7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnRBcmdzIHtcclxuXHRzY3JvbGxlcjogUGFnZVNjcm9sbGVyO1xyXG5cdHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0c2Nyb2xsTW9kZTogc3RyaW5nO1xyXG5cdHNjcm9sbERlbHRhOiBudW1iZXI7XHJcblx0c2Nyb2xsUG93ZXI6IG51bWJlcjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnQge1xyXG5cdGNvbW1vbj86ICggYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzICkgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0dXA/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdGRvd24/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJFdmVudHMge1xyXG5cdG9uU3RhcnRTY3JvbGw/OiBQYWdlU2Nyb2xsZXJFdmVudFxyXG5cdG9uQXJyaXZhbHM/OiB7XHJcblx0XHRwZXJjZW50YWdlOiBudW1iZXI7XHJcblx0XHRldmVudDogUGFnZVNjcm9sbGVyRXZlbnQ7XHJcblx0fVtdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0ZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHN0b3A/OiBib29sZWFuO1xyXG5cdHN0YXJ0U2Nyb2xsVXA/OiBudW1iZXI7XHJcblx0c3RhcnRTY3JvbGxEb3duPzogbnVtYmVyO1xyXG5cdGJvdHRvbT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0IHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2Nyb2xsZXJTZWN0aW9uIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0cHVibGljIHJlY3Q6IFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0O1xyXG5cdHB1YmxpYyBzdGFydFNjcm9sbFVwOiBudW1iZXI7XHJcblx0cHVibGljIHN0YXJ0U2Nyb2xsRG93bjogbnVtYmVyO1xyXG5cdHB1YmxpYyBzdG9wPzogYm9vbGVhbjtcclxuXHRwdWJsaWMgZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHB1YmxpYyBib3R0b20/OiBib29sZWFuO1xyXG5cdHB1YmxpYyB0aW1lbGluZVBlcmNlbnRhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBwYXJhbXM6IFBhZ2VTY3JvbGxlclNlY3Rpb25QYXJhbXMgKSB7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBwYXJhbXMuZWxlbWVudDtcclxuXHRcdHRoaXMucmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHRoaXMuc3RvcCA9IHBhcmFtcy5zdG9wO1xyXG5cdFx0dGhpcy5ldmVudHMgPSBwYXJhbXMuZXZlbnRzO1xyXG5cdFx0dGhpcy5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG5cdFx0dGhpcy5zdGFydFNjcm9sbERvd24gPSBwYXJhbXMuc3RhcnRTY3JvbGxEb3duIHx8IDA7XHJcblx0XHR0aGlzLnN0YXJ0U2Nyb2xsVXAgPSBwYXJhbXMuc3RhcnRTY3JvbGxVcCB8fCAwO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUmVjdCggMCApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgaXNQYWdlU2Nyb2xsZXJTZWN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGVSZWN0KCBzY3JvbGxQb3M6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnJlY3QgPSB7XHJcblx0XHRcdHg6IHRoaXMuZWxlbWVudC5vZmZzZXRMZWZ0LFxyXG5cdFx0XHR5OiB0aGlzLmVsZW1lbnQub2Zmc2V0VG9wIC0gc2Nyb2xsUG9zLFxyXG5cdFx0XHR3aWR0aDogdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHRcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFNjcm9sbFBlcmNlbnRhZ2UoIG9mZnNldFBvcz86IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gKCB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICk7XHJcblx0XHRsZXQgcG9zID0gKCB0aGlzLnJlY3QueSArIGJvdHRvbU9mZnNldCApIC0gKCBvZmZzZXRQb3MgfHwgMCApO1xyXG5cclxuXHRcdGxldCBmaXJzdEhhbGZIZWlnaHQgPSB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRsZXQgZmlyc3RIYWxmID0gTWF0aC5taW4oIDEuMCwgMS4wIC0gKCBwb3MgLyBmaXJzdEhhbGZIZWlnaHQgKSApO1xyXG5cclxuXHRcdGxldCBzZWNvbmRIYWxmSGVpZ2h0ID0gdGhpcy5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiB0aGlzLnJlY3QuaGVpZ2h0O1xyXG5cdFx0bGV0IHNlY29uZEhhbGYgPSBNYXRoLm1heCggMC4wLCAtIHBvcyAvIHNlY29uZEhhbGZIZWlnaHQgKTtcclxuXHJcblx0XHRsZXQgcGVyY2VudGFnZSA9IGZpcnN0SGFsZiArIHNlY29uZEhhbGY7XHJcblxyXG5cdFx0cmV0dXJuIHBlcmNlbnRhZ2U7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zLCBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgfSBmcm9tICcuL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jLCBFYXNpbmdzIH0gZnJvbSAnLi4vRWFzaW5ncyc7XHJcbmltcG9ydCB7IEFuaW1hdG9yIH0gZnJvbSAnLi4vQW5pbWF0b3InO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckF1dG9Nb3ZlUGFyYW0ge1xyXG5cdHRhcmdldDogc3RyaW5nIHwgbnVtYmVyIHwgUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRkdXJhdGlvbj86IG51bWJlcjtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cdGNhbGxCYWNrPzogRnVuY3Rpb247XHJcblx0Ym90dG9tPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTY3JvbGxlciB7XHJcblxyXG5cdHByb3RlY3RlZCBhbmltYXRvcjogQW5pbWF0b3I7XHJcblx0cHJvdGVjdGVkIGlzQXV0b01vdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJvdGVjdGVkIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdHByb3RlY3RlZCBwYXJlbnRFbGVtZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdHByb3RlY3RlZCBzZWN0aW9uczogUGFnZVNjcm9sbGVyU2VjdGlvbltdO1xyXG5cclxuXHRwdWJsaWMgZGVsYXlTcGVlZDogbnVtYmVyID0gMC4xO1xyXG5cdHB1YmxpYyBkcmFnRGVsYXlTcGVlZDogbnVtYmVyID0gMC40O1xyXG5cdHByb3RlY3RlZCBpc1RvdWNoaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGRlbHRhTWVtOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgc3VtRGVsdGE6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zTWVtOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUGVyY2VudGFnZTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQb3NEZWxheTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBlcmNlbnRhZ2VEZWxheTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIGNhdWdodFNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24gfCBudWxsO1xyXG5cdHByb3RlY3RlZCBkcmFnU3RvcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBkcmFnVW5sb2NrUmVhZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcclxuXHRcdHRoaXMucGFyZW50RWxlbWVudEhlaWdodCA9IHBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMuY2F1Z2h0U2VjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0aW5pdCBBbmltYXRvclxyXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRvci5hZGQoIHtcclxuXHRcdFx0bmFtZTogJ3Njcm9sbFBvcycsXHJcblx0XHRcdGluaXRWYWx1ZTogMCxcclxuXHRcdFx0ZWFzaW5nOiBFYXNpbmdzLnNpZ21vaWQoKVxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUG9zKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQb3M7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQb3NEZWxheSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUG9zRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQZXJjZW50YWdlKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUGVyY2VudGFnZURlbGF5KCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxUaW1lbGluZVBlcmNlbnRhZ2UoKSB7XHJcblxyXG5cdFx0bGV0IHN1bSA9IDA7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc2VjID0gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cdFx0XHRsZXQgc2VjQmVmID0gdGhpcy5zZWN0aW9uc1sgaSAtIDEgXTtcclxuXHJcblx0XHRcdGxldCBhID0gTWF0aC5tYXgoIDAuMCwgc2VjLmVsZW1lbnQub2Zmc2V0VG9wIC0gdGhpcy5zY3JvbGxQb3NEZWxheSArICggc2VjLmJvdHRvbSA/IHNlYy5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKSApO1xyXG5cdFx0XHRsZXQgYiA9ICggKCBzZWNCZWYgPyBzZWNCZWYucmVjdC5oZWlnaHQgLSAoIHNlY0JlZi5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgOiAwICkgKyAoIHNlYy5ib3R0b20gPyBzZWMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgKSB8fCAxO1xyXG5cclxuXHRcdFx0bGV0IGQgPSAxLjAgLSAoIGEgLyBiICk7XHJcblx0XHRcdGQgPSBNYXRoLm1heCggMC4wLCBkICk7XHJcblxyXG5cdFx0XHRzdW0gKz0gZDtcclxuXHJcblx0XHRcdGlmICggZCA8IDEuMCApIGJyZWFrO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3VtIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZCggc2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiApIHtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zLnB1c2goIHNlY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLnNvcnRTZWN0aW9ucygpO1xyXG5cclxuXHRcdHJldHVybiBzZWN0aW9uO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzb3J0U2VjdGlvbnMoKSB7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucy5zb3J0KCAoIGE6IFBhZ2VTY3JvbGxlclNlY3Rpb24sIGI6IFBhZ2VTY3JvbGxlclNlY3Rpb24gKTogbnVtYmVyID0+IHtcclxuXHJcblx0XHRcdHJldHVybiBhLnJlY3QueSA+IGIucmVjdC55ID8gMSA6IC0gMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNlY3Rpb25zWyBpIF0udGltZWxpbmVQZXJjZW50YWdlID0gKCBpICsgMSApIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQoIG5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5zZWN0aW9uc1sgaSBdLm5hbWUgPT0gbmFtZSApIHJldHVybiB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUud2FybiggJ3NlY3Rpb24gXCInICsgbmFtZSArICdcIiBpcyBub3QgZXhpc3QuJyApO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUGFyZW50RWxlbWVudCgpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsUG9zKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHR0aGlzLmFwcGx5UGFyZW50RWxlbWVudFRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZVNjcm9sbFBvcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVBdXRvTW92ZSggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0dGhpcy5hZGRTY3JvbGxQb3MoKTtcclxuXHJcblx0XHR0aGlzLmNhbGNTY3JvbGxQcm9wZXJ0aWVzKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlQXV0b01vdmUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IudXBkYXRlKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdGxldCBwb3MgPSB0aGlzLmFuaW1hdG9yLmdldDxudW1iZXI+KCAnc2Nyb2xsUG9zJyApO1xyXG5cclxuXHRcdFx0aWYgKCBwb3MgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc3VtRGVsdGEgPSBwb3MgLSB0aGlzLnNjcm9sbFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkZFNjcm9sbFBvcygpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2hlY2tVbmxvY2tTdG9wU2Nyb2xsKCB0aGlzLnN1bURlbHRhICkgKSB7XHJcblxyXG5cdFx0XHRsZXQgc3RvcFBvcyA9IHRoaXMuY2hlY2tUaHJvdyggdGhpcy5zdW1EZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBzdG9wUG9zO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5fc2Nyb2xsUG9zICs9IHRoaXMuc3VtRGVsdGE7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBNYXRoLm1heCggTWF0aC5taW4oIHRoaXMuX3Njcm9sbFBvcywgdGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ICksIDAgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVW5sb2NrU3RvcFNjcm9sbCggc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgdW5sb2NrRGlyOiBudW1iZXIgPSAwO1xyXG5cdFx0bGV0IHVubG9jazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICggdGhpcy5jYXVnaHRTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IGRpc3RhbmNlID0gdGhpcy5zY3JvbGxQb3MgLSB0aGlzLnNjcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdFx0aWYgKCBzY3JvbGxEZWx0YSAqIGRpc3RhbmNlIDwgMCB8fCBNYXRoLmFicyggZGlzdGFuY2UgKSA8IDEwLjAgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHNjcm9sbERlbHRhIDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoIC0gc2Nyb2xsRGVsdGEgPiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5zdGFydFNjcm9sbFVwIHx8IDAgKSB8fCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAtIDE7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzY3JvbGxEZWx0YSA+IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBzY3JvbGxEZWx0YSA+ICggdGhpcy5jYXVnaHRTZWN0aW9uLnN0YXJ0U2Nyb2xsRG93biB8fCAwICkgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gMTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdW5sb2NrRGlyICE9IDAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cyApIHtcclxuXHJcblx0XHRcdFx0aWYgKCB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyA9IHtcclxuXHRcdFx0XHRcdFx0c2Nyb2xsZXI6IHRoaXMsXHJcblx0XHRcdFx0XHRcdHNlY3Rpb246IHRoaXMuY2F1Z2h0U2VjdGlvbixcclxuXHRcdFx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0XHRcdHNjcm9sbERlbHRhOiBzY3JvbGxEZWx0YSxcclxuXHRcdFx0XHRcdFx0c2Nyb2xsUG93ZXI6IE1hdGguYWJzKCBzY3JvbGxEZWx0YSApLFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRsZXQgdW5sb2NrOiBib29sZWFuIHwgdm9pZDtcclxuXHJcblx0XHRcdFx0XHRsZXQgY29tbW9uVW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmNvbW1vbiAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuY29tbW9uKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAtIDEgKSB1bmxvY2sgPSB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwudXAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLnVwKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAxICkgdW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24gJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGNvbW1vblVubG9jayA9PT0gZmFsc2UgfHwgdW5sb2NrID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IDA7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR1bmxvY2sgPSB1bmxvY2tEaXIgIT0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dW5sb2NrID0gdHJ1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB1bmxvY2tEaXIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5sb2NrO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93KCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHNlYyA9IHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdHNlYy51cGRhdGVSZWN0KCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHJcblx0XHRcdGxldCBzdG9wUG9zID0gdGhpcy5jaGVja1Rocm93U2VjdGlvbkV2ZW50cyggc2VjLCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBzZWM7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzQXV0b01vdmUgPyBudWxsIDogc3RvcFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3dTZWN0aW9uRXZlbnRzKCBzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBwZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCk7XHJcblx0XHRsZXQgbW92ZWRQZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdGlmICggc2VjdGlvbi5ldmVudHMgKSB7XHJcblxyXG5cdFx0XHRsZXQgYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzID0ge1xyXG5cdFx0XHRcdHNjcm9sbGVyOiB0aGlzLFxyXG5cdFx0XHRcdHNlY3Rpb246IHNlY3Rpb24sXHJcblx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0c2Nyb2xsRGVsdGE6IHNjcm9sbERlbHRhLFxyXG5cdFx0XHRcdHNjcm9sbFBvd2VyOiBNYXRoLmFicyggc2Nyb2xsRGVsdGEgKSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICggc2VjdGlvbi5ldmVudHMub25BcnJpdmFscyApIHtcclxuXHJcblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgc2VjdGlvbi5ldmVudHMub25BcnJpdmFscy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFycml2YWxFdmVudCA9IHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHNbIGkgXTtcclxuXHJcblx0XHRcdFx0XHRsZXQgaXNUaHJvdyA9IHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgYXJyaXZhbEV2ZW50LnBlcmNlbnRhZ2UgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGlzVGhyb3cgIT0gMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC5jb21tb24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmNvbW1vbiggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCBpc1Rocm93IDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LnVwICYmIGFycml2YWxFdmVudC5ldmVudC51cCggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LmRvd24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBzZWN0aW9uLnN0b3AgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgMSApICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmRyYWdVbmxvY2tSZWFkeSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2VjdGlvbi5lbGVtZW50Lm9mZnNldFRvcCArICggc2VjdGlvbi5ib3R0b20gPyBzZWN0aW9uLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvd0xpbmUoIGE6IG51bWJlciwgYiA6bnVtYmVyLCBsaW5lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCBhIDwgbGluZSAmJiBsaW5lIDw9IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBhID4gbGluZSAmJiBsaW5lID49IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAxO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGEgPT0gbGluZSAmJiBsaW5lID09IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMjtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjU2Nyb2xsUHJvcGVydGllcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUG9zRGVsYXkgKz0gKCB0aGlzLl9zY3JvbGxQb3MgLSB0aGlzLl9zY3JvbGxQb3NEZWxheSApICogKCB0aGlzLmlzVG91Y2hpbmcgJiYgISB0aGlzLmNhdWdodFNlY3Rpb24gPyB0aGlzLmRyYWdEZWxheVNwZWVkIDogdGhpcy5kZWxheVNwZWVkICkgKiBNYXRoLm1pbiggMS4wLCBkZWx0YVRpbWUgKiA2MCApO1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2UgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3MgKTtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXkgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3NEZWxheSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBzY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHNjcm9sbFBvczogbnVtYmVyICkge1xyXG5cclxuXHRcdHJldHVybiBzY3JvbGxQb3MgLyAoIHRoaXMucGFyZW50RWxlbWVudEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCApO1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlUGFyZW50RWxlbWVudCgpIHtcclxuXHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseVBhcmVudEVsZW1lbnRUcmFuc2Zvcm0oKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCggMCwnICsgLSB0aGlzLnNjcm9sbFBvc0RlbGF5LnRvU3RyaW5nKCkgKyAncHgsIDAgKSc7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbCggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmRlbHRhTWVtID0gKCB0aGlzLmRlbHRhTWVtICsgZGVsdGEgKSAvIDI7XHJcblx0XHR0aGlzLnN1bURlbHRhICs9IGRlbHRhO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYXRjaCgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5kZWx0YU1lbSA9IDA7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuX3Njcm9sbFBvcyA9IHRoaXMuX3Njcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZHJhZyggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5pc1RvdWNoaW5nICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2Nyb2xsKCBkZWx0YSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWxlYXNlKCBzbmFwOiBudW1iZXIgPSAxMC4wICkge1xyXG5cclxuXHRcdGlmICggISB0aGlzLmlzVG91Y2hpbmcgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuc2Nyb2xsKCB0aGlzLmRlbHRhTWVtICogc25hcCApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXV0b01vdmUoIHBhcmFtOiBQYWdlU2Nyb2xsZXJBdXRvTW92ZVBhcmFtICkge1xyXG5cclxuXHRcdGxldCB0YXJnZXRQb3M6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0aWYgKCAoIHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uICkuaXNQYWdlU2Nyb2xsZXJTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdHRhcmdldFBvcyA9IHRhcmdldC5lbGVtZW50Lm9mZnNldFRvcCArIGJvdHRvbU9mZnNldDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgcGFyYW0udGFyZ2V0ID09ICdzdHJpbmcnICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuZ2V0KCBwYXJhbS50YXJnZXQgKTtcclxuXHJcblx0XHRcdGlmICggdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdFx0dGFyZ2V0UG9zID0gdGFyZ2V0LmVsZW1lbnQub2Zmc2V0VG9wICsgYm90dG9tT2Zmc2V0O1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBwYXJhbS50YXJnZXQgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXRQb3MgPSBwYXJhbS50YXJnZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3Iuc2V0VmFsdWUoICdzY3JvbGxQb3MnLCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHRcdHRoaXMuYW5pbWF0b3IuYW5pbWF0ZSggJ3Njcm9sbFBvcycsIHRhcmdldFBvcywgcGFyYW0uZHVyYXRpb24sICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcGFyYW0uY2FsbEJhY2sgKSBwYXJhbS5jYWxsQmFjaygpO1xyXG5cclxuXHRcdFx0dGhpcy5pc0F1dG9Nb3ZlID0gZmFsc2U7XHJcblxyXG5cdFx0fSwgcGFyYW0uZWFzaW5nICk7XHJcblxyXG5cdFx0Ly9vblN0YXJ0U2Nyb2xs5YaF44GnQXV0b01vdmXjgZfjgZ/jgajjgY3jgIHnhKHpmZDjg6vjg7zjg5fjgavpmaXjgovjga7jgpLpmLvmraJcclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAoIHRhcmdldFBvcyAtIHRoaXMuc3VtRGVsdGEgKSAvIE1hdGguYWJzKCB0YXJnZXRQb3MgLSB0aGlzLnN1bURlbHRhICkgKiAwLjAwMDAxO1xyXG5cclxuXHRcdHRoaXMuaXNBdXRvTW92ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2ludGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcm90ZWN0ZWQgaXNTUDogYm9vbGVhbjtcblx0cHJvdGVjdGVkIGlzVG91Y2hpbmc6IGJvb2xlYW47XG5cblx0cHVibGljIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRwdWJsaWMgZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXHRcdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0dGhpcy5pc1NQID0gdXNlckFnZW50LmluZGV4T2YoICdpUGhvbmUnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQYWQnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ0FuZHJvaWQnICkgPj0gMCB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJpUGFkXCIgfHwgKCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJTYWZhcmlcIiApICE9IC0gMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiQ2hyb21lXCIgKSA9PSAtIDEgJiYgKCBuYXZpZ2F0b3IgYXMgYW55ICkuc3RhbmRhbG9uZSAhPT0gdW5kZWZpbmVkICk7XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGNvbnN0IG9uVG91Y2hTdGFydCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblRvdWNoTW92ZSA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uVG91Y0VuZCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcImVuZFwiICk7XG5cdFx0Y29uc3Qgb25Qb2ludGVyRG93biA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwic3RhcnRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlck1vdmUgPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlclVwID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uV2hlZWwgPSB0aGlzLndoZWVsLmJpbmQoIHRoaXMgKTtcblxuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgb25Qb2ludGVyVXAgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnZW5kXCIsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cblx0XHRjb25zdCBvblVuUmVnaXN0ZXIgPSAoIGU6IGFueSApID0+IHtcblxuXHRcdFx0aWYgKCBlbG0uaXNFcXVhbE5vZGUoIGUuZWxtICkgKSB7XG5cblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0ICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93biApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdlbmRcIiwgb25Qb2ludGVyVXAgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCApO1xuXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHR9XG5cblx0cHVibGljIHVucmVnaXN0ZXJFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndW5yZWdpc3RlcicsXG5cdFx0XHRlbG06IGVsbSxcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRTY3JlZW5Qb3NpdGlvbiggd2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdGlmICggdGhpcy5wb3NpdGlvbi54ICE9IHRoaXMucG9zaXRpb24ueCApIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uLmNsb25lKClcblx0XHRcdC5kaXZpZGUoIHdpbmRvd1NpemUgKVxuXHRcdFx0Lm11bHRpcGx5U2NhbGFyKCAyLjAgKVxuXHRcdFx0LnN1YlNjYWxhciggMS4wICk7XG5cdFx0cC55ICo9IC0gMTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbiggZWxtOiBIVE1MRWxlbWVudCwgc2NyZWVuPzogYm9vbGVhbiApIHtcblxuXHRcdGNvbnN0IHJlY3Q6IERPTVJlY3QgPSBlbG0uZ2V0Q2xpZW50UmVjdHMoKVsgMCBdIGFzIERPTVJlY3Q7XG5cblx0XHRsZXQgeCA9IHRoaXMucG9zaXRpb24ueCAtIHJlY3QubGVmdDtcblx0XHRsZXQgeSA9IHRoaXMucG9zaXRpb24ueSAtIHJlY3QudG9wO1xuXG5cdFx0aWYgKCBzY3JlZW4gKSB7XG5cblx0XHRcdHggLz0gcmVjdC53aWR0aDtcblx0XHRcdHkgLz0gcmVjdC5oZWlnaHQ7XG5cblx0XHR9XG5cblx0XHRjb25zdCBwID0gbmV3IFRIUkVFLlZlY3RvcjIoIHgsIHkgKTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0UG9zKCB4OiBudW1iZXIsIHk6IG51bWJlciApIHtcblxuXHRcdGlmIChcblx0XHRcdCEgKCB0aGlzLnBvc2l0aW9uLnggIT09IHRoaXMucG9zaXRpb24ueCB8fCB0aGlzLnBvc2l0aW9uLnkgIT09IHRoaXMucG9zaXRpb24ueSApXG5cdFx0KSB7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCB4IC0gdGhpcy5wb3NpdGlvbi54LCB5IC0gdGhpcy5wb3NpdGlvbi55ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggeCwgeSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Ub3VjaCggdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50ICkge1xuXG5cdFx0Y29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbIDAgXTtcblxuXHRcdGlmICggdG91Y2ggKSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIHRvdWNoLnBhZ2VYLCB0b3VjaC5wYWdlWSwgdHlwZSwgZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCB0eXBlID09ICdlbmQnICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIE5hTiwgTmFOLCB0eXBlLCBlICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uUG9pbnRlciggdHlwZTogc3RyaW5nLCBlOiBQb2ludGVyRXZlbnQgfCBEcmFnRXZlbnQgKSB7XG5cblx0XHRjb25zdCBwb2ludGVyVHlwZSA9ICggZSBhcyBQb2ludGVyRXZlbnQgKS5wb2ludGVyVHlwZTtcblxuXHRcdGlmICggcG9pbnRlclR5cGUgIT0gbnVsbCApIHtcblxuXHRcdFx0aWYgKCBwb2ludGVyVHlwZSA9PSAnbW91c2UnICYmICggZS5idXR0b24gPT0gLSAxIHx8IGUuYnV0dG9uID09IDAgKSApIHtcblxuXHRcdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlIGFzIFBvaW50ZXJFdmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0b3VjaEV2ZW50SGFuZGxlciggcG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIsIHR5cGU6IHN0cmluZywgZTogVG91Y2hFdmVudCB8IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGxldCBkaXNwYXRjaCA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgeCA9IHBvc1ggLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHBvc1kgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRpZiAoIHR5cGUgPT0gXCJzdGFydFwiICkge1xuXG5cdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9IGVsc2UgaWYgKCB0eXBlID09IFwibW92ZVwiICkge1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHRpZiAoIHRoaXMuaXNUb3VjaGluZyApIHtcblxuXHRcdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJlbmRcIiApIHtcblxuXHRcdFx0aWYgKCAndGFyZ2V0VG91Y2hlcycgaW4gZSApIHtcblxuXHRcdFx0XHRpZiAoIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRpZiAoIGRpc3BhdGNoICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogZSxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogdHlwZSxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0aWYgKCAhIHRoaXMuaXNTUCApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICd1cGRhdGUnLFxuXHRcdFx0XHRwb2ludGVyRXZlbnQ6IG51bGwsXG5cdFx0XHRcdHBvaW50ZXJFdmVudFR5cGU6ICdob3ZlcicsXG5cdFx0XHRcdHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHRcdGRlbHRhOiB0aGlzLmRlbHRhLmNsb25lKClcblx0XHRcdH0gKTtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIDAsIDAsICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0cmFja3BhZE1lbURlbHRhID0gMDtcblx0cHJvdGVjdGVkIHRyYWNrcGFkTWF4ID0gZmFsc2U7XG5cblx0cHJvdGVjdGVkIHdoZWVsKCBlOiBXaGVlbEV2ZW50ICkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAnd2hlZWwnLFxuXHRcdFx0d2hlZWxFdmVudDogZSxcblx0XHR9ICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCBwYXNzVGhyb3dWZXJ0IGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3cudnMnO1xuXG50eXBlIElucHV0UmVuZGVyVGFyZ2V0ID0geyBba2V5OnN0cmluZ106IFRIUkVFLlRleHR1cmUgfCBUSFJFRS5UZXh0dXJlW10gfTtcblxuZXhwb3J0IGludGVyZmFjZSBQUFBhcmFtIGV4dGVuZHMgVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJze1xuXHRpbnB1dFJlbmRlclRhcmdldHM/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIFBvc3RQcm9jZXNzaW5nIHtcblxuXHRwcml2YXRlIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXHRwcml2YXRlIHNjZW5lOiBUSFJFRS5TY2VuZTtcblx0cHJpdmF0ZSBjYW1lcmE6IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYTtcblx0cHJpdmF0ZSBzY3JlZW46IFRIUkVFLk1lc2g7XG5cblx0cHVibGljIGVmZmVjdDoge1xuXHRcdG1hdGVyaWFsOiBUSFJFRS5TaGFkZXJNYXRlcmlhbCxcblx0fTtcblxuXHRjb25zdHJ1Y3RvciggcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIsIHBwUGFyYW06IFBQUGFyYW0sIGN1c3RvbUdlb21ldHJ5PzogVEhSRUUuQnVmZmVyR2VvbWV0cnkgKSB7XG5cblx0XHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG5cdFx0dGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLk9ydGhvZ3JhcGhpY0NhbWVyYSggLSAxLjAsIDEuMCwgMS4wLCAtIDEuMCApO1xuXG5cdFx0dGhpcy5zY3JlZW4gPSBuZXcgVEhSRUUuTWVzaCggY3VzdG9tR2VvbWV0cnkgfHwgbmV3IFRIUkVFLlBsYW5lR2VvbWV0cnkoIDIsIDIgKSApO1xuXHRcdHRoaXMuc2NlbmUuYWRkKCB0aGlzLnNjcmVlbiApO1xuXG5cdFx0cHBQYXJhbS52ZXJ0ZXhTaGFkZXIgPSBwcFBhcmFtLnZlcnRleFNoYWRlciB8fCBwYXNzVGhyb3dWZXJ0O1xuXHRcdHBwUGFyYW0udW5pZm9ybXMgPSBwcFBhcmFtLnVuaWZvcm1zIHx8IHt9O1xuXHRcdHBwUGFyYW0udW5pZm9ybXMucmVzb2x1dGlvbiA9IHtcblx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0fTtcblxuXHRcdHRoaXMuZWZmZWN0ID0ge1xuXHRcdFx0bWF0ZXJpYWw6IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcHBQYXJhbSApLFxuXHRcdH07XG5cblx0fVxuXG5cdHB1YmxpYyByZW5kZXIoIGlucHV0UmVuZGVyVGFyZ2V0czogSW5wdXRSZW5kZXJUYXJnZXQgfCBudWxsLCByZW5kZXJUYXJnZXQ6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0IHwgbnVsbCA9IG51bGwgKSB7XG5cblx0XHRsZXQgcmVuZGVyVGFyZ2V0TWVtID0gdGhpcy5yZW5kZXJlci5nZXRSZW5kZXJUYXJnZXQoKTtcblxuXHRcdGxldCBlZmZlY3QgPSB0aGlzLmVmZmVjdDtcblx0XHRsZXQgbWF0ZXJpYWwgPSBlZmZlY3QubWF0ZXJpYWw7XG5cdFx0bGV0IHVuaWZvcm1zID0gbWF0ZXJpYWwudW5pZm9ybXM7XG5cblx0XHRpZiAoIGlucHV0UmVuZGVyVGFyZ2V0cyApIHtcblxuXHRcdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggaW5wdXRSZW5kZXJUYXJnZXRzICk7XG5cblx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyBqICsrICkge1xuXG5cdFx0XHRcdGlmICggdW5pZm9ybXNbIGtleXNbIGogXSBdICkge1xuXG5cdFx0XHRcdFx0dW5pZm9ybXNbIGtleXNbIGogXSBdLnZhbHVlID0gaW5wdXRSZW5kZXJUYXJnZXRzWyBrZXlzWyBqIF0gXTtcblxuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0dW5pZm9ybXNbIGtleXNbIGogXSBdID0geyB2YWx1ZTogaW5wdXRSZW5kZXJUYXJnZXRzWyBrZXlzWyBqIF0gXSB9O1xuXG5cdFx0XHRcdFx0ZWZmZWN0Lm1hdGVyaWFsLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuXHRcdFx0XHRcdGVmZmVjdC5tYXRlcmlhbC51bmlmb3JtcyA9IHVuaWZvcm1zO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKCByZW5kZXJUYXJnZXQgKSB7XG5cblx0XHRcdHVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUuc2V0KCByZW5kZXJUYXJnZXQud2lkdGgsIHJlbmRlclRhcmdldC5oZWlnaHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMucmVuZGVyZXIuZ2V0U2l6ZSggdW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5zY3JlZW4ubWF0ZXJpYWwgPSBtYXRlcmlhbDtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCByZW5kZXJUYXJnZXQgKTtcblxuXHRcdHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYSApO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldE1lbSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBBbmltYXRvclZhcmlhYmxlVHlwZSB9IGZyb20gJy4vQW5pbWF0b3InO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jIH0gZnJvbSAnLi9FYXNpbmdzJztcclxuaW1wb3J0IHsgTGVycHMsIExlcnBGdW5jIH0gZnJvbSAnLi9MZXJwcyc7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvcktleUZyYW1lPFQ+IHtcclxuXHR0aW1lOiBudW1iZXI7XHJcblx0dmFsdWU6IFQ7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JWYXJpYWJsZTxUPiB7XHJcblx0a2V5ZnJhbWVzOiBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8VD5bXTtcclxuXHRsZXJwRnVuYz86IExlcnBGdW5jPFQ+O1xyXG5cdHZhbHVlOiBUO1xyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yQWRkUGFyYW1zPFQ+IHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0a2V5ZnJhbWVzOiBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8VD5bXTtcclxuXHRjdXN0b21MZXJwPzogTGVycEZ1bmM8VD4sXHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxufVxyXG5leHBvcnQgY2xhc3MgVGltZWxpbmVBbmltYXRvciB7XHJcblxyXG5cdHByb3RlY3RlZCB2YXJpYWJsZXM6IHsgW25hbWU6IHN0cmluZ106IFRpbWVsaW5lQW5pbWF0b3JWYXJpYWJsZTxhbnk+IH0gPSB7fTtcclxuXHRwcm90ZWN0ZWQgdGltZTogbnVtYmVyO1xyXG5cdHB1YmxpYyBkZWZhdWx0RWFzaW5nPzogRWFzaW5nRnVuYztcclxuXHJcblx0Y29uc3RydWN0b3IoICkge1xyXG5cclxuXHRcdHRoaXMudGltZSA9IDA7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBwYXJhbXM6IFRpbWVsaW5lQW5pbWF0b3JBZGRQYXJhbXM8VD4gKSB7XHJcblxyXG5cdFx0aWYgKCBwYXJhbXMua2V5ZnJhbWVzLmxlbmd0aCA9PSAwICkge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgcGFyYW1zLm5hbWUgKyAnXCInLCAnS2V5ZnJhbWUgbGVuZ3RoIGlzIDAhIScgKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0gPSB7XHJcblx0XHRcdGtleWZyYW1lczogcGFyYW1zLmtleWZyYW1lcyxcclxuXHRcdFx0bGVycEZ1bmM6IHBhcmFtcy5jdXN0b21MZXJwLFxyXG5cdFx0XHRlYXNpbmc6IHBhcmFtcy5lYXNpbmcsXHJcblx0XHRcdHZhbHVlOiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmtleWZyYW1lcy5zb3J0KCAoIGEsIGIgKSA9PiB7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCBhLnRpbWUgPCBiLnRpbWUgKSA/IC0gMSA6IDE7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdGlmICggISB0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXS5sZXJwRnVuYyApIHtcclxuXHJcblx0XHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmxlcnBGdW5jID0gTGVycHMuZ2V0TGVycEZ1bmMoIHBhcmFtcy5rZXlmcmFtZXNbIDAgXS52YWx1ZSApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhbGMoKTtcclxuXHJcblx0XHRyZXR1cm4gcGFyYW1zLm5hbWU7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldDxUPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS52YWx1ZTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFyaWFibGVPYmplY3Q8VD4oIG5hbWU6IHN0cmluZyApOiBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8VD4gfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gdGltZTtcclxuXHJcblx0XHR0aGlzLmNhbGMoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsYygpIHtcclxuXHJcblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLnZhcmlhYmxlcyApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHZhbGlhYmxlID0gdGhpcy52YXJpYWJsZXNbIGtleXNbIGkgXSBdO1xyXG5cdFx0XHRsZXQga2ZzID0gdmFsaWFibGUua2V5ZnJhbWVzO1xyXG5cclxuXHRcdFx0bGV0IGE6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblx0XHRcdGxldCBiOiBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8YW55PiB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRcdFx0bGV0IHQgPSBNYXRoLm1heCgga2ZzWyAwIF0udGltZSwgTWF0aC5taW4oIGtmc1sga2ZzLmxlbmd0aCAtIDEgXS50aW1lLCB0aGlzLnRpbWUgKSApO1xyXG5cclxuXHRcdFx0bGV0IGVhc2luZzogRWFzaW5nRnVuYyB8IG51bGwgfCB1bmRlZmluZWQgPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKCBrZnMubGVuZ3RoID09IDEgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSBrZnNbIDAgXS50aW1lO1xyXG5cdFx0XHRcdGEgPSBiID0ga2ZzWyAwIF07XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHJcblx0XHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwga2ZzLmxlbmd0aCAtIDE7IGogKysgKSB7XHJcblxyXG5cdFx0XHRcdFx0YSA9IGtmc1sgaiBdO1xyXG5cdFx0XHRcdFx0YiA9IGtmc1sgaiArIDEgXTtcclxuXHJcblx0XHRcdFx0XHRlYXNpbmcgPSBhLmVhc2luZztcclxuXHJcblx0XHRcdFx0XHRpZiAoIGEudGltZSA8PSB0ICYmIHQgPD0gYi50aW1lICkgYnJlYWs7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCBhICE9IG51bGwgJiYgYiAhPSBudWxsICkge1xyXG5cclxuXHRcdFx0XHRcdHQgPSAoIHQgLSBhLnRpbWUgKSAvICggYi50aW1lIC0gYS50aW1lICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggZWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gZWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCB2YWxpYWJsZS5lYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSB2YWxpYWJsZS5lYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHRoaXMuZGVmYXVsdEVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IHRoaXMuZGVmYXVsdEVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB2YWxpYWJsZS5sZXJwRnVuYyApIHtcclxuXHJcblx0XHRcdFx0aWYgKCBhICE9IG51bGwgJiYgYiAhPSBudWxsICkge1xyXG5cclxuXHRcdFx0XHRcdHZhbGlhYmxlLnZhbHVlID0gdmFsaWFibGUubGVycEZ1bmMoIGEudmFsdWUsIGIudmFsdWUsIHQgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0aWYgKCB2YWxpYWJsZS52YWx1ZSA9PT0gZmFsc2UgKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coICdlcnJvciBhdCAnICsgJ1wiJyArIGtleXNbIGkgXSArICdcIicgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsga2V5c1sgaSBdICsgJ1wiJywgJ2xlcnAgZnVuY3Rpb24gaXMgbm90IHNldC4nICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVuaWZvcm1zeyBbIGtleTogc3RyaW5nIF0gOiBUSFJFRS5JVW5pZm9ybSB9XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFVuaWZvcm1zTGliIHtcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVW5pZm9ybXMoIC4uLnVuaWZvcm1zOiAoIFVuaWZvcm1zfHVuZGVmaW5lZCApW10gKSA6IFVuaWZvcm1zIHtcclxuXHJcblx0XHRsZXQgcmVzID0ge307XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdW5pZm9ybXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB1bmlmb3Jtc1sgaSBdICE9IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggcmVzLCB1bmlmb3Jtc1sgaSBdICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXM7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhaXRNYW4gZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnb0hvbWUoKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdnb2hvbWUnIH0gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgd2FpdCggdGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPiggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBvbkdvSG9tZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2dvaG9tZScsIG9uR29Ib21lICk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cclxuXHRcdFx0fSwgdGltZSAqIDEwMDAuMCApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKiFcbiAqIEV2ZW50RW1pdHRlciB2NS4yLjkgLSBnaXQuaW8vZWVcbiAqIFVubGljZW5zZSAtIGh0dHA6Ly91bmxpY2Vuc2Uub3JnL1xuICogT2xpdmVyIENhbGR3ZWxsIC0gaHR0cHM6Ly9vbGkubWUudWsvXG4gKiBAcHJlc2VydmVcbiAqL1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgZm9yIG1hbmFnaW5nIGV2ZW50cy5cbiAgICAgKiBDYW4gYmUgZXh0ZW5kZWQgdG8gcHJvdmlkZSBldmVudCBmdW5jdGlvbmFsaXR5IGluIG90aGVyIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRFbWl0dGVyIE1hbmFnZXMgZXZlbnQgcmVnaXN0ZXJpbmcgYW5kIGVtaXR0aW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuICAgIHZhciBwcm90byA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG4gICAgdmFyIG9yaWdpbmFsR2xvYmFsVmFsdWUgPSBleHBvcnRzLkV2ZW50RW1pdHRlcjtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgbGlzdGVuZXIgZm9yIHRoZSBldmVudCBpbiBpdHMgc3RvcmFnZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gbGlzdGVuZXJzIEFycmF5IG9mIGxpc3RlbmVycyB0byBzZWFyY2ggdGhyb3VnaC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLCAtMSBpZiBub3QgZm91bmRcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgYSBtZXRob2Qgd2hpbGUga2VlcGluZyB0aGUgY29udGV4dCBjb3JyZWN0LCB0byBhbGxvdyBmb3Igb3ZlcndyaXRpbmcgb2YgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgYWxpYXNlZCBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbGlhcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhbGlhc0Nsb3N1cmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdpbGwgaW5pdGlhbGlzZSB0aGUgZXZlbnQgb2JqZWN0IGFuZCBsaXN0ZW5lciBhcnJheXMgaWYgcmVxdWlyZWQuXG4gICAgICogV2lsbCByZXR1cm4gYW4gb2JqZWN0IGlmIHlvdSB1c2UgYSByZWdleCBzZWFyY2guIFRoZSBvYmplY3QgY29udGFpbnMga2V5cyBmb3IgZWFjaCBtYXRjaGVkIGV2ZW50LiBTbyAvYmFbcnpdLyBtaWdodCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYmFyIGFuZCBiYXouIEJ1dCBvbmx5IGlmIHlvdSBoYXZlIGVpdGhlciBkZWZpbmVkIHRoZW0gd2l0aCBkZWZpbmVFdmVudCBvciBhZGRlZCBzb21lIGxpc3RlbmVycyB0byB0aGVtLlxuICAgICAqIEVhY2ggcHJvcGVydHkgaW4gdGhlIG9iamVjdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW118T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZXR1cm4gYSBjb25jYXRlbmF0ZWQgYXJyYXkgb2YgYWxsIG1hdGNoaW5nIGV2ZW50cyBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0b3IgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBldmVudHNbZXZ0XSB8fCAoZXZlbnRzW2V2dF0gPSBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgbGlzdCBvZiBsaXN0ZW5lciBvYmplY3RzIGFuZCBmbGF0dGVucyBpdCBpbnRvIGEgbGlzdCBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBsaXN0ZW5lcnMgUmF3IGxpc3RlbmVyIG9iamVjdHMuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXX0gSnVzdCB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHByb3RvLmZsYXR0ZW5MaXN0ZW5lcnMgPSBmdW5jdGlvbiBmbGF0dGVuTGlzdGVuZXJzKGxpc3RlbmVycykge1xuICAgICAgICB2YXIgZmxhdExpc3RlbmVycyA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmbGF0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXJzW2ldLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbGF0TGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSByZXF1ZXN0ZWQgbGlzdGVuZXJzIHZpYSBnZXRMaXN0ZW5lcnMgYnV0IHdpbGwgYWx3YXlzIHJldHVybiB0aGUgcmVzdWx0cyBpbnNpZGUgYW4gb2JqZWN0LiBUaGlzIGlzIG1haW5seSBmb3IgaW50ZXJuYWwgdXNlIGJ1dCBvdGhlcnMgbWF5IGZpbmQgaXQgdXNlZnVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IGluIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnNBc09iamVjdCA9IGZ1bmN0aW9uIGdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIHJlc3BvbnNlW2V2dF0gPSBsaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgbGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkTGlzdGVuZXIgKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgbGlzdGVuZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXIgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lci5saXN0ZW5lcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogVGhlIGxpc3RlbmVyIHdpbGwgbm90IGJlIGFkZGVkIGlmIGl0IGlzIGEgZHVwbGljYXRlLlxuICAgICAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIElmIHlvdSBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lIHRoZW4gdGhlIGxpc3RlbmVyIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkTGlzdGVuZXIobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcklzV3JhcHBlZCA9IHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCc7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0ucHVzaChsaXN0ZW5lcklzV3JhcHBlZCA/IGxpc3RlbmVyIDoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vbiA9IGFsaWFzKCdhZGRMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogU2VtaS1hbGlhcyBvZiBhZGRMaXN0ZW5lci4gSXQgd2lsbCBhZGQgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmVcbiAgICAgKiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgYWZ0ZXIgaXRzIGZpcnN0IGV4ZWN1dGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG8uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkT25jZUxpc3RlbmVyID0gZnVuY3Rpb24gYWRkT25jZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIoZXZ0LCB7XG4gICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRPbmNlTGlzdGVuZXIuXG4gICAgICovXG4gICAgcHJvdG8ub25jZSA9IGFsaWFzKCdhZGRPbmNlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYW4gZXZlbnQgbmFtZS4gVGhpcyBpcyByZXF1aXJlZCBpZiB5b3Ugd2FudCB0byB1c2UgYSByZWdleCB0byBhZGQgYSBsaXN0ZW5lciB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gSWYgeW91IGRvbid0IGRvIHRoaXMgdGhlbiBob3cgZG8geW91IGV4cGVjdCBpdCB0byBrbm93IHdoYXQgZXZlbnQgdG8gYWRkIHRvPyBTaG91bGQgaXQganVzdCBhZGQgdG8gZXZlcnkgcG9zc2libGUgbWF0Y2ggZm9yIGEgcmVnZXg/IE5vLiBUaGF0IGlzIHNjYXJ5IGFuZCBiYWQuXG4gICAgICogWW91IG5lZWQgdG8gdGVsbCBpdCB3aGF0IGV2ZW50IG5hbWVzIHNob3VsZCBiZSBtYXRjaGVkIGJ5IGEgcmVnZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNyZWF0ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudCA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50KGV2dCkge1xuICAgICAgICB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXNlcyBkZWZpbmVFdmVudCB0byBkZWZpbmUgbXVsdGlwbGUgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZXZ0cyBBbiBhcnJheSBvZiBldmVudCBuYW1lcyB0byBkZWZpbmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnRzID0gZnVuY3Rpb24gZGVmaW5lRXZlbnRzKGV2dHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUV2ZW50KGV2dHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdoZW4gcGFzc2VkIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lLCBpdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vZmYgPSBhbGlhcygncmVtb3ZlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgeW91IGNhbiBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy4gWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIGFkZCB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKGZhbHNlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgeW91IGNhbiByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSByZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyh0cnVlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVkaXRzIGxpc3RlbmVycyBpbiBidWxrLiBUaGUgYWRkTGlzdGVuZXJzIGFuZCByZW1vdmVMaXN0ZW5lcnMgbWV0aG9kcyBib3RoIHVzZSB0aGlzIHRvIGRvIHRoZWlyIGpvYi4gWW91IHNob3VsZCByZWFsbHkgdXNlIHRob3NlIGluc3RlYWQsIHRoaXMgaXMgYSBsaXR0bGUgbG93ZXIgbGV2ZWwuXG4gICAgICogVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQgKHRydWUpIG9yIGFkZGVkIChmYWxzZSkuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQvcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYW5pcHVsYXRlIHRoZSBsaXN0ZW5lcnMgb2YgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgVHJ1ZSBpZiB5b3Ugd2FudCB0byByZW1vdmUgbGlzdGVuZXJzLCBmYWxzZSBpZiB5b3Ugd2FudCB0byBhZGQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQvcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLm1hbmlwdWxhdGVMaXN0ZW5lcnMgPSBmdW5jdGlvbiBtYW5pcHVsYXRlTGlzdGVuZXJzKHJlbW92ZSwgZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIHNpbmdsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXIgOiB0aGlzLmFkZExpc3RlbmVyO1xuICAgICAgICB2YXIgbXVsdGlwbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVycyA6IHRoaXMuYWRkTGlzdGVuZXJzO1xuXG4gICAgICAgIC8vIElmIGV2dCBpcyBhbiBvYmplY3QgdGhlbiBwYXNzIGVhY2ggb2YgaXRzIHByb3BlcnRpZXMgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiBldnQgPT09ICdvYmplY3QnICYmICEoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQuaGFzT3duUHJvcGVydHkoaSkgJiYgKHZhbHVlID0gZXZ0W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBzaW5nbGUgbGlzdGVuZXIgc3RyYWlnaHQgdGhyb3VnaCB0byB0aGUgc2luZ3VsYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBwYXNzIGJhY2sgdG8gdGhlIG11bHRpcGxlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG4gICAgICAgICAgICAvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgZXZ0LCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIElmIHlvdSBkbyBub3Qgc3BlY2lmeSBhbiBldmVudCB0aGVuIGFsbCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIFRoYXQgbWVhbnMgZXZlcnkgZXZlbnQgd2lsbCBiZSBlbXB0aWVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVnZXggdG8gcmVtb3ZlIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gW2V2dF0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLiBXaWxsIHJlbW92ZSBmcm9tIGV2ZXJ5IGV2ZW50IGlmIG5vdCBwYXNzZWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChldnQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgZXZ0O1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBldnRcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudFxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1tldnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudHMgbWF0Y2hpbmcgdGhlIHJlZ2V4LlxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGluIGFsbCBldmVudHNcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlRXZlbnQuXG4gICAgICpcbiAgICAgKiBBZGRlZCB0byBtaXJyb3IgdGhlIG5vZGUgQVBJLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUFsbExpc3RlbmVycyA9IGFsaWFzKCdyZW1vdmVFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgb2YgeW91ciBjaG9pY2UuXG4gICAgICogV2hlbiBlbWl0dGVkLCBldmVyeSBsaXN0ZW5lciBhdHRhY2hlZCB0byB0aGF0IGV2ZW50IHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAgICogSWYgeW91IHBhc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGFycmF5IHRoZW4gdGhvc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIGV2ZXJ5IGxpc3RlbmVyIHVwb24gZXhlY3V0aW9uLlxuICAgICAqIEJlY2F1c2UgaXQgdXNlcyBgYXBwbHlgLCB5b3VyIGFycmF5IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhcyBpZiB5b3Ugd3JvdGUgdGhlbSBvdXQgc2VwYXJhdGVseS5cbiAgICAgKiBTbyB0aGV5IHdpbGwgbm90IGFycml2ZSB3aXRoaW4gdGhlIGFycmF5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGV5IHdpbGwgYmUgc2VwYXJhdGUuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIE9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiBlbWl0RXZlbnQoZXZ0LCBhcmdzKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnNNYXAgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcnM7XG4gICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnNNYXApIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc01hcFtrZXldLnNsaWNlKDApO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgc2hhbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZWl0aGVyIHdpdGggYSBiYXNpYyBjYWxsIG9yIGFuIGFwcGx5IGlmIHRoZXJlIGlzIGFuIGFyZ3MgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lci5saXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGxpc3RlbmVyLmxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MgfHwgW10pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gdGhpcy5fZ2V0T25jZVJldHVyblZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lci5saXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgZW1pdEV2ZW50XG4gICAgICovXG4gICAgcHJvdG8udHJpZ2dlciA9IGFsaWFzKCdlbWl0RXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIFN1YnRseSBkaWZmZXJlbnQgZnJvbSBlbWl0RXZlbnQgaW4gdGhhdCBpdCB3aWxsIHBhc3MgaXRzIGFyZ3VtZW50cyBvbiB0byB0aGUgbGlzdGVuZXJzLCBhcyBvcHBvc2VkIHRvIHRha2luZyBhIHNpbmdsZSBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyBvbi5cbiAgICAgKiBBcyB3aXRoIGVtaXRFdmVudCwgeW91IGNhbiBwYXNzIGEgcmVnZXggaW4gcGxhY2Ugb2YgdGhlIGV2ZW50IG5hbWUgdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHsuLi4qfSBPcHRpb25hbCBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0RXZlbnQoZXZ0LCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWYgYVxuICAgICAqIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGUgb25lIHNldCBoZXJlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkXG4gICAgICogYWZ0ZXIgZXhlY3V0aW9uLiBUaGlzIHZhbHVlIGRlZmF1bHRzIHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBuZXcgdmFsdWUgdG8gY2hlY2sgZm9yIHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5zZXRPbmNlUmV0dXJuVmFsdWUgPSBmdW5jdGlvbiBzZXRPbmNlUmV0dXJuVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fb25jZVJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZlxuICAgICAqIHRoZSBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhpcyBvbmUgdGhlbiBpdCBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAqIGF1dG9tYXRpY2FsbHkuIEl0IHdpbGwgcmV0dXJuIHRydWUgYnkgZGVmYXVsdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4geyp8Qm9vbGVhbn0gVGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgZm9yIG9yIHRoZSBkZWZhdWx0LCB0cnVlLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRPbmNlUmV0dXJuVmFsdWUgPSBmdW5jdGlvbiBfZ2V0T25jZVJldHVyblZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnX29uY2VSZXR1cm5WYWx1ZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25jZVJldHVyblZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgZXZlbnRzIG9iamVjdCBhbmQgY3JlYXRlcyBvbmUgaWYgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBldmVudHMgc3RvcmFnZSBvYmplY3QuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldEV2ZW50cyA9IGZ1bmN0aW9uIF9nZXRFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV2ZXJ0cyB0aGUgZ2xvYmFsIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRvIGl0cyBwcmV2aW91cyB2YWx1ZSBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGlzIHZlcnNpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gTm9uIGNvbmZsaWN0aW5nIEV2ZW50RW1pdHRlciBjbGFzcy5cbiAgICAgKi9cbiAgICBFdmVudEVtaXR0ZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gb3JpZ2luYWxHbG9iYWxWYWx1ZTtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9O1xuXG4gICAgLy8gRXhwb3NlIHRoZSBjbGFzcyBlaXRoZXIgdmlhIEFNRCwgQ29tbW9uSlMgb3IgdGhlIGdsb2JhbCBvYmplY3RcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzIHx8IHt9KSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdGhyZWVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0ICogZnJvbSAnLi9jb3JlL0Jhc2VMYXllcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29yZS9Db250cm9sbGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb24nXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlR3JvdXAnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0JhY2tncm91bmQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0JsZW5kZXJDb25uZWN0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BvaW50ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0RPTU1lc2gnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0Vhc2luZ3MnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0V2ZW50RGlzcGF0Y2hlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Nb3VzZVJvdGF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1Bvc3RQcm9jZXNzaW5nJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9QYWdlU2Nyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BhZ2VTY3JvbGxlci9QYWdlU2Nyb2xsZXJTZWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9MYXlvdXRDb250cm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9UaW1lbGluZUFuaW1hdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Vbmlmb3Jtcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvTGVycHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1dhaXRNYW4nO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=