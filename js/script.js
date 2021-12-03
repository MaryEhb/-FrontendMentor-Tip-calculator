/*Variables*/

//Input Elements
const billInp = document.getElementById("bill");
const tipInputs = document.querySelectorAll('input[type="radio"]');
const customTipRadio = document.getElementById("customTipRadio");
const customTipInput = document.getElementById("customTipInput");
const allInputs = document.querySelectorAll("input");
const peopleInp = document.getElementById("peopleNum");
const peopleInpParent = peopleInp.parentElement.parentElement;
//Output Elements
const tipamountEle = document.querySelector(".result-tip .result");
const tiptotalEle = document.querySelector(".result-total .result");

//Reset Button
const resetBtn = document.getElementById("reset");

//Appliction
let bill = 0;
let peopleNum = 1;
let tipPercent = 0;
let totalTip = 0;

/* Functions */

const tipCalculator = (bill, tipPercent) => {
  return (tipPercent * bill) / 100;
};

const roundToHundredth = (value) => {
  return Math.round(value * 100) / 100;
};

const getTipPercent = () => {
  let percent = 0;
  if (customTipRadio.checked) {
    customTipRadio.value = customTipInput.value;
  }
  tipInputs.forEach((inp) => {
    if (inp.checked) {
      percent = inp.value;
      return percent;
    }
  });
  return percent;
};

const applicationReload = () => {
  bill = billInp.value;
  peopleNum = peopleInp.value;
  tipPercent = roundToHundredth(getTipPercent());
  if (peopleNum > 0) {
    if (peopleInpParent.classList.contains("zeroPeople")) {
      peopleInpParent.classList.remove("zeroPeople");
    }

    if (bill == 0 || tipPercent == 0) {
      tiptotalEle.innerHTML = "0.00";
      tipamountEle.innerHTML = "0.00";
      return;
    }

    totalTip = tipCalculator(bill, tipPercent);
    tiptotalEle.innerHTML = totalTip;
    tipamountEle.innerHTML = roundToHundredth(totalTip / peopleNum);
  } else {
    peopleInpParent.classList.add("zeroPeople");
  }

  if ((resetBtn.disabled = true)) {
    resetBtn.disabled = false;
  }
};

const reset = () => {
  billInp.value = "";
  peopleInp.value = "";
  customTipInput.value = "";
  tipInputs.forEach((inp) => {
    inp.checked = false;
  });
  tiptotalEle.innerHTML = "0.00";
  tipamountEle.innerHTML = "0.00";
  if (peopleInpParent.classList.contains("zeroPeople")) {
    peopleInpParent.classList.remove("zeroPeople");
  }
  resetBtn.disabled = true;
};

reset();

/* Event Listeners */

allInputs.forEach((inp) => {
  inp.addEventListener("change", () => applicationReload());
  inp.addEventListener("keyup", () => applicationReload());
});

customTipInput.addEventListener("click", () => {
  customTipRadio.value = customTipInput.value;
  customTipRadio.checked = true;
  applicationReload();
});

resetBtn.addEventListener("click", reset);
