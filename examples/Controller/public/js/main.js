/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./examples/Controller/src/ts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Controller/src/ts/ControllerScene.ts":
/*!*******************************************************!*\
  !*** ./examples/Controller/src/ts/ControllerScene.ts ***!
  \*******************************************************/
/*! exports provided: ControllerScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ControllerScene\", function() { return ControllerScene; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\n    var extendStatics = function (d, b) {\n        extendStatics = Object.setPrototypeOf ||\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\n            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };\n        return extendStatics(d, b);\n    };\n    return function (d, b) {\n        extendStatics(d, b);\n        function __() { this.constructor = d; }\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\n    };\n})();\n\n\nvar ControllerScene = /** @class */ (function (_super) {\n    __extends(ControllerScene, _super);\n    function ControllerScene() {\n        return _super.call(this) || this;\n    }\n    ControllerScene.prototype.onBind = function (gProps) {\n        _super.prototype.onBind.call(this, gProps);\n        this.camera.position.set(0, 1.5, 4);\n        this.camera.lookAt(0, 0, 0);\n        this.box = new three__WEBPACK_IMPORTED_MODULE_0__[\"Mesh\"](new three__WEBPACK_IMPORTED_MODULE_0__[\"BoxGeometry\"](), new three__WEBPACK_IMPORTED_MODULE_0__[\"MeshNormalMaterial\"]());\n        this.scene.add(this.box);\n    };\n    ControllerScene.prototype.animate = function (deltaTime) {\n        this.box.rotateY(1.0 * deltaTime);\n        this.renderer.render(this.scene, this.camera);\n    };\n    ControllerScene.prototype.onResize = function (args) {\n        _super.prototype.onResize.call(this, args);\n    };\n    return ControllerScene;\n}(_src__WEBPACK_IMPORTED_MODULE_1__[\"BaseScene\"]));\n\n\n\n//# sourceURL=webpack:///./examples/Controller/src/ts/ControllerScene.ts?");

/***/ }),

/***/ "./examples/Controller/src/ts/main.ts":
/*!********************************************!*\
  !*** ./examples/Controller/src/ts/main.ts ***!
  \********************************************/
/*! exports provided: APP */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"APP\", function() { return APP; });\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src */ \"./src/index.ts\");\n/* harmony import */ var _ControllerScene__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ControllerScene */ \"./examples/Controller/src/ts/ControllerScene.ts\");\n\n\nvar APP = /** @class */ (function () {\n    function APP() {\n        this.controller = new _src__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"]({\n            canvas: document.querySelector('#canvas'),\n            retina: true,\n        });\n        this.scene = new _ControllerScene__WEBPACK_IMPORTED_MODULE_1__[\"ControllerScene\"]();\n        this.controller.bindScene(this.scene);\n    }\n    return APP;\n}());\n\nwindow.addEventListener('load', function () {\n    var app = new APP();\n});\n\n\n//# sourceURL=webpack:///./examples/Controller/src/ts/main.ts?");

/***/ }),

