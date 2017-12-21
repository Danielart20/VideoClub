
 (function () {
     'use strict';

     angular
         .module('filmApp', ["ngRoute", "rzModule"]).config(config);

     config.$inject = ['$routeProvider'];

     function config($routeProvider) {
         $routeProvider
             .when("/", {
                 controller: 'videoClubController',
                 templateUrl: './views/videoclub.html'
             })

             .when("/coming", {
                 controller: 'proximamenteController',
                 templateUrl: './views/proximamente.html'
             })

             .when("/favourites", {
                 controller: 'misFavoritasController',
                 templateUrl: './views/misFavoritas.html'
             })

             .when("/later", {
                 controller: 'masTardeController',
                 templateUrl: './views/masTarde.html'
             })

             .when("/saw", {
                 controller: 'vistasController',
                 templateUrl: './views/vistas.html'
             })

             .when("/login", {
                 controller: 'sesionController',
                 templateUrl: './views/sesion.html'
             })

             .when("/registre", {
                 controller: 'sesionController',
                 templateUrl: './views/registro.html'
             });



     }
 })();
