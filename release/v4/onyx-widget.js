var e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,n=Symbol(),r=/* @__PURE__ */new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const n=this.t;if(t&&void 0===e){const t=void 0!==n&&1===n.length;t&&(e=r.get(n)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},s=(e,...t)=>new i(1===e.length?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+e[r+1],e[0]),e,n),a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const n of e.cssRules)t+=n.cssText;return(e=>new i("string"==typeof e?e:e+"",void 0,n))(t)})(e):e,{is:o,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:u}=Object,d=globalThis,g=d.trustedTypes,m=g?g.emptyScript:"",f=d.reactiveElementPolyfillSupport,b=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=null!==e;break;case Number:n=null===e?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch(e){n=null}}return n}},k=(e,t)=>!o(e,t),y={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),d.litPropertyMetadata??=/* @__PURE__ */new WeakMap;var S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const n=Symbol(),r=this.getPropertyDescriptor(e,n,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){const{get:r,set:i}=c(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);i?.call(this,t),this.requestUpdate(e,s,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const n of t)this.createProperty(n,e[n])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=/* @__PURE__ */new Map;for(const[t,n]of this.elementProperties){const e=this._$Eu(t,n);void 0!==e&&this._$Eh.set(e,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const n=new Set(e.flat(1/0).reverse());for(const e of n)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const n=t.attribute;return!1===n?void 0:"string"==typeof n?n:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=/* @__PURE__ */new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=/* @__PURE__ */new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=/* @__PURE__ */new Map,t=this.constructor.elementProperties;for(const n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const n=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of r){const r=document.createElement("style"),i=e.litNonce;void 0!==i&&r.setAttribute("nonce",i),r.textContent=t.cssText,n.appendChild(r)}})(n,this.constructor.elementStyles),n}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){const n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(void 0!==r&&!0===n.reflect){const i=(void 0!==n.converter?.toAttribute?n.converter:x).toAttribute(t,n.type);this._$Em=e,null==i?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){const n=this.constructor,r=n._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=n.getPropertyOptions(r),i="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=r;const s=i.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(void 0!==e){const s=this.constructor;if(!1===r&&(i=this[e]),n??=s.getPropertyOptions(e),!((n.hasChanged??k)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},s){n&&!(this._$Ej??=/* @__PURE__ */new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==i||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=/* @__PURE__ */new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,n]of e){const{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,n,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=/* @__PURE__ */new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:"open"},S[b("elementProperties")]=/* @__PURE__ */new Map,S[b("finalized")]=/* @__PURE__ */new Map,f?.({ReactiveElement:S}),(d.reactiveElementVersions??=[]).push("2.1.2");var w=globalThis,v=e=>e,A=w.trustedTypes,O=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+N,R=`<${T}>`,D=document,I=()=>D.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,j=Array.isArray,H=e=>j(e)||"function"==typeof e?.[Symbol.iterator],U="[ \t\n\f\r]",C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,L=/-->/g,M=/>/g,Y=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,P=/"/g,B=/^(?:script|style|textarea|title)$/i,J=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),Z=J(1),W=(J(2),J(3),Symbol.for("lit-noChange")),F=Symbol.for("lit-nothing"),K=/* @__PURE__ */new WeakMap,q=D.createTreeWalker(D,129);function _(e,t){if(!j(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==O?O.createHTML(t):t}var V=(e,t)=>{const n=e.length-1,r=[];let i,s=2===t?"<svg>":3===t?"<math>":"",a=C;for(let o=0;o<n;o++){const t=e[o];let n,l,c=-1,h=0;for(;h<t.length&&(a.lastIndex=h,l=a.exec(t),null!==l);)h=a.lastIndex,a===C?"!--"===l[1]?a=L:void 0!==l[1]?a=M:void 0!==l[2]?(B.test(l[2])&&(i=RegExp("</"+l[2],"g")),a=Y):void 0!==l[3]&&(a=Y):a===Y?">"===l[0]?(a=i??C,c=-1):void 0===l[1]?c=-2:(c=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?Y:'"'===l[3]?P:G):a===P||a===G?a=Y:a===L||a===M?a=C:(a=Y,i=void 0);const p=a===Y&&e[o+1].startsWith("/>")?" ":"";s+=a===C?t+R:c>=0?(r.push(n),t.slice(0,c)+E+t.slice(c)+N+p):t+N+(-2===c?o:p)}return[_(e,s+(e[n]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]},Q=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let s=0,a=0;const o=t.length-1,l=this.parts,[c,h]=V(t,n);if(this.el=e.createElement(c,r),q.currentNode=this.el.content,2===n||3===n){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=q.nextNode())&&l.length<o;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(E)){const t=h[a++],n=i.getAttribute(e).split(N),r=/([.?@])?(.*)/.exec(t);l.push({type:1,index:s,name:r[2],strings:n,ctor:"."===r[1]?ne:"?"===r[1]?re:"@"===r[1]?ie:te}),i.removeAttribute(e)}else e.startsWith(N)&&(l.push({type:6,index:s}),i.removeAttribute(e));if(B.test(i.tagName)){const e=i.textContent.split(N),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],I()),q.nextNode(),l.push({type:2,index:++s});i.append(e[t],I())}}}else if(8===i.nodeType)if(i.data===T)l.push({type:2,index:s});else{let e=-1;for(;-1!==(e=i.data.indexOf(N,e+1));)l.push({type:7,index:s}),e+=N.length-1}s++}}static createElement(e,t){const n=D.createElement("template");return n.innerHTML=e,n}};function X(e,t,n=e,r){if(t===W)return t;let i=void 0!==r?n._$Co?.[r]:n._$Cl;const s=z(t)?void 0:t._$litDirective$;return i?.constructor!==s&&(i?._$AO?.(!1),void 0===s?i=void 0:(i=new s(e),i._$AT(e,n,r)),void 0!==r?(n._$Co??=[])[r]=i:n._$Cl=i),void 0!==i&&(t=X(e,i._$AS(e,t.values),i,r)),t}var $=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??D).importNode(t,!0);q.currentNode=r;let i=q.nextNode(),s=0,a=0,o=n[0];for(;void 0!==o;){if(s===o.index){let t;2===o.type?t=new ee(i,i.nextSibling,this,e):1===o.type?t=new o.ctor(i,o.name,o.strings,this,e):6===o.type&&(t=new se(i,this,e)),this._$AV.push(t),o=n[++a]}s!==o?.index&&(i=q.nextNode(),s++)}return q.currentNode=D,r}p(e){let t=0;for(const n of this._$AV)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}},ee=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),z(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==W&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):H(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:n}=e,r="number"==typeof n?this._$AC(e):(void 0===n.el&&(n.el=Q.createElement(_(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new $(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=K.get(e.strings);return void 0===t&&K.set(e.strings,t=new Q(e)),t}k(t){j(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let r,i=0;for(const s of t)i===n.length?n.push(r=new e(this.O(I()),this.O(I()),this,this.options)):r=n[i],r._$AI(s),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=v(e).nextSibling;v(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(/* @__PURE__ */new String),this.strings=n):this._$AH=F}_$AI(e,t=this,n,r){const i=this.strings;let s=!1;if(void 0===i)e=X(this,e,t,0),s=!z(e)||e!==this._$AH&&e!==W,s&&(this._$AH=e);else{const r=e;let a,o;for(e=i[0],a=0;a<i.length-1;a++)o=X(this,r[n+a],t,a),o===W&&(o=this._$AH[a]),s||=!z(o)||o!==this._$AH[a],o===F?e=F:e!==F&&(e+=(o??"")+i[a+1]),this._$AH[a]=o}s&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ne=class extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},re=class extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}},ie=class extends te{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??F)===W)return;const n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}},ae=w.litHtmlPolyfillSupport;ae?.(Q,ee),(w.litHtmlVersions??=[]).push("3.3.3");var oe=globalThis,le=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,n)=>{const r=n?.renderBefore??t;let i=r._$litPart$;if(void 0===i){const e=n?.renderBefore??null;r._$litPart$=i=new ee(t.insertBefore(I(),e),e,void 0,n??{})}return i._$AI(e),i})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};le._$litElement$=!0,le.finalized=!0,oe.litElementHydrateSupport?.({LitElement:le});var ce=oe.litElementPolyfillSupport;ce?.({LitElement:le}),(oe.litElementVersions??=[]).push("4.2.2");var he={attribute:!0,type:String,converter:x,reflect:!1,hasChanged:k},pe=(e=he,t,n)=>{const{kind:r,metadata:i}=n;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=/* @__PURE__ */new Map),"setter"===r&&((e=Object.create(e)).wrapped=!0),s.set(n.name,e),"accessor"===r){const{name:r}=n;return{set(n){const i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return void 0!==t&&this.C(r,void 0,e,t),t}}}if("setter"===r){const{name:r}=n;return function(n){const i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error("Unsupported decorator location: "+r)};function ue(e){return(t,n)=>"object"==typeof n?pe(e,t,n):((e,t,n)=>{const r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function de(e){return ue({...e,state:!0,attribute:!1})}var ge=2,me=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},fe=class extends me{constructor(e){if(super(e),this.it=F,e.type!==ge)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===F||null==e)return this._t=void 0,this.it=e;if(e===W)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};fe.directiveName="unsafeHTML",fe.resultType=1;var be=(e=>(...t)=>({_$litDirective$:e,values:t}))(fe);function xe(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ke={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};function ye(e){ke=e}var Se={exec:()=>null};function we(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function ve(e,t=""){let n="string"==typeof e?e:e.source,r={replace:(e,t)=>{let i="string"==typeof t?t:t.source;return i=i.replace(Oe.caret,"$1"),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var Ae=((e="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+e)}catch{return!1}})(),Oe={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>new RegExp(`^( {0,3}${e})((?:[\t ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:we(e=>new RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`)),hrRegex:we(e=>new RegExp(`^ {0,${e}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:we(e=>new RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:we(e=>new RegExp(`^ {0,${e}}#`)),htmlBeginRegex:we(e=>new RegExp(`^ {0,${e}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:we(e=>new RegExp(`^ {0,${e}}>`))},Ee=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ne=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,Te=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Re=ve(Te).replace(/bull/g,Ne).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),De=ve(Te).replace(/bull/g,Ne).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ie=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,ze=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,je=ve(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",ze).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),He=ve(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Ne).getRegex(),Ue="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ce=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Le=ve("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ \t]*)+\\n|$))","i").replace("comment",Ce).replace("tag",Ue).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Me=ve(Ie).replace("hr",Ee).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ue).getRegex(),Ye={blockquote:ve(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Me).getRegex(),code:/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,def:je,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,hr:Ee,html:Le,lheading:Re,list:He,newline:/^(?:[ \t]*(?:\n|$))+/,paragraph:Me,table:Se,text:/^[^\n]+/},Ge=ve("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ee).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}\t)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ue).getRegex(),Pe={...Ye,lheading:De,table:Ge,paragraph:ve(Ie).replace("hr",Ee).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Ge).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ue).getRegex()},Be={...Ye,html:ve("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",Ce).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Se,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:ve(Ie).replace("hr",Ee).replace("heading"," *#{1,6} *[^\n]").replace("lheading",Re).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Je=/^( {2,}|\\)\n(?!\s*$)/,Ze=/[\p{P}\p{S}]/u,We=/[\s\p{P}\p{S}]/u,Fe=/[^\s\p{P}\p{S}]/u,Ke=ve(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,We).getRegex(),qe=/(?!~)[\p{P}\p{S}]/u,_e=ve(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Ae?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Ve=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Qe=ve(Ve,"u").replace(/punct/g,Ze).getRegex(),Xe=ve(Ve,"u").replace(/punct/g,qe).getRegex(),$e="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",et=ve($e,"gu").replace(/notPunctSpace/g,Fe).replace(/punctSpace/g,We).replace(/punct/g,Ze).getRegex(),tt=ve($e,"gu").replace(/notPunctSpace/g,/(?:[^\s\p{P}\p{S}]|~)/u).replace(/punctSpace/g,/(?!~)[\s\p{P}\p{S}]/u).replace(/punct/g,qe).getRegex(),nt=ve("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Fe).replace(/punctSpace/g,We).replace(/punct/g,Ze).getRegex(),rt=ve(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Ze).getRegex(),it=ve("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,Fe).replace(/punctSpace/g,We).replace(/punct/g,Ze).getRegex(),st=ve(/\\(punct)/,"gu").replace(/punct/g,Ze).getRegex(),at=ve(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ot=ve(Ce).replace("(?:--\x3e|$)","--\x3e").getRegex(),lt=ve("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ot).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ct=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,ht=ve(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",ct).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),pt=ve(/^!?\[(label)\]\[(ref)\]/).replace("label",ct).replace("ref",ze).getRegex(),ut=ve(/^!?\[(ref)\](?:\[\])?/).replace("ref",ze).getRegex(),dt=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,gt={_backpedal:Se,anyPunctuation:st,autolink:at,blockSkip:_e,br:Je,code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,del:Se,delLDelim:Se,delRDelim:Se,emStrongLDelim:Qe,emStrongRDelimAst:et,emStrongRDelimUnd:nt,escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,link:ht,nolink:ut,punctuation:Ke,reflink:pt,reflinkSearch:ve("reflink|nolink(?!\\()","g").replace("reflink",pt).replace("nolink",ut).getRegex(),tag:lt,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,url:Se},mt={...gt,link:ve(/^!?\[(label)\]\((.*?)\)/).replace("label",ct).getRegex(),reflink:ve(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",ct).getRegex()},ft={...gt,emStrongRDelimAst:tt,emStrongLDelim:Xe,delLDelim:rt,delRDelim:it,url:ve(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",dt).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:ve(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",dt).getRegex()},bt={...ft,br:ve(Je).replace("{2,}","*").getRegex(),text:ve(ft.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},xt={normal:Ye,gfm:Pe,pedantic:Be},kt={normal:gt,gfm:ft,breaks:bt,pedantic:mt},yt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},St=e=>yt[e];function wt(e,t){if(t){if(Oe.escapeTest.test(e))return e.replace(Oe.escapeReplace,St)}else if(Oe.escapeTestNoEncode.test(e))return e.replace(Oe.escapeReplaceNoEncode,St);return e}function vt(e){try{e=encodeURI(e).replace(Oe.percentDecode,"%")}catch{return null}return e}function At(e,t){let n=e.replace(Oe.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&"\\"===n[i];)r=!r;return r?"|":" |"}).split(Oe.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(Oe.slashPipe,"|");return n}function Ot(e,t,n){let r=e.length;if(0===r)return"";let i=0;for(;i<r;){let s=e.charAt(r-i-1);if(s!==t||n){if(s===t||!n)break;i++}else i++}return e.slice(0,r-i)}function Et(e){let t=e.split("\n"),n=t.length-1;for(;n>=0&&Oe.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join("\n")}function Nt(e,t=0){let n=t,r="";for(let i of e)if("\t"===i){let e=4-n%4;r+=" ".repeat(e),n+=e}else r+=i,n++;return r}function Tt(e,t,n,r,i){let s=t.href,a=t.title||null,o=e[1].replace(i.other.outputLinkReplace,"$1");r.state.inLink=!0;let l={type:"!"===e[0].charAt(0)?"image":"link",raw:n,href:s,title:a,text:o,tokens:r.inlineTokens(o)};return r.state.inLink=!1,l}var Rt=class{options;rules;lexer;constructor(e){this.options=e||ke}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Et(t[0]);return{type:"code",raw:e,codeBlockStyle:"indented",text:e.replace(this.rules.other.codeRemoveIndent,"")}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=function(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(null===r)return t;let i=r[1];return t.split("\n").map(e=>{let t=e.match(n.other.beginningSpace);if(null===t)return e;let[r]=t;return r.length>=i.length?e.slice(i.length):e}).join("\n")}(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Ot(e,"#");(this.options.pedantic||!t||this.rules.other.endingSpaceChar.test(t))&&(e=t.trim())}return{type:"heading",raw:Ot(t[0],"\n"),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Ot(t[0],"\n")}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Ot(t[0],"\n").split("\n"),n="",r="",i=[];for(;e.length>0;){let t,s=!1,a=[];for(t=0;t<e.length;t++)if(this.rules.other.blockquoteStart.test(e[t]))a.push(e[t]),s=!0;else{if(s)break;a.push(e[t])}e=e.slice(t);let o=a.join("\n"),l=o.replace(this.rules.other.blockquoteSetextReplace,"\n    $1").replace(this.rules.other.blockquoteSetextReplace2,"");n=n?`${n}\n${o}`:o,r=r?`${r}\n${l}`:l;let c=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(l,i,!0),this.lexer.state.top=c,0===e.length)break;let h=i.at(-1);if("code"===h?.type)break;if("blockquote"===h?.type){let t=h,s=t.raw+"\n"+e.join("\n"),a=this.blockquote(s);i[i.length-1]=a,n=n.substring(0,n.length-t.raw.length)+a.raw,r=r.substring(0,r.length-t.text.length)+a.text;break}if("list"===h?.type){let t=h,s=t.raw+"\n"+e.join("\n"),a=this.list(s);i[i.length-1]=a,n=n.substring(0,n.length-h.raw.length)+a.raw,r=r.substring(0,r.length-t.raw.length)+a.raw,e=s.substring(i.at(-1).raw.length).split("\n");continue}}return{type:"blockquote",raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),a=!1;for(;e;){let n=!1,r="",o="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;r=t[0],e=e.substring(r.length);let l=Nt(t[2].split("\n",1)[0],t[1].length),c=e.split("\n",1)[0],h=!l.trim(),p=0;if(this.options.pedantic?(p=2,o=l.trimStart()):h?p=t[1].length+1:(p=l.search(this.rules.other.nonSpaceChar),p=p>4?1:p,o=l.slice(p),p+=t[1].length),h&&this.rules.other.blankLine.test(c)&&(r+=c+"\n",e=e.substring(c.length+1),n=!0),!n){let t=this.rules.other.nextBulletRegex(p),n=this.rules.other.hrRegex(p),i=this.rules.other.fencesBeginRegex(p),s=this.rules.other.headingBeginRegex(p),a=this.rules.other.htmlBeginRegex(p),u=this.rules.other.blockquoteBeginRegex(p);for(;e;){let d,g=e.split("\n",1)[0];if(c=g,this.options.pedantic?(c=c.replace(this.rules.other.listReplaceNesting,"  "),d=c):d=c.replace(this.rules.other.tabCharGlobal,"    "),i.test(c)||s.test(c)||a.test(c)||u.test(c)||t.test(c)||n.test(c))break;if(d.search(this.rules.other.nonSpaceChar)>=p||!c.trim())o+="\n"+d.slice(p);else{if(h||l.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||i.test(l)||s.test(l)||n.test(l))break;o+="\n"+c}h=!c.trim(),r+=g+"\n",e=e.substring(g.length+1),l=d.slice(p)}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(r)&&(a=!0)),i.items.push({type:"list_item",raw:r,task:!!this.options.gfm&&this.rules.other.listIsTask.test(o),loose:!1,text:o,tokens:[]}),i.raw+=r}let o=i.items.at(-1);if(!o)return;o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd(),i.raw=i.raw.trimEnd();for(let e of i.items){this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]);let t=e.tokens[0];if(!e.task||"text"!==t?.type&&"paragraph"!==t?.type)e.task&&(e.task=!1);else{e.text=e.text.replace(this.rules.other.listReplaceTask,""),t.raw=t.raw.replace(this.rules.other.listReplaceTask,""),t.text=t.text.replace(this.rules.other.listReplaceTask,"");for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,"");break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:"checkbox",raw:n[0]+" ",checked:"[ ]"!==n[0]};e.checked=t.checked,i.loose?e.tokens[0]&&["paragraph","text"].includes(e.tokens[0].type)&&"tokens"in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:"paragraph",raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}if(!i.loose){let t=e.tokens.filter(e=>"space"===e.type);i.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}}if(i.loose)for(let e of i.items){e.loose=!0;for(let t of e.tokens)"text"===t.type&&(t.type="paragraph")}return i}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Et(t[0]);return{type:"html",block:!0,raw:e,pre:"pre"===t[1]||"script"===t[1]||"style"===t[1],text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){let e=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:Ot(t[0],"\n"),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=At(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split("\n"):[],s={type:"table",raw:Ot(t[0],"\n"),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?s.align.push("right"):this.rules.other.tableAlignCenter.test(e)?s.align.push("center"):this.rules.other.tableAlignLeft.test(e)?s.align.push("left"):s.align.push(null);for(let e=0;e<n.length;e++)s.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:s.align[e]});for(let e of i)s.rows.push(At(e,s.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:s.align[t]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:"heading",raw:Ot(t[0],"\n"),depth:"="===t[2].charAt(0)?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let e=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(e)){if(!this.rules.other.endAngleBracket.test(e))return;let t=Ot(e.slice(0,-1),"\\");if((e.length-t.length)%2==0)return}else{let e=function(e,t){if(-1===e.indexOf(t[1]))return-1;let n=0;for(let r=0;r<e.length;r++)if("\\"===e[r])r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}(t[2],"()");if(-2===e)return;if(e>-1){let n=(0===t[0].indexOf("!")?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=""}}let n=t[2],r="";if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(n);e&&(n=e[1],r=e[3])}else r=t[3]?t[3].slice(1,-1):"";return n=n.trim(),this.rules.other.startAngleBracket.test(n)&&(n=this.options.pedantic&&!this.rules.other.endAngleBracket.test(e)?n.slice(1):n.slice(1,-1)),Tt(t,{href:n&&n.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let e=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!e){let e=n[0].charAt(0);return{type:"text",raw:e,text:e}}return Tt(n,e,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(r&&(r[1]||r[2]||r[3]||r[4])&&(!r[4]||!n.match(this.rules.other.unicodeAlphaNumeric))&&(!r[1]&&!r[3]||!n||this.rules.inline.punctuation.exec(n))){let n,i,s=[...r[0]].length-1,a=s,o=0,l="*"===r[0][0]?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(l.lastIndex=0,t=t.slice(-1*e.length+s);null!==(r=l.exec(t));){if(n=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!n)continue;if(i=[...n].length,r[3]||r[4]){a+=i;continue}if((r[5]||r[6])&&s%3&&!((s+i)%3)){o+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a+o);let t=[...r[0]][0].length,l=e.slice(0,s+r.index+t+i);if(Math.min(s,i)%2){let e=l.slice(1,-1);return{type:"em",raw:l,text:e,tokens:this.lexer.inlineTokens(e)}}let c=l.slice(2,-2);return{type:"strong",raw:l,text:c,tokens:this.lexer.inlineTokens(c)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n,i,s=[...r[0]].length-1,a=s,o=this.rules.inline.delRDelim;for(o.lastIndex=0,t=t.slice(-1*e.length+s);null!==(r=o.exec(t));){if(n=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!n||(i=[...n].length,i!==s))continue;if(r[3]||r[4]){a+=i;continue}if(a-=i,a>0)continue;i=Math.min(i,i+a);let t=[...r[0]][0].length,o=e.slice(0,s+r.index+t+i),l=o.slice(s,-s);return{type:"del",raw:o,text:l,tokens:this.lexer.inlineTokens(l)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return"@"===t[2]?(e=t[1],n="mailto:"+e):(e=t[1],n=e),{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if("@"===t[2])e=t[0],n="mailto:"+e;else{let r;do{r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??""}while(r!==t[0]);e=t[0],n="www."===t[1]?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:e,href:n,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:e}}}},Dt=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ke,this.options.tokenizer=this.options.tokenizer||new Rt,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:Oe,block:xt.normal,inline:kt.normal};this.options.pedantic?(t.block=xt.pedantic,t.inline=kt.pedantic):this.options.gfm&&(t.block=xt.gfm,this.options.breaks?t.inline=kt.breaks:t.inline=kt.gfm),this.tokenizer.rules=t}static get rules(){return{block:xt,inline:kt}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(Oe.carriageReturn,"\n"),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let e=this.inlineQueue[t];this.inlineTokens(e.src,e.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(Oe.tabCharGlobal,"    ").replace(Oe.spaceLine,""));let r=1/0;for(;e;){if(!(e.length<r)){this.infiniteLoopError(e.charCodeAt(0));break}let i;if(r=e.length,this.options.extensions?.block?.some(n=>!!(i=n.call({lexer:this},e,t))&&(e=e.substring(i.raw.length),t.push(i),!0)))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let n=t.at(-1);1===i.raw.length&&void 0!==n?n.raw+="\n":t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let n=t.at(-1);"paragraph"===n?.type||"text"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+i.raw,n.text+="\n"+i.text,this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let n=t.at(-1);"paragraph"===n?.type||"text"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+i.raw,n.text+="\n"+i.raw,this.inlineQueue.at(-1).src=n.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let s=e;if(this.options.extensions?.startBlock){let t,n=1/0,r=e.slice(1);this.options.extensions.startBlock.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(n=Math.min(n,t))}),n<1/0&&n>=0&&(s=e.substring(0,n+1))}if(this.state.top&&(i=this.tokenizer.paragraph(s))){let r=t.at(-1);n&&"paragraph"===r?.type?(r.raw+=(r.raw.endsWith("\n")?"":"\n")+i.raw,r.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=r.text):t.push(i),n=s.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let n=t.at(-1);"text"===n?.type?(n.raw+=(n.raw.endsWith("\n")?"":"\n")+i.raw,n.text+="\n"+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n,r=e,i=null;if(this.tokens.links){let e=Object.keys(this.tokens.links);if(e.length>0)for(;null!==(i=this.tokenizer.rules.inline.reflinkSearch.exec(r));)e.includes(i[0].slice(i[0].lastIndexOf("[")+1,-1))&&(r=r.slice(0,i.index)+"["+"a".repeat(i[0].length-2)+"]"+r.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!==(i=this.tokenizer.rules.inline.anyPunctuation.exec(r));)r=r.slice(0,i.index)+"++"+r.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);for(;null!==(i=this.tokenizer.rules.inline.blockSkip.exec(r));)n=i[2]?i[2].length:0,r=r.slice(0,i.index+n)+"["+"a".repeat(i[0].length-n-2)+"]"+r.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);r=this.options.hooks?.emStrongMask?.call({lexer:this},r)??r;let s=!1,a="",o=1/0;for(;e;){if(!(e.length<o)){this.infiniteLoopError(e.charCodeAt(0));break}let n;if(o=e.length,s||(a=""),s=!1,this.options.extensions?.inline?.some(r=>!!(n=r.call({lexer:this},e,t))&&(e=e.substring(n.raw.length),t.push(n),!0)))continue;if(n=this.tokenizer.escape(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.tag(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.link(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(n.raw.length);let r=t.at(-1);"text"===n.type&&"text"===r?.type?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(n=this.tokenizer.emStrong(e,r,a)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.codespan(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.br(e)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.del(e,r,a)){e=e.substring(n.raw.length),t.push(n);continue}if(n=this.tokenizer.autolink(e)){e=e.substring(n.raw.length),t.push(n);continue}if(!this.state.inLink&&(n=this.tokenizer.url(e))){e=e.substring(n.raw.length),t.push(n);continue}let i=e;if(this.options.extensions?.startInline){let t,n=1/0,r=e.slice(1);this.options.extensions.startInline.forEach(e=>{t=e.call({lexer:this},r),"number"==typeof t&&t>=0&&(n=Math.min(n,t))}),n<1/0&&n>=0&&(i=e.substring(0,n+1))}if(n=this.tokenizer.inlineText(i)){e=e.substring(n.raw.length),"_"!==n.raw.slice(-1)&&(a=n.raw.slice(-1)),s=!0;let r=t.at(-1);"text"===r?.type?(r.raw+=n.raw,r.text+=n.text):t.push(n);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(!this.options.silent)throw new Error(t)}},It=class{options;parser;constructor(e){this.options=e||ke}space(e){return""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(Oe.notSpaceStart)?.[0],i=e.replace(Oe.endingNewline,"")+"\n";return r?'<pre><code class="language-'+wt(r)+'">'+(n?i:wt(i,!0))+"</code></pre>\n":"<pre><code>"+(n?i:wt(i,!0))+"</code></pre>\n"}blockquote({tokens:e}){return`<blockquote>\n${this.parser.parse(e)}</blockquote>\n`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>\n`}hr(e){return"<hr>\n"}list(e){let t=e.ordered,n=e.start,r="";for(let s=0;s<e.items.length;s++){let t=e.items[s];r+=this.listitem(t)}let i=t?"ol":"ul";return"<"+i+(t&&1!==n?' start="'+n+'"':"")+">\n"+r+"</"+i+">\n"}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>\n`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>\n`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let r="";for(let i=0;i<e.rows.length;i++){let t=e.rows[i];n="";for(let e=0;e<t.length;e++)n+=this.tablecell(t[e]);r+=this.tablerow({text:n})}return r&&(r=`<tbody>${r}</tbody>`),"<table>\n<thead>\n"+t+"</thead>\n"+r+"</table>\n"}tablerow({text:e}){return`<tr>\n${e}</tr>\n`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>\n`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${wt(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=vt(e);if(null===i)return r;let s='<a href="'+(e=i)+'"';return t&&(s+=' title="'+wt(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=vt(e);if(null===i)return wt(n);let s=`<img src="${e=i}" alt="${wt(n)}"`;return t&&(s+=` title="${wt(t)}"`),s+=">",s}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:wt(e.text)}},zt=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},jt=class e{options;renderer;textRenderer;constructor(e){this.options=e||ke,this.options.renderer=this.options.renderer||new It,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new zt}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(!1!==n||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(e.type)){t+=n||"";continue}}let i=r;switch(i.type){case"space":t+=this.renderer.space(i);break;case"hr":t+=this.renderer.hr(i);break;case"heading":t+=this.renderer.heading(i);break;case"code":t+=this.renderer.code(i);break;case"table":t+=this.renderer.table(i);break;case"blockquote":t+=this.renderer.blockquote(i);break;case"list":t+=this.renderer.list(i);break;case"checkbox":t+=this.renderer.checkbox(i);break;case"html":t+=this.renderer.html(i);break;case"def":t+=this.renderer.def(i);break;case"paragraph":t+=this.renderer.paragraph(i);break;case"text":t+=this.renderer.text(i);break;default:{let e='Token with "'+i.type+'" type was not found.';if(this.options.silent)return"";throw new Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(!1!==e||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=e||"";continue}}let s=i;switch(s.type){case"escape":case"text":n+=t.text(s);break;case"html":n+=t.html(s);break;case"link":n+=t.link(s);break;case"image":n+=t.image(s);break;case"checkbox":n+=t.checkbox(s);break;case"strong":n+=t.strong(s);break;case"em":n+=t.em(s);break;case"codespan":n+=t.codespan(s);break;case"br":n+=t.br(s);break;case"del":n+=t.del(s);break;default:{let e='Token with "'+s.type+'" type was not found.';if(this.options.silent)return"";throw new Error(e)}}}return n}},Ht=class{options;block;constructor(e){this.options=e||ke}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Dt.lex:Dt.lexInline}provideParser(e=this.block){return e?jt.parse:jt.parseInline}},Ut=new class{defaults={async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null};options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=jt;Renderer=It;TextRenderer=zt;Lexer=Dt;Tokenizer=Rt;Hooks=Ht;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let e=r;for(let r of e.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)n=n.concat(this.walkTokens(e.tokens,t));break}case"list":{let e=r;n=n.concat(this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);n=n.concat(this.walkTokens(i,t))}):e.tokens&&(n=n.concat(this.walkTokens(e.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw new Error("extension name required");if("renderer"in e){let n=t.renderers[e.name];t.renderers[e.name]=n?function(...t){let r=e.renderer.apply(this,t);return!1===r&&(r=n.apply(this,t)),r}:e.renderer}if("tokenizer"in e){if(!e.level||"block"!==e.level&&"inline"!==e.level)throw new Error("extension level must be 'block' or 'inline'");let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&("block"===e.level?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:"inline"===e.level&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}"childTokens"in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new It(this.defaults);for(let n in e.renderer){if(!(n in t))throw new Error(`renderer '${n}' does not exist`);if(["options","parser"].includes(n))continue;let r=n,i=e.renderer[r],s=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return!1===n&&(n=s.apply(t,e)),n||""}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Rt(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw new Error(`tokenizer '${n}' does not exist`);if(["options","rules","lexer"].includes(n))continue;let r=n,i=e.tokenizer[r],s=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return!1===n&&(n=s.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Ht;for(let n in e.hooks){if(!(n in t))throw new Error(`hook '${n}' does not exist`);if(["options","block"].includes(n))continue;let r=n,i=e.hooks[r],s=t[r];Ht.passThroughHooks.has(n)?t[r]=e=>{if(this.defaults.async&&Ht.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return s.call(t,n)})();let r=i.call(t,e);return s.call(t,r)}:t[r]=(...e)=>{if(this.defaults.async)return(async()=>{let n=await i.apply(t,e);return!1===n&&(n=await s.apply(t,e)),n})();let n=i.apply(t,e);return!1===n&&(n=s.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return n.push(r.call(this,e)),t&&(n=n.concat(t.call(this,e))),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Dt.lex(e,t??this.defaults)}parser(e,t){return jt.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},s=this.onError(!!i.silent,!!i.async);if(!0===this.defaults.async&&!1===r.async)return s(/* @__PURE__ */new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||null===t)return s(/* @__PURE__ */new Error("marked(): input parameter is undefined or null"));if("string"!=typeof t)return s(/* @__PURE__ */new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?Dt.lex:Dt.lexInline)(n,i),s=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(s,i.walkTokens));let a=await(i.hooks?await i.hooks.provideParser(e):e?jt.parse:jt.parseInline)(s,i);return i.hooks?await i.hooks.postprocess(a):a})().catch(s);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?Dt.lex:Dt.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?jt.parse:jt.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(j){return s(j)}}}onError(e,t){return n=>{if(n.message+="\nPlease report this to https://github.com/markedjs/marked.",e){let e="<p>An error occurred:</p><pre>"+wt(n.message+"",!0)+"</pre>";return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function Ct(e,t){return Ut.parse(e,t)}Ct.options=Ct.setOptions=function(e){return Ut.setOptions(e),Ct.defaults=Ut.defaults,ye(Ct.defaults),Ct},Ct.getDefaults=xe,Ct.defaults=ke,Ct.use=function(...e){return Ut.use(...e),Ct.defaults=Ut.defaults,ye(Ct.defaults),Ct},Ct.walkTokens=function(e,t){return Ut.walkTokens(e,t)},Ct.parseInline=Ut.parseInline,Ct.Parser=jt,Ct.parser=jt.parse,Ct.Renderer=It,Ct.TextRenderer=zt,Ct.Lexer=Dt,Ct.lexer=Dt.lex,Ct.Tokenizer=Rt,Ct.Hooks=Ht,Ct.parse=Ct;Ct.options,Ct.setOptions,Ct.use,Ct.walkTokens,Ct.parseInline,jt.parse,Dt.lex;function Lt(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Mt(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,i,s,a,o=[],l=!0,c=!1;try{if(s=(n=n.call(e)).next,0===t);else for(;!(l=(r=s.call(n)).done)&&(o.push(r.value),o.length!==t);l=!0);}catch(e){c=!0,i=e}finally{try{if(!l&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(c)throw i}}return o}}(e,t)||function(e,t){if(e){if("string"==typeof e)return Lt(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Lt(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var Yt=Object.entries,Gt=Object.setPrototypeOf,Pt=Object.isFrozen,Bt=Object.getPrototypeOf,Jt=Object.getOwnPropertyDescriptor,Zt=Object.freeze,Wt=Object.seal,Ft=Object.create,Kt="undefined"!=typeof Reflect&&Reflect,qt=Kt.apply,_t=Kt.construct;Zt||(Zt=function(e){return e}),Wt||(Wt=function(e){return e}),qt||(qt=function(e,t){for(var n=arguments.length,r=new Array(n>2?n-2:0),i=2;i<n;i++)r[i-2]=arguments[i];return e.apply(t,r)}),_t||(_t=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return new e(...n)});var Vt,Qt=xn(Array.prototype.forEach),Xt=xn(Array.prototype.lastIndexOf),$t=xn(Array.prototype.pop),en=xn(Array.prototype.push),tn=xn(Array.prototype.splice),nn=Array.isArray,rn=xn(String.prototype.toLowerCase),sn=xn(String.prototype.toString),an=xn(String.prototype.match),on=xn(String.prototype.replace),ln=xn(String.prototype.indexOf),cn=xn(String.prototype.trim),hn=xn(Number.prototype.toString),pn=xn(Boolean.prototype.toString),un="undefined"==typeof BigInt?null:xn(BigInt.prototype.toString),dn="undefined"==typeof Symbol?null:xn(Symbol.prototype.toString),gn=xn(Object.prototype.hasOwnProperty),mn=xn(Object.prototype.toString),fn=xn(RegExp.prototype.test),bn=(Vt=TypeError,function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return _t(Vt,t)});function xn(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var n=arguments.length,r=new Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];return qt(e,t,r)}}function kn(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:rn;if(Gt&&Gt(e,null),!nn(t))return e;let r=t.length;for(;r--;){let i=t[r];if("string"==typeof i){const e=n(i);e!==i&&(Pt(t)||(t[r]=e),i=e)}e[i]=!0}return e}function yn(e){for(let t=0;t<e.length;t++)gn(e,t)||(e[t]=null);return e}function Sn(e){const t=Ft(null);for(const r of Yt(e)){var n=Mt(r,2);const i=n[0],s=n[1];gn(e,i)&&(nn(s)?t[i]=yn(s):s&&"object"==typeof s&&s.constructor===Object?t[i]=Sn(s):t[i]=s)}return t}function wn(e,t){for(;null!==e;){const n=Jt(e,t);if(n){if(n.get)return xn(n.get);if("function"==typeof n.value)return xn(n.value)}e=Bt(e)}return function(){return null}}var vn=Zt(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),An=Zt(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),On=Zt(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),En=Zt(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Nn=Zt(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Tn=Zt(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Rn=Zt(["#text"]),Dn=Zt(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),In=Zt(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),zn=Zt(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),jn=Zt(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Hn=Wt(/{{[\w\W]*|^[\w\W]*}}/g),Un=Wt(/<%[\w\W]*|^[\w\W]*%>/g),Cn=Wt(/\${[\w\W]*/g),Ln=Wt(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mn=Wt(/^aria-[\-\w]+$/),Yn=Wt(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Gn=Wt(/^(?:\w+script|data):/i),Pn=Wt(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Bn=Wt(/^html$/i),Jn=Wt(/^[a-z][.\w]*(-[.\w]+)+$/i),Zn=1,Wn=3,Fn=7,Kn=8,qn=9,_n=11,Vn=function(){return"undefined"==typeof window?null:window};var Qn=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Vn();const n=t=>e(t);if(n.version="3.4.8",n.removed=[],!t||!t.document||t.document.nodeType!==qn||!t.Element)return n.isSupported=!1,n;let r=t.document;const i=r,s=i.currentScript;t.DocumentFragment;const a=t.HTMLTemplateElement,o=t.Node,l=t.Element,c=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const h=t.DOMParser,p=t.trustedTypes,u=l.prototype,d=wn(u,"cloneNode"),g=wn(u,"remove"),m=wn(u,"nextSibling"),f=wn(u,"childNodes"),b=wn(u,"parentNode"),x=wn(u,"shadowRoot"),k=wn(u,"attributes"),y=o&&o.prototype?wn(o.prototype,"nodeType"):null,S=o&&o.prototype?wn(o.prototype,"nodeName"):null;if("function"==typeof a){const e=r.createElement("template");e.content&&e.content.ownerDocument&&(r=e.content.ownerDocument)}let w,v="",A=0;const O=function(e){if(A>0)throw bn('The configured TRUSTED_TYPES_POLICY.createHTML must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose createHTML wraps DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');A++;try{return w.createHTML(e)}finally{A--}},E=r,N=E.implementation,T=E.createNodeIterator,R=E.createDocumentFragment,D=E.getElementsByTagName,I=i.importNode;let z={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};n.isSupported="function"==typeof Yt&&"function"==typeof b&&N&&void 0!==N.createHTMLDocument;const j=Hn,H=Un,U=Cn,C=Ln,L=Mn,M=Gn,Y=Pn,G=Jn;let P=Yn,B=null;const J=kn({},[...vn,...An,...On,...Nn,...Rn]);let Z=null;const W=kn({},[...Dn,...In,...zn,...jn]);let F=Object.seal(Ft(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),K=null,q=null;const _=Object.seal(Ft(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let V=!0,Q=!0,X=!1,$=!0,ee=!1,te=!0,ne=!1,re=!1,ie=!1,se=!1,ae=!1,oe=!1,le=!0,ce=!1;const he="user-content-";let pe=!0,ue=!1,de={},ge=null;const me=kn({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let fe=null;const be=kn({},["audio","video","img","source","image","track"]);let xe=null;const ke=kn({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ye="http://www.w3.org/1998/Math/MathML",we="http://www.w3.org/2000/svg",ve="http://www.w3.org/1999/xhtml";let Ae=ve,Oe=!1,Ee=null;const Ne=kn({},[ye,we,ve],sn);let Te=kn({},["mi","mo","mn","ms","mtext"]),Re=kn({},["annotation-xml"]);const De=kn({},["title","style","font","a","script"]);let Ie=null;const ze=["application/xhtml+xml","text/html"];let je=null,He=null;const Ue=r.createElement("form"),Ce=function(e){return e instanceof RegExp||e instanceof Function},Le=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(He&&He===e)return;e&&"object"==typeof e||(e={}),e=Sn(e),Ie=-1===ze.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,je="application/xhtml+xml"===Ie?sn:rn,B=gn(e,"ALLOWED_TAGS")&&nn(e.ALLOWED_TAGS)?kn({},e.ALLOWED_TAGS,je):J,Z=gn(e,"ALLOWED_ATTR")&&nn(e.ALLOWED_ATTR)?kn({},e.ALLOWED_ATTR,je):W,Ee=gn(e,"ALLOWED_NAMESPACES")&&nn(e.ALLOWED_NAMESPACES)?kn({},e.ALLOWED_NAMESPACES,sn):Ne,xe=gn(e,"ADD_URI_SAFE_ATTR")&&nn(e.ADD_URI_SAFE_ATTR)?kn(Sn(ke),e.ADD_URI_SAFE_ATTR,je):ke,fe=gn(e,"ADD_DATA_URI_TAGS")&&nn(e.ADD_DATA_URI_TAGS)?kn(Sn(be),e.ADD_DATA_URI_TAGS,je):be,ge=gn(e,"FORBID_CONTENTS")&&nn(e.FORBID_CONTENTS)?kn({},e.FORBID_CONTENTS,je):me,K=gn(e,"FORBID_TAGS")&&nn(e.FORBID_TAGS)?kn({},e.FORBID_TAGS,je):Sn({}),q=gn(e,"FORBID_ATTR")&&nn(e.FORBID_ATTR)?kn({},e.FORBID_ATTR,je):Sn({}),de=!!gn(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?Sn(e.USE_PROFILES):e.USE_PROFILES),V=!1!==e.ALLOW_ARIA_ATTR,Q=!1!==e.ALLOW_DATA_ATTR,X=e.ALLOW_UNKNOWN_PROTOCOLS||!1,$=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,ee=e.SAFE_FOR_TEMPLATES||!1,te=!1!==e.SAFE_FOR_XML,ne=e.WHOLE_DOCUMENT||!1,se=e.RETURN_DOM||!1,ae=e.RETURN_DOM_FRAGMENT||!1,oe=e.RETURN_TRUSTED_TYPE||!1,ie=e.FORCE_BODY||!1,le=!1!==e.SANITIZE_DOM,ce=e.SANITIZE_NAMED_PROPS||!1,pe=!1!==e.KEEP_CONTENT,ue=e.IN_PLACE||!1,P=function(e){try{return fn(e,""),!0}catch(t){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Yn,Ae="string"==typeof e.NAMESPACE?e.NAMESPACE:ve,Te=gn(e,"MATHML_TEXT_INTEGRATION_POINTS")&&e.MATHML_TEXT_INTEGRATION_POINTS&&"object"==typeof e.MATHML_TEXT_INTEGRATION_POINTS?Sn(e.MATHML_TEXT_INTEGRATION_POINTS):kn({},["mi","mo","mn","ms","mtext"]),Re=gn(e,"HTML_INTEGRATION_POINTS")&&e.HTML_INTEGRATION_POINTS&&"object"==typeof e.HTML_INTEGRATION_POINTS?Sn(e.HTML_INTEGRATION_POINTS):kn({},["annotation-xml"]);const t=gn(e,"CUSTOM_ELEMENT_HANDLING")&&e.CUSTOM_ELEMENT_HANDLING&&"object"==typeof e.CUSTOM_ELEMENT_HANDLING?Sn(e.CUSTOM_ELEMENT_HANDLING):Ft(null);if(F=Ft(null),gn(t,"tagNameCheck")&&Ce(t.tagNameCheck)&&(F.tagNameCheck=t.tagNameCheck),gn(t,"attributeNameCheck")&&Ce(t.attributeNameCheck)&&(F.attributeNameCheck=t.attributeNameCheck),gn(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(F.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),ee&&(Q=!1),ae&&(se=!0),de&&(B=kn({},Rn),Z=Ft(null),!0===de.html&&(kn(B,vn),kn(Z,Dn)),!0===de.svg&&(kn(B,An),kn(Z,In),kn(Z,jn)),!0===de.svgFilters&&(kn(B,On),kn(Z,In),kn(Z,jn)),!0===de.mathMl&&(kn(B,Nn),kn(Z,zn),kn(Z,jn))),_.tagCheck=null,_.attributeCheck=null,gn(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?_.tagCheck=e.ADD_TAGS:nn(e.ADD_TAGS)&&(B===J&&(B=Sn(B)),kn(B,e.ADD_TAGS,je))),gn(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?_.attributeCheck=e.ADD_ATTR:nn(e.ADD_ATTR)&&(Z===W&&(Z=Sn(Z)),kn(Z,e.ADD_ATTR,je))),gn(e,"ADD_URI_SAFE_ATTR")&&nn(e.ADD_URI_SAFE_ATTR)&&kn(xe,e.ADD_URI_SAFE_ATTR,je),gn(e,"FORBID_CONTENTS")&&nn(e.FORBID_CONTENTS)&&(ge===me&&(ge=Sn(ge)),kn(ge,e.FORBID_CONTENTS,je)),gn(e,"ADD_FORBID_CONTENTS")&&nn(e.ADD_FORBID_CONTENTS)&&(ge===me&&(ge=Sn(ge)),kn(ge,e.ADD_FORBID_CONTENTS,je)),pe&&(B["#text"]=!0),ne&&kn(B,["html","head","body"]),B.table&&(kn(B,["tbody"]),delete K.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw bn('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw bn('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=w;w=e.TRUSTED_TYPES_POLICY;try{v=O("")}catch(n){throw w=t,n}}else void 0===w&&null!==e.TRUSTED_TYPES_POLICY&&(w=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let n=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(n=t.getAttribute(r));const i="dompurify"+(n?"#"+n:"");try{return e.createPolicy(i,{createHTML:e=>e,createScriptURL:e=>e})}catch(Se){return null}}(p,s)),w&&"string"==typeof v&&(v=O(""));(z.uponSanitizeElement.length>0||z.uponSanitizeAttribute.length>0)&&B===J&&(B=Sn(B)),z.uponSanitizeAttribute.length>0&&Z===W&&(Z=Sn(Z)),Zt&&Zt(e),He=e},Me=kn({},[...An,...On,...En]),Ye=kn({},[...Nn,...Tn]),Ge=function(e){en(n.removed,{element:e});try{b(e).removeChild(e)}catch(Se){g(e)}},Pe=function(e,t){try{en(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(Se){en(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e)if(se||ae)try{Ge(t)}catch(Se){}else try{t.setAttribute(e,"")}catch(Se){}},Be=function(e){let t=null,n=null;if(ie)e="<remove></remove>"+e;else{const t=an(e,/^[\r\n\t ]+/);n=t&&t[0]}"application/xhtml+xml"===Ie&&Ae===ve&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const i=w?O(e):e;if(Ae===ve)try{t=(new h).parseFromString(i,Ie)}catch(Se){}if(!t||!t.documentElement){t=N.createDocument(Ae,"template",null);try{t.documentElement.innerHTML=Oe?v:i}catch(Se){}}const s=t.body||t.documentElement;return e&&n&&s.insertBefore(r.createTextNode(n),s.childNodes[0]||null),Ae===ve?D.call(t,ne?"html":"body")[0]:ne?t.documentElement:s},Je=function(e){return T.call(e.ownerDocument||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Ze=function(e){var t,n;e.normalize();const r=T.call(e.ownerDocument||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null);let i=r.nextNode();for(;i;){let e=i.data;Qt([j,H,U],t=>{e=on(e,t," ")}),i.data=e,i=r.nextNode()}const s=null!==(t=null===(n=e.querySelectorAll)||void 0===n?void 0:n.call(e,"template"))&&void 0!==t?t:[];Qt(Array.from(s),e=>{Fe(e.content)&&Ze(e.content)})},We=function(e){const t=S?S(e):null;return"string"==typeof t&&("form"===je(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==k(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==y(e)||e.childNodes!==f(e)))},Fe=function(e){if(!y||"object"!=typeof e||null===e)return!1;try{return y(e)===_n}catch(Se){return!1}},Ke=function(e){if(!y||"object"!=typeof e||null===e)return!1;try{return"number"==typeof y(e)}catch(Se){return!1}};function qe(e,t,r){Qt(e,e=>{e.call(n,t,r,He)})}const _e=function(e){let t=null;if(qe(z.beforeSanitizeElements,e,null),We(e))return Ge(e),!0;const r=je(S?S(e):e.nodeName);if(qe(z.uponSanitizeElement,e,{tagName:r,allowedTags:B}),te&&e.hasChildNodes()&&!Ke(e.firstElementChild)&&fn(/<[/\w!]/g,e.innerHTML)&&fn(/<[/\w!]/g,e.textContent))return Ge(e),!0;if(te&&e.namespaceURI===ve&&"style"===r&&Ke(e.firstElementChild))return Ge(e),!0;if(e.nodeType===Fn)return Ge(e),!0;if(te&&e.nodeType===Kn&&fn(/<[/\w]/g,e.data))return Ge(e),!0;if(K[r]||!(_.tagCheck instanceof Function&&_.tagCheck(r))&&!B[r]){if(!K[r]&&Xe(r)){if(F.tagNameCheck instanceof RegExp&&fn(F.tagNameCheck,r))return!1;if(F.tagNameCheck instanceof Function&&F.tagNameCheck(r))return!1}if(pe&&!ge[r]){const t=b(e),n=f(e);if(n&&t){for(let r=n.length-1;r>=0;--r){const i=d(n[r],!0);t.insertBefore(i,m(e))}}}return Ge(e),!0}return((y?y(e):e.nodeType)!==Zn||function(e){let t=b(e);t&&t.tagName||(t={namespaceURI:Ae,tagName:"template"});const n=rn(e.tagName),r=rn(t.tagName);return!!Ee[e.namespaceURI]&&(e.namespaceURI===we?t.namespaceURI===ve?"svg"===n:t.namespaceURI===ye?"svg"===n&&("annotation-xml"===r||Te[r]):Boolean(Me[n]):e.namespaceURI===ye?t.namespaceURI===ve?"math"===n:t.namespaceURI===we?"math"===n&&Re[r]:Boolean(Ye[n]):e.namespaceURI===ve?!(t.namespaceURI===we&&!Re[r])&&!(t.namespaceURI===ye&&!Te[r])&&!Ye[n]&&(De[n]||!Me[n]):!("application/xhtml+xml"!==Ie||!Ee[e.namespaceURI]))}(e))&&("noscript"!==r&&"noembed"!==r&&"noframes"!==r||!fn(/<\/no(script|embed|frames)/i,e.innerHTML))?(ee&&e.nodeType===Wn&&(t=e.textContent,Qt([j,H,U],e=>{t=on(t,e," ")}),e.textContent!==t&&(en(n.removed,{element:e.cloneNode()}),e.textContent=t)),qe(z.afterSanitizeElements,e,null),!1):(Ge(e),!0)},Ve=function(e,t,n){if(q[t])return!1;if(le&&("id"===t||"name"===t)&&(n in r||n in Ue))return!1;const i=Z[t]||_.attributeCheck instanceof Function&&_.attributeCheck(t,e);if(Q&&!q[t]&&fn(C,t));else if(V&&fn(L,t));else if(!i||q[t]){if(!(Xe(e)&&(F.tagNameCheck instanceof RegExp&&fn(F.tagNameCheck,e)||F.tagNameCheck instanceof Function&&F.tagNameCheck(e))&&(F.attributeNameCheck instanceof RegExp&&fn(F.attributeNameCheck,t)||F.attributeNameCheck instanceof Function&&F.attributeNameCheck(t,e))||"is"===t&&F.allowCustomizedBuiltInElements&&(F.tagNameCheck instanceof RegExp&&fn(F.tagNameCheck,n)||F.tagNameCheck instanceof Function&&F.tagNameCheck(n))))return!1}else if(xe[t]);else if(fn(P,on(n,Y,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==ln(n,"data:")||!fe[e]){if(X&&!fn(M,on(n,Y,"")));else if(n)return!1}else;return!0},Qe=kn({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Xe=function(e){return!Qe[rn(e)]&&fn(G,e)},$e=function(e){qe(z.beforeSanitizeAttributes,e,null);const t=e.attributes;if(!t||We(e))return;const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Z,forceKeepAttr:void 0};let i=t.length;for(;i--;){const s=t[i],a=s.name,o=s.namespaceURI,l=s.value,c=je(a),h=l;let u="value"===a?h:cn(h);if(r.attrName=c,r.attrValue=u,r.keepAttr=!0,r.forceKeepAttr=void 0,qe(z.uponSanitizeAttribute,e,r),u=r.attrValue,!ce||"id"!==c&&"name"!==c||0===ln(u,he)||(Pe(a,e),u=he+u),te&&fn(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,u)){Pe(a,e);continue}if("attributename"===c&&an(u,"href")){Pe(a,e);continue}if(r.forceKeepAttr)continue;if(!r.keepAttr){Pe(a,e);continue}if(!$&&fn(/\/>/i,u)){Pe(a,e);continue}ee&&Qt([j,H,U],e=>{u=on(u,e," ")});const d=je(e.nodeName);if(Ve(d,c,u)){if(w&&"object"==typeof p&&"function"==typeof p.getAttributeType)if(o);else switch(p.getAttributeType(d,c)){case"TrustedHTML":u=O(u);break;case"TrustedScriptURL":u=w.createScriptURL(u)}if(u!==h)try{o?e.setAttributeNS(o,a,u):e.setAttribute(a,u),We(e)?Ge(e):$t(n.removed)}catch(Se){Pe(a,e)}}else Pe(a,e)}qe(z.afterSanitizeAttributes,e,null)},et=function(e){let t=null;const n=Je(e);for(qe(z.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(qe(z.uponSanitizeShadowNode,t,null),_e(t),$e(t),Fe(t.content)&&et(t.content),(y?y(t):t.nodeType)===Zn){const e=x?x(t):t.shadowRoot;Fe(e)&&(tt(e),et(e))}qe(z.afterSanitizeShadowDOM,e,null)},tt=function(e){const t=y?y(e):e.nodeType;if(t===Zn){const t=x?x(e):e.shadowRoot;Fe(t)&&(tt(t),et(t))}const n=f?f(e):e.childNodes;if(!n)return;const r=[];Qt(n,e=>{en(r,e)});for(const i of r)tt(i);if(t===Zn){const t=S?S(e):null;if("string"==typeof t&&"template"===je(t)){const t=e.content;Fe(t)&&tt(t)}}};return n.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=null,s=null,a=null,o=null;if(Oe=!e,Oe&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ke(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return hn(e);case"boolean":return pn(e);case"bigint":return un?un(e):"0";case"symbol":return dn?dn(e):"Symbol()";case"undefined":default:return mn(e);case"function":case"object":{if(null===e)return mn(e);const t=e,n=wn(t,"toString");if("function"==typeof n){const e=n(t);return"string"==typeof e?e:mn(e)}return mn(e)}}}(e)))throw bn("dirty is not a string, aborting");if(!n.isSupported)return e;if(re||Le(t),n.removed=[],"string"==typeof e&&(ue=!1),ue){const t=S?S(e):e.nodeName;if("string"==typeof t){const e=je(t);if(!B[e]||K[e])throw bn("root node is forbidden and cannot be sanitized in-place")}if(We(e))throw bn("root node is clobbered and cannot be sanitized in-place");tt(e)}else if(Ke(e))r=Be("\x3c!----\x3e"),s=r.ownerDocument.importNode(e,!0),s.nodeType===Zn&&"BODY"===s.nodeName||"HTML"===s.nodeName?r=s:r.appendChild(s),tt(s);else{if(!se&&!ee&&!ne&&-1===e.indexOf("<"))return w&&oe?O(e):e;if(r=Be(e),!r)return se?null:oe?v:""}r&&ie&&Ge(r.firstChild);const l=Je(ue?e:r);for(;a=l.nextNode();)_e(a),$e(a),Fe(a.content)&&et(a.content);if(ue)return ee&&Ze(e),e;if(se){if(ee&&Ze(r),ae)for(o=R.call(r.ownerDocument);r.firstChild;)o.appendChild(r.firstChild);else o=r;return(Z.shadowroot||Z.shadowrootmode)&&(o=I.call(i,o,!0)),o}let c=ne?r.outerHTML:r.innerHTML;return ne&&B["!doctype"]&&r.ownerDocument&&r.ownerDocument.doctype&&r.ownerDocument.doctype.name&&fn(Bn,r.ownerDocument.doctype.name)&&(c="<!DOCTYPE "+r.ownerDocument.doctype.name+">\n"+c),ee&&Qt([j,H,U],e=>{c=on(c,e," ")}),w&&oe?O(c):c},n.setConfig=function(){Le(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),re=!0},n.clearConfig=function(){He=null,re=!1},n.isValidAttribute=function(e,t,n){return He||Le({}),Ve(je(e),je(t),n)},n.addHook=function(e,t){"function"==typeof t&&en(z[e],t)},n.removeHook=function(e,t){if(void 0!==t){const n=Xt(z[e],t);return-1===n?void 0:tn(z[e],n,1)[0]}return $t(z[e])},n.removeHooks=function(e){z[e]=[]},n.removeAllHooks=function(){z={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},n}();function Xn(e){const t={backendUrl:e.backendUrl||"",apiKey:e.apiKey||"",agentId:e.agentId,primaryColor:e.primaryColor,backgroundColor:e.backgroundColor,textColor:e.textColor,agentName:e.agentName||"Assistant",logo:e.logo,mode:e.mode||"launcher",includeCitations:e.includeCitations??!1};if(!t.backendUrl||!t.apiKey)throw new Error("backendUrl and apiKey are required for the widget to function");return t}var $n=s`
  ${s`
  :host {
    /* Base Colors - Aligned with web/src/app/css/colors.css */
    --grey-100: #000000;
    --grey-10: #e6e6e6;
    --grey-00: #ffffff;
    --alpha-grey-100-75: #000000bf;
    --alpha-grey-100-20: #00000033;

    /* Onyx Brand Colors */
    --onyx-ink-100: #000000;
    --onyx-ink-95: #1c1c1c;

    /* Theme / Primary - Configurable via env vars */
    --theme-primary-06: var(--onyx-ink-100);
    --theme-primary-05: var(--onyx-ink-95);

    /* Background / Neutral */
    --background-neutral-00: var(--grey-00);
    --background-neutral-03: var(--grey-10);

    /* Text */
    --text-04: var(--alpha-grey-100-75);
    --text-light-05: var(--grey-00);

    /* Border */
    --border-01: var(--alpha-grey-100-20);

    /* Shadow */
    --shadow-02: 0px 2px 12px rgba(0, 0, 0, 0.1);

    /* Status / Error */
    --status-error-01: #fee;
    --status-error-05: #c00;

      /* Message Bubbles */
    --onyx-user-message-bg: var(--background-neutral-03);
    --onyx-assistant-message-bg: #bee0ff;
  }
`}

  :host {
    /* Typography - Hanken Grotesk */
    --onyx-font-family:
      "Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI",
      sans-serif;
    --onyx-font-family-mono: "DM Mono", "Monaco", "Menlo", monospace;

    /* Font Sizes */
    --onyx-font-size-small: 10px;
    --onyx-font-size-secondary: 12px;
    --onyx-font-size-sm: 13px;
    --onyx-font-size-main: 14px;
    --onyx-font-size-label: 16px;

    /* Line Heights */
    --onyx-line-height-small: 12px;
    --onyx-line-height-secondary: 16px;
    --onyx-line-height-main: 20px;
    --onyx-line-height-label: 24px;
    --onyx-line-height-section: 28px;
    --onyx-line-height-headline: 36px;

    /* Font Weights */
    --onyx-weight-regular: 400;
    --onyx-weight-medium: 500;
    --onyx-weight-semibold: 600;

    /* Content Heights */
    --onyx-height-content-secondary: 12px;
    --onyx-height-content-main: 16px;
    --onyx-height-content-label: 18px;
    --onyx-height-content-section: 24px;

    /* Border Radius - from Figma */
    --onyx-radius-04: 4px;
    --onyx-radius-08: 8px;
    --onyx-radius-12: 12px;
    --onyx-radius-16: 16px;
    --onyx-radius-round: 1000px;

    /* Spacing - Block */
    --onyx-space-block-1x: 4px;
    --onyx-space-block-2x: 8px;
    --onyx-space-block-3x: 12px;
    --onyx-space-block-4x: 16px;
    --onyx-space-block-6x: 24px;

    /* Spacing - Inline */
    --onyx-space-inline-0: 0px;
    --onyx-space-inline-0_5x: 2px;
    --onyx-space-inline-1x: 4px;

    /* Legacy spacing aliases (for compatibility) */
    --onyx-space-2xs: var(--onyx-space-block-1x);
    --onyx-space-xs: var(--onyx-space-block-2x);
    --onyx-space-sm: var(--onyx-space-block-3x);
    --onyx-space-md: var(--onyx-space-block-4x);
    --onyx-space-lg: var(--onyx-space-block-6x);

    /* Padding */
    --onyx-padding-icon-0: 0px;
    --onyx-padding-icon-0_5x: 2px;
    --onyx-padding-text-0_5x: 2px;
    --onyx-padding-text-1x: 4px;

    /* Icon Weights (stroke-width) */
    --onyx-icon-weight-secondary: 1px;
    --onyx-icon-weight-main: 1.5px;
    --onyx-icon-weight-section: 2px;

    /* Z-index */
    --onyx-z-launcher: 9999;
    --onyx-z-widget: 10000;

    /* Transitions */
    --onyx-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --onyx-transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  * {
    box-sizing: border-box;
  }
`,er=s`
  :host {
    display: block;
    font-family: var(--onyx-font-family);
  }

  .launcher {
    position: fixed;
    background: var(--background-neutral-00);
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    color: var(--text-light-05);
    border: none;
    cursor: pointer;
    box-shadow: var(--shadow-02);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--onyx-z-launcher);
    transition:
      transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
      background 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .launcher img {
    filter: drop-shadow(0px 1px 2px rgba(255, 255, 255, 0.3));
  }

  .launcher:hover {
    transform: translateY(-2px);
    background: var(--background-neutral-03);
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.2);
  }

  .launcher:active {
    transform: translateY(0px);
    box-shadow: var(--shadow-02);
  }

  .container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    height: 600px;
    background: var(--background-neutral-00);
    border-radius: var(--onyx-radius-16);
    box-shadow: var(--shadow-02);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: var(--onyx-z-widget);
    // border: 1px solid var(--border-01);
    animation: fadeInSlideUp 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
    opacity: 0;
    transform: translateY(20px);
    // gap: 10px;
  }

  @keyframes fadeInSlideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .container.inline {
    position: static;
    width: 100%;
    height: 100%;
    border-radius: var(--onyx-radius-08);
    animation: none;
    opacity: 1;
    transform: none;
  }

  .container.inline.compact {
    background: transparent;
    border: none;
    // box-shadow: none;    
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: var(--onyx-radius-16);
  }

  @media (max-width: 768px) {
    .container:not(.inline) {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      border-radius: 0;
      bottom: 0;
      right: 0;
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--onyx-space-md);
    background: var(--background-neutral-00);
    color: var(--text-04);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: var(--onyx-space-sm);
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: var(--onyx-space-xs);
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--background-neutral-00);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  }

  .header-title {
    font-weight: bold;
    font-size: var(--onyx-font-size-label);
    line-height: var(--onyx-line-height-label);
    color: var(--text-04);
  }

  .icon-button {
    background: none;
    border: none;
    color: var(--text-04);
    cursor: pointer;
    padding: var(--onyx-space-xs);
    border-radius: var(--onyx-radius-08);
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background var(--onyx-transition-fast),
      color var(--onyx-transition-fast);
    font-size: 18px;
    width: 32px;
    height: 32px;
  }

  .material-symbols-outlined {
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    font-size: 18px;
    line-height: 1;
    display: inline-block;
    vertical-align: middle;
    user-select: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  .icon-button .material-symbols-outlined,
  .send-button .material-symbols-outlined {
    font-size: 16px;
  }

  .lucide-icon {
    display: inline-flex;
    width: 1em;
    height: 1em;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  .icon-button:hover {
    background: var(--background-neutral-00);
    color: var(--text-04);
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: var(--onyx-space-md);
    display: flex;
    flex-direction: column;
    gap: var(--onyx-space-md);
    background: var(--background-neutral-00);
    border-radius: var(--onyx-radius-12) var(--onyx-radius-12);
  }

  /* Empty-state welcome placeholder */
  .empty-welcome {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: var(--onyx-space-md);
    padding: 40px 20px;
    color: var(--text-04);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    pointer-events: none; /* decorative only */
    transition: opacity 320ms cubic-bezier(0.4,0,0.2,1), transform 320ms cubic-bezier(0.4,0,0.2,1);
  }

  .empty-welcome__logo {
    width: 84px;
    height: 84px;
    border-radius: 50%;
    // background: linear-gradient(135deg, var(--theme-primary-05), var(--theme-primary-06));
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-02);
    color: var(--text-light-05);
    font-size: 28px;
    flex-shrink: 0;
  }

  .empty-welcome__title {
    font-size: 20px;
    font-weight: 700;
    line-height: 1.1;
  }

  .empty-welcome__subtitle {
    font-size: 14px;
    opacity: 0.85;
    max-width: 320px;
  }

  .empty-welcome--hide {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
    pointer-events: none;
  }


  .message {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-space-xs);
  }

  .message.user {
    align-items: flex-end;
  }

  .message.assistant {
    align-items: flex-start;
  }

  .message-bubble {
    max-width: 85%;
    padding: var(--onyx-space-sm) var(--onyx-space-md);
    // border-radius: var(--onyx-radius-12);
    word-wrap: break-word;
    font-size: var(--onyx-font-size-main);
    line-height: var(--onyx-line-height-main);
  }

  .message.user .message-bubble {
    background: var(--onyx-user-message-bg);
    color: var(--text-04);
    border-radius: var(--onyx-radius-12) var(--onyx-radius-12) 0;
    // border: 1px solid var(--border-01);
  }

  .message.assistant .message-bubble {
    background: var(--onyx-assistant-message-bg);
    color: var(--text-04);
    border-radius: var(--onyx-radius-12) var(--onyx-radius-12) var(--onyx-radius-12) 0 ;
    // border: 1px solid var(--border-01);
  }

  /* Markdown styles */
  .message-bubble :first-child {
    margin-top: 0;
  }

  .message-bubble :last-child {
    margin-bottom: 0;
  }

  .message-bubble p {
    margin: 0.5em 0;
  }

  .message-bubble code {
    background: rgba(0, 0, 0, 0.08);
    padding: 2px 4px;
    border-radius: 3px;
    font-family: "Monaco", "Courier New", monospace;
    font-size: 0.9em;
  }

  .message-bubble pre {
    background: rgba(0, 0, 0, 0.08);
    padding: var(--onyx-space-sm);
    border-radius: var(--onyx-radius-sm);
    overflow-x: auto;
    margin: 0.5em 0;
  }

  .message-bubble pre code {
    background: none;
    padding: 0;
  }

  .message-bubble ul,
  .message-bubble ol {
    margin: 0.5em 0;
    padding-left: 1.5em;
  }

  .message-bubble li {
    margin: 0.25em 0;
  }

  .message-bubble a {
    color: var(--theme-primary-05);
    text-decoration: underline;
  }

  .message-bubble a:hover {
    text-decoration: none;
  }

  .message-bubble h1,
  .message-bubble h2,
  .message-bubble h3,
  .message-bubble h4,
  .message-bubble h5,
  .message-bubble h6 {
    margin: 0.5em 0 0.25em 0;
    font-weight: 600;
  }

  .message-bubble h1 {
    font-size: 1.5em;
  }
  .message-bubble h2 {
    font-size: 1.3em;
  }
  .message-bubble h3 {
    font-size: 1.1em;
  }

  .message-bubble blockquote {
    border-left: 3px solid var(--border-01);
    margin: 0.5em 0;
    padding-left: var(--onyx-space-md);
    color: var(--text-04);
  }

  .message-bubble strong {
    font-weight: 600;
  }

  .message-bubble em {
    font-style: italic;
  }

  .message-bubble hr {
    border: none;
    border-top: 1px solid var(--border-01);
    margin: 0.5em 0;
  }

  .status-container {
    display: flex;
    align-items: center;
    gap: var(--onyx-space-sm);
  }

  .typing-indicator {
    display: flex;
    gap: 4px;
  }

  .typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--text-04);
    animation: typing 1.4s infinite;
  }

  .typing-dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .typing-dot:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      opacity: 0.3;
      transform: translateY(0);
    }
    30% {
      opacity: 1;
      transform: translateY(-4px);
    }
  }

  .status-text {
    color: var(--text-04);
    font-size: var(--onyx-font-size-sm);
    font-style: italic;
  }

  .input-wrapper {
    // border-top: 1px solid var(--border-01);
    background: var(--background-neutral-00);
  }

  .input-container {
    padding: var(--onyx-space-md) var(--onyx-space-md) 4px;
    display: flex;
    align-items: center;
    gap: var(--onyx-space-xs);
  }

  .input {
    flex: 1;
    min-width: 0;
    padding: var(--onyx-space-xs) var(--onyx-space-sm);
    border: 0px solid var(--theme-primary-05);
    border-radius: var(--onyx-radius-12);
    font-size: var(--onyx-font-size-main);
    line-height: var(--onyx-line-height-main);
    outline: none;
    font-family: var(--onyx-font-family);
    background: var(--background-neutral-03);
    color: var(--text-04);
    transition:
      border-color var(--onyx-transition-fast),
      box-shadow var(--onyx-transition-fast);
    height: 36px;
  }

  .input:focus {
    border-color: var(--theme-primary-05);
    outline: 2px solid var(--theme-primary-05);
    outline-offset: -2px;
  }

  .powered-by {
    font-size: 10px;
    color: var(--text-04);
    opacity: 0.5;
    text-align: center;
    padding: 0 var(--onyx-space-md) var(--onyx-space-xs);
  }

  .powered-by a {
    color: var(--text-04);
    text-decoration: none;
    transition: opacity var(--onyx-transition-fast);
  }

  .powered-by a:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  .send-button {
    background: var(--theme-primary-05);
    border: none;
    color: var(--text-light-05);
    cursor: pointer;
    padding: var(--onyx-space-sm);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      background var(--onyx-transition-fast),
      transform var(--onyx-transition-fast);
    flex-shrink: 0;
    width: 36px;
    height: 36px;
  }

  .send-button svg {
    width: 18px;
    height: 18px;
  }

  .send-button:hover:not(:disabled) {
    background: var(--theme-primary-06);
    transform: scale(1.05);
  }

  .send-button:active:not(:disabled) {
    transform: scale(0.95);
  }

  .send-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .disclaimer {
    padding: var(--onyx-space-xs) var(--onyx-space-md);
    background: var(--background-neutral-00);
    color: var(--text-04);
    font-size: 11px;
    line-height: 1.3;
    text-align: center;
    // border-bottom: 1px solid var(--border-01);
    margin-bottom: var(--onyx-space-md);
  }

  .error {
    padding: var(--onyx-space-md);
    background: var(--status-error-01);
    color: var(--status-error-05);
    border-radius: var(--onyx-radius-08);
    margin: var(--onyx-space-md);
    font-size: var(--onyx-font-size-main);
  }

  /* Compact inline mode (no messages) */
  .container.compact {
    height: auto;
    min-height: unset;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .compact-input-container {
    display: flex;
    align-items: center;
    gap: var(--onyx-space-sm);
    padding: var(--onyx-space-md);
    background: var(--background-neutral-00);
    border-radius: var(--onyx-radius-16);
    // border: 1px solid var(--border-01);
    box-shadow: var(--shadow-02);
    transition:
      border-color var(--onyx-transition-base),
      box-shadow var(--onyx-transition-base);
  }

  .compact-input-container:focus-within {
    border-color: var(--text-04);
    box-shadow:
      var(--shadow-02),
      0 0 0 3px var(--background-neutral-00);
  }

  .compact-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--background-neutral-00);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--text-light-05);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }

  .compact-input {
    flex: 1;
    min-width: 0;
    padding: var(--onyx-space-sm);
    border: none;
    font-size: var(--onyx-font-size-label);
    line-height: var(--onyx-line-height-label);
    outline: none;
    font-family: var(--onyx-font-family);
    background: transparent;
    color: var(--text-04);
    font-weight: 500;
  }

  .compact-input::placeholder {
    color: var(--text-04);
    font-weight: 400;
  }

  /* Inline citation superscripts */
  .message-bubble sup {
    font-size: 0.65em;
    color: var(--theme-primary-05);
    font-weight: 700;
    opacity: 0.5;
    cursor: default;
    letter-spacing: -0.02em;
  }

  /* Citation source row */
  .citation-list {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    gap: 6px;
    margin-top: 10px;
  }

  .citation-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px 4px 8px;
    border-radius: var(--onyx-radius-08);
    background: var(--background-neutral-00);
    color: var(--text-04);
    text-decoration: none;
    cursor: pointer;
    border: 1px solid var(--border-01);
    transition:
      border-color 150ms ease,
      background 150ms ease;
    line-height: 1.2;
    font-family: var(--onyx-font-family);
  }

  .citation-badge .citation-num {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-04);
    opacity: 0.45;
    flex-shrink: 0;
  }

  .citation-badge .citation-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
    font-size: 11px;
    opacity: 0.8;
    text-decoration: none;
  }

  a.citation-badge,
  a.citation-badge:visited,
  a.citation-badge:active,
  a.citation-badge:hover {
    text-decoration: none !important;
  }

  a.citation-badge:hover {
    border-color: var(--theme-primary-05);
    background: var(--background-neutral-03);
  }

  span.citation-badge {
    cursor: default;
  }

  .citation-more {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: var(--onyx-radius-08);
    background: none;
    color: var(--text-04);
    opacity: 0.6;
    border: 1px dashed var(--border-01);
    cursor: pointer;
    font-family: var(--onyx-font-family);
    transition:
      opacity 150ms ease,
      border-color 150ms ease;
  }

  .citation-more:hover {
    opacity: 1;
    border-color: var(--theme-primary-05);
  }

  .citation-list.expanded .citation-more {
    display: none;
  }

  .citation-overflow {
    display: none;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
  }

  .citation-list.expanded .citation-overflow {
    display: flex;
  }
