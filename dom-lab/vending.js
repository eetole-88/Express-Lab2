// Section: part1
// 1. get button
// 2. on click...
// add number
// set innerText of total with new number
let total = 0;

document.getElementById("limeButton").addEventListener("click", cola);
document.getElementById("peanutButton").addEventListener("click", peanut);
document.getElementById("chocolateButton").addEventListener("click", chocolate);
document.getElementById("fruitButton").addEventListener("click", fruit);
const totalUpdate = document.getElementById("total");

function cola() {
  total += 2;
  totalUpdate.innerText = `${total}`;
}

function peanut() {
  total += 3;
  totalUpdate.innerText = `${total}`;
}

function chocolate() {
  total += 4;
  totalUpdate.innerText = `${total}`;
}

function fruit() {
  total += 6;
  totalUpdate.innerText = `${total}`;
}
