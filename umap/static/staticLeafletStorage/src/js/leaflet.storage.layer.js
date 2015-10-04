var clusterCount = 0;
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');

function updateProgressBar(processed, total, elapsed, layersArray) {
    if (elapsed > 1000) {
        // if it takes more than a second to load, display the progress bar:
        progress.style.display = 'block';
        progressBar.style.width = Math.round(processed/total*100) + '%';
    }

    if (processed === total) {
        // all markers processed - hide the progress bar:
        progress.style.display = 'none';
    }
}
var ClusterSuperGroup = L.markerClusterGroup({ 
    spiderfyOnMaxZoom: false, 
    showCoverageOnHover: false, 
    zoomToBoundsOnClick: false, 
    chunkProgress: updateProgressBar,
    maxClusterRadius: 40
    /*function() { 
        console.debug("clusterCount",clusterCount)
        if (clusterCount>1000) {
            return 80;
        }
        else if (clusterCount>100) {
            return 2
        }
        else {
            return 40;
        }        
    }
    */
});

ClusterSuperGroup.on('clusterclick', function (a) {
   //console.debug("tata");
    drawingSpiderweb=true;
    a.layer.spiderfy(); //explodeCluster();
    drawingSpiderweb=false;
});

var oldYear = 1000000;
var staticCoords;
var currLabelSize = 0;
var constSize = 0;
var ultimateMarker;
var a_areaLoaded = [];
var a_peopleLoaded = [];
var a_settlementsLoaded = [];
var a_castlesLoaded = [];
var a_artefactLoaded = [];
var a_areaInfoLoaded = [];
var a_eventsLoaded = [];
var a_unclassifiedLoaded = [];
var a_milLoaded = [];
var a_polLoaded = [];
var a_sciLoaded = [];
var a_relLoaded = [];
var a_uncPLoaded = [];
var a_expLoaded = [];
var a_artistLoaded = [];
var a_athLoaded = [];

var a_areaData = [];
var a_peopleData = [];
var a_settlementsData = [];
var a_castlesData = [];
var a_artefactData = [];
var a_areaInfoData = [];
var a_eventsData = [];
var a_unclassifiedData = [];
var a_milData = [];
var a_polData = [];
var a_sciData = [];
var a_relData = [];
var a_uncPData = [];
var a_expData = [];
var a_artistData = [];
var a_athData = [];
var b_areaLoaded = false;
var newYear;

function hideAllUnchecked(){
/*
    if (!b_area && a_areaLoaded) != -1){
        $('svg').hide()
    }
    if (!b_other && a_areaInfoLoaded) != -1){
        $('.areaInfo').hide()
    }
    if (!b_other && a_unclassifiedLoaded) != -1){
        $('.unc').hide()
    }
    
    if (!b_events && a_eventsLoaded) != -1){
        $('.events').hide()
    }
    if (!b_city && a_castlesLoaded) != -1){
        $('.castles').hide()
    }
    if (!b_city && a_settlementsLoaded) != -1){
        $('.city').hide()
    }
    if (!b_people && a_peopleLoaded) != -1){
        $('.people').hide()
    }
    if (!b_people && a_milLoaded) != -1){
        $('.mil').hide()
    }
    if (!b_people && a_polLoaded) != -1){
        $('.pol').hide()
    }
    if (!b_people && a_sciLoaded) != -1){
        $('.sci').hide()
    }
    if (!b_people && a_relLoaded) != -1){
        $('.rel').hide()
    }
    if (!b_people && a_uncPLoaded) != -1){
        $('.uncP').hide()
    }
    if (!b_people && a_expLoaded) != -1){
        $('.exp').hide()
    }
    if (!b_people && a_artistLoaded) != -1){
        $('.arti').hide()
    }
    if (!b_people && a_athLoaded) != -1){
        $('.ath').hide()
    }
   */ 
}
function loadFeatures(that,newYear,type){


    var tmpFix;
    if (type == "events"){
        console.log("*** drawing Events")
        a_eventsData=[];
        if (newYear<0)
            tmpFix="21"+(newYear*-1);
        else
            tmpFix="20"+(newYear);   
    }

    else if (type == "city"){
        console.log("*** drawing city")
        a_settlementsData=[];
        if (newYear<0)
            tmpFix="31"+(newYear*-1);
        else
            tmpFix="30"+(newYear);
    }

    else if (type == "castles"){
        console.log("*** drawing Castles")
        a_castlesData=[];
        if (newYear<0)
            tmpFix="41"+(newYear*-1);
        else
            tmpFix="40"+(newYear);
    }

    else if (type == "art"){
        console.log("*** drawing Artefacts")
        a_artefactData=[];
        if (newYear<0)
            tmpFix="51"+(newYear*-1);
        else
            tmpFix="50"+(newYear);
    }

    else if (type == "areaInfo"){
        console.log("*** drawing area Info")
        a_areaInfoData=[];
        if (newYear<0)
            tmpFix="61"+(newYear*-1);
        else
            tmpFix="60"+(newYear);
    }

    else if (type == "unc"){
        console.log("*** drawing unclassified Marker")
        a_unclassifiedData=[];
        if (newYear<0)
            tmpFix="71"+(newYear*-1);
        else
            tmpFix="70"+(newYear);
    }

    else if (type == "mil"){
        a_milData=[];
        if (newYear<0)
            tmpFix="81"+(newYear*-1);
        else
            tmpFix="80"+(newYear);
    }
    else if (type == "pol"){
        a_polData =[];
        if (newYear<0)
            tmpFix="91"+(newYear*-1);
        else
            tmpFix="90"+(newYear);
    }
    else if (type == "sci"){
        a_sciData=[];
        if (newYear<0)
            tmpFix="13"+(newYear*-1);
        else
            tmpFix="12"+(newYear);
    }
    else if (type == "rel"){
        a_relData=[];
        if (newYear<0)
            tmpFix="15"+(newYear*-1);
        else
            tmpFix="14"+(newYear);
    }
    else if (type == "uncP"){
        a_uncPData=[];
        if (newYear<0)
            tmpFix="17"+(newYear*-1);
        else
            tmpFix="16"+(newYear);
    }
    else if (type == "exp"){
        a_expData=[];
        if (newYear<0)
            tmpFix="19"+(newYear*-1);
        else
            tmpFix="18"+(newYear);
    }
    else if (type == "arti"){
        a_artistData=[];
        if (newYear<0)
            tmpFix="23"+(newYear*-1);
        else
            tmpFix="22"+(newYear);
    }
    else if (type == "ath"){
        a_athData=[];
        if (newYear<0)
            tmpFix="25"+(newYear*-1);
        else
            tmpFix="24"+(newYear);
    }

    that.map.get("/en/datalayer/"+tmpFix+"/", {
        callback: function (geojson, response) {
            var  tmpDataArray = []
            if (geojson._storage) {
                that.setOptions(geojson._storage);
            }
            console.debug("x1")
            that._etag = response.getResponseHeader('ETag');
            if (that.isRemoteLayer()) {
                console.debug("fetching remote layer");
                that.fetchRemoteData(tmpDataArray);
            } else {
                console.debug("fetching local layer");
                that.fromGeoJSON(geojson,tmpDataArray);
            }
 
            
            /*
             var features = geojson instanceof Array ? geojson : geojson.features,
             i, len;

             if (features) {
             L.Util.sortFeatures(features, this.map.getOption('sortKey'));
             for (i = 0, len = features.length; i < len; i++) {
             this.geojsonToFeatures(features[i],myDataArray);
             }
             
             */
            if (type == "events"){ 
                a_eventsData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_eventsData);
            }
            else if (type == "city"){
                a_settlementsData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_settlementsData);
            }
            else if (type == "castles"){ 
                a_castlesData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_castlesData);
            }
            else if (type == "art"){ 
                a_artefactData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_artefactData);
            }
            else if (type == "areaInfo"){ 
                a_areaInfoData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_areaInfoData);
            }
            else if (type == "unc"){ 
                a_unclassifiedData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_unclassifiedData);
            }
            else if (type == "mil"){ 
                a_milData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_milData);
            }
            else if (type == "pol"){ 
                a_polData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_polData);
            }
            else if (type == "sci"){ 
                a_sciData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_sciData);
            }
            else if (type == "rel"){ 
                a_relData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_relData);
            }
            else if (type == "uncP"){ 
                a_uncPData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_uncPData);
            }
            else if (type == "exp"){ 
                a_expData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_expData);
            }
            else if (type == "arti"){ 
                a_artistData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_artistData);
            }
            else if (type == "ath"){ 
                a_athData=tmpDataArray;
                ClusterSuperGroup.addLayers(a_athData);
                
            }
            that._loaded = true;
            that.fire('loaded');           
        },
        context: that
    });
}


