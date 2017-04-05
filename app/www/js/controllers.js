angular.module('starter.controllers', [])

.constant('OpenWeatherConfig', {
    searchUrl: 'http://api.openweathermap.org/data/2.5/weather?q=',
    units: '&units=metric',
    appid: '&appid=bd5e378503939ddaee76f12ad7a97608',
    imgUrl: 'http://openweathermap.org/img/w/'
})


.controller('HomeCtrl', function($scope,$ionicPopup,$rootScope){
    // popup d'alerte
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Le projet Cherry',
            template: 'L\'Enseirb présente Cherry, le robot destiné aux enfants de primaire en situation d’hospitalisation prolongée ou récurrente.\n Véritable compagnon affectueux, il incite l’enfant à exploiter le numérique pour rester connecté à son quotidien et son entourage.'
        });
    };

    // Liste des app
    $scope.line1= [
        { src:'img/weather.png', title:'Météo', link:'#/weather'},
        { src:'img/music-font.jpg', title:'Chorégraphie', link:'#/choregraphy'},
        { src:'img/links--drawing.jpg', title:'Mouvements', link:'#/moves'},
    ];
    $scope.line2= [
        { src:'img/links--gaming.jpg', title:'Jeux', link:'#/home'},
        { src:'img/links--drawing.jpg', title:'Jeux', link:'#/home'},
        { src:'img/links--gaming.jpg', title:'Jeux', link:'#/home'},
    ];
})


.controller('AvatarCtrl',function($scope,$rootScope){
    $scope.avatars = [
        "img/basketball.png",
        "img/pikachu.png",
        "img/pokeball.png",
        "img/football.png",
        "img/pixel-win.png",
        "img/pixel.png",
        "img/pixel-sitting.png",
        "img/pixel-love.png",
        "img/pixel-computer.png",
    ]

    $scope.imageAvatar = "img/pixel-sitting.png";

    $scope.onTap = function (evt) {
        $scope.imageAvatar = $scope.avatars[evt];
        $rootScope.$broadcast("onTap", $scope.imageAvatar );

    }

    $scope.$on("onTap", function (evt, data) {
        $rootScope.avatar=data;
    });
})



.controller('MovesCtrl', function($scope, $http,$rootScope) {

  $http.get("http://localhost:8080/primitives.json").success(function(response)
    {
        $scope.primitives = response.primitives;  //ajax request to fetch data into

    });
  $http.get('data/UrlMoves.json').success(function (data) {

    $scope.primitives = data.url;
  })
  $scope.run_move = function(index) {

      $http.get("http://localhost:8080/test/behave?name=" + $scope.primitives[index]);
  };

})

.controller('AccountCtrl', function($scope, $ionicModal,$ionicPopup,$rootScope) {
    $scope.settings = {
        enableFriends: false
    };
    $scope.list = [
        { id: 1, title: 'Avatar'},
        { id: 2, title: 'Titre 2'},
        { id: 3, title: 'Titre 3'},
        { id: 4, title: 'Titre 4'},
        { id: 5, title: 'Titre 5'},
        { id: 6, title: 'Deconnexion'}
    ];

    // define create account view
    $ionicModal.fromTemplateUrl('html/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.loginModal = modal;
    });


    // popup d'alerte
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Le projet Cherry',
            template: 'L\'Enseirb présente Cherry, le robot destiné aux enfants de primaire en situation d’hospitalisation prolongée ou récurrente.\n Véritable compagnon affectueux, il incite l’enfant à exploiter le numérique pour rester connecté à son quotidien et son entourage.'
        });
    };

})

.controller('WeatherCtrl', function($scope, $http, OpenWeatherConfig, $ionicPopup,$rootScope) {
    $scope.search = '';
    $scope.state = false;
    $scope.weatherData = {
        icon: '',
        main: '',
        city: '',
        description: '',
        temp: ''
    };

    $scope.loadWeather = function(search, $event) {
        console.log(search);
        if ($event.keyCode === 13) {
            var url = OpenWeatherConfig.searchUrl + search + OpenWeatherConfig.units + OpenWeatherConfig.appid;
            $http.get(url).success(function(data) {
                $scope.weatherData.icon = OpenWeatherConfig.imgUrl + data.weather[0].icon + '.png';
                $scope.weatherData.main = data.weather[0].main;
                $scope.weatherData.city = data.name;
                $scope.weatherData.description = data.weather[0].description;
                $scope.weatherData.temp = data.main.temp;
                $scope.state = true;
            });
        };
    };

    // popup d'alerte pour l'aide
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Le projet Cherry',
            template: 'Coucou, voici l\'appli de la météo :) Tu a juste a rentrer le nom d\'une ville pour connaitre la météo actuelle ;)'
        });
    };

})


