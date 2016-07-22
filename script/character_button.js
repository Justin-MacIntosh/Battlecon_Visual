function character_select(character_xml) {
    $('#char_modal').modal('hide');
    if (character_selected) {
        if (character_xml == current_xml) {
            style_header_click();
            return;
        }
    }

    current_xml = character_xml;
    $("td.style_cell").remove();
    $("td.unique_base_cell").remove();

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
    var all_cards = xmlDoc.getElementsByTagName("card");
    for (i = 0; i < all_cards.length; i++) {
        var cur_card = all_cards[i];
        if (cur_card.getElementsByTagName("unique_base").length > 0) {
            var $base_row = $("#bases_display_row");
            var tag = "<td align='center' class='unique_base_cell'>";
            tag += "<img src='" + cur_card.getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='base grow rounded'/>";

            //secret statistics
            tag += "<div id='statistics' class='secret'>";
            var stat = cur_card.getElementsByTagName("statistics")[0];
            tag = secret_statistics(tag, stat);
            tag += "</div>";

            //secret properties
            tag += "<div id='properties' class='secret'>";
            var props = cur_card.getElementsByTagName("properties")[0];
            tag = create_secret_tags(tag, props);
            tag += "</div>";

            tag += "</td>";
            $($base_row).append(tag);
        }
        else {
            var tag = "<td align='center' class='style_cell'>";
            tag += "<img src='" + cur_card.getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='style grow rounded'/>";

            //secret statistics
            tag += "<div id='statistics' class='secret'>";
            var stat = cur_card.getElementsByTagName("statistics")[0];
            tag = secret_statistics(tag, stat);
            tag += "</div>";

            //secret properties
            tag += "<div id='properties' class='secret'>";
            var props = cur_card.getElementsByTagName("properties")[0];
            tag = create_secret_tags(tag, props);
            tag += "</div>";

            tag += "</td>";
            $($row).append(tag);
        }
    }

    character_selected = true;

    //found in '/script/click_handlers.js'
    style_click_handlers();
    base_click_handlers();

    style_header_click();
}