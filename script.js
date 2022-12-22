let addUserBtn = document.getElementById('add-user');
let doubleBtn = document.getElementById('double');
let showMillionairesBtn = document.getElementById('show-millionaires');
let sortBtn = document.getElementById('sort');
let calculateBtn = document.getElementById('calculate-wealth');
let main = document.getElementById('main');

let data = [];

GetRandomUser();
GetRandomUser();
// Event listeners
doubleBtn.addEventListener('click', DoubleMoney);
addUserBtn.addEventListener('click', GetRandomUser);
sortBtn.addEventListener('click', SortByRichest);
showMillionairesBtn.addEventListener('click', ShowMillionaires);
calculateBtn.addEventListener('click', CalculateWealth);
// Get random number
async function GetRandomUser() {
  let res = await fetch('https://randomuser.me/api/');
  let data = await res.json();

  let user = data.results[0];
  let newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.round(Math.random() * 100000),
  };
  addData(newUser);
}

// Calculate the total amount of money

function CalculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  let amount = document.createElement('div');
  amount.innerHTML = `<h3>Total money is:<strong> ${FormatCurrency(wealth)}</strong></h3>`;
  main.appendChild(amount);
}

// Show millionaires function

function ShowMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateUser();
}

// Double money calculation

function DoubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateUser();
}

// Sort by richest function

function SortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateUser();
}

function addData(obj) {
  data.push(obj);
  updateUser();
}

function updateUser(providedData = data) {
  main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';
  providedData.map((item) => {
    let element = document.createElement('div');
    element.classList.add('person');

    element.innerHTML = `<strong>${item.name}</strong> ${FormatCurrency(item.money)}`;
    main.appendChild(element);
  });
}

// Format currency values

function FormatCurrency(num) {
  return `$ ` + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
