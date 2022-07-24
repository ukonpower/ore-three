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
        const onToucmEnd = this.onTouch.bind(this, "end");
        const onPointerDown = this.onPointer.bind(this, "start");
        const onPointerMove = this.onPointer.bind(this, "move");
        const onPointerUp = this.onPointer.bind(this, "end");
        const onWheel = this.wheel.bind(this);
        elm.addEventListener('touchstart', onTouchStart, { passive: false });
        elm.addEventListener('touchmove', onTouchMove, { passive: false });
        elm.addEventListener('touchend', onToucmEnd, { passive: false });
        elm.addEventListener('pointerdown', onPointerDown);
        elm.addEventListener('pointermove', onPointerMove);
        elm.addEventListener('pointerup', onPointerUp);
        elm.addEventListener("dragend", onPointerUp);
        elm.addEventListener("wheel", onWheel, { passive: false });
        const onUnRegister = (e) => {
            if (elm.isEqualNode(e.elm)) {
                elm.removeEventListener('touchstart', onTouchStart);
                elm.removeEventListener('touchmove', onTouchMove);
                elm.removeEventListener('touchend', onToucmEnd);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNDO0FBRUQ7QUFDZ0I7QUFDVDtBQUNLO0FBQ0c7QUFDYjtBQUNNO0FBQ1Q7QUFDQTtBQUNBO0FBQ1E7QUFDUztBQUNaO0FBQ0U7QUFDRjtBQUNvQjtBQUNoQjtBQUNBO0FBQ1I7QUFDSDtBQUNFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQmFja2dyb3VuZC9zaGFkZXJzL2JhY2tncm91bmQudnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0RPTU1lc2gvZG9tTWVzaC52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL3NoYWRlcnMvcGFzc1Rocm91Z2guZnMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0dQVUNvbXB1dGF0aW9uQ29udHJvbGxlci9zaGFkZXJzL3Bhc3NUaHJvdWdoLnZzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb3N0UHJvY2Vzc2luZy9zaGFkZXJzL3Bhc3NUaHJvdy52cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvY29yZS9CYXNlTGF5ZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL2NvcmUvQ29udHJvbGxlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbi50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZS50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvQW5pbWF0aW9uL0ZDdXJ2ZUdyb3VwLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0FuaW1hdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CYWNrZ3JvdW5kL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9CZXppZXIudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0JsZW5kZXJDb25uZWN0b3IvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0RPTU1lc2gvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0Vhc2luZ3MudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL0V2ZW50RGlzcGF0Y2hlci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvR1BVQ29tcHV0YXRpb25Db250cm9sbGVyL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9MYXlvdXRDb250cm9sbGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9MZXJwcy50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvTW91c2VSb3RhdG9yLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9QYWdlU2Nyb2xsZXIvUGFnZVNjcm9sbGVyU2VjdGlvbi50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvUGFnZVNjcm9sbGVyL2luZGV4LnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb2ludGVyLnRzIiwid2VicGFjazovL09SRS8uL3NyYy91dGlscy9Qb3N0UHJvY2Vzc2luZy9pbmRleC50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvVGltZWxpbmVBbmltYXRvci50cyIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvdXRpbHMvVW5pZm9ybXMudHMiLCJ3ZWJwYWNrOi8vT1JFLy4vc3JjL3V0aWxzL1dhaXRNYW4udHMiLCJ3ZWJwYWNrOi8vT1JFLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vT1JFL2V4dGVybmFsIHVtZCB7XCJjb21tb25qc1wiOlwidGhyZWVcIixcImNvbW1vbmpzMlwiOlwidGhyZWVcIixcImFtZFwiOlwidGhyZWVcIixcInJvb3RcIjpcIlRIUkVFXCJ9Iiwid2VicGFjazovL09SRS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vT1JFL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9PUkUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9PUkUvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwidGhyZWVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1widGhyZWVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiT1JFXCJdID0gZmFjdG9yeShyZXF1aXJlKFwidGhyZWVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIk9SRVwiXSA9IGZhY3Rvcnkocm9vdFtcIlRIUkVFXCJdKTtcbn0pKHRoaXMsIChfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX3RocmVlX18pID0+IHtcbnJldHVybiAiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG52YXJ5aW5nIHZlYzQgdkNvbG9yO1xcblxcbnZvaWQgbWFpbiggdm9pZCApIHtcXG4gICAgXFxuICAgIHZlYzMgcG9zID0gcG9zaXRpb247XFxuXFxuICAgIHBvcy56ID0gMS4wO1xcbiAgICBcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3MsIDEuMCApO1xcbiAgICBcXG4gICAgdlV2ID0gdXY7XFxuICAgIHZDb2xvciA9IHZlYzQoIDEuMCApO1xcblxcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG51bmlmb3JtIHZlYzIgZG9tUG9zO1xcbnVuaWZvcm0gdmVjMiBkb21TaXplO1xcbnVuaWZvcm0gdmVjMiB3aW5kb3dTaXplO1xcbnVuaWZvcm0gZmxvYXQgYXNwZWN0UmF0aW87XFxuXFxudm9pZCBtYWluKCAgKVxcbntcXG4gIGZsb2F0IHdpZHRoID0gZG9tU2l6ZS54IC8gd2luZG93U2l6ZS54O1xcblxcbiAgLy/lt6bkuIooIDAsMCAp44GrXFxuICB2ZWMzIHBvcyA9IHBvc2l0aW9uICsgdmVjMyggMS4wLC0xLjAsMC4wICk7XFxuXFxuICAvL3NpemVcXG4gIHBvcy54ICo9IHdpZHRoO1xcbiAgcG9zLnkgKj0gKCB3aWR0aCAqIGFzcGVjdFJhdGlvICkgKiAoIGRvbVNpemUueSAvIGRvbVNpemUueCApO1xcblxcbiAgcG9zICs9IHZlYzMoIC0xLjAsIDEuMCwgMC4wICk7XFxuXFxuICBwb3MgKz0gdmVjMyggZG9tUG9zLnggLyB3aW5kb3dTaXplLnggKiAyLjAsIC1kb21Qb3MueSAvIHdpbmRvd1NpemUueSAqIDIuMCwgMC4wICk7XFxuXFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQoIHBvcywgMS4wICk7XFxuICB2VXYgPSB1djtcXG59XFxuXCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnVuaWZvcm0gc2FtcGxlcjJEIHRleDtcXG52YXJ5aW5nIHZlYzIgdlV2O1xcblxcbnZvaWQgbWFpbigpIHtcXG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHRleCx2VXYpO1xcbn1cIjsiLCJleHBvcnQgZGVmYXVsdCBcIiNkZWZpbmUgR0xTTElGWSAxXFxudmFyeWluZyB2ZWMyIHZVdjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICAgIGdsX1Bvc2l0aW9uID0gdmVjNCggcG9zaXRpb24sIDEuMCApO1xcbiAgICB2VXYgPSB1djtcXG59XCI7IiwiZXhwb3J0IGRlZmF1bHQgXCIjZGVmaW5lIEdMU0xJRlkgMVxcbnZhcnlpbmcgdmVjMiB2VXY7XFxudm9pZCBtYWluKCkge1xcbiAgICB2VXYgPSB1djtcXG4gICAgZ2xfUG9zaXRpb24gPSB2ZWM0KCBwb3NpdGlvbiwgMS4wICk7XFxufSAgIFwiOyIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi91dGlscy9Vbmlmb3Jtcyc7XG5pbXBvcnQgeyBQb2ludGVyRXZlbnRBcmdzIH0gZnJvbSAnLi9Db250cm9sbGVyJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVyQmluZFBhcmFtIGV4dGVuZHMgVEhSRUUuV2ViR0xSZW5kZXJlclBhcmFtZXRlcnMge1xuXHRuYW1lOiBzdHJpbmc7XG5cdGNhbnZhcz86IEhUTUxDYW52YXNFbGVtZW50O1xuXHRhc3BlY3RTZXR0aW5nPzogQXNwZWN0U2V0dGluZztcblx0d3JhcHBlckVsZW1lbnQ/OiBIVE1MRWxlbWVudCB8IG51bGw7XG5cdHdyYXBwZXJFbGVtZW50UmVjdD86IERPTVJlY3QgfCBudWxsO1xuXHRwaXhlbFJhdGlvPzogbnVtYmVyXG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMYXllckluZm8gZXh0ZW5kcyBMYXllckJpbmRQYXJhbSB7XG5cdHNpemU6IExheWVyU2l6ZTtcblx0YXNwZWN0U2V0dGluZzogQXNwZWN0U2V0dGluZztcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIExheWVyU2l6ZSB7XG5cdGNhbnZhc0FzcGVjdFJhdGlvOiBudW1iZXI7XG5cdHdpbmRvd1NpemU6IFRIUkVFLlZlY3RvcjI7XG5cdHdpbmRvd0FzcGVjdFJhdGlvOiBudW1iZXI7XG5cdGNhbnZhc1NpemU6IFRIUkVFLlZlY3RvcjI7XG5cdGNhbnZhc1BpeGVsU2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0cGl4ZWxSYXRpbzogbnVtYmVyXG5cdHBvcnRyYWl0V2VpZ2h0OiBudW1iZXI7XG5cdHdpZGVXZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFzcGVjdFNldHRpbmcge1xuXHRtYWluQXNwZWN0OiBudW1iZXI7XG5cdHBvcnRyYWl0QXNwZWN0OiBudW1iZXI7XG5cdHdpZGVBc3BlY3Q6IG51bWJlcjtcbn1cblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRvdWNoRXZlbnRBcmdzIHtcblx0ZXZlbnQ6IFBvaW50ZXJFdmVudCB8IFRvdWNoRXZlbnQ7XG5cdHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xuXHRkZWx0YTogVEhSRUUuVmVjdG9yMjtcblx0c2NyZWVuUG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdHdpbmRvd1Bvc2l0aW9uOiBUSFJFRS5WZWN0b3IyO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzZUxheWVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwdWJsaWMgaW5mbzogTGF5ZXJJbmZvO1xuXG5cdHB1YmxpYyByZW5kZXJlcj86IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cblx0cHVibGljIHNjZW5lOiBUSFJFRS5TY2VuZTtcblx0cHVibGljIGNhbWVyYTogVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmE7XG5cblx0cHJvdGVjdGVkIHJlYWR5QW5pbWF0ZSA9IGZhbHNlO1xuXHRwdWJsaWMgdGltZSA9IDA7XG5cdHB1YmxpYyBjb21tb25Vbmlmb3JtczogVW5pZm9ybXM7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5pbmZvID0ge1xuXHRcdFx0bmFtZTogJycsXG5cdFx0XHRhc3BlY3RTZXR0aW5nOiB7XG5cdFx0XHRcdG1haW5Bc3BlY3Q6IDE2IC8gOSxcblx0XHRcdFx0d2lkZUFzcGVjdDogMTAgLyAxLFxuXHRcdFx0XHRwb3J0cmFpdEFzcGVjdDogMSAvIDIsXG5cdFx0XHR9LFxuXHRcdFx0c2l6ZToge1xuXHRcdFx0XHR3aW5kb3dTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHR3aW5kb3dBc3BlY3RSYXRpbzogMS4wLFxuXHRcdFx0XHRjYW52YXNTaXplOiBuZXcgVEhSRUUuVmVjdG9yMigpLFxuXHRcdFx0XHRjYW52YXNQaXhlbFNpemU6IG5ldyBUSFJFRS5WZWN0b3IyKCksXG5cdFx0XHRcdGNhbnZhc0FzcGVjdFJhdGlvOiAxLjAsXG5cdFx0XHRcdHBpeGVsUmF0aW86IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLFxuXHRcdFx0XHRwb3J0cmFpdFdlaWdodDogMC4wLFxuXHRcdFx0XHR3aWRlV2VpZ2h0OiAwLjBcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5jb21tb25Vbmlmb3JtcyA9IHtcblx0XHRcdHRpbWU6IHtcblx0XHRcdFx0dmFsdWU6IDBcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuXHRcdHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKCA1MCwgMSwgMC4xLCAxMDAwICk7XG5cblx0fVxuXG5cdHB1YmxpYyB0aWNrKCBkZWx0YVRpbWU6IG51bWJlciApIHtcblxuXHRcdHRoaXMudGltZSArPSBkZWx0YVRpbWU7XG5cblx0XHR0aGlzLmNvbW1vblVuaWZvcm1zLnRpbWUudmFsdWUgPSB0aGlzLnRpbWU7XG5cblx0XHRpZiAoIHRoaXMucmVhZHlBbmltYXRlICkge1xuXG5cdFx0XHR0aGlzLmFuaW1hdGUoIGRlbHRhVGltZSApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgYW5pbWF0ZSggZGVsdGFUaW1lOiBudW1iZXIgKSB7IH1cblxuXHRwdWJsaWMgb25CaW5kKCBsYXllckluZm86IExheWVyQmluZFBhcmFtICkge1xuXG5cdFx0dGhpcy5pbmZvLm5hbWUgPSBsYXllckluZm8ubmFtZTtcblx0XHR0aGlzLmluZm8uY2FudmFzID0gbGF5ZXJJbmZvLmNhbnZhcztcblxuXHRcdGlmICggbGF5ZXJJbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLnNldFdyYXBwZXJFbGVtZW50KCBsYXllckluZm8ud3JhcHBlckVsZW1lbnQgfHwgbnVsbCwgZmFsc2UgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuaW5mby5hc3BlY3RTZXR0aW5nID0gbGF5ZXJJbmZvLmFzcGVjdFNldHRpbmcgfHwgdGhpcy5pbmZvLmFzcGVjdFNldHRpbmc7XG5cdFx0dGhpcy5pbmZvLmFscGhhID0gbGF5ZXJJbmZvLmFscGhhO1xuXHRcdHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gPSBsYXllckluZm8ucGl4ZWxSYXRpbyB8fCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvO1xuXG5cdFx0dGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCB0aGlzLmluZm8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLnNldFBpeGVsUmF0aW8oIHRoaXMuaW5mby5zaXplLnBpeGVsUmF0aW8gKTtcblx0XHR0aGlzLnJlbmRlcmVyLmRlYnVnLmNoZWNrU2hhZGVyRXJyb3JzID0gdHJ1ZTtcblxuXHRcdHRoaXMuaW5mby5jYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XG5cblx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cblx0XHRcdHRoaXMub25SZXNpemUoKTtcblx0XHRcdHRoaXMucmVhZHlBbmltYXRlID0gdHJ1ZTtcblxuXHRcdH0sIDAgKTtcblxuXHR9XG5cblx0cHVibGljIG9uVW5iaW5kKCkge1xuXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCB7XG5cdFx0XHR0eXBlOiAnZGlzcG9zZSdcblx0XHR9ICk7XG5cblx0XHR0aGlzLnJlbW92ZUNoaWxkcmVucyggdGhpcy5zY2VuZSApO1xuXG5cdFx0dGhpcy5yZWFkeUFuaW1hdGUgPSBmYWxzZTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHJlbW92ZUNoaWxkcmVucyggb2JqZWN0OiBUSFJFRS5PYmplY3QzRCApIHtcblxuXHRcdGNvbnN0IGxlbmd0aCA9IG9iamVjdC5jaGlsZHJlbi5sZW5ndGg7XG5cblx0XHRmb3IgKCBsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtLSApIHtcblxuXHRcdFx0dGhpcy5yZW1vdmVDaGlsZHJlbnMoIG9iamVjdC5jaGlsZHJlblsgaSBdICk7XG5cblx0XHRcdGxldCBnZW86IFRIUkVFLkJ1ZmZlckdlb21ldHJ5IHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXHRcdFx0bGV0IG1hdDogVEhSRUUuTWF0ZXJpYWwgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cblx0XHRcdGlmICggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSBhcyBUSFJFRS5NZXNoICkuaXNNZXNoICkge1xuXG5cdFx0XHRcdGdlbyA9ICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLmdlb21ldHJ5O1xuXHRcdFx0XHRtYXQgPSAoICggb2JqZWN0LmNoaWxkcmVuWyBpIF0gYXMgVEhSRUUuTWVzaCApLm1hdGVyaWFsIGFzIFRIUkVFLk1hdGVyaWFsICk7XG5cblx0XHRcdH1cblxuXHRcdFx0b2JqZWN0LnJlbW92ZSggKCBvYmplY3QuY2hpbGRyZW5bIGkgXSApICk7XG5cblx0XHRcdGlmICggZ2VvICkge1xuXG5cdFx0XHRcdGdlby5kaXNwb3NlKCk7XG5cblx0XHRcdH1cblxuXHRcdFx0aWYgKCBtYXQgKSB7XG5cblx0XHRcdFx0bWF0LmRpc3Bvc2UoKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0V3JhcHBlckVsZW1lbnQoIHdyYXBwZXJFbG06IEhUTUxFbGVtZW50IHwgbnVsbCwgZGlzcGF0Y2hSZXNpemU6IGJvb2xlYW4gPSB0cnVlICkge1xuXG5cdFx0dGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ID0gd3JhcHBlckVsbTtcblx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnRSZWN0ID0gd3JhcHBlckVsbSA/IHdyYXBwZXJFbG0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgOiBudWxsO1xuXG5cdFx0aWYgKCBkaXNwYXRjaFJlc2l6ZSApIHtcblxuXHRcdFx0dGhpcy5vblJlc2l6ZSgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgb25SZXNpemUoKSB7XG5cblx0XHRpZiAoIHRoaXMucmVuZGVyZXIgPT0gbnVsbCApIHJldHVybjtcblxuXHRcdGNvbnN0IG5ld1dpbmRvd1NpemUgPSBuZXcgVEhSRUUuVmVjdG9yMiggZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0ICk7XG5cdFx0Y29uc3QgbmV3Q2FudmFzU2l6ZSA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudCApIHtcblxuXHRcdFx0bmV3Q2FudmFzU2l6ZS5zZXQoIHRoaXMuaW5mby53cmFwcGVyRWxlbWVudC5jbGllbnRXaWR0aCwgdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmNsaWVudEhlaWdodCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0bmV3Q2FudmFzU2l6ZS5jb3B5KCBuZXdXaW5kb3dTaXplICk7XG5cblx0XHR9XG5cblx0XHRsZXQgcG9ydHJhaXRXZWlnaHQgPSAxLjAgLSAoICggbmV3Q2FudmFzU2l6ZS54IC8gbmV3Q2FudmFzU2l6ZS55ICkgLSB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5wb3J0cmFpdEFzcGVjdCApIC8gKCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5tYWluQXNwZWN0IC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcucG9ydHJhaXRBc3BlY3QgKTtcblx0XHRwb3J0cmFpdFdlaWdodCA9IE1hdGgubWluKCAxLjAsIE1hdGgubWF4KCAwLjAsIHBvcnRyYWl0V2VpZ2h0ICkgKTtcblxuXHRcdGxldCB3aWRlV2VpZ2h0ID0gMS4wIC0gKCAoIG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueSApIC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcud2lkZUFzcGVjdCApIC8gKCB0aGlzLmluZm8uYXNwZWN0U2V0dGluZy5tYWluQXNwZWN0IC0gdGhpcy5pbmZvLmFzcGVjdFNldHRpbmcud2lkZUFzcGVjdCApO1xuXHRcdHdpZGVXZWlnaHQgPSBNYXRoLm1pbiggMS4wLCBNYXRoLm1heCggMC4wLCB3aWRlV2VpZ2h0ICkgKTtcblxuXHRcdHRoaXMuaW5mby5zaXplLndpbmRvd1NpemUuY29weSggbmV3V2luZG93U2l6ZSApO1xuXHRcdHRoaXMuaW5mby5zaXplLndpbmRvd0FzcGVjdFJhdGlvID0gbmV3V2luZG93U2l6ZS54IC8gbmV3V2luZG93U2l6ZS55O1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUuY29weSggbmV3Q2FudmFzU2l6ZSApO1xuXHRcdHRoaXMuaW5mby5zaXplLmNhbnZhc1BpeGVsU2l6ZS5jb3B5KCBuZXdDYW52YXNTaXplLmNsb25lKCkubXVsdGlwbHlTY2FsYXIoIHRoaXMucmVuZGVyZXIuZ2V0UGl4ZWxSYXRpbygpICkgKTtcblx0XHR0aGlzLmluZm8uc2l6ZS5jYW52YXNBc3BlY3RSYXRpbyA9IG5ld0NhbnZhc1NpemUueCAvIG5ld0NhbnZhc1NpemUueTtcblx0XHR0aGlzLmluZm8uc2l6ZS5wb3J0cmFpdFdlaWdodCA9IHBvcnRyYWl0V2VpZ2h0O1xuXHRcdHRoaXMuaW5mby5zaXplLndpZGVXZWlnaHQgPSB3aWRlV2VpZ2h0O1xuXG5cdFx0dGhpcy5yZW5kZXJlci5zZXRQaXhlbFJhdGlvKCB0aGlzLmluZm8uc2l6ZS5waXhlbFJhdGlvICk7XG5cdFx0dGhpcy5yZW5kZXJlci5zZXRTaXplKCB0aGlzLmluZm8uc2l6ZS5jYW52YXNTaXplLngsIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUueSApO1xuXHRcdHRoaXMuY2FtZXJhLmFzcGVjdCA9IHRoaXMuaW5mby5zaXplLmNhbnZhc0FzcGVjdFJhdGlvO1xuXHRcdHRoaXMuY2FtZXJhLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcblxuXHRcdGlmICggdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50ICkge1xuXG5cdFx0XHR0aGlzLmluZm8ud3JhcHBlckVsZW1lbnRSZWN0ID0gdGhpcy5pbmZvLndyYXBwZXJFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgcG9pbnRlckV2ZW50KCBlOiBQb2ludGVyRXZlbnRBcmdzICkge1xuXG5cdFx0Y29uc3QgY2FudmFzUG9pbnRlclBvcyA9IG5ldyBUSFJFRS5WZWN0b3IyKCk7XG5cdFx0Y2FudmFzUG9pbnRlclBvcy5jb3B5KCBlLnBvc2l0aW9uICk7XG5cblx0XHRpZiAoIHRoaXMuaW5mby5jYW52YXMgKSB7XG5cblx0XHRcdGNvbnN0IGNhbnZhc1JlY3QgPSB0aGlzLmluZm8uY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0Y2FudmFzUG9pbnRlclBvcy5zdWIoIG5ldyBUSFJFRS5WZWN0b3IyKCBjYW52YXNSZWN0LngsIGNhbnZhc1JlY3QueSApICk7XG5cblx0XHR9XG5cblx0XHRjb25zdCBzY3JlZW5Qb3NpdGlvbiA9IGNhbnZhc1BvaW50ZXJQb3MuY2xvbmUoKTtcblx0XHRzY3JlZW5Qb3NpdGlvbi5kaXZpZGUoIHRoaXMuaW5mby5zaXplLmNhbnZhc1NpemUgKTtcblx0XHRzY3JlZW5Qb3NpdGlvbi55ID0gMS4wIC0gc2NyZWVuUG9zaXRpb24ueTtcblx0XHRzY3JlZW5Qb3NpdGlvbi5tdWx0aXBseVNjYWxhciggMi4wICkuc3ViU2NhbGFyKCAxLjAgKTtcblxuXG5cdFx0Y29uc3QgYXJnczogVG91Y2hFdmVudEFyZ3MgPSB7XG5cdFx0XHRldmVudDogZS5wb2ludGVyRXZlbnQsXG5cdFx0XHRwb3NpdGlvbjogY2FudmFzUG9pbnRlclBvcy5jbG9uZSgpLFxuXHRcdFx0ZGVsdGE6IGUuZGVsdGEuY2xvbmUoKSxcblx0XHRcdHNjcmVlblBvc2l0aW9uOiBzY3JlZW5Qb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0d2luZG93UG9zaXRpb246IGUucG9zaXRpb24uY2xvbmUoKVxuXHRcdH07XG5cblx0XHRpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnaG92ZXInICkge1xuXG5cdFx0XHR0aGlzLm9uSG92ZXIoIGFyZ3MgKTtcblxuXHRcdH0gZWxzZSBpZiAoIGUucG9pbnRlckV2ZW50VHlwZSA9PSAnc3RhcnQnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hTdGFydCggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdtb3ZlJyApIHtcblxuXHRcdFx0dGhpcy5vblRvdWNoTW92ZSggYXJncyApO1xuXG5cdFx0fSBlbHNlIGlmICggZS5wb2ludGVyRXZlbnRUeXBlID09ICdlbmQnICkge1xuXG5cdFx0XHR0aGlzLm9uVG91Y2hFbmQoIGFyZ3MgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIG9uVG91Y2hTdGFydCggYXJnczogVG91Y2hFdmVudEFyZ3MgKSB7IH1cblxuXHRwdWJsaWMgb25Ub3VjaE1vdmUoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uVG91Y2hFbmQoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uSG92ZXIoIGFyZ3M6IFRvdWNoRXZlbnRBcmdzICkgeyB9XG5cblx0cHVibGljIG9uV2hlZWwoIGV2ZW50OiBXaGVlbEV2ZW50LCB0cmFja3BhZERlbHRhOiBudW1iZXIgKSB7IH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgUG9pbnRlciB9IGZyb20gJy4uL3V0aWxzL1BvaW50ZXInO1xuaW1wb3J0IHsgQmFzZUxheWVyLCBMYXllckJpbmRQYXJhbSB9IGZyb20gJy4vQmFzZUxheWVyJztcblxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBvaW50ZXJFdmVudEFyZ3Mge1xuXHRwb2ludGVyRXZlbnQ6IFBvaW50ZXJFdmVudDtcblx0cG9pbnRlckV2ZW50VHlwZTogc3RyaW5nO1xuXHRwb3NpdGlvbjogVEhSRUUuVmVjdG9yMjtcblx0ZGVsdGE6IFRIUkVFLlZlY3RvcjI7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBDb250cm9sbGVyUGFyYW0ge1xuXHRzaWxlbnQ/OiBib29sZWFuO1xuXHRwb2ludGVyRXZlbnRFbGVtZW50PzogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBjbGFzcyBDb250cm9sbGVyIGV4dGVuZHMgVEhSRUUuRXZlbnREaXNwYXRjaGVyIHtcblxuXHRwdWJsaWMgcG9pbnRlcjogUG9pbnRlcjtcblx0cHVibGljIGNsb2NrOiBUSFJFRS5DbG9jaztcblxuXHRwcm90ZWN0ZWQgbGF5ZXJzOiBCYXNlTGF5ZXJbXSA9IFtdO1xuXHRwcm90ZWN0ZWQgcG9pbnRlckV2ZW50RWxlbWVudD86IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKCBwYXJhbWV0ZXI/OiBDb250cm9sbGVyUGFyYW0gKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0aWYgKCAhICggcGFyYW1ldGVyICYmIHBhcmFtZXRlci5zaWxlbnQgKSApIHtcblxuXHRcdFx0Y29uc29sZS5sb2coIFwiJWMtIG9yZS10aHJlZSBcIiArIHJlcXVpcmUoIFwiLi4vLi4vcGFja2FnZS5qc29uXCIgKS52ZXJzaW9uICsgXCIgLVwiICwgJ3BhZGRpbmc6IDVweCAxMHB4IDtiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgY29sb3I6IHdoaXRlO2ZvbnQtc2l6ZToxMXB4JyApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5jbG9jayA9IG5ldyBUSFJFRS5DbG9jaygpO1xuXG5cdFx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0XHRQb2ludGVyXG5cdFx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cblx0XHR0aGlzLnBvaW50ZXIgPSBuZXcgUG9pbnRlcigpO1xuXHRcdHRoaXMuc2V0UG9pbnRlckV2ZW50RWxlbWVudCggKCBwYXJhbWV0ZXIgJiYgcGFyYW1ldGVyLnBvaW50ZXJFdmVudEVsZW1lbnQgKSB8fCBkb2N1bWVudC5ib2R5ICk7XG5cblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0XHRcdEV2ZW50c1xuXHRcdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0bGV0IHBvaW50ZXJVcGRhdGUgPSB0aGlzLnBvaW50ZXJFdmVudC5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IHBvaW50ZXJXaGVlbCA9IHRoaXMub25XaGVlbC5iaW5kKCB0aGlzICk7XG5cdFx0bGV0IG9yaWVudGF0aW9uY2hhbmdlID0gdGhpcy5vbk9yaWVudGF0aW9uRGV2aWNlLmJpbmQoIHRoaXMgKTtcblx0XHRsZXQgd2luZG93UmVzaXplID0gdGhpcy5vbldpbmRvd1Jlc2l6ZS5iaW5kKCB0aGlzICk7XG5cblx0XHR0aGlzLnBvaW50ZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3VwZGF0ZScsIHBvaW50ZXJVcGRhdGUgKTtcblx0XHR0aGlzLnBvaW50ZXIuYWRkRXZlbnRMaXN0ZW5lciggJ3doZWVsJywgcG9pbnRlcldoZWVsICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uY2hhbmdlICk7XG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB3aW5kb3dSZXNpemUgKTtcblxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggJ2Rpc3Bvc2UnLCAoKSA9PiB7XG5cblx0XHRcdHRoaXMucG9pbnRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAndXBkYXRlJywgcG9pbnRlclVwZGF0ZSApO1xuXHRcdFx0dGhpcy5wb2ludGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd3aGVlbCcsIHBvaW50ZXJXaGVlbCApO1xuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uY2hhbmdlICk7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHdpbmRvd1Jlc2l6ZSApO1xuXG5cdFx0fSApO1xuXG5cdFx0dGhpcy50aWNrKCk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCB0aWNrKCkge1xuXG5cdFx0Y29uc3QgZGVsdGFUaW1lID0gdGhpcy5jbG9jay5nZXREZWx0YSgpO1xuXG5cdFx0dGhpcy5wb2ludGVyLnVwZGF0ZSgpO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5sYXllcnMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHR0aGlzLmxheWVyc1sgaSBdLnRpY2soIGRlbHRhVGltZSApO1xuXG5cdFx0fVxuXG5cdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKCB0aGlzLnRpY2suYmluZCggdGhpcyApICk7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvbldpbmRvd1Jlc2l6ZSgpIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMubGF5ZXJzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0dGhpcy5sYXllcnNbIGkgXS5vblJlc2l6ZSgpO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25PcmllbnRhdGlvbkRldmljZSgpIHtcblxuXHRcdHRoaXMub25XaW5kb3dSZXNpemUoKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIHBvaW50ZXJFdmVudCggZTogVEhSRUUuRXZlbnQgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ucG9pbnRlckV2ZW50KCBlIGFzIHVua25vd24gYXMgUG9pbnRlckV2ZW50QXJncyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgb25XaGVlbCggZTogVEhSRUUuRXZlbnQgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdHRoaXMubGF5ZXJzWyBpIF0ub25XaGVlbCggZS53aGVlbEV2ZW50LCBlLnRyYWNrcGFkRGVsdGEgKTtcblxuXHRcdH1cblxuXHR9XG5cblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QVBJXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdHB1YmxpYyBhZGRMYXllciggbGF5ZXI6IEJhc2VMYXllciwgbGF5ZXJJbmZvOiBMYXllckJpbmRQYXJhbSApIHtcblxuXHRcdHdoaWxlICggdGhpcy5nZXRMYXllciggbGF5ZXJJbmZvLm5hbWUgKSApIHtcblxuXHRcdFx0bGF5ZXJJbmZvLm5hbWUgKz0gJ18nO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5sYXllcnMucHVzaCggbGF5ZXIgKTtcblxuXHRcdGxheWVyLm9uQmluZCggbGF5ZXJJbmZvICk7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRMYXllciggbGF5ZXJOYW1lOiBzdHJpbmcgKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmxheWVycy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGlmICggdGhpcy5sYXllcnNbIGkgXS5pbmZvLm5hbWUgPT0gbGF5ZXJOYW1lICkgcmV0dXJuIHRoaXMubGF5ZXJzWyBpIF07XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblxuXHR9XG5cblx0cHVibGljIHJlbW92ZUxheWVyKCBsYXllck5tYWU6IHN0cmluZyApIHtcblxuXHRcdGZvciAoIGxldCBpID0gdGhpcy5sYXllcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC0tICkge1xuXG5cdFx0XHRjb25zdCBsYXllciA9IHRoaXMubGF5ZXJzWyBpIF07XG5cblx0XHRcdGlmICggbGF5ZXIuaW5mby5uYW1lID09IGxheWVyTm1hZSApIHtcblxuXHRcdFx0XHRsYXllci5vblVuYmluZCgpO1xuXG5cdFx0XHRcdHRoaXMubGF5ZXJzLnNwbGljZSggaSwgMSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRQb2ludGVyRXZlbnRFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0aWYgKCB0aGlzLnBvaW50ZXJFdmVudEVsZW1lbnQgKSB7XG5cblx0XHRcdHRoaXMucG9pbnRlci51bnJlZ2lzdGVyRWxlbWVudCggdGhpcy5wb2ludGVyRXZlbnRFbGVtZW50ICk7XG5cblx0XHR9XG5cblx0XHR0aGlzLnBvaW50ZXIucmVnaXN0ZXJFbGVtZW50KCBlbG0gKTtcblxuXHRcdHRoaXMucG9pbnRlckV2ZW50RWxlbWVudCA9IGVsbTtcblxuXHR9XG5cblx0cHVibGljIGRpc3Bvc2UoKSB7XG5cblx0XHR0aGlzLmxheWVycy5mb3JFYWNoKCBpdGVtID0+IHtcblxuXHRcdFx0dGhpcy5yZW1vdmVMYXllciggaXRlbS5pbmZvLm5hbWUgKTtcblxuXHRcdH0gKTtcblxuXHRcdHRoaXMudGljayA9ICgpID0+IHtcblxuXHRcdFx0cmV0dXJuO1xuXG5cdFx0fTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCggeyB0eXBlOiAnZGlzcG9zZScgfSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgVW5pZm9ybXMgfSBmcm9tICcuLi9Vbmlmb3Jtcyc7XHJcbmltcG9ydCB7IEZDdXJ2ZUdyb3VwIH0gZnJvbSAnLi9GQ3VydmVHcm91cCc7XHJcblxyXG5leHBvcnQgdHlwZSBBbmltYXRpb25GcmFtZUluZm8gPSB7XHJcblx0c3RhcnQ6IG51bWJlclxyXG5cdGVuZDogbnVtYmVyXHJcblx0ZHVyYXRpb246IG51bWJlclxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5pbWF0aW9uQWN0aW9uIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgY3VydmVzOiB7W2tleTpzdHJpbmddOkZDdXJ2ZUdyb3VwfSA9IHt9O1xyXG5cdHByaXZhdGUgdW5pZm9ybXM6IFVuaWZvcm1zO1xyXG5cdFxyXG5cdHB1YmxpYyBmcmFtZTogQW5pbWF0aW9uRnJhbWVJbmZvO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggbmFtZT86IHN0cmluZyApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XHJcblx0XHR0aGlzLnVuaWZvcm1zID0ge307XHJcblxyXG5cdFx0dGhpcy5mcmFtZSA9IHtcclxuXHRcdFx0c3RhcnQ6IDAsXHJcblx0XHRcdGVuZDogMCxcclxuXHRcdFx0ZHVyYXRpb246IDAsXHJcblx0XHR9XHJcblx0XHRcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGRGY3VydmVHcm91cCggcHJvcGVydHlOYW1lOiBzdHJpbmcsIGZjdXJ2ZUdyb3VwOiBGQ3VydmVHcm91cCApIHtcclxuXHJcblx0XHR0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF0gPSBmY3VydmVHcm91cDtcclxuXHJcblx0XHR0aGlzLmNhbGNGcmFtZSgpO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZW1vdmVGQ3VydmUoIHByb3BlcnR5TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGRlbGV0ZSB0aGlzLmN1cnZlc1sgcHJvcGVydHlOYW1lIF07XHJcblxyXG5cdFx0dGhpcy5jYWxjRnJhbWUoKTtcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjYWxjRnJhbWUoKSB7XHJcblxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlcyApXHJcblxyXG5cdFx0bGV0IG1pblN0YXJ0ID0gSW5maW5pdHlcclxuXHRcdGxldCBtYXhFbmQgPSAtSW5maW5pdHlcclxuXHRcdFxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgY3VydmVLZXlzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0bGV0IGN1cnZlID0gKHRoaXMuY3VydmVzKVsgY3VydmVLZXlzWyBpIF0gXTtcclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZVN0YXJ0IDwgbWluU3RhcnQgKSB7XHJcblxyXG5cdFx0XHRcdG1pblN0YXJ0ID0gY3VydmUuZnJhbWVTdGFydDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoIGN1cnZlLmZyYW1lRW5kID4gbWF4RW5kICkge1xyXG5cclxuXHRcdFx0XHRtYXhFbmQgPSBjdXJ2ZS5mcmFtZUVuZDtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiggbWluU3RhcnQgPT0gLUluZmluaXR5IHx8IG1heEVuZCA9PSBJbmZpbml0eSkge1xyXG5cclxuXHRcdFx0bWluU3RhcnQgPSAwO1xyXG5cdFx0XHRtYXhFbmQgPSAxXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZnJhbWUuc3RhcnQgPSBtaW5TdGFydDtcclxuXHRcdHRoaXMuZnJhbWUuZW5kID0gbWF4RW5kO1xyXG5cdFx0dGhpcy5mcmFtZS5kdXJhdGlvbiA9IHRoaXMuZnJhbWUuZW5kIC0gdGhpcy5mcmFtZS5zdGFydDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0RkN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZTogc3RyaW5nICk6IEZDdXJ2ZUdyb3VwIHwgbnVsbCB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuY3VydmVzWyBwcm9wZXJ0eU5hbWUgXSB8fCBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0Z2V0IHZhbHVlc1xyXG5cdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRwdWJsaWMgYXNzaWduVW5pZm9ybXMoIHByb3BlcnR5TmFtZTogc3RyaW5nLCB1bmlmb3JtOiBUSFJFRS5JVW5pZm9ybSApIHtcclxuXHJcblx0XHR0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSA9IHVuaWZvcm07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFVuaWZvcm1zPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBUSFJFRS5JVW5pZm9ybTxUPiB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF0gKSB7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gdGhpcy51bmlmb3Jtc1sgcHJvcGVydHlOYW1lIF07XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRsZXQgY3VydmVHcm91cCA9IHRoaXMuZ2V0RkN1cnZlR3JvdXAocHJvcGVydHlOYW1lKVxyXG5cclxuXHRcdGlmKCBjdXJ2ZUdyb3VwICkge1xyXG5cdFx0XHRcclxuXHRcdFx0bGV0IHVuaSA9IHtcclxuXHRcdFx0XHR2YWx1ZTogY3VydmVHcm91cC5jcmVhdGVJbml0VmFsdWUoKSBhcyBUXHJcblx0XHRcdH07XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnVuaWZvcm1zWyBwcm9wZXJ0eU5hbWUgXSA9IHVuaTtcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiB1bmk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYWx1ZTxUIGV4dGVuZHMgVEhSRUUuVmVjdG9yMiB8IFRIUkVFLlZlY3RvcjMgfCBUSFJFRS5WZWN0b3I0IHwgVEhSRUUuRXVsZXIgfCBudW1iZXI+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZyApOiBUIHwgbnVsbDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWU8VCBleHRlbmRzIFRIUkVFLlZlY3RvcjIgfCBUSFJFRS5WZWN0b3IzIHwgVEhSRUUuVmVjdG9yNCB8IFRIUkVFLkV1bGVyID4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCB0YXJnZXQ6IFQgKTogVDtcclxuXHRcclxuXHRwdWJsaWMgZ2V0VmFsdWUoIHByb3BlcnR5TmFtZTogc3RyaW5nLCB0YXJnZXQ/OiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciApOiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGxldCB1bmlmb3JtID0gdGhpcy5nZXRVbmlmb3Jtcyhwcm9wZXJ0eU5hbWUpO1xyXG5cclxuXHRcdGlmKCAhdW5pZm9ybSApIHJldHVybiB0YXJnZXQgfHwgbnVsbDtcclxuXHJcblx0XHRsZXQgdmFsdWUgPSB1bmlmb3JtLnZhbHVlO1xyXG5cdFx0XHJcblx0XHRpZiggIXRhcmdldCApIHJldHVybiB2YWx1ZTtcclxuXHJcblx0XHRpZiggdHlwZW9mIHZhbHVlID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LnggPSB2YWx1ZTtcclxuXHJcblx0XHRcdHJldHVybiB0YXJnZXQ7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRhcmdldC54ID0gdmFsdWUueDtcclxuXHRcdHRhcmdldC55ID0gdmFsdWUueTtcclxuXHJcblx0XHRpZiggJ3onIGluIHRhcmdldCAmJiAneicgaW4gdmFsdWUgKSB7XHJcblxyXG5cdFx0XHR0YXJnZXQueiA9IHZhbHVlLnpcclxuXHRcdFx0XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoICd3JyBpbiB0YXJnZXQgJiYgJ3cnIGluIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGFyZ2V0LncgPSB2YWx1ZS53XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGFyZ2V0IHx8IG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlQXQ8VCBleHRlbmRzIG51bWJlcj4oIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyICk6IFQgfCBudWxsO1xyXG5cdFxyXG5cdHB1YmxpYyBnZXRWYWx1ZUF0PFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciA+KCBwcm9wZXJ0eU5hbWU6IHN0cmluZywgZnJhbWU6IG51bWJlciwgdGFyZ2V0OiBUICk6IFQ7XHJcblx0XHJcblx0cHVibGljIGdldFZhbHVlQXQoIHByb3BlcnR5TmFtZTogc3RyaW5nLCBmcmFtZTogbnVtYmVyLCB0YXJnZXQ/OiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciApOiBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlciB8IG51bWJlciB8IG51bGwge1xyXG5cclxuXHRcdGxldCBjdXJ2ZSA9IHRoaXMuZ2V0RkN1cnZlR3JvdXAoIHByb3BlcnR5TmFtZSApO1xyXG5cclxuXHRcdGlmKCB0YXJnZXQgKSAge1xyXG5cclxuXHRcdFx0aWYoICFjdXJ2ZSApIHJldHVybiB0YXJnZXQ7XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gY3VydmUuZ2V0VmFsdWUoIGZyYW1lIHx8IDAsIHRhcmdldCApXHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGlmKCAhY3VydmUgKSByZXR1cm4gbnVsbDtcclxuXHRcdFx0XHRcclxuXHRcdFx0cmV0dXJuIGN1cnZlLmdldFZhbHVlKCBmcmFtZSApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdFVwZGF0ZUZyYW1lXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblx0XHJcblx0cHVibGljIHVwZGF0ZUZyYW1lKCBmcmFtZTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggdGhpcy5jdXJ2ZXMgKTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGZjdXJ2ZUdyb3VwID0gdGhpcy5jdXJ2ZXNbIGN1cnZlS2V5c1sgaSBdIF07XHJcblx0XHRcdGxldCB1bmkgPSB0aGlzLmdldFVuaWZvcm1zKCBjdXJ2ZUtleXNbIGkgXSApO1xyXG5cclxuXHRcdFx0aWYoICF1bmkgKSBjb250aW51ZTtcclxuXHJcblx0XHRcdGlmKCB0eXBlb2YgdW5pLnZhbHVlID09ICdudW1iZXInICkge1xyXG5cclxuXHRcdFx0XHR1bmkudmFsdWUgPSBmY3VydmVHcm91cC5nZXRWYWx1ZShmcmFtZSkgfHwgMFxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRmY3VydmVHcm91cC5nZXRWYWx1ZShmcmFtZSwgdW5pLnZhbHVlKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZW1pdEV2ZW50KCd1cGRhdGUnLCBbdGhpc10gKTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJ3dvbGZ5ODctZXZlbnRlbWl0dGVyJztcclxuaW1wb3J0IHsgRkN1cnZlS2V5RnJhbWUgfSBmcm9tICcuL0ZDdXJ2ZUtleUZyYW1lJztcclxuXHJcbmV4cG9ydCB0eXBlIEZDdXJ2ZUF4aXMgPSAneCcgfCAneScgfCAneicgfCAndycgfCAnc2NhbGFyJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcblxyXG5cdHB1YmxpYyBrZXlmcmFtZXM6IEZDdXJ2ZUtleUZyYW1lW10gPSBbXTtcclxuXHJcblx0cHJpdmF0ZSBjYWNoZTogeyBmcmFtZTogbnVtYmVyLCB2YWx1ZTogbnVtYmVyIH0gPSB7IGZyYW1lOiBOYU4sIHZhbHVlOiBOYU4gfTtcclxuXHJcblx0cHVibGljIGZyYW1lU3RhcnQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlcjtcclxuXHRwdWJsaWMgZnJhbWVEdXJhdGlvbjogbnVtYmVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggZnJhbWVzPzogRkN1cnZlS2V5RnJhbWVbXSApIHtcclxuXHJcblx0XHRzdXBlcigpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLnNldCggZnJhbWVzICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCggZnJhbWVzPzogRkN1cnZlS2V5RnJhbWVbXSApIHtcclxuXHJcblx0XHRpZiAoIGZyYW1lcyApIHtcclxuXHJcblx0XHRcdHRoaXMua2V5ZnJhbWVzLmxlbmd0aCA9IDA7XHJcblxyXG5cdFx0XHRmcmFtZXMuZm9yRWFjaCgga2V5ZnJhbWUgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLmFkZEtleUZyYW1lKCBrZXlmcmFtZSApO1xyXG5cclxuXHRcdFx0fSApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkS2V5RnJhbWUoIGtleWZyYW1lOiBGQ3VydmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRsZXQgaW5kZXggPSAwO1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMua2V5ZnJhbWVzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBmcmFtZSA9IHRoaXMua2V5ZnJhbWVzWyBpIF07XHJcblxyXG5cdFx0XHRpZiAoIGZyYW1lLmNvb3JkaW5hdGUueCA8IGtleWZyYW1lLmNvb3JkaW5hdGUueCApIHtcclxuXHJcblx0XHRcdFx0aW5kZXggKys7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5rZXlmcmFtZXMuc3BsaWNlKCBpbmRleCwgMCwga2V5ZnJhbWUgKTtcclxuXHJcblx0XHQvLyBzZXQgZnJhbWUgaW5mb1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSB0aGlzLmtleWZyYW1lc1swXS5jb29yZGluYXRlLnhcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSB0aGlzLmtleWZyYW1lc1t0aGlzLmtleWZyYW1lcy5sZW5ndGggLSAxXS5jb29yZGluYXRlLnhcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWUoIGZyYW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0aWYgKCBmcmFtZSA9PSB0aGlzLmNhY2hlLmZyYW1lICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuY2FjaGUudmFsdWU7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB2YWx1ZTogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5rZXlmcmFtZXMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0bGV0IGtleWZyYW1lID0gdGhpcy5rZXlmcmFtZXNbIGkgXTtcclxuXHJcblx0XHRcdGlmICggZnJhbWUgPD0ga2V5ZnJhbWUuY29vcmRpbmF0ZS54ICkge1xyXG5cclxuXHRcdFx0XHRsZXQgYmVmb3JlS2V5RnJhbWUgPSB0aGlzLmtleWZyYW1lc1sgaSAtIDEgXTtcclxuXHJcblx0XHRcdFx0aWYgKCBiZWZvcmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGJlZm9yZUtleUZyYW1lLnRvKCBrZXlmcmFtZSwgZnJhbWUgKTtcclxuXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0XHR2YWx1ZSA9IGtleWZyYW1lLmNvb3JkaW5hdGUueTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB2YWx1ZSA9PT0gbnVsbCAmJiB0aGlzLmtleWZyYW1lcy5sZW5ndGggPiAwICkge1xyXG5cclxuXHRcdFx0dmFsdWUgPSB0aGlzLmtleWZyYW1lc1sgdGhpcy5rZXlmcmFtZXMubGVuZ3RoIC0gMSBdLmNvb3JkaW5hdGUueTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB2YWx1ZSAhPT0gbnVsbCApIHtcclxuXHJcblx0XHRcdHRoaXMuY2FjaGUgPSB7XHJcblx0XHRcdFx0ZnJhbWU6IGZyYW1lLFxyXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gMDtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBGQ3VydmUsIEZDdXJ2ZUF4aXMgfSBmcm9tICcuL0ZDdXJ2ZSc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVHcm91cFR5cGUgPSAnc2NhbGFyJyB8ICd2ZWMyJyB8ICd2ZWMzJyB8ICd2ZWM0J1xyXG5cclxuZXhwb3J0IGNsYXNzIEZDdXJ2ZUdyb3VwIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuXHJcblx0cHVibGljIG5hbWU6IHN0cmluZztcclxuXHRwdWJsaWMgY3VydmU6IHtbYXhpcyBpbiBGQ3VydmVBeGlzXTogRkN1cnZlIHwgbnVsbH07XHJcblx0cHVibGljIHR5cGU6IEZDdXJ2ZUdyb3VwVHlwZSA9ICdzY2FsYXInO1xyXG5cclxuXHRwdWJsaWMgZnJhbWVTdGFydDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUVuZDogbnVtYmVyO1xyXG5cdHB1YmxpYyBmcmFtZUR1cmF0aW9uOiBudW1iZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBuYW1lPzogc3RyaW5nLCB4PzogRkN1cnZlLCB5PzogRkN1cnZlLCB6PzogRkN1cnZlLCB3PzogRkN1cnZlLCBzY2FsYXI/OiBGQ3VydmUgKSB7XHJcblxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xyXG5cdFx0XHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSAwO1xyXG5cdFx0dGhpcy5mcmFtZUVuZCA9IDA7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSAwO1xyXG5cdFx0XHJcblx0XHR0aGlzLmN1cnZlID0ge1xyXG5cdFx0XHR4OiBudWxsLFxyXG5cdFx0XHR5OiBudWxsLFxyXG5cdFx0XHR6OiBudWxsLFxyXG5cdFx0XHR3OiBudWxsLFxyXG5cdFx0XHRzY2FsYXI6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0aWYoIHggKSB7XHJcblxyXG5cdFx0XHR0aGlzLnNldEZDdXJ2ZSggeCwgJ3gnIClcclxuXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKCB5ICkge1xyXG5cclxuXHRcdFx0dGhpcy5zZXRGQ3VydmUoIHksICd5JyApXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZiggeiApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB6LCAneicgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHRpZiggdyApIHtcclxuXHJcblx0XHRcdHRoaXMuc2V0RkN1cnZlKCB3LCAndycgKVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0RkN1cnZlKCBjdXJ2ZTogRkN1cnZlLCBheGlzOiBGQ3VydmVBeGlzICkge1xyXG5cclxuXHRcdHRoaXMuY3VydmVbIGF4aXMgXSA9IGN1cnZlO1xyXG5cclxuXHRcdHRoaXMuY2FsY1R5cGUoKTtcclxuXHRcdHRoaXMuY2FsY0ZyYW1lKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNhbGNUeXBlKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy5jdXJ2ZS5zY2FsYXIgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmN1cnZlLncgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAndmVjNCc7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy5jdXJ2ZS56ICkge1xyXG5cclxuXHRcdFx0dGhpcy50eXBlID0gJ3ZlYzMnO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMuY3VydmUueSApIHtcclxuXHJcblx0XHRcdHRoaXMudHlwZSA9ICd2ZWMyJztcclxuXHJcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmN1cnZlLnggKSB7XHJcblxyXG5cdFx0XHR0aGlzLnR5cGUgPSAnc2NhbGFyJztcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHRcclxuXHRwcml2YXRlIGNhbGNGcmFtZSgpIHtcclxuXHRcdFxyXG5cdFx0bGV0IGN1cnZlS2V5cyA9IE9iamVjdC5rZXlzKCB0aGlzLmN1cnZlIClcclxuXHJcblx0XHRsZXQgbWluU3RhcnQgPSBJbmZpbml0eVxyXG5cdFx0bGV0IG1heEVuZCA9IC1JbmZpbml0eVxyXG5cdFx0XHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBjdXJ2ZUtleXMubGVuZ3RoOyBpKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgY3VydmUgPSAodGhpcy5jdXJ2ZSBhcyB7W2tleTogc3RyaW5nXTogRkN1cnZlfSlbIGN1cnZlS2V5c1sgaSBdIF07XHJcblxyXG5cdFx0XHRpZiggIWN1cnZlICkgY29udGludWU7XHJcblxyXG5cdFx0XHRpZiggY3VydmUuZnJhbWVTdGFydCA8IG1pblN0YXJ0ICkge1xyXG5cclxuXHRcdFx0XHRtaW5TdGFydCA9IGN1cnZlLmZyYW1lU3RhcnQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKCBjdXJ2ZS5mcmFtZUVuZCA+IG1heEVuZCApIHtcclxuXHJcblx0XHRcdFx0bWF4RW5kID0gY3VydmUuZnJhbWVFbmQ7XHJcblx0XHRcdFx0XHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIG1pblN0YXJ0ID09IC1JbmZpbml0eSB8fCBtYXhFbmQgPT0gSW5maW5pdHkpIHtcclxuXHJcblx0XHRcdG1pblN0YXJ0ID0gMDtcclxuXHRcdFx0bWF4RW5kID0gMVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmZyYW1lU3RhcnQgPSBtaW5TdGFydDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSBtYXhFbmQ7XHJcblx0XHR0aGlzLmZyYW1lRHVyYXRpb24gPSB0aGlzLmZyYW1lRW5kIC0gdGhpcy5mcmFtZVN0YXJ0O1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBjcmVhdGVJbml0VmFsdWUoKSB7XHJcblxyXG5cdFx0aWYgKCB0aGlzLnR5cGUgPT0gJ3ZlYzInICkge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKCk7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdGhpcy50eXBlID09ICd2ZWMzJyApIHtcclxuXHJcblx0XHRcdHJldHVybiBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHRoaXMudHlwZSA9PSAndmVjNCcgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gbmV3IFRIUkVFLlZlY3RvcjQoKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIDA7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlcj4oIGZyYW1lOiBudW1iZXIsIHRhcmdldDogVCApOiBUO1xyXG5cclxuXHRwdWJsaWMgZ2V0VmFsdWUoIGZyYW1lOiBudW1iZXIgKTogbnVtYmVyIHwgbnVsbDtcclxuXHJcblx0cHVibGljIGdldFZhbHVlPFQgZXh0ZW5kcyBUSFJFRS5WZWN0b3IyIHwgVEhSRUUuVmVjdG9yMyB8IFRIUkVFLlZlY3RvcjQgfCBUSFJFRS5FdWxlcj4oIGZyYW1lOiBudW1iZXIsIHRhcmdldD86IFQpOiBUIHwgbnVtYmVyIHwgbnVsbCB7XHJcblxyXG5cdFx0aWYoIHRhcmdldCApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS54ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueCA9IHRoaXMuY3VydmUueC5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS55ICkge1xyXG5cclxuXHRcdFx0XHR0YXJnZXQueSA9IHRoaXMuY3VydmUueS5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICggdGhpcy5jdXJ2ZS56ICYmICd6JyBpbiB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC56ID0gdGhpcy5jdXJ2ZS56LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLncgICYmICd3JyBpbiB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRcdHRhcmdldC53ID0gdGhpcy5jdXJ2ZS53LmdldFZhbHVlKCBmcmFtZSApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRhcmdldDtcclxuXHRcdFx0XHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLmN1cnZlLnNjYWxhciApIHtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0cmV0dXJuICB0aGlzLmN1cnZlLnNjYWxhci5nZXRWYWx1ZSggZnJhbWUgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cclxuXHRcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnd29sZnk4Ny1ldmVudGVtaXR0ZXInO1xyXG5pbXBvcnQgeyBFYXNpbmdGdW5jLCBFYXNpbmdzIH0gZnJvbSAnLi4vRWFzaW5ncyc7XHJcblxyXG5leHBvcnQgdHlwZSBGQ3VydmVJbnRlcnBvbGF0aW9uID0gXCJCRVpJRVJcIiB8IFwiTElORUFSXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRkN1cnZlS2V5RnJhbWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHRwdWJsaWMgY29vcmRpbmF0ZTogVEhSRUUuVmVjMiA9IHsgeDogMCwgeTogMCB9O1xyXG5cdHB1YmxpYyBoYW5kbGVMZWZ0OiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGhhbmRsZVJpZ2h0OiBUSFJFRS5WZWMyID0geyB4OiAwLCB5OiAwIH07XHJcblx0cHVibGljIGludGVycG9sYXRpb246IEZDdXJ2ZUludGVycG9sYXRpb24gPSAnQkVaSUVSJztcclxuXHJcblx0cHJpdmF0ZSBlYXNpbmc6IEVhc2luZ0Z1bmMgfCBudWxsID0gbnVsbDtcclxuXHRwcml2YXRlIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUgfCBudWxsID0gbnVsbDtcclxuXHJcblx0Y29uc3RydWN0b3IoIGNvb3JkaW5hdGU6IFRIUkVFLlZlYzIsIGhhbmRsZUxlZnQ/OiBUSFJFRS5WZWMyLCBoYW5kbGVSaWdodD86IFRIUkVFLlZlYzIsIGludGVycG9sYXRpb24/OiBGQ3VydmVJbnRlcnBvbGF0aW9uICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0dGhpcy5zZXQoIGNvb3JkaW5hdGUsIGhhbmRsZUxlZnQsIGhhbmRsZVJpZ2h0LCBpbnRlcnBvbGF0aW9uICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldCggY29vcmRpbmF0ZTogVEhSRUUuVmVjMiwgaGFuZGxlTGVmdD86IFRIUkVFLlZlYzIsIGhhbmRsZVJpZ2h0PzogVEhSRUUuVmVjMiwgaW50ZXJwb2xhdGlvbj86IEZDdXJ2ZUludGVycG9sYXRpb24gKSB7XHJcblxyXG5cdFx0dGhpcy5jb29yZGluYXRlID0gY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaGFuZGxlTGVmdCA9IGhhbmRsZUxlZnQgfHwgY29vcmRpbmF0ZTtcclxuXHRcdHRoaXMuaGFuZGxlUmlnaHQgPSBoYW5kbGVSaWdodCB8fCBjb29yZGluYXRlO1xyXG5cdFx0dGhpcy5pbnRlcnBvbGF0aW9uID0gaW50ZXJwb2xhdGlvbiB8fCAnQkVaSUVSJztcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEVhc2luZyggaW50ZXJwb2xhdGlvbjogRkN1cnZlSW50ZXJwb2xhdGlvbiwgbmV4dEZyYW1lOiBGQ3VydmVLZXlGcmFtZSApIHtcclxuXHJcblx0XHRpZiAoIGludGVycG9sYXRpb24gPT0gJ0JFWklFUicgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gRWFzaW5ncy5iZXppZXIoIHRoaXMuY29vcmRpbmF0ZSwgdGhpcy5oYW5kbGVSaWdodCwgbmV4dEZyYW1lLmhhbmRsZUxlZnQsIG5leHRGcmFtZS5jb29yZGluYXRlICk7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHJldHVybiAoIHQ6IG51bWJlciApID0+IHtcclxuXHJcblx0XHRcdFx0bGV0IGQgPSAoIG5leHRGcmFtZS5jb29yZGluYXRlLnkgLSB0aGlzLmNvb3JkaW5hdGUueSApO1xyXG5cdFx0XHRcdHQgPSAoIHQgLSB0aGlzLmNvb3JkaW5hdGUueCApIC8gKCBuZXh0RnJhbWUuY29vcmRpbmF0ZS54IC0gdGhpcy5jb29yZGluYXRlLnggKTtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY29vcmRpbmF0ZS55ICsgdCAqIGQ7XHJcblxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgdG8oIG5leHRGcmFtZTogRkN1cnZlS2V5RnJhbWUsIHQ6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoIHRoaXMubmV4dEZyYW1lID09IG51bGwgfHwgdGhpcy5uZXh0RnJhbWUuY29vcmRpbmF0ZS54ICE9IG5leHRGcmFtZS5jb29yZGluYXRlLnggfHwgdGhpcy5uZXh0RnJhbWUuY29vcmRpbmF0ZS55ICE9IG5leHRGcmFtZS5jb29yZGluYXRlLnkgKSB7XHJcblxyXG5cdFx0XHR0aGlzLmVhc2luZyA9IHRoaXMuZ2V0RWFzaW5nKCB0aGlzLmludGVycG9sYXRpb24sIG5leHRGcmFtZSApO1xyXG5cdFx0XHR0aGlzLm5leHRGcmFtZSA9IG5leHRGcmFtZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCB0aGlzLmVhc2luZyApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmVhc2luZyggdCApO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHsgRWFzaW5ncywgRWFzaW5nRnVuYyB9IGZyb20gXCIuL0Vhc2luZ3NcIjtcbmltcG9ydCB7IExlcnBGdW5jLCBMZXJwcyB9IGZyb20gXCIuL0xlcnBzXCI7XG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gXCIuL1VuaWZvcm1zXCI7XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhcmlhYmxlPFQ+e1xuXHR0aW1lOiBudW1iZXI7XG5cdGR1cmF0aW9uPzogbnVtYmVyO1xuXHR2YWx1ZTogVDtcblx0c3RhcnRWYWx1ZTogVDtcblx0Z29hbFZhbHVlOiBUO1xuXHRvbkFuaW1hdGlvbkZpbmlzaGVkPzogRnVuY3Rpb24gfCBudWxsO1xuXHRsZXJwRnVuYz86IExlcnBGdW5jPFQ+O1xuXHRlYXNpbmc6IEVhc2luZ0Z1bmM7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRvclZhbGlhYmxlUGFyYW1zPFQ+IHtcblx0bmFtZTogc3RyaW5nO1xuXHRpbml0VmFsdWU6IFQ7XG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XG5cdGN1c3RvbUxlcnBGdW5jPzogTGVycEZ1bmM8VD47XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRvciBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XG5cblx0cHJvdGVjdGVkIHZhcmlhYmxlczogeyBbIGtleTogc3RyaW5nIF06IEFuaW1hdG9yVmFyaWFibGU8YW55PiB9O1xuXHRwcm90ZWN0ZWQgX2lzQW5pbWF0aW5nOiBib29sZWFuID0gZmFsc2U7XG5cdHByb3RlY3RlZCBhbmltYXRpbmdDb3VudDogbnVtYmVyID0gMDtcblx0cHJvdGVjdGVkIGRpc3BhdGNoRXZlbnRzOiBGdW5jdGlvbltdID0gW107XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy52YXJpYWJsZXMgPSB7fTtcblxuXHR9XG5cblx0cHVibGljIGdldCBpc0FuaW1hdGluZygpIHtcblxuXHRcdHJldHVybiB0aGlzLl9pc0FuaW1hdGluZztcblxuXHR9XG5cblx0cHVibGljIGFkZDxUPiggcGFyYW1zOiBBbmltYXRvclZhbGlhYmxlUGFyYW1zPFQ+ICkge1xuXG5cdFx0bGV0IGxlcnBGdW5jID0gcGFyYW1zLmN1c3RvbUxlcnBGdW5jIHx8IExlcnBzLmdldExlcnBGdW5jKCBwYXJhbXMuaW5pdFZhbHVlICk7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB7XG5cdFx0XHR0aW1lOiAtIDEsXG5cdFx0XHR2YWx1ZTogcGFyYW1zLmluaXRWYWx1ZSxcblx0XHRcdHN0YXJ0VmFsdWU6IHBhcmFtcy5pbml0VmFsdWUsXG5cdFx0XHRnb2FsVmFsdWU6IG51bGwsXG5cdFx0XHRlYXNpbmc6IHBhcmFtcy5lYXNpbmcgfHwgRWFzaW5ncy5zaWdtb2lkKCksXG5cdFx0XHRsZXJwRnVuYzogbGVycEZ1bmMsXG5cdFx0fTtcblxuXHRcdHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdID0gdmFyaWFibGU7XG5cblx0XHRyZXR1cm4gdmFyaWFibGU7XG5cblx0fVxuXG5cdHB1YmxpYyBzZXRFYXNpbmcoIG5hbWU6IHN0cmluZywgZWFzaW5nOiBFYXNpbmdGdW5jICkge1xuXG5cdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdGlmICggdmFyaWFibGUgKSB7XG5cblx0XHRcdHZhcmlhYmxlLmVhc2luZyA9IGVhc2luZztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBhbmltYXRlPFQ+KCBuYW1lOiBzdHJpbmcsIGdvYWxWYWx1ZTogVCwgZHVyYXRpb246IG51bWJlciA9IDEsIGNhbGxiYWNrPzogRnVuY3Rpb24sIGVhc2luZz86IEVhc2luZ0Z1bmMgKSB7XG5cblx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xuXHRcdGxldCBwcm9taXNlID0gbmV3IFByb21pc2UoIHJlc29sdmUgPT4ge1xuXG5cdFx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHRcdGlmICggZHVyYXRpb24gPD0gMCApIHtcblxuXHRcdFx0XHRcdHRoaXMuc2V0VmFsdWUoIG5hbWUsIGdvYWxWYWx1ZSApO1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudGltZSA9IDEuMDtcblx0XHRcdFx0XHR2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkID0gKCkgPT4ge1xuXG5cdFx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0cmVzb2x2ZSggbnVsbCApO1xuXG5cdFx0XHRcdFx0fTtcblxuXHRcdFx0XHRcdHJldHVybjtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS50aW1lID09IC0gMSApIHtcblxuXHRcdFx0XHRcdHRoaXMuX2lzQW5pbWF0aW5nID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmFuaW1hdGluZ0NvdW50ICsrO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHR2YXJpYWJsZS50aW1lID0gMDtcblx0XHRcdFx0dmFyaWFibGUuZHVyYXRpb24gPSBkdXJhdGlvbjtcblx0XHRcdFx0dmFyaWFibGUuc3RhcnRWYWx1ZSA9IHZhcmlhYmxlLnZhbHVlO1xuXHRcdFx0XHR2YXJpYWJsZS5nb2FsVmFsdWUgPSBnb2FsVmFsdWU7XG5cdFx0XHRcdHZhcmlhYmxlLm9uQW5pbWF0aW9uRmluaXNoZWQgPSAoKSA9PiB7XG5cblx0XHRcdFx0XHRjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuXHRcdFx0XHRcdHJlc29sdmUoIG51bGwgKTtcblxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmICggZWFzaW5nICkge1xuXG5cdFx0XHRcdFx0dGhpcy5zZXRFYXNpbmcoIG5hbWUsIGVhc2luZyApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0XHR9XG5cblx0XHR9ICk7XG5cblx0XHRyZXR1cm4gcHJvbWlzZTtcblxuXHR9XG5cblx0cHVibGljIGNhbmNlbEFuaW1hdGUoIG5hbWU6IHN0cmluZyApIHtcblxuXHRcdGxldCB2YXJpYWJsZSA9IHRoaXMudmFyaWFibGVzWyBuYW1lIF07XG5cblx0XHRpZiAoIHZhcmlhYmxlICkge1xuXG5cdFx0XHR2YXJpYWJsZS50aW1lID0gMS4wO1xuXHRcdFx0dmFyaWFibGUub25BbmltYXRpb25GaW5pc2hlZCA9IG51bGw7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgc2V0VmFsdWU8VD4oIG5hbWU6IHN0cmluZywgdmFsdWU6IFQgKSB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHRoaXMudmFyaWFibGVzWyBuYW1lIF0udmFsdWUgPSB2YWx1ZTtcblx0XHRcdHRoaXMuY2FuY2VsQW5pbWF0ZSggbmFtZSApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBnZXQ8VD4oIG5hbWU6IHN0cmluZyApOiBUIHwgbnVsbCB7XG5cblx0XHRpZiAoIHRoaXMudmFyaWFibGVzWyBuYW1lIF0gKSB7XG5cblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdLnZhbHVlO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUPiggbmFtZTogc3RyaW5nLCBtdXRlOiBib29sZWFuID0gZmFsc2UgKTogQW5pbWF0b3JWYXJpYWJsZTxUPiB8IG51bGwge1xuXG5cdFx0aWYgKCB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdICkge1xuXG5cdFx0XHRyZXR1cm4gdGhpcy52YXJpYWJsZXNbIG5hbWUgXTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggISBtdXRlICkge1xuXG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ1wiJyArIG5hbWUgKyAnXCInICsgJyBpcyBub3QgZXhpc3QnICk7XG5cblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyBpc0FuaW1hdGluZ1ZhcmlhYmxlKCBuYW1lOiBzdHJpbmcsIG11dGU6IGJvb2xlYW4gPSBmYWxzZSApIHtcblxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcblxuXHRcdFx0bGV0IHRpbWUgPSB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdLnRpbWU7XG5cblx0XHRcdHJldHVybiB0aW1lICE9IC0gMS4wO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0aWYgKCAhIG11dGUgKSB7XG5cblx0XHRcdFx0Y29uc29sZS53YXJuKCAnXCInICsgbmFtZSArICdcIicgKyAnIGlzIG5vdCBleGlzdCcgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdH1cblxuXHR9XG5cblx0cHVibGljIGFwcGx5VG9Vbmlmb3JtcyggdW5pZm9ybXM6IFVuaWZvcm1zICkge1xuXG5cdFx0bGV0IGtleXMgPSBPYmplY3Qua2V5cyggdGhpcy52YXJpYWJsZXMgKTtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRsZXQgdmFyaWFibGUgPSB0aGlzLmdldFZhcmlhYmxlT2JqZWN0KCBrZXlzWyBpIF0gKTtcblxuXHRcdFx0aWYgKCB2YXJpYWJsZSApIHtcblxuXHRcdFx0XHR1bmlmb3Jtc1sga2V5c1sgaSBdIF0gPSB2YXJpYWJsZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlKCBkZWx0YVRpbWU/OiBudW1iZXIgKSB7XG5cblx0XHRpZiAoIHRoaXMuYW5pbWF0aW5nQ291bnQgPT0gMCApIHtcblxuXHRcdFx0dGhpcy5faXNBbmltYXRpbmcgPSBmYWxzZTtcblxuXHRcdH1cblxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHZhcmlhYmxlID0gdGhpcy52YXJpYWJsZXNbIGtleXNbIGkgXSBdO1xuXHRcdFx0bGV0IHRpbWUgPSB2YXJpYWJsZS50aW1lO1xuXG5cdFx0XHRpZiAoIHRpbWUgPT0gMS4wICkge1xuXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW5nQ291bnQgLS07XG5cdFx0XHRcdHRpbWUgPSAtIDE7XG5cblx0XHRcdFx0aWYgKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICkge1xuXG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50cy5wdXNoKCB2YXJpYWJsZS5vbkFuaW1hdGlvbkZpbmlzaGVkICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHRcdGlmICggdGltZSA+PSAwLjAgJiYgdGltZSA8IDEuMCApIHtcblxuXHRcdFx0XHRsZXQgZHVyYXRpb24gPSB2YXJpYWJsZS5kdXJhdGlvbjtcblx0XHRcdFx0bGV0IGVhc2luZyA9IHZhcmlhYmxlLmVhc2luZztcblx0XHRcdFx0bGV0IGxlcnBGdW5jID0gdmFyaWFibGUubGVycEZ1bmM7XG5cblx0XHRcdFx0aWYgKCBkdXJhdGlvbiApIHtcblxuXHRcdFx0XHRcdHRpbWUgKz0gKCBkZWx0YVRpbWUgfHwgMC4wMTYgKSAvIGR1cmF0aW9uO1xuXG5cdFx0XHRcdFx0aWYgKCBkdXJhdGlvbiA9PSAwIHx8IHRpbWUgPj0gMS4wICkge1xuXG5cdFx0XHRcdFx0XHR0aW1lID0gMS4wO1xuXG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIGxlcnBGdW5jICkge1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudmFsdWUgPSBsZXJwRnVuYyggdmFyaWFibGUuc3RhcnRWYWx1ZSwgdmFyaWFibGUuZ29hbFZhbHVlLCBlYXNpbmcoIHRpbWUgKSApO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIHRpbWUgPT0gMS4wICkge1xuXG5cdFx0XHRcdFx0dmFyaWFibGUudmFsdWUgPSB2YXJpYWJsZS5nb2FsVmFsdWU7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHRcdHR5cGU6ICd1cGRhdGUvJyArIGtleXNbIGkgXSxcblx0XHRcdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZSxcblx0XHRcdFx0XHR2YWx1ZTogdmFyaWFibGUudmFsdWVcblx0XHRcdFx0fSApO1xuXG5cdFx0XHR9XG5cblx0XHRcdHZhcmlhYmxlLnRpbWUgPSB0aW1lO1xuXG5cdFx0fVxuXG5cdFx0d2hpbGUgKCB0aGlzLmRpc3BhdGNoRXZlbnRzLmxlbmd0aCAhPSAwICkge1xuXG5cdFx0XHRsZXQgZnVuYyA9IHRoaXMuZGlzcGF0Y2hFdmVudHMucG9wKCk7XG5cblx0XHRcdGlmICggZnVuYyApIHtcblxuXHRcdFx0XHRmdW5jKCk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRkZWx0YVRpbWU6IGRlbHRhVGltZVxuXHRcdH0gKTtcblxuXHRcdGlmICggdGhpcy5faXNBbmltYXRpbmcgKSB7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHR0eXBlOiAnYW5pbWF0ZScsXG5cdFx0XHRcdGRlbHRhVGltZTogZGVsdGFUaW1lXG5cdFx0XHR9ICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB3YWl0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgcHJtID0gbmV3IFByb21pc2U8dm9pZD4oICggciApID0+e1xuXG5cdFx0XHRzZXRUaW1lb3V0KCAoKSA9PiB7XG5cblx0XHRcdFx0cigpO1xuXG5cdFx0XHR9LCAoIHQgKiAxMDAwICkgKTtcblxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBwcm07XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBPUkUgZnJvbSAnLi4vLi4vJztcbmltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHZlcnQgZnJvbSAnLi9zaGFkZXJzL2JhY2tncm91bmQudnMnO1xuaW1wb3J0IHsgTGF5ZXJTaXplIGFzIExheWVyU2l6ZUluZm8gfSBmcm9tICcuLi8uLi9jb3JlL0Jhc2VMYXllcic7XG5cbmV4cG9ydCBjbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgVEhSRUUuTWVzaCB7XG5cblx0cHJvdGVjdGVkIHVuaWZvcm1zOiBPUkUuVW5pZm9ybXM7XG5cblx0Y29uc3RydWN0b3IoIHBhcmFtOiBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMgKSB7XG5cblx0XHRsZXQgZ2VvID0gbmV3IFRIUkVFLkJ1ZmZlckdlb21ldHJ5KCk7XG5cblx0XHRsZXQgcG9zQXJyYXkgPSBbXTtcblx0XHRsZXQgaW5kZXhBcnJheSA9IFtdO1xuXHRcdGxldCB1dkFycmF5ID0gW107XG5cblx0XHRwb3NBcnJheS5wdXNoKCAtIDEsIDEsIDAgKTtcblx0XHRwb3NBcnJheS5wdXNoKCAxLCAxLCAwICk7XG5cdFx0cG9zQXJyYXkucHVzaCggMSwgLSAxLCAwICk7XG5cdFx0cG9zQXJyYXkucHVzaCggLSAxLCAtIDEsIDAgKTtcblxuXHRcdHV2QXJyYXkucHVzaCggMCwgMSApO1xuXHRcdHV2QXJyYXkucHVzaCggMSwgMSApO1xuXHRcdHV2QXJyYXkucHVzaCggMSwgMCApO1xuXHRcdHV2QXJyYXkucHVzaCggMCwgMCApO1xuXG5cdFx0aW5kZXhBcnJheS5wdXNoKCAwLCAyLCAxLCAwLCAzLCAyICk7XG5cblx0XHRsZXQgcG9zID0gbmV3IEZsb2F0MzJBcnJheSggcG9zQXJyYXkgKTtcblx0XHRsZXQgaW5kaWNlcyA9IG5ldyBVaW50MzJBcnJheSggaW5kZXhBcnJheSApO1xuXHRcdGxldCB1diA9IG5ldyBGbG9hdDMyQXJyYXkoIHV2QXJyYXkgKTtcblxuXHRcdGdlby5zZXRBdHRyaWJ1dGUoICdwb3NpdGlvbicsIG5ldyBUSFJFRS5CdWZmZXJBdHRyaWJ1dGUoIHBvcywgMyApICk7XG5cdFx0Z2VvLnNldEF0dHJpYnV0ZSggJ3V2JywgbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggdXYsIDIgKSApO1xuXHRcdGdlby5zZXRJbmRleCggbmV3IFRIUkVFLkJ1ZmZlckF0dHJpYnV0ZSggaW5kaWNlcywgMSApICk7XG5cblx0XHRwYXJhbS52ZXJ0ZXhTaGFkZXIgPSBwYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgdmVydDtcblx0XHRwYXJhbS50cmFuc3BhcmVudCA9IHBhcmFtLnRyYW5zcGFyZW50ICE9IHVuZGVmaW5lZCA/IHBhcmFtLnRyYW5zcGFyZW50IDogdHJ1ZTtcblx0XHRwYXJhbS5kZXB0aEZ1bmMgPSBwYXJhbS5kZXB0aEZ1bmMgIT0gdW5kZWZpbmVkID8gcGFyYW0uZGVwdGhGdW5jIDogVEhSRUUuTmV2ZXJEZXB0aDtcblxuXHRcdGxldCBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBhcmFtICk7XG5cblx0XHRzdXBlciggZ2VvLCBtYXQgKTtcblxuXHRcdHRoaXMudW5pZm9ybXMgPSBwYXJhbS51bmlmb3JtcyB8fCB7fTtcblxuXHRcdHRoaXMuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVzaXplKCBhcmdzOiBMYXllclNpemVJbmZvICkge1xuXG5cdFx0dGhpcy51bmlmb3Jtcy5yZXNvbHV0aW9uID0geyB2YWx1ZTogYXJncy5jYW52YXNTaXplIH07XG5cdFx0dGhpcy51bmlmb3Jtcy5hc3BlY3RSYXRpbyA9IHsgdmFsdWU6IGFyZ3MuY2FudmFzQXNwZWN0UmF0aW8gfTtcblxuXHR9XG5cbn1cbiIsIlxuLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdFx0QmV6aWVyXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuZXhwb3J0IG5hbWVzcGFjZSBCZXppZXIge1xuXG5cdGV4cG9ydCB0eXBlIEJlemllckNvbnRyb2xQb2ludHMgPSB7XG5cdFx0cDA6IG51bWJlcjtcblx0XHRwMTogbnVtYmVyO1xuXHRcdHAyOiBudW1iZXI7XG5cdFx0cDM6IG51bWJlcjtcblx0fVxuXG5cdC8vIGluc3BpcmVkIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmUvYmV6aWVyLWVhc2luZy9ibG9iL21hc3Rlci9zcmMvaW5kZXguanMgYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS8wYjV2ci9hdXRvbWF0b24vYmxvYi84NzI0MjBlNzk4ZDkwNTRkNGE3YTA2Yzk3MmNiYjQyNjFhNjdiNGJjL3NyYy9iZXppZXJFYXNpbmcudHNcblxuXHRleHBvcnQgY29uc3QgTkVXVE9OX0lURVJBVElPTlMgPSA0O1xuXHRleHBvcnQgY29uc3QgTkVXVE9OX01JTl9TTE9QRSA9IDAuMDAxO1xuXHRleHBvcnQgY29uc3QgU1VCRElWSVNJT05fUFJFQ0lTSU9OID0gMC4wMDAwMDAxO1xuXHRleHBvcnQgY29uc3QgU1VCRElWSVNJT05fTUFYX0lURVJBVElPTlMgPSAxMDtcblx0ZXhwb3J0IGNvbnN0IEJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSA9IDExO1xuXHRleHBvcnQgY29uc3QgQkVaSUVSX0VBU0lOR19TQU1QTEVfU1RFUF9TSVpFID0gMS4wIC8gQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFO1xuXG5cdGZ1bmN0aW9uIGNhbGNCZXppZXJBKCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0cmV0dXJuIC0gcC5wMCArIDMuMCAqIHAucDEgLSAzLjAgKiBwLnAyICsgcC5wMztcblxuXHR9XG5cdGZ1bmN0aW9uIGNhbGNCZXppZXJCKCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0cmV0dXJuIDMuMCAqIHAucDAgLSA2LjAgKiBwLnAxICsgMy4wICogcC5wMjtcblxuXHR9XG5cdGZ1bmN0aW9uIGNhbGNCZXppZXJDKCBwOiBCZXppZXJDb250cm9sUG9pbnRzICkge1xuXG5cdFx0cmV0dXJuIC0gMy4wICogcC5wMCArIDMuMCAqIHAucDE7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjYWxjQmV6aWVyU2xvcGUoIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAzLjAgKiBjYWxjQmV6aWVyQSggcCApICogdCAqIHQgKyAyLjAgKiBjYWxjQmV6aWVyQiggcCApICogdCArIGNhbGNCZXppZXJDKCBwICk7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBjYWxjQmV6aWVyKCBwOiBCZXppZXJDb250cm9sUG9pbnRzLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gKCAoIGNhbGNCZXppZXJBKCBwICkgKiB0ICsgY2FsY0JlemllckIoIHAgKSApICogdCArIGNhbGNCZXppZXJDKCBwICkgKSAqIHQgKyBwLnAwO1xuXG5cdH1cblxuXHRmdW5jdGlvbiBzdWJkaXYoIHg6IG51bWJlciwgc3RhcnRUOiBudW1iZXIsIGVuZFQ6IG51bWJlciwgcDogQmV6aWVyQ29udHJvbFBvaW50cyApIHtcblxuXHRcdGxldCBjdXJyZW50WCA9IDA7XG5cdFx0bGV0IGN1cnJlbnRUID0gMDtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IFNVQkRJVklTSU9OX01BWF9JVEVSQVRJT05TOyBpICsrICkge1xuXG5cdFx0XHRjdXJyZW50VCA9IHN0YXJ0VCArICggZW5kVCAtIHN0YXJ0VCApIC8gMjtcblx0XHRcdGN1cnJlbnRYID0gY2FsY0JlemllciggcCwgY3VycmVudFQgKTtcblxuXHRcdFx0aWYgKCBjdXJyZW50WCA+IHggKSB7XG5cblx0XHRcdFx0ZW5kVCA9IGN1cnJlbnRUO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHN0YXJ0VCA9IGN1cnJlbnRUO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gY3VycmVudFQ7XG5cblx0fVxuXG5cdGZ1bmN0aW9uIG5ld3RvbiggeDpudW1iZXIsIHA6IEJlemllckNvbnRyb2xQb2ludHMsIHQ6IG51bWJlciApIHtcblxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IE5FV1RPTl9JVEVSQVRJT05TOyBpICsrICkge1xuXG5cdFx0XHRsZXQgc2xvcGUgPSBjYWxjQmV6aWVyU2xvcGUoIHAsIHQgKTtcblxuXHRcdFx0aWYgKCBzbG9wZSA9PSAwLjAgKSB7XG5cblx0XHRcdFx0cmV0dXJuIHQ7XG5cblx0XHRcdH1cblxuXHRcdFx0bGV0IGN1cnJlbnRYID0gKCBjYWxjQmV6aWVyKCBwLCB0ICkgKSAtIHg7XG5cdFx0XHR0IC09IGN1cnJlbnRYIC8gc2xvcGU7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGdldEJlemllclRmcm9tWCggcDogQmV6aWVyQ29udHJvbFBvaW50cywgeDogbnVtYmVyLCBjYWNoZTogbnVtYmVyW10gKSB7XG5cblx0XHRwLnAxID0gTWF0aC5tYXgoIHAucDAsIE1hdGgubWluKCBwLnAzLCBwLnAxICkgKTtcblx0XHRwLnAyID0gTWF0aC5tYXgoIHAucDAsIE1hdGgubWluKCBwLnAzLCBwLnAyICkgKTtcblxuXHRcdGxldCBzYW1wbGUgPSAwO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAxOyBpIDwgY2FjaGUubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRzYW1wbGUgPSBpIC0gMTtcblx0XHRcdGlmICggeCA8IGNhY2hlWyBpIF0gKSBicmVhaztcblxuXHRcdH1cblxuXHRcdGxldCB0ID0gc2FtcGxlIC8gKCBCRVpJRVJfRUFTSU5HX0NBQ0hFX1NJWkUgLSAxLjAgKTtcblx0XHRsZXQgZGlmZiA9IGNhbGNCZXppZXJTbG9wZSggcCwgdCApIC8gKCBwLnAzIC0gcC5wMCApO1xuXG5cdFx0aWYgKCBkaWZmID09IDAuMCApIHtcblxuXHRcdFx0cmV0dXJuIHQ7XG5cblx0XHR9IGVsc2UgaWYgKCBkaWZmID4gMC4wMSApIHtcblxuXHRcdFx0cmV0dXJuIG5ld3RvbiggeCwgcCwgdCApO1xuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0cmV0dXJuIHN1YmRpdiggeCwgdCwgdCArIEJFWklFUl9FQVNJTkdfU0FNUExFX1NURVBfU0laRSwgcCApO1xuXG5cdFx0fVxuXG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJ3b2xmeTg3LWV2ZW50ZW1pdHRlclwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25BY3Rpb24gfSBmcm9tIFwiLi4vQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvblwiO1xyXG5pbXBvcnQgeyBGQ3VydmUgfSBmcm9tIFwiLi4vQW5pbWF0aW9uL0ZDdXJ2ZVwiO1xyXG5pbXBvcnQgeyBGQ3VydmVHcm91cCB9IGZyb20gJy4uL0FuaW1hdGlvbi9GQ3VydmVHcm91cCc7XHJcbmltcG9ydCB7IEZDdXJ2ZUludGVycG9sYXRpb24sIEZDdXJ2ZUtleUZyYW1lIH0gZnJvbSBcIi4uL0FuaW1hdGlvbi9GQ3VydmVLZXlGcmFtZVwiO1xyXG5pbXBvcnQgeyBVbmlmb3JtcyB9IGZyb20gJy4uL1VuaWZvcm1zJztcclxuXHJcbmV4cG9ydCB0eXBlIEJDTWVzc2FnZSA9IEJDU3luY1NjZW5lTWVzc2FnZSB8IEJDU3luY0ZyYW1lTWVzc2FnZVxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkN1cnZlQXhpcyA9ICd4JyB8ICd5JyB8ICd6JyB8ICd3JyB8ICdzY2FsYXInXHJcblxyXG5leHBvcnQgdHlwZSBCQ1N5bmNTY2VuZU1lc3NhZ2UgPSB7XHJcblx0dHlwZTogXCJzeW5jL3NjZW5lXCIsXHJcbiAgICBkYXRhOiBCQ1NjZW5lRGF0YTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNTY2VuZURhdGEgPSB7XHJcblx0YWN0aW9uczogQkNBbmltYXRpb25BY3Rpb25QYXJhbVtdO1xyXG4gICAgb2JqZWN0czogQkNTY2VuZU9iamVjdERhdGFbXTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNBbmltYXRpb25BY3Rpb25QYXJhbSA9IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIGZjdXJ2ZV9ncm91cHM6IHtba2V5OiBzdHJpbmddOiBCQ0FuaW1hdGlvbkN1cnZlUGFyYW1bXX07XHJcbn1cclxuXHJcbmV4cG9ydCB0eXBlIEJDQW5pbWF0aW9uQ3VydmVQYXJhbSA9IHtcclxuICAgIGtleWZyYW1lczogQkNBbmltYXRpb25DdXJ2ZUtleUZyYW1lUGFyYW1bXTtcclxuXHRheGlzOiBCQ0FuaW1hdGlvbkN1cnZlQXhpc1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ0FuaW1hdGlvbkN1cnZlS2V5RnJhbWVQYXJhbSA9IHtcclxuICAgIGM6IFRIUkVFLlZlYzI7XHJcbiAgICBoX2w6IFRIUkVFLlZlYzI7XHJcbiAgICBoX3I6IFRIUkVFLlZlYzI7XHJcbiAgICBlOiBzdHJpbmc7XHJcbiAgICBpOiBGQ3VydmVJbnRlcnBvbGF0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1NjZW5lT2JqZWN0RGF0YSA9IHtcclxuXHRuYW1lOiBzdHJpbmcsXHJcblx0YWN0aW9uczogc3RyaW5nW11cclxufVxyXG5cclxuZXhwb3J0IHR5cGUgQkNTeW5jRnJhbWVNZXNzYWdlID0ge1xyXG5cdHR5cGU6IFwic3luYy90aW1lbGluZVwiO1xyXG5cdGRhdGE6IEJDVGltZWxpbmVEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBCQ1RpbWVsaW5lRGF0YSA9IHtcclxuXHRzdGFydDogbnVtYmVyO1xyXG5cdGVuZDogbnVtYmVyO1xyXG5cdGN1cnJlbnQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJsZW5kZXJDb25uZWN0b3IgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xyXG5cclxuXHQvLyB3c1xyXG5cclxuXHRwcml2YXRlIHVybD86IHN0cmluZztcclxuXHRwcml2YXRlIHdzPzogV2ViU29ja2V0O1xyXG5cdHB1YmxpYyBjb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0Ly8gZnJhbWVcclxuXHJcblx0cHVibGljIGZyYW1lQ3VycmVudDogbnVtYmVyID0gMDtcclxuXHRwdWJsaWMgZnJhbWVTdGFydDogbnVtYmVyID0gMDtcclxuXHRwdWJsaWMgZnJhbWVFbmQ6IG51bWJlciA9IDA7XHJcblxyXG5cdC8vIGFuaW1hdGlvblxyXG5cclxuXHRwdWJsaWMgb2JqZWN0czogQkNTY2VuZU9iamVjdERhdGFbXSA9IFtdO1xyXG5cdHB1YmxpYyBhY3Rpb25zOiBBbmltYXRpb25BY3Rpb25bXSA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3RvciggdXJsPzogc3RyaW5nICkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdFx0aWYgKCB1cmwgKSB7XHJcblxyXG5cdFx0XHR0aGlzLnVybCA9IHVybDtcclxuXHRcdFx0dGhpcy5jb25uZWN0KCB0aGlzLnVybCApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgY29ubmVjdCggdXJsOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0dGhpcy51cmwgPSB1cmw7XHJcblx0XHR0aGlzLndzID0gbmV3IFdlYlNvY2tldCggdGhpcy51cmwgKTtcclxuXHRcdHRoaXMud3Mub25vcGVuID0gdGhpcy5vbk9wZW4uYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZS5iaW5kKCB0aGlzICk7XHJcblx0XHR0aGlzLndzLm9uY2xvc2UgPSB0aGlzLm9uQ2xvc2UuYmluZCggdGhpcyApO1xyXG5cdFx0dGhpcy53cy5vbmVycm9yID0gKCBlICkgPT4ge1xyXG5cclxuXHRcdFx0Y29uc29sZS5lcnJvciggZSApO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHN5bmNKc29uU2NlbmUoIGpzb25QYXRoOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0bGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuXHRcdHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XHJcblxyXG5cdFx0XHRpZiAoIHJlcS5yZWFkeVN0YXRlID09IDQgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggcmVxLnN0YXR1cyA9PSAyMDAgKSB7XHJcblxyXG5cdFx0XHRcdFx0dGhpcy5vblN5bmNTY2VuZSggSlNPTi5wYXJzZSggcmVxLnJlc3BvbnNlICkgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH07XHJcblxyXG5cdFx0cmVxLm9wZW4oICdHRVQnLCBqc29uUGF0aCApO1xyXG5cdFx0cmVxLnNlbmQoICk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRFdmVudHNcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHJpdmF0ZSBvblN5bmNTY2VuZSggZGF0YTogQkNTY2VuZURhdGEgKSB7XHJcblxyXG5cdFx0dGhpcy5hY3Rpb25zLmxlbmd0aCA9IDA7XHJcblx0XHR0aGlzLm9iamVjdHMubGVuZ3RoID0gMDtcclxuXHJcblx0XHQvLyBhY3Rpb25zXHJcblxyXG5cdFx0ZGF0YS5hY3Rpb25zLmZvckVhY2goIGFjdGlvbkRhdGEgPT4ge1xyXG5cclxuXHRcdFx0bGV0IGFjdGlvbiA9IG5ldyBBbmltYXRpb25BY3Rpb24oIGFjdGlvbkRhdGEubmFtZSApO1xyXG5cclxuXHRcdFx0bGV0IGZjdXJ2ZUdyb3VwTmFtZXMgPSBPYmplY3Qua2V5cyhhY3Rpb25EYXRhLmZjdXJ2ZV9ncm91cHMpXHJcblxyXG5cdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBmY3VydmVHcm91cE5hbWVzLmxlbmd0aDsgaSsrICkge1xyXG5cclxuXHRcdFx0XHRsZXQgZmN1cnZlR3JvdXBOYW1lID0gZmN1cnZlR3JvdXBOYW1lc1tpXTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRsZXQgZmN1cnZlR3JvdXAgPSBuZXcgRkN1cnZlR3JvdXAoIGZjdXJ2ZUdyb3VwTmFtZSApO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGFjdGlvbkRhdGEuZmN1cnZlX2dyb3Vwc1tmY3VydmVHcm91cE5hbWVdLmZvckVhY2goIGZjdXJ2ZURhdGEgPT4ge1xyXG5cclxuXHRcdFx0XHRcdGxldCBjdXJ2ZSA9IG5ldyBGQ3VydmUoKTtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Y3VydmUuc2V0KCBmY3VydmVEYXRhLmtleWZyYW1lcy5tYXAoIGZyYW1lID0+IHtcclxuXHRcclxuXHRcdFx0XHRcdFx0cmV0dXJuIG5ldyBGQ3VydmVLZXlGcmFtZSggZnJhbWUuYywgZnJhbWUuaF9sLCBmcmFtZS5oX3IsIGZyYW1lLmkgKTtcclxuXHRcclxuXHRcdFx0XHRcdH0gKSApO1xyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRmY3VydmVHcm91cC5zZXRGQ3VydmUoIGN1cnZlLCBmY3VydmVEYXRhLmF4aXMgKTtcclxuXHRcclxuXHRcdFx0XHR9ICk7XHJcblxyXG5cdFx0XHRcdGFjdGlvbi5hZGRGY3VydmVHcm91cCggZmN1cnZlR3JvdXAubmFtZSwgZmN1cnZlR3JvdXAgKTtcclxuXHRcdFx0XHRcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy5hY3Rpb25zLnB1c2goIGFjdGlvbiApO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHQvLyBvYmplY3RzXHJcblxyXG5cdFx0ZGF0YS5vYmplY3RzLmZvckVhY2goIG9iamVjdERhdGEgPT4ge1xyXG5cclxuXHRcdFx0dGhpcy5vYmplY3RzLnB1c2goIG9iamVjdERhdGEgKTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0Ly8gZGlzcGF0Y2ggZXZlbnRcclxuXHRcdFxyXG5cdFx0dGhpcy5lbWl0RXZlbnQoJ3VwZGF0ZS9zY2VuZScsIFt0aGlzXSlcclxuXHJcblx0XHR0aGlzLnNldFRpbWVsaW5lKHRoaXMuZnJhbWVDdXJyZW50KTtcclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uU3luY1RpbWVsaW5lKCBkYXRhOiBCQ1RpbWVsaW5lRGF0YSApIHtcclxuXHJcblx0XHR0aGlzLnNldFRpbWVsaW5lKCBkYXRhLmN1cnJlbnQsIGRhdGEuc3RhcnQsIGRhdGEuZW5kICk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHRXUyBFdmVudHNcclxuXHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcblx0cHJpdmF0ZSBvbk9wZW4oIGV2ZW50OiBFdmVudCApIHtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3RlZCA9IHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbk1lc3NhZ2UoIGU6IE1lc3NhZ2VFdmVudCApIHtcclxuXHJcblx0XHRsZXQgbXNnID0gSlNPTi5wYXJzZSggZS5kYXRhICkgYXMgQkNNZXNzYWdlO1xyXG5cclxuXHRcdGlmICggbXNnLnR5cGUgPT0gJ3N5bmMvc2NlbmUnICkge1xyXG5cclxuXHRcdFx0dGhpcy5vblN5bmNTY2VuZSggbXNnLmRhdGEgKTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKCBtc2cudHlwZSA9PSBcInN5bmMvdGltZWxpbmVcIiApIHtcclxuXHJcblx0XHRcdHRoaXMub25TeW5jVGltZWxpbmUoIG1zZy5kYXRhICk7XHJcblxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uQ2xvc2UoIGU6Q2xvc2VFdmVudCApIHtcclxuXHJcblx0XHR0aGlzLmRpc3Bvc2VXUygpO1xyXG5cclxuXHR9XHJcblxyXG5cdC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0QVBJXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb25OYW1lTGlzdCggb2JqZWN0TmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMub2JqZWN0cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHRoaXMub2JqZWN0c1sgaSBdLm5hbWUgPT0gb2JqZWN0TmFtZSApIHtcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMub2JqZWN0c1sgaSBdLmFjdGlvbnM7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBbXTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uKCBhY3Rpb25OYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5hY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5hY3Rpb25zWyBpIF0ubmFtZSA9PSBhY3Rpb25OYW1lICkge1xyXG5cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5hY3Rpb25zWyBpIF07XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRBY3Rpb25MaXN0KCBvYmplY3ROYW1lOiBzdHJpbmcgKSB7XHJcblxyXG5cdFx0bGV0IGFjdGlvbnM6IEFuaW1hdGlvbkFjdGlvbltdID0gW107XHJcblx0XHRsZXQgYWN0aW9uTmFtZUxpc3QgPSB0aGlzLmdldEFjdGlvbk5hbWVMaXN0KCBvYmplY3ROYW1lICk7XHJcblxyXG5cdFx0YWN0aW9uTmFtZUxpc3QuZm9yRWFjaCggYWN0aW9uTmFtZSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgYWN0aW9uID0gdGhpcy5nZXRBY3Rpb24oIGFjdGlvbk5hbWUgKTtcclxuXHJcblx0XHRcdGlmICggYWN0aW9uICkge1xyXG5cclxuXHRcdFx0XHRhY3Rpb25zLnB1c2goIGFjdGlvbiApO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHRyZXR1cm4gYWN0aW9ucztcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0QWN0aW9uQ29udGFpbnNBY2Nlc3NvciggYWNjZXNzb3I6IHN0cmluZyApIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5hY3Rpb25zLmZpbmQoYWN0aW9uID0+IHtcclxuXHJcblx0XHRcdGxldCBjdXJ2ZUtleXMgPSBPYmplY3Qua2V5cyggYWN0aW9uLmN1cnZlcyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIGN1cnZlS2V5cy5zb21lKGN1cnZlTmFtZSA9PiBjdXJ2ZU5hbWU9PWFjY2Vzc29yKVxyXG5cdFx0XHRcclxuXHRcdH0pIHx8IG51bGxcclxuXHRcdFxyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFRpbWVsaW5lKCBjdXJyZW50OiBudW1iZXIsIHN0YXJ0PzpudW1iZXIsIGVuZD86bnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuZnJhbWVDdXJyZW50ID0gY3VycmVudDtcclxuXHRcdHRoaXMuZnJhbWVTdGFydCA9IHN0YXJ0IHx8IHRoaXMuZnJhbWVTdGFydDtcclxuXHRcdHRoaXMuZnJhbWVFbmQgPSBlbmQgfHwgdGhpcy5mcmFtZUVuZDtcclxuXHJcblx0XHR0aGlzLmVtaXRFdmVudCggJ3VwZGF0ZS90aW1lbGluZScsIFsgdGhpcy5mcmFtZUN1cnJlbnQsIHRoaXMuZnJhbWVTdGFydCwgdGhpcy5mcmFtZUVuZCBdICk7XHJcblxyXG5cdH1cclxuXHJcblx0LyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0XHREaXNwb3NlXHJcblx0LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xyXG5cclxuXHRcdHRoaXMuZGlzcG9zZVdTKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGRpc3Bvc2VXUygpIHtcclxuXHJcblx0XHRpZiAoIHRoaXMud3MgKSB7XHJcblxyXG5cdFx0XHR0aGlzLndzLmNsb3NlKCk7XHJcblx0XHRcdHRoaXMud3Mub25tZXNzYWdlID0gbnVsbDtcclxuXHRcdFx0dGhpcy53cy5vbmNsb3NlID0gbnVsbDtcclxuXHRcdFx0dGhpcy53cy5vbm9wZW4gPSBudWxsO1xyXG5cclxuXHRcdFx0dGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuaW1wb3J0IHZlcnQgZnJvbSAnLi9kb21NZXNoLnZzJztcbmltcG9ydCB7IFVuaWZvcm1zLCBVbmlmb3Jtc0xpYiB9IGZyb20gJy4uL1VuaWZvcm1zJztcblxuZXhwb3J0IGNsYXNzIERPTU1lc2ggZXh0ZW5kcyBUSFJFRS5NZXNoIHtcblxuXHRwcm90ZWN0ZWQgX3VuaWZvcm1zOiBVbmlmb3Jtcztcblx0cHJvdGVjdGVkIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0cnVjdG9yKCBlbGVtZW50OiBIVE1MRWxlbWVudCwgcGFyYW1ldGVyOiBUSFJFRS5TaGFkZXJNYXRlcmlhbFBhcmFtZXRlcnMgKSB7XG5cblx0XHRsZXQgZ2VvID0gbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoIDIsIDIgKTtcblxuXHRcdHBhcmFtZXRlci52ZXJ0ZXhTaGFkZXIgPSB2ZXJ0O1xuXG5cdFx0bGV0IHVuaSA9IFVuaWZvcm1zTGliLm1lcmdlVW5pZm9ybXMoIHBhcmFtZXRlci51bmlmb3Jtcywge1xuXHRcdFx0ZG9tUG9zOiB7XG5cdFx0XHRcdHZhbHVlOiBuZXcgVEhSRUUuVmVjdG9yMigpXG5cdFx0XHR9LFxuXHRcdFx0ZG9tU2l6ZToge1xuXHRcdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdFx0fSxcblx0XHRcdHdpbmRvd1NpemU6IHtcblx0XHRcdFx0dmFsdWU6IG5ldyBUSFJFRS5WZWN0b3IyKClcblx0XHRcdH0sXG5cdFx0XHRhc3BlY3RSYXRpbzoge1xuXHRcdFx0XHR2YWx1ZTogMS4wXG5cdFx0XHR9XG5cdFx0fSApO1xuXG5cdFx0cGFyYW1ldGVyLnVuaWZvcm1zID0gdW5pO1xuXG5cdFx0bGV0IG1hdCA9IG5ldyBUSFJFRS5TaGFkZXJNYXRlcmlhbCggcGFyYW1ldGVyICk7XG5cblx0XHRzdXBlciggZ2VvLCBtYXQgKTtcblxuXHRcdHRoaXMuZnJ1c3R1bUN1bGxlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fdW5pZm9ybXMgPSB1bmk7XG5cblx0XHR0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG5cdFx0dGhpcy51cGRhdGUoKTtcblxuXHR9XG5cblx0cHVibGljIGdldCB1bmlmb3JtcygpIHtcblxuXHRcdHJldHVybiB0aGlzLl91bmlmb3JtcztcblxuXHR9XG5cblx0cHVibGljIHVwZGF0ZSgpIHtcblxuXHRcdGxldCByZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0dGhpcy5fdW5pZm9ybXMud2luZG93U2l6ZS52YWx1ZS5zZXQoIHdpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHQgKTtcblx0XHR0aGlzLl91bmlmb3Jtcy5hc3BlY3RSYXRpby52YWx1ZSA9IHdpbmRvdy5pbm5lcldpZHRoIC8gd2luZG93LmlubmVySGVpZ2h0O1xuXHRcdHRoaXMuX3VuaWZvcm1zLmRvbVNpemUudmFsdWUuc2V0KCByZWN0LndpZHRoLCByZWN0LmhlaWdodCApO1xuXHRcdHRoaXMuX3VuaWZvcm1zLmRvbVBvcy52YWx1ZS5zZXQoIHJlY3QubGVmdCwgcmVjdC50b3AgKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCB7IEJlemllciB9IGZyb20gXCIuL0JlemllclwiO1xuXG5leHBvcnQgdHlwZSBFYXNpbmdGdW5jID0gKCB0OiBudW1iZXIgKSA9PiBhbnlcblxuZXhwb3J0IG5hbWVzcGFjZSBFYXNpbmdzIHtcblxuXHRleHBvcnQgZnVuY3Rpb24gc2lnbW9pZCggd2VpZ2h0OiBudW1iZXIgPSA2ICk6IEVhc2luZ0Z1bmMge1xuXG5cdFx0cmV0dXJuICggeDogbnVtYmVyICkgPT4ge1xuXG5cdFx0XHR2YXIgZTEgPSBNYXRoLmV4cCggLSB3ZWlnaHQgKiAoIDIgKiB4IC0gMSApICk7XG5cdFx0XHR2YXIgZTIgPSBNYXRoLmV4cCggLSB3ZWlnaHQgKTtcblxuXHRcdFx0cmV0dXJuICggMSArICggMSAtIGUxICkgLyAoIDEgKyBlMSApICogKCAxICsgZTIgKSAvICggMSAtIGUyICkgKSAvIDI7XG5cblx0XHR9O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gc21vb3Roc3RlcCggbWluOiBudW1iZXIsIG1heDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyICk6IG51bWJlciB7XG5cblx0XHRsZXQgeCA9IE1hdGgubWF4KCAwLCBNYXRoLm1pbiggMSwgKCB2YWx1ZSAtIG1pbiApIC8gKCBtYXggLSBtaW4gKSApICk7XG5cdFx0cmV0dXJuIHggKiB4ICogKCAzIC0gMiAqIHggKTtcblxuXHR9XG5cblx0Lypcblx0QGF1dGhlciBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9ncmUvMTY1MDI5NFxuXHQqL1xuXG5cdGV4cG9ydCBmdW5jdGlvbiBsaW5lYXIoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluUXVhZCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZU91dFF1YWQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogKCAyIC0gdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluT3V0UXVhZCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIHQgPCAuNSA/IDIgKiB0ICogdCA6IC0gMSArICggNCAtIDIgKiB0ICkgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluQ3ViaWMoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdCAqIHQ7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBlYXNlT3V0Q3ViaWMoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiAoIC0tIHQgKSAqIHQgKiB0ICsgMTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dEN1YmljKCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCA8IC41ID8gNCAqIHQgKiB0ICogdCA6ICggdCAtIDEgKSAqICggMiAqIHQgLSAyICkgKiAoIDIgKiB0IC0gMiApICsgMTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJblF1YXJ0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWFydCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIDEgLSAoIC0tIHQgKSAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1YXJ0KCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gdCA8IC41ID8gOCAqIHQgKiB0ICogdCAqIHQgOiAxIC0gOCAqICggLS0gdCApICogdCAqIHQgKiB0O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gZWFzZUluUXVpbnQoIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiB0ICogdCAqIHQgKiB0ICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VPdXRRdWludCggdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIDEgKyAoIC0tIHQgKSAqIHQgKiB0ICogdCAqIHQ7XG5cblx0fVxuXG4gIFx0ZXhwb3J0IGZ1bmN0aW9uIGVhc2VJbk91dFF1aW50KCB0OiBudW1iZXIgKSB7XG5cbiAgXHRcdHJldHVybiB0IDwgLjUgPyAxNiAqIHQgKiB0ICogdCAqIHQgKiB0IDogMSArIDE2ICogKCAtLSB0ICkgKiB0ICogdCAqIHQgKiB0O1xuXG4gIFx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBiZXppZXIoIGMxOiBUSFJFRS5WZWMyLCBoMTogVEhSRUUuVmVjMiwgaDI6IFRIUkVFLlZlYzIsIGMyOiBUSFJFRS5WZWMyICk6IEVhc2luZ0Z1bmMge1xuXG5cdFx0dmFyIGNhY2hlID0gbmV3IEFycmF5KCBCZXppZXIuQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFICk7XG5cblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCBCZXppZXIuQkVaSUVSX0VBU0lOR19DQUNIRV9TSVpFOyArKyBpICkge1xuXG5cdFx0XHRjYWNoZVsgaSBdID0gQmV6aWVyLmNhbGNCZXppZXIoIHsgcDA6IGMxLngsIHAxOiBoMS54LCBwMjogaDIueCwgcDM6IGMyLnggfSwgaSAvICggQmV6aWVyLkJFWklFUl9FQVNJTkdfQ0FDSEVfU0laRSAtIDEuMCApICk7XG5cblx0XHR9XG5cblx0XHRyZXR1cm4gKCB4OiBudW1iZXIgKSA9PiB7XG5cblx0XHRcdGlmICggeCA8PSBjMS54ICkgcmV0dXJuIGMxLnk7XG5cdFx0XHRpZiAoIGMyLnggPD0geCApIHJldHVybiBjMi55O1xuXG5cdFx0XHRyZXR1cm4gQmV6aWVyLmNhbGNCZXppZXIoIHsgcDA6IGMxLnksIHAxOiBoMS55LCBwMjogaDIueSwgcDM6IGMyLnkgfSwgQmV6aWVyLmdldEJlemllclRmcm9tWCggeyBwMDogYzEueCwgcDE6IGgxLngsIHAyOiBoMi54LCBwMzogYzIueCB9LCB4LCBjYWNoZSApICk7XG5cblx0XHR9O1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gY3ViaWNCZXppZXIoIGgxWDogbnVtYmVyLCBoMVk6IG51bWJlciwgaDJYOiBudW1iZXIsIGgyWTogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGJlemllcihcblx0XHRcdHsgeDogMC4wLCB5OiAwLjAgfSxcblx0XHRcdHsgeDogaDFYIGFzIG51bWJlciwgeTogaDFZIGFzIG51bWJlciB9LFxuXHRcdFx0eyB4OiBoMlggYXMgbnVtYmVyLCB5OiBoMlkgYXMgbnVtYmVyIH0sXG5cdFx0XHR7IHg6IDEuMCwgeTogMS4wIH0sXG5cdFx0KTtcblxuXHR9XG5cbn1cbiIsImV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBFdmVudCB7XG5cdHR5cGU6IHN0cmluZztcblx0W2tleTpzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBFdmVudExpc3RlbmVyIHtcblx0dHlwZTogc3RyaW5nLFxuXHRsaXN0ZW5lcjogKCBlOiBFdmVudCApID0+IHZvaWQsXG59XG5cbmV4cG9ydCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xuXG5cdHByaXZhdGUgZXZlbnRzOiBFdmVudExpc3RlbmVyW10gPSBbXTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHR9XG5cblx0cHVibGljIGFkZEV2ZW50TGlzdGVuZXIoIHR5cGU6IHN0cmluZywgbGlzdGVuZXI6ICggZTogRXZlbnQgKSA9PiB2b2lkICkge1xuXG5cdFx0dGhpcy5ldmVudHMucHVzaCgge1xuXHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdGxpc3RlbmVyOiBsaXN0ZW5lclxuXHRcdH0gKTtcblxuXHR9XG5cblx0cHVibGljIGRpc3BhdGNoRXZlbnQoIGV2ZW50OiBFdmVudCApIHtcblxuXHRcdGV2ZW50LnRhcmdldCA9IHRoaXM7XG5cblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLmV2ZW50cy5sZW5ndGg7IGkgKysgKSB7XG5cblx0XHRcdGlmICggZXZlbnQudHlwZSA9PSB0aGlzLmV2ZW50c1sgaSBdLnR5cGUgKSB7XG5cblx0XHRcdFx0dGhpcy5ldmVudHNbIGkgXS5saXN0ZW5lciggZXZlbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgcmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZTogc3RyaW5nLCBsaXN0ZW5lcjogRnVuY3Rpb24gKSB7XG5cblx0XHRmb3IgKCBsZXQgaSA9IHRoaXMuZXZlbnRzLmxlbmd0aDsgaSA+PSAwOyBpIC0tICkge1xuXG5cdFx0XHRpZiAoIHR5cGUgPT0gdGhpcy5ldmVudHNbIGkgXS50eXBlICYmIGxpc3RlbmVyID09IHRoaXMuZXZlbnRzWyBpIF0ubGlzdGVuZXIgKSB7XG5cblx0XHRcdFx0dGhpcy5ldmVudHMuc3BsaWNlKCBpLCAxICk7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcblxuaW1wb3J0IHZlcnQgZnJvbSAnLi9zaGFkZXJzL3Bhc3NUaHJvdWdoLnZzJztcbmltcG9ydCBwYXNzVGhyb3VnaEZyYWcgZnJvbSAnLi9zaGFkZXJzL3Bhc3NUaHJvdWdoLmZzJztcbmltcG9ydCB7IFVuaWZvcm1zLCBVbmlmb3Jtc0xpYiB9IGZyb20gJy4uL1VuaWZvcm1zJztcblxuZXhwb3J0IGludGVyZmFjZSBHUFVDb21wdXRhdGlvbktlcm5lbHtcbiAgICBtYXRlcmlhbDogVEhSRUUuUmF3U2hhZGVyTWF0ZXJpYWwsXG4gICAgdW5pZm9ybXM6IGFueSxcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHUFVjb21wdXRhdGlvbkRhdGF7XG4gICAgYnVmZmVyOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldFxufVxuXG5leHBvcnQgY2xhc3MgR1BVQ29tcHV0YXRpb25Db250cm9sbGVyIHtcblxuXHRwcm90ZWN0ZWQgcmVuZGVyZXI6IFRIUkVFLldlYkdMUmVuZGVyZXI7XG5cdHB1YmxpYyBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMjtcblx0cHJvdGVjdGVkIHVuaWZvcm1zOiBhbnk7XG5cblx0cHJvdGVjdGVkIHNjZW5lOiBUSFJFRS5TY2VuZTtcblx0cHJvdGVjdGVkIGNhbWVyYTogVEhSRUUuQ2FtZXJhO1xuXG5cdHByb3RlY3RlZCBtZXNoOiBUSFJFRS5NZXNoO1xuXHRwcm90ZWN0ZWQgbWF0ZXJpYWxzOiBUSFJFRS5TaGFkZXJNYXRlcmlhbFtdO1xuXG5cdHByb3RlY3RlZCB0ZW1wRGF0YUxpbmVhcjogR1BVY29tcHV0YXRpb25EYXRhO1xuXHRwcm90ZWN0ZWQgdGVtcERhdGFOZWFyOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHJpdmF0ZSByZW5kZXJUYXJnZXRzOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldFtdID0gW107XG5cblx0cHVibGljIGdldCBpc1N1cHBvcnRlZCgpIDogYm9vbGVhbiB7XG5cbiAgICBcdHJldHVybiB0aGlzLnJlbmRlcmVyLmV4dGVuc2lvbnMuZ2V0KCBcIk9FU190ZXh0dXJlX2Zsb2F0XCIgKTtcblxuXHR9XG5cblx0Y29uc3RydWN0b3IoIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyLCBkYXRhU2l6ZTogVEhSRUUuVmVjdG9yMiApIHtcblxuICAgIFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgIFx0dGhpcy5kYXRhU2l6ZSA9IGRhdGFTaXplLmNsb25lKCk7XG5cbiAgICBcdHRoaXMudW5pZm9ybXMgPSB7XG4gICAgXHRcdGRhdGFTaXplOiB7XG4gICAgXHRcdFx0dmFsdWU6IHRoaXMuZGF0YVNpemVcbiAgICBcdFx0fVxuICAgIFx0fTtcblxuICAgIFx0dGhpcy50ZW1wRGF0YUxpbmVhciA9IHRoaXMuY3JlYXRlRGF0YSgge1xuICAgIFx0XHRtaW5GaWx0ZXI6IFRIUkVFLkxpbmVhckZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5MaW5lYXJGaWx0ZXJcbiAgICBcdH0gKTtcblxuICAgIFx0dGhpcy50ZW1wRGF0YU5lYXIgPSB0aGlzLmNyZWF0ZURhdGEoIHtcbiAgICBcdFx0bWluRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLFxuICAgIFx0XHRtYWdGaWx0ZXI6IFRIUkVFLk5lYXJlc3RGaWx0ZXJcbiAgICBcdH0gKTtcblxuICAgIFx0dGhpcy5zY2VuZSA9IG5ldyBUSFJFRS5TY2VuZSgpO1xuICAgIFx0dGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuQ2FtZXJhKCk7XG5cbiAgICBcdHRoaXMubWF0ZXJpYWxzID0gW107XG4gICAgXHR0aGlzLm1lc2ggPSBuZXcgVEhSRUUuTWVzaCggbmV3IFRIUkVFLlBsYW5lQnVmZmVyR2VvbWV0cnkoIDIsIDIgKSApO1xuICAgIFx0dGhpcy5zY2VuZS5hZGQoIHRoaXMubWVzaCApO1xuXG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlSW5pdGlhbGl6ZVRleHR1cmUoKSB7XG5cbiAgICBcdGxldCBhID0gbmV3IEZsb2F0MzJBcnJheSggdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS54ICogdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS55ICogNCApO1xuICAgIFx0bGV0IHRleHR1cmUgPSBuZXcgVEhSRUUuRGF0YVRleHR1cmUoIGEsIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCwgdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS55LCBUSFJFRS5SR0JBRm9ybWF0LCBUSFJFRS5GbG9hdFR5cGUgKTtcbiAgICBcdHRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgXHRyZXR1cm4gdGV4dHVyZTtcblxuXHR9XG5cblx0cHVibGljIGNyZWF0ZURhdGEoKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0aWFsaXplVGV4dHVyZTogVEhSRUUuRGF0YVRleHR1cmUgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCB0ZXh0dXJlUGFyYW06IFRIUkVFLldlYkdMUmVuZGVyVGFyZ2V0T3B0aW9ucyApOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cblx0cHVibGljIGNyZWF0ZURhdGEoIGluaXRpYWxpemVUZXh0dXJlOiBUSFJFRS5EYXRhVGV4dHVyZSwgdGV4dHVyZVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgKTogR1BVY29tcHV0YXRpb25EYXRhO1xuXG5cdHB1YmxpYyBjcmVhdGVEYXRhKCBpbml0VGV4X3RleFBhcmFtPzogYW55LCB0ZXh0dXJlUGFyYW0/IDogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zICk6IEdQVWNvbXB1dGF0aW9uRGF0YSB7XG5cbiAgICBcdGxldCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICAgIFx0bGV0IGlzaU9TID0gdXNlckFnZW50LmluZGV4T2YoICdpUGhvbmUnICkgPj0gMCB8fCB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQYWQnICkgPj0gMCB8fCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJpUGFkXCIgfHwgKCBuYXZpZ2F0b3IucGxhdGZvcm0gPT0gXCJNYWNJbnRlbFwiICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJTYWZhcmlcIiApICE9IC0gMSAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoIFwiQ2hyb21lXCIgKSA9PSAtIDEgJiYgKCBuYXZpZ2F0b3IgYXMgYW55ICkuc3RhbmRhbG9uZSAhPT0gdW5kZWZpbmVkICk7XG5cbiAgICBcdGxldCBwYXJhbTogVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXRPcHRpb25zID0ge1xuICAgIFx0XHR3cmFwUzogVEhSRUUuQ2xhbXBUb0VkZ2VXcmFwcGluZyxcbiAgICBcdFx0d3JhcFQ6IFRIUkVFLkNsYW1wVG9FZGdlV3JhcHBpbmcsXG4gICAgXHRcdG1pbkZpbHRlcjogVEhSRUUuTmVhcmVzdEZpbHRlcixcbiAgICBcdFx0bWFnRmlsdGVyOiBUSFJFRS5OZWFyZXN0RmlsdGVyLFxuICAgIFx0XHRmb3JtYXQ6IFRIUkVFLlJHQkFGb3JtYXQsXG4gICAgXHRcdHR5cGU6IGlzaU9TID8gVEhSRUUuSGFsZkZsb2F0VHlwZSA6IFRIUkVFLkZsb2F0VHlwZSxcbiAgICBcdFx0c3RlbmNpbEJ1ZmZlcjogZmFsc2UsXG4gICAgXHRcdGRlcHRoQnVmZmVyOiBmYWxzZVxuICAgIFx0fTtcbiAgICBcdGxldCBpbml0VGV4OiBUSFJFRS5EYXRhVGV4dHVyZSB8IG51bGwgPSBudWxsO1xuICAgIFx0bGV0IGN1c3RvbVBhcmFtOiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldE9wdGlvbnMgfCBudWxsID0gbnVsbDtcblxuICAgIFx0aWYgKCBpbml0VGV4X3RleFBhcmFtICkge1xuXG4gICAgXHRcdGlmICggaW5pdFRleF90ZXhQYXJhbS5pc0RhdGFUZXh0dXJlICkge1xuXG4gICAgXHRcdFx0aW5pdFRleCA9IGluaXRUZXhfdGV4UGFyYW07XG5cbiAgICBcdFx0XHRpZiAoIHRleHR1cmVQYXJhbSApIHtcblxuICAgIFx0XHRcdFx0Y3VzdG9tUGFyYW0gPSB0ZXh0dXJlUGFyYW07XG5cbiAgICBcdFx0XHR9XG5cbiAgICBcdFx0fSBlbHNlIHtcblxuICAgIFx0XHRcdGN1c3RvbVBhcmFtID0gaW5pdFRleF90ZXhQYXJhbTtcblxuICAgIFx0XHR9XG5cbiAgICBcdH1cblxuICAgIFx0aWYgKCBjdXN0b21QYXJhbSApIHtcblxuICAgIFx0XHRwYXJhbS53cmFwUyA9IGN1c3RvbVBhcmFtLndyYXBTIHx8IHBhcmFtLndyYXBTO1xuICAgIFx0XHRwYXJhbS53cmFwVCA9IGN1c3RvbVBhcmFtLndyYXBUIHx8IHBhcmFtLndyYXBUO1xuICAgIFx0XHRwYXJhbS5taW5GaWx0ZXIgPSBjdXN0b21QYXJhbS5taW5GaWx0ZXIgfHwgcGFyYW0ubWluRmlsdGVyO1xuICAgIFx0XHRwYXJhbS5tYWdGaWx0ZXIgPSBjdXN0b21QYXJhbS5tYWdGaWx0ZXIgfHwgcGFyYW0ubWFnRmlsdGVyO1xuICAgIFx0XHRwYXJhbS5mb3JtYXQgPSBjdXN0b21QYXJhbS5mb3JtYXQgfHwgcGFyYW0uZm9ybWF0O1xuICAgIFx0XHRwYXJhbS50eXBlID0gY3VzdG9tUGFyYW0udHlwZSB8fCBwYXJhbS50eXBlO1xuICAgIFx0XHRwYXJhbS5zdGVuY2lsQnVmZmVyID0gY3VzdG9tUGFyYW0uc3RlbmNpbEJ1ZmZlciB8fCBwYXJhbS5zdGVuY2lsQnVmZmVyO1xuICAgIFx0XHRwYXJhbS5kZXB0aEJ1ZmZlciA9IGN1c3RvbVBhcmFtLmRlcHRoQnVmZmVyIHx8IHBhcmFtLmRlcHRoQnVmZmVyO1xuXG4gICAgXHR9XG5cbiAgICBcdGxldCBidWYgPSBuZXcgVEhSRUUuV2ViR0xSZW5kZXJUYXJnZXQoIHRoaXMudW5pZm9ybXMuZGF0YVNpemUudmFsdWUueCwgdGhpcy51bmlmb3Jtcy5kYXRhU2l6ZS52YWx1ZS55LCBwYXJhbSApO1xuXG5cdFx0bGV0IGRhdGEgPSB7IGJ1ZmZlcjogYnVmIH07XG5cblx0XHR0aGlzLnJlbmRlclRhcmdldHMucHVzaCggYnVmICk7XG5cbiAgICBcdGlmICggaW5pdFRleCApIHtcblxuICAgIFx0XHRsZXQgaW5pdEtlcm5lbCA9IHRoaXMuY3JlYXRlS2VybmVsKCB7XG5cdFx0XHRcdGZyYWdtZW50U2hhZGVyOiBwYXNzVGhyb3VnaEZyYWcsXG5cdFx0XHRcdHVuaWZvcm1zOiB7XG5cdFx0XHRcdFx0dGV4OiB7XG5cdFx0XHRcdFx0XHR2YWx1ZTogaW5pdFRleFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fSApO1xuXG4gICAgXHRcdHRoaXMuY29tcHV0ZSggaW5pdEtlcm5lbCwgZGF0YSApO1xuXG4gICAgXHR9XG5cbiAgICBcdHJldHVybiBkYXRhO1xuXG5cdH1cblxuXHRwdWJsaWMgY3JlYXRlS2VybmVsKCBwYXJhbTogVEhSRUUuU2hhZGVyTWF0ZXJpYWxQYXJhbWV0ZXJzICk6IEdQVUNvbXB1dGF0aW9uS2VybmVsIHtcblxuICAgIFx0bGV0IHVuaTogVW5pZm9ybXMgPSBVbmlmb3Jtc0xpYi5tZXJnZVVuaWZvcm1zKCBwYXJhbS51bmlmb3JtcywgdGhpcy51bmlmb3JtcyApO1xuXG5cdFx0cGFyYW0udW5pZm9ybXMgPSB1bmk7XG5cdFx0cGFyYW0udmVydGV4U2hhZGVyID0gcGFyYW0udmVydGV4U2hhZGVyIHx8IHZlcnQ7XG5cbiAgICBcdGxldCBtYXQgPSBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBhcmFtICk7XG5cbiAgICBcdHRoaXMubWF0ZXJpYWxzLnB1c2goIG1hdCApO1xuXG4gICAgXHRsZXQga2VybmVsOiBHUFVDb21wdXRhdGlvbktlcm5lbCA9IHtcbiAgICBcdFx0bWF0ZXJpYWw6IG1hdCxcbiAgICBcdFx0dW5pZm9ybXM6IHBhcmFtLnVuaWZvcm1zXG4gICAgXHR9O1xuXG4gICAgXHRyZXR1cm4ga2VybmVsO1xuXG5cdH1cblxuXHRwdWJsaWMgY29tcHV0ZSgga2VybmVsOiBHUFVDb21wdXRhdGlvbktlcm5lbCwgZGF0YTogR1BVY29tcHV0YXRpb25EYXRhLCBjYW1lcmE/OiBUSFJFRS5DYW1lcmEgKSB7XG5cbiAgICBcdGxldCB0ZW1wOiBHUFVjb21wdXRhdGlvbkRhdGE7XG5cbiAgICBcdGlmICggZGF0YS5idWZmZXIudGV4dHVyZS5tYWdGaWx0ZXIgPT0gVEhSRUUuTGluZWFyRmlsdGVyICkge1xuXG4gICAgXHRcdHRlbXAgPSB0aGlzLnRlbXBEYXRhTGluZWFyO1xuXG4gICAgXHR9IGVsc2Uge1xuXG4gICAgXHRcdHRlbXAgPSB0aGlzLnRlbXBEYXRhTmVhcjtcblxuICAgIFx0fVxuXG4gICAgXHR0aGlzLm1lc2gubWF0ZXJpYWwgPSBrZXJuZWwubWF0ZXJpYWw7XG5cbiAgICBcdGxldCBjdXJyZW50UmVuZGVyVGFyZ2V0ID0gdGhpcy5yZW5kZXJlci5nZXRSZW5kZXJUYXJnZXQoKTtcblxuICAgIFx0dGhpcy5yZW5kZXJlci5zZXRSZW5kZXJUYXJnZXQoIHRlbXAuYnVmZmVyICk7XG5cbiAgICBcdHRoaXMucmVuZGVyZXIucmVuZGVyKCB0aGlzLnNjZW5lLCBjYW1lcmEgfHwgdGhpcy5jYW1lcmEgKTtcblxuICAgIFx0dGhpcy5zd2FwQnVmZmVycyggZGF0YSwgdGVtcCApO1xuXG4gICAgXHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggY3VycmVudFJlbmRlclRhcmdldCApO1xuXG5cdH1cblxuXHRwcm90ZWN0ZWQgc3dhcEJ1ZmZlcnMoIGIxOiBHUFVjb21wdXRhdGlvbkRhdGEsIGIyOiBHUFVjb21wdXRhdGlvbkRhdGEgKSB7XG5cbiAgICBcdGxldCB0bXAgPSBiMS5idWZmZXI7XG4gICAgXHRiMS5idWZmZXIgPSBiMi5idWZmZXI7XG4gICAgXHRiMi5idWZmZXIgPSB0bXA7XG5cblx0fVxuXG5cdHB1YmxpYyBkaXNwb3NlKCkge1xuXG4gICAgXHRsZXQgZ2VvID0gdGhpcy5tZXNoLmdlb21ldHJ5O1xuICAgIFx0Z2VvLmRpc3Bvc2UoKTtcblxuICAgIFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5tYXRlcmlhbHMubGVuZ3RoOyBpICsrICkge1xuXG4gICAgXHRcdHRoaXMubWF0ZXJpYWxzWyBpIF0uZGlzcG9zZSgpO1xuXG4gICAgXHR9XG5cbiAgICBcdHRoaXMuc2NlbmUucmVtb3ZlKCB0aGlzLm1lc2ggKTtcblxuICAgIFx0dGhpcy50ZW1wRGF0YUxpbmVhci5idWZmZXIuZGlzcG9zZSgpO1xuICAgIFx0dGhpcy50ZW1wRGF0YU5lYXIuYnVmZmVyLmRpc3Bvc2UoKTtcblxuXHR9XG5cblx0cHVibGljIHJlc2l6ZURhdGEoIGRhdGFTaXplOiBUSFJFRS5WZWN0b3IyICkge1xuXG5cdFx0dGhpcy5kYXRhU2l6ZS5jb3B5KCBkYXRhU2l6ZSApO1xuXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5yZW5kZXJUYXJnZXRzLmxlbmd0aDsgaSArKyApIHtcblxuXHRcdFx0bGV0IHRhcmdldCA9IHRoaXMucmVuZGVyVGFyZ2V0c1sgaSBdO1xuXG5cdFx0XHR0YXJnZXQuc2V0U2l6ZSggZGF0YVNpemUueCwgZGF0YVNpemUueSApO1xuXG5cdFx0fVxuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVHJhbnNmb3JtIHtcblx0cG9zaXRpb24/OiBUSFJFRS5WZWN0b3IzO1xuXHRyb3RhdGlvbj86IFRIUkVFLlF1YXRlcm5pb247XG5cdHNjYWxlPzogbnVtYmVyO1xufVxuXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQmFzZVRyYW5zZm9ybSB7XG5cdHBvc2l0aW9uOiBUSFJFRS5WZWN0b3IzO1xuXHRyb3RhdGlvbjogVEhSRUUuUXVhdGVybmlvbjtcblx0c2NhbGU6IFRIUkVFLlZlY3RvcjNcbn1cblxuZXhwb3J0IGNsYXNzIExheW91dENvbnRyb2xsZXIge1xuXG5cdHByb3RlY3RlZCBvYmo6IFRIUkVFLk9iamVjdDNEO1xuXHRwcm90ZWN0ZWQgYmFzZVRyYW5zZm9ybTogQmFzZVRyYW5zZm9ybTtcblx0cHJvdGVjdGVkIHRyYW5zZm9ybTogVHJhbnNmb3JtO1xuXG5cdGNvbnN0cnVjdG9yKCBvYmplY3Q6IFRIUkVFLk9iamVjdDNELCB0cmFuc2Zvcm06IFRyYW5zZm9ybSwgaXNBYnNvbHV0ZVBvc2l0aW9uPzogYm9vbGVhbiApIHtcblxuXHRcdHRoaXMub2JqID0gb2JqZWN0O1xuXG5cdFx0dGhpcy5iYXNlVHJhbnNmb3JtID0ge1xuXHRcdFx0cG9zaXRpb246IHRoaXMub2JqLnBvc2l0aW9uLmNsb25lKCksXG5cdFx0XHRyb3RhdGlvbjogdGhpcy5vYmoucXVhdGVybmlvbi5jbG9uZSgpLFxuXHRcdFx0c2NhbGU6IHRoaXMub2JqLnNjYWxlLmNsb25lKClcblx0XHR9O1xuXG5cdFx0dGhpcy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG5cblx0XHRpZiAoICEgaXNBYnNvbHV0ZVBvc2l0aW9uICkge1xuXG5cdFx0XHR0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbiAmJiB0aGlzLnRyYW5zZm9ybS5wb3NpdGlvbi5hZGQoIHRoaXMub2JqLnBvc2l0aW9uICk7XG5cdFx0XHR0aGlzLnRyYW5zZm9ybS5yb3RhdGlvbiAmJiB0aGlzLnRyYW5zZm9ybS5yb3RhdGlvbi5tdWx0aXBseSggdGhpcy5vYmoucXVhdGVybmlvbiApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwdWJsaWMgdXBkYXRlVHJhbnNmb3JtKCB3ZWlnaHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggdGhpcy50cmFuc2Zvcm0ucG9zaXRpb24gKSB7XG5cblx0XHRcdHRoaXMub2JqLnBvc2l0aW9uLmNvcHkoIHRoaXMuYmFzZVRyYW5zZm9ybS5wb3NpdGlvbi5jbG9uZSgpLmxlcnAoIHRoaXMudHJhbnNmb3JtLnBvc2l0aW9uLCB3ZWlnaHQgKSApO1xuXG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLnRyYW5zZm9ybS5yb3RhdGlvbiApIHtcblxuXHRcdFx0dGhpcy5vYmoucXVhdGVybmlvbi5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0ucm90YXRpb24uY2xvbmUoKS5zbGVycCggdGhpcy50cmFuc2Zvcm0ucm90YXRpb24sIHdlaWdodCApICk7XG5cblx0XHR9XG5cblx0XHRpZiAoIHRoaXMudHJhbnNmb3JtLnNjYWxlICkge1xuXG5cdFx0XHR0aGlzLm9iai5zY2FsZS5jb3B5KCB0aGlzLmJhc2VUcmFuc2Zvcm0uc2NhbGUuY2xvbmUoKS5tdWx0aXBseVNjYWxhciggdGhpcy50cmFuc2Zvcm0uc2NhbGUgKiAoIHdlaWdodCApICsgMS4wIC0gd2VpZ2h0ICkgKTtcblxuXHRcdH1cblxuXHR9XG5cbn1cbiIsImV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBMZXJwRnVuYzxUPntcblx0KCBhOiBULCBiOiBULCB0OiBudW1iZXIgKTogVDtcbn1cblxuZXhwb3J0IG5hbWVzcGFjZSBMZXJwcyB7XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlciggYTogbnVtYmVyLCBiOiBudW1iZXIsIHQ6IG51bWJlciApIHtcblxuXHRcdHJldHVybiBhICsgKCBiIC0gYSApICogdDtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIG51bWJlckFycmF5KCBhOiBudW1iZXJbXSwgYjogbnVtYmVyW10sIHQ6IG51bWJlciApIHtcblxuXHRcdGlmICggYS5sZW5ndGggPT0gYi5sZW5ndGggKSB7XG5cblx0XHRcdGxldCBjID0gW107XG5cblx0XHRcdGZvciAoIGxldCBpID0gMDsgaSA8IGEubGVuZ3RoOyBpICsrICkge1xuXG5cdFx0XHRcdGMucHVzaCggYVsgaSBdICsgKCBiWyBpIF0gLSBhWyBpIF0gKSAqIHQgKTtcblxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gYztcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGNvbnNvbGUubG9nKCAnRGlmZmVyZW50IGxlbmd0aCBBcnJheXMhISEnICk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdH1cblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFVmVjdG9ycyggYTogVEhSRUUuVmVjdG9yMiAmIFRIUkVFLlZlY3RvcjMgJiBUSFJFRS5WZWN0b3I0ICYgVEhSRUUuQ29sb3IsIGI6IFRIUkVFLlZlY3RvcjIgJiBUSFJFRS5WZWN0b3IzICYgVEhSRUUuVmVjdG9yNCAmIFRIUkVFLkNvbG9yLCB0OiBudW1iZXIgKSB7XG5cblx0XHRyZXR1cm4gYS5jbG9uZSgpLmxlcnAoIGIsIHQgKTtcblxuXHR9XG5cblx0ZXhwb3J0IGZ1bmN0aW9uIFRIUkVFUXVhdGVybmlvbiggYTogVEhSRUUuUXVhdGVybmlvbiwgYjogVEhSRUUuUXVhdGVybmlvbiwgdDogbnVtYmVyICkge1xuXG5cdFx0cmV0dXJuIGEuY2xvbmUoKS5zbGVycCggYiwgdCApO1xuXG5cdH1cblxuXHRleHBvcnQgZnVuY3Rpb24gVEhSRUVFdWxlciggYTogVEhSRUUuRXVsZXIsIGI6IFRIUkVFLkV1bGVyLCB0OiBudW1iZXIgKSB7XG5cblx0XHRsZXQgYWMgPSBhLmNsb25lKCk7XG5cdFx0bGV0IGJjID0gYi5jbG9uZSgpO1xuXG5cdFx0YWMueCA9IGFjLnggKyAoIGJjLnggLSBhYy54ICkgKiB0O1xuXHRcdGFjLnkgPSBhYy55ICsgKCBiYy55IC0gYWMueSApICogdDtcblx0XHRhYy56ID0gYWMueiArICggYmMueiAtIGFjLnogKSAqIHQ7XG5cblx0XHRyZXR1cm4gYWM7XG5cblx0fVxuXG5cdGV4cG9ydCBmdW5jdGlvbiBnZXRMZXJwRnVuYyggdmFsdWU6IGFueSApIHtcblxuXHRcdGlmICggdHlwZW9mICggdmFsdWUgKSA9PSAnbnVtYmVyJyApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLm51bWJlcjtcblxuXHRcdH0gZWxzZSBpZiAoIHZhbHVlIGluc3RhbmNlb2YgQXJyYXkgJiYgdHlwZW9mICggdmFsdWVbIDAgXSApID09ICdudW1iZXInICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMubnVtYmVyQXJyYXk7XG5cblx0XHR9IGVsc2UgaWYgKCB2YWx1ZS5pc1ZlY3RvcjIgfCB2YWx1ZS5pc1ZlY3RvcjMgfCB2YWx1ZS5pc1ZlY3RvcjQgfCB2YWx1ZS5pc0NvbG9yICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVWZWN0b3JzO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUuaXNRdWF0ZXJuaW9uICkge1xuXG5cdFx0XHRyZXR1cm4gTGVycHMuVEhSRUVRdWF0ZXJuaW9uO1xuXG5cdFx0fSBlbHNlIGlmICggdmFsdWUuaXNFdWxlciApIHtcblxuXHRcdFx0cmV0dXJuIExlcnBzLlRIUkVFRXVsZXI7XG5cblx0XHR9XG5cblx0fVxuXG59XG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XG5cbmV4cG9ydCBjbGFzcyBNb3VzZVJvdGF0b3Ige1xuXG5cdHB1YmxpYyB0YXJnZXQ6IFRIUkVFLk9iamVjdDNEO1xuXHRwdWJsaWMgc2Nyb2xsVmVsOiBUSFJFRS5WZWN0b3IyO1xuXG5cdGNvbnN0cnVjdG9yKCBvYmpzOiBUSFJFRS5PYmplY3QzRCApIHtcblxuXHRcdHRoaXMudGFyZ2V0ID0gb2JqcztcblxuXHRcdHRoaXMuc2Nyb2xsVmVsID0gbmV3IFRIUkVFLlZlY3RvcjIoKTtcblxuXHR9XG5cblx0dXBkYXRlKCkge1xuXG5cdFx0dGhpcy5zY3JvbGxWZWwubXVsdGlwbHlTY2FsYXIoIDAuOTYgKTtcblxuXHRcdGxldCBheGlzID0gbmV3IFRIUkVFLlZlY3RvcjMoIHRoaXMuc2Nyb2xsVmVsLnksIHRoaXMuc2Nyb2xsVmVsLngsIDAuMCApLm5vcm1hbGl6ZSgpO1xuXG5cdFx0bGV0IHEgPSBuZXcgVEhSRUUuUXVhdGVybmlvbigpLnNldEZyb21BeGlzQW5nbGUoIGF4aXMsIHRoaXMuc2Nyb2xsVmVsLmxlbmd0aCgpICk7XG5cdFx0cS5tdWx0aXBseSggdGhpcy50YXJnZXQucXVhdGVybmlvbiApO1xuXG5cdFx0dGhpcy50YXJnZXQucXVhdGVybmlvbi5jb3B5KCBxICk7XG5cblx0fVxuXG5cdGFkZFZlbG9jaXR5KCBzY3JvbGxEZWx0YTogVEhSRUUuVmVjdG9yMiApIHtcblxuXHRcdHRoaXMuc2Nyb2xsVmVsLmFkZFZlY3RvcnMoIHRoaXMuc2Nyb2xsVmVsLCBzY3JvbGxEZWx0YS5tdWx0aXBseVNjYWxhciggMC4wMDEgKSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xyXG5pbXBvcnQgeyBQYWdlU2Nyb2xsZXIgfSBmcm9tICcuJztcclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJFdmVudEFyZ3Mge1xyXG5cdHNjcm9sbGVyOiBQYWdlU2Nyb2xsZXI7XHJcblx0c2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbjtcclxuXHRzY3JvbGxNb2RlOiBzdHJpbmc7XHJcblx0c2Nyb2xsRGVsdGE6IG51bWJlcjtcclxuXHRzY3JvbGxQb3dlcjogbnVtYmVyO1xyXG59XHJcblxyXG5kZWNsYXJlIGludGVyZmFjZSBQYWdlU2Nyb2xsZXJFdmVudCB7XHJcblx0Y29tbW9uPzogKCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgKSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuXHR1cD86ICggYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzICkgPT4gdm9pZCB8IGJvb2xlYW47XHJcblx0ZG93bj86ICggYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzICkgPT4gdm9pZCB8IGJvb2xlYW47XHJcbn1cclxuXHJcbmRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlckV2ZW50cyB7XHJcblx0b25TdGFydFNjcm9sbD86IFBhZ2VTY3JvbGxlckV2ZW50XHJcblx0b25BcnJpdmFscz86IHtcclxuXHRcdHBlcmNlbnRhZ2U6IG51bWJlcjtcclxuXHRcdGV2ZW50OiBQYWdlU2Nyb2xsZXJFdmVudDtcclxuXHR9W11cclxufVxyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFBhZ2VTY3JvbGxlclNlY3Rpb25QYXJhbXMge1xyXG5cdG5hbWU6IHN0cmluZztcclxuXHRlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHRldmVudHM/OiBQYWdlU2Nyb2xsZXJFdmVudHM7XHJcblx0c3RvcD86IGJvb2xlYW47XHJcblx0c3RhcnRTY3JvbGxVcD86IG51bWJlcjtcclxuXHRzdGFydFNjcm9sbERvd24/OiBudW1iZXI7XHJcblx0Ym90dG9tPzogYm9vbGVhbjtcclxufVxyXG5cclxuZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyU2VjdGlvblJlY3Qge1xyXG5cdHg6IG51bWJlcjtcclxuXHR5OiBudW1iZXI7XHJcblx0d2lkdGg6IG51bWJlcjtcclxuXHRoZWlnaHQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VTY3JvbGxlclNlY3Rpb24ge1xyXG5cclxuXHRwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cdHB1YmxpYyBlbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHRwdWJsaWMgcmVjdDogUGFnZVNjcm9sbGVyU2VjdGlvblJlY3Q7XHJcblx0cHVibGljIHN0YXJ0U2Nyb2xsVXA6IG51bWJlcjtcclxuXHRwdWJsaWMgc3RhcnRTY3JvbGxEb3duOiBudW1iZXI7XHJcblx0cHVibGljIHN0b3A/OiBib29sZWFuO1xyXG5cdHB1YmxpYyBldmVudHM/OiBQYWdlU2Nyb2xsZXJFdmVudHM7XHJcblx0cHVibGljIGJvdHRvbT86IGJvb2xlYW47XHJcblx0cHVibGljIHRpbWVsaW5lUGVyY2VudGFnZTogbnVtYmVyID0gMDtcclxuXHJcblx0Y29uc3RydWN0b3IoIHBhcmFtczogUGFnZVNjcm9sbGVyU2VjdGlvblBhcmFtcyApIHtcclxuXHJcblx0XHR0aGlzLm5hbWUgPSBwYXJhbXMubmFtZTtcclxuXHRcdHRoaXMuZWxlbWVudCA9IHBhcmFtcy5lbGVtZW50O1xyXG5cdFx0dGhpcy5yZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cdFx0dGhpcy5zdG9wID0gcGFyYW1zLnN0b3A7XHJcblx0XHR0aGlzLmV2ZW50cyA9IHBhcmFtcy5ldmVudHM7XHJcblx0XHR0aGlzLmJvdHRvbSA9IHBhcmFtcy5ib3R0b207XHJcblx0XHR0aGlzLnN0YXJ0U2Nyb2xsRG93biA9IHBhcmFtcy5zdGFydFNjcm9sbERvd24gfHwgMDtcclxuXHRcdHRoaXMuc3RhcnRTY3JvbGxVcCA9IHBhcmFtcy5zdGFydFNjcm9sbFVwIHx8IDA7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVSZWN0KCAwICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBpc1BhZ2VTY3JvbGxlclNlY3Rpb24oKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZVJlY3QoIHNjcm9sbFBvczogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMucmVjdCA9IHtcclxuXHRcdFx0eDogdGhpcy5lbGVtZW50Lm9mZnNldExlZnQsXHJcblx0XHRcdHk6IHRoaXMuZWxlbWVudC5vZmZzZXRUb3AgLSBzY3JvbGxQb3MsXHJcblx0XHRcdHdpZHRoOiB0aGlzLmVsZW1lbnQub2Zmc2V0V2lkdGgsXHJcblx0XHRcdGhlaWdodDogdGhpcy5lbGVtZW50Lm9mZnNldEhlaWdodFxyXG5cdFx0fTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0U2Nyb2xsUGVyY2VudGFnZSggb2Zmc2V0UG9zPzogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCBib3R0b21PZmZzZXQgPSAoIHRoaXMuYm90dG9tID8gdGhpcy5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKTtcclxuXHRcdGxldCBwb3MgPSAoIHRoaXMucmVjdC55ICsgYm90dG9tT2Zmc2V0ICkgLSAoIG9mZnNldFBvcyB8fCAwICk7XHJcblxyXG5cdFx0bGV0IGZpcnN0SGFsZkhlaWdodCA9IHRoaXMuYm90dG9tID8gdGhpcy5yZWN0LmhlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHRcdGxldCBmaXJzdEhhbGYgPSBNYXRoLm1pbiggMS4wLCAxLjAgLSAoIHBvcyAvIGZpcnN0SGFsZkhlaWdodCApICk7XHJcblxyXG5cdFx0bGV0IHNlY29uZEhhbGZIZWlnaHQgPSB0aGlzLmJvdHRvbSA/IHdpbmRvdy5pbm5lckhlaWdodCA6IHRoaXMucmVjdC5oZWlnaHQ7XHJcblx0XHRsZXQgc2Vjb25kSGFsZiA9IE1hdGgubWF4KCAwLjAsIC0gcG9zIC8gc2Vjb25kSGFsZkhlaWdodCApO1xyXG5cclxuXHRcdGxldCBwZXJjZW50YWdlID0gZmlyc3RIYWxmICsgc2Vjb25kSGFsZjtcclxuXHJcblx0XHRyZXR1cm4gcGVyY2VudGFnZTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcbmltcG9ydCB7IFBhZ2VTY3JvbGxlclNlY3Rpb24sIFBhZ2VTY3JvbGxlclNlY3Rpb25QYXJhbXMsIFBhZ2VTY3JvbGxlckV2ZW50QXJncyB9IGZyb20gJy4vUGFnZVNjcm9sbGVyU2VjdGlvbic7XHJcbmltcG9ydCB7IEVhc2luZ0Z1bmMsIEVhc2luZ3MgfSBmcm9tICcuLi9FYXNpbmdzJztcclxuaW1wb3J0IHsgQW5pbWF0b3IgfSBmcm9tICcuLi9BbmltYXRvcic7XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgUGFnZVNjcm9sbGVyQXV0b01vdmVQYXJhbSB7XHJcblx0dGFyZ2V0OiBzdHJpbmcgfCBudW1iZXIgfCBQYWdlU2Nyb2xsZXJTZWN0aW9uO1xyXG5cdGR1cmF0aW9uPzogbnVtYmVyO1xyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcblx0Y2FsbEJhY2s/OiBGdW5jdGlvbjtcclxuXHRib3R0b20/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZVNjcm9sbGVyIHtcclxuXHJcblx0cHJvdGVjdGVkIGFuaW1hdG9yOiBBbmltYXRvcjtcclxuXHRwcm90ZWN0ZWQgaXNBdXRvTW92ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwcm90ZWN0ZWQgcGFyZW50RWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblx0cHJvdGVjdGVkIHBhcmVudEVsZW1lbnRIZWlnaHQ6IG51bWJlcjtcclxuXHJcblx0cHJvdGVjdGVkIHNlY3Rpb25zOiBQYWdlU2Nyb2xsZXJTZWN0aW9uW107XHJcblxyXG5cdHB1YmxpYyBkZWxheVNwZWVkOiBudW1iZXIgPSAwLjE7XHJcblx0cHVibGljIGRyYWdEZWxheVNwZWVkOiBudW1iZXIgPSAwLjQ7XHJcblx0cHJvdGVjdGVkIGlzVG91Y2hpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcm90ZWN0ZWQgZGVsdGFNZW06IG51bWJlciA9IDA7XHJcblxyXG5cdHByb3RlY3RlZCBzY3JvbGxSZWFkeTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByb3RlY3RlZCBzdW1EZWx0YTogbnVtYmVyID0gMDtcclxuXHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQb3M6IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQb3NNZW06IG51bWJlciA9IDA7XHJcblx0cHJvdGVjdGVkIF9zY3JvbGxQZXJjZW50YWdlOiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgX3Njcm9sbFBvc0RlbGF5OiBudW1iZXIgPSAwO1xyXG5cdHByb3RlY3RlZCBfc2Nyb2xsUGVyY2VudGFnZURlbGF5OiBudW1iZXIgPSAwO1xyXG5cclxuXHRwcm90ZWN0ZWQgY2F1Z2h0U2VjdGlvbjogUGFnZVNjcm9sbGVyU2VjdGlvbiB8IG51bGw7XHJcblx0cHJvdGVjdGVkIGRyYWdTdG9wOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJvdGVjdGVkIGRyYWdVbmxvY2tSZWFkeTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCBwYXJlbnRFbGVtZW50OiBIVE1MRWxlbWVudCApIHtcclxuXHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50O1xyXG5cdFx0dGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0ID0gcGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5zZWN0aW9ucyA9IFtdO1xyXG5cdFx0dGhpcy5jYXVnaHRTZWN0aW9uID0gbnVsbDtcclxuXHJcblx0XHQvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdFx0XHRpbml0IEFuaW1hdG9yXHJcblx0XHQtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuXHRcdHRoaXMuYW5pbWF0b3IgPSBuZXcgQW5pbWF0b3IoKTtcclxuXHJcblx0XHR0aGlzLmFuaW1hdG9yLmFkZCgge1xyXG5cdFx0XHRuYW1lOiAnc2Nyb2xsUG9zJyxcclxuXHRcdFx0aW5pdFZhbHVlOiAwLFxyXG5cdFx0XHRlYXNpbmc6IEVhc2luZ3Muc2lnbW9pZCgpXHJcblx0XHR9ICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQb3MoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFBvcztcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBvc0RlbGF5KCkge1xyXG5cclxuXHRcdHJldHVybiB0aGlzLl9zY3JvbGxQb3NEZWxheTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFBlcmNlbnRhZ2UoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2U7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCBzY3JvbGxQZXJjZW50YWdlRGVsYXkoKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2VEZWxheTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHNjcm9sbFRpbWVsaW5lUGVyY2VudGFnZSgpIHtcclxuXHJcblx0XHRsZXQgc3VtID0gMDtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdGxldCBzZWMgPSB0aGlzLnNlY3Rpb25zWyBpIF07XHJcblx0XHRcdGxldCBzZWNCZWYgPSB0aGlzLnNlY3Rpb25zWyBpIC0gMSBdO1xyXG5cclxuXHRcdFx0bGV0IGEgPSBNYXRoLm1heCggMC4wLCBzZWMuZWxlbWVudC5vZmZzZXRUb3AgLSB0aGlzLnNjcm9sbFBvc0RlbGF5ICsgKCBzZWMuYm90dG9tID8gc2VjLnJlY3QuaGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0IDogMCApICk7XHJcblx0XHRcdGxldCBiID0gKCAoIHNlY0JlZiA/IHNlY0JlZi5yZWN0LmhlaWdodCAtICggc2VjQmVmLmJvdHRvbSA/IHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKSA6IDAgKSArICggc2VjLmJvdHRvbSA/IHNlYy5yZWN0LmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodCA6IDAgKSApIHx8IDE7XHJcblxyXG5cdFx0XHRsZXQgZCA9IDEuMCAtICggYSAvIGIgKTtcclxuXHRcdFx0ZCA9IE1hdGgubWF4KCAwLjAsIGQgKTtcclxuXHJcblx0XHRcdHN1bSArPSBkO1xyXG5cclxuXHRcdFx0aWYgKCBkIDwgMS4wICkgYnJlYWs7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBzdW0gLyB0aGlzLnNlY3Rpb25zLmxlbmd0aDtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYWRkKCBzZWN0aW9uOiBQYWdlU2Nyb2xsZXJTZWN0aW9uICkge1xyXG5cclxuXHRcdHRoaXMuc2VjdGlvbnMucHVzaCggc2VjdGlvbiApO1xyXG5cclxuXHRcdHRoaXMuc29ydFNlY3Rpb25zKCk7XHJcblxyXG5cdFx0cmV0dXJuIHNlY3Rpb247XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHNvcnRTZWN0aW9ucygpIHtcclxuXHJcblx0XHR0aGlzLnNlY3Rpb25zLnNvcnQoICggYTogUGFnZVNjcm9sbGVyU2VjdGlvbiwgYjogUGFnZVNjcm9sbGVyU2VjdGlvbiApOiBudW1iZXIgPT4ge1xyXG5cclxuXHRcdFx0cmV0dXJuIGEucmVjdC55ID4gYi5yZWN0LnkgPyAxIDogLSAxO1xyXG5cclxuXHRcdH0gKTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB0aGlzLnNlY3Rpb25zLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdHRoaXMuc2VjdGlvbnNbIGkgXS50aW1lbGluZVBlcmNlbnRhZ2UgPSAoIGkgKyAxICkgLyB0aGlzLnNlY3Rpb25zLmxlbmd0aDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCggbmFtZTogc3RyaW5nICkge1xyXG5cclxuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHRoaXMuc2VjdGlvbnMubGVuZ3RoOyBpICsrICkge1xyXG5cclxuXHRcdFx0aWYgKCB0aGlzLnNlY3Rpb25zWyBpIF0ubmFtZSA9PSBuYW1lICkgcmV0dXJuIHRoaXMuc2VjdGlvbnNbIGkgXTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS53YXJuKCAnc2VjdGlvbiBcIicgKyBuYW1lICsgJ1wiIGlzIG5vdCBleGlzdC4nICk7XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHVwZGF0ZSggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVQYXJlbnRFbGVtZW50KCk7XHJcblxyXG5cdFx0dGhpcy51cGRhdGVTY3JvbGxQb3MoIGRlbHRhVGltZSApO1xyXG5cclxuXHRcdHRoaXMuYXBwbHlQYXJlbnRFbGVtZW50VHJhbnNmb3JtKCk7XHJcblxyXG5cdFx0dGhpcy5zdW1EZWx0YSA9IDAuMDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgdXBkYXRlU2Nyb2xsUG9zKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnVwZGF0ZUF1dG9Nb3ZlKCBkZWx0YVRpbWUgKTtcclxuXHJcblx0XHR0aGlzLmFkZFNjcm9sbFBvcygpO1xyXG5cclxuXHRcdHRoaXMuY2FsY1Njcm9sbFByb3BlcnRpZXMoIGRlbHRhVGltZSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCB1cGRhdGVBdXRvTW92ZSggZGVsdGFUaW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5hbmltYXRvci51cGRhdGUoIGRlbHRhVGltZSApO1xyXG5cclxuXHRcdGlmICggdGhpcy5pc0F1dG9Nb3ZlICkge1xyXG5cclxuXHRcdFx0bGV0IHBvcyA9IHRoaXMuYW5pbWF0b3IuZ2V0PG51bWJlcj4oICdzY3JvbGxQb3MnICk7XHJcblxyXG5cdFx0XHRpZiAoIHBvcyApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5zdW1EZWx0YSA9IHBvcyAtIHRoaXMuc2Nyb2xsUG9zO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYWRkU2Nyb2xsUG9zKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy5jaGVja1VubG9ja1N0b3BTY3JvbGwoIHRoaXMuc3VtRGVsdGEgKSApIHtcclxuXHJcblx0XHRcdGxldCBzdG9wUG9zID0gdGhpcy5jaGVja1Rocm93KCB0aGlzLnN1bURlbHRhICk7XHJcblxyXG5cdFx0XHRpZiAoIHN0b3BQb3MgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3Njcm9sbFBvcyA9IHN0b3BQb3M7XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHR0aGlzLl9zY3JvbGxQb3MgKz0gdGhpcy5zdW1EZWx0YTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuX3Njcm9sbFBvcyA9IE1hdGgubWF4KCBNYXRoLm1pbiggdGhpcy5fc2Nyb2xsUG9zLCB0aGlzLnBhcmVudEVsZW1lbnRIZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgKSwgMCApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tVbmxvY2tTdG9wU2Nyb2xsKCBzY3JvbGxEZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGxldCB1bmxvY2tEaXI6IG51bWJlciA9IDA7XHJcblx0XHRsZXQgdW5sb2NrOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdFx0aWYgKCB0aGlzLmNhdWdodFNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHRsZXQgZGlzdGFuY2UgPSB0aGlzLnNjcm9sbFBvcyAtIHRoaXMuc2Nyb2xsUG9zRGVsYXk7XHJcblxyXG5cdFx0XHRpZiAoIHNjcm9sbERlbHRhICogZGlzdGFuY2UgPCAwIHx8IE1hdGguYWJzKCBkaXN0YW5jZSApIDwgMTAuMCB8fCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRcdGlmICggc2Nyb2xsRGVsdGEgPCAwICkge1xyXG5cclxuXHRcdFx0XHRcdGlmICggLSBzY3JvbGxEZWx0YSA+ICggdGhpcy5jYXVnaHRTZWN0aW9uLnN0YXJ0U2Nyb2xsVXAgfHwgMCApIHx8IHRoaXMuaXNBdXRvTW92ZSApIHtcclxuXHJcblx0XHRcdFx0XHRcdHVubG9ja0RpciA9IC0gMTtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZiAoIHNjcm9sbERlbHRhID4gMCApIHtcclxuXHJcblx0XHRcdFx0XHRpZiAoIHNjcm9sbERlbHRhID4gKCB0aGlzLmNhdWdodFNlY3Rpb24uc3RhcnRTY3JvbGxEb3duIHx8IDAgKSB8fCB0aGlzLmlzQXV0b01vdmUgKSB7XHJcblxyXG5cdFx0XHRcdFx0XHR1bmxvY2tEaXIgPSAxO1xyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCB1bmxvY2tEaXIgIT0gMCAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbCApIHtcclxuXHJcblx0XHRcdFx0XHRsZXQgYXJnczogUGFnZVNjcm9sbGVyRXZlbnRBcmdzID0ge1xyXG5cdFx0XHRcdFx0XHRzY3JvbGxlcjogdGhpcyxcclxuXHRcdFx0XHRcdFx0c2VjdGlvbjogdGhpcy5jYXVnaHRTZWN0aW9uLFxyXG5cdFx0XHRcdFx0XHRzY3JvbGxNb2RlOiB0aGlzLmlzQXV0b01vdmUgPyAnYXV0bycgOiAnbWFudWFsJyxcclxuXHRcdFx0XHRcdFx0c2Nyb2xsRGVsdGE6IHNjcm9sbERlbHRhLFxyXG5cdFx0XHRcdFx0XHRzY3JvbGxQb3dlcjogTWF0aC5hYnMoIHNjcm9sbERlbHRhICksXHJcblx0XHRcdFx0XHR9O1xyXG5cclxuXHRcdFx0XHRcdGxldCB1bmxvY2s6IGJvb2xlYW4gfCB2b2lkO1xyXG5cclxuXHRcdFx0XHRcdGxldCBjb21tb25VbmxvY2sgPSB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuY29tbW9uICYmIHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC5jb21tb24oIGFyZ3MgKTtcclxuXHRcdFx0XHRcdGlmICggdW5sb2NrRGlyID09IC0gMSApIHVubG9jayA9IHRoaXMuY2F1Z2h0U2VjdGlvbi5ldmVudHMub25TdGFydFNjcm9sbC51cCAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwudXAoIGFyZ3MgKTtcclxuXHRcdFx0XHRcdGlmICggdW5sb2NrRGlyID09IDEgKSB1bmxvY2sgPSB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuZG93biAmJiB0aGlzLmNhdWdodFNlY3Rpb24uZXZlbnRzLm9uU3RhcnRTY3JvbGwuZG93biggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdGlmICggY29tbW9uVW5sb2NrID09PSBmYWxzZSB8fCB1bmxvY2sgPT09IGZhbHNlICkge1xyXG5cclxuXHRcdFx0XHRcdFx0dW5sb2NrRGlyID0gMDtcclxuXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHVubG9jayA9IHVubG9ja0RpciAhPSAwO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHR1bmxvY2sgPSB0cnVlO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHVubG9ja0RpciApIHtcclxuXHJcblx0XHRcdHRoaXMuY2F1Z2h0U2VjdGlvbiA9IG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1bmxvY2s7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNoZWNrVGhyb3coIHNjcm9sbERlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwgdGhpcy5zZWN0aW9ucy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgc2VjID0gdGhpcy5zZWN0aW9uc1sgaSBdO1xyXG5cclxuXHRcdFx0c2VjLnVwZGF0ZVJlY3QoIHRoaXMuX3Njcm9sbFBvcyApO1xyXG5cclxuXHRcdFx0bGV0IHN0b3BQb3MgPSB0aGlzLmNoZWNrVGhyb3dTZWN0aW9uRXZlbnRzKCBzZWMsIHNjcm9sbERlbHRhICk7XHJcblxyXG5cdFx0XHRpZiAoIHN0b3BQb3MgIT09IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuY2F1Z2h0U2VjdGlvbiA9IHNlYztcclxuXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuaXNBdXRvTW92ZSA/IG51bGwgOiBzdG9wUG9zO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgY2hlY2tUaHJvd1NlY3Rpb25FdmVudHMoIHNlY3Rpb246IFBhZ2VTY3JvbGxlclNlY3Rpb24sIHNjcm9sbERlbHRhOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0bGV0IHBlcmNlbnRhZ2UgPSBzZWN0aW9uLmdldFNjcm9sbFBlcmNlbnRhZ2UoKTtcclxuXHRcdGxldCBtb3ZlZFBlcmNlbnRhZ2UgPSBzZWN0aW9uLmdldFNjcm9sbFBlcmNlbnRhZ2UoIHNjcm9sbERlbHRhICk7XHJcblxyXG5cdFx0aWYgKCBzZWN0aW9uLmV2ZW50cyApIHtcclxuXHJcblx0XHRcdGxldCBhcmdzOiBQYWdlU2Nyb2xsZXJFdmVudEFyZ3MgPSB7XHJcblx0XHRcdFx0c2Nyb2xsZXI6IHRoaXMsXHJcblx0XHRcdFx0c2VjdGlvbjogc2VjdGlvbixcclxuXHRcdFx0XHRzY3JvbGxNb2RlOiB0aGlzLmlzQXV0b01vdmUgPyAnYXV0bycgOiAnbWFudWFsJyxcclxuXHRcdFx0XHRzY3JvbGxEZWx0YTogc2Nyb2xsRGVsdGEsXHJcblx0XHRcdFx0c2Nyb2xsUG93ZXI6IE1hdGguYWJzKCBzY3JvbGxEZWx0YSApLFxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0aWYgKCBzZWN0aW9uLmV2ZW50cy5vbkFycml2YWxzICkge1xyXG5cclxuXHRcdFx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCBzZWN0aW9uLmV2ZW50cy5vbkFycml2YWxzLmxlbmd0aDsgaSArKyApIHtcclxuXHJcblx0XHRcdFx0XHRsZXQgYXJyaXZhbEV2ZW50ID0gc2VjdGlvbi5ldmVudHMub25BcnJpdmFsc1sgaSBdO1xyXG5cclxuXHRcdFx0XHRcdGxldCBpc1Rocm93ID0gdGhpcy5jaGVja1Rocm93TGluZSggcGVyY2VudGFnZSwgbW92ZWRQZXJjZW50YWdlLCBhcnJpdmFsRXZlbnQucGVyY2VudGFnZSApO1xyXG5cclxuXHRcdFx0XHRcdGlmICggaXNUaHJvdyAhPSAwICkge1xyXG5cclxuXHRcdFx0XHRcdFx0YXJyaXZhbEV2ZW50LmV2ZW50LmNvbW1vbiAmJiBhcnJpdmFsRXZlbnQuZXZlbnQuY29tbW9uKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0XHRpZiAoIGlzVGhyb3cgPCAwICkge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRhcnJpdmFsRXZlbnQuZXZlbnQudXAgJiYgYXJyaXZhbEV2ZW50LmV2ZW50LnVwKCBhcmdzICk7XHJcblxyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdFx0XHRhcnJpdmFsRXZlbnQuZXZlbnQuZG93biAmJiBhcnJpdmFsRXZlbnQuZXZlbnQuZG93biggYXJncyApO1xyXG5cclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIHNlY3Rpb24uc3RvcCApIHtcclxuXHJcblx0XHRcdGlmICggdGhpcy5jaGVja1Rocm93TGluZSggcGVyY2VudGFnZSwgbW92ZWRQZXJjZW50YWdlLCAxICkgKSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuZHJhZ1VubG9ja1JlYWR5ID0gZmFsc2U7XHJcblxyXG5cdFx0XHRcdHJldHVybiBzZWN0aW9uLmVsZW1lbnQub2Zmc2V0VG9wICsgKCBzZWN0aW9uLmJvdHRvbSA/IHNlY3Rpb24ucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjaGVja1Rocm93TGluZSggYTogbnVtYmVyLCBiIDpudW1iZXIsIGxpbmU6IG51bWJlciApIHtcclxuXHJcblx0XHRpZiAoIGEgPCBsaW5lICYmIGxpbmUgPD0gYiApIHtcclxuXHJcblx0XHRcdHJldHVybiAxO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGEgPiBsaW5lICYmIGxpbmUgPj0gYiApIHtcclxuXHJcblx0XHRcdHJldHVybiAtIDE7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggYSA9PSBsaW5lICYmIGxpbmUgPT0gYiApIHtcclxuXHJcblx0XHRcdHJldHVybiAyO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gMDtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGNhbGNTY3JvbGxQcm9wZXJ0aWVzKCBkZWx0YVRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLl9zY3JvbGxQb3NEZWxheSArPSAoIHRoaXMuX3Njcm9sbFBvcyAtIHRoaXMuX3Njcm9sbFBvc0RlbGF5ICkgKiAoIHRoaXMuaXNUb3VjaGluZyAmJiAhIHRoaXMuY2F1Z2h0U2VjdGlvbiA/IHRoaXMuZHJhZ0RlbGF5U3BlZWQgOiB0aGlzLmRlbGF5U3BlZWQgKSAqIE1hdGgubWluKCAxLjAsIGRlbHRhVGltZSAqIDYwICk7XHJcblxyXG5cdFx0dGhpcy5fc2Nyb2xsUGVyY2VudGFnZSA9IHRoaXMuc2Nyb2xsUG9zVG9QZXJlY250YWdlKCB0aGlzLnNjcm9sbFBvcyApO1xyXG5cclxuXHRcdHRoaXMuX3Njcm9sbFBlcmNlbnRhZ2VEZWxheSA9IHRoaXMuc2Nyb2xsUG9zVG9QZXJlY250YWdlKCB0aGlzLnNjcm9sbFBvc0RlbGF5ICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIHNjcm9sbFBvc1RvUGVyZWNudGFnZSggc2Nyb2xsUG9zOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0cmV0dXJuIHNjcm9sbFBvcyAvICggdGhpcy5wYXJlbnRFbGVtZW50SGVpZ2h0IC0gd2luZG93LmlubmVySGVpZ2h0ICk7XHJcblxyXG5cdH1cclxuXHJcblxyXG5cdHByb3RlY3RlZCB1cGRhdGVQYXJlbnRFbGVtZW50KCkge1xyXG5cclxuXHRcdHRoaXMucGFyZW50RWxlbWVudEhlaWdodCA9IHRoaXMucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQ7XHJcblxyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGFwcGx5UGFyZW50RWxlbWVudFRyYW5zZm9ybSgpIHtcclxuXHJcblx0XHR0aGlzLnBhcmVudEVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCAwLCcgKyAtIHRoaXMuc2Nyb2xsUG9zRGVsYXkudG9TdHJpbmcoKSArICdweCwgMCApJztcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2Nyb2xsKCBkZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdHRoaXMuZGVsdGFNZW0gPSAoIHRoaXMuZGVsdGFNZW0gKyBkZWx0YSApIC8gMjtcclxuXHRcdHRoaXMuc3VtRGVsdGEgKz0gZGVsdGE7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGNhdGNoKCkge1xyXG5cclxuXHRcdGlmICggdGhpcy5pc0F1dG9Nb3ZlICkgcmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuaXNUb3VjaGluZyA9IHRydWU7XHJcblx0XHR0aGlzLmRlbHRhTWVtID0gMDtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5jYXVnaHRTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0dGhpcy5fc2Nyb2xsUG9zID0gdGhpcy5fc2Nyb2xsUG9zRGVsYXk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBkcmFnKCBkZWx0YTogbnVtYmVyICkge1xyXG5cclxuXHRcdGlmICggISB0aGlzLmlzVG91Y2hpbmcgKSByZXR1cm47XHJcblxyXG5cdFx0dGhpcy5zY3JvbGwoIGRlbHRhICk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIHJlbGVhc2UoIHNuYXA6IG51bWJlciA9IDEwLjAgKSB7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMuaXNUb3VjaGluZyApIHJldHVybjtcclxuXHJcblx0XHR0aGlzLmlzVG91Y2hpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRpZiAoICEgdGhpcy5jYXVnaHRTZWN0aW9uICkge1xyXG5cclxuXHRcdFx0dGhpcy5zY3JvbGwoIHRoaXMuZGVsdGFNZW0gKiBzbmFwICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhdXRvTW92ZSggcGFyYW06IFBhZ2VTY3JvbGxlckF1dG9Nb3ZlUGFyYW0gKSB7XHJcblxyXG5cdFx0bGV0IHRhcmdldFBvczogbnVtYmVyID0gMDtcclxuXHJcblx0XHRpZiAoICggcGFyYW0udGFyZ2V0IGFzIFBhZ2VTY3JvbGxlclNlY3Rpb24gKS5pc1BhZ2VTY3JvbGxlclNlY3Rpb24gKSB7XHJcblxyXG5cdFx0XHRsZXQgdGFyZ2V0ID0gcGFyYW0udGFyZ2V0IGFzIFBhZ2VTY3JvbGxlclNlY3Rpb247XHJcblx0XHRcdGxldCBib3R0b21PZmZzZXQgPSBwYXJhbS5ib3R0b20gPyB0YXJnZXQucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwO1xyXG5cclxuXHRcdFx0dGFyZ2V0UG9zID0gdGFyZ2V0LmVsZW1lbnQub2Zmc2V0VG9wICsgYm90dG9tT2Zmc2V0O1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIHR5cGVvZiBwYXJhbS50YXJnZXQgPT0gJ3N0cmluZycgKSB7XHJcblxyXG5cdFx0XHRsZXQgdGFyZ2V0ID0gdGhpcy5nZXQoIHBhcmFtLnRhcmdldCApO1xyXG5cclxuXHRcdFx0aWYgKCB0YXJnZXQgKSB7XHJcblxyXG5cdFx0XHRcdGxldCBib3R0b21PZmZzZXQgPSBwYXJhbS5ib3R0b20gPyB0YXJnZXQucmVjdC5oZWlnaHQgLSB3aW5kb3cuaW5uZXJIZWlnaHQgOiAwO1xyXG5cclxuXHRcdFx0XHR0YXJnZXRQb3MgPSB0YXJnZXQuZWxlbWVudC5vZmZzZXRUb3AgKyBib3R0b21PZmZzZXQ7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggdHlwZW9mIHBhcmFtLnRhcmdldCA9PSAnbnVtYmVyJyApIHtcclxuXHJcblx0XHRcdHRhcmdldFBvcyA9IHBhcmFtLnRhcmdldDtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5hbmltYXRvci5zZXRWYWx1ZSggJ3Njcm9sbFBvcycsIHRoaXMuX3Njcm9sbFBvcyApO1xyXG5cdFx0dGhpcy5hbmltYXRvci5hbmltYXRlKCAnc2Nyb2xsUG9zJywgdGFyZ2V0UG9zLCBwYXJhbS5kdXJhdGlvbiwgKCkgPT4ge1xyXG5cclxuXHRcdFx0aWYgKCBwYXJhbS5jYWxsQmFjayApIHBhcmFtLmNhbGxCYWNrKCk7XHJcblxyXG5cdFx0XHR0aGlzLmlzQXV0b01vdmUgPSBmYWxzZTtcclxuXHJcblx0XHR9LCBwYXJhbS5lYXNpbmcgKTtcclxuXHJcblx0XHQvL29uU3RhcnRTY3JvbGzlhoXjgadBdXRvTW92ZeOBl+OBn+OBqOOBjeOAgeeEoemZkOODq+ODvOODl+OBq+mZpeOCi+OBruOCkumYu+atolxyXG5cdFx0dGhpcy5zdW1EZWx0YSA9ICggdGFyZ2V0UG9zIC0gdGhpcy5zdW1EZWx0YSApIC8gTWF0aC5hYnMoIHRhcmdldFBvcyAtIHRoaXMuc3VtRGVsdGEgKSAqIDAuMDAwMDE7XHJcblxyXG5cdFx0dGhpcy5pc0F1dG9Nb3ZlID0gdHJ1ZTtcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tIFwidGhyZWVcIjtcblxuZXhwb3J0IGNsYXNzIFBvaW50ZXIgZXh0ZW5kcyBUSFJFRS5FdmVudERpc3BhdGNoZXIge1xuXG5cdHByb3RlY3RlZCBpc1NQOiBib29sZWFuO1xuXHRwcm90ZWN0ZWQgaXNUb3VjaGluZzogYm9vbGVhbjtcblxuXHRwdWJsaWMgcG9zaXRpb246IFRIUkVFLlZlY3RvcjI7XG5cdHB1YmxpYyBkZWx0YTogVEhSRUUuVmVjdG9yMjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IFRIUkVFLlZlY3RvcjIoIE5hTiwgTmFOICk7XG5cdFx0dGhpcy5kZWx0YSA9IG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXG5cdFx0Y29uc3QgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0XHR0aGlzLmlzU1AgPSB1c2VyQWdlbnQuaW5kZXhPZiggJ2lQaG9uZScgKSA+PSAwIHx8IHVzZXJBZ2VudC5pbmRleE9mKCAnaVBhZCcgKSA+PSAwIHx8IHVzZXJBZ2VudC5pbmRleE9mKCAnQW5kcm9pZCcgKSA+PSAwIHx8IG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcImlQYWRcIiB8fCAoIG5hdmlnYXRvci5wbGF0Zm9ybSA9PSBcIk1hY0ludGVsXCIgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCBcIlNhZmFyaVwiICkgIT0gLSAxICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZiggXCJDaHJvbWVcIiApID09IC0gMSAmJiAoIG5hdmlnYXRvciBhcyBhbnkgKS5zdGFuZGFsb25lICE9PSB1bmRlZmluZWQgKTtcblxuXHRcdHRoaXMucG9zaXRpb24uc2V0KCBOYU4sIE5hTiApO1xuXHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdH1cblxuXHRwdWJsaWMgcmVnaXN0ZXJFbGVtZW50KCBlbG06IEhUTUxFbGVtZW50ICkge1xuXG5cdFx0Y29uc3Qgb25Ub3VjaFN0YXJ0ID0gdGhpcy5vblRvdWNoLmJpbmQoIHRoaXMsIFwic3RhcnRcIiApO1xuXHRcdGNvbnN0IG9uVG91Y2hNb3ZlID0gdGhpcy5vblRvdWNoLmJpbmQoIHRoaXMsIFwibW92ZVwiICk7XG5cdFx0Y29uc3Qgb25Ub3VjbUVuZCA9IHRoaXMub25Ub3VjaC5iaW5kKCB0aGlzLCBcImVuZFwiICk7XG5cdFx0Y29uc3Qgb25Qb2ludGVyRG93biA9IHRoaXMub25Qb2ludGVyLmJpbmQoIHRoaXMsIFwic3RhcnRcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlck1vdmUgPSB0aGlzLm9uUG9pbnRlci5iaW5kKCB0aGlzLCBcIm1vdmVcIiApO1xuXHRcdGNvbnN0IG9uUG9pbnRlclVwID0gdGhpcy5vblBvaW50ZXIuYmluZCggdGhpcywgXCJlbmRcIiApO1xuXHRcdGNvbnN0IG9uV2hlZWwgPSB0aGlzLndoZWVsLmJpbmQoIHRoaXMgKTtcblxuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiBmYWxzZSB9ICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaGVuZCcsIG9uVG91Y21FbmQsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCAncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoICdwb2ludGVybW92ZScsIG9uUG9pbnRlck1vdmUgKTtcblx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lciggJ3BvaW50ZXJ1cCcsIG9uUG9pbnRlclVwICk7XG5cdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoIFwiZHJhZ2VuZFwiLCBvblBvaW50ZXJVcCApO1xuXHRcdGVsbS5hZGRFdmVudExpc3RlbmVyKCBcIndoZWVsXCIsIG9uV2hlZWwsIHsgcGFzc2l2ZTogZmFsc2UgfSApO1xuXG5cdFx0Y29uc3Qgb25VblJlZ2lzdGVyID0gKCBlOiBhbnkgKSA9PiB7XG5cblx0XHRcdGlmICggZWxtLmlzRXF1YWxOb2RlKCBlLmVsbSApICkge1xuXG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hzdGFydCcsIG9uVG91Y2hTdGFydCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCBvblRvdWNtRW5kICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcmRvd24nLCBvblBvaW50ZXJEb3duICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcm1vdmUnLCBvblBvaW50ZXJNb3ZlICk7XG5cdFx0XHRcdGVsbS5yZW1vdmVFdmVudExpc3RlbmVyKCAncG9pbnRlcnVwJywgb25Qb2ludGVyVXAgKTtcblx0XHRcdFx0ZWxtLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwiZHJhZ2VuZFwiLCBvblBvaW50ZXJVcCApO1xuXHRcdFx0XHRlbG0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ3aGVlbFwiLCBvbldoZWVsICk7XG5cblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAndW5yZWdpc3RlcicsIG9uVW5SZWdpc3RlciApO1xuXG5cdFx0XHR9XG5cblx0XHR9O1xuXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKCAndW5yZWdpc3RlcicsIG9uVW5SZWdpc3RlciApO1xuXG5cdH1cblxuXHRwdWJsaWMgdW5yZWdpc3RlckVsZW1lbnQoIGVsbTogSFRNTEVsZW1lbnQgKSB7XG5cblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdHR5cGU6ICd1bnJlZ2lzdGVyJyxcblx0XHRcdGVsbTogZWxtLFxuXHRcdH0gKTtcblxuXHR9XG5cblx0cHVibGljIGdldFNjcmVlblBvc2l0aW9uKCB3aW5kb3dTaXplOiBUSFJFRS5WZWN0b3IyICkge1xuXG5cdFx0aWYgKCB0aGlzLnBvc2l0aW9uLnggIT0gdGhpcy5wb3NpdGlvbi54ICkgcmV0dXJuIG5ldyBUSFJFRS5WZWN0b3IyKCBOYU4sIE5hTiApO1xuXG5cdFx0Y29uc3QgcCA9IHRoaXMucG9zaXRpb24uY2xvbmUoKVxuXHRcdFx0LmRpdmlkZSggd2luZG93U2l6ZSApXG5cdFx0XHQubXVsdGlwbHlTY2FsYXIoIDIuMCApXG5cdFx0XHQuc3ViU2NhbGFyKCAxLjAgKTtcblx0XHRwLnkgKj0gLSAxO1xuXG5cdFx0cmV0dXJuIHA7XG5cblx0fVxuXG5cdHB1YmxpYyBnZXRSZWxhdGl2ZVBvc2l0aW9uKCBlbG06IEhUTUxFbGVtZW50LCBzY3JlZW4/OiBib29sZWFuICkge1xuXG5cdFx0Y29uc3QgcmVjdDogRE9NUmVjdCA9IGVsbS5nZXRDbGllbnRSZWN0cygpWyAwIF0gYXMgRE9NUmVjdDtcblxuXHRcdGxldCB4ID0gdGhpcy5wb3NpdGlvbi54IC0gcmVjdC5sZWZ0O1xuXHRcdGxldCB5ID0gdGhpcy5wb3NpdGlvbi55IC0gcmVjdC50b3A7XG5cblx0XHRpZiAoIHNjcmVlbiApIHtcblxuXHRcdFx0eCAvPSByZWN0LndpZHRoO1xuXHRcdFx0eSAvPSByZWN0LmhlaWdodDtcblxuXHRcdH1cblxuXHRcdGNvbnN0IHAgPSBuZXcgVEhSRUUuVmVjdG9yMiggeCwgeSApO1xuXG5cdFx0cmV0dXJuIHA7XG5cblx0fVxuXG5cdHByb3RlY3RlZCBzZXRQb3MoIHg6IG51bWJlciwgeTogbnVtYmVyICkge1xuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5wb3NpdGlvbi54ICE9PSB0aGlzLnBvc2l0aW9uLnggfHxcblx0XHRcdHRoaXMucG9zaXRpb24ueSAhPT0gdGhpcy5wb3NpdGlvbi55XG5cdFx0KSB7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCAwLCAwICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggeCAtIHRoaXMucG9zaXRpb24ueCwgeSAtIHRoaXMucG9zaXRpb24ueSApO1xuXG5cdFx0fVxuXG5cdFx0dGhpcy5wb3NpdGlvbi5zZXQoIHgsIHkgKTtcblxuXHR9XG5cblx0cHJvdGVjdGVkIG9uVG91Y2goIHR5cGU6IHN0cmluZywgZTogVG91Y2hFdmVudCApIHtcblxuXHRcdGNvbnN0IHRvdWNoID0gZS50b3VjaGVzWyAwIF07XG5cblx0XHRpZiAoIHRvdWNoICkge1xuXG5cdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCB0b3VjaC5wYWdlWCwgdG91Y2gucGFnZVksIHR5cGUsIGUgKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmICggdHlwZSA9PSAnZW5kJyApIHtcblxuXHRcdFx0XHR0aGlzLnRvdWNoRXZlbnRIYW5kbGVyKCBOYU4sIE5hTiwgdHlwZSwgZSApO1xuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0fVxuXG5cdHByb3RlY3RlZCBvblBvaW50ZXIoIHR5cGU6IHN0cmluZywgZTogUG9pbnRlckV2ZW50IHwgRHJhZ0V2ZW50ICkge1xuXG5cdFx0Y29uc3QgcG9pbnRlclR5cGUgPSAoIGUgYXMgUG9pbnRlckV2ZW50ICkucG9pbnRlclR5cGU7XG5cblx0XHRpZiAoIHBvaW50ZXJUeXBlICE9IG51bGwgKSB7XG5cblx0XHRcdGlmICggcG9pbnRlclR5cGUgPT0gJ21vdXNlJyAmJiAoIGUuYnV0dG9uID09IC0gMSB8fCBlLmJ1dHRvbiA9PSAwICkgKSB7XG5cblx0XHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggZS5wYWdlWCwgZS5wYWdlWSwgdHlwZSwgZSBhcyBQb2ludGVyRXZlbnQgKTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIHtcblxuXHRcdFx0dGhpcy50b3VjaEV2ZW50SGFuZGxlciggZS5wYWdlWCwgZS5wYWdlWSwgdHlwZSwgZSApO1xuXG5cdFx0fVxuXG5cblxuXHR9XG5cblx0cHJvdGVjdGVkIHRvdWNoRXZlbnRIYW5kbGVyKCBwb3NYOiBudW1iZXIsIHBvc1k6IG51bWJlciwgdHlwZTogc3RyaW5nLCBlOiBUb3VjaEV2ZW50IHwgUG9pbnRlckV2ZW50IHwgRHJhZ0V2ZW50ICkge1xuXG5cdFx0bGV0IGRpc3BhdGNoID0gZmFsc2U7XG5cblx0XHRjb25zdCB4ID0gcG9zWCAtIHdpbmRvdy5wYWdlWE9mZnNldDtcblx0XHRjb25zdCB5ID0gcG9zWSAtIHdpbmRvdy5wYWdlWU9mZnNldDtcblxuXHRcdGlmICggdHlwZSA9PSBcInN0YXJ0XCIgKSB7XG5cblx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IHRydWU7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdHRoaXMuZGVsdGEuc2V0KCAwLCAwICk7XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH0gZWxzZSBpZiAoIHR5cGUgPT0gXCJtb3ZlXCIgKSB7XG5cblx0XHRcdHRoaXMuc2V0UG9zKCB4LCB5ICk7XG5cblx0XHRcdGlmICggdGhpcy5pc1RvdWNoaW5nICkge1xuXG5cdFx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdFx0fVxuXG5cdFx0fSBlbHNlIGlmICggdHlwZSA9PSBcImVuZFwiICkge1xuXG5cdFx0XHRpZiAoICd0YXJnZXRUb3VjaGVzJyBpbiBlICkge1xuXG5cdFx0XHRcdGlmICggZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAwICkge1xuXG5cdFx0XHRcdFx0dGhpcy5pc1RvdWNoaW5nID0gZmFsc2U7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdHRoaXMuaXNUb3VjaGluZyA9IGZhbHNlO1xuXG5cdFx0XHR9XG5cblx0XHRcdGRpc3BhdGNoID0gdHJ1ZTtcblxuXHRcdH1cblxuXHRcdGlmICggZGlzcGF0Y2ggKSB7XG5cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0XHR0eXBlOiAndXBkYXRlJyxcblx0XHRcdFx0cG9pbnRlckV2ZW50OiBlLFxuXHRcdFx0XHRwb2ludGVyRXZlbnRUeXBlOiB0eXBlLFxuXHRcdFx0XHRwb3NpdGlvbjogdGhpcy5wb3NpdGlvbi5jbG9uZSgpLFxuXHRcdFx0XHRkZWx0YTogdGhpcy5kZWx0YS5jbG9uZSgpXG5cdFx0XHR9ICk7XG5cblx0XHR9XG5cblx0fVxuXG5cdHB1YmxpYyB1cGRhdGUoKSB7XG5cblx0XHRpZiAoICEgdGhpcy5pc1NQICkge1xuXG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHtcblx0XHRcdFx0dHlwZTogJ3VwZGF0ZScsXG5cdFx0XHRcdHBvaW50ZXJFdmVudDogbnVsbCxcblx0XHRcdFx0cG9pbnRlckV2ZW50VHlwZTogJ2hvdmVyJyxcblx0XHRcdFx0cG9zaXRpb246IHRoaXMucG9zaXRpb24uY2xvbmUoKSxcblx0XHRcdFx0ZGVsdGE6IHRoaXMuZGVsdGEuY2xvbmUoKVxuXHRcdFx0fSApO1xuXG5cdFx0XHR0aGlzLmRlbHRhLnNldCggMCwgMCApO1xuXG5cdFx0fVxuXG5cdH1cblxuXHRwcm90ZWN0ZWQgdHJhY2twYWRNZW1EZWx0YSA9IDA7XG5cdHByb3RlY3RlZCB0cmFja3BhZE1heCA9IGZhbHNlO1xuXG5cdHByb3RlY3RlZCB3aGVlbCggZTogV2hlZWxFdmVudCApIHtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudCgge1xuXHRcdFx0dHlwZTogJ3doZWVsJyxcblx0XHRcdHdoZWVsRXZlbnQ6IGUsXG5cdFx0fSApO1xuXG5cdH1cblxufVxuIiwiaW1wb3J0ICogYXMgVEhSRUUgZnJvbSAndGhyZWUnO1xuXG5pbXBvcnQgcGFzc1Rocm93VmVydCBmcm9tICcuL3NoYWRlcnMvcGFzc1Rocm93LnZzJztcblxudHlwZSBJbnB1dFJlbmRlclRhcmdldCA9IHsgW2tleTpzdHJpbmddOiBUSFJFRS5UZXh0dXJlIHwgVEhSRUUuVGV4dHVyZVtdIH07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUFBQYXJhbSBleHRlbmRzIFRIUkVFLlNoYWRlck1hdGVyaWFsUGFyYW1ldGVyc3tcblx0aW5wdXRSZW5kZXJUYXJnZXRzPzogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBQb3N0UHJvY2Vzc2luZyB7XG5cblx0cHJpdmF0ZSByZW5kZXJlcjogVEhSRUUuV2ViR0xSZW5kZXJlcjtcblx0cHJpdmF0ZSBzY2VuZTogVEhSRUUuU2NlbmU7XG5cdHByaXZhdGUgY2FtZXJhOiBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmE7XG5cdHByaXZhdGUgc2NyZWVuOiBUSFJFRS5NZXNoO1xuXG5cdHB1YmxpYyBlZmZlY3Q6IHtcblx0XHRtYXRlcmlhbDogVEhSRUUuU2hhZGVyTWF0ZXJpYWwsXG5cdH07XG5cblx0Y29uc3RydWN0b3IoIHJlbmRlcmVyOiBUSFJFRS5XZWJHTFJlbmRlcmVyLCBwcFBhcmFtOiBQUFBhcmFtLCBjdXN0b21HZW9tZXRyeT86IFRIUkVFLkJ1ZmZlckdlb21ldHJ5ICkge1xuXG5cdFx0dGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuXHRcdHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcblx0XHR0aGlzLmNhbWVyYSA9IG5ldyBUSFJFRS5PcnRob2dyYXBoaWNDYW1lcmEoIC0gMS4wLCAxLjAsIDEuMCwgLSAxLjAgKTtcblxuXHRcdHRoaXMuc2NyZWVuID0gbmV3IFRIUkVFLk1lc2goIGN1c3RvbUdlb21ldHJ5IHx8IG5ldyBUSFJFRS5QbGFuZUJ1ZmZlckdlb21ldHJ5KCAyLCAyICkgKTtcblx0XHR0aGlzLnNjZW5lLmFkZCggdGhpcy5zY3JlZW4gKTtcblxuXHRcdHBwUGFyYW0udmVydGV4U2hhZGVyID0gcHBQYXJhbS52ZXJ0ZXhTaGFkZXIgfHwgcGFzc1Rocm93VmVydDtcblx0XHRwcFBhcmFtLnVuaWZvcm1zID0gcHBQYXJhbS51bmlmb3JtcyB8fCB7fTtcblx0XHRwcFBhcmFtLnVuaWZvcm1zLnJlc29sdXRpb24gPSB7XG5cdFx0XHR2YWx1ZTogbmV3IFRIUkVFLlZlY3RvcjIoKVxuXHRcdH07XG5cblx0XHR0aGlzLmVmZmVjdCA9IHtcblx0XHRcdG1hdGVyaWFsOiBuZXcgVEhSRUUuU2hhZGVyTWF0ZXJpYWwoIHBwUGFyYW0gKSxcblx0XHR9O1xuXG5cdH1cblxuXHRwdWJsaWMgcmVuZGVyKCBpbnB1dFJlbmRlclRhcmdldHM6IElucHV0UmVuZGVyVGFyZ2V0IHwgbnVsbCwgcmVuZGVyVGFyZ2V0OiBUSFJFRS5XZWJHTFJlbmRlclRhcmdldCB8IG51bGwgPSBudWxsICkge1xuXG5cdFx0bGV0IHJlbmRlclRhcmdldE1lbSA9IHRoaXMucmVuZGVyZXIuZ2V0UmVuZGVyVGFyZ2V0KCk7XG5cblx0XHRsZXQgZWZmZWN0ID0gdGhpcy5lZmZlY3Q7XG5cdFx0bGV0IG1hdGVyaWFsID0gZWZmZWN0Lm1hdGVyaWFsO1xuXHRcdGxldCB1bmlmb3JtcyA9IG1hdGVyaWFsLnVuaWZvcm1zO1xuXG5cdFx0aWYgKCBpbnB1dFJlbmRlclRhcmdldHMgKSB7XG5cblx0XHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIGlucHV0UmVuZGVyVGFyZ2V0cyApO1xuXG5cdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZXlzLmxlbmd0aDsgaiArKyApIHtcblxuXHRcdFx0XHRpZiAoIHVuaWZvcm1zWyBrZXlzWyBqIF0gXSApIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXS52YWx1ZSA9IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF07XG5cblx0XHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHRcdHVuaWZvcm1zWyBrZXlzWyBqIF0gXSA9IHsgdmFsdWU6IGlucHV0UmVuZGVyVGFyZ2V0c1sga2V5c1sgaiBdIF0gfTtcblxuXHRcdFx0XHRcdGVmZmVjdC5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cblx0XHRcdFx0XHRlZmZlY3QubWF0ZXJpYWwudW5pZm9ybXMgPSB1bmlmb3JtcztcblxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdGlmICggcmVuZGVyVGFyZ2V0ICkge1xuXG5cdFx0XHR1bmlmb3Jtcy5yZXNvbHV0aW9uLnZhbHVlLnNldCggcmVuZGVyVGFyZ2V0LndpZHRoLCByZW5kZXJUYXJnZXQuaGVpZ2h0ICk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHR0aGlzLnJlbmRlcmVyLmdldFNpemUoIHVuaWZvcm1zLnJlc29sdXRpb24udmFsdWUgKTtcblxuXHRcdH1cblxuXHRcdHRoaXMuc2NyZWVuLm1hdGVyaWFsID0gbWF0ZXJpYWw7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnNldFJlbmRlclRhcmdldCggcmVuZGVyVGFyZ2V0ICk7XG5cblx0XHR0aGlzLnJlbmRlcmVyLnJlbmRlciggdGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEgKTtcblxuXHRcdHRoaXMucmVuZGVyZXIuc2V0UmVuZGVyVGFyZ2V0KCByZW5kZXJUYXJnZXRNZW0gKTtcblxuXHR9XG5cbn1cbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuaW1wb3J0IHsgRWFzaW5nRnVuYyB9IGZyb20gJy4vRWFzaW5ncyc7XHJcbmltcG9ydCB7IExlcnBzLCBMZXJwRnVuYyB9IGZyb20gJy4vTGVycHMnO1xyXG5cclxuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxUPiB7XHJcblx0dGltZTogbnVtYmVyO1xyXG5cdHZhbHVlOiBUO1xyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8VD4ge1xyXG5cdGtleWZyYW1lczogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPFQ+W107XHJcblx0bGVycEZ1bmM/OiBMZXJwRnVuYzxUPjtcclxuXHR2YWx1ZTogVDtcclxuXHRlYXNpbmc/OiBFYXNpbmdGdW5jO1xyXG59XHJcblxyXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgVGltZWxpbmVBbmltYXRvckFkZFBhcmFtczxUPiB7XHJcblx0bmFtZTogc3RyaW5nO1xyXG5cdGtleWZyYW1lczogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPFQ+W107XHJcblx0Y3VzdG9tTGVycD86IExlcnBGdW5jPFQ+LFxyXG5cdGVhc2luZz86IEVhc2luZ0Z1bmM7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lQW5pbWF0b3Ige1xyXG5cclxuXHRwcm90ZWN0ZWQgdmFyaWFibGVzOiB7IFtuYW1lOiBzdHJpbmddOiBUaW1lbGluZUFuaW1hdG9yVmFyaWFibGU8YW55PiB9ID0ge307XHJcblx0cHJvdGVjdGVkIHRpbWU6IG51bWJlcjtcclxuXHRwdWJsaWMgZGVmYXVsdEVhc2luZz86IEVhc2luZ0Z1bmM7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCApIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSAwO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhZGQ8VD4oIHBhcmFtczogVGltZWxpbmVBbmltYXRvckFkZFBhcmFtczxUPiApIHtcclxuXHJcblx0XHRpZiAoIHBhcmFtcy5rZXlmcmFtZXMubGVuZ3RoID09IDAgKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBwYXJhbXMubmFtZSArICdcIicsICdLZXlmcmFtZSBsZW5ndGggaXMgMCEhJyApO1xyXG5cclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnZhcmlhYmxlc1sgcGFyYW1zLm5hbWUgXSA9IHtcclxuXHRcdFx0a2V5ZnJhbWVzOiBwYXJhbXMua2V5ZnJhbWVzLFxyXG5cdFx0XHRsZXJwRnVuYzogcGFyYW1zLmN1c3RvbUxlcnAsXHJcblx0XHRcdGVhc2luZzogcGFyYW1zLmVhc2luZyxcclxuXHRcdFx0dmFsdWU6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ua2V5ZnJhbWVzLnNvcnQoICggYSwgYiApID0+IHtcclxuXHJcblx0XHRcdHJldHVybiAoIGEudGltZSA8IGIudGltZSApID8gLSAxIDogMTtcclxuXHJcblx0XHR9ICk7XHJcblxyXG5cdFx0aWYgKCAhIHRoaXMudmFyaWFibGVzWyBwYXJhbXMubmFtZSBdLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0dGhpcy52YXJpYWJsZXNbIHBhcmFtcy5uYW1lIF0ubGVycEZ1bmMgPSBMZXJwcy5nZXRMZXJwRnVuYyggcGFyYW1zLmtleWZyYW1lc1sgMCBdLnZhbHVlICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHRcdHJldHVybiBwYXJhbXMubmFtZTtcclxuXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0PFQ+KCBuYW1lOiBzdHJpbmcgKTogVCB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdLnZhbHVlO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRWYXJpYWJsZU9iamVjdDxUPiggbmFtZTogc3RyaW5nICk6IFRpbWVsaW5lQW5pbWF0b3JWYXJpYWJsZTxUPiB8IG51bGwge1xyXG5cclxuXHRcdGlmICggdGhpcy52YXJpYWJsZXNbIG5hbWUgXSApIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnZhcmlhYmxlc1sgbmFtZSBdO1xyXG5cclxuXHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBuYW1lICsgJ1wiJyArICcgaXMgbm90IGV4aXN0JyApO1xyXG5cclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB1cGRhdGUoIHRpbWU6IG51bWJlciApIHtcclxuXHJcblx0XHR0aGlzLnRpbWUgPSB0aW1lO1xyXG5cclxuXHRcdHRoaXMuY2FsYygpO1xyXG5cclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBjYWxjKCkge1xyXG5cclxuXHRcdGxldCBrZXlzID0gT2JqZWN0LmtleXMoIHRoaXMudmFyaWFibGVzICk7XHJcblxyXG5cdFx0Zm9yICggbGV0IGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRsZXQgdmFsaWFibGUgPSB0aGlzLnZhcmlhYmxlc1sga2V5c1sgaSBdIF07XHJcblx0XHRcdGxldCBrZnMgPSB2YWxpYWJsZS5rZXlmcmFtZXM7XHJcblxyXG5cdFx0XHRsZXQgYTogVGltZWxpbmVBbmltYXRvcktleUZyYW1lPGFueT4gfCBudWxsID0gbnVsbDtcclxuXHRcdFx0bGV0IGI6IFRpbWVsaW5lQW5pbWF0b3JLZXlGcmFtZTxhbnk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG5cdFx0XHRsZXQgdCA9IE1hdGgubWF4KCBrZnNbIDAgXS50aW1lLCBNYXRoLm1pbigga2ZzWyBrZnMubGVuZ3RoIC0gMSBdLnRpbWUsIHRoaXMudGltZSApICk7XHJcblxyXG5cdFx0XHRsZXQgZWFzaW5nOiBFYXNpbmdGdW5jIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XHJcblxyXG5cdFx0XHRpZiAoIGtmcy5sZW5ndGggPT0gMSApIHtcclxuXHJcblx0XHRcdFx0dCA9IGtmc1sgMCBdLnRpbWU7XHJcblx0XHRcdFx0YSA9IGIgPSBrZnNbIDAgXTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cclxuXHRcdFx0XHRmb3IgKCBsZXQgaiA9IDA7IGogPCBrZnMubGVuZ3RoIC0gMTsgaiArKyApIHtcclxuXHJcblx0XHRcdFx0XHRhID0ga2ZzWyBqIF07XHJcblx0XHRcdFx0XHRiID0ga2ZzWyBqICsgMSBdO1xyXG5cclxuXHRcdFx0XHRcdGVhc2luZyA9IGEuZWFzaW5nO1xyXG5cclxuXHRcdFx0XHRcdGlmICggYS50aW1lIDw9IHQgJiYgdCA8PSBiLnRpbWUgKSBicmVhaztcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dCA9ICggdCAtIGEudGltZSApIC8gKCBiLnRpbWUgLSBhLnRpbWUgKTtcclxuXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCBlYXNpbmcgKSB7XHJcblxyXG5cdFx0XHRcdHQgPSBlYXNpbmcoIHQgKTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoIHZhbGlhYmxlLmVhc2luZyApIHtcclxuXHJcblx0XHRcdFx0dCA9IHZhbGlhYmxlLmVhc2luZyggdCApO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmICggdGhpcy5kZWZhdWx0RWFzaW5nICkge1xyXG5cclxuXHRcdFx0XHR0ID0gdGhpcy5kZWZhdWx0RWFzaW5nKCB0ICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIHZhbGlhYmxlLmxlcnBGdW5jICkge1xyXG5cclxuXHRcdFx0XHRpZiAoIGEgIT0gbnVsbCAmJiBiICE9IG51bGwgKSB7XHJcblxyXG5cdFx0XHRcdFx0dmFsaWFibGUudmFsdWUgPSB2YWxpYWJsZS5sZXJwRnVuYyggYS52YWx1ZSwgYi52YWx1ZSwgdCApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0XHRpZiAoIHZhbGlhYmxlLnZhbHVlID09PSBmYWxzZSApIHtcclxuXHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyggJ2Vycm9yIGF0ICcgKyAnXCInICsga2V5c1sgaSBdICsgJ1wiJyApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRjb25zb2xlLndhcm4oICdcIicgKyBrZXlzWyBpIF0gKyAnXCInLCAnbGVycCBmdW5jdGlvbiBpcyBub3Qgc2V0LicgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblxyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsImltcG9ydCAqIGFzIFRIUkVFIGZyb20gJ3RocmVlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5pZm9ybXN7IFsga2V5OiBzdHJpbmcgXSA6IFRIUkVFLklVbmlmb3JtIH1cclxuXHJcbmV4cG9ydCBuYW1lc3BhY2UgVW5pZm9ybXNMaWIge1xyXG5cclxuXHRleHBvcnQgZnVuY3Rpb24gbWVyZ2VVbmlmb3JtcyggLi4udW5pZm9ybXM6ICggVW5pZm9ybXN8dW5kZWZpbmVkIClbXSApIDogVW5pZm9ybXMge1xyXG5cclxuXHRcdGxldCByZXMgPSB7fTtcclxuXHJcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB1bmlmb3Jtcy5sZW5ndGg7IGkgKysgKSB7XHJcblxyXG5cdFx0XHRpZiAoIHVuaWZvcm1zWyBpIF0gIT0gdW5kZWZpbmVkICkge1xyXG5cclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKCByZXMsIHVuaWZvcm1zWyBpIF0gKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHJlcztcclxuXHJcblx0fVxyXG5cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBUSFJFRSBmcm9tICd0aHJlZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgV2FpdE1hbiBleHRlbmRzIFRIUkVFLkV2ZW50RGlzcGF0Y2hlciB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cclxuXHRcdHN1cGVyKCk7XHJcblxyXG5cdH1cclxuXHJcblx0cHVibGljIGdvSG9tZSgpIHtcclxuXHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoIHsgdHlwZTogJ2dvaG9tZScgfSApO1xyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB3YWl0KCB0aW1lOiBudW1iZXIgKSB7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcclxuXHJcblx0XHRcdGNvbnN0IG9uR29Ib21lID0gKCkgPT4ge1xyXG5cclxuXHRcdFx0XHRyZWplY3QoKTtcclxuXHJcblx0XHRcdFx0dGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZ29ob21lJywgb25Hb0hvbWUgKTtcclxuXHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHR0aGlzLmFkZEV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0c2V0VGltZW91dCggKCkgPT4ge1xyXG5cclxuXHRcdFx0XHR0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdnb2hvbWUnLCBvbkdvSG9tZSApO1xyXG5cclxuXHRcdFx0XHRyZXNvbHZlKCk7XHJcblxyXG5cdFx0XHR9LCB0aW1lICogMTAwMC4wICk7XHJcblxyXG5cdFx0fSApO1xyXG5cclxuXHR9XHJcblxyXG59XHJcbiIsIi8qIVxuICogRXZlbnRFbWl0dGVyIHY1LjIuOSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwczovL29saS5tZS51ay9cbiAqIEBwcmVzZXJ2ZVxuICovXG5cbjsoZnVuY3Rpb24gKGV4cG9ydHMpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvKipcbiAgICAgKiBDbGFzcyBmb3IgbWFuYWdpbmcgZXZlbnRzLlxuICAgICAqIENhbiBiZSBleHRlbmRlZCB0byBwcm92aWRlIGV2ZW50IGZ1bmN0aW9uYWxpdHkgaW4gb3RoZXIgY2xhc3Nlcy5cbiAgICAgKlxuICAgICAqIEBjbGFzcyBFdmVudEVtaXR0ZXIgTWFuYWdlcyBldmVudCByZWdpc3RlcmluZyBhbmQgZW1pdHRpbmcuXG4gICAgICovXG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge31cblxuICAgIC8vIFNob3J0Y3V0cyB0byBpbXByb3ZlIHNwZWVkIGFuZCBzaXplXG4gICAgdmFyIHByb3RvID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZTtcbiAgICB2YXIgb3JpZ2luYWxHbG9iYWxWYWx1ZSA9IGV4cG9ydHMuRXZlbnRFbWl0dGVyO1xuXG4gICAgLyoqXG4gICAgICogRmluZHMgdGhlIGluZGV4IG9mIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGV2ZW50IGluIGl0cyBzdG9yYWdlIGFycmF5LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBsaXN0ZW5lcnMgQXJyYXkgb2YgbGlzdGVuZXJzIHRvIHNlYXJjaCB0aHJvdWdoLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBsb29rIGZvci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IEluZGV4IG9mIHRoZSBzcGVjaWZpZWQgbGlzdGVuZXIsIC0xIGlmIG5vdCBmb3VuZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc1tpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBhIG1ldGhvZCB3aGlsZSBrZWVwaW5nIHRoZSBjb250ZXh0IGNvcnJlY3QsIHRvIGFsbG93IGZvciBvdmVyd3JpdGluZyBvZiB0YXJnZXQgbWV0aG9kLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHRhcmdldCBtZXRob2QuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBhbGlhc2VkIG1ldGhvZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGFsaWFzKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGFsaWFzQ2xvc3VyZSgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGlzdGVuZXIgYXJyYXkgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2lsbCBpbml0aWFsaXNlIHRoZSBldmVudCBvYmplY3QgYW5kIGxpc3RlbmVyIGFycmF5cyBpZiByZXF1aXJlZC5cbiAgICAgKiBXaWxsIHJldHVybiBhbiBvYmplY3QgaWYgeW91IHVzZSBhIHJlZ2V4IHNlYXJjaC4gVGhlIG9iamVjdCBjb250YWlucyBrZXlzIGZvciBlYWNoIG1hdGNoZWQgZXZlbnQuIFNvIC9iYVtyel0vIG1pZ2h0IHJldHVybiBhbiBvYmplY3QgY29udGFpbmluZyBiYXIgYW5kIGJhei4gQnV0IG9ubHkgaWYgeW91IGhhdmUgZWl0aGVyIGRlZmluZWQgdGhlbSB3aXRoIGRlZmluZUV2ZW50IG9yIGFkZGVkIHNvbWUgbGlzdGVuZXJzIHRvIHRoZW0uXG4gICAgICogRWFjaCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0IHJlc3BvbnNlIGlzIGFuIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb25bXXxPYmplY3R9IEFsbCBsaXN0ZW5lciBmdW5jdGlvbnMgZm9yIHRoZSBldmVudC5cbiAgICAgKi9cbiAgICBwcm90by5nZXRMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnMoZXZ0KSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJldHVybiBhIGNvbmNhdGVuYXRlZCBhcnJheSBvZiBhbGwgbWF0Y2hpbmcgZXZlbnRzIGlmXG4gICAgICAgIC8vIHRoZSBzZWxlY3RvciBpcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgICAgaWYgKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlW2tleV0gPSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IGV2ZW50c1tldnRdIHx8IChldmVudHNbZXZ0XSA9IFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIGxpc3RlbmVyIG9iamVjdHMgYW5kIGZsYXR0ZW5zIGl0IGludG8gYSBsaXN0IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IGxpc3RlbmVycyBSYXcgbGlzdGVuZXIgb2JqZWN0cy5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfSBKdXN0IHRoZSBsaXN0ZW5lciBmdW5jdGlvbnMuXG4gICAgICovXG4gICAgcHJvdG8uZmxhdHRlbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGZsYXR0ZW5MaXN0ZW5lcnMobGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBmbGF0TGlzdGVuZXJzID0gW107XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGZsYXRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcnNbaV0ubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZsYXRMaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIHJlcXVlc3RlZCBsaXN0ZW5lcnMgdmlhIGdldExpc3RlbmVycyBidXQgd2lsbCBhbHdheXMgcmV0dXJuIHRoZSByZXN1bHRzIGluc2lkZSBhbiBvYmplY3QuIFRoaXMgaXMgbWFpbmx5IGZvciBpbnRlcm5hbCB1c2UgYnV0IG90aGVycyBtYXkgZmluZCBpdCB1c2VmdWwuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byByZXR1cm4gdGhlIGxpc3RlbmVycyBmcm9tLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgYW4gZXZlbnQgaW4gYW4gb2JqZWN0LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVyc0FzT2JqZWN0ID0gZnVuY3Rpb24gZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KSB7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLmdldExpc3RlbmVycyhldnQpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgcmVzcG9uc2VbZXZ0XSA9IGxpc3RlbmVycztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXNwb25zZSB8fCBsaXN0ZW5lcnM7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzVmFsaWRMaXN0ZW5lciAobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCBsaXN0ZW5lciBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lciAmJiB0eXBlb2YgbGlzdGVuZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNWYWxpZExpc3RlbmVyKGxpc3RlbmVyLmxpc3RlbmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgZnVuY3Rpb24gdG8gdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBUaGUgbGlzdGVuZXIgd2lsbCBub3QgYmUgYWRkZWQgaWYgaXQgaXMgYSBkdXBsaWNhdGUuXG4gICAgICogSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBpdCBpcyBjYWxsZWQuXG4gICAgICogSWYgeW91IHBhc3MgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUgdGhlbiB0aGUgbGlzdGVuZXIgd2lsbCBiZSBhZGRlZCB0byBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IGV2dCBOYW1lIG9mIHRoZSBldmVudCB0byBhdHRhY2ggdGhlIGxpc3RlbmVyIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGxpc3RlbmVyIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiB0aGUgZXZlbnQgaXMgZW1pdHRlZC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZCBhZnRlciBjYWxsaW5nLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIWlzVmFsaWRMaXN0ZW5lcihsaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgYWRkZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gYWRkIHRoZSBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqIFllYWgsIHRoaXMgZnVuY3Rpb24gZG9lcyBxdWl0ZSBhIGJpdC4gVGhhdCdzIHByb2JhYmx5IGEgYmFkIHRoaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fFJlZ0V4cH0gZXZ0IEFuIGV2ZW50IG5hbWUgaWYgeW91IHdpbGwgcGFzcyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgbmV4dC4gQW4gb2JqZWN0IGlmIHlvdSB3aXNoIHRvIGFkZCB0byBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byBhZGQuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uYWRkTGlzdGVuZXJzID0gZnVuY3Rpb24gYWRkTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnMoZmFsc2UsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBmaXJzdCBhcmd1bWVudCB5b3UgY2FuIHJlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIHJlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgZnJvbSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gcmVtb3ZlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKHRydWUsIGV2dCwgbGlzdGVuZXJzKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRWRpdHMgbGlzdGVuZXJzIGluIGJ1bGsuIFRoZSBhZGRMaXN0ZW5lcnMgYW5kIHJlbW92ZUxpc3RlbmVycyBtZXRob2RzIGJvdGggdXNlIHRoaXMgdG8gZG8gdGhlaXIgam9iLiBZb3Ugc2hvdWxkIHJlYWxseSB1c2UgdGhvc2UgaW5zdGVhZCwgdGhpcyBpcyBhIGxpdHRsZSBsb3dlciBsZXZlbC5cbiAgICAgKiBUaGUgZmlyc3QgYXJndW1lbnQgd2lsbCBkZXRlcm1pbmUgaWYgdGhlIGxpc3RlbmVycyBhcmUgcmVtb3ZlZCAodHJ1ZSkgb3IgYWRkZWQgKGZhbHNlKS5cbiAgICAgKiBJZiB5b3UgcGFzcyBhbiBvYmplY3QgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB5b3UgY2FuIGFkZC9yZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS4gVGhlIG9iamVjdCBzaG91bGQgY29udGFpbiBrZXkgdmFsdWUgcGFpcnMgb2YgZXZlbnRzIGFuZCBsaXN0ZW5lcnMgb3IgbGlzdGVuZXIgYXJyYXlzLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGFuIGV2ZW50IG5hbWUgYW5kIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0byBiZSBhZGRlZC9yZW1vdmVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIG1hbmlwdWxhdGUgdGhlIGxpc3RlbmVycyBvZiBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlbW92ZSBUcnVlIGlmIHlvdSB3YW50IHRvIHJlbW92ZSBsaXN0ZW5lcnMsIGZhbHNlIGlmIHlvdSB3YW50IHRvIGFkZC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R8UmVnRXhwfSBldnQgQW4gZXZlbnQgbmFtZSBpZiB5b3Ugd2lsbCBwYXNzIGFuIGFycmF5IG9mIGxpc3RlbmVycyBuZXh0LiBBbiBvYmplY3QgaWYgeW91IHdpc2ggdG8gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb25bXX0gW2xpc3RlbmVyc10gQW4gb3B0aW9uYWwgYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zIHRvIGFkZC9yZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ubWFuaXB1bGF0ZUxpc3RlbmVycyA9IGZ1bmN0aW9uIG1hbmlwdWxhdGVMaXN0ZW5lcnMocmVtb3ZlLCBldnQsIGxpc3RlbmVycykge1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICB2YXIgc2luZ2xlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lciA6IHRoaXMuYWRkTGlzdGVuZXI7XG4gICAgICAgIHZhciBtdWx0aXBsZSA9IHJlbW92ZSA/IHRoaXMucmVtb3ZlTGlzdGVuZXJzIDogdGhpcy5hZGRMaXN0ZW5lcnM7XG5cbiAgICAgICAgLy8gSWYgZXZ0IGlzIGFuIG9iamVjdCB0aGVuIHBhc3MgZWFjaCBvZiBpdHMgcHJvcGVydGllcyB0byB0aGlzIG1ldGhvZFxuICAgICAgICBpZiAodHlwZW9mIGV2dCA9PT0gJ29iamVjdCcgJiYgIShldnQgaW5zdGFuY2VvZiBSZWdFeHApKSB7XG4gICAgICAgICAgICBmb3IgKGkgaW4gZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dC5oYXNPd25Qcm9wZXJ0eShpKSAmJiAodmFsdWUgPSBldnRbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgdGhlIHNpbmdsZSBsaXN0ZW5lciBzdHJhaWdodCB0aHJvdWdoIHRvIHRoZSBzaW5ndWxhciBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHBhc3MgYmFjayB0byB0aGUgbXVsdGlwbGUgZnVuY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxlLmNhbGwodGhpcywgaSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gU28gZXZ0IG11c3QgYmUgYSBzdHJpbmdcbiAgICAgICAgICAgIC8vIEFuZCBsaXN0ZW5lcnMgbXVzdCBiZSBhbiBhcnJheSBvZiBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBpdCBhbmQgcGFzcyBlYWNoIG9uZSB0byB0aGUgbXVsdGlwbGUgbWV0aG9kXG4gICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBldnQsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhbGwgbGlzdGVuZXJzIGZyb20gYSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogSWYgeW91IGRvIG5vdCBzcGVjaWZ5IGFuIGV2ZW50IHRoZW4gYWxsIGxpc3RlbmVycyB3aWxsIGJlIHJlbW92ZWQuXG4gICAgICogVGhhdCBtZWFucyBldmVyeSBldmVudCB3aWxsIGJlIGVtcHRpZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgYSByZWdleCB0byByZW1vdmUgYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBbZXZ0XSBPcHRpb25hbCBuYW1lIG9mIHRoZSBldmVudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuIFdpbGwgcmVtb3ZlIGZyb20gZXZlcnkgZXZlbnQgaWYgbm90IHBhc3NlZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVFdmVudCA9IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGV2dCkge1xuICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBldnQ7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLl9nZXRFdmVudHMoKTtcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICAvLyBSZW1vdmUgZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIHN0YXRlIG9mIGV2dFxuICAgICAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50XG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW2V2dF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGV2ZW50cyBtYXRjaGluZyB0aGUgcmVnZXguXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBldmVudHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGtleSkgJiYgZXZ0LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZXZlbnRzW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgaW4gYWxsIGV2ZW50c1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVFdmVudC5cbiAgICAgKlxuICAgICAqIEFkZGVkIHRvIG1pcnJvciB0aGUgbm9kZSBBUEkuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlQWxsTGlzdGVuZXJzID0gYWxpYXMoJ3JlbW92ZUV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBvZiB5b3VyIGNob2ljZS5cbiAgICAgKiBXaGVuIGVtaXR0ZWQsIGV2ZXJ5IGxpc3RlbmVyIGF0dGFjaGVkIHRvIHRoYXQgZXZlbnQgd2lsbCBiZSBleGVjdXRlZC5cbiAgICAgKiBJZiB5b3UgcGFzcyB0aGUgb3B0aW9uYWwgYXJndW1lbnQgYXJyYXkgdGhlbiB0aG9zZSBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgdG8gZXZlcnkgbGlzdGVuZXIgdXBvbiBleGVjdXRpb24uXG4gICAgICogQmVjYXVzZSBpdCB1c2VzIGBhcHBseWAsIHlvdXIgYXJyYXkgb2YgYXJndW1lbnRzIHdpbGwgYmUgcGFzc2VkIGFzIGlmIHlvdSB3cm90ZSB0aGVtIG91dCBzZXBhcmF0ZWx5LlxuICAgICAqIFNvIHRoZXkgd2lsbCBub3QgYXJyaXZlIHdpdGhpbiB0aGUgYXJyYXkgb24gdGhlIG90aGVyIHNpZGUsIHRoZXkgd2lsbCBiZSBzZXBhcmF0ZS5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBbYXJnc10gT3B0aW9uYWwgYXJyYXkgb2YgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uIGVtaXRFdmVudChldnQsIGFyZ3MpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVyc01hcCA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVycztcbiAgICAgICAgdmFyIGxpc3RlbmVyO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgIGZvciAoa2V5IGluIGxpc3RlbmVyc01hcCkge1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyc01hcC5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzTWFwW2tleV0uc2xpY2UoMCk7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCBzaGFsbCBiZSByZW1vdmVkIGZyb20gdGhlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlaXRoZXIgd2l0aCBhIGJhc2ljIGNhbGwgb3IgYW4gYXBwbHkgaWYgdGhlcmUgaXMgYW4gYXJncyBhcnJheVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIub25jZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gbGlzdGVuZXIubGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyB8fCBbXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlID09PSB0aGlzLl9nZXRPbmNlUmV0dXJuVmFsdWUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihldnQsIGxpc3RlbmVyLmxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBlbWl0RXZlbnRcbiAgICAgKi9cbiAgICBwcm90by50cmlnZ2VyID0gYWxpYXMoJ2VtaXRFdmVudCcpO1xuXG4gICAgLyoqXG4gICAgICogU3VidGx5IGRpZmZlcmVudCBmcm9tIGVtaXRFdmVudCBpbiB0aGF0IGl0IHdpbGwgcGFzcyBpdHMgYXJndW1lbnRzIG9uIHRvIHRoZSBsaXN0ZW5lcnMsIGFzIG9wcG9zZWQgdG8gdGFraW5nIGEgc2luZ2xlIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIG9uLlxuICAgICAqIEFzIHdpdGggZW1pdEV2ZW50LCB5b3UgY2FuIHBhc3MgYSByZWdleCBpbiBwbGFjZSBvZiB0aGUgZXZlbnQgbmFtZSB0byBlbWl0IHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIGVtaXQgYW5kIGV4ZWN1dGUgbGlzdGVuZXJzIGZvci5cbiAgICAgKiBAcGFyYW0gey4uLip9IE9wdGlvbmFsIGFkZGl0aW9uYWwgYXJndW1lbnRzIHRvIGJlIHBhc3NlZCB0byBlYWNoIGxpc3RlbmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2dCkge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVtaXRFdmVudChldnQsIGFyZ3MpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGFnYWluc3Qgd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLiBJZiBhXG4gICAgICogbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoZSBvbmUgc2V0IGhlcmUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWRcbiAgICAgKiBhZnRlciBleGVjdXRpb24uIFRoaXMgdmFsdWUgZGVmYXVsdHMgdG8gdHJ1ZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIG5ldyB2YWx1ZSB0byBjaGVjayBmb3Igd2hlbiBleGVjdXRpbmcgbGlzdGVuZXJzLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnNldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIHNldE9uY2VSZXR1cm5WYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9vbmNlUmV0dXJuVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmXG4gICAgICogdGhlIGxpc3RlbmVycyByZXR1cm4gdmFsdWUgbWF0Y2hlcyB0aGlzIG9uZSB0aGVuIGl0IHNob3VsZCBiZSByZW1vdmVkXG4gICAgICogYXV0b21hdGljYWxseS4gSXQgd2lsbCByZXR1cm4gdHJ1ZSBieSBkZWZhdWx0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7KnxCb29sZWFufSBUaGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBmb3Igb3IgdGhlIGRlZmF1bHQsIHRydWUuXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvdG8uX2dldE9uY2VSZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uIF9nZXRPbmNlUmV0dXJuVmFsdWUoKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KCdfb25jZVJldHVyblZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vbmNlUmV0dXJuVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGZXRjaGVzIHRoZSBldmVudHMgb2JqZWN0IGFuZCBjcmVhdGVzIG9uZSBpZiByZXF1aXJlZC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV2ZW50cyBzdG9yYWdlIG9iamVjdC5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0RXZlbnRzID0gZnVuY3Rpb24gX2dldEV2ZW50cygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50cyB8fCAodGhpcy5fZXZlbnRzID0ge30pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXZlcnRzIHRoZSBnbG9iYWwge0BsaW5rIEV2ZW50RW1pdHRlcn0gdG8gaXRzIHByZXZpb3VzIHZhbHVlIGFuZCByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoaXMgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBOb24gY29uZmxpY3RpbmcgRXZlbnRFbWl0dGVyIGNsYXNzLlxuICAgICAqL1xuICAgIEV2ZW50RW1pdHRlci5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBvcmlnaW5hbEdsb2JhbFZhbHVlO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH07XG5cbiAgICAvLyBFeHBvc2UgdGhlIGNsYXNzIGVpdGhlciB2aWEgQU1ELCBDb21tb25KUyBvciB0aGUgZ2xvYmFsIG9iamVjdFxuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxufSh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMgfHwge30pKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV90aHJlZV9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgKiBmcm9tICcuL2NvcmUvQmFzZUxheWVyJztcclxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL0NvbnRyb2xsZXInO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQW5pbWF0aW9uL0FuaW1hdGlvbkFjdGlvbidcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlJ1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0FuaW1hdGlvbi9GQ3VydmVHcm91cCdcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9BbmltYXRpb24vRkN1cnZlS2V5RnJhbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmFja2dyb3VuZCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvQmxlbmRlckNvbm5lY3Rvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9pbnRlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRE9NTWVzaCc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRWFzaW5ncyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvRXZlbnREaXNwYXRjaGVyJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9HUFVDb21wdXRhdGlvbkNvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL01vdXNlUm90YXRvcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUG9zdFByb2Nlc3NpbmcnO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1BhZ2VTY3JvbGxlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvUGFnZVNjcm9sbGVyL1BhZ2VTY3JvbGxlclNlY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL0xheW91dENvbnRyb2xsZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1RpbWVsaW5lQW5pbWF0b3InO1xyXG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL1VuaWZvcm1zJztcclxuZXhwb3J0ICogZnJvbSAnLi91dGlscy9MZXJwcyc7XHJcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvV2FpdE1hbic7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==