var n=Object.defineProperty;var t=(r,o,e)=>o in r?n(r,o,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[o]=e;var s=(r,o,e)=>(t(r,typeof o!="symbol"?o+"":o,e),e);import{B as a,M as i,a as c,b as l,P as h,C as d}from"./Uniforms.1c993ea0.js";class m extends a{constructor(){super();s(this,"box")}onBind(e){super.onBind(e),this.camera.position.set(0,1.5,4),this.camera.lookAt(0,0,0),this.box=new i(new c,new l),this.scene.add(this.box),new h}animate(e){this.box&&this.box.rotateY(1*e),this.renderer&&this.renderer.render(this.scene,this.camera)}onResize(){super.onResize()}onTouchStart(e){}onTouchMove(e){}onTouchEnd(e){}onHover(e){}onWheel(e,w){}}class u{constructor(){s(this,"controller");this.controller=new d,this.controller.addLayer(new m,{name:"Main",canvas:document.querySelector("#canvas")})}}window.addEventListener("load",()=>{new u});
