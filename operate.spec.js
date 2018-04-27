var operate = require('./operate');

describe('operate addition', function() {
  it('of two integers', function() {
    expect(operate('+', 22, 8)).toEqual(30);
  });
  
  it('of two real numbers', function() {
    expect(operate('+', 0.1, 0.2)).toEqual(0.3);
  });

  it('of to numbers in exponent notation', function() {
    expect(operate('+', 5e-5, 4e-5)).toEqual(0.00009);
  });

  it('of to negative numbers', function() {
    expect(operate('+', -7, -9)).toEqual(-16);
  });
});

describe('operate subtraction', function() {
  it('of two integers', function() {
    expect(operate('-', 22, 8)).toEqual(14);
  });
  
  it('of two real numbers', function() {
    expect(operate('-', 0.3, 0.1)).toEqual(0.2);
  });

  it('of to numbers in exponent notation', function() {
    expect(operate('-', 5e-5, 4e-5)).toEqual(0.00001);
  });

  it('of to negative numbers', function() {
    expect(operate('-', -7, -9)).toEqual(2);
  });
});

describe('operate multiplication', function() {
  it('of two integers', function() {
    expect(operate('*', 13, 3)).toEqual(39);
  });

  it('of two negative numbers', function() {
    expect(operate('*', -5, -4)).toEqual(20);
  });

  it('of two real numbers', function() {
    expect(operate('*', 0.1, 0.1)).toEqual(0.01);
  });

  it('of two numbers in exponent notation', function() {
    expect(operate('*', 5e2, 9e3)).toEqual(4500000);
  });

  it('of a number by zero', function() {
    expect(operate('*', 29.0230320, 0)).toEqual(0);
  });

  it('of a number by infinity', function() {
    expect(operate('*', 2, Infinity)).toEqual(Infinity);
  });

  it('of a number by negative infinity', function() {
    expect(operate('*', 2, -Infinity)).toEqual(-Infinity);
  });

  it('of zero by infinity', function() {
    expect(operate('*', 0, Infinity)).toEqual(NaN);
  });
});

describe('operate division', function() {
  it('of two integers, integer result', function() {
    expect(operate('/', 12, 3)).toEqual(4);
  });
  
  it('of two integers, exact real result', function() {
    expect(operate('/', 16, 10)).toEqual(1.6);
  });

  it('of two integers, no exact result', function() {
    expect(operate('/', 1, 3)).toEqual(0.33333333333333);
  });

  it('of two negative integer', function() {
    expect(operate('/', -12, -4)).toEqual(3);
  });

  it('of two real numbers, exact result', function() {
    expect(operate('/', 0.01, 0.1)).toEqual(0.1);
  });

  it('of two real numbers, no exact result', function() {
    expect(operate('/', 0.1, 0.3)).toEqual(0.33333333333333);
  });

  it('of two numbers in exponent notation', function() {
    expect(operate('/', 5e2, 5)).toEqual(100);
  });

  it('of a number by zero', function() {
    expect(operate('/', 29, 0)).toEqual(Infinity);
  });

  it('of a number by infinity', function() {
    expect(operate('/', 2, Infinity)).toEqual(0);
  });

  it('of a number by negative infinity', function() {
    expect(operate('/', 2, -Infinity)).toEqual(0);
  });

  it('of zero by zero', function() {
    expect(operate('/', 0, 0)).toEqual(NaN);
  });
});