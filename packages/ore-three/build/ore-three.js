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
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js");
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
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js");
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
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js");
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
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js");
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
        };
        this.dataBase[params.name] = variable.value;
        this.variables[params.name] = variable;
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
        if (variable) {
            if (typeof variable.value == 'number') {
                variable.value = value;
            }
            else if ("copy" in variable.value) {
                variable.value.copy(value);
            }
            else if (variable.value instanceof Array) {
                variable.value = value.concat();
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
            if (variable && databaseValue) {
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
            if (variable && databaseValue) {
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
/* harmony import */ var wolfy87_eventemitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wolfy87-eventemitter */ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js");
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
        let geo = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneBufferGeometry(2, 2);
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

/***/ "../../../../node_modules/wolfy87-eventemitter/EventEmitter.js":
/*!*********************************************************************!*\
  !*** ../../../../node_modules/wolfy87-eventemitter/EventEmitter.js ***!
  \*********************************************************************/
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
module.exports = JSON.parse('{"name":"ore-three","version":"3.0.0","description":"","author":"ukonpower","license":"MIT","keywords":["threejs","webgl"],"repository":{"type":"git","url":"https://github.com/ukonpower/ore-three"},"bugs":{"url":"https://github.com/ukonpower/ore-three/issues"},"main":"./build/ore-three.js","types":"./types/index.d.ts","files":["build","types"],"scripts":{"dev":"webpack --config ./config/webpack/base.webpack.config.js --watch & tsc --declaration --emitDeclarationOnly -preserveWatchOutput -w","build":"webpack --config ./config/webpack/base.webpack.config.js & webpack --config ./config/webpack/min.webpack.config.js && tsc --declaration --emitDeclarationOnly"},"dependencies":{"wolfy87-eventemitter":"^5.2.9"},"devDependencies":{"@types/node":"^17.0.31","@types/offscreencanvas":"^2019.6.4","@types/three":">=0.130.0","@types/webgl2":"0.0.6","@typescript-eslint/eslint-plugin":"^5.19.0","@typescript-eslint/parser":"^5.19.0","del":"^6.0.0","eslint":"^8.13.0","eslint-config-mdcs":"^5.0.0","fancy-log":"^2.0.0","glslify-hex":"^2.1.1","glslify-import":"^3.1.0","glslify-loader":"^2.0.0","raw-loader":"^4.0.2","sass":"^1.50.0","ts-loader":"^9.2.8","typescript":"^4.6.3","webpack":"^5.72.0","webpack-cli":"^4.9.2","webpack-merge":"^5.8.0","webpack-stream":"^7.0.0"},"peerDependencies":{"@types/three":">=0.130.0","three":">=0.130.0"}}');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNDO0FBRUQ7QUFDZ0I7QUFDVDtBQUNLO0FBQ0c7QUFDYjtBQUNNO0FBQ1Q7QUFDQTtBQUNBO0FBQ1E7QUFDUztBQUNaO0FBQ0U7QUFDRjtBQUNvQjtBQUNoQjtBQUNBO0FBQ1I7QUFDSDtBQUNFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmFja2dyb3VuZC9zaGFkZXJzL2JhY2tncm91bmQudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0RPTU1lc2gvZG9tTWVzaC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL3NoYWRlcnMvcGFzc1Rocm91Z2guZnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9zaGFkZXJzL3Bhc3NUaHJvdWdoLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb3N0UHJvY2Vzc2luZy9zaGFkZXJzL3Bhc3NUaHJvdy52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvY29yZS9CYXNlTGF5ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2NvcmUvQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbi50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZS50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CYWNrZ3JvdW5kL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CZXppZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JsZW5kZXJDb25uZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0RPTU1lc2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0Vhc2luZ3MudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0V2ZW50RGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9MYXlvdXRDb250cm9sbGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9MZXJwcy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTW91c2VSb3RhdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9QYWdlU2Nyb2xsZXIvUGFnZVNjcm9sbGVyU2VjdGlvbi50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUGFnZVNjcm9sbGVyL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb2ludGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb3N0UHJvY2Vzc2luZy9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvVGltZWxpbmVBbmltYXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvVW5pZm9ybXMudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1dhaXRNYW4udHMiLCJ3ZWJwYWNrOi8vT1JFLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vT1JFL2V4dGVybmFsIHVtZCB7XCJjb21tb25qc1wiOlwidGhyZWVcIixcImNvbW1vbmpzMlwiOlwidGhyZWVcIixcImFtZFwiOlwidGhyZWVcIixcInJvb3RcIjpcIlRIUkVFXCJ9Iiwid2VicGFjazovL09SRS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwidGhyZWVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1widGhyZWVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiT1JFXCJdID0gZmFjdG9yeShyZXF1aXJlKFwidGhyZWVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk9SRVwiXSA9IGZhY3Rvcnkocm9vdFtcIlRIUkVFXCJdKTtcbn0pKHRoaXMsIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3RocmVlX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG52YXJ5aW5nIHZlYzQgdkNvbG9yO1xcblxcbnZvaWQgbWFpbiggdm9pZCApIHtcXG4gICAgXFxuICAgIHZlYzMgcG9zID0gcG9zaXRpb247XFxuXFxuICAgIHBvcy56ID0gMS4wO1xcbiAgICBcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3MsIDEuMCApO1xcbiAgICBcXG4gICAgdlV2ID0gdXY7XFxuICAgIHZDb2xvciA9IHZlYzQoIDEuMCApO1xcblxcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG51bmlmb3JtIHZlYzIgZG9tUG9zO1xcbnVuaWZvcm0gdmVjMiBkb21TaXplO1xcbnVuaWZvcm0gdmVjMiB3aW5kb3dTaXplO1xcbnVuaWZvcm0gZmxvYXQgYXNwZWN0UmF0aW87XFxuXFxudm9pZCBtYWluKCAgKVxcbntcXG4gIGZsb2F0IHdpZHRoID0gZG9tU2l6ZS54IC8gd2luZG93U2l6ZS54O1xcblxcbiAgLy/lt6bkuIooIDAsMCAp44GrXFxuICB2ZWMzIHBvcyA9IHBvc2l0aW9uICsgdmVjMyggMS4wLC0xLjAsMC4wICk7XFxuXFxuICAvL3NpemVcXG4gIHBvcy54ICo9IHdpZHRoO1xcbiAgcG9zLnkgKj0gKCB3aWR0aCAqIGFzcGVjdFJhdGlvICkgKiAoIGRvbVNpemUueSAvIGRvbVNpemUueCApO1xcblxcbiAgcG9zICs9IHZlYzMoIC0xLjAsIDEuMCwgMC4wICk7XFxuXFxuICBwb3MgKz0gdmVjMyggZG9tUG9zLnggLyB3aW5kb3dTaXplLnggKiAyLjAsIC1kb21Qb3MueSAvIHdpbmRvd1NpemUueSAqIDIuMCwgMC4wICk7XFxuXFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvcywgMS4wICk7XFxuICB2VXYgPSB1djtcXG59XFxuXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnVuaWZvcm0gc2FtcGxlcjJEIHRleDtcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleCx2VXYpO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1xcbiAgICB2VXYgPSB1djtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudm9pZCBtYWluKCkge1xcbiAgICB2VXYgPSB1djtcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XFxufSAgIFwiOyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi91dGlscy9Vbmlmb3Jtcyc7XG5pbXBvcnQgeyBQb2ludGVyRXZlbnRBcmdzIH0gZnJvbSAnLi9Db250cm9sbGVyJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVyQmluZFBhcmFtIGV4dGVuZHMgVEhSRUUuV2ViR0xSZW5kZXJlclBhcmFtZXRlcnMge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50O1xuXHRhc3BlY3RTZXR0aW5nPzogQXNwZWN0U2V0dGluZztcblx0d3JhcHBlckVsZW1lbnQ/OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cdHdyYXBwZXJFbGVtZW50UmVjdD86IERPTVJlY3QgfCBudWxsO1xuXHRwaXhlbFJhdGlvPzogbnVtYmVyXG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllckluZm8gZXh0ZW5kcyBMYXllckJpbmRQYXJhbSB7XG5cdHNpemU6IExheWVyU2l6ZTtcblx0YXNwZWN0U2V0dGluZzogQXNwZWN0U2V0dGluZztcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVyU2l6ZSB7XG5cdGNhbnZhc0FzcGVjdFJhdGlvOiBudW1iZXI7XG5cdHdpbmRvd1NpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHdpbmRvd0FzcGVjdFJhdGlvOiBudW1iZXI7XG5cdGNhbnZhc1NpemU6IFRIUkVFLlZlY3RvcjI7XG5cdGNhbnZhc1BpeGVsU2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0cGl4ZWxSYXRpbzogbnVtYmVyXG5cdHBvcnRyYWl0V2VpZ2h0OiBudW1iZXI7XG5cdHdpZGVXZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFzcGVjdFNldHRpbmcge1xuXHRtYWluQXNwZWN0OiBudW1iZXI7XG5cdHBvcnRyYWl0QXNwZWN0OiBudW1iZXI7XG5cdHdpZGVBc3BlY3Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRvdWNoRXZlbnRBcmdzIHtcblx0ZXZlbnQ6IFBvaW50ZXJFdmVudCB8IFRvdWNoRXZlbnQ7XG5cdHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRkZWx0YTogVEhSRUUuVmVjdG9yMjtcblx0c2NyZWVuUG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdHdpbmRvd1Bvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZUxheWVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwdWJsaWMgaW5mbzogTGF5ZXJJbmZvO1xuXG5cdHB1YmxpYyByZW5kZXJlcj86IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cblx0cHVibGljIHNjZW5lOiBUSFJFRS5TY2VuZTtcblx0cHVibGljIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cblx0cHJvdGVjdGVkIHJlYWR5QW5pbWF0ZSA9IGZhbHNlO1xuXHRwdWJsaWMgdGltZSA9IDA7XG5cdHB1YmxpYyBjb21tb25Vbmlmb3JtczogVW5pZm9ybXM7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5pbmZvID0ge1xuXHRcdFx0bmFtZTogJycsXG5cdFx0XHRhc3BlY3RTZXR0aW5nOiB7XG5cdFx0XHRcdG1haW5Bc3BlY3Q6IDE2IC8gOSxcblx0XHRcdFx0d2lkZUFzcGVjdDogMTAgLyAxLFxuXHRcdFx0XHRwb3J0cmFpdEFzcGVjdDogMSAvIDIsXG5cdFx0XHR9LFxuXHRcdFx0c2l6ZToge1xuXHRcdFx0XHR3aW5kb3dTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHR3aW5kb3dBc3BlY3RSYXRpbzogMS4wLFxuXHRcdFx0XHRjYW52YXNTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRjYW52YXNQaXhlbFNpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdGNhbnZhc0FzcGVjdFJhdGlvOiAxLjAsXG5cdFx0XHRcdHBpeGVsUmF0aW86IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuXHRcdFx0XHRwb3J0cmFpdFdlaWdodDogMC4wLFxuXHRcdFx0XHR3aWRlV2VpZ2h0OiAwLjBcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5jb21tb25Vbmlmb3JtcyA9IHtcblx0XHRcdHRpbWU6IHtcblx0XHRcdFx0dmFsdWU6IDBcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA1MCwgMSwgMC4xLCAxMDAwICk7XG5cblx0fVxuXG5cdHB1YmxpYyB0aWNrKCBkZWx0YVRpbWU6IG51bWJlciApIHtcblxuXHRcdHRoaXMudGltZSArPSBkZWx0YVRpbWU7XG5cblx0XHR0aGlzLmNvbW1vblVuaWZvcm1zLnRpbWUudmFsdWUgPSB0aGlzLnRpbWU7XG5cblx0XHRpZiAoIHRoaXMucmVhZHlBbmltYXRlICkge1xuXG5cdFx0XHR0aGlzLmFuaW1hdGUoIGRlbHRhVGltZSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgYW5pbWF0ZSggZGVsdGFUaW1lOiBudW1iZXIgKSB7IH1cblxuXHRwdWJsaWMgb25CaW5kKCBsYXllckluZm86IExheWVyQmluZFBhcmFtICkge1xuXG5cdFx0dGhpcy5pbmZvLm5hbWUgPSBsYXllckluZm8ubmFtZTtcblx0XHR0aGlzLmluZm8uY2FudmFzID0gbGF5ZXJJbmZvLmNhbnZhcztcblxuXHRcdGlmICggbGF5ZXJJbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnNldFdyYXBwZXJFbGVtZW50KCBsYXllckluZm8ud3JhcHBlckVsZW1lbnQgfHwgbnVsbCwgZmFsc2UgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nID0gbGF5ZXJJbmZvLmFzcGVjdFNldHRpbmcgfHwgdGhpcy5pbmZvLmFzcGVjdFNldHRpbmc7XG5cdFx0dGhpcy5pbmZvLmFscGhhID0gbGF5ZXJJbmZvLmFscGhhO1xuXHRcdHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gPSBsYXllckluZm8ucGl4ZWxSYXRpbyB8fCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvO1xuXG5cdFx0dGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB0aGlzLmluZm8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW5mby5jYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cblx0XHRcdHRoaXMub25SZXNpemUoKTtcblx0XHRcdHRoaXMucmVhZHlBbmltYXRlID0gdHJ1ZTtcblxuXHRcdH0sIDAgKTtcblxuXHR9XG5cblx0cHVibGljIG9uVW5iaW5kKCkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAnZGlzcG9zZSdcblx0XHR9ICk7XG5cblx0XHR0aGlzLnJlbW92ZUNoaWxkcmVucyggdGhpcy5zY2VuZSApO1xuXG5cdFx0dGhpcy5yZWFkeUFuaW1hdGUgPSBmYWxzZTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHJlbW92ZUNoaWxkcmVucyggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCApIHtcblxuXHRcdGNvbnN0IGxlbmd0aCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7XG5cblx0XHRmb3IgKCBsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0dGhpcy5yZW1vdmVDaGlsZHJlbnMoIG9iamVjdC5jaGlsZHJlblsgaSBdICk7XG5cblx0XHRcdGxldCBnZW86IFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IG1hdDogVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkuaXNNZXNoICkge1xuXG5cdFx0XHRcdGdlbyA9ICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLmdlb21ldHJ5O1xuXHRcdFx0XHRtYXQgPSAoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsICk7XG5cblx0XHRcdH1cblxuXHRcdFx0b2JqZWN0LnJlbW92ZSggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSApICk7XG5cblx0XHRcdGlmICggZ2VvICkge1xuXG5cdFx0XHRcdGdlby5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBtYXQgKSB7XG5cblx0XHRcdFx0bWF0LmRpc3Bvc2UoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0V3JhcHBlckVsZW1lbnQoIHdyYXBwZXJFbG06IEhUTUxFbGVtZW50IHwgbnVsbCwgZGlzcGF0Y2hSZXNpemU6IGJvb2xlYW4gPSB0cnVlICkge1xuXG5cdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ID0gd3JhcHBlckVsbTtcblx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnRSZWN0ID0gd3JhcHBlckVsbSA/IHdyYXBwZXJFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBudWxsO1xuXG5cdFx0aWYgKCBkaXNwYXRjaFJlc2l6ZSApIHtcblxuXHRcdFx0dGhpcy5vblJlc2l6ZSgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgb25SZXNpemUoKSB7XG5cblx0XHRpZiAoIHRoaXMucmVuZGVyZXIgPT0gbnVsbCApIHJldHVybjtcblxuXHRcdGNvbnN0IG5ld1dpbmRvd1NpemUgPSBuZXcgVEhSRUUuVmVjdG9yMiggZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0Y29uc3QgbmV3Q2FudmFzU2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0bmV3Q2FudmFzU2l6ZS5zZXQoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bmV3Q2FudmFzU2l6ZS5jb3B5KCBuZXdXaW5kb3dTaXplICk7XG5cblx0XHR9XG5cblx0XHRsZXQgcG9ydHJhaXRXZWlnaHQgPSAxLjAgLSAoICggbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55ICkgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5wb3J0cmFpdEFzcGVjdCApIC8gKCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5tYWluQXNwZWN0IC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcucG9ydHJhaXRBc3BlY3QgKTtcblx0XHRwb3J0cmFpdFdlaWdodCA9IE1hdGgubWluKCAxLjAsIE1hdGgubWF4KCAwLjAsIHBvcnRyYWl0V2VpZ2h0ICkgKTtcblxuXHRcdGxldCB3aWRlV2VpZ2h0ID0gMS4wIC0gKCAoIG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueSApIC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcud2lkZUFzcGVjdCApIC8gKCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5tYWluQXNwZWN0IC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcud2lkZUFzcGVjdCApO1xuXHRcdHdpZGVXZWlnaHQgPSBNYXRoLm1pbiggMS4wLCBNYXRoLm1heCggMC4wLCB3aWRlV2VpZ2h0ICkgKTtcblxuXHRcdHRoaXMuaW5mby5zaXplLndpbmRvd1NpemUuY29weSggbmV3V2luZG93U2l6ZSApO1xuXHRcdHRoaXMuaW5mby5zaXplLndpbmRvd0FzcGVjdFJhdGlvID0gbmV3V2luZG93U2l6ZS54IC8gbmV3V2luZG93U2l6ZS55O1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUuY29weSggbmV3Q2FudmFzU2l6ZSApO1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc1BpeGVsU2l6ZS5jb3B5KCBuZXdDYW52YXNTaXplLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpICkgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNBc3BlY3RSYXRpbyA9IG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueTtcblx0XHR0aGlzLmluZm8uc2l6ZS5wb3J0cmFpdFdlaWdodCA9IHBvcnRyYWl0V2VpZ2h0O1xuXHRcdHRoaXMuaW5mby5zaXplLndpZGVXZWlnaHQgPSB3aWRlV2VpZ2h0O1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLngsIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUueSApO1xuXHRcdHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuaW5mby5zaXplLmNhbnZhc0FzcGVjdFJhdGlvO1xuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnRSZWN0ID0gdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgcG9pbnRlckV2ZW50KCBlOiBQb2ludGVyRXZlbnRBcmdzICkge1xuXG5cdFx0Y29uc3QgY2FudmFzUG9pbnRlclBvcyA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0Y2FudmFzUG9pbnRlclBvcy5jb3B5KCBlLnBvc2l0aW9uICk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby5jYW52YXMgKSB7XG5cblx0XHRcdGNvbnN0IGNhbnZhc1JlY3QgPSB0aGlzLmluZm8uY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y2FudmFzUG9pbnRlclBvcy5zdWIoIG5ldyBUSFJFRS5WZWN0b3IyKCBjYW52YXNSZWN0LngsIGNhbnZhc1JlY3QueSApICk7XG5cblx0XHR9XG5cblx0XHRjb25zdCBzY3JlZW5Qb3NpdGlvbiA9IGNhbnZhc1BvaW50ZXJQb3MuY2xvbmUoKTtcblx0XHRzY3JlZW5Qb3NpdGlvbi5kaXZpZGUoIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUgKTtcblx0XHRzY3JlZW5Qb3NpdGlvbi55ID0gMS4wIC0gc2NyZWVuUG9zaXRpb24ueTtcblx0XHRzY3JlZW5Qb3NpdGlvbi5tdWx0aXBseVNjYWxhciggMi4wICkuc3ViU2NhbGFyKCAxLjAgKTtcblxuXG5cdFx0Y29uc3QgYXJnczogVG91Y2hFdmVudEFyZ3MgPSB7XG5cdFx0XHRldmVudDogZS5wb2ludGVyRXZlbnQsXG5cdFx0XHRwb3NpdGlvbjogY2FudmFzUG9pbnRlclBvcy5jbG9uZSgpLFxuXHRcdFx0ZGVsdGE6IGUuZGVsdGEuY2xvbmUoKSxcblx0XHRcdHNjcmVlblBvc2l0aW9uOiBzY3JlZW5Qb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0d2luZG93UG9zaXRpb246IGUucG9zaXRpb24uY2xvbmUoKVxuXHRcdH07XG5cblx0XHRpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnaG92ZXInICkge1xuXG5cdFx0XHR0aGlzLm9uSG92ZXIoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnc3RhcnQnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hTdGFydCggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdtb3ZlJyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoTW92ZSggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdlbmQnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hFbmQoIGFyZ3MgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIG9uVG91Y2hTdGFydCggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ub3VjaE1vdmUoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uVG91Y2hFbmQoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uSG92ZXIoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uV2hlZWwoIGV2ZW50OiBXaGVlbEV2ZW50LCB0cmFja3BhZERlbHRhOiBudW1iZXIgKSB7IH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgUG9pbnRlciB9IGZyb20gJy4uL3V0aWxzL1BvaW50ZXInO1xuaW1wb3J0IHsgQmFzZUxheWVyLCBMYXllckJpbmRQYXJhbSB9IGZyb20gJy4vQmFzZUxheWVyJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBvaW50ZXJFdmVudEFyZ3Mge1xuXHRwb2ludGVyRXZlbnQ6IFBvaW50ZXJFdmVudDtcblx0cG9pbnRlckV2ZW50VHlwZTogc3RyaW5nO1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0ZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBDb250cm9sbGVyUGFyYW0ge1xuXHRzaWxlbnQ/OiBib29sZWFuO1xuXHRwb2ludGVyRXZlbnRFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwdWJsaWMgcG9pbnRlcjogUG9pbnRlcjtcblx0cHVibGljIGNsb2NrOiBUSFJFRS5DbG9jaztcblxuXHRwcm90ZWN0ZWQgbGF5ZXJzOiBCYXNlTGF5ZXJbXSA9IFtdO1xuXHRwcm90ZWN0ZWQgcG9pbnRlckV2ZW50RWxlbWVudD86IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJhbWV0ZXI/OiBDb250cm9sbGVyUGFyYW0gKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKCAhICggcGFyYW1ldGVyICYmIHBhcmFtZXRlci5zaWxlbnQgKSApIHtcblxuXHRcdFx0Y29uc29sZS5sb2coIFwiJWMtIG9yZS10aHJlZSBcIiArIHJlcXVpcmUoIFwiLi4vLi4vcGFja2FnZS5qc29uXCIgKS52ZXJzaW9uICsgXCIgLVwiICwgJ3BhZGRpbmc6IDVweCAxMHB4IDtiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgY29sb3I6IHdoaXRlO2ZvbnQtc2l6ZToxMXB4JyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRQb2ludGVyXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnBvaW50ZXIgPSBuZXcgUG9pbnRlcigpO1xuXHRcdHRoaXMuc2V0UG9pbnRlckV2ZW50RWxlbWVudCggKCBwYXJhbWV0ZXIgJiYgcGFyYW1ldGVyLnBvaW50ZXJFdmVudEVsZW1lbnQgKSB8fCBkb2N1bWVudC5ib2R5ICk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdEV2ZW50c1xuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHBvaW50ZXJVcGRhdGUgPSB0aGlzLnBvaW50ZXJFdmVudC5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IHBvaW50ZXJXaGVlbCA9IHRoaXMub25XaGVlbC5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IG9yaWVudGF0aW9uY2hhbmdlID0gdGhpcy5vbk9yaWVudGF0aW9uRGV2aWNlLmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgd2luZG93UmVzaXplID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICk7XG5cblx0XHR0aGlzLnBvaW50ZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3VwZGF0ZScsIHBvaW50ZXJVcGRhdGUgKTtcblx0XHR0aGlzLnBvaW50ZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3doZWVsJywgcG9pbnRlcldoZWVsICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uY2hhbmdlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB3aW5kb3dSZXNpemUgKTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2Rpc3Bvc2UnLCAoKSA9PiB7XG5cblx0XHRcdHRoaXMucG9pbnRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAndXBkYXRlJywgcG9pbnRlclVwZGF0ZSApO1xuXHRcdFx0dGhpcy5wb2ludGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd3aGVlbCcsIHBvaW50ZXJXaGVlbCApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uY2hhbmdlICk7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy50aWNrKCk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0aWNrKCkge1xuXG5cdFx0Y29uc3QgZGVsdGFUaW1lID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuXG5cdFx0dGhpcy5wb2ludGVyLnVwZGF0ZSgpO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLnRpY2soIGRlbHRhVGltZSApO1xuXG5cdFx0fVxuXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnRpY2suYmluZCggdGhpcyApICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbldpbmRvd1Jlc2l6ZSgpIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5vblJlc2l6ZSgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25PcmllbnRhdGlvbkRldmljZSgpIHtcblxuXHRcdHRoaXMub25XaW5kb3dSZXNpemUoKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHBvaW50ZXJFdmVudCggZTogVEhSRUUuRXZlbnQgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ucG9pbnRlckV2ZW50KCBlIGFzIHVua25vd24gYXMgUG9pbnRlckV2ZW50QXJncyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25XaGVlbCggZTogVEhSRUUuRXZlbnQgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ub25XaGVlbCggZS53aGVlbEV2ZW50LCBlLnRyYWNrcGFkRGVsdGEgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QVBJXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBhZGRMYXllciggbGF5ZXI6IEJhc2VMYXllciwgbGF5ZXJJbmZvOiBMYXllckJpbmRQYXJhbSApIHtcblxuXHRcdHdoaWxlICggdGhpcy5nZXRMYXllciggbGF5ZXJJbmZvLm5hbWUgKSApIHtcblxuXHRcdFx0bGF5ZXJJbmZvLm5hbWUgKz0gJ18nO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5sYXllcnMucHVzaCggbGF5ZXIgKTtcblxuXHRcdGxheWVyLm9uQmluZCggbGF5ZXJJbmZvICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRMYXllciggbGF5ZXJOYW1lOiBzdHJpbmcgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGlmICggdGhpcy5sYXllcnNbIGkgXS5pbmZvLm5hbWUgPT0gbGF5ZXJOYW1lICkgcmV0dXJuIHRoaXMubGF5ZXJzWyBpIF07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblxuXHR9XG5cblx0cHVibGljIHJlbW92ZUxheWVyKCBsYXllck5tYWU6IHN0cmluZyApIHtcblxuXHRcdGZvciAoIGxldCBpID0gdGhpcy5sYXllcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC0tICkge1xuXG5cdFx0XHRjb25zdCBsYXllciA9IHRoaXMubGF5ZXJzWyBpIF07XG5cblx0XHRcdGlmICggbGF5ZXIuaW5mby5uYW1lID09IGxheWVyTm1hZSApIHtcblxuXHRcdFx0XHRsYXllci5vblVuYmluZCgpO1xuXG5cdFx0XHRcdHRoaXMubGF5ZXJzLnNwbGljZSggaSwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRQb2ludGVyRXZlbnRFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0aWYgKCB0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMucG9pbnRlci51bnJlZ2lzdGVyRWxlbWVudCggdGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvaW50ZXIucmVnaXN0ZXJFbGVtZW50KCBlbG0gKTtcblxuXHRcdHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCA9IGVsbTtcblxuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKSB7XG5cblx0XHR0aGlzLmxheWVycy5mb3JFYWNoKCBpdGVtID0+IHtcblxuXHRcdFx0dGhpcy5yZW1vdmVMYXllciggaXRlbS5pbmZvLm5hbWUgKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMudGljayA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZGlzcG9zZScgfSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XHJcbmltcG9ydCB7IEZDdXJ2ZUdyb3VwIH0gZnJvbSAnLi9GQ3VydmVHcm91cCc7XHJcblxyXG5leHBvcnQgdHlwZSBBbmltYXRpb25GcmFtZUluZm8gPSB7XHJcblx0c3RhcnQ6IG51bWJlclxyXG5cdGVuZDogbnVtYmVyXHJcblx0ZHVyYXRpb246IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQWN0aW9uIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgY3VydmVzOiB7W2tleTpzdHJpbmddOkZDdXJ2ZUdyb3VwfSA9IHt9O1xyXG5cdHByaXZhdGUgdW5pZm9ybXM6IFVuaWZvcm1zO1xyXG5cdFxyXG5cdHB1YmxpYyBmcmFtZTogQW5pbWF0aW9uRnJhbWVJbmZvO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggbmFtZT86IHN0cmluZyApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XHJcblx0XHR0aGlzLnVuaWZvcm1zID0ge307XHJcblxyXG5cdFx0dGhpcy5mcmFtZSA9IHtcclxuXHRcdFx0c3RhcnQ6IDAsXHJcblx0XHRcdGVuZDogMCxcclxuXHRcdFx0ZHVyYXRpb246IDAsXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRGY3VydmVHcm91cCggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZjdXJ2ZUdyb3VwOiBGQ3VydmVHcm91cCApIHtcclxuXHJcblx0XHR0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF0gPSBmY3VydmVHcm91cDtcclxuXHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZW1vdmVGQ3VydmUoIHByb3BlcnR5TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF07XHJcblxyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjYWxjRnJhbWUoKSB7XHJcblxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlcyApXHJcblxyXG5cdFx0bGV0IG1pblN0YXJ0ID0gSW5maW5pdHlcclxuXHRcdGxldCBtYXhFbmQgPSAtSW5maW5pdHlcclxuXHRcdFxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlID0gKHRoaXMuY3VydmVzKVsgY3VydmVLZXlzWyBpIF0gXTtcclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZVN0YXJ0IDwgbWluU3RhcnQgKSB7XHJcblxyXG5cdFx0XHRcdG1pblN0YXJ0ID0gY3VydmUuZnJhbWVTdGFydDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lRW5kID4gbWF4RW5kICkge1xyXG5cclxuXHRcdFx0XHRtYXhFbmQgPSBjdXJ2ZS5mcmFtZUVuZDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiggbWluU3RhcnQgPT0gLUluZmluaXR5IHx8IG1heEVuZCA9PSBJbmZpbml0eSkge1xyXG5cclxuXHRcdFx0bWluU3RhcnQgPSAwO1xyXG5cdFx0XHRtYXhFbmQgPSAxXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZnJhbWUuc3RhcnQgPSBtaW5TdGFydDtcclxuXHRcdHRoaXMuZnJhbWUuZW5kID0gbWF4RW5kO1xyXG5cdFx0dGhpcy5mcmFtZS5kdXJhdGlvbiA9IHRoaXMuZnJhbWUuZW5kIC0gdGhpcy5mcmFtZS5zdGFydDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0RkN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IEZDdXJ2ZUdyb3VwIHwgbnVsbCB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXSB8fCBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Z2V0IHZhbHVlc1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgYXNzaWduVW5pZm9ybXMoIHByb3BlcnR5TmFtZTogc3RyaW5nLCB1bmlmb3JtOiBUSFJFRS5JVW5pZm9ybSApIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSA9IHVuaWZvcm07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFVuaWZvcm1zPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBUSFJFRS5JVW5pZm9ybTxUPiB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF07XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRsZXQgY3VydmVHcm91cCA9IHRoaXMuZ2V0RkN1cnZlR3JvdXAocHJvcGVydHlOYW1lKVxyXG5cclxuXHRcdGlmKCBjdXJ2ZUdyb3VwICkge1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHVuaSA9IHtcclxuXHRcdFx0XHR2YWx1ZTogY3VydmVHcm91cC5jcmVhdGVJbml0VmFsdWUoKSBhcyBUXHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSA9IHVuaTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB1bmk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBUIHwgbnVsbDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyID4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCB0YXJnZXQ6IFQgKTogVDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWUoIHByb3BlcnR5TmFtZTogc3RyaW5nLCB0YXJnZXQ/OiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciApOiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGxldCB1bmlmb3JtID0gdGhpcy5nZXRVbmlmb3Jtcyhwcm9wZXJ0eU5hbWUpO1xyXG5cclxuXHRcdGlmKCAhdW5pZm9ybSApIHJldHVybiB0YXJnZXQgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgdmFsdWUgPSB1bmlmb3JtLnZhbHVlO1xyXG5cdFx0XHJcblx0XHRpZiggIXRhcmdldCApIHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRpZiggdHlwZW9mIHZhbHVlID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LnggPSB2YWx1ZTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldC54ID0gdmFsdWUueDtcclxuXHRcdHRhcmdldC55ID0gdmFsdWUueTtcclxuXHJcblx0XHRpZiggJ3onIGluIHRhcmdldCAmJiAneicgaW4gdmFsdWUgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQueiA9IHZhbHVlLnpcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoICd3JyBpbiB0YXJnZXQgJiYgJ3cnIGluIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LncgPSB2YWx1ZS53XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGFyZ2V0IHx8IG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlQXQ8VCBleHRlbmRzIG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyICk6IFQgfCBudWxsO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0PFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciA+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciwgdGFyZ2V0OiBUICk6IFQ7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlQXQoIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ/OiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciApOiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGxldCBjdXJ2ZSA9IHRoaXMuZ2V0RkN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZSApO1xyXG5cclxuXHRcdGlmKCB0YXJnZXQgKSAge1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY3VydmUuZ2V0VmFsdWUoIGZyYW1lIHx8IDAsIHRhcmdldCApXHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSByZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0cmV0dXJuIGN1cnZlLmdldFZhbHVlKCBmcmFtZSApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFVwZGF0ZUZyYW1lXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblx0XHJcblx0cHVibGljIHVwZGF0ZUZyYW1lKCBmcmFtZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZXMgKTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGZjdXJ2ZUdyb3VwID0gdGhpcy5jdXJ2ZXNbIGN1cnZlS2V5c1sgaSBdIF07XHJcblx0XHRcdGxldCB1bmkgPSB0aGlzLmdldFVuaWZvcm1zKCBjdXJ2ZUtleXNbIGkgXSApO1xyXG5cclxuXHRcdFx0aWYoICF1bmkgKSBjb250aW51ZTtcclxuXHJcblx0XHRcdGlmKCB0eXBlb2YgdW5pLnZhbHVlID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0XHR1bmkudmFsdWUgPSBmY3VydmVHcm91cC5nZXRWYWx1ZShmcmFtZSkgfHwgMFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRmY3VydmVHcm91cC5nZXRWYWx1ZShmcmFtZSwgdW5pLnZhbHVlKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZW1pdEV2ZW50KCd1cGRhdGUnLCBbdGhpc10gKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRkN1cnZlS2V5RnJhbWUgfSBmcm9tICcuL0ZDdXJ2ZUtleUZyYW1lJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAndycgfCAnc2NhbGFyJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBrZXlmcmFtZXM6IEZDdXJ2ZUtleUZyYW1lW10gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBjYWNoZTogeyBmcmFtZTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyIH0gPSB7IGZyYW1lOiBOYU4sIHZhbHVlOiBOYU4gfTtcclxuXHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVEdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggZnJhbWVzPzogRkN1cnZlS2V5RnJhbWVbXSApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldCggZnJhbWVzICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCggZnJhbWVzPzogRkN1cnZlS2V5RnJhbWVbXSApIHtcclxuXHJcblx0XHRpZiAoIGZyYW1lcyApIHtcclxuXHJcblx0XHRcdHRoaXMua2V5ZnJhbWVzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0XHRmcmFtZXMuZm9yRWFjaCgga2V5ZnJhbWUgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLmFkZEtleUZyYW1lKCBrZXlmcmFtZSApO1xyXG5cclxuXHRcdFx0fSApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkS2V5RnJhbWUoIGtleWZyYW1lOiBGQ3VydmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRsZXQgaW5kZXggPSAwO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMua2V5ZnJhbWVzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBmcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIF07XHJcblxyXG5cdFx0XHRpZiAoIGZyYW1lLmNvb3JkaW5hdGUueCA8IGtleWZyYW1lLmNvb3JkaW5hdGUueCApIHtcclxuXHJcblx0XHRcdFx0aW5kZXggKys7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5rZXlmcmFtZXMuc3BsaWNlKCBpbmRleCwgMCwga2V5ZnJhbWUgKTtcclxuXHJcblx0XHQvLyBzZXQgZnJhbWUgaW5mb1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSB0aGlzLmtleWZyYW1lc1swXS5jb29yZGluYXRlLnhcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSB0aGlzLmtleWZyYW1lc1t0aGlzLmtleWZyYW1lcy5sZW5ndGggLSAxXS5jb29yZGluYXRlLnhcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWUoIGZyYW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCBmcmFtZSA9PSB0aGlzLmNhY2hlLmZyYW1lICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FjaGUudmFsdWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YWx1ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5rZXlmcmFtZXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGtleWZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgXTtcclxuXHJcblx0XHRcdGlmICggZnJhbWUgPD0ga2V5ZnJhbWUuY29vcmRpbmF0ZS54ICkge1xyXG5cclxuXHRcdFx0XHRsZXQgYmVmb3JlS2V5RnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSAtIDEgXTtcclxuXHJcblx0XHRcdFx0aWYgKCBiZWZvcmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGJlZm9yZUtleUZyYW1lLnRvKCBrZXlmcmFtZSwgZnJhbWUgKTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGtleWZyYW1lLmNvb3JkaW5hdGUueTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCAmJiB0aGlzLmtleWZyYW1lcy5sZW5ndGggPiAwICkge1xyXG5cclxuXHRcdFx0dmFsdWUgPSB0aGlzLmtleWZyYW1lc1sgdGhpcy5rZXlmcmFtZXMubGVuZ3RoIC0gMSBdLmNvb3JkaW5hdGUueTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB2YWx1ZSAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdHRoaXMuY2FjaGUgPSB7XHJcblx0XHRcdFx0ZnJhbWU6IGZyYW1lLFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBGQ3VydmUsIEZDdXJ2ZUF4aXMgfSBmcm9tICcuL0ZDdXJ2ZSc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVHcm91cFR5cGUgPSAnc2NhbGFyJyB8ICd2ZWMyJyB8ICd2ZWMzJyB8ICd2ZWM0J1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZUdyb3VwIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgY3VydmU6IHtbYXhpcyBpbiBGQ3VydmVBeGlzXTogRkN1cnZlIHwgbnVsbH07XHJcblx0cHVibGljIHR5cGU6IEZDdXJ2ZUdyb3VwVHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRwdWJsaWMgZnJhbWVTdGFydDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUR1cmF0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBuYW1lPzogc3RyaW5nLCB4PzogRkN1cnZlLCB5PzogRkN1cnZlLCB6PzogRkN1cnZlLCB3PzogRkN1cnZlLCBzY2FsYXI/OiBGQ3VydmUgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmN1cnZlID0ge1xyXG5cdFx0XHR4OiBudWxsLFxyXG5cdFx0XHR5OiBudWxsLFxyXG5cdFx0XHR6OiBudWxsLFxyXG5cdFx0XHR3OiBudWxsLFxyXG5cdFx0XHRzY2FsYXI6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYoIHggKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeCwgJ3gnIClcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKCB5ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHksICd5JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiggeiApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB6LCAneicgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZiggdyApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB3LCAndycgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0RkN1cnZlKCBjdXJ2ZTogRkN1cnZlLCBheGlzOiBGQ3VydmVBeGlzICkge1xyXG5cclxuXHRcdHRoaXMuY3VydmVbIGF4aXMgXSA9IGN1cnZlO1xyXG5cclxuXHRcdHRoaXMuY2FsY1R5cGUoKTtcclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNhbGNUeXBlKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy5jdXJ2ZS5zY2FsYXIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmN1cnZlLncgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjNCc7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS56ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzMnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueSApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWMyJztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnggKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGNhbGNGcmFtZSgpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlIClcclxuXHJcblx0XHRsZXQgbWluU3RhcnQgPSBJbmZpbml0eVxyXG5cdFx0bGV0IG1heEVuZCA9IC1JbmZpbml0eVxyXG5cdFx0XHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmUgPSAodGhpcy5jdXJ2ZSBhcyB7W2tleTogc3RyaW5nXTogRkN1cnZlfSlbIGN1cnZlS2V5c1sgaSBdIF07XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgY29udGludWU7XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVTdGFydCA8IG1pblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHRtaW5TdGFydCA9IGN1cnZlLmZyYW1lU3RhcnQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZUVuZCA+IG1heEVuZCApIHtcclxuXHJcblx0XHRcdFx0bWF4RW5kID0gY3VydmUuZnJhbWVFbmQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIG1pblN0YXJ0ID09IC1JbmZpbml0eSB8fCBtYXhFbmQgPT0gSW5maW5pdHkpIHtcclxuXHJcblx0XHRcdG1pblN0YXJ0ID0gMDtcclxuXHRcdFx0bWF4RW5kID0gMVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSBtaW5TdGFydDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSBtYXhFbmQ7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSB0aGlzLmZyYW1lRW5kIC0gdGhpcy5mcmFtZVN0YXJ0O1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjcmVhdGVJbml0VmFsdWUoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzInICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy50eXBlID09ICd2ZWMzJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PSAndmVjNCcgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjQoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlcj4oIGZyYW1lOiBudW1iZXIsIHRhcmdldDogVCApOiBUO1xyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWUoIGZyYW1lOiBudW1iZXIgKTogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlcj4oIGZyYW1lOiBudW1iZXIsIHRhcmdldD86IFQpOiBUIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0aWYoIHRhcmdldCApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS54ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueCA9IHRoaXMuY3VydmUueC5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS55ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueSA9IHRoaXMuY3VydmUueS5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS56ICYmICd6JyBpbiB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC56ID0gdGhpcy5jdXJ2ZS56LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLncgICYmICd3JyBpbiB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC53ID0gdGhpcy5jdXJ2ZS53LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHRcdFx0XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnNjYWxhciApIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuICB0aGlzLmN1cnZlLnNjYWxhci5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jLCBFYXNpbmdzIH0gZnJvbSAnLi4vRWFzaW5ncyc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVJbnRlcnBvbGF0aW9uID0gXCJCRVpJRVJcIiB8IFwiTElORUFSXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlS2V5RnJhbWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgY29vcmRpbmF0ZTogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBoYW5kbGVMZWZ0OiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGhhbmRsZVJpZ2h0OiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGludGVycG9sYXRpb246IEZDdXJ2ZUludGVycG9sYXRpb24gPSAnQkVaSUVSJztcclxuXHJcblx0cHJpdmF0ZSBlYXNpbmc6IEVhc2luZ0Z1bmMgfCBudWxsID0gbnVsbDtcclxuXHRwcml2YXRlIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUgfCBudWxsID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IoIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIsIGhhbmRsZUxlZnQ/OiBUSFJFRS5WZWMyLCBoYW5kbGVSaWdodD86IFRIUkVFLlZlYzIsIGludGVycG9sYXRpb24/OiBGQ3VydmVJbnRlcnBvbGF0aW9uICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5zZXQoIGNvb3JkaW5hdGUsIGhhbmRsZUxlZnQsIGhhbmRsZVJpZ2h0LCBpbnRlcnBvbGF0aW9uICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCggY29vcmRpbmF0ZTogVEhSRUUuVmVjMiwgaGFuZGxlTGVmdD86IFRIUkVFLlZlYzIsIGhhbmRsZVJpZ2h0PzogVEhSRUUuVmVjMiwgaW50ZXJwb2xhdGlvbj86IEZDdXJ2ZUludGVycG9sYXRpb24gKSB7XHJcblxyXG5cdFx0dGhpcy5jb29yZGluYXRlID0gY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaGFuZGxlTGVmdCA9IGhhbmRsZUxlZnQgfHwgY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaGFuZGxlUmlnaHQgPSBoYW5kbGVSaWdodCB8fCBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5pbnRlcnBvbGF0aW9uID0gaW50ZXJwb2xhdGlvbiB8fCAnQkVaSUVSJztcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEVhc2luZyggaW50ZXJwb2xhdGlvbjogRkN1cnZlSW50ZXJwb2xhdGlvbiwgbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRpZiAoIGludGVycG9sYXRpb24gPT0gJ0JFWklFUicgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gRWFzaW5ncy5iZXppZXIoIHRoaXMuY29vcmRpbmF0ZSwgdGhpcy5oYW5kbGVSaWdodCwgbmV4dEZyYW1lLmhhbmRsZUxlZnQsIG5leHRGcmFtZS5jb29yZGluYXRlICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAoIHQ6IG51bWJlciApID0+IHtcclxuXHJcblx0XHRcdFx0bGV0IGQgPSAoIG5leHRGcmFtZS5jb29yZGluYXRlLnkgLSB0aGlzLmNvb3JkaW5hdGUueSApO1xyXG5cdFx0XHRcdHQgPSAoIHQgLSB0aGlzLmNvb3JkaW5hdGUueCApIC8gKCBuZXh0RnJhbWUuY29vcmRpbmF0ZS54IC0gdGhpcy5jb29yZGluYXRlLnggKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZS55ICsgdCAqIGQ7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG8oIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUsIHQ6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoIHRoaXMubmV4dEZyYW1lID09IG51bGwgfHwgdGhpcy5uZXh0RnJhbWUuY29vcmRpbmF0ZS54ICE9IG5leHRGcmFtZS5jb29yZGluYXRlLnggfHwgdGhpcy5uZXh0RnJhbWUuY29vcmRpbmF0ZS55ICE9IG5leHRGcmFtZS5jb29yZGluYXRlLnkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmVhc2luZyA9IHRoaXMuZ2V0RWFzaW5nKCB0aGlzLmludGVycG9sYXRpb24sIG5leHRGcmFtZSApO1xyXG5cdFx0XHR0aGlzLm5leHRGcmFtZSA9IG5leHRGcmFtZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmVhc2luZyApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmVhc2luZyggdCApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgdGhyZWFkSWQgfSBmcm9tICd3b3JrZXJfdGhyZWFkcyc7XG5pbXBvcnQgeyBFYXNpbmdzLCBFYXNpbmdGdW5jIH0gZnJvbSBcIi4vRWFzaW5nc1wiO1xuaW1wb3J0IHsgTGVycEZ1bmMsIExlcnBzIH0gZnJvbSBcIi4vTGVycHNcIjtcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSBcIi4vVW5pZm9ybXNcIjtcblxuZXhwb3J0IHR5cGUgQW5pbWF0b3JWYXJpYWJsZVR5cGUgPSBudW1iZXIgfCBudW1iZXJbXSB8IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLlF1YXRlcm5pb24gfCBUSFJFRS5FdWxlclxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0b3JWYXJpYWJsZTxUPntcblx0dGltZTogbnVtYmVyO1xuXHRkdXJhdGlvbj86IG51bWJlcjtcblx0dmFsdWU6IFQ7XG5cdHN0YXJ0VmFsdWU6IFQ7XG5cdGdvYWxWYWx1ZTogVDtcblx0b25BbmltYXRpb25GaW5pc2hlZD86IEZ1bmN0aW9uIHwgbnVsbDtcblx0bGVycEZ1bmM/OiBMZXJwRnVuYzxUPjtcblx0ZWFzaW5nOiBFYXNpbmdGdW5jO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0b3JWYXJpYWJsZVBhcmFtczxUPiB7XG5cdG5hbWU6IHN0cmluZztcblx0aW5pdFZhbHVlOiBUO1xuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xuXHRjdXN0b21MZXJwRnVuYz86IExlcnBGdW5jPFQ+O1xufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0b3IgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBkYXRhQmFzZToge1sga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZVR5cGUgfTtcblx0cHVibGljIGlzQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbIGtleTogc3RyaW5nIF06IEFuaW1hdG9yVmFyaWFibGU8QW5pbWF0b3JWYXJpYWJsZVR5cGU+IH07XG5cdHByb3RlY3RlZCBhbmltYXRpbmdDb3VudDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGRpc3BhdGNoRXZlbnRzOiBGdW5jdGlvbltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy52YXJpYWJsZXMgPSB7fTtcblx0XHR0aGlzLmRhdGFCYXNlID0ge307XG5cblx0fVxuXG5cdHB1YmxpYyBhZGQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggcGFyYW1zOiBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+ICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlOiBBbmltYXRvclZhcmlhYmxlPFQ+ID0ge1xuXHRcdFx0dGltZTogLSAxLFxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0c3RhcnRWYWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRnb2FsVmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0ZWFzaW5nOiBwYXJhbXMuZWFzaW5nIHx8IEVhc2luZ3Muc2lnbW9pZCgpLFxuXHRcdFx0bGVycEZ1bmM6ICggcGFyYW1zLmN1c3RvbUxlcnBGdW5jIHx8IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMuaW5pdFZhbHVlICkgKSBhcyBMZXJwRnVuYzxUPixcblx0XHR9O1xuXG5cdFx0dGhpcy5kYXRhQmFzZVsgcGFyYW1zLm5hbWUgXSA9IHZhcmlhYmxlLnZhbHVlO1xuXHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdID0gdmFyaWFibGUgYXMgdW5rbm93biBhcyBBbmltYXRvclZhcmlhYmxlPEFuaW1hdG9yVmFyaWFibGVUeXBlPjtcblxuXHRcdHJldHVybiB2YXJpYWJsZTtcblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0U2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBzZXRFYXNpbmcoIG5hbWU6IHN0cmluZywgZWFzaW5nOiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLmVhc2luZyA9IGVhc2luZztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRWYWx1ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBUICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5kYXRhQmFzZVsgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxUPjtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIHZhcmlhYmxlLnZhbHVlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRcdHZhcmlhYmxlLnZhbHVlID0gdmFsdWU7XG5cblx0XHRcdH0gZWxzZSBpZiAoIFwiY29weVwiIGluIHZhcmlhYmxlLnZhbHVlICkge1xuXG5cdFx0XHRcdHZhcmlhYmxlLnZhbHVlLmNvcHkoIHZhbHVlIGFzIGFueSApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB2YXJpYWJsZS52YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuXG5cdFx0XHRcdCggdmFyaWFibGUudmFsdWUgYXMgbnVtYmVyIFtdICkgPSAoIHZhbHVlIGFzIG51bWJlcltdICkuY29uY2F0KCk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy51cGRhdGVEYXRhQmFzZSggbmFtZSApO1xuXHRcdFx0dGhpcy5jYW5jZWxBbmltYXRlKCBuYW1lICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QW5pbWF0ZVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgYW5pbWF0ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIGdvYWxWYWx1ZTogVCwgZHVyYXRpb246IG51bWJlciA9IDEsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGVhc2luZz86IEVhc2luZ0Z1bmMgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoIHJlc29sdmUgPT4ge1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gPD0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoIG5hbWUsIGdvYWxWYWx1ZSApO1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSggbnVsbCApO1xuXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS50aW1lID09IC0gMSApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgKys7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAwO1xuXHRcdFx0XHR2YXJpYWJsZS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHR2YXJpYWJsZS5zdGFydFZhbHVlID0gdGhpcy5nZXRWYWx1ZUNsb25lKCB2YXJpYWJsZS52YWx1ZSApO1xuXHRcdFx0XHR2YXJpYWJsZS5nb2FsVmFsdWUgPSB0aGlzLmdldFZhbHVlQ2xvbmUoIGdvYWxWYWx1ZSApO1xuXG5cdFx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICggZWFzaW5nICkge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRFYXNpbmcoIG5hbWUsIGVhc2luZyApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblxuXHR9XG5cblx0cHVibGljIGNhbmNlbEFuaW1hdGUoIG5hbWU6IHN0cmluZyApIHtcblxuXHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF07XG5cblx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHR2YXJpYWJsZS50aW1lID0gMS4wO1xuXHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9IG51bGw7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRHZXRcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGdldDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcgKTogVCB8IG51bGwge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS52YWx1ZSBhcyB1bmtub3duIGFzIFQ7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldFZhcmlhYmxlT2JqZWN0PFQgZXh0ZW5kcyBBbmltYXRvclZhcmlhYmxlVHlwZT4oIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICk6IEFuaW1hdG9yVmFyaWFibGU8VD4gfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gYXMgdW5rbm93biBhcyBBbmltYXRvclZhcmlhYmxlPFQ+O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCAhIG11dGUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0VXRpbHNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFwcGx5VG9Vbmlmb3JtcyggdW5pZm9ybXM6IFVuaWZvcm1zICkge1xuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLmdldFZhcmlhYmxlT2JqZWN0KCBrZXlzWyBpIF0gKTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaSBdIF0gPSB2YXJpYWJsZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgaXNBbmltYXRpbmdWYXJpYWJsZSggbmFtZTogc3RyaW5nLCBtdXRlOiBib29sZWFuID0gZmFsc2UgKSB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdGxldCB0aW1lID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS50aW1lO1xuXG5cdFx0XHRyZXR1cm4gdGltZSAhPSAtIDEuMDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFV0aWxzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByaXZhdGUgZ2V0VmFsdWVDbG9uZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCB2YWx1ZTogVCApOiBUIHtcblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHR9IGVsc2UgaWYgKCAnY2xvbmUnIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gdmFsdWUuY2xvbmUoKSBhcyBUO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlLmNvbmNhdCgpIGFzIFQ7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cblx0fVxuXG5cdHB1YmxpYyB3YWl0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgcHJtID0gbmV3IFByb21pc2U8dm9pZD4oICggciApID0+e1xuXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cblx0XHRcdFx0cigpO1xuXG5cdFx0XHR9LCAoIHQgKiAxMDAwICkgKTtcblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBwcm07XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFVwZGF0ZVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU/OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMuYW5pbWF0aW5nQ291bnQgPT0gMCApIHtcblxuXHRcdFx0dGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGVOYW1lID0ga2V5c1sgaSBdO1xuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIHZhcmlhYmxlTmFtZSBdO1xuXHRcdFx0bGV0IHRpbWUgPSB2YXJpYWJsZS50aW1lO1xuXG5cdFx0XHRpZiAoIHRpbWUgPT0gMS4wICkge1xuXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgLS07XG5cdFx0XHRcdHRpbWUgPSAtIDE7XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICkge1xuXG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50cy5wdXNoKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggdGltZSA+PSAwLjAgJiYgdGltZSA8IDEuMCApIHtcblxuXHRcdFx0XHRsZXQgZHVyYXRpb24gPSB2YXJpYWJsZS5kdXJhdGlvbjtcblx0XHRcdFx0bGV0IGVhc2luZyA9IHZhcmlhYmxlLmVhc2luZztcblx0XHRcdFx0bGV0IGxlcnBGdW5jID0gdmFyaWFibGUubGVycEZ1bmM7XG5cblx0XHRcdFx0aWYgKCBkdXJhdGlvbiApIHtcblxuXHRcdFx0XHRcdHRpbWUgKz0gKCBkZWx0YVRpbWUgfHwgMC4wMTYgKSAvIGR1cmF0aW9uO1xuXG5cdFx0XHRcdFx0aWYgKCBkdXJhdGlvbiA9PSAwIHx8IHRpbWUgPj0gMS4wICkge1xuXG5cdFx0XHRcdFx0XHR0aW1lID0gMS4wO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlID0gdmFyaWFibGUuZ29hbFZhbHVlO1xuXG5cdFx0XHRcdGlmICggdGltZSA8IDEuMCApIHtcblxuXHRcdFx0XHRcdGlmICggbGVycEZ1bmMgKSB7XG5cblx0XHRcdFx0XHRcdHZhbHVlID0gbGVycEZ1bmMoIHZhcmlhYmxlLnN0YXJ0VmFsdWUsIHZhcmlhYmxlLmdvYWxWYWx1ZSwgZWFzaW5nKCB0aW1lICkgKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGRhdGFCYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyB2YXJpYWJsZU5hbWUgXTtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhQmFzZVZhbHVlID09ICdudW1iZXInIHx8ICEgKCAnY29weScgaW4gZGF0YUJhc2VWYWx1ZSApICkge1xuXG5cdFx0XHRcdFx0dGhpcy5kYXRhQmFzZVsgdmFyaWFibGVOYW1lIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCAnY29weScgaW4gZGF0YUJhc2VWYWx1ZSApIHtcblxuXHRcdFx0XHRcdGRhdGFCYXNlVmFsdWUuY29weSggdmFsdWUgYXMgYW55ICk7XG5cblx0XHRcdFx0fVxuXG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdFx0dHlwZTogJ3VwZGF0ZS8nICsga2V5c1sgaSBdLFxuXHRcdFx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lLFxuXHRcdFx0XHRcdHZhbHVlOiB2YXJpYWJsZS52YWx1ZVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyaWFibGUudGltZSA9IHRpbWU7XG5cblx0XHR9XG5cblx0XHR3aGlsZSAoIHRoaXMuZGlzcGF0Y2hFdmVudHMubGVuZ3RoICE9IDAgKSB7XG5cblx0XHRcdGxldCBmdW5jID0gdGhpcy5kaXNwYXRjaEV2ZW50cy5wb3AoKTtcblxuXHRcdFx0aWYgKCBmdW5jICkge1xuXG5cdFx0XHRcdGZ1bmMoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVEYXRhQmFzZSgpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lXG5cdFx0fSApO1xuXG5cdFx0aWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ2FuaW1hdGUnLFxuXHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlRGF0YUJhc2UoIHRhcmdldD86IHN0cmluZyApIHtcblxuXHRcdGlmICggdGFyZ2V0ICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgdGFyZ2V0IF07XG5cdFx0XHRsZXQgZGF0YWJhc2VWYWx1ZSA9IHRoaXMuZGF0YUJhc2VbIHRhcmdldCBdO1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICYmIGRhdGFiYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgdmFyaWFibGUudmFsdWUgPT0gJ251bWJlcicgfHwgISAoICdjb3B5JyBpbiB2YXJpYWJsZS52YWx1ZSApICkge1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudmFsdWUgPSBkYXRhYmFzZVZhbHVlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHRsZXQga2V5ID0gT2JqZWN0LmtleXMoIHRoaXMuZGF0YUJhc2UgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBrZXlbIGkgXSBdO1xuXHRcdFx0bGV0IGRhdGFiYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyBrZXlbIGkgXSBdO1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICYmIGRhdGFiYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0Ly8gVmVjdG9y57O744Gv5Y+C54Wn44Gq44Gu44GnbnVtYmVy44GobnVtYmVyW13jgYLjgZ/jgorjgaDjgZHmm7TmlrBcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgT1JFIGZyb20gJy4uLy4uLyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9iYWNrZ3JvdW5kLnZzJztcbmltcG9ydCB7IExheWVyU2l6ZSBhcyBMYXllclNpemVJbmZvIH0gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGF5ZXInO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFRIUkVFLk1lc2gge1xuXG5cdHByb3RlY3RlZCB1bmlmb3JtczogT1JFLlVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJhbTogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0bGV0IHBvc0FycmF5ID0gW107XG5cdFx0bGV0IGluZGV4QXJyYXkgPSBbXTtcblx0XHRsZXQgdXZBcnJheSA9IFtdO1xuXG5cdFx0cG9zQXJyYXkucHVzaCggLSAxLCAxLCAwICk7XG5cdFx0cG9zQXJyYXkucHVzaCggMSwgMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIDEsIC0gMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIC0gMSwgLSAxLCAwICk7XG5cblx0XHR1dkFycmF5LnB1c2goIDAsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDAgKTtcblx0XHR1dkFycmF5LnB1c2goIDAsIDAgKTtcblxuXHRcdGluZGV4QXJyYXkucHVzaCggMCwgMiwgMSwgMCwgMywgMiApO1xuXG5cdFx0bGV0IHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoIHBvc0FycmF5ICk7XG5cdFx0bGV0IGluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoIGluZGV4QXJyYXkgKTtcblx0XHRsZXQgdXYgPSBuZXcgRmxvYXQzMkFycmF5KCB1dkFycmF5ICk7XG5cblx0XHRnZW8uc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBwb3MsIDMgKSApO1xuXHRcdGdlby5zZXRBdHRyaWJ1dGUoICd1dicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIHV2LCAyICkgKTtcblx0XHRnZW8uc2V0SW5kZXgoIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIGluZGljZXMsIDEgKSApO1xuXG5cdFx0cGFyYW0udmVydGV4U2hhZGVyID0gcGFyYW0udmVydGV4U2hhZGVyIHx8IHZlcnQ7XG5cdFx0cGFyYW0udHJhbnNwYXJlbnQgPSBwYXJhbS50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBwYXJhbS50cmFuc3BhcmVudCA6IHRydWU7XG5cdFx0cGFyYW0uZGVwdGhGdW5jID0gcGFyYW0uZGVwdGhGdW5jICE9IHVuZGVmaW5lZCA/IHBhcmFtLmRlcHRoRnVuYyA6IFRIUkVFLk5ldmVyRGVwdGg7XG5cblx0XHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLnVuaWZvcm1zID0gcGFyYW0udW5pZm9ybXMgfHwge307XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlc2l6ZSggYXJnczogTGF5ZXJTaXplSW5mbyApIHtcblxuXHRcdHRoaXMudW5pZm9ybXMucmVzb2x1dGlvbiA9IHsgdmFsdWU6IGFyZ3MuY2FudmFzU2l6ZSB9O1xuXHRcdHRoaXMudW5pZm9ybXMuYXNwZWN0UmF0aW8gPSB7IHZhbHVlOiBhcmdzLmNhbnZhc0FzcGVjdFJhdGlvIH07XG5cblx0fVxuXG59XG4iLCJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEJlemllclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQmV6aWVyIHtcblxuXHRleHBvcnQgdHlwZSBCZXppZXJDb250cm9sUG9pbnRzID0ge1xuXHRcdHAwOiBudW1iZXI7XG5cdFx0cDE6IG51bWJlcjtcblx0XHRwMjogbnVtYmVyO1xuXHRcdHAzOiBudW1iZXI7XG5cdH1cblxuXHQvLyBpbnNwaXJlZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmcvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzIGFuZCBodHRwczovL2dpdGh1Yi5jb20vMGI1dnIvYXV0b21hdG9uL2Jsb2IvODcyNDIwZTc5OGQ5MDU0ZDRhN2EwNmM5NzJjYmI0MjYxYTY3YjRiYy9zcmMvYmV6aWVyRWFzaW5nLnRzXG5cblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9JVEVSQVRJT05TID0gNDtcblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9NSU5fU0xPUEUgPSAwLjAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX01BWF9JVEVSQVRJT05TID0gMTA7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgPSAxMTtcblx0ZXhwb3J0IGNvbnN0IEJFWklFUl9FQVNJTkdfU0FNUExFX1NURVBfU0laRSA9IDEuMCAvIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTtcblxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQSggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIHAucDAgKyAzLjAgKiBwLnAxIC0gMy4wICogcC5wMiArIHAucDM7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQiggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAzLjAgKiBwLnAwIC0gNi4wICogcC5wMSArIDMuMCAqIHAucDI7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQyggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIDMuMCAqIHAucDAgKyAzLjAgKiBwLnAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllclNsb3BlKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogY2FsY0JlemllckEoIHAgKSAqIHQgKiB0ICsgMi4wICogY2FsY0JlemllckIoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllciggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuICggKCBjYWxjQmV6aWVyQSggcCApICogdCArIGNhbGNCZXppZXJCKCBwICkgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApICkgKiB0ICsgcC5wMDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc3ViZGl2KCB4OiBudW1iZXIsIHN0YXJ0VDogbnVtYmVyLCBlbmRUOiBudW1iZXIsIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRsZXQgY3VycmVudFggPSAwO1xuXHRcdGxldCBjdXJyZW50VCA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0Y3VycmVudFQgPSBzdGFydFQgKyAoIGVuZFQgLSBzdGFydFQgKSAvIDI7XG5cdFx0XHRjdXJyZW50WCA9IGNhbGNCZXppZXIoIHAsIGN1cnJlbnRUICk7XG5cblx0XHRcdGlmICggY3VycmVudFggPiB4ICkge1xuXG5cdFx0XHRcdGVuZFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzdGFydFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnRUO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBuZXd0b24oIHg6bnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBORVdUT05fSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0bGV0IHNsb3BlID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICk7XG5cblx0XHRcdGlmICggc2xvcGUgPT0gMC4wICkge1xuXG5cdFx0XHRcdHJldHVybiB0O1xuXG5cdFx0XHR9XG5cblx0XHRcdGxldCBjdXJyZW50WCA9ICggY2FsY0JlemllciggcCwgdCApICkgLSB4O1xuXHRcdFx0dCAtPSBjdXJyZW50WCAvIHNsb3BlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRCZXppZXJUZnJvbVgoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHg6IG51bWJlciwgY2FjaGU6IG51bWJlcltdICkge1xuXG5cdFx0cC5wMSA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMSApICk7XG5cdFx0cC5wMiA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMiApICk7XG5cblx0XHRsZXQgc2FtcGxlID0gMDtcblxuXHRcdGZvciAoIGxldCBpID0gMTsgaSA8IGNhY2hlLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0c2FtcGxlID0gaSAtIDE7XG5cdFx0XHRpZiAoIHggPCBjYWNoZVsgaSBdICkgYnJlYWs7XG5cblx0XHR9XG5cblx0XHRsZXQgdCA9IHNhbXBsZSAvICggQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFIC0gMS4wICk7XG5cdFx0bGV0IGRpZmYgPSBjYWxjQmV6aWVyU2xvcGUoIHAsIHQgKSAvICggcC5wMyAtIHAucDAgKTtcblxuXHRcdGlmICggZGlmZiA9PSAwLjAgKSB7XG5cblx0XHRcdHJldHVybiB0O1xuXG5cdFx0fSBlbHNlIGlmICggZGlmZiA+IDAuMDEgKSB7XG5cblx0XHRcdHJldHVybiBuZXd0b24oIHgsIHAsIHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldHVybiBzdWJkaXYoIHgsIHQsIHQgKyBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUsIHAgKTtcblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwid29sZnk4Ny1ldmVudGVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQWN0aW9uIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb25cIjtcclxuaW1wb3J0IHsgRkN1cnZlIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9GQ3VydmVcIjtcclxuaW1wb3J0IHsgRkN1cnZlR3JvdXAgfSBmcm9tICcuLi9BbmltYXRpb24vRkN1cnZlR3JvdXAnO1xyXG5pbXBvcnQgeyBGQ3VydmVJbnRlcnBvbGF0aW9uLCBGQ3VydmVLZXlGcmFtZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWVcIjtcclxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XHJcblxyXG5leHBvcnQgdHlwZSBCQ01lc3NhZ2UgPSBCQ1N5bmNTY2VuZU1lc3NhZ2UgfCBCQ1N5bmNGcmFtZU1lc3NhZ2VcclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAndycgfCAnc2NhbGFyJ1xyXG5cclxuZXhwb3J0IHR5cGUgQkNTeW5jU2NlbmVNZXNzYWdlID0ge1xyXG5cdHR5cGU6IFwic3luYy9zY2VuZVwiLFxyXG4gICAgZGF0YTogQkNTY2VuZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVEYXRhID0ge1xyXG5cdGFjdGlvbnM6IEJDQW5pbWF0aW9uQWN0aW9uUGFyYW1bXTtcclxuICAgIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW107XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQWN0aW9uUGFyYW0gPSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmY3VydmVfZ3JvdXBzOiB7W2tleTogc3RyaW5nXTogQkNBbmltYXRpb25DdXJ2ZVBhcmFtW119O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkN1cnZlUGFyYW0gPSB7XHJcbiAgICBrZXlmcmFtZXM6IEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtW107XHJcblx0YXhpczogQkNBbmltYXRpb25DdXJ2ZUF4aXNcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUtleUZyYW1lUGFyYW0gPSB7XHJcbiAgICBjOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9sOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9yOiBUSFJFRS5WZWMyO1xyXG4gICAgZTogc3RyaW5nO1xyXG4gICAgaTogRkN1cnZlSW50ZXJwb2xhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNTY2VuZU9iamVjdERhdGEgPSB7XHJcblx0bmFtZTogc3RyaW5nLFxyXG5cdGFjdGlvbnM6IHN0cmluZ1tdXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY0ZyYW1lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvdGltZWxpbmVcIjtcclxuXHRkYXRhOiBCQ1RpbWVsaW5lRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNUaW1lbGluZURhdGEgPSB7XHJcblx0c3RhcnQ6IG51bWJlcjtcclxuXHRlbmQ6IG51bWJlcjtcclxuXHRjdXJyZW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbGVuZGVyQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0Ly8gd3NcclxuXHJcblx0cHJpdmF0ZSB1cmw/OiBzdHJpbmc7XHJcblx0cHJpdmF0ZSB3cz86IFdlYlNvY2tldDtcclxuXHRwdWJsaWMgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8vIGZyYW1lXHJcblxyXG5cdHB1YmxpYyBmcmFtZUN1cnJlbnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXIgPSAwO1xyXG5cclxuXHQvLyBhbmltYXRpb25cclxuXHJcblx0cHVibGljIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW10gPSBbXTtcclxuXHRwdWJsaWMgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHJcblx0Y29uc3RydWN0b3IoIHVybD86IHN0cmluZyApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdGlmICggdXJsICkge1xyXG5cclxuXHRcdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0XHRcdHRoaXMuY29ubmVjdCggdGhpcy51cmwgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNvbm5lY3QoIHVybDogc3RyaW5nICkge1xyXG5cclxuXHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0dGhpcy53cyA9IG5ldyBXZWJTb2NrZXQoIHRoaXMudXJsICk7XHJcblx0XHR0aGlzLndzLm9ub3BlbiA9IHRoaXMub25PcGVuLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy53cy5vbmNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25lcnJvciA9ICggZSApID0+IHtcclxuXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGUgKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzeW5jSnNvblNjZW5lKCBqc29uUGF0aDogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCByZXEucmVhZHlTdGF0ZSA9PSA0ICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHJlcS5zdGF0dXMgPT0gMjAwICkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub25TeW5jU2NlbmUoIEpTT04ucGFyc2UoIHJlcS5yZXNwb25zZSApICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdHJlcS5vcGVuKCAnR0VUJywganNvblBhdGggKTtcclxuXHRcdHJlcS5zZW5kKCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25TeW5jU2NlbmUoIGRhdGE6IEJDU2NlbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuYWN0aW9ucy5sZW5ndGggPSAwO1xyXG5cdFx0dGhpcy5vYmplY3RzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0Ly8gYWN0aW9uc1xyXG5cclxuXHRcdGRhdGEuYWN0aW9ucy5mb3JFYWNoKCBhY3Rpb25EYXRhID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSBuZXcgQW5pbWF0aW9uQWN0aW9uKCBhY3Rpb25EYXRhLm5hbWUgKTtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cE5hbWVzID0gT2JqZWN0LmtleXMoYWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzKVxyXG5cclxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgZmN1cnZlR3JvdXBOYW1lcy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwTmFtZSA9IGZjdXJ2ZUdyb3VwTmFtZXNbaV07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwID0gbmV3IEZDdXJ2ZUdyb3VwKCBmY3VydmVHcm91cE5hbWUgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhY3Rpb25EYXRhLmZjdXJ2ZV9ncm91cHNbZmN1cnZlR3JvdXBOYW1lXS5mb3JFYWNoKCBmY3VydmVEYXRhID0+IHtcclxuXHJcblx0XHRcdFx0XHRsZXQgY3VydmUgPSBuZXcgRkN1cnZlKCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnZlLnNldCggZmN1cnZlRGF0YS5rZXlmcmFtZXMubWFwKCBmcmFtZSA9PiB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgRkN1cnZlS2V5RnJhbWUoIGZyYW1lLmMsIGZyYW1lLmhfbCwgZnJhbWUuaF9yLCBmcmFtZS5pICk7XHJcblx0XHJcblx0XHRcdFx0XHR9ICkgKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ZmN1cnZlR3JvdXAuc2V0RkN1cnZlKCBjdXJ2ZSwgZmN1cnZlRGF0YS5heGlzICk7XHJcblx0XHJcblx0XHRcdFx0fSApO1xyXG5cclxuXHRcdFx0XHRhY3Rpb24uYWRkRmN1cnZlR3JvdXAoIGZjdXJ2ZUdyb3VwLm5hbWUsIGZjdXJ2ZUdyb3VwICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Ly8gb2JqZWN0c1xyXG5cclxuXHRcdGRhdGEub2JqZWN0cy5mb3JFYWNoKCBvYmplY3REYXRhID0+IHtcclxuXHJcblx0XHRcdHRoaXMub2JqZWN0cy5wdXNoKCBvYmplY3REYXRhICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIGRpc3BhdGNoIGV2ZW50XHJcblx0XHRcclxuXHRcdHRoaXMuZW1pdEV2ZW50KCd1cGRhdGUvc2NlbmUnLCBbdGhpc10pXHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSh0aGlzLmZyYW1lQ3VycmVudCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvblN5bmNUaW1lbGluZSggZGF0YTogQkNUaW1lbGluZURhdGEgKSB7XHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSggZGF0YS5jdXJyZW50LCBkYXRhLnN0YXJ0LCBkYXRhLmVuZCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0V1MgRXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25PcGVuKCBldmVudDogRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25NZXNzYWdlKCBlOiBNZXNzYWdlRXZlbnQgKSB7XHJcblxyXG5cdFx0bGV0IG1zZyA9IEpTT04ucGFyc2UoIGUuZGF0YSApIGFzIEJDTWVzc2FnZTtcclxuXHJcblx0XHRpZiAoIG1zZy50eXBlID09ICdzeW5jL3NjZW5lJyApIHtcclxuXHJcblx0XHRcdHRoaXMub25TeW5jU2NlbmUoIG1zZy5kYXRhICk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggbXNnLnR5cGUgPT0gXCJzeW5jL3RpbWVsaW5lXCIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1RpbWVsaW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkNsb3NlKCBlOkNsb3NlRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEFQSVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLm9iamVjdHNbIGkgXS5uYW1lID09IG9iamVjdE5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLm9iamVjdHNbIGkgXS5hY3Rpb25zO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gW107XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbiggYWN0aW9uTmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuYWN0aW9uc1sgaSBdLm5hbWUgPT0gYWN0aW9uTmFtZSApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTGlzdCggb2JqZWN0TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCBhY3Rpb25zOiBBbmltYXRpb25BY3Rpb25bXSA9IFtdO1xyXG5cdFx0bGV0IGFjdGlvbk5hbWVMaXN0ID0gdGhpcy5nZXRBY3Rpb25OYW1lTGlzdCggb2JqZWN0TmFtZSApO1xyXG5cclxuXHRcdGFjdGlvbk5hbWVMaXN0LmZvckVhY2goIGFjdGlvbk5hbWUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IGFjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCBhY3Rpb25OYW1lICk7XHJcblxyXG5cdFx0XHRpZiAoIGFjdGlvbiApIHtcclxuXHJcblx0XHRcdFx0YWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0cmV0dXJuIGFjdGlvbnM7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkNvbnRhaW5zQWNjZXNzb3IoIGFjY2Vzc29yOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIGFjdGlvbi5jdXJ2ZXMgKTtcclxuXHJcblx0XHRcdHJldHVybiBjdXJ2ZUtleXMuc29tZShjdXJ2ZU5hbWUgPT4gY3VydmVOYW1lPT1hY2Nlc3NvcilcclxuXHRcdFx0XHJcblx0XHR9KSB8fCBudWxsXHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUaW1lbGluZSggY3VycmVudDogbnVtYmVyLCBzdGFydD86bnVtYmVyLCBlbmQ/Om51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmZyYW1lQ3VycmVudCA9IGN1cnJlbnQ7XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSBzdGFydCB8fCB0aGlzLmZyYW1lU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gZW5kIHx8IHRoaXMuZnJhbWVFbmQ7XHJcblxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoICd1cGRhdGUvdGltZWxpbmUnLCBbIHRoaXMuZnJhbWVDdXJyZW50LCB0aGlzLmZyYW1lU3RhcnQsIHRoaXMuZnJhbWVFbmQgXSApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RGlzcG9zZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2VXUygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlV1MoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLndzICkge1xyXG5cclxuXHRcdFx0dGhpcy53cy5jbG9zZSgpO1xyXG5cdFx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25jbG9zZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25vcGVuID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB2ZXJ0IGZyb20gJy4vZG9tTWVzaC52cyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBjbGFzcyBET01NZXNoIGV4dGVuZHMgVEhSRUUuTWVzaCB7XG5cblx0cHJvdGVjdGVkIF91bmlmb3JtczogVW5pZm9ybXM7XG5cdHByb3RlY3RlZCBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggZWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmFtZXRlcjogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICk7XG5cblx0XHRwYXJhbWV0ZXIudmVydGV4U2hhZGVyID0gdmVydDtcblxuXHRcdGxldCB1bmkgPSBVbmlmb3Jtc0xpYi5tZXJnZVVuaWZvcm1zKCBwYXJhbWV0ZXIudW5pZm9ybXMsIHtcblx0XHRcdGRvbVBvczoge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdGRvbVNpemU6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHR3aW5kb3dTaXplOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0YXNwZWN0UmF0aW86IHtcblx0XHRcdFx0dmFsdWU6IDEuMFxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdHBhcmFtZXRlci51bmlmb3JtcyA9IHVuaTtcblxuXHRcdGxldCBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBhcmFtZXRlciApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zID0gdW5pO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQgdW5pZm9ybXMoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fdW5pZm9ybXM7XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zLndpbmRvd1NpemUudmFsdWUuc2V0KCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0dGhpcy5fdW5pZm9ybXMuYXNwZWN0UmF0aW8udmFsdWUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21TaXplLnZhbHVlLnNldCggcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQgKTtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21Qb3MudmFsdWUuc2V0KCByZWN0LmxlZnQsIHJlY3QudG9wICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBCZXppZXIgfSBmcm9tIFwiLi9CZXppZXJcIjtcblxuZXhwb3J0IHR5cGUgRWFzaW5nRnVuYyA9ICggdDogbnVtYmVyICkgPT4gYW55XG5cbmV4cG9ydCBuYW1lc3BhY2UgRWFzaW5ncyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNpZ21vaWQoIHdlaWdodDogbnVtYmVyID0gNiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0dmFyIGUxID0gTWF0aC5leHAoIC0gd2VpZ2h0ICogKCAyICogeCAtIDEgKSApO1xuXHRcdFx0dmFyIGUyID0gTWF0aC5leHAoIC0gd2VpZ2h0ICk7XG5cblx0XHRcdHJldHVybiAoIDEgKyAoIDEgLSBlMSApIC8gKCAxICsgZTEgKSAqICggMSArIGUyICkgLyAoIDEgLSBlMiApICkgLyAyO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdmFsdWU6IG51bWJlciApOiBudW1iZXIge1xuXG5cdFx0bGV0IHggPSBNYXRoLm1heCggMCwgTWF0aC5taW4oIDEsICggdmFsdWUgLSBtaW4gKSAvICggbWF4IC0gbWluICkgKSApO1xuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fVxuXG5cdC8qXG5cdEBhdXRoZXIgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcblx0Ki9cblxuXHRleHBvcnQgZnVuY3Rpb24gbGluZWFyKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqICggMiAtIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyAyICogdCAqIHQgOiAtIDEgKyAoIDQgLSAyICogdCApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gKCAtLSB0ICkgKiB0ICogdCArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAoIHQgLSAxICkgKiAoIDIgKiB0IC0gMiApICogKCAyICogdCAtIDIgKSArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxIC0gKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoIC0tIHQgKSAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxICsgKCAtLSB0ICkgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuICBcdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCggdDogbnVtYmVyICkge1xuXG4gIFx0XHRyZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuICBcdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gYmV6aWVyKCBjMTogVEhSRUUuVmVjMiwgaDE6IFRIUkVFLlZlYzIsIGgyOiBUSFJFRS5WZWMyLCBjMjogVEhSRUUuVmVjMiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHZhciBjYWNoZSA9IG5ldyBBcnJheSggQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTsgKysgaSApIHtcblxuXHRcdFx0Y2FjaGVbIGkgXSA9IEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIGkgLyAoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgLSAxLjAgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuICggeDogbnVtYmVyICkgPT4ge1xuXG5cdFx0XHRpZiAoIHggPD0gYzEueCApIHJldHVybiBjMS55O1xuXHRcdFx0aWYgKCBjMi54IDw9IHggKSByZXR1cm4gYzIueTtcblxuXHRcdFx0cmV0dXJuIEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS55LCBwMTogaDEueSwgcDI6IGgyLnksIHAzOiBjMi55IH0sIEJlemllci5nZXRCZXppZXJUZnJvbVgoIHsgcDA6IGMxLngsIHAxOiBoMS54LCBwMjogaDIueCwgcDM6IGMyLnggfSwgeCwgY2FjaGUgKSApO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGN1YmljQmV6aWVyKCBoMVg6IG51bWJlciwgaDFZOiBudW1iZXIsIGgyWDogbnVtYmVyLCBoMlk6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBiZXppZXIoXG5cdFx0XHR7IHg6IDAuMCwgeTogMC4wIH0sXG5cdFx0XHR7IHg6IGgxWCBhcyBudW1iZXIsIHk6IGgxWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogaDJYIGFzIG51bWJlciwgeTogaDJZIGFzIG51bWJlciB9LFxuXHRcdFx0eyB4OiAxLjAsIHk6IDEuMCB9LFxuXHRcdCk7XG5cblx0fVxuXG59XG4iLCJleHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnQge1xuXHR0eXBlOiBzdHJpbmc7XG5cdFtrZXk6c3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnRMaXN0ZW5lciB7XG5cdHR5cGU6IHN0cmluZyxcblx0bGlzdGVuZXI6ICggZTogRXZlbnQgKSA9PiB2b2lkLFxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcml2YXRlIGV2ZW50czogRXZlbnRMaXN0ZW5lcltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiAoIGU6IEV2ZW50ICkgPT4gdm9pZCApIHtcblxuXHRcdHRoaXMuZXZlbnRzLnB1c2goIHtcblx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRsaXN0ZW5lcjogbGlzdGVuZXJcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwYXRjaEV2ZW50KCBldmVudDogRXZlbnQgKSB7XG5cblx0XHRldmVudC50YXJnZXQgPSB0aGlzO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIGV2ZW50LnR5cGUgPT0gdGhpcy5ldmVudHNbIGkgXS50eXBlICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzWyBpIF0ubGlzdGVuZXIoIGV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSB0aGlzLmV2ZW50cy5sZW5ndGg7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0aWYgKCB0eXBlID09IHRoaXMuZXZlbnRzWyBpIF0udHlwZSAmJiBsaXN0ZW5lciA9PSB0aGlzLmV2ZW50c1sgaSBdLmxpc3RlbmVyICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzLnNwbGljZSggaSwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC52cyc7XG5pbXBvcnQgcGFzc1Rocm91Z2hGcmFnIGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC5mcyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVQ29tcHV0YXRpb25LZXJuZWx7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsLFxuICAgIHVuaWZvcm1zOiBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVY29tcHV0YXRpb25EYXRhe1xuICAgIGJ1ZmZlcjogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRcbn1cblxuZXhwb3J0IGNsYXNzIEdQVUNvbXB1dGF0aW9uQ29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXHRwdWJsaWMgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHByb3RlY3RlZCB1bmlmb3JtczogYW55O1xuXG5cdHByb3RlY3RlZCBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByb3RlY3RlZCBjYW1lcmE6IFRIUkVFLkNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgbWVzaDogVEhSRUUuTWVzaDtcblx0cHJvdGVjdGVkIG1hdGVyaWFsczogVEhSRUUuU2hhZGVyTWF0ZXJpYWxbXTtcblxuXHRwcm90ZWN0ZWQgdGVtcERhdGFMaW5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblx0cHJvdGVjdGVkIHRlbXBEYXRhTmVhcjogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHByaXZhdGUgcmVuZGVyVGFyZ2V0czogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRbXSA9IFtdO1xuXG5cdHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuXG4gICAgXHRyZXR1cm4gdGhpcy5yZW5kZXJlci5leHRlbnNpb25zLmdldCggXCJPRVNfdGV4dHVyZV9mbG9hdFwiICk7XG5cblx0fVxuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICBcdHRoaXMuZGF0YVNpemUgPSBkYXRhU2l6ZS5jbG9uZSgpO1xuXG4gICAgXHR0aGlzLnVuaWZvcm1zID0ge1xuICAgIFx0XHRkYXRhU2l6ZToge1xuICAgIFx0XHRcdHZhbHVlOiB0aGlzLmRhdGFTaXplXG4gICAgXHRcdH1cbiAgICBcdH07XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIgPSB0aGlzLmNyZWF0ZURhdGEoIHtcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFOZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLkNhbWVyYSgpO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuICAgIFx0dGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcbiAgICBcdHRoaXMuc2NlbmUuYWRkKCB0aGlzLm1lc2ggKTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUluaXRpYWxpemVUZXh0dXJlKCkge1xuXG4gICAgXHRsZXQgYSA9IG5ldyBGbG9hdDMyQXJyYXkoIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCAqIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSAqIDQgKTtcbiAgICBcdGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLkRhdGFUZXh0dXJlKCBhLCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgVEhSRUUuUkdCQUZvcm1hdCwgVEhSRUUuRmxvYXRUeXBlICk7XG4gICAgXHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIFx0cmV0dXJuIHRleHR1cmU7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggdGV4dHVyZVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0aWFsaXplVGV4dHVyZTogVEhSRUUuRGF0YVRleHR1cmUsIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdFRleF90ZXhQYXJhbT86IGFueSwgdGV4dHVyZVBhcmFtPyA6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGEge1xuXG4gICAgXHRsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBcdGxldCBpc2lPUyA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgXHRsZXQgcGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyA9IHtcbiAgICBcdFx0d3JhcFM6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgXHRcdHdyYXBUOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0Zm9ybWF0OiBUSFJFRS5SR0JBRm9ybWF0LFxuICAgIFx0XHR0eXBlOiBpc2lPUyA/IFRIUkVFLkhhbGZGbG9hdFR5cGUgOiBUSFJFRS5GbG9hdFR5cGUsXG4gICAgXHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxuICAgIFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcbiAgICBcdH07XG4gICAgXHRsZXQgaW5pdFRleDogVEhSRUUuRGF0YVRleHR1cmUgfCBudWxsID0gbnVsbDtcbiAgICBcdGxldCBjdXN0b21QYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zIHwgbnVsbCA9IG51bGw7XG5cbiAgICBcdGlmICggaW5pdFRleF90ZXhQYXJhbSApIHtcblxuICAgIFx0XHRpZiAoIGluaXRUZXhfdGV4UGFyYW0uaXNEYXRhVGV4dHVyZSApIHtcblxuICAgIFx0XHRcdGluaXRUZXggPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdFx0aWYgKCB0ZXh0dXJlUGFyYW0gKSB7XG5cbiAgICBcdFx0XHRcdGN1c3RvbVBhcmFtID0gdGV4dHVyZVBhcmFtO1xuXG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdH0gZWxzZSB7XG5cbiAgICBcdFx0XHRjdXN0b21QYXJhbSA9IGluaXRUZXhfdGV4UGFyYW07XG5cbiAgICBcdFx0fVxuXG4gICAgXHR9XG5cbiAgICBcdGlmICggY3VzdG9tUGFyYW0gKSB7XG5cbiAgICBcdFx0cGFyYW0ud3JhcFMgPSBjdXN0b21QYXJhbS53cmFwUyB8fCBwYXJhbS53cmFwUztcbiAgICBcdFx0cGFyYW0ud3JhcFQgPSBjdXN0b21QYXJhbS53cmFwVCB8fCBwYXJhbS53cmFwVDtcbiAgICBcdFx0cGFyYW0ubWluRmlsdGVyID0gY3VzdG9tUGFyYW0ubWluRmlsdGVyIHx8IHBhcmFtLm1pbkZpbHRlcjtcbiAgICBcdFx0cGFyYW0ubWFnRmlsdGVyID0gY3VzdG9tUGFyYW0ubWFnRmlsdGVyIHx8IHBhcmFtLm1hZ0ZpbHRlcjtcbiAgICBcdFx0cGFyYW0uZm9ybWF0ID0gY3VzdG9tUGFyYW0uZm9ybWF0IHx8IHBhcmFtLmZvcm1hdDtcbiAgICBcdFx0cGFyYW0udHlwZSA9IGN1c3RvbVBhcmFtLnR5cGUgfHwgcGFyYW0udHlwZTtcbiAgICBcdFx0cGFyYW0uc3RlbmNpbEJ1ZmZlciA9IGN1c3RvbVBhcmFtLnN0ZW5jaWxCdWZmZXIgfHwgcGFyYW0uc3RlbmNpbEJ1ZmZlcjtcbiAgICBcdFx0cGFyYW0uZGVwdGhCdWZmZXIgPSBjdXN0b21QYXJhbS5kZXB0aEJ1ZmZlciB8fCBwYXJhbS5kZXB0aEJ1ZmZlcjtcblxuICAgIFx0fVxuXG4gICAgXHRsZXQgYnVmID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgcGFyYW0gKTtcblxuXHRcdGxldCBkYXRhID0geyBidWZmZXI6IGJ1ZiB9O1xuXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRzLnB1c2goIGJ1ZiApO1xuXG4gICAgXHRpZiAoIGluaXRUZXggKSB7XG5cbiAgICBcdFx0bGV0IGluaXRLZXJuZWwgPSB0aGlzLmNyZWF0ZUtlcm5lbCgge1xuXHRcdFx0XHRmcmFnbWVudFNoYWRlcjogcGFzc1Rocm91Z2hGcmFnLFxuXHRcdFx0XHR1bmlmb3Jtczoge1xuXHRcdFx0XHRcdHRleDoge1xuXHRcdFx0XHRcdFx0dmFsdWU6IGluaXRUZXhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuICAgIFx0XHR0aGlzLmNvbXB1dGUoIGluaXRLZXJuZWwsIGRhdGEgKTtcblxuICAgIFx0fVxuXG4gICAgXHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUtlcm5lbCggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApOiBHUFVDb21wdXRhdGlvbktlcm5lbCB7XG5cbiAgICBcdGxldCB1bmk6IFVuaWZvcm1zID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW0udW5pZm9ybXMsIHRoaXMudW5pZm9ybXMgKTtcblxuXHRcdHBhcmFtLnVuaWZvcm1zID0gdW5pO1xuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXG4gICAgXHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscy5wdXNoKCBtYXQgKTtcblxuICAgIFx0bGV0IGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwgPSB7XG4gICAgXHRcdG1hdGVyaWFsOiBtYXQsXG4gICAgXHRcdHVuaWZvcm1zOiBwYXJhbS51bmlmb3Jtc1xuICAgIFx0fTtcblxuICAgIFx0cmV0dXJuIGtlcm5lbDtcblxuXHR9XG5cblx0cHVibGljIGNvbXB1dGUoIGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwsIGRhdGE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgY2FtZXJhPzogVEhSRUUuQ2FtZXJhICkge1xuXG4gICAgXHRsZXQgdGVtcDogR1BVY29tcHV0YXRpb25EYXRhO1xuXG4gICAgXHRpZiAoIGRhdGEuYnVmZmVyLnRleHR1cmUubWFnRmlsdGVyID09IFRIUkVFLkxpbmVhckZpbHRlciApIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YUxpbmVhcjtcblxuICAgIFx0fSBlbHNlIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YU5lYXI7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5tZXNoLm1hdGVyaWFsID0ga2VybmVsLm1hdGVyaWFsO1xuXG4gICAgXHRsZXQgY3VycmVudFJlbmRlclRhcmdldCA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCB0ZW1wLmJ1ZmZlciApO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgY2FtZXJhIHx8IHRoaXMuY2FtZXJhICk7XG5cbiAgICBcdHRoaXMuc3dhcEJ1ZmZlcnMoIGRhdGEsIHRlbXAgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIGN1cnJlbnRSZW5kZXJUYXJnZXQgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHN3YXBCdWZmZXJzKCBiMTogR1BVY29tcHV0YXRpb25EYXRhLCBiMjogR1BVY29tcHV0YXRpb25EYXRhICkge1xuXG4gICAgXHRsZXQgdG1wID0gYjEuYnVmZmVyO1xuICAgIFx0YjEuYnVmZmVyID0gYjIuYnVmZmVyO1xuICAgIFx0YjIuYnVmZmVyID0gdG1wO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuICAgIFx0bGV0IGdlbyA9IHRoaXMubWVzaC5nZW9tZXRyeTtcbiAgICBcdGdlby5kaXNwb3NlKCk7XG5cbiAgICBcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgaSArKyApIHtcblxuICAgIFx0XHR0aGlzLm1hdGVyaWFsc1sgaSBdLmRpc3Bvc2UoKTtcblxuICAgIFx0fVxuXG4gICAgXHR0aGlzLnNjZW5lLnJlbW92ZSggdGhpcy5tZXNoICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIuYnVmZmVyLmRpc3Bvc2UoKTtcbiAgICBcdHRoaXMudGVtcERhdGFOZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemVEYXRhKCBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdHRoaXMuZGF0YVNpemUuY29weSggZGF0YVNpemUgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMucmVuZGVyVGFyZ2V0cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLnJlbmRlclRhcmdldHNbIGkgXTtcblxuXHRcdFx0dGFyZ2V0LnNldFNpemUoIGRhdGFTaXplLngsIGRhdGFTaXplLnkgKTtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG5cdHBvc2l0aW9uPzogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEJhc2VUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cdHNjYWxlOiBUSFJFRS5WZWN0b3IzXG59XG5cbmV4cG9ydCBjbGFzcyBMYXlvdXRDb250cm9sbGVyIHtcblxuXHRwcm90ZWN0ZWQgb2JqOiBUSFJFRS5PYmplY3QzRDtcblx0cHJvdGVjdGVkIGJhc2VUcmFuc2Zvcm06IEJhc2VUcmFuc2Zvcm07XG5cdHByb3RlY3RlZCB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0sIGlzQWJzb2x1dGVQb3NpdGlvbj86IGJvb2xlYW4gKSB7XG5cblx0XHR0aGlzLm9iaiA9IG9iamVjdDtcblxuXHRcdHRoaXMuYmFzZVRyYW5zZm9ybSA9IHtcblx0XHRcdHBvc2l0aW9uOiB0aGlzLm9iai5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0cm90YXRpb246IHRoaXMub2JqLnF1YXRlcm5pb24uY2xvbmUoKSxcblx0XHRcdHNjYWxlOiB0aGlzLm9iai5zY2FsZS5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG5cdFx0aWYgKCAhIGlzQWJzb2x1dGVQb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uYWRkKCB0aGlzLm9iai5wb3NpdGlvbiApO1xuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucm90YXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucm90YXRpb24ubXVsdGlwbHkoIHRoaXMub2JqLnF1YXRlcm5pb24gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZVRyYW5zZm9ybSggd2VpZ2h0OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5wb3NpdGlvbi5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKS5sZXJwKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0ucm90YXRpb24gKSB7XG5cblx0XHRcdHRoaXMub2JqLnF1YXRlcm5pb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCkuc2xlcnAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLCB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSApIHtcblxuXHRcdFx0dGhpcy5vYmouc2NhbGUuY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnNjYWxlLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMudHJhbnNmb3JtLnNjYWxlICogKCB3ZWlnaHQgKSArIDEuMCAtIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBBbmltYXRvclZhcmlhYmxlVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMZXJwRnVuYzxUPntcblx0KCBhOiBULCBiOiBULCB0OiBudW1iZXIgKTogVDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMZXJwcyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlciggYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhICsgKCBiIC0gYSApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlckFycmF5KCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggYS5sZW5ndGggPT0gYi5sZW5ndGggKSB7XG5cblx0XHRcdGxldCBjID0gW107XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGMucHVzaCggYVsgaSBdICsgKCBiWyBpIF0gLSBhWyBpIF0gKSAqIHQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCAnRGlmZmVyZW50IGxlbmd0aCBBcnJheXMhISEnICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFVmVjdG9ycyggYTogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIGI6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLmxlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFUXVhdGVybmlvbiggYTogVEhSRUUuUXVhdGVybmlvbiwgYjogVEhSRUUuUXVhdGVybmlvbiwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5zbGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVFdWxlciggYTogVEhSRUUuRXVsZXIsIGI6IFRIUkVFLkV1bGVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgYWMgPSBhLmNsb25lKCk7XG5cdFx0bGV0IGJjID0gYi5jbG9uZSgpO1xuXG5cdFx0YWMueCA9IGFjLnggKyAoIGJjLnggLSBhYy54ICkgKiB0O1xuXHRcdGFjLnkgPSBhYy55ICsgKCBiYy55IC0gYWMueSApICogdDtcblx0XHRhYy56ID0gYWMueiArICggYmMueiAtIGFjLnogKSAqIHQ7XG5cblx0XHRyZXR1cm4gYWM7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRMZXJwRnVuYyggdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgKCB2YWx1ZSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlckFycmF5O1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc1ZlY3RvcjJcIiBpbiB2YWx1ZSB8fCBcImlzVmVjdG9yM1wiIGluIHZhbHVlIHx8IFwiaXNWZWN0b3I0XCIgaW4gdmFsdWUgfHwgXCJpc0NvbG9yXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVZlY3RvcnM7XG5cblx0XHR9IGVsc2UgaWYgKCBcImlzUXVhdGVybmlvblwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVRdWF0ZXJuaW9uO1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc0V1bGVyXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRUV1bGVyO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTW91c2VSb3RhdG9yIHtcblxuXHRwdWJsaWMgdGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblx0cHVibGljIHNjcm9sbFZlbDogVEhSRUUuVmVjdG9yMjtcblxuXHRjb25zdHJ1Y3Rvciggb2JqczogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHR0aGlzLnRhcmdldCA9IG9ianM7XG5cblx0XHR0aGlzLnNjcm9sbFZlbCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMuc2Nyb2xsVmVsLm11bHRpcGx5U2NhbGFyKCAwLjk2ICk7XG5cblx0XHRsZXQgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCB0aGlzLnNjcm9sbFZlbC55LCB0aGlzLnNjcm9sbFZlbC54LCAwLjAgKS5ub3JtYWxpemUoKTtcblxuXHRcdGxldCBxID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tQXhpc0FuZ2xlKCBheGlzLCB0aGlzLnNjcm9sbFZlbC5sZW5ndGgoKSApO1xuXHRcdHEubXVsdGlwbHkoIHRoaXMudGFyZ2V0LnF1YXRlcm5pb24gKTtcblxuXHRcdHRoaXMudGFyZ2V0LnF1YXRlcm5pb24uY29weSggcSApO1xuXG5cdH1cblxuXHRhZGRWZWxvY2l0eSggc2Nyb2xsRGVsdGE6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHR0aGlzLnNjcm9sbFZlbC5hZGRWZWN0b3JzKCB0aGlzLnNjcm9sbFZlbCwgc2Nyb2xsRGVsdGEubXVsdGlwbHlTY2FsYXIoIDAuMDAxICkgKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgUGFnZVNjcm9sbGVyIH0gZnJvbSAnLic7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnRBcmdzIHtcclxuXHRzY3JvbGxlcjogUGFnZVNjcm9sbGVyO1xyXG5cdHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0c2Nyb2xsTW9kZTogc3RyaW5nO1xyXG5cdHNjcm9sbERlbHRhOiBudW1iZXI7XHJcblx0c2Nyb2xsUG93ZXI6IG51bWJlcjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnQge1xyXG5cdGNvbW1vbj86ICggYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzICkgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0dXA/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdGRvd24/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJFdmVudHMge1xyXG5cdG9uU3RhcnRTY3JvbGw/OiBQYWdlU2Nyb2xsZXJFdmVudFxyXG5cdG9uQXJyaXZhbHM/OiB7XHJcblx0XHRwZXJjZW50YWdlOiBudW1iZXI7XHJcblx0XHRldmVudDogUGFnZVNjcm9sbGVyRXZlbnQ7XHJcblx0fVtdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0ZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHN0b3A/OiBib29sZWFuO1xyXG5cdHN0YXJ0U2Nyb2xsVXA/OiBudW1iZXI7XHJcblx0c3RhcnRTY3JvbGxEb3duPzogbnVtYmVyO1xyXG5cdGJvdHRvbT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0IHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2Nyb2xsZXJTZWN0aW9uIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0cHVibGljIHJlY3Q6IFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0O1xyXG5cdHB1YmxpYyBzdGFydFNjcm9sbFVwOiBudW1iZXI7XHJcblx0cHVibGljIHN0YXJ0U2Nyb2xsRG93bjogbnVtYmVyO1xyXG5cdHB1YmxpYyBzdG9wPzogYm9vbGVhbjtcclxuXHRwdWJsaWMgZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHB1YmxpYyBib3R0b20/OiBib29sZWFuO1xyXG5cdHB1YmxpYyB0aW1lbGluZVBlcmNlbnRhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBwYXJhbXM6IFBhZ2VTY3JvbGxlclNlY3Rpb25QYXJhbXMgKSB7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBwYXJhbXMuZWxlbWVudDtcclxuXHRcdHRoaXMucmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHRoaXMuc3RvcCA9IHBhcmFtcy5zdG9wO1xyXG5cdFx0dGhpcy5ldmVudHMgPSBwYXJhbXMuZXZlbnRzO1xyXG5cdFx0dGhpcy5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG5cdFx0dGhpcy5zdGFydFNjcm9sbERvd24gPSBwYXJhbXMuc3RhcnRTY3JvbGxEb3duIHx8IDA7XHJcblx0XHR0aGlzLnN0YXJ0U2Nyb2xsVXAgPSBwYXJhbXMuc3RhcnRTY3JvbGxVcCB8fCAwO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUmVjdCggMCApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgaXNQYWdlU2Nyb2xsZXJTZWN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGVSZWN0KCBzY3JvbGxQb3M6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnJlY3QgPSB7XHJcblx0XHRcdHg6IHRoaXMuZWxlbWVudC5vZmZzZXRMZWZ0LFxyXG5cdFx0XHR5OiB0aGlzLmVsZW1lbnQub2Zmc2V0VG9wIC0gc2Nyb2xsUG9zLFxyXG5cdFx0XHR3aWR0aDogdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHRcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFNjcm9sbFBlcmNlbnRhZ2UoIG9mZnNldFBvcz86IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gKCB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICk7XHJcblx0XHRsZXQgcG9zID0gKCB0aGlzLnJlY3QueSArIGJvdHRvbU9mZnNldCApIC0gKCBvZmZzZXRQb3MgfHwgMCApO1xyXG5cclxuXHRcdGxldCBmaXJzdEhhbGZIZWlnaHQgPSB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRsZXQgZmlyc3RIYWxmID0gTWF0aC5taW4oIDEuMCwgMS4wIC0gKCBwb3MgLyBmaXJzdEhhbGZIZWlnaHQgKSApO1xyXG5cclxuXHRcdGxldCBzZWNvbmRIYWxmSGVpZ2h0ID0gdGhpcy5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiB0aGlzLnJlY3QuaGVpZ2h0O1xyXG5cdFx0bGV0IHNlY29uZEhhbGYgPSBNYXRoLm1heCggMC4wLCAtIHBvcyAvIHNlY29uZEhhbGZIZWlnaHQgKTtcclxuXHJcblx0XHRsZXQgcGVyY2VudGFnZSA9IGZpcnN0SGFsZiArIHNlY29uZEhhbGY7XHJcblxyXG5cdFx0cmV0dXJuIHBlcmNlbnRhZ2U7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zLCBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgfSBmcm9tICcuL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jLCBFYXNpbmdzIH0gZnJvbSAnLi4vRWFzaW5ncyc7XHJcbmltcG9ydCB7IEFuaW1hdG9yIH0gZnJvbSAnLi4vQW5pbWF0b3InO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckF1dG9Nb3ZlUGFyYW0ge1xyXG5cdHRhcmdldDogc3RyaW5nIHwgbnVtYmVyIHwgUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRkdXJhdGlvbj86IG51bWJlcjtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cdGNhbGxCYWNrPzogRnVuY3Rpb247XHJcblx0Ym90dG9tPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTY3JvbGxlciB7XHJcblxyXG5cdHByb3RlY3RlZCBhbmltYXRvcjogQW5pbWF0b3I7XHJcblx0cHJvdGVjdGVkIGlzQXV0b01vdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJvdGVjdGVkIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdHByb3RlY3RlZCBwYXJlbnRFbGVtZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdHByb3RlY3RlZCBzZWN0aW9uczogUGFnZVNjcm9sbGVyU2VjdGlvbltdO1xyXG5cclxuXHRwdWJsaWMgZGVsYXlTcGVlZDogbnVtYmVyID0gMC4xO1xyXG5cdHB1YmxpYyBkcmFnRGVsYXlTcGVlZDogbnVtYmVyID0gMC40O1xyXG5cdHByb3RlY3RlZCBpc1RvdWNoaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGRlbHRhTWVtOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgc3VtRGVsdGE6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zTWVtOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUGVyY2VudGFnZTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQb3NEZWxheTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBlcmNlbnRhZ2VEZWxheTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIGNhdWdodFNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24gfCBudWxsO1xyXG5cdHByb3RlY3RlZCBkcmFnU3RvcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBkcmFnVW5sb2NrUmVhZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcclxuXHRcdHRoaXMucGFyZW50RWxlbWVudEhlaWdodCA9IHBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMuY2F1Z2h0U2VjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0aW5pdCBBbmltYXRvclxyXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRvci5hZGQoIHtcclxuXHRcdFx0bmFtZTogJ3Njcm9sbFBvcycsXHJcblx0XHRcdGluaXRWYWx1ZTogMCxcclxuXHRcdFx0ZWFzaW5nOiBFYXNpbmdzLnNpZ21vaWQoKVxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUG9zKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQb3M7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQb3NEZWxheSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUG9zRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQZXJjZW50YWdlKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUGVyY2VudGFnZURlbGF5KCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxUaW1lbGluZVBlcmNlbnRhZ2UoKSB7XHJcblxyXG5cdFx0bGV0IHN1bSA9IDA7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc2VjID0gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cdFx0XHRsZXQgc2VjQmVmID0gdGhpcy5zZWN0aW9uc1sgaSAtIDEgXTtcclxuXHJcblx0XHRcdGxldCBhID0gTWF0aC5tYXgoIDAuMCwgc2VjLmVsZW1lbnQub2Zmc2V0VG9wIC0gdGhpcy5zY3JvbGxQb3NEZWxheSArICggc2VjLmJvdHRvbSA/IHNlYy5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKSApO1xyXG5cdFx0XHRsZXQgYiA9ICggKCBzZWNCZWYgPyBzZWNCZWYucmVjdC5oZWlnaHQgLSAoIHNlY0JlZi5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgOiAwICkgKyAoIHNlYy5ib3R0b20gPyBzZWMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgKSB8fCAxO1xyXG5cclxuXHRcdFx0bGV0IGQgPSAxLjAgLSAoIGEgLyBiICk7XHJcblx0XHRcdGQgPSBNYXRoLm1heCggMC4wLCBkICk7XHJcblxyXG5cdFx0XHRzdW0gKz0gZDtcclxuXHJcblx0XHRcdGlmICggZCA8IDEuMCApIGJyZWFrO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3VtIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZCggc2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiApIHtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zLnB1c2goIHNlY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLnNvcnRTZWN0aW9ucygpO1xyXG5cclxuXHRcdHJldHVybiBzZWN0aW9uO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzb3J0U2VjdGlvbnMoKSB7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucy5zb3J0KCAoIGE6IFBhZ2VTY3JvbGxlclNlY3Rpb24sIGI6IFBhZ2VTY3JvbGxlclNlY3Rpb24gKTogbnVtYmVyID0+IHtcclxuXHJcblx0XHRcdHJldHVybiBhLnJlY3QueSA+IGIucmVjdC55ID8gMSA6IC0gMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNlY3Rpb25zWyBpIF0udGltZWxpbmVQZXJjZW50YWdlID0gKCBpICsgMSApIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQoIG5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5zZWN0aW9uc1sgaSBdLm5hbWUgPT0gbmFtZSApIHJldHVybiB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUud2FybiggJ3NlY3Rpb24gXCInICsgbmFtZSArICdcIiBpcyBub3QgZXhpc3QuJyApO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUGFyZW50RWxlbWVudCgpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsUG9zKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHR0aGlzLmFwcGx5UGFyZW50RWxlbWVudFRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZVNjcm9sbFBvcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVBdXRvTW92ZSggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0dGhpcy5hZGRTY3JvbGxQb3MoKTtcclxuXHJcblx0XHR0aGlzLmNhbGNTY3JvbGxQcm9wZXJ0aWVzKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlQXV0b01vdmUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IudXBkYXRlKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdGxldCBwb3MgPSB0aGlzLmFuaW1hdG9yLmdldDxudW1iZXI+KCAnc2Nyb2xsUG9zJyApO1xyXG5cclxuXHRcdFx0aWYgKCBwb3MgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc3VtRGVsdGEgPSBwb3MgLSB0aGlzLnNjcm9sbFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkZFNjcm9sbFBvcygpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2hlY2tVbmxvY2tTdG9wU2Nyb2xsKCB0aGlzLnN1bURlbHRhICkgKSB7XHJcblxyXG5cdFx0XHRsZXQgc3RvcFBvcyA9IHRoaXMuY2hlY2tUaHJvdyggdGhpcy5zdW1EZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBzdG9wUG9zO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5fc2Nyb2xsUG9zICs9IHRoaXMuc3VtRGVsdGE7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBNYXRoLm1heCggTWF0aC5taW4oIHRoaXMuX3Njcm9sbFBvcywgdGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ICksIDAgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVW5sb2NrU3RvcFNjcm9sbCggc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgdW5sb2NrRGlyOiBudW1iZXIgPSAwO1xyXG5cdFx0bGV0IHVubG9jazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICggdGhpcy5jYXVnaHRTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IGRpc3RhbmNlID0gdGhpcy5zY3JvbGxQb3MgLSB0aGlzLnNjcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdFx0aWYgKCBzY3JvbGxEZWx0YSAqIGRpc3RhbmNlIDwgMCB8fCBNYXRoLmFicyggZGlzdGFuY2UgKSA8IDEwLjAgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHNjcm9sbERlbHRhIDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoIC0gc2Nyb2xsRGVsdGEgPiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5zdGFydFNjcm9sbFVwIHx8IDAgKSB8fCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAtIDE7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzY3JvbGxEZWx0YSA+IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBzY3JvbGxEZWx0YSA+ICggdGhpcy5jYXVnaHRTZWN0aW9uLnN0YXJ0U2Nyb2xsRG93biB8fCAwICkgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gMTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdW5sb2NrRGlyICE9IDAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cyApIHtcclxuXHJcblx0XHRcdFx0aWYgKCB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyA9IHtcclxuXHRcdFx0XHRcdFx0c2Nyb2xsZXI6IHRoaXMsXHJcblx0XHRcdFx0XHRcdHNlY3Rpb246IHRoaXMuY2F1Z2h0U2VjdGlvbixcclxuXHRcdFx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0XHRcdHNjcm9sbERlbHRhOiBzY3JvbGxEZWx0YSxcclxuXHRcdFx0XHRcdFx0c2Nyb2xsUG93ZXI6IE1hdGguYWJzKCBzY3JvbGxEZWx0YSApLFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRsZXQgdW5sb2NrOiBib29sZWFuIHwgdm9pZDtcclxuXHJcblx0XHRcdFx0XHRsZXQgY29tbW9uVW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmNvbW1vbiAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuY29tbW9uKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAtIDEgKSB1bmxvY2sgPSB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwudXAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLnVwKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAxICkgdW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24gJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGNvbW1vblVubG9jayA9PT0gZmFsc2UgfHwgdW5sb2NrID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IDA7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR1bmxvY2sgPSB1bmxvY2tEaXIgIT0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dW5sb2NrID0gdHJ1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB1bmxvY2tEaXIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5sb2NrO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93KCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHNlYyA9IHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdHNlYy51cGRhdGVSZWN0KCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHJcblx0XHRcdGxldCBzdG9wUG9zID0gdGhpcy5jaGVja1Rocm93U2VjdGlvbkV2ZW50cyggc2VjLCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBzZWM7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzQXV0b01vdmUgPyBudWxsIDogc3RvcFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3dTZWN0aW9uRXZlbnRzKCBzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBwZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCk7XHJcblx0XHRsZXQgbW92ZWRQZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdGlmICggc2VjdGlvbi5ldmVudHMgKSB7XHJcblxyXG5cdFx0XHRsZXQgYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzID0ge1xyXG5cdFx0XHRcdHNjcm9sbGVyOiB0aGlzLFxyXG5cdFx0XHRcdHNlY3Rpb246IHNlY3Rpb24sXHJcblx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0c2Nyb2xsRGVsdGE6IHNjcm9sbERlbHRhLFxyXG5cdFx0XHRcdHNjcm9sbFBvd2VyOiBNYXRoLmFicyggc2Nyb2xsRGVsdGEgKSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICggc2VjdGlvbi5ldmVudHMub25BcnJpdmFscyApIHtcclxuXHJcblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgc2VjdGlvbi5ldmVudHMub25BcnJpdmFscy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFycml2YWxFdmVudCA9IHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHNbIGkgXTtcclxuXHJcblx0XHRcdFx0XHRsZXQgaXNUaHJvdyA9IHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgYXJyaXZhbEV2ZW50LnBlcmNlbnRhZ2UgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGlzVGhyb3cgIT0gMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC5jb21tb24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmNvbW1vbiggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCBpc1Rocm93IDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LnVwICYmIGFycml2YWxFdmVudC5ldmVudC51cCggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LmRvd24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBzZWN0aW9uLnN0b3AgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgMSApICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmRyYWdVbmxvY2tSZWFkeSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2VjdGlvbi5lbGVtZW50Lm9mZnNldFRvcCArICggc2VjdGlvbi5ib3R0b20gPyBzZWN0aW9uLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvd0xpbmUoIGE6IG51bWJlciwgYiA6bnVtYmVyLCBsaW5lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCBhIDwgbGluZSAmJiBsaW5lIDw9IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBhID4gbGluZSAmJiBsaW5lID49IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAxO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGEgPT0gbGluZSAmJiBsaW5lID09IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMjtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjU2Nyb2xsUHJvcGVydGllcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUG9zRGVsYXkgKz0gKCB0aGlzLl9zY3JvbGxQb3MgLSB0aGlzLl9zY3JvbGxQb3NEZWxheSApICogKCB0aGlzLmlzVG91Y2hpbmcgJiYgISB0aGlzLmNhdWdodFNlY3Rpb24gPyB0aGlzLmRyYWdEZWxheVNwZWVkIDogdGhpcy5kZWxheVNwZWVkICkgKiBNYXRoLm1pbiggMS4wLCBkZWx0YVRpbWUgKiA2MCApO1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2UgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3MgKTtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXkgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3NEZWxheSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBzY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHNjcm9sbFBvczogbnVtYmVyICkge1xyXG5cclxuXHRcdHJldHVybiBzY3JvbGxQb3MgLyAoIHRoaXMucGFyZW50RWxlbWVudEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCApO1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlUGFyZW50RWxlbWVudCgpIHtcclxuXHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseVBhcmVudEVsZW1lbnRUcmFuc2Zvcm0oKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCggMCwnICsgLSB0aGlzLnNjcm9sbFBvc0RlbGF5LnRvU3RyaW5nKCkgKyAncHgsIDAgKSc7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbCggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmRlbHRhTWVtID0gKCB0aGlzLmRlbHRhTWVtICsgZGVsdGEgKSAvIDI7XHJcblx0XHR0aGlzLnN1bURlbHRhICs9IGRlbHRhO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYXRjaCgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5kZWx0YU1lbSA9IDA7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuX3Njcm9sbFBvcyA9IHRoaXMuX3Njcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZHJhZyggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5pc1RvdWNoaW5nICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2Nyb2xsKCBkZWx0YSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWxlYXNlKCBzbmFwOiBudW1iZXIgPSAxMC4wICkge1xyXG5cclxuXHRcdGlmICggISB0aGlzLmlzVG91Y2hpbmcgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuc2Nyb2xsKCB0aGlzLmRlbHRhTWVtICogc25hcCApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXV0b01vdmUoIHBhcmFtOiBQYWdlU2Nyb2xsZXJBdXRvTW92ZVBhcmFtICkge1xyXG5cclxuXHRcdGxldCB0YXJnZXRQb3M6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0aWYgKCAoIHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uICkuaXNQYWdlU2Nyb2xsZXJTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdHRhcmdldFBvcyA9IHRhcmdldC5lbGVtZW50Lm9mZnNldFRvcCArIGJvdHRvbU9mZnNldDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgcGFyYW0udGFyZ2V0ID09ICdzdHJpbmcnICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuZ2V0KCBwYXJhbS50YXJnZXQgKTtcclxuXHJcblx0XHRcdGlmICggdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdFx0dGFyZ2V0UG9zID0gdGFyZ2V0LmVsZW1lbnQub2Zmc2V0VG9wICsgYm90dG9tT2Zmc2V0O1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBwYXJhbS50YXJnZXQgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXRQb3MgPSBwYXJhbS50YXJnZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3Iuc2V0VmFsdWUoICdzY3JvbGxQb3MnLCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHRcdHRoaXMuYW5pbWF0b3IuYW5pbWF0ZSggJ3Njcm9sbFBvcycsIHRhcmdldFBvcywgcGFyYW0uZHVyYXRpb24sICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcGFyYW0uY2FsbEJhY2sgKSBwYXJhbS5jYWxsQmFjaygpO1xyXG5cclxuXHRcdFx0dGhpcy5pc0F1dG9Nb3ZlID0gZmFsc2U7XHJcblxyXG5cdFx0fSwgcGFyYW0uZWFzaW5nICk7XHJcblxyXG5cdFx0Ly9vblN0YXJ0U2Nyb2xs5YaF44GnQXV0b01vdmXjgZfjgZ/jgajjgY3jgIHnhKHpmZDjg6vjg7zjg5fjgavpmaXjgovjga7jgpLpmLvmraJcclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAoIHRhcmdldFBvcyAtIHRoaXMuc3VtRGVsdGEgKSAvIE1hdGguYWJzKCB0YXJnZXRQb3MgLSB0aGlzLnN1bURlbHRhICkgKiAwLjAwMDAxO1xyXG5cclxuXHRcdHRoaXMuaXNBdXRvTW92ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2ludGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcm90ZWN0ZWQgaXNTUDogYm9vbGVhbjtcblx0cHJvdGVjdGVkIGlzVG91Y2hpbmc6IGJvb2xlYW47XG5cblx0cHVibGljIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRwdWJsaWMgZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXHRcdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0dGhpcy5pc1NQID0gdXNlckFnZW50LmluZGV4T2YoICdpUGhvbmUnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQYWQnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ0FuZHJvaWQnICkgPj0gMCB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJpUGFkXCIgfHwgKCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJTYWZhcmlcIiApICE9IC0gMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiQ2hyb21lXCIgKSA9PSAtIDEgJiYgKCBuYXZpZ2F0b3IgYXMgYW55ICkuc3RhbmRhbG9uZSAhPT0gdW5kZWZpbmVkICk7XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGNvbnN0IG9uVG91Y2hTdGFydCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblRvdWNoTW92ZSA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uVG91Y21FbmQgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlckRvd24gPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJNb3ZlID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJtb3ZlXCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJVcCA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwiZW5kXCIgKTtcblx0XHRjb25zdCBvbldoZWVsID0gdGhpcy53aGVlbC5iaW5kKCB0aGlzICk7XG5cblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNtRW5kLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93biApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcm1vdmUnLCBvblBvaW50ZXJNb3ZlICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBvblBvaW50ZXJVcCApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCBcImRyYWdlbmRcIiwgb25Qb2ludGVyVXAgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggXCJ3aGVlbFwiLCBvbldoZWVsLCB7IHBhc3NpdmU6IGZhbHNlIH0gKTtcblxuXHRcdGNvbnN0IG9uVW5SZWdpc3RlciA9ICggZTogYW55ICkgPT4ge1xuXG5cdFx0XHRpZiAoIGVsbS5pc0VxdWFsTm9kZSggZS5lbG0gKSApIHtcblxuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNoZW5kJywgb25Ub3VjbUVuZCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93biApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdlbmRcIiwgb25Qb2ludGVyVXAgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCApO1xuXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHR9XG5cblx0cHVibGljIHVucmVnaXN0ZXJFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndW5yZWdpc3RlcicsXG5cdFx0XHRlbG06IGVsbSxcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRTY3JlZW5Qb3NpdGlvbiggd2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdGlmICggdGhpcy5wb3NpdGlvbi54ICE9IHRoaXMucG9zaXRpb24ueCApIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uLmNsb25lKClcblx0XHRcdC5kaXZpZGUoIHdpbmRvd1NpemUgKVxuXHRcdFx0Lm11bHRpcGx5U2NhbGFyKCAyLjAgKVxuXHRcdFx0LnN1YlNjYWxhciggMS4wICk7XG5cdFx0cC55ICo9IC0gMTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbiggZWxtOiBIVE1MRWxlbWVudCwgc2NyZWVuPzogYm9vbGVhbiApIHtcblxuXHRcdGNvbnN0IHJlY3Q6IERPTVJlY3QgPSBlbG0uZ2V0Q2xpZW50UmVjdHMoKVsgMCBdIGFzIERPTVJlY3Q7XG5cblx0XHRsZXQgeCA9IHRoaXMucG9zaXRpb24ueCAtIHJlY3QubGVmdDtcblx0XHRsZXQgeSA9IHRoaXMucG9zaXRpb24ueSAtIHJlY3QudG9wO1xuXG5cdFx0aWYgKCBzY3JlZW4gKSB7XG5cblx0XHRcdHggLz0gcmVjdC53aWR0aDtcblx0XHRcdHkgLz0gcmVjdC5oZWlnaHQ7XG5cblx0XHR9XG5cblx0XHRjb25zdCBwID0gbmV3IFRIUkVFLlZlY3RvcjIoIHgsIHkgKTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0UG9zKCB4OiBudW1iZXIsIHk6IG51bWJlciApIHtcblxuXHRcdGlmIChcblx0XHRcdHRoaXMucG9zaXRpb24ueCAhPT0gdGhpcy5wb3NpdGlvbi54IHx8XG5cdFx0XHR0aGlzLnBvc2l0aW9uLnkgIT09IHRoaXMucG9zaXRpb24ueVxuXHRcdCkge1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIHggLSB0aGlzLnBvc2l0aW9uLngsIHkgLSB0aGlzLnBvc2l0aW9uLnkgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMucG9zaXRpb24uc2V0KCB4LCB5ICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvblRvdWNoKCB0eXBlOiBzdHJpbmcsIGU6IFRvdWNoRXZlbnQgKSB7XG5cblx0XHRjb25zdCB0b3VjaCA9IGUudG91Y2hlc1sgMCBdO1xuXG5cdFx0aWYgKCB0b3VjaCApIHtcblxuXHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggdG91Y2gucGFnZVgsIHRvdWNoLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIHR5cGUgPT0gJ2VuZCcgKSB7XG5cblx0XHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggTmFOLCBOYU4sIHR5cGUsIGUgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Qb2ludGVyKCB0eXBlOiBzdHJpbmcsIGU6IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGNvbnN0IHBvaW50ZXJUeXBlID0gKCBlIGFzIFBvaW50ZXJFdmVudCApLnBvaW50ZXJUeXBlO1xuXG5cdFx0aWYgKCBwb2ludGVyVHlwZSAhPSBudWxsICkge1xuXG5cdFx0XHRpZiAoIHBvaW50ZXJUeXBlID09ICdtb3VzZScgJiYgKCBlLmJ1dHRvbiA9PSAtIDEgfHwgZS5idXR0b24gPT0gMCApICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgYXMgUG9pbnRlckV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgKTtcblxuXHRcdH1cblxuXG5cblx0fVxuXG5cdHByb3RlY3RlZCB0b3VjaEV2ZW50SGFuZGxlciggcG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIsIHR5cGU6IHN0cmluZywgZTogVG91Y2hFdmVudCB8IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGxldCBkaXNwYXRjaCA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgeCA9IHBvc1ggLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHBvc1kgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRpZiAoIHR5cGUgPT0gXCJzdGFydFwiICkge1xuXG5cdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9IGVsc2UgaWYgKCB0eXBlID09IFwibW92ZVwiICkge1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHRpZiAoIHRoaXMuaXNUb3VjaGluZyApIHtcblxuXHRcdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJlbmRcIiApIHtcblxuXHRcdFx0aWYgKCAndGFyZ2V0VG91Y2hlcycgaW4gZSApIHtcblxuXHRcdFx0XHRpZiAoIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRpZiAoIGRpc3BhdGNoICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogZSxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogdHlwZSxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0aWYgKCAhIHRoaXMuaXNTUCApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICd1cGRhdGUnLFxuXHRcdFx0XHRwb2ludGVyRXZlbnQ6IG51bGwsXG5cdFx0XHRcdHBvaW50ZXJFdmVudFR5cGU6ICdob3ZlcicsXG5cdFx0XHRcdHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHRcdGRlbHRhOiB0aGlzLmRlbHRhLmNsb25lKClcblx0XHRcdH0gKTtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIDAsIDAgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRyYWNrcGFkTWVtRGVsdGEgPSAwO1xuXHRwcm90ZWN0ZWQgdHJhY2twYWRNYXggPSBmYWxzZTtcblxuXHRwcm90ZWN0ZWQgd2hlZWwoIGU6IFdoZWVsRXZlbnQgKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICd3aGVlbCcsXG5cdFx0XHR3aGVlbEV2ZW50OiBlLFxuXHRcdH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHBhc3NUaHJvd1ZlcnQgZnJvbSAnLi9zaGFkZXJzL3Bhc3NUaHJvdy52cyc7XG5cbnR5cGUgSW5wdXRSZW5kZXJUYXJnZXQgPSB7IFtrZXk6c3RyaW5nXTogVEhSRUUuVGV4dHVyZSB8IFRIUkVFLlRleHR1cmVbXSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBQUGFyYW0gZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnN7XG5cdGlucHV0UmVuZGVyVGFyZ2V0cz86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgUG9zdFByb2Nlc3Npbmcge1xuXG5cdHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cdHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwcml2YXRlIGNhbWVyYTogVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhO1xuXHRwcml2YXRlIHNjcmVlbjogVEhSRUUuTWVzaDtcblxuXHRwdWJsaWMgZWZmZWN0OiB7XG5cdFx0bWF0ZXJpYWw6IFRIUkVFLlNoYWRlck1hdGVyaWFsLFxuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgcHBQYXJhbTogUFBQYXJhbSwgY3VzdG9tR2VvbWV0cnk/OiBUSFJFRS5CdWZmZXJHZW9tZXRyeSApIHtcblxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wICk7XG5cblx0XHR0aGlzLnNjcmVlbiA9IG5ldyBUSFJFRS5NZXNoKCBjdXN0b21HZW9tZXRyeSB8fCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApICk7XG5cdFx0dGhpcy5zY2VuZS5hZGQoIHRoaXMuc2NyZWVuICk7XG5cblx0XHRwcFBhcmFtLnZlcnRleFNoYWRlciA9IHBwUGFyYW0udmVydGV4U2hhZGVyIHx8IHBhc3NUaHJvd1ZlcnQ7XG5cdFx0cHBQYXJhbS51bmlmb3JtcyA9IHBwUGFyYW0udW5pZm9ybXMgfHwge307XG5cdFx0cHBQYXJhbS51bmlmb3Jtcy5yZXNvbHV0aW9uID0ge1xuXHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHR9O1xuXG5cdFx0dGhpcy5lZmZlY3QgPSB7XG5cdFx0XHRtYXRlcmlhbDogbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwcFBhcmFtICksXG5cdFx0fTtcblxuXHR9XG5cblx0cHVibGljIHJlbmRlciggaW5wdXRSZW5kZXJUYXJnZXRzOiBJbnB1dFJlbmRlclRhcmdldCB8IG51bGwsIHJlbmRlclRhcmdldDogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQgfCBudWxsID0gbnVsbCApIHtcblxuXHRcdGxldCByZW5kZXJUYXJnZXRNZW0gPSB0aGlzLnJlbmRlcmVyLmdldFJlbmRlclRhcmdldCgpO1xuXG5cdFx0bGV0IGVmZmVjdCA9IHRoaXMuZWZmZWN0O1xuXHRcdGxldCBtYXRlcmlhbCA9IGVmZmVjdC5tYXRlcmlhbDtcblx0XHRsZXQgdW5pZm9ybXMgPSBtYXRlcmlhbC51bmlmb3JtcztcblxuXHRcdGlmICggaW5wdXRSZW5kZXJUYXJnZXRzICkge1xuXG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCBpbnB1dFJlbmRlclRhcmdldHMgKTtcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7IGogKysgKSB7XG5cblx0XHRcdFx0aWYgKCB1bmlmb3Jtc1sga2V5c1sgaiBdIF0gKSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0udmFsdWUgPSBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0gPSB7IHZhbHVlOiBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdIH07XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0ZWZmZWN0Lm1hdGVyaWFsLnVuaWZvcm1zID0gdW5pZm9ybXM7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0dW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZS5zZXQoIHJlbmRlclRhcmdldC53aWR0aCwgcmVuZGVyVGFyZ2V0LmhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5yZW5kZXJlci5nZXRTaXplKCB1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnNjcmVlbi5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0TWVtICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IEFuaW1hdG9yVmFyaWFibGVUeXBlIH0gZnJvbSAnLi9BbmltYXRvcic7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMgfSBmcm9tICcuL0Vhc2luZ3MnO1xyXG5pbXBvcnQgeyBMZXJwcywgTGVycEZ1bmMgfSBmcm9tICcuL0xlcnBzJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8VD4ge1xyXG5cdHRpbWU6IG51bWJlcjtcclxuXHR2YWx1ZTogVDtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPFQ+IHtcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XHJcblx0dmFsdWU6IFQ7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JBZGRQYXJhbXM8VD4ge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGN1c3RvbUxlcnA/OiBMZXJwRnVuYzxUPixcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUFuaW1hdG9yIHtcclxuXHJcblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbbmFtZTogc3RyaW5nXTogVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPGFueT4gfSA9IHt9O1xyXG5cdHByb3RlY3RlZCB0aW1lOiBudW1iZXI7XHJcblx0cHVibGljIGRlZmF1bHRFYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkPFQgZXh0ZW5kcyBBbmltYXRvclZhcmlhYmxlVHlwZT4oIHBhcmFtczogVGltZWxpbmVBbmltYXRvckFkZFBhcmFtczxUPiApIHtcclxuXHJcblx0XHRpZiAoIHBhcmFtcy5rZXlmcmFtZXMubGVuZ3RoID09IDAgKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBwYXJhbXMubmFtZSArICdcIicsICdLZXlmcmFtZSBsZW5ndGggaXMgMCEhJyApO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHtcclxuXHRcdFx0a2V5ZnJhbWVzOiBwYXJhbXMua2V5ZnJhbWVzLFxyXG5cdFx0XHRsZXJwRnVuYzogcGFyYW1zLmN1c3RvbUxlcnAsXHJcblx0XHRcdGVhc2luZzogcGFyYW1zLmVhc2luZyxcclxuXHRcdFx0dmFsdWU6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ua2V5ZnJhbWVzLnNvcnQoICggYSwgYiApID0+IHtcclxuXHJcblx0XHRcdHJldHVybiAoIGEudGltZSA8IGIudGltZSApID8gLSAxIDogMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ubGVycEZ1bmMgPSBMZXJwcy5nZXRMZXJwRnVuYyggcGFyYW1zLmtleWZyYW1lc1sgMCBdLnZhbHVlICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHRcdHJldHVybiBwYXJhbXMubmFtZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0PFQ+KCBuYW1lOiBzdHJpbmcgKTogVCB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdLnZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUPiggbmFtZTogc3RyaW5nICk6IFRpbWVsaW5lQW5pbWF0b3JWYXJpYWJsZTxUPiB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIHRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSB0aW1lO1xyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjKCkge1xyXG5cclxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgdmFsaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sga2V5c1sgaSBdIF07XHJcblx0XHRcdGxldCBrZnMgPSB2YWxpYWJsZS5rZXlmcmFtZXM7XHJcblxyXG5cdFx0XHRsZXQgYTogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHRcdFx0bGV0IGI6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdFx0XHRsZXQgdCA9IE1hdGgubWF4KCBrZnNbIDAgXS50aW1lLCBNYXRoLm1pbigga2ZzWyBrZnMubGVuZ3RoIC0gMSBdLnRpbWUsIHRoaXMudGltZSApICk7XHJcblxyXG5cdFx0XHRsZXQgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoIGtmcy5sZW5ndGggPT0gMSApIHtcclxuXHJcblx0XHRcdFx0dCA9IGtmc1sgMCBdLnRpbWU7XHJcblx0XHRcdFx0YSA9IGIgPSBrZnNbIDAgXTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cclxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZnMubGVuZ3RoIC0gMTsgaiArKyApIHtcclxuXHJcblx0XHRcdFx0XHRhID0ga2ZzWyBqIF07XHJcblx0XHRcdFx0XHRiID0ga2ZzWyBqICsgMSBdO1xyXG5cclxuXHRcdFx0XHRcdGVhc2luZyA9IGEuZWFzaW5nO1xyXG5cclxuXHRcdFx0XHRcdGlmICggYS50aW1lIDw9IHQgJiYgdCA8PSBiLnRpbWUgKSBicmVhaztcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dCA9ICggdCAtIGEudGltZSApIC8gKCBiLnRpbWUgLSBhLnRpbWUgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBlYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSBlYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHZhbGlhYmxlLmVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IHZhbGlhYmxlLmVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICggdGhpcy5kZWZhdWx0RWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gdGhpcy5kZWZhdWx0RWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHZhbGlhYmxlLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsaWFibGUudmFsdWUgPSB2YWxpYWJsZS5sZXJwRnVuYyggYS52YWx1ZSwgYi52YWx1ZSwgdCApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRpZiAoIHZhbGlhYmxlLnZhbHVlID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyggJ2Vycm9yIGF0ICcgKyAnXCInICsga2V5c1sgaSBdICsgJ1wiJyApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBrZXlzWyBpIF0gKyAnXCInLCAnbGVycCBmdW5jdGlvbiBpcyBub3Qgc2V0LicgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5pZm9ybXN7IFsga2V5OiBzdHJpbmcgXSA6IFRIUkVFLklVbmlmb3JtIH1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVW5pZm9ybXNMaWIge1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbWVyZ2VVbmlmb3JtcyggLi4udW5pZm9ybXM6ICggVW5pZm9ybXN8dW5kZWZpbmVkIClbXSApIDogVW5pZm9ybXMge1xyXG5cclxuXHRcdGxldCByZXMgPSB7fTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHVuaWZvcm1zWyBpIF0gIT0gdW5kZWZpbmVkICkge1xyXG5cclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXMsIHVuaWZvcm1zWyBpIF0gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdE1hbiBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdvSG9tZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2dvaG9tZScgfSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB3YWl0KCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IG9uR29Ib21lID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblxyXG5cdFx0XHR9LCB0aW1lICogMTAwMC4wICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyIHY1LjIuOSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwczovL29saS5tZS51ay9cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50IGluIGl0cyBzdG9yYWdlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBsaXN0ZW5lcnMgQXJyYXkgb2YgbGlzdGVuZXJzIHRvIHNlYXJjaCB0aHJvdWdoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCBtZXRob2QuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFsaWFzQ2xvc3VyZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2lsbCBpbml0aWFsaXNlIHRoZSBldmVudCBvYmplY3QgYW5kIGxpc3RlbmVyIGFycmF5cyBpZiByZXF1aXJlZC5cbiAgICAgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG4gICAgICogRWFjaCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0IHJlc3BvbnNlIGlzIGFuIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXXxPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJldHVybiBhIGNvbmNhdGVuYXRlZCBhcnJheSBvZiBhbGwgbWF0Y2hpbmcgZXZlbnRzIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RvciBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGV2ZW50c1tldnRdIHx8IChldmVudHNbZXZ0XSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGxpc3RlbmVycyBSYXcgbGlzdGVuZXIgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgcHJvdG8uZmxhdHRlbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGZsYXR0ZW5MaXN0ZW5lcnMobGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBmbGF0TGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsYXRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVyc0FzT2JqZWN0ID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgcmVzcG9uc2VbZXZ0XSA9IGxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCBsaXN0ZW5lciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lciAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZExpc3RlbmVyKGxpc3RlbmVyLmxpc3RlbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIWlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKHRydWUsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWRpdHMgbGlzdGVuZXJzIGluIGJ1bGsuIFRoZSBhZGRMaXN0ZW5lcnMgYW5kIHJlbW92ZUxpc3RlbmVycyBtZXRob2RzIGJvdGggdXNlIHRoaXMgdG8gZG8gdGhlaXIgam9iLiBZb3Ugc2hvdWxkIHJlYWxseSB1c2UgdGhvc2UgaW5zdGVhZCwgdGhpcyBpcyBhIGxpdHRsZSBsb3dlciBsZXZlbC5cbiAgICAgKiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCAodHJ1ZSkgb3IgYWRkZWQgKGZhbHNlKS5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC9yZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hbmlwdWxhdGUgdGhlIGxpc3RlbmVycyBvZiBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG4gICAgICAgIHZhciBtdWx0aXBsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXJzIDogdGhpcy5hZGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgLy8gSWYgZXZ0IGlzIGFuIG9iamVjdCB0aGVuIHBhc3MgZWFjaCBvZiBpdHMgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAodmFsdWUgPSBldnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU28gZXZ0IG11c3QgYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIC8vIEFuZCBsaXN0ZW5lcnMgbXVzdCBiZSBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBpdCBhbmQgcGFzcyBlYWNoIG9uZSB0byB0aGUgbXVsdGlwbGUgbWV0aG9kXG4gICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBbZXZ0XSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuIFdpbGwgcmVtb3ZlIGZyb20gZXZlcnkgZXZlbnQgaWYgbm90IHBhc3NlZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBldnQ7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZW1vdmUgZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIGV2dFxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2dF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBtYXRjaGluZyB0aGUgcmVnZXguXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVFdmVudC5cbiAgICAgKlxuICAgICAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlQWxsTGlzdGVuZXJzID0gYWxpYXMoJ3JlbW92ZUV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyc01hcCA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVyc01hcCkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzTWFwW2tleV0uc2xpY2UoMCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgfHwge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tICcuL2NvcmUvQmFzZUxheWVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL0NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbidcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cCdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmFja2dyb3VuZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmxlbmRlckNvbm5lY3Rvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9pbnRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRE9NTWVzaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRWFzaW5ncyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRXZlbnREaXNwYXRjaGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL01vdXNlUm90YXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9zdFByb2Nlc3NpbmcnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BhZ2VTY3JvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUGFnZVNjcm9sbGVyL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0xheW91dENvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1RpbWVsaW5lQW5pbWF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1VuaWZvcm1zJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9MZXJwcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvV2FpdE1hbic7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
