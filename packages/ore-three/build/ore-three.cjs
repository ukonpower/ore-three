"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const _=require("three");function P(u){if(u&&u.__esModule)return u;const e=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(u){for(const t in u)if(t!=="default"){const i=Object.getOwnPropertyDescriptor(u,t);Object.defineProperty(e,t,i.get?i:{enumerable:!0,get:()=>u[t]})}}return e.default=u,Object.freeze(e)}const d=P(_);class k extends d.EventDispatcher{constructor(e){super(),this.time=0,this.readyAnimate=!1,this.renderer=new d.WebGLRenderer(e),this.renderer.setPixelRatio(e.pixelRatio||window.devicePixelRatio),this.renderer.debug.checkShaderErrors=!0,this.info={canvas:this.renderer.domElement,aspectSetting:{mainAspect:16/9,wideAspect:10/1,portraitAspect:1/2},size:{windowSize:new d.Vector2,windowAspectRatio:1,canvasSize:new d.Vector2,canvasPixelSize:new d.Vector2,canvasAspectRatio:1,pixelRatio:this.renderer.getPixelRatio(),portraitWeight:0,wideWeight:0},...e},e.wrapperElement&&this.setWrapperElement(e.wrapperElement||null,!1),this.commonUniforms={time:{value:0}},this.scene=new d.Scene,this.camera=new d.PerspectiveCamera(50,1,.1,1e3)}tick(e){this.time+=e,this.commonUniforms.time.value=this.time,this.readyAnimate&&this.animate(e)}animate(e){}onBind(){setTimeout(()=>{this.onResize(),this.readyAnimate=!0},0)}onUnbind(){this.dispatchEvent({type:"dispose"}),this.removeChildrens(this.scene),this.readyAnimate=!1}removeChildrens(e){const t=e.children.length;for(let i=t-1;i>=0;i--){this.removeChildrens(e.children[i]);let n,r;e.children[i].isMesh&&(n=e.children[i].geometry,r=e.children[i].material),e.remove(e.children[i]),n&&n.dispose(),r&&r.dispose()}}setWrapperElement(e,t=!0){this.info.wrapperElement=e,this.info.wrapperElementRect=e?e.getBoundingClientRect():null,t&&this.onResize()}onResize(){if(this.renderer==null)return;const e=new d.Vector2(document.body.clientWidth,window.innerHeight),t=new d.Vector2;this.info.wrapperElement?t.set(this.info.wrapperElement.clientWidth,this.info.wrapperElement.clientHeight):t.copy(e);let i=1-(t.x/t.y-this.info.aspectSetting.portraitAspect)/(this.info.aspectSetting.mainAspect-this.info.aspectSetting.portraitAspect);i=Math.min(1,Math.max(0,i));let n=1-(t.x/t.y-this.info.aspectSetting.wideAspect)/(this.info.aspectSetting.mainAspect-this.info.aspectSetting.wideAspect);n=Math.min(1,Math.max(0,n)),this.info.size.windowSize.copy(e),this.info.size.windowAspectRatio=e.x/e.y,this.info.size.canvasSize.copy(t),this.info.size.canvasPixelSize.copy(t.clone().multiplyScalar(this.renderer.getPixelRatio())),this.info.size.canvasAspectRatio=t.x/t.y,this.info.size.portraitWeight=i,this.info.size.wideWeight=n,this.renderer.setPixelRatio(this.info.size.pixelRatio),this.renderer.setSize(this.info.size.canvasSize.x,this.info.size.canvasSize.y),this.camera.aspect=this.info.size.canvasAspectRatio,this.camera.updateProjectionMatrix(),this.info.wrapperElement&&(this.info.wrapperElementRect=this.info.wrapperElement.getBoundingClientRect())}pointerEvent(e){const t=new d.Vector2;if(t.copy(e.position),this.info.canvas){const r=this.info.canvas.getBoundingClientRect();t.sub(new d.Vector2(r.x,r.y))}const i=t.clone();i.divide(this.info.size.canvasSize),i.y=1-i.y,i.multiplyScalar(2).subScalar(1);const n={event:e.pointerEvent,position:t.clone(),delta:e.delta.clone(),screenPosition:i.clone(),windowPosition:e.position.clone()};e.pointerEventType=="hover"?this.onHover(n):e.pointerEventType=="start"?this.onTouchStart(n):e.pointerEventType=="move"?this.onTouchMove(n):e.pointerEventType=="end"&&this.onTouchEnd(n)}onTouchStart(e){}onTouchMove(e){}onTouchEnd(e){}onHover(e){}onWheel(e){}onWheelOptimized(e){}}var T=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},C={};(function(u){(function(){var e;e=u!==null?u:this,e.Lethargy=function(){function t(i,n,r,f){this.stability=i!=null?Math.abs(i):8,this.sensitivity=n!=null?1+Math.abs(n):100,this.tolerance=r!=null?1+Math.abs(r):1.1,this.delay=f!=null?f:150,this.lastUpDeltas=function(){var o,h,s;for(s=[],o=1,h=this.stability*2;1<=h?o<=h:o>=h;1<=h?o++:o--)s.push(null);return s}.call(this),this.lastDownDeltas=function(){var o,h,s;for(s=[],o=1,h=this.stability*2;1<=h?o<=h:o>=h;1<=h?o++:o--)s.push(null);return s}.call(this),this.deltasTimestamp=function(){var o,h,s;for(s=[],o=1,h=this.stability*2;1<=h?o<=h:o>=h;1<=h?o++:o--)s.push(null);return s}.call(this)}return t.prototype.check=function(i){var n;return i=i.originalEvent||i,i.wheelDelta!=null?n=i.wheelDelta:i.deltaY!=null?n=i.deltaY*-40:(i.detail!=null||i.detail===0)&&(n=i.detail*-40),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),n>0?(this.lastUpDeltas.push(n),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(n),this.lastDownDeltas.shift(),this.isInertia(-1))},t.prototype.isInertia=function(i){var n,r,f,o,h,s,a;return n=i===-1?this.lastDownDeltas:this.lastUpDeltas,n[0]===null?i:this.deltasTimestamp[this.stability*2-2]+this.delay>Date.now()&&n[0]===n[this.stability*2-1]?!1:(f=n.slice(0,this.stability),r=n.slice(this.stability,this.stability*2),a=f.reduce(function(c,p){return c+p}),h=r.reduce(function(c,p){return c+p}),s=a/f.length,o=h/r.length,Math.abs(s)<Math.abs(o*this.tolerance)&&this.sensitivity<Math.abs(o)?i:!1)},t.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},t.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},t}()}).call(T)})(C);class I extends d.EventDispatcher{constructor(){super(),this.element=null,this.memDelta=0,this.riseDelta=!1,this.trackpadMemDelta=0,this.trackpadMax=!1,this.position=new d.Vector2(NaN,NaN),this.delta=new d.Vector2(NaN,NaN);const e=navigator.userAgent;this.isSP=e.indexOf("iPhone")>=0||e.indexOf("iPad")>=0||e.indexOf("Android")>=0||navigator.platform=="iPad"||navigator.platform=="MacIntel"&&navigator.userAgent.indexOf("Safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.standalone!==void 0,this.position.set(NaN,NaN),this.isTouching=!1,this.lethargy=new C.Lethargy}registerElement(e){this.element=e;const t=this.onTouch.bind(this,"start"),i=this.onTouch.bind(this,"move"),n=this.onTouch.bind(this,"end"),r=this.onPointer.bind(this,"start"),f=this.onPointer.bind(this,"move"),o=this.onPointer.bind(this,"end"),h=this.wheel.bind(this);e.addEventListener("touchstart",t,{passive:!1}),e.addEventListener("touchmove",i,{passive:!1}),e.addEventListener("touchend",n,{passive:!1}),e.addEventListener("pointerdown",r),e.addEventListener("pointermove",f),e.addEventListener("pointerup",o),e.addEventListener("dragend",o),e.addEventListener("wheel",h,{passive:!1});const s=a=>{e.isEqualNode(a.elm)&&(e.removeEventListener("touchstart",t),e.removeEventListener("touchmove",i),e.removeEventListener("touchend",n),e.removeEventListener("pointerdown",r),e.removeEventListener("pointermove",f),e.removeEventListener("pointerup",o),e.removeEventListener("dragend",o),e.removeEventListener("wheel",h),this.removeEventListener("unregister",s))};this.addEventListener("unregister",s)}unregisterElement(e){this.dispatchEvent({type:"unregister",elm:e})}getScreenPosition(e){if(this.position.x!=this.position.x)return new d.Vector2(NaN,NaN);const t=this.position.clone().divide(e).multiplyScalar(2).subScalar(1);return t.y*=-1,t}getRelativePosition(e,t){const i=e.getClientRects()[0];let n=this.position.x-i.left,r=this.position.y-i.top;return t&&(n/=i.width,r/=i.height),new d.Vector2(n,r)}setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y||this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}onTouch(e,t){const i=t.touches[0];i?this.touchEventHandler(i.pageX,i.pageY,e,t):e=="end"&&this.touchEventHandler(NaN,NaN,e,t)}onPointer(e,t){const i=t.pointerType;i!=null?i=="mouse"&&(t.button==-1||t.button==0)&&this.touchEventHandler(t.pageX,t.pageY,e,t):this.touchEventHandler(t.pageX,t.pageY,e,t)}touchEventHandler(e,t,i,n){let r=!1;const f=e-window.pageXOffset,o=t-window.pageYOffset;i=="start"?(this.isTouching=!0,this.setPos(f,o),this.delta.set(0,0),r=!0):i=="move"?(this.setPos(f,o),this.isTouching&&(r=!0)):i=="end"&&("targetTouches"in n?n.targetTouches.length==0&&(this.isTouching=!1):this.isTouching=!1,r=!0),r&&this.dispatchEvent({type:"update",pointerEvent:n,pointerEventType:i,position:this.position.clone(),delta:this.delta.clone()})}update(){this.isSP||(this.dispatchEvent({type:"update",pointerEvent:null,pointerEventType:"hover",position:this.position.clone(),delta:this.delta.clone()}),this.delta.set(0,0))}wheelOptimized(e){this.dispatchEvent({type:"wheelOptimized",wheelEvent:e})}wheel(e){if(this.dispatchEvent({type:"wheel",wheelEvent:e}),this.lethargy.check(e)!==!1)this.wheelOptimized(e);else{const t=e.deltaY-this.memDelta;Math.abs(t)>50?(this.memDelta=t,this.wheelOptimized(e),this.riseDelta=!0):t==0?this.riseDelta&&this.wheelOptimized(e):t<0&&(this.riseDelta=!1),this.memDelta=e.deltaY}}}class B extends d.EventDispatcher{constructor(e){super(),this.layers=[],e&&e.silent||console.log("%c- ore-three -","padding: 5px 10px ;background-color: black; color: white;font-size:11px"),this.clock=new d.Clock,this.pointer=new I,this.setPointerEventElement(e&&e.pointerEventElement||document.body);const t=this.pointerEvent.bind(this),i=this.onWheel.bind(this),n=this.onWheelOptimized.bind(this),r=this.onOrientationDevice.bind(this),f=this.onWindowResize.bind(this);this.pointer.addEventListener("update",t),this.pointer.addEventListener("wheel",i),this.pointer.addEventListener("wheelOptimized",n),window.addEventListener("orientationchange",r),window.addEventListener("resize",f),this.addEventListener("dispose",()=>{this.pointer.removeEventListener("update",t),this.pointer.removeEventListener("wheel",i),this.pointer.removeEventListener("wheelOptimized",n),window.removeEventListener("orientationchange",r),window.removeEventListener("resize",f)}),this.tick()}tick(){const e=this.clock.getDelta();this.pointer.update();for(let t=0;t<this.layers.length;t++)this.layers[t].tick(e);requestAnimationFrame(this.tick.bind(this))}onWindowResize(){for(let e=0;e<this.layers.length;e++)this.layers[e].onResize()}onOrientationDevice(){this.onWindowResize()}pointerEvent(e){for(let t=0;t<this.layers.length;t++)this.layers[t].pointerEvent(e)}onWheel(e){for(let t=0;t<this.layers.length;t++)this.layers[t].onWheel(e.wheelEvent)}onWheelOptimized(e){for(let t=0;t<this.layers.length;t++)this.layers[t].onWheelOptimized(e.wheelEvent)}addLayer(e){this.layers.push(e),e.onBind()}getLayer(e){for(let t=0;t<this.layers.length;t++)if(this.layers[t].info.name==e)return this.layers[t];return null}removeLayer(e){for(let t=this.layers.length-1;t>=0;t--){const i=this.layers[t];i.info.name==e&&(i.onUnbind(),this.layers.splice(t,1))}}setPointerEventElement(e){this.pointerEventElement&&this.pointer.unregisterElement(this.pointerEventElement),this.pointer.registerElement(e),this.pointerEventElement=e}dispose(){this.layers.map(t=>t.info.name).forEach(t=>{this.removeLayer(t)}),this.tick=()=>{},this.dispatchEvent({type:"dispose"})}}var b;(u=>{u.NEWTON_ITERATIONS=4,u.NEWTON_MIN_SLOPE=.001,u.SUBDIVISION_PRECISION=1e-7,u.SUBDIVISION_MAX_ITERATIONS=10,u.BEZIER_EASING_CACHE_SIZE=11,u.BEZIER_EASING_SAMPLE_STEP_SIZE=1/u.BEZIER_EASING_CACHE_SIZE;function e(s){return-s.p0+3*s.p1-3*s.p2+s.p3}function t(s){return 3*s.p0-6*s.p1+3*s.p2}function i(s){return-3*s.p0+3*s.p1}function n(s,a){return 3*e(s)*a*a+2*t(s)*a+i(s)}u.calcBezierSlope=n;function r(s,a){return((e(s)*a+t(s))*a+i(s))*a+s.p0}u.calcBezier=r;function f(s,a,c,p){let m=0,v=0;for(let g=0;g<u.SUBDIVISION_MAX_ITERATIONS;g++)v=a+(c-a)/2,m=r(p,v),m>s?c=v:a=v;return v}function o(s,a,c){for(let p=0;p<u.NEWTON_ITERATIONS;p++){const m=n(a,c);if(m==0)return c;c-=(r(a,c)-s)/m}return c}function h(s,a,c){s.p1=Math.max(s.p0,Math.min(s.p3,s.p1)),s.p2=Math.max(s.p0,Math.min(s.p3,s.p2));let p=0;for(let g=1;g<c.length&&(p=g-1,!(a<c[g]));g++);const m=p/(u.BEZIER_EASING_CACHE_SIZE-1),v=n(s,m)/(s.p3-s.p0);return v==0?m:v>.01?o(a,s,m):f(a,m,m+u.BEZIER_EASING_SAMPLE_STEP_SIZE,s)}u.getBezierTfromX=h})(b||(b={}));exports.Easings=void 0;(u=>{function e(l=6){return w=>{var E=Math.exp(-l*(2*w-1)),y=Math.exp(-l);return(1+(1-E)/(1+E)*(1+y)/(1-y))/2}}u.sigmoid=e;function t(l,w,E){const y=Math.max(0,Math.min(1,(E-l)/(w-l)));return y*y*(3-2*y)}u.smoothstep=t;function i(l){return l}u.linear=i;function n(l){return l*l}u.easeInQuad=n;function r(l){return l*(2-l)}u.easeOutQuad=r;function f(l){return l<.5?2*l*l:-1+(4-2*l)*l}u.easeInOutQuad=f;function o(l){return l*l*l}u.easeInCubic=o;function h(l){return--l*l*l+1}u.easeOutCubic=h;function s(l){return l<.5?4*l*l*l:(l-1)*(2*l-2)*(2*l-2)+1}u.easeInOutCubic=s;function a(l){return l*l*l*l}u.easeInQuart=a;function c(l){return 1- --l*l*l*l}u.easeOutQuart=c;function p(l){return l<.5?8*l*l*l*l:1-8*--l*l*l*l}u.easeInOutQuart=p;function m(l){return l*l*l*l*l}u.easeInQuint=m;function v(l){return 1+--l*l*l*l*l}u.easeOutQuint=v;function g(l){return l<.5?16*l*l*l*l*l:1+16*--l*l*l*l*l}u.easeInOutQuint=g;function S(l,w,E,y){for(var A=new Array(b.BEZIER_EASING_CACHE_SIZE),L=0;L<b.BEZIER_EASING_CACHE_SIZE;++L)A[L]=b.calcBezier({p0:l.x,p1:w.x,p2:E.x,p3:y.x},L/(b.BEZIER_EASING_CACHE_SIZE-1));return O=>O<=l.x?l.y:y.x<=O?y.y:b.calcBezier({p0:l.y,p1:w.y,p2:E.y,p3:y.y},b.getBezierTfromX({p0:l.x,p1:w.x,p2:E.x,p3:y.x},O,A))}u.bezier=S;function N(l,w,E,y){return S({x:0,y:0},{x:l,y:w},{x:E,y},{x:1,y:1})}u.cubicBezier=N})(exports.Easings||(exports.Easings={}));exports.Lerps=void 0;(u=>{function e(o,h,s){return o+(h-o)*s}u.number=e;function t(o,h,s){if(o.length==h.length){const a=[];for(let c=0;c<o.length;c++)a.push(o[c]+(h[c]-o[c])*s);return a}else return console.log("Different length Arrays!!!"),!1}u.numberArray=t;function i(o,h,s){return o.clone().lerp(h,s)}u.THREEVectors=i;function n(o,h,s){return o.clone().slerp(h,s)}u.THREEQuaternion=n;function r(o,h,s){const a=o.clone(),c=h.clone();return a.x=a.x+(c.x-a.x)*s,a.y=a.y+(c.y-a.y)*s,a.z=a.z+(c.z-a.z)*s,a}u.THREEEuler=r;function f(o){if(typeof o=="number")return u.number;if(o instanceof Array)return u.numberArray;if("isVector2"in o||"isVector3"in o||"isVector4"in o||"isColor"in o)return u.THREEVectors;if("isQuaternion"in o)return u.THREEQuaternion;if("isEuler"in o)return u.THREEEuler}u.getLerpFunc=f})(exports.Lerps||(exports.Lerps={}));class M extends d.EventDispatcher{constructor(){super(),this.isAnimating=!1,this.animatingCount=0,this.dispatchEvents=[],this.variables={},this.dataBase={}}add(e){const t={time:-1,value:this.getValueClone(e.initValue),startValue:this.getValueClone(e.initValue),goalValue:this.getValueClone(e.initValue),easing:e.easing||exports.Easings.sigmoid(),lerpFunc:e.customLerpFunc||exports.Lerps.getLerpFunc(e.initValue),userData:e.userData};return this.dataBase[e.name]=t.value,this.variables[e.name]=t,this.dispatchEvent({type:"added",varName:e.name,variable:t}),t}setEasing(e,t){const i=this.variables[e];i?i.easing=t:console.warn('"'+e+'" is not exist')}setValue(e,t){let i=this.dataBase[e];if(i!==void 0)typeof i=="number"?this.dataBase[e]=t:"copy"in i?i.copy(t):i instanceof Array&&(i=t.concat()),this.updateDataBase(e),this.cancelAnimate(e);else return console.warn('"'+e+'" is not exist'),null}animate(e,t,i=1,n,r){const f=this.variables[e];return new Promise(h=>{if(f){if(i<=0){this.setValue(e,t),f.time=1,f.onAnimationFinished=()=>{n&&n(),h(null)};return}f.time==-1&&(this.isAnimating=!0,this.animatingCount++),f.time=0,f.duration=i,f.startValue=this.getValueClone(f.value),f.goalValue=this.getValueClone(t),f.onAnimationFinished=()=>{n&&n(),h(null)},r&&this.setEasing(e,r)}else console.warn('"'+e+'" is not exist')})}cancelAnimate(e){const t=this.variables[e];t?(t.time=1,t.onAnimationFinished=null):console.warn('"'+e+'" is not exist')}get(e){return this.variables[e]?this.variables[e].value:(console.warn('"'+e+'" is not exist'),null)}getVariableObject(e,t=!1){return this.variables[e]?this.variables[e]:(t||console.warn('"'+e+'" is not exist'),null)}applyToUniforms(e){const t=Object.keys(this.variables);for(let i=0;i<t.length;i++){const n=this.getVariableObject(t[i]);n&&(e[t[i]]=n)}}isAnimatingVariable(e,t=!1){return this.variables[e]?this.variables[e].time!=-1:(t||console.warn('"'+e+'" is not exist'),null)}getValueClone(e){return typeof e=="number"?e:"clone"in e?e.clone():e instanceof Array?e.concat():e}wait(e){return new Promise(i=>{setTimeout(()=>{i()},e*1e3)})}update(e){this.animatingCount==0&&(this.isAnimating=!1);const t=Object.keys(this.variables);for(let i=0;i<t.length;i++){const n=t[i],r=this.variables[n];let f=r.time;if(f==1&&(this.animatingCount--,f=-1,r.onAnimationFinished&&this.dispatchEvents.push(r.onAnimationFinished)),f>=0&&f<1){const o=r.duration,h=r.easing,s=r.lerpFunc;o&&(f+=(e||.016)/o,(o==0||f>=1)&&(f=1));let a=r.goalValue;f<1&&s&&(a=s(r.startValue,r.goalValue,h(f)));const c=this.dataBase[n];typeof c=="number"||!("copy"in c)?this.dataBase[n]=a:"copy"in c&&c.copy(a),this.dispatchEvent({type:"update/"+t[i],deltaTime:e,value:r.value})}r.time=f}for(;this.dispatchEvents.length!=0;){const i=this.dispatchEvents.pop();i&&i()}this.updateDataBase(),this.dispatchEvent({type:"update",deltaTime:e}),this.isAnimating&&this.dispatchEvent({type:"animate",deltaTime:e})}updateDataBase(e){if(e){const i=this.variables[e],n=this.dataBase[e];i&&n!==void 0&&(typeof i.value=="number"||!("copy"in i.value))&&(i.value=n);return}const t=Object.keys(this.dataBase);for(let i=0;i<t.length;i++){const n=this.variables[t[i]],r=this.dataBase[t[i]];n&&r!==void 0&&(typeof n.value=="number"||!("copy"in n.value))&&(n.value=r)}}}var R={exports:{}};/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */(function(u){(function(e){function t(){}var i=t.prototype,n=e.EventEmitter;function r(h,s){for(var a=h.length;a--;)if(h[a].listener===s)return a;return-1}function f(h){return function(){return this[h].apply(this,arguments)}}i.getListeners=function(s){var a=this._getEvents(),c,p;if(s instanceof RegExp){c={};for(p in a)a.hasOwnProperty(p)&&s.test(p)&&(c[p]=a[p])}else c=a[s]||(a[s]=[]);return c},i.flattenListeners=function(s){var a=[],c;for(c=0;c<s.length;c+=1)a.push(s[c].listener);return a},i.getListenersAsObject=function(s){var a=this.getListeners(s),c;return a instanceof Array&&(c={},c[s]=a),c||a};function o(h){return typeof h=="function"||h instanceof RegExp?!0:h&&typeof h=="object"?o(h.listener):!1}i.addListener=function(s,a){if(!o(a))throw new TypeError("listener must be a function");var c=this.getListenersAsObject(s),p=typeof a=="object",m;for(m in c)c.hasOwnProperty(m)&&r(c[m],a)===-1&&c[m].push(p?a:{listener:a,once:!1});return this},i.on=f("addListener"),i.addOnceListener=function(s,a){return this.addListener(s,{listener:a,once:!0})},i.once=f("addOnceListener"),i.defineEvent=function(s){return this.getListeners(s),this},i.defineEvents=function(s){for(var a=0;a<s.length;a+=1)this.defineEvent(s[a]);return this},i.removeListener=function(s,a){var c=this.getListenersAsObject(s),p,m;for(m in c)c.hasOwnProperty(m)&&(p=r(c[m],a),p!==-1&&c[m].splice(p,1));return this},i.off=f("removeListener"),i.addListeners=function(s,a){return this.manipulateListeners(!1,s,a)},i.removeListeners=function(s,a){return this.manipulateListeners(!0,s,a)},i.manipulateListeners=function(s,a,c){var p,m,v=s?this.removeListener:this.addListener,g=s?this.removeListeners:this.addListeners;if(typeof a=="object"&&!(a instanceof RegExp))for(p in a)a.hasOwnProperty(p)&&(m=a[p])&&(typeof m=="function"?v.call(this,p,m):g.call(this,p,m));else for(p=c.length;p--;)v.call(this,a,c[p]);return this},i.removeEvent=function(s){var a=typeof s,c=this._getEvents(),p;if(a==="string")delete c[s];else if(s instanceof RegExp)for(p in c)c.hasOwnProperty(p)&&s.test(p)&&delete c[p];else delete this._events;return this},i.removeAllListeners=f("removeEvent"),i.emitEvent=function(s,a){var c=this.getListenersAsObject(s),p,m,v,g,S;for(g in c)if(c.hasOwnProperty(g))for(p=c[g].slice(0),v=0;v<p.length;v++)m=p[v],m.once===!0&&this.removeListener(s,m.listener),S=m.listener.apply(this,a||[]),S===this._getOnceReturnValue()&&this.removeListener(s,m.listener);return this},i.trigger=f("emitEvent"),i.emit=function(s){var a=Array.prototype.slice.call(arguments,1);return this.emitEvent(s,a)},i.setOnceReturnValue=function(s){return this._onceReturnValue=s,this},i._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},i._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return e.EventEmitter=n,t},u.exports?u.exports=t:e.EventEmitter=t})(typeof window<"u"?window:T||{})})(R);const x=R.exports;class z extends x{constructor(e){super(),this.curves={},this.name=e||"",this.uniforms={},this.frame={start:0,end:0,duration:0}}addFcurveGroup(e,t){this.curves[e]=t,this.calcFrame()}removeFCurve(e){delete this.curves[e],this.calcFrame()}calcFrame(){let e=Object.keys(this.curves),t=1/0,i=-1/0;for(let n=0;n<e.length;n++){let r=this.curves[e[n]];r.frameStart<t&&(t=r.frameStart),r.frameEnd>i&&(i=r.frameEnd)}(t==-1/0||i==1/0)&&(t=0,i=1),this.frame.start=t,this.frame.end=i,this.frame.duration=this.frame.end-this.frame.start}getFCurveGroup(e){return this.curves[e]||null}assignUniforms(e,t){this.uniforms[e]=t}getUniforms(e){if(this.uniforms[e])return this.uniforms[e];let t=this.getFCurveGroup(e);if(t){let i={value:t.createInitValue()};return this.uniforms[e]=i,i}return null}getValue(e,t){let i=this.getUniforms(e);if(!i)return t||null;let n=i.value;return t?typeof n=="number"?(t.x=n,t):(t.x=n.x,t.y=n.y,"z"in t&&"z"in n&&(t.z=n.z),"w"in t&&"w"in n&&(t.w=n.w),t||null):n}getValueAt(e,t,i){let n=this.getFCurveGroup(e);return i?n?n.getValue(t||0,i):i:n?n.getValue(t):null}updateFrame(e){let t=Object.keys(this.curves);for(let i=0;i<t.length;i++){let n=this.curves[t[i]],r=this.getUniforms(t[i]);!r||(typeof r.value=="number"?r.value=n.getValue(e)||0:n.getValue(e,r.value))}this.emitEvent("update",[this])}}class V extends x{constructor(e){super(),this.keyframes=[],this.cache={frame:NaN,value:NaN},this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes.length=0,e.forEach(t=>{this.addKeyFrame(t)}))}addKeyFrame(e){let t=0;for(let i=0;i<this.keyframes.length&&this.keyframes[i].coordinate.x<e.coordinate.x;i++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let i=0;i<this.keyframes.length;i++){let n=this.keyframes[i];if(e<=n.coordinate.x){let r=this.keyframes[i-1];r?t=r.to(n,e):t=n.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t!==null?(this.cache={frame:e,value:t},t):0}}class F extends x{constructor(e,t,i,n,r,f){super(),this.type="scalar",this.name=e||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curve={x:null,y:null,z:null,w:null,scalar:null},t&&this.setFCurve(t,"x"),i&&this.setFCurve(i,"y"),n&&this.setFCurve(n,"z"),r&&this.setFCurve(r,"w")}setFCurve(e,t){this.curve[t]=e,this.calcType(),this.calcFrame()}calcType(){this.curve.scalar&&(this.type="scalar"),this.curve.w?this.type="vec4":this.curve.z?this.type="vec3":this.curve.y?this.type="vec2":this.curve.x&&(this.type="scalar")}calcFrame(){let e=Object.keys(this.curve),t=1/0,i=-1/0;for(let n=0;n<e.length;n++){let r=this.curve[e[n]];!r||(r.frameStart<t&&(t=r.frameStart),r.frameEnd>i&&(i=r.frameEnd))}(t==-1/0||i==1/0)&&(t=0,i=1),this.frameStart=t,this.frameEnd=i,this.frameDuration=this.frameEnd-this.frameStart}createInitValue(){return this.type=="vec2"?new d.Vector2:this.type=="vec3"?new d.Vector3:this.type=="vec4"?new d.Vector4:0}getValue(e,t){return t?(this.curve.x&&(t.x=this.curve.x.getValue(e)),this.curve.y&&(t.y=this.curve.y.getValue(e)),this.curve.z&&"z"in t&&(t.z=this.curve.z.getValue(e)),this.curve.w&&"w"in t&&(t.w=this.curve.w.getValue(e)),t):this.curve.scalar?this.curve.scalar.getValue(e):null}}class D extends x{constructor(e,t,i,n){super(),this.coordinate={x:0,y:0},this.handleLeft={x:0,y:0},this.handleRight={x:0,y:0},this.interpolation="BEZIER",this.easing=null,this.nextFrame=null,this.set(e,t,i,n)}set(e,t,i,n){this.coordinate=e,this.handleLeft=t||e,this.handleRight=i||e,this.interpolation=n||"BEZIER"}getEasing(e,t){return e=="BEZIER"?exports.Easings.bezier(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):i=>{let n=t.coordinate.y-this.coordinate.y;return i=(i-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+i*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}class W extends x{constructor(e){super(),this.connected=!1,this.frameCurrent=0,this.frameStart=0,this.frameEnd=0,this.objects=[],this.actions=[],e&&(this.url=e,this.connect(this.url))}connect(e){this.url=e,this.ws=new WebSocket(this.url),this.ws.onopen=this.onOpen.bind(this),this.ws.onmessage=this.onMessage.bind(this),this.ws.onclose=this.onClose.bind(this),this.ws.onerror=t=>{console.error(t)}}syncJsonScene(e){let t=new XMLHttpRequest;t.onreadystatechange=()=>{t.readyState==4&&t.status==200&&this.onSyncScene(JSON.parse(t.response))},t.open("GET",e),t.send()}onSyncScene(e){this.actions.length=0,this.objects.length=0,e.actions.forEach(t=>{let i=new z(t.name),n=Object.keys(t.fcurve_groups);for(let r=0;r<n.length;r++){let f=n[r],o=new F(f);t.fcurve_groups[f].forEach(h=>{let s=new V;s.set(h.keyframes.map(a=>new D(a.c,a.h_l,a.h_r,a.i))),o.setFCurve(s,h.axis)}),i.addFcurveGroup(o.name,o)}this.actions.push(i)}),e.objects.forEach(t=>{this.objects.push(t)}),this.emitEvent("update/scene",[this]),this.setTimeline(this.frameCurrent)}onSyncTimeline(e){this.setTimeline(e.current,e.start,e.end)}onOpen(e){this.connected=!0}onMessage(e){let t=JSON.parse(e.data);t.type=="sync/scene"?this.onSyncScene(t.data):t.type=="sync/timeline"&&this.onSyncTimeline(t.data)}onClose(e){this.disposeWS()}getActionNameList(e){for(let t=0;t<this.objects.length;t++)if(this.objects[t].name==e)return this.objects[t].actions;return[]}getAction(e){for(let t=0;t<this.actions.length;t++)if(this.actions[t].name==e)return this.actions[t];return null}getActionList(e){let t=[];return this.getActionNameList(e).forEach(n=>{let r=this.getAction(n);r&&t.push(r)}),t}getActionContainsAccessor(e){return this.actions.find(t=>Object.keys(t.curves).some(n=>n==e))||null}setTimeline(e,t,i){this.frameCurrent=e,this.frameStart=t||this.frameStart,this.frameEnd=i||this.frameEnd,this.emitEvent("update/timeline",[this.frameCurrent,this.frameStart,this.frameEnd])}dispose(){this.disposeWS()}disposeWS(){this.ws&&(this.ws.close(),this.ws.onmessage=null,this.ws.onclose=null,this.ws.onopen=null,this.connected=!1)}}const j=`#define GLSLIFY 1
varying vec2 vUv;void main(){gl_Position=vec4(position,1.0);vUv=uv;}`,U=`#define GLSLIFY 1
uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=texture2D(tex,vUv);}`;exports.UniformsLib=void 0;(u=>{function e(...t){const i={};for(let n=0;n<t.length;n++)t[n]!=null&&Object.assign(i,t[n]);return i}u.mergeUniforms=e})(exports.UniformsLib||(exports.UniformsLib={}));class G{constructor(e,t){this.renderTargets=[],this.renderer=e,this.dataSize=t.clone(),this.uniforms={dataSize:{value:this.dataSize}},this.tempDataLinear=this.createData({minFilter:d.LinearFilter,magFilter:d.LinearFilter}),this.tempDataNear=this.createData({minFilter:d.NearestFilter,magFilter:d.NearestFilter}),this.scene=new d.Scene,this.camera=new d.Camera,this.materials=[],this.mesh=new d.Mesh(new d.PlaneGeometry(2,2)),this.scene.add(this.mesh)}get isSupported(){return this.renderer.extensions.get("OES_texture_float")}createInitializeTexture(){let e=new Float32Array(this.uniforms.dataSize.value.x*this.uniforms.dataSize.value.y*4),t=new d.DataTexture(e,this.uniforms.dataSize.value.x,this.uniforms.dataSize.value.y,d.RGBAFormat,d.FloatType);return t.needsUpdate=!0,t}createData(e,t){let i=navigator.userAgent,n=i.indexOf("iPhone")>=0||i.indexOf("iPad")>=0||navigator.platform=="iPad"||navigator.platform=="MacIntel"&&navigator.userAgent.indexOf("Safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.standalone!==void 0,r={wrapS:d.ClampToEdgeWrapping,wrapT:d.ClampToEdgeWrapping,minFilter:d.NearestFilter,magFilter:d.NearestFilter,format:d.RGBAFormat,type:n?d.HalfFloatType:d.FloatType,stencilBuffer:!1,depthBuffer:!1},f=null,o=null;e&&(e.isDataTexture?(f=e,t&&(o=t)):o=e),o&&(r.wrapS=o.wrapS||r.wrapS,r.wrapT=o.wrapT||r.wrapT,r.minFilter=o.minFilter||r.minFilter,r.magFilter=o.magFilter||r.magFilter,r.format=o.format||r.format,r.type=o.type||r.type,r.stencilBuffer=o.stencilBuffer||r.stencilBuffer,r.depthBuffer=o.depthBuffer||r.depthBuffer);let h=new d.WebGLRenderTarget(this.uniforms.dataSize.value.x,this.uniforms.dataSize.value.y,r),s={buffer:h};if(this.renderTargets.push(h),f){let a=this.createKernel({fragmentShader:U,uniforms:{tex:{value:f}}});this.compute(a,s)}return s}createKernel(e){let t=exports.UniformsLib.mergeUniforms(e.uniforms,this.uniforms);e.uniforms=t,e.vertexShader=e.vertexShader||j;let i=new d.ShaderMaterial(e);return this.materials.push(i),{material:i,uniforms:e.uniforms}}compute(e,t,i){let n;t.buffer.texture.magFilter==d.LinearFilter?n=this.tempDataLinear:n=this.tempDataNear,this.mesh.material=e.material;let r=this.renderer.getRenderTarget();this.renderer.setRenderTarget(n.buffer),this.renderer.render(this.scene,i||this.camera),this.swapBuffers(t,n),this.renderer.setRenderTarget(r)}swapBuffers(e,t){let i=e.buffer;e.buffer=t.buffer,t.buffer=i}dispose(){this.mesh.geometry.dispose();for(let t=0;t<this.materials.length;t++)this.materials[t].dispose();this.scene.remove(this.mesh),this.tempDataLinear.buffer.dispose(),this.tempDataNear.buffer.dispose()}resizeData(e){this.dataSize.copy(e);for(let t=0;t<this.renderTargets.length;t++)this.renderTargets[t].setSize(e.x,e.y)}}const H=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;class Q{constructor(e,t,i){this.renderer=e,this.scene=new d.Scene,this.camera=new d.OrthographicCamera(-1,1,1,-1),this.screen=new d.Mesh(i||new d.PlaneGeometry(2,2)),this.scene.add(this.screen),t.vertexShader=t.vertexShader||H,t.uniforms=t.uniforms||{},t.uniforms.resolution={value:new d.Vector2},this.effect={material:new d.ShaderMaterial(t)}}render(e,t=null){let i=this.renderer.getRenderTarget(),n=this.effect,r=n.material,f=r.uniforms;if(e){let o=Object.keys(e);for(let h=0;h<o.length;h++)f[o[h]]?f[o[h]].value=e[o[h]]:(f[o[h]]={value:e[o[h]]},n.material.needsUpdate=!0,n.material.uniforms=f)}t?f.resolution.value.set(t.width,t.height):this.renderer.getSize(f.resolution.value),this.screen.material=r,this.renderer.setRenderTarget(t),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(i)}}class Z{constructor(e,t,i){this.obj=e,this.baseTransform={position:this.obj.position.clone(),rotation:this.obj.quaternion.clone(),scale:this.obj.scale.clone()},this.transform=t,i||(this.transform.position&&this.transform.position.add(this.obj.position),this.transform.rotation&&this.transform.rotation.multiply(this.obj.quaternion))}updateTransform(e){this.transform.position&&this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position,e)),this.transform.rotation&&this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation,e)),this.transform.scale&&this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale*e+1-e))}}class K extends d.EventDispatcher{constructor(){super()}goHome(){this.dispatchEvent({type:"gohome"})}wait(e){return new Promise((t,i)=>{const n=()=>{i(),this.removeEventListener("gohome",n)};this.addEventListener("gohome",n),setTimeout(()=>{this.removeEventListener("gohome",n),t()},e*1e3)})}}exports.AnimationAction=z;exports.Animator=M;exports.BaseLayer=k;exports.BlenderConnector=W;exports.Controller=B;exports.FCurve=V;exports.FCurveGroup=F;exports.FCurveKeyFrame=D;exports.GPUComputationController=G;exports.LayoutController=Z;exports.Pointer=I;exports.PostProcessing=Q;exports.WaitMan=K;
//# sourceMappingURL=ore-three.cjs.map
