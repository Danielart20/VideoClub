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
        $scope.sort_by = sort_by;
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
                onEnd: function () {
                    getAllPopular();
                }
            }
        };

        $scope.sliderVote = {
            minValue: 0,
            maxValue: 10,
            options: {
                floor: 0,
                ceil: 10,
                step: 1,
                onEnd: function () {
                    getAllPopular();
                }
            }
        };

        $scope.filmsGen = [];
        $scope.actualGenreId = actualGenreId;
        $scope.hideFilter = hideFilter;
        $scope.yearMax = 2017;
        $scope.yearMin = 1979;
        $scope.voteMax = 100;
        $scope.voteMin = 0;
        $scope.sortBy = "popularity.desc";
        $scope.order = "popularity.desc";
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

            $(document).ready(function () {
                $(".center").bind("click", function () {
                    $(".selected").css("border", "none");
                    $(".selected").css("color", "#777");
                    $("#discover").css("border-bottom", "4px solid red");
                    $("#discover").css("color", "white");
                    
                });

                $(".selected").bind("click", function () {
                    $(".selected").css("border", "none");
                    $(".selected").css("color", "#777");
                    $(this).css("border-bottom", "4px solid red");
                    $(this).css("color", "white");
                });

            });


            $(document).ready(function () {

                $(".boton_gen").bind("click", function () {
                    $(".boton_gen").css("background-color", "white");
                    $(this).css("background-color", "black");
                });

            });


            $('#buscar').keyup(function (e) {
                var q = $('#buscar').val();
                if (q === "") {
                    $(".boton_gen").css("background-color", "white");
                    document.getElementById("filter").style.display = "";
                    document.getElementById("filter_nav").style.display = "";
                    removeFilter();

                } else {
                    document.getElementById("filter").style.display = "none";
                    document.getElementById("filter_nav").style.display = "none";
                    $scope.gen = "";
                    setTimeout(function () {
                        filmFactory.filmSearch(q).then(pelis);
                    }, 1000);
                }

            });

            $(window).scroll(function () {
                if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                    $scope.page++;
                    filmFactory.films($scope.page, $scope.sliderYear.maxValue, $scope.sliderYear.minValue, $scope.gen, $scope.sliderVote.maxValue,$scope.sliderVote.minValue, $scope.sortBy).then(nextFilms);

                }
            });

            getAllPopular();

            filmFactory.filmsGenres().then(genres);

        }


        function getAllPopular() {
            filmFactory.films(1, $scope.sliderYear.maxValue, $scope.sliderYear.minValue, $scope.gen.id, $scope.sliderVote.maxValue, $scope.sliderVote.minValue, $scope.sortBy).then(pelis);
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

            $scope.sliderVote.maxValue = 10;
            $scope.sliderVote.minValue = 0;
            $scope.order = "popularity.desc";
            $scope.sortBy = "popularity.desc";

            getAllPopular();
        }

        function hideFilter() {
            $scope.sliderYear.maxValue = 2017;
            $scope.sliderYear.minValue = 1979;

            $scope.sliderVote.maxValue = 10;
            $scope.sliderVote.minValue = 0;
            $("#range_filter").toggle();
            getAllPopular();

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

        function actualGenreId(genre) {
            $scope.gen = {
                id: genre.id,
                name: genre.name
            };
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
            $(".boton_gen").css("background-color", "white");
            document.getElementById("filter").style.display = "";
            document.getElementById("filter_nav").style.display = "";
            $scope.gen = "";
            removeFilter();
        }

        function sort_by(sort) {
            $(".boton_gen").css("background-color", "white");
            $scope.sortBy = sort;
            $scope.gen = "";
            $scope.sliderYear.maxValue = 2017;
            $scope.sliderYear.minValue = 1979;

            $scope.sliderVote.maxValue = 10;
            $scope.sliderVote.minValue = 0;
            getAllPopular();
        }

    }
})();
