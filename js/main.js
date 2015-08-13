(function(){
	angular.module("movieApp", ['wu.masonry'])
		.constant('BASE_URL', 'http://api.themoviedb.org')/* Constants definitions to connect with API*/
		.constant('API_KEY', '55b49c23b7f03bad1b9931b37a447216')
		.constant('VERSION_PATH', '/3')
		.constant('PATH_SEARCH', '/search')
		.constant('PATH_PERSON', '/person')
		.constant('PATH_MOVIE', '/movie')
		.constant('PATH_DISCOVER', '/discover')
		.constant('PARAM_PEOPLE', 'with_people')
		.constant('PARAM_KEY', 'api_key')
		.constant('PARAM_QUERY', 'query')	
		.controller("movieCtrl", function($scope, $window, $http, BASE_URL, API_KEY, VERSION_PATH, PATH_SEARCH, PATH_PERSON, PARAM_QUERY, PARAM_KEY, PATH_MOVIE, PATH_DISCOVER, PARAM_PEOPLE){
			$scope.searchMovie = function(author){
				/*This method allow to find an author id when you pass a name as parameter
				   then you can use the id to find the movies
				*/
				$(".show-spinner").show();
				var getIdAuthorUrl = BASE_URL + VERSION_PATH + PATH_SEARCH + PATH_PERSON + "?"+PARAM_KEY+"="+API_KEY+"&"+PARAM_QUERY+"="+author;
				var getMovies = BASE_URL + VERSION_PATH + PATH_DISCOVER + PATH_MOVIE + "?"+PARAM_KEY+"="+API_KEY+"&"+PARAM_PEOPLE+"=";
				var authorId;
				
				/*this service allow to retrieve all movies and when the promise response the array in angular socpe "movies" is set with results  array */
				$http.get(getIdAuthorUrl).then(function(response){
					authorId = response.data.results[0].id;
					
					$http.get(getMovies + authorId).then(function(response){						
						$(".show-spinner").hide();
						$(".hide-movie").show();
						$scope.movies = response.data.results;
						$scope.posterPath = "https://image.tmdb.org/t/p/w185";
					})
					.catch(function(data, status){
						Materialize.toast(data.statusText, 4000)
					})
				})
				.catch(function(data, status){
					Materialize.toast(data.statusText, 4000)					
				})


			}
		})

})()
