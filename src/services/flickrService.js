export class FlickrService {
  constructor($http) {
    this.$http = $http;
    this.images = [];
  }

  numberOfHits() {
    return this.images.length;
  }

  loadImages(searchTag) {
    var URL = `http://api.flickr.com/services/feeds/photos_public.gne?tags=${searchTag}&tagmode=any&format=json&jsoncallback=JSON_CALLBACK`;

    return this.$http
               .jsonp(URL)
               .then(response => {
                 this.images = response.data.items;
               });
  }
}
