function getAreaChecked()
{

    var textToIterate = ["T-Country","T-Culture","T-Religion","T-MainRel"];
    var areaToIterate = ["A-Country","A-Culture","A-Religion","A-MainRel","A-Population"];
    for (var i=0; i<areaToIterate.length;i++){
        if($("#"+areaToIterate[i]).prop('checked')){
            return areaToIterate[i]

        }
    }
    for (var i=0; i<textToIterate.length;i++){
        if($("#"+textToIterate[i]).prop('checked')){
            return areaToIterate[i]

        }
    } 

    return 'A-Country';
}