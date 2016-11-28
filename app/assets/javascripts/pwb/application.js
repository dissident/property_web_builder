// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
// require_tree .
//= require jquery
// require jquery.turbolinks
//= require jquery_ujs
//= require paloma
//= require_tree ./paloma

// $(document).on('page:change', function() {
// once turbolinks is activated, will have to change to above
$(document).on('ready', function() {
  INMOAPP.pageHolder = {};
  // debugger;
  Paloma.start();
  // Paloma.executeHook();
  // Paloma.engine.start();
});

// global namespace
var INMOAPP = INMOAPP || {};
// sub namespace
INMOAPP.pageHolder = {};


INMOAPP.showMap = function(currentItemForMap) {
  if (typeof(INMOAPP.pageHolder.map) === "undefined") {
    INMOAPP.renderMap(currentItemForMap, "600px", true);
  } else {
    // okay, we've got a map and we need to resize it
    google.maps.event.addListener(INMOAPP.pageHolder.map, 'idle', function() {
      google.maps.event.trigger(INMOAPP.pageHolder.map, 'resize');
      var center = INMOAPP.pageHolder.map.getCenter();
      INMOAPP.pageHolder.map.setCenter(center);
    });

  }
};

INMOAPP.renderMap = function(currentItemForMap, minHeight, showMarker) {
  if ($("#inmo-map-canvas").length > 0) {
    // $("#inmo-map-canvas").show();
    var mapOptions = {
      // maxZoom: 20,
      // minZoom: 9,
      scrollwheel: false,
      zoom: 15,
      // center: mapCenter,
      // mapTypeId: google.maps.MapTypeId.ROADMAP
      styles: [{
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{
          "visibility": "off"
        }]
      }]
    };
    mapOptions.mapTypeId = google.maps.MapTypeId.ROADMAP;

    if (minHeight) {
      $("#inmo-map-canvas").css("min-height", minHeight);
    }
    INMOAPP.pageHolder.map = new google.maps.Map(document.getElementById(
      'inmo-map-canvas'), mapOptions);

    if (currentItemForMap && currentItemForMap.latitude) {
      var propertyLatLng = new google.maps.LatLng(
        parseFloat(currentItemForMap.latitude),
        parseFloat(currentItemForMap.longitude)
      );
      // var allMapMarkers = this.get('geo.allMapMarkers') || [];
      var formatted_address = currentItemForMap.street_address || "";
      if (showMarker) {
        INMOAPP.addMarker(propertyLatLng, formatted_address);
      }
      google.maps.event.addListener(INMOAPP.pageHolder.map, 'idle', function() {
        google.maps.event.trigger(INMOAPP.pageHolder.map, 'resize');
        // var center = INMOAPP.pageHolder.map.getCenter();
        INMOAPP.pageHolder.map.setCenter(propertyLatLng);
      });
    }

  }
};

INMOAPP.addMarker = function(latlng, formatted_address) {
  var newMarker = new google.maps.Marker({
    position: latlng,
    map: INMOAPP.pageHolder.map
  });
};


