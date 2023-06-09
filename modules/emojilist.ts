import { elements } from "./config";
import { powerUps } from "./store";
import { observer } from "./observer";
import { round } from "./utils";
import { memoization } from "./bank";
export const init = (): void => {
  powerUps.forEach((pu): void => {
    const li = document.createElement("li");
    li.dataset.emoji = pu.name;
    const d1 = document.createElement("div");
    d1.classList.add("up");
    const d2 = document.createElement("div");
    d2.classList.add("down");
    li.appendChild(d1);
    li.appendChild(d2);
    elements.emojilist && elements.emojilist.appendChild(li);
  });
  observer.subscribe("CACHE_REVALIDATED", update);
};

function update() {
  powerUps.forEach((pu) => {
    if (pu.count > 0) {
      const el = elements.emojilist.querySelector(
        `#emojilist [data-emoji="${pu.name}"]`
      );
      el.querySelector(".up").textContent = pu.name.repeat(pu.count);
      el.querySelector(".down").textContent =
        round(memoization.accumulated[pu.name], 1) + " per second";
      //round(pu.count * pu.value, 1) + "per second";
    }
  });
}
