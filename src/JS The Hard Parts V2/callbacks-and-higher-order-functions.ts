// Challenge 1
console.log("Challenge 1");
function addTwo(num: number) {
  return num + 2;
}

// To check if you've completed it, uncomment these console.logs!
console.log(addTwo(3));
console.log(addTwo(10));

// Challenge 2
console.log("------------");
console.log("Challenge 2");
function addS(word: string) {
  return word + "s";
}

// uncomment these to check your work
console.log(addS("pizza"));
console.log(addS("bagel"));

// Challenge 3
console.log("------------");
console.log("Challenge 3");
function map<A, B>(array: A[], callback: (value: A) => B) {
  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    newArray[i] = callback(array[i]);
  }

  return newArray;
}

console.log(map([1, 2, 3], addTwo));

// Challenge 4
console.log("------------");
console.log("Challenge 4");
function forEach<A>(array: A[], callback: (value: A) => void) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

// see for yourself if your forEach works!
const forEachArray = [10, 20, 30];
forEach(forEachArray, addTwo);
console.log(forEachArray);

// Challenge 5
console.log("------------");
console.log("Challenge 5");
function mapWith<A, B>(array: A[], callback: (value: A) => B) {
  const newArray: B[] = [];

  function wrapper(arg: A) {
    const value = callback(arg);
    newArray.push(value);
  }

  forEach(array, wrapper);

  return newArray;
}

const mapWithArray = [5, 10, 15];
console.log(mapWith(mapWithArray, addTwo));
// Challenge 6
console.log("------------");
console.log("Challenge 6");
function reduce(
  array: any[],
  callback: (acc: any, curr: any) => any,
  initialValue?: any
): any {
  let i = 0;

  if (initialValue == null) {
    initialValue = array[i++];
  }

  let value: any = initialValue;

  for (; i < array.length; i++) {
    value = callback(value, array[i]);
  }

  return value;
}

const reduceArray = [2, 4, 6];
function add(a: number, b: number) {
  return a + b;
}
console.log(reduce(reduceArray, add, 0));

// Challenge 7
console.log("------------");
console.log("Challenge 7");
function intersection<A>(arrays: A[][]) {
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
}

console.log(
  intersection([
    [5, 10, 15, 20],
    [15, 88, 1, 5, 7],
    [1, 10, 15, 5, 20],
  ])
);
// should log: [5, 15]

// Challenge 8
console.log("------------");
console.log("Challenge 8");
function union<A>(arrays: A[][]) {
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
}

console.log(
  union([
    [5, 10, 15],
    [15, 88, 1, 5, 7],
    [100, 15, 10, 1, 5],
  ])
);
// should log: [5, 10, 15, 88, 1, 7, 100]

// Challenge 9
console.log("------------");
console.log("Challenge 9");
function objOfMatches(
  array1: string[],
  array2: string[],
  callback: (value: string) => string
) {
  const dict: Record<string, string> = {};

  for (let i = 0; i < array1.length; i++) {
    const value1 = array1[i];
    const value2 = array2[i];

    if (callback(value1) === value2) {
      dict[value1] = value2;
    }
  }

  return dict;
}

console.log(
  objOfMatches(
    ["hi", "howdy", "bye", "later", "hello"],
    ["HI", "Howdy", "BYE", "LATER", "hello"],
    function (str: string) {
      return str.toUpperCase();
    }
  )
);
// should log: { hi: 'HI', bye: 'BYE', later: 'LATER' }

// Challenge 10
console.log("------------");
console.log("Challenge 10");
function multiMap<A extends string, B>(
  arrVals: A[],
  arrCallbacks: ((value: A) => B)[]
) {
  const dict: Record<string, B[]> = {};

  for (let i = 0; i < arrVals.length; i++) {
    const value = arrVals[i];

    dict[value] = arrCallbacks.map((cb) => cb(value));
  }

  return dict;
}

console.log(
  multiMap(
    ["catfood", "glue", "beer"],
    [
      function (str) {
        return str.toUpperCase();
      },
      function (str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
      },
      function (str) {
        return str + str;
      },
    ]
  )
);
// should log: { catfood: ['CATFOOD', 'Catfood', 'catfoodcatfood'], glue: ['GLUE', 'Glue', 'glueglue'], beer: ['BEER', 'Beer', 'beerbeer'] }

// Challenge 11
console.log("------------");
console.log("Challenge 11");
function objectFilter<A extends object>(
  obj: A,
  callback: (o: A[Extract<keyof A, string>]) => any
) {
  const newObj = {} as Record<
    Extract<keyof A, string>,
    A[Extract<keyof A, string>]
  >;

  for (let key in obj) {
    const value = obj[key];

    if (value === callback(value)) {
      newObj[key] = value;
    }
  }

  return newObj;
}

