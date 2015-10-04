var currSearchKey = "";
var oldSearchKey = "";
function openDatatable(searchKey){
    if ($("#hierarchyForms").css("display") == "none"){
        $(".storage-browse-hierarchy")[0].click();
        $("#allProvinces")[0].click();
        oldSearchKey = currSearchKey;
        fulTable.fnFilter(searchKey);
    } else if(oldSearchKey !== currSearchKey) {
        fulTable.fnFilter(searchKey);
        oldSearchKey = currSearchKey;
    } else {
        $(".storage-browse-hierarchy")[0].click();
    }
    
}
    function openReportDisclaimer(){
        if($("#reportBetaText").is(":visible") ){
            $("#chronasWiki").show()
            $("#reportBetaText").hide()
        }
        else{
            $("#chronasWiki").hide()
            $("#reportBetaText").show()
        }
    }
    function  openfullWidth(){
    
    $('#chronasWiki').hide();
    $('#notFoundNotice').hide();
    console.debug("hiding notice 0")
    
    var tmpSource =  $("iframe")[0].src; //.replace("?printable=yes","");

 //   $('#chronasWiki').hide();
    if ($("#storage-ui-container")[0].style.width != "100%"){
        
        
        $("#storage-ui-container").addClass("fullWidthContainer")
        $(".overviewContainer").css("margin-left", "6px")
/*
        $("#storage-ui-container").css("background","white");
        $("#storage-ui-container")[0].style.padding = "0 0px 23px 0px";
        */
        
        $("iframe")[0].style.width = "100%";

        $("iframe")[0].src = tmpSource.replace("?printable=yes","");      
        
        console.debug("1source now: ",$("iframe")[0].src )
        
        $("#storage-ui-container")[0].style.width = "100%";
        $("#map")[0].style.display = "none";

        $(".fullWidth")[0].title = "Toggle half width";
        $(".fullWidth").addClass("halfWidth")
        $(".fullWidth").removeClass("fullWidth")
        
        $('#chronasWiki').load(function(){

            console.debug("!x!   finished loading");
            if($("iframe")[0].src != 'http://en.wikipedia.org/wiki/' && $("iframe")[0].src != 'http://en.wikipedia.org/wiki/?printable=yes'){
                $('#notFoundNotice').hide()
                $('#loader1').hide()
                $('#chronasWiki').show();
                console.debug($("iframe")[0].src,"hiding notice 1")
            } else { 
                $('#chronasWiki').hide(); 
                $('#notFoundNotice').show()
                $('#loader1').hide()
                console.debug($("iframe")[0].src,"show notice 1")
            }             
        });
        
        
    }
    else{
        $(".overviewContainer").css("margin-left", "0px")
        $("#storage-ui-container").removeClass("fullWidthContainer")
   /*     
        $("#storage-ui-container").css({'background':'url("/static/staticReqs/rightPaper.jpg") fixed center',
            'background-color': 'initial'});
        $("#storage-ui-container")[0].style.padding = "0px 0px 10px 10px;";
   */
        $("iframe")[0].style.width = "calc(100% - 15px)";
       

        if(tmpSource.indexOf("?printable=yes") == -1)
            $("iframe")[0].src = tmpSource + "?printable=yes";
        else
            $("iframe")[0].src = tmpSource;

        console.debug("2source now: ",$("iframe")[0].src )
        
        $("#storage-ui-container")[0].style.width = "50%";
        $("#map")[0].style.display = "block";
        $(".halfWidth")[0].title = "Toggle full width";
        $(".halfWidth").addClass("fullWidth")
        $(".fullWidth").removeClass("halfWidth")
        
        
        $('#chronasWiki').load(function(){
            
            console.debug("!x!   finished loading")
            if(tmpSource != 'http://en.wikipedia.org/wiki/' && tmpSource != 'http://en.wikipedia.org/wiki/?printable=yes'){  
                
                $('#notFoundNotice').hide()
                $('#loader1').hide()
                $('#chronasWiki').show();
                console.debug(tmpSource,"hide notice 2")
            } else { 
                $('#chronasWiki').hide();
                $('#loader1').hide()
                $('#notFoundNotice').show()
                console.debug(tmpSource,"show notice 2")
            }
        });
        
    }
    
}

