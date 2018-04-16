var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
   $scope.submit= function(){
      var data = $.param({
        book: JSON.stringify({
            rate: $scope.rate,
            nper : $scope.nper,
            pmt : $scope.pmt,
            
        })
      });

      $http.post("/api/book/", data).success(function(data, status) {
        console.log('Data posted successfully');
      })
   }
});