/***/ "./node_modules/lethargy/lethargy.js":
/*!*******************************************!*\
  !*** ./node_modules/lethargy/lethargy.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Generated by CoffeeScript 1.9.2\n(function() {\n  var root;\n\n  root =  true && exports !== null ? exports : this;\n\n  root.Lethargy = (function() {\n    function Lethargy(stability, sensitivity, tolerance, delay) {\n      this.stability = stability != null ? Math.abs(stability) : 8;\n      this.sensitivity = sensitivity != null ? 1 + Math.abs(sensitivity) : 100;\n      this.tolerance = tolerance != null ? 1 + Math.abs(tolerance) : 1.1;\n      this.delay = delay != null ? delay : 150;\n      this.lastUpDeltas = (function() {\n        var i, ref, results;\n        results = [];\n        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {\n          results.push(null);\n        }\n        return results;\n      }).call(this);\n      this.lastDownDeltas = (function() {\n        var i, ref, results;\n        results = [];\n        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {\n          results.push(null);\n        }\n        return results;\n      }).call(this);\n      this.deltasTimestamp = (function() {\n        var i, ref, results;\n        results = [];\n        for (i = 1, ref = this.stability * 2; 1 <= ref ? i <= ref : i >= ref; 1 <= ref ? i++ : i--) {\n          results.push(null);\n        }\n        return results;\n      }).call(this);\n    }\n\n    Lethargy.prototype.check = function(e) {\n      var lastDelta;\n      e = e.originalEvent || e;\n      if (e.wheelDelta != null) {\n        lastDelta = e.wheelDelta;\n      } else if (e.deltaY != null) {\n        lastDelta = e.deltaY * -40;\n      } else if ((e.detail != null) || e.detail === 0) {\n        lastDelta = e.detail * -40;\n      }\n      this.deltasTimestamp.push(Date.now());\n      this.deltasTimestamp.shift();\n      if (lastDelta > 0) {\n        this.lastUpDeltas.push(lastDelta);\n        this.lastUpDeltas.shift();\n        return this.isInertia(1);\n      } else {\n        this.lastDownDeltas.push(lastDelta);\n        this.lastDownDeltas.shift();\n        return this.isInertia(-1);\n      }\n      return false;\n    };\n\n    Lethargy.prototype.isInertia = function(direction) {\n      var lastDeltas, lastDeltasNew, lastDeltasOld, newAverage, newSum, oldAverage, oldSum;\n      lastDeltas = direction === -1 ? this.lastDownDeltas : this.lastUpDeltas;\n      if (lastDeltas[0] === null) {\n        return direction;\n      }\n      if (this.deltasTimestamp[(this.stability * 2) - 2] + this.delay > Date.now() && lastDeltas[0] === lastDeltas[(this.stability * 2) - 1]) {\n        return false;\n      }\n      lastDeltasOld = lastDeltas.slice(0, this.stability);\n      lastDeltasNew = lastDeltas.slice(this.stability, this.stability * 2);\n      oldSum = lastDeltasOld.reduce(function(t, s) {\n        return t + s;\n      });\n      newSum = lastDeltasNew.reduce(function(t, s) {\n        return t + s;\n      });\n      oldAverage = oldSum / lastDeltasOld.length;\n      newAverage = newSum / lastDeltasNew.length;\n      if (Math.abs(oldAverage) < Math.abs(newAverage * this.tolerance) && (this.sensitivity < Math.abs(newAverage))) {\n        return direction;\n      } else {\n        return false;\n      }\n    };\n\n    Lethargy.prototype.showLastUpDeltas = function() {\n      return this.lastUpDeltas;\n    };\n\n    Lethargy.prototype.showLastDownDeltas = function() {\n      return this.lastDownDeltas;\n    };\n\n    return Lethargy;\n\n  })();\n\n}).call(this);\n\n\n//# sourceURL=webpack:///./node_modules/lethargy/lethargy.js?");

/***/ }),

