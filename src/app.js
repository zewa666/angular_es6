import angular from 'angular';

import configModule from './config/config';
import {appName} from './config/constants';

import MainComponent from './components/main/main';
import InfoComponent from './components/info/info';
import ngRoute from 'angular-route';
import {routes} from './config/decorators';

var app = angular.module(appName, [
  configModule.name,
  MainComponent.name,
  InfoComponent.name,
  'ngRoute'
]);

app.config( ($routeProvider) => {
  routes.map( (route) => {
    $routeProvider.when(route.path, route.settings);
  });
});

// INFO: Manual Application Bootstrapping
angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});

// INFO: Export app as so others may require it
export {app};
