import { observer } from "./observer";
import { gameState } from "./config";
let intervalID;

export const ticker = {
  start: () => {
    intervalID = setInterval(() => {
      observer.publish("TICK");
    }, gameState.framerate);
  },
  stop: () => {
    clearInterval(intervalID);
  },
};
