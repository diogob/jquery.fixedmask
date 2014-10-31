/*
    jQuery Fixed Size Input Mask Plugin
    Copyright (c) 2007 - 2014 Diogo Biazus
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.0.0
*/
!function(factory) {
    "object" == typeof exports ? factory(require("jquery"), require("underscore")) : factory(jQuery, _);
}(function($, _) {
    function addChar(position, maskChar) {
        return function(char) {
            return function(string) {
                return string.length === position && char !== maskChar && (string += maskChar), 
                string;
            };
        };
    }
    function readMaskDefinition(maskChars) {
        return function(maskDefinition) {
            return _.compact(_.map(maskDefinition, function(letter, index) {
                return maskChars.indexOf(letter) >= 0 ? null : [ index, letter ];
            }));
        };
    }
    function applyMask(maskDefinition) {
        var maskFunctions = _.map(maskDefinition, function(maskChar) {
            return addChar(maskChar[0], maskChar[1]);
        });
        return function(string, newChar) {
            var addNewCharFunctions = _.map(maskFunctions, function(el) {
                return el(newChar);
            }), applyMaskFunctions = _.reduce(addNewCharFunctions, function(memo, f) {
                return _.isFunction(memo) ? _.compose(f, memo) : f;
            });
            return applyMaskFunctions(string);
        };
    }
    $.fixedMask = {
        maskChars: "9A"
    }, $.fixedMask.readMask = readMaskDefinition($.fixedMask.maskChars), $.fn.extend({
        fixedMask: function(mask) {
            return this.each(function() {
                var input = $(this);
                input.data("applyMask", applyMask($.fixedMask.readMask(mask || input.data("fixed-mask")))), 
                input.keypress(function(event) {
                    var chr = String.fromCharCode(event.which);
                    input.val(input.data("applyMask")(input.val(), chr));
                });
            });
        }
    });
});