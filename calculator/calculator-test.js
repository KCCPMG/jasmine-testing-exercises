
it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: 5,
    rate: 7,
  })).toEqual("$198.01")
  expect(calculateMonthlyPayment({
    amount: 10,
    years: 100,
    rate: 80,
  })).toEqual("$0.67");
  expect(calculateMonthlyPayment({
    amount: 999,
    years: .5,
    rate: 15,
  })).toEqual("$173.86");
});


it("should return a result with 2 decimal places", function() {
  let endingRe = /(\.\d{2}$)/
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: 5,
    rate: 7,
  })).toMatch(endingRe);
  expect(calculateMonthlyPayment({
    amount: 10,
    years: 100,
    rate: 80,
  })).toMatch(endingRe);
  expect(calculateMonthlyPayment({
    amount: 999,
    years: .5,
    rate: 15,
  })).toMatch(endingRe);
});

it("should return an error message for invalid input", function(){
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: null,
    rate: 7,
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: .5,
    rate: "banana slug",
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: NaN,
    years: .5,
    rate: 7,
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: {
      number: 3
    },
    years: .5,
    rate: 7,
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: 10000,
    years: .5,
    rate: {
      rate: 7
    },
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: new Set([1000]),
    years: .5,
    rate: 7,
  })).toEqual("Please make sure that all input fields have a positive number.");
  expect(calculateMonthlyPayment({
    amount: -10000,
    years: .5,
    rate: 7,
  })).toEqual("Please make sure that all input fields have a positive number.");
})