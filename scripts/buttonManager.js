// BUTTONS
// Actions
function toggleAllButtonsByParent(buttonID) {
    const buttonsToToggle = document.querySelectorAll(`.${buttonID}-child-button`);
    console.log(buttonID)
    buttonsToToggle.forEach(element => {
        element.classList.toggle("hidden");
        element.classList.toggle('unset');
    })
}

function toggleAllButtonsbyChild(buttonClass) {
    const buttonsToToggle = document.querySelectorAll(`.${buttonClass}-child-button`);
    console.log(buttonClass)
    buttonsToToggle.forEach(element => {
        element.classList.toggle('unset');
        element.classList.toggle("hidden");
    })
}

// Initialise
function createChildButtons(buttonClass, buttonsArray) {
    let buttonsList = []
    for (let i in buttonsArray) {
        let childButton  = document.createElement("button");
        childButton.id = `button-${buttonsArray[i]}`
        childButton.innerText = buttonsArray[i];
        childButton.classList = [ `${buttonClass.toLowerCase()}-child-button child-button hidden` ];
        childButton.onclick = function(){toggleAllButtonsbyChild(buttonClass)};
        childButton.title = "";

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
    parentButton.classList = ["label-button"];
    parentButton.onclick = function(){toggleAllButtonsByParent(buttonID)};

    return parentButton;
}

function createDropDownButtonSet(buttonSetID, childButtonsArray) {
    let parentDiv = document.createElement("div");
    parentDiv.id = `parent-div-${buttonSetID}`;
    parentDiv.classList = [ "buttons-div" ];

    let parentButton = createParentButton(buttonSetID);
    let childButtonsList = createChildButtons(buttonSetID, childButtonsArray);

    parentDiv.append(parentButton);
    childButtonsList.forEach(element => {
        parentDiv.append(element)    
    });

    return parentDiv;
}