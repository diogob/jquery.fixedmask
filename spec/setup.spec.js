describe("Restrict and format input according to mask after the mask setup", function(){
  beforeEach(function(){
    input.val('a12345678').fixedMask("9.9.9-9");
  });

  it("should restrict and format input", function(){
    expect(input).toHaveValue('1.2.3-4');
  });
});

describe("Restrict and format input according to mask after pasting content", function(){
  beforeEach(function(){
    input.val('').fixedMask("9.9.9-9").val('a12345678').trigger('input');
  });

  it("should restrict and format input", function(){
    expect(input).toHaveValue('1.2.3-4');
  });
});

describe("Restrict input according to mask", function(){
  beforeEach(function(){
    input.val('').fixedMask("9.9.9-9");
    input.inputKeys = function(keys){ input.mashKeys(keys).trigger('input'); };
  });

  it("should restrict input when inputting letters", function(){
    input.inputKeys("a");
    expect(input).toHaveValue('');
  });

  it("should restrict input when inputting more digits than the mask allows", function(){
    input.inputKeys("12345");
    expect(input).toHaveValue('1.2.3-4');
  });

  it("should allow input when inputting special characters out of place", function(){
    input.inputKeys(".");
    expect(input).toHaveValue('');
  });
});

describe("Apply forward mask", function(){
  beforeEach(function(){
    input.val('').fixedMask("9.9.9-9");
    input.inputKeys = function(keys){ input.mashKeys(keys).trigger('input'); };
  });

  it("should apply mask when inputting 2 digits", function(){
    input.inputKeys("12");
    expect(input).toHaveValue('1.2');
  });

  it("should apply mask when inputting 3 digits", function(){
    input.inputKeys("123");
    expect(input).toHaveValue('1.2.3');
  });

  it("should apply mask when inputting 4 digits", function(){
    input.inputKeys("1234");
    expect(input).toHaveValue('1.2.3-4');
  });

  it("should apply mask when inputting 4 digits with special chars", function(){
    input.inputKeys("1.2.3-4");
    expect(input).toHaveValue('1.2.3-4');
  });
});
