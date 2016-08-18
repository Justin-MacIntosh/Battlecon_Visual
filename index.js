var express = require('express');
var jsdom   = require('jsdom');
var http    = require('http');
var path    = require('path');
var fs      = require('fs');
var url     = require('url');
var app = express();

var jquery = require('jquery');

app.use('*', function (req, res, next) {
    if (req.baseUrl === "") {
        jsdom.env(__dirname + '/index.html', function (errors, window) {
            var $ = (jquery)(window);
            
            var loaded = load_character(req.query['set'], req.query['character'], $);

            if (loaded) {
                load_cards(req.query['base'], req.query['style'], $);
            }

            res.write($("html")[0].innerHTML);
            res.end();
        });
    }
    else {
        next();
    }
});

app.use(express.static(__dirname + '/'));

var server = app.listen(process.env.PORT || 8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Battlecon Visual listening at http://%s:%s", host, port)
});

function documentToSource(doc) {
    return doc.doctype.toString() + doc.innerHTML;
}

function call_jsdom(source, callback) {
    jsdom.env(
        source,
        ['jquery-1.7.1.min.js'],
        function (errors, window) {
            process.nextTick(
                function () {
                    if (errors) {
                        throw new Error("There were errors: " + errors);
                    }
                    callback(window);
                }
            );
        }
    );
}

//----------------PRELOADED PAIRS CODE----------------

function load_character(set_name, char_name, $) {
    if (typeof set_name != 'undefined' && typeof char_name != 'undefined') {
        var to_append = "<script>$( document ).ready(function() {character_select(";
        to_append += "'" + set_name + "/" + char_name + ".xml'";
        to_append += ");});</script>";
        $('body').append(to_append);
        return true;
    }
    return false;
}

function load_cards(base_name, style_name, $) {
    if (typeof base_name != 'undefined') {
        var to_append_base = "<script>select_card(";
        to_append_base += "'" + base_name + "'";
        to_append_base += ");</script>";
        $('body').append(to_append_base);
    }
    if (typeof style_name != 'undefined') {
        var to_append_style = "<script>select_card(";
        to_append_style += "'" + style_name + "'";
        to_append_style += ");</script>";
        $('body').append(to_append_style);
    }
}