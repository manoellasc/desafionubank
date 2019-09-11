const differenceInMinutes = require("date-fns/differenceInMinutes");
const transactions = [
  {
    transaction: {
      merchant: "Burger King",
      amount: 20,
      time: "2019-09-09T14:24:00.000Z"
    }
  },
  {
    transaction: {
      merchant: "KFC",
      amount: 20,
      time: "2019-09-09T14:25:00.000Z"
    }
  }
];
const reducer = (val, accumulator) => {
  dif = differenceInMinutes(new Date(), new Date(val.transaction.time));
  if (dif < 2) {
    return (accumulator = accumulator += 1);
  }
  return accumulator;
};
num = transactions.reduce(reducer);
if (num > 2) {
  console.log("deu certo");
}
