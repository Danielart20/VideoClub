(function() {
    'use strict';

    angular
        .module('filmApp')
        .controller('masTardeController', masTardeController);

    masTardeController.$inject = ['$scope','filmFactory'];

    /* @ngInject */
    function masTardeController($scope,filmFactory){
        var vm = this;
        vm.property = 'masTardeController';
        $scope.filmsLater = [];
        $scope.removeLater = removeLater;
        $scope.show = show;
        $scope.film = [];
        $scope.similarFilms = [];
        $scope.omdb = [];
        

        activate();

        ////////////////

        function activate() {
            if ("FilmsLater" in localStorage) {
                $scope.filmsLater = JSON.parse(localStorage.getItem("FilmsLater"));
            } else {
                $scope.filmsLater = [];
            }
        }

        function removeLater(film) {
            if (!confirm("¿Estas seguro de que ya has visto "+film.title+"?")) {
                return false;
            } else {
                for (var i = 0; i < $scope.filmsLater.length; i++) {
                    if ($scope.filmsLater[i].id === film.id) {
                        $scope.filmsLater.splice(i, 1);
                        localStorage.setItem("FilmsLater", JSON.stringify($scope.filmsLater));
                    }
                }
            }

        }
        
        function show(img) {
            document.getElementById("peli").style.display = "unset";
            document.getElementsByTagName("body")[0].style.overflow = "hidden";
            document.getElementById("contenido").style.overflow = "scroll";
            document.getElementsByClassName("config")[0].style.display = "none";
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