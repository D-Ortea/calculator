const operate = function(fnName, args) {
  return +format(getFunction(fnName)(...args), {precision: 14});
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
 return a * b;
}

function divide(a, b) {
  return a / b;
}

function square(a) {
  return a * a;
}

function squareRoot(a) {
  return Math.sqrt(a);
}

function inverse(a) {
  return 1 / a;
}

function power(a, b) {
  return Math.pow(a, b);
}

function sine(a) {
  return Math.sin(a);
}

function cosine(a) {
  return Math.cos(a);
}

function tangent(a) {
  return Math.tan(a);
}

function pow10(a) {
  return power(10, a);
}

function log10(a) {
  return Math.log10(a);
}

function exp(a, b) {
  return a * pow10(b);
}

function modulus(a, b) {
  return a % b;
}

function factorial(a) {
  if(a < 0) { return 'Invalid Input'; }
  if(a === 0 || a === 1){ return 1; }
  return a * factorial(a - 1);
}

function negate(a) {
  return -a;
}

function format(result, options) {
  return parseFloat(result).toFixed(options.precision);
}

function getFunction(fnName) {
  switch(fnName) {
    case '+':
      return add;
    case '-':
      return subtract;
    case '*':
      return multiply;
    case '/':
      return divide;
    case 'sqr':
      return square;
    case 'sqrt':
      return squareRoot;
    case '1/':
      return inverse;
    case 'pow':
      return power;
    case 'sin':
      return sine;
    case 'cos':
      return cosine;
    case 'tan':
      return tangent;
    case '10^':
      return pow10;
    case 'log10':
      return log10;
    case 'mod':
      return modulus;
    case 'fact':
      return factorial;
    case 'negate':
      return negate;
  }
}

// module.exports = operate;