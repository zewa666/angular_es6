import angular from 'angular';
import {appName} from './constants';

import {decoratorsModule} from './decorators';

let configComponent = angular.module(`${appName}.core`, [
  decoratorsModule.name
]);

export default configComponent;
