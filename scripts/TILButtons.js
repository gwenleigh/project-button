const gitButtonArea  = document.createElement("div");
const borderGrid = document.getElementsByClassName("BorderGrid")[0];
gitButtonArea.id = "git-button-area";
gitButtonArea.classList = [ "BorderGrid-cell" ];

// array of <div><a> elements
const repoFolders = document.getElementsByClassName("react-directory-truncate");
let repoFoldersArray = [];

// Loop through each div element in the collection
for (let i = 0; i < repoFolders.length; i++) {
    // Find the a element within the current div element
    const anchor = repoFolders[i].querySelector('a');

    // Check if the <a> element exists and has the aria-label attribute
    if (anchor && anchor.hasAttribute('aria-label')) {
        // Get the value of the aria-label attribute
        const ariaLabel = anchor.getAttribute('aria-label');

        if (ariaLabel.includes("(Directory)")) {
            const title = anchor.title;
            repoFoldersArray.push(title)
        }

    } else { console.error('No <a> element with aria-label found in div:', repoFolders[i]); }
}

// Remove duplicate Directory names
const repoFolderNames = [...new Set(repoFoldersArray)];

const tilButtonArea = document.createElement('h2');
const tilButtonAreaName = document.createElement('a');
tilButtonArea.classList = [ "h4 mb-3" ];
tilButtonAreaName.innerHTML = "TIL Book Shortcuts"
tilButtonAreaName.classList = [ "h4 mb-3" ];
tilButtonArea.append(tilButtonAreaName);
gitButtonArea.append(tilButtonArea);

for (let i = 0; i < repoFolderNames.length; i++) {
    let currentDirectory = repoFolderNames[i];
    let directoryURL = rootURL + currentDirectory;

    fetch(directoryURL)
    .then(response => {
        if(!response.ok) {
            throw new Error('Network response was not OK: ' + response.statusText);
        }
        return response.text();
    })
    .then(html => {
        // Parse the HTML content
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');

        // Get the elements by class name
        let divElements = doc.getElementsByClassName('react-directory-truncate');
        let filenames = [];

        for (let i = 0; i < divElements.length; i++) {
            const anchor = divElements[i].querySelector('a');
            
            if (anchor && anchor.getAttribute("aria-label").includes('(File)'))
            var anchorTitle = anchor.title;
            filenames.push(anchor.title);
        }

        const filenamesArray = [...new Set(filenames)];
        let currentButton = createTILButtonSet(currentDirectory, filenamesArray);

        gitButtonArea.append(currentButton);
        borderGrid.insertAdjacentElement("beforeend", gitButtonArea);
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}