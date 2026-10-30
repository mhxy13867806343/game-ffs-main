import{d as H,o as r,b as s,l as d,e as B,f as a,n as g,I as X,C,k as z,bj as ue,bk as he,bl as ge,bm as fe,bn as Be,a$ as pe,bo as K,x as M,v as b,y as S,A as J,b4 as ie,g as be,H as ve,bp as ze,an as W,aF as Pe,bq as Re,br as De,w as p,bs as se,aT as ce,aK as oe,bf as Ne,r as ae,E as We,b7 as ne,b3 as A,ak as Ve,D as Ie,bt as Fe,am as le,bu as N,P as je}from"./index-Dc3MG_CK.js";const Te=["id"],Oe=["stop-color"],qe=["stop-color"],Ae=["viewBox"],Me=["d","stroke-width"],Le=["d","stroke-width"],Ge={success:(r(),C(fe)),error:(r(),C(ge)),warning:(r(),C(he)),info:(r(),C(ue))};var Ke=H({name:"ProgressCircle",props:{clsPrefix:{type:String,required:!0},status:{type:String,required:!0},strokeWidth:{type:Number,required:!0},fillColor:[String,Object],railColor:String,railStyle:[String,Object],percentage:{type:Number,default:0},offsetDegree:{type:Number,default:0},showIndicator:{type:Boolean,required:!0},indicatorTextColor:String,unit:String,viewBoxWidth:{type:Number,required:!0},gapDegree:{type:Number,required:!0},gapOffsetDegree:{type:Number,default:0}},setup(e,{slots:v}){const y=z(()=>{const i="gradient",{fillColor:o}=e;return typeof o=="object"?`${i}-${Be(JSON.stringify(o))}`:i});function f(i,o,l,m){const{gapDegree:k,viewBoxWidth:w,strokeWidth:$}=e,t=50,x=0,c=t,n=0,D=100,P=50+$/2,_=`M ${P},${P} m ${x},${c}
      a ${t},${t} 0 1 1 ${n},-100
      a ${t},${t} 0 1 1 0,${D}`,R=Math.PI*2*t;return{pathString:_,pathStyle:{stroke:m==="rail"?l:typeof e.fillColor=="object"?`url(#${y.value})`:l,strokeDasharray:`${Math.min(i,100)/100*(R-k)}px ${w*8}px`,strokeDashoffset:`-${k/2}px`,transformOrigin:o?"center":void 0,transform:o?`rotate(${o}deg)`:void 0}}}const u=()=>{const i=typeof e.fillColor=="object",o=i?e.fillColor.stops[0]:"",l=i?e.fillColor.stops[1]:"";return i&&(r(),s("defs",null,[d("linearGradient",{id:y.value,x1:"0%",y1:"100%",x2:"100%",y2:"0%"},[d("stop",{offset:"0%","stop-color":o},null,8,Oe),d("stop",{offset:"100%","stop-color":l},null,8,qe)],8,Te)]))};return()=>{const{fillColor:i,railColor:o,strokeWidth:l,offsetDegree:m,status:k,percentage:w,showIndicator:$,indicatorTextColor:t,unit:x,gapOffsetDegree:c,clsPrefix:n}=e,{pathString:D,pathStyle:P}=f(100,0,o,"rail"),{pathString:_,pathStyle:R}=f(w,m,i,"fill"),V=100+l;return r(),s("div",{class:a(`${n}-progress-content`),role:"none"},[d("div",{class:a(`${n}-progress-graph`),"aria-hidden":!0},[d("div",{class:a(`${n}-progress-graph-circle`),style:B({transform:c?`rotate(${c}deg)`:void 0})},[(r(),s("svg",{viewBox:`0 0 ${V} ${V}`},[g(()=>u()),d("g",null,[d("path",{class:a(`${n}-progress-graph-circle-rail`),d:D,"stroke-width":l,"stroke-linecap":"round",fill:"none",style:B(P)},null,14,Me)]),d("g",null,[d("path",{class:a([`${n}-progress-graph-circle-fill`,w===0&&`${n}-progress-graph-circle-fill--empty`]),d:_,"stroke-width":l,"stroke-linecap":"round",fill:"none",style:B(R)},null,14,Le)])],8,Ae))],6)],2),$?(r(),s("div",{key:0},[v.default?(r(),s("div",{key:0,class:a(`${n}-progress-custom-content`),role:"none"},[g(()=>v.default())],2)):(r(),s(X,{key:1},[k!=="default"?(r(),s("div",{key:0,class:a(`${n}-progress-icon`),"aria-hidden":!0},[(r(),C(pe,{clsPrefix:n},{default:()=>Ge[k]},1032,["clsPrefix"]))],2)):(r(),s("div",{key:1,class:a(`${n}-progress-text`),style:B({color:t}),role:"none"},[d("span",{class:a(`${n}-progress-text__percentage`)},[g(()=>w)],2),d("span",{class:a(`${n}-progress-text__unit`)},[g(()=>x)],2)],6))],64))])):g(()=>null)],2)}}});const Xe={success:(r(),C(fe)),error:(r(),C(ge)),warning:(r(),C(he)),info:(r(),C(ue))};var Ye=H({name:"ProgressLine",props:{clsPrefix:{type:String,required:!0},percentage:{type:Number,default:0},railColor:String,railStyle:[String,Object],fillColor:[String,Object],status:{type:String,required:!0},indicatorPlacement:{type:String,required:!0},indicatorTextColor:String,unit:{type:String,default:"%"},processing:{type:Boolean,required:!0},showIndicator:{type:Boolean,required:!0},height:[String,Number],railBorderRadius:[String,Number],fillBorderRadius:[String,Number]},setup(e,{slots:v}){const y=z(()=>K(e.height)),f=z(()=>{var o,l;return typeof e.fillColor=="object"?`linear-gradient(to right, ${(o=e.fillColor)==null?void 0:o.stops[0]} , ${(l=e.fillColor)==null?void 0:l.stops[1]})`:e.fillColor}),u=z(()=>e.railBorderRadius!==void 0?K(e.railBorderRadius):e.height!==void 0?K(e.height,{c:.5}):""),i=z(()=>e.fillBorderRadius!==void 0?K(e.fillBorderRadius):e.railBorderRadius!==void 0?K(e.railBorderRadius):e.height!==void 0?K(e.height,{c:.5}):"");return()=>{const{indicatorPlacement:o,railColor:l,railStyle:m,percentage:k,unit:w,indicatorTextColor:$,status:t,showIndicator:x,processing:c,clsPrefix:n}=e;return r(),s("div",{class:a(`${n}-progress-content`),role:"none"},[d("div",{class:a(`${n}-progress-graph`),"aria-hidden":!0},[d("div",{class:a([`${n}-progress-graph-line`,{[`${n}-progress-graph-line--indicator-${o}`]:!0}])},[d("div",{class:a(`${n}-progress-graph-line-rail`),style:B([{backgroundColor:l,height:y.value,borderRadius:u.value},m])},[d("div",{class:a([`${n}-progress-graph-line-fill`,c&&`${n}-progress-graph-line-fill--processing`]),style:B({maxWidth:`${e.percentage}%`,background:f.value,height:y.value,lineHeight:y.value,borderRadius:i.value})},[o==="inside"?(r(),s("div",{key:0,class:a(`${n}-progress-graph-line-indicator`),style:B({color:$})},[v.default?(r(),s(X,{key:0},[g(()=>v.default())],64)):(r(),s(X,{key:1},[g(()=>`${k}${w}`)],64))],6)):g(()=>null)],6)],6)],2)],2),x&&o==="outside"?(r(),s("div",{key:0},[v.default?(r(),s("div",{key:0,class:a(`${n}-progress-custom-content`),style:B({color:$}),role:"none"},[g(()=>v.default())],6)):(r(),s(X,{key:1},[t==="default"?(r(),s("div",{key:0,role:"none",class:a(`${n}-progress-icon ${n}-progress-icon--as-text`),style:B({color:$})},[g(()=>k),g(()=>w)],6)):(r(),s("div",{key:1,class:a(`${n}-progress-icon`),"aria-hidden":!0},[(r(),C(pe,{clsPrefix:n},{default:()=>Xe[t]},1032,["clsPrefix"]))],2))],64))])):g(()=>null)],2)}}});const Ee=["id"],Ue=["stop-color"],He=["stop-color"],Je=["d","stroke-width"],Ze=["d","stroke-width"],Qe=["viewBox"];function de(e,v,y=100){return`m ${y/2} ${y/2-e} a ${e} ${e} 0 1 1 0 ${2*e} a ${e} ${e} 0 1 1 0 -${2*e}`}var er=H({name:"ProgressMultipleCircle",props:{clsPrefix:{type:String,required:!0},viewBoxWidth:{type:Number,required:!0},percentage:{type:Array,default:[0]},strokeWidth:{type:Number,required:!0},circleGap:{type:Number,required:!0},showIndicator:{type:Boolean,required:!0},fillColor:{type:Array,default:()=>[]},railColor:{type:Array,default:()=>[]},railStyle:{type:Array,default:()=>[]}},setup(e,{slots:v}){const y=z(()=>e.percentage.map((u,i)=>`${Math.PI*u/100*(e.viewBoxWidth/2-e.strokeWidth/2*(1+2*i)-e.circleGap*i)*2}, ${e.viewBoxWidth*8}`)),f=(u,i)=>{const o=e.fillColor[i],l=typeof o=="object"?o.stops[0]:"",m=typeof o=="object"?o.stops[1]:"";return typeof e.fillColor[i]=="object"&&(r(),s("linearGradient",{id:`gradient-${i}`,x1:"100%",y1:"0%",x2:"0%",y2:"100%"},[d("stop",{offset:"0%","stop-color":l},null,8,Ue),d("stop",{offset:"100%","stop-color":m},null,8,He)],8,Ee))};return()=>{const{viewBoxWidth:u,strokeWidth:i,circleGap:o,showIndicator:l,fillColor:m,railColor:k,railStyle:w,percentage:$,clsPrefix:t}=e;return r(),s("div",{class:a(`${t}-progress-content`),role:"none"},[d("div",{class:a(`${t}-progress-graph`),"aria-hidden":!0},[d("div",{class:a(`${t}-progress-graph-circle`)},[(r(),s("svg",{viewBox:`0 0 ${u} ${u}`},[d("defs",null,[g(()=>$.map((x,c)=>f(x,c)))]),g(()=>$.map((x,c)=>(r(),s("g",{key:c},[d("path",{class:a(`${t}-progress-graph-circle-rail`),d:de(u/2-i/2*(1+2*c)-o*c,i,u),"stroke-width":i,"stroke-linecap":"round",fill:"none",style:B([{strokeDashoffset:0,stroke:k[c]},w[c]])},null,14,Je),d("path",{class:a([`${t}-progress-graph-circle-fill`,x===0&&`${t}-progress-graph-circle-fill--empty`]),d:de(u/2-i/2*(1+2*c)-o*c,i,u),"stroke-width":i,"stroke-linecap":"round",fill:"none",style:B({strokeDasharray:y.value[c],strokeDashoffset:0,stroke:typeof m[c]=="object"?`url(#gradient-${c})`:m[c]})},null,14,Ze)]))))],8,Qe))],2)],2),l&&v.default?(r(),s("div",{key:0},[d("div",{class:a(`${t}-progress-text`)},[g(()=>v.default())],2)])):g(()=>null)],2)}}}),rr=M([b("progress",{display:"inline-block"},[b("progress-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 `),S("line",`
 width: 100%;
 display: block;
 `,[b("progress-content",`
 display: flex;
 align-items: center;
 `,[b("progress-graph",{flex:1})]),b("progress-custom-content",{marginLeft:"14px"}),b("progress-icon",`
 width: 30px;
 padding-left: 14px;
 height: var(--n-icon-size-line);
 line-height: var(--n-icon-size-line);
 font-size: var(--n-icon-size-line);
 `,[S("as-text",`
 color: var(--n-text-color-line-outer);
 text-align: center;
 width: 40px;
 font-size: var(--n-font-size);
 padding-left: 4px;
 transition: color .3s var(--n-bezier);
 `)])]),S("circle, dashboard",{width:"120px"},[b("progress-custom-content",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 justify-content: center;
 `),b("progress-text",`
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
 `),b("progress-icon",`
 position: absolute;
 left: 50%;
 top: 50%;
 transform: translateX(-50%) translateY(-50%);
 display: flex;
 align-items: center;
 color: var(--n-icon-color);
 font-size: var(--n-icon-size-circle);
 `)]),S("multiple-circle",`
 width: 200px;
 color: inherit;
 `,[b("progress-text",`
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
 `)]),b("progress-content",{position:"relative"}),b("progress-graph",{position:"relative"},[b("progress-graph-circle",[M("svg",{verticalAlign:"bottom"}),b("progress-graph-circle-fill",`
 stroke: var(--n-fill-color);
 transition:
 opacity .3s var(--n-bezier),
 stroke .3s var(--n-bezier),
 stroke-dasharray .3s var(--n-bezier);
 `,[S("empty",{opacity:0})]),b("progress-graph-circle-rail",`
 transition: stroke .3s var(--n-bezier);
 overflow: hidden;
 stroke: var(--n-rail-color);
 `)]),b("progress-graph-line",[S("indicator-inside",[b("progress-graph-line-rail",`
 height: 16px;
 line-height: 16px;
 border-radius: 10px;
 `,[b("progress-graph-line-fill",`
 height: inherit;
 border-radius: 10px;
 `),b("progress-graph-line-indicator",`
 background: #0000;
 white-space: nowrap;
 text-align: right;
 margin-left: 14px;
 margin-right: 14px;
 height: inherit;
 font-size: 12px;
 color: var(--n-text-color-line-inner);
 transition: color .3s var(--n-bezier);
 `)])]),S("indicator-inside-label",`
 height: 16px;
 display: flex;
 align-items: center;
 `,[b("progress-graph-line-rail",`
 flex: 1;
 transition: background-color .3s var(--n-bezier);
 `),b("progress-graph-line-indicator",`
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
 `)]),b("progress-graph-line-rail",`
 position: relative;
 overflow: hidden;
 height: var(--n-rail-height);
 border-radius: 5px;
 background-color: var(--n-rail-color);
 transition: background-color .3s var(--n-bezier);
 `,[b("progress-graph-line-fill",`
 background: var(--n-fill-color);
 position: relative;
 border-radius: 5px;
 height: inherit;
 width: 100%;
 max-width: 0%;
 transition:
 background-color .3s var(--n-bezier),
 max-width .2s var(--n-bezier);
 `,[S("processing",[M("&::after",`
 content: "";
 background-image: var(--n-line-bg-processing);
 animation: progress-processing-animation 2s var(--n-bezier) infinite;
 `)])])])])])]),M("@keyframes progress-processing-animation",`
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
 `)]);const tr=["aria-valuenow","role"],ir={...J.props,processing:Boolean,type:{type:String,default:"line"},gapDegree:Number,gapOffsetDegree:Number,status:{type:String,default:"default"},railColor:[String,Array],railStyle:[String,Array],color:[String,Array,Object],viewBoxWidth:{type:Number,default:100},strokeWidth:{type:Number,default:7},percentage:[Number,Array],unit:{type:String,default:"%"},showIndicator:{type:Boolean,default:!0},indicatorPosition:{type:String,default:"outside"},indicatorPlacement:{type:String,default:"outside"},indicatorTextColor:String,circleGap:{type:Number,default:1},height:Number,borderRadius:[String,Number],fillBorderRadius:[String,Number],offsetDegree:Number};var dr=H({name:"Progress",props:ir,setup(e){const v=z(()=>e.indicatorPlacement||e.indicatorPosition),y=z(()=>{if(e.gapDegree||e.gapDegree===0)return e.gapDegree;if(e.type==="dashboard")return 75}),{mergedClsPrefixRef:f,inlineThemeDisabled:u}=be(e),i=J("Progress","-progress",rr,ze,e,f),o=z(()=>{const{status:m}=e,{common:{cubicBezierEaseInOut:k},self:{fontSize:w,fontSizeCircle:$,railColor:t,railHeight:x,iconSizeCircle:c,iconSizeLine:n,textColorCircle:D,textColorLineInner:P,textColorLineOuter:_,lineBgProcessing:R,fontWeightCircle:V,[W("iconColor",m)]:Y,[W("fillColor",m)]:j}}=i.value;return{"--n-bezier":k,"--n-fill-color":j,"--n-font-size":w,"--n-font-size-circle":$,"--n-font-weight-circle":V,"--n-icon-color":Y,"--n-icon-size-circle":c,"--n-icon-size-line":n,"--n-line-bg-processing":R,"--n-rail-color":t,"--n-rail-height":x,"--n-text-color-circle":D,"--n-text-color-line-inner":P,"--n-text-color-line-outer":_}}),l=u?ve("progress",z(()=>e.status[0]),o,e):void 0;return{mergedClsPrefix:f,mergedIndicatorPlacement:v,gapDeg:y,cssVars:u?void 0:o,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{type:e,cssVars:v,indicatorTextColor:y,showIndicator:f,status:u,railColor:i,railStyle:o,color:l,percentage:m,viewBoxWidth:k,strokeWidth:w,mergedIndicatorPlacement:$,unit:t,borderRadius:x,fillBorderRadius:c,height:n,processing:D,circleGap:P,mergedClsPrefix:_,gapDeg:R,gapOffsetDegree:V,themeClass:Y,$slots:j,onRender:L}=this;return L==null||L(),r(),s("div",{class:a([Y,`${_}-progress`,`${_}-progress--${e}`,`${_}-progress--${u}`]),style:B(v),"aria-valuemax":100,"aria-valuemin":0,"aria-valuenow":m,role:e==="circle"||e==="line"||e==="dashboard"?"progressbar":"none"},[e==="circle"||e==="dashboard"?(r(),C(Ke,{key:0,clsPrefix:_,status:u,showIndicator:f,indicatorTextColor:y,railColor:i,fillColor:l,railStyle:o,offsetDegree:this.offsetDegree,percentage:m,viewBoxWidth:k,strokeWidth:w,gapDegree:R===void 0?e==="dashboard"?75:0:R,gapOffsetDegree:V,unit:t},ie(j),1032,["clsPrefix","status","showIndicator","indicatorTextColor","railColor","fillColor","railStyle","offsetDegree","percentage","viewBoxWidth","strokeWidth","gapDegree","gapOffsetDegree","unit"])):(r(),s(X,{key:1},[e==="line"?(r(),C(Ye,{key:0,clsPrefix:_,status:u,showIndicator:f,indicatorTextColor:y,railColor:i,fillColor:l,railStyle:o,percentage:m,processing:D,indicatorPlacement:$,unit:t,fillBorderRadius:c,railBorderRadius:x,height:n},ie(j),1032,["clsPrefix","status","showIndicator","indicatorTextColor","railColor","fillColor","railStyle","percentage","processing","indicatorPlacement","unit","fillBorderRadius","railBorderRadius","height"])):(r(),s(X,{key:1},[e==="multiple-circle"?(r(),C(er,{key:0,clsPrefix:_,strokeWidth:w,railColor:i,fillColor:l,railStyle:o,viewBoxWidth:k,percentage:m,showIndicator:f,circleGap:P},ie(j),1032,["clsPrefix","strokeWidth","railColor","fillColor","railStyle","viewBoxWidth","percentage","showIndicator","circleGap"])):g(()=>null)],64))],64))],14,tr)}});function or(e){const{primaryColor:v,opacityDisabled:y,borderRadius:f,textColor3:u}=e;return{...Re,iconColor:u,textColor:"white",loadingColor:v,opacityDisabled:y,railColor:"rgba(0, 0, 0, .14)",railColorActive:v,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:f,railBorderRadiusMedium:f,railBorderRadiusLarge:f,buttonBorderRadiusSmall:f,buttonBorderRadiusMedium:f,buttonBorderRadiusLarge:f,boxShadowFocus:`0 0 0 2px ${De(v,{alpha:.2})}`}}const ar={common:Pe,self:or};var nr=b("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[p("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),p("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),p("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),b("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[se({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),p("checked, unchecked",`
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
 `),p("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),p("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),M("&:focus",[p("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),S("round",[p("rail","border-radius: calc(var(--n-rail-height) / 2);",[p("button","border-radius: calc(var(--n-button-height) / 2);")])]),ce("disabled",[ce("icon",[S("rubber-band",[S("pressed",[p("rail",[p("button","max-width: var(--n-button-width-pressed);")])]),p("rail",[M("&:active",[p("button","max-width: var(--n-button-width-pressed);")])]),S("active",[S("pressed",[p("rail",[p("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),p("rail",[M("&:active",[p("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),S("active",[p("rail",[p("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),p("rail",`
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
 `,[p("button-icon",`
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
 `,[se()]),p("button",`
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
 `)]),S("active",[p("rail","background-color: var(--n-rail-color-active);")]),S("loading",[p("rail",`
 cursor: wait;
 `)]),S("disabled",[p("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]);const lr=["aria-checked","tabindex","onClick","onFocus","onBlur","onKeyup","onKeydown"],sr={...J.props,size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]};let U;var ur=H({name:"Switch",props:sr,slots:Object,setup(e){U===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?U=CSS.supports("width","max(1px)"):U=!1:U=!0);const{mergedClsPrefixRef:v,inlineThemeDisabled:y,mergedComponentPropsRef:f}=be(e),u=J("Switch","-switch",nr,ar,e,v),i=Ne(e,{mergedSize(h){var O,q;if(e.size!==void 0)return e.size;if(h)return h.mergedSize.value;const T=(q=(O=f==null?void 0:f.value)==null?void 0:O.Switch)==null?void 0:q.size;return T||"medium"}}),{mergedSizeRef:o,mergedDisabledRef:l}=i,m=ae(e.defaultValue),k=je(e,"value"),w=We(k,m),$=z(()=>w.value===e.checkedValue),t=ae(!1),x=ae(!1),c=z(()=>{const{railStyle:h}=e;if(h)return h({focused:x.value,checked:$.value})});function n(h){const{"onUpdate:value":T,onChange:O,onUpdateValue:q}=e,{nTriggerFormInput:Z,nTriggerFormChange:Q}=i;T&&ne(T,h),q&&ne(q,h),O&&ne(O,h),m.value=h,Z(),Q()}function D(){const{nTriggerFormFocus:h}=i;h()}function P(){const{nTriggerFormBlur:h}=i;h()}function _(){e.loading||l.value||(w.value!==e.checkedValue?n(e.checkedValue):n(e.uncheckedValue))}function R(){x.value=!0,D()}function V(){x.value=!1,P(),t.value=!1}function Y(h){e.loading||l.value||h.key===" "&&(w.value!==e.checkedValue?n(e.checkedValue):n(e.uncheckedValue),t.value=!1)}function j(h){e.loading||l.value||h.key===" "&&(h.preventDefault(),t.value=!0)}const L=z(()=>{const{value:h}=o,{self:{opacityDisabled:T,railColor:O,railColorActive:q,buttonBoxShadow:Z,buttonColor:Q,boxShadowFocus:ye,loadingColor:me,textColor:xe,iconColor:we,[W("buttonHeight",h)]:I,[W("buttonWidth",h)]:ke,[W("buttonWidthPressed",h)]:$e,[W("railHeight",h)]:F,[W("railWidth",h)]:E,[W("railBorderRadius",h)]:Se,[W("buttonBorderRadius",h)]:Ce},common:{cubicBezierEaseInOut:_e}}=u.value;let ee,re,te;return U?(ee=`calc((${F} - ${I}) / 2)`,re=`max(${F}, ${I})`,te=`max(${E}, calc(${E} + ${I} - ${F}))`):(ee=le((N(F)-N(I))/2),re=le(Math.max(N(F),N(I))),te=N(F)>N(I)?E:le(N(E)+N(I)-N(F))),{"--n-bezier":_e,"--n-button-border-radius":Ce,"--n-button-box-shadow":Z,"--n-button-color":Q,"--n-button-width":ke,"--n-button-width-pressed":$e,"--n-button-height":I,"--n-height":re,"--n-offset":ee,"--n-opacity-disabled":T,"--n-rail-border-radius":Se,"--n-rail-color":O,"--n-rail-color-active":q,"--n-rail-height":F,"--n-rail-width":E,"--n-width":te,"--n-box-shadow-focus":ye,"--n-loading-color":me,"--n-text-color":xe,"--n-icon-color":we}}),G=y?ve("switch",z(()=>o.value[0]),L,e):void 0;return{handleClick:_,handleBlur:V,handleFocus:R,handleKeyup:Y,handleKeydown:j,mergedRailStyle:c,pressed:t,mergedClsPrefix:v,mergedValue:w,checked:$,mergedDisabled:l,cssVars:y?void 0:L,themeClass:G==null?void 0:G.themeClass,onRender:G==null?void 0:G.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:v,checked:y,mergedRailStyle:f,onRender:u,$slots:i}=this;u==null||u();const{checked:o,unchecked:l,icon:m,"checked-icon":k,"unchecked-icon":w}=i,$=!(oe(m)&&oe(k)&&oe(w));return r(),s("div",{role:"switch","aria-checked":y,class:a([`${e}-switch`,this.themeClass,$&&`${e}-switch--icon`,y&&`${e}-switch--active`,v&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`]),tabindex:this.mergedDisabled?void 0:0,style:B(this.cssVars),onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},[d("div",{class:a(`${e}-switch__rail`),"aria-hidden":"true",style:B(f)},[g(()=>A(o,t=>A(l,x=>t||x?(r(),s("div",{key:4,"aria-hidden":!0,class:a(`${e}-switch__children-placeholder`)},[d("div",{class:a(`${e}-switch__rail-placeholder`)},[d("div",{class:a(`${e}-switch__button-placeholder`)},null,2),g(()=>t)],2),d("div",{class:a(`${e}-switch__rail-placeholder`)},[d("div",{class:a(`${e}-switch__button-placeholder`)},null,2),g(()=>x)],2)],2)):null))),d("div",{class:a(`${e}-switch__button`)},[g(()=>A(m,t=>A(k,x=>A(w,c=>(r(),C(Fe,null,{default:()=>this.loading?(r(),C(Ve,Ie({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps),null,16,["clsPrefix"])):this.checked&&(x||t)?(r(),s("div",{class:a(`${e}-switch__button-icon`),key:x?"checked-icon":"icon"},[g(()=>x||t)],2)):!this.checked&&(c||t)?(r(),s("div",{class:a(`${e}-switch__button-icon`),key:c?"unchecked-icon":"icon"},[g(()=>c||t)],2)):null},1024)))))),g(()=>A(o,t=>t&&(r(),s("div",{key:"checked",class:a(`${e}-switch__checked`)},[g(()=>t)],2)))),g(()=>A(l,t=>t&&(r(),s("div",{key:"unchecked",class:a(`${e}-switch__unchecked`)},[g(()=>t)],2))))],2)],6)],46,lr)}});export{dr as P,ur as S};
