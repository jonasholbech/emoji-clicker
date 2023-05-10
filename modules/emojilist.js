import { elements } from "./config";
import { powerUps } from "./store";
import { observer } from "./observer";
import { round } from "./utils";

export const init = () => {
  powerUps.forEach((pu) => {
    const li = document.createElement("li");
    li.dataset.emoji = pu.name;
    const d1 = document.createElement("div");
    d1.classList.add("up");
    const d2 = document.createElement("div");
    d2.classList.add("down");
    li.appendChild(d1);
    li.appendChild(d2);
    elements.emojilist.appendChild(li);
  });
  observer.subscribe("POWERUP_BOUGHT", update);
};

function update() {
  powerUps.forEach((pu) => {
    if (pu.count > 0) {
      const el = elements.emojilist.querySelector(
        `#emojilist [data-emoji="${pu.name}"]`
      );
      el.querySelector(".up").textContent = pu.name.repeat(pu.count);
      el.querySelector(".down").textContent =
        round(pu.count * pu.value, 1) + "per second";
    }
  });
}
