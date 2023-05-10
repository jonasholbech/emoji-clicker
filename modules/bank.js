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
  memoization.invalid = true;
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
export const memoization = {
  invalid: false,
  total: 0,
  accumulated: {},
};
function x() {
  if (memoization.invalid) {
    console.log("recalculating store");
    buildMemoizationStore();
  }

  deposit(memoization.total);
}
window.memoization = memoization;
function appendToMemoizationCache(key, value) {
  memoization.accumulated[key] += value;
}
function buildMemoizationStore() {
  let total = 0;
  //reset all memoization
  powerUps.forEach((el) => {
    memoization.accumulated[el.name] = 0;
  });
  powerUps.forEach((el) => {
    memoization.accumulated[el.name] += el.count * el.value;
  });

  powerupBoosters.forEach((cb) => {
    cb(total, powerUps, appendToMemoizationCache);
  });
  for (const property in memoization.accumulated) {
    total += memoization.accumulated[property];
  }
  totalBoosters.forEach((cb) => {
    total += cb(total, powerUps);
  });
  memoization.total = total / gameState.framerate;
  memoization.invalid = false;
  observer.publish("CACHE_REVALIDATED", gameState.emojis);
}
