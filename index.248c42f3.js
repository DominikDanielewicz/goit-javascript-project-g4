!function(){function e(e,r,t,o){Object.defineProperty(e,r,{get:t,set:o,enumerable:!0,configurable:!0})}function r(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},n={},a=t.parcelRequired76b;null==a&&((a=function(e){if(e in o)return o[e].exports;if(e in n){var r=n[e];delete n[e];var t={id:e,exports:{}};return o[e]=t,r.call(t.exports,t,t.exports),t.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,r){n[e]=r},t.parcelRequired76b=a),a.register("iE7OH",(function(r,t){var o,n;e(r.exports,"register",(function(){return o}),(function(e){return o=e})),e(r.exports,"resolve",(function(){return n}),(function(e){return n=e}));var a={};o=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)a[r[t]]=e[r[t]]},n=function(e){var r=a[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),a.register("aNJCr",(function(r,t){var o;e(r.exports,"getBundleURL",(function(){return o}),(function(e){return o=e}));var n={};function a(e){return(""+e).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/,"$1")+"/"}o=function(e){var r=n[e];return r||(r=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);if(e)return a(e[2])}return"/"}(),n[e]=r),r}})),a("iE7OH").register(JSON.parse('{"84tIK":"index.248c42f3.js","6nhPZ":"zuza.4e776b34.jpg","dGfyM":"marta.184e57ab.jpg","9VkKG":"dominik.af45d5b2.jpg","23B8M":"pawel.1c8b2560.jpg","kjZ9k":"dawid.c96b3885.jpg","4FDtN":"rafal.681e0422.jpg","gwBOU":"patryk.157d22f9.jpg"}'));var i;i=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("6nhPZ");var u;u=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("dGfyM");var c;c=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("9VkKG");var s;s=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("23B8M");var l;l=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("kjZ9k");var d;d=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("4FDtN");var p;p=a("aNJCr").getBundleURL("84tIK")+a("iE7OH").resolve("gwBOU");const f=[{name:"Zuza Kaźmierczak",photo:r(i),role:"Developer",description:"Lorem ipsum Zuza"},{name:"Marta Dąbrowska",photo:r(u),role:"Developer",description:"Lorem ipsum Marta"},{name:"Dominik Danielewicz",photo:r(c),role:"Team Lead, Developer",description:"Lorem ipsum Dominik"},{name:"Paweł Rogowski",photo:r(s),role:"Manual Tester, Developer",description:"Lorem ipsum Paweł"},{name:"Dawid Bartuś",photo:r(l),role:"Scrum Master, Developer",description:"Lorem ipsum Dawid"},{name:"Rafał Szewczyk",photo:r(d),role:"Developer",description:"Lorem ipsum Rafał"},{name:"Patryk Karolczak",photo:r(p),role:"Developer",description:"Lorem ipsum Patryk"}],m=document.querySelector(".authors__backdrop"),v=document.querySelector(".students-link"),h=document.querySelector(".authors__button-close"),_=document.querySelector(".authors__list"),g=document.querySelector(".authors__photo"),w=document.querySelector(".authors__name"),L=document.querySelector(".authors__role"),E=document.querySelector(".authors__description"),H=Array.from(_.children);_.addEventListener("click",(function(e){if("LI"!==e.target.nodeName)return;H.forEach((e=>{e.classList.remove("authors__tab--active"),e.classList.add("authors__tab")})),e.target.classList.add("authors__tab--active");for(const{name:r,photo:t,role:o,description:n}of f)r.includes(e.target.innerText)&&(w.textContent=r,L.textContent=o,E.textContent=n,g.src=t)}));v.addEventListener("click",(e=>{e.preventDefault(),m.classList.replace("hidden","show")})),h.addEventListener("click",(()=>{m.classList.replace("show","hidden")}))}();
//# sourceMappingURL=index.248c42f3.js.map