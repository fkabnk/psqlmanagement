'use strict';

app.service('SharedService', ['$resource', '$q', 'commonUtilities','$http', function ($resource, $q, commonUtilities, $http) {

    var base = '';
	
    return {
		setBaseUrl: function(url){
			base = url + "/";
		},
		
        getListData: function (methodUrl, args) {
            var formattedUrl = commonUtilities.stringFormat(methodUrl, args);

            return res.query({
                url: formattedUrl
            }).$promise
                .then(function (data) {
                    return data;
                })
                .catch(function (reason) {
                    alert(reason);
                });
        },
        getData: function (methodUrl, args) {
			
			console.log(methodUrl);
            var formattedUrl = commonUtilities.stringFormat(methodUrl, args);
			console.log(formattedUrl);
			var deferred = $q.defer();
			$http.get(base + formattedUrl)
				.then(function(data) {
					deferred.resolve(data);
				})
				.catch(function(data, status, headers, config) {
					deferred.reject('There was an error object');
				});
			return deferred.promise;
	
        },
        updateData: function (methodUrl, data) {

            var formattedUrl = commonUtilities.stringFormat(methodUrl);

            var deferred = $q.defer();
			$http.put(base + formattedUrl, data)
			  .success(function(data) {
				deferred.resolve(data);
			  })
			  .error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(config);
				deferred.reject('There was an error updating object');
			  });
			return deferred.promise;
		
        },
        deleteData: function (methodUrl, args) {

            var formattedUrl = commonUtilities.stringFormat(methodUrl);
            var deferred = $q.defer();
			$http.delete(base + formattedUrl, {data: args})
			  .success(function(data) {
				deferred.resolve(data);
			  })
			  .error(function(data, status, headers, config) {
				deferred.reject('There was an error deleting object');
			  });
			return deferred.promise;
        },
        addData: function (methodUrl, data) {

            var formattedUrl = commonUtilities.stringFormat(methodUrl);

            var deferred = $q.defer();
			$http.post(base + formattedUrl, data)
			  .success(function(data) {
				deferred.resolve(data);
			  })
			  .error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(config);
				deferred.reject('There was an error creating object');
			  });
			return deferred.promise;
		}
    }
}]);