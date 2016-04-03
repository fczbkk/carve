'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _styleProperties = require('style-properties');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TheBox = require('the-dom-box');


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