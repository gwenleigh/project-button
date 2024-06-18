// Place button on Repo webpage
const gitButtonArea  = document.createElement("div");
const borderGrid = document.getElementsByClassName("BorderGrid")[0];
gitButtonArea.id = "git-button-area";
gitButtonArea.classList = [ "BorderGrid-cell" ];

const tilButtonArea = document.createElement('h2');
const tilButtonAreaName = document.createElement('a');
tilButtonArea.classList = [ "h4 mb-3" ];
tilButtonAreaName.innerHTML = "TIL Book Shortcuts"
tilButtonAreaName.classList = [ "h4 mb-3" ];
tilButtonArea.append(tilButtonAreaName);
gitButtonArea.append(tilButtonArea);


// Get directory names at the rootURL
const repoFolders = document.getElementsByClassName("react-directory-truncate");
let repoFoldersArray = []; // folder names at the Root URL
let rootAriaLabelsArray = [] 

for (let i = 0; i < repoFolders.length; i++) {
    // Find the a element within the current div element
    const anchor = repoFolders[i].querySelector('a');

    if (anchor && anchor.hasAttribute('aria-label')) {
        let ariaLabel = anchor.getAttribute('aria-label');
        if (!ariaLabel.includes("assets") && !ariaLabel.includes("(File)")) {
            // ariaLabel = ariaLabel.replace(", (Directory)", "")
            rootAriaLabelsArray.push(ariaLabel)
        }
    } else { console.error('No <a> element with aria-label found in div:', repoFolders[i]); }
}
const repoFolderNames = [...new Set(repoFoldersArray)];
const rootAriaLabelNames = [...new Set(rootAriaLabelsArray)];


// GET DIRECTORY NAMES AT LEVEL 1
let level1Array = []
for (let i = 0; i < rootAriaLabelNames.length; i++) {

    let currentDirectory = rootAriaLabelNames[i]
    let directoryURL = rootURL + currentDirectory;
    const fetchedElements = fetchElements(directoryURL)         // Elements are fetched correctly here
    level1Array.push(fetchedElements)                       // 🔴 However, something seems to happen here. 
}

const resolvedLevel1Names = Promise.all(level1Array);
console.log(resolvedLevel1Names)


// rootAriaLabelNames (root folder array)
// level1Array
for (let i = 0; i < rootAriaLabelNames.length; i++) {

    let currentDirectory = rootAriaLabelNames[i].replace(", (Directory)", "");
    let currentButton = createTILButtonSet(currentDirectory, resolvedLevel1Names[i])  // 🔴 The data gets empty inside this function. 

    gitButtonArea.append(currentButton);
    borderGrid.insertAdjacentElement("beforeend", gitButtonArea);
}
