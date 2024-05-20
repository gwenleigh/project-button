const targetElement = document.querySelector("#target-span");

let testButton = document.createElement("div");
testButton.innerHTML = "Test button";
testButton.style.width = "90%";
testButton.style.height = "90%";
testButton.style.border =  "1px solid #000";
testButton.style.borderRadius = "0.5rem";
testButton.style.backgroundColor = "green";

let networkButton = document.createElement("button");
networkButton.innerText = "Networking";
networkButton.classList = ["button-style"];

targetElement.insertAdjacentElement("beforeend", testButton);
targetElement.insertAdjacentElement("beforeend", networkButton);