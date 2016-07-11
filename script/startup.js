var character_selected = false;
var current_xml = "";

$(document).ready(function () {
    var $row = $("#bases_display_row");

    //open bases xml
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            load_bases(xmlhttp, $row);
        }
    };
    xmlhttp.open("GET", "/xml/standard_bases.xml", true);
    xmlhttp.send();
});

//load in the standard bases from standard/bases.xml
function load_bases(xml, $row) {
    var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("card");
    for (i = 0; i < x.length; i++) {
        var tag = "<td align='center' class='base_cell'>";
        tag += "<img src='" + x[i].getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='base grow rounded'/>";

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

    //found in '/script/click_handlers.js'
    base_click_handlers();
}


function secret_statistics(tag, stat) {
    var stat_full_names = ["range", "power", "priority"];
    var i;
    for (i = 0; i < stat_full_names.length; i++) {
        if (stat.getElementsByTagName(stat_full_names[i]).length > 0) {
            tag += "<p class='" + stat_full_names[i] + "'>" + stat.getElementsByTagName(stat_full_names[i])[0].childNodes[0].nodeValue + "</p>";
        }
    }
    return tag;
}

function create_secret_tags(tag, props) {
    var prop_full_names = ["persistent", "reveal", "start_of_beat",
                           "before_activating", "on_hit", "on_damage",
                           "after_activating", "end_of_beat"];
    var i;
    for (i = 0; i < prop_full_names.length; i++) {
        if (props.getElementsByTagName(prop_full_names[i]).length > 0) {
            tag += "<p class='" + prop_full_names[i] + "'>" + props.getElementsByTagName(prop_full_names[i])[0].childNodes[0].nodeValue + "</p>";
        }
    }
    return tag;
}