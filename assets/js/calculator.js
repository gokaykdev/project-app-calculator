const BUTTONS_NUMBER = document.querySelectorAll(".btn-number");
const BUTTON_ZERO = document.querySelector(".btn-zero");
const BUTTONS_OPERATOR = document.querySelectorAll(".btn-operator");
const BUTTON_EQUAL = document.querySelector(".btn-equal");
const BUTTON_DOT = document.querySelector(".btn-dot");
const BUTTON_CLEAR = document.querySelector(".btn-clear");
const BUTTON_BACK = document.querySelector(".btn-back");
const DISPLAY_FIELD = document.querySelector(".display-field");
const OPERATOR_TEXT = document.querySelector(".operator-text");
const OLD_NUMBER_TEXT = document.querySelector(".old-number");
let started = false;
let finished = false;
let calculateWith, oldNumber, currentNumber, newOperator, result;

BUTTONS_NUMBER.forEach(function (e) {
  e.addEventListener("click", function () {
    checkStart();
    if (DISPLAY_FIELD.value.length < 10) {
      DISPLAY_FIELD.value += this.value;
    }
    currentNumber = DISPLAY_FIELD.value;
  });
});

BUTTON_DOT.addEventListener("click", function () {
  if (!DISPLAY_FIELD.value.includes(".")) {
    DISPLAY_FIELD.value += this.value;
    started = true;
    finished = false;
  }
});

BUTTONS_OPERATOR.forEach(function (e) {
  e.addEventListener("click", function () {
    addOperator(this.value);
  });
});

BUTTON_CLEAR.addEventListener("click", resetDisplay);
BUTTON_BACK.addEventListener("click", backOneTime);
BUTTON_EQUAL.addEventListener("click", function () {
  calculateTheResult();
});

/* 
  Başlangıcı kontrol et. Hiç rakam eklenmemişse, textbox'un değerini sıfırla ve basılan butonun değerini ekle.
  İlk değer sıfırsa ve tekrar sıfıra basılırsa, textbox'u tekrar sıfırla.
*/
function checkStart() {
  if (started === false || finished === true) {
    started = true;
    finished = false;
    DISPLAY_FIELD.value = "";
  } else if (Number(DISPLAY_FIELD.value) === 0 && !(DISPLAY_FIELD.value === "0.")) {
    DISPLAY_FIELD.value = "";
    started = true;
  }
  DISPLAY_FIELD.style.fontSize = "3.6rem";
}

/*
  Textbox'u tamamen resetle.
*/
function resetDisplay() {
  DISPLAY_FIELD.value = "0";
  OPERATOR_TEXT.innerHTML = "";
  OLD_NUMBER_TEXT.innerHTML = "";
  started = false;
  finished = true;
  calculateWith = undefined;
  oldNumber = undefined;
  currentNumber = undefined;
  result = undefined;
  DISPLAY_FIELD.style.fontSize = "3.6rem";
}

/*
  En sondaki elemanı sil, eğer kalan tek eleman da silinirse başlangıcı sıfır yap ama resetleme.
*/
function backOneTime() {
  DISPLAY_FIELD.value = DISPLAY_FIELD.value.slice(0, DISPLAY_FIELD.value.length - 1);
  currentNumber = DISPLAY_FIELD.value;
  if (DISPLAY_FIELD.value === "") {
    DISPLAY_FIELD.value = 0;
  }
}

/*
  Operatörü ekle ve mevcut değeri eski değer olarak bir değişkene kaydet.
  Mevcut değeri, yeni girilecek değer için sıfırla.
*/
function addOperator(operator) {
  if (!(oldNumber === undefined)) {
    switch (calculateWith) {
      case "+":
        if (!(Number(DISPLAY_FIELD.value) === 0)) {
          oldNumber = Number(oldNumber) + Number(DISPLAY_FIELD.value);
          DISPLAY_FIELD.value = "0";
        }
        break;
      case "-":
        if (!(Number(DISPLAY_FIELD.value) === 0)) {
          oldNumber = Number(oldNumber) - Number(DISPLAY_FIELD.value);
          DISPLAY_FIELD.value = "0";
        }
        break;
      case "*":
        if (!(Number(DISPLAY_FIELD.value) === 0)) {
          oldNumber = Number(oldNumber) * Number(DISPLAY_FIELD.value);
          DISPLAY_FIELD.value = "0";
        }
        break;
      case "/":
        if (!(Number(DISPLAY_FIELD.value) === 0)) {
          oldNumber = Number(oldNumber) / Number(DISPLAY_FIELD.value);
          DISPLAY_FIELD.value = "0";
        }
        break;
    }
  }
  if (Number(DISPLAY_FIELD.value) === 0) {
    currentNumber = "0";
  }
  calculateWith = operator;
  OPERATOR_TEXT.innerHTML = operator;
  if (OLD_NUMBER_TEXT.innerHTML === "") {
    oldNumber = DISPLAY_FIELD.value;
    DISPLAY_FIELD.value = "0";
  }
  oldNumber = String(oldNumber);
  if (oldNumber.length > 10) oldNumber = oldNumber.slice(0, 12);
  OLD_NUMBER_TEXT.innerHTML = oldNumber;
}

function calculateTheResult() {
  switch (calculateWith) {
    case "+":
      result = Number(oldNumber) + Number(currentNumber);
      DISPLAY_FIELD.value = result;
      OLD_NUMBER_TEXT.innerHTML = "";
      OPERATOR_TEXT.innerHTML = "";
      calculateWith = undefined;
      finished = true;
      if (DISPLAY_FIELD.value.length > 12) {
        DISPLAY_FIELD.style.fontSize = "21px";
      }
      break;
    case "-":
      result = Number(oldNumber) - Number(currentNumber);
      DISPLAY_FIELD.value = result;
      OLD_NUMBER_TEXT.innerHTML = "";
      OPERATOR_TEXT.innerHTML = "";
      calculateWith = undefined;
      finished = true;
      if (DISPLAY_FIELD.value.length > 12) {
        DISPLAY_FIELD.style.fontSize = "21px";
      }
      break;
    case "*":
      result = Number(oldNumber) * Number(currentNumber);
      DISPLAY_FIELD.value = result;
      OLD_NUMBER_TEXT.innerHTML = "";
      OPERATOR_TEXT.innerHTML = "";
      calculateWith = undefined;
      finished = true;
      if (DISPLAY_FIELD.value.length > 12) {
        DISPLAY_FIELD.style.fontSize = "21px";
      }
      break;
    case "/":
      result = Number(oldNumber) / Number(currentNumber);
      DISPLAY_FIELD.value = result;
      OLD_NUMBER_TEXT.innerHTML = "";
      OPERATOR_TEXT.innerHTML = "";
      calculateWith = undefined;
      finished = true;
      if (DISPLAY_FIELD.value.length > 12) {
        DISPLAY_FIELD.style.fontSize = "21px";
      }
      break;
    default:
      result = DISPLAY_FIELD.value;
      DISPLAY_FIELD.value = result;
      calculateWith = undefined;
      finished = true;
      started = false;
  }
}
