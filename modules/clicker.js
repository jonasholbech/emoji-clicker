import { deposit } from "./bank";
import { elements, gameState } from "./config";

export const init = () => {
  elements.bigemoji.addEventListener("click", () => {
    deposit(gameState.clickValue);
  });
};
