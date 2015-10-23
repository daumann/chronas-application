console.log("*** enter svgProv overlay logic definitions");

var alert = function(){ console.log.apply(console,arguments); };
var fullTimeData = {};
var activeListFeature = "rel";
var total = 0;
var total2 = 0;
var sortRuler = [];
var sortCul = [];
var sortRel = [];
var sortmRel = [];
var rulerPops = {}
var culPops = {}
var relPops = {}
var mainRelPops = {}
var max_amount;
var sortAll = [];
var rulerPops2 = {}
var culPops2 = {}
var relPops2 = {}
var mainRelPops2 = {}

var sunburstRel = []
var sunburstRul = []

var drawingImageLine = false;

var blocklist=[]
var imageMap={}

var limit=50

var allowGallery=false;

function sortNumber(a,b){
    return a-b;    
}

function getRelevantKing(monarchObj){ 
        var prekeys = [];var keys = [];
    for (var key in monarchObj) {
        prekeys.push(key)
        
    }
   // keys.sort();
    keys =  prekeys.sort(sortNumber);
    
    var selectedPart;

    for (var j=0; j<keys.length; j++){
        if (newYear > keys[j])
            selectedPart = monarchObj[keys[j]]
    }
    
    return selectedPart;
    
    
}

function detailsToAll(e) {
    var provinceToCenter = e;

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            ultimateMarker.properties.wikiUrl=escape(provinceCollection.features[i].properties.wikiUrl);
            ultimateMarker.attachPopup()

            $('#chronasWiki').hide();
            $('#loader1').show();
            $('#chronasWiki').load(function(){
                $('#loader1').hide();
                $('#chronasWiki').show();
            });
            
            break;
        }
    }
};

function goToAll(e) {
    var provinceToCenter = e;

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToRuler(e) {
    var rulerAcr =e;
    var provinceToCenter = e;

    for (var key in countryPlus){
        if(countryPlus[key][0] == e)
            rulerAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][0] == rulerAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToCul(e) {
    var culAcr =e;
    var provinceToCenter = e;

    for (var key in culPlus){
        if(culPlus[key][0] == e)
            culAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][1] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goToRel(e) {
    var culAcr =e;
    var provinceToCenter = e;

    for (var key in relPlus){
        if(relPlus[key][0] == e)
            culAcr = key;
    }

    for (var key in activeYear){
        if(activeYear[key][2] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            break;
        }
    }
};

function goTomRel(e) {
    var culAcr =e;
    var isFin=false;
    var provinceToCenter = "notFound";
    var searchId = 0;
    
function selectRel(myFoundId){

    var foundCount=0;
    for (var key in relGen){
        if(relGen[key][0] == e){
            culAcr = key;
            foundCount++;
            if(foundCount == myFoundId){
                break;
            }
        }
    }

    for (var key in activeYear){
        if(activeYear[key][2] == culAcr)
            provinceToCenter = key;
    }

    for (var i = 0; i< provinceCollection.features.length; i++)
    {
        if (provinceCollection.features[i].properties.name === provinceToCenter){
            map.panTo(new L.LatLng(provinceCollection.features[i].geometry.coordinates[0][0][1],provinceCollection.features[i].geometry.coordinates[0][0][0]));
            isFin=true;
            break;
        }
    }
    
    
}

    while(searchId<10 && !isFin) {
        selectRel(searchId);
        searchId++;
    }
    
    
};



function detailsToRul(e) {

    for (var key in countryPlus){
        if(countryPlus[key][0] == e)
        {
            ultimateMarker.properties.wikiUrl=escape(countryPlus[key][2]);
            ultimateMarker.attachPopup()
            
            $('#chronasWiki').hide();
            $('#loader1').show();
            $('#chronasWiki').load(function(){
                $('#loader1').hide();$('#chronasWiki').show();
            });
            break;
        }
    }
};

function detailsToCul(e) {

    for (var key in culPlus){
        if(culPlus[key][0] == e)
        {            
            ultimateMarker.properties.wikiUrl=escape(culPlus[key][2]);
            ultimateMarker.attachPopup()

            $('#chronasWiki').hide();
            $('#loader1').show();
            $('#chronasWiki').load(function(){
                $('#loader1').hide();$('#chronasWiki').show();
            });
            break;
        }
    }

};

function detailsToRel(e) {

    for (var key in relPlus){
        if(relPlus[key][0] == e)
        {
            ultimateMarker.properties.wikiUrl=escape(relPlus[key][2]);
            ultimateMarker.attachPopup()

            $('#chronasWiki').hide();
            $('#loader1').show();
            $('#chronasWiki').load(function(){
                $('#loader1').hide();$('#chronasWiki').show();
            });
            break;
        }
    }
};

function detailsTomRel(e) {

        for (var key in relGen){
            if(relGen[key][0] == e)
            {
                ultimateMarker.properties.wikiUrl=escape(relGen[key][2]);
                ultimateMarker.attachPopup()

                $('#chronasWiki').hide();
                $('#loader1').show();
                $('#chronasWiki').load(function(){
                    $('#loader1').hide();$('#chronasWiki').show();
                });
                break;
            }
        }
};


function reloadHierarchy()
{
    console.log("*** reloading hierarchy");
    
    var tmpKey = "";
    sortAll = [];
    sunburstRel = [];
    sunburstRul = [];
    
    rulerPops = {}
    culPops = {}
    relPops = {}
    mainRelPops = {}

    rulerPops2 = {}
    culPops2 = {}
    relPops2 = {}
    mainRelPops2 = {}
    
    for (var key in activeYear) {
        tmpKey = activeYear[key];
        tmpPop = tmpKey[4];
        tmpArea =  provArea[key];
        
        total +=  tmpKey[4]
        total2 +=  provArea[key];

        if(culPlus[tmpKey[1]] !== undefined)
            sortAll.push([key, countryPlus[tmpKey[0]][0], culPlus[tmpKey[1]][0], relPlus[tmpKey[2]][0], relGen[tmpKey[2]][0], tmpKey[3], tmpArea, tmpPop, "<span class='centerClass' onclick='goToAll(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsToAll(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])
        else{
            tmpKey[1] = "sapmi";
            sortAll.push([key, countryPlus[tmpKey[0]][0], culPlus[tmpKey[1]][0], relPlus[tmpKey[2]][0], relGen[tmpKey[2]][0], tmpKey[3], tmpArea, tmpPop, "<span class='centerClass' onclick='goToAll(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsToAll(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])
            
        }
        
        sunburstRel.push([relGen[ tmpKey[2] ][0]+"-"+relPlus[tmpKey[2]][0]+"-"+countryPlus[tmpKey[0]][0]+"-"+culPlus[tmpKey[1]][0]+"-"+key,tmpPop]);
        
        sunburstRul.push([countryPlus[tmpKey[0]][0]+"-"+relGen[ tmpKey[2] ][0]+"-"+relPlus[tmpKey[2]][0]+"-"+tmpKey[1]+"-"+key,tmpPop]);
        if (isNaN(rulerPops[countryPlus[tmpKey[0]][0]])){
            rulerPops[countryPlus[tmpKey[0]][0]] = tmpPop;
        } else {
            rulerPops[countryPlus[tmpKey[0]][0]] += tmpPop;
        }
    
        if (isNaN(culPlus[tmpKey[1]][0])){
            culPops[culPlus[tmpKey[1]][0]] = tmpPop;
        } else {
            culPops[culPlus[tmpKey[1]][0]] += tmpPop;
        }
    
        if (isNaN(relPops[relPlus[tmpKey[2]][0]])){
            relPops[relPlus[tmpKey[2]][0]] = tmpPop;
        } else {
            relPops[relPlus[tmpKey[2]][0]] += tmpPop;
        }

        if (isNaN( mainRelPops[relGen[ tmpKey[2] ][0]] )){
            mainRelPops[relGen[ tmpKey[2] ][0]] = tmpPop;
        } else {
            mainRelPops[relGen[ tmpKey[2] ][0]] += tmpPop;
        }
        
        

        if (isNaN(rulerPops2[countryPlus[tmpKey[0]][0]])){
            rulerPops2[countryPlus[tmpKey[0]][0]] = tmpArea;
        } else {
            rulerPops2[countryPlus[tmpKey[0]][0]] += tmpArea;
        }

        if (isNaN(culPops2[culPlus[tmpKey[1]][0]])){
            culPops2[culPlus[tmpKey[1]][0]] = tmpArea;
        } else {
            culPops2[culPlus[tmpKey[1]][0]] +=tmpArea;
        }

        if (isNaN(relPops2[relPlus[tmpKey[2]][0]])){
            relPops2[relPlus[tmpKey[2]][0]] = tmpArea;
        } else {
            relPops2[relPlus[tmpKey[2]][0]] += tmpArea;
        }

        if (isNaN( mainRelPops2[relGen[ tmpKey[2] ][0]] )){
            mainRelPops2[relGen[ tmpKey[2] ][0]] = tmpArea;
        } else {
            mainRelPops2[relGen[ tmpKey[2] ][0]] += tmpArea;
        }
    }
    
    sortRuler = [];
    sortCul = [];
    sortRel = [];
    sortmRel = [];
    
    for (var key in rulerPops)
        sortRuler.push([key, rulerPops2[key], rulerPops[key], "<span class='centerClass' onclick='goToRuler(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsToRul(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])
    for (var key in culPops)
        sortCul.push([key, culPops2[key], culPops[key], "<span class='centerClass' onclick='goToCul(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsToCul(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])
    for (var key in relPops)
        sortRel.push([key, relPops2[key], relPops[key], "<span class='centerClass' onclick='goToRel(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsToRel(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])
    for (var key in mainRelPops)
        sortmRel.push([key, mainRelPops2[key], mainRelPops[key], "<span class='centerClass' onclick='goTomRel(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class='detailsClass' onclick='detailsTomRel(&#39;"+key+"&#39;)'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>"])

   // createVisualization(buildHierarchy(sunburstRul));
    
    /*
    sortRuler.sort(function(b, a) {return a[1] - b[1]})
    sortCul.sort(function(b, a) {return a[1] - b[1]})
    sortRel.sort(function(b, a) {return a[1] - b[1]})
    sortmRel.sort(function(b, a) {return a[1] - b[1]})
    */
}

function aud_play_pause() {
    var myAudio = document.getElementById("audio");
    if (myAudio.paused) {
        document.getElementById("audioButton").value = "PAUSE";
        myAudio.play();
    } else {
        document.getElementById("audioButton").value = "PLAY";
        myAudio.pause();
    }
}

var dl500, dl50, dl501, dl502, dl503, dl509;
//var provinceCollection;
var map;
var path;
var svgProv;
var g0;

var gProvinceAreas;
var gProvinceLabels;
var gActiveCouLabels;
var gActiveCulLabels;
var gActiveRelLabels;
var gActiveRelGenLabels;
var provinceLoaded = false;
var activeYear;
var activeLoaded;
var activeAreaFeature;
var activeFeatureCollection;
var gActiveLabels;
var activeAreaFeat = "country";
var activeTextFeat = "country";

var countryIsSetup = false;
var culIsSetup = false;
var relIsSetup = false;
var relGenIsSetup = false;


var undefinedColor = "rgb(191,191,191)"

var provinceTextLine, activeTextLine, provinceFeature0,
    activeFeature0, activeTextLineFeature, provinceTextLineFeature, activeTextFeature0, activeTextFeature1, activeTextFeature2;

var transform2;


/*map = new L.Map("map", {center: [37.8, 0.9], zoom: 3})
    .addLayer(new L.TileLayer("http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"));
*/

/*
 map.on("moveend", function () {

 var pixelSize = map.getSize();
 var pixelBounds = map.getPixelBounds();
 var pixelOrigin = map.getPixelOrigin();
 svgProv
 .attr("width", pixelSize.x * 3)
 .attr("height", pixelSize.y * 3)
 .attr("viewBox", [0, 0, pixelSize.x * 3, pixelSize.y * 3].join(" "))

 });
 */

function CustomTooltip(tooltipId, width){
    
    var tooltipId = tooltipId;
    
    if(tooltipId == "gates_tooltip")
        $("#hierBubbs").append("<div class='tooltip' id='"+tooltipId+"'></div>");
    else {
        $("#hierStatic").append("<div class='tooltip' id='"+tooltipId+"'></div>");        
    }

    if(width){
        $("#"+tooltipId).css("width", width);
    }

    hideTooltip();

    function showTooltip(content, event){
        $("#"+tooltipId).html(content);
        $("#"+tooltipId).show();

        updatePosition(event);
    }

    function hideTooltip(){
        $("#"+tooltipId).hide();
    }

    function updatePosition(event){
        var ttid = "#"+tooltipId;
        var xOffset = 0;
        var yOffset = -220;

        var ttw = $(ttid).width();
        var tth = $(ttid).height();
        var wscrY = $(window).scrollTop();
        var wscrX = $(window).scrollLeft();
        var curX = (document.all) ? event.clientX + wscrX : event.pageX;
        var curY = (document.all) ? event.clientY + wscrY : event.pageY;
        var ttleft = ((curX - wscrX + xOffset*2 + ttw) > $(window).width()) ? curX - ttw - xOffset*2 : curX + xOffset;
        if (ttleft < wscrX + xOffset){
            ttleft = wscrX + xOffset;
        }
        var tttop = ((curY - wscrY + yOffset*2 + tth) > $(window).height()) ? curY - tth - yOffset*2 : curY + yOffset;
        if (tttop < wscrY + yOffset){
            tttop = curY + yOffset;
        }
        $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
    }

    return {
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        updatePosition: updatePosition
    }
}

function addCommas(nStr)
{
    return nStr.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    /*
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
    */
  //  return nStr;
}


function changeYear(newYear,myActiveYear) {
    a_hierLoaded=false;
    a_bubLoaded=false;
    $("#yearSB").html(newYear)
    activeYear = jQuery.extend({}, myActiveYear);
    myLightGallery.destroy();
    $('#lightGallery').empty();
    if ($("#lightGallery").css("display") !== "none"){
        updateGeoGallery(newYear-parseInt($("#deviationYears").val()),newYear+parseInt($("#deviationYears").val()),"people");
    }
    
    if ($(".storage-browse-actions").css("display") === "block"){
        a_hierLoaded=true;
        reloadHierarchy();
        aggTable.fnClearTable();
        fulTable.fnClearTable();
        fulTable.fnAddData( sortAll );
        
        switch (activeListFeature){
            case ("rel"):
                aggTable.fnAddData( sortRel );
                break;
            case ("mrel"):
                aggTable.fnAddData( sortmRel );
                break;
            case ("cul"):
                aggTable.fnAddData( sortCul );
                break;
            case ("rul"):
                aggTable.fnAddData( sortRuler );
                break;
        }

        switchSBData(currSB);
        
        if ($("#hierBubbs").css("display") === "block"){
            reloadData();
            a_bubLoaded = true;
        }
        
    }
    /*
    switch (newYear) {
        case 50:
            activeYear = jQuery.extend({}, dl50);
            break;
        case 500:
            activeYear = jQuery.extend({}, dl500);
            break;
        case 501:
            activeYear = jQuery.extend({}, dl501);
            break;
        case 502:
            activeYear = jQuery.extend({}, dl502);
            break;
        case 503:
            activeYear = jQuery.extend({}, dl503);
            break;
        case 509:
            activeYear = jQuery.extend({}, dl509);
            break;
        default:
            activeYear = jQuery.extend({}, dl500);
    }
*/
    countryIsSetup = false;
    culIsSetup = false;
    relIsSetup = false;
    relGenIsSetup = false;

    setupCollections(activeTextFeat);

    addTextFeat(activeTextFeat);

    addAreaFeat(activeAreaFeat);

}
function getExtrema(listOfPoints) {
    var minX = [listOfPoints[0][0], listOfPoints[0][1]];
    var minY = [listOfPoints[0][0], listOfPoints[0][1]];
    var maxX = [listOfPoints[0][0], listOfPoints[0][1]];
    var maxY = [listOfPoints[0][0], listOfPoints[0][1]];

    for (var i = 1; i < listOfPoints.length; i++) {
        if (minX[0] > listOfPoints[i][0]) minX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxX[0] < listOfPoints[i][0]) maxX = [listOfPoints[i][0], listOfPoints[i][1]];
        if (minY[1] > listOfPoints[i][1]) minY = [listOfPoints[i][0], listOfPoints[i][1]];
        if (maxY[1] < listOfPoints[i][1]) maxY = [listOfPoints[i][0], listOfPoints[i][1]];
    }

    return ([minX, minY, maxX, maxY]);
}

function getExtrema2(listOfPoints) {

    var minX = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var minY = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var maxX = [listOfPoints[0][0][0], listOfPoints[0][0][1]];
    var maxY = [listOfPoints[0][0][0], listOfPoints[0][0][1]];

    for (var j = 0; j < listOfPoints.length; j++) {
        for (var i = 0; i < listOfPoints[j].length; i++) {
            if (minX[0] > listOfPoints[j][i][0]) minX = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (maxX[0] < listOfPoints[j][i][0]) maxX = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (minY[1] > listOfPoints[j][i][1]) minY = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
            if (maxY[1] < listOfPoints[j][i][1]) maxY = [listOfPoints[j][i][0], listOfPoints[j][i][1]];
        }
    }
    
    return ([minX, minY, maxX, maxY]);
}

function get_polygon_centroid(pts) {

    var twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;

    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1[0] * p2[1] - p2[0] * p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x / f, y / f ];
}

function get_polygon_centroid2(fullpts) {
/*
    console.debug(pts)
    pts=pts[0]
 console.debug(pts)

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
    
    */
    var pts = [];
    for (var j = 0; j < fullpts.length; j++) {
        for (var k = 0; k < fullpts[j].length; k++) {
            pts.push(fullpts[j][k])
        }
    }

    var twicearea = 0,
        x = 0, y = 0,
        nPts = pts.length,
        p1, p2, f;

    for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
        p1 = pts[i];
        p2 = pts[j];
        f = p1[0] * p2[1] - p2[0] * p1[1];
        twicearea += f;
        x += ( p1[0] + p2[0] ) * f;
        y += ( p1[1] + p2[1] ) * f;
    }
    f = twicearea * 3;
    return [ x / f, y / f ];
    
}


function getCoordsForMultiPolyLine(myCoords) {

    var extremas = getExtrema2(myCoords);
    var point = get_polygon_centroid2(myCoords);

    // max x - min x > max y - min y
    if (extremas[2][0] - extremas[0][0] > extremas[3][1] - extremas[1][1] ) {

        currLabelSize = Math.sqrt((  (extremas[0][1] - point[1]) * (extremas[0][1] - point[1])
            + (extremas[0][0] - point[0]) * (extremas[0][0] - point[0]) ))
            +
            Math.sqrt((extremas[2][1] - point[1]) * (extremas[2][1] - point[1])
                + (extremas[2][0] - point[0]) * (extremas[2][0] - point[0]));

        //    minX to  maxX
        return [
            [extremas[0][0], extremas[0][1]],
            [point[0], point[1]],
            [extremas[2][0], extremas[2][1]]
        ];  //angle != 0
    }
    //    minX, minY, maxX, maxY
    else {

        currLabelSize = Math.sqrt((  (extremas[0][1] - point[1]) * (extremas[0][1] - point[1])
            + (extremas[0][0] - point[0]) * (extremas[0][0] - point[0]) ))
            +
            Math.sqrt((extremas[2][1] - point[1]) * (extremas[2][1] - point[1])
                + (extremas[2][0] - point[0]) * (extremas[2][0] - point[0]));

        if (extremas[1][0] - extremas[3][0] < 1){
            return [
                [extremas[1][0], extremas[1][1]],
                [point[0], point[1]],
                [extremas[3][0], extremas[3][1]]
            ];
        } else{
            return [
                [extremas[3][0], extremas[3][1]],
                [point[0], point[1]],
                [extremas[1][0], extremas[1][1]]
            ];
        }
    }
}

function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(
        new L.LatLng(y, x)
    );
    this.stream.point(point.x, point.y);

}

function contains(oldBody, newBody) {
    for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
        for (var i2 = 0, tot2 = oldBody[i1].length; i2 < tot2; i2++) {
            for (var i3 = 0, tot3 = newBody.length; i3 < tot3; i3++) {
//  console.debug("!!comparing!",pNew[0],"with" , pOld[0])
                if (newBody[i3][0] == oldBody[i1][i2][0] && newBody[i3][1] == oldBody[i1][i2][1]) {
                    return true;
                }

            }
        }

    }

    return false;

}
function contains2(oldBody, newBody0) {


    for (var i0 = 0, tot0 = newBody0.length; i0 < tot0; i0++) {

        for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
            for (var i2 = 0, tot2 = oldBody[i1].length; i2 < tot2; i2++) {
//   console.debug("new 1 ",newBody0[i0].length);
                for (var i3 = 0, tot3 = newBody0[i0].length; i3 < tot3; i3++) {
//  console.debug("!!comparing!",pNew[0],"with" , pOld[0])
                    if (newBody0[i0][i3][0] == oldBody[i1][i2][0] && newBody0[i0][i3][1] == oldBody[i1][i2][1]) {
//      console.debug("!!FOUND")
                        return true;
                    }
                }
            }
        }

    }
    return false;
}

function contains3(oldBody, newBody) {
    for (var i1 = 0, tot1 = oldBody.length; i1 < tot1; i1++) {
        for (var i3 = 0, tot3 = newBody.length; i3 < tot3; i3++) {
            if (newBody[i3][0] == oldBody[i1][0] && newBody[i3][1] == oldBody[i1][1]) {
                return true;
            }

        }

    }

    return false;

}

function prepareCollection(targetC, attr, coo) {
    if (attr !== "na" && attr != undefined) {

        if (targetC.hasOwnProperty(attr) && coo) {
            if (targetC[attr][0].length == 0 || attr == "undefined" || contains(targetC[attr][0], coo)) {
                targetC[attr][0].push(coo);
            }

            else {
                var it = 1;

                while ((targetC[attr][it] !== undefined) && (!contains(targetC[attr][it], coo))) {
                    it++
                }

                if (targetC[attr][it] === undefined) targetC[attr][it] = [];

                targetC[attr][it].push(coo)
            }
        }
        else {
            targetC[attr] = [
                [coo]
            ];
        }

    }
}

function isTouching(array1, array2) {

    for (var i = 0; i < array1.length; i++) {
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j]) {
                //            console.debug(array1,array2, "yes!");
                return true;
            }
        }
    }
    return false;
};

function prepareCollectionIDs(targetC, attr, provId) {

    //   console.debug("targetC",targetC);

    if (attr !== "na" && attr != undefined) {

        if (targetC.hasOwnProperty(attr)) {
            if (targetC[attr][0].length == 0 || isTouching(targetC[attr][0], adjacent[provId])) {
                targetC[attr][0].push(provId);
            }

            else {
                var it = 1;

                while ((targetC[attr][it] !== undefined) && (!isTouching(targetC[attr][it], adjacent[provId]))) {
                    it++
                }

                if (targetC[attr][it] === undefined) targetC[attr][it] = [];

                targetC[attr][it].push(provId)
            }
        }
        else {
            targetC[attr] = [
                [provId]
            ];
        }

    }
}
function fillCollection(myColl, area, addTo, postfix) {
    // console.debug("filling",myColl,area,addTo,postfix)

    for (var i = 0; i < area.features.length; i++) {  //tmpLength
        myColl.features.push({
            "type": "Feature",
            "geometry": {
                "type": "LineString",

                "coordinates": getCoordsForMultiPolyLine(area.features[i].geometry.coordinates)

            },
            "properties": {
                "name": area.features[i].properties.name
            }
        });
    }
// gActiveLabels.selectAll("*").remove()  // just hide, dont delete
    activeFeature0 = addTo.selectAll("path")


        .data(myColl.features)
        .enter();


    activeTextLineFeature = activeFeature0.append("path")
        .attr("id", function (d, i) {
            return postfix + i;
        }
    )
        .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


    activeTextFeature0 = activeFeature0
        .append("text").attr("position", "absolute").attr("pointer-events", "none")


    activeTextFeature1 = activeTextFeature0
        .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        });

    activeTextFeature2 = activeTextFeature0
        .append("textPath").attr("class", "labels").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        })

}

