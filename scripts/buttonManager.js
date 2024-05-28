const targetElement = document.querySelector("#target-span");

function createChildButtons(buttonsArray) {
    let buttonsList = []
    for (let i in buttonsArray) {
        let childButton  = document.createElement("button");
        childButton.id = `button-${buttonsArray[i]}`
        childButton.innerText = buttonsArray[i];
        childButton.classList = [ "button-style hidden" ];

        buttonsList.push(childButton);
    }
    return buttonsList;
}

function createParentButton(buttonID) {
    let capIP = buttonID.charAt(0).toUpperCase() + buttonID.slice(1);

    let parentButton = document.createElement("button");
    parentButton.id = `label-button-${buttonID}`
    parentButton.innerText = capIP;
    console.log(capIP);
    parentButton.classList = ["label-button-style"];

    return parentButton;
}

function createDropDownButtonSet(buttonSetID, childButtonsArray) {
    let parentDiv = document.createElement("div");
    parentDiv.id = `parent-div-${buttonSetID}`;
    parentDiv.classList = [ "buttons-div" ];

    let parentButton = createParentButton(buttonSetID);
    parentDiv.append(parentButton);

    let childButtonsList = createChildButtons(childButtonsArray);

    childButtonsList.forEach(element => {
        parentDiv.append(element)    
    });

    return parentDiv;
}