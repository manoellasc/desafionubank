let account = {};
let violations = [];
let accounts = [];

function processAccount(inputs) {
  i = accounts.length;
  if (accounts.length >= 1) {
    //verifica se account já foi criada
    //já violou a regra de que não pode ser recriada
    violations.push("account-already-initialized");
  }
  if (
    i >= 1 &&
    (accounts[i - 1].account.activeCard === inputs.account.activeCard ||
      accounts[i - 1].account.availableLimit === inputs.account.availableLimit)
  ) {
    //violou a regra que não pode atualizar a conta
    violations.push("account-already-initialized");
    //limpa o array com coisas duplicadas
    violations = [...new Set(account.violations)];
  } else {
    accounts.push(inputs);
  }
  account = accounts[0].account;
  account = { account, violations };
  console.log(account);
  return account;
}

module.exports = { processAccount, accounts, account, violations };
