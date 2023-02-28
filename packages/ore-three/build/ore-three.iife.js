var ORE=function(v,S){"use strict";var q=Object.defineProperty;var J=(v,S,O)=>S in v?q(v,S,{enumerable:!0,configurable:!0,writable:!0,value:O}):v[S]=O;var f=(v,S,O)=>(J(v,typeof S!="symbol"?S+"":S,O),O);function O(c){const d=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(c){for(const e in c)if(e!=="default"){const t=Object.getOwnPropertyDescriptor(c,e);Object.defineProperty(d,e,t.get?t:{enumerable:!0,get:()=>c[e]})}}return d.default=c,Object.freeze(d)}const m=O(S);class k extends m.EventDispatcher{constructor(e){super();f(this,"info");f(this,"renderer");f(this,"scene");f(this,"camera");f(this,"time",0);f(this,"commonUniforms");f(this,"readyAnimate",!1);this.renderer=new m.WebGLRenderer(e),this.renderer.setPixelRatio(e.pixelRatio||window.devicePixelRatio),this.renderer.debug.checkShaderErrors=!0,this.info={canvas:this.renderer.domElement,aspectSetting:{mainAspect:1.7777777777777777,wideAspect:10,portraitAspect:.5},size:{windowSize:new m.Vector2,windowAspectRatio:1,canvasSize:new m.Vector2,canvasPixelSize:new m.Vector2,canvasAspectRatio:1,pixelRatio:this.renderer.getPixelRatio(),portraitWeight:0,wideWeight:0},...e},e.wrapperElement&&this.setWrapperElement(e.wrapperElement||null,!1),this.commonUniforms={time:{value:0}},this.scene=new m.Scene,this.camera=new m.PerspectiveCamera(50,1,.1,1e3)}tick(e){this.time+=e,this.commonUniforms.time.value=this.time,this.readyAnimate&&this.animate(e)}animate(e){}onBind(){setTimeout(()=>{this.onResize(),this.readyAnimate=!0},0)}onUnbind(){this.dispatchEvent({type:"dispose"}),this.removeChildrens(this.scene),this.readyAnimate=!1}removeChildrens(e){const t=e.children.length;for(let i=t-1;i>=0;i--){this.removeChildrens(e.children[i]);let n,r;e.children[i].isMesh&&(n=e.children[i].geometry,r=e.children[i].material),e.remove(e.children[i]),n&&n.dispose(),r&&r.dispose()}}setWrapperElement(e,t=!0){this.info.wrapperElement=e,this.info.wrapperElementRect=e?e.getBoundingClientRect():null,t&&this.onResize()}onResize(){if(this.renderer==null)return;const e=new m.Vector2(document.body.clientWidth,window.innerHeight),t=new m.Vector2;this.info.wrapperElement?t.set(this.info.wrapperElement.clientWidth,this.info.wrapperElement.clientHeight):t.copy(e);let i=1-(t.x/t.y-this.info.aspectSetting.portraitAspect)/(this.info.aspectSetting.mainAspect-this.info.aspectSetting.portraitAspect);i=Math.min(1,Math.max(0,i));let n=1-(t.x/t.y-this.info.aspectSetting.wideAspect)/(this.info.aspectSetting.mainAspect-this.info.aspectSetting.wideAspect);n=Math.min(1,Math.max(0,n)),this.info.size.windowSize.copy(e),this.info.size.windowAspectRatio=e.x/e.y,this.info.size.canvasSize.copy(t),this.info.size.canvasPixelSize.copy(t.clone().multiplyScalar(this.renderer.getPixelRatio())),this.info.size.canvasAspectRatio=t.x/t.y,this.info.size.portraitWeight=i,this.info.size.wideWeight=n,this.renderer.setPixelRatio(this.info.size.pixelRatio),this.renderer.setSize(this.info.size.canvasSize.x,this.info.size.canvasSize.y),this.camera.aspect=this.info.size.canvasAspectRatio,this.camera.updateProjectionMatrix(),this.info.wrapperElement&&(this.info.wrapperElementRect=this.info.wrapperElement.getBoundingClientRect())}pointerEvent(e){const t=new m.Vector2;if(t.copy(e.position),this.info.canvas){const r=this.info.canvas.getBoundingClientRect();t.sub(new m.Vector2(r.x,r.y))}const i=t.clone();i.divide(this.info.size.canvasSize),i.y=1-i.y,i.multiplyScalar(2).subScalar(1);const n={event:e.pointerEvent,position:t.clone(),delta:e.delta.clone(),screenPosition:i.clone(),windowPosition:e.position.clone()};e.pointerEventType=="hover"?this.onHover(n):e.pointerEventType=="start"?this.onTouchStart(n):e.pointerEventType=="move"?this.onTouchMove(n):e.pointerEventType=="end"&&this.onTouchEnd(n)}onTouchStart(e){}onTouchMove(e){}onTouchEnd(e){}onHover(e){}onWheel(e){}onWheelOptimized(e){}}var C=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},z={};(function(c){(function(){var d;d=c!==null?c:this,d.Lethargy=function(){function e(t,i,n,r){this.stability=t!=null?Math.abs(t):8,this.sensitivity=i!=null?1+Math.abs(i):100,this.tolerance=n!=null?1+Math.abs(n):1.1,this.delay=r??150,this.lastUpDeltas=function(){var l,o,s;for(s=[],l=1,o=this.stability*2;1<=o?l<=o:l>=o;1<=o?l++:l--)s.push(null);return s}.call(this),this.lastDownDeltas=function(){var l,o,s;for(s=[],l=1,o=this.stability*2;1<=o?l<=o:l>=o;1<=o?l++:l--)s.push(null);return s}.call(this),this.deltasTimestamp=function(){var l,o,s;for(s=[],l=1,o=this.stability*2;1<=o?l<=o:l>=o;1<=o?l++:l--)s.push(null);return s}.call(this)}return e.prototype.check=function(t){var i;return t=t.originalEvent||t,t.wheelDelta!=null?i=t.wheelDelta:t.deltaY!=null?i=t.deltaY*-40:(t.detail!=null||t.detail===0)&&(i=t.detail*-40),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),i>0?(this.lastUpDeltas.push(i),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(i),this.lastDownDeltas.shift(),this.isInertia(-1))},e.prototype.isInertia=function(t){var i,n,r,l,o,s,a;return i=t===-1?this.lastDownDeltas:this.lastUpDeltas,i[0]===null?t:this.deltasTimestamp[this.stability*2-2]+this.delay>Date.now()&&i[0]===i[this.stability*2-1]?!1:(r=i.slice(0,this.stability),n=i.slice(this.stability,this.stability*2),a=r.reduce(function(u,p){return u+p}),o=n.reduce(function(u,p){return u+p}),s=a/r.length,l=o/n.length,Math.abs(s)<Math.abs(l*this.tolerance)&&this.sensitivity<Math.abs(l)?t:!1)},e.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},e.prototype.showLastDownDeltas=function(){return this.lastDownDeltas},e}()}).call(C)})(z);class V extends m.EventDispatcher{constructor(){super();f(this,"isSP");f(this,"isTouching");f(this,"element",null);f(this,"position");f(this,"delta");f(this,"lethargy");f(this,"memDelta",0);f(this,"riseDelta",!1);f(this,"trackpadMemDelta",0);f(this,"trackpadMax",!1);this.position=new m.Vector2(NaN,NaN),this.delta=new m.Vector2(NaN,NaN);const e=navigator.userAgent;this.isSP=e.indexOf("iPhone")>=0||e.indexOf("iPad")>=0||e.indexOf("Android")>=0||navigator.platform=="iPad"||navigator.platform=="MacIntel"&&navigator.userAgent.indexOf("Safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.standalone!==void 0,this.position.set(NaN,NaN),this.isTouching=!1,this.lethargy=new z.Lethargy}registerElement(e){this.element=e;const t=this.onTouch.bind(this,"start"),i=this.onTouch.bind(this,"move"),n=this.onTouch.bind(this,"end"),r=this.onPointer.bind(this,"start"),l=this.onPointer.bind(this,"move"),o=this.onPointer.bind(this,"end"),s=this.wheel.bind(this);e.addEventListener("touchstart",t,{passive:!1}),e.addEventListener("touchmove",i,{passive:!1}),e.addEventListener("touchend",n,{passive:!1}),e.addEventListener("pointerdown",r),e.addEventListener("pointermove",l),e.addEventListener("pointerup",o),e.addEventListener("dragend",o),e.addEventListener("wheel",s,{passive:!1});const a=u=>{e.isEqualNode(u.elm)&&(e.removeEventListener("touchstart",t),e.removeEventListener("touchmove",i),e.removeEventListener("touchend",n),e.removeEventListener("pointerdown",r),e.removeEventListener("pointermove",l),e.removeEventListener("pointerup",o),e.removeEventListener("dragend",o),e.removeEventListener("wheel",s),this.removeEventListener("unregister",a))};this.addEventListener("unregister",a)}unregisterElement(e){this.dispatchEvent({type:"unregister",elm:e})}getScreenPosition(e){if(this.position.x!=this.position.x)return new m.Vector2(NaN,NaN);const t=this.position.clone().divide(e).multiplyScalar(2).subScalar(1);return t.y*=-1,t}getRelativePosition(e,t){const i=e.getClientRects()[0];let n=this.position.x-i.left,r=this.position.y-i.top;return t&&(n/=i.width,r/=i.height),new m.Vector2(n,r)}setPos(e,t){this.position.x!==this.position.x||this.position.y!==this.position.y||this.delta.set(e-this.position.x,t-this.position.y),this.position.set(e,t)}onTouch(e,t){const i=t.touches[0];i?this.touchEventHandler(i.pageX,i.pageY,e,t):e=="end"&&this.touchEventHandler(NaN,NaN,e,t)}onPointer(e,t){const i=t.pointerType;i!=null?i=="mouse"&&(t.button==-1||t.button==0)&&this.touchEventHandler(t.pageX,t.pageY,e,t):this.touchEventHandler(t.pageX,t.pageY,e,t)}touchEventHandler(e,t,i,n){let r=!1;const l=e-window.pageXOffset,o=t-window.pageYOffset;i=="start"?(this.isTouching=!0,this.setPos(l,o),this.delta.set(0,0),r=!0):i=="move"?(this.setPos(l,o),this.isTouching&&(r=!0)):i=="end"&&("targetTouches"in n?n.targetTouches.length==0&&(this.isTouching=!1):this.isTouching=!1,r=!0),r&&this.dispatchEvent({type:"update",pointerEvent:n,pointerEventType:i,position:this.position.clone(),delta:this.delta.clone()})}update(){this.isSP||(this.dispatchEvent({type:"update",pointerEvent:null,pointerEventType:"hover",position:this.position.clone(),delta:this.delta.clone()}),this.delta.set(0,0))}wheelOptimized(e){this.dispatchEvent({type:"wheelOptimized",wheelEvent:e})}wheel(e){if(this.dispatchEvent({type:"wheel",wheelEvent:e}),this.lethargy.check(e)!==!1)this.wheelOptimized(e);else{const t=e.deltaY-this.memDelta;Math.abs(t)>50?(this.memDelta=t,this.wheelOptimized(e),this.riseDelta=!0):t==0?this.riseDelta&&this.wheelOptimized(e):t<0&&(this.riseDelta=!1),this.memDelta=e.deltaY}}}class B extends m.EventDispatcher{constructor(e){super();f(this,"pointer");f(this,"clock");f(this,"layers",[]);f(this,"pointerEventElement");e&&e.silent||console.log("%c- ore-three -","padding: 5px 10px ;background-color: black; color: white;font-size:11px"),this.clock=new m.Clock,this.pointer=new V,this.setPointerEventElement(e&&e.pointerEventElement||document.body);const t=this.pointerEvent.bind(this),i=this.onWheel.bind(this),n=this.onWheelOptimized.bind(this),r=this.onOrientationDevice.bind(this),l=this.onWindowResize.bind(this);this.pointer.addEventListener("update",t),this.pointer.addEventListener("wheel",i),this.pointer.addEventListener("wheelOptimized",n),window.addEventListener("orientationchange",r),window.addEventListener("resize",l),this.addEventListener("dispose",()=>{this.pointer.removeEventListener("update",t),this.pointer.removeEventListener("wheel",i),this.pointer.removeEventListener("wheelOptimized",n),window.removeEventListener("orientationchange",r),window.removeEventListener("resize",l)}),this.tick()}tick(){const e=this.clock.getDelta();this.pointer.update();for(let t=0;t<this.layers.length;t++)this.layers[t].tick(e);requestAnimationFrame(this.tick.bind(this))}onWindowResize(){for(let e=0;e<this.layers.length;e++)this.layers[e].onResize()}onOrientationDevice(){this.onWindowResize()}pointerEvent(e){for(let t=0;t<this.layers.length;t++)this.layers[t].pointerEvent(e)}onWheel(e){for(let t=0;t<this.layers.length;t++)this.layers[t].onWheel(e.wheelEvent)}onWheelOptimized(e){for(let t=0;t<this.layers.length;t++)this.layers[t].onWheelOptimized(e.wheelEvent)}addLayer(e){this.layers.push(e),e.onBind()}getLayer(e){for(let t=0;t<this.layers.length;t++)if(this.layers[t].info.name==e)return this.layers[t];return null}removeLayer(e){for(let t=this.layers.length-1;t>=0;t--){const i=this.layers[t];i.info.name==e&&(i.onUnbind(),this.layers.splice(t,1))}}setPointerEventElement(e){this.pointerEventElement&&this.pointer.unregisterElement(this.pointerEventElement),this.pointer.registerElement(e),this.pointerEventElement=e}dispose(){this.layers.map(t=>t.info.name).forEach(t=>{this.removeLayer(t)}),this.tick=()=>{},this.dispatchEvent({type:"dispose"})}}var L;(c=>{c.NEWTON_ITERATIONS=4,c.NEWTON_MIN_SLOPE=.001,c.SUBDIVISION_PRECISION=1e-7,c.SUBDIVISION_MAX_ITERATIONS=10,c.BEZIER_EASING_CACHE_SIZE=11,c.BEZIER_EASING_SAMPLE_STEP_SIZE=1/c.BEZIER_EASING_CACHE_SIZE;function d(s){return-s.p0+3*s.p1-3*s.p2+s.p3}function e(s){return 3*s.p0-6*s.p1+3*s.p2}function t(s){return-3*s.p0+3*s.p1}function i(s,a){return 3*d(s)*a*a+2*e(s)*a+t(s)}c.calcBezierSlope=i;function n(s,a){return((d(s)*a+e(s))*a+t(s))*a+s.p0}c.calcBezier=n;function r(s,a,u,p){let g=0,y=0;for(let E=0;E<c.SUBDIVISION_MAX_ITERATIONS;E++)y=a+(u-a)/2,g=n(p,y),g>s?u=y:a=y;return y}function l(s,a,u){for(let p=0;p<c.NEWTON_ITERATIONS;p++){const g=i(a,u);if(g==0)return u;const y=n(a,u)-s;u-=y/g}return u}function o(s,a,u){s.p1=Math.max(s.p0,Math.min(s.p3,s.p1)),s.p2=Math.max(s.p0,Math.min(s.p3,s.p2));let p=0;for(let E=1;E<u.length&&(p=E-1,!(a<u[E]));E++);const g=p/(c.BEZIER_EASING_CACHE_SIZE-1),y=i(s,g)/(s.p3-s.p0);return y==0?g:y>.01?l(a,s,g):r(a,g,g+c.BEZIER_EASING_SAMPLE_STEP_SIZE,s)}c.getBezierTfromX=o})(L||(L={})),v.Easings=void 0,(c=>{function d(h=6){return A=>{var b=Math.exp(-h*(2*A-1)),w=Math.exp(-h);return(1+(1-b)/(1+b)*(1+w)/(1-w))/2}}c.sigmoid=d;function e(h,A,b){const w=Math.max(0,Math.min(1,(b-h)/(A-h)));return w*w*(3-2*w)}c.smoothstep=e;function t(h){return h}c.linear=t;function i(h){return h*h}c.easeInQuad=i;function n(h){return h*(2-h)}c.easeOutQuad=n;function r(h){return h<.5?2*h*h:-1+(4-2*h)*h}c.easeInOutQuad=r;function l(h){return h*h*h}c.easeInCubic=l;function o(h){return--h*h*h+1}c.easeOutCubic=o;function s(h){return h<.5?4*h*h*h:(h-1)*(2*h-2)*(2*h-2)+1}c.easeInOutCubic=s;function a(h){return h*h*h*h}c.easeInQuart=a;function u(h){return 1- --h*h*h*h}c.easeOutQuart=u;function p(h){return h<.5?8*h*h*h*h:1-8*--h*h*h*h}c.easeInOutQuart=p;function g(h){return h*h*h*h*h}c.easeInQuint=g;function y(h){return 1+--h*h*h*h*h}c.easeOutQuint=y;function E(h){return h<.5?16*h*h*h*h*h:1+16*--h*h*h*h*h}c.easeInOutQuint=E;function x(h,A,b,w){for(var P=new Array(L.BEZIER_EASING_CACHE_SIZE),I=0;I<L.BEZIER_EASING_CACHE_SIZE;++I)P[I]=L.calcBezier({p0:h.x,p1:A.x,p2:b.x,p3:w.x},I/(L.BEZIER_EASING_CACHE_SIZE-1));return R=>R<=h.x?h.y:w.x<=R?w.y:L.calcBezier({p0:h.y,p1:A.y,p2:b.y,p3:w.y},L.getBezierTfromX({p0:h.x,p1:A.x,p2:b.x,p3:w.x},R,P))}c.bezier=x;function Y(h,A,b,w){return x({x:0,y:0},{x:h,y:A},{x:b,y:w},{x:1,y:1})}c.cubicBezier=Y})(v.Easings||(v.Easings={})),v.Lerps=void 0,(c=>{function d(l,o,s){return l+(o-l)*s}c.number=d;function e(l,o,s){if(l.length==o.length){const a=[];for(let u=0;u<l.length;u++)a.push(l[u]+(o[u]-l[u])*s);return a}else return console.log("Different length Arrays!!!"),!1}c.numberArray=e;function t(l,o,s){return l.clone().lerp(o,s)}c.THREEVectors=t;function i(l,o,s){return l.clone().slerp(o,s)}c.THREEQuaternion=i;function n(l,o,s){const a=l.clone(),u=o.clone();return a.x=a.x+(u.x-a.x)*s,a.y=a.y+(u.y-a.y)*s,a.z=a.z+(u.z-a.z)*s,a}c.THREEEuler=n;function r(l){if(typeof l=="number")return c.number;if(l instanceof Array)return c.numberArray;if("isVector2"in l||"isVector3"in l||"isVector4"in l||"isColor"in l)return c.THREEVectors;if("isQuaternion"in l)return c.THREEQuaternion;if("isEuler"in l)return c.THREEEuler}c.getLerpFunc=r})(v.Lerps||(v.Lerps={}));class M extends m.EventDispatcher{constructor(){super();f(this,"dataBase");f(this,"variables");f(this,"dispatchEvents",[]);f(this,"_isAnimating",!1);this.variables={},this.dataBase={}}add(e){const t={time:0,duration:0,value:this.getValueClone(e.initValue),startValue:this.getValueClone(e.initValue),goalValue:this.getValueClone(e.initValue),easing:e.easing||v.Easings.sigmoid(),lerpFunc:e.customLerpFunc||v.Lerps.getLerpFunc(e.initValue),userData:e.userData,isAnimating:!1,isAnimatingReseve:!1};return this.dataBase[e.name]=t.value,this.variables[e.name]=t,this.dispatchEvent({type:"added",varName:e.name,variable:t}),t}setEasing(e,t){const i=this.variables[e];i?i.easing=t:console.warn('"'+e+'" is not exist')}setValue(e,t){let i=this.dataBase[e];if(i!==void 0)typeof i=="number"?this.dataBase[e]=t:"copy"in i?i.copy(t):i instanceof Array&&(i=t.concat()),this.updateDataBase(e),this.cancelAnimate(e);else return console.warn('"'+e+'" is not exist'),null}animate(e,t,i=1,n){const r=this.variables[e];r?(this.cancelAnimate(e),this.animateVariableInit(r,t,i,null,()=>{r.onAnimationFinished=null,n&&n()}),this._isAnimating=!0):console.error('"'+e+'" is not exist')}animateAsync(e,t,i=1,n){return new Promise((r,l)=>{const o=this.variables[e];o?(this.cancelAnimate(e),this.animateVariableInit(o,t,i,()=>{o.onAnimationFinished=null,l("animation canceled")},()=>{o.onAnimationFinished=null,n&&n(),r(null)}),this._isAnimating=!0):l('"'+e+'" is not exist')})}animateVariableInit(e,t,i,n,r){e.time=0,e.isAnimating=!0,e.isAnimatingReseve=!0,e.duration=i,e.startValue=this.getValueClone(e.value),e.goalValue=this.getValueClone(t),e.onAnimationCanceled=n,e.onAnimationFinished=r}cancelAnimate(e){const t=this.variables[e];t?(t.time=-1,t.onAnimationFinished=null,t.onAnimationCanceled&&t.onAnimationCanceled()):console.warn('"'+e+'" is not exist')}get(e){return this.variables[e]?this.variables[e].value:(console.warn('"'+e+'" is not exist'),null)}getVariableObject(e,t=!1){return this.variables[e]?this.variables[e]:(t||console.warn('"'+e+'" is not exist'),null)}applyToUniforms(e){const t=Object.keys(this.variables);for(let i=0;i<t.length;i++){const n=this.getVariableObject(t[i]);n&&(e[t[i]]=n)}}isAnimating(e){return e!==void 0?this.variables[e]?this.variables[e].isAnimating:!1:this._isAnimating}getValueClone(e){return typeof e=="number"?e:e instanceof Array?e.concat():"clone"in e?e.clone():e}wait(e){return new Promise(i=>{setTimeout(()=>{i()},e*1e3)})}update(e){this._isAnimating=!1;const t=Object.keys(this.variables);for(let i=0;i<t.length;i++){const n=t[i],r=this.variables[n];if(r.isAnimating&&r.isAnimatingReseve){this._isAnimating=!0;let l=!1;const o=r.duration,s=r.easing,a=r.lerpFunc;o==0?r.time=1:r.time+=(e||.016)/o,r.time>=1&&(l=!0,r.time=1);let u=r.goalValue;a&&(u=a(r.startValue,r.goalValue,s(r.time)));const p=this.dataBase[n];typeof p=="number"||!("copy"in p)?this.dataBase[n]=u:"copy"in p&&p.copy(u),this.dispatchEvent({type:"update/"+t[i],deltaTime:e,value:r.value}),l&&(r.onAnimationFinished&&this.dispatchEvents.push(r.onAnimationFinished),r.isAnimatingReseve=!1)}else r.isAnimating=!1,r.time=0}for(;this.dispatchEvents.length!=0;){const i=this.dispatchEvents.pop();i&&i()}this.updateDataBase(),this.dispatchEvent({type:"update",deltaTime:e}),this._isAnimating&&this.dispatchEvent({type:"animate",deltaTime:e})}updateDataBase(e){if(e){const i=this.variables[e],n=this.dataBase[e];i&&n!==void 0&&(typeof i.value=="number"||!("copy"in i.value))&&(i.value=n);return}const t=Object.keys(this.dataBase);for(let i=0;i<t.length;i++){const n=this.variables[t[i]],r=this.dataBase[t[i]];n&&r!==void 0&&(typeof n.value=="number"||!("copy"in n.value))&&(n.value=r)}}}var T={},U={get exports(){return T},set exports(c){T=c}};/*!
 * EventEmitter v5.2.9 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - https://oli.me.uk/
 * @preserve
 */(function(c){(function(d){function e(){}var t=e.prototype,i=d.EventEmitter;function n(o,s){for(var a=o.length;a--;)if(o[a].listener===s)return a;return-1}function r(o){return function(){return this[o].apply(this,arguments)}}t.getListeners=function(s){var a=this._getEvents(),u,p;if(s instanceof RegExp){u={};for(p in a)a.hasOwnProperty(p)&&s.test(p)&&(u[p]=a[p])}else u=a[s]||(a[s]=[]);return u},t.flattenListeners=function(s){var a=[],u;for(u=0;u<s.length;u+=1)a.push(s[u].listener);return a},t.getListenersAsObject=function(s){var a=this.getListeners(s),u;return a instanceof Array&&(u={},u[s]=a),u||a};function l(o){return typeof o=="function"||o instanceof RegExp?!0:o&&typeof o=="object"?l(o.listener):!1}t.addListener=function(s,a){if(!l(a))throw new TypeError("listener must be a function");var u=this.getListenersAsObject(s),p=typeof a=="object",g;for(g in u)u.hasOwnProperty(g)&&n(u[g],a)===-1&&u[g].push(p?a:{listener:a,once:!1});return this},t.on=r("addListener"),t.addOnceListener=function(s,a){return this.addListener(s,{listener:a,once:!0})},t.once=r("addOnceListener"),t.defineEvent=function(s){return this.getListeners(s),this},t.defineEvents=function(s){for(var a=0;a<s.length;a+=1)this.defineEvent(s[a]);return this},t.removeListener=function(s,a){var u=this.getListenersAsObject(s),p,g;for(g in u)u.hasOwnProperty(g)&&(p=n(u[g],a),p!==-1&&u[g].splice(p,1));return this},t.off=r("removeListener"),t.addListeners=function(s,a){return this.manipulateListeners(!1,s,a)},t.removeListeners=function(s,a){return this.manipulateListeners(!0,s,a)},t.manipulateListeners=function(s,a,u){var p,g,y=s?this.removeListener:this.addListener,E=s?this.removeListeners:this.addListeners;if(typeof a=="object"&&!(a instanceof RegExp))for(p in a)a.hasOwnProperty(p)&&(g=a[p])&&(typeof g=="function"?y.call(this,p,g):E.call(this,p,g));else for(p=u.length;p--;)y.call(this,a,u[p]);return this},t.removeEvent=function(s){var a=typeof s,u=this._getEvents(),p;if(a==="string")delete u[s];else if(s instanceof RegExp)for(p in u)u.hasOwnProperty(p)&&s.test(p)&&delete u[p];else delete this._events;return this},t.removeAllListeners=r("removeEvent"),t.emitEvent=function(s,a){var u=this.getListenersAsObject(s),p,g,y,E,x;for(E in u)if(u.hasOwnProperty(E))for(p=u[E].slice(0),y=0;y<p.length;y++)g=p[y],g.once===!0&&this.removeListener(s,g.listener),x=g.listener.apply(this,a||[]),x===this._getOnceReturnValue()&&this.removeListener(s,g.listener);return this},t.trigger=r("emitEvent"),t.emit=function(s){var a=Array.prototype.slice.call(arguments,1);return this.emitEvent(s,a)},t.setOnceReturnValue=function(s){return this._onceReturnValue=s,this},t._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},t._getEvents=function(){return this._events||(this._events={})},e.noConflict=function(){return d.EventEmitter=i,e},c.exports?c.exports=e:d.EventEmitter=e})(typeof window<"u"?window:C||{})})(U);class F extends T{constructor(e){super();f(this,"name");f(this,"curves",{});f(this,"uniforms");f(this,"frame");this.name=e||"",this.uniforms={},this.frame={start:0,end:0,duration:0}}addFcurveGroup(e,t){this.curves[e]=t,this.calcFrame()}removeFCurve(e){delete this.curves[e],this.calcFrame()}calcFrame(){let e=Object.keys(this.curves),t=1/0,i=-1/0;for(let n=0;n<e.length;n++){let r=this.curves[e[n]];r.frameStart<t&&(t=r.frameStart),r.frameEnd>i&&(i=r.frameEnd)}(t==-1/0||i==1/0)&&(t=0,i=1),this.frame.start=t,this.frame.end=i,this.frame.duration=this.frame.end-this.frame.start}getFCurveGroup(e){return this.curves[e]||null}assignUniforms(e,t){this.uniforms[e]=t}getUniforms(e){if(this.uniforms[e])return this.uniforms[e];let t=this.getFCurveGroup(e);if(t){let i={value:t.createInitValue()};return this.uniforms[e]=i,i}return null}getValue(e,t){let i=this.getUniforms(e);if(!i)return t||null;let n=i.value;return t?typeof n=="number"?(t.x=n,t):(t.x=n.x,t.y=n.y,"z"in t&&"z"in n&&(t.z=n.z),"w"in t&&"w"in n&&(t.w=n.w),t||null):n}getValueAt(e,t,i){let n=this.getFCurveGroup(e);return i?n?n.getValue(t||0,i):i:n?n.getValue(t):null}updateFrame(e){let t=Object.keys(this.curves);for(let i=0;i<t.length;i++){let n=this.curves[t[i]],r=this.getUniforms(t[i]);r&&(typeof r.value=="number"?r.value=n.getValue(e)||0:n.getValue(e,r.value))}this.emitEvent("update",[this])}}class D extends T{constructor(e){super();f(this,"keyframes",[]);f(this,"cache",{frame:NaN,value:NaN});f(this,"frameStart");f(this,"frameEnd");f(this,"frameDuration");this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.set(e)}set(e){e&&(this.keyframes.length=0,e.forEach(t=>{this.addKeyFrame(t)}))}addKeyFrame(e){let t=0;for(let i=0;i<this.keyframes.length&&this.keyframes[i].coordinate.x<e.coordinate.x;i++)t++;this.keyframes.splice(t,0,e),this.frameStart=this.keyframes[0].coordinate.x,this.frameEnd=this.keyframes[this.keyframes.length-1].coordinate.x}getValue(e){if(e==this.cache.frame)return this.cache.value;let t=null;for(let i=0;i<this.keyframes.length;i++){let n=this.keyframes[i];if(e<=n.coordinate.x){let r=this.keyframes[i-1];r?t=r.to(n,e):t=n.coordinate.y;break}}return t===null&&this.keyframes.length>0&&(t=this.keyframes[this.keyframes.length-1].coordinate.y),t!==null?(this.cache={frame:e,value:t},t):0}}class N extends T{constructor(e,t,i,n,r,l){super();f(this,"name");f(this,"curve");f(this,"type","scalar");f(this,"frameStart");f(this,"frameEnd");f(this,"frameDuration");this.name=e||"",this.frameStart=0,this.frameEnd=0,this.frameDuration=0,this.curve={x:null,y:null,z:null,w:null,scalar:null},t&&this.setFCurve(t,"x"),i&&this.setFCurve(i,"y"),n&&this.setFCurve(n,"z"),r&&this.setFCurve(r,"w")}setFCurve(e,t){this.curve[t]=e,this.calcType(),this.calcFrame()}calcType(){this.curve.scalar&&(this.type="scalar"),this.curve.w?this.type="vec4":this.curve.z?this.type="vec3":this.curve.y?this.type="vec2":this.curve.x&&(this.type="scalar")}calcFrame(){let e=Object.keys(this.curve),t=1/0,i=-1/0;for(let n=0;n<e.length;n++){let r=this.curve[e[n]];r&&(r.frameStart<t&&(t=r.frameStart),r.frameEnd>i&&(i=r.frameEnd))}(t==-1/0||i==1/0)&&(t=0,i=1),this.frameStart=t,this.frameEnd=i,this.frameDuration=this.frameEnd-this.frameStart}createInitValue(){return this.type=="vec2"?new m.Vector2:this.type=="vec3"?new m.Vector3:this.type=="vec4"?new m.Vector4:0}getValue(e,t){return t?(this.curve.x&&(t.x=this.curve.x.getValue(e)),this.curve.y&&(t.y=this.curve.y.getValue(e)),this.curve.z&&"z"in t&&(t.z=this.curve.z.getValue(e)),this.curve.w&&"w"in t&&(t.w=this.curve.w.getValue(e)),t):this.curve.scalar?this.curve.scalar.getValue(e):null}}class _ extends T{constructor(e,t,i,n){super();f(this,"coordinate",{x:0,y:0});f(this,"handleLeft",{x:0,y:0});f(this,"handleRight",{x:0,y:0});f(this,"interpolation","BEZIER");f(this,"easing",null);f(this,"nextFrame",null);this.set(e,t,i,n)}set(e,t,i,n){this.coordinate=e,this.handleLeft=t||e,this.handleRight=i||e,this.interpolation=n||"BEZIER"}getEasing(e,t){return e=="BEZIER"?v.Easings.bezier(this.coordinate,this.handleRight,t.handleLeft,t.coordinate):i=>{let n=t.coordinate.y-this.coordinate.y;return i=(i-this.coordinate.x)/(t.coordinate.x-this.coordinate.x),this.coordinate.y+i*n}}to(e,t){return(this.nextFrame==null||this.nextFrame.coordinate.x!=e.coordinate.x||this.nextFrame.coordinate.y!=e.coordinate.y)&&(this.easing=this.getEasing(this.interpolation,e),this.nextFrame=e),this.easing?this.easing(t):0}}class W extends T{constructor(e){super();f(this,"url");f(this,"ws");f(this,"connected",!1);f(this,"frameCurrent",0);f(this,"frameStart",0);f(this,"frameEnd",0);f(this,"objects",[]);f(this,"actions",[]);e&&(this.url=e,this.connect(this.url))}connect(e){this.url=e,this.ws=new WebSocket(this.url),this.ws.onopen=this.onOpen.bind(this),this.ws.onmessage=this.onMessage.bind(this),this.ws.onclose=this.onClose.bind(this),this.ws.onerror=t=>{console.error(t)}}syncJsonScene(e){let t=new XMLHttpRequest;t.onreadystatechange=()=>{t.readyState==4&&t.status==200&&this.onSyncScene(JSON.parse(t.response))},t.open("GET",e),t.send()}onSyncScene(e){this.actions.length=0,this.objects.length=0,e.actions.forEach(t=>{let i=new F(t.name),n=Object.keys(t.fcurve_groups);for(let r=0;r<n.length;r++){let l=n[r],o=new N(l);t.fcurve_groups[l].forEach(s=>{let a=new D;a.set(s.keyframes.map(u=>new _(u.c,u.h_l,u.h_r,u.i))),o.setFCurve(a,s.axis)}),i.addFcurveGroup(o.name,o)}this.actions.push(i)}),e.objects.forEach(t=>{this.objects.push(t)}),this.emitEvent("update/scene",[this]),this.setTimeline(this.frameCurrent)}onSyncTimeline(e){this.setTimeline(e.current,e.start,e.end)}onOpen(e){this.connected=!0}onMessage(e){let t=JSON.parse(e.data);t.type=="sync/scene"?this.onSyncScene(t.data):t.type=="sync/timeline"&&this.onSyncTimeline(t.data)}onClose(e){this.disposeWS()}getActionNameList(e){for(let t=0;t<this.objects.length;t++)if(this.objects[t].name==e)return this.objects[t].actions;return[]}getAction(e){for(let t=0;t<this.actions.length;t++)if(this.actions[t].name==e)return this.actions[t];return null}getActionList(e){let t=[];return this.getActionNameList(e).forEach(n=>{let r=this.getAction(n);r&&t.push(r)}),t}getActionContainsAccessor(e){return this.actions.find(t=>Object.keys(t.curves).some(n=>n==e))||null}setTimeline(e,t,i){this.frameCurrent=e,this.frameStart=t||this.frameStart,this.frameEnd=i||this.frameEnd,this.emitEvent("update/timeline",[this.frameCurrent,this.frameStart,this.frameEnd])}dispose(){this.disposeWS()}disposeWS(){this.ws&&(this.ws.close(),this.ws.onmessage=null,this.ws.onclose=null,this.ws.onopen=null,this.connected=!1)}}const j=`#define GLSLIFY 1
varying vec2 vUv;void main(){gl_Position=vec4(position,1.0);vUv=uv;}`,G=`#define GLSLIFY 1
uniform sampler2D tex;varying vec2 vUv;void main(){gl_FragColor=texture2D(tex,vUv);}`;v.UniformsLib=void 0,(c=>{function d(...e){const t={};for(let i=0;i<e.length;i++)e[i]!=null&&Object.assign(t,e[i]);return t}c.mergeUniforms=d})(v.UniformsLib||(v.UniformsLib={}));class H{constructor(d,e){f(this,"renderer");f(this,"dataSize");f(this,"uniforms");f(this,"scene");f(this,"camera");f(this,"mesh");f(this,"materials");f(this,"tempDataLinear");f(this,"tempDataNear");f(this,"renderTargets",[]);this.renderer=d,this.dataSize=e.clone(),this.uniforms={dataSize:{value:this.dataSize}},this.tempDataLinear=this.createData({minFilter:m.LinearFilter,magFilter:m.LinearFilter}),this.tempDataNear=this.createData({minFilter:m.NearestFilter,magFilter:m.NearestFilter}),this.scene=new m.Scene,this.camera=new m.Camera,this.materials=[],this.mesh=new m.Mesh(new m.PlaneGeometry(2,2)),this.scene.add(this.mesh)}get isSupported(){return this.renderer.extensions.get("OES_texture_float")}createInitializeTexture(){let d=new Float32Array(this.uniforms.dataSize.value.x*this.uniforms.dataSize.value.y*4),e=new m.DataTexture(d,this.uniforms.dataSize.value.x,this.uniforms.dataSize.value.y,m.RGBAFormat,m.FloatType);return e.needsUpdate=!0,e}createData(d,e){let t=navigator.userAgent,i=t.indexOf("iPhone")>=0||t.indexOf("iPad")>=0||navigator.platform=="iPad"||navigator.platform=="MacIntel"&&navigator.userAgent.indexOf("Safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1&&navigator.standalone!==void 0,n={wrapS:m.ClampToEdgeWrapping,wrapT:m.ClampToEdgeWrapping,minFilter:m.NearestFilter,magFilter:m.NearestFilter,format:m.RGBAFormat,type:i?m.HalfFloatType:m.FloatType,stencilBuffer:!1,depthBuffer:!1},r=null,l=null;d&&(d.isDataTexture?(r=d,e&&(l=e)):l=d),l&&(n.wrapS=l.wrapS||n.wrapS,n.wrapT=l.wrapT||n.wrapT,n.minFilter=l.minFilter||n.minFilter,n.magFilter=l.magFilter||n.magFilter,n.format=l.format||n.format,n.type=l.type||n.type,n.stencilBuffer=l.stencilBuffer||n.stencilBuffer,n.depthBuffer=l.depthBuffer||n.depthBuffer);let o=new m.WebGLRenderTarget(this.uniforms.dataSize.value.x,this.uniforms.dataSize.value.y,n),s={buffer:o};if(this.renderTargets.push(o),r){let a=this.createKernel({fragmentShader:G,uniforms:{tex:{value:r}}});this.compute(a,s)}return s}createKernel(d){let e=v.UniformsLib.mergeUniforms(d.uniforms,this.uniforms);d.uniforms=e,d.vertexShader=d.vertexShader||j;let t=new m.ShaderMaterial(d);return this.materials.push(t),{material:t,uniforms:d.uniforms}}compute(d,e,t){let i;e.buffer.texture.magFilter==m.LinearFilter?i=this.tempDataLinear:i=this.tempDataNear,this.mesh.material=d.material;let n=this.renderer.getRenderTarget();this.renderer.setRenderTarget(i.buffer),this.renderer.render(this.scene,t||this.camera),this.swapBuffers(e,i),this.renderer.setRenderTarget(n)}swapBuffers(d,e){let t=d.buffer;d.buffer=e.buffer,e.buffer=t}dispose(){this.mesh.geometry.dispose();for(let e=0;e<this.materials.length;e++)this.materials[e].dispose();this.scene.remove(this.mesh),this.tempDataLinear.buffer.dispose(),this.tempDataNear.buffer.dispose()}resizeData(d){this.dataSize.copy(d);for(let e=0;e<this.renderTargets.length;e++)this.renderTargets[e].setSize(d.x,d.y)}}const Q=`#define GLSLIFY 1
varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;class Z{constructor(d,e,t){f(this,"renderer");f(this,"scene");f(this,"camera");f(this,"screen");f(this,"effect");this.renderer=d,this.scene=new m.Scene,this.camera=new m.OrthographicCamera(-1,1,1,-1),this.screen=new m.Mesh(t||new m.PlaneGeometry(2,2)),this.scene.add(this.screen),e.vertexShader=e.vertexShader||Q,e.uniforms=e.uniforms||{},e.uniforms.resolution={value:new m.Vector2},this.effect={material:new m.ShaderMaterial(e)}}render(d,e=null){let t=this.renderer.getRenderTarget(),i=this.effect,n=i.material,r=n.uniforms;if(d){let l=Object.keys(d);for(let o=0;o<l.length;o++)r[l[o]]?r[l[o]].value=d[l[o]]:(r[l[o]]={value:d[l[o]]},i.material.needsUpdate=!0,i.material.uniforms=r)}e?r.resolution.value.set(e.width,e.height):this.renderer.getSize(r.resolution.value),this.screen.material=n,this.renderer.setRenderTarget(e),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(t)}}class K{constructor(d,e,t){f(this,"obj");f(this,"baseTransform");f(this,"transform");this.obj=d,this.baseTransform={position:this.obj.position.clone(),rotation:this.obj.quaternion.clone(),scale:this.obj.scale.clone()},this.transform=e,t||(this.transform.position&&this.transform.position.add(this.obj.position),this.transform.rotation&&this.transform.rotation.multiply(this.obj.quaternion))}updateTransform(d){this.transform.position&&this.obj.position.copy(this.baseTransform.position.clone().lerp(this.transform.position,d)),this.transform.rotation&&this.obj.quaternion.copy(this.baseTransform.rotation.clone().slerp(this.transform.rotation,d)),this.transform.scale&&this.obj.scale.copy(this.baseTransform.scale.clone().multiplyScalar(this.transform.scale*d+1-d))}}class X extends m.EventDispatcher{constructor(){super()}goHome(){this.dispatchEvent({type:"gohome"})}wait(d){return new Promise((e,t)=>{const i=()=>{t(),this.removeEventListener("gohome",i)};this.addEventListener("gohome",i),setTimeout(()=>{this.removeEventListener("gohome",i),e()},d*1e3)})}}return v.AnimationAction=F,v.Animator=M,v.BaseLayer=k,v.BlenderConnector=W,v.Controller=B,v.FCurve=D,v.FCurveGroup=N,v.FCurveKeyFrame=_,v.GPUComputationController=H,v.LayoutController=K,v.Pointer=V,v.PostProcessing=Z,v.WaitMan=X,Object.defineProperty(v,Symbol.toStringTag,{value:"Module"}),v}({},THREE);
//# sourceMappingURL=ore-three.iife.js.map
