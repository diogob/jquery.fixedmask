feature("Masking an Input", function() {	
	scenario('Applying a mask to an already masked input',function(){
		given("an input with two masks", function(){
      console.log(input);
			input
			.fixedMask("9.9");
		});

		when("typing a number",function(){
			input.mashKeys("11");
		});

		then("value should be correct",function(){
			expect(input).toHaveValue('1.1');
		});
	});
});

