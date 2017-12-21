(function() {
    'use strict';

    angular
        .module('filmApp')
        .controller('proximamenteController', proximamenteController);

    proximamenteController.$inject = ['$scope', 'filmFactory'];

    /* @ngInject */
    function proximamenteController($scope, filmFactory){

        $scope.upComings = [];
        $scope.show = show;
        $scope.film = [];
        $scope.omdb = [];
        $scope.similarFilms = [];
        

        activate();

        ////////////////

        function activate() {
            $(".active_li").click(function () {
                alert("Handler for .click() called.");
            });
            
            filmFactory.upComing().then(up);
        }
        
        function up(response){
            console.log(response);
            $scope.upComings = response;
        }
        
         function show(img) {
            document.getElementById("peli").style.display = "unset";
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