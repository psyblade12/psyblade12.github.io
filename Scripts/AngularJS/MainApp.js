var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "Main.html",
        controller: "myCtrl"
    })
    .when("/about", {
        templateUrl : "About.html"
    })
    .otherwise({
        template : "<h5>Nothing for this route</h5>"
    });
});
        