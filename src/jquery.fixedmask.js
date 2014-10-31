(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'), require('underscore'));
    } else {
        // Browser globals
        factory(jQuery, _);
    }
}(function ($, _) {

  function addChar(position, maskChar) {
    return function(char){
      return function(string){
        if(string.length == position && char != maskChar){
          string = (string + maskChar);
        }
        return string;
      }
    }
  }

  function readMaskDefinition(maskChars){
    return function(maskDefinition){
      return _.compact(_.map(maskDefinition, function(letter, index){
        return (maskChars.indexOf(letter) >= 0 ? null : [index, letter]);
      }));
    }
  }

  function applyMask(maskFunctions, string, newChar){
    var addNewCharFunctions = _.map(maskFunctions, function(el){ return el(newChar) });
    var applyMaskFunctions = _.reduce(addNewCharFunctions, function(memo, f){ 
      return (_.isFunction(memo) ? _.compose(f, memo) : f) 
    });
    return applyMaskFunctions(string);
  }

  // On key press
  //applyMask(addMaskFunctions, 'tes', 't');

  $.fixedMask = {
    maskChars: '9A'
  };
  $.fixedMask.readMask = readMaskDefinition($.fixedMask.maskChars);
    
  $.fn.extend({
    fixedMask: function(mask, settings){
      return this.each(function() {
        // Store array of mask functions in element data
        var input = $(this);
        var addMaskFunctions = _.map($.fixedMask.readMask(mask || input.data('fixed-mask')), function(maskChar){ return addChar(maskChar[0], maskChar[1]); });
        input.data('fixedMaskFunctions', addMaskFunctions);
        input.keypress(function(event){
          var chr = String.fromCharCode(event.which);
          input.val(applyMask(input.data('fixedMaskFunctions'), input.val(), chr));
        });
      });
    }
  });
}));
