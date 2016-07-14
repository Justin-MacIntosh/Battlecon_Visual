//------------------------------CARD CLICKS------------------------------
//Base Card Click Handlers
function base_click_handlers() {
    $(".base").click(function () {
        var $clicked = $(this);
        $(this).addClass("pulse_image_blue");

        var $properties = $(this).nextAll("#properties");
        property_tag_write($properties, true);

        var $statistics = $(this).nextAll("#statistics");
        statistic_tag_write($statistics, true);

        var $pair_base = $(".pair_base");
        $pair_base.attr("src", $(this).attr("src"));

        $('.base').each(function (i, obj) {
            var $current_base = $(this);
            if (!$clicked.is($current_base)) {
                setTimeout(function () {
                    $current_base.removeClass("pulse_image_blue", 200);
                }, 200); 
            }
        });
    });
}

//Style Card Click Handlers
function style_click_handlers() {
    $(".style").click(function () {
        var $clicked = $(this);
        $(this).addClass("pulse_image_red");

        var $properties = $(this).nextAll("#properties");
        property_tag_write($properties, false);

        var $statistics = $(this).nextAll("#statistics");
        statistic_tag_write($statistics, false);

        var $pair_base = $(".pair_style");
        $pair_base.attr("src", $(this).attr("src"));

        $('.style').each(function (i, obj) {
            var $current_base = $(this);
            if (!$clicked.is($current_base)) {
                setTimeout(function () {
                    $current_base.removeClass("pulse_image_red", 200);
                }, 200);
            }
        });
    });
}
//------------------------------END CARD CLICKS------------------------------


//------------------------------PROPERTIES------------------------------
//Write to Property Boxes (on the left)
function property_tag_write($props, base_bool) {
    var prop_ids = ["#per", "#rev", "#sob", "#bac", "#ohi", "#oda", "#aac", "#eob"];
    var prop_full_names = ["persistent", "reveal", "start_of_beat",
                           "before_activating", "on_hit", "on_damage",
                           "after_activating", "end_of_beat"];

    var val_class = ".bval";
    var descriptor = "B";

    if (!base_bool) {
        val_class = ".sval";
        descriptor = "S";
    }

    var i;

    for (i = 0; i < prop_ids.length; i++) {
        $(prop_ids[i] + " " + val_class).html("");
    }

    for (i = 0; i < prop_ids.length; i++) {
        if ($("p." + prop_full_names[i], $props).length > 0) {
            $(prop_ids[i] + " " + val_class).html(descriptor + ": " + $("p." + prop_full_names[i], $props)[0].childNodes[0].nodeValue);
        }
    }
    hide_unecessary_props();
}

function hide_unecessary_props() {
    var prop_ids = ["#per", "#rev", "#sob", "#bac", "#ohi", "#oda", "#aac", "#eob"];

    var i;
    for (i = 0; i < prop_ids.length; i++) {
        if ($(prop_ids[i] + " .bval").is(":empty") && $(prop_ids[i] + " .sval").is(":empty")) {
            $(prop_ids[i]).css("display", "none");
        }
        else {
            $(prop_ids[i]).css("display", "block");
        }
    }
}
//------------------------------END PROPERTIES------------------------------


//------------------------------STATISTICS------------------------------
//Write to Property Boxes (on the left)
function statistic_tag_write($stats, base_bool) {
    var stat_ids = ["#ran", "#pow", "#pri"];
    var stat_full_names = ["range", "power", "priority"];

    var univ_val_class = ".value";

    var val_class = ".bval";
    var other_val_class = ".sval";

    if (!base_bool) {
        val_class = ".sval";
        other_val_class = ".bval";
    }

    var i;
    for (i = 0; i < stat_ids.length; i++) {
        $(stat_ids[i] + " " + val_class).html("");
    }

    var x;
    for (x = 0; x < stat_ids.length; x++) {
        var total = "Incomplete";

        var current_value = $("p." + stat_full_names[x], $stats)[0].childNodes[0].nodeValue;

        var final_array = [];

        var other_value = $(stat_ids[x] + " " + other_val_class).html();
        if (other_value != "") {
            var current_split = current_value.split(",");
            var other_split = other_value.split(",");

            var j; var k;
            for (j = 0; j < current_split.length; j++) {
                for (k = 0; k < other_split.length; k++) {
                    var current_number = parseInt(current_split[j]) + parseInt(other_split[k]);
                    if (final_array.indexOf(current_number.toString()) == -1) {
                        final_array.push(current_number.toString());
                    }
                }
            }
        }

        if (final_array.length > 0) {
            $(stat_ids[x]).css("display", "block");
            final_array.sort();
            total = "";
            for (i = 0; i < final_array.length; i++) {
                total += final_array[i];
                if (i + 1 != final_array.length) {
                    total += ", ";
                }
            }
        }
        $(stat_ids[x] + " " + univ_val_class).html(total);
        $(stat_ids[x] + " " + val_class).html(current_value);
    }
}
//------------------------------END STATISTICS------------------------------


//BASE and STYLE header clicks
function base_header_click() {
    $(".style_table").css("display", "none");
    $("#style_header").removeClass("title_selected");
    $(".base_table").css("display", "table");
    $("#base_header").addClass("title_selected");
}

function style_header_click() {
    if (character_selected) {
        $(".style_table").css("display", "table");
        $("#style_header").addClass("title_selected");
        $(".base_table").css("display", "none");
        $("#base_header").removeClass("title_selected");
    }
    else {
        alert("No Styles to Show: No Character Currently Selected");
    }
}