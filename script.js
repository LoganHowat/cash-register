
let paragraph = document.querySelector("#result");

const cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
function cashRegister(price, cash, cid) {
  console.log(price,cash)
  let diff = cash - price;
  // this is the change needed

  if (diff < 0) {
    return {status: "INCORRECT_PAYMENT", change: []}
  }

  // not enough money to pay for items
  
  let totalCashInDrawer = cid.reduce((acc, curr) => acc + curr[1], 0);

  // calculates total change in the till
  
  if (totalCashInDrawer < diff) {
    return {status: "INSUFFICIENT_FUNDS", change: []}
  } else if (totalCashInDrawer === diff) {
    paragraph.innerHTML = cid;
    return {status: "CLOSED", change: cid}
  }
  /* checks if there is enough change in the till or if 
  all of the till should be returned as change*/

  let currencies = [ 
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100]]

  let result = [];

  for (let i = cid.length-1; i >= 0; i--) {
    let currency = cid[i];
    let name = currency[0];
    let value = currency[1]

    if (diff <= 0) {
      break;
    }

    if (diff >= value) {
      diff -= value;
      result.unshift(currency)
      continue;
    }

    let sum = 0
    while (diff <= value && diff >= currencies[i][1]) {

      diff = Math.round(diff * 100) / 100;

      sum += currencies[i][1];
      diff -= currencies[i][1];
    }

    if (sum == 0) {
      continue;
    }

    result.unshift([name, sum]);

  }

  console.log(diff)

  if (diff > 0) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  }

  
  return {status: "OPEN",change: result};
}



function displayChange(obj) {
  let change = obj.change;
  var tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';

  let status = obj.status
  var tillStatus = document.getElementById('tillStatus')
  tillStatus.innerHTML = status
  
  for (let i = 0; i < change.length; i++) {
    var row = tableBody.insertRow();
    var col1 = row.insertCell(0);
    var col2 = row.insertCell(1);
    col1.innerHTML = change[i][0];
    col2.innerHTML = change[i][1];
  };

}