function  openOverview(){
    
    var tmpSource =  $("iframe")[0].src;

    if ($("#specific")[0].style.display == "block"){

        $("#specific")[0].style.display = "none";
        $("#overview")[0].style.display = "block";
        $(".overview")[0].innerHTML = "Back";
        $("#loader1")[0].style.display = "none";
    }
    else{

        $("#specific")[0].style.display = "block";
        $("#overview")[0].style.display = "none";
        $("#loader1")[0].style.display = "block";
        $(".overview")[0].innerHTML = "Overview";
    }

}

L.S.Popup = L.Popup.extend({

    options: {
        parseTemplate: true
    },

    initialize: function (feature) {
        console.debug("!!!!!!! initializing feature: ",feature)
        this.feature = feature;
        this.container = L.DomUtil.create('div', 'storage-popup');
        this.format();
        L.Popup.prototype.initialize.call(this, {}, feature);
        this.setContent(this.container);

        $('#chronasWiki').hide();
        $('#loader1').show();
        $('#chronasWiki').load(function(){
            $('#loader1').hide();
            $('#chronasWiki').show();console.debug("~");
        });
        
    },

    hasFooter: function () {
        return this.feature.hasPopupFooter();
    },

    renderTitle: function () {},

    renderBody: function () {
        console.debug("!!! rendering Body!");

        $(".leaflet-top.leaflet-right")[0].style.display = "none";

        $(".tempImageLine").hide();
        
        var template = this.feature.getOption('popupContentTemplate'),
            container = L.DomUtil.create('div', ''),
            content, properties, center = this.feature.getCenter();
        
        
        
        
        if (this.options.parseTemplate) {
            
            // Include context properties
            properties = {
                lat: center.lat,
                lon: center.lng,
                lng: center.lng
            };
            if (typeof this.feature.getMeasure !== 'undefined') {
                properties.measure = this.feature.getMeasure();
            }
            properties = L.extend(properties, this.feature.properties);
            // Resolve properties inside description
            properties.description = L.Util.greedyTemplate(this.feature.properties.description || '', properties);
            content = L.Util.greedyTemplate(template, properties);
            console.debug("inside ha:", content, properties.description);
            
            if(properties){
                if (properties.description.substring(0,11) == "chronasYear"){
                    content = "WikiYear://en.wikipedia.org/wiki/"+properties.description.substr(11)+"?printable=yes loading year "+properties.description.substr(11);
                }
            }
        }
        content = L.Util.toHTML(content);
        console.debug("content received:", content);
        container.innerHTML = content;
        var els = container.querySelectorAll('img,iframe');
        
        for (var i = 0; i < els.length; i++) {
            this.onElementLoaded(els[i]);
        }
        if (container.textContent.replace('\n', '') === '') {
            container.innerHTML = '';
            L.DomUtil.add('h3', '', container, this.feature.getDisplayName());
        }
        
        console.debug(content,properties, "!iframe",$('#chronasWiki'));
        $('#chronasWiki').hide();
        $('#loader1').show();
        $('#chronasWiki').load(function(){
            $('#loader1').hide();
            $('#chronasWiki').show();
        });
/*
        if($('#chronasWiki') != []){
            $('#chronasWiki').on('load', function () {
                console.debug("inside load finish");
                $('#loader1').hide();
                $('#chronasWiki').show();
            });
        }
        */
        
        return container;
    },

    renderFooter: function () {
        if (this.hasFooter()) {
            var footer = L.DomUtil.create('ul', 'storage-popup-footer', this.container),
                previous_li = L.DomUtil.create('li', 'previous', footer),
                zoom_li = L.DomUtil.create('li', 'zoom', footer),
                next_li = L.DomUtil.create('li', 'next', footer),
                next = this.feature.getNext(),
                prev = this.feature.getPrevious();
            if (next) {
                next_li.title = L._('Go to «{feature}»', {feature: next.properties.name});
            }
            if (prev) {
                previous_li.title = L._('Go to «{feature}»', {feature: prev.properties.name});
            }
            zoom_li.title = L._('Zoom to this feature');
            L.DomEvent.on(next_li, 'click', function () {
                if (next) {
                    next.bringToCenter({zoomTo: next.getOption('zoomTo')}, function () {next.view(next.getCenter());});
                }
            });
            L.DomEvent.on(previous_li, 'click', function () {
                if (prev) {
                    prev.bringToCenter({zoomTo: prev.getOption('zoomTo')}, function () {prev.view(prev.getCenter());});
                }
            });
            L.DomEvent.on(zoom_li, 'click', function () {
                this.bringToCenter({zoomTo: this.getOption('zoomTo')});
            }, this.feature);
        }
    },

    format: function () {
        var title = this.renderTitle();
        if (title) {
            this.container.appendChild(title);
        }
        var body = this.renderBody();
        
        console.debug("!!", this.container, body);
        
        if (body) {
            L.DomUtil.add('div', 'storage-popup-content', this.container, body);
        }
        this.renderFooter();
    },

    onElementLoaded: function (el) {
        L.DomEvent.on(el, 'load', function () {
            this._updateLayout();
            this._updatePosition();
            this._adjustPan();
        }, this);
    }

});