function fillCollectionId(myId, addTo, postfix) {
    //  console.debug("filling",myId,addTo,postfix)
    var tmpName = "";
    var groups = {};
    var myColl = {"type": "FeatureCollection",
        "features": []
    };
    for (var key in myId) {

        if (postfix != "co" && postfix != "r") {
            tmpName = key
        }
        else if (postfix == "co") {
            tmpName = "";
            if (countryPlus[key]) tmpName = countryPlus[key][0];
        }
        else if (postfix == "r") {
            tmpName = "";
            if (relPlus[key]) tmpName = relPlus[key][0];
        }


        for (var i1 = 1; i1 < myId[key].length; i1++) {
            loop1:
                for (var i2 = 0; i2 < myId[key].length; i2++) {
                    for (var i3 = 0; i3 < myId[key][i1].length; i3++) {
                        if (i1 != i2 && isTouching(adjacent[myId[key][i1][i3]], myId[key][i2])) {
                            Array.prototype.push.apply(myId[key][i2], myId[key][i1]);
                            myId[key].splice(i1, 1);
                            i1--;
                            break loop1;
                        }
                    }
                }
        }

        for (var i1 = 0, tot1 = myId[key].length; i1 < tot1; i1++) {
            for (var i2 = 0, tot2 = myId[key][i1].length; i2 < tot2; i2++) {
                if (groups.hasOwnProperty(key)) {
                    if (groups[key][i1] === undefined) groups[key][i1] = [];
                    groups[key][i1].push(provinceCollection.features[myId[key][i1][i2]].geometry.coordinates[0]);
                }
                else {
                    groups[key] = [
                        [provinceCollection.features[myId[key][i1][i2]].geometry.coordinates[0]]
                    ];
                }


            }

        }

        for (var i = 0; i < groups[key].length; i++) {  //tmpLength
            myColl.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",
                    "coordinates": getCoordsForMultiPolyLine(groups[key][i])
                },
                "properties": {
                    "name": tmpName
                }
            });
        }
    }

    activeFeature0 = addTo.selectAll("path")
        .data(myColl.features)
        .enter();


    activeTextLineFeature = activeFeature0.append("path")
        .attr("id", function (d, i) {
            return postfix + i;
        }
    )
        .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


    activeTextFeature0 = activeFeature0
        .append("text").attr("position", "absolute").attr("pointer-events", "none")


    activeTextFeature1 = activeTextFeature0
        .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        });

    activeTextFeature2 = activeTextFeature0
        .append("textPath").attr("class", "labels").attr("startOffset", "50%")
        .attr({"xlink:href": function (d, i) {
            return "#" + postfix + i
        }})
        .html(function (d, i) {
            return d.properties.name.toUpperCase()
        })

}
function setupCollections(myActiveTextFeat) {

    g0.selectAll("text").remove()
    g0.selectAll("path").remove()


    //  provinceLoaded = false;                ->      activeFeat
    activeLoaded = false;


    var countryIdCollection = {};
    var relIdCollection = {};

    var relGenIdCollection = {};
    var culIdCollection = {};

    var tmpProv, tmpCountry, tmpRel, tmpCul, tmpPop, tmpCap, tmpCoo;


    for (var i = 0; i < provinceCollection.features.length; i++) {

        tmpCoo = undefined;
        tmpCountry = undefined;
        tmpRel = undefined;
        tmpCul = undefined;
        tmpPop = undefined;
        tmpCap = undefined;

        tmpProv = provinceCollection.features[i].properties.name;
        tmpCoo = provinceCollection.features[i].geometry.coordinates[0];


        if (activeYear.hasOwnProperty(tmpProv)) {
            try{
            tmpCountry = activeYear[tmpProv][0];
            tmpCul = activeYear[tmpProv][1];
            tmpRel = activeYear[tmpProv][2];
            tmpCap = activeYear[tmpProv][3];
            tmpPop = activeYear[tmpProv][4];
            }
            catch(e){
                console.error("tmpProv",tmpProv,"not found in activeYear") 
            }
            provinceCollection.features[i].properties.Cul = tmpCul;
            provinceCollection.features[i].properties.Rel = tmpRel;
            provinceCollection.features[i].properties.Pop = tmpPop;
            provinceCollection.features[i].properties.Cap = tmpCap;

            if (countryPlus[tmpCountry]) {
                provinceCollection.features[i].properties.nameCountry = countryPlus[tmpCountry][0];
            }

        }

        switch (activeTextFeat) {
            case "country":
                countriesArea = {"type": "FeatureCollection",
                    "features": []
                };
                prepareCollectionIDs(countryIdCollection, tmpCountry, i);
                countryIsSetup = true;
                break;
            case "culture":
                culArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(culIdCollection, tmpCul, i);
                culIsSetup = true;
                break;
            case "religion":
                relArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(relIdCollection, tmpRel, i);
                relIsSetup = true;
                break;
            case "religionGeneral":
                relGenArea = {"type": "FeatureCollection",
                    "features": []
                }
                prepareCollectionIDs(relGenIdCollection, relGen[tmpRel][0], i);
                relGenIsSetup = true;
                break;
        }


    }


    activeTextLine = {"type": "FeatureCollection",
        "features": []
    }

    switch (activeTextFeat) {
        case "country":
            fillCollectionId(countryIdCollection, gActiveCouLabels, "co");
            break;
        case "culture":
            fillCollectionId(culIdCollection, gActiveCulLabels, "cu");
            break;
        case "religion":
            fillCollectionId(relIdCollection, gActiveRelLabels, "r");
            break;
        case "religionGeneral":
            fillCollectionId(relGenIdCollection, gActiveRelGenLabels, "rg");
            break;
    }


    if (!provinceLoaded) {
        provinceLoaded = true;

        provinceTextLine = {
            "type": "FeatureCollection",
            "features": []
        }


        for (var i = 0; i < provinceCollection.features.length; i++) {

            provinceTextLine.features.push({
                "type": "Feature",
                "geometry": {
                    "type": "LineString",

                    "coordinates": getCoordsForMultiPolyLine(provinceCollection.features[i].geometry.coordinates)
                    // "coordinates": getCoordsForPolyLine(collection.features[i].geometry.coordinates[0])
                },
                "properties": {
                    "name": provinceCollection.features[i].properties.name
                }
            });
        }


        provinceFeature0 = gProvinceLabels.selectAll("path")
            .data(provinceTextLine.features)
            .enter();

        provinceTextLineFeature = provinceFeature0.append("path")
            .attr("id", function (d, i) {
                return "p" + i;
            }
        )
            .attr("d", path).style("opacity", 0).attr("pointer-events", "none");


        provinceTextFeature0 = provinceFeature0

            .append("text").attr("position", "absolute").attr("pointer-events", "none")


        provinceTextFeature1 = provinceTextFeature0
            .append("textPath").attr("class", "shadow").attr("startOffset", "50%")
            .attr({"xlink:href": function (d, i) {
                return "#p" + i
            }}) //d.properties.name
            .html(function (d, i) {
                return d.properties.name.toUpperCase()
            });

        provinceTextFeature2 = provinceTextFeature0
            .append("textPath").attr("class", "labels").attr("startOffset", "50%")
            .attr({"xlink:href": function (d, i) {
                return "#p" + i
            }}) //d.properties.name
            .html(function (d, i) {
                return d.properties.name.toUpperCase()
            })

        function onDrag() {
            wasDragged = true;
        }

        function onDragEnd() {
            wasDragged = false;
        }

        dragBehavior = d3.behavior.drag()
            .on('drag', onDrag)
            .on('dragend', onDragEnd);

        var dragBehavior,
            wasDragged = false;



        activeAreaFeature = gProvinceAreas.selectAll("path")
            .data(provinceCollection.features)
            .enter().append("path")
            .attr("d", path)
            .style("fill", function (d) {
                return d.properties.Acolor; //._storage_options
            })
            .call(dragBehavior)
            .on('click', function (d, i) {
                if (!d3.event.defaultPrevented){
              //  if (d3.event.defaultPrevented) return; // click suppressed

                var rulerWiki = "";
                
                var i = 0;

                for (var key in countryPlus) {
                    if (countryPlus[key][0] == d.properties.nameCountry) {
                        rulerWiki = countryPlus[key][2];

                        if (countryPlus[key][3] !== undefined) {
                            map.get("/en/app/datalayer/26"+countryPlus[key][3]+"/", {
                                callback: function (geojson) {
                                    
                                    var relKing = getRelevantKing(geojson);
                                    if(relKing !== undefined){
                                        $("#content_mon")[0].value =  relKing[0];
                                        $("#content_monA")[0].onclick = function() {
                                            if($("#reportBetaText").is(":visible") ){
                                                $("#reportBetaText").hide()
                                            }
                                            if($(".halfWidth").length==0)
                                                var tmpURL = "http://en.wikipedia.org/wiki/"+escape(relKing[2])+"?printable=yes";
                                            else
                                                var tmpURL = "http://en.wikipedia.org/wiki/"+escape(relKing[2]);

                                            $("#chronasWiki")[0].src = tmpURL;
                                            $('#chronasWiki').hide();
                                            $('#loader1').show();

                                            $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){   $('#loader1').hide();$('#chronasWiki').show(); $('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show();  $('#loader1').hide();alert('loaded!'); }
                                            });
                                        }
                                        
                                    }
                                        


                                } }
                            );
                        }
                        
                    }
                    
                    i++;
                }

                ultimateMarker.properties.name = "ulti"


                var tmpTitle = "";
                if (map.getZoom()<7){
                    switch (getAreaChecked()){
                        case "A-Country":
                            ultimateMarker.properties.wikiUrl = rulerWiki
                            tmpTitle = "Region: "+ d.properties.nameCountry;
                            currSearchKey = d.properties.nameCountry;
                            break;
                        case "A-Culture":
                            ultimateMarker.properties.wikiUrl =  culPlus[d.properties.Cul][2]
                            tmpTitle = "Culture: "+ d.properties.Cul;
                            currSearchKey =  d.properties.Cul;
                            break;
                        case "A-Religion":
                            ultimateMarker.properties.wikiUrl = relPlus[d.properties.Rel][2]
                            tmpTitle = "Religion: "+ relPlus[d.properties.Rel][0];
                            currSearchKey = relPlus[d.properties.Rel][0];
                            break;
                        case "A-MainRel":
                            ultimateMarker.properties.wikiUrl =  relGen[d.properties.Rel][2]
                            tmpTitle = "Main Religions: "+ relGen[d.properties.Rel][0];
                            currSearchKey = relGen[d.properties.Rel][0];
                            break;
                        case "A-Population":
                            ultimateMarker.properties.wikiUrl =  capitalURL[d.properties.Cap]
                            tmpTitle = "Capital: "+ d.properties.Cap;
                            currSearchKey = d.properties.Cap;
                            break;
                    }
                }
                else{
                    ultimateMarker.properties.wikiUrl  = d.properties.wikiUrl;                    
                }
                
                if (ultimateMarker.properties.wikiUrl !== ""){

                                        ultimateMarker.properties.wikiUrl = ultimateMarker.properties.wikiUrl.replace(/ /g,"_")

                ultimateMarker.attachPopup()

                    $('#chronasWiki').hide();
                    $('#loader1').show();
                    $('#chronasWiki').load(function(){
                        $('#loader1').hide();$('#chronasWiki').show();
                    });

                    $(".overviewContainer").css("display","block")
// 
                if (culPlus[d.properties.Cul])
                    var tmpculture=  escape(culPlus[d.properties.Cul][2])
                else
                    var tmpculture= ""
                if (relPlus[d.properties.Rel])
                    var tmpreligion= escape(relPlus[d.properties.Rel][2])
                else
                    var tmpreligion= ""
                var tmpruler=    escape(rulerWiki);
                if (relGen[d.properties.Rel])
                    var tmpmainRel=  escape(relGen[d.properties.Rel][2])
                else
                    var tmpmainRel=""
                var tmpcapital=  escape(capitalURL[d.properties.Cap]);
                var tmpregion=   escape(provURL[d.properties.name]);
                /*
                if ($("#storage-ui-container")[0].style.width != "100%"){
                    tmpculture = tmpculture + "?printable=yes";
                    tmpreligion = tmpreligion + "?printable=yes";
                    tmpruler = tmpruler + "?printable=yes";
                    tmpmainRel = tmpmainRel + "?printable=yes";
                    tmpcapital = tmpcapital + "?printable=yes";
                    tmpregion = tmpregion + "?printable=yes";
                }
                    */
                    
                $("#cultureSpec")[0].innerHTML =  d.properties.Cul;
                $("#religionSpec")[0].innerHTML = relPlus[d.properties.Rel][0];
                $("#rulerSpec")[0].innerHTML = (d.properties.nameCountry === undefined) ? "[unsettled]" : d.properties.nameCountry;
                $("#mainRelSpec")[0].innerHTML = relGen[d.properties.Rel][0];
                $("#capitalSpec")[0].innerHTML = d.properties.Cap;
                $("#regionSpec")[0].innerHTML = d.properties.name;
                $("#populationSpec")[0].innerHTML = d.properties.Pop;

                
                $("#content_cul")[0].value =  $("#cultureSpec")[0].innerHTML
                $("#content_cul")[0].title =  $("#cultureSpec")[0].innerHTML
                $("#content_culA")[0].onclick = function() {

                    if($("#reportBetaText").is(":visible") ){
                        $("#reportBetaText").hide()
                    }
                    
                    if($(".halfWidth").length==0)
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(culPlus[d.properties.Cul][2])+"?printable=yes"
                    else
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(culPlus[d.properties.Cul][2]);

                    $("#chronasWiki")[0].src = tmpURL;
                    $('#loader1').show();
                    $('#chronasWiki').hide();
                    $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){   $('#loader1').hide(); $('#chronasWiki').show();$('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show();  $('#loader1').hide();alert('loaded!'); }
                    });
                }
                
                $("#content_rel")[0].value = $("#religionSpec")[0].innerHTML
                $("#content_rel")[0].title = $("#religionSpec")[0].innerHTML
                $("#content_relA")[0].onclick = function() {


                    if($("#reportBetaText").is(":visible") ){
                        $("#reportBetaText").hide()
                    }
                    
                    if($(".halfWidth").length==0)
                        var tmpURL =  "http://en.wikipedia.org/wiki/"+escape(relPlus[d.properties.Rel][2])+"?printable=yes";
                    else
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(relPlus[d.properties.Rel][2]);
                    $("#chronasWiki")[0].src = tmpURL;
                    $('#loader1').show();
                    $('#chronasWiki').hide();
                    $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){ $('#loader1').hide();$('#chronasWiki').show();$('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show(); $('#loader1').hide(); alert('loaded!'); }
                    });
                }
                
                $("#content_rul")[0].value =  $("#rulerSpec")[0].innerHTML
                $("#content_rul")[0].title =  $("#rulerSpec")[0].innerHTML
                $("#content_rulA")[0].onclick = function() {


                    if($("#reportBetaText").is(":visible") ){
                        $("#reportBetaText").hide()
                    }
                    
                    if($(".halfWidth").length==0)
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(rulerWiki)+"?printable=yes";
                    else
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(rulerWiki);
                    $("#chronasWiki")[0].src = tmpURL;
                    $('#loader1').show();
                    $('#chronasWiki').hide();
                    $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){ $('#loader1').hide();$('#chronasWiki').show(); $('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show();  $('#loader1').hide();alert('loaded!'); }
                    });
                }
                
                $("#content_cap")[0].value =  $("#capitalSpec")[0].innerHTML
                $("#content_cap")[0].title =  $("#capitalSpec")[0].innerHTML
                $("#content_capA")[0].onclick = function() {


                    if($("#reportBetaText").is(":visible") ){
                        $("#reportBetaText").hide()
                    }
                    
                    if($(".halfWidth").length==0)
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(capitalURL[d.properties.Cap])+"?printable=yes";
                    else
                        var tmpURL = "http://en.wikipedia.org/wiki/"+escape(capitalURL[d.properties.Cap]);
                    $("#chronasWiki")[0].src = tmpURL;
                    $('#loader1').show();
                    $('#chronasWiki').hide();
                    $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){ $('#loader1').hide(); $('#chronasWiki').show(); $('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show();  $('#loader1').hide(); alert('loaded!'); }
                    });
                }
                //       $("#regionSpec")[0].value = d.properties.name;
                $("#content_Size")[0].value = $("#populationSpec")[0].innerHTML
                $("#content_Size")[0].title = $("#populationSpec")[0].innerHTML
/*
                map.get("/en/datalayer/26"+5+"/", {
                    callback: function (geojson, response) { console.debug(geojson) } });
    */            
                var js = "';alert('loaded!2'); $('#notFoundNotice').hide(); $('#chronasWiki').hide(); $('#overview')[0].style.display = 'none'; $('#loader1')[0].style.display = 'block';  $('#specific')[0].style.display = 'block';  var tmpURL='http://en.wikipedia.org/wiki/"
                var jsRight = "'; alert('loaded!'); $('.GoToWikipedia')[0].href=tmpURL;  if($('#storage-ui-container')[0].style.width != '100%'){tmpURL=tmpURL+'?printable=yes'} ; $('iframe')[0].src=tmpURL; $('#chronasWiki').load(function(){ if(tmpURL != 'http://en.wikipedia.org/wiki/' && tmpURL != 'http://en.wikipedia.org/wiki/?printable=yes'){  $('#loader1').hide();$('#chronasWiki').show(); $('#notFoundNotice').hide() } else { $('#missingEntry')[0].innerHTML = tmpTitle;  $('#chronasWiki').hide(); $('#notFoundNotice').show();  $('#loader1').hide();alert('loaded!'); }    }); $('.overview')[0].innerHTML = 'Overview';     ";
                
                $("#cultureSpec").click(new Function("tmpTitle = 'culture: "+$("#cultureSpec")[0].innerHTML+js+tmpculture+jsRight))
                $("#religionSpec").click(new Function("tmpTitle = 'religion: "+$("#religionSpec")[0].innerHTML+js+tmpreligion+jsRight))
                $("#rulerSpec").click(new Function("tmpTitle = 'ruler: "+$("#rulerSpec")[0].innerHTML+js+tmpruler+jsRight))
                $("#mainRelSpec").click(new Function("tmpTitle = 'main religion: "+$("#mainRelSpec")[0].innerHTML+js+tmpmainRel+jsRight))
                $("#capitalSpec").click(new Function("tmpTitle = 'capital: "+$("#capitalSpec")[0].innerHTML+js+tmpcapital+jsRight))
                $("#regionSpec").click(new Function("tmpTitle = 'region: "+$("#regionSpec")[0].innerHTML+js+tmpregion+jsRight))

                if($("iframe")[0].src != 'http://en.wikipedia.org/wiki/' && $("iframe")[0].src != 'http://en.wikipedia.org/wiki/?printable=yes'){   $('#notFoundNotice').hide(); /*$('#loader1').hide(); $('#chronasWiki').show();*/  }
                else { 
                    
                    $('#chronasWiki').hide();
                    $('#missingEntry')[0].innerHTML = tmpTitle;
                    $('#notFoundNotice').show()
                    $('#loader1').hide()
                }
                
                
                //            $('#chronasWiki').hide(); $('#overview')[0].style.display = 'none'; $('#loader1')[0].style.display = 'block';  $('#specific')[0].style.display = 'block';  var tmpURL=''; tmpURL='http://en.wikipedia.org/wiki/Dacians'; if($('#storage-ui-container')[0].style.width != '100%'){tmpURL=tmpURL+'?printable=yes'}  $('iframe')[0].src=+"'"+tmpURL+"'"; $('#chronasWiki').load(function(){ $('#chronasWiki').show(); });

                
                /*
                                alert(d.properties.name +
                                    " \n(http://en.wikipedia.org/wiki/" + provURL[d.properties.name] +
                                    "\n\nRuled by " +
                                    ( (d.properties.nameCountry === undefined) ? "[unsettled]" : d.properties.nameCountry) +
                                    " \n(http://en.wikipedia.org/wiki/" + rulerWiki +
                
                                    "\nCapital:" + d.properties.Cap +
                                    " \n(http://en.wikipedia.org/wiki/" + capitalURL[d.properties.Cap] +
                                    "\nCulture: " + d.properties.Cul +
                                    " \n(http://en.wikipedia.org/wiki/" + culPlus[d.properties.Cul][2] +
                                    "\nReligion: " + relPlus[d.properties.Rel][0] +
                                    " \n(http://en.wikipedia.org/wiki/" + relPlus[d.properties.Rel][2] +
                                    ")\n part of: " + relGen[d.properties.Rel][0] +
                                    "\n(http://en.wikipedia.org/wiki/" + relGen[d.properties.Rel][2] +
                                    ")\n Population: " + d.properties.Pop)
                */
                }
                }
            });
            

    }

}