function getExtrema(listOfPoints){

    var minX = [listOfPoints[0][0], listOfPoints[0][1]];
    var minY =  [listOfPoints[0][0], listOfPoints[0][1]];
    var maxX =  [listOfPoints[0][0], listOfPoints[0][1]];
    var maxY = [listOfPoints[0][0], listOfPoints[0][1]];

    for (var i = 1; i<listOfPoints.length; i++){
        if (minX[0]>listOfPoints[i][0]) minX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxX[0]<listOfPoints[i][0]) maxX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (minY[1]>listOfPoints[i][1]) minY = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxY[1]<listOfPoints[i][1]) maxY = [listOfPoints[i][0], listOfPoints[i][1]];
    }

    return ([minX,minY,maxX,maxY]);
}

function get_polygon_centroid(pts) {
    
    console.debug('get_polygon_centroid with pts', JSON.stringify(pts))
    
    var twicearea=0,
        x=0, y=0,
        nPts = pts.length,
        p1, p2, f;
    
    for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
        p1 = pts[i]; p2 = pts[j];
        f = p1[0]*p2[1] - p2[0]*p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x/f, y/f ];
}


function getCoordsForPolyLine(myCoords){
    /*myCoords = []
    
    for (i=0;i<myCoorrds.length;i++){
        myCoords.push([myCoorrds[i].lat,myCoorrds[i].lng]);
    }    
        */
    console.debug("getCoordsForPolyLine", myCoords);
    
    
    var extremas = getExtrema(myCoords);
    var point = get_polygon_centroid(myCoords);
    
console.debug("extremas, centroid",extremas,point,[[extremas[1][0],extremas[1][1]],point,[extremas[3][0],extremas[3][1]]]);

  
    if ( (Math.abs(extremas[0][0]-extremas[2][0])) > Math.abs((extremas[1][1]-extremas[3][1])) ) {

        currLabelSize = Math.sqrt( (  (extremas[0][1]-point[1]) * (extremas[0][1]-point[1])
            +  (extremas[0][0]-point[0]) * (extremas[0][0]-point[0]) )) 
                                                +
            Math.sqrt( (extremas[2][1]-point[1]) * (extremas[2][1]-point[1])
                +  (extremas[2][0]-point[0]) * (extremas[2][0]-point[0])  );
        
        console.debug("currLabelSize changed to: ", currLabelSize);
        
        
        return [new L.LatLng(extremas[0][1],extremas[0][0]),new L.LatLng(point[1],point[0]),new L.LatLng(extremas[2][1],extremas[2][0])];  //angle != 0
    }
          
    else {

        currLabelSize = Math.sqrt( (  (extremas[0][1]-point[1]) * (extremas[0][1]-point[1])
            +  (extremas[0][0]-point[0]) * (extremas[0][0]-point[0]) ))
            +
            Math.sqrt( (extremas[2][1]-point[1]) * (extremas[2][1]-point[1])
                +  (extremas[2][0]-point[0]) * (extremas[2][0]-point[0])  );

        console.debug("currLabelSize changed to: ", currLabelSize);
        
        return [new L.LatLng(extremas[1][1],extremas[1][0]),new L.LatLng(point[1],point[0]),new L.LatLng(extremas[3][1],extremas[3][0])];
    }
}

