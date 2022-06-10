describe("Servers test (with setup and tear-down)", function() {
  beforeEach(function () {
    // initialization logic
    serverNameInput.value = 'Alice';
  });

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo();

    expect(Object.keys(allServers).length).toEqual(1);
    expect(allServers['server' + serverId].serverName).toEqual('Alice');
  });

  afterEach(function() {
    // teardown logic
    allServers = {};
    serverId = 0;
    document.querySelector("#summaryTable tbody tr")?.remove();
    document.querySelector("#paymentTable tbody tr")?.remove();
    document.querySelector("#serverTable tbody tr")?.remove();

  });
});
