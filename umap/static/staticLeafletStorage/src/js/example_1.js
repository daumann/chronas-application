var timeline2;
var colorAreas = {}
var relPlus;
var relGen;
var culPlus;
var rulPlus;
var capitalURL;
var provURL;
//document.domain = 'chronas.org';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

$(function() {

     map.get(urlPrefix + "/datalayer/1/", {
     callback: function (dataDefObj) {


         relPlus = dataDefObj.relPlus;
         relGen =  dataDefObj.relGen;
         culPlus =  dataDefObj.culPlus;
         rulPlus =  dataDefObj.rulPlus;
         capitalURL = dataDefObj.capitalURL;
         provURL = dataDefObj.provURL;

         colorAreas = {}

         for (var property in relPlus) {
             colorAreas[relPlus[property][0]] = relPlus[property][1];
         }
         for (var property in relGen) {
             colorAreas[relGen[property][0]] = relGen[property][1];
         }
         for (var property in culPlus) {
             colorAreas[culPlus[property][0]] = culPlus[property][1];
         }
         for (var property in rulPlus) {
             colorAreas[rulPlus[property][0]] = rulPlus[property][1];
         }


    //TODO: get data first.
    // Get start end times
    var d = new Date();
    d.setFullYear(2020);
    var d2 = new Date();
    d2.setFullYear(0);
    // Set timeline options
    var timelineOptions = {
        "width":  "100%",
        "height": "120px",
        "style": "box",
        "axisOnTop": true,
        "showCustomTime":true,
        "max": d,
        "min": d2
    };
    var tmpYear = parseInt(getJsonFromUrl()["year"]);
    if (isNaN(tmpYear)) tmpYear = parseInt(getRandomArbitrary(0,2000))
    var startTime = new Date().setFullYear(tmpYear); //demoTracks[0].properties.time[0]
    var endTime = new Date().setFullYear(tmpYear);

    // Create a DataSet with data
    var timelineData = new vis.DataSet([{ start: startTime, end: startTime,  content: 'Test interval' }]);


    // Setup timeline
    timeline2 = new vis.Timeline(document.getElementById('timeline'), timelineData, timelineOptions);// timelineData, timelineOptions);
        
    // Set custom time marker (blue)
    timeline2.setCustomTime(startTime)
    timeline2.setWindow(0,2000);
/*
    // Setup leaflet map
    var map = new L.Map('map');

    var basemapLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom : 18,
        id: 'examples.map-i86knfo3'
    });

    // Center map and default zoom level
    map.setView([44.61131534, -123.4726739], 9);

    // Adds the background layer to the map
    map.addLayer(basemapLayer);
*/
    
    // =====================================================
    // =============== Playback ============================
    // =====================================================
    
    // Playback options
    var playbackOptions = {

        //playControl: true,   //TODO: later put back in
        dateControl: true,
        
        // layer and marker options
        layer : {
            pointToLayer : function(featureData, latlng){
                var result = {};
                
                if (featureData && featureData.properties && featureData.properties.path_options){
                    result = featureData.properties.path_options;
                }
                
                if (!result.radius){
                    result.radius = 5;
                }
                
                return new L.CircleMarker(latlng, result);
            }
        },
        
        marker: { 
            getPopup: function(featureData){
                var result = '';
                
                if (featureData && featureData.properties && featureData.properties.title){
                    result = featureData.properties.title;
                }
                
                return result;
            }
        }
        
    };
        
    // Initialize playback
    playback = new L.Playback(map, demoTracks, onPlaybackTimeChange, playbackOptions);

    playback.setData(demoTracks);    
    //playback.addData(blueMountain);

    // Uncomment to test data reset;
    //playback.setData(blueMountain);    
    
    // Set timeline time change event, so cursor is set after moving custom time (blue)
    timeline2.on('timechange', onCustomTimeChange);
    timeline2.on(this._slider, 'mousemove', onSliderChange, this);

    // A callback so timeline is set after changing playback time
    function onPlaybackTimeChange (ms) {
        //   console.debug(ms);
       // timeline2.setCustomTime(new Date(ms));
    };

    function onSliderChange(e) {
        //    console.debug("onSliderChange",e);
        var val = Number(e.target.value);
        playback.setCursor(val);
    }
    
    // 
    function onCustomTimeChange(properties) {
        if (!playback.isPlaying()){
            playback.setCursor(properties.time.getTime());
        }        
    }

/*
    timeline.on('rangechange', function (properties) {
        console.debug("1");
        logEvent('rangechange', properties);
    });
    timeline.on('rangechanged', function (properties) {
        console.debug("2");
        logEvent('rangechanged', properties);
    });
    timeline.on('select', function (properties) {
        console.debug("3");
        logEvent('select', properties);
    });

    
    function logEvent(event, properties) {
        console.debug( 'event=' + JSON.stringify(event) + ', ' +
            'properties=' + JSON.stringify(properties));
       
    }
    
*/
    
    playback.setCursor(startTime);

    timeline2.setWindow(new Date().setFullYear(0),new Date().setFullYear(2000));
}

     });

});