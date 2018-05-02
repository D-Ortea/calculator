const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

let deleteInput = true;


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
      deleteInput = true;
      if (+opKey.dataset.arity === 1) {
        expression.textContent += ` ${opKey.value}(${+numInput.textContent}) `;
        numInput.textContent = calculator.pushUnaryFn(opKey.value
            , numInput.textContent);            
      } else {
        expression.textContent += 
            `${+numInput.textContent} ${opKey.textContent} `;

        numInput.textContent = 
             calculator.pushNaryFn(
                 opKey.value, opKey.dataset.arity, numInput.textContent);
      }
    });
  });
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