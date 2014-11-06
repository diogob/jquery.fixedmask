#jquery.fixedmask [![Build Status](https://travis-ci.org/diogob/jquery.fixedmask.svg?branch=master)](https://travis-ci.org/diogob/jquery.fixedmask) [![Code Climate](https://codeclimate.com/github/diogob/jquery.fixedmask/badges/gpa.svg)](https://codeclimate.com/github/diogob/jquery.fixedmask)

## Use cases
What this library is supposed to do:
  
  * Add characters to a user input in fixed positions such as a postal code: XXX-XXX, or a date field DD/MM/YYYY.
  * Restric certain characters to be numbers or letters
  
What it's not going to help you with:

  * Validate input
  * Add charcters to user input with variable length (e.g. money fields)

## Alternatives
If you need to deal with variable lenght fields or want other validation features I suggest you take a look at:
  
  * [jquery.maskedinput](https://github.com/digitalBush/jquery.maskedinput) - Awesome lib, much of my code is based on theirs.
  * [jquery.payment](https://github.com/stripe/jquery.payment) - The perfect solution for credit card forms, developed by Stripe.
  * [jquery-maskmoney](https://github.com/plentz/jquery-maskmoney) - A very good option for masking money input.
  
## Usage
Currently the masks used in this library support only to meta-characters: 9 and A. Use 9 to represent numbers and A to represent letters. Any other character will be added to the input after the user has typed. A credit card mask would look like: ```9999 9999 9999 9999```. A date mask would look like: ```99/99/9999```. To apply the mask to input fields there are 2 ways:

  1. You can set the mask in the html using ```<input type="text" data-fixed-mask="99/99/9999">``` and then call
  
        $('[data-fixed-mask]').fixedMask()
    
    inside a javascript block in the same page.
  2. You can define the mask inside the JS function call as in:

        $('input#date').fixedMask('99/99/9999')
