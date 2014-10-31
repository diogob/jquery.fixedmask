(function (factory) {
    if (typeof exports === 'object') {
        // Node/CommonJS
        factory(require('jquery'), require('underscore'));
    } else {
        // Browser globals
        factory(jQuery, _);
    }
}(function ($, _) {
  // Return a function that will add a new character to a string and include a mask character if this is the case
  function addChar(position, maskChar) {
    return function(char){
      return function(string){
        if(string.length === position && char !== maskChar){
          string = (string + maskChar);
        }
        return string;
      };
    };
  }

  // Return an array containing a definition of which are the fixed characters in the mask using the format:
  // [[position, character]]
  // All characters in maskChars are ignored (for they are replaced by user input)
  function readMaskDefinition(maskChars){
    return function(maskDefinition){
      return _.compact(_.map(maskDefinition, function(letter, index){
        return (maskChars.indexOf(letter) >= 0 ? null : [index, letter]);
      }));
    };
  }

  // Apply the mask defintion using an array of partially applied addChar functions
  // composing them and reading the new character that will be added to a given string
  // It should be partially applied using the maskDefinition 
  // to be called only with string and new char on a keypress event
  function applyMask(maskDefinition){
    var maskFunctions = _.map(maskDefinition, function(maskChar){ return addChar(maskChar[0], maskChar[1]); });
    return function(string, newChar){
      var addNewCharFunctions = _.map(maskFunctions, function(el){ return el(newChar); });
      var applyMaskFunctions = _.reduce(addNewCharFunctions, function(memo, f){ 
        return (_.isFunction(memo) ? _.compose(f, memo) : f); 
      });
      return applyMaskFunctions(string);
    };
  }

  $.fixedMask = {
    maskChars: '9A'
  };
  $.fixedMask.readMask = readMaskDefinition($.fixedMask.maskChars);
    
  $.fn.extend({
    fixedMask: function(mask){
      return this.each(function() {
        var input = $(this);

        // Private function to apply mask in keypress
        function applyMaskOnKeyPress(event){
          var chr = String.fromCharCode(event.which);
          var applyElementMask = applyMask($.fixedMask.readMask(mask || input.data('fixed-mask')));
          input.val(applyElementMask(input.val(), chr));
        }
        input.keypress(applyMaskOnKeyPress);
      });
    }
  });
}));
