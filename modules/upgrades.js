import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps } from "./store";
import { withdraw, addBooster } from "./bank";
export const upgrades = [
  {
    id: 1,
    cost: 100,
    name: "Reinforced index finger",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 2,
    cost: 500,
    name: "Carpal tunnel prevention cream",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 3,
    cost: 1000,
    name: "Forwards from ❤️",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 4,
    cost: 5000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 5,
    cost: 10000,
    name: "Ambidextrous",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 6,
    cost: 11000,
    name: "Cheap Hoes",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 7,
    cost: 55000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 8,
    cost: 50000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 9,
    cost: 55000,
    name: "Steel-plated rolling pins",
    description: "💩 gives +1%cps for each ❤️",
    key: "❤️",
    modifier: 2,
    type: "powerupBooster",
    callback: (total, powerups) => {
      //total er cps
      return 0;
    },
  },
  {
    id: 10,
    //TODO: mouse and 👍 gains +0.1 for each non cursor building owned
    //TODO: clicks er stadig ikke boostet
    cost: 100000,
    name: "Carpal tunnel prevention cream",
    description:
      "The mouse and 👍 gains +0.1 for each non cursor building owned",
    key: "👍",
    modifier: 1,
    type: "powerupBooster",
    callback: (total, powerups) => {
      let totalCount = 0;
      powerups.forEach((pu) => {
        if (pu.name !== "👍") {
          totalCount += pu.count;
        }
      });
      return powerUps[0].count * (totalCount / 10);
    },
  },
  {
    id: 11,
    cost: 120000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 12,
    cost: 600000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 13,
    cost: 550000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 14,
    cost: 600000,
    name: "Dunno",
    description: "🤗 are <strong>twice</strong> as efficient",
    key: "🤗",
    modifier: 2,
    type: "instant",
  },
  {
    id: 15,
    cost: 999999,
    name: "Dunno",
    description: "Emoji production multiplier <strong>+1%</strong>",
    key: "🤗",
    modifier: 1,
    type: "totalBooster",
    callback: (total, powerups) => {
      return (total *= 1.01);
    },
  },
  {
    id: 16,
    cost: 1300000,
    name: "Dunno",
    description: "🔥 are <strong>twice</strong> as efficient",
    key: "🔥",
    modifier: 2,
    type: "instant",
  },
];

export const init = () => {
  observer.subscribe("NEW_BALANCE", update);
};
function update() {
  upgrades.forEach((upgrade) => {
    const total = elements.upgrades.querySelectorAll("button").length;

    let btn = elements.upgrades.querySelector(
      `button[data-id="${upgrade.id}"]`
    );
    if (!btn) {
      if (total < 4) {
        btn = document.createElement("button");
        btn.textContent = upgrade.key + " " + upgrade.cost;
        btn.dataset.id = upgrade.id;
        btn.title = upgrade.description;
        btn.addEventListener("click", () => {
          //TODO: har jeg råd?
          withdraw(upgrade.cost);
          if (upgrade.key === "👍") {
            gameState.clickValue *= 2;
          }
          let index = powerUps.findIndex((pu) => pu.name === upgrade.key);
          powerUps[index].value *= upgrade.modifier;
          observer.publish("POWERUP_BOUGHT");
          if (upgrade.type !== "instant") {
            addBooster(upgrade.type, upgrade.callback);
          }
          let thisIndex = upgrades.findIndex((up) => up.id === upgrade.id);
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
