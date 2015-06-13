import angular from 'angular';

let decoratorsModule = angular.module('decorators', []);
export default decoratorsModule;

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
 *    $inject MyService = null;
 *    doSomething () {
 *      this.MyService.doServiceTask();
 *    }
 *  }
 */
export function inject (...components) {
  if (typeof components[0] === 'object') {
    let descriptor = {
      get: () => {
        try {
          return $injector.get(components[1]);
        } catch (err) {
          throw new Error(`${components[1]} cannot be injected as a property. Inject it in the controller.`);
        }
      }
    };
    components[0].$inject = components[0].$inject || [];
    components[0].$inject.push(components[1]);
    return descriptor;
  } else {
    return function decorate (target, key, property) {
      target.$inject = components;
    };
  }
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
  return function decorate (target) {
    let name = opts.name || target.name;
    name = name.substring(0,1).toLowerCase() + name.substring(1);
    function factory(...deps) {
      let inject = target.$inject || [];
      let directiveDefinitionObject = {
        priority: opts.priority,
        template: opts.template,
        templateUrl: opts.templateUrl,
        transclude: opts.transclude,
        restrict: opts.restrict,
        templateNamespace: opts.templateNamespace,
        scope: opts.scope,
        controller: [...inject, function (...deps) {
          return new target(...deps);
        }],
        controllerAs: 'ctrl',
        bindToController: true,
        require: opts.require
      };
      if (target.compile) {
        directiveDefinitionObject.compile = function compile(...args) {
          return target.compile(...args);
        };
      }
      if (target.link) {
        directiveDefinitionObject.link = function link(...args) {
          return target.link(...args);
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
 *  export default class MyController {}
 */
export function register (opts) {
  return function decorate(target) {
    if(opts.inject) {
      target.$inject = opts.inject;
    }

    let name = opts.name || target.name;
    decoratorsModule[opts.type](name, target);
  };
}

/**
 * @exemple
 *  import {controller} from './decorators';
 *
 *  @controller
 *  export defaultclass MyController {}
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
 *  export default class MyFilter {
 *    constructor($http) {
 *      return this.
 *    }
 *    filter (input) {
 *      return input.toUpperCase();
 *    }
 *  }
 */
export function filter (target) {
  let name = target.name;
  name = name.substring(0,1).toLowerCase() + name.substring(1);
  let inject = target.$inject || [];
  decoratorsModule.filter(name, [...inject, function (...deps) {
    return new target(...deps).filter;
  }]);
}
/**
 * @exemple
 *  import {constant} from './decorators';
 *
 *  @controller
 *  export default class MyConstant {}
 */
export function constant (target) {
  return register({ type: 'constant' })(target);
}
/**
 * @exemple
 *  import {value} from './decorators';
 *
 *  @controller
 *  export default class MyValue {}
 */
export function value (target) {
  return register({ type: 'value' })(target);
}
/**
 * @exemple
 *  import {factory} from './decorators';
 *
 *  @controller
 *  export default class MyFactory {}
 */
export function factory (target) {
  return register({ type: 'factory' })(target);
}
/**
 * @exemple
 *  import {service} from './decorators';
 *
 *  @controller
 *  export default class MyService {}
 */
export function service (target) {
  return register({ type: 'service' })(target);
}
/**
 * @exemple
 *  import {provider} from './decorators';
 *
 *  @controller
 *  export default class Myprovider {}
 */
export function provider (target) {
  return register({ type: 'provider' })(target);
}
