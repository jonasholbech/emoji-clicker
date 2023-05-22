import { deposit } from "./bank";
import { elements, gameState } from "./config";

export const init = () => {
  if (!elements.bigemoji) {
    return; //Stupid typescript
  }
  elements.bigemoji.addEventListener("click", () => {
    deposit(gameState.clickValue);
  });
};
