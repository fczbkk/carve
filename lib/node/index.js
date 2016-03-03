'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function calculateValue(origin, target, position) {
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
      this.origin = TheBox.getBox(this.element);
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
      var origin = this.origin[property];
      var target = this.options.target[property];
      var new_value = calculateValue(origin, target, position);
      this.element.style[property] = new_value + 'px';
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