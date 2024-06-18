// BUTTONS
// Variables 
const rootURL = "https://github.com/gwenleigh/til/tree/main/";
const iconDirectory = `<i class="fa-solid fa-folder"></i>`
const iconFile = `<i class="fa-light fa-file"></i>`

// Retrieve data from Github repository directory structure 
async function fetchElements(url) {
    const entriesArray = [];

    try {
        // url cleaning
        const processedUrl = url.replace(", (Directory)", "");

        // Fetch the HTML content from the URL
        const response = await fetch(processedUrl);
        const text = await response.text();

        // Create a new DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // Select specific elements (for example, all paragraphs)
        const directoryDivs = doc.getElementsByClassName('react-directory-truncate')

        for (let i=0; i < directoryDivs.length; i++) {
            const anchor = directoryDivs[i].querySelector('a');
            const ariaLabel = anchor.getAttribute('aria-label');
            
            if (!ariaLabel.includes('assets')) {
                entriesArray.push(ariaLabel);
            }
        }

    } catch (error) {
        console.error('Error fetching elements:', error);
    }

    const uniqueEntriesArray = [...new Set(entriesArray)];
    return uniqueEntriesArray;
}

// Actions
function toggleAllButtonsByParent(buttonID) {
    const buttonsToToggle = document.querySelectorAll(`.${buttonID}-child-button`);
    buttonsToToggle.forEach(element => {
        element.classList.toggle("hidden");
        element.classList.toggle('unset');
    })
}

function toggleAllButtonsbyChild(buttonClass) {
    const buttonsToToggle = document.querySelectorAll(`.${buttonClass}-child-button`);
    buttonsToToggle.forEach(element => {
        element.classList.toggle('unset');
        element.classList.toggle("hidden");
    })
}

// Regex - edit filename to plain human-friendly readable title
function editFilename(string, capitalise=false) {
    const hyphen = "-";
    let str1 = string.replace(".md", '');
    let parsedString = str1.replace (new RegExp('-', 'g'), ' ');

    if (capitalise === true) {
        parsedString = parsedString.charAt(0).toUpperCase() + parsedString.slice(1);
    }
    return parsedString
}


function getRootDirectories() {
    
    fetch(rootURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
    })
}

// Fetch text in <article>
// Fetch filenames from directories from the main branch page. 
function fetchTextInArticle(directory, filename) {
    let destURL = rootURL + directory + "/" + filename;    
    var textContent = "";

    fetch(destURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.text();
      })
      .then(html => {
        let articleElement = document.querySelector('article');
        textContent = articleElement.textContent;
        console.log(`textContent: ${textContent}`)
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
      return textContent;
}

function createTILChildButtons(buttonClass, buttonsArray) {
    let buttonsList = []
    // buttonsArray is coming in empty. 

    for (var i = 0; i < buttonsArray.length; i++) {        
        let childButton  = document.createElement("button");
        childButton.id = `button-${buttonsArray[i]}`
        childButton.title = fetchTextInArticle(buttonClass, buttonsArray[i])
        childButton.innerText = editFilename(buttonsArray[i], true);
        childButton.classList = [ `${buttonClass.toLowerCase()}-child-button child-button hidden` ];
        childButton.onclick = function(){
            toggleAllButtonsbyChild(buttonClass);
            window.open(rootURL + buttonClass + "/" + buttonsArray[i], '_blank');
        };       
        buttonsList.push(childButton);
    }
    return buttonsList;
}

function createParentButton(buttonID) {
    let capIP = buttonID.charAt(0).toUpperCase() + buttonID.slice(1);

    let parentButton = document.createElement("button");
    parentButton.id = `label-button-${buttonID}`
    parentButton.innerHTML = `${iconDirectory} ${capIP}`;
    parentButton.classList = ["label-button"];
    parentButton.onclick = function(){toggleAllButtonsByParent(buttonID)};

    return parentButton;
}

function createTILButtonSet(buttonSetID, childButtonsArray) {
    let parentDiv = document.createElement("div");
    parentDiv.id = `parent-div-${buttonSetID}`;
    parentDiv.classList = [ "buttons-div" ];

    // 🪲🪲🪲 childButtonsArray is not empty BUT 
    let parentButton = createParentButton(buttonSetID);
    let childButtonsList = createTILChildButtons(buttonSetID, childButtonsArray); // 🪲🪲🪲 It gets empty here 
    // childButtonsList comes out empty for some reason. 

    parentDiv.append(parentButton);
    childButtonsList.forEach(element => {
        parentDiv.append(element)    
    });

    return parentDiv;
}
