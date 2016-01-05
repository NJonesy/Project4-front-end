angular
.module('GetAGame')
.controller('GamesController', GamesController);

GamesController.$inject = ['Game', 'uiGmapGoogleMapApi', '$scope'];
function GamesController(Game, uiGmapGoogleMapApi, $scope) {

 var self = this;

 this.all = Game.query();
 this.newGame = {};
 this.place = {};
 this.sportSearch = "";
 this.numberSearch = "";
 this.markers = [];

 self.addGame = function() {
   Game.save(self.newGame, function(newGame) {
     self.all.push(newGame);
     self.newGame = {};
   })
 };

 uiGmapGoogleMapApi.then(function(maps) {

   var search_map = new maps.Map(
     document.getElementById('search_map'),
     {
       center: {
         lat: 51.5081,
         lng: -0.1000
     },
     zoom: 10,
     styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b4d4e1"},{"visibility":"on"}]}]
   });

   var infoWindow = new maps.InfoWindow();

   createMarker = function(info) {

     var marker = new maps.Marker({
              map: search_map,
              position: new maps.LatLng(info.lat, info.lng),
              title: info.sport
          });

     marker.content = '<div class="infoWindowContent"><ul>' + 
     '<li>' + "Date: " + info.date + '</li>' + '<li>' + "Starts at: " + info.start_time + '</li>' + '<li>' + "Finishes at: " +
     info.end_time + '</li>' + '<li>' + info.number_of_players + " players required" + '</li>' + '<li>' + "Place name: " + info.placeName + '</li>' + '</ul></div>';

     maps.event.addListener(marker, 'click', function () {
         infoWindow.setContent('<h2 class="infoWindowTitle">' + marker.title + '</h2>' + marker.content);
         infoWindow.open(search_map, marker);
     });

     self.markers.push(marker);
   }

   for (i = 0; i < self.all.length; i++) {
     createMarker(self.all[i]);
   }

   $scope.openInfoWindow = function (e, selectedMarker) {
          e.preventDefault();
          maps.event.trigger(selectedMarker, 'click');
      }

  $scope.$watch('nas', function (newValue, oldValue) {
      for (jdx in self.markers) {
          self.markers[jdx].setMap(null);
      }
      self.markers = [];
      for (idx in $scope.nas) {
        createMarker($scope.nas[idx]);
      }
  }, true);
});

 uiGmapGoogleMapApi.then(function(maps) {

   var map = new maps.Map(
     document.getElementById('main-map'),
     {
       center: {
         lat: 51.5081,
         lng: -0.1000
     },
     zoom: 10,
     styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry.fill","stylers":[{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#b4d4e1"},{"visibility":"on"}]}]
   });

   var input = document.getElementById('google-place');

   var autocomplete = new maps.places.Autocomplete(input);

   var marker = new maps.Marker({
     map: map
   });

   maps.event.addListener(autocomplete, 'place_changed', function() {

     self.place = autocomplete.getPlace();
     
     self.newGame.placeId = self.place.id;
     self.newGame.placeName = self.place.name;

     self.newGame.lat = self.place.geometry.location.lat();
     self.newGame.lng = self.place.geometry.location.lng();

     marker.setPlace({
       placeId: self.place.place_id,
       location: self.place.geometry.location
     });

     marker.setVisible(true);
     map.panTo(marker.getPlace().location);

   });
 })

};


  