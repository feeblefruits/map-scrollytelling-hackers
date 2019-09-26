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
center: [9.700664, 4.055373],
zoom: 6,
pitch: 50,
bearing: 30,
},
'mg-office': {
duration: 5000,
center: [28.0175513, -26.1844499],
zoom: 7,
pitch: 45,
bearing: 40,
},
'ghana': {
duration: 4000,
center: [-0.187288, 5.591182],
zoom: 6,
pitch: 45,
bearing: 20,
},
'philly': {
duration: 5000,
center: [-75.1652, 39.9526],
zoom: 9,
bearing: 50,
pitch: 60,
},
'newark': {
duration: 5000,
center: [-74.172363, 40.735657],
zoom: 9,
bearing: 60,
bearing: 30,
pitch: 70,
},
'spain': {
duration: 5000,
center: [-1.633, 42.817],
zoom: 7,
bearing: 60,
pitch: 40,
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
    features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [28.0175513, -26.1844499]
        },
        properties: {
          icon: {
            iconUrl: 'https://violence.mg.co.za/assets/images/icons/amp.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'mg-office'
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-0.187288, 5.591182]
        },
        properties: {
          icon: {
            iconUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnCLUkpKZKIZB2Z1UlEkoRMusXbmtTafB-_yk7AWa8iWmn1ti8Rw',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'cameroon-office'
      }
    }
  }
]};


// cameroon - [9.700664, 4.055373]
// linode - [-75.1652, 39.9526]
// newark - [-74.172363, 40.735657]


// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'orange-marker';
  el.style.backgroundImage = 'url(' + marker.properties.icon.iconUrl + ')';
  el.style.width = '50px';
  el.style.height = '50px';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
});