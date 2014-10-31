feature("Masking an Input", function() {	
  describe("#fixedMask", function(){
    var functions;
    beforeEach(function(){
      functions = input.fixedMask("9.9.9-9").data('fixedMaskFunctions');
    });

    it("should create fixedMaskFunctions in input data", function(){
      expect(functions).toEqual([jasmine.any(Function), jasmine.any(Function), jasmine.any(Function)]);
    })

    it("the fixedMaskFunctions should work", function(){
      expect(functions[0]('1')('1')).toEqual('1.');
      expect(functions[1]('1')('1.2')).toEqual('1.2.');
      expect(functions[2]('1')('1.2.3')).toEqual('1.2.3-');
    });
  });

	scenario('Applying a mask to an input',function(){
		given("an input with two masks", function(){
			input.fixedMask("9.9.9-9");
		});

		when("typing a number",function(){
			input.mashKeys("11");
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('1.1');
		});
	});
});

