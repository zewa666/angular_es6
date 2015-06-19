// INFO: import default exports from Non-ES6-Modules without curlies
import angular from 'angular';

import configModule from './config/config';
import {appName} from './config/constants';

import MainComponent from './components/main/main';

var app = angular.module(appName, [
  configModule.name,
  MainComponent.name
]);

// INFO: Override native directive-registration to support classes
var orig = app.directive;
app.directive = (name, implementation) => {
  try {
    var testForFunction = implementation();
    return orig(name, implementation);
  } catch(ex) {
    return orig(name, function () {
      return new implementation();
    });
  }
};

// INFO: Manual Application Bootstrapping
angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});

// INFO: Export app as so others may require it
export {app};
