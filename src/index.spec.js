import Carve from './index';

function setElementStyle (element, style = {}) {
  Object.keys(style).forEach(function (key) {
    element.style[key] = style[key];
  });
  return element;
}

function createElement (style = {}, class_name) {
  const element = document.body.appendChild(document.createElement('div'));

  element.classList.add('inserted_element');
  if (typeof class_name === 'string') {
    element.classList.add(class_name);
  }

  setElementStyle(element, style);
  return element;
}

function removeElements () {
  let element;
  while (element = document.body.querySelector('.inserted_element')) {
    element.parentNode.removeChild(element);
  }
}


describe('Carve', function () {
  let x;

  beforeEach(function () {
    x = new Carve(createElement());
  });

  afterEach(function () {
    x.stopInterval();
    removeElements();
  });

  it('should exist', function () {
    expect(Carve).toBeDefined();
  });

  it('should indicate if animation is active', function () {
    expect(x.isActive()).toBe(false);
    x.start();
    expect(x.isActive()).toBe(true);
    x.end();
    expect(x.isActive()).toBe(false);
  });

});