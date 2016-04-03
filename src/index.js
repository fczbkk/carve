const TheBox = require('the-dom-box');
import {getStyleProperties, getStyleProperty} from 'style-properties';


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

function calculatePositionValue (origin, target, position) {
  return origin + ((target - origin) * position);
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


function getPropertyOrigins (element, properties) {
  const box_properties = ['left', 'top', 'width', 'height'];
  const element_box = TheBox.getBox(element);
  const result = getStyleProperties(element, properties);

  // get box properties from TheBox, it is more precise
  // when calculating fixed element's property, we have to adjust by viewport
  if (getStyleProperty(element, 'position') === 'fixed') {
    const viewport_box = TheBox.getBox('viewport');
    element_box.moveBy(0 - viewport_box.left, 0 - viewport_box.top);
  }

  properties.forEach((property) => {
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

    const properties = Object.keys(this.options.target);
    this.origin = getPropertyOrigins(this.element, properties)
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
    const origin = this.origin[property].value;
    const target = this.options.target[property];
    const new_value = calculatePositionValue(origin, target, position);
    this.element.style[property] = new_value + this.origin[property].unit;
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