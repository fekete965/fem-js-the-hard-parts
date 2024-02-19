/** Write your code below */
console.log(document);
console.log("\n");

// const post = "Bence";
let post = "";

const jsInput = document.querySelector("input");
if (!jsInput) {
  throw new Error("input is missing");
}

const jsDiv = document.querySelector("div");
if (!jsDiv) {
  throw new Error("div is missing");
}

jsDiv.textContent = post;

function handleInput() {
  post = jsInput.value;
  jsDiv.textContent = post;
}

jsInput.oninput = handleInput;
