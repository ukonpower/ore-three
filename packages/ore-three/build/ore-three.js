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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUMzQixRQUFRLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7UUFDekIsUUFBUSxDQUFDLElBQUksQ0FBRSxDQUFDLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7UUFDM0IsUUFBUSxDQUFDLElBQUksQ0FBRSxDQUFFLENBQUMsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUU3QixPQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQztRQUVyQixVQUFVLENBQUMsSUFBSSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFFLENBQUM7UUFFcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxZQUFZLENBQUUsUUFBUSxDQUFFLENBQUM7UUFDdkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxXQUFXLENBQUUsVUFBVSxDQUFFLENBQUM7UUFDNUMsSUFBSSxFQUFFLEdBQUcsSUFBSSxZQUFZLENBQUUsT0FBTyxDQUFFLENBQUM7UUFFckMsR0FBRyxDQUFDLFlBQVksQ0FBRSxVQUFVLEVBQUUsSUFBSSxrREFBcUIsQ0FBRSxHQUFHLEVBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztRQUNwRSxHQUFHLENBQUMsWUFBWSxDQUFFLElBQUksRUFBRSxJQUFJLGtEQUFxQixDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO1FBQzdELEdBQUcsQ0FBQyxRQUFRLENBQUUsSUFBSSxr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QUFDQTtBQUNBLGVBQWUsZUFBZTtBQUM5QixlQUFlLFVBQVU7QUFDekIsZ0JBQWdCLFFBQVE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsc0JBQXNCO0FBQ3JDLGVBQWUsWUFBWTtBQUMzQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxlQUFlO0FBQzlCLGVBQWUsT0FBTztBQUN0QixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGVBQWU7QUFDOUIsZUFBZSxNQUFNO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsR0FBRztBQUNsQixnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsV0FBVztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsUUFBUTtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQ7O0FBRUE7QUFDQSwyQkFBMkIsb0JBQW9CO0FBQy9DO0FBQ0EsZ0JBQWdCLFVBQVU7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVEsSUFBMEM7QUFDbEQsUUFBUSxtQ0FBTztBQUNmO0FBQ0EsU0FBUztBQUFBLGtHQUFDO0FBQ1Y7QUFDQSxTQUFTLEVBS0o7QUFDTCxDQUFDLG9EQUFvRDs7Ozs7Ozs7Ozs7O0FDcmVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ0M7QUFFRDtBQUNnQjtBQUNUO0FBQ0s7QUFDRztBQUNiO0FBQ007QUFDVDtBQUNBO0FBQ0E7QUFDUTtBQUNTO0FBQ1o7QUFDRTtBQUNGO0FBQ29CO0FBQ2hCO0FBQ0E7QUFDUjtBQUNIO0FBQ0UiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9PUkUvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CYWNrZ3JvdW5kL3NoYWRlcnMvYmFja2dyb3VuZC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRE9NTWVzaC9kb21NZXNoLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvc2hhZGVycy9wYXNzVGhyb3VnaC5mcyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL3NoYWRlcnMvcGFzc1Rocm91Z2gudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1Bvc3RQcm9jZXNzaW5nL3NoYWRlcnMvcGFzc1Rocm93LnZzIiwid2VicGFjazovL09SRS8uL3NyYy9jb3JlL0Jhc2VMYXllci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvY29yZS9Db250cm9sbGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlR3JvdXAudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVLZXlGcmFtZS50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JhY2tncm91bmQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0Jlemllci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmxlbmRlckNvbm5lY3Rvci9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRE9NTWVzaC9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRWFzaW5ncy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvRXZlbnREaXNwYXRjaGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0xheW91dENvbnRyb2xsZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0xlcnBzLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Nb3VzZVJvdGF0b3IudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BhZ2VTY3JvbGxlci9QYWdlU2Nyb2xsZXJTZWN0aW9uLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9QYWdlU2Nyb2xsZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1BvaW50ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1Bvc3RQcm9jZXNzaW5nL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9UaW1lbGluZUFuaW1hdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Vbmlmb3Jtcy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvV2FpdE1hbi50cyIsIndlYnBhY2s6Ly9PUkUvLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3dvbGZ5ODctZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9PUkUvZXh0ZXJuYWwgdW1kIHtcImNvbW1vbmpzXCI6XCJ0aHJlZVwiLFwiY29tbW9uanMyXCI6XCJ0aHJlZVwiLFwiYW1kXCI6XCJ0aHJlZVwiLFwicm9vdFwiOlwiVEhSRUVcIn0iLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL09SRS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL09SRS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJ0aHJlZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJPUkVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJ0aHJlZVwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiT1JFXCJdID0gZmFjdG9yeShyb290W1wiVEhSRUVcIl0pO1xufSkodGhpcywgKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfdGhyZWVfXykgPT4ge1xucmV0dXJuICIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnZhcnlpbmcgdmVjNCB2Q29sb3I7XFxuXFxudm9pZCBtYWluKCB2b2lkICkge1xcbiAgICBcXG4gICAgdmVjMyBwb3MgPSBwb3NpdGlvbjtcXG5cXG4gICAgcG9zLnogPSAxLjA7XFxuICAgIFxcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvcywgMS4wICk7XFxuICAgIFxcbiAgICB2VXYgPSB1djtcXG4gICAgdkNvbG9yID0gdmVjNCggMS4wICk7XFxuXFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcbnVuaWZvcm0gdmVjMiBkb21Qb3M7XFxudW5pZm9ybSB2ZWMyIGRvbVNpemU7XFxudW5pZm9ybSB2ZWMyIHdpbmRvd1NpemU7XFxudW5pZm9ybSBmbG9hdCBhc3BlY3RSYXRpbztcXG5cXG52b2lkIG1haW4oICApXFxue1xcbiAgZmxvYXQgd2lkdGggPSBkb21TaXplLnggLyB3aW5kb3dTaXplLng7XFxuXFxuICAvL+W3puS4iiggMCwwICnjgatcXG4gIHZlYzMgcG9zID0gcG9zaXRpb24gKyB2ZWMzKCAxLjAsLTEuMCwwLjAgKTtcXG5cXG4gIC8vc2l6ZVxcbiAgcG9zLnggKj0gd2lkdGg7XFxuICBwb3MueSAqPSAoIHdpZHRoICogYXNwZWN0UmF0aW8gKSAqICggZG9tU2l6ZS55IC8gZG9tU2l6ZS54ICk7XFxuXFxuICBwb3MgKz0gdmVjMyggLTEuMCwgMS4wLCAwLjAgKTtcXG5cXG4gIHBvcyArPSB2ZWMzKCBkb21Qb3MueCAvIHdpbmRvd1NpemUueCAqIDIuMCwgLWRvbVBvcy55IC8gd2luZG93U2l6ZS55ICogMi4wLCAwLjAgKTtcXG5cXG4gIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zLCAxLjAgKTtcXG4gIHZVdiA9IHV2O1xcbn1cXG5cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudW5pZm9ybSBzYW1wbGVyMkQgdGV4O1xcbnZhcnlpbmcgdmVjMiB2VXY7XFxuXFxudm9pZCBtYWluKCkge1xcbiAgICBnbF9GcmFnQ29sb3IgPSB0ZXh0dXJlMkQodGV4LHZVdik7XFxufVwiOyIsImV4cG9ydCBkZWZhdWx0IFwiI2RlZmluZSBHTFNMSUZZIDFcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XFxuICAgIHZVdiA9IHV2O1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG52b2lkIG1haW4oKSB7XFxuICAgIHZVdiA9IHV2O1xcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvc2l0aW9uLCAxLjAgKTtcXG59ICAgXCI7IiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gJy4uL3V0aWxzL1VuaWZvcm1zJztcbmltcG9ydCB7IFBvaW50ZXJFdmVudEFyZ3MgfSBmcm9tICcuL0NvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJCaW5kUGFyYW0gZXh0ZW5kcyBUSFJFRS5XZWJHTFJlbmRlcmVyUGFyYW1ldGVycyB7XG5cdG5hbWU6IHN0cmluZztcblx0Y2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnQ7XG5cdGFzcGVjdFNldHRpbmc/OiBBc3BlY3RTZXR0aW5nO1xuXHR3cmFwcGVyRWxlbWVudD86IEhUTUxFbGVtZW50IHwgbnVsbDtcblx0d3JhcHBlckVsZW1lbnRSZWN0PzogRE9NUmVjdCB8IG51bGw7XG5cdHBpeGVsUmF0aW8/OiBudW1iZXJcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVySW5mbyBleHRlbmRzIExheWVyQmluZFBhcmFtIHtcblx0c2l6ZTogTGF5ZXJTaXplO1xuXHRhc3BlY3RTZXR0aW5nOiBBc3BlY3RTZXR0aW5nO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgTGF5ZXJTaXplIHtcblx0Y2FudmFzQXNwZWN0UmF0aW86IG51bWJlcjtcblx0d2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0d2luZG93QXNwZWN0UmF0aW86IG51bWJlcjtcblx0Y2FudmFzU2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0Y2FudmFzUGl4ZWxTaXplOiBUSFJFRS5WZWN0b3IyO1xuXHRwaXhlbFJhdGlvOiBudW1iZXJcblx0cG9ydHJhaXRXZWlnaHQ6IG51bWJlcjtcblx0d2lkZVdlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQXNwZWN0U2V0dGluZyB7XG5cdG1haW5Bc3BlY3Q6IG51bWJlcjtcblx0cG9ydHJhaXRBc3BlY3Q6IG51bWJlcjtcblx0d2lkZUFzcGVjdDogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVG91Y2hFdmVudEFyZ3Mge1xuXHRldmVudDogUG9pbnRlckV2ZW50IHwgVG91Y2hFdmVudDtcblx0cG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdGRlbHRhOiBUSFJFRS5WZWN0b3IyO1xuXHRzY3JlZW5Qb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0d2luZG93UG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNlTGF5ZXIgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBpbmZvOiBMYXllckluZm87XG5cblx0cHVibGljIHJlbmRlcmVyPzogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblxuXHRwdWJsaWMgc2NlbmU6IFRIUkVFLlNjZW5lO1xuXHRwdWJsaWMgY2FtZXJhOiBUSFJFRS5QZXJzcGVjdGl2ZUNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgcmVhZHlBbmltYXRlID0gZmFsc2U7XG5cdHB1YmxpYyB0aW1lID0gMDtcblx0cHVibGljIGNvbW1vblVuaWZvcm1zOiBVbmlmb3JtcztcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLmluZm8gPSB7XG5cdFx0XHRuYW1lOiAnJyxcblx0XHRcdGFzcGVjdFNldHRpbmc6IHtcblx0XHRcdFx0bWFpbkFzcGVjdDogMTYgLyA5LFxuXHRcdFx0XHR3aWRlQXNwZWN0OiAxMCAvIDEsXG5cdFx0XHRcdHBvcnRyYWl0QXNwZWN0OiAxIC8gMixcblx0XHRcdH0sXG5cdFx0XHRzaXplOiB7XG5cdFx0XHRcdHdpbmRvd1NpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdHdpbmRvd0FzcGVjdFJhdGlvOiAxLjAsXG5cdFx0XHRcdGNhbnZhc1NpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdGNhbnZhc1BpeGVsU2l6ZTogbmV3IFRIUkVFLlZlY3RvcjIoKSxcblx0XHRcdFx0Y2FudmFzQXNwZWN0UmF0aW86IDEuMCxcblx0XHRcdFx0cGl4ZWxSYXRpbzogd2luZG93LmRldmljZVBpeGVsUmF0aW8sXG5cdFx0XHRcdHBvcnRyYWl0V2VpZ2h0OiAwLjAsXG5cdFx0XHRcdHdpZGVXZWlnaHQ6IDAuMFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLmNvbW1vblVuaWZvcm1zID0ge1xuXHRcdFx0dGltZToge1xuXHRcdFx0XHR2YWx1ZTogMFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XG5cdFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoIDUwLCAxLCAwLjEsIDEwMDAgKTtcblxuXHR9XG5cblx0cHVibGljIHRpY2soIGRlbHRhVGltZTogbnVtYmVyICkge1xuXG5cdFx0dGhpcy50aW1lICs9IGRlbHRhVGltZTtcblxuXHRcdHRoaXMuY29tbW9uVW5pZm9ybXMudGltZS52YWx1ZSA9IHRoaXMudGltZTtcblxuXHRcdGlmICggdGhpcy5yZWFkeUFuaW1hdGUgKSB7XG5cblx0XHRcdHRoaXMuYW5pbWF0ZSggZGVsdGFUaW1lICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBhbmltYXRlKCBkZWx0YVRpbWU6IG51bWJlciApIHsgfVxuXG5cdHB1YmxpYyBvbkJpbmQoIGxheWVySW5mbzogTGF5ZXJCaW5kUGFyYW0gKSB7XG5cblx0XHR0aGlzLmluZm8ubmFtZSA9IGxheWVySW5mby5uYW1lO1xuXHRcdHRoaXMuaW5mby5jYW52YXMgPSBsYXllckluZm8uY2FudmFzO1xuXG5cdFx0aWYgKCBsYXllckluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuc2V0V3JhcHBlckVsZW1lbnQoIGxheWVySW5mby53cmFwcGVyRWxlbWVudCB8fCBudWxsLCBmYWxzZSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5pbmZvLmFzcGVjdFNldHRpbmcgPSBsYXllckluZm8uYXNwZWN0U2V0dGluZyB8fCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZztcblx0XHR0aGlzLmluZm8uYWxwaGEgPSBsYXllckluZm8uYWxwaGE7XG5cdFx0dGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyA9IGxheWVySW5mby5waXhlbFJhdGlvIHx8IHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW87XG5cblx0XHR0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoIHRoaXMuaW5mbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuc2V0UGl4ZWxSYXRpbyggdGhpcy5pbmZvLnNpemUucGl4ZWxSYXRpbyApO1xuXHRcdHRoaXMucmVuZGVyZXIuZGVidWcuY2hlY2tTaGFkZXJFcnJvcnMgPSB0cnVlO1xuXG5cdFx0dGhpcy5pbmZvLmNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcblxuXHRcdHNldFRpbWVvdXQoICgpID0+IHtcblxuXHRcdFx0dGhpcy5vblJlc2l6ZSgpO1xuXHRcdFx0dGhpcy5yZWFkeUFuaW1hdGUgPSB0cnVlO1xuXG5cdFx0fSwgMCApO1xuXG5cdH1cblxuXHRwdWJsaWMgb25VbmJpbmQoKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICdkaXNwb3NlJ1xuXHRcdH0gKTtcblxuXHRcdHRoaXMucmVtb3ZlQ2hpbGRyZW5zKCB0aGlzLnNjZW5lICk7XG5cblx0XHR0aGlzLnJlYWR5QW5pbWF0ZSA9IGZhbHNlO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgcmVtb3ZlQ2hpbGRyZW5zKCBvYmplY3Q6IFRIUkVFLk9iamVjdDNEICkge1xuXG5cdFx0Y29uc3QgbGVuZ3RoID0gb2JqZWN0LmNoaWxkcmVuLmxlbmd0aDtcblxuXHRcdGZvciAoIGxldCBpID0gbGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC0tICkge1xuXG5cdFx0XHR0aGlzLnJlbW92ZUNoaWxkcmVucyggb2JqZWN0LmNoaWxkcmVuWyBpIF0gKTtcblxuXHRcdFx0bGV0IGdlbzogVEhSRUUuQnVmZmVyR2VvbWV0cnkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cdFx0XHRsZXQgbWF0OiBUSFJFRS5NYXRlcmlhbCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuXHRcdFx0aWYgKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdIGFzIFRIUkVFLk1lc2ggKS5pc01lc2ggKSB7XG5cblx0XHRcdFx0Z2VvID0gKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkuZ2VvbWV0cnk7XG5cdFx0XHRcdG1hdCA9ICggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkubWF0ZXJpYWwgYXMgVEhSRUUuTWF0ZXJpYWwgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRvYmplY3QucmVtb3ZlKCAoIG9iamVjdC5jaGlsZHJlblsgaSBdICkgKTtcblxuXHRcdFx0aWYgKCBnZW8gKSB7XG5cblx0XHRcdFx0Z2VvLmRpc3Bvc2UoKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIG1hdCApIHtcblxuXHRcdFx0XHRtYXQuZGlzcG9zZSgpO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRXcmFwcGVyRWxlbWVudCggd3JhcHBlckVsbTogSFRNTEVsZW1lbnQgfCBudWxsLCBkaXNwYXRjaFJlc2l6ZTogYm9vbGVhbiA9IHRydWUgKSB7XG5cblx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgPSB3cmFwcGVyRWxtO1xuXHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudFJlY3QgPSB3cmFwcGVyRWxtID8gd3JhcHBlckVsbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSA6IG51bGw7XG5cblx0XHRpZiAoIGRpc3BhdGNoUmVzaXplICkge1xuXG5cdFx0XHR0aGlzLm9uUmVzaXplKCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBvblJlc2l6ZSgpIHtcblxuXHRcdGlmICggdGhpcy5yZW5kZXJlciA9PSBudWxsICkgcmV0dXJuO1xuXG5cdFx0Y29uc3QgbmV3V2luZG93U2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcblx0XHRjb25zdCBuZXdDYW52YXNTaXplID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHRuZXdDYW52YXNTaXplLnNldCggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmNsaWVudFdpZHRoLCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuY2xpZW50SGVpZ2h0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRuZXdDYW52YXNTaXplLmNvcHkoIG5ld1dpbmRvd1NpemUgKTtcblxuXHRcdH1cblxuXHRcdGxldCBwb3J0cmFpdFdlaWdodCA9IDEuMCAtICggKCBuZXdDYW52YXNTaXplLnggLyBuZXdDYW52YXNTaXplLnkgKSAtIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLnBvcnRyYWl0QXNwZWN0ICkgLyAoIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLm1haW5Bc3BlY3QgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5wb3J0cmFpdEFzcGVjdCApO1xuXHRcdHBvcnRyYWl0V2VpZ2h0ID0gTWF0aC5taW4oIDEuMCwgTWF0aC5tYXgoIDAuMCwgcG9ydHJhaXRXZWlnaHQgKSApO1xuXG5cdFx0bGV0IHdpZGVXZWlnaHQgPSAxLjAgLSAoICggbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55ICkgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy53aWRlQXNwZWN0ICkgLyAoIHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nLm1haW5Bc3BlY3QgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy53aWRlQXNwZWN0ICk7XG5cdFx0d2lkZVdlaWdodCA9IE1hdGgubWluKCAxLjAsIE1hdGgubWF4KCAwLjAsIHdpZGVXZWlnaHQgKSApO1xuXG5cdFx0dGhpcy5pbmZvLnNpemUud2luZG93U2l6ZS5jb3B5KCBuZXdXaW5kb3dTaXplICk7XG5cdFx0dGhpcy5pbmZvLnNpemUud2luZG93QXNwZWN0UmF0aW8gPSBuZXdXaW5kb3dTaXplLnggLyBuZXdXaW5kb3dTaXplLnk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS5jb3B5KCBuZXdDYW52YXNTaXplICk7XG5cdFx0dGhpcy5pbmZvLnNpemUuY2FudmFzUGl4ZWxTaXplLmNvcHkoIG5ld0NhbnZhc1NpemUuY2xvbmUoKS5tdWx0aXBseVNjYWxhciggdGhpcy5yZW5kZXJlci5nZXRQaXhlbFJhdGlvKCkgKSApO1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc0FzcGVjdFJhdGlvID0gbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55O1xuXHRcdHRoaXMuaW5mby5zaXplLnBvcnRyYWl0V2VpZ2h0ID0gcG9ydHJhaXRXZWlnaHQ7XG5cdFx0dGhpcy5pbmZvLnNpemUud2lkZVdlaWdodCA9IHdpZGVXZWlnaHQ7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFNpemUoIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUueCwgdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZS55ICk7XG5cdFx0dGhpcy5jYW1lcmEuYXNwZWN0ID0gdGhpcy5pbmZvLnNpemUuY2FudmFzQXNwZWN0UmF0aW87XG5cdFx0dGhpcy5jYW1lcmEudXBkYXRlUHJvamVjdGlvbk1hdHJpeCgpO1xuXG5cdFx0aWYgKCB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMuaW5mby53cmFwcGVyRWxlbWVudFJlY3QgPSB0aGlzLmluZm8ud3JhcHBlckVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBwb2ludGVyRXZlbnQoIGU6IFBvaW50ZXJFdmVudEFyZ3MgKSB7XG5cblx0XHRjb25zdCBjYW52YXNQb2ludGVyUG9zID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblx0XHRjYW52YXNQb2ludGVyUG9zLmNvcHkoIGUucG9zaXRpb24gKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLmNhbnZhcyApIHtcblxuXHRcdFx0Y29uc3QgY2FudmFzUmVjdCA9IHRoaXMuaW5mby5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRjYW52YXNQb2ludGVyUG9zLnN1YiggbmV3IFRIUkVFLlZlY3RvcjIoIGNhbnZhc1JlY3QueCwgY2FudmFzUmVjdC55ICkgKTtcblxuXHRcdH1cblxuXHRcdGNvbnN0IHNjcmVlblBvc2l0aW9uID0gY2FudmFzUG9pbnRlclBvcy5jbG9uZSgpO1xuXHRcdHNjcmVlblBvc2l0aW9uLmRpdmlkZSggdGhpcy5pbmZvLnNpemUuY2FudmFzU2l6ZSApO1xuXHRcdHNjcmVlblBvc2l0aW9uLnkgPSAxLjAgLSBzY3JlZW5Qb3NpdGlvbi55O1xuXHRcdHNjcmVlblBvc2l0aW9uLm11bHRpcGx5U2NhbGFyKCAyLjAgKS5zdWJTY2FsYXIoIDEuMCApO1xuXG5cblx0XHRjb25zdCBhcmdzOiBUb3VjaEV2ZW50QXJncyA9IHtcblx0XHRcdGV2ZW50OiBlLnBvaW50ZXJFdmVudCxcblx0XHRcdHBvc2l0aW9uOiBjYW52YXNQb2ludGVyUG9zLmNsb25lKCksXG5cdFx0XHRkZWx0YTogZS5kZWx0YS5jbG9uZSgpLFxuXHRcdFx0c2NyZWVuUG9zaXRpb246IHNjcmVlblBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHR3aW5kb3dQb3NpdGlvbjogZS5wb3NpdGlvbi5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdob3ZlcicgKSB7XG5cblx0XHRcdHRoaXMub25Ib3ZlciggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdzdGFydCcgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaFN0YXJ0KCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ21vdmUnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hNb3ZlKCBhcmdzICk7XG5cblx0XHR9IGVsc2UgaWYgKCBlLnBvaW50ZXJFdmVudFR5cGUgPT0gJ2VuZCcgKSB7XG5cblx0XHRcdHRoaXMub25Ub3VjaEVuZCggYXJncyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgb25Ub3VjaFN0YXJ0KCBhcmdzOiBUb3VjaEV2ZW50QXJncyApIHsgfVxuXG5cdHB1YmxpYyBvblRvdWNoTW92ZSggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ub3VjaEVuZCggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ib3ZlciggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25XaGVlbCggZXZlbnQ6IFdoZWVsRXZlbnQsIHRyYWNrcGFkRGVsdGE6IG51bWJlciApIHsgfVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyBQb2ludGVyIH0gZnJvbSAnLi4vdXRpbHMvUG9pbnRlcic7XG5pbXBvcnQgeyBCYXNlTGF5ZXIsIExheWVyQmluZFBhcmFtIH0gZnJvbSAnLi9CYXNlTGF5ZXInO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUG9pbnRlckV2ZW50QXJncyB7XG5cdHBvaW50ZXJFdmVudDogUG9pbnRlckV2ZW50O1xuXHRwb2ludGVyRXZlbnRUeXBlOiBzdHJpbmc7XG5cdHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRkZWx0YTogVEhSRUUuVmVjdG9yMjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIENvbnRyb2xsZXJQYXJhbSB7XG5cdHNpbGVudD86IGJvb2xlYW47XG5cdHBvaW50ZXJFdmVudEVsZW1lbnQ/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGNsYXNzIENvbnRyb2xsZXIgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHB1YmxpYyBwb2ludGVyOiBQb2ludGVyO1xuXHRwdWJsaWMgY2xvY2s6IFRIUkVFLkNsb2NrO1xuXG5cdHByb3RlY3RlZCBsYXllcnM6IEJhc2VMYXllcltdID0gW107XG5cdHByb3RlY3RlZCBwb2ludGVyRXZlbnRFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG5cblx0Y29uc3RydWN0b3IoIHBhcmFtZXRlcj86IENvbnRyb2xsZXJQYXJhbSApIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHRpZiAoICEgKCBwYXJhbWV0ZXIgJiYgcGFyYW1ldGVyLnNpbGVudCApICkge1xuXG5cdFx0XHRjb25zb2xlLmxvZyggXCIlYy0gb3JlLXRocmVlIFwiICsgcmVxdWlyZSggXCIuLi8uLi9wYWNrYWdlLmpzb25cIiApLnZlcnNpb24gKyBcIiAtXCIgLCAncGFkZGluZzogNXB4IDEwcHggO2JhY2tncm91bmQtY29sb3I6IGJsYWNrOyBjb2xvcjogd2hpdGU7Zm9udC1zaXplOjExcHgnICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLmNsb2NrID0gbmV3IFRIUkVFLkNsb2NrKCk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdFBvaW50ZXJcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRcdHRoaXMucG9pbnRlciA9IG5ldyBQb2ludGVyKCk7XG5cdFx0dGhpcy5zZXRQb2ludGVyRXZlbnRFbGVtZW50KCAoIHBhcmFtZXRlciAmJiBwYXJhbWV0ZXIucG9pbnRlckV2ZW50RWxlbWVudCApIHx8IGRvY3VtZW50LmJvZHkgKTtcblxuXHRcdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFx0RXZlbnRzXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHRsZXQgcG9pbnRlclVwZGF0ZSA9IHRoaXMucG9pbnRlckV2ZW50LmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgcG9pbnRlcldoZWVsID0gdGhpcy5vbldoZWVsLmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgb3JpZW50YXRpb25jaGFuZ2UgPSB0aGlzLm9uT3JpZW50YXRpb25EZXZpY2UuYmluZCggdGhpcyApO1xuXHRcdGxldCB3aW5kb3dSZXNpemUgPSB0aGlzLm9uV2luZG93UmVzaXplLmJpbmQoIHRoaXMgKTtcblxuXHRcdHRoaXMucG9pbnRlci5hZGRFdmVudExpc3RlbmVyKCAndXBkYXRlJywgcG9pbnRlclVwZGF0ZSApO1xuXHRcdHRoaXMucG9pbnRlci5hZGRFdmVudExpc3RlbmVyKCAnd2hlZWwnLCBwb2ludGVyV2hlZWwgKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25jaGFuZ2UgKTtcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSApO1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAnZGlzcG9zZScsICgpID0+IHtcblxuXHRcdFx0dGhpcy5wb2ludGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd1cGRhdGUnLCBwb2ludGVyVXBkYXRlICk7XG5cdFx0XHR0aGlzLnBvaW50ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3doZWVsJywgcG9pbnRlcldoZWVsICk7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25jaGFuZ2UgKTtcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgd2luZG93UmVzaXplICk7XG5cblx0XHR9ICk7XG5cblx0XHR0aGlzLnRpY2soKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHRpY2soKSB7XG5cblx0XHRjb25zdCBkZWx0YVRpbWUgPSB0aGlzLmNsb2NrLmdldERlbHRhKCk7XG5cblx0XHR0aGlzLnBvaW50ZXIudXBkYXRlKCk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0udGljayggZGVsdGFUaW1lICk7XG5cblx0XHR9XG5cblx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIHRoaXMudGljay5iaW5kKCB0aGlzICkgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uV2luZG93UmVzaXplKCkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLm9uUmVzaXplKCk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbk9yaWVudGF0aW9uRGV2aWNlKCkge1xuXG5cdFx0dGhpcy5vbldpbmRvd1Jlc2l6ZSgpO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgcG9pbnRlckV2ZW50KCBlOiBUSFJFRS5FdmVudCApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5wb2ludGVyRXZlbnQoIGUgYXMgdW5rbm93biBhcyBQb2ludGVyRXZlbnRBcmdzICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbldoZWVsKCBlOiBUSFJFRS5FdmVudCApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5vbldoZWVsKCBlLndoZWVsRXZlbnQsIGUudHJhY2twYWREZWx0YSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRBUElcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFkZExheWVyKCBsYXllcjogQmFzZUxheWVyLCBsYXllckluZm86IExheWVyQmluZFBhcmFtICkge1xuXG5cdFx0d2hpbGUgKCB0aGlzLmdldExheWVyKCBsYXllckluZm8ubmFtZSApICkge1xuXG5cdFx0XHRsYXllckluZm8ubmFtZSArPSAnXyc7XG5cblx0XHR9XG5cblx0XHR0aGlzLmxheWVycy5wdXNoKCBsYXllciApO1xuXG5cdFx0bGF5ZXIub25CaW5kKCBsYXllckluZm8gKTtcblxuXHR9XG5cblx0cHVibGljIGdldExheWVyKCBsYXllck5hbWU6IHN0cmluZyApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0aWYgKCB0aGlzLmxheWVyc1sgaSBdLmluZm8ubmFtZSA9PSBsYXllck5hbWUgKSByZXR1cm4gdGhpcy5sYXllcnNbIGkgXTtcblxuXHRcdH1cblxuXHRcdHJldHVybiBudWxsO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlTGF5ZXIoIGxheWVyTm1hZTogc3RyaW5nICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSB0aGlzLmxheWVycy5sZW5ndGggLSAxOyBpID49IDA7IGkgLS0gKSB7XG5cblx0XHRcdGNvbnN0IGxheWVyID0gdGhpcy5sYXllcnNbIGkgXTtcblxuXHRcdFx0aWYgKCBsYXllci5pbmZvLm5hbWUgPT0gbGF5ZXJObWFlICkge1xuXG5cdFx0XHRcdGxheWVyLm9uVW5iaW5kKCk7XG5cblx0XHRcdFx0dGhpcy5sYXllcnMuc3BsaWNlKCBpLCAxICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFBvaW50ZXJFdmVudEVsZW1lbnQoIGVsbTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHRpZiAoIHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCApIHtcblxuXHRcdFx0dGhpcy5wb2ludGVyLnVucmVnaXN0ZXJFbGVtZW50KCB0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMucG9pbnRlci5yZWdpc3RlckVsZW1lbnQoIGVsbSApO1xuXG5cdFx0dGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ID0gZWxtO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuXHRcdHRoaXMubGF5ZXJzLmZvckVhY2goIGl0ZW0gPT4ge1xuXG5cdFx0XHR0aGlzLnJlbW92ZUxheWVyKCBpdGVtLmluZm8ubmFtZSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy50aWNrID0gKCkgPT4ge1xuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7IHR5cGU6ICdkaXNwb3NlJyB9ICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gJy4uL1VuaWZvcm1zJztcclxuaW1wb3J0IHsgRkN1cnZlR3JvdXAgfSBmcm9tICcuL0ZDdXJ2ZUdyb3VwJztcclxuXHJcbmV4cG9ydCB0eXBlIEFuaW1hdGlvbkZyYW1lSW5mbyA9IHtcclxuXHRzdGFydDogbnVtYmVyXHJcblx0ZW5kOiBudW1iZXJcclxuXHRkdXJhdGlvbjogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25BY3Rpb24gZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJ2ZXM6IHtba2V5OnN0cmluZ106RkN1cnZlR3JvdXB9ID0ge307XHJcblx0cHJpdmF0ZSB1bmlmb3JtczogVW5pZm9ybXM7XHJcblx0XHJcblx0cHVibGljIGZyYW1lOiBBbmltYXRpb25GcmFtZUluZm87XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBuYW1lPzogc3RyaW5nICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gbmFtZSB8fCAnJztcclxuXHRcdHRoaXMudW5pZm9ybXMgPSB7fTtcclxuXHJcblx0XHR0aGlzLmZyYW1lID0ge1xyXG5cdFx0XHRzdGFydDogMCxcclxuXHRcdFx0ZW5kOiAwLFxyXG5cdFx0XHRkdXJhdGlvbjogMCxcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZEZjdXJ2ZUdyb3VwKCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZmN1cnZlR3JvdXA6IEZDdXJ2ZUdyb3VwICkge1xyXG5cclxuXHRcdHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXSA9IGZjdXJ2ZUdyb3VwO1xyXG5cclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbW92ZUZDdXJ2ZSggcHJvcGVydHlOYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0ZGVsZXRlIHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXTtcclxuXHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNhbGNGcmFtZSgpIHtcclxuXHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmVzIClcclxuXHJcblx0XHRsZXQgbWluU3RhcnQgPSBJbmZpbml0eVxyXG5cdFx0bGV0IG1heEVuZCA9IC1JbmZpbml0eVxyXG5cdFx0XHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmUgPSAodGhpcy5jdXJ2ZXMpWyBjdXJ2ZUtleXNbIGkgXSBdO1xyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lU3RhcnQgPCBtaW5TdGFydCApIHtcclxuXHJcblx0XHRcdFx0bWluU3RhcnQgPSBjdXJ2ZS5mcmFtZVN0YXJ0O1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVFbmQgPiBtYXhFbmQgKSB7XHJcblxyXG5cdFx0XHRcdG1heEVuZCA9IGN1cnZlLmZyYW1lRW5kO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCBtaW5TdGFydCA9PSAtSW5maW5pdHkgfHwgbWF4RW5kID09IEluZmluaXR5KSB7XHJcblxyXG5cdFx0XHRtaW5TdGFydCA9IDA7XHJcblx0XHRcdG1heEVuZCA9IDFcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5mcmFtZS5zdGFydCA9IG1pblN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZS5lbmQgPSBtYXhFbmQ7XHJcblx0XHR0aGlzLmZyYW1lLmR1cmF0aW9uID0gdGhpcy5mcmFtZS5lbmQgLSB0aGlzLmZyYW1lLnN0YXJ0O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRGQ3VydmVHcm91cCggcHJvcGVydHlOYW1lOiBzdHJpbmcgKTogRkN1cnZlR3JvdXAgfCBudWxsIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5jdXJ2ZXNbIHByb3BlcnR5TmFtZSBdIHx8IG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRnZXQgdmFsdWVzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHB1YmxpYyBhc3NpZ25Vbmlmb3JtcyggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHVuaWZvcm06IFRIUkVFLklVbmlmb3JtICkge1xyXG5cclxuXHRcdHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdID0gdW5pZm9ybTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VW5pZm9ybXM8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IFRIUkVFLklVbmlmb3JtPFQ+IHwgbnVsbCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSApIHtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXTtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGxldCBjdXJ2ZUdyb3VwID0gdGhpcy5nZXRGQ3VydmVHcm91cChwcm9wZXJ0eU5hbWUpXHJcblxyXG5cdFx0aWYoIGN1cnZlR3JvdXAgKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgdW5pID0ge1xyXG5cdFx0XHRcdHZhbHVlOiBjdXJ2ZUdyb3VwLmNyZWF0ZUluaXRWYWx1ZSgpIGFzIFRcclxuXHRcdFx0fTtcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMudW5pZm9ybXNbIHByb3BlcnR5TmFtZSBdID0gdW5pO1xyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIHVuaTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IFQgfCBudWxsO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHRhcmdldDogVCApOiBUO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggcHJvcGVydHlOYW1lOiBzdHJpbmcsIHRhcmdldD86IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyICk6IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0bGV0IHVuaWZvcm0gPSB0aGlzLmdldFVuaWZvcm1zKHByb3BlcnR5TmFtZSk7XHJcblxyXG5cdFx0aWYoICF1bmlmb3JtICkgcmV0dXJuIHRhcmdldCB8fCBudWxsO1xyXG5cclxuXHRcdGxldCB2YWx1ZSA9IHVuaWZvcm0udmFsdWU7XHJcblx0XHRcclxuXHRcdGlmKCAhdGFyZ2V0ICkgcmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdGlmKCB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQueCA9IHZhbHVlO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGFyZ2V0LnggPSB2YWx1ZS54O1xyXG5cdFx0dGFyZ2V0LnkgPSB2YWx1ZS55O1xyXG5cclxuXHRcdGlmKCAneicgaW4gdGFyZ2V0ICYmICd6JyBpbiB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRhcmdldC56ID0gdmFsdWUuelxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZiggJ3cnIGluIHRhcmdldCAmJiAndycgaW4gdmFsdWUgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQudyA9IHZhbHVlLndcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB0YXJnZXQgfHwgbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWVBdDxUIGV4dGVuZHMgbnVtYmVyPiggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIgKTogVCB8IG51bGw7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlQXQ8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyID4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ6IFQgKTogVDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWVBdCggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZyYW1lOiBudW1iZXIsIHRhcmdldD86IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyICk6IFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0bGV0IGN1cnZlID0gdGhpcy5nZXRGQ3VydmVHcm91cCggcHJvcGVydHlOYW1lICk7XHJcblxyXG5cdFx0aWYoIHRhcmdldCApICB7XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgcmV0dXJuIHRhcmdldDtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBjdXJ2ZS5nZXRWYWx1ZSggZnJhbWUgfHwgMCwgdGFyZ2V0IClcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIHJldHVybiBudWxsO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY3VydmUuZ2V0VmFsdWUoIGZyYW1lIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0VXBkYXRlRnJhbWVcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHRcclxuXHRwdWJsaWMgdXBkYXRlRnJhbWUoIGZyYW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlcyApO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgZmN1cnZlR3JvdXAgPSB0aGlzLmN1cnZlc1sgY3VydmVLZXlzWyBpIF0gXTtcclxuXHRcdFx0bGV0IHVuaSA9IHRoaXMuZ2V0VW5pZm9ybXMoIGN1cnZlS2V5c1sgaSBdICk7XHJcblxyXG5cdFx0XHRpZiggIXVuaSApIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0aWYoIHR5cGVvZiB1bmkudmFsdWUgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHRcdHVuaS52YWx1ZSA9IGZjdXJ2ZUdyb3VwLmdldFZhbHVlKGZyYW1lKSB8fCAwXHJcblx0XHRcdFx0XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGZjdXJ2ZUdyb3VwLmdldFZhbHVlKGZyYW1lLCB1bmkudmFsdWUpXHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoJ3VwZGF0ZScsIFt0aGlzXSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBGQ3VydmVLZXlGcmFtZSB9IGZyb20gJy4vRkN1cnZlS2V5RnJhbWUnO1xyXG5cclxuZXhwb3J0IHR5cGUgRkN1cnZlQXhpcyA9ICd4JyB8ICd5JyB8ICd6JyB8ICd3JyB8ICdzY2FsYXInXHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIGtleWZyYW1lczogRkN1cnZlS2V5RnJhbWVbXSA9IFtdO1xyXG5cclxuXHRwcml2YXRlIGNhY2hlOiB7IGZyYW1lOiBudW1iZXIsIHZhbHVlOiBudW1iZXIgfSA9IHsgZnJhbWU6IE5hTiwgdmFsdWU6IE5hTiB9O1xyXG5cclxuXHRwdWJsaWMgZnJhbWVTdGFydDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUR1cmF0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBmcmFtZXM/OiBGQ3VydmVLZXlGcmFtZVtdICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gMDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IDA7XHJcblx0XHRcclxuXHRcdHRoaXMuc2V0KCBmcmFtZXMgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0KCBmcmFtZXM/OiBGQ3VydmVLZXlGcmFtZVtdICkge1xyXG5cclxuXHRcdGlmICggZnJhbWVzICkge1xyXG5cclxuXHRcdFx0dGhpcy5rZXlmcmFtZXMubGVuZ3RoID0gMDtcclxuXHJcblx0XHRcdGZyYW1lcy5mb3JFYWNoKCBrZXlmcmFtZSA9PiB7XHJcblxyXG5cdFx0XHRcdHRoaXMuYWRkS2V5RnJhbWUoIGtleWZyYW1lICk7XHJcblxyXG5cdFx0XHR9ICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRLZXlGcmFtZSgga2V5ZnJhbWU6IEZDdXJ2ZUtleUZyYW1lICkge1xyXG5cclxuXHRcdGxldCBpbmRleCA9IDA7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5rZXlmcmFtZXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgXTtcclxuXHJcblx0XHRcdGlmICggZnJhbWUuY29vcmRpbmF0ZS54IDwga2V5ZnJhbWUuY29vcmRpbmF0ZS54ICkge1xyXG5cclxuXHRcdFx0XHRpbmRleCArKztcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmtleWZyYW1lcy5zcGxpY2UoIGluZGV4LCAwLCBrZXlmcmFtZSApO1xyXG5cclxuXHRcdC8vIHNldCBmcmFtZSBpbmZvXHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IHRoaXMua2V5ZnJhbWVzWzBdLmNvb3JkaW5hdGUueFxyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IHRoaXMua2V5ZnJhbWVzW3RoaXMua2V5ZnJhbWVzLmxlbmd0aCAtIDFdLmNvb3JkaW5hdGUueFxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggZnJhbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoIGZyYW1lID09IHRoaXMuY2FjaGUuZnJhbWUgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jYWNoZS52YWx1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHZhbHVlOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmtleWZyYW1lcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQga2V5ZnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSBdO1xyXG5cclxuXHRcdFx0aWYgKCBmcmFtZSA8PSBrZXlmcmFtZS5jb29yZGluYXRlLnggKSB7XHJcblxyXG5cdFx0XHRcdGxldCBiZWZvcmVLZXlGcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIC0gMSBdO1xyXG5cclxuXHRcdFx0XHRpZiAoIGJlZm9yZUtleUZyYW1lICkge1xyXG5cclxuXHRcdFx0XHRcdHZhbHVlID0gYmVmb3JlS2V5RnJhbWUudG8oIGtleWZyYW1lLCBmcmFtZSApO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdHZhbHVlID0ga2V5ZnJhbWUuY29vcmRpbmF0ZS55O1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHZhbHVlID09PSBudWxsICYmIHRoaXMua2V5ZnJhbWVzLmxlbmd0aCA+IDAgKSB7XHJcblxyXG5cdFx0XHR2YWx1ZSA9IHRoaXMua2V5ZnJhbWVzWyB0aGlzLmtleWZyYW1lcy5sZW5ndGggLSAxIF0uY29vcmRpbmF0ZS55O1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHZhbHVlICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0dGhpcy5jYWNoZSA9IHtcclxuXHRcdFx0XHRmcmFtZTogZnJhbWUsXHJcblx0XHRcdFx0dmFsdWU6IHZhbHVlXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiAwO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEZDdXJ2ZSwgRkN1cnZlQXhpcyB9IGZyb20gJy4vRkN1cnZlJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUdyb3VwVHlwZSA9ICdzY2FsYXInIHwgJ3ZlYzInIHwgJ3ZlYzMnIHwgJ3ZlYzQnXHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlR3JvdXAgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBjdXJ2ZToge1theGlzIGluIEZDdXJ2ZUF4aXNdOiBGQ3VydmUgfCBudWxsfTtcclxuXHRwdWJsaWMgdHlwZTogRkN1cnZlR3JvdXBUeXBlID0gJ3NjYWxhcic7XHJcblxyXG5cdHB1YmxpYyBmcmFtZVN0YXJ0OiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXI7XHJcblx0cHVibGljIGZyYW1lRHVyYXRpb246IG51bWJlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoIG5hbWU/OiBzdHJpbmcsIHg/OiBGQ3VydmUsIHk/OiBGQ3VydmUsIHo/OiBGQ3VydmUsIHc/OiBGQ3VydmUsIHNjYWxhcj86IEZDdXJ2ZSApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XHJcblx0XHRcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gMDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IDA7XHJcblx0XHRcclxuXHRcdHRoaXMuY3VydmUgPSB7XHJcblx0XHRcdHg6IG51bGwsXHJcblx0XHRcdHk6IG51bGwsXHJcblx0XHRcdHo6IG51bGwsXHJcblx0XHRcdHc6IG51bGwsXHJcblx0XHRcdHNjYWxhcjogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHRpZiggeCApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB4LCAneCcgKVxyXG5cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0aWYoIHkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeSwgJ3knIClcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKCB6ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHosICd6JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKCB3ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHcsICd3JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRGQ3VydmUoIGN1cnZlOiBGQ3VydmUsIGF4aXM6IEZDdXJ2ZUF4aXMgKSB7XHJcblxyXG5cdFx0dGhpcy5jdXJ2ZVsgYXhpcyBdID0gY3VydmU7XHJcblxyXG5cdFx0dGhpcy5jYWxjVHlwZSgpO1xyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY2FsY1R5cGUoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmN1cnZlLnNjYWxhciApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuY3VydmUudyApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWM0JztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnogKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjMyc7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS55ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzInO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueCApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgY2FsY0ZyYW1lKCkge1xyXG5cdFx0XHJcblx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIHRoaXMuY3VydmUgKVxyXG5cclxuXHRcdGxldCBtaW5TdGFydCA9IEluZmluaXR5XHJcblx0XHRsZXQgbWF4RW5kID0gLUluZmluaXR5XHJcblx0XHRcclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGN1cnZlS2V5cy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZSA9ICh0aGlzLmN1cnZlIGFzIHtba2V5OiBzdHJpbmddOiBGQ3VydmV9KVsgY3VydmVLZXlzWyBpIF0gXTtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSBjb250aW51ZTtcclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZVN0YXJ0IDwgbWluU3RhcnQgKSB7XHJcblxyXG5cdFx0XHRcdG1pblN0YXJ0ID0gY3VydmUuZnJhbWVTdGFydDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lRW5kID4gbWF4RW5kICkge1xyXG5cclxuXHRcdFx0XHRtYXhFbmQgPSBjdXJ2ZS5mcmFtZUVuZDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiggbWluU3RhcnQgPT0gLUluZmluaXR5IHx8IG1heEVuZCA9PSBJbmZpbml0eSkge1xyXG5cclxuXHRcdFx0bWluU3RhcnQgPSAwO1xyXG5cdFx0XHRtYXhFbmQgPSAxXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IG1pblN0YXJ0O1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IG1heEVuZDtcclxuXHRcdHRoaXMuZnJhbWVEdXJhdGlvbiA9IHRoaXMuZnJhbWVFbmQgLSB0aGlzLmZyYW1lU3RhcnQ7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0cHVibGljIGNyZWF0ZUluaXRWYWx1ZSgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMudHlwZSA9PSAndmVjMicgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjIoKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzMnICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy50eXBlID09ICd2ZWM0JyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yNCgpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyPiggZnJhbWU6IG51bWJlciwgdGFyZ2V0OiBUICk6IFQ7XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZSggZnJhbWU6IG51bWJlciApOiBudW1iZXIgfCBudWxsO1xyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyPiggZnJhbWU6IG51bWJlciwgdGFyZ2V0PzogVCk6IFQgfCBudW1iZXIgfCBudWxsIHtcclxuXHJcblx0XHRpZiggdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnggKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC54ID0gdGhpcy5jdXJ2ZS54LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnkgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC55ID0gdGhpcy5jdXJ2ZS55LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnogJiYgJ3onIGluIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LnogPSB0aGlzLmN1cnZlLnouZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUudyAgJiYgJ3cnIGluIHRhcmdldCApIHtcclxuXHJcblx0XHRcdFx0dGFyZ2V0LncgPSB0aGlzLmN1cnZlLncuZ2V0VmFsdWUoIGZyYW1lICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdFx0XHRcclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY3VydmUuc2NhbGFyICkge1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gIHRoaXMuY3VydmUuc2NhbGFyLmdldFZhbHVlKCBmcmFtZSApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdFxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICd3b2xmeTg3LWV2ZW50ZW1pdHRlcic7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMsIEVhc2luZ3MgfSBmcm9tICcuLi9FYXNpbmdzJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUludGVycG9sYXRpb24gPSBcIkJFWklFUlwiIHwgXCJMSU5FQVJcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBGQ3VydmVLZXlGcmFtZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBjb29yZGluYXRlOiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGhhbmRsZUxlZnQ6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaGFuZGxlUmlnaHQ6IFRIUkVFLlZlYzIgPSB7IHg6IDAsIHk6IDAgfTtcclxuXHRwdWJsaWMgaW50ZXJwb2xhdGlvbjogRkN1cnZlSW50ZXJwb2xhdGlvbiA9ICdCRVpJRVInO1xyXG5cclxuXHRwcml2YXRlIGVhc2luZzogRWFzaW5nRnVuYyB8IG51bGwgPSBudWxsO1xyXG5cdHByaXZhdGUgbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSB8IG51bGwgPSBudWxsO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggY29vcmRpbmF0ZTogVEhSRUUuVmVjMiwgaGFuZGxlTGVmdD86IFRIUkVFLlZlYzIsIGhhbmRsZVJpZ2h0PzogVEhSRUUuVmVjMiwgaW50ZXJwb2xhdGlvbj86IEZDdXJ2ZUludGVycG9sYXRpb24gKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLnNldCggY29vcmRpbmF0ZSwgaGFuZGxlTGVmdCwgaGFuZGxlUmlnaHQsIGludGVycG9sYXRpb24gKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0KCBjb29yZGluYXRlOiBUSFJFRS5WZWMyLCBoYW5kbGVMZWZ0PzogVEhSRUUuVmVjMiwgaGFuZGxlUmlnaHQ/OiBUSFJFRS5WZWMyLCBpbnRlcnBvbGF0aW9uPzogRkN1cnZlSW50ZXJwb2xhdGlvbiApIHtcclxuXHJcblx0XHR0aGlzLmNvb3JkaW5hdGUgPSBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5oYW5kbGVMZWZ0ID0gaGFuZGxlTGVmdCB8fCBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5oYW5kbGVSaWdodCA9IGhhbmRsZVJpZ2h0IHx8IGNvb3JkaW5hdGU7XHJcblx0XHR0aGlzLmludGVycG9sYXRpb24gPSBpbnRlcnBvbGF0aW9uIHx8ICdCRVpJRVInO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0RWFzaW5nKCBpbnRlcnBvbGF0aW9uOiBGQ3VydmVJbnRlcnBvbGF0aW9uLCBuZXh0RnJhbWU6IEZDdXJ2ZUtleUZyYW1lICkge1xyXG5cclxuXHRcdGlmICggaW50ZXJwb2xhdGlvbiA9PSAnQkVaSUVSJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBFYXNpbmdzLmJlemllciggdGhpcy5jb29yZGluYXRlLCB0aGlzLmhhbmRsZVJpZ2h0LCBuZXh0RnJhbWUuaGFuZGxlTGVmdCwgbmV4dEZyYW1lLmNvb3JkaW5hdGUgKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuICggdDogbnVtYmVyICkgPT4ge1xyXG5cclxuXHRcdFx0XHRsZXQgZCA9ICggbmV4dEZyYW1lLmNvb3JkaW5hdGUueSAtIHRoaXMuY29vcmRpbmF0ZS55ICk7XHJcblx0XHRcdFx0dCA9ICggdCAtIHRoaXMuY29vcmRpbmF0ZS54ICkgLyAoIG5leHRGcmFtZS5jb29yZGluYXRlLnggLSB0aGlzLmNvb3JkaW5hdGUueCApO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jb29yZGluYXRlLnkgKyB0ICogZDtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB0byggbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSwgdDogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggdGhpcy5uZXh0RnJhbWUgPT0gbnVsbCB8fCB0aGlzLm5leHRGcmFtZS5jb29yZGluYXRlLnggIT0gbmV4dEZyYW1lLmNvb3JkaW5hdGUueCB8fCB0aGlzLm5leHRGcmFtZS5jb29yZGluYXRlLnkgIT0gbmV4dEZyYW1lLmNvb3JkaW5hdGUueSApIHtcclxuXHJcblx0XHRcdHRoaXMuZWFzaW5nID0gdGhpcy5nZXRFYXNpbmcoIHRoaXMuaW50ZXJwb2xhdGlvbiwgbmV4dEZyYW1lICk7XHJcblx0XHRcdHRoaXMubmV4dEZyYW1lID0gbmV4dEZyYW1lO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHRoaXMuZWFzaW5nICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuZWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAwO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5pbXBvcnQgeyB0aHJlYWRJZCB9IGZyb20gJ3dvcmtlcl90aHJlYWRzJztcbmltcG9ydCB7IEVhc2luZ3MsIEVhc2luZ0Z1bmMgfSBmcm9tIFwiLi9FYXNpbmdzXCI7XG5pbXBvcnQgeyBMZXJwRnVuYywgTGVycHMgfSBmcm9tIFwiLi9MZXJwc1wiO1xuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tIFwiLi9Vbmlmb3Jtc1wiO1xuXG5leHBvcnQgdHlwZSBBbmltYXRvclZhcmlhYmxlVHlwZSA9IG51bWJlciB8IG51bWJlcltdIHwgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuUXVhdGVybmlvbiB8IFRIUkVFLkV1bGVyXG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlPFQ+e1xuXHR0aW1lOiBudW1iZXI7XG5cdGR1cmF0aW9uPzogbnVtYmVyO1xuXHR2YWx1ZTogVDtcblx0c3RhcnRWYWx1ZTogVDtcblx0Z29hbFZhbHVlOiBUO1xuXHRvbkFuaW1hdGlvbkZpbmlzaGVkPzogRnVuY3Rpb24gfCBudWxsO1xuXHRsZXJwRnVuYz86IExlcnBGdW5jPFQ+O1xuXHRlYXNpbmc6IEVhc2luZ0Z1bmM7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlUGFyYW1zPFQ+IHtcblx0bmFtZTogc3RyaW5nO1xuXHRpbml0VmFsdWU6IFQ7XG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XG5cdGN1c3RvbUxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRvciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHVibGljIGRhdGFCYXNlOiB7WyBrZXk6IHN0cmluZyBdOiBBbmltYXRvclZhcmlhYmxlVHlwZSB9O1xuXHRwdWJsaWMgaXNBbmltYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuXHRwcm90ZWN0ZWQgdmFyaWFibGVzOiB7IFsga2V5OiBzdHJpbmcgXTogQW5pbWF0b3JWYXJpYWJsZTxBbmltYXRvclZhcmlhYmxlVHlwZT4gfTtcblx0cHJvdGVjdGVkIGFuaW1hdGluZ0NvdW50OiBudW1iZXIgPSAwO1xuXHRwcm90ZWN0ZWQgZGlzcGF0Y2hFdmVudHM6IEZ1bmN0aW9uW10gPSBbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnZhcmlhYmxlcyA9IHt9O1xuXHRcdHRoaXMuZGF0YUJhc2UgPSB7fTtcblxuXHR9XG5cblx0cHVibGljIGFkZDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBwYXJhbXM6IEFuaW1hdG9yVmFyaWFibGVQYXJhbXM8VD4gKSB7XG5cblx0XHRsZXQgdmFyaWFibGU6IEFuaW1hdG9yVmFyaWFibGU8VD4gPSB7XG5cdFx0XHR0aW1lOiAtIDEsXG5cdFx0XHR2YWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRzdGFydFZhbHVlOiB0aGlzLmdldFZhbHVlQ2xvbmUoIHBhcmFtcy5pbml0VmFsdWUgKSxcblx0XHRcdGdvYWxWYWx1ZTogdGhpcy5nZXRWYWx1ZUNsb25lKCBwYXJhbXMuaW5pdFZhbHVlICksXG5cdFx0XHRlYXNpbmc6IHBhcmFtcy5lYXNpbmcgfHwgRWFzaW5ncy5zaWdtb2lkKCksXG5cdFx0XHRsZXJwRnVuYzogKCBwYXJhbXMuY3VzdG9tTGVycEZ1bmMgfHwgTGVycHMuZ2V0TGVycEZ1bmMoIHBhcmFtcy5pbml0VmFsdWUgKSApIGFzIExlcnBGdW5jPFQ+LFxuXHRcdH07XG5cblx0XHR0aGlzLmRhdGFCYXNlWyBwYXJhbXMubmFtZSBdID0gdmFyaWFibGUudmFsdWU7XG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0gPSB2YXJpYWJsZSBhcyB1bmtub3duIGFzIEFuaW1hdG9yVmFyaWFibGU8QW5pbWF0b3JWYXJpYWJsZVR5cGU+O1xuXG5cdFx0cmV0dXJuIHZhcmlhYmxlO1xuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRTZXRcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIHNldEVhc2luZyggbmFtZTogc3RyaW5nLCBlYXNpbmc6IEVhc2luZ0Z1bmMgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXG5cdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0dmFyaWFibGUuZWFzaW5nID0gZWFzaW5nO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHNldFZhbHVlPFQgZXh0ZW5kcyBBbmltYXRvclZhcmlhYmxlVHlwZT4oIG5hbWU6IHN0cmluZywgdmFsdWU6IFQgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLmRhdGFCYXNlWyBuYW1lIF0gYXMgdW5rbm93biBhcyBBbmltYXRvclZhcmlhYmxlVHlwZTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdGlmICggdHlwZW9mIHZhcmlhYmxlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRcdHZhcmlhYmxlID0gdmFsdWU7XG5cblx0XHRcdH0gZWxzZSBpZiAoIFwiY29weVwiIGluIHZhcmlhYmxlICkge1xuXG5cdFx0XHRcdHZhcmlhYmxlLmNvcHkoIHZhbHVlIGFzIGFueSApO1xuXG5cdFx0XHR9IGVsc2UgaWYgKCB2YXJpYWJsZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuXG5cdFx0XHRcdCggdmFyaWFibGUgYXMgbnVtYmVyIFtdICkgPSAoIHZhbHVlIGFzIG51bWJlcltdICkuY29uY2F0KCk7XG5cblx0XHRcdH1cblxuXHRcdFx0dGhpcy51cGRhdGVEYXRhQmFzZSggbmFtZSApO1xuXHRcdFx0dGhpcy5jYW5jZWxBbmltYXRlKCBuYW1lICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QW5pbWF0ZVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgYW5pbWF0ZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcsIGdvYWxWYWx1ZTogVCwgZHVyYXRpb246IG51bWJlciA9IDEsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGVhc2luZz86IEVhc2luZ0Z1bmMgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoIHJlc29sdmUgPT4ge1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gPD0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoIG5hbWUsIGdvYWxWYWx1ZSApO1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSggbnVsbCApO1xuXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS50aW1lID09IC0gMSApIHtcblxuXHRcdFx0XHRcdHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgKys7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhcmlhYmxlLnRpbWUgPSAwO1xuXHRcdFx0XHR2YXJpYWJsZS5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdFx0XHR2YXJpYWJsZS5zdGFydFZhbHVlID0gdGhpcy5nZXRWYWx1ZUNsb25lKCB2YXJpYWJsZS52YWx1ZSApO1xuXHRcdFx0XHR2YXJpYWJsZS5nb2FsVmFsdWUgPSB0aGlzLmdldFZhbHVlQ2xvbmUoIGdvYWxWYWx1ZSApO1xuXG5cdFx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICggZWFzaW5nICkge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRFYXNpbmcoIG5hbWUsIGVhc2luZyApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblxuXHR9XG5cblx0cHVibGljIGNhbmNlbEFuaW1hdGUoIG5hbWU6IHN0cmluZyApIHtcblxuXHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF07XG5cblx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHR2YXJpYWJsZS50aW1lID0gMS4wO1xuXHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9IG51bGw7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRHZXRcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGdldDxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCBuYW1lOiBzdHJpbmcgKTogVCB8IG51bGwge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS52YWx1ZSBhcyB1bmtub3duIGFzIFQ7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGdldFZhcmlhYmxlT2JqZWN0PFQgZXh0ZW5kcyBBbmltYXRvclZhcmlhYmxlVHlwZT4oIG5hbWU6IHN0cmluZywgbXV0ZTogYm9vbGVhbiA9IGZhbHNlICk6IEFuaW1hdG9yVmFyaWFibGU8VD4gfCBudWxsIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gYXMgdW5rbm93biBhcyBBbmltYXRvclZhcmlhYmxlPFQ+O1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCAhIG11dGUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0VXRpbHNcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0cHVibGljIGFwcGx5VG9Vbmlmb3JtcyggdW5pZm9ybXM6IFVuaWZvcm1zICkge1xuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLmdldFZhcmlhYmxlT2JqZWN0KCBrZXlzWyBpIF0gKTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaSBdIF0gPSB2YXJpYWJsZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgaXNBbmltYXRpbmdWYXJpYWJsZSggbmFtZTogc3RyaW5nLCBtdXRlOiBib29sZWFuID0gZmFsc2UgKSB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdGxldCB0aW1lID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXS50aW1lO1xuXG5cdFx0XHRyZXR1cm4gdGltZSAhPSAtIDEuMDtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFV0aWxzXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHByaXZhdGUgZ2V0VmFsdWVDbG9uZTxUIGV4dGVuZHMgQW5pbWF0b3JWYXJpYWJsZVR5cGU+KCB2YWx1ZTogVCApOiBUIHtcblxuXHRcdGlmICggdHlwZW9mIHZhbHVlID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cblx0XHR9IGVsc2UgaWYgKCAnY2xvbmUnIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gdmFsdWUuY2xvbmUoKSBhcyBUO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIHZhbHVlLmNvbmNhdCgpIGFzIFQ7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsdWU7XG5cblx0fVxuXG5cdHB1YmxpYyB3YWl0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgcHJtID0gbmV3IFByb21pc2U8dm9pZD4oICggciApID0+e1xuXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cblx0XHRcdFx0cigpO1xuXG5cdFx0XHR9LCAoIHQgKiAxMDAwICkgKTtcblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBwcm07XG5cblx0fVxuXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdFVwZGF0ZVxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuXHRwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU/OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMuYW5pbWF0aW5nQ291bnQgPT0gMCApIHtcblxuXHRcdFx0dGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuXG5cdFx0fVxuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGVOYW1lID0ga2V5c1sgaSBdO1xuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIHZhcmlhYmxlTmFtZSBdO1xuXHRcdFx0bGV0IHRpbWUgPSB2YXJpYWJsZS50aW1lO1xuXG5cdFx0XHRpZiAoIHRpbWUgPT0gMS4wICkge1xuXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgLS07XG5cdFx0XHRcdHRpbWUgPSAtIDE7XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICkge1xuXG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50cy5wdXNoKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggdGltZSA+PSAwLjAgJiYgdGltZSA8IDEuMCApIHtcblxuXHRcdFx0XHRsZXQgZHVyYXRpb24gPSB2YXJpYWJsZS5kdXJhdGlvbjtcblx0XHRcdFx0bGV0IGVhc2luZyA9IHZhcmlhYmxlLmVhc2luZztcblx0XHRcdFx0bGV0IGxlcnBGdW5jID0gdmFyaWFibGUubGVycEZ1bmM7XG5cblx0XHRcdFx0aWYgKCBkdXJhdGlvbiApIHtcblxuXHRcdFx0XHRcdHRpbWUgKz0gKCBkZWx0YVRpbWUgfHwgMC4wMTYgKSAvIGR1cmF0aW9uO1xuXG5cdFx0XHRcdFx0aWYgKCBkdXJhdGlvbiA9PSAwIHx8IHRpbWUgPj0gMS4wICkge1xuXG5cdFx0XHRcdFx0XHR0aW1lID0gMS4wO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlID0gdmFyaWFibGUuZ29hbFZhbHVlO1xuXG5cdFx0XHRcdGlmICggdGltZSA8IDEuMCApIHtcblxuXHRcdFx0XHRcdGlmICggbGVycEZ1bmMgKSB7XG5cblx0XHRcdFx0XHRcdHZhbHVlID0gbGVycEZ1bmMoIHZhcmlhYmxlLnN0YXJ0VmFsdWUsIHZhcmlhYmxlLmdvYWxWYWx1ZSwgZWFzaW5nKCB0aW1lICkgKTtcblxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IGRhdGFCYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyB2YXJpYWJsZU5hbWUgXTtcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiBkYXRhQmFzZVZhbHVlID09ICdudW1iZXInIHx8ICEgKCAnY29weScgaW4gZGF0YUJhc2VWYWx1ZSApICkge1xuXG5cdFx0XHRcdFx0dGhpcy5kYXRhQmFzZVsgdmFyaWFibGVOYW1lIF0gPSB2YWx1ZTtcblxuXHRcdFx0XHR9IGVsc2UgaWYgKCAnY29weScgaW4gZGF0YUJhc2VWYWx1ZSApIHtcblxuXHRcdFx0XHRcdGRhdGFCYXNlVmFsdWUuY29weSggdmFsdWUgYXMgYW55ICk7XG5cblx0XHRcdFx0fVxuXG5cblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHRcdFx0dHlwZTogJ3VwZGF0ZS8nICsga2V5c1sgaSBdLFxuXHRcdFx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lLFxuXHRcdFx0XHRcdHZhbHVlOiB2YXJpYWJsZS52YWx1ZVxuXHRcdFx0XHR9ICk7XG5cblx0XHRcdH1cblxuXHRcdFx0dmFyaWFibGUudGltZSA9IHRpbWU7XG5cblx0XHR9XG5cblx0XHR3aGlsZSAoIHRoaXMuZGlzcGF0Y2hFdmVudHMubGVuZ3RoICE9IDAgKSB7XG5cblx0XHRcdGxldCBmdW5jID0gdGhpcy5kaXNwYXRjaEV2ZW50cy5wb3AoKTtcblxuXHRcdFx0aWYgKCBmdW5jICkge1xuXG5cdFx0XHRcdGZ1bmMoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0dGhpcy51cGRhdGVEYXRhQmFzZSgpO1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lXG5cdFx0fSApO1xuXG5cdFx0aWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ2FuaW1hdGUnLFxuXHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlRGF0YUJhc2UoIHRhcmdldD86IHN0cmluZyApIHtcblxuXHRcdGlmICggdGFyZ2V0ICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgdGFyZ2V0IF07XG5cdFx0XHRsZXQgZGF0YWJhc2VWYWx1ZSA9IHRoaXMuZGF0YUJhc2VbIHRhcmdldCBdO1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICYmIGRhdGFiYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0aWYgKCB0eXBlb2YgdmFyaWFibGUudmFsdWUgPT0gJ251bWJlcicgfHwgISAoICdjb3B5JyBpbiB2YXJpYWJsZS52YWx1ZSApICkge1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudmFsdWUgPSBkYXRhYmFzZVZhbHVlO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm47XG5cblx0XHR9XG5cblx0XHRsZXQga2V5ID0gT2JqZWN0LmtleXMoIHRoaXMuZGF0YUJhc2UgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleS5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBrZXlbIGkgXSBdO1xuXHRcdFx0bGV0IGRhdGFiYXNlVmFsdWUgPSB0aGlzLmRhdGFCYXNlWyBrZXlbIGkgXSBdO1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICYmIGRhdGFiYXNlVmFsdWUgKSB7XG5cblx0XHRcdFx0Ly8gVmVjdG9y57O744Gv5Y+C54Wn44Gq44Gu44GnbnVtYmVy44GobnVtYmVyW13jgYLjgZ/jgorjgaDjgZHmm7TmlrBcblxuXHRcdFx0XHRpZiAoIHR5cGVvZiB2YXJpYWJsZS52YWx1ZSA9PSAnbnVtYmVyJyB8fCAhICggJ2NvcHknIGluIHZhcmlhYmxlLnZhbHVlICkgKSB7XG5cblx0XHRcdFx0XHR2YXJpYWJsZS52YWx1ZSA9IGRhdGFiYXNlVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgT1JFIGZyb20gJy4uLy4uLyc7XG5pbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9iYWNrZ3JvdW5kLnZzJztcbmltcG9ydCB7IExheWVyU2l6ZSBhcyBMYXllclNpemVJbmZvIH0gZnJvbSAnLi4vLi4vY29yZS9CYXNlTGF5ZXInO1xuXG5leHBvcnQgY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFRIUkVFLk1lc2gge1xuXG5cdHByb3RlY3RlZCB1bmlmb3JtczogT1JFLlVuaWZvcm1zO1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJhbTogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5CdWZmZXJHZW9tZXRyeSgpO1xuXG5cdFx0bGV0IHBvc0FycmF5ID0gW107XG5cdFx0bGV0IGluZGV4QXJyYXkgPSBbXTtcblx0XHRsZXQgdXZBcnJheSA9IFtdO1xuXG5cdFx0cG9zQXJyYXkucHVzaCggLSAxLCAxLCAwICk7XG5cdFx0cG9zQXJyYXkucHVzaCggMSwgMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIDEsIC0gMSwgMCApO1xuXHRcdHBvc0FycmF5LnB1c2goIC0gMSwgLSAxLCAwICk7XG5cblx0XHR1dkFycmF5LnB1c2goIDAsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDEgKTtcblx0XHR1dkFycmF5LnB1c2goIDEsIDAgKTtcblx0XHR1dkFycmF5LnB1c2goIDAsIDAgKTtcblxuXHRcdGluZGV4QXJyYXkucHVzaCggMCwgMiwgMSwgMCwgMywgMiApO1xuXG5cdFx0bGV0IHBvcyA9IG5ldyBGbG9hdDMyQXJyYXkoIHBvc0FycmF5ICk7XG5cdFx0bGV0IGluZGljZXMgPSBuZXcgVWludDMyQXJyYXkoIGluZGV4QXJyYXkgKTtcblx0XHRsZXQgdXYgPSBuZXcgRmxvYXQzMkFycmF5KCB1dkFycmF5ICk7XG5cblx0XHRnZW8uc2V0QXR0cmlidXRlKCAncG9zaXRpb24nLCBuZXcgVEhSRUUuQnVmZmVyQXR0cmlidXRlKCBwb3MsIDMgKSApO1xuXHRcdGdlby5zZXRBdHRyaWJ1dGUoICd1dicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIHV2LCAyICkgKTtcblx0XHRnZW8uc2V0SW5kZXgoIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIGluZGljZXMsIDEgKSApO1xuXG5cdFx0cGFyYW0udmVydGV4U2hhZGVyID0gcGFyYW0udmVydGV4U2hhZGVyIHx8IHZlcnQ7XG5cdFx0cGFyYW0udHJhbnNwYXJlbnQgPSBwYXJhbS50cmFuc3BhcmVudCAhPSB1bmRlZmluZWQgPyBwYXJhbS50cmFuc3BhcmVudCA6IHRydWU7XG5cdFx0cGFyYW0uZGVwdGhGdW5jID0gcGFyYW0uZGVwdGhGdW5jICE9IHVuZGVmaW5lZCA/IHBhcmFtLmRlcHRoRnVuYyA6IFRIUkVFLk5ldmVyRGVwdGg7XG5cblx0XHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLnVuaWZvcm1zID0gcGFyYW0udW5pZm9ybXMgfHwge307XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlc2l6ZSggYXJnczogTGF5ZXJTaXplSW5mbyApIHtcblxuXHRcdHRoaXMudW5pZm9ybXMucmVzb2x1dGlvbiA9IHsgdmFsdWU6IGFyZ3MuY2FudmFzU2l6ZSB9O1xuXHRcdHRoaXMudW5pZm9ybXMuYXNwZWN0UmF0aW8gPSB7IHZhbHVlOiBhcmdzLmNhbnZhc0FzcGVjdFJhdGlvIH07XG5cblx0fVxuXG59XG4iLCJcbi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHRcdEJlemllclxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbmV4cG9ydCBuYW1lc3BhY2UgQmV6aWVyIHtcblxuXHRleHBvcnQgdHlwZSBCZXppZXJDb250cm9sUG9pbnRzID0ge1xuXHRcdHAwOiBudW1iZXI7XG5cdFx0cDE6IG51bWJlcjtcblx0XHRwMjogbnVtYmVyO1xuXHRcdHAzOiBudW1iZXI7XG5cdH1cblxuXHQvLyBpbnNwaXJlZCBodHRwczovL2dpdGh1Yi5jb20vZ3JlL2Jlemllci1lYXNpbmcvYmxvYi9tYXN0ZXIvc3JjL2luZGV4LmpzIGFuZCBodHRwczovL2dpdGh1Yi5jb20vMGI1dnIvYXV0b21hdG9uL2Jsb2IvODcyNDIwZTc5OGQ5MDU0ZDRhN2EwNmM5NzJjYmI0MjYxYTY3YjRiYy9zcmMvYmV6aWVyRWFzaW5nLnRzXG5cblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9JVEVSQVRJT05TID0gNDtcblx0ZXhwb3J0IGNvbnN0IE5FV1RPTl9NSU5fU0xPUEUgPSAwLjAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX1BSRUNJU0lPTiA9IDAuMDAwMDAwMTtcblx0ZXhwb3J0IGNvbnN0IFNVQkRJVklTSU9OX01BWF9JVEVSQVRJT05TID0gMTA7XG5cdGV4cG9ydCBjb25zdCBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgPSAxMTtcblx0ZXhwb3J0IGNvbnN0IEJFWklFUl9FQVNJTkdfU0FNUExFX1NURVBfU0laRSA9IDEuMCAvIEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTtcblxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQSggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIHAucDAgKyAzLjAgKiBwLnAxIC0gMy4wICogcC5wMiArIHAucDM7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQiggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAzLjAgKiBwLnAwIC0gNi4wICogcC5wMSArIDMuMCAqIHAucDI7XG5cblx0fVxuXHRmdW5jdGlvbiBjYWxjQmV6aWVyQyggcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdHJldHVybiAtIDMuMCAqIHAucDAgKyAzLjAgKiBwLnAxO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllclNsb3BlKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gMy4wICogY2FsY0JlemllckEoIHAgKSAqIHQgKiB0ICsgMi4wICogY2FsY0JlemllckIoIHAgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY2FsY0JlemllciggcDogQmV6aWVyQ29udHJvbFBvaW50cywgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuICggKCBjYWxjQmV6aWVyQSggcCApICogdCArIGNhbGNCZXppZXJCKCBwICkgKSAqIHQgKyBjYWxjQmV6aWVyQyggcCApICkgKiB0ICsgcC5wMDtcblxuXHR9XG5cblx0ZnVuY3Rpb24gc3ViZGl2KCB4OiBudW1iZXIsIHN0YXJ0VDogbnVtYmVyLCBlbmRUOiBudW1iZXIsIHA6IEJlemllckNvbnRyb2xQb2ludHMgKSB7XG5cblx0XHRsZXQgY3VycmVudFggPSAwO1xuXHRcdGxldCBjdXJyZW50VCA9IDA7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBTVUJESVZJU0lPTl9NQVhfSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0Y3VycmVudFQgPSBzdGFydFQgKyAoIGVuZFQgLSBzdGFydFQgKSAvIDI7XG5cdFx0XHRjdXJyZW50WCA9IGNhbGNCZXppZXIoIHAsIGN1cnJlbnRUICk7XG5cblx0XHRcdGlmICggY3VycmVudFggPiB4ICkge1xuXG5cdFx0XHRcdGVuZFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRzdGFydFQgPSBjdXJyZW50VDtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGN1cnJlbnRUO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBuZXd0b24oIHg6bnVtYmVyLCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBORVdUT05fSVRFUkFUSU9OUzsgaSArKyApIHtcblxuXHRcdFx0bGV0IHNsb3BlID0gY2FsY0JlemllclNsb3BlKCBwLCB0ICk7XG5cblx0XHRcdGlmICggc2xvcGUgPT0gMC4wICkge1xuXG5cdFx0XHRcdHJldHVybiB0O1xuXG5cdFx0XHR9XG5cblx0XHRcdGxldCBjdXJyZW50WCA9ICggY2FsY0JlemllciggcCwgdCApICkgLSB4O1xuXHRcdFx0dCAtPSBjdXJyZW50WCAvIHNsb3BlO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRCZXppZXJUZnJvbVgoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHg6IG51bWJlciwgY2FjaGU6IG51bWJlcltdICkge1xuXG5cdFx0cC5wMSA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMSApICk7XG5cdFx0cC5wMiA9IE1hdGgubWF4KCBwLnAwLCBNYXRoLm1pbiggcC5wMywgcC5wMiApICk7XG5cblx0XHRsZXQgc2FtcGxlID0gMDtcblxuXHRcdGZvciAoIGxldCBpID0gMTsgaSA8IGNhY2hlLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0c2FtcGxlID0gaSAtIDE7XG5cdFx0XHRpZiAoIHggPCBjYWNoZVsgaSBdICkgYnJlYWs7XG5cblx0XHR9XG5cblx0XHRsZXQgdCA9IHNhbXBsZSAvICggQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFIC0gMS4wICk7XG5cdFx0bGV0IGRpZmYgPSBjYWxjQmV6aWVyU2xvcGUoIHAsIHQgKSAvICggcC5wMyAtIHAucDAgKTtcblxuXHRcdGlmICggZGlmZiA9PSAwLjAgKSB7XG5cblx0XHRcdHJldHVybiB0O1xuXG5cdFx0fSBlbHNlIGlmICggZGlmZiA+IDAuMDEgKSB7XG5cblx0XHRcdHJldHVybiBuZXd0b24oIHgsIHAsIHQgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHJldHVybiBzdWJkaXYoIHgsIHQsIHQgKyBCRVpJRVJfRUFTSU5HX1NBTVBMRV9TVEVQX1NJWkUsIHAgKTtcblxuXHRcdH1cblxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwid29sZnk4Ny1ldmVudGVtaXR0ZXJcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQWN0aW9uIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9BbmltYXRpb25BY3Rpb25cIjtcclxuaW1wb3J0IHsgRkN1cnZlIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9GQ3VydmVcIjtcclxuaW1wb3J0IHsgRkN1cnZlR3JvdXAgfSBmcm9tICcuLi9BbmltYXRpb24vRkN1cnZlR3JvdXAnO1xyXG5pbXBvcnQgeyBGQ3VydmVJbnRlcnBvbGF0aW9uLCBGQ3VydmVLZXlGcmFtZSB9IGZyb20gXCIuLi9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWVcIjtcclxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XHJcblxyXG5leHBvcnQgdHlwZSBCQ01lc3NhZ2UgPSBCQ1N5bmNTY2VuZU1lc3NhZ2UgfCBCQ1N5bmNGcmFtZU1lc3NhZ2VcclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAndycgfCAnc2NhbGFyJ1xyXG5cclxuZXhwb3J0IHR5cGUgQkNTeW5jU2NlbmVNZXNzYWdlID0ge1xyXG5cdHR5cGU6IFwic3luYy9zY2VuZVwiLFxyXG4gICAgZGF0YTogQkNTY2VuZURhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU2NlbmVEYXRhID0ge1xyXG5cdGFjdGlvbnM6IEJDQW5pbWF0aW9uQWN0aW9uUGFyYW1bXTtcclxuICAgIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW107XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQWN0aW9uUGFyYW0gPSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICBmY3VydmVfZ3JvdXBzOiB7W2tleTogc3RyaW5nXTogQkNBbmltYXRpb25DdXJ2ZVBhcmFtW119O1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkN1cnZlUGFyYW0gPSB7XHJcbiAgICBrZXlmcmFtZXM6IEJDQW5pbWF0aW9uQ3VydmVLZXlGcmFtZVBhcmFtW107XHJcblx0YXhpczogQkNBbmltYXRpb25DdXJ2ZUF4aXNcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25DdXJ2ZUtleUZyYW1lUGFyYW0gPSB7XHJcbiAgICBjOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9sOiBUSFJFRS5WZWMyO1xyXG4gICAgaF9yOiBUSFJFRS5WZWMyO1xyXG4gICAgZTogc3RyaW5nO1xyXG4gICAgaTogRkN1cnZlSW50ZXJwb2xhdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNTY2VuZU9iamVjdERhdGEgPSB7XHJcblx0bmFtZTogc3RyaW5nLFxyXG5cdGFjdGlvbnM6IHN0cmluZ1tdXHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDU3luY0ZyYW1lTWVzc2FnZSA9IHtcclxuXHR0eXBlOiBcInN5bmMvdGltZWxpbmVcIjtcclxuXHRkYXRhOiBCQ1RpbWVsaW5lRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNUaW1lbGluZURhdGEgPSB7XHJcblx0c3RhcnQ6IG51bWJlcjtcclxuXHRlbmQ6IG51bWJlcjtcclxuXHRjdXJyZW50OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCbGVuZGVyQ29ubmVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0Ly8gd3NcclxuXHJcblx0cHJpdmF0ZSB1cmw/OiBzdHJpbmc7XHJcblx0cHJpdmF0ZSB3cz86IFdlYlNvY2tldDtcclxuXHRwdWJsaWMgY29ubmVjdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdC8vIGZyYW1lXHJcblxyXG5cdHB1YmxpYyBmcmFtZUN1cnJlbnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlciA9IDA7XHJcblx0cHVibGljIGZyYW1lRW5kOiBudW1iZXIgPSAwO1xyXG5cclxuXHQvLyBhbmltYXRpb25cclxuXHJcblx0cHVibGljIG9iamVjdHM6IEJDU2NlbmVPYmplY3REYXRhW10gPSBbXTtcclxuXHRwdWJsaWMgYWN0aW9uczogQW5pbWF0aW9uQWN0aW9uW10gPSBbXTtcclxuXHJcblx0Y29uc3RydWN0b3IoIHVybD86IHN0cmluZyApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdGlmICggdXJsICkge1xyXG5cclxuXHRcdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0XHRcdHRoaXMuY29ubmVjdCggdGhpcy51cmwgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNvbm5lY3QoIHVybDogc3RyaW5nICkge1xyXG5cclxuXHRcdHRoaXMudXJsID0gdXJsO1xyXG5cdFx0dGhpcy53cyA9IG5ldyBXZWJTb2NrZXQoIHRoaXMudXJsICk7XHJcblx0XHR0aGlzLndzLm9ub3BlbiA9IHRoaXMub25PcGVuLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25tZXNzYWdlID0gdGhpcy5vbk1lc3NhZ2UuYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy53cy5vbmNsb3NlID0gdGhpcy5vbkNsb3NlLmJpbmQoIHRoaXMgKTtcclxuXHRcdHRoaXMud3Mub25lcnJvciA9ICggZSApID0+IHtcclxuXHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoIGUgKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzeW5jSnNvblNjZW5lKCBqc29uUGF0aDogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcblx0XHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCByZXEucmVhZHlTdGF0ZSA9PSA0ICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHJlcS5zdGF0dXMgPT0gMjAwICkge1xyXG5cclxuXHRcdFx0XHRcdHRoaXMub25TeW5jU2NlbmUoIEpTT04ucGFyc2UoIHJlcS5yZXNwb25zZSApICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9O1xyXG5cclxuXHRcdHJlcS5vcGVuKCAnR0VUJywganNvblBhdGggKTtcclxuXHRcdHJlcS5zZW5kKCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25TeW5jU2NlbmUoIGRhdGE6IEJDU2NlbmVEYXRhICkge1xyXG5cclxuXHRcdHRoaXMuYWN0aW9ucy5sZW5ndGggPSAwO1xyXG5cdFx0dGhpcy5vYmplY3RzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0Ly8gYWN0aW9uc1xyXG5cclxuXHRcdGRhdGEuYWN0aW9ucy5mb3JFYWNoKCBhY3Rpb25EYXRhID0+IHtcclxuXHJcblx0XHRcdGxldCBhY3Rpb24gPSBuZXcgQW5pbWF0aW9uQWN0aW9uKCBhY3Rpb25EYXRhLm5hbWUgKTtcclxuXHJcblx0XHRcdGxldCBmY3VydmVHcm91cE5hbWVzID0gT2JqZWN0LmtleXMoYWN0aW9uRGF0YS5mY3VydmVfZ3JvdXBzKVxyXG5cclxuXHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgZmN1cnZlR3JvdXBOYW1lcy5sZW5ndGg7IGkrKyApIHtcclxuXHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwTmFtZSA9IGZjdXJ2ZUdyb3VwTmFtZXNbaV07XHJcblx0XHRcdFx0XHJcblx0XHRcdFx0bGV0IGZjdXJ2ZUdyb3VwID0gbmV3IEZDdXJ2ZUdyb3VwKCBmY3VydmVHcm91cE5hbWUgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRhY3Rpb25EYXRhLmZjdXJ2ZV9ncm91cHNbZmN1cnZlR3JvdXBOYW1lXS5mb3JFYWNoKCBmY3VydmVEYXRhID0+IHtcclxuXHJcblx0XHRcdFx0XHRsZXQgY3VydmUgPSBuZXcgRkN1cnZlKCk7XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnZlLnNldCggZmN1cnZlRGF0YS5rZXlmcmFtZXMubWFwKCBmcmFtZSA9PiB7XHJcblx0XHJcblx0XHRcdFx0XHRcdHJldHVybiBuZXcgRkN1cnZlS2V5RnJhbWUoIGZyYW1lLmMsIGZyYW1lLmhfbCwgZnJhbWUuaF9yLCBmcmFtZS5pICk7XHJcblx0XHJcblx0XHRcdFx0XHR9ICkgKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0ZmN1cnZlR3JvdXAuc2V0RkN1cnZlKCBjdXJ2ZSwgZmN1cnZlRGF0YS5heGlzICk7XHJcblx0XHJcblx0XHRcdFx0fSApO1xyXG5cclxuXHRcdFx0XHRhY3Rpb24uYWRkRmN1cnZlR3JvdXAoIGZjdXJ2ZUdyb3VwLm5hbWUsIGZjdXJ2ZUdyb3VwICk7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Ly8gb2JqZWN0c1xyXG5cclxuXHRcdGRhdGEub2JqZWN0cy5mb3JFYWNoKCBvYmplY3REYXRhID0+IHtcclxuXHJcblx0XHRcdHRoaXMub2JqZWN0cy5wdXNoKCBvYmplY3REYXRhICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHRcdC8vIGRpc3BhdGNoIGV2ZW50XHJcblx0XHRcclxuXHRcdHRoaXMuZW1pdEV2ZW50KCd1cGRhdGUvc2NlbmUnLCBbdGhpc10pXHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSh0aGlzLmZyYW1lQ3VycmVudCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvblN5bmNUaW1lbGluZSggZGF0YTogQkNUaW1lbGluZURhdGEgKSB7XHJcblxyXG5cdFx0dGhpcy5zZXRUaW1lbGluZSggZGF0YS5jdXJyZW50LCBkYXRhLnN0YXJ0LCBkYXRhLmVuZCApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0V1MgRXZlbnRzXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHByaXZhdGUgb25PcGVuKCBldmVudDogRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25NZXNzYWdlKCBlOiBNZXNzYWdlRXZlbnQgKSB7XHJcblxyXG5cdFx0bGV0IG1zZyA9IEpTT04ucGFyc2UoIGUuZGF0YSApIGFzIEJDTWVzc2FnZTtcclxuXHJcblx0XHRpZiAoIG1zZy50eXBlID09ICdzeW5jL3NjZW5lJyApIHtcclxuXHJcblx0XHRcdHRoaXMub25TeW5jU2NlbmUoIG1zZy5kYXRhICk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggbXNnLnR5cGUgPT0gXCJzeW5jL3RpbWVsaW5lXCIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLm9uU3luY1RpbWVsaW5lKCBtc2cuZGF0YSApO1xyXG5cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkNsb3NlKCBlOkNsb3NlRXZlbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5kaXNwb3NlV1MoKTtcclxuXHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdEFQSVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTmFtZUxpc3QoIG9iamVjdE5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLm9iamVjdHNbIGkgXS5uYW1lID09IG9iamVjdE5hbWUgKSB7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLm9iamVjdHNbIGkgXS5hY3Rpb25zO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gW107XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbiggYWN0aW9uTmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuYWN0aW9uc1sgaSBdLm5hbWUgPT0gYWN0aW9uTmFtZSApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuYWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uTGlzdCggb2JqZWN0TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGxldCBhY3Rpb25zOiBBbmltYXRpb25BY3Rpb25bXSA9IFtdO1xyXG5cdFx0bGV0IGFjdGlvbk5hbWVMaXN0ID0gdGhpcy5nZXRBY3Rpb25OYW1lTGlzdCggb2JqZWN0TmFtZSApO1xyXG5cclxuXHRcdGFjdGlvbk5hbWVMaXN0LmZvckVhY2goIGFjdGlvbk5hbWUgPT4ge1xyXG5cclxuXHRcdFx0bGV0IGFjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uKCBhY3Rpb25OYW1lICk7XHJcblxyXG5cdFx0XHRpZiAoIGFjdGlvbiApIHtcclxuXHJcblx0XHRcdFx0YWN0aW9ucy5wdXNoKCBhY3Rpb24gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0cmV0dXJuIGFjdGlvbnM7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEFjdGlvbkNvbnRhaW5zQWNjZXNzb3IoIGFjY2Vzc29yOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYWN0aW9ucy5maW5kKGFjdGlvbiA9PiB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmVLZXlzID0gT2JqZWN0LmtleXMoIGFjdGlvbi5jdXJ2ZXMgKTtcclxuXHJcblx0XHRcdHJldHVybiBjdXJ2ZUtleXMuc29tZShjdXJ2ZU5hbWUgPT4gY3VydmVOYW1lPT1hY2Nlc3NvcilcclxuXHRcdFx0XHJcblx0XHR9KSB8fCBudWxsXHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRUaW1lbGluZSggY3VycmVudDogbnVtYmVyLCBzdGFydD86bnVtYmVyLCBlbmQ/Om51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmZyYW1lQ3VycmVudCA9IGN1cnJlbnQ7XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSBzdGFydCB8fCB0aGlzLmZyYW1lU3RhcnQ7XHJcblx0XHR0aGlzLmZyYW1lRW5kID0gZW5kIHx8IHRoaXMuZnJhbWVFbmQ7XHJcblxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoICd1cGRhdGUvdGltZWxpbmUnLCBbIHRoaXMuZnJhbWVDdXJyZW50LCB0aGlzLmZyYW1lU3RhcnQsIHRoaXMuZnJhbWVFbmQgXSApO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0RGlzcG9zZVxyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2VXUygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlV1MoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLndzICkge1xyXG5cclxuXHRcdFx0dGhpcy53cy5jbG9zZSgpO1xyXG5cdFx0XHR0aGlzLndzLm9ubWVzc2FnZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25jbG9zZSA9IG51bGw7XHJcblx0XHRcdHRoaXMud3Mub25vcGVuID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcbmltcG9ydCB2ZXJ0IGZyb20gJy4vZG9tTWVzaC52cyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBjbGFzcyBET01NZXNoIGV4dGVuZHMgVEhSRUUuTWVzaCB7XG5cblx0cHJvdGVjdGVkIF91bmlmb3JtczogVW5pZm9ybXM7XG5cdHByb3RlY3RlZCBlbGVtZW50OiBIVE1MRWxlbWVudDtcblxuXHRjb25zdHJ1Y3RvciggZWxlbWVudDogSFRNTEVsZW1lbnQsIHBhcmFtZXRlcjogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICkge1xuXG5cdFx0bGV0IGdlbyA9IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICk7XG5cblx0XHRwYXJhbWV0ZXIudmVydGV4U2hhZGVyID0gdmVydDtcblxuXHRcdGxldCB1bmkgPSBVbmlmb3Jtc0xpYi5tZXJnZVVuaWZvcm1zKCBwYXJhbWV0ZXIudW5pZm9ybXMsIHtcblx0XHRcdGRvbVBvczoge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdGRvbVNpemU6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHR3aW5kb3dTaXplOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0YXNwZWN0UmF0aW86IHtcblx0XHRcdFx0dmFsdWU6IDEuMFxuXHRcdFx0fVxuXHRcdH0gKTtcblxuXHRcdHBhcmFtZXRlci51bmlmb3JtcyA9IHVuaTtcblxuXHRcdGxldCBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBhcmFtZXRlciApO1xuXG5cdFx0c3VwZXIoIGdlbywgbWF0ICk7XG5cblx0XHR0aGlzLmZydXN0dW1DdWxsZWQgPSBmYWxzZTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zID0gdW5pO1xuXG5cdFx0dGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdHRoaXMudXBkYXRlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQgdW5pZm9ybXMoKSB7XG5cblx0XHRyZXR1cm4gdGhpcy5fdW5pZm9ybXM7XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRsZXQgcmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuXHRcdHRoaXMuX3VuaWZvcm1zLndpbmRvd1NpemUudmFsdWUuc2V0KCB3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0dGhpcy5fdW5pZm9ybXMuYXNwZWN0UmF0aW8udmFsdWUgPSB3aW5kb3cuaW5uZXJXaWR0aCAvIHdpbmRvdy5pbm5lckhlaWdodDtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21TaXplLnZhbHVlLnNldCggcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQgKTtcblx0XHR0aGlzLl91bmlmb3Jtcy5kb21Qb3MudmFsdWUuc2V0KCByZWN0LmxlZnQsIHJlY3QudG9wICk7XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBCZXppZXIgfSBmcm9tIFwiLi9CZXppZXJcIjtcblxuZXhwb3J0IHR5cGUgRWFzaW5nRnVuYyA9ICggdDogbnVtYmVyICkgPT4gYW55XG5cbmV4cG9ydCBuYW1lc3BhY2UgRWFzaW5ncyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNpZ21vaWQoIHdlaWdodDogbnVtYmVyID0gNiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHJldHVybiAoIHg6IG51bWJlciApID0+IHtcblxuXHRcdFx0dmFyIGUxID0gTWF0aC5leHAoIC0gd2VpZ2h0ICogKCAyICogeCAtIDEgKSApO1xuXHRcdFx0dmFyIGUyID0gTWF0aC5leHAoIC0gd2VpZ2h0ICk7XG5cblx0XHRcdHJldHVybiAoIDEgKyAoIDEgLSBlMSApIC8gKCAxICsgZTEgKSAqICggMSArIGUyICkgLyAoIDEgLSBlMiApICkgLyAyO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIHNtb290aHN0ZXAoIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlciwgdmFsdWU6IG51bWJlciApOiBudW1iZXIge1xuXG5cdFx0bGV0IHggPSBNYXRoLm1heCggMCwgTWF0aC5taW4oIDEsICggdmFsdWUgLSBtaW4gKSAvICggbWF4IC0gbWluICkgKSApO1xuXHRcdHJldHVybiB4ICogeCAqICggMyAtIDIgKiB4ICk7XG5cblx0fVxuXG5cdC8qXG5cdEBhdXRoZXIgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZ3JlLzE2NTAyOTRcblx0Ki9cblxuXHRleHBvcnQgZnVuY3Rpb24gbGluZWFyKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFkKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqICggMiAtIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0IDwgLjUgPyAyICogdCAqIHQgOiAtIDEgKyAoIDQgLSAyICogdCApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbkN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dEN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gKCAtLSB0ICkgKiB0ICogdCArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRDdWJpYyggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDQgKiB0ICogdCAqIHQgOiAoIHQgLSAxICkgKiAoIDIgKiB0IC0gMiApICogKCAyICogdCAtIDIgKSArIDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5RdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVhcnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxIC0gKCAtLSB0ICkgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDggKiB0ICogdCAqIHQgKiB0IDogMSAtIDggKiAoIC0tIHQgKSAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1aW50KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0UXVpbnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAxICsgKCAtLSB0ICkgKiB0ICogdCAqIHQgKiB0O1xuXG5cdH1cblxuICBcdGV4cG9ydCBmdW5jdGlvbiBlYXNlSW5PdXRRdWludCggdDogbnVtYmVyICkge1xuXG4gIFx0XHRyZXR1cm4gdCA8IC41ID8gMTYgKiB0ICogdCAqIHQgKiB0ICogdCA6IDEgKyAxNiAqICggLS0gdCApICogdCAqIHQgKiB0ICogdDtcblxuICBcdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gYmV6aWVyKCBjMTogVEhSRUUuVmVjMiwgaDE6IFRIUkVFLlZlYzIsIGgyOiBUSFJFRS5WZWMyLCBjMjogVEhSRUUuVmVjMiApOiBFYXNpbmdGdW5jIHtcblxuXHRcdHZhciBjYWNoZSA9IG5ldyBBcnJheSggQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSApO1xuXG5cdFx0Zm9yICggdmFyIGkgPSAwOyBpIDwgQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRTsgKysgaSApIHtcblxuXHRcdFx0Y2FjaGVbIGkgXSA9IEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS54LCBwMTogaDEueCwgcDI6IGgyLngsIHAzOiBjMi54IH0sIGkgLyAoIEJlemllci5CRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgLSAxLjAgKSApO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuICggeDogbnVtYmVyICkgPT4ge1xuXG5cdFx0XHRpZiAoIHggPD0gYzEueCApIHJldHVybiBjMS55O1xuXHRcdFx0aWYgKCBjMi54IDw9IHggKSByZXR1cm4gYzIueTtcblxuXHRcdFx0cmV0dXJuIEJlemllci5jYWxjQmV6aWVyKCB7IHAwOiBjMS55LCBwMTogaDEueSwgcDI6IGgyLnksIHAzOiBjMi55IH0sIEJlemllci5nZXRCZXppZXJUZnJvbVgoIHsgcDA6IGMxLngsIHAxOiBoMS54LCBwMjogaDIueCwgcDM6IGMyLnggfSwgeCwgY2FjaGUgKSApO1xuXG5cdFx0fTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGN1YmljQmV6aWVyKCBoMVg6IG51bWJlciwgaDFZOiBudW1iZXIsIGgyWDogbnVtYmVyLCBoMlk6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBiZXppZXIoXG5cdFx0XHR7IHg6IDAuMCwgeTogMC4wIH0sXG5cdFx0XHR7IHg6IGgxWCBhcyBudW1iZXIsIHk6IGgxWSBhcyBudW1iZXIgfSxcblx0XHRcdHsgeDogaDJYIGFzIG51bWJlciwgeTogaDJZIGFzIG51bWJlciB9LFxuXHRcdFx0eyB4OiAxLjAsIHk6IDEuMCB9LFxuXHRcdCk7XG5cblx0fVxuXG59XG4iLCJleHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnQge1xuXHR0eXBlOiBzdHJpbmc7XG5cdFtrZXk6c3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgRXZlbnRMaXN0ZW5lciB7XG5cdHR5cGU6IHN0cmluZyxcblx0bGlzdGVuZXI6ICggZTogRXZlbnQgKSA9PiB2b2lkLFxufVxuXG5leHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcml2YXRlIGV2ZW50czogRXZlbnRMaXN0ZW5lcltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0fVxuXG5cdHB1YmxpYyBhZGRFdmVudExpc3RlbmVyKCB0eXBlOiBzdHJpbmcsIGxpc3RlbmVyOiAoIGU6IEV2ZW50ICkgPT4gdm9pZCApIHtcblxuXHRcdHRoaXMuZXZlbnRzLnB1c2goIHtcblx0XHRcdHR5cGU6IHR5cGUsXG5cdFx0XHRsaXN0ZW5lcjogbGlzdGVuZXJcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwYXRjaEV2ZW50KCBldmVudDogRXZlbnQgKSB7XG5cblx0XHRldmVudC50YXJnZXQgPSB0aGlzO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5ldmVudHMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRpZiAoIGV2ZW50LnR5cGUgPT0gdGhpcy5ldmVudHNbIGkgXS50eXBlICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzWyBpIF0ubGlzdGVuZXIoIGV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHJlbW92ZUV2ZW50TGlzdGVuZXIoIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6IEZ1bmN0aW9uICkge1xuXG5cdFx0Zm9yICggbGV0IGkgPSB0aGlzLmV2ZW50cy5sZW5ndGg7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0aWYgKCB0eXBlID09IHRoaXMuZXZlbnRzWyBpIF0udHlwZSAmJiBsaXN0ZW5lciA9PSB0aGlzLmV2ZW50c1sgaSBdLmxpc3RlbmVyICkge1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzLnNwbGljZSggaSwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmltcG9ydCB2ZXJ0IGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC52cyc7XG5pbXBvcnQgcGFzc1Rocm91Z2hGcmFnIGZyb20gJy4vc2hhZGVycy9wYXNzVGhyb3VnaC5mcyc7XG5pbXBvcnQgeyBVbmlmb3JtcywgVW5pZm9ybXNMaWIgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVQ29tcHV0YXRpb25LZXJuZWx7XG4gICAgbWF0ZXJpYWw6IFRIUkVFLlJhd1NoYWRlck1hdGVyaWFsLFxuICAgIHVuaWZvcm1zOiBhbnksXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR1BVY29tcHV0YXRpb25EYXRhe1xuICAgIGJ1ZmZlcjogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRcbn1cblxuZXhwb3J0IGNsYXNzIEdQVUNvbXB1dGF0aW9uQ29udHJvbGxlciB7XG5cblx0cHJvdGVjdGVkIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyO1xuXHRwdWJsaWMgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHByb3RlY3RlZCB1bmlmb3JtczogYW55O1xuXG5cdHByb3RlY3RlZCBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByb3RlY3RlZCBjYW1lcmE6IFRIUkVFLkNhbWVyYTtcblxuXHRwcm90ZWN0ZWQgbWVzaDogVEhSRUUuTWVzaDtcblx0cHJvdGVjdGVkIG1hdGVyaWFsczogVEhSRUUuU2hhZGVyTWF0ZXJpYWxbXTtcblxuXHRwcm90ZWN0ZWQgdGVtcERhdGFMaW5lYXI6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblx0cHJvdGVjdGVkIHRlbXBEYXRhTmVhcjogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHByaXZhdGUgcmVuZGVyVGFyZ2V0czogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRbXSA9IFtdO1xuXG5cdHB1YmxpYyBnZXQgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuXG4gICAgXHRyZXR1cm4gdGhpcy5yZW5kZXJlci5leHRlbnNpb25zLmdldCggXCJPRVNfdGV4dHVyZV9mbG9hdFwiICk7XG5cblx0fVxuXG5cdGNvbnN0cnVjdG9yKCByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlciwgZGF0YVNpemU6IFRIUkVFLlZlY3RvcjIgKSB7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICBcdHRoaXMuZGF0YVNpemUgPSBkYXRhU2l6ZS5jbG9uZSgpO1xuXG4gICAgXHR0aGlzLnVuaWZvcm1zID0ge1xuICAgIFx0XHRkYXRhU2l6ZToge1xuICAgIFx0XHRcdHZhbHVlOiB0aGlzLmRhdGFTaXplXG4gICAgXHRcdH1cbiAgICBcdH07XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIgPSB0aGlzLmNyZWF0ZURhdGEoIHtcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTGluZWFyRmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFOZWFyID0gdGhpcy5jcmVhdGVEYXRhKCB7XG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyXG4gICAgXHR9ICk7XG5cbiAgICBcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcbiAgICBcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLkNhbWVyYSgpO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscyA9IFtdO1xuICAgIFx0dGhpcy5tZXNoID0gbmV3IFRIUkVFLk1lc2goIG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcbiAgICBcdHRoaXMuc2NlbmUuYWRkKCB0aGlzLm1lc2ggKTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUluaXRpYWxpemVUZXh0dXJlKCkge1xuXG4gICAgXHRsZXQgYSA9IG5ldyBGbG9hdDMyQXJyYXkoIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCAqIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSAqIDQgKTtcbiAgICBcdGxldCB0ZXh0dXJlID0gbmV3IFRIUkVFLkRhdGFUZXh0dXJlKCBhLCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgVEhSRUUuUkdCQUZvcm1hdCwgVEhSRUUuRmxvYXRUeXBlICk7XG4gICAgXHR0ZXh0dXJlLm5lZWRzVXBkYXRlID0gdHJ1ZTtcblxuICAgIFx0cmV0dXJuIHRleHR1cmU7XG5cblx0fVxuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdGlhbGl6ZVRleHR1cmU6IFRIUkVFLkRhdGFUZXh0dXJlICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggdGV4dHVyZVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0aWFsaXplVGV4dHVyZTogVEhSRUUuRGF0YVRleHR1cmUsIHRleHR1cmVQYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YTtcblxuXHRwdWJsaWMgY3JlYXRlRGF0YSggaW5pdFRleF90ZXhQYXJhbT86IGFueSwgdGV4dHVyZVBhcmFtPyA6IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGEge1xuXG4gICAgXHRsZXQgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICBcdGxldCBpc2lPUyA9IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBob25lJyApID49IDAgfHwgdXNlckFnZW50LmluZGV4T2YoICdpUGFkJyApID49IDAgfHwgbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiaVBhZFwiIHx8ICggbmF2aWdhdG9yLnBsYXRmb3JtID09IFwiTWFjSW50ZWxcIiAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiU2FmYXJpXCIgKSAhPSAtIDEgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIkNocm9tZVwiICkgPT0gLSAxICYmICggbmF2aWdhdG9yIGFzIGFueSApLnN0YW5kYWxvbmUgIT09IHVuZGVmaW5lZCApO1xuXG4gICAgXHRsZXQgcGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyA9IHtcbiAgICBcdFx0d3JhcFM6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgXHRcdHdyYXBUOiBUSFJFRS5DbGFtcFRvRWRnZVdyYXBwaW5nLFxuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXIsXG4gICAgXHRcdG1hZ0ZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0Zm9ybWF0OiBUSFJFRS5SR0JBRm9ybWF0LFxuICAgIFx0XHR0eXBlOiBpc2lPUyA/IFRIUkVFLkhhbGZGbG9hdFR5cGUgOiBUSFJFRS5GbG9hdFR5cGUsXG4gICAgXHRcdHN0ZW5jaWxCdWZmZXI6IGZhbHNlLFxuICAgIFx0XHRkZXB0aEJ1ZmZlcjogZmFsc2VcbiAgICBcdH07XG4gICAgXHRsZXQgaW5pdFRleDogVEhSRUUuRGF0YVRleHR1cmUgfCBudWxsID0gbnVsbDtcbiAgICBcdGxldCBjdXN0b21QYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zIHwgbnVsbCA9IG51bGw7XG5cbiAgICBcdGlmICggaW5pdFRleF90ZXhQYXJhbSApIHtcblxuICAgIFx0XHRpZiAoIGluaXRUZXhfdGV4UGFyYW0uaXNEYXRhVGV4dHVyZSApIHtcblxuICAgIFx0XHRcdGluaXRUZXggPSBpbml0VGV4X3RleFBhcmFtO1xuXG4gICAgXHRcdFx0aWYgKCB0ZXh0dXJlUGFyYW0gKSB7XG5cbiAgICBcdFx0XHRcdGN1c3RvbVBhcmFtID0gdGV4dHVyZVBhcmFtO1xuXG4gICAgXHRcdFx0fVxuXG4gICAgXHRcdH0gZWxzZSB7XG5cbiAgICBcdFx0XHRjdXN0b21QYXJhbSA9IGluaXRUZXhfdGV4UGFyYW07XG5cbiAgICBcdFx0fVxuXG4gICAgXHR9XG5cbiAgICBcdGlmICggY3VzdG9tUGFyYW0gKSB7XG5cbiAgICBcdFx0cGFyYW0ud3JhcFMgPSBjdXN0b21QYXJhbS53cmFwUyB8fCBwYXJhbS53cmFwUztcbiAgICBcdFx0cGFyYW0ud3JhcFQgPSBjdXN0b21QYXJhbS53cmFwVCB8fCBwYXJhbS53cmFwVDtcbiAgICBcdFx0cGFyYW0ubWluRmlsdGVyID0gY3VzdG9tUGFyYW0ubWluRmlsdGVyIHx8IHBhcmFtLm1pbkZpbHRlcjtcbiAgICBcdFx0cGFyYW0ubWFnRmlsdGVyID0gY3VzdG9tUGFyYW0ubWFnRmlsdGVyIHx8IHBhcmFtLm1hZ0ZpbHRlcjtcbiAgICBcdFx0cGFyYW0uZm9ybWF0ID0gY3VzdG9tUGFyYW0uZm9ybWF0IHx8IHBhcmFtLmZvcm1hdDtcbiAgICBcdFx0cGFyYW0udHlwZSA9IGN1c3RvbVBhcmFtLnR5cGUgfHwgcGFyYW0udHlwZTtcbiAgICBcdFx0cGFyYW0uc3RlbmNpbEJ1ZmZlciA9IGN1c3RvbVBhcmFtLnN0ZW5jaWxCdWZmZXIgfHwgcGFyYW0uc3RlbmNpbEJ1ZmZlcjtcbiAgICBcdFx0cGFyYW0uZGVwdGhCdWZmZXIgPSBjdXN0b21QYXJhbS5kZXB0aEJ1ZmZlciB8fCBwYXJhbS5kZXB0aEJ1ZmZlcjtcblxuICAgIFx0fVxuXG4gICAgXHRsZXQgYnVmID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0KCB0aGlzLnVuaWZvcm1zLmRhdGFTaXplLnZhbHVlLngsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueSwgcGFyYW0gKTtcblxuXHRcdGxldCBkYXRhID0geyBidWZmZXI6IGJ1ZiB9O1xuXG5cdFx0dGhpcy5yZW5kZXJUYXJnZXRzLnB1c2goIGJ1ZiApO1xuXG4gICAgXHRpZiAoIGluaXRUZXggKSB7XG5cbiAgICBcdFx0bGV0IGluaXRLZXJuZWwgPSB0aGlzLmNyZWF0ZUtlcm5lbCgge1xuXHRcdFx0XHRmcmFnbWVudFNoYWRlcjogcGFzc1Rocm91Z2hGcmFnLFxuXHRcdFx0XHR1bmlmb3Jtczoge1xuXHRcdFx0XHRcdHRleDoge1xuXHRcdFx0XHRcdFx0dmFsdWU6IGluaXRUZXhcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gKTtcblxuICAgIFx0XHR0aGlzLmNvbXB1dGUoIGluaXRLZXJuZWwsIGRhdGEgKTtcblxuICAgIFx0fVxuXG4gICAgXHRyZXR1cm4gZGF0YTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZUtlcm5lbCggcGFyYW06IFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVycyApOiBHUFVDb21wdXRhdGlvbktlcm5lbCB7XG5cbiAgICBcdGxldCB1bmk6IFVuaWZvcm1zID0gVW5pZm9ybXNMaWIubWVyZ2VVbmlmb3JtcyggcGFyYW0udW5pZm9ybXMsIHRoaXMudW5pZm9ybXMgKTtcblxuXHRcdHBhcmFtLnVuaWZvcm1zID0gdW5pO1xuXHRcdHBhcmFtLnZlcnRleFNoYWRlciA9IHBhcmFtLnZlcnRleFNoYWRlciB8fCB2ZXJ0O1xuXG4gICAgXHRsZXQgbWF0ID0gbmV3IFRIUkVFLlNoYWRlck1hdGVyaWFsKCBwYXJhbSApO1xuXG4gICAgXHR0aGlzLm1hdGVyaWFscy5wdXNoKCBtYXQgKTtcblxuICAgIFx0bGV0IGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwgPSB7XG4gICAgXHRcdG1hdGVyaWFsOiBtYXQsXG4gICAgXHRcdHVuaWZvcm1zOiBwYXJhbS51bmlmb3Jtc1xuICAgIFx0fTtcblxuICAgIFx0cmV0dXJuIGtlcm5lbDtcblxuXHR9XG5cblx0cHVibGljIGNvbXB1dGUoIGtlcm5lbDogR1BVQ29tcHV0YXRpb25LZXJuZWwsIGRhdGE6IEdQVWNvbXB1dGF0aW9uRGF0YSwgY2FtZXJhPzogVEhSRUUuQ2FtZXJhICkge1xuXG4gICAgXHRsZXQgdGVtcDogR1BVY29tcHV0YXRpb25EYXRhO1xuXG4gICAgXHRpZiAoIGRhdGEuYnVmZmVyLnRleHR1cmUubWFnRmlsdGVyID09IFRIUkVFLkxpbmVhckZpbHRlciApIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YUxpbmVhcjtcblxuICAgIFx0fSBlbHNlIHtcblxuICAgIFx0XHR0ZW1wID0gdGhpcy50ZW1wRGF0YU5lYXI7XG5cbiAgICBcdH1cblxuICAgIFx0dGhpcy5tZXNoLm1hdGVyaWFsID0ga2VybmVsLm1hdGVyaWFsO1xuXG4gICAgXHRsZXQgY3VycmVudFJlbmRlclRhcmdldCA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCB0ZW1wLmJ1ZmZlciApO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgY2FtZXJhIHx8IHRoaXMuY2FtZXJhICk7XG5cbiAgICBcdHRoaXMuc3dhcEJ1ZmZlcnMoIGRhdGEsIHRlbXAgKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIGN1cnJlbnRSZW5kZXJUYXJnZXQgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHN3YXBCdWZmZXJzKCBiMTogR1BVY29tcHV0YXRpb25EYXRhLCBiMjogR1BVY29tcHV0YXRpb25EYXRhICkge1xuXG4gICAgXHRsZXQgdG1wID0gYjEuYnVmZmVyO1xuICAgIFx0YjEuYnVmZmVyID0gYjIuYnVmZmVyO1xuICAgIFx0YjIuYnVmZmVyID0gdG1wO1xuXG5cdH1cblxuXHRwdWJsaWMgZGlzcG9zZSgpIHtcblxuICAgIFx0bGV0IGdlbyA9IHRoaXMubWVzaC5nZW9tZXRyeTtcbiAgICBcdGdlby5kaXNwb3NlKCk7XG5cbiAgICBcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubWF0ZXJpYWxzLmxlbmd0aDsgaSArKyApIHtcblxuICAgIFx0XHR0aGlzLm1hdGVyaWFsc1sgaSBdLmRpc3Bvc2UoKTtcblxuICAgIFx0fVxuXG4gICAgXHR0aGlzLnNjZW5lLnJlbW92ZSggdGhpcy5tZXNoICk7XG5cbiAgICBcdHRoaXMudGVtcERhdGFMaW5lYXIuYnVmZmVyLmRpc3Bvc2UoKTtcbiAgICBcdHRoaXMudGVtcERhdGFOZWFyLmJ1ZmZlci5kaXNwb3NlKCk7XG5cblx0fVxuXG5cdHB1YmxpYyByZXNpemVEYXRhKCBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdHRoaXMuZGF0YVNpemUuY29weSggZGF0YVNpemUgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMucmVuZGVyVGFyZ2V0cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGxldCB0YXJnZXQgPSB0aGlzLnJlbmRlclRhcmdldHNbIGkgXTtcblxuXHRcdFx0dGFyZ2V0LnNldFNpemUoIGRhdGFTaXplLngsIGRhdGFTaXplLnkgKTtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRyYW5zZm9ybSB7XG5cdHBvc2l0aW9uPzogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb24/OiBUSFJFRS5RdWF0ZXJuaW9uO1xuXHRzY2FsZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEJhc2VUcmFuc2Zvcm0ge1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMztcblx0cm90YXRpb246IFRIUkVFLlF1YXRlcm5pb247XG5cdHNjYWxlOiBUSFJFRS5WZWN0b3IzXG59XG5cbmV4cG9ydCBjbGFzcyBMYXlvdXRDb250cm9sbGVyIHtcblxuXHRwcm90ZWN0ZWQgb2JqOiBUSFJFRS5PYmplY3QzRDtcblx0cHJvdGVjdGVkIGJhc2VUcmFuc2Zvcm06IEJhc2VUcmFuc2Zvcm07XG5cdHByb3RlY3RlZCB0cmFuc2Zvcm06IFRyYW5zZm9ybTtcblxuXHRjb25zdHJ1Y3Rvciggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCwgdHJhbnNmb3JtOiBUcmFuc2Zvcm0sIGlzQWJzb2x1dGVQb3NpdGlvbj86IGJvb2xlYW4gKSB7XG5cblx0XHR0aGlzLm9iaiA9IG9iamVjdDtcblxuXHRcdHRoaXMuYmFzZVRyYW5zZm9ybSA9IHtcblx0XHRcdHBvc2l0aW9uOiB0aGlzLm9iai5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0cm90YXRpb246IHRoaXMub2JqLnF1YXRlcm5pb24uY2xvbmUoKSxcblx0XHRcdHNjYWxlOiB0aGlzLm9iai5zY2FsZS5jbG9uZSgpXG5cdFx0fTtcblxuXHRcdHRoaXMudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuXG5cdFx0aWYgKCAhIGlzQWJzb2x1dGVQb3NpdGlvbiApIHtcblxuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24uYWRkKCB0aGlzLm9iai5wb3NpdGlvbiApO1xuXHRcdFx0dGhpcy50cmFuc2Zvcm0ucm90YXRpb24gJiYgdGhpcy50cmFuc2Zvcm0ucm90YXRpb24ubXVsdGlwbHkoIHRoaXMub2JqLnF1YXRlcm5pb24gKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZVRyYW5zZm9ybSggd2VpZ2h0OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uICkge1xuXG5cdFx0XHR0aGlzLm9iai5wb3NpdGlvbi5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0ucG9zaXRpb24uY2xvbmUoKS5sZXJwKCB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiwgd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0ucm90YXRpb24gKSB7XG5cblx0XHRcdHRoaXMub2JqLnF1YXRlcm5pb24uY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnJvdGF0aW9uLmNsb25lKCkuc2xlcnAoIHRoaXMudHJhbnNmb3JtLnJvdGF0aW9uLCB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5zY2FsZSApIHtcblxuXHRcdFx0dGhpcy5vYmouc2NhbGUuY29weSggdGhpcy5iYXNlVHJhbnNmb3JtLnNjYWxlLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMudHJhbnNmb3JtLnNjYWxlICogKCB3ZWlnaHQgKSArIDEuMCAtIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgeyBBbmltYXRvclZhcmlhYmxlVHlwZSB9IGZyb20gXCIuL0FuaW1hdG9yXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMZXJwRnVuYzxUPntcblx0KCBhOiBULCBiOiBULCB0OiBudW1iZXIgKTogVDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMZXJwcyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlciggYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhICsgKCBiIC0gYSApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlckFycmF5KCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggYS5sZW5ndGggPT0gYi5sZW5ndGggKSB7XG5cblx0XHRcdGxldCBjID0gW107XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGMucHVzaCggYVsgaSBdICsgKCBiWyBpIF0gLSBhWyBpIF0gKSAqIHQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCAnRGlmZmVyZW50IGxlbmd0aCBBcnJheXMhISEnICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFVmVjdG9ycyggYTogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIGI6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLmxlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFUXVhdGVybmlvbiggYTogVEhSRUUuUXVhdGVybmlvbiwgYjogVEhSRUUuUXVhdGVybmlvbiwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5zbGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVFdWxlciggYTogVEhSRUUuRXVsZXIsIGI6IFRIUkVFLkV1bGVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgYWMgPSBhLmNsb25lKCk7XG5cdFx0bGV0IGJjID0gYi5jbG9uZSgpO1xuXG5cdFx0YWMueCA9IGFjLnggKyAoIGJjLnggLSBhYy54ICkgKiB0O1xuXHRcdGFjLnkgPSBhYy55ICsgKCBiYy55IC0gYWMueSApICogdDtcblx0XHRhYy56ID0gYWMueiArICggYmMueiAtIGFjLnogKSAqIHQ7XG5cblx0XHRyZXR1cm4gYWM7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRMZXJwRnVuYyggdmFsdWU6IEFuaW1hdG9yVmFyaWFibGVUeXBlICkge1xuXG5cdFx0aWYgKCB0eXBlb2YgKCB2YWx1ZSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlckFycmF5O1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc1ZlY3RvcjJcIiBpbiB2YWx1ZSB8fCBcImlzVmVjdG9yM1wiIGluIHZhbHVlIHx8IFwiaXNWZWN0b3I0XCIgaW4gdmFsdWUgfHwgXCJpc0NvbG9yXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRVZlY3RvcnM7XG5cblx0XHR9IGVsc2UgaWYgKCBcImlzUXVhdGVybmlvblwiIGluIHZhbHVlICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVRdWF0ZXJuaW9uO1xuXG5cdFx0fSBlbHNlIGlmICggXCJpc0V1bGVyXCIgaW4gdmFsdWUgKSB7XG5cblx0XHRcdHJldHVybiBMZXJwcy5USFJFRUV1bGVyO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgY2xhc3MgTW91c2VSb3RhdG9yIHtcblxuXHRwdWJsaWMgdGFyZ2V0OiBUSFJFRS5PYmplY3QzRDtcblx0cHVibGljIHNjcm9sbFZlbDogVEhSRUUuVmVjdG9yMjtcblxuXHRjb25zdHJ1Y3Rvciggb2JqczogVEhSRUUuT2JqZWN0M0QgKSB7XG5cblx0XHR0aGlzLnRhcmdldCA9IG9ianM7XG5cblx0XHR0aGlzLnNjcm9sbFZlbCA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0fVxuXG5cdHVwZGF0ZSgpIHtcblxuXHRcdHRoaXMuc2Nyb2xsVmVsLm11bHRpcGx5U2NhbGFyKCAwLjk2ICk7XG5cblx0XHRsZXQgYXhpcyA9IG5ldyBUSFJFRS5WZWN0b3IzKCB0aGlzLnNjcm9sbFZlbC55LCB0aGlzLnNjcm9sbFZlbC54LCAwLjAgKS5ub3JtYWxpemUoKTtcblxuXHRcdGxldCBxID0gbmV3IFRIUkVFLlF1YXRlcm5pb24oKS5zZXRGcm9tQXhpc0FuZ2xlKCBheGlzLCB0aGlzLnNjcm9sbFZlbC5sZW5ndGgoKSApO1xuXHRcdHEubXVsdGlwbHkoIHRoaXMudGFyZ2V0LnF1YXRlcm5pb24gKTtcblxuXHRcdHRoaXMudGFyZ2V0LnF1YXRlcm5pb24uY29weSggcSApO1xuXG5cdH1cblxuXHRhZGRWZWxvY2l0eSggc2Nyb2xsRGVsdGE6IFRIUkVFLlZlY3RvcjIgKSB7XG5cblx0XHR0aGlzLnNjcm9sbFZlbC5hZGRWZWN0b3JzKCB0aGlzLnNjcm9sbFZlbCwgc2Nyb2xsRGVsdGEubXVsdGlwbHlTY2FsYXIoIDAuMDAxICkgKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgUGFnZVNjcm9sbGVyIH0gZnJvbSAnLic7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnRBcmdzIHtcclxuXHRzY3JvbGxlcjogUGFnZVNjcm9sbGVyO1xyXG5cdHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0c2Nyb2xsTW9kZTogc3RyaW5nO1xyXG5cdHNjcm9sbERlbHRhOiBudW1iZXI7XHJcblx0c2Nyb2xsUG93ZXI6IG51bWJlcjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyRXZlbnQge1xyXG5cdGNvbW1vbj86ICggYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzICkgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0dXA/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG5cdGRvd24/OiAoIGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyApID0+IHZvaWQgfCBib29sZWFuO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJFdmVudHMge1xyXG5cdG9uU3RhcnRTY3JvbGw/OiBQYWdlU2Nyb2xsZXJFdmVudFxyXG5cdG9uQXJyaXZhbHM/OiB7XHJcblx0XHRwZXJjZW50YWdlOiBudW1iZXI7XHJcblx0XHRldmVudDogUGFnZVNjcm9sbGVyRXZlbnQ7XHJcblx0fVtdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zIHtcclxuXHRuYW1lOiBzdHJpbmc7XHJcblx0ZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0ZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHN0b3A/OiBib29sZWFuO1xyXG5cdHN0YXJ0U2Nyb2xsVXA/OiBudW1iZXI7XHJcblx0c3RhcnRTY3JvbGxEb3duPzogbnVtYmVyO1xyXG5cdGJvdHRvbT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0IHtcclxuXHR4OiBudW1iZXI7XHJcblx0eTogbnVtYmVyO1xyXG5cdHdpZHRoOiBudW1iZXI7XHJcblx0aGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQYWdlU2Nyb2xsZXJTZWN0aW9uIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgZWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0cHVibGljIHJlY3Q6IFBhZ2VTY3JvbGxlclNlY3Rpb25SZWN0O1xyXG5cdHB1YmxpYyBzdGFydFNjcm9sbFVwOiBudW1iZXI7XHJcblx0cHVibGljIHN0YXJ0U2Nyb2xsRG93bjogbnVtYmVyO1xyXG5cdHB1YmxpYyBzdG9wPzogYm9vbGVhbjtcclxuXHRwdWJsaWMgZXZlbnRzPzogUGFnZVNjcm9sbGVyRXZlbnRzO1xyXG5cdHB1YmxpYyBib3R0b20/OiBib29sZWFuO1xyXG5cdHB1YmxpYyB0aW1lbGluZVBlcmNlbnRhZ2U6IG51bWJlciA9IDA7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBwYXJhbXM6IFBhZ2VTY3JvbGxlclNlY3Rpb25QYXJhbXMgKSB7XHJcblxyXG5cdFx0dGhpcy5uYW1lID0gcGFyYW1zLm5hbWU7XHJcblx0XHR0aGlzLmVsZW1lbnQgPSBwYXJhbXMuZWxlbWVudDtcclxuXHRcdHRoaXMucmVjdCA9IHRoaXMuZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHRoaXMuc3RvcCA9IHBhcmFtcy5zdG9wO1xyXG5cdFx0dGhpcy5ldmVudHMgPSBwYXJhbXMuZXZlbnRzO1xyXG5cdFx0dGhpcy5ib3R0b20gPSBwYXJhbXMuYm90dG9tO1xyXG5cdFx0dGhpcy5zdGFydFNjcm9sbERvd24gPSBwYXJhbXMuc3RhcnRTY3JvbGxEb3duIHx8IDA7XHJcblx0XHR0aGlzLnN0YXJ0U2Nyb2xsVXAgPSBwYXJhbXMuc3RhcnRTY3JvbGxVcCB8fCAwO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUmVjdCggMCApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgaXNQYWdlU2Nyb2xsZXJTZWN0aW9uKCkge1xyXG5cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGVSZWN0KCBzY3JvbGxQb3M6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnJlY3QgPSB7XHJcblx0XHRcdHg6IHRoaXMuZWxlbWVudC5vZmZzZXRMZWZ0LFxyXG5cdFx0XHR5OiB0aGlzLmVsZW1lbnQub2Zmc2V0VG9wIC0gc2Nyb2xsUG9zLFxyXG5cdFx0XHR3aWR0aDogdGhpcy5lbGVtZW50Lm9mZnNldFdpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHRcclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFNjcm9sbFBlcmNlbnRhZ2UoIG9mZnNldFBvcz86IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gKCB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICk7XHJcblx0XHRsZXQgcG9zID0gKCB0aGlzLnJlY3QueSArIGJvdHRvbU9mZnNldCApIC0gKCBvZmZzZXRQb3MgfHwgMCApO1xyXG5cclxuXHRcdGxldCBmaXJzdEhhbGZIZWlnaHQgPSB0aGlzLmJvdHRvbSA/IHRoaXMucmVjdC5oZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblx0XHRsZXQgZmlyc3RIYWxmID0gTWF0aC5taW4oIDEuMCwgMS4wIC0gKCBwb3MgLyBmaXJzdEhhbGZIZWlnaHQgKSApO1xyXG5cclxuXHRcdGxldCBzZWNvbmRIYWxmSGVpZ2h0ID0gdGhpcy5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiB0aGlzLnJlY3QuaGVpZ2h0O1xyXG5cdFx0bGV0IHNlY29uZEhhbGYgPSBNYXRoLm1heCggMC4wLCAtIHBvcyAvIHNlY29uZEhhbGZIZWlnaHQgKTtcclxuXHJcblx0XHRsZXQgcGVyY2VudGFnZSA9IGZpcnN0SGFsZiArIHNlY29uZEhhbGY7XHJcblxyXG5cdFx0cmV0dXJuIHBlcmNlbnRhZ2U7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBQYWdlU2Nyb2xsZXJTZWN0aW9uUGFyYW1zLCBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgfSBmcm9tICcuL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jLCBFYXNpbmdzIH0gZnJvbSAnLi4vRWFzaW5ncyc7XHJcbmltcG9ydCB7IEFuaW1hdG9yIH0gZnJvbSAnLi4vQW5pbWF0b3InO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckF1dG9Nb3ZlUGFyYW0ge1xyXG5cdHRhcmdldDogc3RyaW5nIHwgbnVtYmVyIHwgUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRkdXJhdGlvbj86IG51bWJlcjtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG5cdGNhbGxCYWNrPzogRnVuY3Rpb247XHJcblx0Ym90dG9tPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTY3JvbGxlciB7XHJcblxyXG5cdHByb3RlY3RlZCBhbmltYXRvcjogQW5pbWF0b3I7XHJcblx0cHJvdGVjdGVkIGlzQXV0b01vdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJvdGVjdGVkIHBhcmVudEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cdHByb3RlY3RlZCBwYXJlbnRFbGVtZW50SGVpZ2h0OiBudW1iZXI7XHJcblxyXG5cdHByb3RlY3RlZCBzZWN0aW9uczogUGFnZVNjcm9sbGVyU2VjdGlvbltdO1xyXG5cclxuXHRwdWJsaWMgZGVsYXlTcGVlZDogbnVtYmVyID0gMC4xO1xyXG5cdHB1YmxpYyBkcmFnRGVsYXlTcGVlZDogbnVtYmVyID0gMC40O1xyXG5cdHByb3RlY3RlZCBpc1RvdWNoaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGRlbHRhTWVtOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgc2Nyb2xsUmVhZHk6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgc3VtRGVsdGE6IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUG9zTWVtOiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUGVyY2VudGFnZTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQb3NEZWxheTogbnVtYmVyID0gMDtcclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBlcmNlbnRhZ2VEZWxheTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIGNhdWdodFNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24gfCBudWxsO1xyXG5cdHByb3RlY3RlZCBkcmFnU3RvcDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBkcmFnVW5sb2NrUmVhZHk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQgKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudDtcclxuXHRcdHRoaXMucGFyZW50RWxlbWVudEhlaWdodCA9IHBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMgPSBbXTtcclxuXHRcdHRoaXMuY2F1Z2h0U2VjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFx0aW5pdCBBbmltYXRvclxyXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yID0gbmV3IEFuaW1hdG9yKCk7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRvci5hZGQoIHtcclxuXHRcdFx0bmFtZTogJ3Njcm9sbFBvcycsXHJcblx0XHRcdGluaXRWYWx1ZTogMCxcclxuXHRcdFx0ZWFzaW5nOiBFYXNpbmdzLnNpZ21vaWQoKVxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUG9zKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQb3M7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQb3NEZWxheSgpIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fc2Nyb2xsUG9zRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQZXJjZW50YWdlKCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgc2Nyb2xsUGVyY2VudGFnZURlbGF5KCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxUaW1lbGluZVBlcmNlbnRhZ2UoKSB7XHJcblxyXG5cdFx0bGV0IHN1bSA9IDA7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc2VjID0gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cdFx0XHRsZXQgc2VjQmVmID0gdGhpcy5zZWN0aW9uc1sgaSAtIDEgXTtcclxuXHJcblx0XHRcdGxldCBhID0gTWF0aC5tYXgoIDAuMCwgc2VjLmVsZW1lbnQub2Zmc2V0VG9wIC0gdGhpcy5zY3JvbGxQb3NEZWxheSArICggc2VjLmJvdHRvbSA/IHNlYy5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKSApO1xyXG5cdFx0XHRsZXQgYiA9ICggKCBzZWNCZWYgPyBzZWNCZWYucmVjdC5oZWlnaHQgLSAoIHNlY0JlZi5ib3R0b20gPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgOiAwICkgKyAoIHNlYy5ib3R0b20gPyBzZWMucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICkgKSB8fCAxO1xyXG5cclxuXHRcdFx0bGV0IGQgPSAxLjAgLSAoIGEgLyBiICk7XHJcblx0XHRcdGQgPSBNYXRoLm1heCggMC4wLCBkICk7XHJcblxyXG5cdFx0XHRzdW0gKz0gZDtcclxuXHJcblx0XHRcdGlmICggZCA8IDEuMCApIGJyZWFrO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc3VtIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGFkZCggc2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiApIHtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zLnB1c2goIHNlY3Rpb24gKTtcclxuXHJcblx0XHR0aGlzLnNvcnRTZWN0aW9ucygpO1xyXG5cclxuXHRcdHJldHVybiBzZWN0aW9uO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzb3J0U2VjdGlvbnMoKSB7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucy5zb3J0KCAoIGE6IFBhZ2VTY3JvbGxlclNlY3Rpb24sIGI6IFBhZ2VTY3JvbGxlclNlY3Rpb24gKTogbnVtYmVyID0+IHtcclxuXHJcblx0XHRcdHJldHVybiBhLnJlY3QueSA+IGIucmVjdC55ID8gMSA6IC0gMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNlY3Rpb25zWyBpIF0udGltZWxpbmVQZXJjZW50YWdlID0gKCBpICsgMSApIC8gdGhpcy5zZWN0aW9ucy5sZW5ndGg7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQoIG5hbWU6IHN0cmluZyApIHtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5zZWN0aW9uc1sgaSBdLm5hbWUgPT0gbmFtZSApIHJldHVybiB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUud2FybiggJ3NlY3Rpb24gXCInICsgbmFtZSArICdcIiBpcyBub3QgZXhpc3QuJyApO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudXBkYXRlUGFyZW50RWxlbWVudCgpO1xyXG5cclxuXHRcdHRoaXMudXBkYXRlU2Nyb2xsUG9zKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHR0aGlzLmFwcGx5UGFyZW50RWxlbWVudFRyYW5zZm9ybSgpO1xyXG5cclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAwLjA7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHVwZGF0ZVNjcm9sbFBvcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVBdXRvTW92ZSggZGVsdGFUaW1lICk7XHJcblxyXG5cdFx0dGhpcy5hZGRTY3JvbGxQb3MoKTtcclxuXHJcblx0XHR0aGlzLmNhbGNTY3JvbGxQcm9wZXJ0aWVzKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlQXV0b01vdmUoIGRlbHRhVGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IudXBkYXRlKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdGxldCBwb3MgPSB0aGlzLmFuaW1hdG9yLmdldDxudW1iZXI+KCAnc2Nyb2xsUG9zJyApO1xyXG5cclxuXHRcdFx0aWYgKCBwb3MgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuc3VtRGVsdGEgPSBwb3MgLSB0aGlzLnNjcm9sbFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFkZFNjcm9sbFBvcygpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuY2hlY2tVbmxvY2tTdG9wU2Nyb2xsKCB0aGlzLnN1bURlbHRhICkgKSB7XHJcblxyXG5cdFx0XHRsZXQgc3RvcFBvcyA9IHRoaXMuY2hlY2tUaHJvdyggdGhpcy5zdW1EZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBzdG9wUG9zO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5fc2Nyb2xsUG9zICs9IHRoaXMuc3VtRGVsdGE7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLl9zY3JvbGxQb3MgPSBNYXRoLm1heCggTWF0aC5taW4oIHRoaXMuX3Njcm9sbFBvcywgdGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ICksIDAgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVW5sb2NrU3RvcFNjcm9sbCggc2Nyb2xsRGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRsZXQgdW5sb2NrRGlyOiBudW1iZXIgPSAwO1xyXG5cdFx0bGV0IHVubG9jazogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRcdGlmICggdGhpcy5jYXVnaHRTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IGRpc3RhbmNlID0gdGhpcy5zY3JvbGxQb3MgLSB0aGlzLnNjcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdFx0aWYgKCBzY3JvbGxEZWx0YSAqIGRpc3RhbmNlIDwgMCB8fCBNYXRoLmFicyggZGlzdGFuY2UgKSA8IDEwLjAgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHNjcm9sbERlbHRhIDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoIC0gc2Nyb2xsRGVsdGEgPiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5zdGFydFNjcm9sbFVwIHx8IDAgKSB8fCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAtIDE7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9IGVsc2UgaWYgKCBzY3JvbGxEZWx0YSA+IDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBzY3JvbGxEZWx0YSA+ICggdGhpcy5jYXVnaHRTZWN0aW9uLnN0YXJ0U2Nyb2xsRG93biB8fCAwICkgfHwgdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gMTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdW5sb2NrRGlyICE9IDAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cyApIHtcclxuXHJcblx0XHRcdFx0aWYgKCB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFyZ3M6IFBhZ2VTY3JvbGxlckV2ZW50QXJncyA9IHtcclxuXHRcdFx0XHRcdFx0c2Nyb2xsZXI6IHRoaXMsXHJcblx0XHRcdFx0XHRcdHNlY3Rpb246IHRoaXMuY2F1Z2h0U2VjdGlvbixcclxuXHRcdFx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0XHRcdHNjcm9sbERlbHRhOiBzY3JvbGxEZWx0YSxcclxuXHRcdFx0XHRcdFx0c2Nyb2xsUG93ZXI6IE1hdGguYWJzKCBzY3JvbGxEZWx0YSApLFxyXG5cdFx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0XHRsZXQgdW5sb2NrOiBib29sZWFuIHwgdm9pZDtcclxuXHJcblx0XHRcdFx0XHRsZXQgY29tbW9uVW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmNvbW1vbiAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuY29tbW9uKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAtIDEgKSB1bmxvY2sgPSB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwudXAgJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLnVwKCBhcmdzICk7XHJcblx0XHRcdFx0XHRpZiAoIHVubG9ja0RpciA9PSAxICkgdW5sb2NrID0gdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24gJiYgdGhpcy5jYXVnaHRTZWN0aW9uLmV2ZW50cy5vblN0YXJ0U2Nyb2xsLmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGNvbW1vblVubG9jayA9PT0gZmFsc2UgfHwgdW5sb2NrID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IDA7XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR1bmxvY2sgPSB1bmxvY2tEaXIgIT0gMDtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0dW5sb2NrID0gdHJ1ZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB1bmxvY2tEaXIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBudWxsO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5sb2NrO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93KCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IHNlYyA9IHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHJcblx0XHRcdHNlYy51cGRhdGVSZWN0KCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHJcblx0XHRcdGxldCBzdG9wUG9zID0gdGhpcy5jaGVja1Rocm93U2VjdGlvbkV2ZW50cyggc2VjLCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdFx0aWYgKCBzdG9wUG9zICE9PSBudWxsICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmNhdWdodFNlY3Rpb24gPSBzZWM7XHJcblxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmlzQXV0b01vdmUgPyBudWxsIDogc3RvcFBvcztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3dTZWN0aW9uRXZlbnRzKCBzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uLCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBwZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCk7XHJcblx0XHRsZXQgbW92ZWRQZXJjZW50YWdlID0gc2VjdGlvbi5nZXRTY3JvbGxQZXJjZW50YWdlKCBzY3JvbGxEZWx0YSApO1xyXG5cclxuXHRcdGlmICggc2VjdGlvbi5ldmVudHMgKSB7XHJcblxyXG5cdFx0XHRsZXQgYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzID0ge1xyXG5cdFx0XHRcdHNjcm9sbGVyOiB0aGlzLFxyXG5cdFx0XHRcdHNlY3Rpb246IHNlY3Rpb24sXHJcblx0XHRcdFx0c2Nyb2xsTW9kZTogdGhpcy5pc0F1dG9Nb3ZlID8gJ2F1dG8nIDogJ21hbnVhbCcsXHJcblx0XHRcdFx0c2Nyb2xsRGVsdGE6IHNjcm9sbERlbHRhLFxyXG5cdFx0XHRcdHNjcm9sbFBvd2VyOiBNYXRoLmFicyggc2Nyb2xsRGVsdGEgKSxcclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGlmICggc2VjdGlvbi5ldmVudHMub25BcnJpdmFscyApIHtcclxuXHJcblx0XHRcdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgc2VjdGlvbi5ldmVudHMub25BcnJpdmFscy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRcdFx0bGV0IGFycml2YWxFdmVudCA9IHNlY3Rpb24uZXZlbnRzLm9uQXJyaXZhbHNbIGkgXTtcclxuXHJcblx0XHRcdFx0XHRsZXQgaXNUaHJvdyA9IHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgYXJyaXZhbEV2ZW50LnBlcmNlbnRhZ2UgKTtcclxuXHJcblx0XHRcdFx0XHRpZiAoIGlzVGhyb3cgIT0gMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdGFycml2YWxFdmVudC5ldmVudC5jb21tb24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmNvbW1vbiggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKCBpc1Rocm93IDwgMCApIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LnVwICYmIGFycml2YWxFdmVudC5ldmVudC51cCggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LmRvd24gJiYgYXJyaXZhbEV2ZW50LmV2ZW50LmRvd24oIGFyZ3MgKTtcclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCBzZWN0aW9uLnN0b3AgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMuY2hlY2tUaHJvd0xpbmUoIHBlcmNlbnRhZ2UsIG1vdmVkUGVyY2VudGFnZSwgMSApICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLmRyYWdVbmxvY2tSZWFkeSA9IGZhbHNlO1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gc2VjdGlvbi5lbGVtZW50Lm9mZnNldFRvcCArICggc2VjdGlvbi5ib3R0b20gPyBzZWN0aW9uLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvd0xpbmUoIGE6IG51bWJlciwgYiA6bnVtYmVyLCBsaW5lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCBhIDwgbGluZSAmJiBsaW5lIDw9IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBhID4gbGluZSAmJiBsaW5lID49IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gLSAxO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGEgPT0gbGluZSAmJiBsaW5lID09IGIgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMjtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIDA7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjU2Nyb2xsUHJvcGVydGllcyggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUG9zRGVsYXkgKz0gKCB0aGlzLl9zY3JvbGxQb3MgLSB0aGlzLl9zY3JvbGxQb3NEZWxheSApICogKCB0aGlzLmlzVG91Y2hpbmcgJiYgISB0aGlzLmNhdWdodFNlY3Rpb24gPyB0aGlzLmRyYWdEZWxheVNwZWVkIDogdGhpcy5kZWxheVNwZWVkICkgKiBNYXRoLm1pbiggMS4wLCBkZWx0YVRpbWUgKiA2MCApO1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2UgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3MgKTtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQZXJjZW50YWdlRGVsYXkgPSB0aGlzLnNjcm9sbFBvc1RvUGVyZWNudGFnZSggdGhpcy5zY3JvbGxQb3NEZWxheSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBzY3JvbGxQb3NUb1BlcmVjbnRhZ2UoIHNjcm9sbFBvczogbnVtYmVyICkge1xyXG5cclxuXHRcdHJldHVybiBzY3JvbGxQb3MgLyAoIHRoaXMucGFyZW50RWxlbWVudEhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCApO1xyXG5cclxuXHR9XHJcblxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlUGFyZW50RWxlbWVudCgpIHtcclxuXHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgPSB0aGlzLnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhcHBseVBhcmVudEVsZW1lbnRUcmFuc2Zvcm0oKSB7XHJcblxyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCggMCwnICsgLSB0aGlzLnNjcm9sbFBvc0RlbGF5LnRvU3RyaW5nKCkgKyAncHgsIDAgKSc7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNjcm9sbCggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLmRlbHRhTWVtID0gKCB0aGlzLmRlbHRhTWVtICsgZGVsdGEgKSAvIDI7XHJcblx0XHR0aGlzLnN1bURlbHRhICs9IGRlbHRhO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBjYXRjaCgpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMuaXNBdXRvTW92ZSApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5kZWx0YU1lbSA9IDA7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuX3Njcm9sbFBvcyA9IHRoaXMuX3Njcm9sbFBvc0RlbGF5O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZHJhZyggZGVsdGE6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5pc1RvdWNoaW5nICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc2Nyb2xsKCBkZWx0YSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZWxlYXNlKCBzbmFwOiBudW1iZXIgPSAxMC4wICkge1xyXG5cclxuXHRcdGlmICggISB0aGlzLmlzVG91Y2hpbmcgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuY2F1Z2h0U2VjdGlvbiApIHtcclxuXHJcblx0XHRcdHRoaXMuc2Nyb2xsKCB0aGlzLmRlbHRhTWVtICogc25hcCApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXV0b01vdmUoIHBhcmFtOiBQYWdlU2Nyb2xsZXJBdXRvTW92ZVBhcmFtICkge1xyXG5cclxuXHRcdGxldCB0YXJnZXRQb3M6IG51bWJlciA9IDA7XHJcblxyXG5cdFx0aWYgKCAoIHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uICkuaXNQYWdlU2Nyb2xsZXJTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHBhcmFtLnRhcmdldCBhcyBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdHRhcmdldFBvcyA9IHRhcmdldC5lbGVtZW50Lm9mZnNldFRvcCArIGJvdHRvbU9mZnNldDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0eXBlb2YgcGFyYW0udGFyZ2V0ID09ICdzdHJpbmcnICkge1xyXG5cclxuXHRcdFx0bGV0IHRhcmdldCA9IHRoaXMuZ2V0KCBwYXJhbS50YXJnZXQgKTtcclxuXHJcblx0XHRcdGlmICggdGFyZ2V0ICkge1xyXG5cclxuXHRcdFx0XHRsZXQgYm90dG9tT2Zmc2V0ID0gcGFyYW0uYm90dG9tID8gdGFyZ2V0LnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMDtcclxuXHJcblx0XHRcdFx0dGFyZ2V0UG9zID0gdGFyZ2V0LmVsZW1lbnQub2Zmc2V0VG9wICsgYm90dG9tT2Zmc2V0O1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBwYXJhbS50YXJnZXQgPT0gJ251bWJlcicgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXRQb3MgPSBwYXJhbS50YXJnZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3Iuc2V0VmFsdWUoICdzY3JvbGxQb3MnLCB0aGlzLl9zY3JvbGxQb3MgKTtcclxuXHRcdHRoaXMuYW5pbWF0b3IuYW5pbWF0ZSggJ3Njcm9sbFBvcycsIHRhcmdldFBvcywgcGFyYW0uZHVyYXRpb24sICgpID0+IHtcclxuXHJcblx0XHRcdGlmICggcGFyYW0uY2FsbEJhY2sgKSBwYXJhbS5jYWxsQmFjaygpO1xyXG5cclxuXHRcdFx0dGhpcy5pc0F1dG9Nb3ZlID0gZmFsc2U7XHJcblxyXG5cdFx0fSwgcGFyYW0uZWFzaW5nICk7XHJcblxyXG5cdFx0Ly9vblN0YXJ0U2Nyb2xs5YaF44GnQXV0b01vdmXjgZfjgZ/jgajjgY3jgIHnhKHpmZDjg6vjg7zjg5fjgavpmaXjgovjga7jgpLpmLvmraJcclxuXHRcdHRoaXMuc3VtRGVsdGEgPSAoIHRhcmdldFBvcyAtIHRoaXMuc3VtRGVsdGEgKSAvIE1hdGguYWJzKCB0YXJnZXRQb3MgLSB0aGlzLnN1bURlbHRhICkgKiAwLjAwMDAxO1xyXG5cclxuXHRcdHRoaXMuaXNBdXRvTW92ZSA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBjbGFzcyBQb2ludGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwcm90ZWN0ZWQgaXNTUDogYm9vbGVhbjtcblx0cHJvdGVjdGVkIGlzVG91Y2hpbmc6IGJvb2xlYW47XG5cblx0cHVibGljIHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRwdWJsaWMgZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXHRcdHRoaXMuZGVsdGEgPSBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdFx0dGhpcy5pc1NQID0gdXNlckFnZW50LmluZGV4T2YoICdpUGhvbmUnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQYWQnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ0FuZHJvaWQnICkgPj0gMCB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJpUGFkXCIgfHwgKCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJTYWZhcmlcIiApICE9IC0gMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiQ2hyb21lXCIgKSA9PSAtIDEgJiYgKCBuYXZpZ2F0b3IgYXMgYW55ICkuc3RhbmRhbG9uZSAhPT0gdW5kZWZpbmVkICk7XG5cblx0XHR0aGlzLnBvc2l0aW9uLnNldCggTmFOLCBOYU4gKTtcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcblxuXHR9XG5cblx0cHVibGljIHJlZ2lzdGVyRWxlbWVudCggZWxtOiBIVE1MRWxlbWVudCApIHtcblxuXHRcdGNvbnN0IG9uVG91Y2hTdGFydCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcInN0YXJ0XCIgKTtcblx0XHRjb25zdCBvblRvdWNoTW92ZSA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uVG91Y0VuZCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcImVuZFwiICk7XG5cdFx0Y29uc3Qgb25Qb2ludGVyRG93biA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwic3RhcnRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlck1vdmUgPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlclVwID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uV2hlZWwgPSB0aGlzLndoZWVsLmJpbmQoIHRoaXMgKTtcblxuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVyZG93bicsIG9uUG9pbnRlckRvd24gKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgb25Qb2ludGVyVXAgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggXCJkcmFnZW5kXCIsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cblx0XHRjb25zdCBvblVuUmVnaXN0ZXIgPSAoIGU6IGFueSApID0+IHtcblxuXHRcdFx0aWYgKCBlbG0uaXNFcXVhbE5vZGUoIGUuZWxtICkgKSB7XG5cblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaHN0YXJ0Jywgb25Ub3VjaFN0YXJ0ICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgb25Ub3VjaE1vdmUgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y0VuZCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJkb3duJywgb25Qb2ludGVyRG93biApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJtb3ZlJywgb25Qb2ludGVyTW92ZSApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcImRyYWdlbmRcIiwgb25Qb2ludGVyVXAgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwid2hlZWxcIiwgb25XaGVlbCApO1xuXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHRcdFx0fVxuXG5cdFx0fTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ3VucmVnaXN0ZXInLCBvblVuUmVnaXN0ZXIgKTtcblxuXHR9XG5cblx0cHVibGljIHVucmVnaXN0ZXJFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAndW5yZWdpc3RlcicsXG5cdFx0XHRlbG06IGVsbSxcblx0XHR9ICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRTY3JlZW5Qb3NpdGlvbiggd2luZG93U2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdGlmICggdGhpcy5wb3NpdGlvbi54ICE9IHRoaXMucG9zaXRpb24ueCApIHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMiggTmFOLCBOYU4gKTtcblxuXHRcdGNvbnN0IHAgPSB0aGlzLnBvc2l0aW9uLmNsb25lKClcblx0XHRcdC5kaXZpZGUoIHdpbmRvd1NpemUgKVxuXHRcdFx0Lm11bHRpcGx5U2NhbGFyKCAyLjAgKVxuXHRcdFx0LnN1YlNjYWxhciggMS4wICk7XG5cdFx0cC55ICo9IC0gMTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwdWJsaWMgZ2V0UmVsYXRpdmVQb3NpdGlvbiggZWxtOiBIVE1MRWxlbWVudCwgc2NyZWVuPzogYm9vbGVhbiApIHtcblxuXHRcdGNvbnN0IHJlY3Q6IERPTVJlY3QgPSBlbG0uZ2V0Q2xpZW50UmVjdHMoKVsgMCBdIGFzIERPTVJlY3Q7XG5cblx0XHRsZXQgeCA9IHRoaXMucG9zaXRpb24ueCAtIHJlY3QubGVmdDtcblx0XHRsZXQgeSA9IHRoaXMucG9zaXRpb24ueSAtIHJlY3QudG9wO1xuXG5cdFx0aWYgKCBzY3JlZW4gKSB7XG5cblx0XHRcdHggLz0gcmVjdC53aWR0aDtcblx0XHRcdHkgLz0gcmVjdC5oZWlnaHQ7XG5cblx0XHR9XG5cblx0XHRjb25zdCBwID0gbmV3IFRIUkVFLlZlY3RvcjIoIHgsIHkgKTtcblxuXHRcdHJldHVybiBwO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgc2V0UG9zKCB4OiBudW1iZXIsIHk6IG51bWJlciApIHtcblxuXHRcdGlmIChcblx0XHRcdHRoaXMucG9zaXRpb24ueCAhPT0gdGhpcy5wb3NpdGlvbi54IHx8XG5cdFx0XHR0aGlzLnBvc2l0aW9uLnkgIT09IHRoaXMucG9zaXRpb24ueVxuXHRcdCkge1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy5kZWx0YS5zZXQoIHggLSB0aGlzLnBvc2l0aW9uLngsIHkgLSB0aGlzLnBvc2l0aW9uLnkgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMucG9zaXRpb24uc2V0KCB4LCB5ICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvblRvdWNoKCB0eXBlOiBzdHJpbmcsIGU6IFRvdWNoRXZlbnQgKSB7XG5cblx0XHRjb25zdCB0b3VjaCA9IGUudG91Y2hlc1sgMCBdO1xuXG5cdFx0aWYgKCB0b3VjaCApIHtcblxuXHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggdG91Y2gucGFnZVgsIHRvdWNoLnBhZ2VZLCB0eXBlLCBlICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoIHR5cGUgPT0gJ2VuZCcgKSB7XG5cblx0XHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggTmFOLCBOYU4sIHR5cGUsIGUgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25Qb2ludGVyKCB0eXBlOiBzdHJpbmcsIGU6IFBvaW50ZXJFdmVudCB8IERyYWdFdmVudCApIHtcblxuXHRcdGNvbnN0IHBvaW50ZXJUeXBlID0gKCBlIGFzIFBvaW50ZXJFdmVudCApLnBvaW50ZXJUeXBlO1xuXG5cdFx0aWYgKCBwb2ludGVyVHlwZSAhPSBudWxsICkge1xuXG5cdFx0XHRpZiAoIHBvaW50ZXJUeXBlID09ICdtb3VzZScgJiYgKCBlLmJ1dHRvbiA9PSAtIDEgfHwgZS5idXR0b24gPT0gMCApICkge1xuXG5cdFx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgYXMgUG9pbnRlckV2ZW50ICk7XG5cblx0XHRcdH1cblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdHRoaXMudG91Y2hFdmVudEhhbmRsZXIoIGUucGFnZVgsIGUucGFnZVksIHR5cGUsIGUgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRvdWNoRXZlbnRIYW5kbGVyKCBwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlciwgdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50IHwgUG9pbnRlckV2ZW50IHwgRHJhZ0V2ZW50ICkge1xuXG5cdFx0bGV0IGRpc3BhdGNoID0gZmFsc2U7XG5cblx0XHRjb25zdCB4ID0gcG9zWCAtIHdpbmRvdy5wYWdlWE9mZnNldDtcblx0XHRjb25zdCB5ID0gcG9zWSAtIHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdGlmICggdHlwZSA9PSBcInN0YXJ0XCIgKSB7XG5cblx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IHRydWU7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCAwLCAwICk7XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJtb3ZlXCIgKSB7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdGlmICggdGhpcy5pc1RvdWNoaW5nICkge1xuXG5cdFx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PSBcImVuZFwiICkge1xuXG5cdFx0XHRpZiAoICd0YXJnZXRUb3VjaGVzJyBpbiBlICkge1xuXG5cdFx0XHRcdGlmICggZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAwICkge1xuXG5cdFx0XHRcdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGlmICggZGlzcGF0Y2ggKSB7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdFx0cG9pbnRlckV2ZW50OiBlLFxuXHRcdFx0XHRwb2ludGVyRXZlbnRUeXBlOiB0eXBlLFxuXHRcdFx0XHRwb3NpdGlvbjogdGhpcy5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0XHRkZWx0YTogdGhpcy5kZWx0YS5jbG9uZSgpXG5cdFx0XHR9ICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRpZiAoICEgdGhpcy5pc1NQICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogbnVsbCxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogJ2hvdmVyJyxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdHJhY2twYWRNZW1EZWx0YSA9IDA7XG5cdHByb3RlY3RlZCB0cmFja3BhZE1heCA9IGZhbHNlO1xuXG5cdHByb3RlY3RlZCB3aGVlbCggZTogV2hlZWxFdmVudCApIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3doZWVsJyxcblx0XHRcdHdoZWVsRXZlbnQ6IGUsXG5cdFx0fSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgcGFzc1Rocm93VmVydCBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm93LnZzJztcblxudHlwZSBJbnB1dFJlbmRlclRhcmdldCA9IHsgW2tleTpzdHJpbmddOiBUSFJFRS5UZXh0dXJlIHwgVEhSRUUuVGV4dHVyZVtdIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUFBQYXJhbSBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVyc3tcblx0aW5wdXRSZW5kZXJUYXJnZXRzPzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc2luZyB7XG5cblx0cHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblx0cHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByaXZhdGUgY2FtZXJhOiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmE7XG5cdHByaXZhdGUgc2NyZWVuOiBUSFJFRS5NZXNoO1xuXG5cdHB1YmxpYyBlZmZlY3Q6IHtcblx0XHRtYXRlcmlhbDogVEhSRUUuU2hhZGVyTWF0ZXJpYWwsXG5cdH07XG5cblx0Y29uc3RydWN0b3IoIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyLCBwcFBhcmFtOiBQUFBhcmFtLCBjdXN0b21HZW9tZXRyeT86IFRIUkVFLkJ1ZmZlckdlb21ldHJ5ICkge1xuXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIC0gMS4wLCAxLjAsIDEuMCwgLSAxLjAgKTtcblxuXHRcdHRoaXMuc2NyZWVuID0gbmV3IFRIUkVFLk1lc2goIGN1c3RvbUdlb21ldHJ5IHx8IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcblx0XHR0aGlzLnNjZW5lLmFkZCggdGhpcy5zY3JlZW4gKTtcblxuXHRcdHBwUGFyYW0udmVydGV4U2hhZGVyID0gcHBQYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgcGFzc1Rocm93VmVydDtcblx0XHRwcFBhcmFtLnVuaWZvcm1zID0gcHBQYXJhbS51bmlmb3JtcyB8fCB7fTtcblx0XHRwcFBhcmFtLnVuaWZvcm1zLnJlc29sdXRpb24gPSB7XG5cdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdH07XG5cblx0XHR0aGlzLmVmZmVjdCA9IHtcblx0XHRcdG1hdGVyaWFsOiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBwUGFyYW0gKSxcblx0XHR9O1xuXG5cdH1cblxuXHRwdWJsaWMgcmVuZGVyKCBpbnB1dFJlbmRlclRhcmdldHM6IElucHV0UmVuZGVyVGFyZ2V0IHwgbnVsbCwgcmVuZGVyVGFyZ2V0OiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCB8IG51bGwgPSBudWxsICkge1xuXG5cdFx0bGV0IHJlbmRlclRhcmdldE1lbSA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cblx0XHRsZXQgZWZmZWN0ID0gdGhpcy5lZmZlY3Q7XG5cdFx0bGV0IG1hdGVyaWFsID0gZWZmZWN0Lm1hdGVyaWFsO1xuXHRcdGxldCB1bmlmb3JtcyA9IG1hdGVyaWFsLnVuaWZvcm1zO1xuXG5cdFx0aWYgKCBpbnB1dFJlbmRlclRhcmdldHMgKSB7XG5cblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIGlucHV0UmVuZGVyVGFyZ2V0cyApO1xuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaiArKyApIHtcblxuXHRcdFx0XHRpZiAoIHVuaWZvcm1zWyBrZXlzWyBqIF0gXSApIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXS52YWx1ZSA9IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF07XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXSA9IHsgdmFsdWU6IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF0gfTtcblxuXHRcdFx0XHRcdGVmZmVjdC5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwudW5pZm9ybXMgPSB1bmlmb3JtcztcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHR1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlLnNldCggcmVuZGVyVGFyZ2V0LndpZHRoLCByZW5kZXJUYXJnZXQuaGVpZ2h0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmdldFNpemUoIHVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2NyZWVuLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCByZW5kZXJUYXJnZXRNZW0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgQW5pbWF0b3JWYXJpYWJsZVR5cGUgfSBmcm9tICcuL0FuaW1hdG9yJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYyB9IGZyb20gJy4vRWFzaW5ncyc7XHJcbmltcG9ydCB7IExlcnBzLCBMZXJwRnVuYyB9IGZyb20gJy4vTGVycHMnO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPiB7XHJcblx0dGltZTogbnVtYmVyO1xyXG5cdHZhbHVlOiBUO1xyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8VD4ge1xyXG5cdGtleWZyYW1lczogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPFQ+W107XHJcblx0bGVycEZ1bmM/OiBMZXJwRnVuYzxUPjtcclxuXHR2YWx1ZTogVDtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvckFkZFBhcmFtczxUPiB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGtleWZyYW1lczogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPFQ+W107XHJcblx0Y3VzdG9tTGVycD86IExlcnBGdW5jPFQ+LFxyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQW5pbWF0b3Ige1xyXG5cclxuXHRwcm90ZWN0ZWQgdmFyaWFibGVzOiB7IFtuYW1lOiBzdHJpbmddOiBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8YW55PiB9ID0ge307XHJcblx0cHJvdGVjdGVkIHRpbWU6IG51bWJlcjtcclxuXHRwdWJsaWMgZGVmYXVsdEVhc2luZz86IEVhc2luZ0Z1bmM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCApIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGQ8VCBleHRlbmRzIEFuaW1hdG9yVmFyaWFibGVUeXBlPiggcGFyYW1zOiBUaW1lbGluZUFuaW1hdG9yQWRkUGFyYW1zPFQ+ICkge1xyXG5cclxuXHRcdGlmICggcGFyYW1zLmtleWZyYW1lcy5sZW5ndGggPT0gMCApIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIHBhcmFtcy5uYW1lICsgJ1wiJywgJ0tleWZyYW1lIGxlbmd0aCBpcyAwISEnICk7XHJcblxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdID0ge1xyXG5cdFx0XHRrZXlmcmFtZXM6IHBhcmFtcy5rZXlmcmFtZXMsXHJcblx0XHRcdGxlcnBGdW5jOiBwYXJhbXMuY3VzdG9tTGVycCxcclxuXHRcdFx0ZWFzaW5nOiBwYXJhbXMuZWFzaW5nLFxyXG5cdFx0XHR2YWx1ZTogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXS5rZXlmcmFtZXMuc29ydCggKCBhLCBiICkgPT4ge1xyXG5cclxuXHRcdFx0cmV0dXJuICggYS50aW1lIDwgYi50aW1lICkgPyAtIDEgOiAxO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHRpZiAoICEgdGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ubGVycEZ1bmMgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXS5sZXJwRnVuYyA9IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMua2V5ZnJhbWVzWyAwIF0udmFsdWUgKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jYWxjKCk7XHJcblxyXG5cdFx0cmV0dXJuIHBhcmFtcy5uYW1lO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQ8VD4oIG5hbWU6IHN0cmluZyApOiBUIHwgbnVsbCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWU7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhcmlhYmxlT2JqZWN0PFQ+KCBuYW1lOiBzdHJpbmcgKTogVGltZWxpbmVBbmltYXRvclZhcmlhYmxlPFQ+IHwgbnVsbCB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMudmFyaWFibGVzWyBuYW1lIF07XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZSggdGltZTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMudGltZSA9IHRpbWU7XHJcblxyXG5cdFx0dGhpcy5jYWxjKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNhbGMoKSB7XHJcblxyXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCB2YWxpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBrZXlzWyBpIF0gXTtcclxuXHRcdFx0bGV0IGtmcyA9IHZhbGlhYmxlLmtleWZyYW1lcztcclxuXHJcblx0XHRcdGxldCBhOiBUaW1lbGluZUFuaW1hdG9yS2V5RnJhbWU8YW55PiB8IG51bGwgPSBudWxsO1xyXG5cdFx0XHRsZXQgYjogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHJcblx0XHRcdGxldCB0ID0gTWF0aC5tYXgoIGtmc1sgMCBdLnRpbWUsIE1hdGgubWluKCBrZnNbIGtmcy5sZW5ndGggLSAxIF0udGltZSwgdGhpcy50aW1lICkgKTtcclxuXHJcblx0XHRcdGxldCBlYXNpbmc6IEVhc2luZ0Z1bmMgfCBudWxsIHwgdW5kZWZpbmVkID0gbnVsbDtcclxuXHJcblx0XHRcdGlmICgga2ZzLmxlbmd0aCA9PSAxICkge1xyXG5cclxuXHRcdFx0XHR0ID0ga2ZzWyAwIF0udGltZTtcclxuXHRcdFx0XHRhID0gYiA9IGtmc1sgMCBdO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblxyXG5cdFx0XHRcdGZvciAoIGxldCBqID0gMDsgaiA8IGtmcy5sZW5ndGggLSAxOyBqICsrICkge1xyXG5cclxuXHRcdFx0XHRcdGEgPSBrZnNbIGogXTtcclxuXHRcdFx0XHRcdGIgPSBrZnNbIGogKyAxIF07XHJcblxyXG5cdFx0XHRcdFx0ZWFzaW5nID0gYS5lYXNpbmc7XHJcblxyXG5cdFx0XHRcdFx0aWYgKCBhLnRpbWUgPD0gdCAmJiB0IDw9IGIudGltZSApIGJyZWFrO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmICggYSAhPSBudWxsICYmIGIgIT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0XHR0ID0gKCB0IC0gYS50aW1lICkgLyAoIGIudGltZSAtIGEudGltZSApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIGVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IGVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICggdmFsaWFibGUuZWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gdmFsaWFibGUuZWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKCB0aGlzLmRlZmF1bHRFYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSB0aGlzLmRlZmF1bHRFYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdmFsaWFibGUubGVycEZ1bmMgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggYSAhPSBudWxsICYmIGIgIT0gbnVsbCApIHtcclxuXHJcblx0XHRcdFx0XHR2YWxpYWJsZS52YWx1ZSA9IHZhbGlhYmxlLmxlcnBGdW5jKCBhLnZhbHVlLCBiLnZhbHVlLCB0ICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblxyXG5cdFx0XHRcdGlmICggdmFsaWFibGUudmFsdWUgPT09IGZhbHNlICkge1xyXG5cclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKCAnZXJyb3IgYXQgJyArICdcIicgKyBrZXlzWyBpIF0gKyAnXCInICk7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIGtleXNbIGkgXSArICdcIicsICdsZXJwIGZ1bmN0aW9uIGlzIG5vdCBzZXQuJyApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBVbmlmb3Jtc3sgWyBrZXk6IHN0cmluZyBdIDogVEhSRUUuSVVuaWZvcm0gfVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBVbmlmb3Jtc0xpYiB7XHJcblxyXG5cdGV4cG9ydCBmdW5jdGlvbiBtZXJnZVVuaWZvcm1zKCAuLi51bmlmb3JtczogKCBVbmlmb3Jtc3x1bmRlZmluZWQgKVtdICkgOiBVbmlmb3JtcyB7XHJcblxyXG5cdFx0bGV0IHJlcyA9IHt9O1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHVuaWZvcm1zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdW5pZm9ybXNbIGkgXSAhPSB1bmRlZmluZWQgKSB7XHJcblxyXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oIHJlcywgdW5pZm9ybXNbIGkgXSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVzO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBXYWl0TWFuIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ29Ib21lKCkge1xyXG5cclxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZ29ob21lJyB9ICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHdhaXQoIHRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xyXG5cclxuXHRcdFx0Y29uc3Qgb25Hb0hvbWUgPSAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdHJlamVjdCgpO1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2dvaG9tZScsIG9uR29Ib21lICk7XHJcblxyXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XHJcblxyXG5cdFx0XHRcdHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2dvaG9tZScsIG9uR29Ib21lICk7XHJcblxyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHJcblx0XHRcdH0sIHRpbWUgKiAxMDAwLjAgKTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIgdjUuMi45IC0gZ2l0LmlvL2VlXG4gKiBVbmxpY2Vuc2UgLSBodHRwOi8vdW5saWNlbnNlLm9yZy9cbiAqIE9saXZlciBDYWxkd2VsbCAtIGh0dHBzOi8vb2xpLm1lLnVrL1xuICogQHByZXNlcnZlXG4gKi9cblxuOyhmdW5jdGlvbiAoZXhwb3J0cykge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIC8qKlxuICAgICAqIENsYXNzIGZvciBtYW5hZ2luZyBldmVudHMuXG4gICAgICogQ2FuIGJlIGV4dGVuZGVkIHRvIHByb3ZpZGUgZXZlbnQgZnVuY3Rpb25hbGl0eSBpbiBvdGhlciBjbGFzc2VzLlxuICAgICAqXG4gICAgICogQGNsYXNzIEV2ZW50RW1pdHRlciBNYW5hZ2VzIGV2ZW50IHJlZ2lzdGVyaW5nIGFuZCBlbWl0dGluZy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7fVxuXG4gICAgLy8gU2hvcnRjdXRzIHRvIGltcHJvdmUgc3BlZWQgYW5kIHNpemVcbiAgICB2YXIgcHJvdG8gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlO1xuICAgIHZhciBvcmlnaW5hbEdsb2JhbFZhbHVlID0gZXhwb3J0cy5FdmVudEVtaXR0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQgaW4gaXRzIHN0b3JhZ2UgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGxpc3RlbmVycyBBcnJheSBvZiBsaXN0ZW5lcnMgdG8gc2VhcmNoIHRocm91Z2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGxvb2sgZm9yLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gSW5kZXggb2YgdGhlIHNwZWNpZmllZCBsaXN0ZW5lciwgLTEgaWYgbm90IGZvdW5kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVycywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGEgbWV0aG9kIHdoaWxlIGtlZXBpbmcgdGhlIGNvbnRleHQgY29ycmVjdCwgdG8gYWxsb3cgZm9yIG92ZXJ3cml0aW5nIG9mIHRhcmdldCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGFsaWFzZWQgbWV0aG9kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWxpYXMobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWxpYXNDbG9zdXJlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaWxsIGluaXRpYWxpc2UgdGhlIGV2ZW50IG9iamVjdCBhbmQgbGlzdGVuZXIgYXJyYXlzIGlmIHJlcXVpcmVkLlxuICAgICAqIFdpbGwgcmV0dXJuIGFuIG9iamVjdCBpZiB5b3UgdXNlIGEgcmVnZXggc2VhcmNoLiBUaGUgb2JqZWN0IGNvbnRhaW5zIGtleXMgZm9yIGVhY2ggbWF0Y2hlZCBldmVudC4gU28gL2JhW3J6XS8gbWlnaHQgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIGJhciBhbmQgYmF6LiBCdXQgb25seSBpZiB5b3UgaGF2ZSBlaXRoZXIgZGVmaW5lZCB0aGVtIHdpdGggZGVmaW5lRXZlbnQgb3IgYWRkZWQgc29tZSBsaXN0ZW5lcnMgdG8gdGhlbS5cbiAgICAgKiBFYWNoIHByb3BlcnR5IGluIHRoZSBvYmplY3QgcmVzcG9uc2UgaXMgYW4gYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfE9iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldExpc3RlbmVycyhldnQpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGEgY29uY2F0ZW5hdGVkIGFycmF5IG9mIGFsbCBtYXRjaGluZyBldmVudHMgaWZcbiAgICAgICAgLy8gdGhlIHNlbGVjdG9yIGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICAgICAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZXZlbnRzW2V2dF0gfHwgKGV2ZW50c1tldnRdID0gW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGxpc3Qgb2YgbGlzdGVuZXIgb2JqZWN0cyBhbmQgZmxhdHRlbnMgaXQgaW50byBhIGxpc3Qgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gbGlzdGVuZXJzIFJhdyBsaXN0ZW5lciBvYmplY3RzLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW119IEp1c3QgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90by5mbGF0dGVuTGlzdGVuZXJzID0gZnVuY3Rpb24gZmxhdHRlbkxpc3RlbmVycyhsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGZsYXRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZmxhdExpc3RlbmVycy5wdXNoKGxpc3RlbmVyc1tpXS5saXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmxhdExpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgcmVxdWVzdGVkIGxpc3RlbmVycyB2aWEgZ2V0TGlzdGVuZXJzIGJ1dCB3aWxsIGFsd2F5cyByZXR1cm4gdGhlIHJlc3VsdHMgaW5zaWRlIGFuIG9iamVjdC4gVGhpcyBpcyBtYWlubHkgZm9yIGludGVybmFsIHVzZSBidXQgb3RoZXJzIG1heSBmaW5kIGl0IHVzZWZ1bC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBpbiBhbiBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzQXNPYmplY3QgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnNBc09iamVjdChldnQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICByZXNwb25zZVtldnRdID0gbGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGxpc3RlbmVycztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNWYWxpZExpc3RlbmVyIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nIHx8IGxpc3RlbmVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9IGVsc2UgaWYgKGxpc3RlbmVyICYmIHR5cGVvZiBsaXN0ZW5lciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHJldHVybiBpc1ZhbGlkTGlzdGVuZXIobGlzdGVuZXIubGlzdGVuZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciBmdW5jdGlvbiB0byB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICAgICAqIFRoZSBsaXN0ZW5lciB3aWxsIG5vdCBiZSBhZGRlZCBpZiBpdCBpcyBhIGR1cGxpY2F0ZS5cbiAgICAgKiBJZiB0aGUgbGlzdGVuZXIgcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGl0IGlzIGNhbGxlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSB0aGVuIHRoZSBsaXN0ZW5lciB3aWxsIGJlIGFkZGVkIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGF0dGFjaCB0aGUgbGlzdGVuZXIgdG8uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBldmVudCBpcyBlbWl0dGVkLiBJZiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlIHRoZW4gaXQgd2lsbCBiZSByZW1vdmVkIGFmdGVyIGNhbGxpbmcuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghaXNWYWxpZExpc3RlbmVyKGxpc3RlbmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJJc1dyYXBwZWQgPSB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVycykge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnB1c2gobGlzdGVuZXJJc1dyYXBwZWQgPyBsaXN0ZW5lciA6IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgICAgICAgICBvbmNlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZExpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub24gPSBhbGlhcygnYWRkTGlzdGVuZXInKTtcblxuICAgIC8qKlxuICAgICAqIFNlbWktYWxpYXMgb2YgYWRkTGlzdGVuZXIuIEl0IHdpbGwgYWRkIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlXG4gICAgICogYXV0b21hdGljYWxseSByZW1vdmVkIGFmdGVyIGl0cyBmaXJzdCBleGVjdXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZE9uY2VMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZE9uY2VMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZExpc3RlbmVyKGV2dCwge1xuICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgb25jZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWxpYXMgb2YgYWRkT25jZUxpc3RlbmVyLlxuICAgICAqL1xuICAgIHByb3RvLm9uY2UgPSBhbGlhcygnYWRkT25jZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGV2ZW50IG5hbWUuIFRoaXMgaXMgcmVxdWlyZWQgaWYgeW91IHdhbnQgdG8gdXNlIGEgcmVnZXggdG8gYWRkIGEgbGlzdGVuZXIgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIElmIHlvdSBkb24ndCBkbyB0aGlzIHRoZW4gaG93IGRvIHlvdSBleHBlY3QgaXQgdG8ga25vdyB3aGF0IGV2ZW50IHRvIGFkZCB0bz8gU2hvdWxkIGl0IGp1c3QgYWRkIHRvIGV2ZXJ5IHBvc3NpYmxlIG1hdGNoIGZvciBhIHJlZ2V4PyBOby4gVGhhdCBpcyBzY2FyeSBhbmQgYmFkLlxuICAgICAqIFlvdSBuZWVkIHRvIHRlbGwgaXQgd2hhdCBldmVudCBuYW1lcyBzaG91bGQgYmUgbWF0Y2hlZCBieSBhIHJlZ2V4LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBjcmVhdGUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZGVmaW5lRXZlbnQgPSBmdW5jdGlvbiBkZWZpbmVFdmVudChldnQpIHtcbiAgICAgICAgdGhpcy5nZXRMaXN0ZW5lcnMoZXZ0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFVzZXMgZGVmaW5lRXZlbnQgdG8gZGVmaW5lIG11bHRpcGxlIGV2ZW50cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nW119IGV2dHMgQW4gYXJyYXkgb2YgZXZlbnQgbmFtZXMgdG8gZGVmaW5lLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50cyA9IGZ1bmN0aW9uIGRlZmluZUV2ZW50cyhldnRzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZ0cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVFdmVudChldnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIGZyb20gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaGVuIHBhc3NlZCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhcyB0aGUgZXZlbnQgbmFtZSwgaXQgd2lsbCByZW1vdmUgdGhlIGxpc3RlbmVyIGZyb20gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byByZW1vdmUgZnJvbSB0aGUgZXZlbnQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVyc0FzT2JqZWN0KGV2dCk7XG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVyc1trZXldLCBsaXN0ZW5lcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUxpc3RlbmVyXG4gICAgICovXG4gICAgcHJvdG8ub2ZmID0gYWxpYXMoJ3JlbW92ZUxpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHlvdSBjYW4gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBhZGQgdGhlIGFycmF5IG9mIGxpc3RlbmVycyB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICogWWVhaCwgdGhpcyBmdW5jdGlvbiBkb2VzIHF1aXRlIGEgYml0LiBUaGF0J3MgcHJvYmFibHkgYSBiYWQgdGhpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoZXZ0LCBsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gUGFzcyB0aHJvdWdoIHRvIG1hbmlwdWxhdGVMaXN0ZW5lcnNcbiAgICAgICAgcmV0dXJuIHRoaXMubWFuaXB1bGF0ZUxpc3RlbmVycyhmYWxzZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGxpc3RlbmVycyBpbiBidWxrIHVzaW5nIHRoZSBtYW5pcHVsYXRlTGlzdGVuZXJzIG1ldGhvZC5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHlvdSBjYW4gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVycyBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnModHJ1ZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBsaXN0ZW5lcnMgaW4gYnVsay4gVGhlIGFkZExpc3RlbmVycyBhbmQgcmVtb3ZlTGlzdGVuZXJzIG1ldGhvZHMgYm90aCB1c2UgdGhpcyB0byBkbyB0aGVpciBqb2IuIFlvdSBzaG91bGQgcmVhbGx5IHVzZSB0aG9zZSBpbnN0ZWFkLCB0aGlzIGlzIGEgbGl0dGxlIGxvd2VyIGxldmVsLlxuICAgICAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkL3JlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWFuaXB1bGF0ZSB0aGUgbGlzdGVuZXJzIG9mIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIFRydWUgaWYgeW91IHdhbnQgdG8gcmVtb3ZlIGxpc3RlbmVycywgZmFsc2UgaWYgeW91IHdhbnQgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkL3JlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5tYW5pcHVsYXRlTGlzdGVuZXJzID0gZnVuY3Rpb24gbWFuaXB1bGF0ZUxpc3RlbmVycyhyZW1vdmUsIGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBzaW5nbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVyIDogdGhpcy5hZGRMaXN0ZW5lcjtcbiAgICAgICAgdmFyIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuICAgICAgICAvLyBJZiBldnQgaXMgYW4gb2JqZWN0IHRoZW4gcGFzcyBlYWNoIG9mIGl0cyBwcm9wZXJ0aWVzIHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgZXZ0ID09PSAnb2JqZWN0JyAmJiAhKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpICYmICh2YWx1ZSA9IGV2dFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgc2luZ2xlIGxpc3RlbmVyIHN0cmFpZ2h0IHRocm91Z2ggdG8gdGhlIHNpbmd1bGFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgcGFzcyBiYWNrIHRvIHRoZSBtdWx0aXBsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTbyBldnQgbXVzdCBiZSBhIHN0cmluZ1xuICAgICAgICAgICAgLy8gQW5kIGxpc3RlbmVycyBtdXN0IGJlIGFuIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gTG9vcCBvdmVyIGl0IGFuZCBwYXNzIGVhY2ggb25lIHRvIHRoZSBtdWx0aXBsZSBtZXRob2RcbiAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGV2dCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSBhIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBJZiB5b3UgZG8gbm90IHNwZWNpZnkgYW4gZXZlbnQgdGhlbiBhbGwgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBUaGF0IG1lYW5zIGV2ZXJ5IGV2ZW50IHdpbGwgYmUgZW1wdGllZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ2V4IHRvIHJlbW92ZSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IFtldnRdIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci4gV2lsbCByZW1vdmUgZnJvbSBldmVyeSBldmVudCBpZiBub3QgcGFzc2VkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZXZ0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGV2dDtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJlbW92ZSBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgZXZ0XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbZXZ0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzIG1hdGNoaW5nIHRoZSByZWdleC5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBpbiBhbGwgZXZlbnRzXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUV2ZW50LlxuICAgICAqXG4gICAgICogQWRkZWQgdG8gbWlycm9yIHRoZSBub2RlIEFQSS5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBhbGlhcygncmVtb3ZlRXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IG9mIHlvdXIgY2hvaWNlLlxuICAgICAqIFdoZW4gZW1pdHRlZCwgZXZlcnkgbGlzdGVuZXIgYXR0YWNoZWQgdG8gdGhhdCBldmVudCB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgICAqIElmIHlvdSBwYXNzIHRoZSBvcHRpb25hbCBhcmd1bWVudCBhcnJheSB0aGVuIHRob3NlIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCB0byBldmVyeSBsaXN0ZW5lciB1cG9uIGV4ZWN1dGlvbi5cbiAgICAgKiBCZWNhdXNlIGl0IHVzZXMgYGFwcGx5YCwgeW91ciBhcnJheSBvZiBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgYXMgaWYgeW91IHdyb3RlIHRoZW0gb3V0IHNlcGFyYXRlbHkuXG4gICAgICogU28gdGhleSB3aWxsIG5vdCBhcnJpdmUgd2l0aGluIHRoZSBhcnJheSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhleSB3aWxsIGJlIHNlcGFyYXRlLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBPcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24gZW1pdEV2ZW50KGV2dCwgYXJncykge1xuICAgICAgICB2YXIgbGlzdGVuZXJzTWFwID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJzO1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzTWFwKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNNYXBba2V5XS5zbGljZSgwKTtcblxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHNoYWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGVpdGhlciB3aXRoIGEgYmFzaWMgY2FsbCBvciBhbiBhcHBseSBpZiB0aGVyZSBpcyBhbiBhcmdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBsaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGVtaXRFdmVudFxuICAgICAqL1xuICAgIHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0bHkgZGlmZmVyZW50IGZyb20gZW1pdEV2ZW50IGluIHRoYXQgaXQgd2lsbCBwYXNzIGl0cyBhcmd1bWVudHMgb24gdG8gdGhlIGxpc3RlbmVycywgYXMgb3Bwb3NlZCB0byB0YWtpbmcgYSBzaW5nbGUgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3Mgb24uXG4gICAgICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdEV2ZW50KGV2dCwgYXJncyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmIGFcbiAgICAgKiBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhlIG9uZSBzZXQgaGVyZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIHRvIGNoZWNrIGZvciB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uc2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gc2V0T25jZVJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29uY2VSZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcbiAgICAgKiB0aGUgbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoaXMgb25lIHRoZW4gaXQgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBhdXRvbWF0aWNhbGx5LiBJdCB3aWxsIHJldHVybiB0cnVlIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59IFRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGZvciBvciB0aGUgZGVmYXVsdCwgdHJ1ZS5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gX2dldE9uY2VSZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXZlbnRzIHN0b3JhZ2Ugb2JqZWN0LlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRFdmVudHMgPSBmdW5jdGlvbiBfZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldmVydHMgdGhlIGdsb2JhbCB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhpcyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG4gICAgICovXG4gICAgRXZlbnRFbWl0dGVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IG9yaWdpbmFsR2xvYmFsVmFsdWU7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIEV4cG9zZSB0aGUgY2xhc3MgZWl0aGVyIHZpYSBBTUQsIENvbW1vbkpTIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG59KHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcyB8fCB7fSkpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3RocmVlX187IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImV4cG9ydCAqIGZyb20gJy4vY29yZS9CYXNlTGF5ZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvQ29udHJvbGxlcic7XHJcblxyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vQW5pbWF0aW9uQWN0aW9uJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmUnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVLZXlGcmFtZSdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9CYWNrZ3JvdW5kJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9CbGVuZGVyQ29ubmVjdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Qb2ludGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9ET01NZXNoJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9FYXNpbmdzJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9FdmVudERpc3BhdGNoZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvTW91c2VSb3RhdG9yJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9Qb3N0UHJvY2Vzc2luZyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUGFnZVNjcm9sbGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9QYWdlU2Nyb2xsZXIvUGFnZVNjcm9sbGVyU2VjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvTGF5b3V0Q29udHJvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvVGltZWxpbmVBbmltYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvVW5pZm9ybXMnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0xlcnBzJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9XYWl0TWFuJztcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9