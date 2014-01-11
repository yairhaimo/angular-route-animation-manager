var app = angular.module('ngRouteAnimationManager', ['ngAnimate']);


app.run(['$rootScope', 'RouteAnimationManager', function($rootScope, RouteAnimationManager) {
  $rootScope.$on('$routeChangeStart', function(scope, next, current) {
    RouteAnimationManager.setAnimationClass(current, next );
  });
}]);

app.provider('RouteAnimationManager', function()  {
  
  //private vars
  var _defaultAnimation = '';
  var _animationClass = { name:''};

  //configurable function
  this.setDefaultAnimation = function(animation) {
    _defaultAnimation = animation;
  }
  
  //return factory instance
  this.$get = function() {
    return new RouteAnimationManager();
  }
   
  //define factory instance
  function RouteAnimationManager() {
    function AnimationRouteData(route) {
      if (!route || !route.originalPath) return undefined;
      this.conf = route.data.animationConf;
      this.name = route.originalPath.substring(1) || 'empty'; //empty will refer to the '/' route
    }
    
    this.setAnimationClass =  function(currentRoute, nextRoute) {
      var animation;
      var currentRouteData = currentRoute && new AnimationRouteData(currentRoute);
      var nextRouteData = nextRoute && new AnimationRouteData(nextRoute);
      
      if (!nextRouteData.name) {return;} //not navigating, probably bootstrapping
  
      if (nextRouteData.conf[currentRouteData.name]) {//get animation for a specific navigation condition
        animation = nextRouteData.conf[currentRouteData.name];
      }
      else if (nextRouteData.conf.default) {//get default animation for this view
        animation = nextRouteData.conf.default;
      }
      else {//get the default global animation
        animation = _defaultAnimation;
      }
      
      _animationClass.name = animation;
    };
    
    this.animationClass = _animationClass;
    
  }
   
});
