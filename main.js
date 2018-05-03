const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

const APPEND = true;
const STANDARD = 0;
const SCIENTIFIC = 1;

let deleteInput = true;
let waitingForInput = true;
let subexpression = '';
let calcType = SCIENTIFIC;

function main() {
  populateKeypad();
  addKeyListeners();
  addNumberKeyListeners();
  addCalcFnListeners();
  addFnListeners();
  addConstListeners();
}

function addKeyListeners() {
  document.addEventListener('keyup', (event) => {
    const obj = keyBtns.find(key => key.keyCode === event.key);
    if(!obj) { return; }
    const btn = Array.from(keypad.children).find(key => key.value === obj.name);
    btn.click();
  });
}

function addNumberKeyListeners() {
  keypad.querySelectorAll('.num').forEach(numKey => {
    numKey.addEventListener('click', () => {
      if (deleteInput) {
        input('');
        deleteInput = false;
      }
      if(subexpression) {
        const index = getExpr().lastIndexOf(subexpression);
        addToExpr(getExpr().slice(0, index));
        subexpression = '';
      }
      input((numKey.value === '.' && numInput.textContent.indexOf('.') != -1)
        ? '' : numKey.value, APPEND);
      waitingForInput = false;
    });
  });
}

function addConstListeners() {
  keypad.querySelectorAll('.const').forEach(consKey => {
    consKey.addEventListener('click', () => {
      input(calculator[consKey.value]);
    })
  });
}

function addCalcFnListeners() {
  keypad.querySelectorAll('.calc-fn').forEach(fnKey => {
    fnKey.addEventListener('click', () => resolveFn(fnKey.value));
  });
}

function addFnListeners() {
  keypad.querySelectorAll('.fn').forEach(fn => {
    fn.addEventListener('click', () => executeFn(fn));
  });
}

function addSwitchBtnsListeners() {
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => swapMode(btn));
  });
}

function swapMode(btn) {
  if(calcType === btn.value){ return; }
  switchOff();
  calcType = +btn.value;
  switchOn(btn);
  
  keypad.innerHTML = '';
  let rows, cols;
  [rows, cols] = (calcType === STANDARD) ? [6, 4] : [7, 5];
  document.documentElement.style.setProperty('--keypadRows', rows);
  document.documentElement.style.setProperty('--keypadCols', cols);
  main();
}

function switchOff() {
  document.querySelector('.on').classList.toggle('on');
}

function switchOn(btn) {  
  btn.classList.toggle('on');
}

function executeFn(fn) {
  const fnObj = keyBtns.find(func => func.text === fn.textContent);
  deleteInput = true;
  if (fnObj.arity === 1) {
    outputUnaryFn(fnObj);
    waitingForInput = false;
  } else {
    outputNaryFn(fnObj);
  }
}

function populateKeypad() {
  const filter = (calcType === STANDARD) ? x => x.order[STANDARD]
                                         : x => x.display !== false;
  const keys = keyBtns.filter(filter);
  keys.sort((a, b) => a.order[calcType] - b.order[calcType]);
  keys.forEach(key => {
    keypad.appendChild(createBtn(key));
  });
}

function createBtn(key) {
  const btn = document.createElement('button');
  btn.classList.add(...key.class);
  btn.textContent = key.text;
  btn.value = key.name;
  return btn;
}

function outputUnaryFn(fn) {
  if (subexpression) {
    addToExpr(getExpr().slice(0, -subexpression.length));
  }
  addToExpr(getNewSubexpression(fn.expr), APPEND);
  input(calculator.calcUnaryFn(fn.name, numInput.textContent));
}

function outputNaryFn(fn) {
  if (waitingForInput) { return; }
  if (subexpression) {
    addToExpr(` ${fn.expr} `, APPEND);
  } else {
    addToExpr(`${+numInput.textContent} ${fn.expr} `, APPEND);
  }
  input(calculator.pushNaryFn(fn.name, fn.arity, numInput.textContent));
  subexpression = '';
  waitingForInput = true;
}

function getNewSubexpression(fnExpr) {
  subexpression = (subexpression) ? `${fnExpr}(${subexpression})`
    : `${fnExpr}(${+numInput.textContent})`;
  return subexpression;
}

function resolveFn(key, ...args) {
  window[key](args);
}

