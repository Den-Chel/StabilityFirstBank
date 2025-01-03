'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2021-10-02T14:43:31.074Z',
    '2021-10-29T11:24:19.761Z',
    '2021-11-15T10:45:23.907Z',
    '2022-01-22T12:17:46.255Z',
    '2022-02-12T15:14:06.486Z',
    '2022-03-09T11:42:26.371Z',
    '2022-05-21T07:43:59.331Z',
    '2022-06-22T15:21:20.814Z',
  ],
  currency: 'CAD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2021-06-26T03:06:29Z',
    '2021-09-09T23:36:42Z',
    '2022-02-09T08:35:09Z',
    '2022-05-01T20:31:09Z',
    '2022-05-17T20:12:25Z',
    '2022-08-30T23:27:52Z',
    '2022-10-25T18:57:15Z',
    '2022-12-02T14:32:34Z',
  ],
  currency: 'CAD',
  locale: 'en-US',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2021-04-05T15:53:30Z',
    '2021-04-22T17:01:01Z',
    '2021-05-26T01:32:03Z',
    '2021-08-16T07:06:15Z',
    '2021-08-31T15:23:05Z',
    '2021-10-01T02:11:13Z',
    '2022-01-28T03:43:48Z',
    '2022-06-17T11:16:49Z',
  ],
  currency: 'CAD',
  locale: 'en-US',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2021-06-26T03:06:29Z',
    '2021-09-09T23:36:42Z',
    '2022-02-09T08:35:09Z',
    '2022-05-01T20:31:09Z',
    '2022-05-17T20:12:25Z',
  ],
  currency: 'CAD',
  locale: 'en-US',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2021-04-05T15:53:30Z',
    '2021-04-22T17:01:01Z',
    '2021-05-26T01:32:03Z',
    '2021-08-16T07:06:15Z',
    '2021-08-31T15:23:05Z',
  ],
  currency: 'CAD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (account, sort = false) {
  containerTransactions.innerHTML = '';
  const transacs = sort
    ? account.transactions.slice().sort((x, y) => x - y)
    : account.transactions;

  transacs.forEach((trans, index) => {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.transactionsDates[index]);
    let options = {  
    year: "numeric", month: "long",  
    day: "numeric", 
     };  
    const transDate = date.toLocaleDateString("en-us", options); 

    const transactionRow = `
<div class="transactions__row">
<div class="transactions__type transactions__type--${transType}">
  ${index + 1} ${transType}
</div>
<div class="transactions__date">${transDate}</div>
<div class="transactions__value">$${trans.toFixed(2)}</div>
</div>`;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

const createNickName = function (accs) {
  accs.forEach(function (acc) {
    acc.nickname = acc.userName
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createNickName(accounts);

const displayBalance = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `$${balance.toFixed(2)}`;
};

const moneyTotal = function (account) {
  const deposits = account.transactions
    .filter(trans => trans > 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumIn.textContent = `$${deposits.toFixed(2)}`;

  const withdrawals = account.transactions
    .filter(trans => trans < 0)
    .reduce((acc, trans) => acc + trans, 0);
  labelSumOut.textContent = `$${withdrawals.toFixed(2)}`;

  const interestTotal = account.transactions
    .filter(trans => trans > 0)
    .map(trans => {
      return (trans * account.interest) / 100;
    })
    .reduce((acc, trans) => acc + trans, 0);
  labelSumInterest.textContent = `$${interestTotal.toFixed(2)}`;
};
const updateUi = function (account) {
  //Display transactions
  displayTransactions(account);

  //Display balance
  displayBalance(account);

  //Display total
  moneyTotal(account);
};

let currentAccount, currentLogOutTimer;

//  Logged in
// currentAccount = account1;
// updateUi(currentAccount);
// containerApp.style.opacity = 100;

// Log out in 5 minutes
const startLogoutTimer = function () {
  const logOutTimerCallback = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(logOutTimer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to your account';
    }
    time--;
  };
  let time = 300;

  logOutTimerCallback();
  const logOutTimer = setInterval(logOutTimerCallback, 1000);
  return logOutTimer;
};
// Event Handlers

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    account => account.nickname === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    //Display UI and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome, ${
      currentAccount.userName.split(' ')[0]
    }!`;

    const now = new Date();  
    let options = {  
    year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
     };  
    labelDate.textContent = now.toLocaleTimeString("en-us", options); 


    //Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    // Check if the timer exists
    if (currentLogOutTimer) clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();

    updateUi(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const transferAmount = +inputTransferAmount.value;
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    account => account.nickname === recipientNickname
  );

  if (
    transferAmount > 0 &&
    currentAccount.balance >= transferAmount &&
    recipientAccount &&
    currentAccount.nickname !== recipientAccount.nickname
  ) {
    // Add Transactions
    currentAccount.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    // Add Transactions dates
    currentAccount.transactionsDates.push(new Date());
    recipientAccount.transactionsDates.push(new Date());

    updateUi(currentAccount);

    clearInterval(currentLogOutTimer);
    currentLogOutTimer = startLogoutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const recipientClosePin = +inputClosePin.value;
  const recipientCloseNickname = inputCloseUsername.value;

  if (
    currentAccount.pin === recipientClosePin &&
    currentAccount.nickname === recipientCloseNickname
  ) {
    const currentAccountIndex = accounts.findIndex(
      account => account.nickname === currentAccount.nickname
    );

    accounts.splice(currentAccountIndex, 1);

    containerApp.style.opacity = 0;

    labelWelcome.textContent = 'Log in to your account';

    inputCloseUsername.value = '';
    inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Math.round(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.transactions.some(trans => trans >= (loanAmount * 10) / 100)
  ) {
    setTimeout(function () {
      currentAccount.transactions.push(loanAmount);
      currentAccount.transactionsDates.push(new Date());
      updateUi(currentAccount);
    }, 5000);
  }
  inputLoanAmount.value = '';
  clearInterval(currentLogOutTimer);
  currentLogOutTimer = startLogoutTimer();
});

let transactionsSorted = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAccount, !transactionsSorted);
  transactionsSorted = !transactionsSorted;
});
