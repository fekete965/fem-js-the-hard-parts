// ##########################
// # Higher-Order Functions #
// ##########################

// Challenge 1
console.log("----------");
console.log("Challenge 1");
const addTwo = (num: number) => {
  return num + 2;
};

// To check if you've completed this function, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));

// Challenge 2
console.log("----------");
console.log("Challenge 2");
const addS = (word: string) => {
  return word + "s";
};

// Uncomment these to check your work
console.log(addS("pizza"));
console.log(addS("bagel"));

// Challenge 3
console.log("----------");
console.log("Challenge 3");
const map = <A, B>(array: A[], callback: (value: A) => B) => {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    newArray.push(callback(value));
  }

  return newArray;
};

console.log(map([1, 2, 3], addTwo));

// Challenge 4
console.log("----------");
console.log("Challenge 4");
const forEach = <A>(array: A[], callback: (value: A) => void) => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
};

// See for yourself if your forEach works!
const forEachArray = [10, 20, 30];
forEach(forEachArray, addTwo);
console.log(forEachArray);

// Challenge 5
console.log("----------");
console.log("Challenge 5");
const mapWith = <A, B>(array: A[], callback: (value: A) => B) => {
  const newArray: B[] = [];

  function wrapper(arg: A) {
    const value = callback(arg);
    newArray.push(value);
  }

  forEach(array, wrapper);

  return newArray;
};

const mapWithArray = [5, 10, 15];
console.log(mapWith(mapWithArray, addTwo));

// Challenge 6
console.log("----------");
console.log("Challenge 6");
const reduce = (
  array: any[],
  callback: (acc: any, curr: any) => any,
  initialValue?: any
): any => {
  let i = 0;

  if (initialValue == null) {
    initialValue = array[i++];
  }

  let value: any = initialValue;

  for (; i < array.length; i++) {
    value = callback(value, array[i]);
  }

  return value;
};

const reduceArray = [2, 4, 6];
function add(a: number, b: number) {
  return a + b;
}
console.log(reduce(reduceArray, add, 0));

// Challenge 7
console.log("----------");
console.log("Challenge 7");
const intersection = <A>(arrays: A[][]) => {
  function callback(acc: A[], arr: A[]) {
    const newArr = [];

    for (let i = 0; i < acc.length; i++) {
      const value = acc[i];

      if (arr.includes(value)) {
        newArr.push(value);
      }
    }

    return newArr;
  }

  return reduce(arrays, callback);
};

console.log(
  intersection([
    [5, 10, 15, 20],
    [15, 88, 1, 5, 7],
    [1, 10, 15, 5, 20],
  ])
);
// should log: [5, 15]

// Challenge 8
console.log("----------");
console.log("Challenge 8");
const union = <A>(arrays: A[][]) => {
  function callback(acc: A[], arr: A[]) {
    for (let i = 0; i < arr.length; i++) {
      const value = arr[i];

      if (!acc.includes(value)) {
        acc.push(value);
      }
    }

    return acc;
  }

  return reduce(arrays, callback);
};

console.log(
  union([
    [5, 10, 15],
    [15, 88, 1, 5, 7],
    [100, 15, 10, 1, 5],
  ])
);
// should log: [5, 10, 15, 88, 1, 7, 100]

// Challenge 9
console.log("----------");
console.log("Challenge 9");
const objOfMatches = (
  array1: string[],
  array2: string[],
  callback: (value: string) => string
) => {
  const dict: Record<string, string> = {};

  for (let i = 0; i < array1.length; i++) {
    const value1 = array1[i];
    const value2 = array2[i];

    if (callback(value1) === value2) {
      dict[value1.toString()] = value2;
    }
  }

  return dict;
};