function hideAndAdd(idNotTo,selectedFeat){
    var deselect=true;
    var activeCount=0;
 
    var textToIterate = ["T-Country","T-Culture","T-Religion","T-MainRel"];
    var areaToIterate = ["A-Country","A-Culture","A-Religion","A-MainRel","A-Population"];
    
    
    if(idNotTo.substr(0,1) == "T"){
        for (var i=0; i<textToIterate.length;i++){
            if($("#"+textToIterate[i]).prop('checked') === true){
                activeCount++;
                if(textToIterate[i] !== idNotTo) {
                    //only cosmetics
                    $("#"+textToIterate[i]).parent().removeClass("btn-info");
                    $("#"+textToIterate[i]).parent().addClass("btn-default off");
                    $("#"+textToIterate[i]).prop('checked',false);
                    deselect = false;
                }
            }
        }
        if(!deselect || activeCount == 0){
            addTextFeat(selectedFeat);
        }
        else{
            addTextFeat('none');
        }
        
    }
    else
    {
        if($("#lockIcon").hasClass("fa-unlock-alt")){
            if(idNotTo === "A-Population"){
                hideAndAdd("T-Population","none")
            }
            else{
                $("#"+idNotTo.replace("A-","T-")).parent().click();
            }
            
        }
        for (var i=0; i<areaToIterate.length;i++){
            if($("#"+areaToIterate[i]).prop('checked') === true){
                activeCount++;
                if(areaToIterate[i] !== idNotTo) {
                    $("#"+areaToIterate[i]).parent().removeClass("btn-info");
                    $("#"+areaToIterate[i]).parent().addClass("btn-default off");
                    $("#"+areaToIterate[i]).prop('checked',false);
                    deselect = false;
                }
            }
        }
        if(!deselect || activeCount == 0){
            addAreaFeat(selectedFeat);
        }
        else{
            addAreaFeat('none');
        }
        
    }
}

