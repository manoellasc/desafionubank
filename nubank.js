const differenceInMinutes = require("date-fns/differenceInMinutes");
var fs = require("fs");
account = {};
//const transaction = {};
violations = [];
transactions = [];
accounts = [];
//JSON.parse(input - string) para transformar em objeto
console.log("Olá digite seu input:");
process.stdin.on("data", input => {
  let inputs = input.toString();
  inputs = JSON.parse(inputs); //transformando em objeto

  if (inputs.account) {
    i = accounts.length;
    if (accounts.length >= 1) {
      //verifica se account já foi criada
      violations.push("account-already-initialized"); //já violou a regra de que não pode ser recriada
    }
    if (
      i >= 1 &&
      (accounts[i - 1].account.activeCard === inputs.account.activeCard ||
        accounts[i - 1].account.availableLimit ===
          inputs.account.availableLimit)
    ) {
      violations.push("account-already-initialized"); //violou a regra que não pode atualizar a conta
      violations = [...new Set(account.violations)]; //limpa o array com coisas duplicadas
    } else {
      accounts.push(inputs);
    }
    account = accounts[0].account;
    account = { account, violations };
    return console.log(account);
  }

  if (inputs.transaction) {
    i = accounts.length;
    //verifica se é transação
    transactions.push(inputs); //armazena a transação

    if (inputs.transaction.amount > accounts[i - 1].account.availableLimit) {
      account.violations.push("insufficient-limit"); //violou a regra de limite insuficiente
    } else {
      accounts[i - 1].account.availableLimit =
        accounts[i - 1].account.availableLimit - inputs.transaction.amount;
    }
    if (account.activeCard === false) {
      account.violations.push("card-not-active"); //violou a regra de cartão ativo
    }
    var x = 0;
    for (var i = 1; i < transactions.length; i++) {
      dif = differenceInMinutes(
        new Date(transactions[i].transaction.time),
        new Date(transactions[i - 1].transaction.time)
      );
      if (dif <= 2) {
        x = x + 1;
      }
      if (
        transactions[i].transaction.merchant ===
          transactions[i - 1].transaction.merchant &&
        transactions[i].transaction.amount ===
          transactions[i - 1].transaction.amount
      ) {
        diff = differenceInMinutes(
          new Date(transactions[i].transaction.time),
          new Date(transactions[i - 1].transaction.time)
        );
        if (diff <= 2) {
          account.violations.push("doubled-transaction");
        }
      }
      account.violations = [...new Set(account.violations)];
    }
    if (x >= 2) {
      account.violations.push("high-frequency-small-interval");
      account.violations = [...new Set(account.violations)];
    }
    return console.log(account);
  }
});
