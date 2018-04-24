angular.module('incometax').factory('incomeTax', function($http) {
    return {
        taxRate: function() {
            return $http.get('/api/taxrate').then(complete).catch(failed);
        },
        
        incomeTax: function(income) {
            return $http.get('/api/calculateTax/:' + income).then(complete).catch(failed);
        }
        // hotelList : hotelList,
        // hotelDisplay : hotelDisplay
    };
});

function complete(response) {
    // console.log("Here is complete response");
    // console.log(response);
    return response.data;
}

function failed(error) {
    console.log(error.statusText);
}