var app = angular.module('ngRouteAnimationManager', ['ngAnimate']);


app.run(['$rootScope', 'RouteAnimationManager', function($rootScope, RouteAnimationManager) {
  $rootScope.$on('$routeChangeStart', function(scope, next, current) {
    RouteAnimationManager.setAnimationClass(current, next );
  });

  $rootScope.RouteAnimationManager = {
    animationClass : RouteAnimationManager.animationClass
  };
}]);


app.provider('RouteAnimationManager', function()  {

  //private vars
  var _defaultAnimation = '';
  var _animationClass = { name:''};

  //configurable function
  this.setDefaultAnimation = function(animation) {
    _defaultAnimation = animation;
  };

  //return factory instance
  this.$get = function() {
    return new RouteAnimationManager();
  };

  //define factory instance
  function RouteAnimationManager() {
    this.setAnimationClass =  function(currentRoute, nextRoute) {
      if (!currentRoute || !nextRoute || !nextRoute.originalPath || !nextRoute.data || !nextRoute.data.animationConf) {return undefined;}

      var conf = nextRoute.data.animationConf;
      var name = currentRoute.originalPath.substring(1) || 'root'; //root refers to the '/' route

      _animationClass.name = conf[name] ||  conf.fallback || _defaultAnimation;
    };

    this.animationClass = _animationClass;
  }
});

app.directive('routeAnimationManager', function() {
  return {
    restrict: 'AE',
    transclude: true,
    replace: true,
    template: '<div class="view-animate-container" ng-class="RouteAnimationManager.animationClass.name"><div ng-transclude></div></div>'
  }
});
