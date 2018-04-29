// const math = require('./mathjs');

const operate = function(operator, a, b) {
  return +format(getFunction(operator)(a, b), {precision: 14});
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


// function add(a, b) {
//   return +math.format(math.add(a, b), {precision: 14});
// }

// function subtract(a, b) {
//   return +math.format(math.subtract(a, b), {precision: 14});
// }

// function multiply(a, b) {
//  return +math.format(math.multiply(a, b), {precision: 14});
// }

// function divide(a, b) {
//   return +math.format(math.divide(a, b), {precision: 14});
// }