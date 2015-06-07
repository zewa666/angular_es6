export function inject (...components) {
  return function decorate (target) {
    target.$inject = components;
  }
}

export function register (opts) {
  return function decorate(target) {
    return System.import('angular').then( () => {
      if(opts.inject) {
        target.$inject = opts.inject;
      }

      var app = angular.module('AngularES6');
      app[opts.type](opts.name || target.name, target);
    });
  }
}
