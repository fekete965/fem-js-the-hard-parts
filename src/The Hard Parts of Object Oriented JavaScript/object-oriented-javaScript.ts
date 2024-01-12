/****************************************************************
                  WORKING WITH OBJECT LITERALS
****************************************************************/

type Person = {
  name: string;
  age: number;
};

type PersonWithGreet = {
  name: string;
  age: number;
  greet(): void;
};

type PersonFunctionStore = {
  greet(): void;
  introduce?: () => void;
};

type PersonWithGreetAndIntroduce = {
  name: string;
  age: number;
  greet(): void;
  introduce(): void;
};

type User = {
  type: string;
};

type AdminFunctionStore = {
  sharePublicMessage?: () => void;
};

/*** CHALLENGE 1 ***/
console.log("CHALLENGE 1");

function makePerson(name: string, age: number) {
  // add code here
  const newPerson = {} as Person;

  newPerson.name = name;
  newPerson.age = age;

  return newPerson;
}

const vicky = makePerson("Vicky", 24);

// /********* Uncomment these lines to test your work! *********/
console.log(vicky.name); // -> Logs 'Vicky'
console.log(vicky.age); // -> Logs 24

/****************************************************************
                       USING OBJECT.CREATE
****************************************************************/

console.log("------------");
/*** CHALLENGE 2 ***/
console.log("CHALLENGE 2");

const personStore: PersonFunctionStore = {
  // add code here
  greet: function () {
    console.log("hello");
  },
};

// /********* Uncomment this line to test your work! *********/
personStore.greet(); // -> Logs 'hello'

console.log("------------");
/*** CHALLENGE 3 ***/
console.log("CHALLENGE 3");

function personFromPersonStore(name: string, age: number) {
  // add code here
  const newPerson = Object.create(personStore) as PersonWithGreetAndIntroduce;

  newPerson.name = name;
  newPerson.age = age;

  return newPerson;
}

const sandra = personFromPersonStore("Sandra", 26);

// /********* Uncomment these lines to test your work! *********/
console.log(sandra.name); // -> Logs 'Sandra'
console.log(sandra.age); //-> Logs 26
sandra.greet(); //-> Logs 'hello'

console.log("------------");
/*** CHALLENGE 4 ***/
console.log("CHALLENGE 4");

// add code here
personStore.introduce = function (this: any) {
  console.log("Hi, my name is " + this.name);
};

sandra.introduce(); // -> Logs 'Hi, my name is Sandra'

/****************************************************************
                    USING THE 'NEW' KEYWORD
****************************************************************/

console.log("------------");
/*** CHALLENGE 5 ***/
console.log("CHALLENGE 5");

function PersonConstructor(this: any) {
  // add code here
  this.greet = function () {
    console.log("hello");
  };
}

// /********* Uncomment this line to test your work! *********/
const simon = new (PersonConstructor as any)();
simon.greet(); // -> Logs 'hello'

console.log("------------");
/*** CHALLENGE 6 ***/
console.log("CHALLENGE 6");

function personFromConstructor(name: string, age: number) {
  // add code here
  const newPerson = new (PersonConstructor as any)();

  newPerson.name = name;
  newPerson.age = age;

  return newPerson;
}

const mike = personFromConstructor("Mike", 30);

// /********* Uncomment these lines to test your work! *********/
console.log(mike.name); // -> Logs 'Mike'
console.log(mike.age); //-> Logs 30
mike.greet(); //-> Logs 'hello'

console.log("------------");
/*** CHALLENGE 7 ***/
console.log("CHALLENGE 7");
// add code here
PersonConstructor.prototype.introduce = function () {
  console.log("Hi, my name is " + this.name);
};

mike.introduce(); // -> Logs 'Hi, my name is Mike'

/****************************************************************
                        USING ES6 CLASSES
****************************************************************/

console.log("------------");
/*** CHALLENGE 8 ***/
console.log("CHALLENGE 8");

class PersonClass {
  name: string;

  constructor(name: string) {
    // add code here
    this.name = name;
  }

  // add code here
  greet() {
    console.log("hello");
  }
}

// /********* Uncomment this line to test your work! *********/
const george = new PersonClass("George");
george.greet(); // -> Logs 'hello'

console.log("------------");
/*** CHALLENGE 9 ***/
console.log("CHALLENGE 9");

// add code here
class DeveloperClass extends PersonClass {
  constructor(name: string) {
    super(name);
  }

  introduce() {
    console.log("Hello World, my name is " + this.name);
  }
}

// /********* Uncomment these lines to test your work! *********/
const thai = new DeveloperClass("Thai");
console.log(thai.name); // -> Logs 'Thai'
thai.introduce(); //-> Logs 'Hello World, my name is Thai'

/****************************************************************
                      EXTENSION: SUBCLASSING
****************************************************************/

const userFunctionStore = {
  sayType: function (this: User) {
    console.log("I am a " + this.type);
  },
};

function userFactory(name: string, score: number) {
  let user = Object.create(userFunctionStore);
  user.type = "User";
  user.name = name;
  user.score = score;
  return user;
}

console.log("------------");
/*** CHALLENGE 10 ***/
console.log("CHALLENGE 10");

const adminFunctionStore: AdminFunctionStore = {};
// add code here
Object.setPrototypeOf(adminFunctionStore, userFunctionStore);

console.log("------------");
/*** CHALLENGE 11, 12, 13 ***/
console.log("CHALLENGE 11, 12, 13");

function adminFactory(name: string, score: number) {
  // add code here
  const adminUser = userFactory(name, score);

  Object.setPrototypeOf(adminUser, adminFunctionStore);

  adminUser.type = "Admin";

  return adminUser;
}

console.log("------------");
/*** CHALLENGE 14 ***/
console.log("CHALLENGE 14");

/* Put code here for a method called sharePublicMessage*/
adminFunctionStore.sharePublicMessage = function () {
  console.log("Welcome users!");
};

const adminFromFactory = adminFactory("Eva", 5);

// /********* Uncomment these lines to test your work! *********/
adminFromFactory.sayType(); // -> Logs "I am a Admin"
adminFromFactory.sharePublicMessage(); // -> Logs "Welcome users!"

console.log("------------");
/****************************************************************
EXTENSION: MIXINS
****************************************************************/
console.log("EXTENSION: MIXINS");

class Dog {
  legs: number;
  skin?: string;

  constructor() {
    this.legs = 4;
  }
  speak() {
    console.log("Woof!");
  }
}

const robotMixin = {
  skin: "metal",
  speak: function (this: Dog) {
    console.log(`I have ${this.legs} legs and am made of ${this.skin}`);
  },
};

let robotFido = new Dog();

robotFido = Object.assign(
  robotFido,
  robotMixin
) /* Put code here to give Fido robot skills */;

// /********* Uncomment to test your work! *********/
robotFido.speak(); // -> Logs "I am made of metal"
