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
  }
}

// module.exports = operate;