// Create buttons
let networkButtonsArray = ["bandwidth", "connections", "packets"];
let networkDiv = createDropDownButtonSet("network", networkButtonsArray);
targetElement.insertAdjacentElement("beforeend", networkDiv);

let hardwareButtonsArray = ["Disk", "RAM", "CPU"];
let hardwarekDiv = createDropDownButtonSet("hardware", hardwareButtonsArray);
targetElement.insertAdjacentElement("beforeend", hardwarekDiv);
