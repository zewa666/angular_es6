import {inject, register} from '../decorators/decorators';

@register({
  type:'controller',
  inject: ['$scope', 'FlickrService']
})
/*@inject('$scope', 'FlickrService')*/
export class MainCtrl {
  constructor($scope, flickrServiceInstance) {
    this.images = [];
    this.searchTag = "AngularJS";
    this.service = flickrServiceInstance;
  }
}
