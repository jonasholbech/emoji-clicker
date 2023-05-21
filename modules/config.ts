export const version = 0.1;
const updatesPerSecond = 10;
export const gameState: {
  emojis: number;
  updatesPerSecond: number;
  framerate: number;
  clickValue: number;
} = {
  emojis: 100000000,
  updatesPerSecond: updatesPerSecond,
  framerate: 1000 / updatesPerSecond,
  clickValue: 1,
};
export const elements: {
  bigemoji: HTMLElement | null;
  emojicount: HTMLElement | null;
  upgrades: HTMLElement | null;
  powerups: HTMLElement | null;
  emojilist: HTMLElement | null;
} = {
  bigemoji: document.querySelector("#bigemoji"),
  emojicount: document.querySelector("#emojicount"),
  upgrades: document.querySelector("#upgrades"),
  powerups: document.querySelector("#powerups"),
  emojilist: document.querySelector("#emojilist ul"),
};
