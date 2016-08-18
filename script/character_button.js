function character_select(character_xml) {
    //get rid of character select modal
    $('#char_modal').modal('hide');

    //if we are currently on the character we are selecting
    if (character_selected) {
        if (character_xml == current_xml) {
            style_header_click();
            return;
        }
    }

    //-------------URL STUFF-------------
    var set = character_xml.split("/")[0];
    var char = character_xml.split("/")[1].replace(".xml", "");

    update_url_query("set", set);
    update_url_query("character", char);
    //-------------END URL STUFF-------------

    //change globals
    current_xml = character_xml;
    $("td.style_cell").remove();
    $("td.unique_base_cell").remove();

    //updating styles
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

        //if unique base
        if (cur_card.getElementsByTagName("unique_base").length > 0) {
            var $base_row = $("#bases_display_row");
            var tag = "<td align='center' class='unique_base_cell'>";
            tag += "<img src='" + cur_card.getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='base grow rounded'/>";

            tag = create_secret_tags(cur_card, tag);

            tag += "</td>";
            $($base_row).append(tag);
        }

        //if unique ability
        else if (cur_card.getElementsByTagName("unique_ability").length > 0) {
            var all_abilities = cur_card.getElementsByTagName("ability");
            var a;
            var modal_text = "";
            for (a = 0; a < all_abilities.length; a++) {
                modal_text += "<h3>" + all_abilities[a].childNodes[0].nodeValue + "</h3>";
            }
            var head_text = "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
            head_text += "<h1 class='modal-title georgia'>" + cur_card.getElementsByTagName("name")[0].childNodes[0].nodeValue + "</h1>"
            $("#ua_head").html(head_text);
            $("#ua_body").html(modal_text);
        }

        //style
        else {
            var tag = "<td align='center' class='style_cell'>";
            tag += "<img src='" + cur_card.getElementsByTagName("image")[0].childNodes[0].nodeValue + "'  class='style grow rounded'/>";

            tag = create_secret_tags(cur_card, tag);

            tag += "</td>";
            $($row).append(tag);
        }
    }

    //global update
    character_selected = true;

    //found in '/script/click_handlers.js'
    style_click_handlers();
    base_click_handlers();

    //simulate switching to styles
    style_header_click();
    doc_ready = true;
}

function select_card(card_name) {
    setTimeout(function () {
        var card = $("#" + card_name.replace(" ","_")).parent().prevAll("img");
        card.click();
    }, 100);
}