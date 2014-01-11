var app = angular.module('plunker', ['ngRoute', 'ngAnimate', 'ngRouteAnimationManager']);

app.config(['$routeProvider', 'RouteAnimationManagerProvider', function($routeProvider, RouteAnimationManagerProvider) {
  $routeProvider.when('/', {
    template: '<div class="page home">home</div>',
    data: {
      animationConf: {
        one: 'fade',
        default: 'slide'
      }
    }
  })
  .when('/one', {
    template: '<div class="page one">one</div>',
    data: {
      animationConf: {
        empty: 'flip',
        default: 'rotate'
      }
    }
  })
  .when('/two', {
    template: '<div class="page two">two</div>',
    data: {
      animationConf: {
        default: 'slide'
      }
    }
  }) 
  .when('/three', {
    template: '<div class="page three">three</div>',
    data: {
      animationConf: {
      }
    }
  }) 
  .otherwise({redirectTo: '/'});
  
  
  RouteAnimationManagerProvider.setDefaultAnimation('fade');
}]);