/***/ "./node_modules/parse-unit/index.js":
/*!******************************************!*\
  !*** ./node_modules/parse-unit/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function parseUnit(str, out) {\n    if (!out)\n        out = [ 0, '' ]\n\n    str = String(str)\n    var num = parseFloat(str, 10)\n    out[0] = num\n    out[1] = str.match(/[\\d.\\-\\+]*\\s*(.*)/)[1] || ''\n    return out\n}\n\n//# sourceURL=webpack:///./node_modules/parse-unit/index.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/*! exports provided: ACESFilmicToneMapping, AddEquation, AddOperation, AdditiveBlending, AlphaFormat, AlwaysDepth, AlwaysStencilFunc, AmbientLight, AmbientLightProbe, AnimationClip, AnimationLoader, AnimationMixer, AnimationObjectGroup, AnimationUtils, ArcCurve, ArrayCamera, ArrowHelper, Audio, AudioAnalyser, AudioContext, AudioListener, AudioLoader, AxesHelper, AxisHelper, BackSide, BasicDepthPacking, BasicShadowMap, BinaryTextureLoader, Bone, BooleanKeyframeTrack, BoundingBoxHelper, Box2, Box3, Box3Helper, BoxBufferGeometry, BoxGeometry, BoxHelper, BufferAttribute, BufferGeometry, BufferGeometryLoader, ByteType, Cache, Camera, CameraHelper, CanvasRenderer, CanvasTexture, CatmullRomCurve3, CineonToneMapping, CircleBufferGeometry, CircleGeometry, ClampToEdgeWrapping, Clock, ClosedSplineCurve3, Color, ColorKeyframeTrack, CompressedTexture, CompressedTextureLoader, ConeBufferGeometry, ConeGeometry, CubeCamera, CubeGeometry, CubeReflectionMapping, CubeRefractionMapping, CubeTexture, CubeTextureLoader, CubeUVReflectionMapping, CubeUVRefractionMapping, CubicBezierCurve, CubicBezierCurve3, CubicInterpolant, CullFaceBack, CullFaceFront, CullFaceFrontBack, CullFaceNone, Curve, CurvePath, CustomBlending, CylinderBufferGeometry, CylinderGeometry, Cylindrical, DataTexture, DataTexture2DArray, DataTexture3D, DataTextureLoader, DecrementStencilOp, DecrementWrapStencilOp, DefaultLoadingManager, DepthFormat, DepthStencilFormat, DepthTexture, DirectionalLight, DirectionalLightHelper, DirectionalLightShadow, DiscreteInterpolant, DodecahedronBufferGeometry, DodecahedronGeometry, DoubleSide, DstAlphaFactor, DstColorFactor, DynamicBufferAttribute, DynamicCopyUsage, DynamicDrawUsage, DynamicReadUsage, EdgesGeometry, EdgesHelper, EllipseCurve, EqualDepth, EqualStencilFunc, EquirectangularReflectionMapping, EquirectangularRefractionMapping, Euler, EventDispatcher, ExtrudeBufferGeometry, ExtrudeGeometry, Face3, Face4, FaceColors, FileLoader, FlatShading, Float32Attribute, Float32BufferAttribute, Float64Attribute, Float64BufferAttribute, FloatType, Fog, FogExp2, Font, FontLoader, FrontFaceDirectionCCW, FrontFaceDirectionCW, FrontSide, Frustum, GammaEncoding, Geometry, GeometryUtils, GreaterDepth, GreaterEqualDepth, GreaterEqualStencilFunc, GreaterStencilFunc, GridHelper, Group, HalfFloatType, HemisphereLight, HemisphereLightHelper, HemisphereLightProbe, IcosahedronBufferGeometry, IcosahedronGeometry, ImageBitmapLoader, ImageLoader, ImageUtils, ImmediateRenderObject, IncrementStencilOp, IncrementWrapStencilOp, InstancedBufferAttribute, InstancedBufferGeometry, InstancedInterleavedBuffer, InstancedMesh, Int16Attribute, Int16BufferAttribute, Int32Attribute, Int32BufferAttribute, Int8Attribute, Int8BufferAttribute, IntType, InterleavedBuffer, InterleavedBufferAttribute, Interpolant, InterpolateDiscrete, InterpolateLinear, InterpolateSmooth, InvertStencilOp, JSONLoader, KeepStencilOp, KeyframeTrack, LOD, LatheBufferGeometry, LatheGeometry, Layers, LensFlare, LessDepth, LessEqualDepth, LessEqualStencilFunc, LessStencilFunc, Light, LightProbe, LightShadow, Line, Line3, LineBasicMaterial, LineCurve, LineCurve3, LineDashedMaterial, LineLoop, LinePieces, LineSegments, LineStrip, LinearEncoding, LinearFilter, LinearInterpolant, LinearMipMapLinearFilter, LinearMipMapNearestFilter, LinearMipmapLinearFilter, LinearMipmapNearestFilter, LinearToneMapping, Loader, LoaderUtils, LoadingManager, LogLuvEncoding, LoopOnce, LoopPingPong, LoopRepeat, LuminanceAlphaFormat, LuminanceFormat, MOUSE, Material, MaterialLoader, Math, MathUtils, Matrix3, Matrix4, MaxEquation, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshDistanceMaterial, MeshFaceMaterial, MeshLambertMaterial, MeshMatcapMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, MinEquation, MirroredRepeatWrapping, MixOperation, MultiMaterial, MultiplyBlending, MultiplyOperation, NearestFilter, NearestMipMapLinearFilter, NearestMipMapNearestFilter, NearestMipmapLinearFilter, NearestMipmapNearestFilter, NeverDepth, NeverStencilFunc, NoBlending, NoColors, NoToneMapping, NormalBlending, NotEqualDepth, NotEqualStencilFunc, NumberKeyframeTrack, Object3D, ObjectLoader, ObjectSpaceNormalMap, OctahedronBufferGeometry, OctahedronGeometry, OneFactor, OneMinusDstAlphaFactor, OneMinusDstColorFactor, OneMinusSrcAlphaFactor, OneMinusSrcColorFactor, OrthographicCamera, PCFShadowMap, PCFSoftShadowMap, PMREMGenerator, ParametricBufferGeometry, ParametricGeometry, Particle, ParticleBasicMaterial, ParticleSystem, ParticleSystemMaterial, Path, PerspectiveCamera, Plane, PlaneBufferGeometry, PlaneGeometry, PlaneHelper, PointCloud, PointCloudMaterial, PointLight, PointLightHelper, Points, PointsMaterial, PolarGridHelper, PolyhedronBufferGeometry, PolyhedronGeometry, PositionalAudio, PropertyBinding, PropertyMixer, QuadraticBezierCurve, QuadraticBezierCurve3, Quaternion, QuaternionKeyframeTrack, QuaternionLinearInterpolant, REVISION, RGBADepthPacking, RGBAFormat, RGBAIntegerFormat, RGBA_ASTC_10x10_Format, RGBA_ASTC_10x5_Format, RGBA_ASTC_10x6_Format, RGBA_ASTC_10x8_Format, RGBA_ASTC_12x10_Format, RGBA_ASTC_12x12_Format, RGBA_ASTC_4x4_Format, RGBA_ASTC_5x4_Format, RGBA_ASTC_5x5_Format, RGBA_ASTC_6x5_Format, RGBA_ASTC_6x6_Format, RGBA_ASTC_8x5_Format, RGBA_ASTC_8x6_Format, RGBA_ASTC_8x8_Format, RGBA_ETC2_EAC_Format, RGBA_PVRTC_2BPPV1_Format, RGBA_PVRTC_4BPPV1_Format, RGBA_S3TC_DXT1_Format, RGBA_S3TC_DXT3_Format, RGBA_S3TC_DXT5_Format, RGBDEncoding, RGBEEncoding, RGBEFormat, RGBFormat, RGBIntegerFormat, RGBM16Encoding, RGBM7Encoding, RGB_ETC1_Format, RGB_ETC2_Format, RGB_PVRTC_2BPPV1_Format, RGB_PVRTC_4BPPV1_Format, RGB_S3TC_DXT1_Format, RGFormat, RGIntegerFormat, RawShaderMaterial, Ray, Raycaster, RectAreaLight, RedFormat, RedIntegerFormat, ReinhardToneMapping, RepeatWrapping, ReplaceStencilOp, ReverseSubtractEquation, RingBufferGeometry, RingGeometry, SRGB8_ALPHA8_ASTC_10x10_Format, SRGB8_ALPHA8_ASTC_10x5_Format, SRGB8_ALPHA8_ASTC_10x6_Format, SRGB8_ALPHA8_ASTC_10x8_Format, SRGB8_ALPHA8_ASTC_12x10_Format, SRGB8_ALPHA8_ASTC_12x12_Format, SRGB8_ALPHA8_ASTC_4x4_Format, SRGB8_ALPHA8_ASTC_5x4_Format, SRGB8_ALPHA8_ASTC_5x5_Format, SRGB8_ALPHA8_ASTC_6x5_Format, SRGB8_ALPHA8_ASTC_6x6_Format, SRGB8_ALPHA8_ASTC_8x5_Format, SRGB8_ALPHA8_ASTC_8x6_Format, SRGB8_ALPHA8_ASTC_8x8_Format, Scene, SceneUtils, ShaderChunk, ShaderLib, ShaderMaterial, ShadowMaterial, Shape, ShapeBufferGeometry, ShapeGeometry, ShapePath, ShapeUtils, ShortType, Skeleton, SkeletonHelper, SkinnedMesh, SmoothShading, Sphere, SphereBufferGeometry, SphereGeometry, Spherical, SphericalHarmonics3, SphericalReflectionMapping, Spline, SplineCurve, SplineCurve3, SpotLight, SpotLightHelper, SpotLightShadow, Sprite, SpriteMaterial, SrcAlphaFactor, SrcAlphaSaturateFactor, SrcColorFactor, StaticCopyUsage, StaticDrawUsage, StaticReadUsage, StereoCamera, StreamCopyUsage, StreamDrawUsage, StreamReadUsage, StringKeyframeTrack, SubtractEquation, SubtractiveBlending, TOUCH, TangentSpaceNormalMap, TetrahedronBufferGeometry, TetrahedronGeometry, TextBufferGeometry, TextGeometry, Texture, TextureLoader, TorusBufferGeometry, TorusGeometry, TorusKnotBufferGeometry, TorusKnotGeometry, Triangle, TriangleFanDrawMode, TriangleStripDrawMode, TrianglesDrawMode, TubeBufferGeometry, TubeGeometry, UVMapping, Uint16Attribute, Uint16BufferAttribute, Uint32Attribute, Uint32BufferAttribute, Uint8Attribute, Uint8BufferAttribute, Uint8ClampedAttribute, Uint8ClampedBufferAttribute, Uncharted2ToneMapping, Uniform, UniformsLib, UniformsUtils, UnsignedByteType, UnsignedInt248Type, UnsignedIntType, UnsignedShort4444Type, UnsignedShort5551Type, UnsignedShort565Type, UnsignedShortType, VSMShadowMap, Vector2, Vector3, Vector4, VectorKeyframeTrack, Vertex, VertexColors, VideoTexture, WebGLCubeRenderTarget, WebGLMultisampleRenderTarget, WebGLRenderTarget, WebGLRenderTargetCube, WebGLRenderer, WebGLUtils, WireframeGeometry, WireframeHelper, WrapAroundEnding, XHRLoader, ZeroCurvatureEnding, ZeroFactor, ZeroSlopeEnding, ZeroStencilOp, sRGBEncoding */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/***/ }),

