const Account = require("/home/manoella/Desktop/Codes/nubank/account.js");
const Transaction = require("/home/manoella/Desktop/Codes/nubank/transaction.js");

//JSON.parse(input - string) para transformar em objeto

process.stdin.on("data", input => {
  let inputs = input.toString();
  inputs = JSON.parse(inputs); //transformando em objeto
  let x = {};
  if (inputs.account) {
    x = Account.processAccount(inputs);
    return x;
  }

  if (inputs.transaction) {
    return Transaction.processTransaction(inputs);
  }
});
