import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps } from "./store";
import { withdraw } from "./bank";
export const upgrades = [
  {
    cost: 100,
    name: "Reinforced index finger",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
  },
  {
    cost: 500,
    name: "Carpal tunnel prevention cream",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
  },
  {
    cost: 1000,
    name: "Forwards from ❤️",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
  },
  {
    cost: 5000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
  },
  {
    cost: 10000,
    name: "Ambidextrous",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
  },
  {
    cost: 11000,
    name: "Cheap Hoes",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
  },
  {
    cost: 55000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
  },
  {
    cost: 50000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
  },
  {
    //TODO: 💩 skal give +1%cps for hver grandma (men ikke et one-time boost?)
    cost: 55000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
  },
  {
    //TODO: mouse and 👍 gains +0.1 for each non cursor building owned
    cost: 100000,
    name: "Carpal tunnel prevention cream",
    description:
      "The mouse and 👍 gains +0.1 for each non cursor building owned",
    key: "👍",
    modifier: 1,
  },
  {
    cost: 120000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
  },
  {
    cost: 600000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
  },
  {
    cost: 550000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
  },
  {
    cost: 600000,
    name: "Dunno",
    description: "🤗 are <strong>twice</strong> as efficient",
    key: "🤗",
    modifier: 2,
  },
  {
    //TODO::
    cost: 999999,
    name: "Dunno",
    description: "Emoji production multiplier <strong>+1%</strong>",
    key: "🤗",
    modifier: 1,
  },
  {
    //TODO::
    cost: 999999,
    name: "Dunno",
    description: "Emoji production multiplier <strong>+1%</strong>",
    key: "🤗",
    modifier: 1,
  },
  {
    cost: 1300000,
    name: "Dunno",
    description: "🔥 are <strong>twice</strong> as efficient",
    key: "🔥",
    modifier: 2,
  },
];

export const init = () => {
  observer.subscribe("NEW_BALANCE", update);
};
function update() {
  //TODO: max 8 upgrades visible

  upgrades.forEach((upgrade) => {
    const total = elements.upgrades.querySelectorAll("button").length;

    let btn = elements.upgrades.querySelector(
      `button[data-id="${upgrade.cost}"]` //TODO: ny key
    );
    if (!btn) {
      if (total < 4) {
        btn = document.createElement("button");
        btn.textContent = upgrade.key;
        btn.dataset.id = upgrade.cost; //TODO: duer ikke som key, ikke unik
        btn.title = upgrade.description;
        btn.addEventListener("click", () => {
          withdraw(upgrade.cost);
          if (upgrade.key === "👍") {
            gameState.clickValue *= 2;
          }
          let index = powerUps.findIndex((pu) => pu.name === upgrade.key);
          powerUps[index].value *= upgrade.modifier;
          observer.publish("POWERUP_BOUGHT");
          let thisIndex = upgrades.findIndex((up) => up.key === upgrade.key);
          upgrades.splice(thisIndex, 1);
          elements.upgrades.removeChild(btn);
        });
        elements.upgrades.appendChild(btn);
      }
    }
    if (btn) {
      btn.disabled = gameState.emojis < upgrade.cost;
    }
  });
}