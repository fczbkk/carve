const TheBox = require('the-dom-box');


function getNow () {
  return (new Date).getTime();
}

function easePosition (position) {
  return (-Math.cos(position * Math.PI) / 2) + 0.5;
}

function getPosition (start, duration) {
  const now = getNow();
  const end = start + duration;
  const position = (now >= end) ? 1 : easePosition((now - start) / duration);
  return position;
}

function calculateValue (origin, target, position) {
  return origin + ((target - origin) * position);
}

function getStyleProperty (element, property) {
  if (element) {
    if (element.currentStyle) {
      return element.currentStyle[property];
    } else if (window.getComputedStyle) {
      return document.defaultView
        .getComputedStyle(element, null)
        .getPropertyValue(property);
    }
  }
  return null;
}

const noop = function () {};

const default_options = {
  target: {},
  duration: 1000,
  frequency: 10,
  onStart: noop,
  onEnd: noop,
  onStop: noop
};

module.exports = class {

  constructor (element, options = {}) {
    this.options = {};
    this.setElement(element);
    this.setOptions(default_options);
    this.setOptions(options);
  }

  setElement (element) {
    this.element = element;
  }

  setOptions (options = {}) {
    // only allow option keys that are defined in default options
    for (const key in options) {
      if (typeof default_options[key] !== 'undefined') {
        this.options[key] = options[key];
      }
    }
    return this.options;
  }

  start () {
    this.stopInterval();
    this.options.onStart();

    const now = getNow();
    this.stamp_start = now;

    this.origin = TheBox.getBox(this.element);
    // when calculating fixed element's property, we have to adjust by viewport
    if (getStyleProperty(this.element, 'position') === 'fixed') {
      const viewport_box = TheBox.getBox('viewport');
      this.origin.moveBy(0 - viewport_box.left, 0 - viewport_box.top);
    }

    this.interval = setInterval(() => this.tick(), this.options.frequency);
  }

  end () {
    this.stopInterval();
    this.options.onEnd();
  }

  stop () {
    this.stopInterval();
    this.options.onStop();
  }

  stopInterval () {
    if (this.interval) {
      clearInterval(this.interval);
    }
    delete this.interval;
  }

  updateProperty (property, position) {
    const origin = this.origin[property];
    const target = this.options.target[property];
    const new_value = calculateValue(origin, target, position);
    this.element.style[property] = new_value + 'px';
  }

  tick () {
    var position = getPosition(this.stamp_start, this.options.duration);

    for (const key in this.options.target) {
      this.updateProperty(key, position);
    }

    if (position === 1) {
      this.end();
    }
  }

};