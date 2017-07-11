var app = angular.module('evre', ['ngRoute']);
app.config(function($qProvider, $routeProvider, $locationProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/home', {
        templateUrl: '../views/home.html',
        controller: 'home'
    })
    .when('/feed', {
        templateUrl: '../views/feed.html',
        controller: 'feed'
    })
    .when('/post', {
        templateUrl: '../views/post.html',
        controller: 'post'
    })
});
app.run(function($location) {
    $location.path('home');
});
app.controller('root', function($scope, $location) {
    $scope.menuitems = ['HOME', 'FEED', 'POST'];
    var open = false;
    $scope.mshift = function() {
        if(!open) {
            TweenLite.to('#content', .4, {left: '-100%', onComplete: onc})
            function onc() {
                TweenLite.set('#menu', {left: '0%', onComplete: function() {
                    TweenLite.to('#menu',.3, {opacity: 1});
                }});
            }
            open = true;
        } else {
            TweenLite.to('#menu', .3, {opacity: 0, onComplete: onc})
            TweenLite.set('#content', {left: '-100%'});
            function onc() {
                TweenLite.set('#menu', {left: '100%'});
                TweenLite.to('#content', .4, {left: '0%'});
            }
            open = false;
        }
    }
    $scope.wobble = function($event) {
        var target = $event.target;
        TweenLite.to(target, .2, {color: 'yellow'})
    }
    $scope.unwobble = function($event) {
        var target = $event.target;
        TweenLite.to(target, .2, {color: 'white'})
    }
    $scope.animation = function() {
        animate();
    }
    $scope.changePage = function(input) {
        if($location.path() == '/post') {
            if(socket) {
                endSocket();
            }
        }
        $location.path(input.toLowerCase())
        if($location.path() == '/post') {
            createSocket();
        }
    }
})
app.controller('home', function($scope, $location) {
    var tags = [
        ['Contribute to todays story', 'Post'],
        ['Read yesterday\'s story', 'Feed'],
        ['Observe the chaos', 'Feed'],
        ['Shake things up', 'Post']
    ];
    (function() {
        var rest = document.getElementById("rest");
        var face = document.getElementById("face");
        var cont = document.getElementById("cnte")
        var num = Math.floor(Math.random() * tags.length);
        face.innerText = tags[num][0].substring(0,1);
        rest.innerText = tags[num][0].substring(1);
        cnte.innerText = tags[num][1];
    })();
    $scope.slide = function() {
        TweenLite.to("#plink .juice", .3, {left: 0});
        TweenLite.to("#plink .content", .3, {color: "#58047D"})
    }
    $scope.unslide = function() {
        TweenLite.to("#plink .juice", .3, {left: "-100%"});
        TweenLite.to("#plink .content", .3, {color: "white"})
    }
    $scope.goTo = function() {
        var goToName = $("#plink .content").text().toLowerCase();
        $("#home").animateCss('fadeOutDown', true);
        setTimeout(function() {
            $location.path(goToName);
            TweenLite.to("#content", .3, {yPercent: "100", onComplete: function() {
                $("#home").removeAnimation("fadeOutDown");
                $location.path(goToName);
                $scope.$apply()
                TweenLite.to("#content", .3, {yPercent: "0"})
            }});
        }, 1000);
    }
})
app.controller('feed', function($scope) {
    
})
app.controller('post', function($scope, $http) {
    (function() {
        $http({
            method: 'GET',
            url: '/currentStory',
            params: {}
        }).then(function success(data) {
            $('#currentStory').html(data.data);
        });
    })()
    $scope.postExtend = function(obj) {
        $http({
            method: 'POST',
            url: '/updateStory',
            params: obj
        })
    }
    $scope.submit = function(event) {
        if(event.keyCode == 13) {
            var input = $("#input").val();
            $("#input").val(input.replace(/[\r\n\v]+/g, ''));
            if(input.length < 20) {
                inputErr();
            } else {
                $scope.postExtend({data: input});
                $("#input").val('');
            }
        }
    }
    $scope.currentInput = '';
    $scope.inLen = $scope.currentInput.length;
})