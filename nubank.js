//const differenceInMinutes = require("date-fns/differenceInMinutes");

const Account = require("/home/manoella/Desktop/Codes/nubank/account.js");
const Transaction = require("/home/manoella/Desktop/Codes/nubank/transaction.js");
//let account = {};
// let violations = [];
// let transactions = [];
// let accounts = [];
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

// function processAccount(inputs) {
//   i = accounts.length;
//   if (accounts.length >= 1) {
//     //verifica se account já foi criada
//     //já violou a regra de que não pode ser recriada
//     violations.push("account-already-initialized");
//   }
//   if (
//     i >= 1 &&
//     (accounts[i - 1].account.activeCard === inputs.account.activeCard ||
//       accounts[i - 1].account.availableLimit === inputs.account.availableLimit)
//   ) {
//     //violou a regra que não pode atualizar a conta
//     violations.push("account-already-initialized");
//     //limpa o array com coisas duplicadas
//     violations = [...new Set(account.violations)];
//   } else {
//     accounts.push(inputs);
//   }
//   account = accounts[0].account;
//   account = { account, violations };
//   return console.log(account);
// }

// function processTransaction(inputs, account) {
//   i = accounts.length;
//   //verifica se é transação
//   transactions.push(inputs); //armazena a transação
//   if (i === 0) {
//     return console.log("account-not-initialized");
//   } else {
//     if (inputs.transaction.amount > accounts[i - 1].account.availableLimit) {
//       //violou a regra de limite insuficiente
//       account.violations.push("insufficient-limit");
//     } else {
//       accounts[i - 1].account.availableLimit =
//         accounts[i - 1].account.availableLimit - inputs.transaction.amount;
//     }
//     if (!accounts[i - 1].account.activeCard) {
//       //violou a regra de cartão ativo
//       account.violations.push("card-not-active");
//     }
//     var x = 0;
//     for (var j = 1; j < transactions.length; j++) {
//       dif = differenceInMinutes(
//         new Date(transactions[j].transaction.time),
//         new Date(transactions[j - 1].transaction.time)
//       );
//       if (dif <= 2) {
//         x++;

//         if (
//           transactions[j].transaction.merchant ===
//             transactions[j - 1].transaction.merchant &&
//           transactions[j].transaction.amount ===
//             transactions[j - 1].transaction.amount
//         ) {
//           account.violations.push("doubled-transaction");
//         }
//       }
//       account.violations = [...new Set(account.violations)];
//     }
//     if (x >= 2) {
//       account.violations.push("high-frequency-small-interval");
//       account.violations = [...new Set(account.violations)];
//     }
//   }

//   account = accounts[0].account;
//   account = { account, violations };
//   return console.log(account);
// }