function openParenthesis() {
  if (getExpr().length === 0 || waitingForInput) {
    addToExpr('(', APPEND);
    calculator.increaseScope();
  }
}

function closeParenthesis() {
  const chars = Array.from(getExpr());
  if( (chars.filter(char => char === '(').length
      - chars.filter(char => char === ')').length) === 0) {
    return;
  }
  if(!deleteInput) {
    addToExpr(`${numInput.textContent}`, APPEND);
  }
  addToExpr(')', APPEND);
  subexpression =
     getExpr().slice(getExpr().lastIndexOf('('));
  input(calculator.decreaseScope(numInput.textContent));
  deleteInput = true;
}

function deleteOne() {
  const test = numInput.textContent.slice(0, -1);

  if (test) {
    input(test);
  } else {
    clearInput();
  }
}

function clearInput() {
  input('0');
  subexpression = '';
  deleteInput = true;
}

function clearAll() {
  addToExpr('');
  calculator.reset();
  clearInput();
}

function equals() {
  const result = calculator.resolve(numInput.textContent);
  clearAll();
  input(result);
}

function mayus() {
  const newKeys = keyBtns.filter(key => key.display === false);
  keyBtns.forEach(key => {
    if (typeof key.display === 'boolean') {
      key.display = !key.display;
    };
  });
  newKeys.sort((a, b) => a.order[calcType] - b.order[calcType]);
  newKeys.forEach((key, i) => {
    const btn = createBtn(key);
    keypad.replaceChild(btn, keypad.children[i]);
    btn.addEventListener('click', () => executeFn(btn));
  });
}

function input(txt, append = false) {
  if (append) {
    numInput.textContent += txt;
  } else {
    numInput.textContent = txt;
  }
}

function addToExpr(txt, append = false) {
  if (append) {
    expression.textContent += txt;
  } else {
    expression.textContent = txt;
  }
}

function getExpr() {
  return expression.textContent;
}

