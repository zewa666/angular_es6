// INFO: import default exports from Non-ES6-Modules without curlies
import angular from 'angular';

// INFO: custom components are ES6-Modules, import their non-default items via curlies, otherwise
//       define export like -> export default class ...
import {FlickrService} from './services/flickrService';
import {MainCtrl} from './controllers/mainctrl';
import {FlickrGallery} from './directives/flickrGallery';
import {Shaker} from './directives/shaker';
import {TitleHeaderStyler} from './filters/titleHeaderStyler';


var app = angular.module('AngularES6', []);

// INFO: Override native directive-registration to support classes
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


// INFO: Manual registration
app.constant('baseURL', 'dist/');
app.service('FlickrService', FlickrService);
app.directive('flickrGallery', FlickrGallery);
app.filter('titleHeaderStyler', TitleHeaderStyler);

// INFO: Automatic registration via Decorators
/*app.controller('MainCtrl', MainCtrl);*/
/*app.directive('shaker', Shaker);*/

// INFO: Manual Application Bootstrapping
angular.element(document).ready(function() {
  angular.bootstrap(document, ['AngularES6']);
});

// INFO: Export app as so others may require it
export {app};