/***/ "./node_modules/to-px/browser.js":
/*!***************************************!*\
  !*** ./node_modules/to-px/browser.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar parseUnit = __webpack_require__(/*! parse-unit */ \"./node_modules/parse-unit/index.js\")\n\nmodule.exports = toPX\n\nvar PIXELS_PER_INCH = getSizeBrutal('in', document.body) // 96\n\n\nfunction getPropertyInPX(element, prop) {\n  var parts = parseUnit(getComputedStyle(element).getPropertyValue(prop))\n  return parts[0] * toPX(parts[1], element)\n}\n\n//This brutal hack is needed\nfunction getSizeBrutal(unit, element) {\n  var testDIV = document.createElement('div')\n  testDIV.style['height'] = '128' + unit\n  element.appendChild(testDIV)\n  var size = getPropertyInPX(testDIV, 'height') / 128\n  element.removeChild(testDIV)\n  return size\n}\n\nfunction toPX(str, element) {\n  if (!str) return null\n\n  element = element || document.body\n  str = (str + '' || 'px').trim().toLowerCase()\n  if(element === window || element === document) {\n    element = document.body\n  }\n\n  switch(str) {\n    case '%':  //Ambiguous, not sure if we should use width or height\n      return element.clientHeight / 100.0\n    case 'ch':\n    case 'ex':\n      return getSizeBrutal(str, element)\n    case 'em':\n      return getPropertyInPX(element, 'font-size')\n    case 'rem':\n      return getPropertyInPX(document.body, 'font-size')\n    case 'vw':\n      return window.innerWidth/100\n    case 'vh':\n      return window.innerHeight/100\n    case 'vmin':\n      return Math.min(window.innerWidth, window.innerHeight) / 100\n    case 'vmax':\n      return Math.max(window.innerWidth, window.innerHeight) / 100\n    case 'in':\n      return PIXELS_PER_INCH\n    case 'cm':\n      return PIXELS_PER_INCH / 2.54\n    case 'mm':\n      return PIXELS_PER_INCH / 25.4\n    case 'pt':\n      return PIXELS_PER_INCH / 72\n    case 'pc':\n      return PIXELS_PER_INCH / 6\n    case 'px':\n      return 1\n  }\n\n  // detect number of units\n  var parts = parseUnit(str)\n  if (!isNaN(parts[0]) && parts[1]) {\n    var px = toPX(parts[1], element)\n    return typeof px === 'number' ? parts[0] * px : null\n  }\n\n  return null\n}\n\n\n//# sourceURL=webpack:///./node_modules/to-px/browser.js?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, author, license, repository, keywords, types, files, bugs, devDependencies, dependencies, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"name\\\":\\\"ore-three-ts\\\",\\\"version\\\":\\\"0.4.0\\\",\\\"description\\\":\\\"\\\",\\\"main\\\":\\\"build/ore-three.js\\\",\\\"author\\\":\\\"ukonpower\\\",\\\"license\\\":\\\"MIT\\\",\\\"repository\\\":{\\\"type\\\":\\\"git\\\",\\\"url\\\":\\\"git@github.com:ukonpower/ore-three-ts.git\\\"},\\\"keywords\\\":[\\\"threejs\\\",\\\"webgl\\\"],\\\"types\\\":\\\"types/index.d.ts\\\",\\\"files\\\":[\\\"build\\\",\\\"src\\\",\\\"types\\\"],\\\"bugs\\\":{\\\"url\\\":\\\"https://github.com/ukonpower/ore-three-ts/issues\\\"},\\\"devDependencies\\\":{\\\"@types/offscreencanvas\\\":\\\"^2019.6.1\\\",\\\"@types/webgl2\\\":\\\"0.0.5\\\",\\\"browser-sync\\\":\\\"^2.26.7\\\",\\\"copy-webpack-plugin\\\":\\\"^5.1.1\\\",\\\"del\\\":\\\"^5.1.0\\\",\\\"gulp\\\":\\\"^4.0.2\\\",\\\"gulp-autoprefixer\\\":\\\"^7.0.1\\\",\\\"gulp-cssmin\\\":\\\"^0.2.0\\\",\\\"gulp-plumber\\\":\\\"^1.2.1\\\",\\\"gulp-pug\\\":\\\"^4.0.1\\\",\\\"gulp-sass\\\":\\\"^4.0.2\\\",\\\"gulp-typedoc\\\":\\\"^2.2.4\\\",\\\"shader-loader\\\":\\\"^1.3.1\\\",\\\"three\\\":\\\"^0.114.0\\\",\\\"ts-loader\\\":\\\"^6.2.1\\\",\\\"typedoc\\\":\\\"^0.16.11\\\",\\\"typescript\\\":\\\"^3.8.3\\\",\\\"webpack\\\":\\\"^4.42.0\\\",\\\"webpack-cli\\\":\\\"^3.3.11\\\",\\\"webpack-dev-server\\\":\\\"^3.10.3\\\",\\\"webpack-merge\\\":\\\"^4.2.1\\\",\\\"webpack-stream\\\":\\\"^5.2.1\\\"},\\\"dependencies\\\":{\\\"lethargy\\\":\\\"^1.0.9\\\",\\\"to-px\\\":\\\"^1.1.0\\\"}}\");\n\n//# sourceURL=webpack:///./package.json?");

