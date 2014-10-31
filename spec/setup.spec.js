describe("Apply forward mask", function(){
  var applyMask;
  beforeEach(function(){
    input.val('').fixedMask("9.9.9-9");
  });

  it("should apply mask when inputting 2 digits", function(){
    input.mashKeys("12");
    expect(input).toHaveValue('1.2');
  });

  it("should apply mask when inputting 3 digits", function(){
    input.mashKeys("123");
    expect(input).toHaveValue('1.2.3');
  });

  it("should apply mask when inputting 4 digits", function(){
    input.mashKeys("1234");
    expect(input).toHaveValue('1.2.3-4');
  });
});
