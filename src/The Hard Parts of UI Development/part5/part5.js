const data = {
  name: "",
};
let prevVDOM;
let vDOM;
let elems;

function updateStoredData(label, value) {
  data[label] = value;
  requestAnimationFrame(updateDOM);
}

function getData(label) {
  return data[label];
}

function updateName(e) {
  updateStoredData("name", e.target.value);
}

function createVDOM() {
  return [
    ["input", getData("name"), updateName],
    ["div", `Hello, ${getData("name")}!`],
    ["div", `Great job, Jonathan!`],
    ["div", `Great job, Alexa!`],
    ["div", `Great job, Emilia!`],
  ];
}

function updateDOM() {
  if (!vDOM) {
    vDOM = createVDOM();
    elems = vDOM.map(convert);
    document.body.replaceChildren(...elems);

    return;
  }

  const input = document.querySelector("input");
  isFocus = document.activeElement === input;

  prevVDOM = vDOM;
  vDOM = createVDOM();

  findDiff(prevVDOM, vDOM);

  if (isFocus) elems[0].focus(); //keep this code
}

function convert(node) {
  const element = document.createElement(node[0]);
  element.textContent = node[1];
  element.value = node[1];
  element.oninput = node[2];
  return element;
}

function findDiff(prevVDOM, currentVDOM) {
  for (let i = 0; i < currentVDOM.length; i++) {
    if (JSON.stringify(prevVDOM[i]) !== JSON.stringify(currentVDOM[i])) {
      const newNode = convert(currentVDOM[i]);
      elems[i].replaceWith(newNode);
      elems[i] = newNode;
    }
  }
}

// setInterval(updateDOM, 15);
// updateDOM();
requestAnimationFrame(updateDOM);
