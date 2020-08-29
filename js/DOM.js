(function () {
  "use strict";

  function DOM(domNode) {
    this.element = document.querySelectorAll(domNode);
  }

  DOM.prototype.on = function on(eventType, callback) {
    this.element.forEach((item) => item.addEventListener(eventType, callback));
  };

  DOM.prototype.off = function off(eventType, callback) {
    this.element.forEach((item) =>
      item.removeEventListener(eventType, callback)
    );
  };

  DOM.prototype.get = function get() {
    return this.element;
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.isArray = function isArray(array) {
    return Object.prototype.toString.call(array) === "[object Array]";
  };

  DOM.prototype.isFunction = function isFunction(func) {
    return Object.prototype.toString.call(func) === "[object Function]";
  };

  DOM.prototype.isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  DOM.prototype.isString = function isString(string) {
    return Object.prototype.toString.call(string) === "[object String]";
  };

  DOM.prototype.isBoolean = function isBoolean(bool) {
    return Object.prototype.toString.call(bool) === "[object Boolean]";
  };

  DOM.prototype.isNumber = function isNumber(numb) {
    return Object.prototype.toString.call(numb) === "[object Number]";
  };

  DOM.prototype.isNull = function isNull(nulli) {
    return Object.prototype.toString.call(nulli) === "[object Null]";
  };

  window.DOM = DOM;
})();