L.S.Layer = {
    isBrowsable: true,

    getFeatures: function () {
        return this._layers;
    },

    getEditableOptions: function () {return [];},

    postUpdate: function () {}

};

L.S.Layer.Default = L.FeatureGroup.extend({
    _type: 'Default',
    includes: [L.S.Layer],

    initialize: function (datalayer) {
        
        this.datalayer = datalayer;
        this.datalayer.visible = false;
        console.debug("XXXXXXXXX init datalayer",datalayer)
        L.FeatureGroup.prototype.initialize.call(this);
        if(ultimateMarker === undefined){
            ultimateMarker = new L.Storage.Marker(map, new L.LatLng(42.5,1.4833))
            ultimateMarker.datalayer = datalayer;
        }
        
      
        
    }

});


L.S.Layer.Cluster = L.MarkerClusterGroup.extend({
    _type: 'Cluster',
    includes: [L.S.Layer],

    initialize: function (datalayer) {
        this.datalayer = datalayer;
        var options = {
            polygonOptions: {
                color: this.datalayer.getColor()
            },
            iconCreateFunction: function (cluster) {
                return new L.Storage.Icon.Cluster(datalayer, cluster);
            }
        };
        if (this.datalayer.options.cluster && this.datalayer.options.cluster.radius) {
            options.maxClusterRadius = this.datalayer.options.cluster.radius;
        }
        L.MarkerClusterGroup.prototype.initialize.call(this, options);
    },

    getEditableOptions: function () {
        if (!L.Util.isObject(this.datalayer.options.cluster)) {
            this.datalayer.options.cluster = {};
        }
        return [
            ['options.cluster.radius', {handler: 'BlurIntInput', placeholder: L._('Clustering radius'), helpText: L._('Override clustering radius (default 80)')}],
            ['options.cluster.textColor', {handler: 'TextColorPicker', placeholder: L._('Auto'), helpText: L._('Text color for the cluster label')}],
        ];

    },

    postUpdate: function (field) {
        if (field === 'options.cluster.radius') {
            // No way to reset radius of an already instanciated MarkerClusterGroup...
            this.datalayer.resetLayer(true);
            return;
        }
        if (field === 'options.color') {
            this.options.polygonOptions.color = this.datalayer.getColor();
        }
    }

});

L.S.Layer.Heat = L.HeatLayer.extend({
    _type: 'Heat',
    includes: [L.S.Layer],
    isBrowsable: false,

    initialize: function (datalayer) {
        this.datalayer = datalayer;
        L.HeatLayer.prototype.initialize.call(this, [], this.datalayer.options.heat);
    },

    addLayer: function (layer) {
        
        if (layer instanceof L.Marker) {
            var latlng = layer.getLatLng(), alt;
            if (this.datalayer.options.heat && this.datalayer.options.heat.intensityProperty) {
                alt = parseFloat(layer.properties[this.datalayer.options.heat.intensityProperty || 0]);
                latlng = new L.LatLng(latlng.lat, latlng.lng, alt);
            }
            this.addLatLng(latlng);
        }
    },

    clearLayers: function () {
        this.setLatLngs([]);
    },

    getFeatures: function () {
        return {};
    },

    getBounds: function () {
        return L.latLngBounds(this._latlngs);
    },

    getEditableOptions: function () {
        if (!L.Util.isObject(this.datalayer.options.heat)) {
            this.datalayer.options.heat = {};
        }
        return [
            ['options.heat.radius', {handler: 'BlurIntInput', placeholder: L._('Heatmap radius'), helpText: L._('Override heatmap radius (default 25)')}],
            ['options.heat.intensityProperty', {handler: 'BlurInput', placeholder: L._('Heatmap intensity property'), helpText: L._('Optional intensity property for heatmap')}],
        ];

    },

    postUpdate: function (field) {
        if (field === 'options.heat.intensityProperty') {
            this.datalayer.resetLayer(true);  // We need to repopulate the latlngs
            return;
        }
        if (field === 'options.heat.radius') {
            this.options.radius = this.datalayer.options.heat.radius;
        }
        this._updateOptions();
    }

});

