import {inject} from '../decorators/decorators';

@inject('$scope', 'FlickrService')
export class MainCtrl {
  constructor($scope, flickrServiceInstance) {
    this.images = [];
    this.searchTag = "AngularJS";
    this.service = flickrServiceInstance;
  }
}
