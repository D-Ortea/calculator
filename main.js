const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

let deleteInput = true;
let result = 0;
let previousOp = '';


function addNumberKeyListeners() {
  const numKeys = keypad.querySelectorAll('.num');
  numKeys.forEach(numKey => {
    numKey.addEventListener('click', () => {
      if (deleteInput) {
        numInput.textContent = '';
        deleteInput = false;
      }
      numInput.textContent += numKey.value;
    });
  });
}

function addFnListeners() {
  const fnKeys = keypad.querySelectorAll('.fn');
  fnKeys.forEach(fnKey => {
    fnKey.addEventListener('click', () => resolveFn(fnKey.value));
  });
}

function addOpListeners() {
  const opKeys = keypad.querySelectorAll('.op');
  opKeys.forEach(opKey => {
    opKey.addEventListener('click', () => {

      if(deleteInput) {
        expression.textContent = expression.textContent.slice(0, -3);
      } else {
        expression.textContent += numInput.textContent;
        result = (previousOp) ? operate(previousOp, +result, +numInput.textContent)
                              : +numInput.textContent;
        numInput.textContent = result;
      }
      
      previousOp = opKey.value;
      expression.textContent += ` ${opKey.textContent} `;
      deleteInput = true;

    });
  });
}

function resolveFn(key, ...args) {
  window[key](args);
}

function deleteOne() {
  const test = numInput.textContent.slice(0, -1);
  
  if(test) {
    numInput.textContent = test;
  } else {
    clearInput();
  }
}

function clearInput() {
  numInput.textContent = '0';
  deleteInput = true;
}

function clearAll() {
  expression.textContent = '';
  clearInput();
}

function evaluate() {
  
}

function test() {
  console.log(expression);
  console.log(numInput);
}

test();
addNumberKeyListeners();
addFnListeners();
addOpListeners();