function addAreaFeat(setActiveFeat) {
    activeAreaFeat = setActiveFeat;
    if (setActiveFeat === 'none'){
        $("#provinceAreas").css("visibility", "hidden")
    }
    else {
        $("#provinceAreas").css("visibility", "visible")

        switch (activeAreaFeat) {
            case "country":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    tmpCountry = "undefined";
                    tmpProv = provinceCollection.features[i].properties.name;
    
                    if (activeYear.hasOwnProperty(tmpProv)) {
                        tmpCountry = activeYear[tmpProv][0];
                    }
    
    
                    if (tmpCountry != "undefined")
                        provinceCollection.features[i].properties.Acolor = countryPlus[tmpCountry][1];
                    else {
                        provinceCollection.features[i].properties.Acolor = undefinedColor;
                    }
    
                }
    
    //        activeFeatureCollection = jQuery.extend({}, countriesArea);
                break;
            case "culture":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    provinceCollection.features[i].properties.Acolor = (culPlus[provinceCollection.features[i].properties.Cul] !== undefined) ? culPlus[provinceCollection.features[i].properties.Cul][1] : undefinedColor;
                }
    //        activeFeatureCollection = jQuery.extend({}, culArea);
                break;
            case "religion":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
    
                    provinceCollection.features[i].properties.Acolor = (relPlus[provinceCollection.features[i].properties.Rel] !== undefined) ? relPlus[provinceCollection.features[i].properties.Rel][1] : undefinedColor;
                }
                break;
    
    
            case "religionGeneral":
    
                for (var i = 0; i < provinceCollection.features.length; i++) {
    
                    provinceCollection.features[i].properties.Acolor =
                        (relGen[provinceCollection.features[i].properties.Rel] !== undefined)
                            ? relGen[provinceCollection.features[i].properties.Rel][1]
                            : undefinedColor;
                }
    
    //         activeFeatureCollection = jQuery.extend({}, relArea);
                break;
            case "population":
    
                var max = 1000;
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    if (provinceCollection.features[i].properties.Pop > max)
                        max = provinceCollection.features[i].properties.Pop;
                }
                max = Math.log(max / 1000);
                var fraction = 0
                for (var i = 0; i < provinceCollection.features.length; i++) {
                    fraction = Math.log(provinceCollection.features[i].properties.Pop / 1000) / max;
    
                    provinceCollection.features[i].properties.Acolor = "rgb(" + Math.round(200 + fraction * 55) + "," + Math.round(200 - fraction * 200) + "," + Math.round(200 - fraction * 200) + ")";
                }
                //         activeFeatureCollection = jQuery.extend({}, popArea);
                break;
            
    
    
        }
    
        activeAreaFeature
            .style("fill", function (d) {
                return d.properties.Acolor; //._storage_options
            })
    }
}

function addTextFeat(setActiveFeat) {

    activeTextFeat = setActiveFeat; //"country";

    if ((activeTextFeat == "country" && !countryIsSetup) ||
        (activeTextFeat == "culture" && !culIsSetup) ||
        (activeTextFeat == "religion" && !relIsSetup) ||
        (activeTextFeat == "religionGeneral" && !relGenIsSetup)) {

        countriesArea = {"type": "FeatureCollection",
            "features": []
        }
        culArea = {"type": "FeatureCollection",
            "features": []
        }
        relArea = {"type": "FeatureCollection",
            "features": []
        }

        var countryCollection = {};
        var relCollection = {};

        var relGenIdCollection = {};
        var culCollection = {};
        var popCollection = {};

        var tmpProv, tmpCountry, tmpRel, tmpCul, tmpPop, tmpCap, tmpCoo;

        for (var i = 0; i < provinceCollection.features.length; i++) {  //tmpLength

            tmpCoo = undefined;
            tmpCountry = undefined;
            tmpRel = undefined;
            tmpCul = undefined;
            tmpPop = undefined;
            tmpCap = undefined;

            tmpProv = provinceCollection.features[i].properties.name;
            tmpCoo = provinceCollection.features[i].geometry.coordinates[0];


            if (activeYear.hasOwnProperty(tmpProv)) {
                tmpCountry = activeYear[tmpProv][0];
                tmpCul = activeYear[tmpProv][1];
                tmpRel = activeYear[tmpProv][2];
                tmpCap = activeYear[tmpProv][3];
                tmpPop = activeYear[tmpProv][4];

                provinceCollection.features[i].properties.Cul = tmpCul;
                provinceCollection.features[i].properties.Rel = tmpRel;
                provinceCollection.features[i].properties.Pop = tmpPop;
                provinceCollection.features[i].properties.Cap = tmpCap;

                if (countryPlus[tmpCountry]) {
                    provinceCollection.features[i].properties.nameCountry = countryPlus[tmpCountry][0];
                }

            }
            //          console.debug(countryCollection, tmpCountry, i);
            if (!countryIsSetup)
            prepareCollectionIDs(countryCollection, tmpCountry, i);
            if (!culIsSetup)
            prepareCollectionIDs(culCollection, tmpCul, i);
            if (!relIsSetup)
            prepareCollectionIDs(relCollection, tmpRel, i);
            if (!relGenIsSetup)
            prepareCollectionIDs(relGenIdCollection, relGen[tmpRel][0], i);

        }

        if (!countryIsSetup)
        fillCollectionId(countryCollection, gActiveCouLabels, "co");
        if (!culIsSetup)
        fillCollectionId(culCollection, gActiveCulLabels, "cu");
        if (!relIsSetup)
        fillCollectionId(relCollection, gActiveRelLabels, "r");
        if (!relGenIsSetup)
        fillCollectionId(relGenIdCollection, gActiveRelGenLabels, "rg");

        countryIsSetup = true;
        culIsSetup = true;
        relIsSetup = true;
        relGenIsSetup = true;

    }


    switch (activeTextFeat) {
        case "country":
            activeTextLineFeature = gActiveCouLabels.selectAll("path");
            activeTextFeature0 = gActiveCouLabels.selectAll("text")
            gActiveCouLabels.attr("visibility", "visible");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveCouLabels;

            break;
        case "culture":
            activeTextLineFeature = gActiveCulLabels.selectAll("path");
            activeTextFeature0 = gActiveCulLabels.selectAll("text")
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "visible");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveCulLabels;

            break;
        case "religion":
            activeTextFeature0 = gActiveRelLabels.selectAll("text")
            activeTextLineFeature = gActiveRelLabels.selectAll("path");
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "visible");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveRelLabels;

            break;


        case "religionGeneral":
            activeTextFeature0 = gActiveRelGenLabels.selectAll("text")
            activeTextLineFeature = gActiveRelGenLabels.selectAll("path");
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "visible");
            gActiveCulLabels.attr("visibility", "hidden");
            gActiveLabels = gActiveRelGenLabels;

            break;
        case "none":
            gActiveCouLabels.attr("visibility", "hidden");
            gActiveRelLabels.attr("visibility", "hidden");
            gActiveRelGenLabels.attr("visibility", "hidden");
            gActiveCulLabels.attr("visibility", "hidden");

            break;


    }
    activeLoaded = false;
    reset();
}

function reset() {


    var bounds = path.bounds(provinceCollection),
        topLeft = bounds[0],
        bottomRight = bounds[1];

    svgProv.attr("width", bottomRight[0] - topLeft[0])
        .attr("height", bottomRight[1] - topLeft[1])
        .style("left", topLeft[0] + "px")
        .style("top", topLeft[1] + "px");

    g00.attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");


    activeAreaFeature.attr("d", path);

    if (map.getZoom() < 7) {

        gProvinceLabels.attr("visibility", "hidden")

        if (!activeLoaded) {
            activeLoaded = true;


        }


        activeTextLineFeature.attr("d",function (d) {
            var toReturn = "";

            var point1 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1], d.geometry.coordinates[0][0]));
            var point2 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[1][1], d.geometry.coordinates[1][0]));
            var point3 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[2][1], d.geometry.coordinates[2][0]));

            return 'M' + point1.x + ' ' + point1.y + 'Q' + point2.x + ' ' + point2.y + ' ' + point3.x + ' ' + point3.y;
        }).each(function () {
                this.__data__.totalLength = parseInt(this.getTotalLength());
            });


        activeTextFeature0.attr("font-size", function (d, i) {

            tmpSize = d.totalLength / (Math.sqrt(20 * Math.sqrt(d.properties.name.length)) * 1.4);

            if (tmpSize > 7)
                return tmpSize
            else return 0
        })

        if (activeTextFeat != "none") {
            gActiveLabels.attr("visibility", "visible");
        }

    }
    else if (map.getZoom() > 6) {

        gActiveLabels.attr("visibility", "hidden")

        if (!provinceLoaded) {
            provinceLoaded = true;

        }


        provinceTextLineFeature.attr("d",function (d) {
            var toReturn = "";

            var point1 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[0][1], d.geometry.coordinates[0][0]));
            var point2 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[1][1], d.geometry.coordinates[1][0]));
            var point3 = map.latLngToLayerPoint(new L.LatLng(d.geometry.coordinates[2][1], d.geometry.coordinates[2][0]));

            return 'M' + point1.x + ' ' + point1.y + 'Q' + point2.x + ' ' + point2.y + ' ' + point3.x + ' ' + point3.y;
        }).each(function () {
                this.__data__.totalLength = parseInt(this.getTotalLength());
            });


        provinceTextFeature0.attr("font-size", function (d, i) {

            tmpSize = d.totalLength / (Math.sqrt(19 * Math.sqrt(d.properties.name.length)) * 1.4);

            if (tmpSize > 7)
                return tmpSize;
            else return 0
        })

        if (activeTextFeat != "none") {
            gProvinceLabels.attr("visibility", "visible")
        }

    }

}

