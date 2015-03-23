'use strict';
var app = angular.module('Album', ['ngAnimate', 'ngTouch'])
  .controller('MainCtrl', function ($scope, $http) {

    var albumName, albumElems, url = "js/gallery.json";
    $scope.photos = [];

    // Request
    $http.get(url).success(function(data){
      $scope.albumTitle = data.album.name;
      $scope.photos = data.photos;   
    }).error(function () {console.log('error')});    

    // Set of Photos
    // initial image index
    $scope._Index = 0;

    // if a current image is the same as requested image
    $scope.isActive = function (index) {
      return $scope._Index === index;
    };

    // show prev image
    $scope.showPrev = function () {
      $scope._Index = ($scope._Index > 0) ? --$scope._Index : $scope.photos.length - 1;
    };

    // show next image
    $scope.showNext = function () {
      $scope._Index = ($scope._Index < $scope.photos.length - 1) ? ++$scope._Index : 0;
    };

    // show a certain image
    $scope.showPhoto = function (index) {
      $scope._Index = index;
    };

}).directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
})