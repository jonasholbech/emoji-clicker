import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps } from "./store";
import { round } from "./utils";
const totalBoosters = [];
const powerupBoosters = [];
export const init = () => {
  observer.subscribe("TICK", x);
};
export const withdraw = (amount) => {
  gameState.emojis -= amount;
  transaction();
};
export const deposit = (amount) => {
  gameState.emojis += amount;
  transaction();
};
function transaction() {
  updateEmojis();
  observer.publish("NEW_BALANCE", gameState.emojis);
}
function updateEmojis() {
  elements.emojicount.textContent = round(gameState.emojis, 1, true);
}
export const addBooster = (type, callback) => {
  if (type === "totalBooster") {
    totalBoosters.push(callback);
  } else if (type === "powerupBooster") {
    powerupBoosters.push(callback);
  }
};
function x() {
  let total = 0;
  powerUps.forEach((el) => {
    total += (el.count * el.value) / (1000 / gameState.framerate);
  });
  totalBoosters.forEach((cb) => {
    total += cb(total, powerUps);
  });
  powerupBoosters.forEach((cb) => {
    total += cb(total, powerUps);
    console.log("total boosted by ", cb(total, powerUps));
  });
  deposit(total);
}
