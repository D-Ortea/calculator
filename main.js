const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

let deleteInput = true;
let subexpression = '';

function addNumberKeyListeners() {
  const numKeys = keypad.querySelectorAll('.num');
  numKeys.forEach(numKey => {
    numKey.addEventListener('click', () => {
      if (deleteInput) {
        numInput.textContent = '';
        deleteInput = false;
      }
      numInput.textContent += 
          (numKey.value === '.' && numInput.textContent.indexOf('.') != -1)
              ? '' : numKey.value;
    });
  });
}

function addConstListeners() {
  keypad.querySelectorAll('.const').forEach(consKey => {
    consKey.addEventListener('click', () => {
      numInput.textContent = calculator[consKey.value];
    })
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
      deleteInput = true;
      if (+opKey.dataset.arity === 1) {
        expression.textContent = subexpression.slice(0, -subexpression.length);
        expression.textContent += getNewSubexpression(opKey.value);
        numInput.textContent = calculator.calcUnaryFn(opKey.value
            , numInput.textContent);            
      } else {
        expression.textContent += (subexpression) ? ` ${opKey.textContent} `
            :`${+numInput.textContent} ${opKey.textContent} `;
        
        numInput.textContent = 
             calculator.pushNaryFn(
                 opKey.value, opKey.dataset.arity, numInput.textContent);
        subexpression = '';
      }
    });
  });
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
  expression.textContent += '(';
  calculator.increaseScope();
}

function closeParenthesis() {
  expression.textContent += `${numInput.textContent}) `;
  numInput.textContent = calculator.decreaseScope(numInput.textContent);
}

function deleteOne() {
  const test = numInput.textContent.slice(0, -1);

  if (test) {
    numInput.textContent = test;
  } else {
    clearInput();
  }
}

function clearInput() {
  numInput.textContent = '0';
  subexpression = '';
  deleteInput = true;
}

function clearAll() {
  expression.textContent = '';
  calculator.reset();
  clearInput();
}

function equals() {
  const result = calculator.resolve(numInput.textContent);
  clearAll();
  numInput.textContent = result;
}

addNumberKeyListeners();
addFnListeners();
addOpListeners();
addConstListeners();