var app = angular.module('marvelDemo', ['ngRoute','ui.bootstrap']);


app.controller('MainCtrl', function($scope, $location, $http) {
  $scope.char={};
  $scope.showCharInfo= false;
  $scope.getCharacters = function(val) {
        $scope.timeStamp=  1;
         $scope.publicKey="5a237863b3cc2061003cbbc4fe20dc06";
         $scope.hash="bd4b447a65ef5d6b174f87cf9db6d2db";
        baseUrl= 'https://gateway.marvel.com/v1/public/characters';

    


    return $http.get(baseUrl, {
      params: {
        ts: $scope.timeStamp,
        apikey: $scope.publicKey,
        hash: $scope.hash,
        nameStartsWith: val,
        limit: 10,
      }
    }).then(function(response){
      $scope.charInfoArr=response.data.data.results;
      return response.data.data.results.map(function(item){
        
        return item.name;
      });
    });
  };

  $scope.selectCharacter=function (item){
    angular.forEach($scope.charInfoArr, function(obj, key){
      if(obj.name===item){
      
         if (obj.thumbnail){
           $scope.char.thumb= obj.thumbnail.path+"."+obj.thumbnail.extension;
         }else{
           $scope.char.thumb="";
         }
         
         $scope.char.name= obj.name;
         $scope.char.desc= obj.description;
         $scope.showCharInfo= true;
      }
       
    });
    
  }

});

