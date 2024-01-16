// CHALLENGE 1
console.log("CHALLENGE 1");

function sumFunc<T>(arr: T[]) {
  // YOUR CODE HERE
  let result = 0;

  for (let i = 0; i < arr.length; i++) {
    result += array[i];
  }

  return result;
}

// Uncomment the lines below to test your work
const array = [1, 2, 3, 4];
console.log(sumFunc(array)); // -> should log 10

function returnIterator<T>(arr: T[]) {
  // YOUR CODE HERE
  let idx = 0;

  function next() {
    return arr[idx++];
  }

  return next;
}

// Uncomment the lines below to test your work
const array2 = ["a", "b", "c", "d"];
const myIterator = returnIterator(array2);
console.log(myIterator()); // -> should log 'a'
console.log(myIterator()); // -> should log 'b'
console.log(myIterator()); // -> should log 'c'
console.log(myIterator()); // -> should log 'd'

console.log("----------");
// CHALLENGE 2
console.log("CHALLENGE 2");

function nextIterator<T>(arr: T[]) {
  // YOUR CODE HERE
  let idx = 0;

  function next() {
    return arr[idx++];
  }

  return { next };
}

// Uncomment the lines below to test your work
const array3 = [1, 2, 3];
const iteratorWithNext = nextIterator(array3);
console.log(iteratorWithNext.next()); // -> should log 1
console.log(iteratorWithNext.next()); // -> should log 2
console.log(iteratorWithNext.next()); // -> should log 3

console.log("----------");
// CHALLENGE 3
console.log("CHALLENGE 3");

function sumArray(arr: number[]) {
  // YOUR CODE HERE
  // use your nextIterator function
  let result = 0;

  const iterator = nextIterator(arr);
  let element = iterator.next();

  while (element) {
    result += element;

    element = iterator.next();
  }

  return result;
}

// Uncomment the lines below to test your work
const array4 = [1, 2, 3, 4];
console.log(sumArray(array4)); // -> should log 10

console.log("----------");
// CHALLENGE 4
console.log("CHALLENGE 4");

function setIterator<T>(set: Set<T>) {
  // YOUR CODE HERE
  const iterator = set.values();

  function next() {
    return iterator.next().value;
  }

  return { next };
}

// Uncomment the lines below to test your work
const mySet = new Set("hey");
const iterateSet = setIterator(mySet);
console.log(iterateSet.next()); // -> should log 'h'
console.log(iterateSet.next()); // -> should log 'e'
console.log(iterateSet.next()); // -> should log 'y'

console.log("----------");
// CHALLENGE 5
console.log("CHALLENGE 5");

function indexIterator<T>(arr: T[]) {
  // YOUR CODE HERE
  let idx = 0;

  function next() {
    return [idx, arr[idx++]];
  }

  return { next };
}

// Uncomment the lines below to test your work
const array5 = ["a", "b", "c", "d"];
const iteratorWithIndex = indexIterator(array5);
console.log(iteratorWithIndex.next()); // -> should log [0, 'a']
console.log(iteratorWithIndex.next()); // -> should log [1, 'b']
console.log(iteratorWithIndex.next()); // -> should log [2, 'c']

console.log("----------");
// CHALLENGE 6
console.log("CHALLENGE 6");

function Words(this: { [k: string]: string }, string: string) {
  this.str = string;
}

Words.prototype[Symbol.iterator] = function* () {
  // YOUR CODE HERE
  const chunks = this.str.split(/\s+/g);
  let idx = 0;

  return {
    next: function () {
      if (idx >= chunks.length) {
        return { done: true };
      }

      return { value: chunks[idx++], done: false };
    },
  };
};

// Uncomment the lines below to test your work
const helloWorld = new (Words as any)("Hello World");
for (let word of helloWorld) {
  console.log(word);
} // -> should log 'Hello' and 'World'

console.log("----------");
// CHALLENGE 7
console.log("CHALLENGE 7");

function valueAndPrevIndex(array: number[]) {
  let idx = 0;

  function sentence() {
    const element = array[idx];

    if (idx === 0) {
      idx++;
      return `${element} is the first element`;
    }

    const prevIndex = idx - 1;
    idx++;
    return `${element} was found after index ${prevIndex}`;
  }

  return { sentence };
}

const returnedSentence = valueAndPrevIndex([4, 5, 6]);
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());
console.log(returnedSentence.sentence());

console.log("----------");
// CHALLENGE 8
console.log("CHALLENGE 8");

function* createConversation(string: string) {
  yield setInterval(() => {
    if (string == "english") {
      console.log("hello there");
    } else {
      console.log("gibberish");
    }
  }, 3000);
}

// console.log(createConversation('english').next());

console.log("----------");
// CHALLENGE 9
console.log("CHALLENGE 9");
function waitForVerb(noun: string) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(noun + " jump");
    }, 3000);
  });
}

async function f(noun: string) {
  const result = await waitForVerb(noun);
  console.log(result);
}

f("dog");
