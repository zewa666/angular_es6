# Angular ES6

This example shows how to use ES6 with [AngularJS](https://angularjs.org/).

The tools used are:
* [NodeJS](http://nodejs.org/) as a general dependency
* [Gulp](http://gulpjs.com/) for automation of the ES6 to ES5 transpilation as well as BrowserSync
* [BrowserSync](http://gulpjs.com/) automatically refreshes your browser on js/html/css changes
* [jspm](http://jspm.io/) modern Package Manager supporting ES6 Module Syntax
* [BabelJS](https://babeljs.io/) for ES6 to ES5 transpilation
* [isparta](https://github.com/douglasduteil/isparta) for ES6 code coverage

## Development
All AngularJS Application files are located in the folder src/
Make sure to start gulp watch (see below for howto) before doing changes in order to get
the source files automatically transpiled to the dist/ folder

## How to start

In order to start the application do the following:

1. Make sure that [NodeJS](http://nodejs.org/) is installed.
2. Make sure that [Gulp](http://gulpjs.com/) is installed: `npm install -g gulp`
3. Make sure that [jspm](http://jspm.io/) is installed: `npm install -g jspm`
4. Go to the project folder
5. Execute the following command to install all node-dependencies: `npm install`
6. Now install all client-side dependencies with [jspm](http://jspm.io/): `jspm install`
7. Start the application with the gulp watch task: `gulp watch`
8. Open up your favorite Browser and navigate to [http://localhost:9000](http://localhost:9000) to see the app.

## Using decorators

There is a base decorator called `@register` which performs generic component registrations. In order to save work
you may use one of the following concrete implementations, which allow you to omit the type information

### Constants

```js
import {constant} from './path/to/config/decorators';

@constant
export default class MyConstant {
  constructor () {
    return 'my-constant';
  }
}
```

### Values

```js
import {value} from './path/to/config/decorators';

@value
export default class MyValue {
  constructor () {
    return 'my-value';
  }
}
```

### Factories

```js
import {factory} from './path/to/config/decorators';

@factory
export default class MyFactory {
  constructor (/* dependancies */) { }
}
```

### Services

```js
import {service} from './path/to/config/decorators';

@service
export default class MyService {
  constructor (/* dependancies */) { }
}
```

### Providers

```js
import {provider} from './path/to/config/decorators';

@provider
export default class MyProvider {
  constructor (/* dependancies */) { }
}
```

### Controllers

```js
import {controller} from './path/to/config/decorators';

@controller
export default class MyController {
  constructor (/* dependancies */) { }
}
```

### Directives

```js
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

```js
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

In order to inject existing components/services into your new component you can leverage the following decorator as
depicted in the example below.

```js
import {inject} from './path/to/config/decorators';

@controller
@inject('$http', 'MyService')
export default class MyController {
  constructor ($http, MyService) { }
}
```

### Injection as a property

Let's say you want to inject a component/service but use it with a different property name. In order to do so use the
`injectAs` decorator

```js
import {inject, injectAs} from './path/to/config/decorators';

@controller
export default class MyController {
  @inject $http = null;
  @inject MyService = null;
  @injectAs('$q') Promise = null;
  doSomething () {
    return this.Promise((resolve, reject) {
      $http.get(this.MyService.path)
        .success(data => resolve(data)
        .error(err => reject(err));
    });
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

## Running code coverage

To create a full code-coverage report execute the following command:
```shell
gulp cover
```
  
This will result in a new folder called `coverage` in your project. It contains an index.html, which you can open with
your browser to get a nice code-coverage-report


## Credits
Special thanks goes to [Hadrien Lanneau](https://github.com/hadrienl) for his great contribution to this project
