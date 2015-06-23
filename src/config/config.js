import angular from 'angular';
import {appName} from './constants';

import DecoratorsComponent from './decorators';

export let routes = [];

let configComponent = angular.module(`${appName}.core`, [
  DecoratorsComponent.name
]);

export default configComponent;
