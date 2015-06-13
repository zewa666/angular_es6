import {filter, inject} from '../../config/decorators';

/* jshint ignore:start */
@filter
@inject('$http')
/* jshint ignore:end */
export class TitleHeaderStyler {
  constructor ($http) {
    this.$http = $http;
  }

  filter(input) {
    return input.toUpperCase();
  }
}
