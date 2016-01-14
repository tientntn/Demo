angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, HTTP, Base64, $http) {


console.log('bran che wellcome');

    
    
  var auth = Base64.encode('tientntn' + ':' + '123456');
  localStorage.setItem('key', auth);
      $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
  HTTP.doGet('http://mapipro.happyskin.vn/v1/user/profile').then(function(res){
    console.log('request xong:'+res.data.username);
    console.log(res.data);
    var storge = localStorage.getItem('key');
    console.log(storge);
  })



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.factory('HTTP', function ($q, $http, Base64) {
          
        return {

            doPost: function (url, obj) {
                var q = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    },
                    data: obj
                })

                    .success(function (data, status, headers, config) {
                        q.resolve(data);
                    })
                    .error(function (data, status, headers, config) {
                        q.resolve({data: data, status: status, headers: headers, config: config});
                    });

                return q.promise;
            },

            doGet: function (url) {
                var q = $q.defer();
                $http.get(url)
                    .success(function (data, status, headers, config) {
                        q.resolve(data);
                    })

                return q.promise;
            },

            doLogin: function (url, username, password) {
                var q = $q.defer();
                var auth = Base64.encode(username + ':' + password);
                $http.defaults.headers.common['Authorization'] = 'Basic ' + auth;
                $http.get(url)
                    .success(function (data, status, headers, config) {
                        q.resolve(data);
                    })

                return q.promise;
            }


        }

    })

  .factory('Base64', function () {
    /* jshint ignore:start */
  
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
          
            return {
                encode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
          
                    do {
                        chr1 = input.charCodeAt(i++);
                        chr2 = input.charCodeAt(i++);
                        chr3 = input.charCodeAt(i++);
          
                        enc1 = chr1 >> 2;
                        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                        enc4 = chr3 & 63;
          
                        if (isNaN(chr2)) {
                            enc3 = enc4 = 64;
                        } else if (isNaN(chr3)) {
                            enc4 = 64;
                        }
          
                        output = output +
                            keyStr.charAt(enc1) +
                            keyStr.charAt(enc2) +
                            keyStr.charAt(enc3) +
                            keyStr.charAt(enc4);
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
                    } while (i < input.length);
          
                    return output;
                },
          
                decode: function (input) {
                    var output = "";
                    var chr1, chr2, chr3 = "";
                    var enc1, enc2, enc3, enc4 = "";
                    var i = 0;
          
                    // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                    var base64test = /[^A-Za-z0-9\+\/\=]/g;
                    if (base64test.exec(input)) {
                        window.alert("There were invalid base64 characters in the input text.\n" +
                            "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                            "Expect errors in decoding.");
                    }
                    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
          
                    do {
                        enc1 = keyStr.indexOf(input.charAt(i++));
                        enc2 = keyStr.indexOf(input.charAt(i++));
                        enc3 = keyStr.indexOf(input.charAt(i++));
                        enc4 = keyStr.indexOf(input.charAt(i++));
          
                        chr1 = (enc1 << 2) | (enc2 >> 4);
                        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                        chr3 = ((enc3 & 3) << 6) | enc4;
          
                        output = output + String.fromCharCode(chr1);
          
                        if (enc3 != 64) {
                            output = output + String.fromCharCode(chr2);
                        }
                        if (enc4 != 64) {
                            output = output + String.fromCharCode(chr3);
                        }
          
                        chr1 = chr2 = chr3 = "";
                        enc1 = enc2 = enc3 = enc4 = "";
          
                    } while (i < input.length);
          
                    return output;
                }
            };
        });

;
