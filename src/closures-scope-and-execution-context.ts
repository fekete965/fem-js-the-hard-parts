// CHALLENGE 1
console.log("CHALLENGE 1");
function createFunction() {
  return function sayHello() {
    console.log("Hello");
  };
}

// /*** Uncomment these to check your work! ***/
const function1 = createFunction();
function1(); // => should console.log('hello');

// CHALLENGE 2
console.log("-------------");
console.log("CHALLENGE 2");
function createFunctionPrinter(input: string) {
  return function printInput() {
    console.log(input);
  };
}

// /*** Uncomment these to check your work! ***/
const printSample = createFunctionPrinter("sample");
printSample(); // => should console.log('sample');
const printHello = createFunctionPrinter("hello");
printHello(); // => should console.log('hello');

// CHALLENGE 3
console.log("-------------");
console.log("CHALLENGE 3");
function outer() {
  let counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log("counter", counter);
  }
  return incrementCounter;
}

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// My guesses:
// willCounter() --> "counter 1"
// willCounter() --> "counter 2"
// willCounter() --> "counter 3"
// jasCounter()  --> "counter 1"
// willCounter() --> "counter 4"

// /*** Uncomment these to check your work! ***/
willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x: number) {
  let sum = x;

  return function addToSum(y: number) {
    return sum + y;
  };
}

// /*** Uncomment these to check your work! ***/
const addByTwo = addByX(2);
console.log(addByTwo(1)); // => should return 3
console.log(addByTwo(2)); // => should return 4
console.log(addByTwo(3)); // => should return 5

const addByThree = addByX(3);
console.log(addByThree(1)); // => should return 4
console.log(addByThree(2)); // => should return 5

const addByFour = addByX(4);
console.log(addByFour(4)); // => should return 8
console.log(addByFour(5)); // => should return 9

// CHALLENGE 4
console.log("-------------");
console.log("CHALLENGE 4");
function once<T>(func: (...args: any[]) => T) {
  let hasRun = false;
  let cbValue: T;

  return function helperFn(...args: any[]) {
    if (!hasRun) {
      cbValue = func(...args);
      hasRun = true;
    }

    return cbValue;
  };
}

// /*** Uncomment these to check your work! ***/
const onceFunc = once(addByTwo);
console.log(onceFunc(4)); // => should log 6
console.log(onceFunc(10)); // => should log 6
console.log(onceFunc(9001)); // => should log 6

// CHALLENGE 5
console.log("-------------");
console.log("CHALLENGE 5");
function after(count: number, func: Function) {
  let callCounter = count;

  return function helperFn() {
    if (callCounter > 1) {
      callCounter -= 1;
      return;
    }

    return func();
  };
}

// /*** Uncomment these to check your work! ***/
const called = function () {
  console.log("hello");
};
const afterCalled = after(3, called);
afterCalled(); // => nothing is printed
afterCalled(); // => nothing is printed
afterCalled(); // => 'hello' is printed

// CHALLENGE 6
console.log("-------------");
console.log("CHALLENGE 6");
function delay(func: Function, wait: number) {
  let canBeEnvoked = false;

  setTimeout(() => {
    canBeEnvoked = true;
  }, wait);

  return function helperFn(...args: any[]) {
    if (!canBeEnvoked) return;

    func(...args);
  };
}

// CHALLENGE 7
console.log("-------------");
console.log("CHALLENGE 7");
function rollCall(names: string[]) {
  let idx = 0;

  return function callName() {
    if (idx >= names.length) {
      console.log("Everyone accounted for");

      return;
    }

    console.log(names[idx++]);

    return;
  };
}

// /*** Uncomment these to check your work! ***/
const rollCaller = rollCall(["Victoria", "Juan", "Ruth"]);
rollCaller(); // => should log 'Victoria'
rollCaller(); // => should log 'Juan'
rollCaller(); // => should log 'Ruth'
rollCaller(); // => should log 'Everyone accounted for'

// CHALLENGE 8
console.log("-------------");
console.log("CHALLENGE 8");
function saveOutput<T>(func: (...args: any[]) => T, magicWord: string) {
  const dict: Record<string, T> = {};

  return function protectedFunc(input: string | number) {
    if (typeof input === "string" && input === magicWord) {
      return dict;
    }

    const value = func(input);
    dict[input] = value;

    return value;
  };
}

