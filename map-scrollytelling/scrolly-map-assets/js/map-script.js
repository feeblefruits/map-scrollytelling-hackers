
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
'cameroon-zoom': {
duration: 4000,
center: [9.700664, 4.055373],
zoom: 14,
pitch: 120,
bearing: 80,
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
duration: 4000,
center: [-74.172363, 40.735657],
zoom: 12,
pitch: 20,
bearing: 200,
},
'newark-zoom': {
duration: 6000,
center: [-74.172363, 40.735657],
zoom: 4,
pitch: 20,
bearing: 20,
},
'spain': {
duration: 5000,
center: [-1.6590018, 42.8020307],
zoom: 7,
bearing: 60,
pitch: 40,
},
'spain-zoom': {
duration: 5000,
center: [-1.6590018, 42.8020307],
zoom: 14,
bearing: 20,
pitch: 20,
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
            iconUrl: 'scrolly-map-assets/icons/amp.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'mg-office',
            iconPop: 'This is the Mail & Guardian office.'
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
            iconUrl: 'scrolly-map-assets/icons/newspaper_icon.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'ghana-office'
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [9.700664, 4.055373]
        },
        properties: {
          icon: {
            iconUrl: 'scrolly-map-assets/icons/centurian_icon.jpg',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'cameroon-office',
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-75.1652, 39.9526]
        },
        properties: {
          icon: {
            iconUrl: 'scrolly-map-assets/icons/linode_icon.png',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'linode-office',
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-74.172363, 40.735657]
        },
        properties: {
          icon: {
            iconUrl: '/scrolly-map-assets/icons/fb_annon_icon.jpg',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'newark',
          }
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-1.6590018, 42.8020307]
        },
        properties: {
          icon: {
            iconUrl: '/scrolly-map-assets/icons/breiner_icon.jpeg',
            iconSize: [50, 50], // size of the icon
            iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
            className: 'breiner-office',
          }
        }
      },
]};

// add markers to map
geojson.features.forEach(function(marker) {

    // var popup = new mapboxgl.Popup({ offset: 25 })
    // .setText(marker.properties.icon.iconPop);

    var el = document.createElement('div');
    el.className = 'orange-marker';
    el.style.backgroundImage = 'url(' + marker.properties.icon.iconUrl + ')';
    el.style.width = '50px';
    el.style.height = '50px';

    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    // .setPopup(popup)
    .addTo(map);
});
