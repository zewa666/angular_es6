export class MainCtrl {
  constructor($scope, FlickrService) {
    this.images = [];
    this.searchTag = "AngularJS";
    this.service = FlickrService;
  }
}
