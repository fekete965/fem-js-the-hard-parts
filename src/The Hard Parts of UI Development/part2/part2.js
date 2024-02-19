let post = undefined;

const jsInput = document.querySelector("input");
if (!jsInput) {
  throw new Error("input is missing");
}

const jsDiv = document.querySelector("div");
if (!jsDiv) {
  throw new Error("div is missing");
}

// Extension Challenge
const jsButton = document.querySelector("button");
if (!jsButton) {
  throw new Error("button is missing");
}

// jsInput.value = "What's on your mind?";

function dataToView() {
  jsInput.value = post != null ? post : "What's on your mind?";
  jsDiv.textContent = post;
}

function handleClick() {
  post = "";
}

function handleInput() {
  post = jsInput.value;
  // dataToView();
}

jsInput.onclick = handleClick;
jsInput.oninput = handleInput;

function handleSubmit() {
  const newJsDiv = document.createElement("div");

  newJsDiv.innerText = post;
  post = "";

  document.body.appendChild(newJsDiv);
}

jsButton.onclick = handleSubmit;

// dataToView();

setInterval(dataToView, 15);
