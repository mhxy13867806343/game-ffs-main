import{x as r,v as c,y as i,aF as N,aG as A,aH as D,d as G,A as p,o as J,b as K,n as O,e as W,f as j,g as q,aI as H,H as Q,k as b,aJ as U,au as g}from"./index-DgU2FFjN.js";var X=r([c("table",`
 font-size: var(--n-font-size);
 font-variant-numeric: tabular-nums;
 line-height: var(--n-line-height);
 width: 100%;
 border-radius: var(--n-border-radius) var(--n-border-radius) 0 0;
 text-align: left;
 border-collapse: separate;
 border-spacing: 0;
 overflow: hidden;
 background-color: var(--n-td-color);
 border-color: var(--n-merged-border-color);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 --n-merged-border-color: var(--n-border-color);
 `,[r("th",`
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 text-align: inherit;
 padding: var(--n-th-padding);
 vertical-align: inherit;
 text-transform: none;
 border: 0px solid var(--n-merged-border-color);
 font-weight: var(--n-th-font-weight);
 color: var(--n-th-text-color);
 background-color: var(--n-th-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 `,[r("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),r("td",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 padding: var(--n-td-padding);
 color: var(--n-td-text-color);
 background-color: var(--n-td-color);
 border: 0px solid var(--n-merged-border-color);
 border-right: 1px solid var(--n-merged-border-color);
 border-bottom: 1px solid var(--n-merged-border-color);
 `,[r("&:last-child",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),i("bordered",`
 border: 1px solid var(--n-merged-border-color);
 border-radius: var(--n-border-radius);
 `,[r("tr",[r("&:last-child",[r("td",`
 border-bottom: 0 solid var(--n-merged-border-color);
 `)])])]),i("single-line",[r("th",`
 border-right: 0px solid var(--n-merged-border-color);
 `),r("td",`
 border-right: 0px solid var(--n-merged-border-color);
 `)]),i("single-column",[r("tr",[r("&:not(:last-child)",[r("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])]),i("striped",[r("tr:nth-of-type(even)",[r("td","background-color: var(--n-td-color-striped)")])]),N("bottom-bordered",[r("tr",[r("&:last-child",[r("td",`
 border-bottom: 0px solid var(--n-merged-border-color);
 `)])])])]),A(c("table",`
 background-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `,[r("th",`
 background-color: var(--n-th-color-modal);
 `),r("td",`
 background-color: var(--n-td-color-modal);
 `)])),D(c("table",`
 background-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `,[r("th",`
 background-color: var(--n-th-color-popover);
 `),r("td",`
 background-color: var(--n-td-color-popover);
 `)]))]);const Y={...p.props,bordered:{type:Boolean,default:!0},bottomBordered:{type:Boolean,default:!0},singleLine:{type:Boolean,default:!0},striped:Boolean,singleColumn:Boolean,size:String};var rr=G({name:"Table",props:Y,setup(o){const{mergedClsPrefixRef:e,inlineThemeDisabled:l,mergedRtlRef:n,mergedComponentPropsRef:s}=q(o),v=b(()=>{var t,a;return o.size||((a=(t=s==null?void 0:s.value)==null?void 0:t.Table)==null?void 0:a.size)||"medium"}),m=p("Table","-table",X,U,o,e),u=H("Table",n,e),h=b(()=>{const t=v.value,{self:{borderColor:a,tdColor:f,tdColorModal:x,tdColorPopover:z,thColor:C,thColorModal:k,thColorPopover:P,thTextColor:B,tdTextColor:R,borderRadius:T,thFontWeight:$,lineHeight:y,borderColorModal:S,borderColorPopover:w,tdColorStriped:M,tdColorStripedModal:E,tdColorStripedPopover:V,[g("fontSize",t)]:L,[g("tdPadding",t)]:_,[g("thPadding",t)]:F},common:{cubicBezierEaseInOut:I}}=m.value;return{"--n-bezier":I,"--n-td-color":f,"--n-td-color-modal":x,"--n-td-color-popover":z,"--n-td-text-color":R,"--n-border-color":a,"--n-border-color-modal":S,"--n-border-color-popover":w,"--n-border-radius":T,"--n-font-size":L,"--n-th-color":C,"--n-th-color-modal":k,"--n-th-color-popover":P,"--n-th-font-weight":$,"--n-th-text-color":B,"--n-line-height":y,"--n-td-padding":_,"--n-th-padding":F,"--n-td-color-striped":M,"--n-td-color-striped-modal":E,"--n-td-color-striped-popover":V}}),d=l?Q("table",b(()=>v.value[0]),h,o):void 0;return{rtlEnabled:u,mergedClsPrefix:e,cssVars:l?void 0:h,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)==null||e.call(this),J(),K("table",{class:j([`${o}-table`,this.themeClass,{[`${o}-table--rtl`]:this.rtlEnabled,[`${o}-table--bottom-bordered`]:this.bottomBordered,[`${o}-table--bordered`]:this.bordered,[`${o}-table--single-line`]:this.singleLine,[`${o}-table--single-column`]:this.singleColumn,[`${o}-table--striped`]:this.striped}]),style:W(this.cssVars)},[O(()=>{var l,n;return(n=(l=this.$slots).default)==null?void 0:n.call(l)})],6)}});export{rr as T};
