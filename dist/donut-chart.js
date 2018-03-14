(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["DonutChart"] = factory();
	else
		root["DonutChart"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(2);
/**
 * @description 创建环形图
 * @author yangCJ
 * @param {object} option 
 * @param {string} option.x 圆心横坐标 百分比
 * @param {string} option.y 圆心纵坐标 百分比
 * @param {string} radius 圆环半径 百分比
 * @param {string} lineWidth 圆环宽度 百分比
 * @param {number} startAngle 起始角度 0到360
 * @param {string} capType 圆弧拼接类型 "round"
 * @param {string} fontStyle 文本描述样式
 * @param {object} title 标题样式及位置
 * @param {object} tooltip 提示框的样式
 * @param {object} label 标签的样式及显示
 * @param {array} data 圆弧数据
 * @param {string} data[i].name 数据名称
 * @param {number} data[i].value 数据值
 * @param {object} selectedStyle 选中的圆弧样式
 * @param {string} selectedStyle.color 选中的圆弧边界颜色
 * @param {number} selectedStyle.borderWidth 选中的圆弧边界宽度
 * @param {array} color 圆弧的分配颜色
 */
module.exports = DonutChart;
function DonutChart(canvasId, option) {
    this.option = {
        title: {
            show: true,
            text: {
                value: '',
                color: '#999',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            secondText: {
                value: '',
                color: '#666',
                fontSize: '30px',
                fontFamily: 'Arial'
            },
            x: "50%",
            y: "50%"
        },
        tooltip: {
            show: true,
            fontSize: '24px',
            fontFamily: 'Arial',
            color: 'white'
        },
        x: "50%",
        y: "50%",
        radius: "30%",
        lineWidth: "5%",
        startAngle: 0,
        data: [],
        label: {
            show: true,
            firstTextStyle: {
                fontSize: '30px',
                fontFamily: 'Arial',
                color: "#999"
            },
            secondTextStyle: {
                fontSize: '30px',
                fontFamily: 'Arial',
                color: "#666"
            }
        },
        capType: "round",
        selectedStyle: {
            color: "white",
            borderWidth: 10
        },
        color: ["#FF7F00", "#FFFF00 ", "#00FF00 ", "#00FFFF ", "#0000FF", "#8B00FF", "#FF0000 "],
        labelCoverTitle: true
    };
    this.option = utils.extend(true, this.option, option);
    if (this.option.color.length < this.option.data.length) {
        throw 'option.color 颜色少于 option.data';
    }
    this.canvas = document.getElementById(canvasId);
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.circleX = utils.formatPercent(option.x, "option.x") * this.width;
    this.circleY = utils.formatPercent(option.y, "option.x") * this.height;
    this.lineWidth = utils.formatPercent(option.lineWidth, 'option.lineWidth') * (this.width > this.height ? this.height : this.width);
    this.label = option.label;
    this.radius = utils.formatPercent(option.radius, 'option.radius') * (this.width > this.height ? this.height : this.width);
    this.data = option.data;
    this.color = option.color;
}
DonutChart.prototype.drawArc = function (startAngle, endAngle, color, lineWidth) {

    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.radius, utils.angelToRadian(startAngle), utils.angelToRadian(endAngle), false); // 坐标为90的圆，这里起始角度是0，结束角度是Math.PI*2
    if (lineWidth) {
        this.ctx.lineWidth = lineWidth;
    }
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
};
DonutChart.prototype.drawTitle = function (titleFlag) {
    if (!this.option.title.show) {
        return false;
    }
    if (this.option.title && !titleFlag) {
        // title 主标题
        if (!this.option.title.text.value) {
            return false;
        }
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.option.title.text.color;
        this.ctx.font = this.option.title.text.fontSize + ' ' + this.option.title.text.fontFamily;
        // 副标题
        if (!this.option.title.secondText.value) {
            this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height);
            return false;
        }
        this.ctx.fillText(this.option.title.text.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height - 2 * utils.formatPx(this.option.title.text.fontSize, 'option.title.text.fontSize') / 3);
        this.ctx.beginPath();
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = this.option.title.secondText.color;
        this.ctx.font = this.option.title.secondText.fontSize + ' ' + this.option.title.secondText.fontFamily;
        this.ctx.fillText(this.option.title.secondText.value, utils.formatPercent(this.option.title.x, 'option.title.x') * this.width, utils.formatPercent(this.option.title.y, 'option.title.y') * this.height + 2 * utils.formatPx(this.option.title.secondText.fontSize, 'option.title.secondText.fontSize') / 3);
    }
};
DonutChart.prototype.drawTip = function (param) {
    if (!this.option.tooltip.show) {
        return false;
    }
    this.ctx.save();
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle));
    this.ctx.beginPath();
    this.ctx.font = this.option.tooltip.fontSize + ' ' + this.option.tooltip.fontFamily;
    this.ctx.rect(param.x - 5, param.y - 5, this.ctx.measureText(param.data.name).width + 10, 2.5 * utils.formatPx(this.option.tooltip.fontSize) + 10);
    this.ctx.fillStyle = '#00000088';
    this.ctx.fill();
    this.ctx.fillStyle = this.option.tooltip.color;
    this.ctx.textAlign = "start";
    this.ctx.fillText(param.data.name, param.x, param.y + utils.formatPx(this.option.tooltip.fontSize));
    this.ctx.fillText(param.data.value + '(' + param.data.percent + ')', param.x, param.y + 2.2 * utils.formatPx(this.option.tooltip.fontSize));
    this.ctx.restore();
};
DonutChart.prototype.drawLabel = function (param) {
    if (!this.option.label.show) {
        return false;
    }
    // 添加字体
    this.ctx.save();
    this.ctx.rotate(utils.angelToRadian(90 + this.option.startAngle));
    this.ctx.beginPath();
    this.ctx.fillStyle = this.label.firstTextStyle.color;
    this.ctx.font = this.label.firstTextStyle.fontSize + ' ' + this.label.firstTextStyle.fontFamily;
    this.ctx.textAlign = "center";
    this.ctx.fillText(param.name, 0, -2 * utils.formatPx(this.label.firstTextStyle.fontSize, 'label.firstTextStyle.fontSize') / 3);

    this.ctx.beginPath();
    this.ctx.fillStyle = this.label.secondTextStyle.color;
    this.ctx.font = this.label.secondTextStyle.fontSize + ' ' + this.label.secondTextStyle.fontFamily;
    this.ctx.fillText(param.value, 0, 2 * utils.formatPx(this.label.secondTextStyle.fontSize, 'label.secondTextStyle.fontSize') / 3);
    this.ctx.restore();
};
DonutChart.prototype.init = function (callback, titleFlag) {
    if (callback && typeof callback != 'function') {
        throw 'init() 第一个参数必须是函数';
    }
    if (titleFlag && typeof titleFlag != 'boolean') {
        throw 'labelCoverTitle 必须是boolean';
    }
    this.canvas.width = this.canvas.width;
    this.drawTitle(titleFlag);
    this.ctx.translate(this.circleX, this.circleY);

    this.ctx.rotate(utils.angelToRadian(-90 + this.option.startAngle));
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.option.capType;
    var _this = this;
    this.arcArray = [];
    var total = 0;
    this.data.forEach(function (item, index) {
        total += item.value;
    });
    var lastAngel = 0;
    this.data.forEach(function (item, index) {
        var arr = (item.value / total).toFixed(4).toString().slice(2).split('');
        arr.splice(2, 0, '.');
        var num = arr.join('');

        _this.arcArray[index] = {
            index: index,
            name: item.name,
            value: item.value,
            startAngle: lastAngel,
            endAngle: item.value / total * 360 + lastAngel,
            percent: num + '%'
        };
        lastAngel = _this.arcArray[index].endAngle;
    });
    this.data.forEach(function (item, index) {
        _this.drawArc(_this.arcArray[index].startAngle, _this.arcArray[index].endAngle, _this.color[index]);
    });
    for (var i = 0, l = this.data.length; i < l; i++) {
        if (this.data[i].value != 0) {
            this.drawArc(0, 0.05, this.color[i]);
            break;
        }
    }

    // 绑定事件
    this.canvas.onmousemove = function (e) {

        var rate = _this.canvas[this.width > this.height ? "offsetHeight" : "offsetWidth"] / this[this.width > this.height ? "height" : "width"];
        console.log(e.offsetX, this.offsetWidth);
        var x = e.offsetX - this.offsetWidth / 2;
        var y = e.offsetY - this.offsetHeight / 2;
        var x2 = x * x;
        var y2 = y * y;

        // 选中圆环
        if (Math.sqrt(x2 + y2) > (_this.radius - _this.lineWidth) * rate && Math.sqrt(x2 + y2) < (_this.radius + _this.lineWidth) * rate) {
            var angle = Math.atan2(x, -y) / (Math.PI / 180) > 0 ? Math.atan2(x, -y) / (Math.PI / 180) : 360 + Math.atan2(x, -y) / (Math.PI / 180);
            // 选中某段，显示某段

            for (var i = 0, l = _this.arcArray.length; i < l; i++) {
                if (angle < _this.arcArray[i].endAngle) {
                    _this.init(callback, _this.option.labelCoverTitle);
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.option.selectedStyle.color, _this.option.selectedStyle.borderWidth + _this.lineWidth);
                    _this.drawArc(_this.arcArray[i].startAngle, _this.arcArray[i].endAngle, _this.color[i], _this.lineWidth);

                    // show label
                    _this.drawLabel(_this.arcArray[i]);
                    // show tip
                    _this.drawTip({
                        x: x,
                        y: y,
                        data: _this.arcArray[i]
                    });
                    callback(_this.arcArray[i]);
                    break;
                }
            }
        } else {
            _this.init(callback);
        }
    };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;