L.Storage.DataLayer = L.Class.extend({

    includes: [L.Mixin.Events],

    options: {
        displayOnLoad: false
    },

    initialize: function (map, data) {
        
        console.debug("DataLayer initializing with ", map, JSON.stringify(data))
        this.map = map;
        this._index = Array();
        this._layers = {};
        this._geojson = null;

        var isDirty = false,
            isDeleted = false,
            self = this;
        try {
            Object.defineProperty(this, 'isDirty', {
                get: function () {
                    return isDirty;
                },
                set: function (status) {
                    if (!isDirty && status) {
                        self.fire('dirty');
                    }
                    isDirty = status;
                    if (status) {
                        self.map.addDirtyDatalayer(self);
                    } else {
                        self.map.removeDirtyDatalayer(self);
                        self.isDeleted = false;
                    }
                }
            });
        }
        catch (e) {
            // Certainly IE8, which has a limited version of defineProperty
        }
        try {
            Object.defineProperty(this, 'isDeleted', {
                get: function () {
                    return isDeleted;
                },
                set: function (status) {
                    if (!isDeleted && status) {
                        self.fire('deleted');
                    }
                    isDeleted = status;
                    if (status) self.isDirty = status;
                }
            });
        }
        catch (e) {
            // Certainly IE8, which has a limited version of defineProperty
        }
        this.setStorageId(data.id);
        this.setOptions(data);
        this.connectToMap();
        if ((this.map.datalayersOnLoad && this.storage_id && this.map.datalayersOnLoad.indexOf(this.storage_id.toString()) !== -1) ||
            (!this.map.datalayersOnLoad && this.options.displayOnLoad)) {
            this.show();
        }
        if (!this.storage_id) {
            this.isDirty = true;
        }
        this.onceLoaded(function () {
            this.map.on('moveend', function () {
                if (this.isRemoteLayer() && this.options.remoteData.dynamic && this.isVisible()) {
                    this.fetchRemoteData();
                }
            }, this);
        });
        
    },

    resetLayer: function (force) {
        // Backward compat, to be removed
        if (this.options.markercluster) {
            this.options.type = 'Cluster';
            delete this.options.markercluster;
        }

        if (this.layer && this.options.type === this.layer._type && !force) return;
        var visible = this.isVisible();
        if (visible) {
            this.map.removeLayer(this.layer);
        }
        if (this.layer) {
            this.layer.clearLayers();
        }
        var Class = L.S.Layer[this.options.type] || L.S.Layer.Default;
        this.layer = new Class(this);
        this.eachLayer(function (layer) {
            this.layer.addLayer(layer);
        });
        console.debug("!-! 1")
        if (visible) {
            this.map.addLayer(this.layer);
        }
        this.propagateRemote();
    },

    eachLayer: function (method, context) {
        for (var i in this._layers) {
        //    console.debug(i,"eachLayer", this._layers, this)
            method.call(context || this, this._layers[i]);
        }
        return this;
    },

    eachFeature: function (method, context) {
        if (this.layer && this.layer.isBrowsable) {
            for (var i = 0; i < this._index.length; i++) {
                method.call(context || this, this._layers[this._index[i]]);
            }
        }
        return this;
    },

    fetchData: function () {

       // $("#eventsChecked").off('change');
  //      $("#eventsChecked").change(function(){
            
            // search for storage id of current year in object and do:
            //map.datalayers[146].toggle()
  //      });
        
        
        
        if (b_events){
            
            if (a_eventsData.length == 0){
                a_eventsLoaded.push(newYear);
                loadFeatures(this,newYear,"events");
            }
            else{
                ClusterSuperGroup.addLayers(a_eventsData)
                console.log("*** Events not loaded in for layer",newYear,"Data already loaded.");
            }

        }
        else{
                ClusterSuperGroup.removeLayers(a_eventsData)
            
        }

        if (b_art){

            if (a_artefactData.length == 0){
                a_artefactLoaded.push(newYear);
                loadFeatures(this,newYear,"art");
            }
            else{
                ClusterSuperGroup.addLayers(a_artefactData)
                console.log("*** Artefacts not loaded in for layer",newYear,"Data already loaded.");
            }

        }
        else{
                ClusterSuperGroup.removeLayers(a_artefactData)
            
        }
        
        if (b_city){

            if (b_sub_cities && a_settlementsData.length == 0){
                loadFeatures(this,newYear,"city");
                a_settlementsLoaded.push(newYear);
            }
            else if (b_sub_cities){
                ClusterSuperGroup.addLayers(a_settlementsData)
                console.log("*** Cities not loaded in for layer",newYear,"Data already loaded.");
            }

            if (b_sub_castles && a_castlesData.length == 0){                
                a_castlesLoaded.push(newYear);                
                loadFeatures(this,newYear,"castles");
            }
            else if (b_sub_castles){
                ClusterSuperGroup.addLayers(a_castlesData)
            }

        }
        else{
                ClusterSuperGroup.removeLayers(a_castlesData)            
                ClusterSuperGroup.removeLayers(a_settlementsData)
            
        }
        
        if (b_people){

            if (b_sub_military && a_milData.length == 0){
                loadFeatures(this,newYear,"mil");
                a_milLoaded.push(newYear);
            }
            else if (b_sub_military){
                ClusterSuperGroup.addLayers(a_milData)
            }

            if (b_sub_politician && a_polData.length == 0){
                loadFeatures(this,newYear,"pol");
                a_polLoaded.push(newYear);
            }
            else if (b_sub_politician){
                ClusterSuperGroup.addLayers(a_polData)
            }

            if (b_sub_scientist && a_sciData.length == 0){
                loadFeatures(this,newYear,"sci");
                a_sciLoaded.push(newYear);
            }
            else if (b_sub_scientist){
                ClusterSuperGroup.addLayers(a_sciData)
            }

            if (b_sub_religious && a_relData.length == 0){
                loadFeatures(this,newYear,"rel");
                a_relLoaded.push(newYear);
            }
            else if (b_sub_religious){
                ClusterSuperGroup.addLayers(a_relData)
            }

            if (b_sub_uncP && a_uncPData.length == 0){
                loadFeatures(this,newYear,"uncP");
                a_uncPLoaded.push(newYear);
            }
            else if (b_sub_uncP){
                ClusterSuperGroup.addLayers(a_uncPData)
            }

            if (b_sub_exp && a_expData.length == 0){
                loadFeatures(this,newYear,"exp");
                a_expLoaded.push(newYear);
            }
            else if (b_sub_exp){
                ClusterSuperGroup.addLayers(a_expData)
            }

            if (b_sub_artist && a_artistData.length == 0){
                loadFeatures(this,newYear,"arti");
                a_artistLoaded.push(newYear);
            }
            else if (b_sub_artist){
                ClusterSuperGroup.addLayers(a_artistData)
            }

            if (b_sub_athlete && a_athData.length == 0){
                loadFeatures(this,newYear,"ath");
                a_athLoaded.push(newYear);
            }
            else if (b_sub_athlete){
                ClusterSuperGroup.addLayers(a_athData)
            }
            /*
        this.map.get(this._dataUrl(), {
            callback: function (geojson, response) {
                console.debug("ending call2")
                if (geojson._storage) {
                    this.setOptions(geojson._storage);
                }
                this._etag = response.getResponseHeader('ETag');
                if (this.isRemoteLayer()) {
                    this.fetchRemoteData();
                } else {
                    this.fromGeoJSON(geojson);
                }
                this._loaded = true;
                this.fire('loaded');

                console.debug("fetchData",geojson)
            },
            context: this
        });
            */
        }

        if (b_other){

            if (b_sub_areaInfo && a_areaInfoData.length == 0){
                a_areaInfoLoaded.push(newYear);
                loadFeatures(this,newYear,"areaInfo");
            }
            else if (b_sub_areaInfo){
                ClusterSuperGroup.addLayers(a_areaInfoData)
            }

            if (b_sub_unclassified && a_unclassifiedData.length == 0){
                a_unclassifiedLoaded.push(newYear);
                loadFeatures(this,newYear,"unc");
            }
            else if (b_sub_unclassified){
                ClusterSuperGroup.addLayers(a_unclassifiedData)
            }

        }

        
    },

    fromGeoJSON: function (geojson,myDataArray) {
        /*
        for (var j=0; j<geojson.features.length; j++){
            geojson.features[j].properties.ty=type;
        }
        */
        
        this.addData(geojson,myDataArray);
        this._geojson = geojson;
        this.fire('dataloaded');
        this.fire('datachanged');
    },

    clear: function () {
        this.layer.clearLayers();
        this._layers = {};
        this._index = Array();
        if (this._geojson) {
            this._geojson_bk = L.Util.CopyJSON(this._geojson);
            this._geojson = null;
        }
    },

    reindex: function () {
        var features = [];
        this.eachFeature(function (feature) {
            features.push(feature);
        });
        L.Util.sortFeatures(features, this.map.getOption('sortKey'));
        this._index = [];
        for (var i = 0; i < features.length; i++) {
            this._index.push(L.Util.stamp(features[i]));
        }
    },

    fetchRemoteData: function (myDataArray) {
        var from = parseInt(this.options.remoteData.from, 10),
            to = parseInt(this.options.remoteData.to, 10);
        if ((!isNaN(from) && this.map.getZoom() < from) ||
            (!isNaN(to) && this.map.getZoom() > to) ) {
            this.clear();
            return;
        }
        var self = this,
            url = this.map.localizeUrl(this.options.remoteData.url);
        if (this.options.remoteData.proxy) {
            url = this.map.proxyUrl(url);
        }
        this.map.ajax({
            uri: url,
            verb: 'GET',
            callback: function (raw) {
                self.clear();
                self.rawToGeoJSON(raw, self.options.remoteData.format, function (geojson) {self.fromGeoJSON(geojson,myDataArray);});

                console.debug("fetched remote data ",self, raw)
            }
        });
    },

    onceLoaded: function (callback, context) {
        if (this.isLoaded()) {
            callback.call(context || this, this);
        } else {
            this.once('loaded', callback, context);
        }
        return this;
    },

    onceDataLoaded: function (callback, context) {
        if (this.hasDataLoaded()) {
            callback.call(context || this, this);
        } else {
            this.once('dataloaded', callback, context);
        }
        return this;
    },

    isLoaded: function () {
        return !this.storage_id || this._loaded;
    },

    hasDataLoaded: function () {
        return !this.storage_id || this._geojson !== null;
    },

    setStorageId: function (id) {
        // Datalayer is null when listening creation form
        if (!this.storage_id && id) {
            this.storage_id = id;
        }
    },

    backupOptions: function () {
        this._backupOptions = L.Util.CopyJSON(this.options);
    },

    resetOptions: function () {
        this.options = L.Util.CopyJSON(this._backupOptions);
    },

    setOptions: function (options) {
        L.Util.setOptions(this, options);
        this.backupOptions();
        this.resetLayer();
    },

    connectToMap: function () {
        var id = L.stamp(this);
        if (!this.map.datalayers[id]) {
            this.map.datalayers[id] = this;
            this.map.datalayers_index.push(this);
        }
        this.map.updateDatalayersControl();
    },

    _dataUrl: function() {
        var template = this.map.options.urls.datalayer_view;
        return L.Util.template(template, {'pk': this.storage_id, 'map_id': this.map.options.storage_id});
    },

    isRemoteLayer: function () {
        return !!(this.options.remoteData && this.options.remoteData.url && this.options.remoteData.format);
    },

    isClustered: function () {
        return this.options.type === 'Cluster';
    },

    addLayer: function (feature) {


        var id = L.stamp(feature);
        feature.connectToDataLayer(this);
        this._index.push(id);
        
        this._layers[id] = feature;

   //     clusterCount++;
        ClusterSuperGroup.addLayer(feature);
        //this.layer.addLayer(feature);
        
     //   console.debug("!-! 5")
        if (this.hasDataLoaded()) {
            this.fire('datachanged');
        }

     //   console.debug("adding feature", feature)
    },

    removeLayer: function (feature) {
        var id = L.stamp(feature);
        feature.disconnectFromDataLayer(this);
        this._index.splice(this._index.indexOf(id), 1);
        delete this._layers[id];
        this.layer.removeLayer(feature);
        if (this.hasDataLoaded()) {
            this.fire('datachanged');
        }
    },

    addData: function (geojson,myDataArray) {
        //   if (geojson.storage.name != "2014")

       // geojson._storage.displayOnLoad = false;
        
     //   console.debug("adding data", geojson)
        
        this.geojsonToFeatures(geojson,myDataArray);
    },

    addRawData: function (c, type) {
    //    console.debug("adding RawData", c, type)
        var self = this;
        this.rawToGeoJSON(c, type, function (geojson) {
            self.addData(geojson);
        });
    },

    rawToGeoJSON: function (c, type, callback) {
        var toDom = function (x) {
            return (new DOMParser()).parseFromString(x, 'text/xml');
        };

        // TODO add a duck typing guessType
        if (type === 'csv') {
            csv2geojson.csv2geojson(c, {
                delimiter: 'auto',
                includeLatLon: false
            }, function(err, result) {
                if (err) {
                    var message = '';
                    for (var i = 0; i < err.length; i++) {
                        message += err[i].message;
                    }
                    L.S.fire('ui:alert', {content: message, level: 'error'});
                    console.log(err);
                } else {
                    callback(result);
                }
            });
        } else if (type === 'gpx') {
            callback(toGeoJSON.gpx(toDom(c)));
        } else if (type === 'georss') {
            callback(GeoRSSToGeoJSON(toDom(c)));
        } else if (type === 'kml') {
            callback(toGeoJSON.kml(toDom(c)));
        } else if (type === 'osm') {
            var d;
            try {
                d = JSON.parse(c);
            } catch (e) {
                d = toDom(c);
            }
            callback(osmtogeojson(d, {flatProperties: true}));
        } else if (type === 'geojson') {
            try {
                var gj = JSON.parse(c);
                callback(gj);
            } catch(err) {
                L.S.fire('ui:alert', {content: 'Invalid JSON file: ' + err});
                return;
            }
        }
    },

    geojsonToFeatures: function (geojson,myDataArray) {
        
     //   console.debug("geojsonToFeatures", JSON.stringify(geojson));
        var features = geojson instanceof Array ? geojson : geojson.features,
            i, len;

        if (features) {
            L.Util.sortFeatures(features, this.map.getOption('sortKey'));
            for (i = 0, len = features.length; i < len; i++) {
                this.geojsonToFeatures(features[i],myDataArray);
            }
         //   console.debug(JSON.stringify(this));
            return this;
        }

        var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson;
        if (!geometry) return;  // null geometry is valid geojson.
        var coords = geometry.coordinates,
            layer, tmp;

        switch (geometry.type) {
            case 'Point':
                try {
                    latlng = L.GeoJSON.coordsToLatLng(coords);
                } catch (e) {
                    console.error('Invalid latlng object from', coords);
                    break;
                }
                layer = this._pointToLayer(geojson, latlng);
                break;
            case 'LineString':
                latlngs = L.GeoJSON.coordsToLatLngs(coords);
                if (!latlngs.length) break;
                layer = this._lineToLayer(geojson, latlngs);
                break;
            case 'Polygon':
                
                console.debug("inside case Polygon");
                

                
                latlngs = L.GeoJSON.coordsToLatLngs(coords, 1);
                layer = this._polygonToLayer(geojson, latlngs);
                console.debug("preparing to create Poly with coords: ", coords, "and properties:", geojson.properties);

                
/*
                var polyline = new L.Polyline(getCoordsForPolyLine(coords[0]), {
                    color: 'red',
                    weight: 10,
                    opacity: 0.5,
                    curved: true,
                    smoothFactor: 1

                }).addTo(this.map);
               */ 
                break;
            case 'MultiLineString':
                // Merge instead of failing for now
                if (coords.length >= 1) {
                    tmp = [];
                    for (var j=0, l=coords.length; j<l; j++) {
                        tmp = tmp.concat(coords[j]);
                    }
                    latlngs = L.GeoJSON.coordsToLatLngs(tmp);
                    layer = this._lineToLayer(geojson, latlngs);
                    break;
                }
            case 'MultiPolygon':
                // Hack: we handle only MultiPolygon with one polygon
                if (coords.length === 1) {
                    latlngs = L.GeoJSON.coordsToLatLngs(coords[0], 1);
                    layer = this._polygonToLayer(geojson, latlngs);
                    break;
                }
            case 'GeometryCollection':
                return this.geojsonToFeatures(geojson.geometries);
            default:
                L.S.fire('ui:alert', {content: L._('Skipping unkown geometry.type: {type}', {type: geometry.type}), level: 'error'});
        }
        if (layer) {
            console.debug("!-! 6")
            myDataArray.push(layer)
          //  this.addLayer(layer);
         //   ClusterSuperGroup.addLayer(layer);
            return layer;
        }
    },

    _pointToLayer: function(geojson, latlng) {
        if(this.options.pointToLayer) {
            return options.pointToLayer(geojson, latlng);
        }
        return new L.Storage.Marker(
            this.map,
            latlng,
            {'geojson': geojson, 'datalayer': this}
        );
    },

    _lineToLayer: function(geojson, latlngs) {
        return new L.Storage.Polyline(
            this.map,
            latlngs,
            {'geojson': geojson, 'datalayer': this, color: null}
        );
    },

    _polygonToLayer: function(geojson, latlngs) {
        // Ensure no empty hole
        // for (var i = latlngs.length - 1; i > 0; i--) {
        //     if (!latlngs.slice()[i].length) latlngs.splice(i, 1);
        // }
        console.debug("creating Polygon 2");
        return new L.Storage.Polygon(
            this.map,
            latlngs,
            {'geojson': geojson, 'datalayer': this}
        );
    },

    importRaw: function (raw, type) {
        this.addRawData(raw, type);
        this.isDirty = true;
        this.zoomTo();
    },

    importFromFiles: function (files, type) {
        for (var i = 0, f; f = files[i]; i++) {
            this.importFromFile(f, type);
        }
    },

    importFromFile: function (f, type) {
        var reader = new FileReader(),
            self = this;
        type = type || L.Util.detectFileType(f);
        reader.readAsText(f);
        reader.onload = function (e) {
            self.importRaw(e.target.result, type);
        };
    },

    importFromUrl: function (url, type) {
        url = this.map.localizeUrl(url);
        var self = this;
        L.S.Xhr._ajax({verb: 'GET', uri: url, callback: function (data) {
            self.importRaw(data, type);
        }});
    },

    getEditUrl: function() {
        return L.Util.template(this.map.options.urls.datalayer_update, {'map_id': this.map.options.storage_id, 'pk': this.storage_id});
    },

    getCreateUrl: function() {
        return L.Util.template(this.map.options.urls.datalayer_create, {'map_id': this.map.options.storage_id});
    },

    getSaveUrl: function () {
        return (this.storage_id && this.getEditUrl()) || this.getCreateUrl();
    },

    getColor: function () {
        return this.options.color || this.map.getOption('color');
    },

    getDeleteUrl: function () {
        return L.Util.template(this.map.options.urls.datalayer_delete, {'pk': this.storage_id, 'map_id': this.map.options.storage_id});

    },

    _delete: function () {
        this.isDeleted = true;
        this.erase();
    },

    empty: function () {
        if (this.isRemoteLayer()) return;
        this.clear();
        this.isDirty = true;
    },

    clone: function () {
        var options = L.Util.CopyJSON(this.options);
        options.name = L._('Clone of {name}', {name: this.options.name});
        delete options.id;
        var geojson = L.Util.CopyJSON(this._geojson),
            datalayer = this.map.createDataLayer(options);
        datalayer.fromGeoJSON(geojson);
        return datalayer;
    },

    erase: function () {
        this.hide();
        delete this.map.datalayers[L.stamp(this)];
        this.map.datalayers_index.splice(this.map.datalayers_index.indexOf(this), 1);
        this.map.updateDatalayersControl();
        this.fire('erase');
        this._leaflet_events_bk = this._leaflet_events;
        this.off();
        this.clear();
        delete this._loaded;
    },

    reset: function () {
        if (this.storage_id) {
            this.resetOptions();
            if (this._leaflet_events_bk && !this._leaflet_events) {
                this._leaflet_events = this._leaflet_events_bk;
            }
            this.hide();
            this.clear();
            if (this.isRemoteLayer()) {
                this.fetchRemoteData();
            } else if (this._geojson_bk) {
                this.fromGeoJSON(this._geojson_bk);
            }
            this._loaded = true;
            this.show();
            this.isDirty = false;
        } else {
            this.erase();
        }
    },

    redraw: function () {
        this.hide();
        this.show();
    },

    edit: function () {
        if(!this.map.editEnabled || !this.isLoaded()) {return;}
        var container = L.DomUtil.create('div'),
            metadata_fields = [
                'options.name',
                'options.description',
                ['options.type', {handler: 'LayerTypeChooser', label: L._('Type of layer')}],
                ['options.displayOnLoad', {label: L._('Display on load'), handler: 'CheckBox'}]
            ];
        var builder = new L.S.FormBuilder(this, metadata_fields, {
            callback: function (field) {
                this.map.updateDatalayersControl();
                if (field === 'options.type') {
                    this.resetLayer();
                    this.edit();
                }
            },
            callbackContext: this
        });
        form = builder.build();
        container.appendChild(form);
        var optionsFields = [
            'options.color',
            'options.iconClass',
            'options.iconUrl',
            'options.smoothFactor',
            'options.opacity',
            'options.stroke',
            'options.weight',
            'options.fill',
            'options.fillColor',
            'options.fillOpacity',
            'options.dashArray',
            'options.popupTemplate',
            'options.zoomTo',
            'options.showLabel',
            'options.popupContentTemplate'
        ];

        optionsFields = optionsFields.concat(this.layer.getEditableOptions());

        builder = new L.S.FormBuilder(this, optionsFields, {
            id: 'datalayer-advanced-properties',
            callback: function (field) {
                this.hide();
                this.layer.postUpdate(field);
                this.show();
            }
        });
        var advancedProperties = L.DomUtil.createFieldset(container, L._('Advanced properties'));
        form = builder.build();
        advancedProperties.appendChild(form);

        if (!L.Util.isObject(this.options.remoteData)) {
            this.options.remoteData = {};
        }
        var remoteDataFields = [
            ['options.remoteData.url', {handler: 'Url', label: L._('Url'), helpEntries: 'formatURL'}],
            ['options.remoteData.format', {handler: 'DataFormat', label: L._('Format')}],
            ['options.remoteData.from', {label: L._('From zoom'), helpText: L._('Optionnal.')}],
            ['options.remoteData.to', {label: L._('To zoom'), helpText: L._('Optionnal.')}],
            ['options.remoteData.dynamic', {handler: 'CheckBox', label: L._('Dynamic')}],
            ['options.remoteData.licence', {label: L._('Licence'), helpText: L._('Please be sure the licence is compliant with your use.')}]
        ];
        if (this.map.options.urls.ajax_proxy) {
            remoteDataFields.push(['options.remoteData.proxy', {handler: 'CheckBox', label: L._('Proxy request'), helpText: L._('To use if remote server doesn\'t allow cross domain (slower)')}]);
        }

        var remoteDataContainer = L.DomUtil.createFieldset(container, L._('Remote data'));
        builder = new L.S.FormBuilder(this, remoteDataFields);
        remoteDataContainer.appendChild(builder.build());

        var advancedActions = L.DomUtil.createFieldset(container, L._('Advanced actions'));
        var deleteLink = L.DomUtil.create('a', 'delete_datalayer_button storage-delete', advancedActions);
        deleteLink.innerHTML = L._('Delete');
        deleteLink.href = '#';
        L.DomEvent.on(deleteLink, 'click', L.DomEvent.stop)
            .on(deleteLink, 'click', function () {
                this._delete();
                L.S.fire('ui:end');
            }, this);
        if (!this.isRemoteLayer()) {
            var emptyLink = L.DomUtil.create('a', 'storage-empty', advancedActions);
            emptyLink.innerHTML = L._('Empty');
            emptyLink.href = '#';
            L.DomEvent.on(emptyLink, 'click', L.DomEvent.stop)
                .on(emptyLink, 'click', this.empty, this);
        }
        var cloneLink = L.DomUtil.create('a', 'storage-clone', advancedActions);
        cloneLink.innerHTML = L._('Clone');
        cloneLink.href = '#';
        L.DomEvent.on(cloneLink, 'click', L.DomEvent.stop)
            .on(cloneLink, 'click', function () {
                datalayer = this.clone();
                datalayer.edit();
            }, this);
        L.S.fire('ui:start', {data: {html: container}});

    },

    featuresToGeoJSON: function () {
        var features = [];
        this.eachLayer(function (layer) {
            features.push(layer.toGeoJSON());
        });
        return features;
    },

    show: function () {

        console.info(" *** fetching data for layer with this.storage_id",this);
        
        if (!this.storage_id) {
            return;
        }
        else{
            newYear = this.storage_id;
            
        }
        if(newYear != oldYear){
            oldYear = newYear
            
        a_settlementsData = [];
        a_castlesData = [];
        a_artefactData = [];
        a_areaInfoData = [];
        a_eventsData = [];
        a_unclassifiedData = [];
        a_milData = [];
        a_polData = [];
        a_sciData = [];
        a_relData = [];
        a_uncPData = [];
        a_expData = [];
        a_artistData = [];
        a_athData = [];
        b_areaLoaded = false;


        if (b_area && !b_areaLoaded && !this.isLoaded()){
            
            //query then draw
            var tmpFix;
            console.debug("starting call",newYear)

            if (newYear<0)
                tmpFix="11"+(newYear*-1);
            else
                tmpFix="10"+(newYear);
            
            b_areaLoaded = true;
            this.map.get("/en/datalayer/"+tmpFix+"/", {

                callback: function (geojson, response) {
                    
                    console.debug("ending call")

                    changeYear(newYear,geojson);


                    console.debug("area data load complete", geojson)
                },
                context: this
            });

        }


        console.log("*** showing layer which is already loaded?", this.isLoaded())

       // if(!this.isLoaded()) {
            console.log("*** fetching data")
            this.fetchData();
       // }
      //  console.log("*** adding layer to map: this.layer", this)

 //       clusterCount = 0;
        ClusterSuperGroup.clearLayers();

        
        
        console.debug("!-! 7")
        this.fire('show');
    }
    },

    hide: function () {
        console.log("*** hiding (removing) layer")
        this.map.removeLayer(this.layer);
        this.fire('hide');
    },

    toggle: function () {
        console.debug("*** inside clicked on layer button which is visible? ",this.isVisible(),this)
        if (!this.isVisible()) {
            this.show();
        }
        else {
            this.hide();
        }
    },

    zoomTo: function () {
        if (!this.isVisible()) {
            return;
        }
        var bounds = this.layer.getBounds();
        if (bounds.isValid()) {
            this.map.fitBounds(bounds);
        }
    },

    isVisible: function () {
        return this.map.hasLayer(this.layer);
    },

    getFeatureByIndex: function (index) {
        if (index === -1) {
            index = this._index.length - 1;
        }
        var id = this._index[index];
        return this._layers[id];
    },

    getNextFeature: function (feature) {
        var id = this._index.indexOf(L.stamp(feature)),
            nextId = this._index[id + 1];
        return nextId? this._layers[nextId]: this.getNextVisible().getFeatureByIndex(0);
    },

    getPreviousFeature: function (feature) {
        if (this._index <= 1) { return null; }
        var id = this._index.indexOf(L.stamp(feature)),
            previousId = this._index[id - 1];
        return previousId? this._layers[previousId]: this.getPreviousVisible().getFeatureByIndex(-1);
    },

    getNextVisible: function () {
        var id = this.map.datalayers_index.indexOf(this),
            next = this.map.datalayers_index[id + 1] || this.map.datalayers_index[0];
        while(!next.isVisible() || !next.isBrowsable() || next._index.length === 0) {
            next = next.getNextVisible();
        }
        return next;
    },

    getPreviousVisible: function () {
        var id = this.map.datalayers_index.indexOf(this),
            prev = this.map.datalayers_index[id - 1] || this.map.datalayers_index[this.map.datalayers_index.length - 1];
        while(!prev.isVisible() || !prev.isBrowsable() || prev._index.length === 0) {
            prev = prev.getPreviousVisible();
        }
        return prev;
    },

    isBrowsable: function () {
        return this.layer && this.layer.isBrowsable;
    },

    save: function () {
        console.debug("inside save");
       // formData.append('name', formData.append('name',document.getElementById("preset-input-name").value));
        
        if (this.isDeleted) {
            this.saveDelete();
            return;
        }
        if (!this.isLoaded()) {return;}
        this._geojson
        console.debug("SSSSSSSSAAAAAAAAAAVVVVVVVVVVVIIIIIINNNNNNNGGGGGGGGG",this.featuresToGeoJSON());
        
        var geojson = {
            type: 'FeatureCollection',
            features: this.isRemoteLayer() ? [] : this.featuresToGeoJSON(),
            _storage: this.options
        };
        this.backupOptions();
        var formData = new FormData();
        console.debug(this.options.name);


        console.debug(this.options);
        // console.debug(document.getElementsByName("name")[0].value)
        
        
        // formData.append('name', document.getElementsByClassName("datetimeValue")[0].innerHTML);//this.options.name //staticName);   formData.append('name',document.getElementsByName("name")[0].value);//this.options.name);

        formData.append('name', this.options.name);
/*
        var option = document.createElement("option");
        option.text = document.getElementsByClassName("datetimeValue")[0].innerHTML;

        document.getElementsByName("datalayer")[0].add(option);

        document.getElementsByClassName("datetimeValue")[0].innerHTML
        */

        formData.append('display_on_load', !!this.options.displayOnLoad);
        // filename support is shaky, don't do it for now
        var blob = new Blob([JSON.stringify(geojson)], {type: 'application/json'});
        formData.append('geojson', blob);
        this.map.post(this.getSaveUrl(), {
            data: formData,
            callback: function (data, response) {
                this._geojson = geojson;
                this._etag = response.getResponseHeader('ETag');
                this.setStorageId(data.id);
                this.setOptions(data);
                this.connectToMap();
                this.reset();  // Needed for reordering features
                this.map.continueSaving();
            },
            context: this,
            headers: {'If-Match': this._etag || ''}
        });
    },

    saveDelete: function () {
        L.S.Xhr.post(this.getDeleteUrl(), {
            callback: function () {
                this.isDirty = false;
                this.map.continueSaving();
            },
            context: this
        });
    },

    getMap: function () {
        return this.map;
    },

    getName: function () {
        return this.options.name || L._('Untitled layer');
    },

    tableEdit: function () {
        if (this.isRemoteLayer() || !this.isVisible()) return;
        var editor = new L.S.TableEditor(this);
        editor.edit();
    }

});

L.TileLayer.include({

    toJSON: function () {
        return {
            minZoom: this.options.minZoom,
            maxZoom: this.options.maxZoom,
            attribution: this.options.attribution,
            url_template: this._url,
            name: this.options.name,
            tms: this.options.tms
        };
    },

    getAttribution: function () {
        return L.Util.toHTML(this.options.attribution);
    }

});
