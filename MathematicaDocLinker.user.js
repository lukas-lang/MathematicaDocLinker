// ==UserScript==
// @name         Mathematica Doc Linker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @downloadURL  https://github.com/lukas-lang/MathematicaDocLinker/raw/master/MathematicaDocLinker.user.js
// @description  Enables the creation of links to specific parts of the Mathematica Web Documentation
// @author       Lukas Lang
// @match        https://reference.wolfram.com/language/ref/*
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var $ = window.jQuery;

    $('head').append('<style type="text/css">a.PermaLink::before {width: 45px;height: 25px;content: " ";opacity: 0.0;transition: opacity 0.2s ease;background-image: url("https://raw.githubusercontent.com/lukas-lang/MathematicaDocLinker/master/Hyperlink.png");background-size: contain;background-repeat: no-repeat;position: absolute;left: -40px;}a.PermaLink.copied::before {background-image: url("https://raw.githubusercontent.com/lukas-lang/MathematicaDocLinker/master/HyperlinkCopied.png");} :hover > a.PermaLink::before {opacity: 1;}</style>');

    var clipboard = new ClipboardJS('.PermaLink');

    clipboard.on('success', function(e) {
            $(e.trigger)
                .addClass('copied')
                .mouseleave(function(){$(this).removeClass('copied');});
        }
    );

    var func = function(node){
            node.find("a[name]")
                .addClass("PermaLink")
                .each(function(){
                    $(this).attr('data-clipboard-text', document.location.origin + document.location.pathname + '#' + $(this).attr('name'));
                });
        };

    $(document).ready(function() {
        func($('body'));
        $('body').on('DOMNodeInserted', function() {func($(this))});
    });
})();
