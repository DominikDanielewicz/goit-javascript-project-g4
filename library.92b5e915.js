!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired76b;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var n={id:t,exports:{}};return e[t]=n,r.call(n.exports,n,n.exports),n.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){a[t]=e},t.parcelRequired76b=r);var n=r("1HCJj"),o=r("2Kvm0");(0,n.setLibraryState)("watched");const i=document.querySelector(".library-actions");i.addEventListener("click",(function(t){if("BUTTON"!==t.target.tagName)return;const e=i.querySelector(".library-actions__button--active");e.classList.remove("library-actions__button--active"),e.classList.add("library-actions__button");const a=t.target;a.classList.remove("library-actions__button"),a.classList.add("library-actions__button--active"),"Watched"===a.textContent?((0,n.setLibraryState)("watched"),(0,n.setPaginationState)("watched"),console.log("library global state:",n.LIBRARY_STATE),(0,o.createLibrary)("watched",1)):"Queue"===a.textContent&&((0,n.setLibraryState)("queue"),(0,n.setPaginationState)("queue"),(0,o.createLibrary)("queue",1),console.log("library global state:",n.LIBRARY_STATE))}))}();
//# sourceMappingURL=library.92b5e915.js.map
