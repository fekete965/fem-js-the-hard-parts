let myName = "";
let isFocus = false;
let jsInput;
// let jsDiv;
let vDOM;
const parentNodes = [];

// function component() {
//   isFocus = document.activeElement === jsInput;

//   // your code here
//   jsInput = document.createElement("input");
//   jsDiv = document.createElement("div");

//   jsDiv.textContent = myName;

//   function handleInput() {
//     myName = jsInput.value;
//   }
//   jsInput.value = myName;
//   jsInput.oninput = handleInput;

//   document.body.replaceChildren(jsInput, jsDiv);
//   if (isFocus) jsInput.focus();
// }

function convert(node) {
  const [tag, content, handler, children] = node;

  const element = document.createElement(tag);

  if (tag === "input") {
    renderedJsInput = document.querySelector("input");
    isFocus = document.activeElement === renderedJsInput;

    element.oninput = handler;
    element.value = content;
    jsInput = element;
  }

  if (tag === "div") {
    element.onclick = handler;
    element.textContent = content;

    if (children) {
      return [element, children.map(convert)];
    }
  }

  if (tag === "h1") {
    element.textContent = content;
  }

  if (tag === "h2") {
    element.textContent = content;
  }

  if (tag === "p") {
    element.textContent = content;
  }

  if (tag === "button") {
    element.textContent = content;
    element.onclick = handler;
  }

  return element;
}

function createVDOM() {
  return [
    [
      "input",
      myName,
      function handler() {
        myName = jsInput.value;
      },
    ],
    [
      "div",
      `Hello ${myName}!`,
      undefined,
      [
        ["h1", "I am a title"],
        ["p", "I am a paragraph"],
        [
          "div",
          undefined,
          undefined,
          [
            ["h2", "I am a subtitle"],
            ["p", "I am another paragraph"],
          ],
        ],
      ],
    ],
    [
      "button",
      "Alert user",
      function alertUser() {
        // because of the continuous re-render this won't work
        alert(`Alert: ${myName}`);
      },
    ],
  ];
}

function renderElement(element) {
  if (Array.isArray(element)) {
    const [parent, children] = element;

    parentNodes[parentNodes.length - 1].append(parent);
    parentNodes.push(parent);

    children.forEach(renderElement);

    parentNodes.pop();
    return;
  }

  parentNodes[parentNodes.length - 1].append(element);
  return;
}

function updateDOM() {
  vDOM = createVDOM();

  parentNodes.push(document.body);

  const convertedNodes = vDOM.map(convert);

  document.body.innerHTML = "";
  convertedNodes.forEach(renderElement);

  if (isFocus) {
    jsInput.focus();
  }
}

setInterval(updateDOM, 15);
