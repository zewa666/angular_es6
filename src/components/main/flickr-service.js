import {service, inject} from '../../config/decorators';

/* jshint ignore:start */
@service
/* jshint ignore:end */
export default class FlickrService {
  /* jshint ignore:start */
  @inject $http = null;
  images = [];
  /* jshint ignore:end */

  numberOfHits() {
    return this.images.length;
  }

  loadImages(searchTag) {
    let URL = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${searchTag}&tagmode=any&format=json&jsoncallback=JSON_CALLBACK`;

    return this.$http
      .jsonp(URL)
      .then(response => {
        this.images = response.data.items;
      });
  }
}
