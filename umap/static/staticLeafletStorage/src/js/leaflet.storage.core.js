/* Poor man pub/sub handler, enough for now */
var allowEdit;
var moderatorEmail;
L.StorageSingleton = L.Class.extend({
    includes: L.Mixin.Events
});
L.Storage = new L.StorageSingleton();
L.S = L.Storage;
L.Storage.Map = L.Map.extend({});

/*
* Utils
*/
L.Util.queryString = function (name, fallback) {
    var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, ' ')); };
    var qs = window.location.search.slice(1).split('&'), qa = {};
    for(var i in qs) {
        var key = qs[i].split('=');
        if (!key) continue;
        qa[decode(key[0])] = key[1] ? decode(key[1]) : 1;
    }
    return qa[name] || fallback;
};

L.Util.booleanFromQueryString = function (name) {
    var value = L.Util.queryString(name);
    return value === '1' || value === 'true';
};

L.Util.setFromQueryString = function (options, name) {
    var value = L.Util.queryString(name);
    if (typeof value !== 'undefined') {
        options[name] = value;
    }
};

L.Util.setBooleanFromQueryString = function (options, name) {
    var value = L.Util.queryString(name);
    if (typeof value !== 'undefined') {
        options[name] = value == '1' || value == 'true';
    }
};
L.Util.escapeHTML = function (s) {
    s = s? s.toString() : '';
    return s.replace(/</gm, '&lt;');
};
L.Util.toHTML = function (r) {
    var ii;

    r.replace(/\r\n\r\n/g, '');
    
    // detect newline format
    var newline = r.indexOf('\r\n') != -1 ? '\r\n' : r.indexOf('\n') != -1 ? '\n' : '';

    // Escape tags
    r = r.replace(/</gm, '&lt;');


    // headings and hr
    r = r.replace(/^### (.*)/gm, '<h5>$1</h5>');
    r = r.replace(/^## (.*)/gm, '<h4>$1</h4>');
    r = r.replace(/^# (.*)/gm, '<h3>$1</h3>');
    r = r.replace(/^---/gm, '<hr>');

    // bold, italics
    r = r.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    r = r.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // unordered lists
    r = r.replace(/^\*\* (.*)/gm, '<ul><ul><li>$1</li></ul></ul>');
    r = r.replace(/^\* (.*)/gm, '<ul><li>$1</li></ul>');

    for (ii = 0; ii < 3; ii++) r = r.replace(new RegExp('</ul>' + newline + '<ul>', 'g'), newline);
    


    // links
    r = r.replace(/(\[\[http)/g, '[[h_t_t_p');  // Escape for avoiding clash between [[http://xxx]] and http://xxx
    r = r.replace(/({{http)/g, '{{h_t_t_p');
    r = r.replace(/(https?:[^ \)\n]*)/g, '<a target="_blank" href="$1">$1</a>');
    r = r.replace(/\[\[(h_t_t_ps?:[^\]|]*?)\]\]/g, '<a target="_blank" href="$1">$1</a>');
    r = r.replace(/\[\[(h_t_t_ps?:[^|]*?)\|(.*?)\]\]/g, '<a target="_blank" href="$1">$2</a>');
    r = r.replace(/\[\[([^\]|]*?)\]\]/g, '<a href="$1">$1</a>');
    r = r.replace(/\[\[([^|]*?)\|(.*?)\]\]/g, '<a href="$1">$2</a>');

    // iframe
    r = r.replace(/{{{(h_t_t_ps?[^ |]*)}}}/g, '<iframe frameBorder="0" src="$1" width="100%" height="300px"></iframe>');
    r = r.replace(/{{{(h_t_t_ps?[^ |]*)\|(\d*?)}}}/g, '<iframe frameBorder="0" src="$1" width="100%" height="$2px"></iframe>');

    //var wikiURLtmp = $1;
    //wikiURLtmp = "http"+ data.wikiUrl.substr(7);

    r = r.replace("WikiURL", "http");
    
    if(r.indexOf("WikiYear") != -1){
        r = r.replace("WikiYear", "http");

        // chronas year iframes
        r = r.replace(/(http?:[^ \)\n]*)/g, '<img id="loader1" src="/static/staticReqs/customIcons/loadingCA.gif" width="96" height="96" alt="loading gif" style="opacity: 0.6"/>  <iframe id="chronasWiki" class="wikiYear" src="$1" height="100%" frameborder="0" >        &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;    </iframe>');
    }
    else if (allowEdit){
        provNameEditList=[];
        r = r.replace(/(http?:[^ \n]*)/g, '<div id="overview" style="display: none; text-align: center;"> <h1> Overview</h1><br>-> <h2 id="regionSpec" style="font-style: italic; cursor: pointer; "></h2> <br></br> with the culture -> <span style="font-style: italic; cursor: pointer;" id="cultureSpec"></span><br> and the religion -> <span style="font-style: italic; cursor: pointer;" id="religionSpec"></span> ( -> <span style="font-style: italic; cursor: pointer;" id="mainRelSpec"></span> ) <br> has a total population of <span style="font-style: italic; cursor: pointer;" id="populationSpec"></span> <br> with the capital -> <span style="font-style: italic; cursor: pointer;" id="capitalSpec""></span> <br> and is ruled by -> <span style="font-style: italic; cursor: pointer;" id="rulerSpec"></span> <br> </div>' +
            '' +
            '<img id="loader1" src="/static/staticReqs/customIcons/loadingCA.gif"  style="opacity: 0.6" width="96" height="96" alt="loading gif"/> <div id="specific" style="display: block;"> <div style="display: none; text-align: center;" id="notFoundNotice">[no Wikipedia page linked for entry "<span id="missingEntry"></span>", contribute and click <strong>here</strong> to make a suggestion]</div><div class="headerEdits"  style="display: none;"><button id="areaEditBtn" onclick="openEdit(\'Area\')" title="Edit Area" type="submit" class="btn btn-default lowerButton active"> Edit Area </button>&nbsp;<button style="display:none" id="markerEditBtn" onclick="openEdit(\'Marker\')" title="Edit Marker" type="submit" class="btn btn-default lowerButton"> Edit Marker </button>&nbsp;<button id="metaEditBtn" onclick="openEdit(\'Meta\')" title="Edit Meta" type="submit" class="btn btn-default lowerButton"> Edit Meta </button></div>' +

            '<div style="display: none;" id="reportBetaText"><h2 id="EditProvName">Editing Area</h2> <li class="divider"></li>' +
            'Dear user <strong>'+moderatorEmail+'</strong>, before you submit your changes, understand that data will be <span style="color: red;">overwritten</span> which is not easily recoverable. Therefore it is very important that you cross-check your input and submit carefully.</a> <li class="divider"></li> <br> <p> Select the new data in the according fields and the time span it applies to. Fill only the fields which you want to change.</p><br> <table style="width:350px"> <tbody> <tr> <td style=" width: 80px;">Ruler</td> <td colspan="2"><input  id="EditProvRul" type="text" placeholder="No Change"></td> </tr> <tr> <td>Culture</td> <td colspan="2"><input  id="EditProvCul" type="text" placeholder="No Change"></td> </tr> <tr> <td>Religion</td> <td colspan="2"><input  id="EditProvRel" type="text" placeholder="No Change"></td> </tr> <tr> <td>Capital</td> <td colspan="2"><input  id="EditProvCap" type="text" placeholder="No Change"></td> </tr> <tr> <td>Population</td> <td colspan="2"><input type="number" id="EditProvPop" min="1" max="2000" step="1" placeholder="No Change"></td> </tr> </tbody></table> <br>' +
            'Applies from year <input style=" width: 65px; padding-right: 0; " type="number" id="sinceYear"  step="1" min="1" max="2000" value=newYear> until <input style=" width: 65px; padding-right: 0; " type="number" id="untilYear" min="1" max="2000" step="1"  value=newYear>' +
            '<p style=" margin-top: 2em; ">To the following province(s): </p> </p><p> <span id="htmlProvList">' +
            '</span></p><p style=" clear: both; padding-top: 0.5em; "><i>Add more provinces by clicking on the map</i></p>' +
            ' <ul class="nav nav-list tree" style="display: block;"></ul><br><br> <button type="button" onclick="submitProvEdit()" class="btn btn-default">Submit</button>' +
            '<button type="button" onclick="$(\'.report\').parent().click()" class="btn btn-default">Back</button> <br><p id="EditLog" style=" margin: 10px 0 10px; "></p></div> ' +



            '<div style="display: none;" id="markerBetaText"><h2 id="EditMarkerName">Editing Marker</h2> <li class="divider"></li>' +
            'Dear user <strong>'+moderatorEmail+'</strong>, before you submit your changes, understand that data will be <span style="color: red;">overwritten</span> which is not easily recoverable. Therefore it is very important that you cross-check your input and submit carefully.</a></strong> <li class="divider"></li> <br> <p> Select the new data in the according fields and the time span it applies to. Fill only the fields which you want to change.</p><br> <table style="width:350px"> <tbody> <tr> <td style=" width: 80px;">Ruler</td> <td colspan="2"><input  id="EditProvRul" type="text" placeholder="No Change"></td> </tr> <tr> <td>Culture</td> <td colspan="2"><input  id="EditProvCul" type="text" placeholder="No Change"></td> </tr> <tr> <td>Religion</td> <td colspan="2"><input  id="EditProvRel" type="text" placeholder="No Change"></td> </tr> <tr> <td>Capital</td> <td colspan="2"><input  id="EditProvCap" type="text" placeholder="No Change"></td> </tr> <tr> <td>Population</td> <td colspan="2"><input type="number" id="EditProvPop" min="1" max="2000" step="1" placeholder="No Change"></td> </tr> </tbody></table> <br>' +
            'Applies from year <input style=" width: 65px; padding-right: 0; " type="number" id="sinceYear"  step="1" min="1" max="2000" value=newYear> until <input style=" width: 65px; padding-right: 0; " type="number" id="untilYear" min="1" max="2000" step="1"  value=newYear>' +
            '<p style=" margin-top: 2em; ">To the following province(s): </p> </p><p> <span id="htmlProvList">' +
            '</span></p><p style=" clear: both; padding-top: 0.5em; "><i>Add more provinces by clicking on the map</i></p>' +
            ' <ul class="nav nav-list tree" style="display: block;"></ul><br><br> <button type="button" onclick="submitProvEdit()" class="btn btn-default">Submit</button>' +
            '<button type="button" onclick="$(\'.report\').parent().click()" class="btn btn-default">Back</button> <br><p id="EditLog" style=" margin: 10px 0 10px; "></p></div> ' +



            '<div style="display: none;" id="metaBetaText"><h2 id="EditMetaName">Editing Meta</h2> <li class="divider"></li>' +
            'Dear user <strong>'+moderatorEmail+'</strong>, before you submit your changes, understand that data will be <span style="color: red;">overwritten</span> which is not easily recoverable. Therefore it is very important that you cross-check your input and submit carefully.</a></strong> <li class="divider"></li> <br><h3>Add New Meta Entities</h3> <p> Select the new data in the according fields and the time span it applies to. Fill only the fields which you want to change.</p> <table style="width:80%"> <tbody> <tr> <td style=" width: 120px;">Add new Ruler</td> <td colspan="2"><input  id="AddMetaRul" type="text" placeholder="Displayed Name"></td> <td ><input class="colorRulAdd" type="color" value="'+getRandomColor()+'"></td><td><input  id="AddRulURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Add new Culture</td> <td colspan="2"><input  id="AddMetaCul" type="text" placeholder="Displayed Name"></td> <td ><input class="colorCulAdd" type="color" value="'+getRandomColor()+'"></td><td><input  id="AddCulURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Add new Religion</td> <td colspan="1"><input  id="AddMetaRel" type="text" placeholder="Displayed Name"></td><td colspan="1"><input id="AddMetamRel" type="text" placeholder="Main Religion"></td> <td><input class="colorRelAdd" type="color" value="'+getRandomColor()+'"></td> <td><input  id="AddRelURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Add new Capital</td> <td colspan="2"><input  id="AddMetaCap" type="text" placeholder="Displayed Name"></td> <td></td><td><input  id="AddCapURL" type="text" placeholder="Full Wikipedia URL"></td></tr> </tbody></table> <br>' +
            'or<h3>Edit Meta Entities</h3> <p> Select the entity you want to change an attribute of by typing in the according field.</p> <table style="width:80%"> <tbody> <tr> <td style=" width: 120px;">Edit a Ruler</td> <td colspan="1"><input  id="EditMetaRul" type="text" placeholder="Displayed Name"></td><td colspan="1"><input  id="EditMetaRulNew" type="text" placeholder="New Name"></td><td><input class="colorRulEdits" type="color" value="#efefef" disabled=""></td> <td><input  id="EditRulURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Edit a Culture</td> <td colspan="1"><input  id="EditMetaCul" type="text" placeholder="Displayed Name"></td><td colspan="1"><input  id="EditMetaCulNew" type="text" placeholder="New Name"></td><td ><input class="colorCulEdits" type="color" value="#efefef" disabled=""></td> <td><input  id="EditCulURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Edit a Religion</td> <td colspan="1"><input  id="EditMetaRel" type="text" placeholder="Displayed Name"></td><td colspan="1"><input  id="EditMetaRelNew" type="text" placeholder="New Name"></td><td ><input class="colorRelEdits" type="color"  value="#efefef" disabled=""></td> <td><input  id="EditRelURL" type="text" placeholder="Full Wikipedia URL"></td></tr> <tr> <td>Edit a Capital</td> <td colspan="1"><input  id="EditMetaCap" type="text" placeholder="Displayed Name"></td> <td colspan="1"><input  id="EditMetaCapNew" type="text" placeholder="New Name"></td> <td></td><td><input  id="EditCapURL" type="text" placeholder="Full Wikipedia URL"></td></tr> </tbody></table> <br>' +
            ' <ul class="nav nav-list tree" style="display: block;"></ul><br> <button type="button" onclick="submitAddMeta()" class="btn btn-default">Submit</button>' +
            '<button type="button" onclick="$(\'.report\').parent().click()" class="btn btn-default">Back</button> <br><p id="EditMetaLog" style=" margin: 10px 0 10px; "></p></div> ' +







            '<iframe id="chronasWiki" src="$1" onload="$(\'#loader1\').hide();" height="100%" frameborder="0" >        &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;    </iframe></div>');
    }
    else{
    // chronas iframes
    r = r.replace(/(http?:[^ \n]*)/g, '<div id="overview" style="display: none;"> <h1> Overview</h1><br>-> <h2 id="regionSpec" style="font-style: italic; cursor: pointer; "></h2> <br></br> with the culture -> <span style="font-style: italic; cursor: pointer;" id="cultureSpec"></span><br> and the religion -> <span style="font-style: italic; cursor: pointer;" id="religionSpec"></span> ( -> <span style="font-style: italic; cursor: pointer;" id="mainRelSpec"></span> ) <br> has a total population of <span style="font-style: italic; cursor: pointer;" id="populationSpec"></span> <br> with the capital -> <span style="font-style: italic; cursor: pointer;" id="capitalSpec""></span> <br> and is ruled by -> <span style="font-style: italic; cursor: pointer;" id="rulerSpec"></span> <br> </div>' +
        '' +
        '<img id="loader1" src="/static/staticReqs/customIcons/loadingCA.gif"  style="opacity: 0.6" width="96" height="96" alt="loading gif"/> <div id="specific" style="display: block;"> <div style="display: none; text-align: center;" id="notFoundNotice">[no Wikipedia page linked for entry "<span id="missingEntry"></span>", contribute and click <strong>here</strong> to make a suggestion]</div><div style="display: none;" id="reportBetaText"><h2>Something wrong with the data?</h2> <br><strong>Edit the data: Become a moderator!</strong> <li class="divider"></li> <br> If you are interested in helping this project, <a target="_blank", href="http://www.chronas.org/join">become a member of Chronas</a> and tick the <i>Generally interested in moderating</i> and <i>Moderate history data</i> box in your <a target="_blank", href="http://www.chronas.org/me">profile</a>. <br> We will send you an email and create a privileged account for you. <br>' +
        'You already have moderator privileges? <a target="_blank", href="http://www.chronas.org/app/admin/">Log in to the application</a> and reload this page. <br><br>If you notice mistakes and do not want to become a moderator, you can also create a thread in the <a target="_blank", href="http://www.chronas.org/talk">talk</a> section.<br><br> <button type="button" onclick="$(\'.report\').parent().click()" class="btn btn-default">Back</button></div> <iframe id="chronasWiki" src="$1" onload="$(\'#loader1\').hide();" height="100%" frameborder="0" >        &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;    </iframe></div>');
    }

    // images
    r = r.replace(/{{([^\]|]*?)}}/g, '<img src="$1">');
    r = r.replace(/{{([^|]*?)\|(\d*?)}}/g, '<img src="$1" width="$2">');

    //Unescape http
    r = r.replace(/(h_t_t_p)/g, 'http');

    // Preserver line breaks
    if (newline) r = r.replace(new RegExp(newline + '(?=[^]+)', 'g'), '<br>' + newline);

    /*
        Include here
        
     <iframe src="http://en.m.wikipedia.org/wiki/Timurid_dynasty" height="700px" width="100%">
     &lt;p&gt;Your browser does not support iframes.&lt;/p&gt;
     </iframe>
    
     */
    return r;
};
L.Util.isObject = function (what) {
    return typeof what === 'object' && what !== null;
};
L.Util.latLngsForGeoJSON = function (latlngs) {
    coords = [];
    for(var i = 0, len = latlngs.length; i < len; i++) {
        coords.push([
            latlngs[i].lng,
            latlngs[i].lat
        ]);
    }
    return coords;
};
L.Util.CopyJSON = function (geojson) {
    
    return JSON.parse(JSON.stringify(geojson));
    
};
L.Util.detectFileType = function (f) {
    var filename = f.name ? escape(f.name.toLowerCase()) : '';
    function ext(_) {
        return filename.indexOf(_) !== -1;
    }
    if (f.type === 'application/vnd.google-earth.kml+xml' || ext('.kml')) {
        return 'kml';
    }
    if (ext('.gpx')) return 'gpx';
    if (ext('.geojson') || ext('.json')) return 'geojson';
    if (f.type === 'text/csv' || ext('.csv') || ext('.tsv') || ext('.dsv')) {
        return 'csv';
    }
    if (ext('.xml') || ext('.osm')) return 'osm';
};

L.Util.usableOption = function (options, option) {
    return typeof options[option] !== 'undefined' && options[option] !== '' && options[option] !== null;
};

L.Util.greedyTemplate = function (str, data, ignore) {
    if(data.wikiUrl && data.wikiUrl.substring(0,4) == "http" ){
        data.wikiUrl = "WikiURL"+ data.wikiUrl.substr(4) + "?printable=yes";
    } else if ( data.wikiUrl && data.wikiUrl.substring(0,7) != "WikiURL" ){
        data.wikiUrl = "WikiURL://en.wikipedia.org/wiki/"+ data.wikiUrl + "?printable=yes";
    } else if ( data.Url && data.Url.substring(0,4) == "http" ){
        data.wikiUrl = "WikiURL"+ data.Url.substr(4) + "?printable=yes";
    } else if ( data.Url && data.Url.substring(0,7) != "WikiURL" ){
    data.wikiUrl = "WikiURL://en.wikipedia.org/wiki/"+ data.Url + "?printable=yes";
    }
    
    
    // Don't throw error if some key is missing
    return str.replace(/\{ *([\w_\:]+) *\}/g, function (str, key) {
        var value = data[key];
        if (value === undefined) {
            if (ignore) value = str;
            else value = '';
        }
        return value;
    });
};

L.Util.sortFeatures = function (features, sortKey) {
    var sortKeys = (sortKey || 'name').split(',');

    var sort = function (a, b, i) {
            var sortKey = sortKeys[i], score,
                valA = a.properties[sortKey] || '',
                valB = b.properties[sortKey] || '';
            if (!valA) {
                score = -1;
            } else if (!valB) {
                score = 1;
            } else {
                score = valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase());
            }
            if (score === 0 && sortKeys[i + 1]) return sort(a, b, i + 1);
            return score;
    };

    features.sort(function (a, b) {
        if (!a.properties || !b.properties) {
            return 0;
        }
        return sort(a, b, 0);
    });


    return features;
};



L.DomUtil.add = function (tagName, className, container, content) {
    var el = L.DomUtil.create(tagName, className, container);
    if (content) {
        if (content.nodeType && content.nodeType === 1) {
            el.appendChild(content);
        }
        else {
            el.innerHTML = content;
        }
    }
    return el;
};

L.DomUtil.createFieldset = function (container, legend) {
    var fieldset = L.DomUtil.create('fieldset', 'toggle', container);
    var legendEl = L.DomUtil.add('legend', 'style_options_toggle', fieldset, legend);
    L.DomEvent.on(legendEl, 'click', function () {
        if (L.DomUtil.hasClass(fieldset, 'on')) {
            L.DomUtil.removeClass(fieldset, 'on');
        } else {
            L.DomUtil.addClass(fieldset, 'on');
        }
    });
    return fieldset;
};

L.DomUtil.classIf = function (el, className, bool) {
    if (bool) {
        L.DomUtil.addClass(el, className);
    } else {
        L.DomUtil.removeClass(el, className);
    }
};


L.DomUtil.element = function (what, attrs, parent) {
    var el = document.createElement(what);
    for (var attr in attrs) {
        el[attr] = attrs[attr];
    }
    if (typeof parent !== 'undefined') {
        parent.appendChild(el);
    }
    return el;
};


L.DomUtil.before = function (target, el) {
    target.parentNode.insertBefore(el, target);
    return el;
};

L.DomUtil.after = function (target, el)
{
    target.parentNode.insertBefore(el, target.nextSibling);
    return el;
};

L.DomUtil.RGBRegex = /rgb *\( *([0-9]{1,3}) *, *([0-9]{1,3}) *, *([0-9]{1,3}) *\)/;

L.DomUtil.TextColorFromBackgroundColor = function (el) {
    var out = '#000000';
    if (!window.getComputedStyle) {return out;}
    var rgb = window.getComputedStyle(el).getPropertyValue('background-color');
    rgb = L.DomUtil.RGBRegex.exec(rgb);
    if (!rgb || rgb.length != 4) {return out;}
    rgb = parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10);
    if (rgb < (255 * 3 / 2)) {
        out = '#ffffff';
    }
    return out;
};


