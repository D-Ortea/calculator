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

}

function resolveFn(key) {
  window[key]();
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

function test() {
  console.log(expression);
  console.log(numInput);
}

test();
addNumberKeyListeners();
addFnListeners();