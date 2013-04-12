window.vs={};window.vs.util={};window.vs.core={};window.vs.data={};window.vs.ui={};window.vs.fx={};window.vs.av={};window.vs.ext={};window.vs.ext.ui={};window.vs.ext.fx={};window.vs.SUPPORT_3D_TRANSFORM=!1;
(function(){FirminCSSMatrix=function(a){this.m11=this.m22=this.m33=this.m44=1;this.m12=this.m13=this.m14=this.m21=this.m23=this.m24=this.m31=this.m32=this.m34=this.m41=this.m42=this.m43=0;"string"==typeof a&&this.setMatrixValue(a)};FirminCSSMatrix.displayName="FirminCSSMatrix";FirminCSSMatrix.degreesToRadians=function(a){return a*Math.PI/180};FirminCSSMatrix.determinant2x2=function(a,b,e,g){return a*g-b*e};FirminCSSMatrix.determinant3x3=function(a,b,e,g,f,h,i,j,l){var m=FirminCSSMatrix.determinant2x2;
return a*m(f,h,j,l)-g*m(b,e,j,l)+i*m(b,e,f,h)};FirminCSSMatrix.determinant4x4=function(a){var b=FirminCSSMatrix.determinant3x3,e=a.m21,g=a.m31,f=a.m41,h=a.m12,i=a.m22,j=a.m32,l=a.m42,m=a.m13,s=a.m23,t=a.m33,y=a.m43,z=a.m14,A=a.m24,u=a.m34,v=a.m44;return a.m11*b(i,s,A,j,t,u,l,y,v)-e*b(h,m,z,j,t,u,l,y,v)+g*b(h,m,z,i,s,A,l,y,v)-f*b(h,m,z,i,s,A,j,t,u)};[["m11","a"],["m12","b"],["m21","c"],["m22","d"],["m41","e"],["m42","f"]].forEach(function(a){var b=a[0];Object.defineProperty(FirminCSSMatrix.prototype,
a[1],{set:function(a){this[b]=a},get:function(){return this[b]}})});FirminCSSMatrix.prototype.isAffine=function(){return 0===this.m13&&0===this.m14&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m32&&1===this.m33&&0===this.m34&&0===this.m43&&1===this.m44};FirminCSSMatrix.prototype.multiply=function(a){var b=new FirminCSSMatrix;b.m11=a.m11*this.m11+a.m12*this.m21+a.m13*this.m31+a.m14*this.m41;b.m12=a.m11*this.m12+a.m12*this.m22+a.m13*this.m32+a.m14*this.m42;b.m13=a.m11*this.m13+a.m12*this.m23+
a.m13*this.m33+a.m14*this.m43;b.m14=a.m11*this.m14+a.m12*this.m24+a.m13*this.m34+a.m14*this.m44;b.m21=a.m21*this.m11+a.m22*this.m21+a.m23*this.m31+a.m24*this.m41;b.m22=a.m21*this.m12+a.m22*this.m22+a.m23*this.m32+a.m24*this.m42;b.m23=a.m21*this.m13+a.m22*this.m23+a.m23*this.m33+a.m24*this.m43;b.m24=a.m21*this.m14+a.m22*this.m24+a.m23*this.m34+a.m24*this.m44;b.m31=a.m31*this.m11+a.m32*this.m21+a.m33*this.m31+a.m34*this.m41;b.m32=a.m31*this.m12+a.m32*this.m22+a.m33*this.m32+a.m34*this.m42;b.m33=a.m31*
this.m13+a.m32*this.m23+a.m33*this.m33+a.m34*this.m43;b.m34=a.m31*this.m14+a.m32*this.m24+a.m33*this.m34+a.m34*this.m44;b.m41=a.m41*this.m11+a.m42*this.m21+a.m43*this.m31+a.m44*this.m41;b.m42=a.m41*this.m12+a.m42*this.m22+a.m43*this.m32+a.m44*this.m42;b.m43=a.m41*this.m13+a.m42*this.m23+a.m43*this.m33+a.m44*this.m43;b.m44=a.m41*this.m14+a.m42*this.m24+a.m43*this.m34+a.m44*this.m44;return b};FirminCSSMatrix.prototype.isIdentityOrTranslation=function(){return 1===this.m11&&0===this.m12&&0===this.m13&&
0===this.m14&&0===this.m21&&1===this.m22&&0===this.m23&&0===this.m24&&0===this.m31&&0===this.m31&&1===this.m33&&0===this.m34&&1===this.m44};FirminCSSMatrix.prototype.adjoint=function(){var a=new FirminCSSMatrix,b=FirminCSSMatrix.determinant3x3,e=this.m11,g=this.m12,f=this.m13,h=this.m14,i=this.m21,j=this.m22,l=this.m23,m=this.m24,s=this.m31,t=this.m32,y=this.m33,z=this.m34,A=this.m41,u=this.m42,v=this.m43,p=this.m44;a.m11=b(j,t,u,l,y,v,m,z,p);a.m21=-b(i,s,A,l,y,v,m,z,p);a.m31=b(i,s,A,j,t,u,m,z,p);
a.m41=-b(i,s,A,j,t,u,l,y,v);a.m12=-b(g,t,u,f,y,v,h,z,p);a.m22=b(e,s,A,f,y,v,h,z,p);a.m32=-b(e,s,A,g,t,u,h,z,p);a.m42=b(e,s,A,g,t,u,f,y,v);a.m13=b(g,j,u,f,l,v,h,m,p);a.m23=-b(e,i,A,f,l,v,h,m,p);a.m33=b(e,i,A,g,j,u,h,m,p);a.m43=-b(e,i,A,g,j,u,f,l,v);a.m14=-b(g,j,t,f,l,y,h,m,z);a.m24=b(e,i,s,f,l,y,h,m,z);a.m34=-b(e,i,s,g,j,t,h,m,z);a.m44=b(e,i,s,g,j,t,f,l,y);return a};FirminCSSMatrix.prototype.inverse=function(){var a,b,e,g;if(this.isIdentityOrTranslation())return a=new FirminCSSMatrix,0===this.m41&&
0===this.m42&&0===this.m43||(a.m41=-this.m41,a.m42=-this.m42,a.m43=-this.m43),a;b=this.adjoint();a=FirminCSSMatrix.determinant4x4(this);if(1.0E-8>Math.abs(a))return null;for(e=1;5>e;e++)for(g=1;5>g;g++)b["m"+e+g]/=a;return b};FirminCSSMatrix.prototype.rotate=function(a,b,e){var g=FirminCSSMatrix.degreesToRadians;if("number"!=typeof a||isNaN(a))a=0;if(("number"!=typeof b||isNaN(b))&&("number"!=typeof e||isNaN(e)))e=a,b=a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof e||isNaN(e))e=0;var a=
g(a),b=g(b),e=g(e),g=new FirminCSSMatrix,f=new FirminCSSMatrix,h=new FirminCSSMatrix,i,e=e/2;i=Math.sin(e);e=Math.cos(e);h.m11=h.m22=1-2*i*i;h.m12=h.m21=2*i*e;h.m21*=-1;b/=2;i=Math.sin(b);e=Math.cos(b);f.m11=f.m33=1-2*i*i;f.m13=f.m31=2*i*e;f.m13*=-1;a/=2;i=Math.sin(a);e=Math.cos(a);g.m22=g.m33=1-2*i*i;g.m23=g.m32=2*i*e;g.m32*=-1;return h.multiply(f).multiply(g).multiply(this)};FirminCSSMatrix.prototype.rotateAxisAngle=function(a,b,e,g){if("number"!=typeof a||isNaN(a))a=0;if("number"!=typeof b||isNaN(b))b=
0;if("number"!=typeof e||isNaN(e))e=0;if("number"!=typeof g||isNaN(g))g=0;0===a&&0===b&&0===e&&(e=1);var f=new FirminCSSMatrix,h=Math.sqrt(a*a+b*b+e*e),i,j,l,g=(FirminCSSMatrix.degreesToRadians(g)||0)/2;i=Math.cos(g);j=Math.sin(g);g=j*j;0===h?(b=a=0,e=1):1!==h&&(a/=h,b/=h,e/=h);1===a&&0===b&&0===e?(f.m22=f.m33=1-2*g,f.m23=f.m32=2*i*j,f.m32*=-1):0===a&&1===b&&0===e?(f.m11=f.m33=1-2*g,f.m13=f.m31=2*i*j,f.m13*=-1):0===a&&0===b&&1===e?(f.m11=f.m22=1-2*g,f.m12=f.m21=2*i*j,f.m21*=-1):(h=j*i,i=a*a,j=b*b,
l=e*e,f.m11=1-2*(j+l)*g,f.m12=2*(a*b*g+e*h),f.m13=2*(a*e*g-b*h),f.m21=2*(b*a*g-e*h),f.m22=1-2*(l+i)*g,f.m23=2*(b*e*g+a*h),f.m31=2*(e*a*g+b*h),f.m32=2*(e*b*g-a*h),f.m33=1-2*(i+j)*g);return this.multiply(f)};FirminCSSMatrix.prototype.scale=function(a,b,e){var g=new FirminCSSMatrix;if("number"!=typeof a||isNaN(a))a=1;if("number"!=typeof b||isNaN(b))b=a;if("number"!=typeof e||isNaN(e))e=1;g.m11=a;g.m22=b;g.m33=e;return this.multiply(g)};FirminCSSMatrix.prototype.translate=function(a,b,e){var g=new FirminCSSMatrix;
if("number"!=typeof a||isNaN(a))a=0;if("number"!=typeof b||isNaN(b))b=0;if("number"!=typeof e||isNaN(e))e=0;g.m41=a;g.m42=b;g.m43=e;return this.multiply(g)};FirminCSSMatrix.prototype.setMatrixValue=function(a){var a=a.trim(),b=a.match(/^matrix(3d)?\(\s*(.+)\s*\)$/),e,g,f,h;if(b&&(a=!!b[1],b=b[2].split(/\s*,\s*/),e=b.length,g=Array(e),!(a&&16!==e)&&(a||6===e))){for(f=0;f<e;f++)if(h=b[f],h.match(/^-?\d+(\.\d+)?$/))g[f]=parseFloat(h);else return;for(f=0;f<e;f++)point=a?"m"+(Math.floor(f/4)+1)+(f%4+1):
String.fromCharCode(f+97),this[point]=g[f]}};FirminCSSMatrix.prototype.toString=function(){var a=this,b,e;this.isAffine()?(e="matrix(",b="a,b,c,d,e,f".split(",")):(e="matrix3d(",b="m11,m12,m13,m14,m21,m22,m23,m24,m31,m32,m33,m34,m41,m42,m43,m44".split(","));return e+b.map(function(b){return a[b].toFixed(6)}).join(", ")+")"};this.FirminCSSMatrix=FirminCSSMatrix}).call(this);
(function(){function a(d,w){x.isNumber(d)&&(this.x=d);x.isNumber(w)&&(this.y=w)}function b(d,w){for(var a in w)getter=w.__lookupGetter__(a),setter=w.__lookupSetter__(a),getter&&d.__defineGetter__(a,getter),setter&&d.__defineSetter__(a,setter),!getter&&!setter&&(d[a]=w[a]);return d}function e(d,a){for(var c in a){var b=Object.getOwnPropertyDescriptor(a,c);b&&(b.get||b.set)?x.defineProperty(d,c,b):d[c]=a[c]}return d}function g(d,a,c){if(Object.prototype.hasOwnProperty.call(c,"set")){var b=c.set;l(b)&&
d.__defineSetter__(a,b)}Object.prototype.hasOwnProperty.call(c,"get")&&(b=c.get,l(b)&&d.__defineGetter__(a,b))}function f(d,a,c){function b(d,a){return Object.prototype.hasOwnProperty.call(d,a)}if("object"!=typeof c||null===c)throw new TypeError("bad desc");if("string"!=typeof a||null===a)throw new TypeError("bad property name");var f={};f.enumerable=b(c,"enumerable")?!!c.enumerable:!0;f.configurable=b(c,"configurable")?!!c.configurable:!0;b(c,"value")&&(f.value=c.value);b(c,"writable")&&(f.writable=
!!c.writable);if(b(c,"get")){var e=c.get;l(e)&&(f.get=e)}b(c,"set")&&(c=c.set,l(c)&&(f.set=c));if(("get"in f||"set"in f)&&("value"in f||"writable"in f))throw new TypeError("identity-confused descriptor");Object.defineProperty(d,a,f)}function h(d,a,c){if(c){d._properties_||(d._properties_=[]);if(!d.prototype)throw"defineClassProperty on a Class without prototype";x.defineProperty(d.prototype,a,c);!1!=c.enumerable&&d._properties_.push(a)}}function i(d){var a;switch(d){case null:return null;case void 0:return}switch(D.call(d)){case OBJECT_CLASS:case OBJECT_TYPE:a=
{};for(var c in d)a[c]=i(d[c]);return a;case ARRAY_CLASS:a=[];for(c=0;c<d.length;c++)a[c]=i(d[c]);return a;default:return d}}function j(d){return!!(d&&1===d.nodeType)}function l(d){return"function"===typeof d}function m(d){return D.call(d)===STRING_CLASS}function s(d){return"undefined"===typeof d}function t(d,a){if(d){var c=d.className;return c&&0<c.length&&(c===a||RegExp("(^|\\s)"+a+"(\\s|$)").test(c))}}function y(){var d=arguments[0],a,c=1;if(d){for(;c<arguments.length;c++)a=arguments[c],t(d,a)||
(d.className=(d.className?d.className+" ":"")+a);return d}}function z(){var d=arguments[0],a,c=1;if(d&&d.className){for(;c<arguments.length;c++)a=arguments[c],d.className=A(d.className.replace(RegExp("(^|\\s+)"+a+"(\\s+|$)")," "));return d}}function A(d){return!m(d)?"":d.replace(/^\s+/,"").replace(/\s+$/,"")}function u(d){if(!m(d))return"";var a=d.split("-"),c=a.length;if(1===c)return a[0];for(var d="-"===d.charAt(0)?a[0].charAt(0).toUpperCase()+a[0].substring(1):a[0],b=1;b<c;b++)d+=a[b].charAt(0).toUpperCase()+
a[b].substring(1);return d}function v(d){if(!j(d))return{};var a=p(d,"display"),c=d.style,b=c.visibility,f=c.position,e=c.display,g=0,h=0;if("none"!==a&&null!==a)return{width:d.offsetWidth,height:d.offsetHeight};c.visibility="hidden";c.position="absolute";c.display="block";g=d.clientWidth;h=d.clientHeight;c.display=e;c.position=f;c.visibility=b;return{width:g,height:h}}function p(d,a){if(j(d)){var a="float"===a?"cssFloat":u(a),c=d.style[a];if(!c||"auto"===c)c=(c=q.defaultView.getComputedStyle(d,null))?
c[a]:null;return"opacity"===a?c?parseFloat(c):1:"auto"===c?null:c}}function P(d,a){if(j(d)){var c=d.style;s(a)&&c.removeProperty("opacity");c.opacity=1===a||""===a?"":1.0E-5>a?0:a}}function Q(d,a){if(!d)return null;if(!a&&d.getBoundingClientRect){var c=d.getBoundingClientRect();if(c)return new k.Point(c.left,c.top)}for(var b=c=0,f=d;f;){var e=0,g=0;f!=d&&(e=parseInt(f.currentStyle?f.currentStyle.borderLeftWidth:0,0),g=parseInt(f.currentStyle?f.currentStyle.borderTopWidth:0,0),e=isNaN(e)?0:e,g=isNaN(g)?
0:g);c+=f.offsetLeft-f.scrollLeft+e;b+=f.offsetTop-f.scrollTop+g;f=f.offsetParent}return new k.Point(c,b)}function R(d){var a=Q(d);return{width:d.offsetWidth,height:d.offsetWidth,left:a.x,top:a.y}}function X(d){return d&&d.getBoundingClientRect?d.getBoundingClientRect():null}function U(d){if(d&&d.childNodes)for(var a=d.childNodes.length;a--;)d.removeChild(d.firstChild)}function Y(d,a){d&&d.style?d.style.webkitTransform=a:console.warn("setElementTransform, elem null or without style")}function Z(d){if(d)return window.getComputedStyle(d).webkitTransform}
function n(d,a){d&&d.style?d.style.msTransform=a:console.warn("setElementTransform, elem null or without style")}function H(d){if(d)return window.getComputedStyle(d).msTransform}function o(d,a){d&&d.style?d.style.MozTransform=a:console.warn("setElementTransform, elem null or without style")}function C(d){if(d)return window.getComputedStyle(d).MozTransform}function I(d,a){if(!B){var c=q.createElement("style");c.appendChild(q.createTextNode(""));head=q.getElementsByTagName("head")[0];head.appendChild(c);
B=q.styleSheets[q.styleSheets.length-1]}c=0;B.cssRules?c=B.cssRules.length:B.rules&&(c=B.rules.length);B.insertRule?B.insertRule(d+" {"+a+"}",c):B.addRule&&B.addRule(d,a,c)}var k=this.vs=this.vs||{},x=k.util={};a.prototype={x:0,y:0,matrixTransform:function(d){var b=new CSSMatrix,b=b.translate(this.x,this.y,this.z||0),d=d.multiply(b),c=new a(d.m41,d.m42);delete b;delete d;return c}};k.Point=a;var q="undefined"!=typeof window?window.document:null,J=q?q.createElement("vstestelem"):null,r=J?J.style:null,
K=/\/Date\((-?\d+)\)\//;r&&(void 0!==r.webkitTransform?k.SUPPORT_3D_TRANSFORM="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix:void 0!==r.MozTransform?k.SUPPORT_3D_TRANSFORM="MozPerspective"in r:void 0!==r.msTransform&&(k.SUPPORT_3D_TRANSFORM="MSCSSMatrix"in window&&"m11"in new MSCSSMatrix),k.CSS_VENDOR=function(){for(var d=["MozT","msT","OT","webkitT","t"],a,c=d.length;--c;)if(a=d[c]+"ransform",a in r)return d[c].substr(0,d[c].length-1);return null}());k.SUPPORT_CSS_TRANSFORM=null!==k.CSS_VENDOR?
!0:!1;k.CSSMatrix="WebKitCSSMatrix"in window?window.WebKitCSSMatrix:"MSCSSMatrix"in window?window.MSCSSMatrix:FirminCSSMatrix;k.requestAnimationFrame=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(d){window.setTimeout(d,1E3/60)}).bind(window);k.cancelRequestAnimationFrame=(window.cancelRequestAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||
window.oCancelAnimationFrame||window.msCancelAnimationFrame||clearTimeout).bind(window);k.util.extend=Object.defineProperty?e:b;var E="function"===typeof Object.keys?Object.keys:function(d){var a=[],c;for(c in d)Object.prototype.hasOwnProperty.call(d,c)&&a.push(c);return a};NULL_TYPE="Null";UNDEFINED_TYPE="Undefined";BOOLEAN_TYPE="Boolean";NUMBER_TYPE="Number";STRING_TYPE="String";OBJECT_TYPE="Object";BOOLEAN_CLASS="[object Boolean]";NUMBER_CLASS="[object Number]";STRING_CLASS="[object String]";ARRAY_CLASS=
"[object Array]";OBJECT_CLASS="[object Object]";var D=Object.prototype.toString,L=Array.isArray||function(d){return D.call(d)===ARRAY_CLASS},G,F;r&&void 0!==r.webkitTransform?(G=Y,F=Z):r&&void 0!==r.msTransform?(G=n,F=H):r&&void 0!==r.MozTransform&&(G=o,F=C);Array.prototype._remove=function(d,a){var c=this.slice((a||d)+1||this.length);this.length=0>d?this.length+d:d;return this.push.apply(this,c)};var M=function(d,a){for(var c=this.length,a=a?a:0,a=0>a?0:a;a<c;){if(this[a]===d)return a;a++}return-1};
Array.prototype.findItem=Array.prototype.indexOf?Array.prototype.indexOf:M;Array.prototype.remove=function(a,b){if("object"===typeof a||x.isString(a))for(var c=0;c<this.length;)this[c]===a?this._remove(c):c++;else this._remove(a,b);return this};Array.prototype.removeAll=function(){for(;0<this.length;)this._remove(0);return this};Array.prototype.clone=function(){return this.slice()};var B=null;k._current_platform_id=0;x.extend(x,{vsTestElem:J,vsTestStyle:r,extendClass:function(a,b){if(a&&b&&a.prototype&&
b.prototype)try{if(Object.__proto__)a.prototype.__proto__=b.prototype;else{var c=a.prototype;a.prototype=new b;x.extend(a.prototype,c)}a._properties_||(a._properties_=[]);b._properties_&&(a._properties_=a._properties_.concat(b._properties_));return a}catch(f){console.error(f.message())}},defineProperty:Object.defineProperty?f:g,defineClassProperty:h,defineClassProperties:function(a,b){if(!a.prototype)throw"defineClassProperties on a Class without prototype";for(var b=Object(b),c=E(b),f=0;f<c.length;f++)h(a,
c[f],b[c[f]])},clone:i,free:function(a){a&&(a._free&&a._free(),a.destructor&&a.destructor(),delete a)},toJSON:function(a){return JSON.stringify(a)},isElement:j,isArray:L,isFunction:l,isString:m,isNumber:function(a){return"number"===typeof a&&isFinite(a)||a instanceof Number},isUndefined:s,hasClassName:t,addClassName:y,removeClassName:z,toggleClassName:function(a,b){return!a?void 0:t(a,b)?z(a,b):y(a,b)},htmlEncode:function(a){return!m(a)?"":a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,
"&gt;")},strip:A,camelize:u,capitalize:function(a){return!m(a)?"":a.charAt(0).toUpperCase()+a.substring(1).toLowerCase()},underscore:function(a){return!m(a)?"":a.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/-/g,"_").toLowerCase()},parseJSON:function(a){function b(a){if(m(a)){var d=K.exec(a);d&&d[1]&&(a=new Date(parseInt(d[1])))}else if(L(a))for(d=0;d<a.length;d++)a[d]=b(a[d]);else if(!(a instanceof Date)&&a instanceof Object)for(d in a)a[d]=
b(a[d]);return a}if(!a)return null;var c=JSON.parse(a);return!K.test(a)?c:b(c)},addCssRule:I,addCssRules:function(a,b){if(L(b))for(var c=b.length;c--;)I(a,b[c])},getElementHeight:function(a){return!j(a)?void 0:v(a).height},getElementWidth:function(a){return!j(a)?void 0:v(a).width},getElementDimensions:v,getElementStyle:p,setElementStyle:function(a,b){if(j(a)){var c=a.style,f;for(f in b)"opacity"===f?P(a,b[f]):(b[f]||c.removeProperty(f),c["float"===f||"cssFloat"===f?s(c.styleFloat)?"cssFloat":"styleFloat":
f]=b[f])}},setElementOpacity:P,getElementOpacity:function(a){return!j(a)?void 0:p(a,"opacity")},getElementAbsolutePosition:Q,setElementPos:function(a,b,c){a&&(a=a.style,a.left=b+"px",a.top=c+"px")},setElementSize:function(a,b,c){a&&(a=a.style,a.width=b+"px",a.height=c+"px")},setElementVisibility:function(a,b){if(a){var c=a.style;c||x.isString(a.innerHTML)?c.visibility=b?"visible":"hidden":b?a.setAttribute("visibility","visible"):a.setAttribute("visibility","hidden")}},isElementVisible:function(a){if(!a)return!1;
var b=a.style;return b||x.isString(a.innerHTML)?"hidden"===b.visibility?!1:!0:a instanceof CharacterData?!0:"hidden"===a.getAttribute("visibility")?!1:!0},removeAllElementChild:U,setElementInnerText:function(a,b){if(a){U(a);x.isString(b)||(b=void 0===b?"":null===b?"":x.isNumber(b)?""+b:b.toString?b.toString():"");var c=b.split("\n"),f=0;if(c.length){a.appendChild(q.createTextNode(c[f]));for(f++;f<c.length;f++)a.appendChild(q.createElement("br")),a.appendChild(q.createTextNode(c[f]))}}},setElementTransform:G,
getElementTransform:F,setElementTransformOrigin:function(a,b){a&&a.style?a.style["-"+k.CSS_VENDOR.toLowerCase()+"-transform-origin"]=b:console.warn("setElementTransformOrigin, elem null or without style")},getBoundingClientRect:J&&J.getBoundingClientRect?X:R,safeInnerHTML:function(a,b){if(a){var c;c=window.toStaticHTML?window.toStaticHTML(b):b;a.innerHTML=c}},importFile:function(a,b,c,f){b||(b=q);var e;if("js"===f||0<=a.search("\\.js"))return f=b.createElement("script"),f.setAttribute("type","text/javascript"),
f.setAttribute("src",a),c&&(f.onload=function(){c.call(this,a)}),b.head||(b.head=b.querySelector("head")),b.head.appendChild(f),f;if("css"===f||0<=a.search("\\.css")){e=b.createElement("link");e.setAttribute("rel","stylesheet");e.setAttribute("type","text/css");e.setAttribute("href",a);e.setAttribute("media","screen");if(x.isFunction(c)){var g=0;(function(){!e.sheet||!e.sheet.cssRules?100>g++?cssTimeout=setTimeout(arguments.callee,100):console.error("CSS load of "+a+" failed!"):e.sheet.cssRules&&
0===e.sheet.cssRules.length?console.error("CSS load of "+a+" failed!"):c.call(q,a)})()}b.head||(b.head=b.querySelector("head"));b.head.appendChild(e);return e}},setActiveStyleSheet:function(a){var b=0,c=q.getElementsByTagName("link"),f,e;k._current_platform_id=a;var g=k.Application_applications;if(g)for(e in g)b=g[e],b.view&&(b.view.style.display="none");for(b=0;b<c.length;b++)f=c[b],f.getAttribute("title")&&(f.getAttribute("title")!==a?f.setAttribute("disabled",!0):f.removeAttribute("disabled"));
if(g)for(e in g)b=g[e],b.view&&(b.view.style.display="block")},preloadTemplate:function(a){var b=a+".xhtml",c;if(!k.ui||!k.ui.View||!k.ui.View.__comp_templates[b])c=new XMLHttpRequest,c.open("GET",b,!1),c.send(null),4===c.readyState?200===c.status||0===c.status?(data=c.responseText,k.ui&&k.ui.View&&(k.ui.View.__comp_templates[b]=data)):console.error("Template file for component '"+a+"' unfound"):console.error("Pb when load the component '"+a+"' template")},__date_reg_exp:K,_findItem:M,_defineProperty_api1:g,
_defineProperty_api2:f,_extend_api1:b,_extend_api2:e})}).call(this);
(function(){function a(a){var b=a.vsGetCTM();e.setElementTransform(a,b.toString());delete b}var b=this.vs,e=b.util,g=b&&b.CSSMatrix;e.extend((window&&window.HTMLElement).prototype,{_vs_node_tx:0,_vs_node_ty:0,_vs_node_s:1,_vs_node_r:0,vsTranslate:function(b,e){this._vs_node_tx===b&&this._vs_node_ty===e||(this._vs_node_tx=b,this._vs_node_ty=e,a(this))},vsRotate:function(b){this._vs_node_r!==b&&(this._vs_node_r=b,a(this))},vsScale:function(b){this._vs_node_s!==b&&(this._vs_node_s=b,a(this))},vsSetNewTransformOrigin:function(a){if(a){this._vs_node_origin||
(this._vs_node_origin=[0,0]);var b=new g,b=b.translate(this._vs_node_origin[0],this._vs_node_origin[1],0),b=b.translate(this._vs_node_tx,this._vs_node_ty,0),b=b.rotate(0,0,this._vs_node_r),b=b.scale(this._vs_node_s,this._vs_node_s,1),b=b.translate(-this._vs_node_origin[0],-this._vs_node_origin[1],0);this._vs_transform||(this._vs_transform=b);this._vs_transform=b.multiply(this._vs_transform);delete b;this._vs_node_ty=this._vs_node_tx=0;this._vs_node_s=1;this._vs_node_r=0;this._vs_node_origin=[a.x,
a.y]}},vsClearTransformStack:function(){this._vs_transform&&delete this._vs_transform;this._vs_transform=void 0},vsGetCTM:function(){var a=new g;this._vs_node_origin||(this._vs_node_origin=[0,0]);a=a.translate(this._vs_node_origin[0],this._vs_node_origin[1],0);a=a.translate(this._vs_node_tx,this._vs_node_ty,0);a=a.rotate(0,0,this._vs_node_r);a=a.scale(this._vs_node_s,this._vs_node_s,1);a=a.translate(-this._vs_node_origin[0],-this._vs_node_origin[1],0);return this._vs_transform?a.multiply(this._vs_transform):
a},vsGetParentCTM:function(){function a(b){return!b?new g:a(b.parentNode).multiply(b.vsGetCTM())}return a(this.parentNode)}})}).call(this);
(function(){function a(a,b,d){this.configureWithEvent(a);this.type=b;this.identifier=d}function b(b,d){var c=[];b.nbPointers=b.touches.length;for(var f=0;f<b.nbPointers;f++){var e=b.touches[f],e=new a(e,r.TOUCH,e.identifier);c.push(e)}b.pointerList=c;c=[];for(f=0;f<b.targetTouches.length;f++)e=b.targetTouches[f],d&&K[e.identifier]!=d||(e=new a(e,r.TOUCH,e.identifier),c.push(e));b.targetPointerList=c;c=[];for(f=0;f<b.changedTouches.length;f++)e=b.changedTouches[f],e=new a(e,r.TOUCH,e.identifier),c.push(e);
b.changedPointerList=c}function e(b,c){var d=[];d.push(new a(b,r.MOUSE,J));c?(b.nbPointers=0,b.pointerList=[],b.targetPointerList=d,b.changedPointerList=d):(b.nbPointers=1,b.pointerList=d,b.targetPointerList=d,b.changedPointerList=[])}function g(b,d){var c=[],f=[],e=b.pointerId,g=E[e];if(d){g?(D[e]=g,delete E[e]):(g=D[e],g||(g=new a(b,b.pointerType,e),D[e]=g));for(e in D)f.push(D[e]);D={}}else g?g.configureWithEvent(b):(g=new a(b,b.pointerType,e),E[e]=g);for(e in E)c.push(E[e]);b.nbPointers=c.length;
b.pointerList=c;c=[];for(e in E)g=E[e],c.push(g);b.targetPointerList=c;b.changedPointerList=f}function f(a,b){e(a);b(a)}function h(a,b){e(a);b(a)}function i(a,b){e(a,!0);b(a)}function j(a,c,d){for(var e,f=a.targetTouches.length,g=0;g<f;g++)e=a.targetTouches[g],K[e.identifier]=d;b(a);c(a)}function l(a,c,d){b(a,d);c(a)}function m(a,c){for(var d,e=a.targetTouches.length,f=0;f<e;f++)d=a.changedTouches[f],K[d.identifier]=void 0;b(a);c(a)}function s(a,c){b(a);c(a,c)}function t(a,b,c){K[a.pointerId]=c;g(a,
!1,c);b(a);0===L&&(document.addEventListener("MSPointerUp",G),document.addEventListener("MSPointerCancel",G));L++}function y(a,b,c){g(a,!1,c);b(a)}function z(a,b){g(a,!0);b(a)}function A(a,b){g(a,!0);b(a)}function u(a,b,c){if(!b||!c||!c.__event_listeners)return-1;for(var d=0;d<c.__event_listeners.length;d++){var e=c.__event_listeners[d];if(e.target===a&&e.type===b&&e.listener===c)return d}return-1}function v(a,b,c,d){var e=d.listener?d.listener.id:void 0;switch(b){case I:return d.handler=function(a){F(a,
c,e)},!0;case k:return d.handler=function(a){M(a,c,e)},!0;case x:return d.handler=function(a){pointerEndHandler(a,c)},!0;case q:return d.handler=function(a){B(a,c)},!0}return!1}function p(a,b,c){var d=document.createEvent("Event");d.initEvent(a,!0,!0);for(var e in c)d[e]=c[e];b.dispatchEvent(d)}function P(a,b){var c=b.pageX-a.pageX,d=b.pageY-a.pageY;return Math.sqrt(c*c+d*d)}function Q(a){var b=a.length,c=0,d=0,e=0;if(0===b)return{X:0,y:0};for(;c<b;c++)var f=a[c],d=d+f.pageX,e=e+f.pageY;return{x:d/
b-$.x,y:e/b-$.y}}function R(b){b.centroid={x:b.pageX,y:b.pageY};b.translation=[b.centroid.x-N.x,b.centroid.y-N.y];b.pointerList=[new a(b,r.TOUCH,J)];b.targetPointerList=b.pointerList;b.nbPointers=1}function X(a,b,e,f){var g=f.listener?f.listener.id:void 0;switch(b){case d:return f.gesture_handler=function(a){F(a,ea,g)},a.addEventListener(n.POINTER_START,f.gesture_handler),f.handler=e,!0;case w:case c:return f.handler=e,!0}return!1}function U(a,b,e,f){switch(b){case d:return f.handler=function(a){N=
{x:a.pageX,y:a.pageY};R(a);e(a)},!0;case w:return f.handler=function(a){R(a);e(a)},!0;case c:return f.handler=function(a){R(a);e(a)},!0}return!1}function Y(a,b,e){var f=e.listener?e.listener.id:void 0;switch(b){case d:return a.removeEventListener(n.POINTER_START,e.gesture_handler,f),!0;case w:case c:return!0}return!1}function Z(a,b){switch(b){case d:case w:case c:return!0}return!1}var n=this.vs=this.vs||{},H=n.util=n.util||{},o=!1,C=window.navigator.msPointerEnabled;if("undefined"!=typeof document&&
"createTouch"in document)o=!0;else if(C)o=!0;else if("undefined"!=typeof document&&window.navigator&&window.navigator.userAgent&&(-1!==window.navigator.userAgent.indexOf("Android")||-1!==window.navigator.userAgent.indexOf("BlackBerry")))o=!0;var I,k,x,q;o?(I=C?"MSPointerDown":"touchstart",k=C?"MSPointerMove":"touchmove",x=C?"MSPointerUp":"touchend",q=C?"MSPointerCancel":"touchcancel"):(I="mousedown",k="mousemove",q=x="mouseup");var J=31337;a.prototype.configureWithEvent=function(a){this.pageX=a.pageX;
this.pageY=a.pageY;this.clientX=a.clientX;this.clientY=a.clientY;this.target=a.target;this.currentTarget=a.currentTarget};var r={TOUCH:2,PEN:3,MOUSE:4},K=[],E={},D={},L=0,G=function(a){if(a=E[a.pointerId])D[a.identifier]=a,delete E[a.identifier];L--;0===L&&(document.removeEventListener("MSPointerUp",G),document.removeEventListener("MSPointerCancel",G))},F,M,B;o?C?(F=t,M=y,pointerEndHandler=z,B=A):(F=j,M=l,pointerEndHandler=m,B=s):(F=f,M=h,B=pointerEndHandler=i);n.createCustomEvent=p;n.removePointerListener=
function(a,b,c,d){if(c){var e=u(a,b,c);if(-1===e)console.error("removePointerListener no binding");else{var f=c.__event_listeners[e];c.__event_listeners.remove(e);a:{switch(b){case I:case k:case x:case q:c=!0;break a}c=!1}c||fa(a,b,f);a.removeEventListener(b,f.handler,d);delete f}}else console.error("removePointerListener no listener")};n.addPointerListener=function(a,b,c,d){if(c){var e=c;H.isFunction(c)||(e=c.handleEvent,H.isFunction(e)&&(e=e.bind(c)));if(-1!==u(a,b,c))console.error("addPointerListener binding already existing");
else{c.__event_listeners||(c.__event_listeners=[]);var f={target:a,type:b,listener:c};c.__event_listeners.push(f);!v(a,b,e,f)&&!ga(a,b,e,f)&&(f.handler=e);a.addEventListener(b,f.handler,d)}}else console.error("addPointerListener no listener")};n.PointerTypes=r;n.POINTER_START=I;n.POINTER_MOVE=k;n.POINTER_END=x;n.POINTER_CANCEL=q;var d,w,c,o={},C=["gesturestart","gesturechange","gestureend"];document.createElement("div");for(var T=0;T<C.length;T++){var O=C[T],O="on"+O,W=O in H.vsTestElem;W||(H.vsTestElem.setAttribute(O,
"return;"),W="function"==typeof H.vsTestElem[O]);o[C[T]]=W}o.gestures=o.gesturestart&&o.gesturechange&&o.gestureend;"MSGestureEvent"in window&&(o.msGestures=!0);o.gestures=!1;o.msGestures=!1;var ba=0,ca=0,N,$,S=function(a,b){var c=b?void 0:Q(a.targetPointerList);return{scale:b?void 0:P(a.targetPointerList[0],a.targetPointerList[1])/ba,rotation:b?void 0:180*Math.atan2(a.targetPointerList[1].pageY-a.targetPointerList[0].pageY,a.targetPointerList[1].pageX-a.targetPointerList[0].pageX)/Math.PI-ca,translation:b?
void 0:[c.x-N.x,c.y-N.y],nbPointers:a.nbPointers,pointerList:a.pointerList,targetPointerList:a.targetPointerList,centroid:c,changedPointerList:a.changedPointerList}},aa=!1,ea=function(a){2>a.targetPointerList.length||(aa?p(w,a.target,S(a)):(ba=P(a.targetPointerList[0],a.targetPointerList[1]),ca=180*Math.atan2(a.targetPointerList[1].pageY-a.targetPointerList[0].pageY,a.targetPointerList[1].pageX-a.targetPointerList[0].pageX)/Math.PI,$=H.getElementAbsolutePosition(a.targetPointerList[0].target,!0),
N=Q(a.targetPointerList),document.addEventListener(n.POINTER_MOVE,da),document.addEventListener(n.POINTER_END,V),document.addEventListener(n.POINTER_CANCEL,V),p(d,a.target,S(a)),aa=!0))},da=function(a){M(a,function(a){p(w,a.target,S(a))})},V=function(a){pointerEndHandler(a,function(a){2>a.targetPointerList.length?(document.removeEventListener(n.POINTER_MOVE,da),document.removeEventListener(n.POINTER_END,V),document.removeEventListener(n.POINTER_CANCEL,V),aa=!1,p(c,a.target,S(a,!0))):p(w,a.target,
S(a))})};o.msGestures?(d="MSGestureStart",w="MSGestureChange",c="MSGestureEnd"):o.gestures?(d="gesturestart",w="gesturechange",c="gestureend"):(d="_gesture_start",w="_gesture_change",c="_gesture_end");var ga=o.gestures||o.msGestures?U:X,fa=o.gestures||o.msGestures?Z:Y;n.GESTURE_START=d;n.GESTURE_CHANGE=w;n.GESTURE_END=c}).call(this);