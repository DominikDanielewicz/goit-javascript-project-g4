var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},i=e.parcelRequired76b;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in o){var i=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,i.call(n.exports,n,n.exports),n.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){o[e]=t},e.parcelRequired76b=i);var n=i("7Y9D8");document.querySelector(".modal-movie__buttons").addEventListener("click",(e=>{const t=e.target,o=t.dataset.id;if("ADD TO WATCHED"===t.textContent){let e=JSON.parse(localStorage.getItem("watched"))||[];e.includes(o)?n.Notify.info("this movie already exists in your watched library."):(e.push(o),localStorage.setItem("watched",JSON.stringify(e)),n.Notify.success("Movie has been added to watched."))}else if("ADD TO QUEUE"===t.textContent){let e=JSON.parse(localStorage.getItem("queue"))||[];e.includes(o)?n.Notify.info("Movie already exists in queue."):(e.push(o),localStorage.setItem("queue",JSON.stringify(e)),n.Notify.success("Movie has been added to queue."))}}));
//# sourceMappingURL=index.02d1c49b.js.map
