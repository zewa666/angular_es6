import angular from 'angular';
import {appName} from '../../config/constants';
import MainController from './main-controller';
import FlickrGallery from './flickr-gallery-directive';
import FlickrService from './flickr-service';
import Shaker from './shaker-directive';
import TitleHeaderStyler from './title-header-styler-filter';

let MainComponent = angular.module(`${appName}.main`, []);

export default MainComponent;
