export const version = 0.1;

export const gameState = {
  emojis: 100000000,
  updatesPerSecond: 10,
  framerate: 1000 / 10, //TODO: not DRY
  clickValue: 1,
};
export const elements = {
  bigemoji: document.querySelector("#bigemoji"),
  emojicount: document.querySelector("#emojicount"),
  upgrades: document.querySelector("#upgrades"),
  powerups: document.querySelector("#powerups"),
  emojilist: document.querySelector("#emojilist ul"),
};
