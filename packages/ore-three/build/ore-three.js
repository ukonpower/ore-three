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
        if (variable) {
            if (typeof variable == 'number') {
                variable = value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JlLXRocmVlLmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPOzs7Ozs7Ozs7Ozs7OztBQ1ZBLGlFQUFlLHFDQUFxQyxzQkFBc0IsdUJBQXVCLGdDQUFnQyxvQkFBb0IsMkNBQTJDLHFCQUFxQiwyQkFBMkIsS0FBSyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNBdFAsaUVBQWUscUNBQXFDLHNCQUFzQix1QkFBdUIsMEJBQTBCLDRCQUE0QixvQkFBb0IsMkNBQTJDLGlFQUFpRSwrQkFBK0IsaUVBQWlFLG9DQUFvQyx3RkFBd0YscUNBQXFDLGFBQWEsR0FBRyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7QUNBM2lCLGlFQUFlLDBDQUEwQyxtQkFBbUIsaUJBQWlCLHdDQUF3QyxHQUFHLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ0F6SSxpRUFBZSxxQ0FBcUMsaUJBQWlCLDBDQUEwQyxlQUFlLEdBQUcsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDQWxJLGlFQUFlLHFDQUFxQyxlQUFlLGVBQWUsMENBQTBDLE1BQU0sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBcEc7QUE0Q3hCLE1BQU0sU0FBVSxTQUFRLGtEQUFxQjtJQWFuRDtRQUVDLEtBQUssRUFBRSxDQUFDO1FBTkMsaUJBQVksR0FBRyxLQUFLLENBQUM7UUFDeEIsU0FBSSxHQUFHLENBQUMsQ0FBQztRQU9mLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDWCxJQUFJLEVBQUUsRUFBRTtZQUNSLGFBQWEsRUFBRTtnQkFDZCxVQUFVLEVBQUUsRUFBRSxHQUFHLENBQUM7Z0JBQ2xCLFVBQVUsRUFBRSxFQUFFLEdBQUcsQ0FBQztnQkFDbEIsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDO2FBQ3JCO1lBQ0QsSUFBSSxFQUFFO2dCQUNMLFVBQVUsRUFBRSxJQUFJLDBDQUFhLEVBQUU7Z0JBQy9CLGlCQUFpQixFQUFFLEdBQUc7Z0JBQ3RCLFVBQVUsRUFBRSxJQUFJLDBDQUFhLEVBQUU7Z0JBQy9CLGVBQWUsRUFBRSxJQUFJLDBDQUFhLEVBQUU7Z0JBQ3BDLGlCQUFpQixFQUFFLEdBQUc7Z0JBQ3RCLFVBQVUsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO2dCQUNuQyxjQUFjLEVBQUUsR0FBRztnQkFDbkIsVUFBVSxFQUFFLEdBQUc7YUFDZjtTQUNELENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxHQUFHO1lBQ3JCLElBQUksRUFBRTtnQkFDTCxLQUFLLEVBQUUsQ0FBQzthQUNSO1NBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSx3Q0FBVyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLG9EQUF1QixDQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBRSxDQUFDO0lBRS9ELENBQUM7SUFFTSxJQUFJLENBQUUsU0FBaUI7UUFFN0IsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLENBQUM7UUFFdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFM0MsSUFBSyxJQUFJLENBQUMsWUFBWSxFQUFHO1lBRXhCLElBQUksQ0FBQyxPQUFPLENBQUUsU0FBUyxDQUFFLENBQUM7U0FFMUI7SUFFRixDQUFDO0lBRU0sT0FBTyxDQUFFLFNBQWlCLElBQUssQ0FBQztJQUVoQyxNQUFNLENBQUUsU0FBeUI7UUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO1FBRXBDLElBQUssU0FBUyxDQUFDLGNBQWMsRUFBRztZQUUvQixJQUFJLENBQUMsaUJBQWlCLENBQUUsU0FBUyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQUUsS0FBSyxDQUFFLENBQUM7U0FFbEU7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzdFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRTlFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxnREFBbUIsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRTdDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBRTVDLFVBQVUsQ0FBRSxHQUFHLEVBQUU7WUFFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBRTFCLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUVSLENBQUM7SUFFTSxRQUFRO1FBRWQsSUFBSSxDQUFDLGFBQWEsQ0FBRTtZQUNuQixJQUFJLEVBQUUsU0FBUztTQUNmLENBQUUsQ0FBQztRQUVKLElBQUksQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO0lBRTNCLENBQUM7SUFFUyxlQUFlLENBQUUsTUFBc0I7UUFFaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFFdEMsS0FBTSxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFeEMsSUFBSSxDQUFDLGVBQWUsQ0FBRSxNQUFNLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7WUFFN0MsSUFBSSxHQUFHLEdBQXFDLFNBQVMsQ0FBQztZQUN0RCxJQUFJLEdBQUcsR0FBK0IsU0FBUyxDQUFDO1lBRWhELElBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQWtCLENBQUMsTUFBTSxFQUFHO2dCQUVwRCxHQUFHLEdBQUssTUFBTSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQWtCLENBQUMsUUFBUSxDQUFDO2dCQUN0RCxHQUFHLEdBQU8sTUFBTSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQWtCLENBQUMsUUFBNEIsQ0FBQzthQUU1RTtZQUVELE1BQU0sQ0FBQyxNQUFNLENBQUUsQ0FBRSxNQUFNLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUUsQ0FBQztZQUUxQyxJQUFLLEdBQUcsRUFBRztnQkFFVixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7YUFFZDtZQUVELElBQUssR0FBRyxFQUFHO2dCQUVWLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUVkO1NBRUQ7SUFFRixDQUFDO0lBRU0saUJBQWlCLENBQUUsVUFBOEIsRUFBRSxpQkFBMEIsSUFBSTtRQUV2RixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUM7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFdEYsSUFBSyxjQUFjLEVBQUc7WUFFckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBRWhCO0lBRUYsQ0FBQztJQUVNLFFBQVE7UUFFZCxJQUFLLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSTtZQUFHLE9BQU87UUFFcEMsTUFBTSxhQUFhLEdBQUcsSUFBSSwwQ0FBYSxDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUUsQ0FBQztRQUN6RixNQUFNLGFBQWEsR0FBRyxJQUFJLDBDQUFhLEVBQUUsQ0FBQztRQUUxQyxJQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFHO1lBRS9CLGFBQWEsQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBRSxDQUFDO1NBRWpHO2FBQU07WUFFTixhQUFhLENBQUMsSUFBSSxDQUFFLGFBQWEsQ0FBRSxDQUFDO1NBRXBDO1FBRUQsSUFBSSxjQUFjLEdBQUcsR0FBRyxHQUFHLENBQUUsQ0FBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUUsR0FBRyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUUsQ0FBQztRQUNoTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLEVBQUUsY0FBYyxDQUFFLENBQUUsQ0FBQztRQUVsRSxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsQ0FBRSxDQUFFLGFBQWEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBRSxHQUFHLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBRSxDQUFDO1FBQ3BMLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxVQUFVLENBQUUsQ0FBRSxDQUFDO1FBRTFELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsYUFBYSxDQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsYUFBYSxDQUFFLENBQUM7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBRSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLENBQUUsQ0FBRSxDQUFDO1FBQzdHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFFdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUM7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDbEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBRXJDLElBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUc7WUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBRWhGO0lBRUYsQ0FBQztJQUVNLFlBQVksQ0FBRSxDQUFtQjtRQUV2QyxNQUFNLGdCQUFnQixHQUFHLElBQUksMENBQWEsRUFBRSxDQUFDO1FBQzdDLGdCQUFnQixDQUFDLElBQUksQ0FBRSxDQUFDLENBQUMsUUFBUSxDQUFFLENBQUM7UUFFcEMsSUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRztZQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQzVELGdCQUFnQixDQUFDLEdBQUcsQ0FBRSxJQUFJLDBDQUFhLENBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFFLENBQUUsQ0FBQztTQUV4RTtRQUVELE1BQU0sY0FBYyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELGNBQWMsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUM7UUFDbkQsY0FBYyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMxQyxjQUFjLENBQUMsY0FBYyxDQUFFLEdBQUcsQ0FBRSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUd0RCxNQUFNLElBQUksR0FBbUI7WUFDNUIsS0FBSyxFQUFFLENBQUMsQ0FBQyxZQUFZO1lBQ3JCLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7WUFDbEMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ3RCLGNBQWMsRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFO1lBQ3RDLGNBQWMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtTQUNsQyxDQUFDO1FBRUYsSUFBSyxDQUFDLENBQUMsZ0JBQWdCLElBQUksT0FBTyxFQUFHO1lBRXBDLElBQUksQ0FBQyxPQUFPLENBQUUsSUFBSSxDQUFFLENBQUM7U0FFckI7YUFBTSxJQUFLLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxPQUFPLEVBQUc7WUFFM0MsSUFBSSxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUUsQ0FBQztTQUUxQjthQUFNLElBQUssQ0FBQyxDQUFDLGdCQUFnQixJQUFJLE1BQU0sRUFBRztZQUUxQyxJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBRSxDQUFDO1NBRXpCO2FBQU0sSUFBSyxDQUFDLENBQUMsZ0JBQWdCLElBQUksS0FBSyxFQUFHO1lBRXpDLElBQUksQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUM7U0FFeEI7SUFFRixDQUFDO0lBRU0sWUFBWSxDQUFFLElBQW9CLElBQUssQ0FBQztJQUV4QyxXQUFXLENBQUUsSUFBb0IsSUFBSyxDQUFDO0lBRXZDLFVBQVUsQ0FBRSxJQUFvQixJQUFLLENBQUM7SUFFdEMsT0FBTyxDQUFFLElBQW9CLElBQUssQ0FBQztJQUVuQyxPQUFPLENBQUUsS0FBaUIsRUFBRSxhQUFxQixJQUFLLENBQUM7Q0FFOUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxUzhCO0FBQ1k7QUFlcEMsTUFBTSxVQUFXLFNBQVEsa0RBQXFCO0lBUXBELFlBQWEsU0FBMkI7UUFFdkMsS0FBSyxFQUFFLENBQUM7UUFMQyxXQUFNLEdBQWdCLEVBQUUsQ0FBQztRQU9sQyxJQUFLLENBQUUsQ0FBRSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBRSxFQUFHO1lBRTFDLE9BQU8sQ0FBQyxHQUFHLENBQUUsZ0JBQWdCLEdBQUcseUVBQXVDLEdBQUcsSUFBSSxFQUFHLHlFQUF5RSxDQUFFLENBQUM7U0FFN0o7UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBRS9COzt5Q0FFaUM7UUFFakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1EQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsc0JBQXNCLENBQUUsQ0FBRSxTQUFTLElBQUksU0FBUyxDQUFDLG1CQUFtQixDQUFFLElBQUksUUFBUSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBRS9GOzt5Q0FFaUM7UUFFakMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDbkQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDN0MsSUFBSSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO1FBQzlELElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXBELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUUsUUFBUSxFQUFFLGFBQWEsQ0FBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxFQUFFLFlBQVksQ0FBRSxDQUFDO1FBQ3ZELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxtQkFBbUIsRUFBRSxpQkFBaUIsQ0FBRSxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxRQUFRLEVBQUUsWUFBWSxDQUFFLENBQUM7UUFFbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUU7WUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBRSxRQUFRLEVBQUUsYUFBYSxDQUFFLENBQUM7WUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBRSxPQUFPLEVBQUUsWUFBWSxDQUFFLENBQUM7WUFDMUQsTUFBTSxDQUFDLG1CQUFtQixDQUFFLG1CQUFtQixFQUFFLGlCQUFpQixDQUFFLENBQUM7WUFDckUsTUFBTSxDQUFDLG1CQUFtQixDQUFFLFFBQVEsRUFBRSxZQUFZLENBQUUsQ0FBQztRQUV0RCxDQUFDLENBQUUsQ0FBQztRQUVKLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUViLENBQUM7SUFFUyxJQUFJO1FBRWIsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBRXRCLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUUvQyxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBRSxTQUFTLENBQUUsQ0FBQztTQUVuQztRQUVELHFCQUFxQixDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFFLENBQUM7SUFFakQsQ0FBQztJQUVTLGNBQWM7UUFFdkIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRS9DLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7U0FFNUI7SUFFRixDQUFDO0lBRVMsbUJBQW1CO1FBRTVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUV2QixDQUFDO0lBRVMsWUFBWSxDQUFFLENBQWM7UUFFckMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRS9DLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsWUFBWSxDQUFFLENBQWdDLENBQUUsQ0FBQztTQUVsRTtJQUVGLENBQUM7SUFFUyxPQUFPLENBQUUsQ0FBYztRQUVoQyxLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFL0MsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFFLENBQUM7U0FFMUQ7SUFFRixDQUFDO0lBRUQ7O3FDQUVpQztJQUUxQixRQUFRLENBQUUsS0FBZ0IsRUFBRSxTQUF5QjtRQUUzRCxPQUFRLElBQUksQ0FBQyxRQUFRLENBQUUsU0FBUyxDQUFDLElBQUksQ0FBRSxFQUFHO1lBRXpDLFNBQVMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO1NBRXRCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUUsS0FBSyxDQUFFLENBQUM7UUFFMUIsS0FBSyxDQUFDLE1BQU0sQ0FBRSxTQUFTLENBQUUsQ0FBQztJQUUzQixDQUFDO0lBRU0sUUFBUSxDQUFFLFNBQWlCO1FBRWpDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUUvQyxJQUFLLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTO2dCQUFHLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUV2RTtRQUVELE9BQU8sSUFBSSxDQUFDO0lBRWIsQ0FBQztJQUVNLFdBQVcsQ0FBRSxTQUFpQjtRQUVwQyxLQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRXBELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFFL0IsSUFBSyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxTQUFTLEVBQUc7Z0JBRW5DLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO2FBRTNCO1NBRUQ7SUFFRixDQUFDO0lBRU0sc0JBQXNCLENBQUUsR0FBZ0I7UUFFOUMsSUFBSyxJQUFJLENBQUMsbUJBQW1CLEVBQUc7WUFFL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBRSxJQUFJLENBQUMsbUJBQW1CLENBQUUsQ0FBQztTQUUzRDtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRXBDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFFaEMsQ0FBQztJQUVNLE9BQU87UUFFYixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsRUFBRTtZQUUzQixJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7UUFFcEMsQ0FBQyxDQUFFLENBQUM7UUFFSixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsRUFBRTtZQUVoQixPQUFPO1FBRVIsQ0FBQyxDQUFDO1FBRUYsSUFBSSxDQUFDLGFBQWEsQ0FBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBRSxDQUFDO0lBRTNDLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDek0rQztBQVV6QyxNQUFNLGVBQWdCLFNBQVEsNkRBQVk7SUFRaEQsWUFBYSxJQUFhO1FBRXpCLEtBQUssRUFBRSxDQUFDO1FBUEYsV0FBTSxHQUErQixFQUFFLENBQUM7UUFTOUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWixLQUFLLEVBQUUsQ0FBQztZQUNSLEdBQUcsRUFBRSxDQUFDO1lBQ04sUUFBUSxFQUFFLENBQUM7U0FDWDtJQUVGLENBQUM7SUFFTSxjQUFjLENBQUUsWUFBb0IsRUFBRSxXQUF3QjtRQUVwRSxJQUFJLENBQUMsTUFBTSxDQUFFLFlBQVksQ0FBRSxHQUFHLFdBQVcsQ0FBQztRQUUxQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbEIsQ0FBQztJQUVNLFlBQVksQ0FBRSxZQUFvQjtRQUV4QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUUsWUFBWSxDQUFFLENBQUM7UUFFbkMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBRWxCLENBQUM7SUFFTyxTQUFTO1FBRWhCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRTtRQUUxQyxJQUFJLFFBQVEsR0FBRyxRQUFRO1FBQ3ZCLElBQUksTUFBTSxHQUFHLENBQUMsUUFBUTtRQUV0QixLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRztZQUU1QyxJQUFJLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBRSxTQUFTLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztZQUU1QyxJQUFJLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxFQUFHO2dCQUVqQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQzthQUU1QjtZQUVELElBQUksS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLEVBQUc7Z0JBRTdCLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBRXhCO1NBRUQ7UUFFRCxJQUFJLFFBQVEsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLElBQUksUUFBUSxFQUFFO1lBRWhELFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDYixNQUFNLEdBQUcsQ0FBQztTQUVWO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztRQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztJQUV6RCxDQUFDO0lBRU0sY0FBYyxDQUFFLFlBQW9CO1FBRTFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBRSxZQUFZLENBQUUsSUFBSSxJQUFJLENBQUM7SUFFNUMsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsY0FBYyxDQUFFLFlBQW9CLEVBQUUsT0FBdUI7UUFFbkUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxZQUFZLENBQUUsR0FBRyxPQUFPLENBQUM7SUFFekMsQ0FBQztJQUVNLFdBQVcsQ0FBb0UsWUFBb0I7UUFFekcsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFFLFlBQVksQ0FBRSxFQUFHO1lBRXBDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBRSxZQUFZLENBQUUsQ0FBQztTQUVyQztRQUVELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDO1FBRWxELElBQUksVUFBVSxFQUFHO1lBRWhCLElBQUksR0FBRyxHQUFHO2dCQUNULEtBQUssRUFBRSxVQUFVLENBQUMsZUFBZSxFQUFPO2FBQ3hDLENBQUM7WUFFRixJQUFJLENBQUMsUUFBUSxDQUFFLFlBQVksQ0FBRSxHQUFHLEdBQUcsQ0FBQztZQUVwQyxPQUFPLEdBQUcsQ0FBQztTQUVYO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFFYixDQUFDO0lBTU0sUUFBUSxDQUFFLFlBQW9CLEVBQUUsTUFBb0U7UUFFMUcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsT0FBTztZQUFHLE9BQU8sTUFBTSxJQUFJLElBQUksQ0FBQztRQUVyQyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNO1lBQUcsT0FBTyxLQUFLLENBQUM7UUFFM0IsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUc7WUFFOUIsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFFakIsT0FBTyxNQUFNLENBQUM7U0FFZDtRQUVELE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbkIsSUFBSSxHQUFHLElBQUksTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUc7WUFFbkMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUVsQjtRQUVELElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksS0FBSyxFQUFHO1lBRW5DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7U0FFbEI7UUFFRCxPQUFPLE1BQU0sSUFBSSxJQUFJLENBQUM7SUFFdkIsQ0FBQztJQU1NLFVBQVUsQ0FBRSxZQUFvQixFQUFFLEtBQWEsRUFBRSxNQUFvRTtRQUUzSCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFFLFlBQVksQ0FBRSxDQUFDO1FBRWhELElBQUksTUFBTSxFQUFJO1lBRWIsSUFBSSxDQUFDLEtBQUs7Z0JBQUcsT0FBTyxNQUFNLENBQUM7WUFFM0IsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFFLEtBQUssSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFFO1NBRTNDO2FBQU07WUFFTixJQUFJLENBQUMsS0FBSztnQkFBRyxPQUFPLElBQUksQ0FBQztZQUV6QixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUUsS0FBSyxDQUFFO1NBRTlCO0lBRUYsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsV0FBVyxDQUFFLEtBQWE7UUFFaEMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFM0MsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFN0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBRSxTQUFTLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztZQUNoRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLFNBQVMsQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1lBRTdDLElBQUksQ0FBQyxHQUFHO2dCQUFHLFNBQVM7WUFFcEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksUUFBUSxFQUFHO2dCQUVsQyxHQUFHLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzthQUU1QztpQkFBTTtnQkFFTixXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDO2FBRXRDO1NBRUQ7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7SUFFbkMsQ0FBQztDQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsTytDO0FBS3pDLE1BQU0sTUFBTyxTQUFRLDZEQUFZO0lBVXZDLFlBQWEsTUFBeUI7UUFFckMsS0FBSyxFQUFFLENBQUM7UUFWRixjQUFTLEdBQXFCLEVBQUUsQ0FBQztRQUVoQyxVQUFLLEdBQXFDLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFVNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFFdkIsSUFBSSxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUUsQ0FBQztJQUVwQixDQUFDO0lBRU0sR0FBRyxDQUFFLE1BQXlCO1FBRXBDLElBQUssTUFBTSxFQUFHO1lBRWIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBRTFCLE1BQU0sQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFDLEVBQUU7Z0JBRTFCLElBQUksQ0FBQyxXQUFXLENBQUUsUUFBUSxDQUFFLENBQUM7WUFFOUIsQ0FBQyxDQUFFLENBQUM7U0FFSjtJQUVGLENBQUM7SUFFTSxXQUFXLENBQUUsUUFBd0I7UUFFM0MsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWQsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWxELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFFaEMsSUFBSyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRztnQkFFakQsS0FBSyxFQUFHLENBQUM7YUFFVDtpQkFBTTtnQkFFTixNQUFNO2FBRU47U0FFRDtRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFFLENBQUM7UUFFNUMsaUJBQWlCO1FBRWpCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFdkUsQ0FBQztJQUVNLFFBQVEsQ0FBRSxLQUFhO1FBRTdCLElBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHO1lBRWhDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7U0FFeEI7UUFFRCxJQUFJLEtBQUssR0FBa0IsSUFBSSxDQUFDO1FBRWhDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUVsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDO1lBRW5DLElBQUssS0FBSyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFHO2dCQUVyQyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQztnQkFFN0MsSUFBSyxjQUFjLEVBQUc7b0JBRXJCLEtBQUssR0FBRyxjQUFjLENBQUMsRUFBRSxDQUFFLFFBQVEsRUFBRSxLQUFLLENBQUUsQ0FBQztpQkFFN0M7cUJBQU07b0JBRU4sS0FBSyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUU5QjtnQkFFRCxNQUFNO2FBRU47U0FFRDtRQUVELElBQUssS0FBSyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUc7WUFFbEQsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUVqRTtRQUVELElBQUssS0FBSyxLQUFLLElBQUksRUFBRztZQUVyQixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNaLEtBQUssRUFBRSxLQUFLO2dCQUNaLEtBQUssRUFBRSxLQUFLO2FBQ1osQ0FBQztZQUVGLE9BQU8sS0FBSyxDQUFDO1NBRWI7UUFFRCxPQUFPLENBQUMsQ0FBQztJQUVWLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvSDhCO0FBQ2lCO0FBS3pDLE1BQU0sV0FBWSxTQUFRLDZEQUFZO0lBVTVDLFlBQWEsSUFBYSxFQUFFLENBQVUsRUFBRSxDQUFVLEVBQUUsQ0FBVSxFQUFFLENBQVUsRUFBRSxNQUFlO1FBRTFGLEtBQUssRUFBRSxDQUFDO1FBUkYsU0FBSSxHQUFvQixRQUFRLENBQUM7UUFVdkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDWixDQUFDLEVBQUUsSUFBSTtZQUNQLENBQUMsRUFBRSxJQUFJO1lBQ1AsQ0FBQyxFQUFFLElBQUk7WUFDUCxDQUFDLEVBQUUsSUFBSTtZQUNQLE1BQU0sRUFBRSxJQUFJO1NBQ1osQ0FBQztRQUVGLElBQUksQ0FBQyxFQUFHO1lBRVAsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDLEVBQUUsR0FBRyxDQUFFO1NBRXhCO1FBRUQsSUFBSSxDQUFDLEVBQUc7WUFFUCxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUMsRUFBRSxHQUFHLENBQUU7U0FFeEI7UUFFRCxJQUFJLENBQUMsRUFBRztZQUVQLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBRTtTQUV4QjtRQUVELElBQUksQ0FBQyxFQUFHO1lBRVAsSUFBSSxDQUFDLFNBQVMsQ0FBRSxDQUFDLEVBQUUsR0FBRyxDQUFFO1NBRXhCO0lBRUYsQ0FBQztJQUVNLFNBQVMsQ0FBRSxLQUFhLEVBQUUsSUFBZ0I7UUFFaEQsSUFBSSxDQUFDLEtBQUssQ0FBRSxJQUFJLENBQUUsR0FBRyxLQUFLLENBQUM7UUFFM0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU0sUUFBUTtRQUVkLElBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUc7WUFFeEIsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUM7U0FFckI7UUFFRCxJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFHO1lBRW5CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1NBRW5CO2FBQU0sSUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRztZQUUxQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztTQUVuQjthQUFNLElBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUc7WUFFMUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7U0FFbkI7YUFBTSxJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFHO1lBRTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDO1NBRXJCO0lBRUYsQ0FBQztJQUVPLFNBQVM7UUFFaEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFO1FBRXpDLElBQUksUUFBUSxHQUFHLFFBQVE7UUFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxRQUFRO1FBRXRCLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFHO1lBRTVDLElBQUksS0FBSyxHQUFJLElBQUksQ0FBQyxLQUFpQyxDQUFFLFNBQVMsQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1lBRXRFLElBQUksQ0FBQyxLQUFLO2dCQUFHLFNBQVM7WUFFdEIsSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsRUFBRztnQkFFakMsUUFBUSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFFNUI7WUFFRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxFQUFHO2dCQUU3QixNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUV4QjtTQUVEO1FBRUQsSUFBSSxRQUFRLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxJQUFJLFFBQVEsRUFBRTtZQUVoRCxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxHQUFHLENBQUM7U0FFVjtRQUVELElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRXRELENBQUM7SUFFTSxlQUFlO1FBRXJCLElBQUssSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUc7WUFFMUIsT0FBTyxJQUFJLDBDQUFhLEVBQUUsQ0FBQztTQUUzQjthQUFNLElBQUssSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUc7WUFFakMsT0FBTyxJQUFJLDBDQUFhLEVBQUUsQ0FBQztTQUUzQjthQUFNLElBQUssSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUc7WUFFakMsT0FBTyxJQUFJLDBDQUFhLEVBQUUsQ0FBQztTQUUzQjtRQUVELE9BQU8sQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQU1NLFFBQVEsQ0FBeUUsS0FBYSxFQUFFLE1BQVU7UUFFaEgsSUFBSSxNQUFNLEVBQUc7WUFFWixJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFHO2dCQUVuQixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQzthQUUxQztZQUVELElBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUc7Z0JBRW5CLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFFLEtBQUssQ0FBRSxDQUFDO2FBRTFDO1lBRUQsSUFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksTUFBTSxFQUFHO2dCQUVwQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQzthQUUxQztZQUVELElBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUssR0FBRyxJQUFJLE1BQU0sRUFBRztnQkFFckMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUUsS0FBSyxDQUFFLENBQUM7YUFFMUM7WUFFRCxPQUFPLE1BQU0sQ0FBQztTQUVkO2FBQU07WUFFTixJQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFHO2dCQUV4QixPQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQzthQUU1QztZQUVELE9BQU8sSUFBSSxDQUFDO1NBRVo7SUFFRixDQUFDO0NBR0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3TStDO0FBQ0M7QUFJMUMsTUFBTSxjQUFlLFNBQVEsNkRBQVk7SUFVL0MsWUFBYSxVQUFzQixFQUFFLFVBQXVCLEVBQUUsV0FBd0IsRUFBRSxhQUFtQztRQUUxSCxLQUFLLEVBQUUsQ0FBQztRQVZGLGVBQVUsR0FBZSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3hDLGVBQVUsR0FBZSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQ3hDLGdCQUFXLEdBQWUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN6QyxrQkFBYSxHQUF3QixRQUFRLENBQUM7UUFFN0MsV0FBTSxHQUFzQixJQUFJLENBQUM7UUFDakMsY0FBUyxHQUEwQixJQUFJLENBQUM7UUFNL0MsSUFBSSxDQUFDLEdBQUcsQ0FBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxhQUFhLENBQUUsQ0FBQztJQUVoRSxDQUFDO0lBRU0sR0FBRyxDQUFFLFVBQXNCLEVBQUUsVUFBdUIsRUFBRSxXQUF3QixFQUFFLGFBQW1DO1FBRXpILElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsSUFBSSxVQUFVLENBQUM7UUFDN0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLElBQUksUUFBUSxDQUFDO0lBRWhELENBQUM7SUFFTyxTQUFTLENBQUUsYUFBa0MsRUFBRSxTQUF5QjtRQUUvRSxJQUFLLGFBQWEsSUFBSSxRQUFRLEVBQUc7WUFFaEMsT0FBTyxvREFBYyxDQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUUsQ0FBQztTQUV2RzthQUFNO1lBRU4sT0FBTyxDQUFFLENBQVMsRUFBRyxFQUFFO2dCQUV0QixJQUFJLENBQUMsR0FBRyxDQUFFLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ3ZELENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFFL0UsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWxDLENBQUMsQ0FBQztTQUVGO0lBRUYsQ0FBQztJQUVNLEVBQUUsQ0FBRSxTQUF5QixFQUFFLENBQVM7UUFFOUMsSUFBSyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFHO1lBRS9JLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBRSxDQUFDO1lBQzlELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBRTNCO1FBRUQsSUFBSyxJQUFJLENBQUMsTUFBTSxFQUFHO1lBRWxCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUV4QjthQUFNO1lBRU4sT0FBTyxDQUFDLENBQUM7U0FFVDtJQUVGLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRThCO0FBRWlCO0FBQ047QUF5Qm5DLE1BQU0sUUFBUyxTQUFRLGtEQUFxQjtJQVNsRDtRQUVDLEtBQUssRUFBRSxDQUFDO1FBUkYsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHMUIsbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0IsbUJBQWMsR0FBZSxFQUFFLENBQUM7UUFNekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFFcEIsQ0FBQztJQUVNLEdBQUcsQ0FBa0MsTUFBaUM7UUFFNUUsSUFBSSxRQUFRLEdBQXdCO1lBQ25DLElBQUksRUFBRSxDQUFFLENBQUM7WUFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBRSxNQUFNLENBQUMsU0FBUyxDQUFFO1lBQzdDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUU7WUFDbEQsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBRTtZQUNqRCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBSSxxREFBZSxFQUFFO1lBQzFDLFFBQVEsRUFBRSxDQUFFLE1BQU0sQ0FBQyxjQUFjLElBQUkscURBQWlCLENBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBRSxDQUFpQjtZQUMzRixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDekIsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLEdBQUcsUUFBNkQsQ0FBQztRQUU5RixJQUFJLENBQUMsYUFBYSxDQUFDO1lBQ2xCLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ3BCLFFBQVE7U0FDUixDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUM7SUFFakIsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsU0FBUyxDQUFFLElBQVksRUFBRSxNQUFrQjtRQUVqRCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXRDLElBQUssUUFBUSxFQUFHO1lBRWYsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7U0FFekI7YUFBTTtZQUVOLE9BQU8sQ0FBQyxJQUFJLENBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFFLENBQUM7U0FFbkQ7SUFFRixDQUFDO0lBRU0sUUFBUSxDQUFrQyxJQUFZLEVBQUUsS0FBUTtRQUV0RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBcUMsQ0FBQztRQUV4RSxJQUFLLFFBQVEsRUFBRztZQUVmLElBQUssT0FBTyxRQUFRLElBQUksUUFBUSxFQUFHO2dCQUVsQyxRQUFRLEdBQUcsS0FBSyxDQUFDO2FBRWpCO2lCQUFNLElBQUssTUFBTSxJQUFJLFFBQVEsRUFBRztnQkFFaEMsUUFBUSxDQUFDLElBQUksQ0FBRSxLQUFZLENBQUUsQ0FBQzthQUU5QjtpQkFBTSxJQUFLLFFBQVEsWUFBWSxLQUFLLEVBQUc7Z0JBRXJDLFFBQXVCLEdBQUssS0FBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUUzRDtZQUVELElBQUksQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLGFBQWEsQ0FBRSxJQUFJLENBQUUsQ0FBQztTQUUzQjthQUFNO1lBRU4sT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQztZQUVuRCxPQUFPLElBQUksQ0FBQztTQUVaO0lBRUYsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsT0FBTyxDQUFrQyxJQUFZLEVBQUUsU0FBWSxFQUFFLFdBQW1CLENBQUMsRUFBRSxRQUFtQixFQUFFLE1BQW1CO1FBRXpJLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFFLENBQUM7UUFDdEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUUsT0FBTyxDQUFDLEVBQUU7WUFFcEMsSUFBSyxRQUFRLEVBQUc7Z0JBRWYsSUFBSyxRQUFRLElBQUksQ0FBQyxFQUFHO29CQUVwQixJQUFJLENBQUMsUUFBUSxDQUFFLElBQUksRUFBRSxTQUFTLENBQUUsQ0FBQztvQkFFakMsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7b0JBQ3BCLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLEVBQUU7d0JBRW5DLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQzt3QkFDdkIsT0FBTyxDQUFFLElBQUksQ0FBRSxDQUFDO29CQUVqQixDQUFDLENBQUM7b0JBRUYsT0FBTztpQkFFUDtnQkFFRCxJQUFLLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBRSxDQUFDLEVBQUc7b0JBRTNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUN4QixJQUFJLENBQUMsY0FBYyxFQUFHLENBQUM7aUJBRXZCO2dCQUVELFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2dCQUNsQixRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDN0IsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUUsQ0FBQztnQkFDM0QsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFFLFNBQVMsQ0FBRSxDQUFDO2dCQUVyRCxRQUFRLENBQUMsbUJBQW1CLEdBQUcsR0FBRyxFQUFFO29CQUVuQyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBRSxJQUFJLENBQUUsQ0FBQztnQkFFakIsQ0FBQyxDQUFDO2dCQUVGLElBQUssTUFBTSxFQUFHO29CQUViLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBRSxDQUFDO2lCQUUvQjthQUVEO2lCQUFNO2dCQUVOLE9BQU8sQ0FBQyxJQUFJLENBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFFLENBQUM7YUFFbkQ7UUFFRixDQUFDLENBQUUsQ0FBQztRQUVKLE9BQU8sT0FBTyxDQUFDO0lBRWhCLENBQUM7SUFFTSxhQUFhLENBQUUsSUFBWTtRQUVqQyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXRDLElBQUssUUFBUSxFQUFHO1lBRWYsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDcEIsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztTQUVwQzthQUFNO1lBRU4sT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQztTQUVuRDtJQUVGLENBQUM7SUFFRDs7cUNBRWlDO0lBRTFCLEdBQUcsQ0FBa0MsSUFBWTtRQUV2RCxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFFLEVBQUc7WUFFN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxDQUFDLEtBQXFCLENBQUM7U0FFcEQ7YUFBTTtZQUVOLE9BQU8sQ0FBQyxJQUFJLENBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsZUFBZSxDQUFFLENBQUM7WUFFbkQsT0FBTyxJQUFJLENBQUM7U0FFWjtJQUVGLENBQUM7SUFFTSxpQkFBaUIsQ0FBa0MsSUFBWSxFQUFFLE9BQWdCLEtBQUs7UUFFNUYsSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxFQUFHO1lBRTdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQW9DLENBQUM7U0FFaEU7YUFBTTtZQUVOLElBQUssQ0FBRSxJQUFJLEVBQUc7Z0JBRWIsT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQzthQUVuRDtZQUVELE9BQU8sSUFBSSxDQUFDO1NBRVo7SUFFRixDQUFDO0lBRUQ7O3FDQUVpQztJQUUxQixlQUFlLENBQUUsUUFBa0I7UUFFekMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7UUFFekMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFeEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFFLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1lBRW5ELElBQUssUUFBUSxFQUFHO2dCQUVmLFFBQVEsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUUsR0FBRyxRQUFRLENBQUM7YUFFakM7U0FFRDtJQUVGLENBQUM7SUFFTSxtQkFBbUIsQ0FBRSxJQUFZLEVBQUUsT0FBZ0IsS0FBSztRQUU5RCxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFFLEVBQUc7WUFFN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUM7WUFFdkMsT0FBTyxJQUFJLElBQUksQ0FBRSxHQUFHLENBQUM7U0FFckI7YUFBTTtZQUVOLElBQUssQ0FBRSxJQUFJLEVBQUc7Z0JBRWIsT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQzthQUVuRDtZQUVELE9BQU8sSUFBSSxDQUFDO1NBRVo7SUFFRixDQUFDO0lBRUQ7O3FDQUVpQztJQUV6QixhQUFhLENBQWtDLEtBQVE7UUFFOUQsSUFBSyxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUc7WUFFL0IsT0FBTyxLQUFLLENBQUM7U0FFYjthQUFNLElBQUssT0FBTyxJQUFJLEtBQUssRUFBRztZQUU5QixPQUFPLEtBQUssQ0FBQyxLQUFLLEVBQU8sQ0FBQztTQUUxQjthQUFNLElBQUssS0FBSyxZQUFZLEtBQUssRUFBRztZQUVwQyxPQUFPLEtBQUssQ0FBQyxNQUFNLEVBQU8sQ0FBQztTQUUzQjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBRWQsQ0FBQztJQUVNLElBQUksQ0FBRSxDQUFTO1FBRXJCLElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxDQUFRLENBQUUsQ0FBQyxFQUFHLEVBQUU7WUFFcEMsVUFBVSxDQUFFLEdBQUcsRUFBRTtnQkFFaEIsQ0FBQyxFQUFFLENBQUM7WUFFTCxDQUFDLEVBQUUsQ0FBRSxDQUFDLEdBQUcsSUFBSSxDQUFFLENBQUUsQ0FBQztRQUVuQixDQUFDLENBQUUsQ0FBQztRQUVKLE9BQU8sR0FBRyxDQUFDO0lBRVosQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsTUFBTSxDQUFFLFNBQWtCO1FBRWhDLElBQUssSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLEVBQUc7WUFFL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FFekI7UUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQztRQUV6QyxLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUV4QyxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxZQUFZLENBQUUsQ0FBQztZQUM5QyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRXpCLElBQUssSUFBSSxJQUFJLEdBQUcsRUFBRztnQkFFbEIsSUFBSSxDQUFDLGNBQWMsRUFBRyxDQUFDO2dCQUN2QixJQUFJLEdBQUcsQ0FBRSxDQUFDLENBQUM7Z0JBRVgsSUFBSyxRQUFRLENBQUMsbUJBQW1CLEVBQUc7b0JBRW5DLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBRSxDQUFDO2lCQUV6RDthQUVEO1lBRUQsSUFBSyxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUc7Z0JBRWhDLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ2pDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzdCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBRWpDLElBQUssUUFBUSxFQUFHO29CQUVmLElBQUksSUFBSSxDQUFFLFNBQVMsSUFBSSxLQUFLLENBQUUsR0FBRyxRQUFRLENBQUM7b0JBRTFDLElBQUssUUFBUSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFHO3dCQUVuQyxJQUFJLEdBQUcsR0FBRyxDQUFDO3FCQUVYO2lCQUVEO2dCQUVELElBQUksS0FBSyxHQUF5QixRQUFRLENBQUMsU0FBUyxDQUFDO2dCQUVyRCxJQUFLLElBQUksR0FBRyxHQUFHLEVBQUc7b0JBRWpCLElBQUssUUFBUSxFQUFHO3dCQUVmLEtBQUssR0FBRyxRQUFRLENBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBRSxJQUFJLENBQUUsQ0FBRSxDQUFDO3FCQUU1RTtpQkFFRDtnQkFFRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLFlBQVksQ0FBRSxDQUFDO2dCQUVsRCxJQUFLLE9BQU8sYUFBYSxJQUFJLFFBQVEsSUFBSSxDQUFFLENBQUUsTUFBTSxJQUFJLGFBQWEsQ0FBRSxFQUFHO29CQUV4RSxJQUFJLENBQUMsUUFBUSxDQUFFLFlBQVksQ0FBRSxHQUFHLEtBQUssQ0FBQztpQkFFdEM7cUJBQU0sSUFBSyxNQUFNLElBQUksYUFBYSxFQUFHO29CQUVyQyxhQUFhLENBQUMsSUFBSSxDQUFFLEtBQVksQ0FBRSxDQUFDO2lCQUVuQztnQkFHRCxJQUFJLENBQUMsYUFBYSxDQUFFO29CQUNuQixJQUFJLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUU7b0JBQzNCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7aUJBQ3JCLENBQUUsQ0FBQzthQUVKO1lBRUQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FFckI7UUFFRCxPQUFRLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRztZQUV6QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRXJDLElBQUssSUFBSSxFQUFHO2dCQUVYLElBQUksRUFBRSxDQUFDO2FBRVA7U0FFRDtRQUVELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMsYUFBYSxDQUFFO1lBQ25CLElBQUksRUFBRSxRQUFRO1lBQ2QsU0FBUyxFQUFFLFNBQVM7U0FDcEIsQ0FBRSxDQUFDO1FBRUosSUFBSyxJQUFJLENBQUMsV0FBVyxFQUFHO1lBRXZCLElBQUksQ0FBQyxhQUFhLENBQUU7Z0JBQ25CLElBQUksRUFBRSxTQUFTO2dCQUNmLFNBQVMsRUFBRSxTQUFTO2FBQ3BCLENBQUUsQ0FBQztTQUVKO0lBRUYsQ0FBQztJQUVNLGNBQWMsQ0FBRSxNQUFlO1FBRXJDLElBQUssTUFBTSxFQUFHO1lBRWIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUUsQ0FBQztZQUN4QyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLE1BQU0sQ0FBRSxDQUFDO1lBRTVDLElBQUssUUFBUSxJQUFJLGFBQWEsRUFBRztnQkFFaEMsSUFBSyxPQUFPLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUUsQ0FBRSxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBRSxFQUFHO29CQUUxRSxRQUFRLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztpQkFFL0I7YUFFRDtZQUVELE9BQU87U0FFUDtRQUVELElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBRXZDLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRXZDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7WUFDMUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztZQUU5QyxJQUFLLFFBQVEsSUFBSSxhQUFhLEVBQUc7Z0JBRWhDLHNDQUFzQztnQkFFdEMsSUFBSyxPQUFPLFFBQVEsQ0FBQyxLQUFLLElBQUksUUFBUSxJQUFJLENBQUUsQ0FBRSxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBRSxFQUFHO29CQUUxRSxRQUFRLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztpQkFFL0I7YUFFRDtTQUdEO0lBR0YsQ0FBQztDQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWU4QjtBQUVZO0FBR3BDLE1BQU0sVUFBVyxTQUFRLHVDQUFVO0lBSXpDLFlBQWEsS0FBcUM7UUFFakQsSUFBSSxHQUFHLEdBQUcsSUFBSSxpREFBb0IsRUFBRSxDQUFDO1FBRXJDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWpCLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUN6QixRQUFRLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUMzQixRQUFRLENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBQyxFQUFFLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBRTdCLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBRXJCLFVBQVUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUVwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLFlBQVksQ0FBRSxRQUFRLENBQUUsQ0FBQztRQUN2QyxJQUFJLE9BQU8sR0FBRyxJQUFJLFdBQVcsQ0FBRSxVQUFVLENBQUUsQ0FBQztRQUM1QyxJQUFJLEVBQUUsR0FBRyxJQUFJLFlBQVksQ0FBRSxPQUFPLENBQUUsQ0FBQztRQUVyQyxHQUFHLENBQUMsWUFBWSxDQUFFLFVBQVUsRUFBRSxJQUFJLGtEQUFxQixDQUFFLEdBQUcsRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxZQUFZLENBQUUsSUFBSSxFQUFFLElBQUksa0RBQXFCLENBQUUsRUFBRSxFQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7UUFDN0QsR0FBRyxDQUFDLFFBQVEsQ0FBRSxJQUFJLGtEQUFxQixDQUFFLE9BQU8sRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1FBRXhELEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksSUFBSSw4REFBSSxDQUFDO1FBQ2hELEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUM5RSxLQUFLLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyw2Q0FBZ0IsQ0FBQztRQUVwRixJQUFJLEdBQUcsR0FBRyxJQUFJLGlEQUFvQixDQUFFLEtBQUssQ0FBRSxDQUFDO1FBRTVDLEtBQUssQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUVyQyxJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUU1QixDQUFDO0lBRU0sTUFBTSxDQUFFLElBQW1CO1FBRWpDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUUvRCxDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxREQ7O2lDQUVpQztBQUUxQixJQUFVLE1BQU0sQ0ErSHRCO0FBL0hELFdBQWlCLE1BQU07SUFTdEIsa0xBQWtMO0lBRXJLLHdCQUFpQixHQUFHLENBQUMsQ0FBQztJQUN0Qix1QkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDekIsNEJBQXFCLEdBQUcsU0FBUyxDQUFDO0lBQ2xDLGlDQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNoQywrQkFBd0IsR0FBRyxFQUFFLENBQUM7SUFDOUIscUNBQThCLEdBQUcsR0FBRyxHQUFHLCtCQUF3QixDQUFDO0lBRTdFLFNBQVMsV0FBVyxDQUFFLENBQXNCO1FBRTNDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFaEQsQ0FBQztJQUNELFNBQVMsV0FBVyxDQUFFLENBQXNCO1FBRTNDLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFN0MsQ0FBQztJQUNELFNBQVMsV0FBVyxDQUFFLENBQXNCO1FBRTNDLE9BQU8sQ0FBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUVsQyxDQUFDO0lBRUQsU0FBZ0IsZUFBZSxDQUFFLENBQXNCLEVBQUUsQ0FBUztRQUVqRSxPQUFPLEdBQUcsR0FBRyxXQUFXLENBQUUsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUUsQ0FBQyxDQUFFLENBQUM7SUFFdkYsQ0FBQztJQUplLHNCQUFlLGtCQUk5QjtJQUVELFNBQWdCLFVBQVUsQ0FBRSxDQUFzQixFQUFFLENBQVM7UUFFNUQsT0FBTyxDQUFFLENBQUUsV0FBVyxDQUFFLENBQUMsQ0FBRSxHQUFHLENBQUMsR0FBRyxXQUFXLENBQUUsQ0FBQyxDQUFFLENBQUUsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFFLENBQUMsQ0FBRSxDQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFFMUYsQ0FBQztJQUplLGlCQUFVLGFBSXpCO0lBRUQsU0FBUyxNQUFNLENBQUUsQ0FBUyxFQUFFLE1BQWMsRUFBRSxJQUFZLEVBQUUsQ0FBc0I7UUFFL0UsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUVqQixLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUNBQTBCLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFdkQsUUFBUSxHQUFHLE1BQU0sR0FBRyxDQUFFLElBQUksR0FBRyxNQUFNLENBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsUUFBUSxHQUFHLFVBQVUsQ0FBRSxDQUFDLEVBQUUsUUFBUSxDQUFFLENBQUM7WUFFckMsSUFBSyxRQUFRLEdBQUcsQ0FBQyxFQUFHO2dCQUVuQixJQUFJLEdBQUcsUUFBUSxDQUFDO2FBRWhCO2lCQUFNO2dCQUVOLE1BQU0sR0FBRyxRQUFRLENBQUM7YUFFbEI7U0FFRDtRQUVELE9BQU8sUUFBUSxDQUFDO0lBRWpCLENBQUM7SUFFRCxTQUFTLE1BQU0sQ0FBRSxDQUFRLEVBQUUsQ0FBc0IsRUFBRSxDQUFTO1FBRTNELEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyx3QkFBaUIsRUFBRSxDQUFDLEVBQUcsRUFBRztZQUU5QyxJQUFJLEtBQUssR0FBRyxlQUFlLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1lBRXBDLElBQUssS0FBSyxJQUFJLEdBQUcsRUFBRztnQkFFbkIsT0FBTyxDQUFDLENBQUM7YUFFVDtZQUVELElBQUksUUFBUSxHQUFHLENBQUUsVUFBVSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxDQUFDLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztTQUV0QjtRQUVELE9BQU8sQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQUVELFNBQWdCLGVBQWUsQ0FBRSxDQUFzQixFQUFFLENBQVMsRUFBRSxLQUFlO1FBRWxGLENBQUMsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUUsQ0FBQztRQUNoRCxDQUFDLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBRSxDQUFFLENBQUM7UUFFaEQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRWYsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFekMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDZixJQUFLLENBQUMsR0FBRyxLQUFLLENBQUUsQ0FBQyxDQUFFO2dCQUFHLE1BQU07U0FFNUI7UUFFRCxJQUFJLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBRSwrQkFBd0IsR0FBRyxHQUFHLENBQUUsQ0FBQztRQUNwRCxJQUFJLElBQUksR0FBRyxlQUFlLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxHQUFHLENBQUUsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFFLENBQUM7UUFFckQsSUFBSyxJQUFJLElBQUksR0FBRyxFQUFHO1lBRWxCLE9BQU8sQ0FBQyxDQUFDO1NBRVQ7YUFBTSxJQUFLLElBQUksR0FBRyxJQUFJLEVBQUc7WUFFekIsT0FBTyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztTQUV6QjthQUFNO1lBRU4sT0FBTyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcscUNBQThCLEVBQUUsQ0FBQyxDQUFFLENBQUM7U0FFN0Q7SUFHRixDQUFDO0lBaENlLHNCQUFlLGtCQWdDOUI7QUFFRixDQUFDLEVBL0hnQixNQUFNLEtBQU4sTUFBTSxRQStIdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsSStDO0FBQ2U7QUFDbEI7QUFDVTtBQUMyQjtBQWtEM0UsTUFBTSxnQkFBaUIsU0FBUSw2REFBWTtJQW1CakQsWUFBYSxHQUFZO1FBRXhCLEtBQUssRUFBRSxDQUFDO1FBZkYsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUVsQyxRQUFRO1FBRUQsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBRTVCLFlBQVk7UUFFTCxZQUFPLEdBQXdCLEVBQUUsQ0FBQztRQUNsQyxZQUFPLEdBQXNCLEVBQUUsQ0FBQztRQU10QyxJQUFLLEdBQUcsRUFBRztZQUVWLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUM7U0FFekI7SUFFRixDQUFDO0lBRU0sT0FBTyxDQUFFLEdBQVc7UUFFMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksU0FBUyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxDQUFFLENBQUMsRUFBRyxFQUFFO1lBRXpCLE9BQU8sQ0FBQyxLQUFLLENBQUUsQ0FBQyxDQUFFLENBQUM7UUFFcEIsQ0FBQyxDQUFDO0lBRUgsQ0FBQztJQUVNLGFBQWEsQ0FBRSxRQUFnQjtRQUVyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBRS9CLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7WUFFN0IsSUFBSyxHQUFHLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRztnQkFFMUIsSUFBSyxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRztvQkFFeEIsSUFBSSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUUsQ0FBRSxDQUFDO2lCQUUvQzthQUVEO1FBRUYsQ0FBQyxDQUFDO1FBRUYsR0FBRyxDQUFDLElBQUksQ0FBRSxLQUFLLEVBQUUsUUFBUSxDQUFFLENBQUM7UUFDNUIsR0FBRyxDQUFDLElBQUksRUFBRyxDQUFDO0lBRWIsQ0FBQztJQUVEOztxQ0FFaUM7SUFFekIsV0FBVyxDQUFFLElBQWlCO1FBRXJDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFFeEIsVUFBVTtRQUVWLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFFO1lBRWxDLElBQUksTUFBTSxHQUFHLElBQUksdUVBQWUsQ0FBRSxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUM7WUFFcEQsSUFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFFNUQsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRztnQkFFbkQsSUFBSSxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFDLElBQUksV0FBVyxHQUFHLElBQUksK0RBQVcsQ0FBRSxlQUFlLENBQUUsQ0FBQztnQkFFckQsVUFBVSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUUsVUFBVSxDQUFDLEVBQUU7b0JBRS9ELElBQUksS0FBSyxHQUFHLElBQUkscURBQU0sRUFBRSxDQUFDO29CQUV6QixLQUFLLENBQUMsR0FBRyxDQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFFLEtBQUssQ0FBQyxFQUFFO3dCQUU1QyxPQUFPLElBQUkscUVBQWMsQ0FBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFFLENBQUM7b0JBRXJFLENBQUMsQ0FBRSxDQUFFLENBQUM7b0JBRU4sV0FBVyxDQUFDLFNBQVMsQ0FBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBRSxDQUFDO2dCQUVqRCxDQUFDLENBQUUsQ0FBQztnQkFFSixNQUFNLENBQUMsY0FBYyxDQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFFLENBQUM7YUFFdkQ7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQztRQUU3QixDQUFDLENBQUUsQ0FBQztRQUVKLFVBQVU7UUFFVixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBRSxVQUFVLENBQUMsRUFBRTtZQUVsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxVQUFVLENBQUUsQ0FBQztRQUVqQyxDQUFDLENBQUUsQ0FBQztRQUVKLGlCQUFpQjtRQUVqQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRXJDLENBQUM7SUFFTyxjQUFjLENBQUUsSUFBb0I7UUFFM0MsSUFBSSxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO0lBRXhELENBQUM7SUFFRDs7cUNBRWlDO0lBRXpCLE1BQU0sQ0FBRSxLQUFZO1FBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBRXZCLENBQUM7SUFFTyxTQUFTLENBQUUsQ0FBZTtRQUVqQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQWUsQ0FBQztRQUU1QyxJQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksWUFBWSxFQUFHO1lBRS9CLElBQUksQ0FBQyxXQUFXLENBQUUsR0FBRyxDQUFDLElBQUksQ0FBRSxDQUFDO1NBRTdCO2FBQU0sSUFBSyxHQUFHLENBQUMsSUFBSSxJQUFJLGVBQWUsRUFBRztZQUV6QyxJQUFJLENBQUMsY0FBYyxDQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUUsQ0FBQztTQUdoQztJQUVGLENBQUM7SUFFTyxPQUFPLENBQUUsQ0FBWTtRQUU1QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFFbEIsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsaUJBQWlCLENBQUUsVUFBa0I7UUFFM0MsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWhELElBQUssSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFHO2dCQUUzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFFLENBQUMsT0FBTyxDQUFDO2FBRWpDO1NBRUQ7UUFFRCxPQUFPLEVBQUUsQ0FBQztJQUVYLENBQUM7SUFFTSxTQUFTLENBQUUsVUFBa0I7UUFFbkMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWhELElBQUssSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLElBQUksVUFBVSxFQUFHO2dCQUUzQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFFLENBQUM7YUFFekI7U0FFRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBRWIsQ0FBQztJQUVNLGFBQWEsQ0FBRSxVQUFrQjtRQUV2QyxJQUFJLE9BQU8sR0FBc0IsRUFBRSxDQUFDO1FBQ3BDLElBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxVQUFVLENBQUUsQ0FBQztRQUUxRCxjQUFjLENBQUMsT0FBTyxDQUFFLFVBQVUsQ0FBQyxFQUFFO1lBRXBDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUUsVUFBVSxDQUFFLENBQUM7WUFFMUMsSUFBSyxNQUFNLEVBQUc7Z0JBRWIsT0FBTyxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUUsQ0FBQzthQUV2QjtRQUVGLENBQUMsQ0FBRSxDQUFDO1FBRUosT0FBTyxPQUFPLENBQUM7SUFFaEIsQ0FBQztJQUVNLHlCQUF5QixDQUFFLFFBQWdCO1FBRWpELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFFakMsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUM7WUFFN0MsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxJQUFFLFFBQVEsQ0FBQztRQUV4RCxDQUFDLENBQUMsSUFBSSxJQUFJO0lBRVgsQ0FBQztJQUVNLFdBQVcsQ0FBRSxPQUFlLEVBQUUsS0FBYSxFQUFFLEdBQVc7UUFFOUQsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDNUIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXJDLElBQUksQ0FBQyxTQUFTLENBQUUsaUJBQWlCLEVBQUUsQ0FBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFFLENBQUM7SUFFNUYsQ0FBQztJQUVEOztxQ0FFaUM7SUFFMUIsT0FBTztRQUViLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUVsQixDQUFDO0lBRU0sU0FBUztRQUVmLElBQUssSUFBSSxDQUFDLEVBQUUsRUFBRztZQUVkLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsRUFBRSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFFdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FFdkI7SUFFRixDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVU4QjtBQUNDO0FBQ29CO0FBRTdDLE1BQU0sT0FBUSxTQUFRLHVDQUFVO0lBS3RDLFlBQWEsT0FBb0IsRUFBRSxTQUF5QztRQUUzRSxJQUFJLEdBQUcsR0FBRyxJQUFJLHNEQUF5QixDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUVoRCxTQUFTLENBQUMsWUFBWSxHQUFHLG1EQUFJLENBQUM7UUFFOUIsSUFBSSxHQUFHLEdBQUcsZ0VBQXlCLENBQUUsU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUN4RCxNQUFNLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLElBQUksMENBQWEsRUFBRTthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDUixLQUFLLEVBQUUsSUFBSSwwQ0FBYSxFQUFFO2FBQzFCO1lBQ0QsVUFBVSxFQUFFO2dCQUNYLEtBQUssRUFBRSxJQUFJLDBDQUFhLEVBQUU7YUFDMUI7WUFDRCxXQUFXLEVBQUU7Z0JBQ1osS0FBSyxFQUFFLEdBQUc7YUFDVjtTQUNELENBQUUsQ0FBQztRQUVKLFNBQVMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBRXpCLElBQUksR0FBRyxHQUFHLElBQUksaURBQW9CLENBQUUsU0FBUyxDQUFFLENBQUM7UUFFaEQsS0FBSyxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUVyQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFFZixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBRWxCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUV2QixDQUFDO0lBRU0sTUFBTTtRQUVaLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBRSxDQUFDO1FBQzdFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUM1RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDO0lBRXhELENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRGlDO0FBSTNCLElBQVUsT0FBTyxDQXdJdkI7QUF4SUQsV0FBaUIsT0FBTztJQUV2QixTQUFnQixPQUFPLENBQUUsU0FBaUIsQ0FBQztRQUUxQyxPQUFPLENBQUUsQ0FBUyxFQUFHLEVBQUU7WUFFdEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFFLE1BQU0sR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUUsQ0FBQztZQUM5QyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUUsTUFBTSxDQUFFLENBQUM7WUFFOUIsT0FBTyxDQUFFLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUMsR0FBRyxFQUFFLENBQUUsQ0FBRSxHQUFHLENBQUMsQ0FBQztRQUV0RSxDQUFDLENBQUM7SUFFSCxDQUFDO0lBWGUsZUFBTyxVQVd0QjtJQUVELFNBQWdCLFVBQVUsQ0FBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEtBQWE7UUFFbEUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLEVBQUUsQ0FBRSxLQUFLLEdBQUcsR0FBRyxDQUFFLEdBQUcsQ0FBRSxHQUFHLEdBQUcsR0FBRyxDQUFFLENBQUUsQ0FBRSxDQUFDO1FBQ3RFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7SUFFOUIsQ0FBQztJQUxlLGtCQUFVLGFBS3pCO0lBRUQ7O01BRUU7SUFFRixTQUFnQixNQUFNLENBQUUsQ0FBUztRQUVoQyxPQUFPLENBQUMsQ0FBQztJQUVWLENBQUM7SUFKZSxjQUFNLFNBSXJCO0lBRUQsU0FBZ0IsVUFBVSxDQUFFLENBQVM7UUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWQsQ0FBQztJQUplLGtCQUFVLGFBSXpCO0lBRUQsU0FBZ0IsV0FBVyxDQUFFLENBQVM7UUFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7SUFFdEIsQ0FBQztJQUplLG1CQUFXLGNBSTFCO0lBRUQsU0FBZ0IsYUFBYSxDQUFFLENBQVM7UUFFdkMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztJQUVyRCxDQUFDO0lBSmUscUJBQWEsZ0JBSTVCO0lBRUQsU0FBZ0IsV0FBVyxDQUFFLENBQVM7UUFFckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVsQixDQUFDO0lBSmUsbUJBQVcsY0FJMUI7SUFFRCxTQUFnQixZQUFZLENBQUUsQ0FBUztRQUV0QyxPQUFPLENBQUUsRUFBRyxDQUFDLENBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBSmUsb0JBQVksZUFJM0I7SUFFRCxTQUFnQixjQUFjLENBQUUsQ0FBUztRQUV4QyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFFLEdBQUcsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUM7SUFFL0UsQ0FBQztJQUplLHNCQUFjLGlCQUk3QjtJQUVELFNBQWdCLFdBQVcsQ0FBRSxDQUFTO1FBRXJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXRCLENBQUM7SUFKZSxtQkFBVyxjQUkxQjtJQUVELFNBQWdCLFlBQVksQ0FBRSxDQUFTO1FBRXRDLE9BQU8sQ0FBQyxHQUFHLENBQUUsRUFBRyxDQUFDLENBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQyxDQUFDO0lBSmUsb0JBQVksZUFJM0I7SUFFRCxTQUFnQixjQUFjLENBQUUsQ0FBUztRQUV4QyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxFQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWxFLENBQUM7SUFKZSxzQkFBYyxpQkFJN0I7SUFFRCxTQUFnQixXQUFXLENBQUUsQ0FBUztRQUVyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFMUIsQ0FBQztJQUplLG1CQUFXLGNBSTFCO0lBRUQsU0FBZ0IsWUFBWSxDQUFFLENBQVM7UUFFdEMsT0FBTyxDQUFDLEdBQUcsQ0FBRSxFQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVyQyxDQUFDO0lBSmUsb0JBQVksZUFJM0I7SUFFQyxTQUFnQixjQUFjLENBQUUsQ0FBUztRQUV4QyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUUsRUFBRyxDQUFDLENBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUUsQ0FBQztJQUplLHNCQUFjLGlCQUk3QjtJQUVILFNBQWdCLE1BQU0sQ0FBRSxFQUFjLEVBQUUsRUFBYyxFQUFFLEVBQWMsRUFBRSxFQUFjO1FBRXJGLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFFLG9FQUErQixDQUFFLENBQUM7UUFFekQsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9FQUErQixFQUFFLEVBQUcsQ0FBQyxFQUFHO1lBRTVELEtBQUssQ0FBRSxDQUFDLENBQUUsR0FBRyxzREFBaUIsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUUsb0VBQStCLEdBQUcsR0FBRyxDQUFFLENBQUUsQ0FBQztTQUU1SDtRQUVELE9BQU8sQ0FBRSxDQUFTLEVBQUcsRUFBRTtZQUV0QixJQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQUcsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTdCLE9BQU8sc0RBQWlCLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLDJEQUFzQixDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFFLENBQUUsQ0FBQztRQUV4SixDQUFDLENBQUM7SUFFSCxDQUFDO0lBbkJlLGNBQU0sU0FtQnJCO0lBRUQsU0FBZ0IsV0FBVyxDQUFFLEdBQVcsRUFBRSxHQUFXLEVBQUUsR0FBVyxFQUFFLEdBQVc7UUFFOUUsT0FBTyxNQUFNLENBQ1osRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFDbEIsRUFBRSxDQUFDLEVBQUUsR0FBYSxFQUFFLENBQUMsRUFBRSxHQUFhLEVBQUUsRUFDdEMsRUFBRSxDQUFDLEVBQUUsR0FBYSxFQUFFLENBQUMsRUFBRSxHQUFhLEVBQUUsRUFDdEMsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FDbEIsQ0FBQztJQUVILENBQUM7SUFUZSxtQkFBVyxjQVMxQjtBQUVGLENBQUMsRUF4SWdCLE9BQU8sS0FBUCxPQUFPLFFBd0l2Qjs7Ozs7Ozs7Ozs7Ozs7OztBQ2xJTSxNQUFNLGVBQWU7SUFJM0I7UUFGUSxXQUFNLEdBQW9CLEVBQUUsQ0FBQztJQUlyQyxDQUFDO0lBRU0sZ0JBQWdCLENBQUUsSUFBWSxFQUFFLFFBQThCO1FBRXBFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFFO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsUUFBUSxFQUFFLFFBQVE7U0FDbEIsQ0FBRSxDQUFDO0lBRUwsQ0FBQztJQUVNLGFBQWEsQ0FBRSxLQUFZO1FBRWpDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBRXBCLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUUvQyxJQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLEVBQUc7Z0JBRTFDLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUSxDQUFFLEtBQUssQ0FBRSxDQUFDO2FBRW5DO1NBRUQ7SUFFRixDQUFDO0lBRU0sbUJBQW1CLENBQUUsSUFBWSxFQUFFLFFBQWtCO1FBRTNELEtBQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRztZQUVoRCxJQUFLLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQyxRQUFRLEVBQUc7Z0JBRTdFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQzthQUUzQjtTQUVEO0lBRUYsQ0FBQztDQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RDhCO0FBRWE7QUFDVztBQUNIO0FBVzdDLE1BQU0sd0JBQXdCO0lBdUJwQyxZQUFhLFFBQTZCLEVBQUUsUUFBdUI7UUFSM0Qsa0JBQWEsR0FBOEIsRUFBRSxDQUFDO1FBVWxELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWpDLElBQUksQ0FBQyxRQUFRLEdBQUc7WUFDZixRQUFRLEVBQUU7Z0JBQ1QsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3BCO1NBQ0QsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRTtZQUN0QyxTQUFTLEVBQUUsK0NBQWtCO1lBQzdCLFNBQVMsRUFBRSwrQ0FBa0I7U0FDN0IsQ0FBRSxDQUFDO1FBRUosSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFFO1lBQ3BDLFNBQVMsRUFBRSxnREFBbUI7WUFDOUIsU0FBUyxFQUFFLGdEQUFtQjtTQUM5QixDQUFFLENBQUM7UUFFSixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSx5Q0FBWSxFQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLHVDQUFVLENBQUUsSUFBSSxzREFBeUIsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFFLENBQUM7SUFFaEMsQ0FBQztJQWxDRCxJQUFXLFdBQVc7UUFFbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUUsbUJBQW1CLENBQUUsQ0FBQztJQUUvRCxDQUFDO0lBZ0NNLHVCQUF1QjtRQUUxQixJQUFJLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFFLENBQUM7UUFDaEcsSUFBSSxPQUFPLEdBQUcsSUFBSSw4Q0FBaUIsQ0FBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLDZDQUFnQixFQUFFLDRDQUFlLENBQUUsQ0FBQztRQUM1SSxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUUzQixPQUFPLE9BQU8sQ0FBQztJQUVuQixDQUFDO0lBVU0sVUFBVSxDQUFFLGdCQUFzQixFQUFFLFlBQThDO1FBRXJGLElBQUksU0FBUyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBRSxRQUFRLENBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBRSxNQUFNLENBQUUsSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxNQUFNLElBQUksQ0FBRSxTQUFTLENBQUMsUUFBUSxJQUFJLFVBQVUsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRSxRQUFRLENBQUUsSUFBSSxDQUFFLENBQUMsSUFBSSxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBRSxRQUFRLENBQUUsSUFBSSxDQUFFLENBQUMsSUFBTSxTQUFrQixDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUUsQ0FBQztRQUVoVCxJQUFJLEtBQUssR0FBbUM7WUFDM0MsS0FBSyxFQUFFLHNEQUF5QjtZQUNoQyxLQUFLLEVBQUUsc0RBQXlCO1lBQ2hDLFNBQVMsRUFBRSxnREFBbUI7WUFDOUIsU0FBUyxFQUFFLGdEQUFtQjtZQUM5QixNQUFNLEVBQUUsNkNBQWdCO1lBQ3hCLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLGdEQUFtQixDQUFDLENBQUMsQ0FBQyw0Q0FBZTtZQUNuRCxhQUFhLEVBQUUsS0FBSztZQUNwQixXQUFXLEVBQUUsS0FBSztTQUNsQixDQUFDO1FBQ0YsSUFBSSxPQUFPLEdBQTZCLElBQUksQ0FBQztRQUM3QyxJQUFJLFdBQVcsR0FBMEMsSUFBSSxDQUFDO1FBRTlELElBQUssZ0JBQWdCLEVBQUc7WUFFdkIsSUFBSyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUc7Z0JBRXJDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFFM0IsSUFBSyxZQUFZLEVBQUc7b0JBRW5CLFdBQVcsR0FBRyxZQUFZLENBQUM7aUJBRTNCO2FBRUQ7aUJBQU07Z0JBRU4sV0FBVyxHQUFHLGdCQUFnQixDQUFDO2FBRS9CO1NBRUQ7UUFFRCxJQUFLLFdBQVcsRUFBRztZQUVsQixLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMvQyxLQUFLLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMvQyxLQUFLLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUMzRCxLQUFLLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUMzRCxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUNsRCxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztZQUM1QyxLQUFLLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUN2RSxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQztTQUVqRTtRQUVELElBQUksR0FBRyxHQUFHLElBQUksb0RBQXVCLENBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBRSxDQUFDO1FBRWxILElBQUksSUFBSSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRTVCLElBQUssT0FBTyxFQUFHO1lBRWQsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBRTtnQkFDdEMsY0FBYyxFQUFFLCtEQUFlO2dCQUMvQixRQUFRLEVBQUU7b0JBQ1QsR0FBRyxFQUFFO3dCQUNKLEtBQUssRUFBRSxPQUFPO3FCQUNkO2lCQUNEO2FBQ0QsQ0FBRSxDQUFDO1lBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBRSxVQUFVLEVBQUUsSUFBSSxDQUFFLENBQUM7U0FFakM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUVoQixDQUFDO0lBRU0sWUFBWSxDQUFFLEtBQXFDO1FBRXRELElBQUksR0FBRyxHQUFhLGdFQUF5QixDQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1FBRWxGLEtBQUssQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLEtBQUssQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLFlBQVksSUFBSSwrREFBSSxDQUFDO1FBRTdDLElBQUksR0FBRyxHQUFHLElBQUksaURBQW9CLENBQUUsS0FBSyxDQUFFLENBQUM7UUFFNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUUsR0FBRyxDQUFFLENBQUM7UUFFM0IsSUFBSSxNQUFNLEdBQXlCO1lBQ2xDLFFBQVEsRUFBRSxHQUFHO1lBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1NBQ3hCLENBQUM7UUFFRixPQUFPLE1BQU0sQ0FBQztJQUVsQixDQUFDO0lBRU0sT0FBTyxDQUFFLE1BQTRCLEVBQUUsSUFBd0IsRUFBRSxNQUFxQjtRQUV6RixJQUFJLElBQXdCLENBQUM7UUFFN0IsSUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksK0NBQWtCLEVBQUc7WUFFMUQsSUFBSSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7U0FFM0I7YUFBTTtZQUVOLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBRXpCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUVyQyxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBRTdDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUUxRCxJQUFJLENBQUMsV0FBVyxDQUFFLElBQUksRUFBRSxJQUFJLENBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBRSxtQkFBbUIsQ0FBRSxDQUFDO0lBRXpELENBQUM7SUFFUyxXQUFXLENBQUUsRUFBc0IsRUFBRSxFQUFzQjtRQUVqRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUN0QixFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztJQUVwQixDQUFDO0lBRU0sT0FBTztRQUVWLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUVkLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUVsRCxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBRTlCO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRXZDLENBQUM7SUFFTSxVQUFVLENBQUUsUUFBdUI7UUFFekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsUUFBUSxDQUFFLENBQUM7UUFFL0IsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRXRELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFFckMsTUFBTSxDQUFDLE9BQU8sQ0FBRSxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztTQUV6QztJQUVGLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7OztBQzVPTSxNQUFNLGdCQUFnQjtJQU01QixZQUFhLE1BQXNCLEVBQUUsU0FBb0IsRUFBRSxrQkFBNEI7UUFFdEYsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUM7UUFFbEIsSUFBSSxDQUFDLGFBQWEsR0FBRztZQUNwQixRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUU7WUFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtTQUM3QixDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFM0IsSUFBSyxDQUFFLGtCQUFrQixFQUFHO1lBRTNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBRSxDQUFDO1lBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBRSxDQUFDO1NBRW5GO0lBRUYsQ0FBQztJQUVNLGVBQWUsQ0FBRSxNQUFjO1FBRXJDLElBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUc7WUFFOUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUUsQ0FBRSxDQUFDO1NBRXRHO1FBRUQsSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRztZQUU5QixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBRSxDQUFFLENBQUM7U0FFekc7UUFFRCxJQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFHO1lBRTNCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxjQUFjLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBRSxNQUFNLENBQUUsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFFLENBQUUsQ0FBQztTQUUzSDtJQUVGLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7OztBQ3pETSxJQUFVLEtBQUssQ0FtRnJCO0FBbkZELFdBQWlCLEtBQUs7SUFFckIsU0FBZ0IsTUFBTSxDQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUV0RCxPQUFPLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUM7SUFFMUIsQ0FBQztJQUplLFlBQU0sU0FJckI7SUFFRCxTQUFnQixXQUFXLENBQUUsQ0FBVyxFQUFFLENBQVcsRUFBRSxDQUFTO1FBRS9ELElBQUssQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFHO1lBRTNCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVYLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO2dCQUVyQyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQyxDQUFFLENBQUUsR0FBRyxDQUFDLENBQUUsQ0FBQzthQUUzQztZQUVELE9BQU8sQ0FBQyxDQUFDO1NBRVQ7YUFBTTtZQUVOLE9BQU8sQ0FBQyxHQUFHLENBQUUsNEJBQTRCLENBQUUsQ0FBQztZQUU1QyxPQUFPLEtBQUssQ0FBQztTQUViO0lBRUYsQ0FBQztJQXRCZSxpQkFBVyxjQXNCMUI7SUFFRCxTQUFnQixZQUFZLENBQUUsQ0FBOEQsRUFBRSxDQUE4RCxFQUFFLENBQVM7UUFFdEssT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUUvQixDQUFDO0lBSmUsa0JBQVksZUFJM0I7SUFFRCxTQUFnQixlQUFlLENBQUUsQ0FBbUIsRUFBRSxDQUFtQixFQUFFLENBQVM7UUFFbkYsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUVoQyxDQUFDO0lBSmUscUJBQWUsa0JBSTlCO0lBRUQsU0FBZ0IsVUFBVSxDQUFFLENBQWMsRUFBRSxDQUFjLEVBQUUsQ0FBUztRQUVwRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRW5CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUUsR0FBRyxDQUFDLENBQUM7UUFDbEMsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRWxDLE9BQU8sRUFBRSxDQUFDO0lBRVgsQ0FBQztJQVhlLGdCQUFVLGFBV3pCO0lBRUQsU0FBZ0IsV0FBVyxDQUFFLEtBQTJCO1FBRXZELElBQUssT0FBTyxDQUFFLEtBQUssQ0FBRSxJQUFJLFFBQVEsRUFBRztZQUVuQyxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FFcEI7YUFBTSxJQUFLLEtBQUssWUFBWSxLQUFLLEVBQUc7WUFFcEMsT0FBTyxLQUFLLENBQUMsV0FBVyxDQUFDO1NBRXpCO2FBQU0sSUFBSyxXQUFXLElBQUksS0FBSyxJQUFJLFdBQVcsSUFBSSxLQUFLLElBQUksV0FBVyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksS0FBSyxFQUFHO1lBRXhHLE9BQU8sS0FBSyxDQUFDLFlBQVksQ0FBQztTQUUxQjthQUFNLElBQUssY0FBYyxJQUFJLEtBQUssRUFBRztZQUVyQyxPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUM7U0FFN0I7YUFBTSxJQUFLLFNBQVMsSUFBSSxLQUFLLEVBQUc7WUFFaEMsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDO1NBRXhCO0lBRUYsQ0FBQztJQXhCZSxpQkFBVyxjQXdCMUI7QUFFRixDQUFDLEVBbkZnQixLQUFLLEtBQUwsS0FBSyxRQW1GckI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pGOEI7QUFFeEIsTUFBTSxZQUFZO0lBS3hCLFlBQWEsSUFBb0I7UUFFaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDBDQUFhLEVBQUUsQ0FBQztJQUV0QyxDQUFDO0lBRUQsTUFBTTtRQUVMLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFFLElBQUksQ0FBRSxDQUFDO1FBRXRDLElBQUksSUFBSSxHQUFHLElBQUksMENBQWEsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVwRixJQUFJLENBQUMsR0FBRyxJQUFJLDZDQUFnQixFQUFFLENBQUMsZ0JBQWdCLENBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUUsQ0FBQztRQUNqRixDQUFDLENBQUMsUUFBUSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFFLENBQUM7UUFFckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFDO0lBRWxDLENBQUM7SUFFRCxXQUFXLENBQUUsV0FBMEI7UUFFdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsY0FBYyxDQUFFLEtBQUssQ0FBRSxDQUFFLENBQUM7SUFFbEYsQ0FBQztDQUVEOzs7Ozs7Ozs7Ozs7Ozs7O0FDUU0sTUFBTSxtQkFBbUI7SUFZL0IsWUFBYSxNQUFpQztRQUZ2Qyx1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFJckMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUM1QixJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLFVBQVUsQ0FBRSxDQUFDLENBQUUsQ0FBQztJQUV0QixDQUFDO0lBRUQsSUFBVyxxQkFBcUI7UUFFL0IsT0FBTyxJQUFJLENBQUM7SUFFYixDQUFDO0lBRU0sVUFBVSxDQUFFLFNBQWlCO1FBRW5DLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDWCxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVO1lBQzFCLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTO1lBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtTQUNqQyxDQUFDO0lBRUgsQ0FBQztJQUVNLG1CQUFtQixDQUFFLFNBQWtCO1FBRTdDLElBQUksWUFBWSxHQUFHLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7UUFDL0UsSUFBSSxHQUFHLEdBQUcsQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxZQUFZLENBQUUsR0FBRyxDQUFFLFNBQVMsSUFBSSxDQUFDLENBQUUsQ0FBQztRQUU5RCxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUMxRSxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBRSxHQUFHLEdBQUcsZUFBZSxDQUFFLENBQUUsQ0FBQztRQUVqRSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLENBQUUsR0FBRyxHQUFHLGdCQUFnQixDQUFFLENBQUM7UUFFM0QsSUFBSSxVQUFVLEdBQUcsU0FBUyxHQUFHLFVBQVUsQ0FBQztRQUV4QyxPQUFPLFVBQVUsQ0FBQztJQUVuQixDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JHZ0Q7QUFDVjtBQVVoQyxNQUFNLFlBQVk7SUE2QnhCLFlBQWEsYUFBMEI7UUExQjdCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFPL0IsZUFBVSxHQUFXLEdBQUcsQ0FBQztRQUN6QixtQkFBYyxHQUFXLEdBQUcsQ0FBQztRQUMxQixlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFFckIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0IsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUVyQixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLHNCQUFpQixHQUFXLENBQUMsQ0FBQztRQUU5QixvQkFBZSxHQUFXLENBQUMsQ0FBQztRQUM1QiwyQkFBc0IsR0FBVyxDQUFDLENBQUM7UUFHbkMsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixvQkFBZSxHQUFZLElBQUksQ0FBQztRQUl6QyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO1FBRXhFLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFCOztrQ0FFMEI7UUFFMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLCtDQUFRLEVBQUUsQ0FBQztRQUUvQixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBRTtZQUNsQixJQUFJLEVBQUUsV0FBVztZQUNqQixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxxREFBZSxFQUFFO1NBQ3pCLENBQUUsQ0FBQztJQUVMLENBQUM7SUFFRCxJQUFXLFNBQVM7UUFFbkIsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBRXhCLENBQUM7SUFFRCxJQUFXLGNBQWM7UUFFeEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBRTdCLENBQUM7SUFFRCxJQUFXLGdCQUFnQjtRQUUxQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUUvQixDQUFDO0lBRUQsSUFBVyxxQkFBcUI7UUFFL0IsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUM7SUFFcEMsQ0FBQztJQUVELElBQVcsd0JBQXdCO1FBRWxDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztRQUVaLEtBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztZQUVqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBRSxDQUFDO1lBQzdCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO1lBRXBDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBRSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBRSxDQUFDO1lBQ2pJLElBQUksQ0FBQyxHQUFHLENBQUUsQ0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxHQUFHLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUUsSUFBSSxDQUFDLENBQUM7WUFFOUosSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO1lBQ3hCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUV2QixHQUFHLElBQUksQ0FBQyxDQUFDO1lBRVQsSUFBSyxDQUFDLEdBQUcsR0FBRztnQkFBRyxNQUFNO1NBRXJCO1FBRUQsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7SUFFbkMsQ0FBQztJQUVNLEdBQUcsQ0FBRSxPQUE0QjtRQUV2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRSxPQUFPLENBQUUsQ0FBQztRQUU5QixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFcEIsT0FBTyxPQUFPLENBQUM7SUFFaEIsQ0FBQztJQUVNLFlBQVk7UUFFbEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBRSxDQUFzQixFQUFFLENBQXNCLEVBQVcsRUFBRTtZQUVoRixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDO1FBRXRDLENBQUMsQ0FBRSxDQUFDO1FBRUosS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWpELElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFFLENBQUMsa0JBQWtCLEdBQUcsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FFekU7SUFFRixDQUFDO0lBRU0sR0FBRyxDQUFFLElBQVk7UUFFdkIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWpELElBQUssSUFBSSxDQUFDLFFBQVEsQ0FBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLElBQUksSUFBSTtnQkFBRyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFFLENBQUM7U0FFakU7UUFFRCxPQUFPLENBQUMsSUFBSSxDQUFFLFdBQVcsR0FBRyxJQUFJLEdBQUcsaUJBQWlCLENBQUUsQ0FBQztRQUV2RCxPQUFPLElBQUksQ0FBQztJQUViLENBQUM7SUFFTSxNQUFNLENBQUUsU0FBaUI7UUFFL0IsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFM0IsSUFBSSxDQUFDLGVBQWUsQ0FBRSxTQUFTLENBQUUsQ0FBQztRQUVsQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUVuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztJQUVyQixDQUFDO0lBRVMsZUFBZSxDQUFFLFNBQWlCO1FBRTNDLElBQUksQ0FBQyxjQUFjLENBQUUsU0FBUyxDQUFFLENBQUM7UUFFakMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRXBCLElBQUksQ0FBQyxvQkFBb0IsQ0FBRSxTQUFTLENBQUUsQ0FBQztJQUV4QyxDQUFDO0lBRVMsY0FBYyxDQUFFLFNBQWlCO1FBRTFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFFLFNBQVMsQ0FBRSxDQUFDO1FBRWxDLElBQUssSUFBSSxDQUFDLFVBQVUsRUFBRztZQUV0QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBVSxXQUFXLENBQUUsQ0FBQztZQUVuRCxJQUFLLEdBQUcsRUFBRztnQkFFVixJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBRXJDO1NBRUQ7SUFFRixDQUFDO0lBRVMsWUFBWTtRQUVyQixJQUFLLElBQUksQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLEVBQUc7WUFFbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsUUFBUSxDQUFFLENBQUM7WUFFL0MsSUFBSyxPQUFPLEtBQUssSUFBSSxFQUFHO2dCQUV2QixJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQzthQUUxQjtpQkFBTTtnQkFFTixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7YUFFakM7WUFFRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFFLEVBQUUsQ0FBQyxDQUFFLENBQUM7U0FFNUc7SUFFRixDQUFDO0lBRVMscUJBQXFCLENBQUUsV0FBbUI7UUFFbkQsSUFBSSxTQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFZLEtBQUssQ0FBQztRQUU1QixJQUFLLElBQUksQ0FBQyxhQUFhLEVBQUc7WUFFekIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO1lBRXBELElBQUssV0FBVyxHQUFHLFFBQVEsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBRSxRQUFRLENBQUUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRztnQkFFbkYsSUFBSyxXQUFXLEdBQUcsQ0FBQyxFQUFHO29CQUV0QixJQUFLLENBQUUsV0FBVyxHQUFHLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRzt3QkFFbkYsU0FBUyxHQUFHLENBQUUsQ0FBQyxDQUFDO3FCQUVoQjtpQkFFRDtxQkFBTSxJQUFLLFdBQVcsR0FBRyxDQUFDLEVBQUc7b0JBRTdCLElBQUssV0FBVyxHQUFHLENBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLElBQUksQ0FBQyxDQUFFLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRzt3QkFFbkYsU0FBUyxHQUFHLENBQUMsQ0FBQztxQkFFZDtpQkFFRDthQUVEO1lBRUQsSUFBSyxTQUFTLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFHO2dCQUVsRCxJQUFLLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRztvQkFFOUMsSUFBSSxJQUFJLEdBQTBCO3dCQUNqQyxRQUFRLEVBQUUsSUFBSTt3QkFDZCxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWE7d0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVE7d0JBQy9DLFdBQVcsRUFBRSxXQUFXO3dCQUN4QixXQUFXLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxXQUFXLENBQUU7cUJBQ3BDLENBQUM7b0JBRUYsSUFBSSxNQUFzQixDQUFDO29CQUUzQixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7b0JBQzVILElBQUssU0FBUyxJQUFJLENBQUUsQ0FBQzt3QkFBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFFLElBQUksQ0FBRSxDQUFDO29CQUNsSSxJQUFLLFNBQVMsSUFBSSxDQUFDO3dCQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7b0JBRXBJLElBQUssWUFBWSxLQUFLLEtBQUssSUFBSSxNQUFNLEtBQUssS0FBSyxFQUFHO3dCQUVqRCxTQUFTLEdBQUcsQ0FBQyxDQUFDO3FCQUVkO2lCQUVEO2FBRUQ7WUFFRCxNQUFNLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztTQUV4QjthQUFNO1lBRU4sTUFBTSxHQUFHLElBQUksQ0FBQztTQUVkO1FBRUQsSUFBSyxTQUFTLEVBQUc7WUFFaEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FFMUI7UUFFRCxPQUFPLE1BQU0sQ0FBQztJQUVmLENBQUM7SUFFUyxVQUFVLENBQUUsV0FBbUI7UUFFeEMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRyxFQUFHO1lBRWpELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUUsQ0FBQyxDQUFFLENBQUM7WUFFN0IsR0FBRyxDQUFDLFVBQVUsQ0FBRSxJQUFJLENBQUMsVUFBVSxDQUFFLENBQUM7WUFFbEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFFLEdBQUcsRUFBRSxXQUFXLENBQUUsQ0FBQztZQUUvRCxJQUFLLE9BQU8sS0FBSyxJQUFJLEVBQUc7Z0JBRXZCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO2dCQUV6QixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBRXhDO1NBRUQ7UUFFRCxPQUFPLElBQUksQ0FBQztJQUViLENBQUM7SUFFUyx1QkFBdUIsQ0FBRSxPQUE0QixFQUFFLFdBQW1CO1FBRW5GLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQy9DLElBQUksZUFBZSxHQUFHLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBRSxXQUFXLENBQUUsQ0FBQztRQUVqRSxJQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUc7WUFFckIsSUFBSSxJQUFJLEdBQTBCO2dCQUNqQyxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsT0FBTztnQkFDaEIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUTtnQkFDL0MsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFFLFdBQVcsQ0FBRTthQUNwQyxDQUFDO1lBRUYsSUFBSyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRztnQkFFaEMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUcsRUFBRztvQkFFN0QsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUUsQ0FBQyxDQUFFLENBQUM7b0JBRWxELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUUsVUFBVSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUMsVUFBVSxDQUFFLENBQUM7b0JBRTFGLElBQUssT0FBTyxJQUFJLENBQUMsRUFBRzt3QkFFbkIsWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUUsSUFBSSxDQUFFLENBQUM7d0JBRS9ELElBQUssT0FBTyxHQUFHLENBQUMsRUFBRzs0QkFFbEIsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUUsSUFBSSxDQUFFLENBQUM7eUJBRXZEOzZCQUFNOzRCQUVOLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLElBQUksQ0FBRSxDQUFDO3lCQUUzRDtxQkFFRDtpQkFFRDthQUVEO1NBRUQ7UUFFRCxJQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUc7WUFFbkIsSUFBSyxJQUFJLENBQUMsY0FBYyxDQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUUsQ0FBQyxDQUFFLEVBQUc7Z0JBRTVELElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUU3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLENBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFFLENBQUM7YUFFckc7U0FFRDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBRWIsQ0FBQztJQUVTLGNBQWMsQ0FBRSxDQUFTLEVBQUUsQ0FBUyxFQUFFLElBQVk7UUFFM0QsSUFBSyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUc7WUFFNUIsT0FBTyxDQUFDLENBQUM7U0FFVDthQUFNLElBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFHO1lBRW5DLE9BQU8sQ0FBRSxDQUFDLENBQUM7U0FFWDthQUFNLElBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFHO1lBRXBDLE9BQU8sQ0FBQyxDQUFDO1NBRVQ7YUFBTTtZQUVOLE9BQU8sQ0FBQyxDQUFDO1NBRVQ7SUFFRixDQUFDO0lBRVMsb0JBQW9CLENBQUUsU0FBaUI7UUFFaEQsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBRSxHQUFHLENBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFFLENBQUM7UUFFM0wsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7UUFFdEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBRSxJQUFJLENBQUMsY0FBYyxDQUFFLENBQUM7SUFFakYsQ0FBQztJQUVTLHFCQUFxQixDQUFFLFNBQWlCO1FBRWpELE9BQU8sU0FBUyxHQUFHLENBQUUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUUsQ0FBQztJQUV0RSxDQUFDO0lBR1MsbUJBQW1CO1FBRTVCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsTUFBTSxDQUFDO0lBRTlFLENBQUM7SUFFUywyQkFBMkI7UUFFcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLGlCQUFpQixHQUFHLENBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLENBQUM7SUFFdkcsQ0FBQztJQUVNLE1BQU0sQ0FBRSxLQUFhO1FBRTNCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQztJQUV4QixDQUFDO0lBRU0sS0FBSztRQUVYLElBQUssSUFBSSxDQUFDLFVBQVU7WUFBRyxPQUFPO1FBRTlCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWxCLElBQUssQ0FBRSxJQUFJLENBQUMsYUFBYSxFQUFHO1lBRTNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUV2QztJQUVGLENBQUM7SUFFTSxJQUFJLENBQUUsS0FBYTtRQUV6QixJQUFLLENBQUUsSUFBSSxDQUFDLFVBQVU7WUFBRyxPQUFPO1FBRWhDLElBQUksQ0FBQyxNQUFNLENBQUUsS0FBSyxDQUFFLENBQUM7SUFFdEIsQ0FBQztJQUVNLE9BQU8sQ0FBRSxPQUFlLElBQUk7UUFFbEMsSUFBSyxDQUFFLElBQUksQ0FBQyxVQUFVO1lBQUcsT0FBTztRQUVoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV4QixJQUFLLENBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRztZQUUzQixJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFFLENBQUM7U0FFcEM7SUFFRixDQUFDO0lBRU0sUUFBUSxDQUFFLEtBQWdDO1FBRWhELElBQUksU0FBUyxHQUFXLENBQUMsQ0FBQztRQUUxQixJQUFPLEtBQUssQ0FBQyxNQUErQixDQUFDLHFCQUFxQixFQUFHO1lBRXBFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUE2QixDQUFDO1lBQ2pELElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RSxTQUFTLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1NBRXBEO2FBQU0sSUFBSyxPQUFPLEtBQUssQ0FBQyxNQUFNLElBQUksUUFBUSxFQUFHO1lBRTdDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBRSxDQUFDO1lBRXRDLElBQUssTUFBTSxFQUFHO2dCQUViLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUUsU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQzthQUVwRDtTQUVEO2FBQU0sSUFBSyxPQUFPLEtBQUssQ0FBQyxNQUFNLElBQUksUUFBUSxFQUFHO1lBRTdDLFNBQVMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO1NBRXpCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO1lBRW5FLElBQUssS0FBSyxDQUFDLFFBQVE7Z0JBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBRXZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXpCLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFFLENBQUM7UUFFbEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUUsR0FBRyxPQUFPLENBQUM7UUFFaEcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7SUFFeEIsQ0FBQztDQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyZ0I4QjtBQUV4QixNQUFNLE9BQVEsU0FBUSxrREFBcUI7SUFRakQ7UUFFQyxLQUFLLEVBQUUsQ0FBQztRQTBPQyxxQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDckIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUF6TzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSwwQ0FBYSxDQUFFLEdBQUcsRUFBRSxHQUFHLENBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksMENBQWEsQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFFM0MsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUUsTUFBTSxDQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUUsU0FBUyxDQUFFLElBQUksQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksTUFBTSxJQUFJLENBQUUsU0FBUyxDQUFDLFFBQVEsSUFBSSxVQUFVLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLElBQUksU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLElBQU0sU0FBa0IsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUFFLENBQUM7UUFFdlYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRXpCLENBQUM7SUFFTSxlQUFlLENBQUUsR0FBZ0I7UUFFdkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRSxDQUFDO1FBQ3hELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRSxNQUFNLENBQUUsQ0FBQztRQUN0RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxJQUFJLEVBQUUsS0FBSyxDQUFFLENBQUM7UUFDbkQsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBRSxDQUFDO1FBQzNELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFFLElBQUksRUFBRSxNQUFNLENBQUUsQ0FBQztRQUMxRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRSxJQUFJLEVBQUUsS0FBSyxDQUFFLENBQUM7UUFDdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7UUFFeEMsR0FBRyxDQUFDLGdCQUFnQixDQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUUsQ0FBQztRQUN2RSxHQUFHLENBQUMsZ0JBQWdCLENBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBRSxDQUFDO1FBQ3JFLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFFLENBQUM7UUFDbEUsR0FBRyxDQUFDLGdCQUFnQixDQUFFLGFBQWEsRUFBRSxhQUFhLENBQUUsQ0FBQztRQUNyRCxHQUFHLENBQUMsZ0JBQWdCLENBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBRSxDQUFDO1FBQ3JELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBRSxXQUFXLEVBQUUsV0FBVyxDQUFFLENBQUM7UUFDakQsR0FBRyxDQUFDLGdCQUFnQixDQUFFLFNBQVMsRUFBRSxXQUFXLENBQUUsQ0FBQztRQUMvQyxHQUFHLENBQUMsZ0JBQWdCLENBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBRSxDQUFDO1FBRTdELE1BQU0sWUFBWSxHQUFHLENBQUUsQ0FBTSxFQUFHLEVBQUU7WUFFakMsSUFBSyxHQUFHLENBQUMsV0FBVyxDQUFFLENBQUMsQ0FBQyxHQUFHLENBQUUsRUFBRztnQkFFL0IsR0FBRyxDQUFDLG1CQUFtQixDQUFFLFlBQVksRUFBRSxZQUFZLENBQUUsQ0FBQztnQkFDdEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLFdBQVcsRUFBRSxXQUFXLENBQUUsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLFVBQVUsRUFBRSxTQUFTLENBQUUsQ0FBQztnQkFDakQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLGFBQWEsRUFBRSxhQUFhLENBQUUsQ0FBQztnQkFDeEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLGFBQWEsRUFBRSxhQUFhLENBQUUsQ0FBQztnQkFDeEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLFdBQVcsRUFBRSxXQUFXLENBQUUsQ0FBQztnQkFDcEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLFNBQVMsRUFBRSxXQUFXLENBQUUsQ0FBQztnQkFDbEQsR0FBRyxDQUFDLG1CQUFtQixDQUFFLE9BQU8sRUFBRSxPQUFPLENBQUUsQ0FBQztnQkFFNUMsSUFBSSxDQUFDLG1CQUFtQixDQUFFLFlBQVksRUFBRSxZQUFZLENBQUUsQ0FBQzthQUV2RDtRQUVGLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBRSxZQUFZLEVBQUUsWUFBWSxDQUFFLENBQUM7SUFFckQsQ0FBQztJQUVNLGlCQUFpQixDQUFFLEdBQWdCO1FBRXpDLElBQUksQ0FBQyxhQUFhLENBQUU7WUFDbkIsSUFBSSxFQUFFLFlBQVk7WUFDbEIsR0FBRyxFQUFFLEdBQUc7U0FDUixDQUFFLENBQUM7SUFFTCxDQUFDO0lBRU0saUJBQWlCLENBQUUsVUFBeUI7UUFFbEQsSUFBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFBRyxPQUFPLElBQUksMENBQWEsQ0FBRSxHQUFHLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFFL0UsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7YUFDN0IsTUFBTSxDQUFFLFVBQVUsQ0FBRTthQUNwQixjQUFjLENBQUUsR0FBRyxDQUFFO2FBQ3JCLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDO1FBRVgsT0FBTyxDQUFDLENBQUM7SUFFVixDQUFDO0lBRU0sbUJBQW1CLENBQUUsR0FBZ0IsRUFBRSxNQUFnQjtRQUU3RCxNQUFNLElBQUksR0FBWSxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUUsQ0FBQyxDQUFhLENBQUM7UUFFM0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNwQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBRW5DLElBQUssTUFBTSxFQUFHO1lBRWIsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEIsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUM7U0FFakI7UUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLDBDQUFhLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxDQUFDO0lBRVYsQ0FBQztJQUVTLE1BQU0sQ0FBRSxDQUFTLEVBQUUsQ0FBUztRQUVyQyxJQUNDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFDbEM7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7U0FFdkI7YUFBTTtZQUVOLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztTQUUzRDtRQUVELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztJQUUzQixDQUFDO0lBRVMsT0FBTyxDQUFFLElBQVksRUFBRSxDQUFhO1FBRTdDLE1BQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUUsQ0FBQyxDQUFFLENBQUM7UUFFN0IsSUFBSyxLQUFLLEVBQUc7WUFFWixJQUFJLENBQUMsaUJBQWlCLENBQUUsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBQztTQUU1RDthQUFNO1lBRU4sSUFBSyxJQUFJLElBQUksS0FBSyxFQUFHO2dCQUVwQixJQUFJLENBQUMsaUJBQWlCLENBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFFLENBQUM7YUFFNUM7U0FFRDtJQUVGLENBQUM7SUFFUyxTQUFTLENBQUUsSUFBWSxFQUFFLENBQTJCO1FBRTdELE1BQU0sV0FBVyxHQUFLLENBQW1CLENBQUMsV0FBVyxDQUFDO1FBRXRELElBQUssV0FBVyxJQUFJLElBQUksRUFBRztZQUUxQixJQUFLLFdBQVcsSUFBSSxPQUFPLElBQUksQ0FBRSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFFLEVBQUc7Z0JBRXJFLElBQUksQ0FBQyxpQkFBaUIsQ0FBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQWlCLENBQUUsQ0FBQzthQUVwRTtTQUVEO2FBQU07WUFFTixJQUFJLENBQUMsaUJBQWlCLENBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUUsQ0FBQztTQUVwRDtJQUVGLENBQUM7SUFFUyxpQkFBaUIsQ0FBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxDQUF3QztRQUU5RyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFFckIsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDcEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFFcEMsSUFBSyxJQUFJLElBQUksT0FBTyxFQUFHO1lBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBRXZCLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1lBRXBCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUV2QixRQUFRLEdBQUcsSUFBSSxDQUFDO1NBRWhCO2FBQU0sSUFBSyxJQUFJLElBQUksTUFBTSxFQUFHO1lBRTVCLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFDO1lBRXBCLElBQUssSUFBSSxDQUFDLFVBQVUsRUFBRztnQkFFdEIsUUFBUSxHQUFHLElBQUksQ0FBQzthQUVoQjtTQUVEO2FBQU0sSUFBSyxJQUFJLElBQUksS0FBSyxFQUFHO1lBRTNCLElBQUssZUFBZSxJQUFJLENBQUMsRUFBRztnQkFFM0IsSUFBSyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUc7b0JBRWxDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2lCQUV4QjthQUVEO2lCQUFNO2dCQUVOLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBRXhCO1lBRUQsUUFBUSxHQUFHLElBQUksQ0FBQztTQUVoQjtRQUVELElBQUssUUFBUSxFQUFHO1lBRWYsSUFBSSxDQUFDLGFBQWEsQ0FBRTtnQkFDbkIsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsWUFBWSxFQUFFLENBQUM7Z0JBQ2YsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMvQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7YUFDekIsQ0FBRSxDQUFDO1NBRUo7SUFFRixDQUFDO0lBRU0sTUFBTTtRQUVaLElBQUssQ0FBRSxJQUFJLENBQUMsSUFBSSxFQUFHO1lBRWxCLElBQUksQ0FBQyxhQUFhLENBQUU7Z0JBQ25CLElBQUksRUFBRSxRQUFRO2dCQUNkLFlBQVksRUFBRSxJQUFJO2dCQUNsQixnQkFBZ0IsRUFBRSxPQUFPO2dCQUN6QixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7Z0JBQy9CLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTthQUN6QixDQUFFLENBQUM7U0FFSjtJQUVGLENBQUM7SUFLUyxLQUFLLENBQUUsQ0FBYTtRQUU3QixJQUFJLENBQUMsYUFBYSxDQUFFO1lBQ25CLElBQUksRUFBRSxPQUFPO1lBQ2IsVUFBVSxFQUFFLENBQUM7U0FDYixDQUFFLENBQUM7SUFFTCxDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsUThCO0FBRW9CO0FBUTVDLE1BQU0sY0FBYztJQVcxQixZQUFhLFFBQTZCLEVBQUUsT0FBZ0IsRUFBRSxjQUFxQztRQUVsRyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksd0NBQVcsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxREFBd0IsQ0FBRSxDQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUUsR0FBRyxDQUFFLENBQUM7UUFFckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLHVDQUFVLENBQUUsY0FBYyxJQUFJLElBQUksc0RBQXlCLENBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7UUFDeEYsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1FBRTlCLE9BQU8sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSw2REFBYSxDQUFDO1FBQzdELE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDMUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUc7WUFDN0IsS0FBSyxFQUFFLElBQUksMENBQWEsRUFBRTtTQUMxQixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNiLFFBQVEsRUFBRSxJQUFJLGlEQUFvQixDQUFFLE9BQU8sQ0FBRTtTQUM3QyxDQUFDO0lBRUgsQ0FBQztJQUVNLE1BQU0sQ0FBRSxrQkFBNEMsRUFBRSxlQUErQyxJQUFJO1FBRS9HLElBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdEQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQy9CLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFFakMsSUFBSyxrQkFBa0IsRUFBRztZQUV6QixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFFLGtCQUFrQixDQUFFLENBQUM7WUFFN0MsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7Z0JBRXhDLElBQUssUUFBUSxDQUFFLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBRSxFQUFHO29CQUU1QixRQUFRLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFFLElBQUksQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO2lCQUU5RDtxQkFBTTtvQkFFTixRQUFRLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsa0JBQWtCLENBQUUsSUFBSSxDQUFFLENBQUMsQ0FBRSxDQUFFLEVBQUUsQ0FBQztvQkFFbkUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO29CQUVuQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7aUJBRXBDO2FBRUQ7U0FFRDtRQUVELElBQUssWUFBWSxFQUFHO1lBRW5CLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBRSxZQUFZLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUV6RTthQUFNO1lBRU4sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUUsQ0FBQztTQUVuRDtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVoQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBRSxZQUFZLENBQUUsQ0FBQztRQUU5QyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBRSxlQUFlLENBQUUsQ0FBQztJQUVsRCxDQUFDO0NBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0Z5QztBQXFCbkMsTUFBTSxnQkFBZ0I7SUFNNUI7UUFKVSxjQUFTLEdBQXNELEVBQUUsQ0FBQztRQU0zRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUVmLENBQUM7SUFFTSxHQUFHLENBQWtDLE1BQW9DO1FBRS9FLElBQUssTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFHO1lBRW5DLE9BQU8sQ0FBQyxJQUFJLENBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxFQUFFLHdCQUF3QixDQUFFLENBQUM7WUFFbEUsT0FBTztTQUVQO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLEdBQUc7WUFDL0IsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLFFBQVEsRUFBRSxNQUFNLENBQUMsVUFBVTtZQUMzQixNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU07WUFDckIsS0FBSyxFQUFFLElBQUk7U0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBRSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUcsRUFBRTtZQUV4RCxPQUFPLENBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsQ0FBQyxDQUFFLENBQUM7UUFFSixJQUFLLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxNQUFNLENBQUMsSUFBSSxDQUFFLENBQUMsUUFBUSxFQUFHO1lBRS9DLElBQUksQ0FBQyxTQUFTLENBQUUsTUFBTSxDQUFDLElBQUksQ0FBRSxDQUFDLFFBQVEsR0FBRyxxREFBaUIsQ0FBRSxNQUFNLENBQUMsU0FBUyxDQUFFLENBQUMsQ0FBRSxDQUFDLEtBQUssQ0FBRSxDQUFDO1NBRTFGO1FBRUQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBRVosT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBRXBCLENBQUM7SUFFTSxHQUFHLENBQUssSUFBWTtRQUUxQixJQUFLLElBQUksQ0FBQyxTQUFTLENBQUUsSUFBSSxDQUFFLEVBQUc7WUFFN0IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxDQUFDLEtBQUssQ0FBQztTQUVwQzthQUFNO1lBRU4sT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQztZQUVuRCxPQUFPLElBQUksQ0FBQztTQUVaO0lBRUYsQ0FBQztJQUVNLGlCQUFpQixDQUFLLElBQVk7UUFFeEMsSUFBSyxJQUFJLENBQUMsU0FBUyxDQUFFLElBQUksQ0FBRSxFQUFHO1lBRTdCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUUsQ0FBQztTQUU5QjthQUFNO1lBRU4sT0FBTyxDQUFDLElBQUksQ0FBRSxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUUsQ0FBQztZQUVuRCxPQUFPLElBQUksQ0FBQztTQUVaO0lBRUYsQ0FBQztJQUVNLE1BQU0sQ0FBRSxJQUFZO1FBRTFCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUViLENBQUM7SUFFUyxJQUFJO1FBRWIsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7UUFFekMsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFeEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztZQUMzQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBRTdCLElBQUksQ0FBQyxHQUF5QyxJQUFJLENBQUM7WUFDbkQsSUFBSSxDQUFDLEdBQXlDLElBQUksQ0FBQztZQUVuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBRSxDQUFFLENBQUM7WUFFckYsSUFBSSxNQUFNLEdBQWtDLElBQUksQ0FBQztZQUVqRCxJQUFLLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFHO2dCQUV0QixDQUFDLEdBQUcsR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQztnQkFDbEIsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUUsQ0FBQyxDQUFFLENBQUM7YUFFakI7aUJBQU07Z0JBR04sS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRyxFQUFHO29CQUUzQyxDQUFDLEdBQUcsR0FBRyxDQUFFLENBQUMsQ0FBRSxDQUFDO29CQUNiLENBQUMsR0FBRyxHQUFHLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSxDQUFDO29CQUVqQixNQUFNLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFFbEIsSUFBSyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7d0JBQUcsTUFBTTtpQkFFeEM7Z0JBRUQsSUFBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUc7b0JBRTdCLENBQUMsR0FBRyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBQztpQkFFekM7YUFFRDtZQUVELElBQUssTUFBTSxFQUFHO2dCQUViLENBQUMsR0FBRyxNQUFNLENBQUUsQ0FBQyxDQUFFLENBQUM7YUFFaEI7aUJBQU0sSUFBSyxRQUFRLENBQUMsTUFBTSxFQUFHO2dCQUU3QixDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUUsQ0FBQzthQUV6QjtpQkFBTSxJQUFLLElBQUksQ0FBQyxhQUFhLEVBQUc7Z0JBRWhDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFFLENBQUMsQ0FBRSxDQUFDO2FBRTVCO1lBRUQsSUFBSyxRQUFRLENBQUMsUUFBUSxFQUFHO2dCQUV4QixJQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRztvQkFFN0IsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUUsQ0FBQztpQkFFMUQ7Z0JBR0QsSUFBSyxRQUFRLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRztvQkFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FBRSxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBRSxDQUFDLENBQUUsR0FBRyxHQUFHLENBQUUsQ0FBQztpQkFFbkQ7YUFFRDtpQkFBTTtnQkFFTixPQUFPLENBQUMsSUFBSSxDQUFFLEdBQUcsR0FBRyxJQUFJLENBQUUsQ0FBQyxDQUFFLEdBQUcsR0FBRyxFQUFFLDJCQUEyQixDQUFFLENBQUM7YUFFbkU7U0FHRDtJQUVGLENBQUM7Q0FFRDs7Ozs7Ozs7Ozs7Ozs7OztBQzlMTSxJQUFVLFdBQVcsQ0FvQjNCO0FBcEJELFdBQWlCLFdBQVc7SUFFM0IsU0FBZ0IsYUFBYSxDQUFFLEdBQUcsUUFBa0M7UUFFbkUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBRWIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFHLEVBQUc7WUFFNUMsSUFBSyxRQUFRLENBQUUsQ0FBQyxDQUFFLElBQUksU0FBUyxFQUFHO2dCQUVqQyxNQUFNLENBQUMsTUFBTSxDQUFFLEdBQUcsRUFBRSxRQUFRLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQzthQUVwQztTQUVEO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFFWixDQUFDO0lBaEJlLHlCQUFhLGdCQWdCNUI7QUFFRixDQUFDLEVBcEJnQixXQUFXLEtBQVgsV0FBVyxRQW9CM0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCOEI7QUFFeEIsTUFBTSxPQUFRLFNBQVEsa0RBQXFCO0lBRWpEO1FBRUMsS0FBSyxFQUFFLENBQUM7SUFFVCxDQUFDO0lBRU0sTUFBTTtRQUVaLElBQUksQ0FBQyxhQUFhLENBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUUsQ0FBQztJQUUxQyxDQUFDO0lBRU0sSUFBSSxDQUFFLElBQVk7UUFFeEIsT0FBTyxJQUFJLE9BQU8sQ0FBUSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUcsRUFBRTtZQUUvQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEVBQUU7Z0JBRXJCLE1BQU0sRUFBRSxDQUFDO2dCQUVULElBQUksQ0FBQyxtQkFBbUIsQ0FBRSxRQUFRLEVBQUUsUUFBUSxDQUFFLENBQUM7WUFFaEQsQ0FBQyxDQUFDO1lBRUYsSUFBSSxDQUFDLGdCQUFnQixDQUFFLFFBQVEsRUFBRSxRQUFRLENBQUUsQ0FBQztZQUU1QyxVQUFVLENBQUUsR0FBRyxFQUFFO2dCQUVoQixJQUFJLENBQUMsbUJBQW1CLENBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBRSxDQUFDO2dCQUUvQyxPQUFPLEVBQUUsQ0FBQztZQUVYLENBQUMsRUFBRSxJQUFJLEdBQUcsTUFBTSxDQUFFLENBQUM7UUFFcEIsQ0FBQyxDQUFFLENBQUM7SUFFTCxDQUFDO0NBRUQ7Ozs7Ozs7Ozs7O0FDMUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDO0FBQ0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixlQUFlLFVBQVU7QUFDekIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQixVQUFVO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QixnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekIsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZUFBZSxVQUFVO0FBQ3pCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsVUFBVTtBQUN6QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxVQUFVO0FBQ3pCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsVUFBVTtBQUN6QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckMsZUFBZSxZQUFZO0FBQzNCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxzQkFBc0I7QUFDckMsZUFBZSxZQUFZO0FBQzNCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEIsZUFBZSxzQkFBc0I7QUFDckMsZUFBZSxZQUFZO0FBQzNCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixzQkFBc0I7QUFDbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QixlQUFlLE1BQU07QUFDckIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxHQUFHO0FBQ2xCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDs7QUFFQTtBQUNBLDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxJQUEwQztBQUNsRCxRQUFRLG1DQUFPO0FBQ2Y7QUFDQSxTQUFTO0FBQUEsa0dBQUM7QUFDVjtBQUNBLFNBQVMsRUFLSjtBQUNMLENBQUMsb0RBQW9EOzs7Ozs7Ozs7Ozs7QUNyZXJEOzs7Ozs7Ozs7Ozs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDQztBQUVEO0FBQ2dCO0FBQ1Q7QUFDSztBQUNHO0FBQ2I7QUFDTTtBQUNUO0FBQ0E7QUFDQTtBQUNRO0FBQ1M7QUFDWjtBQUNFO0FBQ0Y7QUFDb0I7QUFDaEI7QUFDQTtBQUNSO0FBQ0g7QUFDRSIsInNvdXJjZXMiOlsid2VicGFjazovL09SRS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JhY2tncm91bmQvc2hhZGVycy9iYWNrZ3JvdW5kLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9ET01NZXNoL2RvbU1lc2gudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9zaGFkZXJzL3Bhc3NUaHJvdWdoLmZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvc2hhZGVycy9wYXNzVGhyb3VnaC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9zdFByb2Nlc3Npbmcvc2hhZGVycy9wYXNzVGhyb3cudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2NvcmUvQmFzZUxheWVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy9jb3JlL0NvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb24udHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmUudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmFja2dyb3VuZC9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmV6aWVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CbGVuZGVyQ29ubmVjdG9yL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9ET01NZXNoL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9FYXNpbmdzLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9FdmVudERpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGF5b3V0Q29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTGVycHMudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL01vdXNlUm90YXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUGFnZVNjcm9sbGVyL1BhZ2VTY3JvbGxlclNlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BhZ2VTY3JvbGxlci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9pbnRlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUG9zdFByb2Nlc3NpbmcvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1RpbWVsaW5lQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1VuaWZvcm1zLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9XYWl0TWFuLnRzIiwid2VicGFjazovL09SRS8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvd29sZnk4Ny1ldmVudGVtaXR0ZXIvRXZlbnRFbWl0dGVyLmpzIiwid2VicGFjazovL09SRS9leHRlcm5hbCB1bWQge1wiY29tbW9uanNcIjpcInRocmVlXCIsXCJjb21tb25qczJcIjpcInRocmVlXCIsXCJhbWRcIjpcInRocmVlXCIsXCJyb290XCI6XCJUSFJFRVwifSIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInRocmVlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInRocmVlXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIk9SRVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInRocmVlXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJPUkVcIl0gPSBmYWN0b3J5KHJvb3RbXCJUSFJFRVwiXSk7XG59KSh0aGlzLCAoX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fKSA9PiB7XG5yZXR1cm4gIiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudmFyeWluZyB2ZWM0IHZDb2xvcjtcXG5cXG52b2lkIG1haW4oIHZvaWQgKSB7XFxuICAgIFxcbiAgICB2ZWMzIHBvcyA9IHBvc2l0aW9uO1xcblxcbiAgICBwb3MueiA9IDEuMDtcXG4gICAgXFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zLCAxLjAgKTtcXG4gICAgXFxuICAgIHZVdiA9IHV2O1xcbiAgICB2Q29sb3IgPSB2ZWM0KCAxLjAgKTtcXG5cXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudW5pZm9ybSB2ZWMyIGRvbVBvcztcXG51bmlmb3JtIHZlYzIgZG9tU2l6ZTtcXG51bmlmb3JtIHZlYzIgd2luZG93U2l6ZTtcXG51bmlmb3JtIGZsb2F0IGFzcGVjdFJhdGlvO1xcblxcbnZvaWQgbWFpbiggIClcXG57XFxuICBmbG9hdCB3aWR0aCA9IGRvbVNpemUueCAvIHdpbmRvd1NpemUueDtcXG5cXG4gIC8v5bem5LiKKCAwLDAgKeOBq1xcbiAgdmVjMyBwb3MgPSBwb3NpdGlvbiArIHZlYzMoIDEuMCwtMS4wLDAuMCApO1xcblxcbiAgLy9zaXplXFxuICBwb3MueCAqPSB3aWR0aDtcXG4gIHBvcy55ICo9ICggd2lkdGggKiBhc3BlY3RSYXRpbyApICogKCBkb21TaXplLnkgLyBkb21TaXplLnggKTtcXG5cXG4gIHBvcyArPSB2ZWMzKCAtMS4wLCAxLjAsIDAuMCApO1xcblxcbiAgcG9zICs9IHZlYzMoIGRvbVBvcy54IC8gd2luZG93U2l6ZS54ICogMi4wLCAtZG9tUG9zLnkgLyB3aW5kb3dTaXplLnkgKiAyLjAsIDAuMCApO1xcblxcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3MsIDEuMCApO1xcbiAgdlV2ID0gdXY7XFxufVxcblwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG51bmlmb3JtIHNhbXBsZXIyRCB0ZXg7XFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh0ZXgsdlV2KTtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXG4gICAgdlV2ID0gdXY7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZvaWQgbWFpbigpIHtcXG4gICAgdlV2ID0gdXY7XFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1xcbn0gICBcIjsiLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vdXRpbHMvVW5pZm9ybXMnO1xuaW1wb3J0IHsgUG9pbnRlckV2ZW50QXJncyB9IGZyb20gJy4vQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllckJpbmRQYXJhbSBleHRlbmRzIFRIUkVFLldlYkdMUmVuZGVyZXJQYXJhbWV0ZXJzIHtcblx0bmFtZTogc3RyaW5nO1xuXHRjYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudDtcblx0YXNwZWN0U2V0dGluZz86IEFzcGVjdFNldHRpbmc7XG5cdHdyYXBwZXJFbGVtZW50PzogSFRNTEVsZW1lbnQgfCBudWxsO1xuXHR3cmFwcGVyRWxlbWVudFJlY3Q/OiBET01SZWN0IHwgbnVsbDtcblx0cGl4ZWxSYXRpbz86IG51bWJlclxufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJJbmZvIGV4dGVuZHMgTGF5ZXJCaW5kUGFyYW0ge1xuXHRzaXplOiBMYXllclNpemU7XG5cdGFzcGVjdFNldHRpbmc6IEFzcGVjdFNldHRpbmc7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllclNpemUge1xuXHRjYW52YXNBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHR3aW5kb3dTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dBc3BlY3RSYXRpbzogbnVtYmVyO1xuXHRjYW52YXNTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRjYW52YXNQaXhlbFNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHBpeGVsUmF0aW86IG51bWJlclxuXHRwb3J0cmFpdFdlaWdodDogbnVtYmVyO1xuXHR3aWRlV2VpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBc3BlY3RTZXR0aW5nIHtcblx0bWFpbkFzcGVjdDogbnVtYmVyO1xuXHRwb3J0cmFpdEFzcGVjdDogbnVtYmVyO1xuXHR3aWRlQXNwZWN0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUb3VjaEV2ZW50QXJncyB7XG5cdGV2ZW50OiBQb2ludGVyRXZlbnQgfCBUb3VjaEV2ZW50O1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0ZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cdHNjcmVlblBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHR3aW5kb3dQb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcbn1cblxuZXhwb3J0IGNsYXNzIEJhc2VMYXllciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIGluZm86IExheWVySW5mbztcblxuXHRwdWJsaWMgcmVuZGVyZXI/OiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXG5cdHB1YmxpYyBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHB1YmxpYyBjYW1lcmE6IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhO1xuXG5cdHByb3RlY3RlZCByZWFkeUFuaW1hdGUgPSBmYWxzZTtcblx0cHVibGljIHRpbWUgPSAwO1xuXHRwdWJsaWMgY29tbW9uVW5pZm9ybXM6IFVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMuaW5mbyA9IHtcblx0XHRcdG5hbWU6ICcnLFxuXHRcdFx0YXNwZWN0U2V0dGluZzoge1xuXHRcdFx0XHRtYWluQXNwZWN0OiAxNiAvIDksXG5cdFx0XHRcdHdpZGVBc3BlY3Q6IDEwIC8gMSxcblx0XHRcdFx0cG9ydHJhaXRBc3BlY3Q6IDEgLyAyLFxuXHRcdFx0fSxcblx0XHRcdHNpemU6IHtcblx0XHRcdFx0d2luZG93U2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0d2luZG93QXNwZWN0UmF0aW86IDEuMCxcblx0XHRcdFx0Y2FudmFzU2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0Y2FudmFzUGl4ZWxTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRjYW52YXNBc3BlY3RSYXRpbzogMS4wLFxuXHRcdFx0XHRwaXhlbFJhdGlvOiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyxcblx0XHRcdFx0cG9ydHJhaXRXZWlnaHQ6IDAuMCxcblx0XHRcdFx0d2lkZVdlaWdodDogMC4wXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuY29tbW9uVW5pZm9ybXMgPSB7XG5cdFx0XHR0aW1lOiB7XG5cdFx0XHRcdHZhbHVlOiAwXG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYSggNTAsIDEsIDAuMSwgMTAwMCApO1xuXG5cdH1cblxuXHRwdWJsaWMgdGljayggZGVsdGFUaW1lOiBudW1iZXIgKSB7XG5cblx0XHR0aGlzLnRpbWUgKz0gZGVsdGFUaW1lO1xuXG5cdFx0dGhpcy5jb21tb25Vbmlmb3Jtcy50aW1lLnZhbHVlID0gdGhpcy50aW1lO1xuXG5cdFx0aWYgKCB0aGlzLnJlYWR5QW5pbWF0ZSApIHtcblxuXHRcdFx0dGhpcy5hbmltYXRlKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGFuaW1hdGUoIGRlbHRhVGltZTogbnVtYmVyICkgeyB9XG5cblx0cHVibGljIG9uQmluZCggbGF5ZXJJbmZvOiBMYXllckJpbmRQYXJhbSApIHtcblxuXHRcdHRoaXMuaW5mby5uYW1lID0gbGF5ZXJJbmZvLm5hbWU7XG5cdFx0dGhpcy5pbmZvLmNhbnZhcyA9IGxheWVySW5mby5jYW52YXM7XG5cblx0XHRpZiAoIGxheWVySW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5zZXRXcmFwcGVyRWxlbWVudCggbGF5ZXJJbmZvLndyYXBwZXJFbGVtZW50IHx8IG51bGwsIGZhbHNlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLmluZm8uYXNwZWN0U2V0dGluZyA9IGxheWVySW5mby5hc3BlY3RTZXR0aW5nIHx8IHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nO1xuXHRcdHRoaXMuaW5mby5hbHBoYSA9IGxheWVySW5mby5hbHBoYTtcblx0XHR0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvID0gbGF5ZXJJbmZvLnBpeGVsUmF0aW8gfHwgdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbztcblxuXHRcdHRoaXMucmVuZGVyZXIgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJlciggdGhpcy5pbmZvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5kZWJ1Zy5jaGVja1NoYWRlckVycm9ycyA9IHRydWU7XG5cblx0XHR0aGlzLmluZm8uY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xuXG5cdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHR0aGlzLm9uUmVzaXplKCk7XG5cdFx0XHR0aGlzLnJlYWR5QW5pbWF0ZSA9IHRydWU7XG5cblx0XHR9LCAwICk7XG5cblx0fVxuXG5cdHB1YmxpYyBvblVuYmluZCgpIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ2Rpc3Bvc2UnXG5cdFx0fSApO1xuXG5cdFx0dGhpcy5yZW1vdmVDaGlsZHJlbnMoIHRoaXMuc2NlbmUgKTtcblxuXHRcdHRoaXMucmVhZHlBbmltYXRlID0gZmFsc2U7XG5cblx0fVxuXG5cdHByb3RlY3RlZCByZW1vdmVDaGlsZHJlbnMoIG9iamVjdDogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHRjb25zdCBsZW5ndGggPSBvYmplY3QuY2hpbGRyZW4ubGVuZ3RoO1xuXG5cdFx0Zm9yICggbGV0IGkgPSBsZW5ndGggLSAxOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdHRoaXMucmVtb3ZlQ2hpbGRyZW5zKCBvYmplY3QuY2hpbGRyZW5bIGkgXSApO1xuXG5cdFx0XHRsZXQgZ2VvOiBUSFJFRS5CdWZmZXJHZW9tZXRyeSB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblx0XHRcdGxldCBtYXQ6IFRIUkVFLk1hdGVyaWFsIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLmlzTWVzaCApIHtcblxuXHRcdFx0XHRnZW8gPSAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5nZW9tZXRyeTtcblx0XHRcdFx0bWF0ID0gKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5tYXRlcmlhbCBhcyBUSFJFRS5NYXRlcmlhbCApO1xuXG5cdFx0XHR9XG5cblx0XHRcdG9iamVjdC5yZW1vdmUoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gKSApO1xuXG5cdFx0XHRpZiAoIGdlbyApIHtcblxuXHRcdFx0XHRnZW8uZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggbWF0ICkge1xuXG5cdFx0XHRcdG1hdC5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFdyYXBwZXJFbGVtZW50KCB3cmFwcGVyRWxtOiBIVE1MRWxlbWVudCB8IG51bGwsIGRpc3BhdGNoUmVzaXplOiBib29sZWFuID0gdHJ1ZSApIHtcblxuXHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCA9IHdyYXBwZXJFbG07XG5cdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHdyYXBwZXJFbG0gPyB3cmFwcGVyRWxtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIDogbnVsbDtcblxuXHRcdGlmICggZGlzcGF0Y2hSZXNpemUgKSB7XG5cblx0XHRcdHRoaXMub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIG9uUmVzaXplKCkge1xuXG5cdFx0aWYgKCB0aGlzLnJlbmRlcmVyID09IG51bGwgKSByZXR1cm47XG5cblx0XHRjb25zdCBuZXdXaW5kb3dTaXplID0gbmV3IFRIUkVFLlZlY3RvcjIoIGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRcdGNvbnN0IG5ld0NhbnZhc1NpemUgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuc2V0KCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuY2xpZW50V2lkdGgsIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5jbGllbnRIZWlnaHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdG5ld0NhbnZhc1NpemUuY29weSggbmV3V2luZG93U2l6ZSApO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHBvcnRyYWl0V2VpZ2h0ID0gMS4wIC0gKCAoIG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueSApIC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcucG9ydHJhaXRBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLnBvcnRyYWl0QXNwZWN0ICk7XG5cdFx0cG9ydHJhaXRXZWlnaHQgPSBNYXRoLm1pbiggMS4wLCBNYXRoLm1heCggMC4wLCBwb3J0cmFpdFdlaWdodCApICk7XG5cblx0XHRsZXQgd2lkZVdlaWdodCA9IDEuMCAtICggKCBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnkgKSAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKSAvICggdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcubWFpbkFzcGVjdCAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLndpZGVBc3BlY3QgKTtcblx0XHR3aWRlV2VpZ2h0ID0gTWF0aC5taW4oIDEuMCwgTWF0aC5tYXgoIDAuMCwgd2lkZVdlaWdodCApICk7XG5cblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dTaXplLmNvcHkoIG5ld1dpbmRvd1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS53aW5kb3dBc3BlY3RSYXRpbyA9IG5ld1dpbmRvd1NpemUueCAvIG5ld1dpbmRvd1NpemUueTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLmNvcHkoIG5ld0NhbnZhc1NpemUgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNQaXhlbFNpemUuY29weSggbmV3Q2FudmFzU2l6ZS5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnJlbmRlcmVyLmdldFBpeGVsUmF0aW8oKSApICk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzQXNwZWN0UmF0aW8gPSBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnk7XG5cdFx0dGhpcy5pbmZvLnNpemUucG9ydHJhaXRXZWlnaHQgPSBwb3J0cmFpdFdlaWdodDtcblx0XHR0aGlzLmluZm8uc2l6ZS53aWRlV2VpZ2h0ID0gd2lkZVdlaWdodDtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0U2l6ZSggdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS54LCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLnkgKTtcblx0XHR0aGlzLmNhbWVyYS5hc3BlY3QgPSB0aGlzLmluZm8uc2l6ZS5jYW52YXNBc3BlY3RSYXRpbztcblx0XHR0aGlzLmNhbWVyYS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50UmVjdCA9IHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHBvaW50ZXJFdmVudCggZTogUG9pbnRlckV2ZW50QXJncyApIHtcblxuXHRcdGNvbnN0IGNhbnZhc1BvaW50ZXJQb3MgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXHRcdGNhbnZhc1BvaW50ZXJQb3MuY29weSggZS5wb3NpdGlvbiApO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8uY2FudmFzICkge1xuXG5cdFx0XHRjb25zdCBjYW52YXNSZWN0ID0gdGhpcy5pbmZvLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHRcdGNhbnZhc1BvaW50ZXJQb3Muc3ViKCBuZXcgVEhSRUUuVmVjdG9yMiggY2FudmFzUmVjdC54LCBjYW52YXNSZWN0LnkgKSApO1xuXG5cdFx0fVxuXG5cdFx0Y29uc3Qgc2NyZWVuUG9zaXRpb24gPSBjYW52YXNQb2ludGVyUG9zLmNsb25lKCk7XG5cdFx0c2NyZWVuUG9zaXRpb24uZGl2aWRlKCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplICk7XG5cdFx0c2NyZWVuUG9zaXRpb24ueSA9IDEuMCAtIHNjcmVlblBvc2l0aW9uLnk7XG5cdFx0c2NyZWVuUG9zaXRpb24ubXVsdGlwbHlTY2FsYXIoIDIuMCApLnN1YlNjYWxhciggMS4wICk7XG5cblxuXHRcdGNvbnN0IGFyZ3M6IFRvdWNoRXZlbnRBcmdzID0ge1xuXHRcdFx0ZXZlbnQ6IGUucG9pbnRlckV2ZW50LFxuXHRcdFx0cG9zaXRpb246IGNhbnZhc1BvaW50ZXJQb3MuY2xvbmUoKSxcblx0XHRcdGRlbHRhOiBlLmRlbHRhLmNsb25lKCksXG5cdFx0XHRzY3JlZW5Qb3NpdGlvbjogc2NyZWVuUG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdHdpbmRvd1Bvc2l0aW9uOiBlLnBvc2l0aW9uLmNsb25lKClcblx0XHR9O1xuXG5cdFx0aWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ2hvdmVyJyApIHtcblxuXHRcdFx0dGhpcy5vbkhvdmVyKCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ3N0YXJ0JyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoU3RhcnQoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnbW92ZScgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaE1vdmUoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnZW5kJyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoRW5kKCBhcmdzICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBvblRvdWNoU3RhcnQoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uVG91Y2hNb3ZlKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvblRvdWNoRW5kKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbkhvdmVyKCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvbldoZWVsKCBldmVudDogV2hlZWxFdmVudCwgdHJhY2twYWREZWx0YTogbnVtYmVyICkgeyB9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IFBvaW50ZXIgfSBmcm9tICcuLi91dGlscy9Qb2ludGVyJztcbmltcG9ydCB7IEJhc2VMYXllciwgTGF5ZXJCaW5kUGFyYW0gfSBmcm9tICcuL0Jhc2VMYXllcic7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQb2ludGVyRXZlbnRBcmdzIHtcblx0cG9pbnRlckV2ZW50OiBQb2ludGVyRXZlbnQ7XG5cdHBvaW50ZXJFdmVudFR5cGU6IHN0cmluZztcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQ29udHJvbGxlclBhcmFtIHtcblx0c2lsZW50PzogYm9vbGVhbjtcblx0cG9pbnRlckV2ZW50RWxlbWVudD86IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udHJvbGxlciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIHBvaW50ZXI6IFBvaW50ZXI7XG5cdHB1YmxpYyBjbG9jazogVEhSRUUuQ2xvY2s7XG5cblx0cHJvdGVjdGVkIGxheWVyczogQmFzZUxheWVyW10gPSBbXTtcblx0cHJvdGVjdGVkIHBvaW50ZXJFdmVudEVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggcGFyYW1ldGVyPzogQ29udHJvbGxlclBhcmFtICkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdGlmICggISAoIHBhcmFtZXRlciAmJiBwYXJhbWV0ZXIuc2lsZW50ICkgKSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCBcIiVjLSBvcmUtdGhyZWUgXCIgKyByZXF1aXJlKCBcIi4uLy4uL3BhY2thZ2UuanNvblwiICkudmVyc2lvbiArIFwiIC1cIiAsICdwYWRkaW5nOiA1cHggMTBweCA7YmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IGNvbG9yOiB3aGl0ZTtmb250LXNpemU6MTFweCcgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuY2xvY2sgPSBuZXcgVEhSRUUuQ2xvY2soKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0UG9pbnRlclxuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0dGhpcy5wb2ludGVyID0gbmV3IFBvaW50ZXIoKTtcblx0XHR0aGlzLnNldFBvaW50ZXJFdmVudEVsZW1lbnQoICggcGFyYW1ldGVyICYmIHBhcmFtZXRlci5wb2ludGVyRXZlbnRFbGVtZW50ICkgfHwgZG9jdW1lbnQuYm9keSApO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRFdmVudHNcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdGxldCBwb2ludGVyVXBkYXRlID0gdGhpcy5wb2ludGVyRXZlbnQuYmluZCggdGhpcyApO1xuXHRcdGxldCBwb2ludGVyV2hlZWwgPSB0aGlzLm9uV2hlZWwuYmluZCggdGhpcyApO1xuXHRcdGxldCBvcmllbnRhdGlvbmNoYW5nZSA9IHRoaXMub25PcmllbnRhdGlvbkRldmljZS5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IHdpbmRvd1Jlc2l6ZSA9IHRoaXMub25XaW5kb3dSZXNpemUuYmluZCggdGhpcyApO1xuXG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd1cGRhdGUnLCBwb2ludGVyVXBkYXRlICk7XG5cdFx0dGhpcy5wb2ludGVyLmFkZEV2ZW50TGlzdGVuZXIoICd3aGVlbCcsIHBvaW50ZXJXaGVlbCApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgd2luZG93UmVzaXplICk7XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdkaXNwb3NlJywgKCkgPT4ge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VwZGF0ZScsIHBvaW50ZXJVcGRhdGUgKTtcblx0XHRcdHRoaXMucG9pbnRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBwb2ludGVyV2hlZWwgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbmNoYW5nZSApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB3aW5kb3dSZXNpemUgKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMudGljaygpO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdGljaygpIHtcblxuXHRcdGNvbnN0IGRlbHRhVGltZSA9IHRoaXMuY2xvY2suZ2V0RGVsdGEoKTtcblxuXHRcdHRoaXMucG9pbnRlci51cGRhdGUoKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS50aWNrKCBkZWx0YVRpbWUgKTtcblxuXHRcdH1cblxuXHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSggdGhpcy50aWNrLmJpbmQoIHRoaXMgKSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25XaW5kb3dSZXNpemUoKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ub25SZXNpemUoKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uT3JpZW50YXRpb25EZXZpY2UoKSB7XG5cblx0XHR0aGlzLm9uV2luZG93UmVzaXplKCk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBwb2ludGVyRXZlbnQoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLnBvaW50ZXJFdmVudCggZSBhcyB1bmtub3duIGFzIFBvaW50ZXJFdmVudEFyZ3MgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uV2hlZWwoIGU6IFRIUkVFLkV2ZW50ICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLm9uV2hlZWwoIGUud2hlZWxFdmVudCwgZS50cmFja3BhZERlbHRhICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFQSVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgYWRkTGF5ZXIoIGxheWVyOiBCYXNlTGF5ZXIsIGxheWVySW5mbzogTGF5ZXJCaW5kUGFyYW0gKSB7XG5cblx0XHR3aGlsZSAoIHRoaXMuZ2V0TGF5ZXIoIGxheWVySW5mby5uYW1lICkgKSB7XG5cblx0XHRcdGxheWVySW5mby5uYW1lICs9ICdfJztcblxuXHRcdH1cblxuXHRcdHRoaXMubGF5ZXJzLnB1c2goIGxheWVyICk7XG5cblx0XHRsYXllci5vbkJpbmQoIGxheWVySW5mbyApO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0TGF5ZXIoIGxheWVyTmFtZTogc3RyaW5nICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIHRoaXMubGF5ZXJzWyBpIF0uaW5mby5uYW1lID09IGxheWVyTmFtZSApIHJldHVybiB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIG51bGw7XG5cblx0fVxuXG5cdHB1YmxpYyByZW1vdmVMYXllciggbGF5ZXJObWFlOiBzdHJpbmcgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IHRoaXMubGF5ZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0Y29uc3QgbGF5ZXIgPSB0aGlzLmxheWVyc1sgaSBdO1xuXG5cdFx0XHRpZiAoIGxheWVyLmluZm8ubmFtZSA9PSBsYXllck5tYWUgKSB7XG5cblx0XHRcdFx0bGF5ZXIub25VbmJpbmQoKTtcblxuXHRcdFx0XHR0aGlzLmxheWVycy5zcGxpY2UoIGksIDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0UG9pbnRlckV2ZW50RWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGlmICggdGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnBvaW50ZXIudW5yZWdpc3RlckVsZW1lbnQoIHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5wb2ludGVyLnJlZ2lzdGVyRWxlbWVudCggZWxtICk7XG5cblx0XHR0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgPSBlbG07XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xuXG5cdFx0dGhpcy5sYXllcnMuZm9yRWFjaCggaXRlbSA9PiB7XG5cblx0XHRcdHRoaXMucmVtb3ZlTGF5ZXIoIGl0ZW0uaW5mby5uYW1lICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLnRpY2sgPSAoKSA9PiB7XG5cblx0XHRcdHJldHVybjtcblxuXHRcdH07XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2Rpc3Bvc2UnIH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5pbXBvcnQgeyBGQ3VydmVHcm91cCB9IGZyb20gJy4vRkN1cnZlR3JvdXAnO1xyXG5cclxuZXhwb3J0IHR5cGUgQW5pbWF0aW9uRnJhbWVJbmZvID0ge1xyXG5cdHN0YXJ0OiBudW1iZXJcclxuXHRlbmQ6IG51bWJlclxyXG5cdGR1cmF0aW9uOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEFuaW1hdGlvbkFjdGlvbiBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlczoge1trZXk6c3RyaW5nXTpGQ3VydmVHcm91cH0gPSB7fTtcclxuXHRwcml2YXRlIHVuaWZvcm1zOiBVbmlmb3JtcztcclxuXHRcclxuXHRwdWJsaWMgZnJhbWU6IEFuaW1hdGlvbkZyYW1lSW5mbztcclxuXHJcblx0Y29uc3RydWN0b3IoIG5hbWU/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xyXG5cdFx0dGhpcy51bmlmb3JtcyA9IHt9O1xyXG5cclxuXHRcdHRoaXMuZnJhbWUgPSB7XHJcblx0XHRcdHN0YXJ0OiAwLFxyXG5cdFx0XHRlbmQ6IDAsXHJcblx0XHRcdGR1cmF0aW9uOiAwLFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkRmN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmY3VydmVHcm91cDogRkN1cnZlR3JvdXAgKSB7XHJcblxyXG5cdFx0dGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdID0gZmN1cnZlR3JvdXA7XHJcblxyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVtb3ZlRkN1cnZlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRkZWxldGUgdGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY2FsY0ZyYW1lKCkge1xyXG5cclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZXMgKVxyXG5cclxuXHRcdGxldCBtaW5TdGFydCA9IEluZmluaXR5XHJcblx0XHRsZXQgbWF4RW5kID0gLUluZmluaXR5XHJcblx0XHRcclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZSA9ICh0aGlzLmN1cnZlcylbIGN1cnZlS2V5c1sgaSBdIF07XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVTdGFydCA8IG1pblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHRtaW5TdGFydCA9IGN1cnZlLmZyYW1lU3RhcnQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZUVuZCA+IG1heEVuZCApIHtcclxuXHJcblx0XHRcdFx0bWF4RW5kID0gY3VydmUuZnJhbWVFbmQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIG1pblN0YXJ0ID09IC1JbmZpbml0eSB8fCBtYXhFbmQgPT0gSW5maW5pdHkpIHtcclxuXHJcblx0XHRcdG1pblN0YXJ0ID0gMDtcclxuXHRcdFx0bWF4RW5kID0gMVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZyYW1lLnN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lLmVuZCA9IG1heEVuZDtcclxuXHRcdHRoaXMuZnJhbWUuZHVyYXRpb24gPSB0aGlzLmZyYW1lLmVuZCAtIHRoaXMuZnJhbWUuc3RhcnQ7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBGQ3VydmVHcm91cCB8IG51bGwge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF0gfHwgbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGdldCB2YWx1ZXNcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGFzc2lnblVuaWZvcm1zKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdW5pZm9ybTogVEhSRUUuSVVuaWZvcm0gKSB7XHJcblxyXG5cdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmlmb3JtO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRVbmlmb3JtczxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVEhSRUUuSVVuaWZvcm08VD4gfCBudWxsIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdICkge1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IGN1cnZlR3JvdXAgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKHByb3BlcnR5TmFtZSlcclxuXHJcblx0XHRpZiggY3VydmVHcm91cCApIHtcclxuXHRcdFx0XHJcblx0XHRcdGxldCB1bmkgPSB7XHJcblx0XHRcdFx0dmFsdWU6IGN1cnZlR3JvdXAuY3JlYXRlSW5pdFZhbHVlKCkgYXMgVFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRcclxuXHRcdFx0dGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gPSB1bmk7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdW5pO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogVCB8IG51bGw7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciA+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0OiBUICk6IFQ7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgdW5pZm9ybSA9IHRoaXMuZ2V0VW5pZm9ybXMocHJvcGVydHlOYW1lKTtcclxuXHJcblx0XHRpZiggIXVuaWZvcm0gKSByZXR1cm4gdGFyZ2V0IHx8IG51bGw7XHJcblxyXG5cdFx0bGV0IHZhbHVlID0gdW5pZm9ybS52YWx1ZTtcclxuXHRcdFxyXG5cdFx0aWYoICF0YXJnZXQgKSByZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0aWYoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdHRhcmdldC54ID0gdmFsdWU7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0YXJnZXQueCA9IHZhbHVlLng7XHJcblx0XHR0YXJnZXQueSA9IHZhbHVlLnk7XHJcblxyXG5cdFx0aWYoICd6JyBpbiB0YXJnZXQgJiYgJ3onIGluIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LnogPSB2YWx1ZS56XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCAndycgaW4gdGFyZ2V0ICYmICd3JyBpbiB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRhcmdldC53ID0gdmFsdWUud1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRhcmdldCB8fCBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0PFQgZXh0ZW5kcyBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciApOiBUIHwgbnVsbDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWVBdDxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIsIHRhcmdldDogVCApOiBUO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciwgdGFyZ2V0PzogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgKTogVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRsZXQgY3VydmUgPSB0aGlzLmdldEZDdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWUgKTtcclxuXHJcblx0XHRpZiggdGFyZ2V0ICkgIHtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSByZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIGN1cnZlLmdldFZhbHVlKCBmcmFtZSB8fCAwLCB0YXJnZXQgKVxyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgcmV0dXJuIG51bGw7XHJcblx0XHRcdFx0XHJcblx0XHRcdHJldHVybiBjdXJ2ZS5nZXRWYWx1ZSggZnJhbWUgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRVcGRhdGVGcmFtZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cdFxyXG5cdHB1YmxpYyB1cGRhdGVGcmFtZSggZnJhbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cCA9IHRoaXMuY3VydmVzWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cdFx0XHRsZXQgdW5pID0gdGhpcy5nZXRVbmlmb3JtcyggY3VydmVLZXlzWyBpIF0gKTtcclxuXHJcblx0XHRcdGlmKCAhdW5pICkgY29udGludWU7XHJcblxyXG5cdFx0XHRpZiggdHlwZW9mIHVuaS52YWx1ZSA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdFx0dW5pLnZhbHVlID0gZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUpIHx8IDBcclxuXHRcdFx0XHRcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0ZmN1cnZlR3JvdXAuZ2V0VmFsdWUoZnJhbWUsIHVuaS52YWx1ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlJywgW3RoaXNdICk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEZDdXJ2ZUtleUZyYW1lIH0gZnJvbSAnLi9GQ3VydmVLZXlGcmFtZSc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMga2V5ZnJhbWVzOiBGQ3VydmVLZXlGcmFtZVtdID0gW107XHJcblxyXG5cdHByaXZhdGUgY2FjaGU6IHsgZnJhbWU6IG51bWJlciwgdmFsdWU6IG51bWJlciB9ID0geyBmcmFtZTogTmFOLCB2YWx1ZTogTmFOIH07XHJcblxyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRHVyYXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5zZXQoIGZyYW1lcyApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGZyYW1lcz86IEZDdXJ2ZUtleUZyYW1lW10gKSB7XHJcblxyXG5cdFx0aWYgKCBmcmFtZXMgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmtleWZyYW1lcy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdFx0ZnJhbWVzLmZvckVhY2goIGtleWZyYW1lID0+IHtcclxuXHJcblx0XHRcdFx0dGhpcy5hZGRLZXlGcmFtZSgga2V5ZnJhbWUgKTtcclxuXHJcblx0XHRcdH0gKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZEtleUZyYW1lKCBrZXlmcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0bGV0IGluZGV4ID0gMDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmtleWZyYW1lcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgZnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSBdO1xyXG5cclxuXHRcdFx0aWYgKCBmcmFtZS5jb29yZGluYXRlLnggPCBrZXlmcmFtZS5jb29yZGluYXRlLnggKSB7XHJcblxyXG5cdFx0XHRcdGluZGV4ICsrO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMua2V5ZnJhbWVzLnNwbGljZSggaW5kZXgsIDAsIGtleWZyYW1lICk7XHJcblxyXG5cdFx0Ly8gc2V0IGZyYW1lIGluZm9cclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gdGhpcy5rZXlmcmFtZXNbMF0uY29vcmRpbmF0ZS54XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gdGhpcy5rZXlmcmFtZXNbdGhpcy5rZXlmcmFtZXMubGVuZ3RoIC0gMV0uY29vcmRpbmF0ZS54XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggZnJhbWUgPT0gdGhpcy5jYWNoZS5mcmFtZSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmNhY2hlLnZhbHVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdmFsdWU6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMua2V5ZnJhbWVzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBrZXlmcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIF07XHJcblxyXG5cdFx0XHRpZiAoIGZyYW1lIDw9IGtleWZyYW1lLmNvb3JkaW5hdGUueCApIHtcclxuXHJcblx0XHRcdFx0bGV0IGJlZm9yZUtleUZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgLSAxIF07XHJcblxyXG5cdFx0XHRcdGlmICggYmVmb3JlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBiZWZvcmVLZXlGcmFtZS50bygga2V5ZnJhbWUsIGZyYW1lICk7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsdWUgPSBrZXlmcmFtZS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgPT09IG51bGwgJiYgdGhpcy5rZXlmcmFtZXMubGVuZ3RoID4gMCApIHtcclxuXHJcblx0XHRcdHZhbHVlID0gdGhpcy5rZXlmcmFtZXNbIHRoaXMua2V5ZnJhbWVzLmxlbmd0aCAtIDEgXS5jb29yZGluYXRlLnk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdmFsdWUgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhY2hlID0ge1xyXG5cdFx0XHRcdGZyYW1lOiBmcmFtZSxcclxuXHRcdFx0XHR2YWx1ZTogdmFsdWVcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRkN1cnZlLCBGQ3VydmVBeGlzIH0gZnJvbSAnLi9GQ3VydmUnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlR3JvdXBUeXBlID0gJ3NjYWxhcicgfCAndmVjMicgfCAndmVjMycgfCAndmVjNCdcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmVHcm91cCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGN1cnZlOiB7W2F4aXMgaW4gRkN1cnZlQXhpc106IEZDdXJ2ZSB8IG51bGx9O1xyXG5cdHB1YmxpYyB0eXBlOiBGQ3VydmVHcm91cFR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVEdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggbmFtZT86IHN0cmluZywgeD86IEZDdXJ2ZSwgeT86IEZDdXJ2ZSwgej86IEZDdXJ2ZSwgdz86IEZDdXJ2ZSwgc2NhbGFyPzogRkN1cnZlICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gbmFtZSB8fCAnJztcclxuXHRcdFxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gMDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gMDtcclxuXHRcdFxyXG5cdFx0dGhpcy5jdXJ2ZSA9IHtcclxuXHRcdFx0eDogbnVsbCxcclxuXHRcdFx0eTogbnVsbCxcclxuXHRcdFx0ejogbnVsbCxcclxuXHRcdFx0dzogbnVsbCxcclxuXHRcdFx0c2NhbGFyOiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdGlmKCB4ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHgsICd4JyApXHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiggeSApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB5LCAneScgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIHogKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeiwgJ3onIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIHcgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggdywgJ3cnIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldEZDdXJ2ZSggY3VydmU6IEZDdXJ2ZSwgYXhpczogRkN1cnZlQXhpcyApIHtcclxuXHJcblx0XHR0aGlzLmN1cnZlWyBheGlzIF0gPSBjdXJ2ZTtcclxuXHJcblx0XHR0aGlzLmNhbGNUeXBlKCk7XHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYWxjVHlwZSgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY3VydmUuc2NhbGFyICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5jdXJ2ZS53ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzQnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueiApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWMzJztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjMic7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS54ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBjYWxjRnJhbWUoKSB7XHJcblx0XHRcclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZSApXHJcblxyXG5cdFx0bGV0IG1pblN0YXJ0ID0gSW5maW5pdHlcclxuXHRcdGxldCBtYXhFbmQgPSAtSW5maW5pdHlcclxuXHRcdFxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlID0gKHRoaXMuY3VydmUgYXMge1trZXk6IHN0cmluZ106IEZDdXJ2ZX0pWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lU3RhcnQgPCBtaW5TdGFydCApIHtcclxuXHJcblx0XHRcdFx0bWluU3RhcnQgPSBjdXJ2ZS5mcmFtZVN0YXJ0O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVFbmQgPiBtYXhFbmQgKSB7XHJcblxyXG5cdFx0XHRcdG1heEVuZCA9IGN1cnZlLmZyYW1lRW5kO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBtaW5TdGFydCA9PSAtSW5maW5pdHkgfHwgbWF4RW5kID09IEluZmluaXR5KSB7XHJcblxyXG5cdFx0XHRtaW5TdGFydCA9IDA7XHJcblx0XHRcdG1heEVuZCA9IDFcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gbWluU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gbWF4RW5kO1xyXG5cdFx0dGhpcy5mcmFtZUR1cmF0aW9uID0gdGhpcy5mcmFtZUVuZCAtIHRoaXMuZnJhbWVTdGFydDtcclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgY3JlYXRlSW5pdFZhbHVlKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy50eXBlID09ICd2ZWMyJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMigpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PSAndmVjMycgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjMoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzQnICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3I0KCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ6IFQgKTogVDtcclxuXHJcblx0cHVibGljIGdldFZhbHVlKCBmcmFtZTogbnVtYmVyICk6IG51bWJlciB8IG51bGw7XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXI+KCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ/OiBUKTogVCB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGlmKCB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnggPSB0aGlzLmN1cnZlLnguZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueSApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnkgPSB0aGlzLmN1cnZlLnkuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUueiAmJiAneicgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueiA9IHRoaXMuY3VydmUuei5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS53ICAmJiAndycgaW4gdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQudyA9IHRoaXMuY3VydmUudy5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdFxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS5zY2FsYXIgKSB7XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdHJldHVybiAgdGhpcy5jdXJ2ZS5zY2FsYXIuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYywgRWFzaW5ncyB9IGZyb20gJy4uL0Vhc2luZ3MnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlSW50ZXJwb2xhdGlvbiA9IFwiQkVaSUVSXCIgfCBcIkxJTkVBUlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZUtleUZyYW1lIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaGFuZGxlTGVmdDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBoYW5kbGVSaWdodDogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBpbnRlcnBvbGF0aW9uOiBGQ3VydmVJbnRlcnBvbGF0aW9uID0gJ0JFWklFUic7XHJcblxyXG5cdHByaXZhdGUgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCA9IG51bGw7XHJcblx0cHJpdmF0ZSBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBjb29yZGluYXRlOiBUSFJFRS5WZWMyLCBoYW5kbGVMZWZ0PzogVEhSRUUuVmVjMiwgaGFuZGxlUmlnaHQ/OiBUSFJFRS5WZWMyLCBpbnRlcnBvbGF0aW9uPzogRkN1cnZlSW50ZXJwb2xhdGlvbiApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuc2V0KCBjb29yZGluYXRlLCBoYW5kbGVMZWZ0LCBoYW5kbGVSaWdodCwgaW50ZXJwb2xhdGlvbiApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXQoIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIsIGhhbmRsZUxlZnQ/OiBUSFJFRS5WZWMyLCBoYW5kbGVSaWdodD86IFRIUkVFLlZlYzIsIGludGVycG9sYXRpb24/OiBGQ3VydmVJbnRlcnBvbGF0aW9uICkge1xyXG5cclxuXHRcdHRoaXMuY29vcmRpbmF0ZSA9IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZUxlZnQgPSBoYW5kbGVMZWZ0IHx8IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmhhbmRsZVJpZ2h0ID0gaGFuZGxlUmlnaHQgfHwgY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaW50ZXJwb2xhdGlvbiA9IGludGVycG9sYXRpb24gfHwgJ0JFWklFUic7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRFYXNpbmcoIGludGVycG9sYXRpb246IEZDdXJ2ZUludGVycG9sYXRpb24sIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUgKSB7XHJcblxyXG5cdFx0aWYgKCBpbnRlcnBvbGF0aW9uID09ICdCRVpJRVInICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIEVhc2luZ3MuYmV6aWVyKCB0aGlzLmNvb3JkaW5hdGUsIHRoaXMuaGFuZGxlUmlnaHQsIG5leHRGcmFtZS5oYW5kbGVMZWZ0LCBuZXh0RnJhbWUuY29vcmRpbmF0ZSApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gKCB0OiBudW1iZXIgKSA9PiB7XHJcblxyXG5cdFx0XHRcdGxldCBkID0gKCBuZXh0RnJhbWUuY29vcmRpbmF0ZS55IC0gdGhpcy5jb29yZGluYXRlLnkgKTtcclxuXHRcdFx0XHR0ID0gKCB0IC0gdGhpcy5jb29yZGluYXRlLnggKSAvICggbmV4dEZyYW1lLmNvb3JkaW5hdGUueCAtIHRoaXMuY29vcmRpbmF0ZS54ICk7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmNvb3JkaW5hdGUueSArIHQgKiBkO1xyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHRvKCBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lLCB0OiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLm5leHRGcmFtZSA9PSBudWxsIHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueCAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS54IHx8IHRoaXMubmV4dEZyYW1lLmNvb3JkaW5hdGUueSAhPSBuZXh0RnJhbWUuY29vcmRpbmF0ZS55ICkge1xyXG5cclxuXHRcdFx0dGhpcy5lYXNpbmcgPSB0aGlzLmdldEVhc2luZyggdGhpcy5pbnRlcnBvbGF0aW9uLCBuZXh0RnJhbWUgKTtcclxuXHRcdFx0dGhpcy5uZXh0RnJhbWUgPSBuZXh0RnJhbWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdGhpcy5lYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5lYXNpbmcoIHQgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB7IHRocmVhZElkIH0gZnJvbSAnd29ya2VyX3RocmVhZHMnO1xuaW1wb3J0IHsgRWFzaW5ncywgRWFzaW5nRnVuYyB9IGZyb20gXCIuL0Vhc2luZ3NcIjtcbmltcG9ydCB7IExlcnBGdW5jLCBMZXJwcyB9IGZyb20gXCIuL0xlcnBzXCI7XG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gXCIuL1VuaWZvcm1zXCI7XG5cbmV4cG9ydCB0eXBlIEFuaW1hdG9yVmFyaWFibGVUeXBlID0gbnVtYmVyIHwgbnVtYmVyW10gfCBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5RdWF0ZXJuaW9uIHwgVEhSRUUuRXVsZXJcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdG9yVmFyaWFibGU8VD57XG5cdHRpbWU6IG51bWJlcjtcblx0ZHVyYXRpb24/OiBudW1iZXI7XG5cdHZhbHVlOiBUO1xuXHRzdGFydFZhbHVlOiBUO1xuXHRnb2FsVmFsdWU6IFQ7XG5cdG9uQW5pbWF0aW9uRmluaXNoZWQ/OiBGdW5jdGlvbiB8IG51bGw7XG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdGVhc2luZzogRWFzaW5nRnVuYztcblx0dXNlckRhdGE/OiBhbnk7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+IHtcblx0bmFtZTogc3RyaW5nO1xuXHRpbml0VmFsdWU6IFQ7XG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XG5cdGN1c3RvbUxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG5cdHVzZXJEYXRhPzogYW55O1xufVxuXG5leHBvcnQgY2xhc3MgQW5pbWF0b3IgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBkYXRhQmFzZToge1sga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZVR5cGUgfTtcblx0cHVibGljIGlzQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbIGtleTogc3RyaW5nIF06IEFuaW1hdG9yVmFyaWFibGU8QW5pbWF0b3JWYXJpYWJsZVR5cGU+IH07XG5cdHByb3RlY3RlZCBhbmltYXRpbmdDb3VudDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGRpc3BhdGNoRXZlbnRzOiBGdW5jdGlvbltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy52YXJpYWJsZXMgPSB7fTtcblx0XHR0aGlzLmRhdGFCYXNlID0ge307XG5cblx0fVxuXG5cdHB1YmxpYyBhZGQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggcGFyYW1zOiBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+ICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlOiBBbmltYXRvclZhcmlhYmxlPFQ+ID0ge1xuXHRcdFx0dGltZTogLSAxLFxuXHRcdFx0dmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0c3RhcnRWYWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRnb2FsVmFsdWU6IHRoaXMuZ2V0VmFsdWVDbG9uZSggcGFyYW1zLmluaXRWYWx1ZSApLFxuXHRcdFx0ZWFzaW5nOiBwYXJhbXMuZWFzaW5nIHx8IEVhc2luZ3Muc2lnbW9pZCgpLFxuXHRcdFx0bGVycEZ1bmM6ICggcGFyYW1zLmN1c3RvbUxlcnBGdW5jIHx8IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMuaW5pdFZhbHVlICkgKSBhcyBMZXJwRnVuYzxUPixcblx0XHRcdHVzZXJEYXRhOiBwYXJhbXMudXNlckRhdGEsXG5cdFx0fTtcblxuXHRcdHRoaXMuZGF0YUJhc2VbIHBhcmFtcy5uYW1lIF0gPSB2YXJpYWJsZS52YWx1ZTtcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHZhcmlhYmxlIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxBbmltYXRvclZhcmlhYmxlVHlwZT47XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoe1xuXHRcdFx0dHlwZTogJ2FkZGVkJyxcblx0XHRcdHZhck5hbWU6IHBhcmFtcy5uYW1lLFxuXHRcdFx0dmFyaWFibGUsXG5cdFx0fSlcblxuXHRcdHJldHVybiB2YXJpYWJsZTtcblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0U2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBzZXRFYXNpbmcoIG5hbWU6IHN0cmluZywgZWFzaW5nOiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLmVhc2luZyA9IGVhc2luZztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRWYWx1ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBUICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5kYXRhQmFzZVsgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZVR5cGU7XG5cblx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0XHR2YXJpYWJsZSA9IHZhbHVlO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCBcImNvcHlcIiBpbiB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR2YXJpYWJsZS5jb3B5KCB2YWx1ZSBhcyBhbnkgKTtcblxuXHRcdFx0fSBlbHNlIGlmICggdmFyaWFibGUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0XHQoIHZhcmlhYmxlIGFzIG51bWJlciBbXSApID0gKCB2YWx1ZSBhcyBudW1iZXJbXSApLmNvbmNhdCgpO1xuXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoIG5hbWUgKTtcblx0XHRcdHRoaXMuY2FuY2VsQW5pbWF0ZSggbmFtZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEFuaW1hdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFuaW1hdGU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nLCBnb2FsVmFsdWU6IFQsIGR1cmF0aW9uOiBudW1iZXIgPSAxLCBjYWxsYmFjaz86IEZ1bmN0aW9uLCBlYXNpbmc/OiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblx0XHRsZXQgcHJvbWlzZSA9IG5ldyBQcm9taXNlKCByZXNvbHZlID0+IHtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHRpZiAoIGR1cmF0aW9uIDw9IDAgKSB7XG5cblx0XHRcdFx0XHR0aGlzLnNldFZhbHVlKCBuYW1lLCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAxLjA7XG5cdFx0XHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9ICgpID0+IHtcblxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRyZXR1cm47XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICggdmFyaWFibGUudGltZSA9PSAtIDEgKSB7XG5cblx0XHRcdFx0XHR0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50ICsrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXJpYWJsZS50aW1lID0gMDtcblx0XHRcdFx0dmFyaWFibGUuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0dmFyaWFibGUuc3RhcnRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWVDbG9uZSggdmFyaWFibGUudmFsdWUgKTtcblx0XHRcdFx0dmFyaWFibGUuZ29hbFZhbHVlID0gdGhpcy5nZXRWYWx1ZUNsb25lKCBnb2FsVmFsdWUgKTtcblxuXHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0Y2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcblx0XHRcdFx0XHRyZXNvbHZlKCBudWxsICk7XG5cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAoIGVhc2luZyApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0RWFzaW5nKCBuYW1lLCBlYXNpbmcgKTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSApO1xuXG5cdFx0cmV0dXJuIHByb21pc2U7XG5cblx0fVxuXG5cdHB1YmxpYyBjYW5jZWxBbmltYXRlKCBuYW1lOiBzdHJpbmcgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSBudWxsO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0R2V0XG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBnZXQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggbmFtZTogc3RyaW5nICk6IFQgfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWUgYXMgdW5rbm93biBhcyBUO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIG11dGU6IGJvb2xlYW4gPSBmYWxzZSApOiBBbmltYXRvclZhcmlhYmxlPFQ+IHwgbnVsbCB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdIGFzIHVua25vd24gYXMgQW5pbWF0b3JWYXJpYWJsZTxUPjtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFV0aWxzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBhcHBseVRvVW5pZm9ybXMoIHVuaWZvcm1zOiBVbmlmb3JtcyApIHtcblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy5nZXRWYXJpYWJsZU9iamVjdCgga2V5c1sgaSBdICk7XG5cblx0XHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdFx0dW5pZm9ybXNbIGtleXNbIGkgXSBdID0gdmFyaWFibGU7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGlzQW5pbWF0aW5nVmFyaWFibGUoIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICkge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRsZXQgdGltZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF0udGltZTtcblxuXHRcdFx0cmV0dXJuIHRpbWUgIT0gLSAxLjA7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoICEgbXV0ZSApIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBudWxsO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVdGlsc1xuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwcml2YXRlIGdldFZhbHVlQ2xvbmU8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggdmFsdWU6IFQgKTogVCB7XG5cblx0XHRpZiAoIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXG5cdFx0fSBlbHNlIGlmICggJ2Nsb25lJyBpbiB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlLmNsb25lKCkgYXMgVDtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cblx0XHRcdHJldHVybiB2YWx1ZS5jb25jYXQoKSBhcyBUO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbHVlO1xuXG5cdH1cblxuXHRwdWJsaWMgd2FpdCggdDogbnVtYmVyICkge1xuXG5cdFx0bGV0IHBybSA9IG5ldyBQcm9taXNlPHZvaWQ+KCAoIHIgKSA9PntcblxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xuXG5cdFx0XHRcdHIoKTtcblxuXHRcdFx0fSwgKCB0ICogMTAwMCApICk7XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJtO1xuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRVcGRhdGVcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIHVwZGF0ZSggZGVsdGFUaW1lPzogbnVtYmVyICkge1xuXG5cdFx0aWYgKCB0aGlzLmFuaW1hdGluZ0NvdW50ID09IDAgKSB7XG5cblx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcblxuXHRcdH1cblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlTmFtZSA9IGtleXNbIGkgXTtcblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyB2YXJpYWJsZU5hbWUgXTtcblx0XHRcdGxldCB0aW1lID0gdmFyaWFibGUudGltZTtcblxuXHRcdFx0aWYgKCB0aW1lID09IDEuMCApIHtcblxuXHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50IC0tO1xuXHRcdFx0XHR0aW1lID0gLSAxO1xuXG5cdFx0XHRcdGlmICggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudHMucHVzaCggdmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIHRpbWUgPj0gMC4wICYmIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0bGV0IGR1cmF0aW9uID0gdmFyaWFibGUuZHVyYXRpb247XG5cdFx0XHRcdGxldCBlYXNpbmcgPSB2YXJpYWJsZS5lYXNpbmc7XG5cdFx0XHRcdGxldCBsZXJwRnVuYyA9IHZhcmlhYmxlLmxlcnBGdW5jO1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gKSB7XG5cblx0XHRcdFx0XHR0aW1lICs9ICggZGVsdGFUaW1lIHx8IDAuMDE2ICkgLyBkdXJhdGlvbjtcblxuXHRcdFx0XHRcdGlmICggZHVyYXRpb24gPT0gMCB8fCB0aW1lID49IDEuMCApIHtcblxuXHRcdFx0XHRcdFx0dGltZSA9IDEuMDtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHZhbHVlOiBBbmltYXRvclZhcmlhYmxlVHlwZSA9IHZhcmlhYmxlLmdvYWxWYWx1ZTtcblxuXHRcdFx0XHRpZiAoIHRpbWUgPCAxLjAgKSB7XG5cblx0XHRcdFx0XHRpZiAoIGxlcnBGdW5jICkge1xuXG5cdFx0XHRcdFx0XHR2YWx1ZSA9IGxlcnBGdW5jKCB2YXJpYWJsZS5zdGFydFZhbHVlLCB2YXJpYWJsZS5nb2FsVmFsdWUsIGVhc2luZyggdGltZSApICk7XG5cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBkYXRhQmFzZVZhbHVlID0gdGhpcy5kYXRhQmFzZVsgdmFyaWFibGVOYW1lIF07XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgZGF0YUJhc2VWYWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSApIHtcblxuXHRcdFx0XHRcdHRoaXMuZGF0YUJhc2VbIHZhcmlhYmxlTmFtZSBdID0gdmFsdWU7XG5cblx0XHRcdFx0fSBlbHNlIGlmICggJ2NvcHknIGluIGRhdGFCYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0XHRkYXRhQmFzZVZhbHVlLmNvcHkoIHZhbHVlIGFzIGFueSApO1xuXG5cdFx0XHRcdH1cblxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHRcdHR5cGU6ICd1cGRhdGUvJyArIGtleXNbIGkgXSxcblx0XHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFyaWFibGUudmFsdWVcblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhcmlhYmxlLnRpbWUgPSB0aW1lO1xuXG5cdFx0fVxuXG5cdFx0d2hpbGUgKCB0aGlzLmRpc3BhdGNoRXZlbnRzLmxlbmd0aCAhPSAwICkge1xuXG5cdFx0XHRsZXQgZnVuYyA9IHRoaXMuZGlzcGF0Y2hFdmVudHMucG9wKCk7XG5cblx0XHRcdGlmICggZnVuYyApIHtcblxuXHRcdFx0XHRmdW5jKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlRGF0YUJhc2UoKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdH0gKTtcblxuXHRcdGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICdhbmltYXRlJyxcblx0XHRcdFx0ZGVsdGFUaW1lOiBkZWx0YVRpbWVcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZURhdGFCYXNlKCB0YXJnZXQ/OiBzdHJpbmcgKSB7XG5cblx0XHRpZiAoIHRhcmdldCApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIHRhcmdldCBdO1xuXHRcdFx0bGV0IGRhdGFiYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyB0YXJnZXQgXTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSAmJiBkYXRhYmFzZVZhbHVlICkge1xuXG5cdFx0XHRcdGlmICggdHlwZW9mIHZhcmlhYmxlLnZhbHVlID09ICdudW1iZXInIHx8ICEgKCAnY29weScgaW4gdmFyaWFibGUudmFsdWUgKSApIHtcblxuXHRcdFx0XHRcdHZhcmlhYmxlLnZhbHVlID0gZGF0YWJhc2VWYWx1ZTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fVxuXG5cdFx0bGV0IGtleSA9IE9iamVjdC5rZXlzKCB0aGlzLmRhdGFCYXNlICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXkubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sga2V5WyBpIF0gXTtcblx0XHRcdGxldCBkYXRhYmFzZVZhbHVlID0gdGhpcy5kYXRhQmFzZVsga2V5WyBpIF0gXTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSAmJiBkYXRhYmFzZVZhbHVlICkge1xuXG5cdFx0XHRcdC8vIFZlY3Rvcuezu+OBr+WPgueFp+OBquOBruOBp251bWJlcuOBqG51bWJlcltd44GC44Gf44KK44Gg44GR5pu05pawXG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgdmFyaWFibGUudmFsdWUgPT0gJ251bWJlcicgfHwgISAoICdjb3B5JyBpbiB2YXJpYWJsZS52YWx1ZSApICkge1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudmFsdWUgPSBkYXRhYmFzZVZhbHVlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cblx0XHR9XG5cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIE9SRSBmcm9tICcuLi8uLi8nO1xuaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgdmVydCBmcm9tICcuL3NoYWRlcnMvYmFja2dyb3VuZC52cyc7XG5pbXBvcnQgeyBMYXllclNpemUgYXMgTGF5ZXJTaXplSW5mbyB9IGZyb20gJy4uLy4uL2NvcmUvQmFzZUxheWVyJztcblxuZXhwb3J0IGNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBUSFJFRS5NZXNoIHtcblxuXHRwcm90ZWN0ZWQgdW5pZm9ybXM6IE9SRS5Vbmlmb3JtcztcblxuXHRjb25zdHJ1Y3RvciggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApIHtcblxuXHRcdGxldCBnZW8gPSBuZXcgVEhSRUUuQnVmZmVyR2VvbWV0cnkoKTtcblxuXHRcdGxldCBwb3NBcnJheSA9IFtdO1xuXHRcdGxldCBpbmRleEFycmF5ID0gW107XG5cdFx0bGV0IHV2QXJyYXkgPSBbXTtcblxuXHRcdHBvc0FycmF5LnB1c2goIC0gMSwgMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIDEsIDEsIDAgKTtcblx0XHRwb3NBcnJheS5wdXNoKCAxLCAtIDEsIDAgKTtcblx0XHRwb3NBcnJheS5wdXNoKCAtIDEsIC0gMSwgMCApO1xuXG5cdFx0dXZBcnJheS5wdXNoKCAwLCAxICk7XG5cdFx0dXZBcnJheS5wdXNoKCAxLCAxICk7XG5cdFx0dXZBcnJheS5wdXNoKCAxLCAwICk7XG5cdFx0dXZBcnJheS5wdXNoKCAwLCAwICk7XG5cblx0XHRpbmRleEFycmF5LnB1c2goIDAsIDIsIDEsIDAsIDMsIDIgKTtcblxuXHRcdGxldCBwb3MgPSBuZXcgRmxvYXQzMkFycmF5KCBwb3NBcnJheSApO1xuXHRcdGxldCBpbmRpY2VzID0gbmV3IFVpbnQzMkFycmF5KCBpbmRleEFycmF5ICk7XG5cdFx0bGV0IHV2ID0gbmV3IEZsb2F0MzJBcnJheSggdXZBcnJheSApO1xuXG5cdFx0Z2VvLnNldEF0dHJpYnV0ZSggJ3Bvc2l0aW9uJywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggcG9zLCAzICkgKTtcblx0XHRnZW8uc2V0QXR0cmlidXRlKCAndXYnLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCB1diwgMiApICk7XG5cdFx0Z2VvLnNldEluZGV4KCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBpbmRpY2VzLCAxICkgKTtcblxuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXHRcdHBhcmFtLnRyYW5zcGFyZW50ID0gcGFyYW0udHJhbnNwYXJlbnQgIT0gdW5kZWZpbmVkID8gcGFyYW0udHJhbnNwYXJlbnQgOiB0cnVlO1xuXHRcdHBhcmFtLmRlcHRoRnVuYyA9IHBhcmFtLmRlcHRoRnVuYyAhPSB1bmRlZmluZWQgPyBwYXJhbS5kZXB0aEZ1bmMgOiBUSFJFRS5OZXZlckRlcHRoO1xuXG5cdFx0bGV0IG1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcGFyYW0gKTtcblxuXHRcdHN1cGVyKCBnZW8sIG1hdCApO1xuXG5cdFx0dGhpcy51bmlmb3JtcyA9IHBhcmFtLnVuaWZvcm1zIHx8IHt9O1xuXG5cdFx0dGhpcy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemUoIGFyZ3M6IExheWVyU2l6ZUluZm8gKSB7XG5cblx0XHR0aGlzLnVuaWZvcm1zLnJlc29sdXRpb24gPSB7IHZhbHVlOiBhcmdzLmNhbnZhc1NpemUgfTtcblx0XHR0aGlzLnVuaWZvcm1zLmFzcGVjdFJhdGlvID0geyB2YWx1ZTogYXJncy5jYW52YXNBc3BlY3RSYXRpbyB9O1xuXG5cdH1cblxufVxuIiwiXG4vKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRCZXppZXJcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5leHBvcnQgbmFtZXNwYWNlIEJlemllciB7XG5cblx0ZXhwb3J0IHR5cGUgQmV6aWVyQ29udHJvbFBvaW50cyA9IHtcblx0XHRwMDogbnVtYmVyO1xuXHRcdHAxOiBudW1iZXI7XG5cdFx0cDI6IG51bWJlcjtcblx0XHRwMzogbnVtYmVyO1xuXHR9XG5cblx0Ly8gaW5zcGlyZWQgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL3NyYy9pbmRleC5qcyBhbmQgaHR0cHM6Ly9naXRodWIuY29tLzBiNXZyL2F1dG9tYXRvbi9ibG9iLzg3MjQyMGU3OThkOTA1NGQ0YTdhMDZjOTcyY2JiNDI2MWE2N2I0YmMvc3JjL2JlemllckVhc2luZy50c1xuXG5cdGV4cG9ydCBjb25zdCBORVdUT05fSVRFUkFUSU9OUyA9IDQ7XG5cdGV4cG9ydCBjb25zdCBORVdUT05fTUlOX1NMT1BFID0gMC4wMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9QUkVDSVNJT04gPSAwLjAwMDAwMDE7XG5cdGV4cG9ydCBjb25zdCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUyA9IDEwO1xuXHRleHBvcnQgY29uc3QgQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFID0gMTE7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUgPSAxLjAgLyBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkU7XG5cblx0ZnVuY3Rpb24gY2FsY0JlemllckEoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSBwLnAwICsgMy4wICogcC5wMSAtIDMuMCAqIHAucDIgKyBwLnAzO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckIoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogcC5wMCAtIDYuMCAqIHAucDEgKyAzLjAgKiBwLnAyO1xuXG5cdH1cblx0ZnVuY3Rpb24gY2FsY0JlemllckMoIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRyZXR1cm4gLSAzLjAgKiBwLnAwICsgMy4wICogcC5wMTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXJTbG9wZSggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIDMuMCAqIGNhbGNCZXppZXJBKCBwICkgKiB0ICogdCArIDIuMCAqIGNhbGNCZXppZXJCKCBwICkgKiB0ICsgY2FsY0JlemllckMoIHAgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGNhbGNCZXppZXIoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAoICggY2FsY0JlemllckEoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQiggcCApICkgKiB0ICsgY2FsY0JlemllckMoIHAgKSApICogdCArIHAucDA7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIHN1YmRpdiggeDogbnVtYmVyLCBzdGFydFQ6IG51bWJlciwgZW5kVDogbnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0bGV0IGN1cnJlbnRYID0gMDtcblx0XHRsZXQgY3VycmVudFQgPSAwO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGN1cnJlbnRUID0gc3RhcnRUICsgKCBlbmRUIC0gc3RhcnRUICkgLyAyO1xuXHRcdFx0Y3VycmVudFggPSBjYWxjQmV6aWVyKCBwLCBjdXJyZW50VCApO1xuXG5cdFx0XHRpZiAoIGN1cnJlbnRYID4geCApIHtcblxuXHRcdFx0XHRlbmRUID0gY3VycmVudFQ7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0c3RhcnRUID0gY3VycmVudFQ7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiBjdXJyZW50VDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gbmV3dG9uKCB4Om51bWJlciwgcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgTkVXVE9OX0lURVJBVElPTlM7IGkgKysgKSB7XG5cblx0XHRcdGxldCBzbG9wZSA9IGNhbGNCZXppZXJTbG9wZSggcCwgdCApO1xuXG5cdFx0XHRpZiAoIHNsb3BlID09IDAuMCApIHtcblxuXHRcdFx0XHRyZXR1cm4gdDtcblxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgY3VycmVudFggPSAoIGNhbGNCZXppZXIoIHAsIHQgKSApIC0geDtcblx0XHRcdHQgLT0gY3VycmVudFggLyBzbG9wZTtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0QmV6aWVyVGZyb21YKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB4OiBudW1iZXIsIGNhY2hlOiBudW1iZXJbXSApIHtcblxuXHRcdHAucDEgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDEgKSApO1xuXHRcdHAucDIgPSBNYXRoLm1heCggcC5wMCwgTWF0aC5taW4oIHAucDMsIHAucDIgKSApO1xuXG5cdFx0bGV0IHNhbXBsZSA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDE7IGkgPCBjYWNoZS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHNhbXBsZSA9IGkgLSAxO1xuXHRcdFx0aWYgKCB4IDwgY2FjaGVbIGkgXSApIGJyZWFrO1xuXG5cdFx0fVxuXG5cdFx0bGV0IHQgPSBzYW1wbGUgLyAoIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSAtIDEuMCApO1xuXHRcdGxldCBkaWZmID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICkgLyAoIHAucDMgLSBwLnAwICk7XG5cblx0XHRpZiAoIGRpZmYgPT0gMC4wICkge1xuXG5cdFx0XHRyZXR1cm4gdDtcblxuXHRcdH0gZWxzZSBpZiAoIGRpZmYgPiAwLjAxICkge1xuXG5cdFx0XHRyZXR1cm4gbmV3dG9uKCB4LCBwLCB0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRyZXR1cm4gc3ViZGl2KCB4LCB0LCB0ICsgQkVaSUVSX0VBU0lOR19TQU1QTEVfU1RFUF9TSVpFLCBwICk7XG5cblx0XHR9XG5cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIndvbGZ5ODctZXZlbnRlbWl0dGVyXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkFjdGlvbiB9IGZyb20gXCIuLi9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlXCI7XHJcbmltcG9ydCB7IEZDdXJ2ZUdyb3VwIH0gZnJvbSAnLi4vQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwJztcclxuaW1wb3J0IHsgRkN1cnZlSW50ZXJwb2xhdGlvbiwgRkN1cnZlS2V5RnJhbWUgfSBmcm9tIFwiLi4vQW5pbWF0aW9uL0ZDdXJ2ZUtleUZyYW1lXCI7XHJcbmltcG9ydCB7IFVuaWZvcm1zIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xyXG5cclxuZXhwb3J0IHR5cGUgQkNNZXNzYWdlID0gQkNTeW5jU2NlbmVNZXNzYWdlIHwgQkNTeW5jRnJhbWVNZXNzYWdlXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVBeGlzID0gJ3gnIHwgJ3knIHwgJ3onIHwgJ3cnIHwgJ3NjYWxhcidcclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY1NjZW5lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvc2NlbmVcIixcclxuICAgIGRhdGE6IEJDU2NlbmVEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1NjZW5lRGF0YSA9IHtcclxuXHRhY3Rpb25zOiBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtW107XHJcbiAgICBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkFjdGlvblBhcmFtID0ge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgZmN1cnZlX2dyb3Vwczoge1trZXk6IHN0cmluZ106IEJDQW5pbWF0aW9uQ3VydmVQYXJhbVtdfTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZVBhcmFtID0ge1xyXG4gICAga2V5ZnJhbWVzOiBCQ0FuaW1hdGlvbkN1cnZlS2V5RnJhbWVQYXJhbVtdO1xyXG5cdGF4aXM6IEJDQW5pbWF0aW9uQ3VydmVBeGlzXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtID0ge1xyXG4gICAgYzogVEhSRUUuVmVjMjtcclxuICAgIGhfbDogVEhSRUUuVmVjMjtcclxuICAgIGhfcjogVEhSRUUuVmVjMjtcclxuICAgIGU6IHN0cmluZztcclxuICAgIGk6IEZDdXJ2ZUludGVycG9sYXRpb247XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVPYmplY3REYXRhID0ge1xyXG5cdG5hbWU6IHN0cmluZyxcclxuXHRhY3Rpb25zOiBzdHJpbmdbXVxyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1N5bmNGcmFtZU1lc3NhZ2UgPSB7XHJcblx0dHlwZTogXCJzeW5jL3RpbWVsaW5lXCI7XHJcblx0ZGF0YTogQkNUaW1lbGluZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDVGltZWxpbmVEYXRhID0ge1xyXG5cdHN0YXJ0OiBudW1iZXI7XHJcblx0ZW5kOiBudW1iZXI7XHJcblx0Y3VycmVudDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQmxlbmRlckNvbm5lY3RvciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdC8vIHdzXHJcblxyXG5cdHByaXZhdGUgdXJsPzogc3RyaW5nO1xyXG5cdHByaXZhdGUgd3M/OiBXZWJTb2NrZXQ7XHJcblx0cHVibGljIGNvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHQvLyBmcmFtZVxyXG5cclxuXHRwdWJsaWMgZnJhbWVDdXJyZW50OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXIgPSAwO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyID0gMDtcclxuXHJcblx0Ly8gYW5pbWF0aW9uXHJcblxyXG5cdHB1YmxpYyBvYmplY3RzOiBCQ1NjZW5lT2JqZWN0RGF0YVtdID0gW107XHJcblx0cHVibGljIGFjdGlvbnM6IEFuaW1hdGlvbkFjdGlvbltdID0gW107XHJcblxyXG5cdGNvbnN0cnVjdG9yKCB1cmw/OiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHRpZiAoIHVybCApIHtcclxuXHJcblx0XHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0XHR0aGlzLmNvbm5lY3QoIHRoaXMudXJsICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjb25uZWN0KCB1cmw6IHN0cmluZyApIHtcclxuXHJcblx0XHR0aGlzLnVybCA9IHVybDtcclxuXHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KCB0aGlzLnVybCApO1xyXG5cdFx0dGhpcy53cy5vbm9wZW4gPSB0aGlzLm9uT3Blbi5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25jbG9zZSA9IHRoaXMub25DbG9zZS5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9uZXJyb3IgPSAoIGUgKSA9PiB7XHJcblxyXG5cdFx0XHRjb25zb2xlLmVycm9yKCBlICk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3luY0pzb25TY2VuZSgganNvblBhdGg6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG5cdFx0cmVxLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcmVxLnJlYWR5U3RhdGUgPT0gNCApIHtcclxuXHJcblx0XHRcdFx0aWYgKCByZXEuc3RhdHVzID09IDIwMCApIHtcclxuXHJcblx0XHRcdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBKU09OLnBhcnNlKCByZXEucmVzcG9uc2UgKSApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fTtcclxuXHJcblx0XHRyZXEub3BlbiggJ0dFVCcsIGpzb25QYXRoICk7XHJcblx0XHRyZXEuc2VuZCggKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uU3luY1NjZW5lKCBkYXRhOiBCQ1NjZW5lRGF0YSApIHtcclxuXHJcblx0XHR0aGlzLmFjdGlvbnMubGVuZ3RoID0gMDtcclxuXHRcdHRoaXMub2JqZWN0cy5sZW5ndGggPSAwO1xyXG5cclxuXHRcdC8vIGFjdGlvbnNcclxuXHJcblx0XHRkYXRhLmFjdGlvbnMuZm9yRWFjaCggYWN0aW9uRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgYWN0aW9uID0gbmV3IEFuaW1hdGlvbkFjdGlvbiggYWN0aW9uRGF0YS5uYW1lICk7XHJcblxyXG5cdFx0XHRsZXQgZmN1cnZlR3JvdXBOYW1lcyA9IE9iamVjdC5rZXlzKGFjdGlvbkRhdGEuZmN1cnZlX2dyb3VwcylcclxuXHJcblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGZjdXJ2ZUdyb3VwTmFtZXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cE5hbWUgPSBmY3VydmVHcm91cE5hbWVzW2ldO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGxldCBmY3VydmVHcm91cCA9IG5ldyBGQ3VydmVHcm91cCggZmN1cnZlR3JvdXBOYW1lICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0YWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzW2ZjdXJ2ZUdyb3VwTmFtZV0uZm9yRWFjaCggZmN1cnZlRGF0YSA9PiB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGN1cnZlID0gbmV3IEZDdXJ2ZSgpO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRjdXJ2ZS5zZXQoIGZjdXJ2ZURhdGEua2V5ZnJhbWVzLm1hcCggZnJhbWUgPT4ge1xyXG5cdFxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gbmV3IEZDdXJ2ZUtleUZyYW1lKCBmcmFtZS5jLCBmcmFtZS5oX2wsIGZyYW1lLmhfciwgZnJhbWUuaSApO1xyXG5cdFxyXG5cdFx0XHRcdFx0fSApICk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGZjdXJ2ZUdyb3VwLnNldEZDdXJ2ZSggY3VydmUsIGZjdXJ2ZURhdGEuYXhpcyApO1xyXG5cdFxyXG5cdFx0XHRcdH0gKTtcclxuXHJcblx0XHRcdFx0YWN0aW9uLmFkZEZjdXJ2ZUdyb3VwKCBmY3VydmVHcm91cC5uYW1lLCBmY3VydmVHcm91cCApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIG9iamVjdHNcclxuXHJcblx0XHRkYXRhLm9iamVjdHMuZm9yRWFjaCggb2JqZWN0RGF0YSA9PiB7XHJcblxyXG5cdFx0XHR0aGlzLm9iamVjdHMucHVzaCggb2JqZWN0RGF0YSApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyBkaXNwYXRjaCBldmVudFxyXG5cdFx0XHJcblx0XHR0aGlzLmVtaXRFdmVudCgndXBkYXRlL3NjZW5lJywgW3RoaXNdKVxyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUodGhpcy5mcmFtZUN1cnJlbnQpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25TeW5jVGltZWxpbmUoIGRhdGE6IEJDVGltZWxpbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuc2V0VGltZWxpbmUoIGRhdGEuY3VycmVudCwgZGF0YS5zdGFydCwgZGF0YS5lbmQgKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFdTIEV2ZW50c1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwcml2YXRlIG9uT3BlbiggZXZlbnQ6IEV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uTWVzc2FnZSggZTogTWVzc2FnZUV2ZW50ICkge1xyXG5cclxuXHRcdGxldCBtc2cgPSBKU09OLnBhcnNlKCBlLmRhdGEgKSBhcyBCQ01lc3NhZ2U7XHJcblxyXG5cdFx0aWYgKCBtc2cudHlwZSA9PSAnc3luYy9zY2VuZScgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1NjZW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIG1zZy50eXBlID09IFwic3luYy90aW1lbGluZVwiICkge1xyXG5cclxuXHRcdFx0dGhpcy5vblN5bmNUaW1lbGluZSggbXNnLmRhdGEgKTtcclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25DbG9zZSggZTpDbG9zZUV2ZW50ICkge1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZVdTKCk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRBUElcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGdldEFjdGlvbk5hbWVMaXN0KCBvYmplY3ROYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5vYmplY3RzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5vYmplY3RzWyBpIF0ubmFtZSA9PSBvYmplY3ROYW1lICkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5vYmplY3RzWyBpIF0uYWN0aW9ucztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFtdO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb24oIGFjdGlvbk5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmFjdGlvbnNbIGkgXS5uYW1lID09IGFjdGlvbk5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmFjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRsZXQgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHRcdGxldCBhY3Rpb25OYW1lTGlzdCA9IHRoaXMuZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWUgKTtcclxuXHJcblx0XHRhY3Rpb25OYW1lTGlzdC5mb3JFYWNoKCBhY3Rpb25OYW1lID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSB0aGlzLmdldEFjdGlvbiggYWN0aW9uTmFtZSApO1xyXG5cclxuXHRcdFx0aWYgKCBhY3Rpb24gKSB7XHJcblxyXG5cdFx0XHRcdGFjdGlvbnMucHVzaCggYWN0aW9uICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdHJldHVybiBhY3Rpb25zO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb25Db250YWluc0FjY2Vzc29yKCBhY2Nlc3Nvcjogc3RyaW5nICkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmFjdGlvbnMuZmluZChhY3Rpb24gPT4ge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCBhY3Rpb24uY3VydmVzICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gY3VydmVLZXlzLnNvbWUoY3VydmVOYW1lID0+IGN1cnZlTmFtZT09YWNjZXNzb3IpXHJcblx0XHRcdFxyXG5cdFx0fSkgfHwgbnVsbFxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0VGltZWxpbmUoIGN1cnJlbnQ6IG51bWJlciwgc3RhcnQ/Om51bWJlciwgZW5kPzpudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5mcmFtZUN1cnJlbnQgPSBjdXJyZW50O1xyXG5cdFx0dGhpcy5mcmFtZVN0YXJ0ID0gc3RhcnQgfHwgdGhpcy5mcmFtZVN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IGVuZCB8fCB0aGlzLmZyYW1lRW5kO1xyXG5cclxuXHRcdHRoaXMuZW1pdEV2ZW50KCAndXBkYXRlL3RpbWVsaW5lJywgWyB0aGlzLmZyYW1lQ3VycmVudCwgdGhpcy5mcmFtZVN0YXJ0LCB0aGlzLmZyYW1lRW5kIF0gKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdERpc3Bvc2VcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHVibGljIGRpc3Bvc2UoKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZGlzcG9zZVdTKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy53cyApIHtcclxuXHJcblx0XHRcdHRoaXMud3MuY2xvc2UoKTtcclxuXHRcdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9uY2xvc2UgPSBudWxsO1xyXG5cdFx0XHR0aGlzLndzLm9ub3BlbiA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgdmVydCBmcm9tICcuL2RvbU1lc2gudnMnO1xuaW1wb3J0IHsgVW5pZm9ybXMsIFVuaWZvcm1zTGliIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xuXG5leHBvcnQgY2xhc3MgRE9NTWVzaCBleHRlbmRzIFRIUkVFLk1lc2gge1xuXG5cdHByb3RlY3RlZCBfdW5pZm9ybXM6IFVuaWZvcm1zO1xuXHRwcm90ZWN0ZWQgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoIGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBwYXJhbWV0ZXI6IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApIHtcblxuXHRcdGxldCBnZW8gPSBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApO1xuXG5cdFx0cGFyYW1ldGVyLnZlcnRleFNoYWRlciA9IHZlcnQ7XG5cblx0XHRsZXQgdW5pID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW1ldGVyLnVuaWZvcm1zLCB7XG5cdFx0XHRkb21Qb3M6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHRkb21TaXplOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0d2luZG93U2l6ZToge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdGFzcGVjdFJhdGlvOiB7XG5cdFx0XHRcdHZhbHVlOiAxLjBcblx0XHRcdH1cblx0XHR9ICk7XG5cblx0XHRwYXJhbWV0ZXIudW5pZm9ybXMgPSB1bmk7XG5cblx0XHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbWV0ZXIgKTtcblxuXHRcdHN1cGVyKCBnZW8sIG1hdCApO1xuXG5cdFx0dGhpcy5mcnVzdHVtQ3VsbGVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl91bmlmb3JtcyA9IHVuaTtcblxuXHRcdHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cblx0XHR0aGlzLnVwZGF0ZSgpO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0IHVuaWZvcm1zKCkge1xuXG5cdFx0cmV0dXJuIHRoaXMuX3VuaWZvcm1zO1xuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0bGV0IHJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR0aGlzLl91bmlmb3Jtcy53aW5kb3dTaXplLnZhbHVlLnNldCggd2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCApO1xuXHRcdHRoaXMuX3VuaWZvcm1zLmFzcGVjdFJhdGlvLnZhbHVlID0gd2luZG93LmlubmVyV2lkdGggLyB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cdFx0dGhpcy5fdW5pZm9ybXMuZG9tU2l6ZS52YWx1ZS5zZXQoIHJlY3Qud2lkdGgsIHJlY3QuaGVpZ2h0ICk7XG5cdFx0dGhpcy5fdW5pZm9ybXMuZG9tUG9zLnZhbHVlLnNldCggcmVjdC5sZWZ0LCByZWN0LnRvcCApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0IHsgQmV6aWVyIH0gZnJvbSBcIi4vQmV6aWVyXCI7XG5cbmV4cG9ydCB0eXBlIEVhc2luZ0Z1bmMgPSAoIHQ6IG51bWJlciApID0+IGFueVxuXG5leHBvcnQgbmFtZXNwYWNlIEVhc2luZ3Mge1xuXG5cdGV4cG9ydCBmdW5jdGlvbiBzaWdtb2lkKCB3ZWlnaHQ6IG51bWJlciA9IDYgKTogRWFzaW5nRnVuYyB7XG5cblx0XHRyZXR1cm4gKCB4OiBudW1iZXIgKSA9PiB7XG5cblx0XHRcdHZhciBlMSA9IE1hdGguZXhwKCAtIHdlaWdodCAqICggMiAqIHggLSAxICkgKTtcblx0XHRcdHZhciBlMiA9IE1hdGguZXhwKCAtIHdlaWdodCApO1xuXG5cdFx0XHRyZXR1cm4gKCAxICsgKCAxIC0gZTEgKSAvICggMSArIGUxICkgKiAoIDEgKyBlMiApIC8gKCAxIC0gZTIgKSApIC8gMjtcblxuXHRcdH07XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBzbW9vdGhzdGVwKCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIsIHZhbHVlOiBudW1iZXIgKTogbnVtYmVyIHtcblxuXHRcdGxldCB4ID0gTWF0aC5tYXgoIDAsIE1hdGgubWluKCAxLCAoIHZhbHVlIC0gbWluICkgLyAoIG1heCAtIG1pbiApICkgKTtcblx0XHRyZXR1cm4geCAqIHggKiAoIDMgLSAyICogeCApO1xuXG5cdH1cblxuXHQvKlxuXHRAYXV0aGVyIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2dyZS8xNjUwMjk0XG5cdCovXG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGxpbmVhciggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhZCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiAoIDIgLSB0ICk7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCA8IC41ID8gMiAqIHQgKiB0IDogLSAxICsgKCA0IC0gMiAqIHQgKSAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5DdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuICggLS0gdCApICogdCAqIHQgKyAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0Q3ViaWMoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyA0ICogdCAqIHQgKiB0IDogKCB0IC0gMSApICogKCAyICogdCAtIDIgKSAqICggMiAqIHQgLSAyICkgKyAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YXJ0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMSAtICggLS0gdCApICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyA4ICogdCAqIHQgKiB0ICogdCA6IDEgLSA4ICogKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWludCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMSArICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuXHR9XG5cbiAgXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuICBcdFx0cmV0dXJuIHQgPCAuNSA/IDE2ICogdCAqIHQgKiB0ICogdCAqIHQgOiAxICsgMTYgKiAoIC0tIHQgKSAqIHQgKiB0ICogdCAqIHQ7XG5cbiAgXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGJlemllciggYzE6IFRIUkVFLlZlYzIsIGgxOiBUSFJFRS5WZWMyLCBoMjogVEhSRUUuVmVjMiwgYzI6IFRIUkVFLlZlYzIgKTogRWFzaW5nRnVuYyB7XG5cblx0XHR2YXIgY2FjaGUgPSBuZXcgQXJyYXkoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgKTtcblxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkU7ICsrIGkgKSB7XG5cblx0XHRcdGNhY2hlWyBpIF0gPSBCZXppZXIuY2FsY0JlemllciggeyBwMDogYzEueCwgcDE6IGgxLngsIHAyOiBoMi54LCBwMzogYzIueCB9LCBpIC8gKCBCZXppZXIuQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFIC0gMS4wICkgKTtcblxuXHRcdH1cblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0aWYgKCB4IDw9IGMxLnggKSByZXR1cm4gYzEueTtcblx0XHRcdGlmICggYzIueCA8PSB4ICkgcmV0dXJuIGMyLnk7XG5cblx0XHRcdHJldHVybiBCZXppZXIuY2FsY0JlemllciggeyBwMDogYzEueSwgcDE6IGgxLnksIHAyOiBoMi55LCBwMzogYzIueSB9LCBCZXppZXIuZ2V0QmV6aWVyVGZyb21YKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIHgsIGNhY2hlICkgKTtcblxuXHRcdH07XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjdWJpY0JlemllciggaDFYOiBudW1iZXIsIGgxWTogbnVtYmVyLCBoMlg6IG51bWJlciwgaDJZOiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYmV6aWVyKFxuXHRcdFx0eyB4OiAwLjAsIHk6IDAuMCB9LFxuXHRcdFx0eyB4OiBoMVggYXMgbnVtYmVyLCB5OiBoMVkgYXMgbnVtYmVyIH0sXG5cdFx0XHR7IHg6IGgyWCBhcyBudW1iZXIsIHk6IGgyWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogMS4wLCB5OiAxLjAgfSxcblx0XHQpO1xuXG5cdH1cblxufVxuIiwiZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEV2ZW50IHtcblx0dHlwZTogc3RyaW5nO1xuXHRba2V5OnN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEV2ZW50TGlzdGVuZXIge1xuXHR0eXBlOiBzdHJpbmcsXG5cdGxpc3RlbmVyOiAoIGU6IEV2ZW50ICkgPT4gdm9pZCxcbn1cblxuZXhwb3J0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHJpdmF0ZSBldmVudHM6IEV2ZW50TGlzdGVuZXJbXSA9IFtdO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdH1cblxuXHRwdWJsaWMgYWRkRXZlbnRMaXN0ZW5lciggdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogKCBlOiBFdmVudCApID0+IHZvaWQgKSB7XG5cblx0XHR0aGlzLmV2ZW50cy5wdXNoKCB7XG5cdFx0XHR0eXBlOiB0eXBlLFxuXHRcdFx0bGlzdGVuZXI6IGxpc3RlbmVyXG5cdFx0fSApO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcGF0Y2hFdmVudCggZXZlbnQ6IEV2ZW50ICkge1xuXG5cdFx0ZXZlbnQudGFyZ2V0ID0gdGhpcztcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0aWYgKCBldmVudC50eXBlID09IHRoaXMuZXZlbnRzWyBpIF0udHlwZSApIHtcblxuXHRcdFx0XHR0aGlzLmV2ZW50c1sgaSBdLmxpc3RlbmVyKCBldmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyByZW1vdmVFdmVudExpc3RlbmVyKCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiBGdW5jdGlvbiApIHtcblxuXHRcdGZvciAoIGxldCBpID0gdGhpcy5ldmVudHMubGVuZ3RoOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdGlmICggdHlwZSA9PSB0aGlzLmV2ZW50c1sgaSBdLnR5cGUgJiYgbGlzdGVuZXIgPT0gdGhpcy5ldmVudHNbIGkgXS5saXN0ZW5lciApIHtcblxuXHRcdFx0XHR0aGlzLmV2ZW50cy5zcGxpY2UoIGksIDEgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgdmVydCBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm91Z2gudnMnO1xuaW1wb3J0IHBhc3NUaHJvdWdoRnJhZyBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm91Z2guZnMnO1xuaW1wb3J0IHsgVW5pZm9ybXMsIFVuaWZvcm1zTGliIH0gZnJvbSAnLi4vVW5pZm9ybXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdQVUNvbXB1dGF0aW9uS2VybmVse1xuICAgIG1hdGVyaWFsOiBUSFJFRS5SYXdTaGFkZXJNYXRlcmlhbCxcbiAgICB1bmlmb3JtczogYW55LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdQVWNvbXB1dGF0aW9uRGF0YXtcbiAgICBidWZmZXI6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0XG59XG5cbmV4cG9ydCBjbGFzcyBHUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIge1xuXG5cdHByb3RlY3RlZCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblx0cHVibGljIGRhdGFTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRwcm90ZWN0ZWQgdW5pZm9ybXM6IGFueTtcblxuXHRwcm90ZWN0ZWQgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwcm90ZWN0ZWQgY2FtZXJhOiBUSFJFRS5DYW1lcmE7XG5cblx0cHJvdGVjdGVkIG1lc2g6IFRIUkVFLk1lc2g7XG5cdHByb3RlY3RlZCBtYXRlcmlhbHM6IFRIUkVFLlNoYWRlck1hdGVyaWFsW107XG5cblx0cHJvdGVjdGVkIHRlbXBEYXRhTGluZWFyOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cdHByb3RlY3RlZCB0ZW1wRGF0YU5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwcml2YXRlIHJlbmRlclRhcmdldHM6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0W10gPSBbXTtcblxuXHRwdWJsaWMgZ2V0IGlzU3VwcG9ydGVkKCkgOiBib29sZWFuIHtcblxuICAgIFx0cmV0dXJuIHRoaXMucmVuZGVyZXIuZXh0ZW5zaW9ucy5nZXQoIFwiT0VTX3RleHR1cmVfZmxvYXRcIiApO1xuXG5cdH1cblxuXHRjb25zdHJ1Y3RvciggcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXIsIGRhdGFTaXplOiBUSFJFRS5WZWN0b3IyICkge1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XG4gICAgXHR0aGlzLmRhdGFTaXplID0gZGF0YVNpemUuY2xvbmUoKTtcblxuICAgIFx0dGhpcy51bmlmb3JtcyA9IHtcbiAgICBcdFx0ZGF0YVNpemU6IHtcbiAgICBcdFx0XHR2YWx1ZTogdGhpcy5kYXRhU2l6ZVxuICAgIFx0XHR9XG4gICAgXHR9O1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTGluZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyLFxuICAgIFx0XHRtYWdGaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlclxuICAgIFx0fSApO1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTmVhciA9IHRoaXMuY3JlYXRlRGF0YSgge1xuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlclxuICAgIFx0fSApO1xuXG4gICAgXHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG4gICAgXHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5DYW1lcmEoKTtcblxuICAgIFx0dGhpcy5tYXRlcmlhbHMgPSBbXTtcbiAgICBcdHRoaXMubWVzaCA9IG5ldyBUSFJFRS5NZXNoKCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApICk7XG4gICAgXHR0aGlzLnNjZW5lLmFkZCggdGhpcy5tZXNoICk7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVJbml0aWFsaXplVGV4dHVyZSgpIHtcblxuICAgIFx0bGV0IGEgPSBuZXcgRmxvYXQzMkFycmF5KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnggKiB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnkgKiA0ICk7XG4gICAgXHRsZXQgdGV4dHVyZSA9IG5ldyBUSFJFRS5EYXRhVGV4dHVyZSggYSwgdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS54LCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnksIFRIUkVFLlJHQkFGb3JtYXQsIFRIUkVFLkZsb2F0VHlwZSApO1xuICAgIFx0dGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICBcdHJldHVybiB0ZXh0dXJlO1xuXG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlRGF0YSgpOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIGluaXRpYWxpemVUZXh0dXJlOiBUSFJFRS5EYXRhVGV4dHVyZSApOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlLCB0ZXh0dXJlUGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIGluaXRUZXhfdGV4UGFyYW0/OiBhbnksIHRleHR1cmVQYXJhbT8gOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhIHtcblxuICAgIFx0bGV0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG4gICAgXHRsZXQgaXNpT1MgPSB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQaG9uZScgKSA+PSAwIHx8IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBhZCcgKSA+PSAwIHx8IG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcImlQYWRcIiB8fCAoIG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIlNhZmFyaVwiICkgIT0gLSAxICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJDaHJvbWVcIiApID09IC0gMSAmJiAoIG5hdmlnYXRvciBhcyBhbnkgKS5zdGFuZGFsb25lICE9PSB1bmRlZmluZWQgKTtcblxuICAgIFx0bGV0IHBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgPSB7XG4gICAgXHRcdHdyYXBTOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHR3cmFwVDogVEhSRUUuQ2xhbXBUb0VkZ2VXcmFwcGluZyxcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLFxuICAgIFx0XHRtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdGZvcm1hdDogVEhSRUUuUkdCQUZvcm1hdCxcbiAgICBcdFx0dHlwZTogaXNpT1MgPyBUSFJFRS5IYWxmRmxvYXRUeXBlIDogVEhSRUUuRmxvYXRUeXBlLFxuICAgIFx0XHRzdGVuY2lsQnVmZmVyOiBmYWxzZSxcbiAgICBcdFx0ZGVwdGhCdWZmZXI6IGZhbHNlXG4gICAgXHR9O1xuICAgIFx0bGV0IGluaXRUZXg6IFRIUkVFLkRhdGFUZXh0dXJlIHwgbnVsbCA9IG51bGw7XG4gICAgXHRsZXQgY3VzdG9tUGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyB8IG51bGwgPSBudWxsO1xuXG4gICAgXHRpZiAoIGluaXRUZXhfdGV4UGFyYW0gKSB7XG5cbiAgICBcdFx0aWYgKCBpbml0VGV4X3RleFBhcmFtLmlzRGF0YVRleHR1cmUgKSB7XG5cbiAgICBcdFx0XHRpbml0VGV4ID0gaW5pdFRleF90ZXhQYXJhbTtcblxuICAgIFx0XHRcdGlmICggdGV4dHVyZVBhcmFtICkge1xuXG4gICAgXHRcdFx0XHRjdXN0b21QYXJhbSA9IHRleHR1cmVQYXJhbTtcblxuICAgIFx0XHRcdH1cblxuICAgIFx0XHR9IGVsc2Uge1xuXG4gICAgXHRcdFx0Y3VzdG9tUGFyYW0gPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdH1cblxuICAgIFx0fVxuXG4gICAgXHRpZiAoIGN1c3RvbVBhcmFtICkge1xuXG4gICAgXHRcdHBhcmFtLndyYXBTID0gY3VzdG9tUGFyYW0ud3JhcFMgfHwgcGFyYW0ud3JhcFM7XG4gICAgXHRcdHBhcmFtLndyYXBUID0gY3VzdG9tUGFyYW0ud3JhcFQgfHwgcGFyYW0ud3JhcFQ7XG4gICAgXHRcdHBhcmFtLm1pbkZpbHRlciA9IGN1c3RvbVBhcmFtLm1pbkZpbHRlciB8fCBwYXJhbS5taW5GaWx0ZXI7XG4gICAgXHRcdHBhcmFtLm1hZ0ZpbHRlciA9IGN1c3RvbVBhcmFtLm1hZ0ZpbHRlciB8fCBwYXJhbS5tYWdGaWx0ZXI7XG4gICAgXHRcdHBhcmFtLmZvcm1hdCA9IGN1c3RvbVBhcmFtLmZvcm1hdCB8fCBwYXJhbS5mb3JtYXQ7XG4gICAgXHRcdHBhcmFtLnR5cGUgPSBjdXN0b21QYXJhbS50eXBlIHx8IHBhcmFtLnR5cGU7XG4gICAgXHRcdHBhcmFtLnN0ZW5jaWxCdWZmZXIgPSBjdXN0b21QYXJhbS5zdGVuY2lsQnVmZmVyIHx8IHBhcmFtLnN0ZW5jaWxCdWZmZXI7XG4gICAgXHRcdHBhcmFtLmRlcHRoQnVmZmVyID0gY3VzdG9tUGFyYW0uZGVwdGhCdWZmZXIgfHwgcGFyYW0uZGVwdGhCdWZmZXI7XG5cbiAgICBcdH1cblxuICAgIFx0bGV0IGJ1ZiA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCggdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS54LCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLnksIHBhcmFtICk7XG5cblx0XHRsZXQgZGF0YSA9IHsgYnVmZmVyOiBidWYgfTtcblxuXHRcdHRoaXMucmVuZGVyVGFyZ2V0cy5wdXNoKCBidWYgKTtcblxuICAgIFx0aWYgKCBpbml0VGV4ICkge1xuXG4gICAgXHRcdGxldCBpbml0S2VybmVsID0gdGhpcy5jcmVhdGVLZXJuZWwoIHtcblx0XHRcdFx0ZnJhZ21lbnRTaGFkZXI6IHBhc3NUaHJvdWdoRnJhZyxcblx0XHRcdFx0dW5pZm9ybXM6IHtcblx0XHRcdFx0XHR0ZXg6IHtcblx0XHRcdFx0XHRcdHZhbHVlOiBpbml0VGV4XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9ICk7XG5cbiAgICBcdFx0dGhpcy5jb21wdXRlKCBpbml0S2VybmVsLCBkYXRhICk7XG5cbiAgICBcdH1cblxuICAgIFx0cmV0dXJuIGRhdGE7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVLZXJuZWwoIHBhcmFtOiBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMgKTogR1BVQ29tcHV0YXRpb25LZXJuZWwge1xuXG4gICAgXHRsZXQgdW5pOiBVbmlmb3JtcyA9IFVuaWZvcm1zTGliLm1lcmdlVW5pZm9ybXMoIHBhcmFtLnVuaWZvcm1zLCB0aGlzLnVuaWZvcm1zICk7XG5cblx0XHRwYXJhbS51bmlmb3JtcyA9IHVuaTtcblx0XHRwYXJhbS52ZXJ0ZXhTaGFkZXIgPSBwYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgdmVydDtcblxuICAgIFx0bGV0IG1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcGFyYW0gKTtcblxuICAgIFx0dGhpcy5tYXRlcmlhbHMucHVzaCggbWF0ICk7XG5cbiAgICBcdGxldCBrZXJuZWw6IEdQVUNvbXB1dGF0aW9uS2VybmVsID0ge1xuICAgIFx0XHRtYXRlcmlhbDogbWF0LFxuICAgIFx0XHR1bmlmb3JtczogcGFyYW0udW5pZm9ybXNcbiAgICBcdH07XG5cbiAgICBcdHJldHVybiBrZXJuZWw7XG5cblx0fVxuXG5cdHB1YmxpYyBjb21wdXRlKCBrZXJuZWw6IEdQVUNvbXB1dGF0aW9uS2VybmVsLCBkYXRhOiBHUFVjb21wdXRhdGlvbkRhdGEsIGNhbWVyYT86IFRIUkVFLkNhbWVyYSApIHtcblxuICAgIFx0bGV0IHRlbXA6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuICAgIFx0aWYgKCBkYXRhLmJ1ZmZlci50ZXh0dXJlLm1hZ0ZpbHRlciA9PSBUSFJFRS5MaW5lYXJGaWx0ZXIgKSB7XG5cbiAgICBcdFx0dGVtcCA9IHRoaXMudGVtcERhdGFMaW5lYXI7XG5cbiAgICBcdH0gZWxzZSB7XG5cbiAgICBcdFx0dGVtcCA9IHRoaXMudGVtcERhdGFOZWFyO1xuXG4gICAgXHR9XG5cbiAgICBcdHRoaXMubWVzaC5tYXRlcmlhbCA9IGtlcm5lbC5tYXRlcmlhbDtcblxuICAgIFx0bGV0IGN1cnJlbnRSZW5kZXJUYXJnZXQgPSB0aGlzLnJlbmRlcmVyLmdldFJlbmRlclRhcmdldCgpO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggdGVtcC5idWZmZXIgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIGNhbWVyYSB8fCB0aGlzLmNhbWVyYSApO1xuXG4gICAgXHR0aGlzLnN3YXBCdWZmZXJzKCBkYXRhLCB0ZW1wICk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCBjdXJyZW50UmVuZGVyVGFyZ2V0ICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBzd2FwQnVmZmVycyggYjE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgYjI6IEdQVWNvbXB1dGF0aW9uRGF0YSApIHtcblxuICAgIFx0bGV0IHRtcCA9IGIxLmJ1ZmZlcjtcbiAgICBcdGIxLmJ1ZmZlciA9IGIyLmJ1ZmZlcjtcbiAgICBcdGIyLmJ1ZmZlciA9IHRtcDtcblxuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKSB7XG5cbiAgICBcdGxldCBnZW8gPSB0aGlzLm1lc2guZ2VvbWV0cnk7XG4gICAgXHRnZW8uZGlzcG9zZSgpO1xuXG4gICAgXHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLm1hdGVyaWFscy5sZW5ndGg7IGkgKysgKSB7XG5cbiAgICBcdFx0dGhpcy5tYXRlcmlhbHNbIGkgXS5kaXNwb3NlKCk7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5zY2VuZS5yZW1vdmUoIHRoaXMubWVzaCApO1xuXG4gICAgXHR0aGlzLnRlbXBEYXRhTGluZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG4gICAgXHR0aGlzLnRlbXBEYXRhTmVhci5idWZmZXIuZGlzcG9zZSgpO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVzaXplRGF0YSggZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHR0aGlzLmRhdGFTaXplLmNvcHkoIGRhdGFTaXplICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnJlbmRlclRhcmdldHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5yZW5kZXJUYXJnZXRzWyBpIF07XG5cblx0XHRcdHRhcmdldC5zZXRTaXplKCBkYXRhU2l6ZS54LCBkYXRhU2l6ZS55ICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbj86IFRIUkVFLlZlY3RvcjM7XG5cdHJvdGF0aW9uPzogVEhSRUUuUXVhdGVybmlvbjtcblx0c2NhbGU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBCYXNlVHJhbnNmb3JtIHtcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjM7XG5cdHJvdGF0aW9uOiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZTogVEhSRUUuVmVjdG9yM1xufVxuXG5leHBvcnQgY2xhc3MgTGF5b3V0Q29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIG9iajogVEhSRUUuT2JqZWN0M0Q7XG5cdHByb3RlY3RlZCBiYXNlVHJhbnNmb3JtOiBCYXNlVHJhbnNmb3JtO1xuXHRwcm90ZWN0ZWQgdHJhbnNmb3JtOiBUcmFuc2Zvcm07XG5cblx0Y29uc3RydWN0b3IoIG9iamVjdDogVEhSRUUuT2JqZWN0M0QsIHRyYW5zZm9ybTogVHJhbnNmb3JtLCBpc0Fic29sdXRlUG9zaXRpb24/OiBib29sZWFuICkge1xuXG5cdFx0dGhpcy5vYmogPSBvYmplY3Q7XG5cblx0XHR0aGlzLmJhc2VUcmFuc2Zvcm0gPSB7XG5cdFx0XHRwb3NpdGlvbjogdGhpcy5vYmoucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdHJvdGF0aW9uOiB0aGlzLm9iai5xdWF0ZXJuaW9uLmNsb25lKCksXG5cdFx0XHRzY2FsZTogdGhpcy5vYmouc2NhbGUuY2xvbmUoKVxuXHRcdH07XG5cblx0XHR0aGlzLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcblxuXHRcdGlmICggISBpc0Fic29sdXRlUG9zaXRpb24gKSB7XG5cblx0XHRcdHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICYmIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLmFkZCggdGhpcy5vYmoucG9zaXRpb24gKTtcblx0XHRcdHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uICYmIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLm11bHRpcGx5KCB0aGlzLm9iai5xdWF0ZXJuaW9uICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGVUcmFuc2Zvcm0oIHdlaWdodDogbnVtYmVyICkge1xuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy5vYmoucG9zaXRpb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnBvc2l0aW9uLmNsb25lKCkubGVycCggdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24sIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5xdWF0ZXJuaW9uLmNvcHkoIHRoaXMuYmFzZVRyYW5zZm9ybS5yb3RhdGlvbi5jbG9uZSgpLnNsZXJwKCB0aGlzLnRyYW5zZm9ybS5yb3RhdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0uc2NhbGUgKSB7XG5cblx0XHRcdHRoaXMub2JqLnNjYWxlLmNvcHkoIHRoaXMuYmFzZVRyYW5zZm9ybS5zY2FsZS5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSAqICggd2VpZ2h0ICkgKyAxLjAgLSB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0IHsgQW5pbWF0b3JWYXJpYWJsZVR5cGUgfSBmcm9tIFwiLi9BbmltYXRvclwiO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGVycEZ1bmM8VD57XG5cdCggYTogVCwgYjogVCwgdDogbnVtYmVyICk6IFQ7XG59XG5cbmV4cG9ydCBuYW1lc3BhY2UgTGVycHMge1xuXG5cdGV4cG9ydCBmdW5jdGlvbiBudW1iZXIoIGE6IG51bWJlciwgYjogbnVtYmVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYSArICggYiAtIGEgKSAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBudW1iZXJBcnJheSggYTogbnVtYmVyW10sIGI6IG51bWJlcltdLCB0OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIGEubGVuZ3RoID09IGIubGVuZ3RoICkge1xuXG5cdFx0XHRsZXQgYyA9IFtdO1xuXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0XHRjLnB1c2goIGFbIGkgXSArICggYlsgaSBdIC0gYVsgaSBdICkgKiB0ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGM7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLmxvZyggJ0RpZmZlcmVudCBsZW5ndGggQXJyYXlzISEhJyApO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHR9XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBUSFJFRVZlY3RvcnMoIGE6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCBiOiBUSFJFRS5WZWN0b3IyICYgVEhSRUUuVmVjdG9yMyAmIFRIUkVFLlZlY3RvcjQgJiBUSFJFRS5Db2xvciwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5sZXJwKCBiLCB0ICk7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBUSFJFRVF1YXRlcm5pb24oIGE6IFRIUkVFLlF1YXRlcm5pb24sIGI6IFRIUkVFLlF1YXRlcm5pb24sIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhLmNsb25lKCkuc2xlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFRXVsZXIoIGE6IFRIUkVFLkV1bGVyLCBiOiBUSFJFRS5FdWxlciwgdDogbnVtYmVyICkge1xuXG5cdFx0bGV0IGFjID0gYS5jbG9uZSgpO1xuXHRcdGxldCBiYyA9IGIuY2xvbmUoKTtcblxuXHRcdGFjLnggPSBhYy54ICsgKCBiYy54IC0gYWMueCApICogdDtcblx0XHRhYy55ID0gYWMueSArICggYmMueSAtIGFjLnkgKSAqIHQ7XG5cdFx0YWMueiA9IGFjLnogKyAoIGJjLnogLSBhYy56ICkgKiB0O1xuXG5cdFx0cmV0dXJuIGFjO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZ2V0TGVycEZ1bmMoIHZhbHVlOiBBbmltYXRvclZhcmlhYmxlVHlwZSApIHtcblxuXHRcdGlmICggdHlwZW9mICggdmFsdWUgKSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlcjtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5udW1iZXJBcnJheTtcblxuXHRcdH0gZWxzZSBpZiAoIFwiaXNWZWN0b3IyXCIgaW4gdmFsdWUgfHwgXCJpc1ZlY3RvcjNcIiBpbiB2YWx1ZSB8fCBcImlzVmVjdG9yNFwiIGluIHZhbHVlIHx8IFwiaXNDb2xvclwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVWZWN0b3JzO1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc1F1YXRlcm5pb25cIiBpbiB2YWx1ZSApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLlRIUkVFUXVhdGVybmlvbjtcblxuXHRcdH0gZWxzZSBpZiAoIFwiaXNFdWxlclwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVFdWxlcjtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGNsYXNzIE1vdXNlUm90YXRvciB7XG5cblx0cHVibGljIHRhcmdldDogVEhSRUUuT2JqZWN0M0Q7XG5cdHB1YmxpYyBzY3JvbGxWZWw6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoIG9ianM6IFRIUkVFLk9iamVjdDNEICkge1xuXG5cdFx0dGhpcy50YXJnZXQgPSBvYmpzO1xuXG5cdFx0dGhpcy5zY3JvbGxWZWwgPSBuZXcgVEhSRUUuVmVjdG9yMigpO1xuXG5cdH1cblxuXHR1cGRhdGUoKSB7XG5cblx0XHR0aGlzLnNjcm9sbFZlbC5tdWx0aXBseVNjYWxhciggMC45NiApO1xuXG5cdFx0bGV0IGF4aXMgPSBuZXcgVEhSRUUuVmVjdG9yMyggdGhpcy5zY3JvbGxWZWwueSwgdGhpcy5zY3JvbGxWZWwueCwgMC4wICkubm9ybWFsaXplKCk7XG5cblx0XHRsZXQgcSA9IG5ldyBUSFJFRS5RdWF0ZXJuaW9uKCkuc2V0RnJvbUF4aXNBbmdsZSggYXhpcywgdGhpcy5zY3JvbGxWZWwubGVuZ3RoKCkgKTtcblx0XHRxLm11bHRpcGx5KCB0aGlzLnRhcmdldC5xdWF0ZXJuaW9uICk7XG5cblx0XHR0aGlzLnRhcmdldC5xdWF0ZXJuaW9uLmNvcHkoIHEgKTtcblxuXHR9XG5cblx0YWRkVmVsb2NpdHkoIHNjcm9sbERlbHRhOiBUSFJFRS5WZWN0b3IyICkge1xuXG5cdFx0dGhpcy5zY3JvbGxWZWwuYWRkVmVjdG9ycyggdGhpcy5zY3JvbGxWZWwsIHNjcm9sbERlbHRhLm11bHRpcGx5U2NhbGFyKCAwLjAwMSApICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IFBhZ2VTY3JvbGxlciB9IGZyb20gJy4nO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckV2ZW50QXJncyB7XHJcblx0c2Nyb2xsZXI6IFBhZ2VTY3JvbGxlcjtcclxuXHRzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdHNjcm9sbE1vZGU6IHN0cmluZztcclxuXHRzY3JvbGxEZWx0YTogbnVtYmVyO1xyXG5cdHNjcm9sbFBvd2VyOiBudW1iZXI7XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckV2ZW50IHtcclxuXHRjb21tb24/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdHVwPzogKCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuXHRkb3duPzogKCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnRzIHtcclxuXHRvblN0YXJ0U2Nyb2xsPzogUGFnZVNjcm9sbGVyRXZlbnRcclxuXHRvbkFycml2YWxzPzoge1xyXG5cdFx0cGVyY2VudGFnZTogbnVtYmVyO1xyXG5cdFx0ZXZlbnQ6IFBhZ2VTY3JvbGxlckV2ZW50O1xyXG5cdH1bXVxyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyU2VjdGlvblBhcmFtcyB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdGV2ZW50cz86IFBhZ2VTY3JvbGxlckV2ZW50cztcclxuXHRzdG9wPzogYm9vbGVhbjtcclxuXHRzdGFydFNjcm9sbFVwPzogbnVtYmVyO1xyXG5cdHN0YXJ0U2Nyb2xsRG93bj86IG51bWJlcjtcclxuXHRib3R0b20/OiBib29sZWFuO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJTZWN0aW9uUmVjdCB7XHJcblx0eDogbnVtYmVyO1xyXG5cdHk6IG51bWJlcjtcclxuXHR3aWR0aDogbnVtYmVyO1xyXG5cdGhlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbGVyU2VjdGlvbiB7XHJcblxyXG5cdHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcblx0cHVibGljIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdHB1YmxpYyByZWN0OiBQYWdlU2Nyb2xsZXJTZWN0aW9uUmVjdDtcclxuXHRwdWJsaWMgc3RhcnRTY3JvbGxVcDogbnVtYmVyO1xyXG5cdHB1YmxpYyBzdGFydFNjcm9sbERvd246IG51bWJlcjtcclxuXHRwdWJsaWMgc3RvcD86IGJvb2xlYW47XHJcblx0cHVibGljIGV2ZW50cz86IFBhZ2VTY3JvbGxlckV2ZW50cztcclxuXHRwdWJsaWMgYm90dG9tPzogYm9vbGVhbjtcclxuXHRwdWJsaWMgdGltZWxpbmVQZXJjZW50YWdlOiBudW1iZXIgPSAwO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggcGFyYW1zOiBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zICkge1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IHBhcmFtcy5uYW1lO1xyXG5cdFx0dGhpcy5lbGVtZW50ID0gcGFyYW1zLmVsZW1lbnQ7XHJcblx0XHR0aGlzLnJlY3QgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR0aGlzLnN0b3AgPSBwYXJhbXMuc3RvcDtcclxuXHRcdHRoaXMuZXZlbnRzID0gcGFyYW1zLmV2ZW50cztcclxuXHRcdHRoaXMuYm90dG9tID0gcGFyYW1zLmJvdHRvbTtcclxuXHRcdHRoaXMuc3RhcnRTY3JvbGxEb3duID0gcGFyYW1zLnN0YXJ0U2Nyb2xsRG93biB8fCAwO1xyXG5cdFx0dGhpcy5zdGFydFNjcm9sbFVwID0gcGFyYW1zLnN0YXJ0U2Nyb2xsVXAgfHwgMDtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVJlY3QoIDAgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IGlzUGFnZVNjcm9sbGVyU2VjdGlvbigpIHtcclxuXHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlUmVjdCggc2Nyb2xsUG9zOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5yZWN0ID0ge1xyXG5cdFx0XHR4OiB0aGlzLmVsZW1lbnQub2Zmc2V0TGVmdCxcclxuXHRcdFx0eTogdGhpcy5lbGVtZW50Lm9mZnNldFRvcCAtIHNjcm9sbFBvcyxcclxuXHRcdFx0d2lkdGg6IHRoaXMuZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiB0aGlzLmVsZW1lbnQub2Zmc2V0SGVpZ2h0XHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRTY3JvbGxQZXJjZW50YWdlKCBvZmZzZXRQb3M/OiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IGJvdHRvbU9mZnNldCA9ICggdGhpcy5ib3R0b20gPyB0aGlzLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApO1xyXG5cdFx0bGV0IHBvcyA9ICggdGhpcy5yZWN0LnkgKyBib3R0b21PZmZzZXQgKSAtICggb2Zmc2V0UG9zIHx8IDAgKTtcclxuXHJcblx0XHRsZXQgZmlyc3RIYWxmSGVpZ2h0ID0gdGhpcy5ib3R0b20gPyB0aGlzLnJlY3QuaGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdFx0bGV0IGZpcnN0SGFsZiA9IE1hdGgubWluKCAxLjAsIDEuMCAtICggcG9zIC8gZmlyc3RIYWxmSGVpZ2h0ICkgKTtcclxuXHJcblx0XHRsZXQgc2Vjb25kSGFsZkhlaWdodCA9IHRoaXMuYm90dG9tID8gd2luZG93LmlubmVySGVpZ2h0IDogdGhpcy5yZWN0LmhlaWdodDtcclxuXHRcdGxldCBzZWNvbmRIYWxmID0gTWF0aC5tYXgoIDAuMCwgLSBwb3MgLyBzZWNvbmRIYWxmSGVpZ2h0ICk7XHJcblxyXG5cdFx0bGV0IHBlcmNlbnRhZ2UgPSBmaXJzdEhhbGYgKyBzZWNvbmRIYWxmO1xyXG5cclxuXHRcdHJldHVybiBwZXJjZW50YWdlO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgUGFnZVNjcm9sbGVyU2VjdGlvbiwgUGFnZVNjcm9sbGVyU2VjdGlvblBhcmFtcywgUGFnZVNjcm9sbGVyRXZlbnRBcmdzIH0gZnJvbSAnLi9QYWdlU2Nyb2xsZXJTZWN0aW9uJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYywgRWFzaW5ncyB9IGZyb20gJy4uL0Vhc2luZ3MnO1xyXG5pbXBvcnQgeyBBbmltYXRvciB9IGZyb20gJy4uL0FuaW1hdG9yJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJBdXRvTW92ZVBhcmFtIHtcclxuXHR0YXJnZXQ6IHN0cmluZyB8IG51bWJlciB8IFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0ZHVyYXRpb24/OiBudW1iZXI7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxuXHRjYWxsQmFjaz86IEZ1bmN0aW9uO1xyXG5cdGJvdHRvbT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2Nyb2xsZXIge1xyXG5cclxuXHRwcm90ZWN0ZWQgYW5pbWF0b3I6IEFuaW1hdG9yO1xyXG5cdHByb3RlY3RlZCBpc0F1dG9Nb3ZlOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByb3RlY3RlZCBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHRwcm90ZWN0ZWQgcGFyZW50RWxlbWVudEhlaWdodDogbnVtYmVyO1xyXG5cclxuXHRwcm90ZWN0ZWQgc2VjdGlvbnM6IFBhZ2VTY3JvbGxlclNlY3Rpb25bXTtcclxuXHJcblx0cHVibGljIGRlbGF5U3BlZWQ6IG51bWJlciA9IDAuMTtcclxuXHRwdWJsaWMgZHJhZ0RlbGF5U3BlZWQ6IG51bWJlciA9IDAuNDtcclxuXHRwcm90ZWN0ZWQgaXNUb3VjaGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBkZWx0YU1lbTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIHNjcm9sbFJlYWR5OiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIHN1bURlbHRhOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBvczogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBvc01lbTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBlcmNlbnRhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zRGVsYXk6IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQZXJjZW50YWdlRGVsYXk6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBjYXVnaHRTZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uIHwgbnVsbDtcclxuXHRwcm90ZWN0ZWQgZHJhZ1N0b3A6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgZHJhZ1VubG9ja1JlYWR5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcblx0Y29uc3RydWN0b3IoIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50ICkge1xyXG5cclxuXHRcdHRoaXMucGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQ7XHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgPSBwYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zID0gW107XHJcblx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRcdGluaXQgQW5pbWF0b3JcclxuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdFx0dGhpcy5hbmltYXRvciA9IG5ldyBBbmltYXRvcigpO1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IuYWRkKCB7XHJcblx0XHRcdG5hbWU6ICdzY3JvbGxQb3MnLFxyXG5cdFx0XHRpbml0VmFsdWU6IDAsXHJcblx0XHRcdGVhc2luZzogRWFzaW5ncy5zaWdtb2lkKClcclxuXHRcdH0gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBvcygpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUG9zO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUG9zRGVsYXkoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFBvc0RlbGF5O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUGVyY2VudGFnZSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUGVyY2VudGFnZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBlcmNlbnRhZ2VEZWxheSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUGVyY2VudGFnZURlbGF5O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsVGltZWxpbmVQZXJjZW50YWdlKCkge1xyXG5cclxuXHRcdGxldCBzdW0gPSAwO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHNlYyA9IHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHRcdFx0bGV0IHNlY0JlZiA9IHRoaXMuc2VjdGlvbnNbIGkgLSAxIF07XHJcblxyXG5cdFx0XHRsZXQgYSA9IE1hdGgubWF4KCAwLjAsIHNlYy5lbGVtZW50Lm9mZnNldFRvcCAtIHRoaXMuc2Nyb2xsUG9zRGVsYXkgKyAoIHNlYy5ib3R0b20gPyBzZWMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgKTtcclxuXHRcdFx0bGV0IGIgPSAoICggc2VjQmVmID8gc2VjQmVmLnJlY3QuaGVpZ2h0IC0gKCBzZWNCZWYuYm90dG9tID8gd2luZG93LmlubmVySGVpZ2h0IDogMCApIDogMCApICsgKCBzZWMuYm90dG9tID8gc2VjLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApICkgfHwgMTtcclxuXHJcblx0XHRcdGxldCBkID0gMS4wIC0gKCBhIC8gYiApO1xyXG5cdFx0XHRkID0gTWF0aC5tYXgoIDAuMCwgZCApO1xyXG5cclxuXHRcdFx0c3VtICs9IGQ7XHJcblxyXG5cdFx0XHRpZiAoIGQgPCAxLjAgKSBicmVhaztcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHN1bSAvIHRoaXMuc2VjdGlvbnMubGVuZ3RoO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGQoIHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24gKSB7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucy5wdXNoKCBzZWN0aW9uICk7XHJcblxyXG5cdFx0dGhpcy5zb3J0U2VjdGlvbnMoKTtcclxuXHJcblx0XHRyZXR1cm4gc2VjdGlvbjtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc29ydFNlY3Rpb25zKCkge1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMuc29ydCggKCBhOiBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBiOiBQYWdlU2Nyb2xsZXJTZWN0aW9uICk6IG51bWJlciA9PiB7XHJcblxyXG5cdFx0XHRyZXR1cm4gYS5yZWN0LnkgPiBiLnJlY3QueSA/IDEgOiAtIDE7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZWN0aW9uc1sgaSBdLnRpbWVsaW5lUGVyY2VudGFnZSA9ICggaSArIDEgKSAvIHRoaXMuc2VjdGlvbnMubGVuZ3RoO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0KCBuYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuc2VjdGlvbnNbIGkgXS5uYW1lID09IG5hbWUgKSByZXR1cm4gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLndhcm4oICdzZWN0aW9uIFwiJyArIG5hbWUgKyAnXCIgaXMgbm90IGV4aXN0LicgKTtcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVBhcmVudEVsZW1lbnQoKTtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZVNjcm9sbFBvcyggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0dGhpcy5hcHBseVBhcmVudEVsZW1lbnRUcmFuc2Zvcm0oKTtcclxuXHJcblx0XHR0aGlzLnN1bURlbHRhID0gMC4wO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCB1cGRhdGVTY3JvbGxQb3MoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlQXV0b01vdmUoIGRlbHRhVGltZSApO1xyXG5cclxuXHRcdHRoaXMuYWRkU2Nyb2xsUG9zKCk7XHJcblxyXG5cdFx0dGhpcy5jYWxjU2Nyb2xsUHJvcGVydGllcyggZGVsdGFUaW1lICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZUF1dG9Nb3ZlKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yLnVwZGF0ZSggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRsZXQgcG9zID0gdGhpcy5hbmltYXRvci5nZXQ8bnVtYmVyPiggJ3Njcm9sbFBvcycgKTtcclxuXHJcblx0XHRcdGlmICggcG9zICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLnN1bURlbHRhID0gcG9zIC0gdGhpcy5zY3JvbGxQb3M7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhZGRTY3JvbGxQb3MoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmNoZWNrVW5sb2NrU3RvcFNjcm9sbCggdGhpcy5zdW1EZWx0YSApICkge1xyXG5cclxuXHRcdFx0bGV0IHN0b3BQb3MgPSB0aGlzLmNoZWNrVGhyb3coIHRoaXMuc3VtRGVsdGEgKTtcclxuXHJcblx0XHRcdGlmICggc3RvcFBvcyAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5fc2Nyb2xsUG9zID0gc3RvcFBvcztcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3Njcm9sbFBvcyArPSB0aGlzLnN1bURlbHRhO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5fc2Nyb2xsUG9zID0gTWF0aC5tYXgoIE1hdGgubWluKCB0aGlzLl9zY3JvbGxQb3MsIHRoaXMucGFyZW50RWxlbWVudEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCApLCAwICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1VubG9ja1N0b3BTY3JvbGwoIHNjcm9sbERlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IHVubG9ja0RpcjogbnVtYmVyID0gMDtcclxuXHRcdGxldCB1bmxvY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdGxldCBkaXN0YW5jZSA9IHRoaXMuc2Nyb2xsUG9zIC0gdGhpcy5zY3JvbGxQb3NEZWxheTtcclxuXHJcblx0XHRcdGlmICggc2Nyb2xsRGVsdGEgKiBkaXN0YW5jZSA8IDAgfHwgTWF0aC5hYnMoIGRpc3RhbmNlICkgPCAxMC4wIHx8IHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdFx0aWYgKCBzY3JvbGxEZWx0YSA8IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCAtIHNjcm9sbERlbHRhID4gKCB0aGlzLmNhdWdodFNlY3Rpb24uc3RhcnRTY3JvbGxVcCB8fCAwICkgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gLSAxO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmICggc2Nyb2xsRGVsdGEgPiAwICkge1xyXG5cclxuXHRcdFx0XHRcdGlmICggc2Nyb2xsRGVsdGEgPiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5zdGFydFNjcm9sbERvd24gfHwgMCApIHx8IHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IDE7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHVubG9ja0RpciAhPSAwICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsICkge1xyXG5cclxuXHRcdFx0XHRcdGxldCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgPSB7XHJcblx0XHRcdFx0XHRcdHNjcm9sbGVyOiB0aGlzLFxyXG5cdFx0XHRcdFx0XHRzZWN0aW9uOiB0aGlzLmNhdWdodFNlY3Rpb24sXHJcblx0XHRcdFx0XHRcdHNjcm9sbE1vZGU6IHRoaXMuaXNBdXRvTW92ZSA/ICdhdXRvJyA6ICdtYW51YWwnLFxyXG5cdFx0XHRcdFx0XHRzY3JvbGxEZWx0YTogc2Nyb2xsRGVsdGEsXHJcblx0XHRcdFx0XHRcdHNjcm9sbFBvd2VyOiBNYXRoLmFicyggc2Nyb2xsRGVsdGEgKSxcclxuXHRcdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdFx0bGV0IHVubG9jazogYm9vbGVhbiB8IHZvaWQ7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGNvbW1vblVubG9jayA9IHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5jb21tb24gJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmNvbW1vbiggYXJncyApO1xyXG5cdFx0XHRcdFx0aWYgKCB1bmxvY2tEaXIgPT0gLSAxICkgdW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLnVwICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC51cCggYXJncyApO1xyXG5cdFx0XHRcdFx0aWYgKCB1bmxvY2tEaXIgPT0gMSApIHVubG9jayA9IHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5kb3duICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5kb3duKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBjb21tb25VbmxvY2sgPT09IGZhbHNlIHx8IHVubG9jayA9PT0gZmFsc2UgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAwO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dW5sb2NrID0gdW5sb2NrRGlyICE9IDA7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHVubG9jayA9IHRydWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggdW5sb2NrRGlyICkge1xyXG5cclxuXHRcdFx0dGhpcy5jYXVnaHRTZWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHVubG9jaztcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvdyggc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBzZWMgPSB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0XHRzZWMudXBkYXRlUmVjdCggdGhpcy5fc2Nyb2xsUG9zICk7XHJcblxyXG5cdFx0XHRsZXQgc3RvcFBvcyA9IHRoaXMuY2hlY2tUaHJvd1NlY3Rpb25FdmVudHMoIHNlYywgc2Nyb2xsRGVsdGEgKTtcclxuXHJcblx0XHRcdGlmICggc3RvcFBvcyAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5jYXVnaHRTZWN0aW9uID0gc2VjO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5pc0F1dG9Nb3ZlID8gbnVsbCA6IHN0b3BQb3M7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93U2VjdGlvbkV2ZW50cyggc2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiwgc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgcGVyY2VudGFnZSA9IHNlY3Rpb24uZ2V0U2Nyb2xsUGVyY2VudGFnZSgpO1xyXG5cdFx0bGV0IG1vdmVkUGVyY2VudGFnZSA9IHNlY3Rpb24uZ2V0U2Nyb2xsUGVyY2VudGFnZSggc2Nyb2xsRGVsdGEgKTtcclxuXHJcblx0XHRpZiAoIHNlY3Rpb24uZXZlbnRzICkge1xyXG5cclxuXHRcdFx0bGV0IGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyA9IHtcclxuXHRcdFx0XHRzY3JvbGxlcjogdGhpcyxcclxuXHRcdFx0XHRzZWN0aW9uOiBzZWN0aW9uLFxyXG5cdFx0XHRcdHNjcm9sbE1vZGU6IHRoaXMuaXNBdXRvTW92ZSA/ICdhdXRvJyA6ICdtYW51YWwnLFxyXG5cdFx0XHRcdHNjcm9sbERlbHRhOiBzY3JvbGxEZWx0YSxcclxuXHRcdFx0XHRzY3JvbGxQb3dlcjogTWF0aC5hYnMoIHNjcm9sbERlbHRhICksXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRpZiAoIHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHMgKSB7XHJcblxyXG5cdFx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0XHRcdGxldCBhcnJpdmFsRXZlbnQgPSBzZWN0aW9uLmV2ZW50cy5vbkFycml2YWxzWyBpIF07XHJcblxyXG5cdFx0XHRcdFx0bGV0IGlzVGhyb3cgPSB0aGlzLmNoZWNrVGhyb3dMaW5lKCBwZXJjZW50YWdlLCBtb3ZlZFBlcmNlbnRhZ2UsIGFycml2YWxFdmVudC5wZXJjZW50YWdlICk7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBpc1Rocm93ICE9IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRhcnJpdmFsRXZlbnQuZXZlbnQuY29tbW9uICYmIGFycml2YWxFdmVudC5ldmVudC5jb21tb24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmICggaXNUaHJvdyA8IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC51cCAmJiBhcnJpdmFsRXZlbnQuZXZlbnQudXAoIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC5kb3duICYmIGFycml2YWxFdmVudC5ldmVudC5kb3duKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmICggc2VjdGlvbi5zdG9wICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmNoZWNrVGhyb3dMaW5lKCBwZXJjZW50YWdlLCBtb3ZlZFBlcmNlbnRhZ2UsIDEgKSApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5kcmFnVW5sb2NrUmVhZHkgPSBmYWxzZTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHNlY3Rpb24uZWxlbWVudC5vZmZzZXRUb3AgKyAoIHNlY3Rpb24uYm90dG9tID8gc2VjdGlvbi5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3dMaW5lKCBhOiBudW1iZXIsIGIgOm51bWJlciwgbGluZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggYSA8IGxpbmUgJiYgbGluZSA8PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIDE7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggYSA+IGxpbmUgJiYgbGluZSA+PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIC0gMTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBhID09IGxpbmUgJiYgbGluZSA9PSBiICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIDI7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2FsY1Njcm9sbFByb3BlcnRpZXMoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBvc0RlbGF5ICs9ICggdGhpcy5fc2Nyb2xsUG9zIC0gdGhpcy5fc2Nyb2xsUG9zRGVsYXkgKSAqICggdGhpcy5pc1RvdWNoaW5nICYmICEgdGhpcy5jYXVnaHRTZWN0aW9uID8gdGhpcy5kcmFnRGVsYXlTcGVlZCA6IHRoaXMuZGVsYXlTcGVlZCApICogTWF0aC5taW4oIDEuMCwgZGVsdGFUaW1lICogNjAgKTtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQZXJjZW50YWdlID0gdGhpcy5zY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHRoaXMuc2Nyb2xsUG9zICk7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUGVyY2VudGFnZURlbGF5ID0gdGhpcy5zY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHRoaXMuc2Nyb2xsUG9zRGVsYXkgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsUG9zVG9QZXJlY250YWdlKCBzY3JvbGxQb3M6IG51bWJlciApIHtcclxuXHJcblx0XHRyZXR1cm4gc2Nyb2xsUG9zIC8gKCB0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcclxuXHJcblx0fVxyXG5cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZVBhcmVudEVsZW1lbnQoKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0ID0gdGhpcy5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYXBwbHlQYXJlbnRFbGVtZW50VHJhbnNmb3JtKCkge1xyXG5cclxuXHRcdHRoaXMucGFyZW50RWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoIDAsJyArIC0gdGhpcy5zY3JvbGxQb3NEZWxheS50b1N0cmluZygpICsgJ3B4LCAwICknO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzY3JvbGwoIGRlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5kZWx0YU1lbSA9ICggdGhpcy5kZWx0YU1lbSArIGRlbHRhICkgLyAyO1xyXG5cdFx0dGhpcy5zdW1EZWx0YSArPSBkZWx0YTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2F0Y2goKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmlzQXV0b01vdmUgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuZGVsdGFNZW0gPSAwO1xyXG5cclxuXHRcdGlmICggISB0aGlzLmNhdWdodFNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSB0aGlzLl9zY3JvbGxQb3NEZWxheTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGRyYWcoIGRlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuaXNUb3VjaGluZyApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLnNjcm9sbCggZGVsdGEgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVsZWFzZSggc25hcDogbnVtYmVyID0gMTAuMCApIHtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5pc1RvdWNoaW5nICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICggISB0aGlzLmNhdWdodFNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNjcm9sbCggdGhpcy5kZWx0YU1lbSAqIHNuYXAgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGF1dG9Nb3ZlKCBwYXJhbTogUGFnZVNjcm9sbGVyQXV0b01vdmVQYXJhbSApIHtcclxuXHJcblx0XHRsZXQgdGFyZ2V0UG9zOiBudW1iZXIgPSAwO1xyXG5cclxuXHRcdGlmICggKCBwYXJhbS50YXJnZXQgYXMgUGFnZVNjcm9sbGVyU2VjdGlvbiApLmlzUGFnZVNjcm9sbGVyU2VjdGlvbiApIHtcclxuXHJcblx0XHRcdGxldCB0YXJnZXQgPSBwYXJhbS50YXJnZXQgYXMgUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRcdFx0bGV0IGJvdHRvbU9mZnNldCA9IHBhcmFtLmJvdHRvbSA/IHRhcmdldC5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDA7XHJcblxyXG5cdFx0XHR0YXJnZXRQb3MgPSB0YXJnZXQuZWxlbWVudC5vZmZzZXRUb3AgKyBib3R0b21PZmZzZXQ7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHBhcmFtLnRhcmdldCA9PSAnc3RyaW5nJyApIHtcclxuXHJcblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLmdldCggcGFyYW0udGFyZ2V0ICk7XHJcblxyXG5cdFx0XHRpZiAoIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0bGV0IGJvdHRvbU9mZnNldCA9IHBhcmFtLmJvdHRvbSA/IHRhcmdldC5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDA7XHJcblxyXG5cdFx0XHRcdHRhcmdldFBvcyA9IHRhcmdldC5lbGVtZW50Lm9mZnNldFRvcCArIGJvdHRvbU9mZnNldDtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgcGFyYW0udGFyZ2V0ID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0UG9zID0gcGFyYW0udGFyZ2V0O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yLnNldFZhbHVlKCAnc2Nyb2xsUG9zJywgdGhpcy5fc2Nyb2xsUG9zICk7XHJcblx0XHR0aGlzLmFuaW1hdG9yLmFuaW1hdGUoICdzY3JvbGxQb3MnLCB0YXJnZXRQb3MsIHBhcmFtLmR1cmF0aW9uLCAoKSA9PiB7XHJcblxyXG5cdFx0XHRpZiAoIHBhcmFtLmNhbGxCYWNrICkgcGFyYW0uY2FsbEJhY2soKTtcclxuXHJcblx0XHRcdHRoaXMuaXNBdXRvTW92ZSA9IGZhbHNlO1xyXG5cclxuXHRcdH0sIHBhcmFtLmVhc2luZyApO1xyXG5cclxuXHRcdC8vb25TdGFydFNjcm9sbOWGheOBp0F1dG9Nb3Zl44GX44Gf44Go44GN44CB54Sh6ZmQ44Or44O844OX44Gr6Zml44KL44Gu44KS6Zi75q2iXHJcblx0XHR0aGlzLnN1bURlbHRhID0gKCB0YXJnZXRQb3MgLSB0aGlzLnN1bURlbHRhICkgLyBNYXRoLmFicyggdGFyZ2V0UG9zIC0gdGhpcy5zdW1EZWx0YSApICogMC4wMDAwMTtcclxuXHJcblx0XHR0aGlzLmlzQXV0b01vdmUgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgY2xhc3MgUG9pbnRlciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHJvdGVjdGVkIGlzU1A6IGJvb2xlYW47XG5cdHByb3RlY3RlZCBpc1RvdWNoaW5nOiBib29sZWFuO1xuXG5cdHB1YmxpYyBwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0cHVibGljIGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0c3VwZXIoKTtcblxuXHRcdHRoaXMucG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmRlbHRhID0gbmV3IFRIUkVFLlZlY3RvcjIoIE5hTiwgTmFOICk7XG5cblx0XHRjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuXHRcdHRoaXMuaXNTUCA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdBbmRyb2lkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG5cdFx0dGhpcy5wb3NpdGlvbi5zZXQoIE5hTiwgTmFOICk7XG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XG5cblx0fVxuXG5cdHB1YmxpYyByZWdpc3RlckVsZW1lbnQoIGVsbTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHRjb25zdCBvblRvdWNoU3RhcnQgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJzdGFydFwiICk7XG5cdFx0Y29uc3Qgb25Ub3VjaE1vdmUgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJtb3ZlXCIgKTtcblx0XHRjb25zdCBvblRvdWNFbmQgPSB0aGlzLm9uVG91Y2guYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlckRvd24gPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJNb3ZlID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJtb3ZlXCIgKTtcblx0XHRjb25zdCBvblBvaW50ZXJVcCA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwiZW5kXCIgKTtcblx0XHRjb25zdCBvbldoZWVsID0gdGhpcy53aGVlbC5iaW5kKCB0aGlzICk7XG5cblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNFbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwiZHJhZ2VuZFwiLCBvblBvaW50ZXJVcCApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCBcIndoZWVsXCIsIG9uV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG5cdFx0Y29uc3Qgb25VblJlZ2lzdGVyID0gKCBlOiBhbnkgKSA9PiB7XG5cblx0XHRcdGlmICggZWxtLmlzRXF1YWxOb2RlKCBlLmVsbSApICkge1xuXG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNFbmQgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdwb2ludGVydXAnLCBvblBvaW50ZXJVcCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJkcmFnZW5kXCIsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcIndoZWVsXCIsIG9uV2hlZWwgKTtcblxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd1bnJlZ2lzdGVyJywgb25VblJlZ2lzdGVyICk7XG5cblx0XHRcdH1cblxuXHRcdH07XG5cblx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICd1bnJlZ2lzdGVyJywgb25VblJlZ2lzdGVyICk7XG5cblx0fVxuXG5cdHB1YmxpYyB1bnJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VucmVnaXN0ZXInLFxuXHRcdFx0ZWxtOiBlbG0sXG5cdFx0fSApO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0U2NyZWVuUG9zaXRpb24oIHdpbmRvd1NpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHRpZiAoIHRoaXMucG9zaXRpb24ueCAhPSB0aGlzLnBvc2l0aW9uLnggKSByZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIoIE5hTiwgTmFOICk7XG5cblx0XHRjb25zdCBwID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpXG5cdFx0XHQuZGl2aWRlKCB3aW5kb3dTaXplIClcblx0XHRcdC5tdWx0aXBseVNjYWxhciggMi4wIClcblx0XHRcdC5zdWJTY2FsYXIoIDEuMCApO1xuXHRcdHAueSAqPSAtIDE7XG5cblx0XHRyZXR1cm4gcDtcblxuXHR9XG5cblx0cHVibGljIGdldFJlbGF0aXZlUG9zaXRpb24oIGVsbTogSFRNTEVsZW1lbnQsIHNjcmVlbj86IGJvb2xlYW4gKSB7XG5cblx0XHRjb25zdCByZWN0OiBET01SZWN0ID0gZWxtLmdldENsaWVudFJlY3RzKClbIDAgXSBhcyBET01SZWN0O1xuXG5cdFx0bGV0IHggPSB0aGlzLnBvc2l0aW9uLnggLSByZWN0LmxlZnQ7XG5cdFx0bGV0IHkgPSB0aGlzLnBvc2l0aW9uLnkgLSByZWN0LnRvcDtcblxuXHRcdGlmICggc2NyZWVuICkge1xuXG5cdFx0XHR4IC89IHJlY3Qud2lkdGg7XG5cdFx0XHR5IC89IHJlY3QuaGVpZ2h0O1xuXG5cdFx0fVxuXG5cdFx0Y29uc3QgcCA9IG5ldyBUSFJFRS5WZWN0b3IyKCB4LCB5ICk7XG5cblx0XHRyZXR1cm4gcDtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHNldFBvcyggeDogbnVtYmVyLCB5OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoXG5cdFx0XHR0aGlzLnBvc2l0aW9uLnggIT09IHRoaXMucG9zaXRpb24ueCB8fFxuXHRcdFx0dGhpcy5wb3NpdGlvbi55ICE9PSB0aGlzLnBvc2l0aW9uLnlcblx0XHQpIHtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIDAsIDAgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCB4IC0gdGhpcy5wb3NpdGlvbi54LCB5IC0gdGhpcy5wb3NpdGlvbi55ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggeCwgeSApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Ub3VjaCggdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50ICkge1xuXG5cdFx0Y29uc3QgdG91Y2ggPSBlLnRvdWNoZXNbIDAgXTtcblxuXHRcdGlmICggdG91Y2ggKSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIHRvdWNoLnBhZ2VYLCB0b3VjaC5wYWdlWSwgdHlwZSwgZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCB0eXBlID09ICdlbmQnICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIE5hTiwgTmFOLCB0eXBlLCBlICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uUG9pbnRlciggdHlwZTogc3RyaW5nLCBlOiBQb2ludGVyRXZlbnQgfCBEcmFnRXZlbnQgKSB7XG5cblx0XHRjb25zdCBwb2ludGVyVHlwZSA9ICggZSBhcyBQb2ludGVyRXZlbnQgKS5wb2ludGVyVHlwZTtcblxuXHRcdGlmICggcG9pbnRlclR5cGUgIT0gbnVsbCApIHtcblxuXHRcdFx0aWYgKCBwb2ludGVyVHlwZSA9PSAnbW91c2UnICYmICggZS5idXR0b24gPT0gLSAxIHx8IGUuYnV0dG9uID09IDAgKSApIHtcblxuXHRcdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlIGFzIFBvaW50ZXJFdmVudCApO1xuXG5cdFx0XHR9XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBlLnBhZ2VYLCBlLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0b3VjaEV2ZW50SGFuZGxlciggcG9zWDogbnVtYmVyLCBwb3NZOiBudW1iZXIsIHR5cGU6IHN0cmluZywgZTogVG91Y2hFdmVudCB8IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGxldCBkaXNwYXRjaCA9IGZhbHNlO1xuXG5cdFx0Y29uc3QgeCA9IHBvc1ggLSB3aW5kb3cucGFnZVhPZmZzZXQ7XG5cdFx0Y29uc3QgeSA9IHBvc1kgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRpZiAoIHR5cGUgPT0gXCJzdGFydFwiICkge1xuXG5cdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9IGVsc2UgaWYgKCB0eXBlID09IFwibW92ZVwiICkge1xuXG5cdFx0XHR0aGlzLnNldFBvcyggeCwgeSApO1xuXG5cdFx0XHRpZiAoIHRoaXMuaXNUb3VjaGluZyApIHtcblxuXHRcdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJlbmRcIiApIHtcblxuXHRcdFx0aWYgKCAndGFyZ2V0VG91Y2hlcycgaW4gZSApIHtcblxuXHRcdFx0XHRpZiAoIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0XHRkaXNwYXRjaCA9IHRydWU7XG5cblx0XHR9XG5cblx0XHRpZiAoIGRpc3BhdGNoICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogZSxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogdHlwZSxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCkge1xuXG5cdFx0aWYgKCAhIHRoaXMuaXNTUCApIHtcblxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdHR5cGU6ICd1cGRhdGUnLFxuXHRcdFx0XHRwb2ludGVyRXZlbnQ6IG51bGwsXG5cdFx0XHRcdHBvaW50ZXJFdmVudFR5cGU6ICdob3ZlcicsXG5cdFx0XHRcdHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHRcdGRlbHRhOiB0aGlzLmRlbHRhLmNsb25lKClcblx0XHRcdH0gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRyYWNrcGFkTWVtRGVsdGEgPSAwO1xuXHRwcm90ZWN0ZWQgdHJhY2twYWRNYXggPSBmYWxzZTtcblxuXHRwcm90ZWN0ZWQgd2hlZWwoIGU6IFdoZWVsRXZlbnQgKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICd3aGVlbCcsXG5cdFx0XHR3aGVlbEV2ZW50OiBlLFxuXHRcdH0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHBhc3NUaHJvd1ZlcnQgZnJvbSAnLi9zaGFkZXJzL3Bhc3NUaHJvdy52cyc7XG5cbnR5cGUgSW5wdXRSZW5kZXJUYXJnZXQgPSB7IFtrZXk6c3RyaW5nXTogVEhSRUUuVGV4dHVyZSB8IFRIUkVFLlRleHR1cmVbXSB9O1xuXG5leHBvcnQgaW50ZXJmYWNlIFBQUGFyYW0gZXh0ZW5kcyBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnN7XG5cdGlucHV0UmVuZGVyVGFyZ2V0cz86IHN0cmluZ1xufVxuXG5leHBvcnQgY2xhc3MgUG9zdFByb2Nlc3Npbmcge1xuXG5cdHByaXZhdGUgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cdHByaXZhdGUgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwcml2YXRlIGNhbWVyYTogVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhO1xuXHRwcml2YXRlIHNjcmVlbjogVEhSRUUuTWVzaDtcblxuXHRwdWJsaWMgZWZmZWN0OiB7XG5cdFx0bWF0ZXJpYWw6IFRIUkVFLlNoYWRlck1hdGVyaWFsLFxuXHR9O1xuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgcHBQYXJhbTogUFBQYXJhbSwgY3VzdG9tR2VvbWV0cnk/OiBUSFJFRS5CdWZmZXJHZW9tZXRyeSApIHtcblxuXHRcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuT3J0aG9ncmFwaGljQ2FtZXJhKCAtIDEuMCwgMS4wLCAxLjAsIC0gMS4wICk7XG5cblx0XHR0aGlzLnNjcmVlbiA9IG5ldyBUSFJFRS5NZXNoKCBjdXN0b21HZW9tZXRyeSB8fCBuZXcgVEhSRUUuUGxhbmVCdWZmZXJHZW9tZXRyeSggMiwgMiApICk7XG5cdFx0dGhpcy5zY2VuZS5hZGQoIHRoaXMuc2NyZWVuICk7XG5cblx0XHRwcFBhcmFtLnZlcnRleFNoYWRlciA9IHBwUGFyYW0udmVydGV4U2hhZGVyIHx8IHBhc3NUaHJvd1ZlcnQ7XG5cdFx0cHBQYXJhbS51bmlmb3JtcyA9IHBwUGFyYW0udW5pZm9ybXMgfHwge307XG5cdFx0cHBQYXJhbS51bmlmb3Jtcy5yZXNvbHV0aW9uID0ge1xuXHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHR9O1xuXG5cdFx0dGhpcy5lZmZlY3QgPSB7XG5cdFx0XHRtYXRlcmlhbDogbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwcFBhcmFtICksXG5cdFx0fTtcblxuXHR9XG5cblx0cHVibGljIHJlbmRlciggaW5wdXRSZW5kZXJUYXJnZXRzOiBJbnB1dFJlbmRlclRhcmdldCB8IG51bGwsIHJlbmRlclRhcmdldDogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQgfCBudWxsID0gbnVsbCApIHtcblxuXHRcdGxldCByZW5kZXJUYXJnZXRNZW0gPSB0aGlzLnJlbmRlcmVyLmdldFJlbmRlclRhcmdldCgpO1xuXG5cdFx0bGV0IGVmZmVjdCA9IHRoaXMuZWZmZWN0O1xuXHRcdGxldCBtYXRlcmlhbCA9IGVmZmVjdC5tYXRlcmlhbDtcblx0XHRsZXQgdW5pZm9ybXMgPSBtYXRlcmlhbC51bmlmb3JtcztcblxuXHRcdGlmICggaW5wdXRSZW5kZXJUYXJnZXRzICkge1xuXG5cdFx0XHRsZXQga2V5cyA9IE9iamVjdC5rZXlzKCBpbnB1dFJlbmRlclRhcmdldHMgKTtcblxuXHRcdFx0Zm9yICggbGV0IGogPSAwOyBqIDwga2V5cy5sZW5ndGg7IGogKysgKSB7XG5cblx0XHRcdFx0aWYgKCB1bmlmb3Jtc1sga2V5c1sgaiBdIF0gKSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0udmFsdWUgPSBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdO1xuXG5cdFx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaiBdIF0gPSB7IHZhbHVlOiBpbnB1dFJlbmRlclRhcmdldHNbIGtleXNbIGogXSBdIH07XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG5cdFx0XHRcdFx0ZWZmZWN0Lm1hdGVyaWFsLnVuaWZvcm1zID0gdW5pZm9ybXM7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAoIHJlbmRlclRhcmdldCApIHtcblxuXHRcdFx0dW5pZm9ybXMucmVzb2x1dGlvbi52YWx1ZS5zZXQoIHJlbmRlclRhcmdldC53aWR0aCwgcmVuZGVyVGFyZ2V0LmhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5yZW5kZXJlci5nZXRTaXplKCB1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnNjcmVlbi5tYXRlcmlhbCA9IG1hdGVyaWFsO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHJlbmRlclRhcmdldCApO1xuXG5cdFx0dGhpcy5yZW5kZXJlci5yZW5kZXIoIHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0TWVtICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IEFuaW1hdG9yVmFyaWFibGVUeXBlIH0gZnJvbSAnLi9BbmltYXRvcic7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMgfSBmcm9tICcuL0Vhc2luZ3MnO1xyXG5pbXBvcnQgeyBMZXJwcywgTGVycEZ1bmMgfSBmcm9tICcuL0xlcnBzJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8VD4ge1xyXG5cdHRpbWU6IG51bWJlcjtcclxuXHR2YWx1ZTogVDtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPFQ+IHtcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGxlcnBGdW5jPzogTGVycEZ1bmM8VD47XHJcblx0dmFsdWU6IFQ7XHJcblx0ZWFzaW5nPzogRWFzaW5nRnVuYztcclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JBZGRQYXJhbXM8VD4ge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRrZXlmcmFtZXM6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPltdO1xyXG5cdGN1c3RvbUxlcnA/OiBMZXJwRnVuYzxUPixcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBUaW1lbGluZUFuaW1hdG9yIHtcclxuXHJcblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbbmFtZTogc3RyaW5nXTogVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPGFueT4gfSA9IHt9O1xyXG5cdHByb3RlY3RlZCB0aW1lOiBudW1iZXI7XHJcblx0cHVibGljIGRlZmF1bHRFYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggKSB7XHJcblxyXG5cdFx0dGhpcy50aW1lID0gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkPFQgZXh0ZW5kcyBBbmltYXRvclZhcmlhYmxlVHlwZT4oIHBhcmFtczogVGltZWxpbmVBbmltYXRvckFkZFBhcmFtczxUPiApIHtcclxuXHJcblx0XHRpZiAoIHBhcmFtcy5rZXlmcmFtZXMubGVuZ3RoID09IDAgKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBwYXJhbXMubmFtZSArICdcIicsICdLZXlmcmFtZSBsZW5ndGggaXMgMCEhJyApO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHtcclxuXHRcdFx0a2V5ZnJhbWVzOiBwYXJhbXMua2V5ZnJhbWVzLFxyXG5cdFx0XHRsZXJwRnVuYzogcGFyYW1zLmN1c3RvbUxlcnAsXHJcblx0XHRcdGVhc2luZzogcGFyYW1zLmVhc2luZyxcclxuXHRcdFx0dmFsdWU6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ua2V5ZnJhbWVzLnNvcnQoICggYSwgYiApID0+IHtcclxuXHJcblx0XHRcdHJldHVybiAoIGEudGltZSA8IGIudGltZSApID8gLSAxIDogMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ubGVycEZ1bmMgPSBMZXJwcy5nZXRMZXJwRnVuYyggcGFyYW1zLmtleWZyYW1lc1sgMCBdLnZhbHVlICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHRcdHJldHVybiBwYXJhbXMubmFtZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0PFQ+KCBuYW1lOiBzdHJpbmcgKTogVCB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdLnZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUPiggbmFtZTogc3RyaW5nICk6IFRpbWVsaW5lQW5pbWF0b3JWYXJpYWJsZTxUPiB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIHRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSB0aW1lO1xyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjKCkge1xyXG5cclxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgdmFsaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sga2V5c1sgaSBdIF07XHJcblx0XHRcdGxldCBrZnMgPSB2YWxpYWJsZS5rZXlmcmFtZXM7XHJcblxyXG5cdFx0XHRsZXQgYTogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHRcdFx0bGV0IGI6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdFx0XHRsZXQgdCA9IE1hdGgubWF4KCBrZnNbIDAgXS50aW1lLCBNYXRoLm1pbigga2ZzWyBrZnMubGVuZ3RoIC0gMSBdLnRpbWUsIHRoaXMudGltZSApICk7XHJcblxyXG5cdFx0XHRsZXQgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoIGtmcy5sZW5ndGggPT0gMSApIHtcclxuXHJcblx0XHRcdFx0dCA9IGtmc1sgMCBdLnRpbWU7XHJcblx0XHRcdFx0YSA9IGIgPSBrZnNbIDAgXTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cclxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZnMubGVuZ3RoIC0gMTsgaiArKyApIHtcclxuXHJcblx0XHRcdFx0XHRhID0ga2ZzWyBqIF07XHJcblx0XHRcdFx0XHRiID0ga2ZzWyBqICsgMSBdO1xyXG5cclxuXHRcdFx0XHRcdGVhc2luZyA9IGEuZWFzaW5nO1xyXG5cclxuXHRcdFx0XHRcdGlmICggYS50aW1lIDw9IHQgJiYgdCA8PSBiLnRpbWUgKSBicmVhaztcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dCA9ICggdCAtIGEudGltZSApIC8gKCBiLnRpbWUgLSBhLnRpbWUgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBlYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSBlYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHZhbGlhYmxlLmVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IHZhbGlhYmxlLmVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICggdGhpcy5kZWZhdWx0RWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gdGhpcy5kZWZhdWx0RWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHZhbGlhYmxlLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsaWFibGUudmFsdWUgPSB2YWxpYWJsZS5sZXJwRnVuYyggYS52YWx1ZSwgYi52YWx1ZSwgdCApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRpZiAoIHZhbGlhYmxlLnZhbHVlID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyggJ2Vycm9yIGF0ICcgKyAnXCInICsga2V5c1sgaSBdICsgJ1wiJyApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBrZXlzWyBpIF0gKyAnXCInLCAnbGVycCBmdW5jdGlvbiBpcyBub3Qgc2V0LicgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5pZm9ybXN7IFsga2V5OiBzdHJpbmcgXSA6IFRIUkVFLklVbmlmb3JtIH1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVW5pZm9ybXNMaWIge1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbWVyZ2VVbmlmb3JtcyggLi4udW5pZm9ybXM6ICggVW5pZm9ybXN8dW5kZWZpbmVkIClbXSApIDogVW5pZm9ybXMge1xyXG5cclxuXHRcdGxldCByZXMgPSB7fTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHVuaWZvcm1zWyBpIF0gIT0gdW5kZWZpbmVkICkge1xyXG5cclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXMsIHVuaWZvcm1zWyBpIF0gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdE1hbiBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdvSG9tZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2dvaG9tZScgfSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB3YWl0KCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IG9uR29Ib21lID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblxyXG5cdFx0XHR9LCB0aW1lICogMTAwMC4wICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyIHY1LjIuOSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwczovL29saS5tZS51ay9cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50IGluIGl0cyBzdG9yYWdlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBsaXN0ZW5lcnMgQXJyYXkgb2YgbGlzdGVuZXJzIHRvIHNlYXJjaCB0aHJvdWdoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCBtZXRob2QuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFsaWFzQ2xvc3VyZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2lsbCBpbml0aWFsaXNlIHRoZSBldmVudCBvYmplY3QgYW5kIGxpc3RlbmVyIGFycmF5cyBpZiByZXF1aXJlZC5cbiAgICAgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG4gICAgICogRWFjaCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0IHJlc3BvbnNlIGlzIGFuIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXXxPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJldHVybiBhIGNvbmNhdGVuYXRlZCBhcnJheSBvZiBhbGwgbWF0Y2hpbmcgZXZlbnRzIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RvciBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGV2ZW50c1tldnRdIHx8IChldmVudHNbZXZ0XSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGxpc3RlbmVycyBSYXcgbGlzdGVuZXIgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgcHJvdG8uZmxhdHRlbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGZsYXR0ZW5MaXN0ZW5lcnMobGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBmbGF0TGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsYXRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVyc0FzT2JqZWN0ID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgcmVzcG9uc2VbZXZ0XSA9IGxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCBsaXN0ZW5lciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lciAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZExpc3RlbmVyKGxpc3RlbmVyLmxpc3RlbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIWlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKHRydWUsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWRpdHMgbGlzdGVuZXJzIGluIGJ1bGsuIFRoZSBhZGRMaXN0ZW5lcnMgYW5kIHJlbW92ZUxpc3RlbmVycyBtZXRob2RzIGJvdGggdXNlIHRoaXMgdG8gZG8gdGhlaXIgam9iLiBZb3Ugc2hvdWxkIHJlYWxseSB1c2UgdGhvc2UgaW5zdGVhZCwgdGhpcyBpcyBhIGxpdHRsZSBsb3dlciBsZXZlbC5cbiAgICAgKiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCAodHJ1ZSkgb3IgYWRkZWQgKGZhbHNlKS5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC9yZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hbmlwdWxhdGUgdGhlIGxpc3RlbmVycyBvZiBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG4gICAgICAgIHZhciBtdWx0aXBsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXJzIDogdGhpcy5hZGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgLy8gSWYgZXZ0IGlzIGFuIG9iamVjdCB0aGVuIHBhc3MgZWFjaCBvZiBpdHMgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAodmFsdWUgPSBldnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU28gZXZ0IG11c3QgYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIC8vIEFuZCBsaXN0ZW5lcnMgbXVzdCBiZSBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBpdCBhbmQgcGFzcyBlYWNoIG9uZSB0byB0aGUgbXVsdGlwbGUgbWV0aG9kXG4gICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBbZXZ0XSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuIFdpbGwgcmVtb3ZlIGZyb20gZXZlcnkgZXZlbnQgaWYgbm90IHBhc3NlZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBldnQ7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZW1vdmUgZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIGV2dFxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2dF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBtYXRjaGluZyB0aGUgcmVnZXguXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVFdmVudC5cbiAgICAgKlxuICAgICAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlQWxsTGlzdGVuZXJzID0gYWxpYXMoJ3JlbW92ZUV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyc01hcCA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVyc01hcCkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzTWFwW2tleV0uc2xpY2UoMCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgfHwge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tICcuL2NvcmUvQmFzZUxheWVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL0NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbidcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cCdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmFja2dyb3VuZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmxlbmRlckNvbm5lY3Rvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9pbnRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRE9NTWVzaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRWFzaW5ncyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRXZlbnREaXNwYXRjaGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL01vdXNlUm90YXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9zdFByb2Nlc3NpbmcnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BhZ2VTY3JvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUGFnZVNjcm9sbGVyL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0xheW91dENvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1RpbWVsaW5lQW5pbWF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1VuaWZvcm1zJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9MZXJwcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvV2FpdE1hbic7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==