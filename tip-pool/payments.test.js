
describe("submitPaymentInfo tests", function() {
  beforeEach(function(){
    allPayments = {};
    paymentId = 0;
  })

  it("should generate a payment object correctly", function() {
    billAmtInput.value = 20
    tipAmtInput.value = 10

    // this calls submitPaymentInfo, which requires an event
    document.querySelector("#paymentForm > button").click()

    expect(allPayments).toEqual({
      payment1: {billAmt: '20', tipAmt: '10', tipPercent: 50}
    })
  });

  it("should generate a payment object correctly", function() {
    billAmtInput.value = 80
    tipAmtInput.value = 23

    // this calls submitPaymentInfo, which requires an event
    document.querySelector("#paymentForm > button").click()

    expect(allPayments).toEqual({
      payment1: {billAmt: '80', tipAmt: '23', tipPercent: 29}
    })
  });

  afterEach(function() {
    // teardown logic
    billAmtInput.value = null;
    tipAmtInput.value = null;
    allPayments = {};
    document.querySelector("#summaryTable tbody tr")?.remove();
    document.querySelector("#paymentTable tbody tr")?.remove();

  });
});


