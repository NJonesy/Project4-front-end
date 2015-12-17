angular
  .module('GetAGame')
  .controller('PlayersController', PlayersController)

PlayersController.$inject = ['Player', 'TokenService', '$scope', '$location']
function PlayersController(Player, TokenService, $scope, $location) {
  var self = this;
  this.url;

  self.all = Player.query(function(data) {
    return data.players;
  });
  
  self.player = {};

  function handleLogin(res) {
    var token = res.token ? res.token : null;

    if(token) {
      console.log(res);

      self.getPlayers();
      self.player = TokenService.getPlayer();
    }

      self.message = res.message;
  }

  self.login = function() {
    console.log("click");
    Player.login(self.player, handleLogin);
  }  

  self.register = function() {
    Player.register(self.player, handleLogin);
  }

  self.disappear = function() {
    TokenService.removeToken();
    self.all = [];
  }

  self.getPlayers = function() {
    self.all = Player.query(function(data) {
      return data.players;
    });
  }

  self.isLoggedIn = function() {
    return !!TokenService.getToken();
  }

  if(self.isLoggedIn()) {
    self.getPlayers();
    self.player = TokenService.getPlayer();
  }
};



