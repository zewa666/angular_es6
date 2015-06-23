import {controller, inject, injectAs, route} from '../../config/decorators';

/* jshint ignore:start */
@controller
@inject('$scope')
@route({
  path: '/',
  settings: {
    controller: 'MainCtrl',
    templateUrl: 'dist/components/main/main.html',
    controllerAs: 'ctrl'
  }
})
/* jshint ignore:end */
export class MainCtrl {
  /* jshint ignore:start */
  @injectAs('FlickrService') service = null;
  /* jshint ignore:end */
  constructor($scope) {
    this.searchTag = 'AngularJS';
  }
}