function lockFeatureSelection() {

    if( $("#rulerTR td:eq(2)").css("display") !== "none" ){

        $("#lockIcon").removeClass("fa-lock")
        $("#lockIcon").addClass("fa-unlock-alt")

        $("#lockFeatureButton").attr("title","Select labels and area feature separately");

        $("#rulerTR td:eq(2)").css("display","none")
        $("#rulerTR td:eq(1)").attr("colspan","2")
        $("#rulerTR div:eq(0)").css("width","98px")

        $("#cultureTR td:eq(2)").css("display","none")
        $("#cultureTR td:eq(1)").attr("colspan","2")
        $("#cultureTR div:eq(0)").css("width","98px")

        $("#religionTR td:eq(2)").css("display","none")
        $("#religionTR td:eq(1)").attr("colspan","2")
        $("#religionTR div:eq(0)").css("width","98px")

        $("#mainreligionTR td:eq(2)").css("display","none")
        $("#mainreligionTR td:eq(1)").attr("colspan","2")
        $("#mainreligionTR div:eq(0)").css("width","98px")

        $("#populationTR td:eq(2)").css("display","none")
        $("#populationTR td:eq(1)").attr("colspan","2")
        $("#populationTR div:eq(0)").css("width","98px")

        $("#noneTR td:eq(2)").css("display","none")
        $("#noneTR td:eq(1)").attr("colspan","2")
        $("#noneTR div:eq(0)").css("width","98px")

        var textToIterate = ["T-Country","T-Culture","T-Religion","T-MainRel","T-Population"];
        var areaToIterate = ["A-Country","A-Culture","A-Religion","A-MainRel","A-Population"];

        for (var i=0; i<areaToIterate.length;i++){
            if($("#"+areaToIterate[i]).prop('checked') && !$("#"+textToIterate[i]).prop('checked')){
                if (textToIterate[i] === "T-Population"){
                    hideAndAdd("T-Population","none")
                }
                else{
                    $("#"+textToIterate[i]).parent().click();
                }

            }
        }
    }

    else {

        $("#lockIcon").removeClass("fa-unlock-alt")
        $("#lockIcon").addClass("fa-lock")
        $("#lockFeatureButton").attr("title","Always use labels of the area feature");

        $("#rulerTR td:eq(2)").css("display","block")
        $("#rulerTR td:eq(1)").attr("colspan","1")
        $("#rulerTR div:eq(0)").css("width","39px")

        $("#cultureTR td:eq(2)").css("display","block")
        $("#cultureTR td:eq(1)").attr("colspan","1")
        $("#cultureTR div:eq(0)").css("width","39px")

        $("#religionTR td:eq(2)").css("display","block")
        $("#religionTR td:eq(1)").attr("colspan","1")
        $("#religionTR div:eq(0)").css("width","39px")

        $("#mainreligionTR td:eq(2)").css("display","block")
        $("#mainreligionTR td:eq(1)").attr("colspan","1")
        $("#mainreligionTR div:eq(0)").css("width","39px")

        $("#populationTR td:eq(2)").css("display","block")
        $("#populationTR td:eq(1)").attr("colspan","1")
        $("#populationTR div:eq(0)").css("width","39px")

        

    }



};


function asyncCall(myUrl){

    $.ajax({
        url: myUrl,
        jsonp: "callback",
        dataType: "jsonp",

        success: function( response ) {

            var geoTagged=[];
            var bakedImages={};


            // blocking all cities and city likes 253019
            for (var i=0; i<response.props["31"].length && i<limit; i++){
                if (response.props["31"][i][2] == "515" ||
                    response.props["31"][i][2] == "253019"||
                    response.props["31"][i][2] == "2983893") blocklist.push(response.props["31"][i][0])
            }

            // baking imageMap
            for (var i=0; i<response.props["18"].length; i++){
                if (blocklist.indexOf(response.props["18"][i][0]) == -1){
                    imageMap[response.props["18"][i][0]] = response.props["18"][i][2]

                }
            }


            // gathering coordinates

            if (response.props["625"]){
                for (var i=0; i<response.props["625"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["625"][i][0]) == -1){
                        blocklist.push(response.props["625"][i][0])

                        $.ajax({
                            url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+response.props["625"][i][0]+"&props=sitelinks&languages=en&format=json",
                            jsonp: "callback",
                            dataType: "jsonp",
                            indexValue2: response.props["625"][i][0],
                            indexValue3: response.props["625"][i][2],
                            success: function( response2 ) {
                                var returningObj = {};
                                getObject(response2,returningObj)
                                appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                            }
                        });
                    }
                }
            }

            if (response.props["276"]){
                // get 276
                for (var i=0; i<response.props["276"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["276"][i][0]) == -1){
                        blocklist.push(response.props["276"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["276"][i][2]+"]&props=625",
                            dataType: "jsonp",
                            indexValue: response.props["276"][i][0],
                            success: function( response ) {
                                if(response.props["625"] ){
                                    // console.log( "625 received", imageMap[this.indexValue], response.props["625"][0][2] );
                                    //		appendImage(imageMap[this.indexValue], response.props["625"][0][2]);

                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }
                            }
                        });

                    }
                }
            }
            if (response.props["19"]){
                // get 19
                for (var i=0; i<response.props["19"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["19"][i][0]) == -1){
                        blocklist.push(response.props["19"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["19"][i][2]+"]&props=625",
                            indexValue: response.props["19"][i][0],
                            dataType: "jsonp",

                            success: function( response ) {
                                if(response.props["625"] && response.props["625"][0]){
                                    // console.log( "!625 received",imageMap[this.indexValue], response.props["625"][0][2] );
                                    //appendImage(imageMap[this.indexValue], response.props["625"][0][2]);
                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }

                            }
                        });

                    }
                }
            }
            if (response.props["189"]){
                // get 189
                for (var i=0; i<response.props["189"].length && i<limit; i++){
                    if (blocklist.indexOf(response.props["189"][i][0]) == -1){
                        blocklist.push(response.props["189"][i][0])

                        $.ajax({
                            url: "//wdq.wmflabs.org/api?q=ITEMS["+response.props["189"][i][2]+"]&props=625",
                            indexValue: response.props["189"][i][0],
                            dataType: "jsonp",

                            success: function( response ) {
                                if(response.props["625"] && response.props["625"][0]){
                                    // console.log( "!625 received",imageMap[this.indexValue], response.props["625"][0][2] );
                                    //appendImage(imageMap[this.indexValue], response.props["625"][0][2]);
                                    $.ajax({
                                        url: "//wikidata.org/w/api.php?action=wbgetentities&ids=Q"+this.indexValue+"&props=sitelinks&languages=en&format=json",
                                        jsonp: "callback",
                                        dataType: "jsonp",
                                        indexValue2: this.indexValue,
                                        indexValue3: response.props["625"][0][2],
                                        success: function( response2 ) {
                                            var returningObj = {};
                                            getObject(response2,returningObj)
                                            appendImage(imageMap[this.indexValue2], this.indexValue3,returningObj.enwiki);
                                        }
                                    });
                                }

                            }
                        });

                    }
                }
            }

        }

    });

}


function updateGeoGallery (myStart,myEnd,scope){


    $('#lightGallery').hide()
    $('#loadingGallery').show()
    
    
    $(".tempImageLine").parent().remove()
    myLightGallery.destroy();
    $('#lightGallery').empty();

    blocklist=[];
    imageMap={};
/*
        if (document.getElementById("itemsImgBox").checked){

            // location of discovery   (item)
            asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[189] &props=31,18,189");
            
    
        }*/
        if (document.getElementById("otherImgBox").checked){
        // coordinate location  (building - event)
        asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[625] &props=31,18,625");

            // location of item   (item)
            asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[276] &props=31,18,276");
            

        }
    else if (document.getElementById("peopleImgBox").checked){                
        // Place of Birth     (person)
        asyncCall("//wdq.wmflabs.org/api?q=(BETWEEN[569,"+myStart+","+myEnd+"] OR BETWEEN[571,"+myStart+","+myEnd+"] OR BETWEEN[580,"+myStart+","+myEnd+"] OR BETWEEN[582,"+myStart+","+myEnd+"] OR BETWEEN[585,"+myStart+","+myEnd+"]) AND claim[18] AND claim[19] &props=31,18,19");
        }

};

function appendImage(myImageId,myCoords,enwiki) {
    
    if ($('#galleryOptions').css("right") != "-200px" && allowGallery){
        $("#loadingGallery").hide();
        $('#lightGallery').show();        
    }
    
    if (parseInt($("#limitYears").val()) > $("#lightGallery").find("li").length){
    $.ajax({
        url: "//commons.wikimedia.org/w/api.php?action=query&titles=File%3A"+myImageId+"&prop=imageinfo&iiurlwidth=260&iiurlheight=400&iiprop=url%7Csize&format=json",
        dataType: "jsonp",

        success: function( response ) {

            if (parseInt($("#limitYears").val()) > $("#lightGallery").find("li").length){
                //	console.log( "last response", response.query.pages );
                var buildingBlock={}
                getObject2(response.query.pages,buildingBlock);
                //	console.log( "!!! final:", myCoords, buildingBlock.thumb, buildingBlock.url );  data-lightbox="geogal"><img class="singImage"
                //  '+enwiki+' '+myCoords+'" 

                var newLi = document.createElement("li");
                if (enwiki !== undefined) {
                    
                    newLi.setAttribute("data-sub-html", "<div class='custom-html'>                <h4>"+enwiki+"</h4>                <p><a style='cursor: pointer' onclick=\"closeAndOpenWikipediaTab('"+enwiki.replace("'","&#39;")+"','"+myCoords+"')\">Open related Wikipedia article</a></p>                </div>");
                    newLi.setAttribute("data-src", buildingBlock.url);
                
                    newLi.innerHTML = "<span class='lightGalleryOverlay fa-stack fa-lg' onclick='runFunctionAndPan(this,event,\""+myCoords+"\",\""+enwiki.replace("'","&#39;")+"\")'><i class='fa fa-circle fa-stack-2x'></i><i class='fa fa-search fa-stack-1x fa-inverse'></i> </span> <img onmouseover='mouseOverImageLine (this,\""+myCoords+"\")' title='"+enwiki+"' class='singImage' src='"+buildingBlock.thumb+"' />";

                    $( "#lightGallery" ).append(newLi);
                }
                else {

                    newLi.setAttribute("data-src", buildingBlock.url);
                    newLi.innerHTML = "<img onmouseover='mouseOverImageLine (this,\""+myCoords+"\")' class='singImage' src='"+buildingBlock.thumb+"' />"
                        $( "#lightGallery" ).append(newLi);
                                       
                }

                if($("#seeLocationsButton").hasClass("activeToggle")  &&  $(".leaflet-right").css("display") !== "none"){
                    mouseOverImageLine ($(newLi).find("img")[0],myCoords);
                }
                myLightGallery.destroy();
                myLightGallery.lightGallery();

            }
        }
    });
    }
}

function runFunctionAndPan (that,evt,myCoords,enwiki) {

    // stops the default-action from happening
    // means you need to find another way to fire it, if you want to later
    event.preventDefault();


    // stops higher-up elements from hearing about the event
    // like if you stop a submit button from "clicking", that doesn't stop the form
    // from submitting
    event.stopPropagation();

    //the oldIE versions of both of these are
    event.cancelBubble = true;
    event.returnValue = false;

    openWikipediaTab(enwiki,myCoords)
}

function seeAllLocations (){

if($("#seeLocationsButton").hasClass("activeToggle")){    

    $("#seeLocationsButton").removeClass( "activeToggle" );

    $(".tempImageLine").parent().remove();

    $('#lightGallery').find("img").trigger('mouseout');
}
    else{
    $("#seeLocationsButton").addClass( "activeToggle" );
    $('#lightGallery').find("img").trigger('mouseover');
    
}
    
}

function posY(elm) {
    var test = elm, top = 0;

    while(!!test && test.tagName.toLowerCase() !== "body") {
        top += test.offsetTop;
        test = test.offsetParent;
    }

    return top;
}

function viewPortHeight() {
    var de = document.documentElement;

    if(!!window.innerWidth)
    { return window.innerHeight; }
    else if( de && !isNaN(de.clientHeight) )
    { return de.clientHeight; }

    return 0;
}

function scrollY() {
    if( window.pageYOffset ) { return window.pageYOffset; }
    return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
}

function checkVisible( elm ) {
        if (elm.offsetLeft > $('#lightGallery')[0].scrollLeft +  $('#lightGallery')[0].clientWidth || elm.offsetLeft < $('#lightGallery')[0].scrollLeft )  {
            return false;
        } else { return true; }
}

