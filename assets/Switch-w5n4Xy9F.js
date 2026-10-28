import{au as ve,bc as ge,bd as we,v as H,w as a,be as X,x as j,y as s,aL as q,d as me,A as Q,az as E,o as b,b as C,l as _,n as l,f as n,e as G,g as pe,b9 as ye,r as L,E as xe,H as ke,k as K,b0 as O,aY as k,C as J,bf as Se,D as Be,bg as Ce,aA as S,aF as I,bh as c,P as _e}from"./index-hDbVDEGx.js";function ze(e){const{primaryColor:d,opacityDisabled:f,borderRadius:i,textColor3:v}=e;return{...ge,iconColor:v,textColor:"white",loadingColor:d,opacityDisabled:f,railColor:"rgba(0, 0, 0, .14)",railColorActive:d,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${we(d,{alpha:.2})}`}}const $e={common:ve,self:ze};var Re=H("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[a("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),a("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),a("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),H("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[X({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),a("checked, unchecked",`
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
 `),a("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),a("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),j("&:focus",[a("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),s("round",[a("rail","border-radius: calc(var(--n-rail-height) / 2);",[a("button","border-radius: calc(var(--n-button-height) / 2);")])]),q("disabled",[q("icon",[s("rubber-band",[s("pressed",[a("rail",[a("button","max-width: var(--n-button-width-pressed);")])]),a("rail",[j("&:active",[a("button","max-width: var(--n-button-width-pressed);")])]),s("active",[s("pressed",[a("rail",[a("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),a("rail",[j("&:active",[a("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),s("active",[a("rail",[a("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),a("rail",`
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
 `,[a("button-icon",`
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
 `,[X()]),a("button",`
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
 `)]),s("active",[a("rail","background-color: var(--n-rail-color-active);")]),s("loading",[a("rail",`
 cursor: wait;
 `)]),s("disabled",[a("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]);const Ve=["aria-checked","tabindex","onClick","onFocus","onBlur","onKeyup","onKeydown"],Fe={...Q.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]};let F;var Te=me({name:"Switch",props:Fe,slots:Object,setup(e){F===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?F=CSS.supports("width","max(1px)"):F=!1:F=!0);const{mergedClsPrefixRef:d,inlineThemeDisabled:f,mergedComponentPropsRef:i}=pe(e),v=Q("Switch","-switch",Re,$e,e,d),g=ye(e,{mergedSize(t){var y,x;if(e.size!==void 0)return e.size;if(t)return t.mergedSize.value;const p=(x=(y=i==null?void 0:i.value)==null?void 0:y.Switch)==null?void 0:x.size;return p||"medium"}}),{mergedSizeRef:z,mergedDisabledRef:w}=g,$=L(e.defaultValue),P=_e(e,"value"),m=xe(P,$),T=K(()=>m.value===e.checkedValue),o=L(!1),r=L(!1),R=K(()=>{const{railStyle:t}=e;if(t)return t({focused:r.value,checked:T.value})});function D(t){const{"onUpdate:value":p,onChange:y,onUpdateValue:x}=e,{nTriggerFormInput:W,nTriggerFormChange:A}=g;p&&O(p,t),x&&O(x,t),y&&O(y,t),$.value=t,W(),A()}function Z(){const{nTriggerFormFocus:t}=g;t()}function ee(){const{nTriggerFormBlur:t}=g;t()}function te(){e.loading||w.value||(m.value!==e.checkedValue?D(e.checkedValue):D(e.uncheckedValue))}function ae(){r.value=!0,Z()}function oe(){r.value=!1,ee(),o.value=!1}function ie(t){e.loading||w.value||t.key===" "&&(m.value!==e.checkedValue?D(e.checkedValue):D(e.uncheckedValue),o.value=!1)}function ne(t){e.loading||w.value||t.key===" "&&(t.preventDefault(),o.value=!0)}const Y=K(()=>{const{value:t}=z,{self:{opacityDisabled:p,railColor:y,railColorActive:x,buttonBoxShadow:W,buttonColor:A,boxShadowFocus:re,loadingColor:le,textColor:se,iconColor:ce,[S("buttonHeight",t)]:u,[S("buttonWidth",t)]:de,[S("buttonWidthPressed",t)]:ue,[S("railHeight",t)]:h,[S("railWidth",t)]:V,[S("railBorderRadius",t)]:he,[S("buttonBorderRadius",t)]:be},common:{cubicBezierEaseInOut:fe}}=v.value;let M,N,U;return F?(M=`calc((${h} - ${u}) / 2)`,N=`max(${h}, ${u})`,U=`max(${V}, calc(${V} + ${u} - ${h}))`):(M=I((c(h)-c(u))/2),N=I(Math.max(c(h),c(u))),U=c(h)>c(u)?V:I(c(V)+c(u)-c(h))),{"--n-bezier":fe,"--n-button-border-radius":be,"--n-button-box-shadow":W,"--n-button-color":A,"--n-button-width":de,"--n-button-width-pressed":ue,"--n-button-height":u,"--n-height":N,"--n-offset":M,"--n-opacity-disabled":p,"--n-rail-border-radius":he,"--n-rail-color":y,"--n-rail-color-active":x,"--n-rail-height":h,"--n-rail-width":V,"--n-width":U,"--n-box-shadow-focus":re,"--n-loading-color":le,"--n-text-color":se,"--n-icon-color":ce}}),B=f?ke("switch",K(()=>z.value[0]),Y,e):void 0;return{handleClick:te,handleBlur:oe,handleFocus:ae,handleKeyup:ie,handleKeydown:ne,mergedRailStyle:R,pressed:o,mergedClsPrefix:d,mergedValue:m,checked:T,mergedDisabled:w,cssVars:f?void 0:Y,themeClass:B==null?void 0:B.themeClass,onRender:B==null?void 0:B.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:d,checked:f,mergedRailStyle:i,onRender:v,$slots:g}=this;v==null||v();const{checked:z,unchecked:w,icon:$,"checked-icon":P,"unchecked-icon":m}=g,T=!(E($)&&E(P)&&E(m));return b(),C("div",{role:"switch","aria-checked":f,class:n([`${e}-switch`,this.themeClass,T&&`${e}-switch--icon`,f&&`${e}-switch--active`,d&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:G(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[_("div",{class:n(`${e}-switch__rail`),"aria-hidden":"true",style:G(i)},[l(()=>k(z,o=>k(w,r=>o||r?(b(),C("div",{key:4,"aria-hidden":!0,class:n(`${e}-switch__children-placeholder`)},[_("div",{class:n(`${e}-switch__rail-placeholder`)},[_("div",{class:n(`${e}-switch__button-placeholder`)},null,2),l(()=>o)],2),_("div",{class:n(`${e}-switch__rail-placeholder`)},[_("div",{class:n(`${e}-switch__button-placeholder`)},null,2),l(()=>r)],2)],2)):null))),_("div",{class:n(`${e}-switch__button`)},[l(()=>k($,o=>k(P,r=>k(m,R=>(b(),J(Ce,null,{default:()=>this.loading?(b(),J(Se,Be({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps),null,16,["clsPrefix"])):this.checked&&(r||o)?(b(),C("div",{class:n(`${e}-switch__button-icon`),key:r?"checked-icon":"icon"},[l(()=>r||o)],2)):!this.checked&&(R||o)?(b(),C("div",{class:n(`${e}-switch__button-icon`),key:R?"unchecked-icon":"icon"},[l(()=>R||o)],2)):null},1024)))))),l(()=>k(z,o=>o&&(b(),C("div",{key:"checked",class:n(`${e}-switch__checked`)},[l(()=>o)],2)))),l(()=>k(w,o=>o&&(b(),C("div",{key:"unchecked",class:n(`${e}-switch__unchecked`)},[l(()=>o)],2))))],2)],6)],46,Ve)}});export{Te as S};
