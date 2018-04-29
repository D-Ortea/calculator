const expression = document.querySelector(`div[class="expression"]`);
const numInput = document.querySelector(`div[class="num-input"`);
const keypad = document.querySelector(`div[class="keypad"`);

function addNumberKeyListeners() {
  const numKeys = keypad.querySelectorAll(`.num`);
  numKeys.forEach(numKey => {
    numKey.addEventListener('click', () => {
      numInput.textContent += numKey.value;
    });
  });
}

function resolveFn() {
  
}

function clearInput() {
  numInput.textContent = '';
}

function test() {
  console.log(expression);
  console.log(numInput);
}

test();
addNumberKeyListeners();