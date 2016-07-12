function character_select(character_xml) {
    if (character_selected) {
        if (character_xml == current_xml) {
            style_header_click();
            return;
        }
    }
    current_xml = character_xml;

    $("td.style_cell").remove();

    var $row = $("#styles_display_row");

    //open character xml
    var file = "/xml/" + character_xml;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            load_styles(xmlhttp, $row);
        }
    };
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}

//load in the styles from the character xml
function load_styles(xml, $row) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("card");
    for (i = 0; i < x.length; i++) {
        var tag = "<td align='center' class='style_cell'>";
        tag += "<img src='" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='style grow rounded'/>";

        //secret statistics
        tag += "<div id='statistics' class='secret'>";
        var stat = x[i].getElementsByTagName("statistics")[0];
        tag = secret_statistics(tag, stat);
        tag += "</div>";

        //secret properties
        tag += "<div id='properties' class='secret'>";
        var props = x[i].getElementsByTagName("properties")[0];
        tag = create_secret_tags(tag, props);
        tag += "</div>";

        tag += "</td>";
        $($row).append(tag);
    }

    character_selected = true;

    //found in '/script/click_handlers.js'
    style_click_handlers();

    style_header_click();
}