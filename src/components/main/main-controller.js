import {controller, inject, injectAs} from '../../config/decorators';

/* jshint ignore:start */
@controller
@inject('$scope')
/* jshint ignore:end */
export class MainCtrl {
  /* jshint ignore:start */
  @injectAs('FlickrService') service = null;
  /* jshint ignore:end */
  constructor($scope) {
    this.searchTag = 'AngularJS';
  }
}
