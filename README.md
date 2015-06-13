# Angular ES6

This example shows how to use ES6 with [AngularJS](https://angularjs.org/).

The tools used are:
* [NodeJS](http://nodejs.org/) as a general dependency
* [Gulp](http://gulpjs.com/) for automation of the ES6 to ES5 transpilation as well as BrowserSync
* [BrowserSync](http://gulpjs.com/) automatically refreshes your browser on js/html/css changes
* [jspm](http://jspm.io/) modern Package Manager supporting ES6 Module Syntax
* [BabelJS](https://babeljs.io/) for ES6 to ES5 transpilation

## Development
All AngularJS Application files are located in the folder src/
Make sure to start gulp watch (see below for howto) before doing changes in order to get
the source files automatically transpiled to the dist/ folder

## How to start

In order to start the application do the following:

1. Make sure that [NodeJS](http://nodejs.org/) is installed.
2. Make sure that [Gulp](http://gulpjs.com/) is installed:
  ```shell
  npm install -g gulp
  ```
3. Make sure that [jspm](http://jspm.io/) is installed:
  ```shell
  npm install -g jspm
  ```
4. Go to the project folder
5. Execute the following command to install all node-dependencies:
  ```shell
  npm install
  ```
6. Now install all client-side dependencies with [jspm](http://jspm.io/):
  ```shell
  jspm install
  ```
7. Start the application with the gulp watch task:
  ```shell
  gulp watch
  ```
7. Open up your favorite Browser and navigate to [http://localhost:9000](http://localhost:9000) to see the app.

## Using decorators

### Constants

```
import {constant} from './path/to/config/decorators';

@constant
export default class MyConstant {
  
}
```

### Values

```
import {value} from './path/to/config/decorators';

@value
export default class MyValue {
  
}
```

### Factories

```
import {factory} from './path/to/config/decorators';

@factory
export default class MyFactory {
  constructor (/* dependancies */) { }
}
```

### Services

```
import {service} from './path/to/config/decorators';

@service
export default class MyService {
  constructor (/* dependancies */) { }
}
```

### Providers

```
import {provider} from './path/to/config/decorators';

@constant
export default class MyProvider {
  constructor (/* dependancies */) { }
}
```

### Controllers

```
import {controller} from './path/to/config/decorators';

@controller
export default class MyController {
  constructor (/* dependancies */) { }
}
```

### Directives

```
import {directive} from './path/to/config/decorators';
import {baseURL} from './path/to/config/constants';

@directive({
  restrict: 'E',
  templateUrl: `${baseURL}/path/to/the/template.html`
})
export default class MyController {
  constructor (/* dependancies */) {
    this.foo = 'bar';
  }
}

// In template.html :

<p>{{ ctrl.foo }} will display "bar"</p>
```

### Filters

```
import {filter} from './path/to/config/decorators';

@filter
export default class MyFilter {
  constructor (/* dependancies */) { }
  filter (input) {
    return input.toUpperCase();
  }
}
```

### Injections

```
import {inject} from './path/to/config/decorators';

@controller
@inject('$http', 'MyService')
export default class MyController {
  constructor ($http, MyService) { }
}
```

### Injection as a property

```
import {inject} from './path/to/config/decorators';

@controller
export default class MyController {
  @inject $http = null;
  @inject MyService = null;
  doSomething () {
    $http.get(this.MyService.path);
  }
}
```


## Running Unit Tests

In order to run the unit tests do all mentioned steps from above and the additional ones:

1. Make sure that [Karma](http://karma-runner.github.io/) CLI is installed:
  ```shell
  npm install -g karma-cli
  ```
2. Start the Karma Runner with:
  ```shell
  karma start
  ```
