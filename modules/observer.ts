export const observer = (function () {
  "use strict";
  const events = {};
  return {
    subscribe: function (ev: string, callback: Function) {
      if (!events.hasOwnProperty(ev)) {
        events[ev] = [];
      }
      events[ev].push(callback);
    },
    publish: function (ev: string, ...data: any[]) {
      //let data = rest;
      let index = 0;
      let length = 0;
      if (events.hasOwnProperty(ev)) {
        length = events[ev].length;
        for (; index < length; index++) {
          events[ev][index].apply(this, data);
        }
      }
    },
    unsubscribe: function (ev: string, callback: Function) {
      let x = events[ev].indexOf(callback);
      events[ev].splice(x, 1);
    },
  };
})();
