import {directive} from '../../config/decorators';
import {baseURL} from '../../config/constants';

/* jshint ignore:start */
@directive({
  restrict: 'E',
  scope: {
    data: '='
  },
  templateUrl: `${baseURL}/components/main/flickr-gallery.html`
})
/* jshint ignore:end */
export default class FlickrGallery {}
