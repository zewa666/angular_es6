export function inject (...components) {
  return function decorate (target, key, descriptor) {
    if (descriptor) {
      target = descriptor.value;
    }

    target.$inject = components;

    return descriptor;
  }
}

export function register (opts) {
  return function decorate(target, key, descriptor) {
    return System.import('angular').then( () => {

      if(opts.inject) {
        if (descriptor) {
          target = descriptor.value;
        }

        target.$inject = opts.inject;
      }

      var app = angular.module('AngularES6');
      app[opts.type](opts.name || target.name, target);

      return descriptor;
    });
  }
}
