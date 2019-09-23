var chapters = {
'introduction': {
duration: 3000,
center: [25.0288, -24.0973],
zoom: 4,
pitch: 0,
bearing: 0,
},
'zimbabwe': {
duration: 3000,
center: [32.6334, -20.1914],
zoom: 8,
pitch: 45,
bearing: 40,
},
'botswana': {
duration: 3000,
center: [25.1966, -25.3430],
zoom: 8,
pitch: 50,
bearing: 80,
},
'eswatini': {
duration: 3000,
center: [31.4630, -26.5179],
zoom: 8,
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

var start = [28.6790, -30.1115]

//Create the Mapbox map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
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

var activeChapterName = 'lesotho-eastern-cape';
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