console.log(
  objOfMatches(
    ["hi", "howdy", "bye", "later", "hello"],
    ["HI", "Howdy", "BYE", "LATER", "hello"],
    (str) => str.toUpperCase()
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

// Challenge 10
console.log("----------");
console.log("Challenge 10");
const multiMap = <A extends string, B>(
  arrVals: A[],
  arrCallbacks: ((value: A) => B)[]
) => {
  const dict: Record<string, B[]> = {};

  for (let i = 0; i < arrVals.length; i++) {
    const value = arrVals[i];

    dict[value] = arrCallbacks.map((cb) => cb(value));
  }

  return dict;
};

console.log(
  multiMap(
    ["catfood", "glue", "beer"],
    [
      (str) => str.toUpperCase(),
      (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),
      (str) => str + str,
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Challenge 11
console.log("----------");
console.log("Challenge 11");
const commutative = <A, B extends (value: A) => A>(
  func1: B,
  func2: B,
  value: A
) => {
  const func1Result1 = func1(value);
  const func2Result1 = func2(func1Result1);

  const func2Result2 = func2(value);
  const func1Result2 = func1(func2Result2);

  return func2Result1 === func1Result2;
};

/*** Uncomment these to check your work! ***/
const multBy3 = (n: number) => n * 3;
const divBy4 = (n: number) => n / 4;
const subtract5 = (n: number) => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false

// Challenge 12
console.log("----------");
console.log("Challenge 12");
const objFilter = <A extends object>(
  obj: A,
  callback: (value: keyof A) => A[Extract<keyof A, string>]
) => {
  const result = {} as Record<keyof A, A[Extract<keyof A, string>]>;

  for (let key in obj) {
    const value = obj[key];

    if (callback(key) === value) {
      result[key] = value;
    }
  }

  return result;
};

/*** Uncomment these to check your work! ***/
const startingObj: Record<number, number> = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n: number) => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Challenge 13
console.log("----------");
console.log("Challenge 13");
const rating = <A>(arrOfFuncs: ((value: A) => boolean)[], value: A) => {
  const arrLength = arrOfFuncs.length;
  let trueCount = 0;

  for (let i = 0; i < arrLength; i++) {
    const fn = arrOfFuncs[i];

    if (fn(value)) {
      trueCount++;
    }
  }

  return (trueCount / arrLength) * 100;
};

/*** Uncomment these to check your work! ***/
const isEven = (n: number) => n % 2 === 0;
const greaterThanFour = (n: number) => n > 4;
const isSquare = (n: number) => Math.sqrt(n) % 1 === 0;
const hasSix = (n: number) => n.toString().includes("6");
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75

// Challenge 14
console.log("----------");
console.log("Challenge 14");
const pipe = <A>(arrOfFuncs: ((value: A) => A)[], value: A) => {
  let result = value;

  for (let i = 0; i < arrOfFuncs.length; i++) {
    const fn = arrOfFuncs[i];

    result = fn(result);
  }

  return result;
};

/*** Uncomment these to check your work! ***/
const capitalize = (str: string) => str.toUpperCase();
const addLowerCase = (str: string) => str + str.toLowerCase();
const repeat = (str: string) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, "cat")); // should log: 'CATcatCATcat'

// Challenge 15
console.log("----------");
console.log("Challenge 15");
const highestFunc = <A>(
  objOfFuncs: { [key: string]: (value: A) => number },
  subject: A
) => {
  let result = null;
  let temp = 0;

  for (let key in objOfFuncs) {
    const fn = objOfFuncs[key];
    const value = fn(subject);

    if (value > temp) {
      result = key;
      temp = value;
    }
  }

  return result;
};

/*** Uncomment these to check your work! ***/
const groupOfFuncs: any = {};
groupOfFuncs.double = (n: number) => n * 2;
groupOfFuncs.addTen = (n: number) => n + 10;
groupOfFuncs.inverse = (n: number) => n * -1;
console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

// ###########
// # Closure #
// ###########

// Challenge 1
console.log("----------");
console.log("Challenge 1");
const createFunction = () => {
  return function sayHello() {
    console.log("Hello");
  };
};

// UNCOMMENT THESE TO TEST YOUR WORK!
const function1 = createFunction();
function1();

// Challenge 2
console.log("----------");
console.log("Challenge 2");
const createFunctionPrinter = (input: string) => {
  return function printInput() {
    console.log(input);
  };
};

// UNCOMMENT THESE TO TEST YOUR WORK!
const printSample = createFunctionPrinter("sample");
printSample();
const printHello = createFunctionPrinter("hello");
printHello();

// Challenge 3
console.log("----------");
console.log("Challenge 3");
const outer = () => {
  let counter = 0; // this variable is outside incrementCounter's scope
  const incrementCounter = () => {
    counter++;
    console.log("counter", counter);
  };
  return incrementCounter;
};

const willCounter = outer();
const jasCounter = outer();

// Uncomment each of these lines one by one.
// Before your do, guess what will be logged from each function call.

// willCounter();
// willCounter();
// willCounter();

// jasCounter();
// willCounter();

// Challenge 4
console.log("----------");
console.log("Challenge 4");
const addByX = (x: number) => {
  let sum = x;

  return function addToSum(y: number) {
    return sum + y;
  };
};

const addByTwo = addByX(2);

// now call addByTwo with an input of 1
console.log(addByTwo(1));
// now call addByTwo with an input of 2
console.log(addByTwo(2));

// Challenge 5
console.log("----------");
console.log("Challenge 5");
const once = <T>(func: (...args: any[]) => T) => {
  let hasRun = false;
  let cbValue: T;

  return function helperFn(...args: any[]) {
    if (!hasRun) {
      cbValue = func(...args);
      hasRun = true;
    }

    return cbValue;
  };
};

const onceFunc = once(addByTwo);

// UNCOMMENT THESE TO TEST YOUR WORK!
console.log(onceFunc(4)); //should log 6
console.log(onceFunc(10)); //should log 6
console.log(onceFunc(9001)); //should log 6

// Challenge 6
console.log("----------");
console.log("Challenge 6");
const after = (count: number, func: Function) => {
  let callCounter = count;

  return function helperFn() {
    if (callCounter > 1) {
      callCounter -= 1;
      return;
    }

    return func();
  };
};

const called = () => console.log("hello");
const afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed

// Challenge 7
console.log("----------");
console.log("Challenge 7");
const delay = (func: Function, wait: number) => {
  let canBeEnvoked = false;

  setTimeout(() => {
    canBeEnvoked = true;
  }, wait);

  return function helperFn(...args: any[]) {
    if (!canBeEnvoked) return;

    func(...args);
  };
};

// Challenge 8
console.log("----------");
console.log("Challenge 8");
const russianRoulette = (num: number) => {
  return function play() {
    if (num === 1) {
      num--;
      return "bang";
    }

    if (num > 1) {
      num--;
      return "click";
    }

    return "reload to play again";
  };
};

// /*** Uncomment these to check your work! ***/
const play = russianRoulette(3);
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'click'
console.log(play()); // should log: 'bang'
console.log(play()); // should log: 'reload to play again'
console.log(play()); // should log: 'reload to play again'

// Challenge 9
console.log("----------");
console.log("Challenge 9");
const average = () => {
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
};

// /*** Uncomment these to check your work! ***/
const avgSoFar = average();
console.log(avgSoFar()); // should log: 0
console.log(avgSoFar(4)); // should log: 4
console.log(avgSoFar(8)); // should log: 6
console.log(avgSoFar()); // should log: 6
console.log(avgSoFar(12)); // should log: 8
console.log(avgSoFar()); // should log: 8

// Challenge 10
console.log("----------");
console.log("Challenge 10");
const makeFuncTester = (arrOfTests: [A: string, B: string][]) => {
  return function runTest(cb: (input: string) => string) {
    for (let i = 0; i < arrOfTests.length; i++) {
      const test = arrOfTests[i];

      if (cb(test[0]) !== test[1]) {
        return false;
      }
    }

    return true;
  };
};

// /*** Uncomment these to check your work! ***/
const capLastTestCases: [string, string][] = [];
capLastTestCases.push(["hello", "hellO"]);
capLastTestCases.push(["goodbye", "goodbyE"]);
capLastTestCases.push(["howdy", "howdY"]);
const shouldCapitalizeLast = makeFuncTester(capLastTestCases);
const capLastAttempt1 = (str: string) => str.toUpperCase();
const capLastAttempt2 = (str: string) =>
  str.slice(0, -1) + str.slice(-1).toUpperCase();
console.log(shouldCapitalizeLast(capLastAttempt1)); // should log: false
console.log(shouldCapitalizeLast(capLastAttempt2)); // should log: true

// Challenge 11
console.log("----------");
console.log("Challenge 11");
const makeHistory = (limit: number) => {
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
};

/*** Uncomment these to check your work! ***/
const myActions = makeHistory(2);
console.log(myActions("jump")); // should log: 'jump done'
console.log(myActions("undo")); // should log: 'jump undone'
console.log(myActions("walk")); // should log: 'walk done'
console.log(myActions("code")); // should log: 'code done'
console.log(myActions("pose")); // should log: 'pose done'
console.log(myActions("undo")); // should log: 'pose undone'
console.log(myActions("undo")); // should log: 'code undone'
console.log(myActions("undo")); // should log: 'nothing to undo'

// Challenge 12
console.log("----------");
console.log("Challenge 12");
const blackjack = (array: number[]) => {
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
};

/*** Uncomment these to check your work! ***/

/*** DEALER ***/
const deal = blackjack([
  2, 6, 1, 7, 11, 4, 6, 3, 9, 8, 9, 3, 10, 4, 5, 3, 7, 4, 9, 6, 10, 11,
]);

/*** PLAYER 1 ***/
const i_like_to_live_dangerously = deal(4, 5);
console.log(i_like_to_live_dangerously()); // should log: 9
console.log(i_like_to_live_dangerously()); // should log: 11
console.log(i_like_to_live_dangerously()); // should log: 17
console.log(i_like_to_live_dangerously()); // should log: 18
console.log(i_like_to_live_dangerously()); // should log: 'bust'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'
console.log(i_like_to_live_dangerously()); // should log: 'you are done!'

/*** BELOW LINES ARE FOR THE BONUS ***/

/*** PLAYER 2 ***/
const i_TOO_like_to_live_dangerously = deal(2, 2);
console.log(i_TOO_like_to_live_dangerously()); // should log: 4
console.log(i_TOO_like_to_live_dangerously()); // should log: 15
console.log(i_TOO_like_to_live_dangerously()); // should log: 19
console.log(i_TOO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_TOO_like_to_live_dangerously()); // should log: 'you are done!

/*** PLAYER 3 ***/
const i_ALSO_like_to_live_dangerously = deal(3, 7);
console.log(i_ALSO_like_to_live_dangerously()); // should log: 10
console.log(i_ALSO_like_to_live_dangerously()); // should log: 13
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'bust'
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!
console.log(i_ALSO_like_to_live_dangerously()); // should log: 'you are done!

// ##########################
// # Extension Challenges   #
// ##########################

// Challenge 1
console.log("----------");
console.log("Challenge 1");
const functionValidator = <A>(
  funcArr: ((value: A) => A)[],
  input: A,
  output: number
) => {
  function helperFn(acc: ((value: A) => A)[], callback: (value: A) => A) {
    if (callback(input) === output) {
      acc.push(callback);
    }

    return acc;
  }

  return reduce(funcArr, helperFn, []);
};

const addFive = (num: number) => num + 5;
const multiplyByTwo = (num: number) => num * 2;
const subtractOne = (num: number) => num - 1;
const fnArr = [addFive, multiplyByTwo, subtractOne];

console.log(functionValidator(fnArr, 5, 10)); // should log [num => num + 5, num => num * 2]

// Challenge 2
console.log("----------");
console.log("Challenge 2");
const allClear = <A>(funcArr: ((value: A) => boolean)[], value: A) => {
  function helperFn(acc: boolean, evaluatorFn: (value: A) => boolean) {
    if (!acc) return acc;

    return evaluatorFn(value);
  }

  return reduce(funcArr, helperFn, true);
};

const isOdd = (num: number) => num % 2 === 1;
const isPositive = (num: number) => num > 0;
const multipleOfFive = (num: number) => num % 5 === 0;
const numFnArr = [isOdd, isPositive, multipleOfFive];
console.log(allClear(numFnArr, 25)); // should log true
console.log(allClear(numFnArr, -25)); // should log false

// Challenge 3
console.log("----------");
console.log("Challenge 3");
const numSelectString = (numArr: number[]) => {
  return numArr
    .filter((num) => num % 2 === 1)
    .sort((a, b) => a - b)
    .reduce((acc, curr) => acc + ", " + curr.toString(), "");
};

const nums = [17, 34, 3, 12];
console.log(numSelectString(nums)); // should log "3, 17"

// Challenge 4
console.log("----------");
console.log("Challenge 4");

type Movie = {
  id?: number;
  score: number;
  title: string;
};

const movieSelector = (moviesArr: Movie[]) => {
  return moviesArr
    .filter((movies) => movies.score > 5)
    .map((movie) => movie.title.toUpperCase());
};

const movies: Movie[] = [
  { id: 1, title: "Pan's Labyrinth", score: 9 },
  { id: 37, title: "Manos: The Hands of Fate", score: 2 },
  { title: "Air Bud", score: 5 },
  { title: "Hackers", score: 7 },
];
console.log(movieSelector(movies)); // should log [ "PAN'S LABYRINTH", "HACKERS" ]

// Challenge 5
console.log("----------");
console.log("Challenge 5");
const curriedAddThreeNums = (num1: number) => {
  return function second(num2: number) {
    return function third(num3: number) {
      return num1 + num2 + num3;
    };
  };
};

console.log(curriedAddThreeNums(3)(-1)(1)); // should log 3

// Challenge 6
console.log("----------");
console.log("Challenge 6");
const curriedAddTwoNumsToFive = curriedAddThreeNums(5);

console.log(curriedAddTwoNumsToFive(6)(7)); // should log 18

export {};
