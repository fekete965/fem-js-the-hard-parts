// let myName = "";

// const vDOM = [
//   [
//     "input",
//     myName,
//     function handle() {
//       myName = jsInput.value;
//     },
//   ],
//   ["div", `Hello, ${myName}!`],
// ];

// function convert(node) {
//   const element = document.createElement(node[0]);
//   element.textContent = node[1];
//   element.value = node[1];
//   element.oninput = node[2];
//   return element;
// }

/** Step @todo */
/* uncomment the code below this line, and comment out the code above*/

let focusedElement = null;
let helloThereWasClicked = false;

let myName = "";
let vDOM;

function renderConditionally(conditionFn, render) {
  return function inner(...args) {
    if (!conditionFn()) return null;
    return render(...args);
  };
}

function makeDiv({ textContent, onclick }) {
  return ["div", textContent, undefined, onclick];
}

function makeConditionalDiv(conditionFn) {
  return renderConditionally(conditionFn, makeDiv);
}

function makeInput({ value, oninput }) {
  return ["input", value, oninput];
}

function createVDOM() {
  return [
    makeInput({
      value: myName,
      oninput: (e) => {
        myName = e.target.value;
      },
    }),
    makeDiv({ textContent: `Hello, ${myName}!` }),
    makeConditionalDiv(() => myName.length > 3)({
      textContent: "Hello, There!",
      onclick: () => {
        helloThereWasClicked = !helloThereWasClicked;
      },
    }),
    makeConditionalDiv(() => helloThereWasClicked)({
      textContent: "General Kenobi!",
    }),
  ];
}

function updateDOM() {
  vDOM = createVDOM();

  const elems = vDOM.map(convert);

  document.body.replaceChildren(...elems);

  if (focusedElement) {
    focusedElement.focus();
  }
}

function convert(node) {
  if (node == null) return document.createDocumentFragment();

  const element = document.createElement(node[0]);

  if (node[0] === "input") {
    focusedElement =
      document.activeElement?.tagName === "INPUT" ? element : null;
  }

  element.textContent = node[1];
  element.value = node[1];
  element.oninput = node[2];
  if (node[3]) {
    element.onclick = node[3];
    element.style.cursor = "pointer";
  }
  return element;
}

setInterval(updateDOM, 15);