L.S.Popup.Large = L.S.Popup.extend({
    options: {
        maxWidth: 500,
        className: 'storage-popup-large'
    }
});

L.S.Popup.BaseWithTitle = L.S.Popup.extend({

    renderTitle: function () {
        var title;
        if (this.feature.getDisplayName()) {
            title = L.DomUtil.create('h3', 'popup-title');
            title.innerHTML = L.Util.escapeHTML(this.feature.getDisplayName());
        }
        return title;
    }

});

L.S.Popup.Table = L.S.Popup.BaseWithTitle.extend({

    formatRow: function (key, value) {
        if (value.indexOf('http') === 0) {
            value = '<a href="' + value + '" target="_blank">' + value + '</a>';
        }
        return value;
    },

    addRow: function (container, key, value) {
        var tr = L.DomUtil.create('tr', '', container);
        L.DomUtil.add('th', '', tr, key);
        L.DomUtil.add('td', '', tr, this.formatRow(key, value));
    },

    renderBody: function () {
        var table = L.DomUtil.create('table');

        for (var key in this.feature.properties) {
            if (typeof this.feature.properties[key] === 'object' || key === 'name') {
                continue;
            }
            // TODO, manage links (url, mailto, wikipedia...)
            this.addRow(table, key, L.Util.escapeHTML(this.feature.properties[key]).trim());
        }
        return table;
    }

});

L.S.Popup.table = L.S.Popup.Table;  // backward compatibility

L.S.Popup.GeoRSSImage = L.S.Popup.BaseWithTitle.extend({

    options: {
        minWidth: 300,
        maxWidth: 500,
        className: 'storage-popup-large storage-georss-image'
    },

    renderBody: function () {
        var container = L.DomUtil.create('a');
        container.href = this.feature.properties.link;
        container.target = '_blank';
        if (this.feature.properties.img) {
            var img = L.DomUtil.create('img', '', container);
            img.src = this.feature.properties.img;
            // Sadly, we are unable to override this from JS the clean way
            // See https://github.com/Leaflet/Leaflet/commit/61d746818b99d362108545c151a27f09d60960ee#commitcomment-6061847
            img.style.maxWidth = this.options.maxWidth + 'px';
            img.style.maxHeight = this.options.maxWidth + 'px';
            this.onElementLoaded(img);
        }
        return container;
    }

});

L.S.Popup.GeoRSSLink = L.S.Popup.extend({

    options: {
        className: 'storage-georss-link'
    },

    renderBody: function () {
        var title = this.renderTitle(this),
            a = L.DomUtil.add('a');
        a.href = this.feature.properties.link;
        a.target = '_blank';
        a.appendChild(title);
        return a;
    }
});


