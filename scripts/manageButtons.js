// Target area
const targetArea = document.querySelector("#column1");
targetArea.classList = ["target-area"];

// Create buttons
let networkButtonsArray = ["bandwidth", "connections", "packets"];
let networkDiv = createDropDownButtonSet("network", networkButtonsArray);
targetArea.insertAdjacentElement("beforeend", networkDiv);

let hardwareButtonsArray = ["Disk", "RAM", "CPU"];
let hardwarekDiv = createDropDownButtonSet("hardware", hardwareButtonsArray);
targetArea.insertAdjacentElement("beforeend", hardwarekDiv);

let protocolButtonsArray = ["protocol", "application protocol"]

// Input area
let textArea = document.createElement("textarea");
textArea.classList = ["input-area"];
targetArea.insertAdjacentElement("beforeend", textArea);