`,tr=class{constructor(e,t){this.backendUrl=e,this.apiKey=t,this.maxRetries=3,this.retryDelay=1e3}async createChatSession(e){const t={};void 0!==e&&(t.persona_id=e);const n=await this.fetchWithRetry(`${this.backendUrl}/chat/create-chat-session`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t)});if(!n.ok){let e=n.statusText;try{const t=await n.json();t.detail&&(e=t.detail)}catch{}throw new Error(e)}return(await n.json()).chat_session_id}async*streamMessage(e){const t={message:e.message,chat_session_id:e.chatSessionId,parent_message_id:e.parentMessageId??null,origin:"widget",include_citations:e.includeCitations??!1},n=await this.fetchWithRetry(`${this.backendUrl}/chat/send-chat-message`,{method:"POST",headers:this.getHeaders(),body:JSON.stringify(t),signal:e.signal});if(!n.ok){let e=n.statusText;try{const t=await n.json();t.detail&&(e=t.detail)}catch{}throw new Error(e)}yield*this.parseSSEStream(n)}async*parseSSEStream(e){const t=e.body?.getReader();if(!t)throw new Error("Response body is not readable");const n=new TextDecoder;let r="";try{for(;;){const{done:e,value:i}=await t.read();if(e)break;r+=n.decode(i,{stream:!0});const s=r.split("\n");r=s.pop()||"";for(const t of s)if(t.trim())try{const e=JSON.parse(t);"user_message_id"in e&&"reserved_assistant_message_id"in e?yield{obj:e}:yield e}catch(fe){throw new Error(`Failed to parse SSE packet: ${t}. Error: ${fe}`)}}if(r.trim())try{const e=JSON.parse(r);"user_message_id"in e&&"reserved_assistant_message_id"in e?yield{obj:e}:yield e}catch(fe){throw new Error(`Failed to parse final packet: ${r}. Error: ${fe}`)}}finally{t.releaseLock()}}async fetchWithRetry(e,t,n=0){try{const r=await fetch(e,t);if(!r.ok&&n<this.maxRetries&&r.status>=500){const r=this.retryDelay*Math.pow(2,n);return await new Promise(e=>setTimeout(e,r)),this.fetchWithRetry(e,t,n+1)}return r}catch(r){if(r instanceof Error&&"AbortError"===r.name)throw r;if(n<this.maxRetries){const r=this.retryDelay*Math.pow(2,n);return await new Promise(e=>setTimeout(e,r)),this.fetchWithRetry(e,t,n+1)}throw r}}getHeaders(){return{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`}}};function nr(e,t){if(!e||!e.obj)throw new Error("Received malformed packet: packet.obj is missing");const n=e.obj;if("reserved_assistant_message_id"in n&&"user_message_id"in n)return{message:t,messageIds:{userMessageId:n.user_message_id,assistantMessageId:n.reserved_assistant_message_id}};if(!("type"in n))throw new Error("Packet missing type field");switch(n.type){case"message_start":return{message:{id:`msg-${Date.now()}`,role:"assistant",content:"",timestamp:Date.now(),isStreaming:!0},status:""};case"message_delta":return t&&"assistant"===t.role?{message:{...t,content:t.content+(n.content||"")}}:{message:t};case"citation_info":return{message:t,citation:{citation_number:n.citation_number,document_id:n.document_id}};case"search_tool_start":return{message:t,status:n.is_internet_search?"Searching the web...":"Searching internally..."};case"search_tool_queries_delta":return{message:t,status:"Generating search queries..."};case"search_tool_documents_delta":return{message:t,documents:n.documents,status:"Reading documents..."};case"open_url_start":return{message:t,status:"Opening URLs..."};case"open_url_urls":return{message:t,status:"Fetching web pages..."};case"open_url_documents":return{message:t,documents:n.documents,status:"Processing web content..."};case"image_generation_start":case"image_generation_heartbeat":return{message:t,status:"Generating image..."};case"python_tool_start":case"python_tool_delta":return{message:t,status:"Running Python code..."};case"custom_tool_start":return{message:t,status:"Running custom tool..."};case"reasoning_start":case"reasoning_delta":return{message:t,status:"Thinking..."};case"deep_research_plan_start":return{message:t,status:"Planning research..."};case"research_agent_start":return{message:t,status:"Researching..."};case"intermediate_report_start":return{message:t,status:"Generating report..."};case"stop":case"overall_stop":return t?{message:{...t,isStreaming:!1}}:{message:t};case"error":throw new Error(`Stream error: ${n.exception}`);default:return{message:t}}}var rr="onyx-widget-session";function ir(e,t){try{const n={sessionId:e,messages:t,timestamp:Date.now()};sessionStorage.setItem(rr,JSON.stringify(n))}catch(fe){}}function sr(){try{sessionStorage.removeItem(rr)}catch(fe){}}var ar;function or(e,t,n,r){var i,s=arguments.length,a=s<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(a=(s<3?i(a):s>3?i(t,n,a):i(t,n))||a);return s>3&&a&&Object.defineProperty(t,n,a),a}var lr=class extends le{static{ar=this}static{this.styles=[$n,er]}constructor(){super(),this.isOpen=!1,this.messages=[],this.isLoading=!1,this.isStreaming=!1,this.streamingStatus="",this.inputValue="",this.showEmptyPlaceholder=!1,this.showEmptyHiding=!1,this.documentMap=/* @__PURE__ */new Map,this.citationMap=/* @__PURE__ */new Map,this.lucideSvgCache=/* @__PURE__ */new Map,Ct.setOptions({breaks:!0,gfm:!0})}updated(e){super.updated(e),(e.has("messages")||e.has("isStreaming"))&&this.scrollToBottom(),this.loadLucideIcons()}async fetchLucideSvg(e){if(this.lucideSvgCache.has(e))return this.lucideSvgCache.get(e);const t=`https://cdn.jsdelivr.net/gh/lucide-icons/lucide@latest/icons/${e}.svg`;try{const n=await fetch(t);if(!n.ok)return null;let r=await n.text();return r=r.replace(/<\?xml.*?\?>\s*/i,""),r=r.replace(/width=\"[^"]*\"/i,'width="1em"'),r=r.replace(/height=\"[^"]*\"/i,'height="1em"'),r=r.replace(/stroke=\"none\"/gi,""),this.lucideSvgCache.set(e,r),r}catch(fe){return null}}async loadLucideIcons(){if(!this.shadowRoot)return;const e=Array.from(this.shadowRoot.querySelectorAll(".lucide-icon[data-icon]"));await Promise.all(e.map(async e=>{const t=e.getAttribute("data-icon");if(!t)return;if("1"===e.dataset.loaded)return;const n=await this.fetchLucideSvg(t);if(n){e.innerHTML=n;const t=e.querySelector("svg");t&&(t.setAttribute("width","1em"),t.setAttribute("height","1em"),t.style.verticalAlign="middle",t.setAttribute("stroke","currentColor"),t.setAttribute("fill","none")),e.dataset.loaded="1"}}))}scrollToBottom(){requestAnimationFrame(()=>{const e=this.shadowRoot?.querySelector(".messages");e&&(e.scrollTop=e.scrollHeight)})}connectedCallback(){super.connectedCallback();try{const e="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined";if(!document.querySelector(`link[href="${e}"]`)){const t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}}catch(fe){}try{this.config=Xn({backendUrl:this.backendUrl,apiKey:this.apiKey,agentId:this.agentId,primaryColor:this.primaryColor,backgroundColor:this.backgroundColor,textColor:this.textColor,agentName:this.agentName,logo:this.logo,mode:this.mode,includeCitations:this.includeCitations})}catch(t){this.error=t?.message||"Invalid widget configuration",this.config=Xn({backendUrl:this.backendUrl||"",apiKey:this.apiKey||"",agentId:this.agentId,primaryColor:this.primaryColor,backgroundColor:this.backgroundColor,textColor:this.textColor,agentName:this.agentName,logo:this.logo,mode:this.mode||"launcher",includeCitations:this.includeCitations})}this.applyCustomColors(),this.apiService=new tr(this.config.backendUrl,this.config.apiKey);const e=function(){try{const e=sessionStorage.getItem(rr);if(!e)return null;const t=JSON.parse(e);return Date.now()-t.timestamp>864e5?(sr(),null):t}catch(fe){return null}}();e&&(this.chatSessionId=e.sessionId,this.messages=e.messages),this.showEmptyPlaceholder=0===this.messages.length,"inline"===this.config.mode&&(this.isOpen=!0)}applyCustomColors(){this.config.primaryColor&&(this.style.setProperty("--theme-primary-05",this.config.primaryColor),this.style.setProperty("--theme-primary-06",this.adjustBrightness(this.config.primaryColor,-10))),this.config.backgroundColor&&(this.style.setProperty("--background-neutral-00",this.config.backgroundColor),this.style.setProperty("--background-neutral-03",this.adjustBrightness(this.config.backgroundColor,-10))),this.config.textColor&&this.style.setProperty("--text-04",this.config.textColor)}adjustBrightness(e,t){const n=parseInt(e.replace("#",""),16),r=Math.round(2.55*t),i=(n>>16)+r,s=(n>>8&255)+r,a=(255&n)+r;return"#"+(16777216+65536*(i<255?i<1?0:i:255)+256*(s<255?s<1?0:s:255)+(a<255?a<1?0:a:255)).toString(16).slice(1)}resetConversation(){this.abortController&&(this.abortController.abort(),this.abortController=void 0),this.messages=[],this.chatSessionId=void 0,this.error=void 0,this.inputValue="",this.isStreaming=!1,this.isLoading=!1,this.streamingStatus="",this.documentMap.clear(),this.citationMap.clear(),sr(),this.showEmptyPlaceholder=!0}renderMarkdown(e,t){try{let n=e;if(this.config.includeCitations)if(t?.length){const e=/* @__PURE__ */new Map;t.forEach((t,n)=>e.set(t.citation_number,n+1)),n=n.replace(/\[\[(\d+)\]\]\([^)]*\)/g,(t,n)=>{const r=e.get(Number(n));return r?`<sup>[${r}]</sup>`:""})}else n=n.replace(/\[\[(\d+)\]\]\([^)]*\)/g,"");const r=Ct.parse(n,{async:!1});return be(Qn.sanitize(r,{ADD_TAGS:["sup"]}))}catch(n){return e}}static{this.CITATIONS_COLLAPSED_COUNT=1}renderCitationBadge(e,t){const n=e.semantic_identifier||"Source",r=e.link&&/^https?:\/\//i.test(e.link)?e.link:void 0;return r?Z`<a
          class="citation-badge"
          href=${r}
          target="_blank"
          rel="noopener noreferrer"
          title=${n}
          ><span class="citation-num">${t}</span
          ><span class="citation-title">${n}</span></a
        >`:Z`<span class="citation-badge" title=${n}
          ><span class="citation-num">${t}</span
          ><span class="citation-title">${n}</span></span
        >`}toggleCitationExpand(e){const t=e.target.closest(".citation-list");t&&t.classList.toggle("expanded")}renderCitations(e){if(!e?.length)return"";const t=ar.CITATIONS_COLLAPSED_COUNT,n=e.slice(0,t),r=e.slice(t);return Z`
      <div class="citation-list">
        ${n.map((e,t)=>this.renderCitationBadge(e,t+1))}
        ${r.length>0?Z`
              <button class="citation-more" @click=${this.toggleCitationExpand}>
                +${r.length} more
              </button>
              <div class="citation-overflow">
                ${r.map((e,n)=>this.renderCitationBadge(e,t+n+1))}
              </div>
            `:""}
      </div>
    `}toggleOpen(){this.isOpen=!this.isOpen}close(){"launcher"===this.config.mode&&(this.isOpen=!1)}handleInput(e){this.inputValue=e.target.value}handleKeyDown(e){"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this.sendMessage())}async sendMessage(){const e=this.inputValue.trim();if(!e||this.isLoading||this.isStreaming)return;this.inputValue="",this.showEmptyPlaceholder&&(this.showEmptyHiding=!0,setTimeout(()=>{this.showEmptyPlaceholder=!1,this.showEmptyHiding=!1},360));const t={id:`msg-${Date.now()}`,role:"user",content:e,timestamp:Date.now()};this.messages=[...this.messages,t];try{this.isStreaming=!0,this.error=void 0,this.chatSessionId||(this.isLoading=!0,this.chatSessionId=await this.apiService.createChatSession(this.config.agentId),this.isLoading=!1);const n=[...this.messages].reverse().find(e=>"assistant"===e.role&&"number"==typeof e.id),r=n&&"number"==typeof n.id?n.id:null;this.abortController=new AbortController;let i=null,s=null;for await(const a of this.apiService.streamMessage({message:e,chatSessionId:this.chatSessionId,parentMessageId:r,signal:this.abortController.signal,includeCitations:this.config.includeCitations})){const e=nr(a,i);if(e.messageIds){if(null!==e.messageIds.userMessageId){const n=this.messages.findIndex(e=>e.id===t.id);if(n>=0){const t={...this.messages[n],id:e.messageIds.userMessageId};this.messages=[...this.messages.slice(0,n),t,...this.messages.slice(n+1)]}}s=e.messageIds.assistantMessageId}if(void 0!==e.status&&(this.streamingStatus=e.status),e.documents)for(const t of e.documents)this.documentMap.set(t.document_id,t);if(e.citation&&this.citationMap.set(e.citation.citation_number,e.citation.document_id),e.message){if(e.message.isStreaming&&""===e.message.content&&null===i&&this.citationMap.clear(),i=e.message,null!==s&&"number"!=typeof i.id&&(i.id=s),!i.isStreaming&&this.citationMap.size>0){const e=[];for(const[t,n]of this.citationMap){const r=this.documentMap.get(n);e.push({citation_number:t,document_id:n,semantic_identifier:r?.semantic_identifier,link:r?.link??void 0})}e.sort((e,t)=>e.citation_number-t.citation_number),i={...i,citations:e}}const t=this.messages.findIndex(e=>e.id===i?.id);this.messages=t>=0?[...this.messages.slice(0,t),i,...this.messages.slice(t+1)]:[...this.messages,i],i.isStreaming||(this.isStreaming=!1,this.streamingStatus="",ir(this.chatSessionId,this.messages))}}}catch(n){"AbortError"!==n.name&&(this.error=n.message||"Failed to send message")}finally{this.isStreaming=!1,this.isLoading=!1,this.streamingStatus="",this.abortController=void 0}}render(){const e="inline"===this.config.mode||this.isOpen,t=this.messages.length>0||this.isStreaming,n="inline"===this.config.mode&&!t;return Z`
      ${"launcher"===this.config.mode?Z`
            <button
              class="launcher"
              @click=${this.toggleOpen}
              title="Open chat"
            >
              <img
                src="${this.config.logo||"data:image/png;base64,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"}"
                alt="Logo"
                style="width: 32px; height: 32px; object-fit: contain;"
              />
            </button>
          `:""}
      ${e?Z`
            <div
              class="container ${"inline"===this.config.mode?"inline":""} ${n?"compact":""}"
            >
              ${n?this.renderCompactInput():Z`
                    ${this.renderHeader()} ${this.renderMessages()}
                    ${this.renderInput()}
                  `}
            </div>
          `:""}
    `}renderHeader(){return Z`
      <div class="header">
        <div class="header-left">
          <div class="avatar">
            <img
              src="${this.config.logo||"data:image/png;base64,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"}"
              alt="Logo"
              style="width: 100%; height: 100%; object-fit: contain;"
            />
          </div>
          <div class="header-title">
            ${this.config.agentName||"Assistant Test"}
          </div>
        </div>
        <div class="header-right">
          <button
            class="icon-button"
            @click=${this.resetConversation}
            title="Reset conversation"
            aria-label="Reset conversation"
          >
            <span class="lucide-icon" data-icon="refresh-cw" aria-hidden="true"></span>
          </button>
          ${"launcher"===this.config.mode?Z`
                <button class="icon-button" @click=${this.close} title="Close" aria-label="Close">
                  <span class="lucide-icon" data-icon="x" aria-hidden="true"></span>
                </button>
              `:""}
        </div>
      </div>
    `}renderMessages(){const e=this.messages.some(e=>"assistant"===e.role&&e.isStreaming&&e.content.length>0),t=this.isStreaming&&(this.streamingStatus||!e);return Z`
      
      <div class="messages">
        ${this.showEmptyPlaceholder||0===this.messages.length&&!this.isStreaming?Z`
              <div
                class="empty-welcome ${this.showEmptyHiding?"empty-welcome--hide":""}"
                aria-hidden=${this.messages.length>0}
              >
                <div class="empty-welcome__logo">
                  <img
                    src="${this.config.logo||"data:image/png;base64,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"}"
                    alt=""
                    style="width:56px;height:56px;object-fit:contain;border-radius:50%"
                  />
                </div>
                <div class="empty-welcome__title">Hi there, ${"I'm "+this.config.agentName||"Assistant"}</div>
                <div class="empty-welcome__subtitle">How can I help you today?</div>
              </div>
            `:""}
        ${this.error?Z` <div class="error">${this.error}</div> `:""}
        ${this.messages.map(e=>Z`
            <div class="message ${e.role}">
              <div class="message-bubble">
                ${"assistant"===e.role?Z`${this.renderMarkdown(e.content,e.citations)}${this.renderCitations(e.citations)}`:e.content}
              </div>
            </div>
          `)}
        ${t?Z`
              <div class="message assistant">
                <div class="message-bubble">
                  <div class="status-container">
                    <div class="typing-indicator">
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                      <div class="typing-dot"></div>
                    </div>
                    ${this.streamingStatus?Z`
                          <span class="status-text"
                            >${this.streamingStatus}</span
                          >
                        `:""}
                  </div>
                </div>
              </div>
            `:""}
      </div>
    `}renderInput(){return Z`
      <div class="input-wrapper">
        <div class="input-container">
          <input
            class="input"
            type="text"
            .value=${this.inputValue}
            @input=${this.handleInput}
            @keydown=${this.handleKeyDown}
            placeholder="Type your message..."
            ?disabled=${this.isLoading||this.isStreaming}
          />
          <button
            class="send-button"
            @click=${this.sendMessage}
            ?disabled=${!this.inputValue.trim()||this.isLoading||this.isStreaming}
            title="Send message"
            aria-label="Send message"
          >
            <span class="lucide-icon" data-icon="send" aria-hidden="true"></span>
          </button>
        </div>
        <div class="disclaimer">
          Responses are generated by AI and may be inaccurate.
        </div>
      </div>
    `}renderCompactInput(){return Z`
      <div class="compact-input-container">
        <div class="compact-avatar">
          <img
            src="${this.config.logo||"data:image/png;base64,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"}"
            alt="Logo"
            style="width: 100%; height: 100%; object-fit: contain;"
          />
        </div>
        <input
          class="compact-input"
          type="text"
          .value=${this.inputValue}
          @input=${this.handleInput}
          @keydown=${this.handleKeyDown}
          placeholder="Type to ask ${this.config.agentName||"Assistant"} anything..."
          ?disabled=${this.isLoading||this.isStreaming}
        />
        <button
          class="send-button"
          @click=${this.sendMessage}
          ?disabled=${!this.inputValue.trim()||this.isLoading||this.isStreaming}
          title="Send message"
          aria-label="Send message"
        >
          <span class="lucide-icon" data-icon="send" aria-hidden="true"></span>
        </button>
      </div>
    `}};or([ue({attribute:"backend-url"})],lr.prototype,"backendUrl",void 0),or([ue({attribute:"api-key"})],lr.prototype,"apiKey",void 0),or([ue({attribute:"agent-id",type:Number})],lr.prototype,"agentId",void 0),or([ue({attribute:"primary-color"})],lr.prototype,"primaryColor",void 0),or([ue({attribute:"background-color"})],lr.prototype,"backgroundColor",void 0),or([ue({attribute:"text-color"})],lr.prototype,"textColor",void 0),or([ue({attribute:"agent-name"})],lr.prototype,"agentName",void 0),or([ue({attribute:"logo"})],lr.prototype,"logo",void 0),or([ue()],lr.prototype,"mode",void 0),or([ue({attribute:"include-citations",type:Boolean})],lr.prototype,"includeCitations",void 0),or([de()],lr.prototype,"isOpen",void 0),or([de()],lr.prototype,"chatSessionId",void 0),or([de()],lr.prototype,"messages",void 0),or([de()],lr.prototype,"isLoading",void 0),or([de()],lr.prototype,"isStreaming",void 0),or([de()],lr.prototype,"streamingStatus",void 0),or([de()],lr.prototype,"error",void 0),or([de()],lr.prototype,"inputValue",void 0),or([de()],lr.prototype,"showEmptyPlaceholder",void 0),or([de()],lr.prototype,"showEmptyHiding",void 0),lr=ar=or([(e=>(t,n)=>{void 0!==n?n.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)})("onyx-chat-widget")],lr),"undefined"==typeof customElements||customElements.get("onyx-chat-widget")||customElements.define("onyx-chat-widget",lr);export{lr as OnyxChatWidget};