function mouseOverImageLine (that,myCoords) {

    var myClientRect = that.getBoundingClientRect();
    var widthPercent = (myClientRect.left + (myClientRect.width / 2)) / window.innerWidth;   //(myClientRect.left + myClientRect.right);
    var heightPercent = 50 /*(myClientRect.top + (myClientRect.height / 2))*/ / window.innerHeight;

    //lng is width, lat is height
    var myMapBounds = map.getBounds();
    var markerLng = myMapBounds._southWest.lng + widthPercent *  (myMapBounds._northEast.lng - myMapBounds._southWest.lng);
    var markerLat = myMapBounds._northEast.lat - (2 * (((myMapBounds._northEast.lat - myMapBounds._southWest.lat) / 160))) - (heightPercent *  (myMapBounds._northEast.lat - myMapBounds._southWest.lat)) * (1-((myMapBounds._northEast.lat - myMapBounds._southWest.lat) / 160));

    rCoo = myCoords.split("|")

    
    drawingImageLine = true;
    if(checkVisible(that)){
        var temPolyline = new L.Polyline([new L.LatLng(markerLat, markerLng), new L.LatLng(parseInt(rCoo[0]),parseInt(rCoo[1]))], {
            weight: 5,
            opacity: 0.9,
            smoothFactor: 1
    
        });
        temPolyline.addTo(map);
    }
    var circleMarkerOptions = {
        radius: 5,
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
    };
    
    var temCircleMarker = new L.circleMarker(new L.LatLng(parseInt(rCoo[0]),parseInt(rCoo[1])), circleMarkerOptions);


    temCircleMarker.addTo(map);
    
    $(temPolyline).addClass('tempImageLine');
    
    drawingImageLine = false;

    $( that ).mouseout(function() {

        if(!$("#seeLocationsButton").hasClass("activeToggle")){
            map.removeLayer(temPolyline);
            map.removeLayer(temCircleMarker);
        }
        
    });
    
    //  panImage(myCoords)
}


function closeAndOpenWikipediaTab(myWikiUrl,myCoords){
    rCoo = myCoords.split("|")
    $("#lg-close").click();
    ultimateMarker.properties.wikiUrl=escape(myWikiUrl);
    ultimateMarker.attachPopup()
    $('#chronasWiki').hide();
    $('#loader1').show();
    $('#chronasWiki').load(function(){
        $('#loader1').hide();$('#chronasWiki').show();
    });
    
    panImage(myCoords)
        $(".overviewContainer").css("display","none")
}

function openWikipediaTab(myWikiUrl,myCoords){
    rCoo = myCoords.split("|")
    ultimateMarker.properties.wikiUrl=escape(myWikiUrl);
    ultimateMarker.attachPopup();
    
    $('#chronasWiki').hide();
    $('#loader1').show();
    $('#chronasWiki').load(function(){
        $('#loader1').hide();
        $('#chronasWiki').show();
    });

    $(".overviewContainer").css("display","none")
    panImage(myCoords)
}

function panImage(myCoords){
    
    rCoo = myCoords.split("|")
    if (map.getZoom() > 6){
        map.panTo(new L.LatLng(rCoo[0],parseInt(rCoo[1])+2));
    } else {
        map.panTo(new L.LatLng(rCoo[0],parseInt(rCoo[1])+5));
    }
    
    var myTempMarker = new L.marker(new L.LatLng(rCoo[0],rCoo[1])).addTo(map);
    setTimeout(function(){ 
        map.removeLayer(myTempMarker)
        setTimeout(function(){
            myTempMarker = new L.marker(new L.LatLng(rCoo[0],rCoo[1])).addTo(map);
            setTimeout(function(){
                map.removeLayer(myTempMarker)
                    setTimeout(function(){
                        myTempMarker = new L.marker(new L.LatLng(rCoo[0],rCoo[1])).addTo(map);
                        setTimeout(function(){
                            map.removeLayer(myTempMarker)

                        }, 5000);
                    }, 500);
            }, 500);
        }, 500);
    }, 500);
    
    
}
function getObject(theObject,returningObj) {
    var result = null;

    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i],returningObj);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(var prop in theObject) {
            if(prop == "enwiki")
                returningObj.enwiki=theObject[prop].title;

            if(prop == 'id') {
                if(theObject[prop] == 1) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject(theObject[prop],returningObj);
                if (result) {
                    break;
                }
            }
        }
    }

    return result;
}

function loadFullTimeLoaded(ident){
    map.get("/en/app/datalayer/270/", {
        callback: function (geojson) {

            fullTimeData = geojson;
            
            if (ident == "anim"){

                rulAnimLoaded = true;
                runRulChart(); 
            }
            else if (ident == "static"){
                rulStaticLoaded = true;
                runStackedRul();
            }
            
            
        } });
}

function getObject2(theObject,returningObj) {
    var result = null;

    if(theObject instanceof Array) {
        for(var i = 0; i < theObject.length; i++) {
            result = getObject2(theObject[i],returningObj);
            if (result) {
                break;
            }
        }
    }
    else
    {
        for(var prop in theObject) {
            //	console.debug(prop,theObject[prop]);
            if(theObject[prop] && theObject[prop].imageinfo && theObject[prop].imageinfo[0]  ){
                returningObj.thumb=theObject[prop].imageinfo[0].thumburl;
                returningObj.url=theObject[prop].imageinfo[0].url;
            }

            if(prop == 'id') {
                if(theObject[prop] == 1) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject2(theObject[prop],returningObj);
                if (result) {
                    break;
                }
            }
        }
    }

    return result;
}


/*



 iconv -f ISO-8859-1 -t UTF-8 DL50.geojson >DL50b.geojson

 */

/**
 *
 *

 for (var it in x.features){
for (var cs in cols){

if (rgbToHex(parseInt(cols[cs][1]), parseInt(cols[cs][2]), parseInt(cols[cs][3])) == x.features[it].properties._storage_options.color){
x.features[it].properties.name = cols[cs][4];
}

}
}


 get adjacent

 var adjacentList = [];

 for (var i = 0; i < provinceCollection.features.length; i++) { 
adjacentList[i] = []
for (var j = 0; j < provinceCollection.features.length; j++) { 

if (i != j && contains3(provinceCollection.features[i].geometry.coordinates[0],provinceCollection.features[j].geometry.coordinates[0]))
adjacentList[i].push(j)

}
}

 */





var currStackedData="rul";
// Various accessors that specify the four dimensions of data to visualize.
function x(d) { return d.area; }
function y(d) { return d.pops; }
function radius(d) { return d.pops/1000000; }
function color(d) { return d.region; }
function key(d) { return d.name; }

// Chart dimensions.
var margin = {top: 19.5, right: 19.5, bottom: 19.5, left: 39.5},
    width = 960 - margin.right,
    height = 449 - margin.top - margin.bottom;

function runRulChart(){


// Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([50000, 1e8]).range([0, width]),
        yScale = d3.scale.log().domain([100000, 1e10]).range([height, 0]),
        radiusScale = d3.scale.linear().domain([100, 150]).range([0, 50]),
        colorScale = d3.scale.category10();

// The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4, d3.format(",d")),
        yAxis = d3.svg.axis().scale(yScale).orient("left");

    var myTooltip = CustomTooltip("ani_tooltip1", 240);
// Create the SVG container and set the origin.
    var svg = d3.select("#aniRul").append("svg").attr("id",  "scatterRul")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

// Add an x-axis label.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Population");

// Add a y-axis label.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Controlled Area");

// Add the year label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "year label")
        .attr("text-anchor", "end")
        .attr("y", height - 24)
        .attr("x", width)
        .text(2000);

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function(d) { return d[0]; });

    // Add a dot per nation. Initialize the data at 1800, and set the colors.
    var commonGroup = svg.append("g")
        .attr("class", "dots")
        .selectAll(".dot")
        .data(interpolateData(0))
        .enter();




    var dot = commonGroup.append("circle")
        .attr("class", "dot")
        .style("fill", function(d) {
            return  (d.name !== "Other") ? colorAreas[d.name] : "grey" })
        .style("fill-opacity", "0.8")
        .style("stroke", function(d) {
            return  colorAreas[d.name]})
        .call(position)
        .sort(order)
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill-opacity", "1")
                .style("stroke","black");
            
             var content = "<h4 class=\"name\">"+ d.name+"</h4>";
             content += "<span class=\"name\">Area:</span><span class=\"value\"> " +  (addCommas(Math.round(d.area))) + "</span><br/>";
             content += "<span class=\"name\">Population:</span><span class=\"value\"> " + (addCommas(Math.round(d.pops))) + "</span>";

             myTooltip.showTooltip(content, d3.event);

            /*
             content += "<span class=\"name\">Area:</span><span class=\"value\"> " +  (addCommas(Math.round(d.area))) + "</span><br/>";
             content += "<span class=\"name\">Population:</span><span class=\"value\"> " + (addCommas(Math.round(d.pops))) + "</span>";

             myTooltip.showTooltip(d.name +  " [Population: " + Math.round(d.pops) + " | Area: " + Math.round(d.area)  + "]", d3.event);

             */
           // return tooltip.style("visibility", "visible");

        })
        .on("mouseout", function() {
            d3.select(this)
                .style("fill-opacity", "0.8")
                .style("stroke", function(d) {
                    return  colorAreas[d.name]})

            myTooltip.hideTooltip();
            
       //     return tooltip.style("visibility", "hidden");
        })
        .on("mousemove", function(){return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})


    var dotLabels = commonGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "bubbleLabels")

        .attr("pointer-events","none")
        .text(function(d) {
            return d.name; })
        .attr("font-size", "25px")
        .call(position2);

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.

    svg.transition()
        .duration(30000)
        .ease("linear")
        .tween("year", tweenYear)
        .each("end", enableInteraction);

    document.getElementById("startAniRul").onclick = function() {
        svg.transition()
            .duration(30000)
            .ease("linear")
            .tween("year", tweenYear)
            .each("end", enableInteraction);
    };


    // Positions the dots based on data.
    function position(dot) {
        dot .attr("cx", function(d) { return xScale(x(d)+100); })
            .attr("cy", function(d) { return yScale(y(d)+100); })
            .attr("r", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;
                return tmpRadius; });
    }

    function position2(dotLabels) {
        dotLabels .attr("x", function(d) { return xScale(x(d)+1); })
            .attr("y", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;

                return yScale(y(d)+1)+tmpRadius*1+15; })
            .attr("fill-opacity", "1").attr("stroke-opacity", "1")
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
        return radius(b) - radius(a);
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
        var yearScale = d3.scale.linear()
            .domain([0, 2000])
            .range([box.x + 10, box.x + box.width - 10])
            .clamp(true);

        // Cancel the current transition, if any.
        svg.transition().duration(0);

        overlay
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove)
            .on("touchmove", mousemove);

        function mouseover() {
            label.classed("active", true);
        }

        function mouseout() {
            label.classed("active", false);
        }

        function mousemove() {
            displayYear(yearScale.invert(d3.mouse(this)[0]));
        }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
        var year = d3.interpolateNumber(0, 2000);
        return function(t) { displayYear(year(t)); };
    }

    // Updates the display to show the specified year.
    function displayYear(year) {
        dot.data(interpolateData(year), key).call(position).sort(order);
        dotLabels.data(interpolateData(year), key).call(position2).sort(order);



        label.text(Math.round(year));
        arrangeLabels();

    }

    function arrangeLabels() {
        var move = 1;
        while(move > 0) {
            move = 0;
            svg.selectAll(".bubbleLabels")
                .each(function() {
                    var that = this,
                        a = this.getBoundingClientRect();
                    svg.selectAll(".bubbleLabels")
                        .each(function() {
                            if(this != that) {
                                var b = this.getBoundingClientRect();


                                if(((this.getAttribute("x")<1000 && this.getAttribute("x")>10)  && this.getAttribute("fill-opacity") != 0 && !(a.right < b.left ||
                                    a.left > b.right ||
                                    a.bottom < b.top ||
                                    a.top > b.bottom)   )) {

                                    // determine amount of movement, move label
                                    d3.select(that).attr("fill-opacity", "0"); //function() { return (d3.select(this).attr("y")-13) }  )
                                }
                            }
                        });
                });
        }
    }


    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
        return fullTimeData.completeSet.map(function(d) {
            return {
                name: d.name,
                region: d.region,
                area: interpolateValues(d.area, year),
                population: interpolateValues(d.population, year),
                pops: interpolateValues(d.pops, year)
            };
        });
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
            var b = values[i - 1],
                t = (year - a[0]) / (b[0] - a[0]);
            return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
    }

}
function runRelChart(){


// Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([50000, 1e8]).range([0, width]),
        yScale = d3.scale.log().domain([100000, 1e10]).range([height, 0]),
        radiusScale = d3.scale.linear().domain([100, 170]).range([0, 50]),
        colorScale = d3.scale.category10();

// The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4, d3.format(",d")),
        yAxis = d3.svg.axis().scale(yScale).orient("left");
    var myTooltip = CustomTooltip("ani_tooltip2", 240);
// Create the SVG container and set the origin.
    var svg = d3.select("#aniRel").append("svg").attr("id",  "scatterRel")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

// Add an x-axis label.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Population");

// Add a y-axis label.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Controlled Area");

// Add the year label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "year label")
        .attr("text-anchor", "end")
        .attr("y", height - 24)
        .attr("x", width)
        .text(2000);

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function(d) { return d[0]; });

    // Add a dot per nation. Initialize the data at 1800, and set the colors.
    var commonGroup = svg.append("g")
        .attr("class", "dots")
        .selectAll(".dot")
        .data(interpolateData(0))
        .enter();




    var dot = commonGroup.append("circle")
        .attr("class", "dot")
        .style("fill", function(d) {
            return  (d.name !== "Other") ? colorAreas[d.name] : "grey" })
        .style("fill-opacity", "0.8")
        .style("stroke", function(d) {
            return  colorAreas[d.name]})
        .call(position)
        .sort(order)
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill-opacity", "1")
                .style("stroke","black");

            var content = "<h4 class=\"name\">"+ d.name+"</h4>";
            content += "<span class=\"name\">Area:</span><span class=\"value\"> " +  (addCommas(Math.round(d.area))) + "</span><br/>";
            content += "<span class=\"name\">Population:</span><span class=\"value\"> " + (addCommas(Math.round(d.pops))) + "</span>";

            myTooltip.showTooltip(content, d3.event);

        })
        .on("mouseout", function() {
            d3.select(this)
                .style("fill-opacity", "0.8")
                .style("stroke", function(d) {
                    return  colorAreas[d.name]})

            myTooltip.hideTooltip();
        })
        .on("mousemove", function(){return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})


    var dotLabels = commonGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "bubbleLabels")

        .attr("pointer-events","none")
        .text(function(d) {
            return d.name; })
        .attr("font-size", "25px")
        .call(position2);

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.

    svg.transition()
        .duration(30000)
        .ease("linear")
        .tween("year", tweenYear)
        .each("end", enableInteraction);

    document.getElementById("startAniRel").onclick = function() {
        svg.transition()
            .duration(30000)
            .ease("linear")
            .tween("year", tweenYear)
            .each("end", enableInteraction);
    };


    // Positions the dots based on data.
    function position(dot) {
        dot .attr("cx", function(d) { return xScale(x(d)+100); })
            .attr("cy", function(d) { return yScale(y(d)+100); })
            .attr("r", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;
                return tmpRadius; });
    }

    function position2(dotLabels) {
        dotLabels .attr("x", function(d) { return xScale(x(d)+1); })
            .attr("y", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;

                return yScale(y(d)+1)+tmpRadius*1+15; })
            .attr("fill-opacity", "1").attr("stroke-opacity", "1")
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
        return radius(b) - radius(a);
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
        var yearScale = d3.scale.linear()
            .domain([0, 2000])
            .range([box.x + 10, box.x + box.width - 10])
            .clamp(true);

        // Cancel the current transition, if any.
        svg.transition().duration(0);

        overlay
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove)
            .on("touchmove", mousemove);

        function mouseover() {
            label.classed("active", true);
        }

        function mouseout() {
            label.classed("active", false);
        }

        function mousemove() {
            displayYear(yearScale.invert(d3.mouse(this)[0]));
        }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
        var year = d3.interpolateNumber(0, 2000);
        return function(t) { displayYear(year(t)); };
    }
    
    function arrangeLabels() {
        var move = 1;
        while(move > 0) {
            move = 0;
            svg.selectAll(".bubbleLabels")
                .each(function() {
                    var that = this,
                        a = this.getBoundingClientRect();
                    svg.selectAll(".bubbleLabels")
                        .each(function() {
                            if(this != that) {
                                var b = this.getBoundingClientRect();


                                if(((this.getAttribute("x")<1000 && this.getAttribute("x")>10)  && this.getAttribute("fill-opacity") != 0 && !(a.right < b.left ||
                                    a.left > b.right ||
                                    a.bottom < b.top ||
                                    a.top > b.bottom)   )) {

                                    // determine amount of movement, move label
                                    d3.select(that).attr("fill-opacity", "0"); //function() { return (d3.select(this).attr("y")-13) }  )
                                }
                            }
                        });
                });
        }
    }
    // Updates the display to show the specified year.
    function displayYear(year) {
        dot.data(interpolateData(year), key).call(position).sort(order);
        dotLabels.data(interpolateData(year), key).call(position2).sort(order);



        label.text(Math.round(year));
        arrangeLabels();

    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
        return fullTimeData.completeSetRel.map(function(d) {
            return {
                name: d.name,
                region: d.region,
                area: interpolateValues(d.area, year),
                population: interpolateValues(d.population, year),
                pops: interpolateValues(d.pops, year)
            };
        });
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
            var b = values[i - 1],
                t = (year - a[0]) / (b[0] - a[0]);
            return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
    }

}
function runmRelChart(){


// Various scales. These domains make assumptions of data, naturally.
    var xScale = d3.scale.log().domain([50000, 1e8]).range([0, width]),
        yScale = d3.scale.log().domain([100000, 1e10]).range([height, 0]),
        radiusScale = d3.scale.linear().domain([100, 200]).range([0, 50]),
        colorScale = d3.scale.category10();

// The x & y axes.
    var xAxis = d3.svg.axis().orient("bottom").scale(xScale).ticks(4, d3.format(",d")),
        yAxis = d3.svg.axis().scale(yScale).orient("left");
    var myTooltip = CustomTooltip("ani_tooltip3", 240);
// Create the SVG container and set the origin.
    var svg = d3.select("#animRel").append("svg").attr("id",  "scattermRel")
        .attr("width", width + margin.left + margin.right + 20)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add the x-axis.
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// Add the y-axis.
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

// Add an x-axis label.
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Population");

// Add a y-axis label.
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 6)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Controlled Area");

