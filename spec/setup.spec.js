feature("Masking an Input", function() {	
  describe("#fixedMask", function(){
    var applyMask;
    beforeEach(function(){
      applyMask = input.fixedMask("9.9.9-9").data('applyMask');
    });

    it("should create fixedMaskFunctions in input data", function(){
      expect(applyMask).toEqual(jasmine.any(Function));
    })

    it("the applyMask should work", function(){
      expect(applyMask('1', '1')).toEqual('1.');
      expect(applyMask('1.2', '1')).toEqual('1.2.');
      expect(applyMask('1.2.3', '1')).toEqual('1.2.3-');
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

