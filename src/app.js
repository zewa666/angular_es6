import angular from 'angular';

import configModule from './config/config';
import {appName} from './config/constants';

import MainComponent from './components/main/main';

var app = angular.module(appName, [
  configModule.name,
  MainComponent.name
]);

// INFO: Manual Application Bootstrapping
angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});

// INFO: Export app as so others may require it
export {app};