// Add the year label; the value is set on transition.
    var label = svg.append("text")
        .attr("class", "year label")
        .attr("text-anchor", "end")
        .attr("y", height - 24)
        .attr("x", width)
        .text(2000);

    // A bisector since many nation's data is sparsely-defined.
    var bisect = d3.bisector(function(d) { return d[0]; });

    // Add a dot per nation. Initialize the data at 1800, and set the colors.
    var commonGroup = svg.append("g")
        .attr("class", "dots")
        .selectAll(".dot")
        .data(interpolateData(0))
        .enter();




    var dot = commonGroup.append("circle")
        .attr("class", "dot")
        .style("fill", function(d) {
            return  (d.name !== "Other") ? colorAreas[d.name] : "grey" })
        .style("fill-opacity", "0.8")
        .style("stroke", function(d) {
            return  colorAreas[d.name]})
        .call(position)
        .sort(order)
        .on("mouseover", function(d) {
            d3.select(this)
                .style("fill-opacity", "1")
                .style("stroke","black");

            var content = "<h4 class=\"name\">"+ d.name+"</h4>";
            content += "<span class=\"name\">Area:</span><span class=\"value\"> " +  (addCommas(Math.round(d.area))) + "</span><br/>";
            content += "<span class=\"name\">Population:</span><span class=\"value\"> " + (addCommas(Math.round(d.pops))) + "</span>";

            myTooltip.showTooltip(content, d3.event);

        })
        .on("mouseout", function() {
            d3.select(this)
                .style("fill-opacity", "0.8")
                .style("stroke", function(d) {
                    return  colorAreas[d.name]})

            myTooltip.hideTooltip();
        })
        .on("mousemove", function(){return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})


    var dotLabels = commonGroup.append("text")
        .attr("text-anchor", "middle")
        .attr("class", "bubbleLabels")

        .attr("pointer-events","none")
        .text(function(d) {
            return d.name; })
        .attr("font-size", "25px")
        .call(position2);

    // Add an overlay for the year label.
    var box = label.node().getBBox();

    var overlay = svg.append("rect")
        .attr("class", "overlay")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.width)
        .attr("height", box.height)
        .on("mouseover", enableInteraction);

    // Start a transition that interpolates the data based on year.

    svg.transition()
        .duration(30000)
        .ease("linear")
        .tween("year", tweenYear)
        .each("end", enableInteraction);

    document.getElementById("startAnimRel").onclick = function() {
        svg.transition()
            .duration(30000)
            .ease("linear")
            .tween("year", tweenYear)
            .each("end", enableInteraction);
    };


    // Positions the dots based on data.
    function position(dot) {
        dot .attr("cx", function(d) { return xScale(x(d)+100); })
            .attr("cy", function(d) { return yScale(y(d)+100); })
            .attr("r", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;
                return tmpRadius; });
    }

    function position2(dotLabels) {
        dotLabels .attr("x", function(d) { return xScale(x(d)+1); })
            .attr("y", function(d) {
                var tmpRadius = radiusScale(radius(d)+100);
                if (tmpRadius > 100) tmpRadius = 100;

                return yScale(y(d)+1)+tmpRadius*1+15; })
            .attr("fill-opacity", "1").attr("stroke-opacity", "1")
    }

    // Defines a sort order so that the smallest dots are drawn on top.
    function order(a, b) {
        return radius(b) - radius(a);
    }

    // After the transition finishes, you can mouseover to change the year.
    function enableInteraction() {
        var yearScale = d3.scale.linear()
            .domain([0, 2000])
            .range([box.x + 10, box.x + box.width - 10])
            .clamp(true);

        // Cancel the current transition, if any.
        svg.transition().duration(0);

        overlay
            .on("mouseover", mouseover)
            .on("mouseout", mouseout)
            .on("mousemove", mousemove)
            .on("touchmove", mousemove);

        function mouseover() {
            label.classed("active", true);
        }

        function mouseout() {
            label.classed("active", false);
        }

        function mousemove() {
            displayYear(yearScale.invert(d3.mouse(this)[0]));
        }
    }

    // Tweens the entire chart by first tweening the year, and then the data.
    // For the interpolated data, the dots and label are redrawn.
    function tweenYear() {
        var year = d3.interpolateNumber(0, 2000);
        return function(t) { displayYear(year(t)); };
    }
    function arrangeLabels() {
        var move = 1;
        while(move > 0) {
            move = 0;
            svg.selectAll(".bubbleLabels")
                .each(function() {
                    var that = this,
                        a = this.getBoundingClientRect();
                    svg.selectAll(".bubbleLabels")
                        .each(function() {
                            if(this != that) {
                                var b = this.getBoundingClientRect();


                                if(((this.getAttribute("x")<1000 && this.getAttribute("x")>10)  && this.getAttribute("fill-opacity") != 0 && !(a.right < b.left ||
                                    a.left > b.right ||
                                    a.bottom < b.top ||
                                    a.top > b.bottom)   )) {

                                    // determine amount of movement, move label
                                    d3.select(that).attr("fill-opacity", "0"); //function() { return (d3.select(this).attr("y")-13) }  )
                                }
                            }
                        });
                });
        }
    }
    // Updates the display to show the specified year.
    function displayYear(year) {
        dot.data(interpolateData(year), key).call(position).sort(order);
        dotLabels.data(interpolateData(year), key).call(position2).sort(order);



        label.text(Math.round(year));
        arrangeLabels();

    }

    // Interpolates the dataset for the given (fractional) year.
    function interpolateData(year) {
        return fullTimeData.completeSetmRel.map(function(d) {
            return {
                name: d.name,
                region: d.region,
                area: interpolateValues(d.area, year),
                population: interpolateValues(d.population, year),
                pops: interpolateValues(d.pops, year)
            };
        });
    }

    // Finds (and possibly interpolates) the value for the specified year.
    function interpolateValues(values, year) {
        var i = bisect.left(values, year, 0, values.length - 1),
            a = values[i];
        if (i > 0) {
            var b = values[i - 1],
                t = (year - a[0]) / (b[0] - a[0]);
            return a[1] * (1 - t) + b[1] * t;
        }
        return a[1];
    }

}

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .attr("class", "tooltipText")
    .style("visibility", "hidden")
    .text("a simple tooltip");


function runStackedRul(){
    var colors = d3.scale.category20();

    var chart;
    // Maintain an Instance of the SVG selection with its data
    var chartDataRul;

    [{"key":"Paganism","color":"rgb(191,191,191)","values":[[0,8587600]],"seriesIndex":0}]

    nv.addGraph(function() {
        chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .controlLabels({stacked: "Stacked"})
            .duration(300).showLegend(false).style('expand');;


        chart.xAxis.tickFormat(d3.format('d'));
        chart.yAxis.tickFormat(d3.format(',.2f'));

        chartDataRul = d3.select('#stackedRul')
            .datum(fullTimeData.stackedRul)
            .transition().duration(1000)
            .call(chart)
        /*
         .each('start', function() {
         setTimeout(function() {
         d3.selectAll('#stackedRul *').each(function() {
         if(this.__transition__)
         this.__transition__.duration = 1;
         })
         }, 0)
         });
         */
        nv.utils.windowResize(chart.update);
/*
        document.getElementById("changeToRelId").onclick = function() {

            chartDataRul
                .datum([{"key":"A","values":[],"seriesIndex":0}])
                .call(chart);
            chartDataRul.datum([{"key":"A","values":[],"seriesIndex":0}]).call(chart);
            nv.utils.windowResize(chart.update);
            d3.select('#stackedRul').selectAll("*").remove();

        };
*/
        return chart;
    });

}

function runStackedRel(){
    var colors = d3.scale.category20();

    var chart;
    // Maintain an Instance of the SVG selection with its data
    var chartDataRel;


    nv.addGraph(function() {
        chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .controlLabels({stacked: "Stacked"})
            .duration(300).showLegend(false).style('expand');;


        chart.xAxis.tickFormat(d3.format('d'));
        chart.yAxis.tickFormat(d3.format(',.2f'));

        chartDataRel = d3.select('#stackedRel')
            .datum(fullTimeData.stackedRel)
            .transition().duration(100)
            .call(chart)
        /*
         .each('start', function() {
         setTimeout(function() {
         d3.selectAll('#stackedRel *').each(function() {
         if(this.__transition__)
         this.__transition__.duration = 1;
         })
         }, 0)
         });
         */
        nv.utils.windowResize(chart.update);

        return chart;
    });




}
function runStackedmRel(){
    var colors = d3.scale.category20();

    var chart;
    nv.addGraph(function() {
        chart = nv.models.stackedAreaChart()
            .useInteractiveGuideline(true)
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .controlLabels({stacked: "Stacked"})
            .duration(300).showLegend(false).style('expand');


        chart.xAxis.tickFormat(d3.format('d'));
        chart.yAxis.tickFormat(d3.format(',.2f'));

        d3.select('#stackedmRel')
            .datum(fullTimeData.stackedmRel)
            .transition().duration(1000)
            .call(chart)
            .each('start', function() {
                setTimeout(function() {
                    d3.selectAll('#stackedmRel *').each(function() {
                        if(this.__transition__)
                            this.__transition__.duration = 1;
                    })
                }, 0)
            });

        nv.utils.windowResize(chart.update);
        return chart;
    });
}


