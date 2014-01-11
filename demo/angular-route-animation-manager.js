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
      if (!nextRoute || !nextRoute.originalPath || !nextRoute.data || !nextRoute.data.animationConf) {return;}
      
      var conf = nextRoute.data.animationConf;
      var name = currentRoute.originalPath.substring(1) || 'root'; //root refers to the '/' route
    
      _animationClass.name = conf[name] ||  conf.default || _defaultAnimation;
    };
    
    this.animationClass = _animationClass;
  }
});