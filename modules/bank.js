import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps } from "./store";
import { round } from "./utils";
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

function x() {
  let total = 0;
  powerUps.forEach((el) => {
    total += (el.count * el.value) / (1000 / gameState.framerate);
  });
  deposit(total);
}
