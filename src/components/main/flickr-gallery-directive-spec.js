import angular from 'angular';
/* globals mocks: false */
/* jshint ignore:start */
import * as mocks from 'angular-mocks';
/* jshint ignore:end */
import {appName, baseURL} from '../../config/constants';

describe('<flickr-gallery>', () => {

  let element, $scope, ctrl;
  beforeEach(() => {
    angular.mock.module('mocked-templates');
    angular.mock.module(`${appName}.main`);
    angular.mock.module('decorators');
  });

  beforeEach(inject(($compile, $rootScope) => {
    $scope = $rootScope.$new();
    $scope.images = [{
      title: 'foo'
    }, {
      title: 'bar'
    }];
    element = angular.element('<flickr-gallery data="images"></flickr-gallery>');
    element = $compile(element)($scope);
    $scope.$digest();
    ctrl = element.controller('flickrGallery');
  }));

  it ('should have a $scope', () => {
    expect(ctrl.$scope).toBe(element.isolateScope());
  });

  it('should get data', () => {
    expect(ctrl.getData()).toBe($scope.images);
  });

});