/*
* Global events
*/
L.S.Keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    APPLE: 91,
    SHIFT: 16,
    ALT: 17,
    CTRL: 18,
    E: 69,
    H: 72,
    I: 73,
    L: 76,
    M: 77,
    P: 80,
    S: 83,
    Z: 90
};
L.S._onKeyDown = function (e) {
    if (e.keyCode == L.S.Keys.ESC) {
        L.S.fire('ui:end');
    }
};
L.DomEvent.addListener(document, 'keydown', L.S._onKeyDown, L.S);


L.Storage.Help = L.Class.extend({

    initialize: function (map) {
        this.map = map;
        this.parentContainer = L.DomUtil.create('div', 'storage-help-container', document.body);
        this.overlay = L.DomUtil.create('div', 'storage-help-overlay', this.parentContainer);
        this.box = L.DomUtil.create('div', 'storage-help-box', this.parentContainer);
        var closeLink = L.DomUtil.create('a', 'storage-close-link', this.box);
        closeLink.href = '#';
        L.DomUtil.add('i', 'storage-close-icon', closeLink);
        var label = L.DomUtil.create('span', '', closeLink);
        label.title = label.innerHTML = L._('Close');
        this.content = L.DomUtil.create('div', 'storage-help-content', this.box);
        
        L.DomEvent.on(closeLink, 'click', function(){


            if($(".headerEdits").is(":visible") ){
                $("#reportBetaText").hide()
                $(".headerEdits").hide()
            }
            
            if ($("#storage-ui-container")[0].style.width == "100%"){
                $("#storage-ui-container")[0].style.width = "50%";
                $("#map")[0].style.display = "block";
                $(".fullWidth")[0].innerHTML = "Full width";
                $("iframe")[0].src =$("iframe")[0].src.replace("?printable=yes","");
            }

            this.hide()


        }, this);
        L.DomEvent.addListener(this.parentContainer, 'keydown', this.onKeyDown, this);
    },

    onKeyDown: function (e) {
        var key = e.keyCode,
            ESC = 27;
        if (key == ESC) {
            this.hide();
        }
    },

    show: function () {
        this.content.innerHTML = '';
        for (var i = 0, name; i < arguments.length; i++) {
            name = arguments[i];
            L.DomUtil.add('div', '', this.content, this.resolve(name));
        }
        L.DomUtil.addClass(document.body, 'storage-help-on');
    },

    hide: function () {

        L.DomUtil.removeClass(document.body, 'storage-help-on');
    },

    resolve: function (name) {
        return typeof this[name] === 'function' ? this[name]() : this[name];
    },

    button: function (container, entries) {
        var helpButton = L.DomUtil.create('a', 'storage-help-button', container);
        helpButton.href = '#';
        if (entries) {
            L.DomEvent
                .on(helpButton, 'click', L.DomEvent.stop)
                .on(helpButton, 'click', function (e) {
                    var args = typeof entries === 'string'? [entries] : entries;
                    this.show.apply(this, args);
                }, this);
        }
        return helpButton;
    },

    edit: function () {
        var container = L.DomUtil.create('div', ''),
            self = this,
            title = L.DomUtil.create('h3', '', container),
            actionsContainer = L.DomUtil.create('ul', 'storage-edit-actions', container);
        var addAction = function (action) {
            var actionContainer = L.DomUtil.add('li', action.className, actionsContainer, action.title);
            L.DomEvent.on(actionContainer, 'click', action.callback, action.context);
            L.DomEvent.on(actionContainer, 'click', self.hide, self);
        };
        title.innerHTML = L._('Where do we go from here?');
        var actions = this.map.getEditActions();
        actions.unshift(
            {
                title: L._('Draw a polyline') + ' (Ctrl+L)',
                className: 'storage-draw-polyline',
                callback: function () {this.hide(); this.map.startPolyline();},
                context: this
            },
            {
                title: L._('Draw a polygon') + ' (Ctrl+P)',
                className: 'storage-draw-polygon',
                callback: function () {this.hide(); this.map.startPolygon();},
                context: this
            },
            {
                title: L._('Draw a marker') + ' (Ctrl+M)',
                className: 'storage-draw-marker',
                callback: function () {this.hide(); this.map.startMarker();},
                context: this
            }
        );
        for (var i = 0; i < actions.length; i++) {
            addAction(actions[i]);
        }
        return container;
    },

    importFormats: function () {
        var container = L.DomUtil.create('div');
        L.DomUtil.add('h3', '', container,'GeojSON');
        L.DomUtil.add('p', '', container, L._('All properties are imported.'));
        L.DomUtil.add('h3', '', container,'GPX');
        L.DomUtil.add('p', '', container, L._('Properties imported:') + 'name, desc');
        L.DomUtil.add('h3', '', container,'KML');
        L.DomUtil.add('p', '', container, L._('Properties imported:') + 'name, description');
        L.DomUtil.add('h3', '', container,'CSV');
        L.DomUtil.add('p', '', container, L._('Comma, tab or semi-colon separated values. SRS WGS84 is implied. Only Point geometries are imported. The import will look at the column headers for any mention of «lat» and «lon» at the begining of the header, case insensitive. All other column are imported as properties.'));
        return container;
    },

    textFormatting: function () {
        var container = L.DomUtil.create('div'),
            title = L.DomUtil.add('h3', '', container, L._('Text formatting')),
            elements = L.DomUtil.create('ul', '', container);
        L.DomUtil.add('li', '', elements, L._('*simple star for italic*'));
        L.DomUtil.add('li', '', elements, L._('**double star for bold**'));
        L.DomUtil.add('li', '', elements, L._('# one hash for main heading'));
        L.DomUtil.add('li', '', elements, L._('## two hashes for second heading'));
        L.DomUtil.add('li', '', elements, L._('### three hashes for third heading'));
        L.DomUtil.add('li', '', elements, L._('Simple link: [[http://example.com]]'));
        L.DomUtil.add('li', '', elements, L._('Link with text: [[http://example.com|text of the link]]'));
        L.DomUtil.add('li', '', elements, L._('Image: {{http://image.url.com}}'));
        L.DomUtil.add('li', '', elements, L._('Image with custom width (in px): {{http://image.url.com|width}}'));
        L.DomUtil.add('li', '', elements, L._('Iframe: {{{http://iframe.url.com}}}'));
        L.DomUtil.add('li', '', elements, L._('Iframe with custom height (in px): {{{http://iframe.url.com|height}}}'));
        L.DomUtil.add('li', '', elements, L._('--- for an horizontal rule'));
        return container;
    },

    dynamicProperties: function () {
        var container = L.DomUtil.create('div');
        L.DomUtil.add('h3', '', container, L._('Dynamic properties'));
        L.DomUtil.add('p', '', container, L._('Use placeholders with feature properties between brackets, eg. &#123;name&#125;, they will be dynamically replaced by the corresponding values.'));
        return container;
    },

    formatURL: L._('Supported variables that will be dynamically replaced') + ': {bbox}, {lat}, {lng}, {zoom}, {east}, {north}..., {left}, {top}...',
    formatIconURL: L._('You can use feature properties as variables: ex.: with "http://myserver.org/images/{name}.png", the {name} variable will be replaced by the "name" value of each markers.')

});


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}