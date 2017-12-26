(function () {
    'use strict';
    angular
        .module('filmApp')
        .factory('filmFactory', filmFactory);

    filmFactory.$inject = ['$http', 'cons'];

    /* @ngInject */
    function filmFactory($http, cons) {
        var base_url = cons.base_url;
        var api_key = cons.api_key;
        var exports = {
            films: films,
            filmSearch: filmSearch,
            filmsGenres: filmsGenres,
            filmDetails: filmDetails,
            upComing : upComing,
            //getFilmsByGenre: getFilmsByGenre,
            similarFilms: similarFilms,
            omdbCall: omdbCall
        };
        
        //Popularidad, año, ingresos, por titulo, votación media, votación, 


        return exports;

        ////////////////

        function filmsGenres() {
            return $http.get(base_url + 'genre/movie/list?api_key=' + api_key + '&language=es-ES').then(gen);
        }

        function filmSearch(q) {
            return $http.get(base_url + 'search/movie?api_key=' + api_key + '&language=es-ES&query=' + q + '&page=1&include_adult=false').then(data);
        }

        function films(page, yearMax, yearMin, gen, voteMax, voteMin, sortBy) {
            if(gen === undefined){
                gen = "";
            }
            
            return $http.get(base_url +'discover/movie?api_key='+api_key+'&language=es-ES&sort_by='+sortBy+'&page='+page+'&primary_release_date.gte=' + yearMin + '-12-30&primary_release_date.lte=' + yearMax + '-12-30&with_genres='+gen+'&vote_average.gte='+voteMin+'&vote_average.lte='+voteMax).then(data);
            
        }

        function filmDetails(id) {
            return $http.get(base_url + 'movie/' + id + '?api_key=' + api_key + '&language=en-EN&append_to_response=videos').then(data);
        }

        function similarFilms(id) {
            return $http.get(base_url + 'movie/' + id + '/similar?api_key=' + api_key + '&language=es-ES&page=1').then(similar);
        }

        function omdbCall(id) {
            return $http.get('http://www.omdbapi.com/?i=' + id + '&apikey=3370463f').then(data);
        }
        function upComing(){
            return $http.get(base_url+'movie/upcoming?api_key='+api_key+'&language=es-ES&page=1').then(data);
        }

/*        function getFilmsByGenre(id) {
            
            return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=86e47b1a4423bb68fad29c612908bd19&language=es-ES&sort_by=popularity.desc&page=1&with_genres=' + id).then(data);

        }*/

        function data(response) {
            return response.data;
        }

        function similar(response) {
            console.log(response);
            return response.data.results;
        }

        function gen(response) {
            return response.data.genres;
        }


    }
})();
