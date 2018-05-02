const calculator = {
  stack: [],
  scope: [],

  insertFnInStack: function(fn) {
    let insertionIndex = this.calculateFnIndex(fn.name);
    insertionIndex = (insertionIndex === -1) ? this.stack.length : insertionIndex;
    this.stack.splice(insertionIndex, 0, fn);
  },

  calculateFnIndex: function(fnName) {
    const operators = this.stack.filter(elem => typeof elem === 'object').reverse();
    if (operators.length === 0) { return 0; }

    let index = this.stack.indexOf(
      operators.find(elem => this.getPrecedence(fnName) === this.getPrecedence(elem.name)));

    if (index === -1) {
      index = this.stack.indexOf(
        operators.find(elem => this.getPrecedence(fnName) < this.getPrecedence(elem.name)));
    }
    return index;
  },

  evaluate: function(_stack = this.stack) {
    let params = [];
    _stack.slice(0).reverse().forEach(elem => {
      if (typeof elem === 'number') { params.push(elem); }
      else if (elem.arity === params.length) {
        _stack = this.evaluate([..._stack.slice(0, 0 - params.length - 1),
            operate(elem.name, params.slice(0).reverse())]);
        params = [];
        return _stack;
      } else {
        params = [];
      }
    });
    return _stack.slice(0);
  },

  pushUnaryFn: function(fnName, operand) {
    this.stack.push(operate(fnName, [+operand]));
    return this.peek();
  },

  pushNaryFn: function(fnName, arity, operand) {
    this.insertFnInStack({ name: fnName, arity: +arity });
    this.stack.push(+operand);
    this.stack = this.evaluate();
    return this.peek();
  },

  increaseScope: function() {
    this.scope.push(this.stack);
    this.stack = [];
  },

  decreaseScope: function(operand) {
    this.stack.push(+operand);
    this.stack = this.evaluate();
    const result = this.stack.pop();
    this.stack = this.scope.pop();
    return result;
  },

  resolve: function(operand) {
    this.stack.push(+operand);
    return this.evaluate().pop();
  },

  reset: function() {
    this.scope = [];
    this.stack = [];
  },

  peek: function() {
    return this.stack[this.stack.length-1];
  },

  getPrecedence: function(fnName) {
    switch (fnName) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      case '^':
        return 3;
      default:
        return 10;
    }
  }
}