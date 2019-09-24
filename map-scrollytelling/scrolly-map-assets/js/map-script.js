var chapters = {
'header-wrapper': {
duration: 3000,
center: [24.372235, -37.615087],
zoom: 7.2,
pitch: 0,
bearing: 0,
},
'introduction': {
duration: 3000,
center: [24.372235, -37.615087],
zoom: 7.2,
pitch: 0,
bearing: 0,
},
'cameroon': {
duration: 4000,
center: [12.941919, 4.575653],
zoom: 6,
pitch: 50,
bearing: 30,
},
'mg-office': {
duration: 3000,
center: [28.0175513, -26.1844499],
zoom: 7,
pitch: 45,
bearing: 40,
},
'ghana': {
duration: 3000,
center: [-0.187288, 5.591182],
zoom: 6,
pitch: 45,
bearing: 20,
},
'lesotho': {
duration: 3000,
bearing: 100,
center: [27.9869, -29.4151],
zoom: 5,
zoom: 7,
speed: 0.6,
pitch: 60,
},
'eastern-cape': {
duration: 3000,
center: [28.7781, -31.6067],
zoom: 4,
bearing: 60,
zoom: 6.5,
bearing: 30,
pitch: 70,
}
};

mapboxgl.accessToken = 'pk.eyJ1IjoibWdkZXYiLCJhIjoiY2p4dzBpbnY1MDBnNzNrbXhqODhuNXBuOSJ9.WR7-Mdn3rIfJeps_BNUEBg';

var start = [24.372235, -37.615087]

//Create the Mapbox map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10?optimize=true',
    center: start,
    zoom: 7.2,
    pitch: 10,
    bearing: 0,
    antialias: true
});

map.scrollZoom.disable();

window.onscroll = function() {
var chapterNames = Object.keys(chapters);
for (var i = 0; i < chapterNames.length; i++) {
var chapterName = chapterNames[i];
if (isElementOnScreen(chapterName)) {
setActiveChapter(chapterName);
break;
}
}
};

var activeChapterName = 'header-wrapper';
function setActiveChapter(chapterName) {
if (chapterName === activeChapterName) return;
 
map.flyTo(chapters[chapterName]);
 
document.getElementById(chapterName).setAttribute('class', 'map-chapter active');
document.getElementById(activeChapterName).setAttribute('class', 'map-chapter');
 
activeChapterName = chapterName;
}
 
function isElementOnScreen(id) {
var element = document.getElementById(id);
var bounds = element.getBoundingClientRect();
return bounds.top < window.innerHeight && bounds.bottom > 0;
}

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [28.0175513, -26.1844499]
    },
    properties: {
      title: 'Mapbox',
      description: 'Mail & Guardian'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-0.187288, 5.591182]
    },
    properties: {
      title: 'Mapbox',
      description: 'Ghana Newspaper'
    }
  }]
};

// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'mg-marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);

  var gh_el = document.createElement('div');
  gh_el.className = 'gh-marker';

  new mapboxgl.Marker(gh_el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
});

