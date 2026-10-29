import{d as Me,e as go,V as mo,B as wo}from"./use-message-Bfrt4Brb.js";import{ax as Oe,ca as po,x as G,v as n,y as b,w as s,ay as Ee,aO as xo,aP as yo,s as ko,d as Le,A as ke,o as h,b as m,l as O,e as Y,f as v,n as g,g as We,ba as Xe,r as M,E as Ye,G as Ne,j as So,H as Ae,b_ as Ro,k as R,b2 as Q,W as pe,X as xe,C as re,aA as zo,T as Co,I as ye,R as De,P as Ge,cb as Bo,cc as $o,cd as He,aN as Ue,aC as Fe,a_ as q,c1 as Vo,D as _o,ce as Do,aD as J,aH as Te,bP as K}from"./index-CkP431KK.js";function Fo(e){const w="rgba(0, 0, 0, .85)",p="0 2px 8px 0 rgba(0, 0, 0, 0.12)",{railColor:d,primaryColor:l,baseColor:c,cardColor:$,modalColor:k,popoverColor:E,borderRadius:L,fontSize:V,opacityDisabled:N}=e;return{...po,fontSize:V,markFontSize:V,railColor:d,railColorHover:d,fillColor:l,fillColorHover:l,opacityDisabled:N,handleColor:"#FFF",dotColor:$,dotColorModal:k,dotColorPopover:E,handleBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowHover:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowActive:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowFocus:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",indicatorColor:w,indicatorBoxShadow:p,indicatorTextColor:c,indicatorBorderRadius:L,dotBorder:`2px solid ${d}`,dotBorderActive:`2px solid ${l}`,dotBoxShadow:""}}const To={common:Oe,self:Fo};var Mo=G([n("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[b("reverse",[n("slider-handles",[n("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),n("slider-dots",[n("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),b("vertical",[n("slider-handles",[n("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),n("slider-marks",[n("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),n("slider-dots",[n("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),b("vertical",`
 box-sizing: content-box;
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[n("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[n("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),n("slider-rail",`
 height: 100%;
 `,[s("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),b("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),n("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[n("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),n("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[n("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),b("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[n("slider-handle",`
 cursor: not-allowed;
 `)]),b("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),G("&:hover",[n("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[s("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),n("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),b("active",[n("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[s("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),n("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),n("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[n("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),n("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[s("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),n("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[n("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[n("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[G("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),G("&:focus",[n("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[G("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),n("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[b("transition-disabled",[n("slider-dot","transition: none;")]),n("slider-dot",`
 transition:
 border-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 position: absolute;
 transform: translate(-50%, -50%);
 height: var(--n-dot-height);
 width: var(--n-dot-width);
 border-radius: var(--n-dot-border-radius);
 overflow: hidden;
 box-sizing: border-box;
 border: var(--n-dot-border);
 background-color: var(--n-dot-color);
 `,[b("active","border: var(--n-dot-border-active);")])])]),n("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ee()]),n("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[b("top",`
 margin-bottom: 12px;
 `),b("right",`
 margin-left: 12px;
 `),b("bottom",`
 margin-top: 12px;
 `),b("left",`
 margin-right: 12px;
 `),Ee()]),xo(n("slider",[n("slider-dot","background-color: var(--n-dot-color-modal);")])),yo(n("slider",[n("slider-dot","background-color: var(--n-dot-color-popover);")]))]);function je(e){return window.TouchEvent&&e instanceof window.TouchEvent}function Ke(){const e=new Map,w=p=>d=>{e.set(p,d)};return ko(()=>{e.clear()}),[e,w]}const Ao=["tabindex","aria-valuenow","aria-valuemin","aria-valuemax","aria-orientation","aria-disabled","onFocus","onBlur","onMouseenter","onMouseleave"],Po=["onKeydown","onMousedown","onTouchstart"],Io=0,Eo={...ke.props,to:Me.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onDragstart:[Function],onDragend:[Function]};var Wo=Le({name:"Slider",props:Eo,slots:Object,setup(e){const{mergedClsPrefixRef:w,namespaceRef:p,inlineThemeDisabled:d}=We(e),l=ke("Slider","-slider",Mo,To,e,w),c=M(null),[$,k]=Ke(),[E,L]=Ke(),V=M(new Set),N=Xe(e),{mergedDisabledRef:f}=N,z=R(()=>{const{step:o}=e;if(Number(o)<=0||o==="mark")return 0;const t=o.toString();let a=0;return t.includes(".")&&(a=t.length-t.indexOf(".")-1),a}),H=M(e.defaultValue),Z=Ge(e,"value"),ie=Ye(Z,H),C=R(()=>{const{value:o}=ie;return(e.range?o:[o]).map(T)}),he=R(()=>C.value.length>2),Se=R(()=>e.placement===void 0?e.vertical?"right":"top":e.placement),fe=R(()=>{const{marks:o}=e;return o?Object.keys(o).map(Number.parseFloat):null}),B=M(-1),ve=M(-1),A=M(-1),S=M(!1),i=M(!1),D=R(()=>{const{vertical:o,reverse:t}=e;return o?t?"top":"bottom":t?"right":"left"}),U=R(()=>{if(he.value)return;const o=C.value,t=P(e.range?Math.min(...o):e.min),a=P(e.range?Math.max(...o):o[0]),{value:r}=D;return e.vertical?{[r]:`${t}%`,height:`${a-t}%`}:{[r]:`${t}%`,width:`${a-t}%`}}),j=R(()=>{const o=[],{marks:t}=e;if(t){const a=C.value.slice();a.sort((y,x)=>y-x);const{value:r}=D,{value:u}=he,{range:_}=e,I=u?()=>!1:y=>_?y>=a[0]&&y<=a[a.length-1]:y<=a[0];for(const y of Object.keys(t)){const x=Number(y);o.push({active:I(x),key:x,label:t[y],style:{[r]:`${P(x)}%`}})}}return o});function le(o,t){const a=P(o),{value:r}=D;return{[r]:`${a}%`,zIndex:t===B.value?1:0}}function ee(o){return e.showTooltip||A.value===o||B.value===o&&S.value}function Re(o){return S.value?!(B.value===o&&ve.value===o):!0}function ze(o){var t;~o&&(B.value=o,(t=$.get(o))==null||t.focus())}function Ce(){E.forEach((o,t)=>{ee(t)&&o.syncPosition()})}function be(o){const{"onUpdate:value":t,onUpdateValue:a}=e,{nTriggerFormInput:r,nTriggerFormChange:u}=N;a&&Q(a,o),t&&Q(t,o),H.value=o,r(),u()}function F(o){const{range:t}=e;if(t){if(Array.isArray(o)){const{value:a}=C;o.join()!==a.join()&&be(o)}}else Array.isArray(o)||C.value[0]!==o&&be(o)}function se(o,t){if(e.range){const a=C.value.slice();a.splice(t,1,o),F(a)}else F(o)}function de(o,t,a){const r=a!==void 0;a||(a=o-t>0?1:-1);const u=fe.value||[],{step:_}=e;if(_==="mark"){const x=oe(o,u.concat(t),r?a:void 0);return x?x.value:t}if(_<=0)return t;const{value:I}=z;let y;if(r){const x=Number((t/_).toFixed(I)),X=Math.floor(x),Ve=x>X?X:X-1,_e=x<X?X:X+1;y=oe(t,[Number((Ve*_).toFixed(I)),Number((_e*_).toFixed(I)),...u],a)}else{const x=$e(o);y=oe(o,[...u,x])}return y?T(y.value):t}function T(o){return Math.min(e.max,Math.max(e.min,o))}function P(o){const{max:t,min:a}=e;return(o-a)/(t-a)*100}function Be(o){const{max:t,min:a}=e;return a+(t-a)*o}function $e(o){const{step:t,min:a}=e;if(Number(t)<=0||t==="mark")return o;const r=Math.round((o-a)/t)*t+a;return Number(r.toFixed(z.value))}function oe(o,t=fe.value,a){if(!(t!=null&&t.length))return null;let r=null,u=-1;for(;++u<t.length;){const _=t[u]-o,I=Math.abs(_);(a===void 0||_*a>0)&&(r===null||I<r.distance)&&(r={index:u,distance:I,value:t[u]})}return r}function te(o){const t=c.value;if(!t)return;const a=je(o)?o.touches[0]:o,r=t.getBoundingClientRect();let u;return e.vertical?u=(r.bottom-a.clientY)/r.height:u=(a.clientX-r.left)/r.width,e.reverse&&(u=1-u),Be(u)}function ce(o){if(f.value||!e.keyboard)return;const{vertical:t,reverse:a}=e;switch(o.key){case"ArrowUp":o.preventDefault(),W(t&&a?-1:1);break;case"ArrowRight":o.preventDefault(),W(!t&&a?-1:1);break;case"ArrowDown":o.preventDefault(),W(t&&a?1:-1);break;case"ArrowLeft":o.preventDefault(),W(!t&&a?1:-1)}}function W(o){const t=B.value;if(t===-1)return;const{step:a}=e,r=C.value[t];se(de(Number(a)<=0||a==="mark"?r:r+a*o,r,o>0?1:-1),t)}function qe(o){var u;if(f.value||!je(o)&&o.button!==Io)return;const t=te(o);if(t===void 0)return;const a=C.value.slice(),r=e.range?((u=oe(t,a))==null?void 0:u.index)??-1:0;r!==-1&&(o.preventDefault(),ze(r),Je(),se(de(t,C.value[r]),r))}function Je(){S.value||(S.value=!0,e.onDragstart&&Q(e.onDragstart),pe("touchend",document,we),pe("mouseup",document,we),pe("touchmove",document,me),pe("mousemove",document,me))}function ge(){S.value&&(S.value=!1,e.onDragend&&Q(e.onDragend),xe("touchend",document,we),xe("mouseup",document,we),xe("touchmove",document,me),xe("mousemove",document,me))}function me(o){const{value:t}=B;if(!S.value||t===-1){ge();return}const a=te(o);a!==void 0&&se(de(a,C.value[t]),t)}function we(){ge()}function Qe(o){B.value=o,f.value||(A.value=o)}function Ze(o){B.value===o&&(B.value=-1,ge()),A.value===o&&(A.value=-1)}function eo(o){A.value=o}function oo(o){A.value===o&&(A.value=-1)}Ne(B,(o,t)=>void De(()=>ve.value=t)),Ne(ie,()=>{if(e.marks){if(i.value)return;i.value=!0,De(()=>{i.value=!1})}De(Ce)}),So(()=>{ge()});const Pe=R(()=>{const{self:{markFontSize:o,railColor:t,railColorHover:a,fillColor:r,fillColorHover:u,handleColor:_,opacityDisabled:I,dotColor:y,dotColorModal:x,handleBoxShadow:X,handleBoxShadowHover:Ve,handleBoxShadowActive:_e,handleBoxShadowFocus:to,dotBorder:ao,dotBoxShadow:no,railHeight:ro,railWidthVertical:io,handleSize:lo,dotHeight:so,dotWidth:co,dotBorderRadius:uo,fontSize:ho,dotBorderActive:fo,dotColorPopover:vo},common:{cubicBezierEaseInOut:bo}}=l.value;return{"--n-bezier":bo,"--n-dot-border":ao,"--n-dot-border-active":fo,"--n-dot-border-radius":uo,"--n-dot-box-shadow":no,"--n-dot-color":y,"--n-dot-color-modal":x,"--n-dot-color-popover":vo,"--n-dot-height":so,"--n-dot-width":co,"--n-fill-color":r,"--n-fill-color-hover":u,"--n-font-size":ho,"--n-handle-box-shadow":X,"--n-handle-box-shadow-active":_e,"--n-handle-box-shadow-focus":to,"--n-handle-box-shadow-hover":Ve,"--n-handle-color":_,"--n-handle-size":lo,"--n-opacity-disabled":I,"--n-rail-color":t,"--n-rail-color-hover":a,"--n-rail-height":ro,"--n-rail-width-vertical":io,"--n-mark-font-size":o}}),ae=d?Ae("slider",void 0,Pe,e):void 0,Ie=R(()=>{const{self:{fontSize:o,indicatorColor:t,indicatorBoxShadow:a,indicatorTextColor:r,indicatorBorderRadius:u}}=l.value;return{"--n-font-size":o,"--n-indicator-border-radius":u,"--n-indicator-box-shadow":a,"--n-indicator-color":t,"--n-indicator-text-color":r}}),ne=d?Ae("slider-indicator",void 0,Ie,e):void 0;return{mergedClsPrefix:w,namespace:p,uncontrolledValue:H,mergedValue:ie,mergedDisabled:f,mergedPlacement:Se,isMounted:Ro(),adjustedTo:Me(e),dotTransitionDisabled:i,markInfos:j,isShowTooltip:ee,shouldKeepTooltipTransition:Re,handleRailRef:c,setHandleRefs:k,setFollowerRefs:L,fillStyle:U,getHandleStyle:le,activeIndex:B,arrifiedValues:C,followerEnabledIndexSet:V,handleRailMouseDown:qe,handleHandleFocus:Qe,handleHandleBlur:Ze,handleHandleMouseEnter:eo,handleHandleMouseLeave:oo,handleRailKeyDown:ce,indicatorCssVars:d?void 0:Ie,indicatorThemeClass:ne==null?void 0:ne.themeClass,indicatorOnRender:ne==null?void 0:ne.onRender,cssVars:d?void 0:Pe,themeClass:ae==null?void 0:ae.themeClass,onRender:ae==null?void 0:ae.onRender}},render(){var d;const{mergedClsPrefix:e,themeClass:w,formatTooltip:p}=this;return(d=this.onRender)==null||d.call(this),h(),m("div",{class:v([`${e}-slider`,w,{[`${e}-slider--disabled`]:this.mergedDisabled,[`${e}-slider--active`]:this.activeIndex!==-1,[`${e}-slider--with-mark`]:this.marks,[`${e}-slider--vertical`]:this.vertical,[`${e}-slider--reverse`]:this.reverse}]),style:Y(this.cssVars),onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},[O("div",{class:v(`${e}-slider-rail`)},[O("div",{class:v(`${e}-slider-rail__fill`),style:Y(this.fillStyle)},null,6),this.marks?(h(),m("div",{key:0,class:v([`${e}-slider-dots`,this.dotTransitionDisabled&&`${e}-slider-dots--transition-disabled`])},[g(()=>this.markInfos.map(l=>(h(),m("div",{key:l.key,class:v([`${e}-slider-dot`,{[`${e}-slider-dot--active`]:l.active}]),style:Y(l.style)},null,6))))],2)):g(()=>null),O("div",{ref:"handleRailRef",class:v(`${e}-slider-handles`)},[g(()=>this.arrifiedValues.map((l,c)=>{const $=this.isShowTooltip(c);return h(),re(wo,null,{default:()=>[(h(),re(go,null,{default:()=>(h(),m("div",{ref:this.setHandleRefs(c),class:v(`${e}-slider-handle-wrapper`),tabindex:this.mergedDisabled?-1:0,role:"slider","aria-valuenow":l,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-orientation":this.vertical?"vertical":"horizontal","aria-disabled":this.disabled,style:Y(this.getHandleStyle(l,c)),onFocus:()=>{this.handleHandleFocus(c)},onBlur:()=>{this.handleHandleBlur(c)},onMouseenter:()=>{this.handleHandleMouseEnter(c)},onMouseleave:()=>{this.handleHandleMouseLeave(c)}},[g(()=>zo(this.$slots.thumb,()=>[(h(),m("div",{class:v(`${e}-slider-handle`)},null,2))]))],46,Ao))},1024)),this.tooltip&&(h(),re(mo,{ref:this.setFollowerRefs(c),show:$,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(c),teleportDisabled:this.adjustedTo===Me.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>(h(),re(Co,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(c),onEnter:()=>{this.followerEnabledIndexSet.add(c)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(c)}},{default:()=>{var k;return $?((k=this.indicatorOnRender)==null||k.call(this),h(),m("div",{key:1,class:v([`${e}-slider-handle-indicator`,this.indicatorThemeClass,`${e}-slider-handle-indicator--${this.mergedPlacement}`]),style:Y(this.indicatorCssVars)},[typeof p=="function"?(h(),m(ye,{key:0},[g(()=>p(l))],64)):(h(),m(ye,{key:1},[g(()=>l)],64))],6)):null}},1032,["appear","css","onEnter","onAfterLeave"]))},1032,["show","to","enabled","teleportDisabled","placement","containerClass"]))]},1024)}))],2),this.marks?(h(),m("div",{key:2,class:v(`${e}-slider-marks`)},[g(()=>this.markInfos.map(l=>(h(),m("div",{key:l.key,class:v(`${e}-slider-mark`),style:Y(l.style)},[typeof l.label=="function"?(h(),m(ye,{key:0},[g(()=>l.label())],64)):(h(),m(ye,{key:1},[g(()=>l.label)],64))],6))))],2)):g(()=>null)],2)],46,Po)}});function No(e){const{primaryColor:w,opacityDisabled:p,borderRadius:d,textColor3:l}=e;return{...Bo,iconColor:l,textColor:"white",loadingColor:w,opacityDisabled:p,railColor:"rgba(0, 0, 0, .14)",railColorActive:w,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:d,railBorderRadiusMedium:d,railBorderRadiusLarge:d,buttonBorderRadiusSmall:d,buttonBorderRadiusMedium:d,buttonBorderRadiusLarge:d,boxShadowFocus:`0 0 0 2px ${$o(w,{alpha:.2})}`}}const Ho={common:Oe,self:No};var Uo=n("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[s("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),s("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),s("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),n("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[He({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),s("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),s("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),s("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),G("&:focus",[s("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),b("round",[s("rail","border-radius: calc(var(--n-rail-height) / 2);",[s("button","border-radius: calc(var(--n-button-height) / 2);")])]),Ue("disabled",[Ue("icon",[b("rubber-band",[b("pressed",[s("rail",[s("button","max-width: var(--n-button-width-pressed);")])]),s("rail",[G("&:active",[s("button","max-width: var(--n-button-width-pressed);")])]),b("active",[b("pressed",[s("rail",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),s("rail",[G("&:active",[s("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),b("active",[s("rail",[s("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),s("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[s("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[He()]),s("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),b("active",[s("rail","background-color: var(--n-rail-color-active);")]),b("loading",[s("rail",`
 cursor: wait;
 `)]),b("disabled",[s("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]);const jo=["aria-checked","tabindex","onClick","onFocus","onBlur","onKeyup","onKeydown"],Ko={...ke.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]};let ue;var Xo=Le({name:"Switch",props:Ko,slots:Object,setup(e){ue===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?ue=CSS.supports("width","max(1px)"):ue=!1:ue=!0);const{mergedClsPrefixRef:w,inlineThemeDisabled:p,mergedComponentPropsRef:d}=We(e),l=ke("Switch","-switch",Uo,Ho,e,w),c=Xe(e,{mergedSize(i){var U,j;if(e.size!==void 0)return e.size;if(i)return i.mergedSize.value;const D=(j=(U=d==null?void 0:d.value)==null?void 0:U.Switch)==null?void 0:j.size;return D||"medium"}}),{mergedSizeRef:$,mergedDisabledRef:k}=c,E=M(e.defaultValue),L=Ge(e,"value"),V=Ye(L,E),N=R(()=>V.value===e.checkedValue),f=M(!1),z=M(!1),H=R(()=>{const{railStyle:i}=e;if(i)return i({focused:z.value,checked:N.value})});function Z(i){const{"onUpdate:value":D,onChange:U,onUpdateValue:j}=e,{nTriggerFormInput:le,nTriggerFormChange:ee}=c;D&&Q(D,i),j&&Q(j,i),U&&Q(U,i),E.value=i,le(),ee()}function ie(){const{nTriggerFormFocus:i}=c;i()}function C(){const{nTriggerFormBlur:i}=c;i()}function he(){e.loading||k.value||(V.value!==e.checkedValue?Z(e.checkedValue):Z(e.uncheckedValue))}function Se(){z.value=!0,ie()}function fe(){z.value=!1,C(),f.value=!1}function B(i){e.loading||k.value||i.key===" "&&(V.value!==e.checkedValue?Z(e.checkedValue):Z(e.uncheckedValue),f.value=!1)}function ve(i){e.loading||k.value||i.key===" "&&(i.preventDefault(),f.value=!0)}const A=R(()=>{const{value:i}=$,{self:{opacityDisabled:D,railColor:U,railColorActive:j,buttonBoxShadow:le,buttonColor:ee,boxShadowFocus:Re,loadingColor:ze,textColor:Ce,iconColor:be,[J("buttonHeight",i)]:F,[J("buttonWidth",i)]:se,[J("buttonWidthPressed",i)]:de,[J("railHeight",i)]:T,[J("railWidth",i)]:P,[J("railBorderRadius",i)]:Be,[J("buttonBorderRadius",i)]:$e},common:{cubicBezierEaseInOut:oe}}=l.value;let te,ce,W;return ue?(te=`calc((${T} - ${F}) / 2)`,ce=`max(${T}, ${F})`,W=`max(${P}, calc(${P} + ${F} - ${T}))`):(te=Te((K(T)-K(F))/2),ce=Te(Math.max(K(T),K(F))),W=K(T)>K(F)?P:Te(K(P)+K(F)-K(T))),{"--n-bezier":oe,"--n-button-border-radius":$e,"--n-button-box-shadow":le,"--n-button-color":ee,"--n-button-width":se,"--n-button-width-pressed":de,"--n-button-height":F,"--n-height":ce,"--n-offset":te,"--n-opacity-disabled":D,"--n-rail-border-radius":Be,"--n-rail-color":U,"--n-rail-color-active":j,"--n-rail-height":T,"--n-rail-width":P,"--n-width":W,"--n-box-shadow-focus":Re,"--n-loading-color":ze,"--n-text-color":Ce,"--n-icon-color":be}}),S=p?Ae("switch",R(()=>$.value[0]),A,e):void 0;return{handleClick:he,handleBlur:fe,handleFocus:Se,handleKeyup:B,handleKeydown:ve,mergedRailStyle:H,pressed:f,mergedClsPrefix:w,mergedValue:V,checked:N,mergedDisabled:k,cssVars:p?void 0:A,themeClass:S==null?void 0:S.themeClass,onRender:S==null?void 0:S.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:w,checked:p,mergedRailStyle:d,onRender:l,$slots:c}=this;l==null||l();const{checked:$,unchecked:k,icon:E,"checked-icon":L,"unchecked-icon":V}=c,N=!(Fe(E)&&Fe(L)&&Fe(V));return h(),m("div",{role:"switch","aria-checked":p,class:v([`${e}-switch`,this.themeClass,N&&`${e}-switch--icon`,p&&`${e}-switch--active`,w&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:Y(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[O("div",{class:v(`${e}-switch__rail`),"aria-hidden":"true",style:Y(d)},[g(()=>q($,f=>q(k,z=>f||z?(h(),m("div",{key:4,"aria-hidden":!0,class:v(`${e}-switch__children-placeholder`)},[O("div",{class:v(`${e}-switch__rail-placeholder`)},[O("div",{class:v(`${e}-switch__button-placeholder`)},null,2),g(()=>f)],2),O("div",{class:v(`${e}-switch__rail-placeholder`)},[O("div",{class:v(`${e}-switch__button-placeholder`)},null,2),g(()=>z)],2)],2)):null))),O("div",{class:v(`${e}-switch__button`)},[g(()=>q(E,f=>q(L,z=>q(V,H=>(h(),re(Do,null,{default:()=>this.loading?(h(),re(Vo,_o({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps),null,16,["clsPrefix"])):this.checked&&(z||f)?(h(),m("div",{class:v(`${e}-switch__button-icon`),key:z?"checked-icon":"icon"},[g(()=>z||f)],2)):!this.checked&&(H||f)?(h(),m("div",{class:v(`${e}-switch__button-icon`),key:H?"unchecked-icon":"icon"},[g(()=>H||f)],2)):null},1024)))))),g(()=>q($,f=>f&&(h(),m("div",{key:"checked",class:v(`${e}-switch__checked`)},[g(()=>f)],2)))),g(()=>q(k,f=>f&&(h(),m("div",{key:"unchecked",class:v(`${e}-switch__unchecked`)},[g(()=>f)],2))))],2)],6)],46,jo)}});export{Wo as S,Xo as a};