/***/ }),

/***/ "./src/core/BaseScene.ts":
/*!*******************************!*\
  !*** ./src/core/BaseScene.ts ***!
  \*******************************/
/*! exports provided: BaseScene */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseScene\", function() { return BaseScene; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar BaseScene = /** @class */ (function () {\n    function BaseScene() {\n        this.time = 0;\n        this.name = \"\";\n        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\n        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](50, innerWidth / innerHeight, 0.1, 1000);\n    }\n    BaseScene.prototype.tick = function (deltaTime) {\n        this.time += deltaTime;\n        this.animate(deltaTime);\n    };\n    BaseScene.prototype.animate = function (deltaTime) { };\n    BaseScene.prototype.onBind = function (gProps) {\n        this.gProps = gProps;\n        this.renderer = gProps.renderer;\n    };\n    BaseScene.prototype.onUnbind = function () {\n        this.removeChildrens(this.scene);\n    };\n    BaseScene.prototype.removeChildrens = function (object) {\n        var length = object.children.length;\n        for (var i = length - 1; i >= 0; i--) {\n            this.removeChildrens(object.children[i]);\n            var geo = void 0;\n            var mat = void 0;\n            if (object.children[i].isMesh) {\n                geo = object.children[i].geometry;\n                mat = object.children[i].material;\n            }\n            object.remove((object.children[i]));\n            if (geo) {\n                geo.dispose();\n            }\n            if (mat) {\n                mat.dispose();\n            }\n        }\n    };\n    BaseScene.prototype.onResize = function (args) {\n        this.camera.aspect = args.aspectRatio;\n        this.camera.updateProjectionMatrix();\n    };\n    BaseScene.prototype.onTouchStart = function (cursor, event) { };\n    BaseScene.prototype.onTouchMove = function (cursor, event) { };\n    BaseScene.prototype.onTouchEnd = function (cursor, event) { };\n    BaseScene.prototype.onHover = function (cursor) { };\n    BaseScene.prototype.onWheel = function (event, trackpadDelta) { };\n    return BaseScene;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/BaseScene.ts?");