const cities = {
  London: "LONDON",
  LA: "Los Angeles",
  Paris: "PARIS",
};
console.log(objectFilter(cities, (city: string) => city.toUpperCase())); // Should log { London: 'LONDON', Paris: 'PARIS'}

// Challenge 12
console.log("------------");
console.log("Challenge 12");
function majority<A>(array: A[], callback: (value: A) => boolean) {
  let trueCounter = 0;
  let falseCounter = 0;

  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      trueCounter++;

      continue;
    }

    falseCounter++;
  }

  return trueCounter > falseCounter;
}

// /*** Uncomment these to check your work! ***/
const isOdd = function (num: number) {
  return num % 2 === 1;
};
console.log(majority([1, 2, 3, 4, 5], isOdd)); // should log: true
console.log(majority([2, 3, 4, 5], isOdd)); // should log: false

// Challenge 13
console.log("------------");
console.log("Challenge 13");
function prioritize<A>(array: A[], callback: (value: A) => boolean) {
  const newArray = [];

  let indexOfFront = 0;

  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (callback(value)) {
      newArray.splice(indexOfFront++, 0, value);

      continue;
    }

    newArray.push(value);
  }

  return newArray;
}

// /*** Uncomment these to check your work! ***/
const startsWithS = function (str: string) {
  return str[0] === "s" || str[0] === "S";
};
console.log(
  prioritize(
    ["curb", "rickandmorty", "seinfeld", "sunny", "friends"],
    startsWithS
  )
); // should log:
["seinfeld", "sunny", "curb", "rickandmorty", "friends"];

// Challenge 14
console.log("------------");
console.log("Challenge 14");
function countBy<
  A extends string | number | symbol,
  B extends string | number | symbol
>(array: A[], callback: (value: A) => B) {
  const result = {} as Record<B, number>;

  for (let i = 0; i < array.length; i++) {
    const value = callback(array[i]);

    if (result[value] != null) {
      result[value]++;

      continue;
    }

    result[value] = 1;
  }

  return result;
}

/*** Uncomment these to check your work! ***/
console.log(
  countBy([1, 2, 3, 4, 5], function (num: number) {
    if (num % 2 === 0) return "even";
    else return "odd";
  })
); // should log: { odd: 3, even: 2 }

// Challenge 15
console.log("------------");
console.log("Challenge 15");
function groupBy<A, B extends string | number | symbol>(
  array: A[],
  callback: (value: A) => B
) {
  const result = {} as Record<B, A[]>;

  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    const value = callback(item);

    if (result[value]) {
      result[value].push(item);

      continue;
    }

    result[value] = [item];
  }

  return result;
}

/*** Uncomment these to check your work! ***/
const decimals = [1.3, 2.1, 2.4];
const floored = function (num: number) {
  return Math.floor(num);
};
console.log(groupBy(decimals, floored)); // should log: { 1: [1.3], 2: [2.1, 2.4] }

// Challenge 16
console.log("------------");
console.log("Challenge 16");
function goodKeys<A extends object>(
  obj: A,
  callback: (value: A[keyof A]) => boolean
) {
  const result = [];

  for (let key in obj) {
    const value = obj[key];

    if (callback(value)) {
      result.push(key);
    }
  }

  return result;
}

/*** Uncomment these to check your work! ***/
const sunny = {
  mac: "priest",
  dennis: "calculating",
  charlie: "birdlaw",
  dee: "bird",
  frank: "warthog",
};
const startsWithBird = function (str: string) {
  return str.slice(0, 4).toLowerCase() === "bird";
};
console.log(goodKeys(sunny, startsWithBird)); // should log: ['charlie', 'dee']

// Challenge 17
console.log("------------");
console.log("Challenge 17");
function commutative<A, B extends (value: A) => A>(
  func1: B,
  func2: B,
  value: A
) {
  const func1Result1 = func1(value);
  const func2Result1 = func2(func1Result1);

  const func2Result2 = func2(value);
  const func1Result2 = func1(func2Result2);

  return func2Result1 === func1Result2;
}

/*** Uncomment these to check your work! ***/
const multBy3 = (n: number) => n * 3;
const divBy4 = (n: number) => n / 4;
const subtract5 = (n: number) => n - 5;
console.log(commutative(multBy3, divBy4, 11)); // should log: true
console.log(commutative(multBy3, subtract5, 10)); // should log: false
console.log(commutative(divBy4, subtract5, 48)); // should log: false

// Challenge 18
console.log("------------");
console.log("Challenge 18");
function objFilter<A extends object>(
  obj: A,
  callback: (value: keyof A) => A[Extract<keyof A, string>]
) {
  const result = {} as Record<keyof A, A[Extract<keyof A, string>]>;

  for (let key in obj) {
    const value = obj[key];

    if (callback(key) === value) {
      result[key] = value;
    }
  }

  return result;
}

