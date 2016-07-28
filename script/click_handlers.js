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
            pair_selected = true;
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
    $(".range_table").css("display", "none");
    $("#range_header").removeClass("title_selected");
    $(".base_table").css("display", "table");
    $("#base_header").addClass("title_selected");
}

function style_header_click() {
    if (character_selected) {
        $(".style_table").css("display", "table");
        $("#style_header").addClass("title_selected");
        $(".range_table").css("display", "none");
        $("#range_header").removeClass("title_selected");
        $(".base_table").css("display", "none");
        $("#base_header").removeClass("title_selected");
    }
    else {
        alert("No Styles to Show: No Character Currently Selected");
    }
}

//------------------------------RANGE------------------------------
function range_header_click() {
    if (pair_selected) {
        $(".style_table").css("display", "none");
        $("#style_header").removeClass("title_selected");
        $(".range_table").css("display", "table");
        $("#range_header").addClass("title_selected");
        $(".base_table").css("display", "none");
        $("#base_header").removeClass("title_selected");
        $("td.range_cell").remove();
        range_table_create(0);
    }
    else {
        alert("No pair currently selected.");
    }
}

function range_table_create(current_position) {
    var $range_row = $("#range_display_row");

    var range_nums = $("#range_val").html().split(",");

    var positions_targeted = [];

    var i;
    for (i = 0; i < range_nums.length; i++) {
        var cur_num = Number(range_nums[i]);
        positions_targeted.push(current_position - cur_num);
        positions_targeted.push(current_position + cur_num);
    }
    positions_targeted = positions_targeted.sort(function (a, b) { return a - b });

    var tag;
    for (i = -3; i < 4; i++) {
        if ($.inArray(i, positions_targeted) != -1) {
            tag = "<td align='center' class='range_cell'>" +
                    "<img id='" + i + "' src='/img/range/blue_hexagon.png' class='range range_within grow_range'/>" +
                  "</td>";
        }
        else if (i == current_position) {
            tag = "<td align='center' class='range_cell'>" +
                    "<div class='imgWrapCur'><img id='" + i + "' src='/img/range/green_hexagon.png' class='range range_cur grow_range_cur'/></div>" +
                  "</td>";
        }
        else {
            tag = "<td align='center' class='range_cell'>" +
                    "<img id='" + i + "' src='/img/range/white_hexagon.png' class='range range_transparent grow_range'/>" +
                  "</td>";
        }
        $($range_row).append(tag);
    }
    range_click_handlers();
}

function range_click_handlers() {
    $(".range").click(function () {
        var $clicked = $(this);
        var id = $clicked.attr("id");

        $("td.range_cell").remove();
        range_table_create(Number(id));
    });
}
//------------------------------END RANGE------------------------------