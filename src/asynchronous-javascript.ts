/* CHALLENGE 1 */
function sayHowdy() {
  console.log("Howdy");
}

function testMe() {
  setTimeout(sayHowdy, 0);
  console.log("Partnah");
}
// After thinking it through, uncomment the following line to check your guess!
// testMe(); // what order should these log out? Howdy or Partnah first?

/* CHALLENGE 2 */
function delayedGreet() {
  setTimeout(() => {
    console.log("welcome");
  }, 3000);
}
// Uncomment the following line to check your work!
// delayedGreet(); // should log (after 3 seconds): welcome

/* CHALLENGE 3 */
function helloGoodbye() {
  // ADD CODE HERE
  console.log("hello");

  setTimeout(() => {
    console.log("good bye");
  }, 2000);
}
// Uncomment the following line to check your work!
// helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye

/* CHALLENGE 4 */
function brokenRecord() {
  // ADD CODE HERE
  setInterval(() => {
    console.log("hi again");
  }, 1000);
}
// Uncomment the following line to check your work!
// brokenRecord(); // should log (every second): hi again

/* CHALLENGE 5 */
function limitedRepeat() {
  // ADD CODE HERE
  const intervalId = setInterval(() => {
    console.log("hi for now");
  }, 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, 2000);
}
// Uncomment the following line to check your work!
// limitedRepeat(); // should log (every second, for 5 seconds): hi for now

/* CHALLENGE 6 */
function everyXsecsForYsecs(fn: Function, seconds: number, duration: number) {
  // ADD CODE HERE
  const intervalId = setInterval(fn, seconds * 1000);

  setTimeout(() => {
    clearInterval(intervalId);
  }, duration * 1000);
}
// Uncomment the following lines to check your work!
// function theEnd() {
//   console.log('This is the end!');
// }
// everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!

/* CHALLENGE 7 */
function delayCounter(target: number, wait: number) {
  let counter = 1;
  let intervalId: number | null = null;

  return function log() {
    intervalId = setInterval(() => {
      if (counter > target) {
        if (intervalId == null) return;
        return clearInterval(intervalId);
      }

      console.log(counter++);
    }, wait);
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const countLogger = delayCounter(3, 1000)
// countLogger();
// After 1 second, log 1
// After 2 seconds, log 2
// After 3 seconds, log 3

/* CHALLENGE 8 */

function promised<T>(val: T) {
  // ADD CODE HERE
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val);
    }, 2000);
  });
}

// UNCOMMENT THESE TO TEST YOUR WORK!
const createPromise = promised("wait for it...");
// createPromise.then((val) => console.log(val));
// will log "wait for it..." to the console after 2 seconds

/* CHALLENGE 9 */

class SecondClock<T> {
  _cb: (value: number) => T;
  _seconds: number;
  _intervalId: number | null;

  constructor(cb: (value: number) => T) {
    // ADD CODE HERE
    this._cb = cb;
    this._seconds = 0;
    this._intervalId = null;
  }

  // ADD METHODS HERE
  start() {
    this._cb(this._seconds++);

    this._intervalId = setInterval(() => {
      this._cb(this._seconds++);
    }, 1000);
  }

  reset() {
    if (this._intervalId) {
      clearTimeout(this._intervalId);
    }
    this._seconds = 0;
  }
}

// UNCOMMENT THESE TO TEST YOUR WORK!
// const clock = new SecondClock((val) => { console.log(val) });
// console.log("Started Clock.");
// clock.start();
// setTimeout(() => {
//     clock.reset();
//     console.log("Stopped Clock after 6 seconds.");
// }, 6000);

/* CHALLENGE 10 */
function debounce<T>(callback: () => T, interval: number) {
  // ADD CODE HERE
  let intervalId: number | null = null;
  let duration = 0;

  return function debouncedCallback() {
    if (duration <= 0) {
      duration = interval;

      if (intervalId) {
        clearInterval(intervalId);
      }

      intervalId = setInterval(() => {
        duration -= 100;
      }, 100);

      return callback();
    }
  };
}

// UNCOMMENT THESE TO TEST YOUR WORK!
function giveHi() {
  return "hi";
}
const giveHiSometimes = debounce(giveHi, 3000);
console.log(giveHiSometimes()); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 2000); // -> undefined
setTimeout(function () {
  console.log(giveHiSometimes());
}, 4000); // -> 'hi'
setTimeout(function () {
  console.log(giveHiSometimes());
}, 8000); // -> 'hi'
