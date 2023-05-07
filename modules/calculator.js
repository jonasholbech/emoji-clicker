import { observer } from "./observer";
import { gameState } from "./config";
import { powerUps } from "./store";
export const updateTotal = (e) => {
  switch (e) {
    case "CLICK":
      gameState.emojis += 1;
      break;
    case "TICK":
      let total = 0;
      powerUps.forEach((el) => {
        total += el.count * el.value;
      });
      gameState.emojis += total;
      break;
  }
  observer.publish("TOTAL");
};
export const calculator = {
  events: [],
};
export const init = () => {
  //subscribe to tick?
};
calculator.registerPlugin = (event) => {
  calculator.events.push(event);
};
