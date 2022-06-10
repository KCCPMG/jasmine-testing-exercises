window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.querySelector("#loan-amount").value = 10000;
  document.querySelector("#loan-years").value = 10;
  document.querySelector("#loan-rate").value = 5;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let str = calculateMonthlyPayment(getCurrentUIValues());
  updateMonthly(str);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const principal = values.amount;
  const interest_rate = (values.rate / 100) / 12;
  const number_of_payments = Math.floor(values.years * 12);
  
  let numerator = principal * interest_rate;
  // let denominator = (1 - (1 + interest_rate)**(-number_of_payments));

  let denominator = (1 - Math.pow((1 + interest_rate), (-number_of_payments)));
  let quotient = (numerator / denominator);
  // let retString = ( Math.round(quotient * 100) / 100 );

  if (Number.isNaN(quotient) 
  || !Number.isFinite(quotient)
  || (quotient < 0)
  ) {
    return "Please make sure that all input fields have a positive number.";
  } else {
    return formatReturnString( Math.round(quotient * 100) / 100 )
  } 

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.querySelector("#monthly-payment").textContent = monthly;
}


function formatReturnString(number) {

  let numberStr = String(number);
  if (!(numberStr.match(/\./g))) numberStr += "."
  let [ones, decimal] = numberStr.split(".");
  while (decimal.length < 2) {
    decimal += '0';
  }

  if (ones.length > 3) {
    let remainder = ones.length % 3;
    let numberChunks = [];
    let lastIndex = 0;
    for (let i=remainder; i<=ones.length; i+=3) {
      numberChunks.push(ones.slice(lastIndex, i));
      lastIndex = i;
    }
    // remove blank beginning if remainder was 0
    if (numberChunks[0] === "") numberChunks.shift();
    ones = numberChunks.join(",");
  }


  numberStr = `$${[ones, decimal].join(".")}`
  return numberStr;
}