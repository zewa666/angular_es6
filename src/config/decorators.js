import angular from 'angular';

export let decoratorsModule = angular.module('decorators', []);

let $injector;

decoratorsModule.run(_$injector_ => {
  $injector = _$injector_;
});

/**
 * @exemple
 *  import {inject} from './decorators';
 *
 *  @inject('$scope', '$http')
 *  class MyController {
 *    constructor($scope, $http) {
 *      this.$scope = $scope;
 *      this.$http = $http;
 *    }
 *  }
 *
 *  class MyOtherController {
 *    @inject $http = null;
 *    @inject MyService = null;
 *    doSomething () {
 *      this.MyService.doServiceTask();
 *    }
 *  }
 */
export function inject (...components) {
  if (typeof components[0] === 'object') {
    let key = components[1];

    return {
        get: () => {
          try {
            return $injector.get(key);
          } catch (err) {
            console.error(err);
            throw new Error(`${key} cannot be injected as a property. Inject it in the class level.`);
          }
        }
      };
  } else {
    return function decorate (target, key, property) {
      target.$inject = components;
    };
  }
}

/**
 * @exemple
 *  import {injectAs} from './decorators';
 *
 *  class MyController {
 *    @injectAs('MyService') service = null;
 *    constructor() {
 *      this.service.doSomething();
 *    }
 *  }
 */
export function injectAs (dep) {
  return function decorate (target, key, descriptor) {
    return {
        get: () => {
          try {
            return $injector.get(dep);
          } catch (err) {
            throw new Error(`${name} cannot be injected as a property. Inject it in the controller.`);
          }
        }
      };
  };
}

/**
 * @exemple
 *  import {directive, inject} from './decorators';
 *  import {baseUrl} from './constants';
 *
 *  @directive({
 *    priority: 42,
 *    templateUrl: `${baseUrl}/components/myComponent/myView.html`,
 *    restrict: 'E',
 *    require: '^parentDirective',
 *    // etc
 *  })
 *  @inject('$scope', '$element', '$attrs')
 *  class MyView {
 *    constructor($scope, $element, '$attrs') {
 *      $element.on('click', e => console.log('click'));
 *    }
 *
 *    // If you want to use link function :
 *    static link (scope, element, attrs) {
 *      element.on('click', e => console.log('click'));
 *    }
 *  }
 */
export function directive (opts) {
  return function decorate (Target) {
    let name = opts.name || getTargetName(Target);
    name = name.substring(0,1).toLowerCase() + name.substring(1);
    function factory(...deps) {
      let inject = Target.$inject || [];
      let directiveDefinitionObject = {
        priority: opts.priority,
        template: opts.template,
        templateUrl: opts.templateUrl,
        transclude: opts.transclude,
        restrict: opts.restrict,
        templateNamespace: opts.templateNamespace,
        scope: opts.scope,
        controller: [...inject, function (...deps) {
          return new Target(...deps);
        }],
        controllerAs: opts.controllerAs || 'ctrl',
        bindToController: opts.bindToController || true,
        require: opts.require
      };
      if (Target.compile) {
        directiveDefinitionObject.compile = function compile(...args) {
          return Target.compile(...args);
        };
      }
      if (Target.link) {
        directiveDefinitionObject.link = function link(...args) {
          return Target.link(...args);
        };
      }
      return directiveDefinitionObject;
    }
    decoratorsModule.directive(name, factory);
  };
}


/**
 * @exemple
 *  import {register} from './decorators';
 *
 *  @register({
 *    type: 'controller'
 *  })
 *  export class MyController {}
 */
export function register (opts) {
  return function decorate(target) {
    if(opts.inject) {
      target.$inject = opts.inject;
    }

    let name = opts.name || getTargetName(target);
    decoratorsModule[opts.type](name, target);
  };
}

/**
 * @exemple
 *  import {controller} from './decorators';
 *
 *  @controller
 *  export class MyController {}
 */
export function controller (target) {
  return register({ type: 'controller' })(target);
}
/**
 * @exemple
 *  import {filter, inject} from './decorators';
 *
 *  @filter
 *  @inject('$http')
 *  export class MyFilter {
 *    constructor($http) {
 *      return this.
 *    }
 *    filter (input) {
 *      return input.toUpperCase();
 *    }
 *  }
 */
export function filter (Target) {
  let name = getTargetName(Target);
  name = name.substring(0,1).toLowerCase() + name.substring(1);
  let deps = Target.$inject || [];
  decoratorsModule.filter(name, [...deps, function (...deps) {
    let instance = new Target();
    return function (...args) { return instance.filter(...args); };
  }]);
}
/**
 * @exemple
 *  import {constant} from './decorators';
 *
 *  @controller
 *  export class MyConstant {
 *    constructor(...deps) {
 *      return () => {};
 *    }
 *  }
 */
export function constant (Target) {
  let name = getTargetName(Target);
  name = name.substring(0,1).toLowerCase() + name.substring(1);
  return register({ type: 'constant', name: name })(new Target());
}
/**
 * @exemple
 *  import {value} from './decorators';
 *
 *  @controller
 *  export class MyValue {
 *    constructor(...deps) {
 *      return () => {};
 *    }
 *  }
 */
export function value (Target) {
  return register({ type: 'value', name: getTargetName(Target) })(new Target());
}
/**
 * @exemple
 *  import {factory} from './decorators';
 *
 *  @controller
 *  export class MyFactory {}
 */
export function factory (target) {
  return register({ type: 'factory' })(target);
}
/**
 * @exemple
 *  import {service} from './decorators';
 *
 *  @controller
 *  export class MyService {}
 */
export function service (target) {
  return register({ type: 'service' })(target);
}
/**
 * @exemple
 *  import {provider} from './decorators';
 *
 *  @controller
 *  export class Myprovider {}
 */
export function provider (target) {
  return register({ type: 'provider' })(target);
}


/**
 * Polyfill for IE to return Target.name
 */
function getTargetName (o) {
  if (o.name) {
    return o.name;
  }
  // if IE
  return o.toString().match(/function\s?(.*)\s?\(/)[1];
}
