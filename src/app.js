import angular from 'angular';
import {FlickrService} from './services/flickrService';
import {MainCtrl} from './controllers/mainctrl';
import {FlickrGallery} from './directives/flickrGallery';
import {TitleHeaderStyler} from './filters/titleHeaderStyler';

var app = angular.module('AngularES6', []);
app.constant('baseURL', 'dist/');

app.service('FlickrService', FlickrService);
app.controller('MainCtrl', MainCtrl);
app.directive('flickrGallery', FlickrGallery);
app.filter('titleHeaderStyler', TitleHeaderStyler);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['AngularES6']);
});

export {app};
