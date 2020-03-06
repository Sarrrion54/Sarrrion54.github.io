var app = angular.module('MyApp', []);
app.controller('MyController', function ($scope, $http) {
    $http.get("vine.json").then(function (response) {
        $scope.Groups = response.data;
    });
});
function Input()
{
    window.close();
}