/***/ }),

/***/ "./src/core/Controller.ts":
/*!********************************!*\
  !*** ./src/core/Controller.ts ***!
  \********************************/
/*! exports provided: Controller */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Controller\", function() { return Controller; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _utils_Cursor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Cursor */ \"./src/utils/Cursor.ts\");\n/* harmony import */ var lethargy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lethargy */ \"./node_modules/lethargy/lethargy.js\");\n/* harmony import */ var lethargy__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lethargy__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var to_px__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! to-px */ \"./node_modules/to-px/browser.js\");\n/* harmony import */ var to_px__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(to_px__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nvar VERSION = __webpack_require__(/*! ../../package.json */ \"./package.json\").version;\nvar Controller = /** @class */ (function () {\n    function Controller(parameter) {\n        this.trackpadMemDelta = 0;\n        this.trackpadMax = false;\n        this.lethargy = new lethargy__WEBPACK_IMPORTED_MODULE_2__[\"Lethargy\"](7, 0, 0.05);\n        if (!parameter.silent) {\n            console.log(\"%c- ore-three \" + VERSION + \" -\", 'padding: 5px 10px ;background-color: black; color: white;font-size:11px');\n        }\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"](parameter);\n        this.renderer.debug.checkShaderErrors = true;\n        this.renderer.setSize(window.innerWidth, window.innerHeight);\n        this.renderer.setPixelRatio(parameter.retina ? window.devicePixelRatio : 1);\n        this.cursor = new _utils_Cursor__WEBPACK_IMPORTED_MODULE_1__[\"Cursor\"]();\n        this.cursor.onTouchStart = this.onTouchStart.bind(this);\n        this.cursor.onTouchMove = this.onTouchMove.bind(this);\n        this.cursor.onTouchEnd = this.onTouchEnd.bind(this);\n        this.cursor.onHover = this.onHover.bind(this);\n        this.cursor.onWheel = this.onWheel.bind(this);\n        this.clock = new three__WEBPACK_IMPORTED_MODULE_0__[\"Clock\"]();\n        this.gProps = {\n            renderer: this.renderer,\n            cursor: this.cursor,\n            resizeArgs: null\n        };\n        window.addEventListener('orientationchange', this.onOrientationDevice.bind(this));\n        window.addEventListener('resize', this.onWindowResize.bind(this));\n        this.onWindowResize();\n        this.tick();\n    }\n    Controller.prototype.tick = function () {\n        var deltatime = this.clock.getDelta();\n        this.cursor.update();\n        if (this.currentScene) {\n            this.currentScene.tick(deltatime);\n        }\n        requestAnimationFrame(this.tick.bind(this));\n    };\n    Controller.prototype.bindScene = function (scene) {\n        this.currentScene = scene;\n        this.currentScene.onBind(this.gProps);\n        this.onWindowResize();\n    };\n    Controller.prototype.unbindScene = function () {\n        if (this.currentScene) {\n            this.currentScene.onUnbind();\n            this.currentScene = null;\n            this.renderer.renderLists.dispose();\n        }\n    };\n    Controller.prototype.onWindowResize = function () {\n        var windowSize = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](window.innerWidth, window.innerHeight);\n        this.renderer.setSize(windowSize.x, windowSize.y);\n        var resizeArgs = {\n            aspectRatio: windowSize.x / windowSize.y,\n            pixelRatio: this.renderer.getPixelRatio(),\n            windowSize: windowSize.clone(),\n            windowPixelSize: windowSize.clone().multiplyScalar(this.renderer.getPixelRatio())\n        };\n        this.gProps.resizeArgs = resizeArgs;\n        if (this.currentScene) {\n            this.currentScene.onResize(resizeArgs);\n        }\n    };\n    Controller.prototype.onOrientationDevice = function () {\n        this.onWindowResize();\n    };\n    Controller.prototype.onTouchStart = function (e) {\n        if (this.currentScene) {\n            this.currentScene.onTouchStart(this.cursor, e);\n        }\n    };\n    Controller.prototype.onTouchMove = function (e) {\n        if (this.currentScene) {\n            this.currentScene.onTouchMove(this.cursor, e);\n        }\n    };\n    Controller.prototype.onTouchEnd = function (e) {\n        if (this.currentScene) {\n            this.currentScene.onTouchEnd(this.cursor, e);\n        }\n    };\n    Controller.prototype.onHover = function () {\n        if (this.currentScene) {\n            this.currentScene.onHover(this.cursor);\n        }\n    };\n    Controller.prototype.onWheel = function (e) {\n        var delta = e.deltaY;\n        var trackpadDelta = 0;\n        switch (e.deltaMode) {\n            case e.DOM_DELTA_LINE:\n                delta *= Object(to_px__WEBPACK_IMPORTED_MODULE_3__[\"toPx\"])('ex', window) * 2.5;\n                break;\n            case e.DOM_DELTA_PAGE:\n                delta *= window.innerHeight;\n                break;\n        }\n        if (this.lethargy.check(e)) {\n            trackpadDelta = delta;\n        }\n        else {\n            var d = delta - this.trackpadMemDelta;\n            if (Math.abs(d) > 50) {\n                this.trackpadMemDelta = d;\n                trackpadDelta = delta;\n                this.trackpadMax = true;\n            }\n            else if (d == 0) {\n                if (this.trackpadMax) {\n                    trackpadDelta = delta;\n                }\n            }\n            else if (d < 0) {\n                this.trackpadMax = false;\n            }\n            this.trackpadMemDelta = (delta);\n        }\n        if (this.currentScene) {\n            this.currentScene.onWheel(e, trackpadDelta);\n        }\n    };\n    return Controller;\n}());\n\n\n\n//# sourceURL=webpack:///./src/core/Controller.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: BaseScene, Controller, Cursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_BaseScene__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/BaseScene */ \"./src/core/BaseScene.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"BaseScene\", function() { return _core_BaseScene__WEBPACK_IMPORTED_MODULE_0__[\"BaseScene\"]; });\n\n/* harmony import */ var _core_Controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/Controller */ \"./src/core/Controller.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Controller\", function() { return _core_Controller__WEBPACK_IMPORTED_MODULE_1__[\"Controller\"]; });\n\n/* harmony import */ var _utils_Cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/Cursor */ \"./src/utils/Cursor.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Cursor\", function() { return _utils_Cursor__WEBPACK_IMPORTED_MODULE_2__[\"Cursor\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/utils/Cursor.ts":
/*!*****************************!*\
  !*** ./src/utils/Cursor.ts ***!
  \*****************************/
/*! exports provided: Cursor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cursor\", function() { return Cursor; });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar Cursor = /** @class */ (function () {\n    function Cursor() {\n        this.attenuation = 0.9;\n        this._position = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](0, 0);\n        this._delta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](0, 0);\n        this._hoverPosition = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](0, 0);\n        this._hoverDelta = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](0, 0);\n        var userAgent = navigator.userAgent;\n        if (userAgent.indexOf('iPhone') >= 0 || userAgent.indexOf('iPad') >= 0 || userAgent.indexOf('Android') >= 0) {\n            window.addEventListener('touchstart', this._MouseEvent.bind(this, 'start'));\n            window.addEventListener('touchmove', this._MouseEvent.bind(this, 'move'), { passive: false });\n            window.addEventListener('touchend', this._MouseEvent.bind(this, 'end'));\n        }\n        else {\n            window.addEventListener('mousedown', this._MouseEvent.bind(this, 'start'));\n            window.addEventListener('mousemove', this._MouseEvent.bind(this, 'move'));\n            window.addEventListener('mouseup', this._MouseEvent.bind(this, 'end'));\n            window.addEventListener('dragend', this._MouseEvent.bind(this, 'end'));\n            window.addEventListener('wheel', this.wheel.bind(this), { passive: false });\n        }\n        this._position.set(NaN, NaN);\n        this._hoverPosition.set(NaN, NaN);\n        this._touchDown = false;\n    }\n    Object.defineProperty(Cursor.prototype, \"position\", {\n        get: function () {\n            return this._position.clone();\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cursor.prototype, \"delta\", {\n        get: function () {\n            return this._delta.clone();\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cursor.prototype, \"hoverPosition\", {\n        get: function () {\n            return (this._hoverPosition.x == this._hoverPosition.x) ? this._hoverPosition.clone() : new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]().set(NaN, NaN);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Object.defineProperty(Cursor.prototype, \"hoverDelta\", {\n        get: function () {\n            return (this.hoverDelta.x == this.hoverDelta.x) ? this.hoverDelta.clone() : new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"]().set(NaN, NaN);\n        },\n        enumerable: true,\n        configurable: true\n    });\n    Cursor.prototype.getRelativePosition = function (elm, normalize) {\n        var rect = (elm.getClientRects()[0]);\n        var pos;\n        pos = this._hoverPosition;\n        var x = pos.x - rect.left;\n        var y = pos.y - rect.top;\n        if (normalize) {\n            x /= rect.width;\n            y /= rect.height;\n        }\n        var p = new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector2\"](x, y);\n        return p;\n    };\n    Cursor.prototype.setPos = function (x, y) {\n        if (this._touchDown) {\n            if (this._position.x !== this._position.x || this._position.y !== this._position.y) {\n                this._delta.set(0, 0);\n            }\n            else {\n                this._delta.set(x - this._position.x, y - this._position.y);\n            }\n            this._position.set(x, y);\n        }\n        else {\n            this._position.set(NaN, NaN);\n            this._delta.set(0, 0);\n        }\n        //calc delta\n        if (this._hoverPosition.x !== this._hoverPosition.x || this._hoverPosition.y !== this._hoverPosition.y) {\n            this._hoverDelta.set(0, 0);\n        }\n        else {\n            this._hoverDelta.set(x - this._hoverPosition.x, y - this._hoverPosition.y);\n        }\n        this._hoverPosition.set(x, y);\n    };\n    Cursor.prototype._MouseEvent = function (type, event) {\n        var x;\n        var y;\n        if ('touches' in event) {\n            if (event.touches.length > 0) {\n                x = event.touches[0].clientX;\n                y = event.touches[0].clientY;\n            }\n        }\n        else {\n            if (event.button == 0) {\n                x = event.pageX - window.pageXOffset;\n                y = event.pageY - window.pageYOffset;\n            }\n        }\n        if (type == 'start') {\n            this._touchDown = true;\n            this.setPos(x, y);\n            if (this.onTouchStart) {\n                this.onTouchStart(event);\n            }\n        }\n        else if (type == 'move') {\n            this.setPos(x, y);\n            if (this._touchDown) {\n                if (this.onTouchMove) {\n                    this.onTouchMove(event);\n                }\n            }\n        }\n        else if (type == 'end') {\n            this._touchDown = false;\n            if (this.onTouchEnd) {\n                this.onTouchEnd(event);\n            }\n            this.setPos(x, y);\n        }\n    };\n    Cursor.prototype.wheel = function (e) {\n        if (this.onWheel) {\n            this.onWheel(e);\n        }\n    };\n    Cursor.prototype.update = function () {\n        this._delta.multiplyScalar(this.attenuation);\n        this._hoverDelta.multiplyScalar(this.attenuation);\n        if (this.onHover) {\n            this.onHover();\n        }\n    };\n    return Cursor;\n}());\n\n\n\n//# sourceURL=webpack:///./src/utils/Cursor.ts?");

/***/ })

/******/ });