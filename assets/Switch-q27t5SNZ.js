import{d as fe,o as i,b as h,l as x,e as V,f as s,n as v,I as Z,C as T,k as P,c6 as Ye,c7 as Ge,c8 as Je,c9 as Ze,ca as $t,aV as Qe,bN as he,x as L,v as o,y as k,A as ge,a$ as Me,g as We,H as ze,cb as St,aD as re,ax as et,cc as Ct,w as $,ay as Ee,aO as zt,aP as Rt,s as Bt,ba as tt,r as K,E as rt,G as Le,j as _t,bU as Pt,b2 as ne,W as Se,X as Ce,aA as Dt,T as Vt,R as Fe,P as ot,cd as Tt,c4 as Mt,ce as Ue,aN as He,aC as Ie,a_ as ae,bX as Ft,D as It,cf as Nt,aH as Ne,bI as te}from"./index-Do4sgBSb.js";import{d as Ae,e as At,V as Wt,B as jt}from"./use-message-7ePF1rkG.js";const Ot=["id"],Et=["stop-color"],Lt=["stop-color"],Ut=["viewBox"],Ht=["d","stroke-width"],qt=["d","stroke-width"],Xt={success:(i(),T(Ze)),error:(i(),T(Je)),warning:(i(),T(Ge)),info:(i(),T(Ye))};var Kt=fe({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:m}){const y=P(()=>{const n="gradient",{fillColor:c}=e;return typeof c=="object"?`${n}-${$t(JSON.stringify(c))}`:n});function f(n,c,u,S){const{gapDegree:B,viewBoxWidth:C,strokeWidth:_}=e,d=50,z=0,p=d,g=0,j=100,D=50+_/2,M=`M ${D},${D} m ${z},${p}
      a ${d},${d} 0 1 1 ${g},-100
      a ${d},${d} 0 1 1 0,${j}`,O=Math.PI*2*d;return{pathString:M,pathStyle:{stroke:S==="rail"?u:typeof e.fillColor=="object"?`url(#${y.value})`:u,strokeDasharray:`${Math.min(n,100)/100*(O-B)}px ${C*8}px`,strokeDashoffset:`-${B/2}px`,transformOrigin:c?"center":void 0,transform:c?`rotate(${c}deg)`:void 0}}}const l=()=>{const n=typeof e.fillColor=="object",c=n?e.fillColor.stops[0]:"",u=n?e.fillColor.stops[1]:"";return n&&(i(),h("defs",null,[x("linearGradient",{id:y.value,x1:"0%",y1:"100%",x2:"100%",y2:"0%"},[x("stop",{offset:"0%","stop-color":c},null,8,Et),x("stop",{offset:"100%","stop-color":u},null,8,Lt)],8,Ot)]))};return()=>{const{fillColor:n,railColor:c,strokeWidth:u,offsetDegree:S,status:B,percentage:C,showIndicator:_,indicatorTextColor:d,unit:z,gapOffsetDegree:p,clsPrefix:g}=e,{pathString:j,pathStyle:D}=f(100,0,c,"rail"),{pathString:M,pathStyle:O}=f(C,S,n,"fill"),U=100+u;return i(),h("div",{class:s(`${g}-progress-content`),role:"none"},[x("div",{class:s(`${g}-progress-graph`),"aria-hidden":!0},[x("div",{class:s(`${g}-progress-graph-circle`),style:V({transform:p?`rotate(${p}deg)`:void 0})},[(i(),h("svg",{viewBox:`0 0 ${U} ${U}`},[v(()=>l()),x("g",null,[x("path",{class:s(`${g}-progress-graph-circle-rail`),d:j,"stroke-width":u,"stroke-linecap":"round",fill:"none",style:V(D)},null,14,Ht)]),x("g",null,[x("path",{class:s([`${g}-progress-graph-circle-fill`,C===0&&`${g}-progress-graph-circle-fill--empty`]),d:M,"stroke-width":u,"stroke-linecap":"round",fill:"none",style:V(O)},null,14,qt)])],8,Ut))],6)],2),_?(i(),h("div",{key:0},[m.default?(i(),h("div",{key:0,class:s(`${g}-progress-custom-content`),role:"none"},[v(()=>m.default())],2)):(i(),h(Z,{key:1},[B!=="default"?(i(),h("div",{key:0,class:s(`${g}-progress-icon`),"aria-hidden":!0},[(i(),T(Qe,{clsPrefix:g},{default:()=>Xt[B]},1032,["clsPrefix"]))],2)):(i(),h("div",{key:1,class:s(`${g}-progress-text`),style:V({color:d}),role:"none"},[x("span",{class:s(`${g}-progress-text__percentage`)},[v(()=>C)],2),x("span",{class:s(`${g}-progress-text__unit`)},[v(()=>z)],2)],6))],64))])):v(()=>null)],2)}}});const Yt={success:(i(),T(Ze)),error:(i(),T(Je)),warning:(i(),T(Ge)),info:(i(),T(Ye))};var Gt=fe({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:m}){const y=P(()=>he(e.height)),f=P(()=>{var c,u;return typeof e.fillColor=="object"?`linear-gradient(to right, ${(c=e.fillColor)==null?void 0:c.stops[0]} , ${(u=e.fillColor)==null?void 0:u.stops[1]})`:e.fillColor}),l=P(()=>e.railBorderRadius!==void 0?he(e.railBorderRadius):e.height!==void 0?he(e.height,{c:.5}):""),n=P(()=>e.fillBorderRadius!==void 0?he(e.fillBorderRadius):e.railBorderRadius!==void 0?he(e.railBorderRadius):e.height!==void 0?he(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:c,railColor:u,railStyle:S,percentage:B,unit:C,indicatorTextColor:_,status:d,showIndicator:z,processing:p,clsPrefix:g}=e;return i(),h("div",{class:s(`${g}-progress-content`),role:"none"},[x("div",{class:s(`${g}-progress-graph`),"aria-hidden":!0},[x("div",{class:s([`${g}-progress-graph-line`,{[`${g}-progress-graph-line--indicator-${c}`]:!0}])},[x("div",{class:s(`${g}-progress-graph-line-rail`),style:V([{backgroundColor:u,height:y.value,borderRadius:l.value},S])},[x("div",{class:s([`${g}-progress-graph-line-fill`,p&&`${g}-progress-graph-line-fill--processing`]),style:V({maxWidth:`${e.percentage}%`,background:f.value,height:y.value,lineHeight:y.value,borderRadius:n.value})},[c==="inside"?(i(),h("div",{key:0,class:s(`${g}-progress-graph-line-indicator`),style:V({color:_})},[m.default?(i(),h(Z,{key:0},[v(()=>m.default())],64)):(i(),h(Z,{key:1},[v(()=>`${B}${C}`)],64))],6)):v(()=>null)],6)],6)],2)],2),z&&c==="outside"?(i(),h("div",{key:0},[m.default?(i(),h("div",{key:0,class:s(`${g}-progress-custom-content`),style:V({color:_}),role:"none"},[v(()=>m.default())],6)):(i(),h(Z,{key:1},[d==="default"?(i(),h("div",{key:0,role:"none",class:s(`${g}-progress-icon ${g}-progress-icon--as-text`),style:V({color:_})},[v(()=>B),v(()=>C)],6)):(i(),h("div",{key:1,class:s(`${g}-progress-icon`),"aria-hidden":!0},[(i(),T(Qe,{clsPrefix:g},{default:()=>Yt[d]},1032,["clsPrefix"]))],2))],64))])):v(()=>null)],2)}}});const Jt=["id"],Zt=["stop-color"],Qt=["stop-color"],er=["d","stroke-width"],tr=["d","stroke-width"],rr=["viewBox"];function qe(e,m,y=100){return`m ${y/2} ${y/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var or=fe({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:m}){const y=P(()=>e.percentage.map((l,n)=>`${Math.PI*l/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*n)-e.circleGap*n)*2}, ${e.viewBoxWidth*8}`)),f=(l,n)=>{const c=e.fillColor[n],u=typeof c=="object"?c.stops[0]:"",S=typeof c=="object"?c.stops[1]:"";return typeof e.fillColor[n]=="object"&&(i(),h("linearGradient",{id:`gradient-${n}`,x1:"100%",y1:"0%",x2:"0%",y2:"100%"},[x("stop",{offset:"0%","stop-color":u},null,8,Zt),x("stop",{offset:"100%","stop-color":S},null,8,Qt)],8,Jt))};return()=>{const{viewBoxWidth:l,strokeWidth:n,circleGap:c,showIndicator:u,fillColor:S,railColor:B,railStyle:C,percentage:_,clsPrefix:d}=e;return i(),h("div",{class:s(`${d}-progress-content`),role:"none"},[x("div",{class:s(`${d}-progress-graph`),"aria-hidden":!0},[x("div",{class:s(`${d}-progress-graph-circle`)},[(i(),h("svg",{viewBox:`0 0 ${l} ${l}`},[x("defs",null,[v(()=>_.map((z,p)=>f(z,p)))]),v(()=>_.map((z,p)=>(i(),h("g",{key:p},[x("path",{class:s(`${d}-progress-graph-circle-rail`),d:qe(l/2-n/2*(1+2*p)-c*p,n,l),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:V([{strokeDashoffset:0,stroke:B[p]},C[p]])},null,14,er),x("path",{class:s([`${d}-progress-graph-circle-fill`,z===0&&`${d}-progress-graph-circle-fill--empty`]),d:qe(l/2-n/2*(1+2*p)-c*p,n,l),"stroke-width":n,"stroke-linecap":"round",fill:"none",style:V({strokeDasharray:y.value[p],strokeDashoffset:0,stroke:typeof S[p]=="object"?`url(#gradient-${p})`:S[p]})},null,14,tr)]))))],8,rr))],2)],2),u&&m.default?(i(),h("div",{key:0},[x("div",{class:s(`${d}-progress-text`)},[v(()=>m.default())],2)])):v(()=>null)],2)}}}),ir=L([o("progress",{display:"inline-block"},[o("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),k("line",`
 width: 100%;
 display: block;
 `,[o("progress-content",`
 display: flex;
 align-items: center;
 `,[o("progress-graph",{flex:1})]),o("progress-custom-content",{marginLeft:"14px"}),o("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[k("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),k("circle, dashboard",{width:"120px"},[o("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),o("progress-text",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: inherit;
 font-size: var(--n-font-size-circle);
 color: var(--n-text-color-circle);
 font-weight: var(--n-font-weight-circle);
 transition: color .3s var(--n-bezier);
 white-space: nowrap;
 `),o("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),k("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[o("progress-text",`
 font-weight: var(--n-font-weight-circle);
 color: var(--n-text-color-circle);
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 transition: color .3s var(--n-bezier);
 `)]),o("progress-content",{position:"relative"}),o("progress-graph",{position:"relative"},[o("progress-graph-circle",[L("svg",{verticalAlign:"bottom"}),o("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[k("empty",{opacity:0})]),o("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),o("progress-graph-line",[k("indicator-inside",[o("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[o("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),o("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),k("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[o("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),o("progress-graph-line-indicator",`
 background: var(--n-fill-color);
 font-size: 12px;
 transform: translateZ(0);
 display: flex;
 vertical-align: middle;
 height: 16px;
 line-height: 16px;
 padding: 0 10px;
 border-radius: 10px;
 position: absolute;
 white-space: nowrap;
 color: var(--n-text-color-line-inner);
 transition:
 right .2s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `)]),o("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[o("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[k("processing",[L("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),L("@keyframes progress-processing-animation",`
 0% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 100%;
 opacity: 1;
 }
 66% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 100% {
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 0;
 }
 `)]);const ar=["aria-valuenow","role"],nr={...ge.props,processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number};var xr=fe({name:"Progress",props:nr,setup(e){const m=P(()=>e.indicatorPlacement||e.indicatorPosition),y=P(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:f,inlineThemeDisabled:l}=We(e),n=ge("Progress","-progress",ir,St,e,f),c=P(()=>{const{status:S}=e,{common:{cubicBezierEaseInOut:B},self:{fontSize:C,fontSizeCircle:_,railColor:d,railHeight:z,iconSizeCircle:p,iconSizeLine:g,textColorCircle:j,textColorLineInner:D,textColorLineOuter:M,lineBgProcessing:O,fontWeightCircle:U,[re("iconColor",S)]:F,[re("fillColor",S)]:Y}}=n.value;return{"--n-bezier":B,"--n-fill-color":Y,"--n-font-size":C,"--n-font-size-circle":_,"--n-font-weight-circle":U,"--n-icon-color":F,"--n-icon-size-circle":p,"--n-icon-size-line":g,"--n-line-bg-processing":O,"--n-rail-color":d,"--n-rail-height":z,"--n-text-color-circle":j,"--n-text-color-line-inner":D,"--n-text-color-line-outer":M}}),u=l?ze("progress",P(()=>e.status[0]),c,e):void 0;return{mergedClsPrefix:f,mergedIndicatorPlacement:m,gapDeg:y,cssVars:l?void 0:c,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender}},render(){const{type:e,cssVars:m,indicatorTextColor:y,showIndicator:f,status:l,railColor:n,railStyle:c,color:u,percentage:S,viewBoxWidth:B,strokeWidth:C,mergedIndicatorPlacement:_,unit:d,borderRadius:z,fillBorderRadius:p,height:g,processing:j,circleGap:D,mergedClsPrefix:M,gapDeg:O,gapOffsetDegree:U,themeClass:F,$slots:Y,onRender:A}=this;return A==null||A(),i(),h("div",{class:s([F,`${M}-progress`,`${M}-progress--${e}`,`${M}-progress--${l}`]),style:V(m),"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":S,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},[e==="circle"||e==="dashboard"?(i(),T(Kt,{key:0,clsPrefix:M,status:l,showIndicator:f,indicatorTextColor:y,railColor:n,fillColor:u,railStyle:c,offsetDegree:this.offsetDegree,percentage:S,viewBoxWidth:B,strokeWidth:C,gapDegree:O===void 0?e==="dashboard"?75:0:O,gapOffsetDegree:U,unit:d},Me(Y),1032,["clsPrefix","status","showIndicator","indicatorTextColor","railColor","fillColor","railStyle","offsetDegree","percentage","viewBoxWidth","strokeWidth","gapDegree","gapOffsetDegree","unit"])):(i(),h(Z,{key:1},[e==="line"?(i(),T(Gt,{key:0,clsPrefix:M,status:l,showIndicator:f,indicatorTextColor:y,railColor:n,fillColor:u,railStyle:c,percentage:S,processing:j,indicatorPlacement:_,unit:d,fillBorderRadius:p,railBorderRadius:z,height:g},Me(Y),1032,["clsPrefix","status","showIndicator","indicatorTextColor","railColor","fillColor","railStyle","percentage","processing","indicatorPlacement","unit","fillBorderRadius","railBorderRadius","height"])):(i(),h(Z,{key:1},[e==="multiple-circle"?(i(),T(or,{key:0,clsPrefix:M,strokeWidth:C,railColor:n,fillColor:u,railStyle:c,viewBoxWidth:B,percentage:S,showIndicator:f,circleGap:D},Me(Y),1032,["clsPrefix","strokeWidth","railColor","fillColor","railStyle","viewBoxWidth","percentage","showIndicator","circleGap"])):v(()=>null)],64))],64))],14,ar)}});function lr(e){const m="rgba(0, 0, 0, .85)",y="0 2px 8px 0 rgba(0, 0, 0, 0.12)",{railColor:f,primaryColor:l,baseColor:n,cardColor:c,modalColor:u,popoverColor:S,borderRadius:B,fontSize:C,opacityDisabled:_}=e;return{...Ct,fontSize:C,markFontSize:C,railColor:f,railColorHover:f,fillColor:l,fillColorHover:l,opacityDisabled:_,handleColor:"#FFF",dotColor:c,dotColorModal:u,dotColorPopover:S,handleBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowHover:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowActive:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",handleBoxShadowFocus:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",indicatorColor:m,indicatorBoxShadow:y,indicatorTextColor:n,indicatorBorderRadius:B,dotBorder:`2px solid ${f}`,dotBorderActive:`2px solid ${l}`,dotBoxShadow:""}}const sr={common:et,self:lr};var dr=L([o("slider",`
 display: block;
 padding: calc((var(--n-handle-size) - var(--n-rail-height)) / 2) 0;
 position: relative;
 z-index: 0;
 width: 100%;
 cursor: pointer;
 user-select: none;
 -webkit-user-select: none;
 `,[k("reverse",[o("slider-handles",[o("slider-handle-wrapper",`
 transform: translate(50%, -50%);
 `)]),o("slider-dots",[o("slider-dot",`
 transform: translateX(50%, -50%);
 `)]),k("vertical",[o("slider-handles",[o("slider-handle-wrapper",`
 transform: translate(-50%, -50%);
 `)]),o("slider-marks",[o("slider-mark",`
 transform: translateY(calc(-50% + var(--n-dot-height) / 2));
 `)]),o("slider-dots",[o("slider-dot",`
 transform: translateX(-50%) translateY(0);
 `)])])]),k("vertical",`
 box-sizing: content-box;
 padding: 0 calc((var(--n-handle-size) - var(--n-rail-height)) / 2);
 width: var(--n-rail-width-vertical);
 height: 100%;
 `,[o("slider-handles",`
 top: calc(var(--n-handle-size) / 2);
 right: 0;
 bottom: calc(var(--n-handle-size) / 2);
 left: 0;
 `,[o("slider-handle-wrapper",`
 top: unset;
 left: 50%;
 transform: translate(-50%, 50%);
 `)]),o("slider-rail",`
 height: 100%;
 `,[$("fill",`
 top: unset;
 right: 0;
 bottom: unset;
 left: 0;
 `)]),k("with-mark",`
 width: var(--n-rail-width-vertical);
 margin: 0 32px 0 8px;
 `),o("slider-marks",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 22px;
 font-size: var(--n-mark-font-size);
 `,[o("slider-mark",`
 transform: translateY(50%);
 white-space: nowrap;
 `)]),o("slider-dots",`
 top: calc(var(--n-handle-size) / 2);
 right: unset;
 bottom: calc(var(--n-handle-size) / 2);
 left: 50%;
 `,[o("slider-dot",`
 transform: translateX(-50%) translateY(50%);
 `)])]),k("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `,[o("slider-handle",`
 cursor: not-allowed;
 `)]),k("with-mark",`
 width: 100%;
 margin: 8px 0 32px 0;
 `),L("&:hover",[o("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[$("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),o("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),k("active",[o("slider-rail",{backgroundColor:"var(--n-rail-color-hover)"},[$("fill",{backgroundColor:"var(--n-fill-color-hover)"})]),o("slider-handle",{boxShadow:"var(--n-handle-box-shadow-hover)"})]),o("slider-marks",`
 position: absolute;
 top: 18px;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[o("slider-mark",`
 position: absolute;
 transform: translateX(-50%);
 white-space: nowrap;
 `)]),o("slider-rail",`
 width: 100%;
 position: relative;
 height: var(--n-rail-height);
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 border-radius: calc(var(--n-rail-height) / 2);
 `,[$("fill",`
 position: absolute;
 top: 0;
 bottom: 0;
 border-radius: calc(var(--n-rail-height) / 2);
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-fill-color);
 `)]),o("slider-handles",`
 position: absolute;
 top: 0;
 right: calc(var(--n-handle-size) / 2);
 bottom: 0;
 left: calc(var(--n-handle-size) / 2);
 `,[o("slider-handle-wrapper",`
 outline: none;
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 cursor: pointer;
 display: flex;
 `,[o("slider-handle",`
 height: var(--n-handle-size);
 width: var(--n-handle-size);
 border-radius: 50%;
 overflow: hidden;
 transition: box-shadow .2s var(--n-bezier), background-color .3s var(--n-bezier);
 background-color: var(--n-handle-color);
 box-shadow: var(--n-handle-box-shadow);
 `,[L("&:hover",`
 box-shadow: var(--n-handle-box-shadow-hover);
 `)]),L("&:focus",[o("slider-handle",`
 box-shadow: var(--n-handle-box-shadow-focus);
 `,[L("&:hover",`
 box-shadow: var(--n-handle-box-shadow-active);
 `)])])])]),o("slider-dots",`
 position: absolute;
 top: 50%;
 left: calc(var(--n-handle-size) / 2);
 right: calc(var(--n-handle-size) / 2);
 `,[k("transition-disabled",[o("slider-dot","transition: none;")]),o("slider-dot",`
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
 `,[k("active","border: var(--n-dot-border-active);")])])]),o("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[Ee()]),o("slider-handle-indicator",`
 font-size: var(--n-font-size);
 padding: 6px 10px;
 border-radius: var(--n-indicator-border-radius);
 color: var(--n-indicator-text-color);
 background-color: var(--n-indicator-color);
 box-shadow: var(--n-indicator-box-shadow);
 `,[k("top",`
 margin-bottom: 12px;
 `),k("right",`
 margin-left: 12px;
 `),k("bottom",`
 margin-top: 12px;
 `),k("left",`
 margin-right: 12px;
 `),Ee()]),zt(o("slider",[o("slider-dot","background-color: var(--n-dot-color-modal);")])),Rt(o("slider",[o("slider-dot","background-color: var(--n-dot-color-popover);")]))]);function Xe(e){return window.TouchEvent&&e instanceof window.TouchEvent}function Ke(){const e=new Map,m=y=>f=>{e.set(y,f)};return Bt(()=>{e.clear()}),[e,m]}const cr=["tabindex","aria-valuenow","aria-valuemin","aria-valuemax","aria-orientation","aria-disabled","onFocus","onBlur","onMouseenter","onMouseleave"],ur=["onKeydown","onMousedown","onTouchstart"],hr=0,fr={...ge.props,to:Ae.propTo,defaultValue:{type:[Number,Array],default:0},marks:Object,disabled:{type:Boolean,default:void 0},formatTooltip:Function,keyboard:{type:Boolean,default:!0},min:{type:Number,default:0},max:{type:Number,default:100},step:{type:[Number,String],default:1},range:Boolean,value:[Number,Array],placement:String,showTooltip:{type:Boolean,default:void 0},tooltip:{type:Boolean,default:!0},vertical:Boolean,reverse:Boolean,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onDragstart:[Function],onDragend:[Function]};var kr=fe({name:"Slider",props:fr,slots:Object,setup(e){const{mergedClsPrefixRef:m,namespaceRef:y,inlineThemeDisabled:f}=We(e),l=ge("Slider","-slider",dr,sr,e,m),n=K(null),[c,u]=Ke(),[S,B]=Ke(),C=K(new Set),_=tt(e),{mergedDisabledRef:d}=_,z=P(()=>{const{step:t}=e;if(Number(t)<=0||t==="mark")return 0;const r=t.toString();let a=0;return r.includes(".")&&(a=r.length-r.indexOf(".")-1),a}),p=K(e.defaultValue),g=ot(e,"value"),j=rt(g,p),D=P(()=>{const{value:t}=j;return(e.range?t:[t]).map(X)}),M=P(()=>D.value.length>2),O=P(()=>e.placement===void 0?e.vertical?"right":"top":e.placement),U=P(()=>{const{marks:t}=e;return t?Object.keys(t).map(Number.parseFloat):null}),F=K(-1),Y=K(-1),A=K(-1),W=K(!1),w=K(!1),H=P(()=>{const{vertical:t,reverse:r}=e;return t?r?"top":"bottom":r?"right":"left"}),Q=P(()=>{if(M.value)return;const t=D.value,r=G(e.range?Math.min(...t):e.min),a=G(e.range?Math.max(...t):t[0]),{value:b}=H;return e.vertical?{[b]:`${r}%`,height:`${a-r}%`}:{[b]:`${r}%`,width:`${a-r}%`}}),ee=P(()=>{const t=[],{marks:r}=e;if(r){const a=D.value.slice();a.sort((N,I)=>N-I);const{value:b}=H,{value:R}=M,{range:E}=e,J=R?()=>!1:N=>E?N>=a[0]&&N<=a[a.length-1]:N<=a[0];for(const N of Object.keys(r)){const I=Number(N);t.push({active:J(I),key:I,label:r[N],style:{[b]:`${G(I)}%`}})}}return t});function ve(t,r){const a=G(t),{value:b}=H;return{[b]:`${a}%`,zIndex:r===F.value?1:0}}function le(t){return e.showTooltip||A.value===t||F.value===t&&W.value}function Re(t){return W.value?!(F.value===t&&Y.value===t):!0}function Be(t){var r;~t&&(F.value=t,(r=c.get(t))==null||r.focus())}function _e(){S.forEach((t,r)=>{le(r)&&t.syncPosition()})}function we(t){const{"onUpdate:value":r,onUpdateValue:a}=e,{nTriggerFormInput:b,nTriggerFormChange:R}=_;a&&ne(a,t),r&&ne(r,t),p.value=t,b(),R()}function q(t){const{range:r}=e;if(r){if(Array.isArray(t)){const{value:a}=D;t.join()!==a.join()&&we(t)}}else Array.isArray(t)||D.value[0]!==t&&we(t)}function be(t,r){if(e.range){const a=D.value.slice();a.splice(r,1,t),q(a)}else q(t)}function pe(t,r,a){const b=a!==void 0;a||(a=t-r>0?1:-1);const R=U.value||[],{step:E}=e;if(E==="mark"){const I=se(t,R.concat(r),b?a:void 0);return I?I.value:r}if(E<=0)return r;const{value:J}=z;let N;if(b){const I=Number((r/E).toFixed(J)),ie=Math.floor(I),Ve=I>ie?ie:ie-1,Te=I<ie?ie:ie+1;N=se(r,[Number((Ve*E).toFixed(J)),Number((Te*E).toFixed(J)),...R],a)}else{const I=De(t);N=se(t,[...R,I])}return N?X(N.value):r}function X(t){return Math.min(e.max,Math.max(e.min,t))}function G(t){const{max:r,min:a}=e;return(t-a)/(r-a)*100}function Pe(t){const{max:r,min:a}=e;return a+(r-a)*t}function De(t){const{step:r,min:a}=e;if(Number(r)<=0||r==="mark")return t;const b=Math.round((t-a)/r)*r+a;return Number(b.toFixed(z.value))}function se(t,r=U.value,a){if(!(r!=null&&r.length))return null;let b=null,R=-1;for(;++R<r.length;){const E=r[R]-t,J=Math.abs(E);(a===void 0||E*a>0)&&(b===null||J<b.distance)&&(b={index:R,distance:J,value:r[R]})}return b}function de(t){const r=n.value;if(!r)return;const a=Xe(t)?t.touches[0]:t,b=r.getBoundingClientRect();let R;return e.vertical?R=(b.bottom-a.clientY)/b.height:R=(a.clientX-b.left)/b.width,e.reverse&&(R=1-R),Pe(R)}function me(t){if(d.value||!e.keyboard)return;const{vertical:r,reverse:a}=e;switch(t.key){case"ArrowUp":t.preventDefault(),oe(r&&a?-1:1);break;case"ArrowRight":t.preventDefault(),oe(!r&&a?-1:1);break;case"ArrowDown":t.preventDefault(),oe(r&&a?1:-1);break;case"ArrowLeft":t.preventDefault(),oe(!r&&a?1:-1)}}function oe(t){const r=F.value;if(r===-1)return;const{step:a}=e,b=D.value[r];be(pe(Number(a)<=0||a==="mark"?b:b+a*t,b,t>0?1:-1),r)}function it(t){var R;if(d.value||!Xe(t)&&t.button!==hr)return;const r=de(t);if(r===void 0)return;const a=D.value.slice(),b=e.range?((R=se(r,a))==null?void 0:R.index)??-1:0;b!==-1&&(t.preventDefault(),Be(b),at(),be(pe(r,D.value[b]),b))}function at(){W.value||(W.value=!0,e.onDragstart&&ne(e.onDragstart),Se("touchend",document,$e),Se("mouseup",document,$e),Se("touchmove",document,ke),Se("mousemove",document,ke))}function xe(){W.value&&(W.value=!1,e.onDragend&&ne(e.onDragend),Ce("touchend",document,$e),Ce("mouseup",document,$e),Ce("touchmove",document,ke),Ce("mousemove",document,ke))}function ke(t){const{value:r}=F;if(!W.value||r===-1){xe();return}const a=de(t);a!==void 0&&be(pe(a,D.value[r]),r)}function $e(){xe()}function nt(t){F.value=t,d.value||(A.value=t)}function lt(t){F.value===t&&(F.value=-1,xe()),A.value===t&&(A.value=-1)}function st(t){A.value=t}function dt(t){A.value===t&&(A.value=-1)}Le(F,(t,r)=>void Fe(()=>Y.value=r)),Le(j,()=>{if(e.marks){if(w.value)return;w.value=!0,Fe(()=>{w.value=!1})}Fe(_e)}),_t(()=>{xe()});const je=P(()=>{const{self:{markFontSize:t,railColor:r,railColorHover:a,fillColor:b,fillColorHover:R,handleColor:E,opacityDisabled:J,dotColor:N,dotColorModal:I,handleBoxShadow:ie,handleBoxShadowHover:Ve,handleBoxShadowActive:Te,handleBoxShadowFocus:ct,dotBorder:ut,dotBoxShadow:ht,railHeight:ft,railWidthVertical:gt,handleSize:vt,dotHeight:bt,dotWidth:pt,dotBorderRadius:mt,fontSize:yt,dotBorderActive:wt,dotColorPopover:xt},common:{cubicBezierEaseInOut:kt}}=l.value;return{"--n-bezier":kt,"--n-dot-border":ut,"--n-dot-border-active":wt,"--n-dot-border-radius":mt,"--n-dot-box-shadow":ht,"--n-dot-color":N,"--n-dot-color-modal":I,"--n-dot-color-popover":xt,"--n-dot-height":bt,"--n-dot-width":pt,"--n-fill-color":b,"--n-fill-color-hover":R,"--n-font-size":yt,"--n-handle-box-shadow":ie,"--n-handle-box-shadow-active":Te,"--n-handle-box-shadow-focus":ct,"--n-handle-box-shadow-hover":Ve,"--n-handle-color":E,"--n-handle-size":vt,"--n-opacity-disabled":J,"--n-rail-color":r,"--n-rail-color-hover":a,"--n-rail-height":ft,"--n-rail-width-vertical":gt,"--n-mark-font-size":t}}),ce=f?ze("slider",void 0,je,e):void 0,Oe=P(()=>{const{self:{fontSize:t,indicatorColor:r,indicatorBoxShadow:a,indicatorTextColor:b,indicatorBorderRadius:R}}=l.value;return{"--n-font-size":t,"--n-indicator-border-radius":R,"--n-indicator-box-shadow":a,"--n-indicator-color":r,"--n-indicator-text-color":b}}),ue=f?ze("slider-indicator",void 0,Oe,e):void 0;return{mergedClsPrefix:m,namespace:y,uncontrolledValue:p,mergedValue:j,mergedDisabled:d,mergedPlacement:O,isMounted:Pt(),adjustedTo:Ae(e),dotTransitionDisabled:w,markInfos:ee,isShowTooltip:le,shouldKeepTooltipTransition:Re,handleRailRef:n,setHandleRefs:u,setFollowerRefs:B,fillStyle:Q,getHandleStyle:ve,activeIndex:F,arrifiedValues:D,followerEnabledIndexSet:C,handleRailMouseDown:it,handleHandleFocus:nt,handleHandleBlur:lt,handleHandleMouseEnter:st,handleHandleMouseLeave:dt,handleRailKeyDown:me,indicatorCssVars:f?void 0:Oe,indicatorThemeClass:ue==null?void 0:ue.themeClass,indicatorOnRender:ue==null?void 0:ue.onRender,cssVars:f?void 0:je,themeClass:ce==null?void 0:ce.themeClass,onRender:ce==null?void 0:ce.onRender}},render(){var f;const{mergedClsPrefix:e,themeClass:m,formatTooltip:y}=this;return(f=this.onRender)==null||f.call(this),i(),h("div",{class:s([`${e}-slider`,m,{[`${e}-slider--disabled`]:this.mergedDisabled,[`${e}-slider--active`]:this.activeIndex!==-1,[`${e}-slider--with-mark`]:this.marks,[`${e}-slider--vertical`]:this.vertical,[`${e}-slider--reverse`]:this.reverse}]),style:V(this.cssVars),onKeydown:this.handleRailKeyDown,onMousedown:this.handleRailMouseDown,onTouchstart:this.handleRailMouseDown},[x("div",{class:s(`${e}-slider-rail`)},[x("div",{class:s(`${e}-slider-rail__fill`),style:V(this.fillStyle)},null,6),this.marks?(i(),h("div",{key:0,class:s([`${e}-slider-dots`,this.dotTransitionDisabled&&`${e}-slider-dots--transition-disabled`])},[v(()=>this.markInfos.map(l=>(i(),h("div",{key:l.key,class:s([`${e}-slider-dot`,{[`${e}-slider-dot--active`]:l.active}]),style:V(l.style)},null,6))))],2)):v(()=>null),x("div",{ref:"handleRailRef",class:s(`${e}-slider-handles`)},[v(()=>this.arrifiedValues.map((l,n)=>{const c=this.isShowTooltip(n);return i(),T(jt,null,{default:()=>[(i(),T(At,null,{default:()=>(i(),h("div",{ref:this.setHandleRefs(n),class:s(`${e}-slider-handle-wrapper`),tabindex:this.mergedDisabled?-1:0,role:"slider","aria-valuenow":l,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-orientation":this.vertical?"vertical":"horizontal","aria-disabled":this.disabled,style:V(this.getHandleStyle(l,n)),onFocus:()=>{this.handleHandleFocus(n)},onBlur:()=>{this.handleHandleBlur(n)},onMouseenter:()=>{this.handleHandleMouseEnter(n)},onMouseleave:()=>{this.handleHandleMouseLeave(n)}},[v(()=>Dt(this.$slots.thumb,()=>[(i(),h("div",{class:s(`${e}-slider-handle`)},null,2))]))],46,cr))},1024)),this.tooltip&&(i(),T(Wt,{ref:this.setFollowerRefs(n),show:c,to:this.adjustedTo,enabled:this.showTooltip&&!this.range||this.followerEnabledIndexSet.has(n),teleportDisabled:this.adjustedTo===Ae.tdkey,placement:this.mergedPlacement,containerClass:this.namespace},{default:()=>(i(),T(Vt,{name:"fade-in-scale-up-transition",appear:this.isMounted,css:this.shouldKeepTooltipTransition(n),onEnter:()=>{this.followerEnabledIndexSet.add(n)},onAfterLeave:()=>{this.followerEnabledIndexSet.delete(n)}},{default:()=>{var u;return c?((u=this.indicatorOnRender)==null||u.call(this),i(),h("div",{key:1,class:s([`${e}-slider-handle-indicator`,this.indicatorThemeClass,`${e}-slider-handle-indicator--${this.mergedPlacement}`]),style:V(this.indicatorCssVars)},[typeof y=="function"?(i(),h(Z,{key:0},[v(()=>y(l))],64)):(i(),h(Z,{key:1},[v(()=>l)],64))],6)):null}},1032,["appear","css","onEnter","onAfterLeave"]))},1032,["show","to","enabled","teleportDisabled","placement","containerClass"]))]},1024)}))],2),this.marks?(i(),h("div",{key:2,class:s(`${e}-slider-marks`)},[v(()=>this.markInfos.map(l=>(i(),h("div",{key:l.key,class:s(`${e}-slider-mark`),style:V(l.style)},[typeof l.label=="function"?(i(),h(Z,{key:0},[v(()=>l.label())],64)):(i(),h(Z,{key:1},[v(()=>l.label)],64))],6))))],2)):v(()=>null)],2)],46,ur)}});function gr(e){const{primaryColor:m,opacityDisabled:y,borderRadius:f,textColor3:l}=e;return{...Tt,iconColor:l,textColor:"white",loadingColor:m,opacityDisabled:y,railColor:"rgba(0, 0, 0, .14)",railColorActive:m,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:f,railBorderRadiusMedium:f,railBorderRadiusLarge:f,buttonBorderRadiusSmall:f,buttonBorderRadiusMedium:f,buttonBorderRadiusLarge:f,boxShadowFocus:`0 0 0 2px ${Mt(m,{alpha:.2})}`}}const vr={common:et,self:gr};var br=o("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[$("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),$("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),$("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),o("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[Ue({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),$("checked, unchecked",`
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
 `),$("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),$("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),L("&:focus",[$("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),k("round",[$("rail","border-radius: calc(var(--n-rail-height) / 2);",[$("button","border-radius: calc(var(--n-button-height) / 2);")])]),He("disabled",[He("icon",[k("rubber-band",[k("pressed",[$("rail",[$("button","max-width: var(--n-button-width-pressed);")])]),$("rail",[L("&:active",[$("button","max-width: var(--n-button-width-pressed);")])]),k("active",[k("pressed",[$("rail",[$("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),$("rail",[L("&:active",[$("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),k("active",[$("rail",[$("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),$("rail",`
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
 `,[$("button-icon",`
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
 `,[Ue()]),$("button",`
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
 `)]),k("active",[$("rail","background-color: var(--n-rail-color-active);")]),k("loading",[$("rail",`
 cursor: wait;
 `)]),k("disabled",[$("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]);const pr=["aria-checked","tabindex","onClick","onFocus","onBlur","onKeyup","onKeydown"],mr={...ge.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]};let ye;var $r=fe({name:"Switch",props:mr,slots:Object,setup(e){ye===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?ye=CSS.supports("width","max(1px)"):ye=!1:ye=!0);const{mergedClsPrefixRef:m,inlineThemeDisabled:y,mergedComponentPropsRef:f}=We(e),l=ge("Switch","-switch",br,vr,e,m),n=tt(e,{mergedSize(w){var Q,ee;if(e.size!==void 0)return e.size;if(w)return w.mergedSize.value;const H=(ee=(Q=f==null?void 0:f.value)==null?void 0:Q.Switch)==null?void 0:ee.size;return H||"medium"}}),{mergedSizeRef:c,mergedDisabledRef:u}=n,S=K(e.defaultValue),B=ot(e,"value"),C=rt(B,S),_=P(()=>C.value===e.checkedValue),d=K(!1),z=K(!1),p=P(()=>{const{railStyle:w}=e;if(w)return w({focused:z.value,checked:_.value})});function g(w){const{"onUpdate:value":H,onChange:Q,onUpdateValue:ee}=e,{nTriggerFormInput:ve,nTriggerFormChange:le}=n;H&&ne(H,w),ee&&ne(ee,w),Q&&ne(Q,w),S.value=w,ve(),le()}function j(){const{nTriggerFormFocus:w}=n;w()}function D(){const{nTriggerFormBlur:w}=n;w()}function M(){e.loading||u.value||(C.value!==e.checkedValue?g(e.checkedValue):g(e.uncheckedValue))}function O(){z.value=!0,j()}function U(){z.value=!1,D(),d.value=!1}function F(w){e.loading||u.value||w.key===" "&&(C.value!==e.checkedValue?g(e.checkedValue):g(e.uncheckedValue),d.value=!1)}function Y(w){e.loading||u.value||w.key===" "&&(w.preventDefault(),d.value=!0)}const A=P(()=>{const{value:w}=c,{self:{opacityDisabled:H,railColor:Q,railColorActive:ee,buttonBoxShadow:ve,buttonColor:le,boxShadowFocus:Re,loadingColor:Be,textColor:_e,iconColor:we,[re("buttonHeight",w)]:q,[re("buttonWidth",w)]:be,[re("buttonWidthPressed",w)]:pe,[re("railHeight",w)]:X,[re("railWidth",w)]:G,[re("railBorderRadius",w)]:Pe,[re("buttonBorderRadius",w)]:De},common:{cubicBezierEaseInOut:se}}=l.value;let de,me,oe;return ye?(de=`calc((${X} - ${q}) / 2)`,me=`max(${X}, ${q})`,oe=`max(${G}, calc(${G} + ${q} - ${X}))`):(de=Ne((te(X)-te(q))/2),me=Ne(Math.max(te(X),te(q))),oe=te(X)>te(q)?G:Ne(te(G)+te(q)-te(X))),{"--n-bezier":se,"--n-button-border-radius":De,"--n-button-box-shadow":ve,"--n-button-color":le,"--n-button-width":be,"--n-button-width-pressed":pe,"--n-button-height":q,"--n-height":me,"--n-offset":de,"--n-opacity-disabled":H,"--n-rail-border-radius":Pe,"--n-rail-color":Q,"--n-rail-color-active":ee,"--n-rail-height":X,"--n-rail-width":G,"--n-width":oe,"--n-box-shadow-focus":Re,"--n-loading-color":Be,"--n-text-color":_e,"--n-icon-color":we}}),W=y?ze("switch",P(()=>c.value[0]),A,e):void 0;return{handleClick:M,handleBlur:U,handleFocus:O,handleKeyup:F,handleKeydown:Y,mergedRailStyle:p,pressed:d,mergedClsPrefix:m,mergedValue:C,checked:_,mergedDisabled:u,cssVars:y?void 0:A,themeClass:W==null?void 0:W.themeClass,onRender:W==null?void 0:W.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:m,checked:y,mergedRailStyle:f,onRender:l,$slots:n}=this;l==null||l();const{checked:c,unchecked:u,icon:S,"checked-icon":B,"unchecked-icon":C}=n,_=!(Ie(S)&&Ie(B)&&Ie(C));return i(),h("div",{role:"switch","aria-checked":y,class:s([`${e}-switch`,this.themeClass,_&&`${e}-switch--icon`,y&&`${e}-switch--active`,m&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:V(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[x("div",{class:s(`${e}-switch__rail`),"aria-hidden":"true",style:V(f)},[v(()=>ae(c,d=>ae(u,z=>d||z?(i(),h("div",{key:4,"aria-hidden":!0,class:s(`${e}-switch__children-placeholder`)},[x("div",{class:s(`${e}-switch__rail-placeholder`)},[x("div",{class:s(`${e}-switch__button-placeholder`)},null,2),v(()=>d)],2),x("div",{class:s(`${e}-switch__rail-placeholder`)},[x("div",{class:s(`${e}-switch__button-placeholder`)},null,2),v(()=>z)],2)],2)):null))),x("div",{class:s(`${e}-switch__button`)},[v(()=>ae(S,d=>ae(B,z=>ae(C,p=>(i(),T(Nt,null,{default:()=>this.loading?(i(),T(Ft,It({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps),null,16,["clsPrefix"])):this.checked&&(z||d)?(i(),h("div",{class:s(`${e}-switch__button-icon`),key:z?"checked-icon":"icon"},[v(()=>z||d)],2)):!this.checked&&(p||d)?(i(),h("div",{class:s(`${e}-switch__button-icon`),key:p?"unchecked-icon":"icon"},[v(()=>p||d)],2)):null},1024)))))),v(()=>ae(c,d=>d&&(i(),h("div",{key:"checked",class:s(`${e}-switch__checked`)},[v(()=>d)],2)))),v(()=>ae(u,d=>d&&(i(),h("div",{key:"unchecked",class:s(`${e}-switch__unchecked`)},[v(()=>d)],2))))],2)],6)],46,pr)}});export{xr as P,kr as S,$r as a};
