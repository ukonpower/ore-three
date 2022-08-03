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
        this._isAnimating = false;
        this.animatingCount = 0;
        this.dispatchEvents = [];
        this.variables = {};
    }
    get isAnimating() {
        return this._isAnimating;
    }
    add(params) {
        let lerpFunc = params.customLerpFunc || _Lerps__WEBPACK_IMPORTED_MODULE_2__.Lerps.getLerpFunc(params.initValue);
        let variable = {
            time: -1,
            value: params.initValue,
            startValue: params.initValue,
            goalValue: null,
            easing: params.easing || _Easings__WEBPACK_IMPORTED_MODULE_1__.Easings.sigmoid(),
            lerpFunc: lerpFunc,
        };
        this.variables[params.name] = variable;
        return variable;
    }
    setEasing(name, easing) {
        let variable = this.variables[name];
        if (variable) {
            variable.easing = easing;
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
        }
    }
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
                    this._isAnimating = true;
                    this.animatingCount++;
                }
                variable.time = 0;
                variable.duration = duration;
                variable.startValue = variable.value;
                variable.goalValue = goalValue;
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
    setValue(name, value) {
        if (this.variables[name]) {
            this.variables[name].value = value;
            this.cancelAnimate(name);
        }
        else {
            console.warn('"' + name + '"' + ' is not exist');
            return null;
        }
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
    applyToUniforms(uniforms) {
        let keys = Object.keys(this.variables);
        for (let i = 0; i < keys.length; i++) {
            let variable = this.getVariableObject(keys[i]);
            if (variable) {
                uniforms[keys[i]] = variable;
            }
        }
    }
    update(deltaTime) {
        if (this.animatingCount == 0) {
            this._isAnimating = false;
        }
        let keys = Object.keys(this.variables);
        for (let i = 0; i < keys.length; i++) {
            let variable = this.variables[keys[i]];
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
                if (lerpFunc) {
                    variable.value = lerpFunc(variable.startValue, variable.goalValue, easing(time));
                }
                if (time == 1.0) {
                    variable.value = variable.goalValue;
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
        this.dispatchEvent({
            type: 'update',
            deltaTime: deltaTime
        });
        if (this._isAnimating) {
            this.dispatchEvent({
                type: 'animate',
                deltaTime: deltaTime
            });
        }
    }
    wait(t) {
        let prm = new Promise((r) => {
            setTimeout(() => {
                r();
            }, (t * 1000));
        });
        return prm;
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
        else if (value instanceof Array && typeof (value[0]) == 'number') {
            return Lerps.numberArray;
        }
        else if (value.isVector2 | value.isVector3 | value.isVector4 | value.isColor) {
            return Lerps.THREEVectors;
        }
        else if (value.isQuaternion) {
            return Lerps.THREEQuaternion;
        }
        else if (value.isEuler) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZUFBZSxNQUFNO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7O0FBRUE7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBMEM7QUFDbEQsUUFBUSxtQ0FBTztBQUNmO0FBQ0EsU0FBUztBQUFBLGtHQUFDO0FBQ1Y7QUFDQSxTQUFTLEVBS0o7QUFDTCxDQUFDLG9EQUFvRDs7Ozs7Ozs7Ozs7O0FDcmVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0M7QUFFRDtBQUNnQjtBQUNUO0FBQ0s7QUFDRztBQUNiO0FBQ007QUFDVDtBQUNBO0FBQ0E7QUFDUTtBQUNTO0FBQ1o7QUFDRTtBQUNGO0FBQ29CO0FBQ2hCO0FBQ0E7QUFDUjtBQUNIO0FBQ0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PUkUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CYWNrZ3JvdW5kL3NoYWRlcnMvYmFja2dyb3VuZC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRE9NTWVzaC9kb21NZXNoLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvc2hhZGVycy9wYXNzVGhyb3VnaC5mcyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL3NoYWRlcnMvcGFzc1Rocm91Z2gudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1Bvc3RQcm9jZXNzaW5nL3NoYWRlcnMvcGFzc1Rocm93LnZzIiwid2VicGFjazovL09SRS8uL3NyYy9jb3JlL0Jhc2VMYXllci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvY29yZS9Db250cm9sbGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlR3JvdXAudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVLZXlGcmFtZS50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JhY2tncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0Jlemllci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmxlbmRlckNvbm5lY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRE9NTWVzaC9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRWFzaW5ncy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRXZlbnREaXNwYXRjaGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0xheW91dENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0xlcnBzLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Nb3VzZVJvdGF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BhZ2VTY3JvbGxlci9QYWdlU2Nyb2xsZXJTZWN0aW9uLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9QYWdlU2Nyb2xsZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BvaW50ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1Bvc3RQcm9jZXNzaW5nL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9UaW1lbGluZUFuaW1hdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Vbmlmb3Jtcy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvV2FpdE1hbi50cyIsIndlYnBhY2s6Ly9PUkUvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dvbGZ5ODctZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9PUkUvZXh0ZXJuYWwgdW1kIHtcImNvbW1vbmpzXCI6XCJ0aHJlZVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZVwiLFwiYW1kXCI6XCJ0aHJlZVwiLFwicm9vdFwiOlwiVEhSRUVcIn0iLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09SRS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ0aHJlZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJPUkVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiT1JFXCJdID0gZmFjdG9yeShyb290W1wiVEhSRUVcIl0pO1xufSkodGhpcywgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdGhyZWVfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZhcnlpbmcgdmVjNCB2Q29sb3I7XFxuXFxudm9pZCBtYWluKCB2b2lkICkge1xcbiAgICBcXG4gICAgdmVjMyBwb3MgPSBwb3NpdGlvbjtcXG5cXG4gICAgcG9zLnogPSAxLjA7XFxuICAgIFxcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvcywgMS4wICk7XFxuICAgIFxcbiAgICB2VXYgPSB1djtcXG4gICAgdkNvbG9yID0gdmVjNCggMS4wICk7XFxuXFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnVuaWZvcm0gdmVjMiBkb21Qb3M7XFxudW5pZm9ybSB2ZWMyIGRvbVNpemU7XFxudW5pZm9ybSB2ZWMyIHdpbmRvd1NpemU7XFxudW5pZm9ybSBmbG9hdCBhc3BlY3RSYXRpbztcXG5cXG52b2lkIG1haW4oICApXFxue1xcbiAgZmxvYXQgd2lkdGggPSBkb21TaXplLnggLyB3aW5kb3dTaXplLng7XFxuXFxuICAvL+W3puS4iiggMCwwICnjgatcXG4gIHZlYzMgcG9zID0gcG9zaXRpb24gKyB2ZWMzKCAxLjAsLTEuMCwwLjAgKTtcXG5cXG4gIC8vc2l6ZVxcbiAgcG9zLnggKj0gd2lkdGg7XFxuICBwb3MueSAqPSAoIHdpZHRoICogYXNwZWN0UmF0aW8gKSAqICggZG9tU2l6ZS55IC8gZG9tU2l6ZS54ICk7XFxuXFxuICBwb3MgKz0gdmVjMyggLTEuMCwgMS4wLCAwLjAgKTtcXG5cXG4gIHBvcyArPSB2ZWMzKCBkb21Qb3MueCAvIHdpbmRvd1NpemUueCAqIDIuMCwgLWRvbVBvcy55IC8gd2luZG93U2l6ZS55ICogMi4wLCAwLjAgKTtcXG5cXG4gIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zLCAxLjAgKTtcXG4gIHZVdiA9IHV2O1xcbn1cXG5cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudW5pZm9ybSBzYW1wbGVyMkQgdGV4O1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodGV4LHZVdik7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XFxuICAgIHZVdiA9IHV2O1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG52b2lkIG1haW4oKSB7XFxuICAgIHZVdiA9IHV2O1xcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXG59ICAgXCI7IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gJy4uL3V0aWxzL1VuaWZvcm1zJztcbmltcG9ydCB7IFBvaW50ZXJFdmVudEFyZ3MgfSBmcm9tICcuL0NvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJCaW5kUGFyYW0gZXh0ZW5kcyBUSFJFRS5XZWJHTFJlbmRlcmVyUGFyYW1ldGVycyB7XG5cdG5hbWU6IHN0cmluZztcblx0Y2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnQ7XG5cdGFzcGVjdFNldHRpbmc/OiBBc3BlY3RTZXR0aW5nO1xuXHR3cmFwcGVyRWxlbWVudD86IEhUTUxFbGVtZW50IHwgbnVsbDtcblx0d3JhcHBlckVsZW1lbnRSZWN0PzogRE9NUmVjdCB8IG51bGw7XG5cdHBpeGVsUmF0aW8/OiBudW1iZXJcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVySW5mbyBleHRlbmRzIExheWVyQmluZFBhcmFtIHtcblx0c2l6ZTogTGF5ZXJTaXplO1xuXHRhc3BlY3RTZXR0aW5nOiBBc3BlY3RTZXR0aW5nO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJTaXplIHtcblx0Y2FudmFzQXNwZWN0UmF0aW86IG51bWJlcjtcblx0d2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0d2luZG93QXNwZWN0UmF0aW86IG51bWJlcjtcblx0Y2FudmFzU2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0Y2FudmFzUGl4ZWxTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRwaXhlbFJhdGlvOiBudW1iZXJcblx0cG9ydHJhaXRXZWlnaHQ6IG51bWJlcjtcblx0d2lkZVdlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQXNwZWN0U2V0dGluZyB7XG5cdG1haW5Bc3BlY3Q6IG51bWJlcjtcblx0cG9ydHJhaXRBc3BlY3Q6IG51bWJlcjtcblx0d2lkZUFzcGVjdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVG91Y2hFdmVudEFyZ3Mge1xuXHRldmVudDogUG9pbnRlckV2ZW50IHwgVG91Y2hFdmVudDtcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xuXHRzY3JlZW5Qb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0d2luZG93UG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNlTGF5ZXIgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBpbmZvOiBMYXllckluZm87XG5cblx0cHVibGljIHJlbmRlcmVyPzogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblxuXHRwdWJsaWMgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwdWJsaWMgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgcmVhZHlBbmltYXRlID0gZmFsc2U7XG5cdHB1YmxpYyB0aW1lID0gMDtcblx0cHVibGljIGNvbW1vblVuaWZvcm1zOiBVbmlmb3JtcztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmluZm8gPSB7XG5cdFx0XHRuYW1lOiAnJyxcblx0XHRcdGFzcGVjdFNldHRpbmc6IHtcblx0XHRcdFx0bWFpbkFzcGVjdDogMTYgLyA5LFxuXHRcdFx0XHR3aWRlQXNwZWN0OiAxMCAvIDEsXG5cdFx0XHRcdHBvcnRyYWl0QXNwZWN0OiAxIC8gMixcblx0XHRcdH0sXG5cdFx0XHRzaXplOiB7XG5cdFx0XHRcdHdpbmRvd1NpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdHdpbmRvd0FzcGVjdFJhdGlvOiAxLjAsXG5cdFx0XHRcdGNhbnZhc1NpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdGNhbnZhc1BpeGVsU2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0Y2FudmFzQXNwZWN0UmF0aW86IDEuMCxcblx0XHRcdFx0cGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cdFx0XHRcdHBvcnRyYWl0V2VpZ2h0OiAwLjAsXG5cdFx0XHRcdHdpZGVXZWlnaHQ6IDAuMFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLmNvbW1vblVuaWZvcm1zID0ge1xuXHRcdFx0dGltZToge1xuXHRcdFx0XHR2YWx1ZTogMFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDUwLCAxLCAwLjEsIDEwMDAgKTtcblxuXHR9XG5cblx0cHVibGljIHRpY2soIGRlbHRhVGltZTogbnVtYmVyICkge1xuXG5cdFx0dGhpcy50aW1lICs9IGRlbHRhVGltZTtcblxuXHRcdHRoaXMuY29tbW9uVW5pZm9ybXMudGltZS52YWx1ZSA9IHRoaXMudGltZTtcblxuXHRcdGlmICggdGhpcy5yZWFkeUFuaW1hdGUgKSB7XG5cblx0XHRcdHRoaXMuYW5pbWF0ZSggZGVsdGFUaW1lICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBhbmltYXRlKCBkZWx0YVRpbWU6IG51bWJlciApIHsgfVxuXG5cdHB1YmxpYyBvbkJpbmQoIGxheWVySW5mbzogTGF5ZXJCaW5kUGFyYW0gKSB7XG5cblx0XHR0aGlzLmluZm8ubmFtZSA9IGxheWVySW5mby5uYW1lO1xuXHRcdHRoaXMuaW5mby5jYW52YXMgPSBsYXllckluZm8uY2FudmFzO1xuXG5cdFx0aWYgKCBsYXllckluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuc2V0V3JhcHBlckVsZW1lbnQoIGxheWVySW5mby53cmFwcGVyRWxlbWVudCB8fCBudWxsLCBmYWxzZSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5pbmZvLmFzcGVjdFNldHRpbmcgPSBsYXllckluZm8uYXNwZWN0U2V0dGluZyB8fCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZztcblx0XHR0aGlzLmluZm8uYWxwaGEgPSBsYXllckluZm8uYWxwaGE7XG5cdFx0dGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyA9IGxheWVySW5mby5waXhlbFJhdGlvIHx8IHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW87XG5cblx0XHR0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoIHRoaXMuaW5mbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbmZvLmNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcblxuXHRcdHNldFRpbWVvdXQoICgpID0+IHtcblxuXHRcdFx0dGhpcy5vblJlc2l6ZSgpO1xuXHRcdFx0dGhpcy5yZWFkeUFuaW1hdGUgPSB0cnVlO1xuXG5cdFx0fSwgMCApO1xuXG5cdH1cblxuXHRwdWJsaWMgb25VbmJpbmQoKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICdkaXNwb3NlJ1xuXHRcdH0gKTtcblxuXHRcdHRoaXMucmVtb3ZlQ2hpbGRyZW5zKCB0aGlzLnNjZW5lICk7XG5cblx0XHR0aGlzLnJlYWR5QW5pbWF0ZSA9IGZhbHNlO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVtb3ZlQ2hpbGRyZW5zKCBvYmplY3Q6IFRIUkVFLk9iamVjdDNEICkge1xuXG5cdFx0Y29uc3QgbGVuZ3RoID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDtcblxuXHRcdGZvciAoIGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC0tICkge1xuXG5cdFx0XHR0aGlzLnJlbW92ZUNoaWxkcmVucyggb2JqZWN0LmNoaWxkcmVuWyBpIF0gKTtcblxuXHRcdFx0bGV0IGdlbzogVEhSRUUuQnVmZmVyR2VvbWV0cnkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgbWF0OiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5pc01lc2ggKSB7XG5cblx0XHRcdFx0Z2VvID0gKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkuZ2VvbWV0cnk7XG5cdFx0XHRcdG1hdCA9ICggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRvYmplY3QucmVtb3ZlKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdICkgKTtcblxuXHRcdFx0aWYgKCBnZW8gKSB7XG5cblx0XHRcdFx0Z2VvLmRpc3Bvc2UoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG1hdCApIHtcblxuXHRcdFx0XHRtYXQuZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRXcmFwcGVyRWxlbWVudCggd3JhcHBlckVsbTogSFRNTEVsZW1lbnQgfCBudWxsLCBkaXNwYXRjaFJlc2l6ZTogYm9vbGVhbiA9IHRydWUgKSB7XG5cblx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxtO1xuXHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudFJlY3QgPSB3cmFwcGVyRWxtID8gd3JhcHBlckVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IG51bGw7XG5cblx0XHRpZiAoIGRpc3BhdGNoUmVzaXplICkge1xuXG5cdFx0XHR0aGlzLm9uUmVzaXplKCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBvblJlc2l6ZSgpIHtcblxuXHRcdGlmICggdGhpcy5yZW5kZXJlciA9PSBudWxsICkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgbmV3V2luZG93U2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcblx0XHRjb25zdCBuZXdDYW52YXNTaXplID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHRuZXdDYW52YXNTaXplLnNldCggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRuZXdDYW52YXNTaXplLmNvcHkoIG5ld1dpbmRvd1NpemUgKTtcblxuXHRcdH1cblxuXHRcdGxldCBwb3J0cmFpdFdlaWdodCA9IDEuMCAtICggKCBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnkgKSAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLnBvcnRyYWl0QXNwZWN0ICkgLyAoIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLm1haW5Bc3BlY3QgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5wb3J0cmFpdEFzcGVjdCApO1xuXHRcdHBvcnRyYWl0V2VpZ2h0ID0gTWF0aC5taW4oIDEuMCwgTWF0aC5tYXgoIDAuMCwgcG9ydHJhaXRXZWlnaHQgKSApO1xuXG5cdFx0bGV0IHdpZGVXZWlnaHQgPSAxLjAgLSAoICggbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55ICkgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy53aWRlQXNwZWN0ICkgLyAoIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLm1haW5Bc3BlY3QgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy53aWRlQXNwZWN0ICk7XG5cdFx0d2lkZVdlaWdodCA9IE1hdGgubWluKCAxLjAsIE1hdGgubWF4KCAwLjAsIHdpZGVXZWlnaHQgKSApO1xuXG5cdFx0dGhpcy5pbmZvLnNpemUud2luZG93U2l6ZS5jb3B5KCBuZXdXaW5kb3dTaXplICk7XG5cdFx0dGhpcy5pbmZvLnNpemUud2luZG93QXNwZWN0UmF0aW8gPSBuZXdXaW5kb3dTaXplLnggLyBuZXdXaW5kb3dTaXplLnk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS5jb3B5KCBuZXdDYW52YXNTaXplICk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzUGl4ZWxTaXplLmNvcHkoIG5ld0NhbnZhc1NpemUuY2xvbmUoKS5tdWx0aXBseVNjYWxhciggdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCkgKSApO1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc0FzcGVjdFJhdGlvID0gbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55O1xuXHRcdHRoaXMuaW5mby5zaXplLnBvcnRyYWl0V2VpZ2h0ID0gcG9ydHJhaXRXZWlnaHQ7XG5cdFx0dGhpcy5pbmZvLnNpemUud2lkZVdlaWdodCA9IHdpZGVXZWlnaHQ7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUoIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUueCwgdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS55ICk7XG5cdFx0dGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5pbmZvLnNpemUuY2FudmFzQXNwZWN0UmF0aW87XG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudFJlY3QgPSB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBwb2ludGVyRXZlbnQoIGU6IFBvaW50ZXJFdmVudEFyZ3MgKSB7XG5cblx0XHRjb25zdCBjYW52YXNQb2ludGVyUG9zID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRjYW52YXNQb2ludGVyUG9zLmNvcHkoIGUucG9zaXRpb24gKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLmNhbnZhcyApIHtcblxuXHRcdFx0Y29uc3QgY2FudmFzUmVjdCA9IHRoaXMuaW5mby5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjYW52YXNQb2ludGVyUG9zLnN1YiggbmV3IFRIUkVFLlZlY3RvcjIoIGNhbnZhc1JlY3QueCwgY2FudmFzUmVjdC55ICkgKTtcblxuXHRcdH1cblxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gY2FudmFzUG9pbnRlclBvcy5jbG9uZSgpO1xuXHRcdHNjcmVlblBvc2l0aW9uLmRpdmlkZSggdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZSApO1xuXHRcdHNjcmVlblBvc2l0aW9uLnkgPSAxLjAgLSBzY3JlZW5Qb3NpdGlvbi55O1xuXHRcdHNjcmVlblBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKCAyLjAgKS5zdWJTY2FsYXIoIDEuMCApO1xuXG5cblx0XHRjb25zdCBhcmdzOiBUb3VjaEV2ZW50QXJncyA9IHtcblx0XHRcdGV2ZW50OiBlLnBvaW50ZXJFdmVudCxcblx0XHRcdHBvc2l0aW9uOiBjYW52YXNQb2ludGVyUG9zLmNsb25lKCksXG5cdFx0XHRkZWx0YTogZS5kZWx0YS5jbG9uZSgpLFxuXHRcdFx0c2NyZWVuUG9zaXRpb246IHNjcmVlblBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHR3aW5kb3dQb3NpdGlvbjogZS5wb3NpdGlvbi5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdob3ZlcicgKSB7XG5cblx0XHRcdHRoaXMub25Ib3ZlciggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdzdGFydCcgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaFN0YXJ0KCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ21vdmUnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hNb3ZlKCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ2VuZCcgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaEVuZCggYXJncyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgb25Ub3VjaFN0YXJ0KCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvblRvdWNoTW92ZSggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ub3VjaEVuZCggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ib3ZlciggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25XaGVlbCggZXZlbnQ6IFdoZWVsRXZlbnQsIHRyYWNrcGFkRGVsdGE6IG51bWJlciApIHsgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBQb2ludGVyIH0gZnJvbSAnLi4vdXRpbHMvUG9pbnRlcic7XG5pbXBvcnQgeyBCYXNlTGF5ZXIsIExheWVyQmluZFBhcmFtIH0gZnJvbSAnLi9CYXNlTGF5ZXInO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUG9pbnRlckV2ZW50QXJncyB7XG5cdHBvaW50ZXJFdmVudDogUG9pbnRlckV2ZW50O1xuXHRwb2ludGVyRXZlbnRUeXBlOiBzdHJpbmc7XG5cdHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRkZWx0YTogVEhSRUUuVmVjdG9yMjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIENvbnRyb2xsZXJQYXJhbSB7XG5cdHNpbGVudD86IGJvb2xlYW47XG5cdHBvaW50ZXJFdmVudEVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBwb2ludGVyOiBQb2ludGVyO1xuXHRwdWJsaWMgY2xvY2s6IFRIUkVFLkNsb2NrO1xuXG5cdHByb3RlY3RlZCBsYXllcnM6IEJhc2VMYXllcltdID0gW107XG5cdHByb3RlY3RlZCBwb2ludGVyRXZlbnRFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoIHBhcmFtZXRlcj86IENvbnRyb2xsZXJQYXJhbSApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAoICEgKCBwYXJhbWV0ZXIgJiYgcGFyYW1ldGVyLnNpbGVudCApICkge1xuXG5cdFx0XHRjb25zb2xlLmxvZyggXCIlYy0gb3JlLXRocmVlIFwiICsgcmVxdWlyZSggXCIuLi8uLi9wYWNrYWdlLmpzb25cIiApLnZlcnNpb24gKyBcIiAtXCIgLCAncGFkZGluZzogNXB4IDEwcHggO2JhY2tncm91bmQtY29sb3I6IGJsYWNrOyBjb2xvcjogd2hpdGU7Zm9udC1zaXplOjExcHgnICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFBvaW50ZXJcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucG9pbnRlciA9IG5ldyBQb2ludGVyKCk7XG5cdFx0dGhpcy5zZXRQb2ludGVyRXZlbnRFbGVtZW50KCAoIHBhcmFtZXRlciAmJiBwYXJhbWV0ZXIucG9pbnRlckV2ZW50RWxlbWVudCApIHx8IGRvY3VtZW50LmJvZHkgKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0RXZlbnRzXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcG9pbnRlclVwZGF0ZSA9IHRoaXMucG9pbnRlckV2ZW50LmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgcG9pbnRlcldoZWVsID0gdGhpcy5vbldoZWVsLmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgb3JpZW50YXRpb25jaGFuZ2UgPSB0aGlzLm9uT3JpZW50YXRpb25EZXZpY2UuYmluZCggdGhpcyApO1xuXHRcdGxldCB3aW5kb3dSZXNpemUgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKTtcblxuXHRcdHRoaXMucG9pbnRlci5hZGRFdmVudExpc3RlbmVyKCAndXBkYXRlJywgcG9pbnRlclVwZGF0ZSApO1xuXHRcdHRoaXMucG9pbnRlci5hZGRFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBwb2ludGVyV2hlZWwgKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25jaGFuZ2UgKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSApO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZGlzcG9zZScsICgpID0+IHtcblxuXHRcdFx0dGhpcy5wb2ludGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd1cGRhdGUnLCBwb2ludGVyVXBkYXRlICk7XG5cdFx0XHR0aGlzLnBvaW50ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3doZWVsJywgcG9pbnRlcldoZWVsICk7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25jaGFuZ2UgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgd2luZG93UmVzaXplICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLnRpY2soKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHRpY2soKSB7XG5cblx0XHRjb25zdCBkZWx0YVRpbWUgPSB0aGlzLmNsb2NrLmdldERlbHRhKCk7XG5cblx0XHR0aGlzLnBvaW50ZXIudXBkYXRlKCk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0udGljayggZGVsdGFUaW1lICk7XG5cblx0XHR9XG5cblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMudGljay5iaW5kKCB0aGlzICkgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uV2luZG93UmVzaXplKCkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLm9uUmVzaXplKCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbk9yaWVudGF0aW9uRGV2aWNlKCkge1xuXG5cdFx0dGhpcy5vbldpbmRvd1Jlc2l6ZSgpO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgcG9pbnRlckV2ZW50KCBlOiBUSFJFRS5FdmVudCApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5wb2ludGVyRXZlbnQoIGUgYXMgdW5rbm93biBhcyBQb2ludGVyRXZlbnRBcmdzICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbldoZWVsKCBlOiBUSFJFRS5FdmVudCApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5vbldoZWVsKCBlLndoZWVsRXZlbnQsIGUudHJhY2twYWREZWx0YSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRBUElcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFkZExheWVyKCBsYXllcjogQmFzZUxheWVyLCBsYXllckluZm86IExheWVyQmluZFBhcmFtICkge1xuXG5cdFx0d2hpbGUgKCB0aGlzLmdldExheWVyKCBsYXllckluZm8ubmFtZSApICkge1xuXG5cdFx0XHRsYXllckluZm8ubmFtZSArPSAnXyc7XG5cblx0XHR9XG5cblx0XHR0aGlzLmxheWVycy5wdXNoKCBsYXllciApO1xuXG5cdFx0bGF5ZXIub25CaW5kKCBsYXllckluZm8gKTtcblxuXHR9XG5cblx0cHVibGljIGdldExheWVyKCBsYXllck5hbWU6IHN0cmluZyApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmxheWVyc1sgaSBdLmluZm8ubmFtZSA9PSBsYXllck5hbWUgKSByZXR1cm4gdGhpcy5sYXllcnNbIGkgXTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlTGF5ZXIoIGxheWVyTm1hZTogc3RyaW5nICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSB0aGlzLmxheWVycy5sZW5ndGggLSAxOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdGNvbnN0IGxheWVyID0gdGhpcy5sYXllcnNbIGkgXTtcblxuXHRcdFx0aWYgKCBsYXllci5pbmZvLm5hbWUgPT0gbGF5ZXJObWFlICkge1xuXG5cdFx0XHRcdGxheWVyLm9uVW5iaW5kKCk7XG5cblx0XHRcdFx0dGhpcy5sYXllcnMuc3BsaWNlKCBpLCAxICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFBvaW50ZXJFdmVudEVsZW1lbnQoIGVsbTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHRpZiAoIHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5wb2ludGVyLnVucmVnaXN0ZXJFbGVtZW50KCB0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMucG9pbnRlci5yZWdpc3RlckVsZW1lbnQoIGVsbSApO1xuXG5cdFx0dGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ID0gZWxtO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goIGl0ZW0gPT4ge1xuXG5cdFx0XHR0aGlzLnJlbW92ZUxheWVyKCBpdGVtLmluZm8ubmFtZSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy50aWNrID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gJy4uL1VuaWZvcm1zJztcclxuaW1wb3J0IHsgRkN1cnZlR3JvdXAgfSBmcm9tICcuL0ZDdXJ2ZUdyb3VwJztcclxuXHJcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbkZyYW1lSW5mbyA9IHtcclxuXHRzdGFydDogbnVtYmVyXHJcblx0ZW5kOiBudW1iZXJcclxuXHRkdXJhdGlvbjogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25BY3Rpb24gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJ2ZXM6IHtba2V5OnN0cmluZ106RkN1cnZlR3JvdXB9ID0ge307XHJcblx0cHJpdmF0ZSB1bmlmb3JtczogVW5pZm9ybXM7XHJcblx0XHJcblx0cHVibGljIGZyYW1lOiBBbmltYXRpb25GcmFtZUluZm87XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBuYW1lPzogc3RyaW5nICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gbmFtZSB8fCAnJztcclxuXHRcdHRoaXMudW5pZm9ybXMgPSB7fTtcclxuXHJcblx0XHR0aGlzLmZyYW1lID0ge1xyXG5cdFx0XHRzdGFydDogMCxcclxuXHRcdFx0ZW5kOiAwLFxyXG5cdFx0XHRkdXJhdGlvbjogMCxcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZEZjdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZmN1cnZlR3JvdXA6IEZDdXJ2ZUdyb3VwICkge1xyXG5cclxuXHRcdHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXSA9IGZjdXJ2ZUdyb3VwO1xyXG5cclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbW92ZUZDdXJ2ZSggcHJvcGVydHlOYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXTtcclxuXHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNhbGNGcmFtZSgpIHtcclxuXHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmVzIClcclxuXHJcblx0XHRsZXQgbWluU3RhcnQgPSBJbmZpbml0eVxyXG5cdFx0bGV0IG1heEVuZCA9IC1JbmZpbml0eVxyXG5cdFx0XHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmUgPSAodGhpcy5jdXJ2ZXMpWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lU3RhcnQgPCBtaW5TdGFydCApIHtcclxuXHJcblx0XHRcdFx0bWluU3RhcnQgPSBjdXJ2ZS5mcmFtZVN0YXJ0O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVFbmQgPiBtYXhFbmQgKSB7XHJcblxyXG5cdFx0XHRcdG1heEVuZCA9IGN1cnZlLmZyYW1lRW5kO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBtaW5TdGFydCA9PSAtSW5maW5pdHkgfHwgbWF4RW5kID09IEluZmluaXR5KSB7XHJcblxyXG5cdFx0XHRtaW5TdGFydCA9IDA7XHJcblx0XHRcdG1heEVuZCA9IDFcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mcmFtZS5zdGFydCA9IG1pblN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZS5lbmQgPSBtYXhFbmQ7XHJcblx0XHR0aGlzLmZyYW1lLmR1cmF0aW9uID0gdGhpcy5mcmFtZS5lbmQgLSB0aGlzLmZyYW1lLnN0YXJ0O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRGQ3VydmVHcm91cCggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogRkN1cnZlR3JvdXAgfCBudWxsIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdIHx8IG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRnZXQgdmFsdWVzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHB1YmxpYyBhc3NpZ25Vbmlmb3JtcyggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHVuaWZvcm06IFRIUkVFLklVbmlmb3JtICkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdID0gdW5pZm9ybTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VW5pZm9ybXM8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IFRIUkVFLklVbmlmb3JtPFQ+IHwgbnVsbCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSApIHtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCBjdXJ2ZUdyb3VwID0gdGhpcy5nZXRGQ3VydmVHcm91cChwcm9wZXJ0eU5hbWUpXHJcblxyXG5cdFx0aWYoIGN1cnZlR3JvdXAgKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgdW5pID0ge1xyXG5cdFx0XHRcdHZhbHVlOiBjdXJ2ZUdyb3VwLmNyZWF0ZUluaXRWYWx1ZSgpIGFzIFRcclxuXHRcdFx0fTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdID0gdW5pO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHVuaTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IFQgfCBudWxsO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHRhcmdldDogVCApOiBUO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHRhcmdldD86IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyICk6IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0bGV0IHVuaWZvcm0gPSB0aGlzLmdldFVuaWZvcm1zKHByb3BlcnR5TmFtZSk7XHJcblxyXG5cdFx0aWYoICF1bmlmb3JtICkgcmV0dXJuIHRhcmdldCB8fCBudWxsO1xyXG5cclxuXHRcdGxldCB2YWx1ZSA9IHVuaWZvcm0udmFsdWU7XHJcblx0XHRcclxuXHRcdGlmKCAhdGFyZ2V0ICkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdGlmKCB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQueCA9IHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGFyZ2V0LnggPSB2YWx1ZS54O1xyXG5cdFx0dGFyZ2V0LnkgPSB2YWx1ZS55O1xyXG5cclxuXHRcdGlmKCAneicgaW4gdGFyZ2V0ICYmICd6JyBpbiB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRhcmdldC56ID0gdmFsdWUuelxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZiggJ3cnIGluIHRhcmdldCAmJiAndycgaW4gdmFsdWUgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQudyA9IHZhbHVlLndcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0YXJnZXQgfHwgbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWVBdDxUIGV4dGVuZHMgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIgKTogVCB8IG51bGw7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlQXQ8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyID4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ6IFQgKTogVDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWVBdCggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIsIHRhcmdldD86IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyICk6IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0bGV0IGN1cnZlID0gdGhpcy5nZXRGQ3VydmVHcm91cCggcHJvcGVydHlOYW1lICk7XHJcblxyXG5cdFx0aWYoIHRhcmdldCApICB7XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgcmV0dXJuIHRhcmdldDtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjdXJ2ZS5nZXRWYWx1ZSggZnJhbWUgfHwgMCwgdGFyZ2V0IClcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY3VydmUuZ2V0VmFsdWUoIGZyYW1lIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0VXBkYXRlRnJhbWVcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHRcclxuXHRwdWJsaWMgdXBkYXRlRnJhbWUoIGZyYW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlcyApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgZmN1cnZlR3JvdXAgPSB0aGlzLmN1cnZlc1sgY3VydmVLZXlzWyBpIF0gXTtcclxuXHRcdFx0bGV0IHVuaSA9IHRoaXMuZ2V0VW5pZm9ybXMoIGN1cnZlS2V5c1sgaSBdICk7XHJcblxyXG5cdFx0XHRpZiggIXVuaSApIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0aWYoIHR5cGVvZiB1bmkudmFsdWUgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHRcdHVuaS52YWx1ZSA9IGZjdXJ2ZUdyb3VwLmdldFZhbHVlKGZyYW1lKSB8fCAwXHJcblx0XHRcdFx0XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGZjdXJ2ZUdyb3VwLmdldFZhbHVlKGZyYW1lLCB1bmkudmFsdWUpXHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoJ3VwZGF0ZScsIFt0aGlzXSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBGQ3VydmVLZXlGcmFtZSB9IGZyb20gJy4vRkN1cnZlS2V5RnJhbWUnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlQXhpcyA9ICd4JyB8ICd5JyB8ICd6JyB8ICd3JyB8ICdzY2FsYXInXHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIGtleWZyYW1lczogRkN1cnZlS2V5RnJhbWVbXSA9IFtdO1xyXG5cclxuXHRwcml2YXRlIGNhY2hlOiB7IGZyYW1lOiBudW1iZXIsIHZhbHVlOiBudW1iZXIgfSA9IHsgZnJhbWU6IE5hTiwgdmFsdWU6IE5hTiB9O1xyXG5cclxuXHRwdWJsaWMgZnJhbWVTdGFydDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUR1cmF0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBmcmFtZXM/OiBGQ3VydmVLZXlGcmFtZVtdICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gMDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IDA7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0KCBmcmFtZXMgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0KCBmcmFtZXM/OiBGQ3VydmVLZXlGcmFtZVtdICkge1xyXG5cclxuXHRcdGlmICggZnJhbWVzICkge1xyXG5cclxuXHRcdFx0dGhpcy5rZXlmcmFtZXMubGVuZ3RoID0gMDtcclxuXHJcblx0XHRcdGZyYW1lcy5mb3JFYWNoKCBrZXlmcmFtZSA9PiB7XHJcblxyXG5cdFx0XHRcdHRoaXMuYWRkS2V5RnJhbWUoIGtleWZyYW1lICk7XHJcblxyXG5cdFx0XHR9ICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRLZXlGcmFtZSgga2V5ZnJhbWU6IEZDdXJ2ZUtleUZyYW1lICkge1xyXG5cclxuXHRcdGxldCBpbmRleCA9IDA7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5rZXlmcmFtZXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgXTtcclxuXHJcblx0XHRcdGlmICggZnJhbWUuY29vcmRpbmF0ZS54IDwga2V5ZnJhbWUuY29vcmRpbmF0ZS54ICkge1xyXG5cclxuXHRcdFx0XHRpbmRleCArKztcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmtleWZyYW1lcy5zcGxpY2UoIGluZGV4LCAwLCBrZXlmcmFtZSApO1xyXG5cclxuXHRcdC8vIHNldCBmcmFtZSBpbmZvXHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IHRoaXMua2V5ZnJhbWVzWzBdLmNvb3JkaW5hdGUueFxyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IHRoaXMua2V5ZnJhbWVzW3RoaXMua2V5ZnJhbWVzLmxlbmd0aCAtIDFdLmNvb3JkaW5hdGUueFxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggZnJhbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoIGZyYW1lID09IHRoaXMuY2FjaGUuZnJhbWUgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS52YWx1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZhbHVlOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmtleWZyYW1lcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQga2V5ZnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSBdO1xyXG5cclxuXHRcdFx0aWYgKCBmcmFtZSA8PSBrZXlmcmFtZS5jb29yZGluYXRlLnggKSB7XHJcblxyXG5cdFx0XHRcdGxldCBiZWZvcmVLZXlGcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIC0gMSBdO1xyXG5cclxuXHRcdFx0XHRpZiAoIGJlZm9yZUtleUZyYW1lICkge1xyXG5cclxuXHRcdFx0XHRcdHZhbHVlID0gYmVmb3JlS2V5RnJhbWUudG8oIGtleWZyYW1lLCBmcmFtZSApO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdHZhbHVlID0ga2V5ZnJhbWUuY29vcmRpbmF0ZS55O1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHZhbHVlID09PSBudWxsICYmIHRoaXMua2V5ZnJhbWVzLmxlbmd0aCA+IDAgKSB7XHJcblxyXG5cdFx0XHR2YWx1ZSA9IHRoaXMua2V5ZnJhbWVzWyB0aGlzLmtleWZyYW1lcy5sZW5ndGggLSAxIF0uY29vcmRpbmF0ZS55O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHZhbHVlICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0dGhpcy5jYWNoZSA9IHtcclxuXHRcdFx0XHRmcmFtZTogZnJhbWUsXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEZDdXJ2ZSwgRkN1cnZlQXhpcyB9IGZyb20gJy4vRkN1cnZlJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUdyb3VwVHlwZSA9ICdzY2FsYXInIHwgJ3ZlYzInIHwgJ3ZlYzMnIHwgJ3ZlYzQnXHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlR3JvdXAgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJ2ZToge1theGlzIGluIEZDdXJ2ZUF4aXNdOiBGQ3VydmUgfCBudWxsfTtcclxuXHRwdWJsaWMgdHlwZTogRkN1cnZlR3JvdXBUeXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRHVyYXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoIG5hbWU/OiBzdHJpbmcsIHg/OiBGQ3VydmUsIHk/OiBGQ3VydmUsIHo/OiBGQ3VydmUsIHc/OiBGQ3VydmUsIHNjYWxhcj86IEZDdXJ2ZSApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gMDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IDA7XHJcblx0XHRcclxuXHRcdHRoaXMuY3VydmUgPSB7XHJcblx0XHRcdHg6IG51bGwsXHJcblx0XHRcdHk6IG51bGwsXHJcblx0XHRcdHo6IG51bGwsXHJcblx0XHRcdHc6IG51bGwsXHJcblx0XHRcdHNjYWxhcjogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiggeCApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB4LCAneCcgKVxyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIHkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeSwgJ3knIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKCB6ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHosICd6JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCB3ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHcsICd3JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRGQ3VydmUoIGN1cnZlOiBGQ3VydmUsIGF4aXM6IEZDdXJ2ZUF4aXMgKSB7XHJcblxyXG5cdFx0dGhpcy5jdXJ2ZVsgYXhpcyBdID0gY3VydmU7XHJcblxyXG5cdFx0dGhpcy5jYWxjVHlwZSgpO1xyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2FsY1R5cGUoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmN1cnZlLnNjYWxhciApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuY3VydmUudyApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWM0JztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnogKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjMyc7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS55ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzInO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueCApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgY2FsY0ZyYW1lKCkge1xyXG5cdFx0XHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmUgKVxyXG5cclxuXHRcdGxldCBtaW5TdGFydCA9IEluZmluaXR5XHJcblx0XHRsZXQgbWF4RW5kID0gLUluZmluaXR5XHJcblx0XHRcclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZSA9ICh0aGlzLmN1cnZlIGFzIHtba2V5OiBzdHJpbmddOiBGQ3VydmV9KVsgY3VydmVLZXlzWyBpIF0gXTtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSBjb250aW51ZTtcclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZVN0YXJ0IDwgbWluU3RhcnQgKSB7XHJcblxyXG5cdFx0XHRcdG1pblN0YXJ0ID0gY3VydmUuZnJhbWVTdGFydDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lRW5kID4gbWF4RW5kICkge1xyXG5cclxuXHRcdFx0XHRtYXhFbmQgPSBjdXJ2ZS5mcmFtZUVuZDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiggbWluU3RhcnQgPT0gLUluZmluaXR5IHx8IG1heEVuZCA9PSBJbmZpbml0eSkge1xyXG5cclxuXHRcdFx0bWluU3RhcnQgPSAwO1xyXG5cdFx0XHRtYXhFbmQgPSAxXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IG1pblN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IG1heEVuZDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IHRoaXMuZnJhbWVFbmQgLSB0aGlzLmZyYW1lU3RhcnQ7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNyZWF0ZUluaXRWYWx1ZSgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudHlwZSA9PSAndmVjMicgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzMnICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy50eXBlID09ICd2ZWM0JyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yNCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyPiggZnJhbWU6IG51bWJlciwgdGFyZ2V0OiBUICk6IFQ7XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggZnJhbWU6IG51bWJlciApOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyPiggZnJhbWU6IG51bWJlciwgdGFyZ2V0PzogVCk6IFQgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRpZiggdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnggKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC54ID0gdGhpcy5jdXJ2ZS54LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnkgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC55ID0gdGhpcy5jdXJ2ZS55LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnogJiYgJ3onIGluIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnogPSB0aGlzLmN1cnZlLnouZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUudyAgJiYgJ3cnIGluIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LncgPSB0aGlzLmN1cnZlLncuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHRcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUuc2NhbGFyICkge1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gIHRoaXMuY3VydmUuc2NhbGFyLmdldFZhbHVlKCBmcmFtZSApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdFxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMsIEVhc2luZ3MgfSBmcm9tICcuLi9FYXNpbmdzJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUludGVycG9sYXRpb24gPSBcIkJFWklFUlwiIHwgXCJMSU5FQVJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmVLZXlGcmFtZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBjb29yZGluYXRlOiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGhhbmRsZUxlZnQ6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaGFuZGxlUmlnaHQ6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaW50ZXJwb2xhdGlvbjogRkN1cnZlSW50ZXJwb2xhdGlvbiA9ICdCRVpJRVInO1xyXG5cclxuXHRwcml2YXRlIGVhc2luZzogRWFzaW5nRnVuYyB8IG51bGwgPSBudWxsO1xyXG5cdHByaXZhdGUgbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggY29vcmRpbmF0ZTogVEhSRUUuVmVjMiwgaGFuZGxlTGVmdD86IFRIUkVFLlZlYzIsIGhhbmRsZVJpZ2h0PzogVEhSRUUuVmVjMiwgaW50ZXJwb2xhdGlvbj86IEZDdXJ2ZUludGVycG9sYXRpb24gKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLnNldCggY29vcmRpbmF0ZSwgaGFuZGxlTGVmdCwgaGFuZGxlUmlnaHQsIGludGVycG9sYXRpb24gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0KCBjb29yZGluYXRlOiBUSFJFRS5WZWMyLCBoYW5kbGVMZWZ0PzogVEhSRUUuVmVjMiwgaGFuZGxlUmlnaHQ/OiBUSFJFRS5WZWMyLCBpbnRlcnBvbGF0aW9uPzogRkN1cnZlSW50ZXJwb2xhdGlvbiApIHtcclxuXHJcblx0XHR0aGlzLmNvb3JkaW5hdGUgPSBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5oYW5kbGVMZWZ0ID0gaGFuZGxlTGVmdCB8fCBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5oYW5kbGVSaWdodCA9IGhhbmRsZVJpZ2h0IHx8IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmludGVycG9sYXRpb24gPSBpbnRlcnBvbGF0aW9uIHx8ICdCRVpJRVInO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0RWFzaW5nKCBpbnRlcnBvbGF0aW9uOiBGQ3VydmVJbnRlcnBvbGF0aW9uLCBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lICkge1xyXG5cclxuXHRcdGlmICggaW50ZXJwb2xhdGlvbiA9PSAnQkVaSUVSJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBFYXNpbmdzLmJlemllciggdGhpcy5jb29yZGluYXRlLCB0aGlzLmhhbmRsZVJpZ2h0LCBuZXh0RnJhbWUuaGFuZGxlTGVmdCwgbmV4dEZyYW1lLmNvb3JkaW5hdGUgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuICggdDogbnVtYmVyICkgPT4ge1xyXG5cclxuXHRcdFx0XHRsZXQgZCA9ICggbmV4dEZyYW1lLmNvb3JkaW5hdGUueSAtIHRoaXMuY29vcmRpbmF0ZS55ICk7XHJcblx0XHRcdFx0dCA9ICggdCAtIHRoaXMuY29vcmRpbmF0ZS54ICkgLyAoIG5leHRGcmFtZS5jb29yZGluYXRlLnggLSB0aGlzLmNvb3JkaW5hdGUueCApO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlLnkgKyB0ICogZDtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0byggbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSwgdDogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggdGhpcy5uZXh0RnJhbWUgPT0gbnVsbCB8fCB0aGlzLm5leHRGcmFtZS5jb29yZGluYXRlLnggIT0gbmV4dEZyYW1lLmNvb3JkaW5hdGUueCB8fCB0aGlzLm5leHRGcmFtZS5jb29yZGluYXRlLnkgIT0gbmV4dEZyYW1lLmNvb3JkaW5hdGUueSApIHtcclxuXHJcblx0XHRcdHRoaXMuZWFzaW5nID0gdGhpcy5nZXRFYXNpbmcoIHRoaXMuaW50ZXJwb2xhdGlvbiwgbmV4dEZyYW1lICk7XHJcblx0XHRcdHRoaXMubmV4dEZyYW1lID0gbmV4dEZyYW1lO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuZWFzaW5nICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuZWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBFYXNpbmdzLCBFYXNpbmdGdW5jIH0gZnJvbSBcIi4vRWFzaW5nc1wiO1xuaW1wb3J0IHsgTGVycEZ1bmMsIExlcnBzIH0gZnJvbSBcIi4vTGVycHNcIjtcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSBcIi4vVW5pZm9ybXNcIjtcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdG9yVmFyaWFibGU8VD57XG5cdHRpbWU6IG51bWJlcjtcblx0ZHVyYXRpb24/OiBudW1iZXI7XG5cdHZhbHVlOiBUO1xuXHRzdGFydFZhbHVlOiBUO1xuXHRnb2FsVmFsdWU6IFQ7XG5cdG9uQW5pbWF0aW9uRmluaXNoZWQ/OiBGdW5jdGlvbiB8IG51bGw7XG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdGVhc2luZzogRWFzaW5nRnVuYztcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdG9yVmFsaWFibGVQYXJhbXM8VD4ge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGluaXRWYWx1ZTogVDtcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcblx0Y3VzdG9tTGVycEZ1bmM/OiBMZXJwRnVuYzxUPjtcbn1cblxuZXhwb3J0IGNsYXNzIEFuaW1hdG9yIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcm90ZWN0ZWQgdmFyaWFibGVzOiB7IFsga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZTxhbnk+IH07XG5cdHByb3RlY3RlZCBfaXNBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJvdGVjdGVkIGFuaW1hdGluZ0NvdW50OiBudW1iZXIgPSAwO1xuXHRwcm90ZWN0ZWQgZGlzcGF0Y2hFdmVudHM6IEZ1bmN0aW9uW10gPSBbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnZhcmlhYmxlcyA9IHt9O1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IGlzQW5pbWF0aW5nKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX2lzQW5pbWF0aW5nO1xuXG5cdH1cblxuXHRwdWJsaWMgYWRkPFQ+KCBwYXJhbXM6IEFuaW1hdG9yVmFsaWFibGVQYXJhbXM8VD4gKSB7XG5cblx0XHRsZXQgbGVycEZ1bmMgPSBwYXJhbXMuY3VzdG9tTGVycEZ1bmMgfHwgTGVycHMuZ2V0TGVycEZ1bmMoIHBhcmFtcy5pbml0VmFsdWUgKTtcblxuXHRcdGxldCB2YXJpYWJsZSA9IHtcblx0XHRcdHRpbWU6IC0gMSxcblx0XHRcdHZhbHVlOiBwYXJhbXMuaW5pdFZhbHVlLFxuXHRcdFx0c3RhcnRWYWx1ZTogcGFyYW1zLmluaXRWYWx1ZSxcblx0XHRcdGdvYWxWYWx1ZTogbnVsbCxcblx0XHRcdGVhc2luZzogcGFyYW1zLmVhc2luZyB8fCBFYXNpbmdzLnNpZ21vaWQoKSxcblx0XHRcdGxlcnBGdW5jOiBsZXJwRnVuYyxcblx0XHR9O1xuXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0gPSB2YXJpYWJsZTtcblxuXHRcdHJldHVybiB2YXJpYWJsZTtcblxuXHR9XG5cblx0cHVibGljIHNldEVhc2luZyggbmFtZTogc3RyaW5nLCBlYXNpbmc6IEVhc2luZ0Z1bmMgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0dmFyaWFibGUuZWFzaW5nID0gZWFzaW5nO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGFuaW1hdGU8VD4oIG5hbWU6IHN0cmluZywgZ29hbFZhbHVlOiBULCBkdXJhdGlvbjogbnVtYmVyID0gMSwgY2FsbGJhY2s/OiBGdW5jdGlvbiwgZWFzaW5nPzogRWFzaW5nRnVuYyApIHtcblxuXHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF07XG5cdFx0bGV0IHByb21pc2UgPSBuZXcgUHJvbWlzZSggcmVzb2x2ZSA9PiB7XG5cblx0XHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdFx0aWYgKCBkdXJhdGlvbiA8PSAwICkge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRWYWx1ZSggbmFtZSwgZ29hbFZhbHVlICk7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS50aW1lID0gMS4wO1xuXHRcdFx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKCBudWxsICk7XG5cblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0cmV0dXJuO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHZhcmlhYmxlLnRpbWUgPT0gLSAxICkge1xuXG5cdFx0XHRcdFx0dGhpcy5faXNBbmltYXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgKys7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAwO1xuXHRcdFx0XHR2YXJpYWJsZS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHR2YXJpYWJsZS5zdGFydFZhbHVlID0gdmFyaWFibGUudmFsdWU7XG5cdFx0XHRcdHZhcmlhYmxlLmdvYWxWYWx1ZSA9IGdvYWxWYWx1ZTtcblx0XHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9ICgpID0+IHtcblxuXHRcdFx0XHRcdGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0cmVzb2x2ZSggbnVsbCApO1xuXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0aWYgKCBlYXNpbmcgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnNldEVhc2luZyggbmFtZSwgZWFzaW5nICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBwcm9taXNlO1xuXG5cdH1cblxuXHRwdWJsaWMgY2FuY2VsQW5pbWF0ZSggbmFtZTogc3RyaW5nICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLnRpbWUgPSAxLjA7XG5cdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gbnVsbDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRWYWx1ZTxUPiggbmFtZTogc3RyaW5nLCB2YWx1ZTogVCApIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0dGhpcy52YXJpYWJsZXNbIG5hbWUgXS52YWx1ZSA9IHZhbHVlO1xuXHRcdFx0dGhpcy5jYW5jZWxBbmltYXRlKCBuYW1lICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldDxUPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWU7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldFZhcmlhYmxlT2JqZWN0PFQ+KCBuYW1lOiBzdHJpbmcsIG11dGU6IGJvb2xlYW4gPSBmYWxzZSApOiBBbmltYXRvclZhcmlhYmxlPFQ+IHwgbnVsbCB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCAhIG11dGUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGlzQW5pbWF0aW5nVmFyaWFibGUoIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICkge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRsZXQgdGltZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF0udGltZTtcblxuXHRcdFx0cmV0dXJuIHRpbWUgIT0gLSAxLjA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoICEgbXV0ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgYXBwbHlUb1VuaWZvcm1zKCB1bmlmb3JtczogVW5pZm9ybXMgKSB7XG5cblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLnZhcmlhYmxlcyApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMuZ2V0VmFyaWFibGVPYmplY3QoIGtleXNbIGkgXSApO1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBpIF0gXSA9IHZhcmlhYmxlO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZT86IG51bWJlciApIHtcblxuXHRcdGlmICggdGhpcy5hbmltYXRpbmdDb3VudCA9PSAwICkge1xuXG5cdFx0XHR0aGlzLl9pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sga2V5c1sgaSBdIF07XG5cdFx0XHRsZXQgdGltZSA9IHZhcmlhYmxlLnRpbWU7XG5cblx0XHRcdGlmICggdGltZSA9PSAxLjAgKSB7XG5cblx0XHRcdFx0dGhpcy5hbmltYXRpbmdDb3VudCAtLTtcblx0XHRcdFx0dGltZSA9IC0gMTtcblxuXHRcdFx0XHRpZiAoIHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnRzLnB1c2goIHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCB0aW1lID49IDAuMCAmJiB0aW1lIDwgMS4wICkge1xuXG5cdFx0XHRcdGxldCBkdXJhdGlvbiA9IHZhcmlhYmxlLmR1cmF0aW9uO1xuXHRcdFx0XHRsZXQgZWFzaW5nID0gdmFyaWFibGUuZWFzaW5nO1xuXHRcdFx0XHRsZXQgbGVycEZ1bmMgPSB2YXJpYWJsZS5sZXJwRnVuYztcblxuXHRcdFx0XHRpZiAoIGR1cmF0aW9uICkge1xuXG5cdFx0XHRcdFx0dGltZSArPSAoIGRlbHRhVGltZSB8fCAwLjAxNiApIC8gZHVyYXRpb247XG5cblx0XHRcdFx0XHRpZiAoIGR1cmF0aW9uID09IDAgfHwgdGltZSA+PSAxLjAgKSB7XG5cblx0XHRcdFx0XHRcdHRpbWUgPSAxLjA7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggbGVycEZ1bmMgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGxlcnBGdW5jKCB2YXJpYWJsZS5zdGFydFZhbHVlLCB2YXJpYWJsZS5nb2FsVmFsdWUsIGVhc2luZyggdGltZSApICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdGltZSA9PSAxLjAgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IHZhcmlhYmxlLmdvYWxWYWx1ZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdFx0dHlwZTogJ3VwZGF0ZS8nICsga2V5c1sgaSBdLFxuXHRcdFx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lLFxuXHRcdFx0XHRcdHZhbHVlOiB2YXJpYWJsZS52YWx1ZVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyaWFibGUudGltZSA9IHRpbWU7XG5cblx0XHR9XG5cblx0XHR3aGlsZSAoIHRoaXMuZGlzcGF0Y2hFdmVudHMubGVuZ3RoICE9IDAgKSB7XG5cblx0XHRcdGxldCBmdW5jID0gdGhpcy5kaXNwYXRjaEV2ZW50cy5wb3AoKTtcblxuXHRcdFx0aWYgKCBmdW5jICkge1xuXG5cdFx0XHRcdGZ1bmMoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lXG5cdFx0fSApO1xuXG5cdFx0aWYgKCB0aGlzLl9pc0FuaW1hdGluZyApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICdhbmltYXRlJyxcblx0XHRcdFx0ZGVsdGFUaW1lOiBkZWx0YVRpbWVcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHdhaXQoIHQ6IG51bWJlciApIHtcblxuXHRcdGxldCBwcm0gPSBuZXcgUHJvbWlzZTx2b2lkPiggKCByICkgPT57XG5cblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcblxuXHRcdFx0XHRyKCk7XG5cblx0XHRcdH0sICggdCAqIDEwMDAgKSApO1xuXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHBybTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIE9SRSBmcm9tICcuLi8uLi8nO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgdmVydCBmcm9tICcuL3NoYWRlcnMvYmFja2dyb3VuZC52cyc7XG5pbXBvcnQgeyBMYXllclNpemUgYXMgTGF5ZXJTaXplSW5mbyB9IGZyb20gJy4uLy4uL2NvcmUvQmFzZUxheWVyJztcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBUSFJFRS5NZXNoIHtcblxuXHRwcm90ZWN0ZWQgdW5pZm9ybXM6IE9SRS5Vbmlmb3JtcztcblxuXHRjb25zdHJ1Y3RvciggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApIHtcblxuXHRcdGxldCBnZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGxldCBwb3NBcnJheSA9IFtdO1xuXHRcdGxldCBpbmRleEFycmF5ID0gW107XG5cdFx0bGV0IHV2QXJyYXkgPSBbXTtcblxuXHRcdHBvc0FycmF5LnB1c2goIC0gMSwgMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIDEsIDEsIDAgKTtcblx0XHRwb3NBcnJheS5wdXNoKCAxLCAtIDEsIDAgKTtcblx0XHRwb3NBcnJheS5wdXNoKCAtIDEsIC0gMSwgMCApO1xuXG5cdFx0dXZBcnJheS5wdXNoKCAwLCAxICk7XG5cdFx0dXZBcnJheS5wdXNoKCAxLCAxICk7XG5cdFx0dXZBcnJheS5wdXNoKCAxLCAwICk7XG5cdFx0dXZBcnJheS5wdXNoKCAwLCAwICk7XG5cblx0XHRpbmRleEFycmF5LnB1c2goIDAsIDIsIDEsIDAsIDMsIDIgKTtcblxuXHRcdGxldCBwb3MgPSBuZXcgRmxvYXQzMkFycmF5KCBwb3NBcnJheSApO1xuXHRcdGxldCBpbmRpY2VzID0gbmV3IFVpbnQzMkFycmF5KCBpbmRleEFycmF5ICk7XG5cdFx0bGV0IHV2ID0gbmV3IEZsb2F0MzJBcnJheSggdXZBcnJheSApO1xuXG5cdFx0Z2VvLnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggcG9zLCAzICkgKTtcblx0XHRnZW8uc2V0QXR0cmlidXRlKCAndXYnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCB1diwgMiApICk7XG5cdFx0Z2VvLnNldEluZGV4KCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBpbmRpY2VzLCAxICkgKTtcblxuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXHRcdHBhcmFtLnRyYW5zcGFyZW50ID0gcGFyYW0udHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gcGFyYW0udHJhbnNwYXJlbnQgOiB0cnVlO1xuXHRcdHBhcmFtLmRlcHRoRnVuYyA9IHBhcmFtLmRlcHRoRnVuYyAhPSB1bmRlZmluZWQgPyBwYXJhbS5kZXB0aEZ1bmMgOiBUSFJFRS5OZXZlckRlcHRoO1xuXG5cdFx0bGV0IG1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcGFyYW0gKTtcblxuXHRcdHN1cGVyKCBnZW8sIG1hdCApO1xuXG5cdFx0dGhpcy51bmlmb3JtcyA9IHBhcmFtLnVuaWZvcm1zIHx8IHt9O1xuXG5cdFx0dGhpcy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemUoIGFyZ3M6IExheWVyU2l6ZUluZm8gKSB7XG5cblx0XHR0aGlzLnVuaWZvcm1zLnJlc29sdXRpb24gPSB7IHZhbHVlOiBhcmdzLmNhbnZhc1NpemUgfTtcblx0XHR0aGlzLnVuaWZvcm1zLmFzcGVjdFJhdGlvID0geyB2YWx1ZTogYXJncy5jYW52YXNBc3BlY3RSYXRpbyB9O1xuXG5cdH1cblxufVxuIiwiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRCZXppZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5leHBvcnQgbmFtZXNwYWNlIEJlemllciB7XG5cblx0ZXhwb3J0IHR5cGUgQmV6aWVyQ29udHJvbFBvaW50cyA9IHtcblx0XHRwMDogbnVtYmVyO1xuXHRcdHAxOiBudW1iZXI7XG5cdFx0cDI6IG51bWJlcjtcblx0XHRwMzogbnVtYmVyO1xuXHR9XG5cblx0Ly8gaW5zcGlyZWQgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qcyBhbmQgaHR0cHM6Ly9naXRodWIuY29tLzBiNXZyL2F1dG9tYXRvbi9ibG9iLzg3MjQyMGU3OThkOTA1NGQ0YTdhMDZjOTcyY2JiNDI2MWE2N2I0YmMvc3JjL2JlemllckVhc2luZy50c1xuXG5cdGV4cG9ydCBjb25zdCBORVdUT05fSVRFUkFUSU9OUyA9IDQ7XG5cdGV4cG9ydCBjb25zdCBORVdUT05fTUlOX1NMT1BFID0gMC4wMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9QUkVDSVNJT04gPSAwLjAwMDAwMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwO1xuXHRleHBvcnQgY29uc3QgQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFID0gMTE7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUgPSAxLjAgLyBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkU7XG5cblx0ZnVuY3Rpb24gY2FsY0JlemllckEoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSBwLnAwICsgMy4wICogcC5wMSAtIDMuMCAqIHAucDIgKyBwLnAzO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckIoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogcC5wMCAtIDYuMCAqIHAucDEgKyAzLjAgKiBwLnAyO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckMoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSAzLjAgKiBwLnAwICsgMy4wICogcC5wMTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXJTbG9wZSggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIDMuMCAqIGNhbGNCZXppZXJBKCBwICkgKiB0ICogdCArIDIuMCAqIGNhbGNCZXppZXJCKCBwICkgKiB0ICsgY2FsY0JlemllckMoIHAgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXIoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAoICggY2FsY0JlemllckEoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQiggcCApICkgKiB0ICsgY2FsY0JlemllckMoIHAgKSApICogdCArIHAucDA7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHN1YmRpdiggeDogbnVtYmVyLCBzdGFydFQ6IG51bWJlciwgZW5kVDogbnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0bGV0IGN1cnJlbnRYID0gMDtcblx0XHRsZXQgY3VycmVudFQgPSAwO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGN1cnJlbnRUID0gc3RhcnRUICsgKCBlbmRUIC0gc3RhcnRUICkgLyAyO1xuXHRcdFx0Y3VycmVudFggPSBjYWxjQmV6aWVyKCBwLCBjdXJyZW50VCApO1xuXG5cdFx0XHRpZiAoIGN1cnJlbnRYID4geCApIHtcblxuXHRcdFx0XHRlbmRUID0gY3VycmVudFQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0c3RhcnRUID0gY3VycmVudFQ7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBjdXJyZW50VDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gbmV3dG9uKCB4Om51bWJlciwgcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgTkVXVE9OX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGxldCBzbG9wZSA9IGNhbGNCZXppZXJTbG9wZSggcCwgdCApO1xuXG5cdFx0XHRpZiAoIHNsb3BlID09IDAuMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gdDtcblxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgY3VycmVudFggPSAoIGNhbGNCZXppZXIoIHAsIHQgKSApIC0geDtcblx0XHRcdHQgLT0gY3VycmVudFggLyBzbG9wZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0QmV6aWVyVGZyb21YKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB4OiBudW1iZXIsIGNhY2hlOiBudW1iZXJbXSApIHtcblxuXHRcdHAucDEgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDEgKSApO1xuXHRcdHAucDIgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDIgKSApO1xuXG5cdFx0bGV0IHNhbXBsZSA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDE7IGkgPCBjYWNoZS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHNhbXBsZSA9IGkgLSAxO1xuXHRcdFx0aWYgKCB4IDwgY2FjaGVbIGkgXSApIGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHQgPSBzYW1wbGUgLyAoIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSAtIDEuMCApO1xuXHRcdGxldCBkaWZmID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICkgLyAoIHAucDMgLSBwLnAwICk7XG5cblx0XHRpZiAoIGRpZmYgPT0gMC4wICkge1xuXG5cdFx0XHRyZXR1cm4gdDtcblxuXHRcdH0gZWxzZSBpZiAoIGRpZmYgPiAwLjAxICkge1xuXG5cdFx0XHRyZXR1cm4gbmV3dG9uKCB4LCBwLCB0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gc3ViZGl2KCB4LCB0LCB0ICsgQkVaSUVSX0VBU0lOR19TQU1QTEVfU1RFUF9TSVpFLCBwICk7XG5cblx0XHR9XG5cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIndvbGZ5ODctZXZlbnRlbWl0dGVyXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkFjdGlvbiB9IGZyb20gXCIuLi9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZUdyb3VwIH0gZnJvbSAnLi4vQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwJztcclxuaW1wb3J0IHsgRkN1cnZlSW50ZXJwb2xhdGlvbiwgRkN1cnZlS2V5RnJhbWUgfSBmcm9tIFwiLi4vQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lXCI7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5cclxuZXhwb3J0IHR5cGUgQkNNZXNzYWdlID0gQkNTeW5jU2NlbmVNZXNzYWdlIHwgQkNTeW5jRnJhbWVNZXNzYWdlXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY1NjZW5lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvc2NlbmVcIixcclxuICAgIGRhdGE6IEJDU2NlbmVEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1NjZW5lRGF0YSA9IHtcclxuXHRhY3Rpb25zOiBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtW107XHJcbiAgICBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtID0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZmN1cnZlX2dyb3Vwczoge1trZXk6IHN0cmluZ106IEJDQW5pbWF0aW9uQ3VydmVQYXJhbVtdfTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZVBhcmFtID0ge1xyXG4gICAga2V5ZnJhbWVzOiBCQ0FuaW1hdGlvbkN1cnZlS2V5RnJhbWVQYXJhbVtdO1xyXG5cdGF4aXM6IEJDQW5pbWF0aW9uQ3VydmVBeGlzXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtID0ge1xyXG4gICAgYzogVEhSRUUuVmVjMjtcclxuICAgIGhfbDogVEhSRUUuVmVjMjtcclxuICAgIGhfcjogVEhSRUUuVmVjMjtcclxuICAgIGU6IHN0cmluZztcclxuICAgIGk6IEZDdXJ2ZUludGVycG9sYXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVPYmplY3REYXRhID0ge1xyXG5cdG5hbWU6IHN0cmluZyxcclxuXHRhY3Rpb25zOiBzdHJpbmdbXVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1N5bmNGcmFtZU1lc3NhZ2UgPSB7XHJcblx0dHlwZTogXCJzeW5jL3RpbWVsaW5lXCI7XHJcblx0ZGF0YTogQkNUaW1lbGluZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDVGltZWxpbmVEYXRhID0ge1xyXG5cdHN0YXJ0OiBudW1iZXI7XHJcblx0ZW5kOiBudW1iZXI7XHJcblx0Y3VycmVudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxlbmRlckNvbm5lY3RvciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdC8vIHdzXHJcblxyXG5cdHByaXZhdGUgdXJsPzogc3RyaW5nO1xyXG5cdHByaXZhdGUgd3M/OiBXZWJTb2NrZXQ7XHJcblx0cHVibGljIGNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvLyBmcmFtZVxyXG5cclxuXHRwdWJsaWMgZnJhbWVDdXJyZW50OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyID0gMDtcclxuXHJcblx0Ly8gYW5pbWF0aW9uXHJcblxyXG5cdHB1YmxpYyBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdID0gW107XHJcblx0cHVibGljIGFjdGlvbnM6IEFuaW1hdGlvbkFjdGlvbltdID0gW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKCB1cmw/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRpZiAoIHVybCApIHtcclxuXHJcblx0XHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0XHR0aGlzLmNvbm5lY3QoIHRoaXMudXJsICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb25uZWN0KCB1cmw6IHN0cmluZyApIHtcclxuXHJcblx0XHR0aGlzLnVybCA9IHVybDtcclxuXHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KCB0aGlzLnVybCApO1xyXG5cdFx0dGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9uZXJyb3IgPSAoIGUgKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmVycm9yKCBlICk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3luY0pzb25TY2VuZSgganNvblBhdGg6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0cmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcmVxLnJlYWR5U3RhdGUgPT0gNCApIHtcclxuXHJcblx0XHRcdFx0aWYgKCByZXEuc3RhdHVzID09IDIwMCApIHtcclxuXHJcblx0XHRcdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBKU09OLnBhcnNlKCByZXEucmVzcG9uc2UgKSApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXEub3BlbiggJ0dFVCcsIGpzb25QYXRoICk7XHJcblx0XHRyZXEuc2VuZCggKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uU3luY1NjZW5lKCBkYXRhOiBCQ1NjZW5lRGF0YSApIHtcclxuXHJcblx0XHR0aGlzLmFjdGlvbnMubGVuZ3RoID0gMDtcclxuXHRcdHRoaXMub2JqZWN0cy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdC8vIGFjdGlvbnNcclxuXHJcblx0XHRkYXRhLmFjdGlvbnMuZm9yRWFjaCggYWN0aW9uRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgYWN0aW9uID0gbmV3IEFuaW1hdGlvbkFjdGlvbiggYWN0aW9uRGF0YS5uYW1lICk7XHJcblxyXG5cdFx0XHRsZXQgZmN1cnZlR3JvdXBOYW1lcyA9IE9iamVjdC5rZXlzKGFjdGlvbkRhdGEuZmN1cnZlX2dyb3VwcylcclxuXHJcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGZjdXJ2ZUdyb3VwTmFtZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cE5hbWUgPSBmY3VydmVHcm91cE5hbWVzW2ldO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cCA9IG5ldyBGQ3VydmVHcm91cCggZmN1cnZlR3JvdXBOYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzW2ZjdXJ2ZUdyb3VwTmFtZV0uZm9yRWFjaCggZmN1cnZlRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGN1cnZlID0gbmV3IEZDdXJ2ZSgpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRjdXJ2ZS5zZXQoIGZjdXJ2ZURhdGEua2V5ZnJhbWVzLm1hcCggZnJhbWUgPT4ge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEZDdXJ2ZUtleUZyYW1lKCBmcmFtZS5jLCBmcmFtZS5oX2wsIGZyYW1lLmhfciwgZnJhbWUuaSApO1xyXG5cdFxyXG5cdFx0XHRcdFx0fSApICk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZjdXJ2ZUdyb3VwLnNldEZDdXJ2ZSggY3VydmUsIGZjdXJ2ZURhdGEuYXhpcyApO1xyXG5cdFxyXG5cdFx0XHRcdH0gKTtcclxuXHJcblx0XHRcdFx0YWN0aW9uLmFkZEZjdXJ2ZUdyb3VwKCBmY3VydmVHcm91cC5uYW1lLCBmY3VydmVHcm91cCApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIG9iamVjdHNcclxuXHJcblx0XHRkYXRhLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0RGF0YSA9PiB7XHJcblxyXG5cdFx0XHR0aGlzLm9iamVjdHMucHVzaCggb2JqZWN0RGF0YSApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyBkaXNwYXRjaCBldmVudFxyXG5cdFx0XHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlL3NjZW5lJywgW3RoaXNdKVxyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUodGhpcy5mcmFtZUN1cnJlbnQpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25TeW5jVGltZWxpbmUoIGRhdGE6IEJDVGltZWxpbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUoIGRhdGEuY3VycmVudCwgZGF0YS5zdGFydCwgZGF0YS5lbmQgKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFdTIEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uT3BlbiggZXZlbnQ6IEV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uTWVzc2FnZSggZTogTWVzc2FnZUV2ZW50ICkge1xyXG5cclxuXHRcdGxldCBtc2cgPSBKU09OLnBhcnNlKCBlLmRhdGEgKSBhcyBCQ01lc3NhZ2U7XHJcblxyXG5cdFx0aWYgKCBtc2cudHlwZSA9PSAnc3luYy9zY2VuZScgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIG1zZy50eXBlID09IFwic3luYy90aW1lbGluZVwiICkge1xyXG5cclxuXHRcdFx0dGhpcy5vblN5bmNUaW1lbGluZSggbXNnLmRhdGEgKTtcclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25DbG9zZSggZTpDbG9zZUV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZVdTKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRBUElcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGdldEFjdGlvbk5hbWVMaXN0KCBvYmplY3ROYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5vYmplY3RzWyBpIF0ubmFtZSA9PSBvYmplY3ROYW1lICkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vYmplY3RzWyBpIF0uYWN0aW9ucztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFtdO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb24oIGFjdGlvbk5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmFjdGlvbnNbIGkgXS5uYW1lID09IGFjdGlvbk5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHRcdGxldCBhY3Rpb25OYW1lTGlzdCA9IHRoaXMuZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWUgKTtcclxuXHJcblx0XHRhY3Rpb25OYW1lTGlzdC5mb3JFYWNoKCBhY3Rpb25OYW1lID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSB0aGlzLmdldEFjdGlvbiggYWN0aW9uTmFtZSApO1xyXG5cclxuXHRcdFx0aWYgKCBhY3Rpb24gKSB7XHJcblxyXG5cdFx0XHRcdGFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdHJldHVybiBhY3Rpb25zO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb25Db250YWluc0FjY2Vzc29yKCBhY2Nlc3Nvcjogc3RyaW5nICkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4ge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCBhY3Rpb24uY3VydmVzICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gY3VydmVLZXlzLnNvbWUoY3VydmVOYW1lID0+IGN1cnZlTmFtZT09YWNjZXNzb3IpXHJcblx0XHRcdFxyXG5cdFx0fSkgfHwgbnVsbFxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VGltZWxpbmUoIGN1cnJlbnQ6IG51bWJlciwgc3RhcnQ/Om51bWJlciwgZW5kPzpudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUN1cnJlbnQgPSBjdXJyZW50O1xyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gc3RhcnQgfHwgdGhpcy5mcmFtZVN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IGVuZCB8fCB0aGlzLmZyYW1lRW5kO1xyXG5cclxuXHRcdHRoaXMuZW1pdEV2ZW50KCAndXBkYXRlL3RpbWVsaW5lJywgWyB0aGlzLmZyYW1lQ3VycmVudCwgdGhpcy5mcmFtZVN0YXJ0LCB0aGlzLmZyYW1lRW5kIF0gKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdERpc3Bvc2VcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGlzcG9zZVdTKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy53cyApIHtcclxuXHJcblx0XHRcdHRoaXMud3MuY2xvc2UoKTtcclxuXHRcdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9uY2xvc2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9ub3BlbiA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydCBmcm9tICcuL2RvbU1lc2gudnMnO1xuaW1wb3J0IHsgVW5pZm9ybXMsIFVuaWZvcm1zTGliIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgRE9NTWVzaCBleHRlbmRzIFRIUkVFLk1lc2gge1xuXG5cdHByb3RlY3RlZCBfdW5pZm9ybXM6IFVuaWZvcm1zO1xuXHRwcm90ZWN0ZWQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwYXJhbWV0ZXI6IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApIHtcblxuXHRcdGxldCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApO1xuXG5cdFx0cGFyYW1ldGVyLnZlcnRleFNoYWRlciA9IHZlcnQ7XG5cblx0XHRsZXQgdW5pID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW1ldGVyLnVuaWZvcm1zLCB7XG5cdFx0XHRkb21Qb3M6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHRkb21TaXplOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0d2luZG93U2l6ZToge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdGFzcGVjdFJhdGlvOiB7XG5cdFx0XHRcdHZhbHVlOiAxLjBcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHRwYXJhbWV0ZXIudW5pZm9ybXMgPSB1bmk7XG5cblx0XHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbWV0ZXIgKTtcblxuXHRcdHN1cGVyKCBnZW8sIG1hdCApO1xuXG5cdFx0dGhpcy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl91bmlmb3JtcyA9IHVuaTtcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IHVuaWZvcm1zKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3VuaWZvcm1zO1xuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0bGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR0aGlzLl91bmlmb3Jtcy53aW5kb3dTaXplLnZhbHVlLnNldCggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRcdHRoaXMuX3VuaWZvcm1zLmFzcGVjdFJhdGlvLnZhbHVlID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0dGhpcy5fdW5pZm9ybXMuZG9tU2l6ZS52YWx1ZS5zZXQoIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0ICk7XG5cdFx0dGhpcy5fdW5pZm9ybXMuZG9tUG9zLnZhbHVlLnNldCggcmVjdC5sZWZ0LCByZWN0LnRvcCApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0IHsgQmV6aWVyIH0gZnJvbSBcIi4vQmV6aWVyXCI7XG5cbmV4cG9ydCB0eXBlIEVhc2luZ0Z1bmMgPSAoIHQ6IG51bWJlciApID0+IGFueVxuXG5leHBvcnQgbmFtZXNwYWNlIEVhc2luZ3Mge1xuXG5cdGV4cG9ydCBmdW5jdGlvbiBzaWdtb2lkKCB3ZWlnaHQ6IG51bWJlciA9IDYgKTogRWFzaW5nRnVuYyB7XG5cblx0XHRyZXR1cm4gKCB4OiBudW1iZXIgKSA9PiB7XG5cblx0XHRcdHZhciBlMSA9IE1hdGguZXhwKCAtIHdlaWdodCAqICggMiAqIHggLSAxICkgKTtcblx0XHRcdHZhciBlMiA9IE1hdGguZXhwKCAtIHdlaWdodCApO1xuXG5cdFx0XHRyZXR1cm4gKCAxICsgKCAxIC0gZTEgKSAvICggMSArIGUxICkgKiAoIDEgKyBlMiApIC8gKCAxIC0gZTIgKSApIC8gMjtcblxuXHRcdH07XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBzbW9vdGhzdGVwKCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHZhbHVlOiBudW1iZXIgKTogbnVtYmVyIHtcblxuXHRcdGxldCB4ID0gTWF0aC5tYXgoIDAsIE1hdGgubWluKCAxLCAoIHZhbHVlIC0gbWluICkgLyAoIG1heCAtIG1pbiApICkgKTtcblx0XHRyZXR1cm4geCAqIHggKiAoIDMgLSAyICogeCApO1xuXG5cdH1cblxuXHQvKlxuXHRAYXV0aGVyIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2dyZS8xNjUwMjk0XG5cdCovXG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGxpbmVhciggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiAoIDIgLSB0ICk7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCA8IC41ID8gMiAqIHQgKiB0IDogLSAxICsgKCA0IC0gMiAqIHQgKSAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuICggLS0gdCApICogdCAqIHQgKyAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWMoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyA0ICogdCAqIHQgKiB0IDogKCB0IC0gMSApICogKCAyICogdCAtIDIgKSAqICggMiAqIHQgLSAyICkgKyAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMSAtICggLS0gdCApICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyA4ICogdCAqIHQgKiB0ICogdCA6IDEgLSA4ICogKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWludCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMSArICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuXHR9XG5cbiAgXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuICBcdFx0cmV0dXJuIHQgPCAuNSA/IDE2ICogdCAqIHQgKiB0ICogdCAqIHQgOiAxICsgMTYgKiAoIC0tIHQgKSAqIHQgKiB0ICogdCAqIHQ7XG5cbiAgXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGJlemllciggYzE6IFRIUkVFLlZlYzIsIGgxOiBUSFJFRS5WZWMyLCBoMjogVEhSRUUuVmVjMiwgYzI6IFRIUkVFLlZlYzIgKTogRWFzaW5nRnVuYyB7XG5cblx0XHR2YXIgY2FjaGUgPSBuZXcgQXJyYXkoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgKTtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkU7ICsrIGkgKSB7XG5cblx0XHRcdGNhY2hlWyBpIF0gPSBCZXppZXIuY2FsY0JlemllciggeyBwMDogYzEueCwgcDE6IGgxLngsIHAyOiBoMi54LCBwMzogYzIueCB9LCBpIC8gKCBCZXppZXIuQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFIC0gMS4wICkgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0aWYgKCB4IDw9IGMxLnggKSByZXR1cm4gYzEueTtcblx0XHRcdGlmICggYzIueCA8PSB4ICkgcmV0dXJuIGMyLnk7XG5cblx0XHRcdHJldHVybiBCZXppZXIuY2FsY0JlemllciggeyBwMDogYzEueSwgcDE6IGgxLnksIHAyOiBoMi55LCBwMzogYzIueSB9LCBCZXppZXIuZ2V0QmV6aWVyVGZyb21YKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIHgsIGNhY2hlICkgKTtcblxuXHRcdH07XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjdWJpY0JlemllciggaDFYOiBudW1iZXIsIGgxWTogbnVtYmVyLCBoMlg6IG51bWJlciwgaDJZOiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYmV6aWVyKFxuXHRcdFx0eyB4OiAwLjAsIHk6IDAuMCB9LFxuXHRcdFx0eyB4OiBoMVggYXMgbnVtYmVyLCB5OiBoMVkgYXMgbnVtYmVyIH0sXG5cdFx0XHR7IHg6IGgyWCBhcyBudW1iZXIsIHk6IGgyWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogMS4wLCB5OiAxLjAgfSxcblx0XHQpO1xuXG5cdH1cblxufVxuIiwiZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEV2ZW50IHtcblx0dHlwZTogc3RyaW5nO1xuXHRba2V5OnN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEV2ZW50TGlzdGVuZXIge1xuXHR0eXBlOiBzdHJpbmcsXG5cdGxpc3RlbmVyOiAoIGU6IEV2ZW50ICkgPT4gdm9pZCxcbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHJpdmF0ZSBldmVudHM6IEV2ZW50TGlzdGVuZXJbXSA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lciggdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKCBlOiBFdmVudCApID0+IHZvaWQgKSB7XG5cblx0XHR0aGlzLmV2ZW50cy5wdXNoKCB7XG5cdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyXG5cdFx0fSApO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcGF0Y2hFdmVudCggZXZlbnQ6IEV2ZW50ICkge1xuXG5cdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcztcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0aWYgKCBldmVudC50eXBlID09IHRoaXMuZXZlbnRzWyBpIF0udHlwZSApIHtcblxuXHRcdFx0XHR0aGlzLmV2ZW50c1sgaSBdLmxpc3RlbmVyKCBldmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiApIHtcblxuXHRcdGZvciAoIGxldCBpID0gdGhpcy5ldmVudHMubGVuZ3RoOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdGlmICggdHlwZSA9PSB0aGlzLmV2ZW50c1sgaSBdLnR5cGUgJiYgbGlzdGVuZXIgPT0gdGhpcy5ldmVudHNbIGkgXS5saXN0ZW5lciApIHtcblxuXHRcdFx0XHR0aGlzLmV2ZW50cy5zcGxpY2UoIGksIDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgdmVydCBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm91Z2gudnMnO1xuaW1wb3J0IHBhc3NUaHJvdWdoRnJhZyBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm91Z2guZnMnO1xuaW1wb3J0IHsgVW5pZm9ybXMsIFVuaWZvcm1zTGliIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdQVUNvbXB1dGF0aW9uS2VybmVse1xuICAgIG1hdGVyaWFsOiBUSFJFRS5SYXdTaGFkZXJNYXRlcmlhbCxcbiAgICB1bmlmb3JtczogYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdQVWNvbXB1dGF0aW9uRGF0YXtcbiAgICBidWZmZXI6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0XG59XG5cbmV4cG9ydCBjbGFzcyBHUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIge1xuXG5cdHByb3RlY3RlZCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblx0cHVibGljIGRhdGFTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRwcm90ZWN0ZWQgdW5pZm9ybXM6IGFueTtcblxuXHRwcm90ZWN0ZWQgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwcm90ZWN0ZWQgY2FtZXJhOiBUSFJFRS5DYW1lcmE7XG5cblx0cHJvdGVjdGVkIG1lc2g6IFRIUkVFLk1lc2g7XG5cdHByb3RlY3RlZCBtYXRlcmlhbHM6IFRIUkVFLlNoYWRlck1hdGVyaWFsW107XG5cblx0cHJvdGVjdGVkIHRlbXBEYXRhTGluZWFyOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cdHByb3RlY3RlZCB0ZW1wRGF0YU5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwcml2YXRlIHJlbmRlclRhcmdldHM6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0W10gPSBbXTtcblxuXHRwdWJsaWMgZ2V0IGlzU3VwcG9ydGVkKCkgOiBib29sZWFuIHtcblxuICAgIFx0cmV0dXJuIHRoaXMucmVuZGVyZXIuZXh0ZW5zaW9ucy5nZXQoIFwiT0VTX3RleHR1cmVfZmxvYXRcIiApO1xuXG5cdH1cblxuXHRjb25zdHJ1Y3RvciggcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIsIGRhdGFTaXplOiBUSFJFRS5WZWN0b3IyICkge1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgXHR0aGlzLmRhdGFTaXplID0gZGF0YVNpemUuY2xvbmUoKTtcblxuICAgIFx0dGhpcy51bmlmb3JtcyA9IHtcbiAgICBcdFx0ZGF0YVNpemU6IHtcbiAgICBcdFx0XHR2YWx1ZTogdGhpcy5kYXRhU2l6ZVxuICAgIFx0XHR9XG4gICAgXHR9O1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTGluZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLFxuICAgIFx0XHRtYWdGaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlclxuICAgIFx0fSApO1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTmVhciA9IHRoaXMuY3JlYXRlRGF0YSgge1xuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlclxuICAgIFx0fSApO1xuXG4gICAgXHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgXHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5DYW1lcmEoKTtcblxuICAgIFx0dGhpcy5tYXRlcmlhbHMgPSBbXTtcbiAgICBcdHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApICk7XG4gICAgXHR0aGlzLnNjZW5lLmFkZCggdGhpcy5tZXNoICk7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVJbml0aWFsaXplVGV4dHVyZSgpIHtcblxuICAgIFx0bGV0IGEgPSBuZXcgRmxvYXQzMkFycmF5KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnggKiB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnkgKiA0ICk7XG4gICAgXHRsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5EYXRhVGV4dHVyZSggYSwgdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS54LCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnksIFRIUkVFLlJHQkFGb3JtYXQsIFRIUkVFLkZsb2F0VHlwZSApO1xuICAgIFx0dGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICBcdHJldHVybiB0ZXh0dXJlO1xuXG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlRGF0YSgpOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIGluaXRpYWxpemVUZXh0dXJlOiBUSFJFRS5EYXRhVGV4dHVyZSApOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlLCB0ZXh0dXJlUGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIGluaXRUZXhfdGV4UGFyYW0/OiBhbnksIHRleHR1cmVQYXJhbT8gOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhIHtcblxuICAgIFx0bGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgXHRsZXQgaXNpT1MgPSB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQaG9uZScgKSA+PSAwIHx8IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBhZCcgKSA+PSAwIHx8IG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcImlQYWRcIiB8fCAoIG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIlNhZmFyaVwiICkgIT0gLSAxICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJDaHJvbWVcIiApID09IC0gMSAmJiAoIG5hdmlnYXRvciBhcyBhbnkgKS5zdGFuZGFsb25lICE9PSB1bmRlZmluZWQgKTtcblxuICAgIFx0bGV0IHBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgPSB7XG4gICAgXHRcdHdyYXBTOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHR3cmFwVDogVEhSRUUuQ2xhbXBUb0VkZ2VXcmFwcGluZyxcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLFxuICAgIFx0XHRtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdGZvcm1hdDogVEhSRUUuUkdCQUZvcm1hdCxcbiAgICBcdFx0dHlwZTogaXNpT1MgPyBUSFJFRS5IYWxmRmxvYXRUeXBlIDogVEhSRUUuRmxvYXRUeXBlLFxuICAgIFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcbiAgICBcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXG4gICAgXHR9O1xuICAgIFx0bGV0IGluaXRUZXg6IFRIUkVFLkRhdGFUZXh0dXJlIHwgbnVsbCA9IG51bGw7XG4gICAgXHRsZXQgY3VzdG9tUGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyB8IG51bGwgPSBudWxsO1xuXG4gICAgXHRpZiAoIGluaXRUZXhfdGV4UGFyYW0gKSB7XG5cbiAgICBcdFx0aWYgKCBpbml0VGV4X3RleFBhcmFtLmlzRGF0YVRleHR1cmUgKSB7XG5cbiAgICBcdFx0XHRpbml0VGV4ID0gaW5pdFRleF90ZXhQYXJhbTtcblxuICAgIFx0XHRcdGlmICggdGV4dHVyZVBhcmFtICkge1xuXG4gICAgXHRcdFx0XHRjdXN0b21QYXJhbSA9IHRleHR1cmVQYXJhbTtcblxuICAgIFx0XHRcdH1cblxuICAgIFx0XHR9IGVsc2Uge1xuXG4gICAgXHRcdFx0Y3VzdG9tUGFyYW0gPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdH1cblxuICAgIFx0fVxuXG4gICAgXHRpZiAoIGN1c3RvbVBhcmFtICkge1xuXG4gICAgXHRcdHBhcmFtLndyYXBTID0gY3VzdG9tUGFyYW0ud3JhcFMgfHwgcGFyYW0ud3JhcFM7XG4gICAgXHRcdHBhcmFtLndyYXBUID0gY3VzdG9tUGFyYW0ud3JhcFQgfHwgcGFyYW0ud3JhcFQ7XG4gICAgXHRcdHBhcmFtLm1pbkZpbHRlciA9IGN1c3RvbVBhcmFtLm1pbkZpbHRlciB8fCBwYXJhbS5taW5GaWx0ZXI7XG4gICAgXHRcdHBhcmFtLm1hZ0ZpbHRlciA9IGN1c3RvbVBhcmFtLm1hZ0ZpbHRlciB8fCBwYXJhbS5tYWdGaWx0ZXI7XG4gICAgXHRcdHBhcmFtLmZvcm1hdCA9IGN1c3RvbVBhcmFtLmZvcm1hdCB8fCBwYXJhbS5mb3JtYXQ7XG4gICAgXHRcdHBhcmFtLnR5cGUgPSBjdXN0b21QYXJhbS50eXBlIHx8IHBhcmFtLnR5cGU7XG4gICAgXHRcdHBhcmFtLnN0ZW5jaWxCdWZmZXIgPSBjdXN0b21QYXJhbS5zdGVuY2lsQnVmZmVyIHx8IHBhcmFtLnN0ZW5jaWxCdWZmZXI7XG4gICAgXHRcdHBhcmFtLmRlcHRoQnVmZmVyID0gY3VzdG9tUGFyYW0uZGVwdGhCdWZmZXIgfHwgcGFyYW0uZGVwdGhCdWZmZXI7XG5cbiAgICBcdH1cblxuICAgIFx0bGV0IGJ1ZiA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCggdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS54LCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnksIHBhcmFtICk7XG5cblx0XHRsZXQgZGF0YSA9IHsgYnVmZmVyOiBidWYgfTtcblxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0cy5wdXNoKCBidWYgKTtcblxuICAgIFx0aWYgKCBpbml0VGV4ICkge1xuXG4gICAgXHRcdGxldCBpbml0S2VybmVsID0gdGhpcy5jcmVhdGVLZXJuZWwoIHtcblx0XHRcdFx0ZnJhZ21lbnRTaGFkZXI6IHBhc3NUaHJvdWdoRnJhZyxcblx0XHRcdFx0dW5pZm9ybXM6IHtcblx0XHRcdFx0XHR0ZXg6IHtcblx0XHRcdFx0XHRcdHZhbHVlOiBpbml0VGV4XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cbiAgICBcdFx0dGhpcy5jb21wdXRlKCBpbml0S2VybmVsLCBkYXRhICk7XG5cbiAgICBcdH1cblxuICAgIFx0cmV0dXJuIGRhdGE7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVLZXJuZWwoIHBhcmFtOiBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMgKTogR1BVQ29tcHV0YXRpb25LZXJuZWwge1xuXG4gICAgXHRsZXQgdW5pOiBVbmlmb3JtcyA9IFVuaWZvcm1zTGliLm1lcmdlVW5pZm9ybXMoIHBhcmFtLnVuaWZvcm1zLCB0aGlzLnVuaWZvcm1zICk7XG5cblx0XHRwYXJhbS51bmlmb3JtcyA9IHVuaTtcblx0XHRwYXJhbS52ZXJ0ZXhTaGFkZXIgPSBwYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgdmVydDtcblxuICAgIFx0bGV0IG1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcGFyYW0gKTtcblxuICAgIFx0dGhpcy5tYXRlcmlhbHMucHVzaCggbWF0ICk7XG5cbiAgICBcdGxldCBrZXJuZWw6IEdQVUNvbXB1dGF0aW9uS2VybmVsID0ge1xuICAgIFx0XHRtYXRlcmlhbDogbWF0LFxuICAgIFx0XHR1bmlmb3JtczogcGFyYW0udW5pZm9ybXNcbiAgICBcdH07XG5cbiAgICBcdHJldHVybiBrZXJuZWw7XG5cblx0fVxuXG5cdHB1YmxpYyBjb21wdXRlKCBrZXJuZWw6IEdQVUNvbXB1dGF0aW9uS2VybmVsLCBkYXRhOiBHUFVjb21wdXRhdGlvbkRhdGEsIGNhbWVyYT86IFRIUkVFLkNhbWVyYSApIHtcblxuICAgIFx0bGV0IHRlbXA6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuICAgIFx0aWYgKCBkYXRhLmJ1ZmZlci50ZXh0dXJlLm1hZ0ZpbHRlciA9PSBUSFJFRS5MaW5lYXJGaWx0ZXIgKSB7XG5cbiAgICBcdFx0dGVtcCA9IHRoaXMudGVtcERhdGFMaW5lYXI7XG5cbiAgICBcdH0gZWxzZSB7XG5cbiAgICBcdFx0dGVtcCA9IHRoaXMudGVtcERhdGFOZWFyO1xuXG4gICAgXHR9XG5cbiAgICBcdHRoaXMubWVzaC5tYXRlcmlhbCA9IGtlcm5lbC5tYXRlcmlhbDtcblxuICAgIFx0bGV0IGN1cnJlbnRSZW5kZXJUYXJnZXQgPSB0aGlzLnJlbmRlcmVyLmdldFJlbmRlclRhcmdldCgpO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggdGVtcC5idWZmZXIgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIGNhbWVyYSB8fCB0aGlzLmNhbWVyYSApO1xuXG4gICAgXHR0aGlzLnN3YXBCdWZmZXJzKCBkYXRhLCB0ZW1wICk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBjdXJyZW50UmVuZGVyVGFyZ2V0ICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBzd2FwQnVmZmVycyggYjE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgYjI6IEdQVWNvbXB1dGF0aW9uRGF0YSApIHtcblxuICAgIFx0bGV0IHRtcCA9IGIxLmJ1ZmZlcjtcbiAgICBcdGIxLmJ1ZmZlciA9IGIyLmJ1ZmZlcjtcbiAgICBcdGIyLmJ1ZmZlciA9IHRtcDtcblxuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKSB7XG5cbiAgICBcdGxldCBnZW8gPSB0aGlzLm1lc2guZ2VvbWV0cnk7XG4gICAgXHRnZW8uZGlzcG9zZSgpO1xuXG4gICAgXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLm1hdGVyaWFscy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICBcdFx0dGhpcy5tYXRlcmlhbHNbIGkgXS5kaXNwb3NlKCk7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5zY2VuZS5yZW1vdmUoIHRoaXMubWVzaCApO1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTGluZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgXHR0aGlzLnRlbXBEYXRhTmVhci5idWZmZXIuZGlzcG9zZSgpO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVzaXplRGF0YSggZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHR0aGlzLmRhdGFTaXplLmNvcHkoIGRhdGFTaXplICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnJlbmRlclRhcmdldHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5yZW5kZXJUYXJnZXRzWyBpIF07XG5cblx0XHRcdHRhcmdldC5zZXRTaXplKCBkYXRhU2l6ZS54LCBkYXRhU2l6ZS55ICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbj86IFRIUkVFLlZlY3RvcjM7XG5cdHJvdGF0aW9uPzogVEhSRUUuUXVhdGVybmlvbjtcblx0c2NhbGU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBCYXNlVHJhbnNmb3JtIHtcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjM7XG5cdHJvdGF0aW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZTogVEhSRUUuVmVjdG9yM1xufVxuXG5leHBvcnQgY2xhc3MgTGF5b3V0Q29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIG9iajogVEhSRUUuT2JqZWN0M0Q7XG5cdHByb3RlY3RlZCBiYXNlVHJhbnNmb3JtOiBCYXNlVHJhbnNmb3JtO1xuXHRwcm90ZWN0ZWQgdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG5cblx0Y29uc3RydWN0b3IoIG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIHRyYW5zZm9ybTogVHJhbnNmb3JtLCBpc0Fic29sdXRlUG9zaXRpb24/OiBib29sZWFuICkge1xuXG5cdFx0dGhpcy5vYmogPSBvYmplY3Q7XG5cblx0XHR0aGlzLmJhc2VUcmFuc2Zvcm0gPSB7XG5cdFx0XHRwb3NpdGlvbjogdGhpcy5vYmoucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdHJvdGF0aW9uOiB0aGlzLm9iai5xdWF0ZXJuaW9uLmNsb25lKCksXG5cdFx0XHRzY2FsZTogdGhpcy5vYmouc2NhbGUuY2xvbmUoKVxuXHRcdH07XG5cblx0XHR0aGlzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcblxuXHRcdGlmICggISBpc0Fic29sdXRlUG9zaXRpb24gKSB7XG5cblx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICYmIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmFkZCggdGhpcy5vYmoucG9zaXRpb24gKTtcblx0XHRcdHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uICYmIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLm11bHRpcGx5KCB0aGlzLm9iai5xdWF0ZXJuaW9uICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGVUcmFuc2Zvcm0oIHdlaWdodDogbnVtYmVyICkge1xuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy5vYmoucG9zaXRpb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCkubGVycCggdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5xdWF0ZXJuaW9uLmNvcHkoIHRoaXMuYmFzZVRyYW5zZm9ybS5yb3RhdGlvbi5jbG9uZSgpLnNsZXJwKCB0aGlzLnRyYW5zZm9ybS5yb3RhdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0uc2NhbGUgKSB7XG5cblx0XHRcdHRoaXMub2JqLnNjYWxlLmNvcHkoIHRoaXMuYmFzZVRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSAqICggd2VpZ2h0ICkgKyAxLjAgLSB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExlcnBGdW5jPFQ+e1xuXHQoIGE6IFQsIGI6IFQsIHQ6IG51bWJlciApOiBUO1xufVxuXG5leHBvcnQgbmFtZXNwYWNlIExlcnBzIHtcblxuXHRleHBvcnQgZnVuY3Rpb24gbnVtYmVyKCBhOiBudW1iZXIsIGI6IG51bWJlciwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEgKyAoIGIgLSBhICkgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gbnVtYmVyQXJyYXkoIGE6IG51bWJlcltdLCBiOiBudW1iZXJbXSwgdDogbnVtYmVyICkge1xuXG5cdFx0aWYgKCBhLmxlbmd0aCA9PSBiLmxlbmd0aCApIHtcblxuXHRcdFx0bGV0IGMgPSBbXTtcblxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgYS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdFx0Yy5wdXNoKCBhWyBpIF0gKyAoIGJbIGkgXSAtIGFbIGkgXSApICogdCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS5sb2coICdEaWZmZXJlbnQgbGVuZ3RoIEFycmF5cyEhIScgKTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVWZWN0b3JzKCBhOiBUSFJFRS5WZWN0b3IyICYgVEhSRUUuVmVjdG9yMyAmIFRIUkVFLlZlY3RvcjQgJiBUSFJFRS5Db2xvciwgYjogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhLmNsb25lKCkubGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVRdWF0ZXJuaW9uKCBhOiBUSFJFRS5RdWF0ZXJuaW9uLCBiOiBUSFJFRS5RdWF0ZXJuaW9uLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLnNsZXJwKCBiLCB0ICk7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBUSFJFRUV1bGVyKCBhOiBUSFJFRS5FdWxlciwgYjogVEhSRUUuRXVsZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdGxldCBhYyA9IGEuY2xvbmUoKTtcblx0XHRsZXQgYmMgPSBiLmNsb25lKCk7XG5cblx0XHRhYy54ID0gYWMueCArICggYmMueCAtIGFjLnggKSAqIHQ7XG5cdFx0YWMueSA9IGFjLnkgKyAoIGJjLnkgLSBhYy55ICkgKiB0O1xuXHRcdGFjLnogPSBhYy56ICsgKCBiYy56IC0gYWMueiApICogdDtcblxuXHRcdHJldHVybiBhYztcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGdldExlcnBGdW5jKCB2YWx1ZTogYW55ICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgKCB2YWx1ZSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSAmJiB0eXBlb2YgKCB2YWx1ZVsgMCBdICkgPT0gJ251bWJlcicgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5udW1iZXJBcnJheTtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlLmlzVmVjdG9yMiB8IHZhbHVlLmlzVmVjdG9yMyB8IHZhbHVlLmlzVmVjdG9yNCB8IHZhbHVlLmlzQ29sb3IgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVZlY3RvcnM7XG5cblx0XHR9IGVsc2UgaWYgKCB2YWx1ZS5pc1F1YXRlcm5pb24gKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVF1YXRlcm5pb247XG5cblx0XHR9IGVsc2UgaWYgKCB2YWx1ZS5pc0V1bGVyICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVFdWxlcjtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIE1vdXNlUm90YXRvciB7XG5cblx0cHVibGljIHRhcmdldDogVEhSRUUuT2JqZWN0M0Q7XG5cdHB1YmxpYyBzY3JvbGxWZWw6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoIG9ianM6IFRIUkVFLk9iamVjdDNEICkge1xuXG5cdFx0dGhpcy50YXJnZXQgPSBvYmpzO1xuXG5cdFx0dGhpcy5zY3JvbGxWZWwgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLnNjcm9sbFZlbC5tdWx0aXBseVNjYWxhciggMC45NiApO1xuXG5cdFx0bGV0IGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMyggdGhpcy5zY3JvbGxWZWwueSwgdGhpcy5zY3JvbGxWZWwueCwgMC4wICkubm9ybWFsaXplKCk7XG5cblx0XHRsZXQgcSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuc2V0RnJvbUF4aXNBbmdsZSggYXhpcywgdGhpcy5zY3JvbGxWZWwubGVuZ3RoKCkgKTtcblx0XHRxLm11bHRpcGx5KCB0aGlzLnRhcmdldC5xdWF0ZXJuaW9uICk7XG5cblx0XHR0aGlzLnRhcmdldC5xdWF0ZXJuaW9uLmNvcHkoIHEgKTtcblxuXHR9XG5cblx0YWRkVmVsb2NpdHkoIHNjcm9sbERlbHRhOiBUSFJFRS5WZWN0b3IyICkge1xuXG5cdFx0dGhpcy5zY3JvbGxWZWwuYWRkVmVjdG9ycyggdGhpcy5zY3JvbGxWZWwsIHNjcm9sbERlbHRhLm11bHRpcGx5U2NhbGFyKCAwLjAwMSApICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IFBhZ2VTY3JvbGxlciB9IGZyb20gJy4nO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckV2ZW50QXJncyB7XHJcblx0c2Nyb2xsZXI6IFBhZ2VTY3JvbGxlcjtcclxuXHRzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdHNjcm9sbE1vZGU6IHN0cmluZztcclxuXHRzY3JvbGxEZWx0YTogbnVtYmVyO1xyXG5cdHNjcm9sbFBvd2VyOiBudW1iZXI7XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckV2ZW50IHtcclxuXHRjb21tb24/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdHVwPzogKCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuXHRkb3duPzogKCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnRzIHtcclxuXHRvblN0YXJ0U2Nyb2xsPzogUGFnZVNjcm9sbGVyRXZlbnRcclxuXHRvbkFycml2YWxzPzoge1xyXG5cdFx0cGVyY2VudGFnZTogbnVtYmVyO1xyXG5cdFx0ZXZlbnQ6IFBhZ2VTY3JvbGxlckV2ZW50O1xyXG5cdH1bXVxyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyU2VjdGlvblBhcmFtcyB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdGV2ZW50cz86IFBhZ2VTY3JvbGxlckV2ZW50cztcclxuXHRzdG9wPzogYm9vbGVhbjtcclxuXHRzdGFydFNjcm9sbFVwPzogbnVtYmVyO1xyXG5cdHN0YXJ0U2Nyb2xsRG93bj86IG51bWJlcjtcclxuXHRib3R0b20/OiBib29sZWFuO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJTZWN0aW9uUmVjdCB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxuXHR3aWR0aDogbnVtYmVyO1xyXG5cdGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbGVyU2VjdGlvbiB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdHB1YmxpYyByZWN0OiBQYWdlU2Nyb2xsZXJTZWN0aW9uUmVjdDtcclxuXHRwdWJsaWMgc3RhcnRTY3JvbGxVcDogbnVtYmVyO1xyXG5cdHB1YmxpYyBzdGFydFNjcm9sbERvd246IG51bWJlcjtcclxuXHRwdWJsaWMgc3RvcD86IGJvb2xlYW47XHJcblx0cHVibGljIGV2ZW50cz86IFBhZ2VTY3JvbGxlckV2ZW50cztcclxuXHRwdWJsaWMgYm90dG9tPzogYm9vbGVhbjtcclxuXHRwdWJsaWMgdGltZWxpbmVQZXJjZW50YWdlOiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggcGFyYW1zOiBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zICkge1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gcGFyYW1zLmVsZW1lbnQ7XHJcblx0XHR0aGlzLnJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR0aGlzLnN0b3AgPSBwYXJhbXMuc3RvcDtcclxuXHRcdHRoaXMuZXZlbnRzID0gcGFyYW1zLmV2ZW50cztcclxuXHRcdHRoaXMuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuXHRcdHRoaXMuc3RhcnRTY3JvbGxEb3duID0gcGFyYW1zLnN0YXJ0U2Nyb2xsRG93biB8fCAwO1xyXG5cdFx0dGhpcy5zdGFydFNjcm9sbFVwID0gcGFyYW1zLnN0YXJ0U2Nyb2xsVXAgfHwgMDtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVJlY3QoIDAgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGlzUGFnZVNjcm9sbGVyU2VjdGlvbigpIHtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlUmVjdCggc2Nyb2xsUG9zOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5yZWN0ID0ge1xyXG5cdFx0XHR4OiB0aGlzLmVsZW1lbnQub2Zmc2V0TGVmdCxcclxuXHRcdFx0eTogdGhpcy5lbGVtZW50Lm9mZnNldFRvcCAtIHNjcm9sbFBvcyxcclxuXHRcdFx0d2lkdGg6IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0XHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRTY3JvbGxQZXJjZW50YWdlKCBvZmZzZXRQb3M/OiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IGJvdHRvbU9mZnNldCA9ICggdGhpcy5ib3R0b20gPyB0aGlzLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApO1xyXG5cdFx0bGV0IHBvcyA9ICggdGhpcy5yZWN0LnkgKyBib3R0b21PZmZzZXQgKSAtICggb2Zmc2V0UG9zIHx8IDAgKTtcclxuXHJcblx0XHRsZXQgZmlyc3RIYWxmSGVpZ2h0ID0gdGhpcy5ib3R0b20gPyB0aGlzLnJlY3QuaGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdFx0bGV0IGZpcnN0SGFsZiA9IE1hdGgubWluKCAxLjAsIDEuMCAtICggcG9zIC8gZmlyc3RIYWxmSGVpZ2h0ICkgKTtcclxuXHJcblx0XHRsZXQgc2Vjb25kSGFsZkhlaWdodCA9IHRoaXMuYm90dG9tID8gd2luZG93LmlubmVySGVpZ2h0IDogdGhpcy5yZWN0LmhlaWdodDtcclxuXHRcdGxldCBzZWNvbmRIYWxmID0gTWF0aC5tYXgoIDAuMCwgLSBwb3MgLyBzZWNvbmRIYWxmSGVpZ2h0ICk7XHJcblxyXG5cdFx0bGV0IHBlcmNlbnRhZ2UgPSBmaXJzdEhhbGYgKyBzZWNvbmRIYWxmO1xyXG5cclxuXHRcdHJldHVybiBwZXJjZW50YWdlO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgUGFnZVNjcm9sbGVyU2VjdGlvbiwgUGFnZVNjcm9sbGVyU2VjdGlvblBhcmFtcywgUGFnZVNjcm9sbGVyRXZlbnRBcmdzIH0gZnJvbSAnLi9QYWdlU2Nyb2xsZXJTZWN0aW9uJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYywgRWFzaW5ncyB9IGZyb20gJy4uL0Vhc2luZ3MnO1xyXG5pbXBvcnQgeyBBbmltYXRvciB9IGZyb20gJy4uL0FuaW1hdG9yJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJBdXRvTW92ZVBhcmFtIHtcclxuXHR0YXJnZXQ6IHN0cmluZyB8IG51bWJlciB8IFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0ZHVyYXRpb24/OiBudW1iZXI7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxuXHRjYWxsQmFjaz86IEZ1bmN0aW9uO1xyXG5cdGJvdHRvbT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2Nyb2xsZXIge1xyXG5cclxuXHRwcm90ZWN0ZWQgYW5pbWF0b3I6IEFuaW1hdG9yO1xyXG5cdHByb3RlY3RlZCBpc0F1dG9Nb3ZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByb3RlY3RlZCBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHRwcm90ZWN0ZWQgcGFyZW50RWxlbWVudEhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRwcm90ZWN0ZWQgc2VjdGlvbnM6IFBhZ2VTY3JvbGxlclNlY3Rpb25bXTtcclxuXHJcblx0cHVibGljIGRlbGF5U3BlZWQ6IG51bWJlciA9IDAuMTtcclxuXHRwdWJsaWMgZHJhZ0RlbGF5U3BlZWQ6IG51bWJlciA9IDAuNDtcclxuXHRwcm90ZWN0ZWQgaXNUb3VjaGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBkZWx0YU1lbTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIHNjcm9sbFJlYWR5OiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIHN1bURlbHRhOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBvczogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBvc01lbTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBlcmNlbnRhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zRGVsYXk6IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQZXJjZW50YWdlRGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBjYXVnaHRTZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uIHwgbnVsbDtcclxuXHRwcm90ZWN0ZWQgZHJhZ1N0b3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgZHJhZ1VubG9ja1JlYWR5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0Y29uc3RydWN0b3IoIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50ICkge1xyXG5cclxuXHRcdHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgPSBwYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zID0gW107XHJcblx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdGluaXQgQW5pbWF0b3JcclxuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFx0dGhpcy5hbmltYXRvciA9IG5ldyBBbmltYXRvcigpO1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IuYWRkKCB7XHJcblx0XHRcdG5hbWU6ICdzY3JvbGxQb3MnLFxyXG5cdFx0XHRpbml0VmFsdWU6IDAsXHJcblx0XHRcdGVhc2luZzogRWFzaW5ncy5zaWdtb2lkKClcclxuXHRcdH0gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBvcygpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUG9zO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUG9zRGVsYXkoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFBvc0RlbGF5O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUGVyY2VudGFnZSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUGVyY2VudGFnZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBlcmNlbnRhZ2VEZWxheSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUGVyY2VudGFnZURlbGF5O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsVGltZWxpbmVQZXJjZW50YWdlKCkge1xyXG5cclxuXHRcdGxldCBzdW0gPSAwO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHNlYyA9IHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHRcdFx0bGV0IHNlY0JlZiA9IHRoaXMuc2VjdGlvbnNbIGkgLSAxIF07XHJcblxyXG5cdFx0XHRsZXQgYSA9IE1hdGgubWF4KCAwLjAsIHNlYy5lbGVtZW50Lm9mZnNldFRvcCAtIHRoaXMuc2Nyb2xsUG9zRGVsYXkgKyAoIHNlYy5ib3R0b20gPyBzZWMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgKTtcclxuXHRcdFx0bGV0IGIgPSAoICggc2VjQmVmID8gc2VjQmVmLnJlY3QuaGVpZ2h0IC0gKCBzZWNCZWYuYm90dG9tID8gd2luZG93LmlubmVySGVpZ2h0IDogMCApIDogMCApICsgKCBzZWMuYm90dG9tID8gc2VjLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApICkgfHwgMTtcclxuXHJcblx0XHRcdGxldCBkID0gMS4wIC0gKCBhIC8gYiApO1xyXG5cdFx0XHRkID0gTWF0aC5tYXgoIDAuMCwgZCApO1xyXG5cclxuXHRcdFx0c3VtICs9IGQ7XHJcblxyXG5cdFx0XHRpZiAoIGQgPCAxLjAgKSBicmVhaztcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN1bSAvIHRoaXMuc2VjdGlvbnMubGVuZ3RoO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGQoIHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24gKSB7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucy5wdXNoKCBzZWN0aW9uICk7XHJcblxyXG5cdFx0dGhpcy5zb3J0U2VjdGlvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gc2VjdGlvbjtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc29ydFNlY3Rpb25zKCkge1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMuc29ydCggKCBhOiBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBiOiBQYWdlU2Nyb2xsZXJTZWN0aW9uICk6IG51bWJlciA9PiB7XHJcblxyXG5cdFx0XHRyZXR1cm4gYS5yZWN0LnkgPiBiLnJlY3QueSA/IDEgOiAtIDE7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZWN0aW9uc1sgaSBdLnRpbWVsaW5lUGVyY2VudGFnZSA9ICggaSArIDEgKSAvIHRoaXMuc2VjdGlvbnMubGVuZ3RoO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0KCBuYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuc2VjdGlvbnNbIGkgXS5uYW1lID09IG5hbWUgKSByZXR1cm4gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLndhcm4oICdzZWN0aW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbm90IGV4aXN0LicgKTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVBhcmVudEVsZW1lbnQoKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVNjcm9sbFBvcyggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0dGhpcy5hcHBseVBhcmVudEVsZW1lbnRUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHR0aGlzLnN1bURlbHRhID0gMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCB1cGRhdGVTY3JvbGxQb3MoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlQXV0b01vdmUoIGRlbHRhVGltZSApO1xyXG5cclxuXHRcdHRoaXMuYWRkU2Nyb2xsUG9zKCk7XHJcblxyXG5cdFx0dGhpcy5jYWxjU2Nyb2xsUHJvcGVydGllcyggZGVsdGFUaW1lICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZUF1dG9Nb3ZlKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yLnVwZGF0ZSggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRsZXQgcG9zID0gdGhpcy5hbmltYXRvci5nZXQ8bnVtYmVyPiggJ3Njcm9sbFBvcycgKTtcclxuXHJcblx0XHRcdGlmICggcG9zICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnN1bURlbHRhID0gcG9zIC0gdGhpcy5zY3JvbGxQb3M7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhZGRTY3JvbGxQb3MoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmNoZWNrVW5sb2NrU3RvcFNjcm9sbCggdGhpcy5zdW1EZWx0YSApICkge1xyXG5cclxuXHRcdFx0bGV0IHN0b3BQb3MgPSB0aGlzLmNoZWNrVGhyb3coIHRoaXMuc3VtRGVsdGEgKTtcclxuXHJcblx0XHRcdGlmICggc3RvcFBvcyAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5fc2Nyb2xsUG9zID0gc3RvcFBvcztcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3Njcm9sbFBvcyArPSB0aGlzLnN1bURlbHRhO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2Nyb2xsUG9zID0gTWF0aC5tYXgoIE1hdGgubWluKCB0aGlzLl9zY3JvbGxQb3MsIHRoaXMucGFyZW50RWxlbWVudEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCApLCAwICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1VubG9ja1N0b3BTY3JvbGwoIHNjcm9sbERlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IHVubG9ja0RpcjogbnVtYmVyID0gMDtcclxuXHRcdGxldCB1bmxvY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdGxldCBkaXN0YW5jZSA9IHRoaXMuc2Nyb2xsUG9zIC0gdGhpcy5zY3JvbGxQb3NEZWxheTtcclxuXHJcblx0XHRcdGlmICggc2Nyb2xsRGVsdGEgKiBkaXN0YW5jZSA8IDAgfHwgTWF0aC5hYnMoIGRpc3RhbmNlICkgPCAxMC4wIHx8IHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdFx0aWYgKCBzY3JvbGxEZWx0YSA8IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCAtIHNjcm9sbERlbHRhID4gKCB0aGlzLmNhdWdodFNlY3Rpb24uc3RhcnRTY3JvbGxVcCB8fCAwICkgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gLSAxO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmICggc2Nyb2xsRGVsdGEgPiAwICkge1xyXG5cclxuXHRcdFx0XHRcdGlmICggc2Nyb2xsRGVsdGEgPiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5zdGFydFNjcm9sbERvd24gfHwgMCApIHx8IHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IDE7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHVubG9ja0RpciAhPSAwICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsICkge1xyXG5cclxuXHRcdFx0XHRcdGxldCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgPSB7XHJcblx0XHRcdFx0XHRcdHNjcm9sbGVyOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHRzZWN0aW9uOiB0aGlzLmNhdWdodFNlY3Rpb24sXHJcblx0XHRcdFx0XHRcdHNjcm9sbE1vZGU6IHRoaXMuaXNBdXRvTW92ZSA/ICdhdXRvJyA6ICdtYW51YWwnLFxyXG5cdFx0XHRcdFx0XHRzY3JvbGxEZWx0YTogc2Nyb2xsRGVsdGEsXHJcblx0XHRcdFx0XHRcdHNjcm9sbFBvd2VyOiBNYXRoLmFicyggc2Nyb2xsRGVsdGEgKSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0bGV0IHVubG9jazogYm9vbGVhbiB8IHZvaWQ7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGNvbW1vblVubG9jayA9IHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5jb21tb24gJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmNvbW1vbiggYXJncyApO1xyXG5cdFx0XHRcdFx0aWYgKCB1bmxvY2tEaXIgPT0gLSAxICkgdW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLnVwICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC51cCggYXJncyApO1xyXG5cdFx0XHRcdFx0aWYgKCB1bmxvY2tEaXIgPT0gMSApIHVubG9jayA9IHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5kb3duICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5kb3duKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBjb21tb25VbmxvY2sgPT09IGZhbHNlIHx8IHVubG9jayA9PT0gZmFsc2UgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAwO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dW5sb2NrID0gdW5sb2NrRGlyICE9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHVubG9jayA9IHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdW5sb2NrRGlyICkge1xyXG5cclxuXHRcdFx0dGhpcy5jYXVnaHRTZWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVubG9jaztcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvdyggc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBzZWMgPSB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0XHRzZWMudXBkYXRlUmVjdCggdGhpcy5fc2Nyb2xsUG9zICk7XHJcblxyXG5cdFx0XHRsZXQgc3RvcFBvcyA9IHRoaXMuY2hlY2tUaHJvd1NlY3Rpb25FdmVudHMoIHNlYywgc2Nyb2xsRGVsdGEgKTtcclxuXHJcblx0XHRcdGlmICggc3RvcFBvcyAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5jYXVnaHRTZWN0aW9uID0gc2VjO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0F1dG9Nb3ZlID8gbnVsbCA6IHN0b3BQb3M7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93U2VjdGlvbkV2ZW50cyggc2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiwgc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgcGVyY2VudGFnZSA9IHNlY3Rpb24uZ2V0U2Nyb2xsUGVyY2VudGFnZSgpO1xyXG5cdFx0bGV0IG1vdmVkUGVyY2VudGFnZSA9IHNlY3Rpb24uZ2V0U2Nyb2xsUGVyY2VudGFnZSggc2Nyb2xsRGVsdGEgKTtcclxuXHJcblx0XHRpZiAoIHNlY3Rpb24uZXZlbnRzICkge1xyXG5cclxuXHRcdFx0bGV0IGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyA9IHtcclxuXHRcdFx0XHRzY3JvbGxlcjogdGhpcyxcclxuXHRcdFx0XHRzZWN0aW9uOiBzZWN0aW9uLFxyXG5cdFx0XHRcdHNjcm9sbE1vZGU6IHRoaXMuaXNBdXRvTW92ZSA/ICdhdXRvJyA6ICdtYW51YWwnLFxyXG5cdFx0XHRcdHNjcm9sbERlbHRhOiBzY3JvbGxEZWx0YSxcclxuXHRcdFx0XHRzY3JvbGxQb3dlcjogTWF0aC5hYnMoIHNjcm9sbERlbHRhICksXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoIHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHMgKSB7XHJcblxyXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0XHRcdGxldCBhcnJpdmFsRXZlbnQgPSBzZWN0aW9uLmV2ZW50cy5vbkFycml2YWxzWyBpIF07XHJcblxyXG5cdFx0XHRcdFx0bGV0IGlzVGhyb3cgPSB0aGlzLmNoZWNrVGhyb3dMaW5lKCBwZXJjZW50YWdlLCBtb3ZlZFBlcmNlbnRhZ2UsIGFycml2YWxFdmVudC5wZXJjZW50YWdlICk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBpc1Rocm93ICE9IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRhcnJpdmFsRXZlbnQuZXZlbnQuY29tbW9uICYmIGFycml2YWxFdmVudC5ldmVudC5jb21tb24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICggaXNUaHJvdyA8IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC51cCAmJiBhcnJpdmFsRXZlbnQuZXZlbnQudXAoIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC5kb3duICYmIGFycml2YWxFdmVudC5ldmVudC5kb3duKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggc2VjdGlvbi5zdG9wICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmNoZWNrVGhyb3dMaW5lKCBwZXJjZW50YWdlLCBtb3ZlZFBlcmNlbnRhZ2UsIDEgKSApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5kcmFnVW5sb2NrUmVhZHkgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHNlY3Rpb24uZWxlbWVudC5vZmZzZXRUb3AgKyAoIHNlY3Rpb24uYm90dG9tID8gc2VjdGlvbi5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3dMaW5lKCBhOiBudW1iZXIsIGIgOm51bWJlciwgbGluZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggYSA8IGxpbmUgJiYgbGluZSA8PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIDE7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggYSA+IGxpbmUgJiYgbGluZSA+PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0gMTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBhID09IGxpbmUgJiYgbGluZSA9PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIDI7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsY1Njcm9sbFByb3BlcnRpZXMoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBvc0RlbGF5ICs9ICggdGhpcy5fc2Nyb2xsUG9zIC0gdGhpcy5fc2Nyb2xsUG9zRGVsYXkgKSAqICggdGhpcy5pc1RvdWNoaW5nICYmICEgdGhpcy5jYXVnaHRTZWN0aW9uID8gdGhpcy5kcmFnRGVsYXlTcGVlZCA6IHRoaXMuZGVsYXlTcGVlZCApICogTWF0aC5taW4oIDEuMCwgZGVsdGFUaW1lICogNjAgKTtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQZXJjZW50YWdlID0gdGhpcy5zY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHRoaXMuc2Nyb2xsUG9zICk7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUGVyY2VudGFnZURlbGF5ID0gdGhpcy5zY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHRoaXMuc2Nyb2xsUG9zRGVsYXkgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsUG9zVG9QZXJlY250YWdlKCBzY3JvbGxQb3M6IG51bWJlciApIHtcclxuXHJcblx0XHRyZXR1cm4gc2Nyb2xsUG9zIC8gKCB0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZVBhcmVudEVsZW1lbnQoKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0ID0gdGhpcy5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYXBwbHlQYXJlbnRFbGVtZW50VHJhbnNmb3JtKCkge1xyXG5cclxuXHRcdHRoaXMucGFyZW50RWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoIDAsJyArIC0gdGhpcy5zY3JvbGxQb3NEZWxheS50b1N0cmluZygpICsgJ3B4LCAwICknO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzY3JvbGwoIGRlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5kZWx0YU1lbSA9ICggdGhpcy5kZWx0YU1lbSArIGRlbHRhICkgLyAyO1xyXG5cdFx0dGhpcy5zdW1EZWx0YSArPSBkZWx0YTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2F0Y2goKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmlzQXV0b01vdmUgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuZGVsdGFNZW0gPSAwO1xyXG5cclxuXHRcdGlmICggISB0aGlzLmNhdWdodFNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSB0aGlzLl9zY3JvbGxQb3NEZWxheTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGRyYWcoIGRlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuaXNUb3VjaGluZyApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLnNjcm9sbCggZGVsdGEgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVsZWFzZSggc25hcDogbnVtYmVyID0gMTAuMCApIHtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5pc1RvdWNoaW5nICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICggISB0aGlzLmNhdWdodFNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNjcm9sbCggdGhpcy5kZWx0YU1lbSAqIHNuYXAgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGF1dG9Nb3ZlKCBwYXJhbTogUGFnZVNjcm9sbGVyQXV0b01vdmVQYXJhbSApIHtcclxuXHJcblx0XHRsZXQgdGFyZ2V0UG9zOiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdGlmICggKCBwYXJhbS50YXJnZXQgYXMgUGFnZVNjcm9sbGVyU2VjdGlvbiApLmlzUGFnZVNjcm9sbGVyU2VjdGlvbiApIHtcclxuXHJcblx0XHRcdGxldCB0YXJnZXQgPSBwYXJhbS50YXJnZXQgYXMgUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRcdFx0bGV0IGJvdHRvbU9mZnNldCA9IHBhcmFtLmJvdHRvbSA/IHRhcmdldC5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDA7XHJcblxyXG5cdFx0XHR0YXJnZXRQb3MgPSB0YXJnZXQuZWxlbWVudC5vZmZzZXRUb3AgKyBib3R0b21PZmZzZXQ7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHBhcmFtLnRhcmdldCA9PSAnc3RyaW5nJyApIHtcclxuXHJcblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLmdldCggcGFyYW0udGFyZ2V0ICk7XHJcblxyXG5cdFx0XHRpZiAoIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0bGV0IGJvdHRvbU9mZnNldCA9IHBhcmFtLmJvdHRvbSA/IHRhcmdldC5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDA7XHJcblxyXG5cdFx0XHRcdHRhcmdldFBvcyA9IHRhcmdldC5lbGVtZW50Lm9mZnNldFRvcCArIGJvdHRvbU9mZnNldDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgcGFyYW0udGFyZ2V0ID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0UG9zID0gcGFyYW0udGFyZ2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yLnNldFZhbHVlKCAnc2Nyb2xsUG9zJywgdGhpcy5fc2Nyb2xsUG9zICk7XHJcblx0XHR0aGlzLmFuaW1hdG9yLmFuaW1hdGUoICdzY3JvbGxQb3MnLCB0YXJnZXRQb3MsIHBhcmFtLmR1cmF0aW9uLCAoKSA9PiB7XHJcblxyXG5cdFx0XHRpZiAoIHBhcmFtLmNhbGxCYWNrICkgcGFyYW0uY2FsbEJhY2soKTtcclxuXHJcblx0XHRcdHRoaXMuaXNBdXRvTW92ZSA9IGZhbHNlO1xyXG5cclxuXHRcdH0sIHBhcmFtLmVhc2luZyApO1xyXG5cclxuXHRcdC8vb25TdGFydFNjcm9sbOWGheOBp0F1dG9Nb3Zl44GX44Gf44Go44GN44CB54Sh6ZmQ44Or44O844OX44Gr6Zml44KL44Gu44KS6Zi75q2iXHJcblx0XHR0aGlzLnN1bURlbHRhID0gKCB0YXJnZXRQb3MgLSB0aGlzLnN1bURlbHRhICkgLyBNYXRoLmFicyggdGFyZ2V0UG9zIC0gdGhpcy5zdW1EZWx0YSApICogMC4wMDAwMTtcclxuXHJcblx0XHR0aGlzLmlzQXV0b01vdmUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgY2xhc3MgUG9pbnRlciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHJvdGVjdGVkIGlzU1A6IGJvb2xlYW47XG5cdHByb3RlY3RlZCBpc1RvdWNoaW5nOiBib29sZWFuO1xuXG5cdHB1YmxpYyBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0cHVibGljIGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMucG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmRlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoIE5hTiwgTmFOICk7XG5cblx0XHRjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdHRoaXMuaXNTUCA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdBbmRyb2lkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG5cdFx0dGhpcy5wb3NpdGlvbi5zZXQoIE5hTiwgTmFOICk7XG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XG5cblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlckVsZW1lbnQoIGVsbTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHRjb25zdCBvblRvdWNoU3RhcnQgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJzdGFydFwiICk7XG5cdFx0Y29uc3Qgb25Ub3VjaE1vdmUgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJtb3ZlXCIgKTtcblx0XHRjb25zdCBvblRvdWNFbmQgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlckRvd24gPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJNb3ZlID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJtb3ZlXCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJVcCA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwiZW5kXCIgKTtcblx0XHRjb25zdCBvbldoZWVsID0gdGhpcy53aGVlbC5iaW5kKCB0aGlzICk7XG5cblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNFbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwiZHJhZ2VuZFwiLCBvblBvaW50ZXJVcCApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCBcIndoZWVsXCIsIG9uV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG5cdFx0Y29uc3Qgb25VblJlZ2lzdGVyID0gKCBlOiBhbnkgKSA9PiB7XG5cblx0XHRcdGlmICggZWxtLmlzRXF1YWxOb2RlKCBlLmVsbSApICkge1xuXG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNFbmQgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBvblBvaW50ZXJVcCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJkcmFnZW5kXCIsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcIndoZWVsXCIsIG9uV2hlZWwgKTtcblxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd1bnJlZ2lzdGVyJywgb25VblJlZ2lzdGVyICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd1bnJlZ2lzdGVyJywgb25VblJlZ2lzdGVyICk7XG5cblx0fVxuXG5cdHB1YmxpYyB1bnJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VucmVnaXN0ZXInLFxuXHRcdFx0ZWxtOiBlbG0sXG5cdFx0fSApO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0U2NyZWVuUG9zaXRpb24oIHdpbmRvd1NpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHRpZiAoIHRoaXMucG9zaXRpb24ueCAhPSB0aGlzLnBvc2l0aW9uLnggKSByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIoIE5hTiwgTmFOICk7XG5cblx0XHRjb25zdCBwID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpXG5cdFx0XHQuZGl2aWRlKCB3aW5kb3dTaXplIClcblx0XHRcdC5tdWx0aXBseVNjYWxhciggMi4wIClcblx0XHRcdC5zdWJTY2FsYXIoIDEuMCApO1xuXHRcdHAueSAqPSAtIDE7XG5cblx0XHRyZXR1cm4gcDtcblxuXHR9XG5cblx0cHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24oIGVsbTogSFRNTEVsZW1lbnQsIHNjcmVlbj86IGJvb2xlYW4gKSB7XG5cblx0XHRjb25zdCByZWN0OiBET01SZWN0ID0gZWxtLmdldENsaWVudFJlY3RzKClbIDAgXSBhcyBET01SZWN0O1xuXG5cdFx0bGV0IHggPSB0aGlzLnBvc2l0aW9uLnggLSByZWN0LmxlZnQ7XG5cdFx0bGV0IHkgPSB0aGlzLnBvc2l0aW9uLnkgLSByZWN0LnRvcDtcblxuXHRcdGlmICggc2NyZWVuICkge1xuXG5cdFx0XHR4IC89IHJlY3Qud2lkdGg7XG5cdFx0XHR5IC89IHJlY3QuaGVpZ2h0O1xuXG5cdFx0fVxuXG5cdFx0Y29uc3QgcCA9IG5ldyBUSFJFRS5WZWN0b3IyKCB4LCB5ICk7XG5cblx0XHRyZXR1cm4gcDtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHNldFBvcyggeDogbnVtYmVyLCB5OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLnBvc2l0aW9uLnggIT09IHRoaXMucG9zaXRpb24ueCB8fFxuXHRcdFx0dGhpcy5wb3NpdGlvbi55ICE9PSB0aGlzLnBvc2l0aW9uLnlcblx0XHQpIHtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIDAsIDAgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCB4IC0gdGhpcy5wb3NpdGlvbi54LCB5IC0gdGhpcy5wb3NpdGlvbi55ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggeCwgeSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Ub3VjaCggdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50ICkge1xuXG5cdFx0Y29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbIDAgXTtcblxuXHRcdGlmICggdG91Y2ggKSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIHRvdWNoLnBhZ2VYLCB0b3VjaC5wYWdlWSwgdHlwZSwgZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCB0eXBlID09ICdlbmQnICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIE5hTiwgTmFOLCB0eXBlLCBlICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uUG9pbnRlciggdHlwZTogc3RyaW5nLCBlOiBQb2ludGVyRXZlbnQgfCBEcmFnRXZlbnQgKSB7XG5cblx0XHRjb25zdCBwb2ludGVyVHlwZSA9ICggZSBhcyBQb2ludGVyRXZlbnQgKS5wb2ludGVyVHlwZTtcblxuXHRcdGlmICggcG9pbnRlclR5cGUgIT0gbnVsbCApIHtcblxuXHRcdFx0aWYgKCBwb2ludGVyVHlwZSA9PSAnbW91c2UnICYmICggZS5idXR0b24gPT0gLSAxIHx8IGUuYnV0dG9uID09IDAgKSApIHtcblxuXHRcdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlIGFzIFBvaW50ZXJFdmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0b3VjaEV2ZW50SGFuZGxlciggcG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIsIHR5cGU6IHN0cmluZywgZTogVG91Y2hFdmVudCB8IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGxldCBkaXNwYXRjaCA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgeCA9IHBvc1ggLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHBvc1kgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRpZiAoIHR5cGUgPT0gXCJzdGFydFwiICkge1xuXG5cdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9IGVsc2UgaWYgKCB0eXBlID09IFwibW92ZVwiICkge1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHRpZiAoIHRoaXMuaXNUb3VjaGluZyApIHtcblxuXHRcdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJlbmRcIiApIHtcblxuXHRcdFx0aWYgKCAndGFyZ2V0VG91Y2hlcycgaW4gZSApIHtcblxuXHRcdFx0XHRpZiAoIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRpZiAoIGRpc3BhdGNoICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogZSxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogdHlwZSxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0aWYgKCAhIHRoaXMuaXNTUCApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICd1cGRhdGUnLFxuXHRcdFx0XHRwb2ludGVyRXZlbnQ6IG51bGwsXG5cdFx0XHRcdHBvaW50ZXJFdmVudFR5cGU6ICdob3ZlcicsXG5cdFx0XHRcdHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHRcdGRlbHRhOiB0aGlzLmRlbHRhLmNsb25lKClcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRyYWNrcGFkTWVtRGVsdGEgPSAwO1xuXHRwcm90ZWN0ZWQgdHJhY2twYWRNYXggPSBmYWxzZTtcblxuXHRwcm90ZWN0ZWQgd2hlZWwoIGU6IFdoZWVsRXZlbnQgKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICd3aGVlbCcsXG5cdFx0XHR3aGVlbEV2ZW50OiBlLFxuXHRcdH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHBhc3NUaHJvd1ZlcnQgZnJvbSAnLi9zaGFkZXJzL3Bhc3NUaHJvdy52cyc7XG5cbnR5cGUgSW5wdXRSZW5kZXJUYXJnZXQgPSB7IFtrZXk6c3RyaW5nXTogVEhSRUUuVGV4dHVyZSB8IFRIUkVFLlRleHR1cmVbXSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBQUGFyYW0gZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnN7XG5cdGlucHV0UmVuZGVyVGFyZ2V0cz86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgUG9zdFByb2Nlc3Npbmcge1xuXG5cdHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cdHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwcml2YXRlIGNhbWVyYTogVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhO1xuXHRwcml2YXRlIHNjcmVlbjogVEhSRUUuTWVzaDtcblxuXHRwdWJsaWMgZWZmZWN0OiB7XG5cdFx0bWF0ZXJpYWw6IFRIUkVFLlNoYWRlck1hdGVyaWFsLFxuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgcHBQYXJhbTogUFBQYXJhbSwgY3VzdG9tR2VvbWV0cnk/OiBUSFJFRS5CdWZmZXJHZW9tZXRyeSApIHtcblxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wICk7XG5cblx0XHR0aGlzLnNjcmVlbiA9IG5ldyBUSFJFRS5NZXNoKCBjdXN0b21HZW9tZXRyeSB8fCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApICk7XG5cdFx0dGhpcy5zY2VuZS5hZGQoIHRoaXMuc2NyZWVuICk7XG5cblx0XHRwcFBhcmFtLnZlcnRleFNoYWRlciA9IHBwUGFyYW0udmVydGV4U2hhZGVyIHx8IHBhc3NUaHJvd1ZlcnQ7XG5cdFx0cHBQYXJhbS51bmlmb3JtcyA9IHBwUGFyYW0udW5pZm9ybXMgfHwge307XG5cdFx0cHBQYXJhbS51bmlmb3Jtcy5yZXNvbHV0aW9uID0ge1xuXHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHR9O1xuXG5cdFx0dGhpcy5lZmZlY3QgPSB7XG5cdFx0XHRtYXRlcmlhbDogbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwcFBhcmFtICksXG5cdFx0fTtcblxuXHR9XG5cblx0cHVibGljIHJlbmRlciggaW5wdXRSZW5kZXJUYXJnZXRzOiBJbnB1dFJlbmRlclRhcmdldCB8IG51bGwsIHJlbmRlclRhcmdldDogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQgfCBudWxsID0gbnVsbCApIHtcblxuXHRcdGxldCByZW5kZXJUYXJnZXRNZW0gPSB0aGlzLnJlbmRlcmVyLmdldFJlbmRlclRhcmdldCgpO1xuXG5cdFx0bGV0IGVmZmVjdCA9IHRoaXMuZWZmZWN0O1xuXHRcdGxldCBtYXRlcmlhbCA9IGVmZmVjdC5tYXRlcmlhbDtcblx0XHRsZXQgdW5pZm9ybXMgPSBtYXRlcmlhbC51bmlmb3JtcztcblxuXHRcdGlmICggaW5wdXRSZW5kZXJUYXJnZXRzICkge1xuXG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCBpbnB1dFJlbmRlclRhcmdldHMgKTtcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7IGogKysgKSB7XG5cblx0XHRcdFx0aWYgKCB1bmlmb3Jtc1sga2V5c1sgaiBdIF0gKSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0udmFsdWUgPSBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0gPSB7IHZhbHVlOiBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdIH07XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0ZWZmZWN0Lm1hdGVyaWFsLnVuaWZvcm1zID0gdW5pZm9ybXM7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0dW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZS5zZXQoIHJlbmRlclRhcmdldC53aWR0aCwgcmVuZGVyVGFyZ2V0LmhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5yZW5kZXJlci5nZXRTaXplKCB1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnNjcmVlbi5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0TWVtICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMgfSBmcm9tICcuL0Vhc2luZ3MnO1xyXG5pbXBvcnQgeyBMZXJwcywgTGVycEZ1bmMgfSBmcm9tICcuL0xlcnBzJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8VD4ge1xyXG5cdHRpbWU6IG51bWJlcjtcclxuXHR2YWx1ZTogVDtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPFQ+IHtcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XHJcblx0dmFsdWU6IFQ7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JBZGRQYXJhbXM8VD4ge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGN1c3RvbUxlcnA/OiBMZXJwRnVuYzxUPixcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUFuaW1hdG9yIHtcclxuXHJcblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbbmFtZTogc3RyaW5nXTogVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPGFueT4gfSA9IHt9O1xyXG5cdHByb3RlY3RlZCB0aW1lOiBudW1iZXI7XHJcblx0cHVibGljIGRlZmF1bHRFYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkPFQ+KCBwYXJhbXM6IFRpbWVsaW5lQW5pbWF0b3JBZGRQYXJhbXM8VD4gKSB7XHJcblxyXG5cdFx0aWYgKCBwYXJhbXMua2V5ZnJhbWVzLmxlbmd0aCA9PSAwICkge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgcGFyYW1zLm5hbWUgKyAnXCInLCAnS2V5ZnJhbWUgbGVuZ3RoIGlzIDAhIScgKTtcclxuXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0gPSB7XHJcblx0XHRcdGtleWZyYW1lczogcGFyYW1zLmtleWZyYW1lcyxcclxuXHRcdFx0bGVycEZ1bmM6IHBhcmFtcy5jdXN0b21MZXJwLFxyXG5cdFx0XHRlYXNpbmc6IHBhcmFtcy5lYXNpbmcsXHJcblx0XHRcdHZhbHVlOiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmtleWZyYW1lcy5zb3J0KCAoIGEsIGIgKSA9PiB7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCBhLnRpbWUgPCBiLnRpbWUgKSA/IC0gMSA6IDE7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdGlmICggISB0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXS5sZXJwRnVuYyApIHtcclxuXHJcblx0XHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmxlcnBGdW5jID0gTGVycHMuZ2V0TGVycEZ1bmMoIHBhcmFtcy5rZXlmcmFtZXNbIDAgXS52YWx1ZSApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmNhbGMoKTtcclxuXHJcblx0XHRyZXR1cm4gcGFyYW1zLm5hbWU7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldDxUPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS52YWx1ZTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFyaWFibGVPYmplY3Q8VD4oIG5hbWU6IHN0cmluZyApOiBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8VD4gfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gdGltZTtcclxuXHJcblx0XHR0aGlzLmNhbGMoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsYygpIHtcclxuXHJcblx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLnZhcmlhYmxlcyApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHZhbGlhYmxlID0gdGhpcy52YXJpYWJsZXNbIGtleXNbIGkgXSBdO1xyXG5cdFx0XHRsZXQga2ZzID0gdmFsaWFibGUua2V5ZnJhbWVzO1xyXG5cclxuXHRcdFx0bGV0IGE6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblx0XHRcdGxldCBiOiBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8YW55PiB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRcdFx0bGV0IHQgPSBNYXRoLm1heCgga2ZzWyAwIF0udGltZSwgTWF0aC5taW4oIGtmc1sga2ZzLmxlbmd0aCAtIDEgXS50aW1lLCB0aGlzLnRpbWUgKSApO1xyXG5cclxuXHRcdFx0bGV0IGVhc2luZzogRWFzaW5nRnVuYyB8IG51bGwgfCB1bmRlZmluZWQgPSBudWxsO1xyXG5cclxuXHRcdFx0aWYgKCBrZnMubGVuZ3RoID09IDEgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSBrZnNbIDAgXS50aW1lO1xyXG5cdFx0XHRcdGEgPSBiID0ga2ZzWyAwIF07XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHJcblx0XHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwga2ZzLmxlbmd0aCAtIDE7IGogKysgKSB7XHJcblxyXG5cdFx0XHRcdFx0YSA9IGtmc1sgaiBdO1xyXG5cdFx0XHRcdFx0YiA9IGtmc1sgaiArIDEgXTtcclxuXHJcblx0XHRcdFx0XHRlYXNpbmcgPSBhLmVhc2luZztcclxuXHJcblx0XHRcdFx0XHRpZiAoIGEudGltZSA8PSB0ICYmIHQgPD0gYi50aW1lICkgYnJlYWs7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKCBhICE9IG51bGwgJiYgYiAhPSBudWxsICkge1xyXG5cclxuXHRcdFx0XHRcdHQgPSAoIHQgLSBhLnRpbWUgKSAvICggYi50aW1lIC0gYS50aW1lICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggZWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gZWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCB2YWxpYWJsZS5lYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSB2YWxpYWJsZS5lYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHRoaXMuZGVmYXVsdEVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IHRoaXMuZGVmYXVsdEVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB2YWxpYWJsZS5sZXJwRnVuYyApIHtcclxuXHJcblx0XHRcdFx0aWYgKCBhICE9IG51bGwgJiYgYiAhPSBudWxsICkge1xyXG5cclxuXHRcdFx0XHRcdHZhbGlhYmxlLnZhbHVlID0gdmFsaWFibGUubGVycEZ1bmMoIGEudmFsdWUsIGIudmFsdWUsIHQgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHJcblx0XHRcdFx0aWYgKCB2YWxpYWJsZS52YWx1ZSA9PT0gZmFsc2UgKSB7XHJcblxyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coICdlcnJvciBhdCAnICsgJ1wiJyArIGtleXNbIGkgXSArICdcIicgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsga2V5c1sgaSBdICsgJ1wiJywgJ2xlcnAgZnVuY3Rpb24gaXMgbm90IHNldC4nICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFVuaWZvcm1zeyBbIGtleTogc3RyaW5nIF0gOiBUSFJFRS5JVW5pZm9ybSB9XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIFVuaWZvcm1zTGliIHtcclxuXHJcblx0ZXhwb3J0IGZ1bmN0aW9uIG1lcmdlVW5pZm9ybXMoIC4uLnVuaWZvcm1zOiAoIFVuaWZvcm1zfHVuZGVmaW5lZCApW10gKSA6IFVuaWZvcm1zIHtcclxuXHJcblx0XHRsZXQgcmVzID0ge307XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdW5pZm9ybXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB1bmlmb3Jtc1sgaSBdICE9IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdFx0T2JqZWN0LmFzc2lnbiggcmVzLCB1bmlmb3Jtc1sgaSBdICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiByZXM7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFdhaXRNYW4gZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnb0hvbWUoKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdnb2hvbWUnIH0gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgd2FpdCggdGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPiggKCByZXNvbHZlLCByZWplY3QgKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zdCBvbkdvSG9tZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdFx0cmVqZWN0KCk7XHJcblxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2dvaG9tZScsIG9uR29Ib21lICk7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdHNldFRpbWVvdXQoICgpID0+IHtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdFx0cmVzb2x2ZSgpO1xyXG5cclxuXHRcdFx0fSwgdGltZSAqIDEwMDAuMCApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCIvKiFcbiAqIEV2ZW50RW1pdHRlciB2NS4yLjkgLSBnaXQuaW8vZWVcbiAqIFVubGljZW5zZSAtIGh0dHA6Ly91bmxpY2Vuc2Uub3JnL1xuICogT2xpdmVyIENhbGR3ZWxsIC0gaHR0cHM6Ly9vbGkubWUudWsvXG4gKiBAcHJlc2VydmVcbiAqL1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgZm9yIG1hbmFnaW5nIGV2ZW50cy5cbiAgICAgKiBDYW4gYmUgZXh0ZW5kZWQgdG8gcHJvdmlkZSBldmVudCBmdW5jdGlvbmFsaXR5IGluIG90aGVyIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRFbWl0dGVyIE1hbmFnZXMgZXZlbnQgcmVnaXN0ZXJpbmcgYW5kIGVtaXR0aW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuICAgIHZhciBwcm90byA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG4gICAgdmFyIG9yaWdpbmFsR2xvYmFsVmFsdWUgPSBleHBvcnRzLkV2ZW50RW1pdHRlcjtcblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBpbmRleCBvZiB0aGUgbGlzdGVuZXIgZm9yIHRoZSBldmVudCBpbiBpdHMgc3RvcmFnZSBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gbGlzdGVuZXJzIEFycmF5IG9mIGxpc3RlbmVycyB0byBzZWFyY2ggdGhyb3VnaC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBJbmRleCBvZiB0aGUgc3BlY2lmaWVkIGxpc3RlbmVyLCAtMSBpZiBub3QgZm91bmRcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWxpYXMgYSBtZXRob2Qgd2hpbGUga2VlcGluZyB0aGUgY29udGV4dCBjb3JyZWN0LCB0byBhbGxvdyBmb3Igb3ZlcndyaXRpbmcgb2YgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB0YXJnZXQgbWV0aG9kLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgYWxpYXNlZCBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBhbGlhcyhuYW1lKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBhbGlhc0Nsb3N1cmUoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxpc3RlbmVyIGFycmF5IGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdpbGwgaW5pdGlhbGlzZSB0aGUgZXZlbnQgb2JqZWN0IGFuZCBsaXN0ZW5lciBhcnJheXMgaWYgcmVxdWlyZWQuXG4gICAgICogV2lsbCByZXR1cm4gYW4gb2JqZWN0IGlmIHlvdSB1c2UgYSByZWdleCBzZWFyY2guIFRoZSBvYmplY3QgY29udGFpbnMga2V5cyBmb3IgZWFjaCBtYXRjaGVkIGV2ZW50LiBTbyAvYmFbcnpdLyBtaWdodCByZXR1cm4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgYmFyIGFuZCBiYXouIEJ1dCBvbmx5IGlmIHlvdSBoYXZlIGVpdGhlciBkZWZpbmVkIHRoZW0gd2l0aCBkZWZpbmVFdmVudCBvciBhZGRlZCBzb21lIGxpc3RlbmVycyB0byB0aGVtLlxuICAgICAqIEVhY2ggcHJvcGVydHkgaW4gdGhlIG9iamVjdCByZXNwb25zZSBpcyBhbiBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW118T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciB0aGUgZXZlbnQuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzKGV2dCkge1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZXR1cm4gYSBjb25jYXRlbmF0ZWQgYXJyYXkgb2YgYWxsIG1hdGNoaW5nIGV2ZW50cyBpZlxuICAgICAgICAvLyB0aGUgc2VsZWN0b3IgaXMgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gICAgICAgIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZVtrZXldID0gZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSBldmVudHNbZXZ0XSB8fCAoZXZlbnRzW2V2dF0gPSBbXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgbGlzdCBvZiBsaXN0ZW5lciBvYmplY3RzIGFuZCBmbGF0dGVucyBpdCBpbnRvIGEgbGlzdCBvZiBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBsaXN0ZW5lcnMgUmF3IGxpc3RlbmVyIG9iamVjdHMuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXX0gSnVzdCB0aGUgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqL1xuICAgIHByb3RvLmZsYXR0ZW5MaXN0ZW5lcnMgPSBmdW5jdGlvbiBmbGF0dGVuTGlzdGVuZXJzKGxpc3RlbmVycykge1xuICAgICAgICB2YXIgZmxhdExpc3RlbmVycyA9IFtdO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmbGF0TGlzdGVuZXJzLnB1c2gobGlzdGVuZXJzW2ldLmxpc3RlbmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmbGF0TGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSByZXF1ZXN0ZWQgbGlzdGVuZXJzIHZpYSBnZXRMaXN0ZW5lcnMgYnV0IHdpbGwgYWx3YXlzIHJldHVybiB0aGUgcmVzdWx0cyBpbnNpZGUgYW4gb2JqZWN0LiBUaGlzIGlzIG1haW5seSBmb3IgaW50ZXJuYWwgdXNlIGJ1dCBvdGhlcnMgbWF5IGZpbmQgaXQgdXNlZnVsLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIGFuIGV2ZW50IGluIGFuIG9iamVjdC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnNBc09iamVjdCA9IGZ1bmN0aW9uIGdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCkge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIHJlc3BvbnNlW2V2dF0gPSBsaXN0ZW5lcnM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzcG9uc2UgfHwgbGlzdGVuZXJzO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc1ZhbGlkTGlzdGVuZXIgKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgbGlzdGVuZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXIgJiYgdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lci5saXN0ZW5lcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogVGhlIGxpc3RlbmVyIHdpbGwgbm90IGJlIGFkZGVkIGlmIGl0IGlzIGEgZHVwbGljYXRlLlxuICAgICAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIElmIHlvdSBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lIHRoZW4gdGhlIGxpc3RlbmVyIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCFpc1ZhbGlkTGlzdGVuZXIobGlzdGVuZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcklzV3JhcHBlZCA9IHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCc7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkgJiYgaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0ucHVzaChsaXN0ZW5lcklzV3JhcHBlZCA/IGxpc3RlbmVyIDoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICAgICAgICAgIG9uY2U6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vbiA9IGFsaWFzKCdhZGRMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogU2VtaS1hbGlhcyBvZiBhZGRMaXN0ZW5lci4gSXQgd2lsbCBhZGQgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmVcbiAgICAgKiBhdXRvbWF0aWNhbGx5IHJlbW92ZWQgYWZ0ZXIgaXRzIGZpcnN0IGV4ZWN1dGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG8uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkT25jZUxpc3RlbmVyID0gZnVuY3Rpb24gYWRkT25jZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkTGlzdGVuZXIoZXZ0LCB7XG4gICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICBvbmNlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRPbmNlTGlzdGVuZXIuXG4gICAgICovXG4gICAgcHJvdG8ub25jZSA9IGFsaWFzKCdhZGRPbmNlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYW4gZXZlbnQgbmFtZS4gVGhpcyBpcyByZXF1aXJlZCBpZiB5b3Ugd2FudCB0byB1c2UgYSByZWdleCB0byBhZGQgYSBsaXN0ZW5lciB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gSWYgeW91IGRvbid0IGRvIHRoaXMgdGhlbiBob3cgZG8geW91IGV4cGVjdCBpdCB0byBrbm93IHdoYXQgZXZlbnQgdG8gYWRkIHRvPyBTaG91bGQgaXQganVzdCBhZGQgdG8gZXZlcnkgcG9zc2libGUgbWF0Y2ggZm9yIGEgcmVnZXg/IE5vLiBUaGF0IGlzIHNjYXJ5IGFuZCBiYWQuXG4gICAgICogWW91IG5lZWQgdG8gdGVsbCBpdCB3aGF0IGV2ZW50IG5hbWVzIHNob3VsZCBiZSBtYXRjaGVkIGJ5IGEgcmVnZXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGNyZWF0ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudCA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50KGV2dCkge1xuICAgICAgICB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVXNlcyBkZWZpbmVFdmVudCB0byBkZWZpbmUgbXVsdGlwbGUgZXZlbnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmdbXX0gZXZ0cyBBbiBhcnJheSBvZiBldmVudCBuYW1lcyB0byBkZWZpbmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnRzID0gZnVuY3Rpb24gZGVmaW5lRXZlbnRzKGV2dHMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUV2ZW50KGV2dHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnVuY3Rpb24gZnJvbSB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFdoZW4gcGFzc2VkIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lLCBpdCB3aWxsIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIHJlbW92ZSBmcm9tIHRoZSBldmVudC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGluZGV4O1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKTtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzW2tleV0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlTGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcm90by5vZmYgPSBhbGlhcygncmVtb3ZlTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgeW91IGNhbiBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy4gWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIGFkZCB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKGZhbHNlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgeW91IGNhbiByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSByZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZSB0aGUgbGlzdGVuZXJzIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIHJlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyh0cnVlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVkaXRzIGxpc3RlbmVycyBpbiBidWxrLiBUaGUgYWRkTGlzdGVuZXJzIGFuZCByZW1vdmVMaXN0ZW5lcnMgbWV0aG9kcyBib3RoIHVzZSB0aGlzIHRvIGRvIHRoZWlyIGpvYi4gWW91IHNob3VsZCByZWFsbHkgdXNlIHRob3NlIGluc3RlYWQsIHRoaXMgaXMgYSBsaXR0bGUgbG93ZXIgbGV2ZWwuXG4gICAgICogVGhlIGZpcnN0IGFyZ3VtZW50IHdpbGwgZGV0ZXJtaW5lIGlmIHRoZSBsaXN0ZW5lcnMgYXJlIHJlbW92ZWQgKHRydWUpIG9yIGFkZGVkIChmYWxzZSkuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQvcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBtYW5pcHVsYXRlIHRoZSBsaXN0ZW5lcnMgb2YgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCb29sZWFufSByZW1vdmUgVHJ1ZSBpZiB5b3Ugd2FudCB0byByZW1vdmUgbGlzdGVuZXJzLCBmYWxzZSBpZiB5b3Ugd2FudCB0byBhZGQuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQvcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLm1hbmlwdWxhdGVMaXN0ZW5lcnMgPSBmdW5jdGlvbiBtYW5pcHVsYXRlTGlzdGVuZXJzKHJlbW92ZSwgZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB2YWx1ZTtcbiAgICAgICAgdmFyIHNpbmdsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXIgOiB0aGlzLmFkZExpc3RlbmVyO1xuICAgICAgICB2YXIgbXVsdGlwbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVycyA6IHRoaXMuYWRkTGlzdGVuZXJzO1xuXG4gICAgICAgIC8vIElmIGV2dCBpcyBhbiBvYmplY3QgdGhlbiBwYXNzIGVhY2ggb2YgaXRzIHByb3BlcnRpZXMgdG8gdGhpcyBtZXRob2RcbiAgICAgICAgaWYgKHR5cGVvZiBldnQgPT09ICdvYmplY3QnICYmICEoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSkge1xuICAgICAgICAgICAgZm9yIChpIGluIGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQuaGFzT3duUHJvcGVydHkoaSkgJiYgKHZhbHVlID0gZXZ0W2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIHRoZSBzaW5nbGUgbGlzdGVuZXIgc3RyYWlnaHQgdGhyb3VnaCB0byB0aGUgc2luZ3VsYXIgbWV0aG9kXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyd2lzZSBwYXNzIGJhY2sgdG8gdGhlIG11bHRpcGxlIGZ1bmN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZS5jYWxsKHRoaXMsIGksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFNvIGV2dCBtdXN0IGJlIGEgc3RyaW5nXG4gICAgICAgICAgICAvLyBBbmQgbGlzdGVuZXJzIG11c3QgYmUgYW4gYXJyYXkgb2YgbGlzdGVuZXJzXG4gICAgICAgICAgICAvLyBMb29wIG92ZXIgaXQgYW5kIHBhc3MgZWFjaCBvbmUgdG8gdGhlIG11bHRpcGxlIG1ldGhvZFxuICAgICAgICAgICAgaSA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgZXZ0LCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmcm9tIGEgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIElmIHlvdSBkbyBub3Qgc3BlY2lmeSBhbiBldmVudCB0aGVuIGFsbCBsaXN0ZW5lcnMgd2lsbCBiZSByZW1vdmVkLlxuICAgICAqIFRoYXQgbWVhbnMgZXZlcnkgZXZlbnQgd2lsbCBiZSBlbXB0aWVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVnZXggdG8gcmVtb3ZlIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gW2V2dF0gT3B0aW9uYWwgbmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLiBXaWxsIHJlbW92ZSBmcm9tIGV2ZXJ5IGV2ZW50IGlmIG5vdCBwYXNzZWQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlRXZlbnQgPSBmdW5jdGlvbiByZW1vdmVFdmVudChldnQpIHtcbiAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2YgZXZ0O1xuICAgICAgICB2YXIgZXZlbnRzID0gdGhpcy5fZ2V0RXZlbnRzKCk7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBzdGF0ZSBvZiBldnRcbiAgICAgICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudFxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1tldnRdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBldmVudHMgbWF0Y2hpbmcgdGhlIHJlZ2V4LlxuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGluIGFsbCBldmVudHNcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgcmVtb3ZlRXZlbnQuXG4gICAgICpcbiAgICAgKiBBZGRlZCB0byBtaXJyb3IgdGhlIG5vZGUgQVBJLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUFsbExpc3RlbmVycyA9IGFsaWFzKCdyZW1vdmVFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgb2YgeW91ciBjaG9pY2UuXG4gICAgICogV2hlbiBlbWl0dGVkLCBldmVyeSBsaXN0ZW5lciBhdHRhY2hlZCB0byB0aGF0IGV2ZW50IHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAgICogSWYgeW91IHBhc3MgdGhlIG9wdGlvbmFsIGFyZ3VtZW50IGFycmF5IHRoZW4gdGhvc2UgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIHRvIGV2ZXJ5IGxpc3RlbmVyIHVwb24gZXhlY3V0aW9uLlxuICAgICAqIEJlY2F1c2UgaXQgdXNlcyBgYXBwbHlgLCB5b3VyIGFycmF5IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCBhcyBpZiB5b3Ugd3JvdGUgdGhlbSBvdXQgc2VwYXJhdGVseS5cbiAgICAgKiBTbyB0aGV5IHdpbGwgbm90IGFycml2ZSB3aXRoaW4gdGhlIGFycmF5IG9uIHRoZSBvdGhlciBzaWRlLCB0aGV5IHdpbGwgYmUgc2VwYXJhdGUuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHtBcnJheX0gW2FyZ3NdIE9wdGlvbmFsIGFycmF5IG9mIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiBlbWl0RXZlbnQoZXZ0LCBhcmdzKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnNNYXAgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBsaXN0ZW5lcnM7XG4gICAgICAgIHZhciBsaXN0ZW5lcjtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnNNYXApIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNNYXAuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVycyA9IGxpc3RlbmVyc01hcFtrZXldLnNsaWNlKDApO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgc2hhbGwgYmUgcmVtb3ZlZCBmcm9tIHRoZSBldmVudFxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgZnVuY3Rpb24gaXMgZXhlY3V0ZWQgZWl0aGVyIHdpdGggYSBiYXNpYyBjYWxsIG9yIGFuIGFwcGx5IGlmIHRoZXJlIGlzIGFuIGFyZ3MgYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyLm9uY2UgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lci5saXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IGxpc3RlbmVyLmxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3MgfHwgW10pO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSA9PT0gdGhpcy5fZ2V0T25jZVJldHVyblZhbHVlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lci5saXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgZW1pdEV2ZW50XG4gICAgICovXG4gICAgcHJvdG8udHJpZ2dlciA9IGFsaWFzKCdlbWl0RXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIFN1YnRseSBkaWZmZXJlbnQgZnJvbSBlbWl0RXZlbnQgaW4gdGhhdCBpdCB3aWxsIHBhc3MgaXRzIGFyZ3VtZW50cyBvbiB0byB0aGUgbGlzdGVuZXJzLCBhcyBvcHBvc2VkIHRvIHRha2luZyBhIHNpbmdsZSBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyBvbi5cbiAgICAgKiBBcyB3aXRoIGVtaXRFdmVudCwgeW91IGNhbiBwYXNzIGEgcmVnZXggaW4gcGxhY2Ugb2YgdGhlIGV2ZW50IG5hbWUgdG8gZW1pdCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBlbWl0IGFuZCBleGVjdXRlIGxpc3RlbmVycyBmb3IuXG4gICAgICogQHBhcmFtIHsuLi4qfSBPcHRpb25hbCBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byBiZSBwYXNzZWQgdG8gZWFjaCBsaXN0ZW5lci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5lbWl0ID0gZnVuY3Rpb24gZW1pdChldnQpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICByZXR1cm4gdGhpcy5lbWl0RXZlbnQoZXZ0LCBhcmdzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWYgYVxuICAgICAqIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGUgb25lIHNldCBoZXJlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkXG4gICAgICogYWZ0ZXIgZXhlY3V0aW9uLiBUaGlzIHZhbHVlIGRlZmF1bHRzIHRvIHRydWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBuZXcgdmFsdWUgdG8gY2hlY2sgZm9yIHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5zZXRPbmNlUmV0dXJuVmFsdWUgPSBmdW5jdGlvbiBzZXRPbmNlUmV0dXJuVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fb25jZVJldHVyblZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZlxuICAgICAqIHRoZSBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhpcyBvbmUgdGhlbiBpdCBzaG91bGQgYmUgcmVtb3ZlZFxuICAgICAqIGF1dG9tYXRpY2FsbHkuIEl0IHdpbGwgcmV0dXJuIHRydWUgYnkgZGVmYXVsdC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4geyp8Qm9vbGVhbn0gVGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgZm9yIG9yIHRoZSBkZWZhdWx0LCB0cnVlLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRPbmNlUmV0dXJuVmFsdWUgPSBmdW5jdGlvbiBfZ2V0T25jZVJldHVyblZhbHVlKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eSgnX29uY2VSZXR1cm5WYWx1ZScpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb25jZVJldHVyblZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgZXZlbnRzIG9iamVjdCBhbmQgY3JlYXRlcyBvbmUgaWYgcmVxdWlyZWQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBldmVudHMgc3RvcmFnZSBvYmplY3QuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldEV2ZW50cyA9IGZ1bmN0aW9uIF9nZXRFdmVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ldmVudHMgfHwgKHRoaXMuX2V2ZW50cyA9IHt9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmV2ZXJ0cyB0aGUgZ2xvYmFsIHtAbGluayBFdmVudEVtaXR0ZXJ9IHRvIGl0cyBwcmV2aW91cyB2YWx1ZSBhbmQgcmV0dXJucyBhIHJlZmVyZW5jZSB0byB0aGlzIHZlcnNpb24uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gTm9uIGNvbmZsaWN0aW5nIEV2ZW50RW1pdHRlciBjbGFzcy5cbiAgICAgKi9cbiAgICBFdmVudEVtaXR0ZXIubm9Db25mbGljdCA9IGZ1bmN0aW9uIG5vQ29uZmxpY3QoKSB7XG4gICAgICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gb3JpZ2luYWxHbG9iYWxWYWx1ZTtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9O1xuXG4gICAgLy8gRXhwb3NlIHRoZSBjbGFzcyBlaXRoZXIgdmlhIEFNRCwgQ29tbW9uSlMgb3IgdGhlIGdsb2JhbCBvYmplY3RcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpe1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbn0odHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzIHx8IHt9KSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdGhyZWVfXzsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0ICogZnJvbSAnLi9jb3JlL0Jhc2VMYXllcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vY29yZS9Db250cm9sbGVyJztcclxuXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb24nXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlR3JvdXAnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0JhY2tncm91bmQnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0JsZW5kZXJDb25uZWN0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BvaW50ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0RPTU1lc2gnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0Vhc2luZ3MnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0V2ZW50RGlzcGF0Y2hlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Nb3VzZVJvdGF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1Bvc3RQcm9jZXNzaW5nJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9QYWdlU2Nyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BhZ2VTY3JvbGxlci9QYWdlU2Nyb2xsZXJTZWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9MYXlvdXRDb250cm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9UaW1lbGluZUFuaW1hdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Vbmlmb3Jtcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvTGVycHMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1dhaXRNYW4nO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=