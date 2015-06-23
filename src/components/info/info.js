import {controller, route, inject} from '../../config/decorators';
import angular from 'angular';
import {appName} from '../../config/constants';
import marked from 'marked';

@controller
@route({
  path: '/info',
  settings: {
    controller: 'InfoCtrl',
    templateUrl: 'dist/components/info/info.html',
    controllerAs: 'ctrl'
  }
})
@inject('$templateRequest', '$sce')
export class InfoCtrl {

  constructor($templateRequest, $sce) {

    $templateRequest('./README.md').then( (data) => {
      this.content = $sce.trustAsHtml(marked(data));
    });

  }
}

let InfoComponent = angular.module(`${appName}.info`, []);

export default InfoComponent;