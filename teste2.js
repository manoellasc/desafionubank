const differenceInMinutes = require("date-fns/differenceInMinutes");
const transactions = [
  {
    transaction: {
      merchant: "Burger King",
      amount: 20,
      time: "2019-09-10T11:10:00.000Z"
    }
  },
  {
    transaction: {
      merchant: "KFC",
      amount: 20,
      time: "2019-09-10T11:09:00.000Z"
    }
  }
];
var x = 0;
for (var i = 0; i < transactions.length; i++) {
  dif = differenceInMinutes(
    new Date(),
    new Date(transactions[i].transaction.time)
  );
  if (dif <= 2) {
    x = x + 1;
  }
}
console.log(x);
