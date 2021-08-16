let lightBulb = document.querySelector("div");
let on = document.getElementById("on");
let off = document.getElementById("off");
let toggle = document.getElementById("toggle");
let end = document.getElementById("end");
let buttons = document.querySelectorAll("button");

on.addEventListener("click", () => {
  lightBulb.classList.add("light");
});

off.addEventListener("click", () => {
  lightBulb.classList.remove("light");
});

toggle.addEventListener("click", () => {
  lightBulb.classList.toggle("light");
});

end.addEventListener("click", () => {
  buttons.forEach((button) => {
    button.disabled = true;
    lightBulb.style.cssText = "display: none";
  });
});
