import {directive, inject} from '../../config/decorators';
import {baseURL} from '../../config/constants';

/* jshint ignore:start */
@directive({
  restrict: 'E',
  scope: {
    data: '='
  },
  templateUrl: `${baseURL}components/main/flickr-gallery.html`
})
@inject('$scope')
/* jshint ignore:end */
export default class FlickrGallery {
  constructor ($scope) {
    this.$scope = $scope;
  }
  getData () {
    return this.data;
  }
}
