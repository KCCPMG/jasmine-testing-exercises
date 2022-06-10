// sumPaymentTotal tests 
describe("sumPaymentTotal should correctly sum numbers", function() {

  it("should correctly calculate totals", function() {
    billAmtInput.value = 20
    tipAmtInput.value = 10

    let curPayment = createCurPayment();

    if (curPayment) {
      paymentId += 1;

      allPayments['payment' + paymentId] = curPayment;

      appendPaymentTable(curPayment);
      updateServerTable();
      updateSummary();

      billAmtInput.value = '';
      tipAmtInput.value = '';
    }

    expect(sumPaymentTotal("billAmt")).toEqual(20);
    expect(sumPaymentTotal("tipAmt")).toEqual(10);
    expect(sumPaymentTotal("tipPercent")).toEqual(50);

    billAmtInput.value = 20
    tipAmtInput.value = 10

    curPayment = createCurPayment();

    if (curPayment) {
      paymentId += 1;

      allPayments['payment' + paymentId] = curPayment;

      appendPaymentTable(curPayment);
      updateServerTable();
      updateSummary();

      billAmtInput.value = '';
      tipAmtInput.value = '';
    }

    expect(sumPaymentTotal("billAmt")).toEqual(40);
    expect(sumPaymentTotal("tipAmt")).toEqual(20);
    expect(sumPaymentTotal("tipPercent")).toEqual(100);

    billAmtInput.value = 20
    tipAmtInput.value = 10

    curPayment = createCurPayment();

    if (curPayment) {
      paymentId += 1;

      allPayments['payment' + paymentId] = curPayment;

      appendPaymentTable(curPayment);
      updateServerTable();
      updateSummary();

      billAmtInput.value = '';
      tipAmtInput.value = '';
    }

    expect(sumPaymentTotal("billAmt")).toEqual(60);
    expect(sumPaymentTotal("tipAmt")).toEqual(30);
    expect(sumPaymentTotal("tipPercent")).toEqual(150);

    
  })

  afterEach(function() {
    // teardown logic
    allPayments = {};
    for (let el of document.querySelectorAll("#summaryTable tbody tr")) {
      el.remove();
    }
    for (let el of document.querySelectorAll("#paymentTable tbody tr")) {
      el.remove();
    }
    for (let el of document.querySelectorAll("#serverTable tbody tr")) {
      el.remove();
    }
  });
})

// calculateTipPerccent test
describe("calculateTipPercent should correctly determine tip amounts", function() {
  // pure function, no DOM buildup or tear down necessary

  it("should get 20 from $100 with a $20 tip", function() {
    expect(calculateTipPercent(100, 20)).toEqual(20);
  });

  it("should get 15 from $200 with a $30 tip", function() {
    expect(calculateTipPercent(100, 20)).toEqual(20);
  });

  it("should get 27 from $67 with a $18 tip", function() {
    expect(calculateTipPercent(100, 20)).toEqual(20);
  });
})

describe("appendDeleteBtn functionality on servers", function() {


  it("should be visible after creating a new server", function() {
    // populate server name field
    serverNameInput.value = "Peter"
    // trigger submitServerInfo
    let tableBody = document.querySelector("#serverTable tbody")
    let trTargetIndex = tableBody.children.length
    document.querySelector("#serverForm button").click();

    let trTarget = tableBody.children[trTargetIndex];

    expect(trTarget.children[0].textContent === "Peter");
    expect(trTarget.children[2].textContent === "X");
  }); 
  
  it("should remove the element from the dom, and the server from allServers", function(){
    // populate server name field
    serverNameInput.value = "Peter"
    // trigger submitServerInfo
    let tableBody = document.querySelector("#serverTable tbody")
    let trTargetIndex = tableBody.children.length
    document.querySelector("#serverForm button").click();

    let trTarget = tableBody.children[trTargetIndex];

    // click the button
    trTarget.children[2].click();

    // deleted row
    expect(tableBody.children.length).toEqual(trTargetIndex);

    // deleted from allServers
    expect(Object.keys(allServers).length).toEqual(0);

  })


  it("should be visible after creating a new payment", function(){
    billAmtInput.value = 30;
    tipAmtInput.value = 8;

    let tableBody = document.querySelector("#paymentTable tbody")
    let trTargetIndex = tableBody.children.length
    document.querySelector("#paymentForm button").click();

    let trTarget = tableBody.children[trTargetIndex];

    expect(trTarget.children[0].textContent === "30");
    expect(trTarget.children[3].textContent === "X");

  })

  it("should remove the element from the dom, and the payment from allPayments", function() {
    billAmtInput.value = 30;
    tipAmtInput.value = 8;

    let tableBody = document.querySelector("#paymentTable tbody")
    let trTargetIndex = tableBody.children.length
    document.querySelector("#paymentForm button").click();
    
    let trTarget = tableBody.children[trTargetIndex];

    console.log(allPayments);
    console.log(trTarget.id)
    console.log(allPayments[trTarget.id]);
    trTarget.children[3].click();

    // deleted row
    expect(tableBody.children.length).toEqual(trTargetIndex);

    // deleted from allPayments
    console.log(allPayments);
    expect(Object.keys(allPayments).length).toEqual(0);
  })

  afterEach(function() {
    serverId = 1;
    paymentId = 1;
    allPayments = {};
    allServers = {};
    for (let child of serverTable.querySelector("tbody").children) {
      child.remove();
    }
    for (let child of paymentTbody.children) {
      child.remove();
    }
    for (let td of summaryTds) {
      td.remove();
    }
  });
})