.controller('ChoregraphyCtrl', function($scope, $ionicPopup, $http, $timeout,$rootScope) {

    $scope.music = '/music/Magic_sys_FOU.mp3';
    $scope.music1Disabled = false;
    $scope.music2Disabled = false;
    $scope.music3Disabled = false;
    var audio = new Audio($scope.music);

    // popup d'alerte
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Le projet Cherry',
            template: 'Coucou, sur cette page tu peux faire danser Poppy sur une musique de ton choix.  Déplace les icones dans les 4 boites et choisi ta musique puis fais le danser en appuyant sur le bouton play '
        });
    };

    // Chargement des primitives
    $http.get('data/UrlMoves.json').success(function (data) {
        $scope.primitives = data.url;
    })

    // Liste des moves
    $scope.moves = [
        { name:'img/pixel-sitting.png' ,primitive:'al'},
        { name:'img/pixel-sitting.png' ,primitive:'al'},
        { name:'img/football.png',primitive:'dab1'},
        { name:'img/pokeball.png',primitive:'dab2'},
        { name:'img/pixel-computer.png',primitive:'harden'},
        { name:'img/pixel-computer.png',primitive:'harden'}
    ];
    // Stop previous audio and play new audio + Play the move with http request

    $scope.playAudio = function() {
        $http.get("http://localhost:8080/robot/is_behave").success(function(response_server){
        $scope.result=response_server.result;
        });
        var str1 = "true";
        var str2 = "false";

          if ($scope.result.localeCompare(str1) == 0){

          }else if ($scope.result.localeCompare(str2) == 0){
              var data = {
                id : 1,
                primitives : {
                  move1 : $scope.droppedObjects1[0].primitive,
                  move2 : $scope.droppedObjects2[0].primitive,
                  move3 : $scope.droppedObjects3[0].primitive,
                  move4 : $scope.droppedObjects4[0].primitive,
               }
              }
              $http.post("http://localhost:8080/app/chore", data);
              audio.pause();
              audio = new Audio($scope.music);
              audio.play();

          }


/*
        audio.pause();
        audio = new Audio($scope.music);

        audio.play();


        $http.get("http://localhost:8080/test/behave?name=" + $scope.droppedObjects1[0].primitive);

        $timeout(function () {
            $http.get("http://localhost:8080/test/behave?name=" + $scope.droppedObjects2[0].primitive);
        }, 5000);
        $timeout(function () {
            $http.get("http://localhost:8080/test/behave?name=" + $scope.droppedObjects3[0].primitive);
        }, 10000);
        $timeout(function () {
            $http.get("http://localhost:8080/test/behave?name=" + $scope.droppedObjects4[0].primitive);
        }, 15000);*/
    };
    $scope.setMusic1 = function() {
        $scope.music='/music/Magic_sys_FOU.mp3';
        $scope.music1Disabled = true;
        $scope.music2Disabled = false;
        $scope.music3Disabled = false;

    };

    $scope.setMusic2 = function() {
        $scope.music='/music/Steam_Phunk-Feelings.mp3';
        $scope.music2Disabled = true;
        $scope.music1Disabled = false;
        $scope.music3Disabled = false;

    };

    $scope.setMusic3 = function() {
        $scope.music='/music/Bad_pitched.mp3';
        $scope.music1Disabled = false;
        $scope.music2Disabled = false;
        $scope.music3Disabled = true;
    };




    //- Contrôle du drag & drop -->
    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () {
        $scope.centerAnchor = !$scope.centerAnchor
    }
    //$scope.draggableObjects = [{name:'one'}, {name:'two'}, {name:'three'}];
    var onDraggableEvent = function (evt, data) {
        console.log("128", "onDraggableEvent", evt, data);
    }
    $scope.$on('draggable:start', onDraggableEvent);
    // $scope.$on('draggable:move', onDraggableEvent);
    $scope.$on('draggable:end', onDraggableEvent);
    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];
    $scope.droppedObjects3 = [];
    $scope.droppedObjects4 = [];
    $scope.onDropComplete1 = function (data, evt) {
        console.log("127", "$scope", "onDropComplete1", data, evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1 && $scope.droppedObjects1.length <1){
            $scope.droppedObjects1.push(data);
        }else if ($scope.droppedObjects1.length >=1) {
            $scope.droppedObjects1[0]=data;
        }
    }
    $scope.onDragSuccess1 = function (data, evt) {
        console.log("133", "$scope", "onDragSuccess1", "", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
    }
    $scope.onDragSuccess2 = function (data, evt) {
        var index = $scope.droppedObjects2.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects2.splice(index, 1);
        }
    }
    $scope.onDropComplete2 = function (data, evt) {
        var index = $scope.droppedObjects2.indexOf(data);
        if (index == -1 && $scope.droppedObjects2.length <1) {
            $scope.droppedObjects2.push(data);
        }else if ($scope.droppedObjects2.length >=1) {
            $scope.droppedObjects2[0]=data;
        }
    }


    $scope.onDragSuccess3 = function (data, evt) {
        var index = $scope.droppedObjects3.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects3.splice(index, 1);
        }
    }
    $scope.onDropComplete3 = function (data, evt) {
        var index = $scope.droppedObjects3.indexOf(data);
        if (index == -1 && $scope.droppedObjects3.length <1) {
            $scope.droppedObjects3.push(data);
        }else if ($scope.droppedObjects3.length >=1) {
            $scope.droppedObjects3[0]=data;
        }
    }


    $scope.onDragSuccess4 = function (data, evt) {
        var index = $scope.droppedObjects4.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects4.splice(index, 1);
        }
    }
    $scope.onDropComplete4 = function (data, evt) {
        var index = $scope.droppedObjects4.indexOf(data);
        if (index == -1 && $scope.droppedObjects4.length <1) {
            $scope.droppedObjects4.push(data);
        }else if ($scope.droppedObjects4.length >=1) {
            $scope.droppedObjects4[0]=data;
        }
    }
    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }

});