L.S.Popup.SimplePanel = L.S.Popup.extend({

    allButton: function () {
        console.debug("L.S.Popup.SimplePanel allButton")
        
        var button = L.DomUtil.create('li', '');

        var label0 = L.DomUtil.create('i', 'storage-list', button);
        var label = L.DomUtil.create('span', '', button);
        label.innerHTML = L._('');

        label0.title = "View list of all entities of this year";
     //   L.DomEvent.on(label0, 'click', openDatatable );
        label0.onclick = function(){openDatatable(currSearchKey)};
        
       // L.DomEvent.on(button, 'click', this.feature.map.openBrowser, this.feature.map);
        return button;
    },
    allButton2: function () {
        console.debug("L.S.Popup.SimplePanel allButton")

        if($($(this)[0].container).find("iframe").length  != 0){
        var button2 = L.DomUtil.create('li', '');
        L.DomUtil.create('i', 'chronas-icon-1 storage-fullWidth', button2);
        var label2 = L.DomUtil.create('span', 'fullWidth', button2);
        label2.innerHTML = L._('');
            label2.title = "Toggle full width";
            
            L.DomEvent.on(button2, 'click', openfullWidth );
        return button2;
        }
        else
            return null;
    },
    allButton4: function () {
        console.debug("L.S.Popup.SimplePanel allButton")

        if($($(this)[0].container).find("iframe").length  != 0){
            var button4 = L.DomUtil.create('li', 'overviewContainer');
            button4.style.display = "none";
            L.DomUtil.create('i', 'chronas-icon-1 storage-overview', button4);
            var label4 = L.DomUtil.create('span', 'overview', button4);
            label4.innerHTML = 
'<div title="current Ruler" id="content_monA" class="resource input-group input-group-sm"> <span class="input-group-addon" id="btn_mon"></span> <input type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_mon"  id="content_mon"> </div>  <div  title="current political entity" id="content_rulA" class="resource input-group input-group-sm"> <span class="input-group-addon" id="btn_rul"></span> <input type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_rul"  id="content_rul"> </div><div title="current culture" id="content_culA" class="resource input-group input-group-sm"> <span class="input-group-addon" id="btn_cul"></span> <input type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_cul"  id="content_cul"> </div><div title="current religion" id="content_relA" class="resource input-group input-group-sm"> <span class="input-group-addon" id="btn_rel"></span> <input type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_rel"  id="content_rel"> </div><div  title="current capital of province" id="content_capA" class="resource input-group input-group-sm"> <span class="input-group-addon" id="btn_cap"></span> <input type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_cap"  id="content_cap"> </div><div title="current population of province" id="content_SizeA" class="resource input-group input-group-sm"> <span style=" cursor: auto !important; " class="input-group-addon" id="btn_size"></span> <input style=" cursor: auto !important; " type="text" readonly class="form-control" placeholder="n/a" aria-describedby="btn_size"  id="content_Size"> </div>'

            return button4;
        }
        else
            return null;
    },
    
    allButton3: function () {

        if($($(this)[0].container).find("iframe").length  != 0){
            var button3 = L.DomUtil.create('li', '');
            L.DomUtil.create('i', 'chronas-icon-2 storage-GoToWikipedia', button3);
            var label3 = L.DomUtil.create('a', 'GoToWikipedia', button3);
          //  label3.id = "GoToWikipedia";
            label3.innerHTML =  L._('');
            label3.title = "View on Wikipedia"
            label3.href = $($(this)[0].container).find("iframe")[0].src.replace("?printable=yes","");
            label3.target = "_blank";
        //    L.DomEvent.on(button3, 'click',  goToWikipedia);
            
            return button3;
        }
        else
        return null;
    },

    allButton5: function () {
        
        if($($(this)[0].container).find("iframe").length  != 0){
            var button5 = L.DomUtil.create('li', '');
            L.DomUtil.create('i', 'chronas-icon-2 storage-report', button5);
            var label5 = L.DomUtil.create('a', 'report', button5)
            label5.innerHTML =  L._(''); // (!) Report
            label5.title = "Report an error"
            label5.target = "_blank";

            L.DomEvent.on(button5, 'click', openReportDisclaimer );
            
            return button5;
        }
        else
            return null;
    },
    

    update: function () {
        
        if(this.allButton3() != null )
        {
        L.S.fire('ui:start', {data: {html: this._content}, actions: [this.allButton2(),this.allButton5(),this.allButton(),this.allButton3(),this.allButton4()]});
        }
        else
            L.S.fire('ui:start', {data: {html: this._content}, actions: [this.allButton()]});
        
    },

    onRemove: function (map) {
        L.S.fire('ui:end');
        L.S.Popup.prototype.onRemove.call(this, map);
    },

    _initLayout: function () {this._container = L.DomUtil.create('span');},
    _updateLayout: function () {},
    _updatePosition: function () {},
    _adjustPan: function () {}
});
