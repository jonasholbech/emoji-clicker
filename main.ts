import "./style.css";
import { init as bankInit } from "./modules/bank";
import { init as clickerInit } from "./modules/clicker";
import { init as listInit } from "./modules/emojilist";
import { init as storeInit } from "./modules/store";
import { init as upgradeInit } from "./modules/upgrades";
import { ticker } from "./modules/ticker";
bankInit();
clickerInit();
storeInit();
listInit();
upgradeInit();
ticker.start();
