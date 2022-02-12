"use strict";

// Operations Functions - Internal Processing
const multiplyBy = (v1, v2) => {
  let result = v1 * v2;
  return result % 1 === 0 ? result : result.toFixed(2);
};

const sumTo = (v1, v2) => {
  let result = v1 + v2;
  return result % 1 === 0 ? result : result.toFixed(2);
};

const divideBy = (v1, v2) => {
  let result = v2 === 0 ? 0 : Number(v1 / v2);
  return result % 1 === 0 ? result : result.toFixed(2);
};

const subtractFrom = (v1, v2) => {
  let result = v1 - v2;
  return result % 1 === 0 ? result : result.toFixed(2);
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
// DOM Manipulation

// ====> display
const resultContainerEl = document.querySelector(".result__container");
const finalResultEl = document.querySelector(".result");
const operationDisplayEl = document.querySelector(".operation__display");
const expressionContainerEl = document.querySelector(".expression__container");
const firstValueEl = document.querySelector(".value-1");
const operatorEl = document.querySelector(".operator");
const secondValueEl = document.querySelector(".value-2");
const currentDisplay = document.querySelector(".current-display");

// Buttons Events

// ====> operators
const clearBtn = document.querySelector(".btn-clear");
const backspaceBtn = document.querySelector(".btn-backspace");
const percentBtn = document.querySelector(".btn-percent");
const divisionBtn = document.querySelector(".btn-division");
const multiplicationBtn = document.querySelector(".btn-mutiplication");
const subtractionBtn = document.querySelector(".btn-subtraction");
const sumBtn = document.querySelector(".btn-sum");
const equalBtn = document.querySelector(".btn-equal");

const operatorBtns = [
  [divisionBtn, "÷"],
  [multiplicationBtn, "x"],
  [subtractionBtn, "-"],
  [sumBtn, "+"],
];

// ====> numbers

const pointBtn = document.querySelector(".btn-point");
const numberBtns = new Array(10)
  .fill(undefined)
  .map((_, i) => [document.querySelector(`.btn-${i}`), i]);

// Dom Logic
window.ontouchstart = (e) => e.preventDefault;
// ====> state variables

let nextValue = false;
let isFloat = false;
let finalExpression = [];
let finishedCalc = false;
let lastResult = 0;
// ====> dom logic

function updateElementText(el, value) {
  if (el.textContent.length < 9) {
    el.textContent = `${el.textContent}` + `${value}`;
  }
}

function getElValue(el) {
  return el.textContent;
}

function showElement(el) {
  el.classList.remove("font-hidden");
}

function hideElement(el) {
  el.classList.add("font-hidden");
}

function changeElementFont(el, size) {
  el.style.fontSize = `${size}rem`;
}

function clearInterface() {
  nextValue = false;
  isFloat = false;
  finalExpression = [];
  finishedCalc = false;
  hideElement(operationDisplayEl);
  currentDisplay.classList.remove("font-hidden");
  currentDisplay.textContent = "";
}

numberBtns.forEach(([el, value]) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (nextValue) {
      finalExpression[1] =
        operatorBtns[
          operatorBtns.findIndex(([el]) =>
            el.classList.contains("current-pressed")
          )
        ][1];
      nextValue = false;
    }
    if (finishedCalc) {
      clearInterface();
      finishedCalc = false;
    }
    updateElementText(currentDisplay, value);
  });
});

pointBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!isFloat) {
    updateElementText(currentDisplay, ".");
    isFloat = true;
  }
});

operatorBtns.forEach((value, _, arr) => {
  const [x] = value;
  x.addEventListener("click", (e) => {
    e.preventDefault();

    isFloat = false;
    nextValue = true;
    finalExpression[0] = Number(getElValue(currentDisplay));
    if (finishedCalc) {
      clearInterface();
      finalExpression[0] = (() => +lastResult)();
      finishedCalc = false;
    }
    arr.forEach((x) => x[0].classList.remove("current-pressed"));
    x.classList.add("current-pressed");
    currentDisplay.textContent = "";
  });
});

equalBtn.addEventListener("click", () => {
  finalExpression[1] =
    operatorBtns[
      operatorBtns.findIndex(([el]) => el.classList.contains("current-pressed"))
    ][1];
  finalExpression[2] = Number(currentDisplay.textContent);
  currentDisplay.classList.add("font-hidden");
  currentDisplay.textContent = "";
  operatorBtns.forEach(([x]) => x.classList.remove("current-pressed"));
  showElement(operationDisplayEl);
  finalResultEl.textContent = evaluateExpression(finalExpression);
  firstValueEl.textContent = finalExpression[0];
  operatorEl.textContent = finalExpression[1];
  secondValueEl.textContent = finalExpression[2];
  finishedCalc = true;
  lastResult = +evaluateExpression(finalExpression);
});

clearBtn.addEventListener("click", clearInterface());

backspaceBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
});

percentBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const result = (+currentDisplay.textContent / 100).toFixed(2);
  currentDisplay.textContent = `${result}`;
});
