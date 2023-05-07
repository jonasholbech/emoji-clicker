import "./style.css";
import { observer } from "./modules/observer";
import { init as bankInit } from "./modules/bank";
import { init as clickerInit } from "./modules/clicker";
import { init as listInit } from "./modules/emojilist";
import { init as storeInit } from "./modules/store";
import { ticker } from "./modules/ticker";
bankInit();
clickerInit();
storeInit();
listInit();
/* calculator.registerPlugin(clickerinit());
calculator.registerPlugin(storeInit());
 */

ticker.start();
