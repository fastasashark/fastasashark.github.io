/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.scss */ "./src/styles.scss");


let alphabet = [
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
];

let timeout = 1000;
let pix = 50;
let m = 20;
let n = 15;
let number = 16;

let empty_cell = {
    width: pix,
    height: pix,
    color: '#fff'
};

let border_cell = {
    width: pix,
    height: pix,
    color: '#000'
};

let map = Array.from({length: m * n}, (e, i) => 0);

let cells = [];

for (let c = 0; c < number; c++) {
    let name = alphabet[Math.round(Math.random() * 25)] + alphabet[Math.round(Math.random() * 25)] + alphabet[Math.round(Math.random() * 25)];

    map[Math.round(Math.random() * m * n)] = name;

    let _cell =  {
        width: pix,
        height: pix,
        color: "rgb(" + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ", " + Math.round(Math.random() * 255) + ")"
    };
    cells[name] = _cell;
}

document.querySelector('#program').style.width = m * pix;
document.querySelector('#program').style.height = n * pix;

function createSquare(cell) {
    let cellEl = document.createElement("div");

    cellEl.style.width = cell.width;
    cellEl.style.height = cell.height;
    cellEl.style.display = "inline-block";

    //cellEl.innerHTML = cell.name;
    cellEl.style.backgroundColor = cell.color;
    document.querySelector('#program').appendChild(cellEl);
}

function init() {
    document.querySelector('#program').innerHTML = '';
    let cell_in_border = false;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let index = i * m + j;
            let cell_name = map[index];
            let cell = empty_cell;

            if (i == 0 || i == n - 1 || j == 0 || j == m - 1) {
                map[index] = 1;
                cell = border_cell;
            }

            if (cell_name != 0 && cell_name != 1) {
                cell = cells[cell_name];
                let direction = Object.hasOwn(cell, 'direction') ? cell.direction : Math.round(Math.random() * 3);
                cell.direction = direction;

                if (i == 0) {
                    map[(i + 1) * m + j] = cell_name;
                    cell_in_border = true;
                }
                if (i == n - 1) {
                    map[(i - 1) * m + j] = cell_name;
                    cell_in_border = true;
                }
                if (j == 0) {
                    map[i * m + j + 1] = cell_name;
                    cell_in_border = true;
                }
                if (j == m - 1) {
                    map[i * m + j - 1] = cell_name;
                    cell_in_border = true;
                }
            }

            createSquare(cell);
        }
    }
    if (cell_in_border) init();
}

function render() {
    document.querySelector('#program').innerHTML = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let index = i * m + j;

            let cell_name = map[index];
            let cell = empty_cell;

            if (cell_name == 1) {
                cell = border_cell;
            }

            if (cell_name != 0 && cell_name != 1) {
                cell = cells[cell_name];
            }
            createSquare(cell);
        }
    }
}

function run() {
    let new_cells = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let index = i * m + j;
            let cell_name = map[index];

            if (cell_name != 0 && cell_name != 1) {
                let cell = cells[cell_name];
                let direction = Object.hasOwn(cell, 'direction') ? cell.direction : Math.round(Math.random() * 3);

                switch(direction) {
                    case 0://N
                        if (i - 1 != 0) {
                            index = (i - 1) * m + j;
                        }
                        else {
                            index = (i + 1) * m + j;
                            direction = 2;
                        }
                        break;
                    case 1://E
                        if (j + 1 != m - 1) {
                            index = i * m + (j + 1);
                        }
                        else {
                            index = i * m + (j - 1);
                            direction = 3;
                        }
                        break;
                    case 2://S
                        if (i + 1 != n - 1) {
                            index = (i + 1) * m + j;
                        }
                        else {
                            index = (i - 1) * m + j;
                            direction = 0;
                        }
                        break;
                    case 3://W
                        if (j - 1 != 0) {
                            index = i * m + (j - 1);
                        }
                        else {
                            index = i * m + (j + 1);
                            direction = 1;
                        }
                        break;
                }


                cell.direction = direction;
                cells[cell_name] = cell;
                new_cells[index] = cell_name;

            }
            
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            let index = i * m + j;

            if (index in new_cells) {
                map[index] = new_cells[index]
            }
            else {
                map[index] = (i == 0 || i == n - 1 || j == 0 || j == m - 1) ? 1 : 0;
            }
        }
    }
}

init();
setInterval(function() {
    run();
    render();

            
}, timeout);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map