import { elements } from "./config";
import { observer } from "./observer";
import { withdraw } from "./bank";

export const powerUps = [
  {
    name: "👍",
    cost: 15,
    unlocked: true,
    count: 0,
    value: 0.1,
  },
  {
    name: "❤️",
    cost: 100,
    unlocked: false,
    count: 0,
    value: 1,
  },
  {
    name: "💩",
    cost: 1100,
    unlocked: false,
    count: 0,
    value: 8,
  },
  {
    name: "🤗",
    cost: 12000,
    unlocked: false,
    count: 0,
    value: 47,
  },
  {
    name: "🔥",
    cost: 130000,
    unlocked: false,
    count: 0,
    value: 260,
  },
  {
    name: "💯",
    cost: 1400000,
    unlocked: false,
    count: 0,
    value: 1400,
  },
  {
    name: "🍕",
    cost: 20000000,
    unlocked: false,
    count: 0,
    value: 48,
  },
];
function setup() {
  powerUps.forEach((el) => {
    const button = document.createElement("button");
    const span1 = document.createElement("span");
    const span2 = document.createElement("span");
    span1.textContent = `${el.name} (0)`;
    span2.textContent = el.cost;
    button.appendChild(span1);
    button.appendChild(span2);
    button.title = `${el.value} per second`;
    button.dataset.id = el.name;
    button.addEventListener("click", () => {
      el.count++;
      el.unlocked = true;
      withdraw(el.cost);
      el.cost = Math.ceil(el.cost * 1.2);
    });
    elements.powerups.appendChild(button);
  });
}
export const update = (balance) => {
  powerUps.forEach((el, index) => {
    const element = document.querySelector(`#store [data-id="${el.name}"]`);
    element.children[0].innerHTML = `${el.name} (${el.count})`;
    element.children[1].innerHTML = ` ${el.cost}`;

    if (el.unlocked || powerUps[index - 1]?.count > 0 || el.cost <= balance) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
    element.disabled = el.cost >= balance;
  });
};
export const init = () => {
  setup();
  update(0);
  observer.subscribe("NEW_BALANCE", update);
};
