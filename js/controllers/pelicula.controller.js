(function () {
    'use strict';

    angular
        .module('filmApp')
        .controller('peliculaController', peliculaController);

    peliculaController.$inject = ['$scope', '$routeParams', 'filmFactory', '$sce'];

    /* @ngInject */
    function peliculaController($scope, $routeParams, filmFactory, $sce) {
        $scope.filmsFav = [];
        $scope.filmsLater = [];
        $scope.filmsSaw = [];
        $scope.addLate = addLater;
        $scope.close = close;
        $scope.addSaw = addSaw;
        $scope.init = init;
        $scope.addFavorites = addFavorite;
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }


        activate();

        ////////////////

        function activate() {
            console.log($scope.peli);
            give();
            
            }
            
            function init(film){
                filmFactory.filmDetails(film.id).then(data);
                
            }
        
         function data(response) {
                $scope.film = response;
                console.log($scope.film);
                console.log(response);
             filmFactory.omdbCall(response.imdb_id).then(omdb);


            function omdb(response) {
                $scope.omdb = response;
                console.log($scope.omdb);

            }

            filmFactory.similarFilms($routeParams.id).then(similar);

            function similar(response) {
                for (var i = 0; i < 4; i++) {
                    $scope.similarFilms.push(response[i]);
                }
            }
        }

        function addFavorite(film) {
            var lom = 1
            for (var i = 0; i < $scope.filmsFav.length; i++) {
                if ($scope.filmsFav[i].id === film.id) {
                    lom = 0;
                }
            }
            if (lom === 1) {
                $scope.filmsFav.push(film);
                alert("Has añadido " + film.title + " a tus Favoritos");
            }
            save();


        }
        function close(){
            document.getElementById("peli").style.display = "none";
        }

        function addLater(film) {
            var lom = 1
            for (var i = 0; i < $scope.filmsLater.length; i++) {
                if ($scope.filmsLater[i].id === film.id) {
                    lom = 0;
                }
            }
            if (lom === 1) {
                $scope.filmsLater.push(film);
                alert("Has añadido " + film.title + " para ver más tarde");
            }
            save();


        }
        
        function addSaw(film) {
            var lom = 1
            for (var i = 0; i < $scope.filmsSaw.length; i++) {
                if ($scope.filmsSaw[i].id === film.id) {
                    lom = 0;
                }
            }
            if (lom === 1) {
                $scope.filmsSaw.push(film);
                alert("Has añadido " + film.title + " para ver más tarde");
            }
            save();


        }

        function give() {
            if ("FilmsFav" in localStorage) {
                $scope.filmsFav = JSON.parse(localStorage.getItem("FilmsFav"));
                
            }else {
                $scope.filmsFav = [];
            }
            if ("FilmsLater" in localStorage) {
                $scope.filmsLater = JSON.parse(localStorage.getItem("FilmsLater"));

            }else{
                $scope.filmsLater = [];
            }
            if ("FilmsSaw" in localStorage) {
                $scope.filmsSaw = JSON.parse(localStorage.getItem("FilmsSaw"));

            }else{
                $scope.filmsSaw = [];
            } 
        }

        function save() {
            localStorage.setItem("FilmsFav", JSON.stringify($scope.filmsFav));
            localStorage.setItem("FilmsLater", JSON.stringify($scope.filmsLater));
            localStorage.setItem("FilmsSaw", JSON.stringify($scope.filmsSaw));
        }



    }
})();
