const operate = function(operator, a, b) {
  return +format(getFunction(operator)(a, b), {precision: 14});
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

function format(result, options) {
  return parseFloat(result).toFixed(options.precision);
}

function getFunction(operator) {
  switch(operator) {
    case '+':
      return add;
    case '-':
      return subtract;
    case '*':
      return multiply;
    case '/':
      return divide;
  }
}

// module.exports = operate;