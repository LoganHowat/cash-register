function cashRegister(price, cash, cid) {
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

  let change = [];

  for (let i = cid.length -1; i > 0; i--) {
    let currency = cid[i];
    let name = currency[0];
    let value = currency[1]

    if (diff >= value) {
      diff -= value;
      continue;
    }

    let sum = 0
    while (diff <= value && diff >= currencies[i]) {
      sum += currencies[i][1];
      diff -= value;
    }
    change.push([name, sum]);

  }

return change;


}

// Example function call
console.log(cashRegister(19.5, 20, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]));
