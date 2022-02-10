"use strict";

// Operations Functions
const multiplyBy = (v1, v2) => {
  return v1 * v2;
};

const sumTo = (v1, v2) => {
  return v1 + v2;
};

const divideBy = (v1, v2) => {
  return v2 === 0 ? 0 : Number((v1 / v2).toFixed(2));
};

const subtractFrom = (v1, v2) => {
  return v1 - v2;
};

// Operation to functions dict
const operatorToFunction = {
  x: multiplyBy,
  "+": sumTo,
  "÷": divideBy,
  "-": subtractFrom,
};

function evaluateExpression([val1, operation, val2]) {
  return operatorToFunction[operation](val1, val2);
}
