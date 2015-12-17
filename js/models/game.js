angular
  .module('GetAGame')
  .factory('Game', Game);

Game.$inject = ['$resource', 'API'];
function Game($resource, API) {
  return $resource(API + '/games/:id', { id: '@_id' }, {
    'update': { method:'PATCH' },
  });
  return Game; 
}