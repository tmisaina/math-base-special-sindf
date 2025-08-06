"use strict";var G=function(a,e){return function(){return e||a((e={exports:{}}).exports,e),e.exports}};var D=G(function(O,E){
var u=require('@stdlib/math-base-special-deg2radf/dist'),f=require('@stdlib/math-base-special-kernel-sinf/dist'),n=require('@stdlib/math-base-special-kernel-cosf/dist'),_=require('@stdlib/math-base-special-fmodf/dist'),v=require('@stdlib/math-base-special-signumf/dist'),o=require('@stdlib/math-base-special-absf/dist'),r=require('@stdlib/number-float64-base-to-float32/dist'),d=require('@stdlib/math-base-assert-is-nanf/dist'),c=require('@stdlib/math-base-assert-is-infinitef/dist'),t=r(0),m=r(45),g=r(90),k=r(135),s=r(180),l=r(225),p=r(270),N=r(315),q=r(360);function b(a){var e,i;return a=r(a),c(a)||d(a)?NaN:(i=_(a,q),e=o(i),i===t?i:e<m?f(u(i)):e<=k?r(v(i)*n(u(r(g-e)))):e===s?r(v(i)*t):e<l?f(u(r(r(s-e)*v(i)))):e<=N?r(-v(i)*n(u(r(p-e)))):f(u(r(i-r(q*v(i))))))}E.exports=b
});var C=D();module.exports=C;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
