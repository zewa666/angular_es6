System.config({
  "baseUrl": "dist",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "angular-es6/*": "lib/*.js"
  }
});

System.config({
  "map": {
    "angular": "github:angular/bower-angular@1.3.8",
    "angular-mocks": "github:angular/bower-angular-mocks@1.3.8",
    "bootstrap": "github:twbs/bootstrap@3.3.1",
    "npm:marked": "npm:marked@0.3.2",
    "github:twbs/bootstrap@3.3.1": {
      "css": "github:systemjs/plugin-css@0.1.0",
      "jquery": "github:components/jquery@2.1.3"
    }
  }
});