function runBubbles() {
    var tmpTop5=[];

    var BubbleChart, root,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    BubbleChart = (function() {
        function BubbleChart() {
            var data = [];

            for (var i = 0; i< sortAll.length; i++){
          //      if (sortAll[i][4] == "Christianity" || sortAll[i][4] == "Islam" || sortAll[i][4] == "Hinduism" || sortAll[i][4] == "Buddhism" || sortAll[i][4] == "Eastern" || sortAll[i][4] == "Judaism" )
                    data.push({
                        provB: sortAll[i][0],
                        rulB: sortAll[i][1],
                        culB: sortAll[i][2],
                        relB: sortAll[i][3],
                        mRelB: sortAll[i][4],
                        id: i,
                        capB: sortAll[i][5],
                        areB: sortAll[i][6],
                        popB: sortAll[i][7]
                    })

            }

            this.hide_details = __bind(this.hide_details, this);
            this.show_details = __bind(this.show_details, this);
            this.hide_years = __bind(this.hide_years, this);
            this.display_years = __bind(this.display_years, this);
            this.move_towards_year = __bind(this.move_towards_year, this);
            this.display_by_year = __bind(this.display_by_year, this);
            this.move_towards_center = __bind(this.move_towards_center, this);
            this.display_group_all = __bind(this.display_group_all, this);
            this.start = __bind(this.start, this);
            this.create_vis = __bind(this.create_vis, this);
            this.create_nodes = __bind(this.create_nodes, this);
            
            this.data = data;
            this.width = 500;
            this.height = 400;
            this.tooltip = CustomTooltip("gates_tooltip", 240);
            this.center = {
                x: this.width / 2,
                y: this.height / 2
            };
            this.year_centers = {
                "Christianity": {
                    x: this.width / 7,
                    y: this.height / 2
                },
                "Islam": {
                    x: 2* this.width / 7,
                    y: this.height / 2
                },
                "Hinduism": {
                    x: 3* this.width / 7,
                    y: this.height / 2
                },
                "Eastern": {
                    x: 4 * this.width / 7,
                    y: this.height / 2
                },
                "Buddhism": {
                    x: 5 * this.width / 7,
                    y: this.height / 2
                },
                "Judaism": {
                    x: 6 * this.width / 7,
                    y: this.height / 2
                }
            };
            this.layout_gravity = 0.05;
            this.damper = 0.1;
            this.vis = null;
            this.nodes = [];
            this.force = null;
            this.circles = null;
            this.fill_color = d3.scale.ordinal().domain(["low", "medium", "high"]).range(["#d84b2a", "#beccae", "#7aa25c"]);
            max_amount = d3.max(this.data, function(d) {
                return parseInt(d.popB);
            });
            this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 25]);
            this.create_nodes();
            this.create_vis();
        }

        BubbleChart.prototype.create_nodes = function() {
            

            /*
            this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 25]);
            */
            
            this.data.forEach((function(_this) {
                return function(d) {
                    var node;
                    node = {
                        id: d.id,
                        radius: _this.radius_scale(parseInt(d.popB)),
                        value: d.popB,
                        rulB: d.rulB,
                        provB: d.provB,
                        capB: d.capB,
                        culB: d.culB,
                        areB: d.areB,
                        relB: d.relB,
                        mRelB: d.mRelB,
                        x: Math.random() * 900,
                        y: Math.random() * 800
                    };

                    
                    return _this.nodes.push(node);
                };
            })(this));
            return this.nodes.sort(function(a, b) {
                return b.value - a.value;
            });
        };

        BubbleChart.prototype.create_vis = function() {
            var that;
            this.vis = d3.select("#bubbles_vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis");
            this.circles = this.vis.selectAll("circle").data(this.nodes, function(d) {
                return d.id;
            });
            that = this;
            this.circles.enter().append("circle").attr("r", 0).attr("fill", function(d) {
                return colorAreas[d.relB];//   _this.fill_color(d.relB);
            }).attr("stroke-width", 2).attr("stroke", function(d) {
                    return d3.rgb(colorAreas[d.relB]).darker();
                }).attr("id", function(d) {
                    return "bubble_" + d.id;
                }).on("mousedown", function(d, i) {                   
                    return  goToAll(d.provB);
                })

      //      <a class='centerClass' onclick='goToAll(&#39;"+key+"&#39;)'>center</a><a class='centerClass' onclick='detailsToAll(&#39;"+key+"&#39;)'>details</a>
                
                
                .on("mouseover", function(d, i) {
                    return that.show_details(d, i, this);
                }).on("mouseout", function(d, i) {
                    return that.hide_details(d, i, this);
                });
            return this.circles.transition().duration(2000).attr("r", function(d) {
                return d.radius;
            });
        };

        BubbleChart.prototype.charge = function(d) {
            return -Math.pow(d.radius, 2.0) / 8;
        };

        BubbleChart.prototype.start = function() {
            return this.force = d3.layout.force().nodes(this.nodes).size([this.width, this.height]);
        };

        BubbleChart.prototype.display_group_all = function() {
            this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
                return function(e) {
                    return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function(d) {
                        return d.x;
                    }).attr("cy", function(d) {
                            return d.y;
                        });
                };
            })(this));


            this.force.start();
            return this.hide_years();
        };

        BubbleChart.prototype.move_towards_center = function(alpha) {
            return (function(_this) {
                return function(d) {
                    d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
                    return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
                };
            })(this);
        };

        BubbleChart.prototype.display_by_year = function() {
            this.force.gravity(this.layout_gravity).charge(this.charge).friction(0.9).on("tick", (function(_this) {
                return function(e) {

                    _this.year_centers = {};

                    _this.year_centers[tmpTop5[0]] = {
                        x: _this.width / 6,
                        y: _this.height / 2
                    };
                    _this.year_centers[tmpTop5[1]] = {
                        x: 2*_this.width / 6,
                        y: _this.height / 2
                    };
                    _this.year_centers[tmpTop5[2]] = {
                        x: 3*_this.width / 6,
                        y: _this.height / 2
                    };
                    _this.year_centers[tmpTop5[3]] = {
                        x: 4*_this.width / 6,
                        y: _this.height / 2
                    };
                    _this.year_centers[tmpTop5[4]] = {
                        x: 5*_this.width / 6,
                        y: _this.height / 2
                    };
                    _this.year_centers["Other"] = {
                        x: 20*_this.width / 6,
                        y: _this.height / 2
                    };




                    return _this.circles.each(_this.move_towards_year(e.alpha))
                        .attr("cx", function(d) {
                        return d.x;
                        })
                        .attr("cy", function(d) {
                            return d.y;
                        });
                };
            })(this));
            this.force.start();
            return this.display_years();
        };

        BubbleChart.prototype.move_towards_year = function(alpha) {
            return (function(_this) {
                return function(d) {
                    var target;

                    switch($(".activeClustering").html()){
                        case "Main Religion":
                            target = _this.year_centers[(tmpTop5.indexOf(d.mRelB) > -1) ? d.mRelB : "Other"];
                            break;
                        case "Ruler":
                            target = _this.year_centers[(tmpTop5.indexOf(d.rulB) > -1) ? d.rulB : "Other"];
                            break;
                        case "Sub Religion":
                            target = _this.year_centers[(tmpTop5.indexOf(d.relB) > -1) ? d.relB : "Other"];
                            break;
                    }




                    d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
                    return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
                };
            })(this);
        };

        BubbleChart.prototype.display_years = function() {
            
            switch($(".activeClustering").html()){
                case "Main Religion":

                    sortmRel.sort(function(b, a) {return a[2] - b[2]})
                    tmpTop5 = [];
                    for (var l = 0; l<5; l++){
                        tmpTop5.push(sortmRel[l][0]);
                    }

                    break;
                case "Ruler":

                    sortRuler.sort(function(b, a) {return a[2] - b[2]})
                    tmpTop5 = [];
                    for (var l = 0; l<5; l++){
                        tmpTop5.push(sortRuler[l][0]);
                    }
                    break;
                case "Sub Religion":

                    sortRel.sort(function(b, a) {return a[2] - b[2]})
                    tmpTop5 = [];
                    for (var l = 0; l<5; l++){
                        tmpTop5.push(sortRel[l][0]);
                    }
                    break;
            }

            var years, years_data, years_x;
            years_x = {}
            years_x[tmpTop5[0]] = this.width / 6;
            years_x[tmpTop5[1]] = 2* this.width / 6;
            years_x[tmpTop5[2]] = 3* this.width / 6;
            years_x[tmpTop5[3]] = 4* this.width / 6;
            years_x[tmpTop5[4]] = 5* this.width / 6;
            years_x[tmpTop5[5]] = 10* this.width / 6;

            years_data = d3.keys(years_x);
            this.vis.selectAll(".years").remove()
                    
            years = this.vis.selectAll(".years").data(years_data);
                    
            return years.enter().append("text").attr("class", "years").attr("x", (function(_this) {
                    return function(d) {
                        return years_x[d];
                    };
            })(this)).attr("y", 40).attr("text-anchor", "middle").text(function(d) {
                if(d==""){ 
                    if ($(".activeClustering").html() == "Ruler") return "unruled";
                    else if ($(".activeClustering").html() == "Culture") return "no culture";
                    else if ($(".activeClustering").html() == "Religion") return "no religion";
                
                }
                else{
                if (d.length<13) return d;
                else return d.substring(0,10)+"..";
                }
                
                return d;
            });
            
        };

        BubbleChart.prototype.hide_years = function() {
            var years;
            return years = this.vis.selectAll(".years").remove();
        };

        BubbleChart.prototype.show_details = function(data, i, element) {
            var content;
            d3.select(element).attr("stroke", "black");
            content = "<span class=\"name\">Province:</span><span class=\"value\"> " + data.provB + "</span><br/>";
            content += "<span class=\"name\">Capital:</span><span class=\"value\"> " + data.capB + "</span><br/>";
            content += "<span class=\"name\">Ruler:</span><span class=\"value\"> " + data.rulB + "</span><br/>";
            content += "<span class=\"name\">Culture:</span><span class=\"value\"> " + data.culB + "</span><br/>";
            content += "<span class=\"name\">Sub-Religion:</span><span class=\"value\"> " + data.relB + "</span><br/>";
            content += "<span class=\"name\">Religion:</span><span class=\"value\"> " + data.mRelB + "</span><br/>";
            content += "<span class=\"name\">Area:</span><span class=\"value\"> " +  (addCommas(data.areB)) + "</span><br/>";
            content += "<span class=\"name\">Population:</span><span class=\"value\"> " + (addCommas(data.value)) + "</span>";
            return this.tooltip.showTooltip(content, d3.event);
        };

        BubbleChart.prototype.hide_details = function(data, i, element) {
            d3.select(element).attr("stroke", (function(_this) {
                return function(d) {
                    
                    switch ($(".activeColoring").html()){
                        case "Ruler":
                           
                            return  d3.rgb(colorAreas[d.rulB]).darker();
                            break;
                        case "Culture":
                            
                            return d3.rgb(colorAreas[d.culB]).darker();
                            break;
                        case "Religion":
                            
                            return d3.rgb(colorAreas[d.relB]).darker();
                            break;
                        case "Main Religion":
                            
                            return d3.rgb(colorAreas[d.mRelB]).darker();
                            break;
                    }
                    
                };
            })(this));
            return this.tooltip.hideTooltip();
        };

        return BubbleChart;

    })();

    root = typeof exports !== "undefined" && exports !== null ? exports : this;

    $(function() {
        var chart, loadData,reloadData;
        chart = null;

        root.render_vis = function() {
            chart = new BubbleChart();
            chart.start();
            return root.display_all();
        };

        root.loadData = function(_this) {
            //    console.debug(chart);
            //    d3.select("#bubbles_vis").selectAll("svg").remove();
            //    d3.select("#gates_tooltip").remove();
            root.render_vis();
            //    console.debug(chart.nodes);
            /*       
             for(var i=0; i<chart.nodes.length; i++){
             chart.nodes[i].mRelB = "Christianity";
             }
             */
            //    return function() {
            return chart.display_group_all();
            //     };

        }

        root.reloadData = function(_this) {
            sortAll.sort(function(b, a) {return a[7] - b[7]})

           max_amount = sortAll[0][7];
            chart.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([2, 25]);
           /*d3.max(this.data, function(d) {
                return parseInt(d.popB);
            });
            */
        //    console.debug("recreating max with this.data",sortAll[0][7])
            //United States of America

            var sortLength = sortAll.length-1;
            for(var i=0; i<chart.nodes.length; i++){
    //            console.debug("updating ", chart.nodes[i].provB, sortAll[i][0])
                
                if (sortLength < i){
                    chart.nodes[i].provB= "",
                    chart.nodes[i].rulB= "",
                    chart.nodes[i].culB= "",
                    chart.nodes[i].relB= "",
                    chart.nodes[i].mRelB= "",
                    chart.nodes[i].capB= "",
                    chart.nodes[i].areB= 0,
                    chart.nodes[i].value= 0

                    chart.nodes[i].radius  = chart.radius_scale(0);
                }
                else {
                    chart.nodes[i].provB= sortAll[i][0],
                    chart.nodes[i].rulB= sortAll[i][1],
                    chart.nodes[i].culB= sortAll[i][2],
                    chart.nodes[i].relB= sortAll[i][3],
                    chart.nodes[i].mRelB= sortAll[i][4],
                    chart.nodes[i].capB= sortAll[i][5],
                    chart.nodes[i].areB= sortAll[i][6],
                    chart.nodes[i].value= sortAll[i][7]

                    chart.nodes[i].radius  = chart.radius_scale(parseInt(sortAll[i][7])); 
                }
                
                
            }
            
            $(".activeClustering").click()
            $(".activeColoring").click()


        }

        root.display_all = (function(_this) {
            return function() {
                return chart.display_group_all();
            };
        })(this);
        root.display_year = (function(_this) {
            return function() {
                return chart.display_by_year();
            };
        })(this);
        root.toggle_view = (function(_this) {
            return function(view_type) {
                if (view_type === 'allClustering') {
                    return root.display_all();
                } else {
                    return root.display_year();
                }
            };
        })(this);
        //  return d3.csv("data/gates_money.csv", render_vis);
    })
    ;

    loadData();
} //).call(this);

function compareLast(source, key){
    if (source.substr(source.length-key.length) === key)
        return true;
    else
        return false;
}

