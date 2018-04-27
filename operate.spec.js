var operate = require('./operate');

describe('operate addintion', function() {
  it('sums two integers', function() {
    expect(operate('+', 22, 8)).toEqual(30);
  });
  
  it('sums two real numbers', function() {
    expect(operate('+', 0.1, 0.2).toEqual(0.3));
  });

  it('sums to numbers in exponent notation', function() {
    expect(operate('+', 5e-5, 4e-5).toEqual(0.00009));
  });

  it('sums to negative numbers', function() {
    expect(operate('+', -7, -9).toEqual(-16));
  });
});

describe('operate subtraction', function() {
  it('subtracts two integers', function() {
    expect(operate('-', 22, 8)).toEqual(14);
  });
  
  it('subtracts two real numbers', function() {
    expect(operate('-', 0.3, 0.1).toEqual(0.2));
  });

  it('subtracts to numbers in exponent notation', function() {
    expect(operate('-', 5e-5, 4e-5).toEqual(0.00001));
  });

  it('subtracts to negative numbers', function() {
    expect(operate('-', -7, -9).toEqual(2));
  });
});

describe('operate multiplication', function() {
  it('multiplies two integers', function() {
    expect(operate('*', 13, 3).toEqual(39));
  });

  it('multiplies two negative numbers', function() {
    expect(operate('*', -5, -4).toEqual(20));
  });

  it('multiplies two real numbers', function() {
    expect(operate('*', 0.1, 0.1).toEqual(0.1));
  });

  it('multiplies two numbers in exponent notation', function() {
    expect(operate('*', 5e2, 9e3).toEqual(4500000));
  });

  it('multiplies a number by zero', function() {
    expect(operate('*', 29.0230320, 0).toEqual(0));
  });

  it('multiplies a number by infinity', function() {
    expect(operate('*', 2, Infinity).toEqual(Infinity));
  });

  it('multiplies a number by negative infinity', function() {
    expect(operate('*', 2, -Infinity).toEqual(-Infinity));
  });

  it('multiplies zero by infinity', function() {
    expect(operate('*', 0, Infinity).toEqual('undefined'));
  });
});

describe('operate division', function() {
  it('divides two integers, integer result', function() {
    expect(operate('/', 12, 3).toEqual(4));
  });
  
  it('divides two integers, exact real result', function() {
    expect(operate('/', 16, 10).toEqual(1.6));
  });

  it('divides two integers, no exact result', function() {
    expect(operate('/', 1, 3).toEqual(0.3333333333333333));
  });

  it('divides two negative integer', function() {
    expect(operate('/', -12, -4).toEqual(3));
  });

  it('divides two real numbers, exact result', function() {
    expect(operate('/', 0.01, 0.1).toEqual(0.1));
  });

  it('divides two real numbers, no exact result', function() {
    expect(operate('/', 0.1, 0.3).toEqual(0.3333333333333333));
  });

  it('divides two numbers in exponent notation', function() {
    expect(operate('/', 5e2, 5).toEqual(100));
  });

  it('divides a number by zero', function() {
    expect(operate('/', 29, 0).toEqual('undefined'));
  });

  it('divides a number by infinity', function() {
    expect(operate('/', 2, Infinity).toEqual(0));
  });

  it('divides a number by negative infinity', function() {
    expect(operate('/', 2, -Infinity).toEqual(0));
  });

  it('divides zero by zero', function() {
    expect(operate('/', 0, 0).toEqual('undefined'));
  });
});