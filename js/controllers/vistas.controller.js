(function() {
    'use strict';

    angular
        .module('filmApp')
        .controller('vistasController', vistasController);

    vistasController.$inject = ['$scope', 'filmFactory'];

    /* @ngInject */
    function vistasController($scope,filmFactory){
        var vm = this;
        vm.property = 'vistasController';
         $scope.filmsSaw = [];
        $scope.removeSaw = removeSaw;
        $scope.show = show;
        $scope.film = [];
        $scope.similarFilms = [];
        $scope.omdb = [];
        

        activate();

        ////////////////

        function activate() {
        
            
            if ("FilmsSaw" in localStorage) {
                $scope.filmsSaw = JSON.parse(localStorage.getItem("FilmsSaw"));
            } else {
                $scope.filmsSaw = [];
            }
        }

        function removeSaw(film) {
            if (!confirm("¿Estas seguro de que quieres quitar "+film.title+" de las ya vistas?")) {
                return false;
            } else {
                for (var i = 0; i < $scope.filmsSaw.length; i++) {
                    if ($scope.filmsSaw[i].id === film.id) {
                        $scope.filmsSaw.splice(i, 1);
                        localStorage.setItem("FilmsSaw", JSON.stringify($scope.filmsSaw));
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