// /*** Uncomment these to check your work! ***/
const multiplyBy2 = function (num: number) {
  return num * 2;
};
const multBy2AndLog = saveOutput(multiplyBy2, "boo");
console.log(multBy2AndLog(2)); // => should log 4
console.log(multBy2AndLog(9)); // => should log 18
console.log(multBy2AndLog("boo")); // => should log { 2: 4, 9: 18 }

// CHALLENGE 9
console.log("-------------");
console.log("CHALLENGE 9");
function cycleIterator(array: string[]) {
  let idx = 0;

  return function next() {
    if (idx >= array.length) {
      idx = 0;
    }

    return array[idx++];
  };
}

// /*** Uncomment these to check your work! ***/
const threeDayWeekend = ["Fri", "Sat", "Sun"];
const getDay = cycleIterator(threeDayWeekend);
console.log(getDay()); // => should log 'Fri'
console.log(getDay()); // => should log 'Sat'
console.log(getDay()); // => should log 'Sun'
console.log(getDay()); // => should log 'Fri'

// CHALLENGE 10
console.log("-------------");
console.log("CHALLENGE 10");
function defineFirstArg<T>(func: (...args: any[]) => T, arg: any) {
  return function innerFn(...args: any[]) {
    return func(arg, ...args);
  };
}

// /*** Uncomment these to check your work! ***/
const subtract = function (big: number, small: number) {
  return big - small;
};
const subFrom20 = defineFirstArg(subtract, 20);
console.log(subFrom20(5)); // => should log 15

// CHALLENGE 11
console.log("-------------");
console.log("CHALLENGE 11");
function dateStamp<T>(func: (...args: any[]) => T) {
  const date = new Date().toLocaleDateString();

  return function stampFn(...args: any[]) {
    return {
      date,
      output: func(args),
    };
  };
}

// /*** Uncomment these to check your work! ***/
const stampedMultBy2 = dateStamp((n: number) => n * 2);
console.log(stampedMultBy2(4)); // => should log { date: (today's date), output: 8 }
console.log(stampedMultBy2(6)); // => should log { date: (today's date), output: 12 }

// CHALLENGE 12
console.log("-------------");
console.log("CHALLENGE 12");
function censor() {
  const dict: Record<string, string> = {};

  return function helperFn(str1: string, str2?: string) {
    if (str1 && str2) {
      dict[str1] = str2;

      return;
    }

    for (let key in dict) {
      str1 = str1.replaceAll(key, dict[key]);
    }

    return str1;
  };
}

// /*** Uncomment these to check your work! ***/
const changeScene = censor();
changeScene("dogs", "cats");
changeScene("quick", "slow");
console.log(changeScene("The quick, brown fox jumps over the lazy dogs.")); // => should log 'The slow, brown fox jumps over the lazy cats.'

// CHALLENGE 13
console.log("-------------");
console.log("CHALLENGE 13");
function createSecretHolder(secret: string | number | Symbol) {
  let _secret = secret;

  return {
    getSecret: function () {
      return _secret;
    },
    setSecret: function (newSecret: string | number | Symbol) {
      _secret = newSecret;

      return;
    },
  };
}

// /*** Uncomment these to check your work! ***/
let obj = createSecretHolder(5);
console.log(obj.getSecret()); // => returns 5
obj.setSecret(2);
console.log(obj.getSecret()); // => returns 2

// CHALLENGE 14
console.log("-------------");
console.log("CHALLENGE 14");
function callTimes() {
  let called = 1;

  return function logCallNum() {
    return called++;
  };
}

// /*** Uncomment these to check your work! ***/
let myNewFunc1 = callTimes();
let myNewFunc2 = callTimes();
console.log(myNewFunc1()); // => 1
console.log(myNewFunc1()); // => 2
console.log(myNewFunc2()); // => 1
console.log(myNewFunc2()); // => 2

