angular
  .module('GetAGame')
  .factory('Player', Player);

Player.$inject = ['$resource', 'API'];
function Player($resource, API) {

  return $resource(API + '/players/:id', null, {
    'login': { method: "POST", url: API + '/login'},
    'register': { method: "POST", url: API + '/register'},
    'update': { method:'PATCH' }
  });

  return Player; 
}