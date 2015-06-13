import {controller, inject} from '../../config/decorators';

/* jshint ignore:start */
@controller
@inject('$scope', 'FlickrService')
/* jshint ignore:end */
export class MainCtrl {
  constructor($scope, flickrServiceInstance) {
    this.searchTag = 'AngularJS';
    this.service = flickrServiceInstance;
  }
}