// CHALLENGE 15
console.log("-------------");
console.log("CHALLENGE 15");
function roulette(num: number) {
  return function spinTheWheel() {
    if (num > 1) {
      num--;

      return "spin";
    }

    if (num === 1) {
      num--;

      return "win";
    }

    return "pick a number to play again";
  };
}

// /*** Uncomment these to check your work! ***/
const play = roulette(3);
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'spin'
console.log(play()); // => should log 'win'
console.log(play()); // => should log 'pick a number to play again'
console.log(play()); // => should log 'pick a number to play again'

// CHALLENGE 16
console.log("-------------");
console.log("CHALLENGE 16");
function average() {
  let numCount = 0;
  let sum = 0;
  let avg = 0;

  return function calcAvg(num?: number) {
    if (num == null) return avg;

    sum += num;
    numCount++;
    avg = sum / numCount;

    return avg;
  };
}

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // => should log 0
console.log(avgSoFar(4)); // => should log 4
console.log(avgSoFar(8)); // => should log 6
console.log(avgSoFar()); // => should log 6
console.log(avgSoFar(12)); // => should log 8
console.log(avgSoFar()); // => should log 8

// CHALLENGE 17
console.log("-------------");
console.log("CHALLENGE 17");
function makeFuncTester(arrOfTests: [A: string, B: string][]) {
  return function runTest(cb: (input: string) => string) {
    for (let i = 0; i < arrOfTests.length; i++) {
      const test = arrOfTests[i];

      if (cb(test[0]) !== test[1]) {
        return false;
      }
    }

    return true;
  };
}

// /*** Uncomment these to check your work! ***/
const capLastTestCases: [A: string, B: string][] = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str: string) => str.toUpperCase();
const capLastAttempt2 = (str: string) =>
  str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // => should log false
console.log(shouldCapitalizeLast(capLastAttempt2)); // => should log true

// CHALLENGE 18
console.log("-------------");
console.log("CHALLENGE 18");
function makeHistory(limit: number) {
  const stack: string[] = [];

  return function action(str: string) {
    if (str === "undo" && stack.length === 0) {
      return "nothing to undo";
    }

    if (str === "undo") {
      return stack.pop() + " undone";
    }

    if (stack.length === limit) {
      stack.shift();
    }

    stack.push(str);
    return str + " done";
  };
}

// /*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // => should log 'jump done'
console.log(myActions("undo")); // => should log 'jump undone'
console.log(myActions("walk")); // => should log 'walk done'
console.log(myActions("code")); // => should log 'code done'
console.log(myActions("pose")); // => should log 'pose done'
console.log(myActions("undo")); // => should log 'pose undone'
console.log(myActions("undo")); // => should log 'code undone'
console.log(myActions("undo")); // => should log 'nothing to undo'

// CHALLENGE 19
console.log("-------------");
console.log("CHALLENGE 19");
function blackjack(array: number[]) {
  let cardIdx = 0;
  let cardSum = 0;

  return function dealer(card1: number, card2: number) {
    let isFirstCall = true;
    let isBusted = false;

    cardSum = card1 + card2;

    return function player() {
      if (isFirstCall) {
        isFirstCall = false;

        return cardSum;
      }

      if (isBusted) {
        return "you are done!";
      }

      cardSum += array[cardIdx++];

      if (cardSum > 21) {
        isBusted = true;

        return "bust";
      }

      return cardSum;
    };
  };
}

// /*** Uncomment these to check your work! ***/

// /*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

// /*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // => should log 9
console.log(i_like_to_live_dangerously()); // => should log 11
console.log(i_like_to_live_dangerously()); // => should log 17
console.log(i_like_to_live_dangerously()); // => should log 18
console.log(i_like_to_live_dangerously()); // => should log 'bust'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'
console.log(i_like_to_live_dangerously()); // => should log 'you are done!'

// /*** BELOW LINES ARE FOR THE BONUS ***/

// /*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // => should log 4
console.log(i_TOO_like_to_live_dangerously()); // => should log 15
console.log(i_TOO_like_to_live_dangerously()); // => should log 19
console.log(i_TOO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // => should log 'you are done!

// /*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // => should log 10
console.log(i_ALSO_like_to_live_dangerously()); // => should log 13
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // => should log 'you are done!
