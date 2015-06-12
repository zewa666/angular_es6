import {register} from '../decorators/decorators';

@register({
  type:'controller',
  inject: ['$scope', 'FlickrService']
})
export class MainCtrl {
  constructor($scope, flickrServiceInstance) {
    this.searchTag = "AngularJS";
    this.service = flickrServiceInstance;
  }
}
