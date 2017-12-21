(function () {
    'use strict';

    angular
        .module('filmApp')
        .controller('videoClubController', videoClubController);

    videoClubController.$inject = ['$scope', 'filmFactory'];

    /* @ngInject */
    function videoClubController($scope, filmFactory) {

        $scope.init = init;
        $scope.films = [];
        $scope.film = {};
        $scope.omdb = [];
        $scope.filmsFav = [];
        $scope.similarFilms = [];
        $scope.filmDetails = [];
        $scope.nextFilms = [];
        $scope.show = show;
        $scope.sliderYear = {
            minValue: 1979,
            maxValue: 2017,
            options: {
                floor: 1979,
                ceil: 2017,
                step: 1,
                onChange: function (id) {
                    setTimeout(function () {
                        getAllPopular();
                    }, 1500);

                }
            }
        };

        $scope.sliderVote = {
            minValue: 0,
            maxValue: 100,
            options: {
                floor: 0,
                ceil: 100,
                step: 1,
                onChange: function (id) {
                    setTimeout(function () {
                        getAllPopular();
                    }, 1500);
                }
            }
        };

        $scope.filmsGen = [];
        $scope.actualGenreId = actualGenreId;
        $scope.yearMax = 2017;
        $scope.yearMin = 1979;
        $scope.voteMax = 100;
        $scope.voteMin = 0;
        //$scope.getFilmsByGenre = getFilmsByGenre;
        $scope.activate = activate;
        $scope.page = 1;
        $scope.removeFilter = removeFilter;
        $scope.getAllPopular = getAllPopular;
        $scope.showme = 0;
        $scope.search = "";
        $scope.scroll = 0;
        $scope.gen = "";

        activate();

        ////////////////

        function activate() {

            $('#buscar').keyup(function (e) {
                var q = $('#buscar').val();
                if (q === "") {
                    document.getElementById("filter").style.display = "";
                    document.getElementById("filter_nav").style.display = "";
                    getAllPopular();
                    $scope.order = "-popularity";

                } else {
                    document.getElementById("filter").style.display = "none";
                    document.getElementById("filter_nav").style.display = "none";
                    setTimeout(function () {
                        filmFactory.filmSearch(q).then(pelis);
                    }, 1000);
                }
            });

            $(window).scroll(function () {
                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    $scope.page++;
                    filmFactory.films($scope.page, $scope.sliderYear.maxValue, $scope.sliderYear.minValue, $scope.gen, $scope.voteMaximus, $scope.voteMinimun).then(nextFilms);

                }
            });

            getAllPopular();

            filmFactory.filmsGenres().then(genres);

        }


        function getAllPopular() {
            $scope.voteMaximus = $scope.sliderVote.maxValue / 10;
            $scope.voteMinimun = $scope.sliderVote.minValue / 10;
            filmFactory.films(1, $scope.sliderYear.maxValue, $scope.sliderYear.minValue, $scope.gen, $scope.voteMaximus, $scope.voteMinimun).then(pelis);
        }


        function genres(response) {
            $scope.filmsGen = response;

        }

        function pelis(response) {
            $scope.films = response;
            console.log($scope.films);
        }


        function removeFilter() {
            $scope.sliderYear.maxValue = 2017;
            $scope.sliderYear.minValue = 1979;

            $scope.sliderVote.maxValue = 100;
            $scope.sliderVote.minValue = 0;
            $scope.order = "";

            getAllPopular();
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

        function actualGenreId(id) {
            $scope.gen = id;
        }

        /*function getFilmsByGenre(id) {
            filmFactory.getFilmsByGenre(id).then(pelis);
            $scope.search = "";

        }*/

        function nextFilms(response) {
            var f = response.results;
            for (var i = 0; i < 20; i++) {
                $scope.films.results.push(f[i]);
            }
        }

        function init() {
            document.getElementById("filter").style.display = "";
            document.getElementById("filter_nav").style.display = "";
            $scope.gen = "";
            getAllPopular();
        }

    }
})();