/*** Uncomment these to check your work! ***/
const startingObj: Record<number, number> = {};
startingObj[6] = 3;
startingObj[2] = 1;
startingObj[12] = 4;
const half = (n: number) => n / 2;
console.log(objFilter(startingObj, half)); // should log: { 2: 1, 6: 3 }

// Challenge 19
console.log("------------");
console.log("Challenge 19");
function rating<A>(arrOfFuncs: ((value: A) => boolean)[], value: A) {
  const arrLength = arrOfFuncs.length;
  let trueCount = 0;

  for (let i = 0; i < arrLength; i++) {
    const fn = arrOfFuncs[i];

    if (fn(value)) {
      trueCount++;
    }
  }

  return (trueCount / arrLength) * 100;
}

/*** Uncomment these to check your work! ***/
const isEven = (n: number) => n % 2 === 0;
const greaterThanFour = (n: number) => n > 4;
const isSquare = (n: number) => Math.sqrt(n) % 1 === 0;
const hasSix = (n: number) => n.toString().includes("6");
const checks = [isEven, greaterThanFour, isSquare, hasSix];
console.log(rating(checks, 64)); // should log: 100
console.log(rating(checks, 66)); // should log: 75

// Challenge 20
console.log("------------");
console.log("Challenge 20");
function pipe<A>(arrOfFuncs: ((value: A) => A)[], value: A) {
  let result = value;

  for (let i = 0; i < arrOfFuncs.length; i++) {
    const fn = arrOfFuncs[i];

    result = fn(result);
  }

  return result;
}

/*** Uncomment these to check your work! ***/
const capitalize = (str: string) => str.toUpperCase();
const addLowerCase = (str: string) => str + str.toLowerCase();
const repeat = (str: string) => str + str;
const capAddlowRepeat = [capitalize, addLowerCase, repeat];
console.log(pipe(capAddlowRepeat, "cat")); // should log: 'CATcatCATcat'

// Challenge 21
console.log("------------");
console.log("Challenge 21");
function highestFunc<A>(
  objOfFuncs: { [key: string]: (value: A) => number },
  subject: A
) {
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
}

// /*** Uncomment these to check your work! ***/
const groupOfFuncs: Record<string, (n: number) => number> = {};
groupOfFuncs.double = (n: number) => n * 2;
groupOfFuncs.addTen = (n: number) => n + 10;
groupOfFuncs.inverse = (n: number) => n * -1;
console.log(highestFunc(groupOfFuncs, 5)); // should log: 'addTen'
console.log(highestFunc(groupOfFuncs, 11)); // should log: 'double'
console.log(highestFunc(groupOfFuncs, -20)); // should log: 'inverse'

// Challenge 22
console.log("------------");
console.log("Challenge 22");
function combineOperations<A>(startVal: A, arrOfFuncs: ((value: A) => A)[]) {
  let result = startVal;

  for (let i = 0; i < arrOfFuncs.length; i++) {
    const fn = arrOfFuncs[i];
    result = fn(result);
  }

  return result;
}

function addTen(num: number) {
  return num + 10;
}

function add100(num: number) {
  return num + 100;
}

function divByFive(num: number) {
  return num / 5;
}

function multiplyByThree(num: number) {
  return num * 3;
}

function multiplyFive(num: number) {
  return num * 5;
}

/*** Uncomment these to check your work! ***/
console.log(combineOperations(0, [add100, divByFive, multiplyByThree])); // Should output 60 -->
console.log(combineOperations(0, [divByFive, multiplyFive, addTen])); // Should output 10

// Challenge 23
console.log("------------");
console.log("Challenge 23");
function myFunc<A>(array: A[], callback: (value: A) => boolean) {
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (callback(value)) {
      return i;
    }
  }

  return -1;
}

const numbers = [2, 3, 6, 64, 10, 8, 12];
const evens = [2, 4, 6, 8, 10, 12, 64];

function isOddNumber(num: number) {
  return num % 2 !== 0;
}

/*** Uncomment these to check your work! ***/
console.log(myFunc(numbers, isOddNumber)); // Output should be 1
console.log(myFunc(evens, isOddNumber)); // Output should be -1

// Challenge 24
console.log("------------");
console.log("Challenge 24");
function myForEach<A>(array: A[], callback: (value: A) => any) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}

let sum = 0;

function addToSum(num: number) {
  sum += num;
}

/*** Uncomment these to check your work! ***/
const nums = [1, 2, 3];
myForEach(nums, addToSum);
console.log(sum); // Should output 6
