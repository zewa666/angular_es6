import angular from 'angular';
import * as mocks from 'angular-mocks';

describe('FlickrService', () => {

  var service, $httpBackend;
  beforeEach(() => { angular.mock.module('AngularES6') });

  beforeEach(mocks.default.inject((_$httpBackend_, _FlickrService_) => {
    service = _FlickrService_;
    $httpBackend = _$httpBackend_;

    $httpBackend.whenJSONP(/http:\/\/api.flickr.com/)
                .respond({
      "title": "Fake response",
      "link": "http://fakelink.com",
      "description": "",
      "modified": "1970-01-01T01:01:01Z",
      "generator": "FakeGenerator",
      "items": [
       {
        "title": "TEST",
        "link": "http://FakeImageLing",
        "media": {"m":"http://fakeImage.jpg"},
        "date_taken": "1970-01-01T12:05:34-08:00",
        "description": "FakeDescription",
        "published": "1970-01-01T22:59:45Z",
        "author": "fake@unittest.com",
        "author_id": "F@K3",
        "tags": "fake tags for testing"
       }]
     });
  }));


  it("should perform a request against Flickr", () =>  {
    $httpBackend.expectJSONP(/http:\/\/api.flickr.com/);
    service.loadImages('AngularJS');
    $httpBackend.flush();
  });

  it("should contain result with items", function() {
    $httpBackend.expectJSONP(/http:\/\/api.flickr.com/);
    service.loadImages('AngularJS').then(() => {
      expect(service.numberOfHits()).toBe(1);
    });
    $httpBackend.flush();
  });

});
