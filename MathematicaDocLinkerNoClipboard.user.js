// ==UserScript==
// @name         Mathematica Doc Linker
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @downloadURL  https://github.com/lukas-lang/MathematicaDocLinker/raw/master/MathematicaDocLinker.user.js
// @description  Enables the creation of links to specific parts of the Mathematica Web Documentation
// @author       Lukas Lang
// @match        https://reference.wolfram.com/language/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    $('head').append('<style type="text/css">a.PermaLink::before {width: 45px;height: 25px;content: " ";opacity: 0.0;transition: opacity 0.2s ease;background-image: url("https://raw.githubusercontent.com/lukas-lang/MathematicaDocLinker/master/Hyperlink.png");background-size: contain;background-repeat: no-repeat;position: absolute;left: -40px;} :hover > a.PermaLink::before {opacity: 1;}</style>');

    var func = function(node){
            node.find("a[name]")
                .addClass("PermaLink")
                .each(function(){$(this).attr('href','#' + $(this).attr('name'));});
        };

    $(document).ready(function() {
        func($('body'));
        $('body').on('DOMNodeInserted', function() {func($(this))});
    });
})();
