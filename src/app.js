import angular from 'angular';
import {FlickrService} from './services/flickrService';
import {MainCtrl} from './controllers/mainctrl';
import {FlickrGallery} from './directives/flickrGallery';
import {Shaker} from './directives/shaker';
import {TitleHeaderStyler} from './filters/titleHeaderStyler';


var app = angular.module('AngularES6', []);

var orig = app.directive;
app.directive = (name, implementation) => {
  try {
    var testForFunction = implementation();
    return orig(name, implementation);
  } catch(ex) {
    return orig(name, function () {
      return new implementation();
    });
  }
};


app.constant('baseURL', 'dist/');

app.service('FlickrService', FlickrService);
//app.controller('MainCtrl', MainCtrl);
app.directive('flickrGallery', FlickrGallery);
app.directive('shaker', Shaker);
app.filter('titleHeaderStyler', TitleHeaderStyler);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['AngularES6']);
});

export {app};
