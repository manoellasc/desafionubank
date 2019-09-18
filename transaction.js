const differenceInMinutes = require("date-fns/differenceInMinutes");
let transactions = [];

const Account = require("/home/manoella/Desktop/Codes/nubank/account.js");

function processTransaction(inputs) {
  const accountsIndex = Account.accounts.length - 1;
  Alength = Account.accounts.length;
  Tlength = transactions.length;
  account = Account.accounts[0];
  let violations = [];
  Account.account = { account, violations };

  let accountLimit = Account.accounts[accountsIndex].account.availableLimit;
  let accountActive = Account.accounts[accountsIndex].account.activeCard;

  if (accountIsEmpty(Account.accounts)) {
    return console.log("account-not-initialized");
  } else {
    if (inputs.transaction.amount > accountLimit) {
      //violou a regra de limite insuficiente
      violations.push("insufficient-limit");
    } else {
      accountLimit = accountLimit - inputs.transaction.amount;
    }
    if (!accountActive) {
      //violou a regra de cartão ativo
      violations.push("card-not-active");
    }
    var x = 0;
    if (transactionIsEmpty(Tlength)) {
      transactions.push(inputs); //armazena a transação
    } else {
      for (var j = 0; j < transactions.length; j++) {
        let oldTransaction = transactions[j].transaction;
        dif = differenceInMinutes(
          new Date(inputs.transaction.time),
          new Date(oldTransaction.time)
        );
        if (dif <= 2) {
          x++;
          validateDoubledTransaction(
            inputs.transaction,
            transactions[j].transaction
          );
        }
      }
      transactions.push(inputs); //armazena a transação
    }
    validateFrenquency(x);
  }

  violations = [...new Set(violations)];
  Account.account = { account, violations };
  console.log(Account.account);
  return Account.account;

  function validateFrenquency(x) {
    if (x >= 2) {
      violations.push("high-frequency-small-interval");
      violations = [...new Set(violations)];
    }
  }

  function accountIsEmpty(Alength) {
    return Alength.length === 0;
  }

  function transactionIsEmpty(Tlength) {
    return Tlength.length === 0;
  }

  function validateDoubledTransaction(newTransaction, oldTransaction) {
    if (
      newTransaction.merchant === oldTransaction.merchant &&
      newTransaction.amount === oldTransaction.amount
    ) {
      violations.push("doubled-transaction");
      violations = [...new Set(violations)];
    }
  }
}

module.exports = { processTransaction };
