const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

const APPEND = true;

let deleteInput = true;
let subexpression = '';

function addNumberKeyListeners() {
  keypad.querySelectorAll('.num').forEach(numKey => {
    numKey.addEventListener('click', () => {
      if (deleteInput) {
        input('');
        deleteInput = false;
      }
      input((numKey.value === '.' && numInput.textContent.indexOf('.') != -1)
        ? '' : numKey.value, APPEND);
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

function addFnListeners() {
  keypad.querySelectorAll('.calc-fn').forEach(fnKey => {
    fnKey.addEventListener('click', () => resolveFn(fnKey.value));
  });
}

function addOpListeners() {
  keypad.querySelectorAll('.fn').forEach(fn => {
    fn.addEventListener('click', () => {
      deleteInput = true;
      if (+fn.dataset.arity === 1) {
        outputUnaryFn(fn);
      } else {
        outputNaryFn(fn);
      }
    });
  });
}

function outputUnaryFn(fn) {
  if (subexpression) {
    addToExpr(expression.textContent.slice(0, -subexpression.length));
  }
  addToExpr(getNewSubexpression(fn.value), APPEND);
  input(calculator.calcUnaryFn(fn.value, numInput.textContent));
}

function outputNaryFn(fn) {
  if(subexpression) {
    addToExpr(` ${fn.textContent} `, APPEND)
  } else {
    addToExpr(`${+numInput.textContent} ${fn.textContent} `, APPEND);
  }
  input(calculator.pushNaryFn(fn.value, fn.dataset.arity, numInput.textContent));
  subexpression = '';
}

function getNewSubexpression(fnName) {
  subexpression = (subexpression) ? `${fnName}(${subexpression})`
    : `${fnName}(${+numInput.textContent})`;
  return subexpression;
}

function resolveFn(key, ...args) {
  window[key](args);
}

function openParenthesis() {
  addToExpr('(', APPEND);
  calculator.increaseScope();
}

function closeParenthesis() {
  addToExpr(`${numInput.textContent}) `, APPEND);
  input(calculator.decreaseScope(numInput.textContent));
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

addNumberKeyListeners();
addFnListeners();
addOpListeners();
addConstListeners();