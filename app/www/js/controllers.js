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
        { src:'img/background/numbers2.jpg', title:'Calculatrice', link:'#/calcul'},
        { src:'img/links--drawing.jpg', title:'Jeux', link:'#/home'},
        { src:'img/links--gaming.jpg', title:'Jeux', link:'#/home'},
    ];
})



.controller('AvatarCtrl',function($scope,$rootScope,$http){




  $http.get('data/avatar.json').success(function (data) {
      $scope.avatars = data.url;
  })




    $scope.imageAvatar = "img/avatar/pixel-sitting.png";


    $scope.onTap = function (evt) {
        $scope.imageAvatar = $scope.avatars[evt];
        $rootScope.$broadcast("onTap", $scope.imageAvatar );
    }

    $scope.$on("onTap", function (evt, data) {
        $rootScope.avatar=data;
    });
})



.controller('MovesCtrl', function($scope, $http,$rootScope) {

    $http.get("http://localhost:8080/app/primitives").success(function(response)
    {
        $scope.primitives = response.primitives;  //ajax request to fetch data into

    });

    $scope.run_move = function(index) {

        $http.get("http://localhost:8080/app/behave?id=cherry&name=" + $scope.primitives[index]);
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


.controller('CalculCtrl', function($scope,$ionicPopup,$rootScope) {
    // Ecran de jeu 1 : Le robot pose des calculs à l'enfant. Jeu découpé en 2 parties distinctes :
    //  1) Un calcul aléatoire généré par le robot, l'enfant y répond puis valide. Un nouveau calcul apparait alors. 3 niveaux disponibles.
    // 2) Table de multiplication,addition et soustraction des nombres de 1 à 9. Recharger pour changer l'opérateur et le chiffre. Valider indiquera le nombre d'erreur.


    //Jeu 1)
    $scope.level="Choississez un niveau pour commencer le jeu";
    $scope.score=0;
    $scope.total=0;

    $scope.niveau = function($int) {
        if ($int==1) {
            $scope.level="Niveau 1";
            $scope.level_nb=1;
            $scope.nb1_e = Math.floor(Math.random() * 9) + 1;
            $scope.nb2_e = Math.floor(Math.random() * 9) + 1;
            $scope.tabOperateur_e = ['+','-'];
            $scope.operateur_e = $scope.tabOperateur_e[Math.floor(Math.random() * $scope.tabOperateur_e.length)];
        }
        if ($int==2) {
            $scope.level="Niveau 2";
            $scope.level_nb=2;
            $scope.nb1_e = Math.floor(Math.random() * 50) + 1;
            $scope.nb2_e = Math.floor(Math.random() * 50) + 1;
            $scope.tabOperateur_e = ['+','-','*'];
            $scope.operateur_e = $scope.tabOperateur_e[Math.floor(Math.random() * $scope.tabOperateur_e.length)];
        }
        if ($int==3) {
            $scope.level="Niveau 3";
            $scope.level_nb=3;
            $scope.tabOperateur_e = ['+','-','*', '/'];
            $scope.operateur_e = $scope.tabOperateur_e[Math.floor(Math.random() * $scope.tabOperateur_e.length)];
            if ($scope.operateur_e == '/') {
                do {
                    $scope.nb1_e = Math.floor(Math.random() * 50) + 1;
                    $scope.nb2_e = Math.floor(Math.random() * 50) + 1;
                } while($scope.nb1_e % $scope.nb2_e != 0)
            }
            else {
                $scope.nb1_e = Math.floor(Math.random() * 50) + 1;
                $scope.nb2_e = Math.floor(Math.random() * 50) + 1;
            }
        }
    }
    //fonction appelé au moment de la selection du niveau. Elle génère les nombres et l'opérateur selon le niveau choisis.

    $scope.result22=function($int3, $int4) {
        if ($int3 == $int4) {
            $scope.score++;
            $scope.phrase =["Bien joué!", "Bravo, c'est la bonne réponse !", "Bon résultat"];
        }
        else {
            $scope.phrase = ["Nooon :( ", "Argh.. dommage mais c'est faux", "Ce n'est pas la bonne réponse"];
        }
        return $scope.phrase[Math.floor(Math.random() * $scope.phrase.length)];;
    }
    // messages du pop-up

    $scope.popup = function($test2) {
        if ($scope.operateur_e == '+') {
            $scope.result_ev = $scope.nb1_e + $scope.nb2_e;
        }
        if ($scope.operateur_e == '-') {
            $scope.result_ev = $scope.nb1_e - $scope.nb2_e;
        }
        if ($scope.operateur_e == '*') {
            $scope.result_ev = $scope.nb1_e * $scope.nb2_e;
        }
        if ($scope.operateur_e == '/') {
            $scope.result_ev = $scope.nb1_e / $scope.nb2_e;
        }
        $test=$scope.result22($test2, $scope.result_ev);
        alert($test);
        $scope.niveau($scope.level_nb);
        $scope.total++;
    };

    // popup d'alerte
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Le projet Cherry',
            template: 'Page de calculatrice'
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
        $scope.moves = data.moves;
    })


    $scope.playAudio = function() {



        $http.get("http://7bf76f89.ngrok.io/app/Cherry/ismoving").success(function(response){
        $scope.isMoving = response.isMoving;
        });
		if ($scope.isMoving == "false"){
		  var data = {
		    id : "Cherry",
		   	list : [
		      $scope.droppedObjects1[0].primitive,
		      $scope.droppedObjects2[0].primitive,
		      $scope.droppedObjects3[0].primitive,
		      $scope.droppedObjects4[0].primitive,
		   ]
		  }
		  console.log(data);

      $http.post("http://7bf76f89.ngrok.io/app/chore", data).success(function(response){
      console.log(response);
      });
		  audio.pause();
		  audio = new Audio($scope.music);
		  audio.play();

		}

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
