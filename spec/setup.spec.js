describe("Restrict input according to mask", function(){
  beforeEach(function(){
    input.val('').fixedMask("9.9.9-9");
  });

  it("should restrict input when inputting letters", function(){
    input.mashKeys("a");
    expect(input).toHaveValue('');
  });

  it("should restrict input when inputting more digits than the mask allows", function(){
    input.mashKeys("12345");
    expect(input).toHaveValue('1.2.3-4');
  });

  it("should allow input when inputting special characters out of place", function(){
    input.mashKeys(".");
    expect(input).toHaveValue('');
  });
});

describe("Apply forward mask", function(){
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

  it("should apply mask when inputting 4 digits with special chars", function(){
    input.mashKeys("1.2.3-4");
    expect(input).toHaveValue('1.2.3-4');
  });
});
