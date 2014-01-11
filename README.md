# angular-route-animation-manager

#### A provider that helps you manage transitions when routing from one view to another
----
###Note: This is more a tutorial/demo than a production plugin and has not been tested in all browsers.

>**[Check out this plunker for a working demo](http://plnkr.co/edit/i50zwH5WvZ4eZeODHfcN?p=preview)**
-

This provider helps you define which animations will run when routing to another view.
The plugin works by setting a predefined class on the ng-view container whenever a route is changing.

Prerequisites are angular.js, angular-animate.js, angular-route.js and a css with defined animations.

## Get Started
**(1)** Load the angular-route-animation-manager.js and the styles.css files into your html.
Note that the css in this project is for the demo app. Remove any excess styles and change it to fit your needs.
```html
<script src="angular-route-animation-manager.js"></script>
<link rel="stylesheet" href="styles.css"/>
```


**(2)** Add the required dependencies to your module: 
>
```javascript
angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngRouteAnimationManager']);
```

**(3)** (Optional) Configure a default animation:
```javascript
app.config(['RouteAnimationManagerProvider', function(RouteAnimationManagerProvider) {
  RouteAnimationManagerProvider.setDefaultAnimation('fade');
}]);
```

**(4)** Configure your routes for animation:
```javascript
app.config(['$routeProvider', 'RouteAnimationManagerProvider', function($routeProvider, RouteAnimationManagerProvider) {
  $routeProvider.when('/', {
    template: '<div>home</div>',
    data: {
      animationConf: {
        two: 'flip', //when animating to or from the /two url use the flip animation
        one: 'fade', //when animating to or from the /one url use the fade animation
        default: 'slide' //otherwise use the slide animation
      }
    }
  })
  .when('/one', {
    template: '<div>one</div>',
    data: {
      animationConf: {
        root: 'flip', //when routing from the / url use the flip animation
        default: 'rotate' //otherwise use the rotate animation
      }
    }
  })
  .when('/two', {
    template: '<div>two</div>',
    data: {
      animationConf: {
        default: 'slide' //always use the slide animation
      }
    }
  }) 
  .when('/three', {
    template: '<div>three</div>',
    data: {
      animationConf: { //no custom animations defined, use the global default
      }
    }
  }) 
  .otherwise({redirectTo: '/'});
  
  
  RouteAnimationManagerProvider.setDefaultAnimation('fade'); //define a global default animation
}]);
```

**(5)** Define your ng-view in the following manner:
```html
<div class="view-animate-container" ng-class="animationClass.name">
  <div ng-view class="view-animate"></div>
</div>
```


The css animations were copied from <a href="http://dfsq.github.io/ngView-animation-effects/app"> Aliaksandr Astashenkau's demo site</a>.
