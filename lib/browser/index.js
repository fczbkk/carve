var Carve =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _styleProperties = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TheBox = __webpack_require__(4);
	
	
	function getNow() {
	  return new Date().getTime();
	}
	
	function easePosition(position) {
	  return -Math.cos(position * Math.PI) / 2 + 0.5;
	}
	
	function getPosition(start, duration) {
	  var now = getNow();
	  var end = start + duration;
	  var position = now >= end ? 1 : easePosition((now - start) / duration);
	  return position;
	}
	
	function calculatePositionValue(origin, target, position) {
	  return origin + (target - origin) * position;
	}
	
	var noop = function noop() {};
	
	var default_options = {
	  target: {},
	  duration: 1000,
	  frequency: 10,
	  onStart: noop,
	  onEnd: noop,
	  onStop: noop
	};
	
	function getPropertyOrigins(element, properties) {
	  var box_properties = ['left', 'top', 'width', 'height'];
	  var element_box = TheBox.getBox(element);
	  var result = (0, _styleProperties.getStyleProperties)(element, properties);
	
	  // get box properties from TheBox, it is more precise
	  // when calculating fixed element's property, we have to adjust by viewport
	  if ((0, _styleProperties.getStyleProperty)(element, 'position') === 'fixed') {
	    var viewport_box = TheBox.getBox('viewport');
	    element_box.moveBy(0 - viewport_box.left, 0 - viewport_box.top);
	  }
	
	  properties.forEach(function (property) {
	    if (box_properties.indexOf(property) !== -1) {
	      result[property] = {
	        unit: 'px',
	        value: element_box[property],
	        output: element_box[property] + 'px'
	      };
	    }
	  });
	
	  return result;
	}
	
	module.exports = function () {
	  function _class(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, _class);
	
	    this.options = {};
	    this.setElement(element);
	    this.setOptions(default_options);
	    this.setOptions(options);
	  }
	
	  _createClass(_class, [{
	    key: 'setElement',
	    value: function setElement(element) {
	      this.element = element;
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      // only allow option keys that are defined in default options
	      for (var key in options) {
	        if (typeof default_options[key] !== 'undefined') {
	          this.options[key] = options[key];
	        }
	      }
	      return this.options;
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this = this;
	
	      this.stopInterval();
	      this.options.onStart();
	
	      var now = getNow();
	      this.stamp_start = now;
	
	      var properties = Object.keys(this.options.target);
	      this.origin = getPropertyOrigins(this.element, properties);
	      this.interval = setInterval(function () {
	        return _this.tick();
	      }, this.options.frequency);
	    }
	  }, {
	    key: 'end',
	    value: function end() {
	      this.stopInterval();
	      this.options.onEnd();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.stopInterval();
	      this.options.onStop();
	    }
	  }, {
	    key: 'stopInterval',
	    value: function stopInterval() {
	      if (this.interval) {
	        clearInterval(this.interval);
	      }
	      delete this.interval;
	    }
	  }, {
	    key: 'updateProperty',
	    value: function updateProperty(property, position) {
	      var origin = this.origin[property].value;
	      var target = this.options.target[property];
	      var new_value = calculatePositionValue(origin, target, position);
	      this.element.style[property] = new_value + this.origin[property].unit;
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      var position = getPosition(this.stamp_start, this.options.duration);
	
	      for (var key in this.options.target) {
	        this.updateProperty(key, position);
	      }
	
	      if (position === 1) {
	        this.end();
	      }
	    }
	  }]);
	
	  return _class;
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getStyleProperty = getStyleProperty;
	exports.getStyleProperties = getStyleProperties;
	
	var _changeCase = __webpack_require__(2);
	
	var _parsePropertyValue = __webpack_require__(3);
	
	var _parsePropertyValue2 = _interopRequireDefault(_parsePropertyValue);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	/**
	 * @typedef {Object} StyleProperty
	 * @property {string} unit - unit of the property, e.g. px, rgb
	 * @property {string|number} value - value of the property
	 * @property {string} output - valid string representation of value and unit
	 *
	 * @example <caption>Simple property.</caption>
	 * {
	 *   unit: 'px',
	 *   value: 100,
	 *   output: '100px'
	 * }
	 *
	 * @example <caption>Color property.</caption>
	 * {
	 *   unit: 'rgb',
	 *   value: [255, 255, 255],
	 *   output: '#ffffff'
	 * }
	 */
	
	/**
	 * Returns information about unit and value of given property for given element.
	 * @param {HTMLElement} element
	 * @param {string} property - Name of the property. You can use either camelCase (e.g. zIndex) or kebab-case (e.g. z-index).
	 * @returns {StyleProperty}
	 *
	 * @example
	 * var element_width = getStyleProperty(my_element, 'width');
	 * // returns {unit: 'px', value: 100, output: '100px'}
	 */
	function getStyleProperty(element, property) {
	  property = (0, _changeCase.toKebabCase)(property);
	  var value = document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
	  return (0, _parsePropertyValue2.default)(value);
	}
	
	/**
	 * Returns information about multiple properties of given element.
	 * @param {HTMLElement} element
	 * @param {Array|string} properties - List of properties. Single property (string) will be converted to an array.
	 * @returns {Object} - Keys of the returned objects are property names, values are objects containing information about given property.
	 *
	 * @example
	 * var element_size = getStyleProperties(my_element, ['width', 'height']);
	 * // returns
	 * // {
	 * //   width: {unit: 'px', value: 100, output: '100px'},
	 * //   height: {unit: 'px', value: 100, output: '100px'}
	 * // }
	 */
	function getStyleProperties(element) {
	  var properties = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  if (typeof properties === 'string') {
	    properties = [properties];
	  }
	
	  var result = {};
	
	  properties.forEach(function (property) {
	    result[property] = getStyleProperty(element, property);
	  });
	
	  return result;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.toCamelCase = toCamelCase;
	exports.toKebabCase = toKebabCase;
	var delimiters = [' ', '-', '_'];
	
	function toCamelCase() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  var characters = input.split('');
	  var result = [];
	
	  var character = void 0;
	  while (character = characters.shift()) {
	    if (delimiters.indexOf(character) !== -1) {
	      if (character = characters.shift()) {
	        character = character.toUpperCase();
	      }
	    }
	    result.push(character);
	  }
	
	  return result.join('');
	}
	
	function toKebabCase() {
	  var input = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	
	  var characters = input.split('');
	  var result = [];
	
	  characters.forEach(function (character) {
	    var lowercase_character = character.toLowerCase();
	    if (character !== lowercase_character) {
	      result.push('-', lowercase_character);
	    } else if (delimiters.indexOf(character) !== -1) {
	      result.push('-');
	    } else {
	      result.push(character);
	    }
	  });
	
	  return result.join('');
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (value) {
	  return re_color.test(value) ? parseColorProperty(value) : parseRegularProperty(value);
	};
	
	var re_color = /^rgb\((\d+),\s?(\d+),\s?(\d+)\)$/;
	var re_prop = /^(-?\d*\.?\d*)(.*)$/;
	
	// converts number in base 10 to base 16, adds padding zero if needed
	function convertColorComponent(input) {
	  var result = input.toString(16);
	  if (result.length < 2) {
	    result = '0' + result;
	  }
	  return result;
	}
	
	function parseColorProperty(value) {
	  var matches = value.match(re_color);
	  var result = {};
	
	  result.unit = 'rgb';
	
	  result.value = [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3], 10)];
	
	  result.output = '#' + convertColorComponent(result.value[0]) + convertColorComponent(result.value[1]) + convertColorComponent(result.value[2]);
	
	  return result;
	}
	
	function parseRegularProperty(value) {
	  var result = {
	    unit: '',
	    value: null,
	    output: 'auto'
	  };
	
	  if (value !== 'auto') {
	    var matches = value.match(re_prop);
	    result.value = parseFloat(matches[1]);
	    result.unit = matches[2];
	    result.output = result.value + result.unit;
	  }
	
	  return result;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _getBox = __webpack_require__(5);
	
	var _getBox2 = _interopRequireDefault(_getBox);
	
	var _getDistance = __webpack_require__(12);
	
	var _getDistance2 = _interopRequireDefault(_getDistance);
	
	var _getOverlap = __webpack_require__(16);
	
	var _getOverlap2 = _interopRequireDefault(_getOverlap);
	
	var _detectOverlap = __webpack_require__(17);
	
	var _detectOverlap2 = _interopRequireDefault(_detectOverlap);
	
	var _getPivotAngle = __webpack_require__(18);
	
	var _getPivotAngle2 = _interopRequireDefault(_getPivotAngle);
	
	var _moveInside = __webpack_require__(19);
	
	var _moveInside2 = _interopRequireDefault(_moveInside);
	
	var _contains = __webpack_require__(20);
	
	var _contains2 = _interopRequireDefault(_contains);
	
	var _canContain = __webpack_require__(21);
	
	var _canContain2 = _interopRequireDefault(_canContain);
	
	var _canCoexist = __webpack_require__(22);
	
	var _canCoexist2 = _interopRequireDefault(_canCoexist);
	
	var _canFitAround = __webpack_require__(23);
	
	var _canFitAround2 = _interopRequireDefault(_canFitAround);
	
	var _findClosest = __webpack_require__(25);
	
	var _findClosest2 = _interopRequireDefault(_findClosest);
	
	var _fitAround = __webpack_require__(26);
	
	var _fitAround2 = _interopRequireDefault(_fitAround);
	
	var _shrinkToFit = __webpack_require__(27);
	
	var _shrinkToFit2 = _interopRequireDefault(_shrinkToFit);
	
	var _align = __webpack_require__(28);
	
	var _align2 = _interopRequireDefault(_align);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	module.exports = {
	  getBox: _getBox2.default,
	  getDistance: _getDistance2.default,
	  getOverlap: _getOverlap2.default,
	  detectOverlap: _detectOverlap2.default,
	  getPivotAngle: _getPivotAngle2.default,
	  moveInside: _moveInside2.default,
	  contains: _contains2.default,
	  canContain: _canContain2.default,
	  canCoexist: _canCoexist2.default,
	  canFitAround: _canFitAround2.default,
	  findClosest: _findClosest2.default,
	  fitAround: _fitAround2.default,
	  shrinkToFit: _shrinkToFit2.default,
	  align: _align2.default
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = getBox;
	
	var _iselement = __webpack_require__(6);
	
	var _iselement2 = _interopRequireDefault(_iselement);
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	var _element = __webpack_require__(8);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _document = __webpack_require__(10);
	
	var _document2 = _interopRequireDefault(_document);
	
	var _viewport = __webpack_require__(11);
	
	var _viewport2 = _interopRequireDefault(_viewport);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function isDocument(input) {
	  return input === 'document' || input === document || input === document.body || input === document.documentElement;
	}
	
	function isCollection(input) {
	  var string_representation = Object.prototype.toString.call(input);
	  return string_representation === '[object NodeList]' || string_representation === '[object HTMLCollection]';
	}
	
	/**
	 * Checks for the type of `input` and returns appropriate Box object.
	 * @param {*} [input]
	 * @returns {Object} instance of Box object
	 */
	function getBox(input) {
	  if ((0, _iselement2.default)(input)) {
	    return new _element2.default(input);
	  }
	
	  if (input === 'viewport') {
	    return new _viewport2.default();
	  }
	
	  if (isDocument(input)) {
	    return new _document2.default();
	  }
	
	  if (isCollection(input)) {
	    return new BoxCollection(input);
	  }
	
	  return new _generic2.default(input);
	}

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	};
	
	exports.default = function (obj) {
	  return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj.nodeType === 1 && _typeof(obj.style) === 'object' && _typeof(obj.ownerDocument) === 'object';
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	var _class = function () {
	  function _class() {
	    var input = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    _classCallCheck(this, _class);
	
	    // default values
	    this.left = 0;
	    this.top = 0;
	    this.width = 0;
	    this.height = 0;
	
	    this.input = input;
	    this.update();
	  }
	
	  // calculated properties
	
	  _createClass(_class, [{
	    key: 'set',
	
	    // updates values of properties
	    value: function set() {
	      var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var _arr = ['left', 'top', 'width', 'height'];
	
	      for (var _i = 0; _i < _arr.length; _i++) {
	        var property = _arr[_i];
	        if (typeof properties[property] !== 'undefined') {
	          this[property] = properties[property];
	        }
	      }
	      return this.get();
	    }
	
	    // returns object with all current properties
	
	  }, {
	    key: 'get',
	    value: function get() {
	      return {
	        left: this.left,
	        top: this.top,
	        right: this.right,
	        bottom: this.bottom,
	        width: this.width,
	        height: this.height
	      };
	    }
	
	    // In generic box, this does nothing. It is just a placeholder for method
	    // that will be used to get current values for DOM element, collection, etc.
	
	  }, {
	    key: 'update',
	    value: function update() {
	      return this.set(this.input);
	    }
	
	    // adds padding around the whole box
	
	  }, {
	    key: 'pad',
	    value: function pad() {
	      var padding = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	      this.left -= padding;
	      this.top -= padding;
	      this.width += padding * 2;
	      this.height += padding * 2;
	    }
	  }, {
	    key: 'moveTo',
	    value: function moveTo(left, top) {
	      if (typeof left === 'number') {
	        this.left = left;
	      }
	      if (typeof top === 'number') {
	        this.top = top;
	      }
	      return this.get();
	    }
	  }, {
	    key: 'movePivotTo',
	    value: function movePivotTo(left, top) {
	      if (typeof left !== 'number') {
	        left = this.pivot.left;
	      }
	      if (typeof top !== 'number') {
	        top = this.pivot.top;
	      }
	
	      this.moveTo(left - this.width / 2, top - this.height / 2);
	
	      return this.get();
	    }
	  }, {
	    key: 'moveBy',
	    value: function moveBy(horizontal, vertical) {
	      if (typeof horizontal === 'number') {
	        this.left = this.left + horizontal;
	      }
	      if (typeof vertical === 'number') {
	        this.top = this.top + vertical;
	      }
	      return this.get();
	    }
	  }, {
	    key: 'resizeTo',
	    value: function resizeTo(width, height) {
	      if (typeof width === 'number') {
	        this.width = width;
	      }
	      if (typeof height === 'number') {
	        this.height = height;
	      }
	      return this.get();
	    }
	  }, {
	    key: 'resizeBy',
	    value: function resizeBy(horizontal, vertical) {
	      if (typeof horizontal === 'number') {
	        this.width += horizontal;
	      }
	      if (typeof vertical === 'number') {
	        this.height += vertical;
	      }
	      return this.get();
	    }
	
	    // for better debug
	
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return JSON.stringify(this.get());
	    }
	  }, {
	    key: 'right',
	    get: function get() {
	      return this.left + this.width;
	    }
	  }, {
	    key: 'bottom',
	    get: function get() {
	      return this.top + this.height;
	    }
	  }, {
	    key: 'pivot',
	    get: function get() {
	      return {
	        left: this.left + this.width / 2,
	        top: this.top + this.height / 2
	      };
	    }
	  }]);
	
	  return _class;
	}();
	
	exports.default = _class;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	var _getScrollPosition = __webpack_require__(9);
	
	var _getScrollPosition2 = _interopRequireDefault(_getScrollPosition);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var _class = function (_Box) {
	  _inherits(_class, _Box);
	
	  function _class() {
	    _classCallCheck(this, _class);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	  }
	
	  _createClass(_class, [{
	    key: 'update',
	    value: function update() {
	      var bounding_box = this.input.getBoundingClientRect();
	      var scroll_position = (0, _getScrollPosition2.default)();
	      return this.set({
	        width: bounding_box.width,
	        height: bounding_box.height,
	        left: scroll_position.left + bounding_box.left,
	        top: scroll_position.top + bounding_box.top
	      });
	    }
	  }]);
	
	  return _class;
	}(_generic2.default);
	
	exports.default = _class;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  // modern browsers
	  if (typeof window.pageXOffset !== 'undefined') {
	    return {
	      left: window.pageXOffset,
	      top: window.pageYOffset
	    };
	  }
	
	  // obsolete browsers
	  return {
	    left: document_root.scrollLeft,
	    top: document_root.scrollTop
	  };
	};
	
	/**
	 * Cross-browser reference to the root document node.
	 * @type {Element|Node|HTMLElement}
	 */
	var document_root = exports.document_root = document.documentElement || document.body.parentNode || document.body;
	
	/**
	 * Cross-browser function to get left and top position of viewport relative to
	 * the document.
	 * @returns {*}
	 */

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var _class = function (_Box) {
	  _inherits(_class, _Box);
	
	  function _class() {
	    _classCallCheck(this, _class);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	  }
	
	  _createClass(_class, [{
	    key: 'update',
	    value: function update() {
	      return this.set({
	        left: 0,
	        top: 0,
	        width: Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth, 0),
	        height: Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, 0)
	      });
	    }
	  }]);
	
	  return _class;
	}(_generic2.default);
	
	exports.default = _class;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	}();
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	var _getScrollPosition = __webpack_require__(9);
	
	var _getScrollPosition2 = _interopRequireDefault(_getScrollPosition);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}
	
	function _possibleConstructorReturn(self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var _class = function (_Box) {
	  _inherits(_class, _Box);
	
	  function _class() {
	    _classCallCheck(this, _class);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	  }
	
	  _createClass(_class, [{
	    key: 'update',
	    value: function update() {
	      var scroll_position = (0, _getScrollPosition2.default)();
	
	      return this.set({
	        left: scroll_position.left,
	        top: scroll_position.top,
	        width: window.innerWidth || document.documentElement.clientWidth || 0,
	        height: window.innerHeight || document.documentElement.clientHeight || 0
	      });
	    }
	  }]);
	
	  return _class;
	}(_generic2.default);
	
	exports.default = _class;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  var difference = (0, _getDifference2.default)(a, b);
	
	  var result = {
	    horizontal: Math.max(0, difference.horizontal),
	    vertical: Math.max(0, difference.vertical),
	    pivot: (0, _getHypotenuse2.default)(a.pivot.left - b.pivot.left, a.pivot.top - b.pivot.top)
	  };
	
	  result.direct = (0, _getHypotenuse2.default)(result.horizontal, result.vertical);
	
	  return result;
	};
	
	var _getDifference = __webpack_require__(13);
	
	var _getDifference2 = _interopRequireDefault(_getDifference);
	
	var _getHypotenuse = __webpack_require__(15);
	
	var _getHypotenuse2 = _interopRequireDefault(_getHypotenuse);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  var bounding_box = (0, _getBoundingBox2.default)([a, b]);
	  return {
	    horizontal: bounding_box.width - a.width - b.width,
	    vertical: bounding_box.height - a.height - b.height
	  };
	};
	
	var _getBoundingBox = __webpack_require__(14);
	
	var _getBoundingBox2 = _interopRequireDefault(_getBoundingBox);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var boxes = arguments.length <= 0 || arguments[0] === undefined ? [{ left: 0, top: 0, right: 0, bottom: 0 }] : arguments[0];
	
	  // object for remembering extreme values, starting with values of first box
	  var extremes = {
	    left: boxes[0].left,
	    top: boxes[0].top,
	    right: boxes[0].right,
	    bottom: boxes[0].bottom
	  };
	
	  // go through each box, update extreme values where applicable
	  boxes.forEach(function (box) {
	    if (box.left < extremes.left) {
	      extremes.left = box.left;
	    }
	    if (box.top < extremes.top) {
	      extremes.top = box.top;
	    }
	    if (box.right > extremes.right) {
	      extremes.right = box.right;
	    }
	    if (box.bottom > extremes.bottom) {
	      extremes.bottom = box.bottom;
	    }
	  });
	
	  // return Box object with extreme values
	  return new _generic2.default({
	    left: extremes.left,
	    top: extremes.top,
	    width: extremes.right - extremes.left,
	    height: extremes.bottom - extremes.top
	  });
	};
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (x, y) {
	  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  // if boxes do not overlap, just return `null`...
	  if ((0, _detectOverlap2.default)(a, b)) {
	    return new _generic2.default({
	      left: Math.max(a.left, b.left),
	      top: Math.max(a.top, b.top),
	      width: Math.min(a.right, b.right) - Math.max(a.left, b.left),
	      height: Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
	    });
	  }
	
	  return null;
	};
	
	var _detectOverlap = __webpack_require__(17);
	
	var _detectOverlap2 = _interopRequireDefault(_detectOverlap);
	
	var _generic = __webpack_require__(7);
	
	var _generic2 = _interopRequireDefault(_generic);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  var difference = (0, _getDifference2.default)(a, b);
	  return difference.horizontal < 0 && difference.vertical < 0;
	};
	
	var _getDifference = __webpack_require__(13);
	
	var _getDifference2 = _interopRequireDefault(_getDifference);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b, use_radian) {
	  // angle in radians
	  var result = Math.atan2(b.pivot.top - a.pivot.top, b.pivot.left - a.pivot.left);
	
	  if (use_radian) {
	    return result;
	  }
	
	  // convert to degrees
	  return result * (180 / Math.PI);
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  if (b.right > a.right) {
	    b.left = a.right - b.width;
	  }
	  if (b.bottom > a.bottom) {
	    b.top = a.bottom - b.height;
	  }
	  if (b.left < a.left) {
	    b.left = a.left;
	  }
	  if (b.top < a.top) {
	    b.top = a.top;
	  }
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  return a.left <= b.left && a.top <= b.top && a.right >= b.right && a.bottom >= b.bottom;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  return a.width >= b.width && a.height >= b.height;
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b, c) {
	  return (0, _canContain2.default)(a, (0, _getBoundingBox2.default)([b, c]));
	};
	
	var _canContain = __webpack_require__(21);
	
	var _canContain2 = _interopRequireDefault(_canContain);
	
	var _getBoundingBox = __webpack_require__(14);
	
	var _getBoundingBox2 = _interopRequireDefault(_getBoundingBox);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b, c) {
	  // can `c` itself fit inside `a`?
	  if (!(0, _canContain2.default)(a, c)) {
	    return false;
	  }
	
	  var gaps = (0, _getGaps2.default)(a, b);
	  return (c.width <= gaps.horizontal.before || c.width <= gaps.horizontal.after) && (c.height <= gaps.vertical.before || c.height <= gaps.vertical.after);
	};
	
	var _canContain = __webpack_require__(21);
	
	var _canContain2 = _interopRequireDefault(_canContain);
	
	var _getGaps = __webpack_require__(24);
	
	var _getGaps2 = _interopRequireDefault(_getGaps);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  var result = {
	    horizontal: {
	      before: Math.max(0, b.left - a.left),
	      after: Math.max(0, a.right - b.right)
	    },
	    vertical: {
	      before: Math.max(0, b.top - a.top),
	      after: Math.max(0, a.bottom - b.bottom)
	    }
	  };
	
	  // Gaps can not be bigger than the parent box.
	  // This can happen when child box is outside parent box.
	  if (result.horizontal.before > a.width) {
	    result.horizontal.before = a.width;
	  }
	  if (result.horizontal.after > a.width) {
	    result.horizontal.after = a.width;
	  }
	  if (result.vertical.before > a.height) {
	    result.vertical.before = a.height;
	  }
	  if (result.vertical.after > a.height) {
	    result.vertical.after = a.height;
	  }
	
	  return result;
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a) {
	  var boxes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	  var property = arguments.length <= 2 || arguments[2] === undefined ? 'direct' : arguments[2];
	
	  var lowest_distance = Number.MAX_VALUE;
	  var result = null;
	
	  boxes.forEach(function (box) {
	    var distance = (0, _getDistance2.default)(a, box)[property];
	    if (distance < lowest_distance) {
	      result = box;
	      lowest_distance = distance;
	    }
	  });
	
	  return result;
	};
	
	var _getDistance = __webpack_require__(12);
	
	var _getDistance2 = _interopRequireDefault(_getDistance);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b, c) {
	  if ((0, _canFitAround2.default)(a, b, c)) {
	    // find available targets
	    var gaps = (0, _getGaps2.default)(a, b);
	
	    var targets = [(0, _getBox2.default)({
	      left: a.left,
	      top: a.top,
	      width: gaps.horizontal.before,
	      height: a.height
	    }), (0, _getBox2.default)({
	      left: a.right - gaps.horizontal.after,
	      top: a.top,
	      width: gaps.horizontal.after,
	      height: a.height
	    }), (0, _getBox2.default)({
	      left: a.left,
	      top: a.top,
	      width: a.width,
	      height: gaps.vertical.before
	    }), (0, _getBox2.default)({
	      left: a.left,
	      top: a.bottom - gaps.horizontal.after,
	      width: a.width,
	      height: gaps.vertical.after
	    })];
	
	    var valid_targets = targets.filter(function (target) {
	      return (0, _canContain2.default)(target, c);
	    });
	
	    // choose closest targets and move inside it, if possible
	    var target = (0, _findClosest2.default)(c, valid_targets, 'direct');
	
	    if (target !== null) {
	      (0, _moveInside2.default)(target, c);
	    }
	  }
	};
	
	var _getBox = __webpack_require__(5);
	
	var _getBox2 = _interopRequireDefault(_getBox);
	
	var _getGaps = __webpack_require__(24);
	
	var _getGaps2 = _interopRequireDefault(_getGaps);
	
	var _canContain = __webpack_require__(21);
	
	var _canContain2 = _interopRequireDefault(_canContain);
	
	var _canFitAround = __webpack_require__(23);
	
	var _canFitAround2 = _interopRequireDefault(_canFitAround);
	
	var _findClosest = __webpack_require__(25);
	
	var _findClosest2 = _interopRequireDefault(_findClosest);
	
	var _moveInside = __webpack_require__(19);
	
	var _moveInside2 = _interopRequireDefault(_moveInside);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b) {
	  if (a.width < b.width) {
	    b.height = adjustByRatio(a.width, b.width, b.height);
	    b.width = a.width;
	  }
	  if (a.height < b.height) {
	    b.width = adjustByRatio(a.height, b.height, b.width);
	    b.height = a.height;
	  }
	};
	
	// returns `secondary` adjusted by the same ratio
	// as when resizing `primary` to `target`
	function adjustByRatio(target, primary, secondary) {
	  var ratio = target / primary;
	  return secondary * ratio;
	} // Adjusts size of `b` so that it fits `a` while keeping original ratio.
	// Does nothing if `b` is smaller than `a`.

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (a, b, horizontal, vertical) {
	
	  switch (horizontal) {
	    case 'left':
	      b.left = a.left;
	      break;
	    case 'right':
	      b.left = a.left + a.width - b.width;
	      break;
	    case 'center':
	      b.left = a.left + a.width / 2 - b.width / 2;
	      break;
	    default:
	      break;
	  }
	
	  switch (vertical) {
	    case 'top':
	      b.top = a.top;
	      break;
	    case 'bottom':
	      b.top = a.top + a.height - b.height;
	      break;
	    case 'center':
	      b.top = a.top + a.height / 2 - b.height / 2;
	      break;
	    default:
	      break;
	  }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=index.js.map