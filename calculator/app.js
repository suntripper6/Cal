// VARIABLES
const { body } = document;
const display = document.querySelector("h1");
const btnInputs = document.querySelectorAll("button");
const btnClear = document.querySelector(".all-clear");
const btnEqual = document.querySelector(".equal");

let firstOperand = 0;
let operatorVal = "";
let isNextNumber = false;

// FUNCTIONS
const btnValue = (value) => {
  if (isNextNumber) {
    display.textContent = value;
    isNextNumber = false;
  } else {
    let displayVal = display.textContent;
    display.textContent = displayVal === "0" ? value : displayVal + value;
  }
};

const btnInputDecimal = () => {
  if (isNextNumber) {
    return;
  }
  if (!display.textContent.includes(".")) {
    display.textContent = `${display.textContent}.`;
  }
};

const calculate = (operator, num1, num2) => {
  switch (operator) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "/":
      if (num2 === 0) {
        return "Cannot divide by 0";
      }
      return num1 / num2;
    case "*":
      return num1 * num2;
    case "=":
      return num2;
  }
};

const getOperatorValue = (operator) => {
  let nextOperand = Number(display.textContent);
  if (operatorVal && isNextNumber) {
    operatorVal = operator;
    return;
  }
  if (!firstOperand) {
    firstOperand = nextOperand;
  } else {
    let result = calculate(operatorVal, firstOperand, nextOperand);
    display.textContent = result;
    firstOperand = result;
  }
  isNextNumber = true;
  operatorVal = operator;
};

const setAllClear = () => {
  display.textContent = "0";
  entry = 0;
  operatorVal = "";
  isNextNumber = false;
};

// EVENT LISTENERS
btnInputs.forEach((btnInput) => {
  if (parseInt(btnInput.value) >= 0) {
    btnInput.addEventListener("click", () => btnValue(btnInput.value));
  } else if (btnInput.classList.contains("decimal")) {
    btnInput.addEventListener("click", btnInputDecimal);
  } else if (btnInput.classList.contains("operator")) {
    btnInput.addEventListener("click", () => getOperatorValue(btnInput.value));
  }
});

btnClear.addEventListener("click", setAllClear);
