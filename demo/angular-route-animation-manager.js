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
    function AnimationRouteData(route) {
      if (!route || !route.originalPath || !route.data || !route.data.animationConf) return undefined;
      this.conf = route.data.animationConf;
      this.name = route.originalPath.substring(1) || 'root'; //root refers to the '/' route
    }
    
    this.setAnimationClass =  function(currentRoute, nextRoute) {
      var animation;
      var nextRouteData = nextRoute && new AnimationRouteData(nextRoute);
      
      if (!nextRoute || !nextRoute.originalPath || !nextRoute.data || !nextRoute.data.animationConf) {_animationClass.name = ''; return;}
      var conf = nextRoute.data.animationConf;
      var name = nextRoute.originalPath.substring(1) || 'root'; //root refers to the '/' route
      
      if (!nextRouteData.name) {return;} //not navigating, probably bootstrapping
  
      _animationClass.name = conf[name] ||  conf.default || _defaultAnimation;
    };
    
    this.animationClass = _animationClass;
  };
});