const keyBtns = [
  { name: 'square', arity: 1, text: 'x²', expr: 'sqr', class: ['cell', 'fn'], display: true, order: [2, 1], keyCode: 'q' },
  { name: 'power', arity: 2, text: 'xʸ', expr: '^', class: ['cell', 'fn'], display: true, order: [, 2], keyCode: 'y' },
  { name: 'sine', arity: 1, text: 'sin', expr: 'sin', class: ['cell', 'fn'], display: true, order: [, 3], keyCode: 's' },
  { name: 'cosine', arity: 1, text: 'cos', expr: 'cos', class: ['cell', 'fn'], display: true, order: [, 4], keyCode: 'c' },
  { name: 'tangent', arity: 1, text: 'tan', expr: 'tan', class: ['cell', 'fn'], display: true, order: [, 5], keyCode: 't' },
  { name: 'squareRoot', arity: 1, text: '√', expr: '√', class: ['cell', 'fn'], display: true, order: [1, 6], keyCode: '@' },
  { name: 'pow10', arity: 1, text: '10ˣ', expr: '10^', class: ['cell', 'fn'], display: true, order: [, 7], keyCode: 'g' },
  { name: 'log10', arity: 1, text: 'log', expr: 'log', class: ['cell', 'fn'], display: true, order: [, 8], keyCode: 'l' },
  { name: 'exp', arity: 2, text: 'Exp', expr: 'exp', class: ['cell', 'fn'], display: true, order: [, 9], keyCode: 'x' },
  { name: 'modulus', arity: 2, text: 'Mod', expr: 'mod', class: ['cell', 'fn'], display: true, order: [, 10], keyCode: 'd' },
  { name: 'mayus', text: '↑', class: ['cell', 'calc-fn'], order: [, 11], keyCode: ' ' },
  { name: 'clearInput', text: 'CE', class: ['cell', 'calc-fn'], order: [5, 12], keyCode: 'Delete' },
  { name: 'clearAll', text: 'C', class: ['cell', 'calc-fn'], order: [6, 13], keyCode: '_' },
  { name: 'deleteOne', text: '⌫', class: ['cell', 'calc-fn'], order: [7, 14], keyCode: 'Backspace' },
  { name: 'divide', arity: 2, text: '÷', expr: '÷', class: ['cell', 'fn'], order: [8, 15], keyCode: '/' },
  { name: 'PI', text: 'π', class: ['cell', 'const'], order: [, 16], keyCode: 'p' },
  { name: '7', text: '7', class: ['cell', 'num'], order: [9, 17], keyCode:  '7'},
  { name: '8', text: '8', class: ['cell', 'num'], order: [10, 18], keyCode: '8' },
  { name: '9', text: '9', class: ['cell', 'num'], order: [11, 19], keyCode: '9' },
  { name: 'multiply', arity: 2, text: '×', expr: '×', class: ['cell', 'fn'], order: [12, 20], keyCode: '*' },
  { name: 'factorial', arity: 1, text: 'n!', expr: 'fact', class: ['cell', 'fn'], order: [, 21], keyCode: '!' },
  { name: '4', text: '4', class: ['cell', 'num'], order: [13, 22], keyCode: '4' },
  { name: '5', text: '5', class: ['cell', 'num'], order: [14, 23], keyCode: '5' },
  { name: '6', text: '6', class: ['cell', 'num'], order: [15, 24], keyCode: '6' },
  { name: 'subtract', arity: 2, text: '−', expr: '−', class: ['cell', 'fn'], order: [16, 25], keyCode: '-' },
  { name: 'negate', arity: 1, text: '±', expr: 'negate', class: ['cell', 'fn'], order: [21, 26], keyCode: '`' },
  { name: '1', text: 1, class: ['cell', 'num'], order: [17, 27], keyCode: '1' },
  { name: '2', text: 2, class: ['cell', 'num'], order: [18, 28], keyCode: '2' },
  { name: '3', text: '3', class: ['cell', 'num'], order: [19, 29], keyCode: '3' },
  { name: 'add', arity: 2, text: '+', expr: '+', class: ['cell', 'fn'], order: [20, 30], keyCode: '+' },
  { name: 'openParenthesis', text: '(', class: ['cell', 'calc-fn'], order: [, 31], keyCode: '(' },
  { name: 'closeParenthesis', text: ')', class: ['cell', 'calc-fn'], order: [, 32], keyCode: ')' },
  { name: '0', text: '0', class: ['cell', 'num'], order: [22, 33], keyCode: '0' },
  { name: '.', text: '.', class: ['cell', 'num'], order: [23, 34], keyCode: '.' },
  { name: 'equals', arity: 1, text: '=', class: ['cell', 'calc-fn'], order: [24, 35], keyCode: 'Enter' },

  { name: 'cube', arity: 1, text: 'x³', expr: 'cube', class: ['cell', 'fn'], display: false, order: [, 1], keyCode: '#' },
  { name: 'yroot', arity: 2, text: 'ʸ√x', expr: 'yroot', class: ['cell', 'fn'], display: false, order: [, 2], keyCode: 'u' },
  { name: 'arcsine', arity: 1, text: 'sin⁻¹', expr: 'sin⁻¹', class: ['cell', 'fn'], display: false, order: [, 3], keyCode: 'S' },
  { name: 'arccosine', arity: 1, text: 'cos⁻¹', expr: 'cos⁻¹', class: ['cell', 'fn'], display: false, order: [, 4], keyCode: 'C' },
  { name: 'arctangent', arity: 1, text: 'tan⁻¹', expr: 'tan⁻¹', class: ['cell', 'fn'], display: false, order: [, 5], keyCode: 'T' },
  { name: 'reciprocal', arity: 1, text: '1⁄x', expr: '1/', class: ['cell', 'fn'], display: false, order: [3, 6], keyCode: 'r' },
  { name: 'epow', arity: 1, text: 'eˣ', expr: 'e^', class: ['cell', 'fn'], display: false, order: [, 7], keyCode: 'e' },
  { name: 'logn', arity: 1, text: 'ln', expr: 'ln', class: ['cell', 'fn'], display: false, order: [, 8], keyCode: 'n' },
  { name: 'exp', arity: 2, text: 'Exp', expr: 'exp', class: ['cell', 'fn'], display: false, order: [, 9], keyCode: 'x' },
  { name: 'modulus', arity: 2, text: 'Mod', expr: 'mod', class: ['cell', 'fn'], display: false, order: [4, 10], keyCode: 'd' }
];

addSwitchBtnsListeners();
main();