var support = {};
module.exports = {
    // 百分比字符串转小数
    formatPercent: function formatPercent(param, name) {
        if (typeof param == 'string' && param.indexOf('%') == param.length - 1) {
            return param.slice(0, -1) / 100;
        }
        throw name + " 参数格式错误";
    },

    // 字体大小字符串去px
    formatPx: function formatPx(param, name) {
        if (typeof param == 'string' && param.indexOf('px') == param.length - 2) {
            return +param.slice(0, -2);
        }
        throw name + " 参数格式错误";
    },

    // 角度转弧度
    angelToRadian: function angelToRadian(param) {
        return param * Math.PI / 180;
    },
    extend: function extend() {
        var src,
            copyIsArray,
            copy,
            name,
            options,
            clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== "object" && !this.isFunction(target)) {
            target = {};
        }

        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && this.isArray(src) ? src : [];
                        } else {
                            clone = src && this.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = this.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    },
    isFunction: function isFunction(param) {
        return typeof param == 'function';
    },
    isPlainObject: function isPlainObject(obj) {
        var key;

        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || this.type(obj) !== "object" || obj.nodeType || this.isWindow(obj)) {
            return false;
        }

        try {

            // Not own constructor property must be Object
            if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                return false;
            }
        } catch (e) {

            // IE8,9 Will throw exceptions on certain host objects #9897
            return false;
        }

        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if (!support.ownFirst) {
            for (key in obj) {
                return hasOwn.call(obj, key);
            }
        }

        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for (key in obj) {}

        return key === undefined || hasOwn.call(obj, key);
    },
    type: function type(obj) {
        if (obj == null) {
            return obj + "";
        }
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
    },
    isWindow: function isWindow(obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
    },
    isArray: function isArray(obj) {
        return this.type(obj) === "array";
    }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=donut-chart.js.map