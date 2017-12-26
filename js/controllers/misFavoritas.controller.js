(function () {
    'use strict';

    angular
        .module('filmApp')
        .controller('misFavoritasController', misFavoritasController);

    misFavoritasController.$inject = ['$scope', 'filmFactory'];

    /* @ngInject */
    function misFavoritasController($scope, filmFactory) {
        var vm = this;
        vm.property = 'misFavoritasController';
        $scope.filmsFav = [];
        $scope.removeFav = removeFav;
        $scope.show = show;
        $scope.film = [];
        $scope.similarFilms = [];
        $scope.omdb = [];


        activate();

        ////////////////

        function activate() {


            if ("FilmsFav" in localStorage) {
                $scope.filmsFav = JSON.parse(localStorage.getItem("FilmsFav"));
            } else {
                $scope.filmsFav = [];
            }
            console.log($scope.filmsFav);
        }

        function removeFav(id) {
            if (!confirm("¿Estas seguro de que quieres quitarlo de tus Favoritos?")) {
                return false;
            } else {
                for (var i = 0; i < $scope.filmsFav.length; i++) {
                    if ($scope.filmsFav[i].id === id) {
                        $scope.filmsFav.splice(i, 1);
                        localStorage.setItem("FilmsFav", JSON.stringify($scope.filmsFav));
                    }
                }
            }

        }

        function show(img) {
            document.getElementById("peli").style.display = "unset";
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            document.getElementById("contenido").style.overflow = "scroll";
            filmFactory.filmDetails(img.id).then(data);
            filmFactory.similarFilms(img.id).then(similar);

        }

        function similar(response) {
            $scope.similarFilms = [];
            for (var i = 0; i < 4; i++) {
                $scope.similarFilms.push(response[i]);
            }

        }

        function data(response) {
            filmFactory.omdbCall(response.imdb_id).then(omdb);
            $scope.film = response;
        }

        function omdb(response) {
            $scope.omdb = response;
        }

    }
})();
