
## Facts
### 0.0.2
- Content scsripts: scripts that read and modify the content of a page. They make changes to their JavaScript environment without conflicting with their host page or other extensions' content scripts.
- "matches": `manifest.json/"matches"` field can have one or more match patterns. These allow the browser to identify which sites to inject the content scripts into. 

### 0.0.3
- [`service worker`](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers): Extensions can **monitor browser events** in the background using the extension's service worker. Service workers are special JavaScript environments that handle events and terminate when they're not needed.
  - Extension service workers are an extension's central event handler. 
  - Extension service workers and web service workers are two different things.
  - Like its web counterpart, an extension service worker ❌ cannot access the DOM, though you can use it if needed with offscreen documents.
  - Synonyms: `background scripts`, `extension service worker`
  - NOT synonyms: `web service worker`
- `runtime.onInstalled()`: The first event our service worker will listen for is runtime.onInstalled(). This method allows the extension to set an initial state or complete some tasks on installation. Extensions can use the Storage API and IndexedDB to store the application state.
- `_execute_action` key runs the same code as the action.onClicked() event, so no additional code is needed.
- Injecting scripts
  - `scripting.executeScript()`
  - `scripting.insertCSS()`
  - `scripting.removeCSS()`
- Badge: Browser actions can optionally display a badge—a bit of text that is layered over the icon. Badges make it easy to update the browser action to display a small amount of information about the state of the extension.
  - `BadgebrowserAction.setBadgeText`
  - `browserAction.setBadgeBackgroundColor`

## Commands used

#### 0.0.1
Install `code` command to VS Code
`shift + command + p` > `Shell Command: Install 'code' command in PATH`

#### 0.0.3
Invoke emojis
`control + command + space`

## Set up extension
### 0.0.1
1) Create `manifest.json`
https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world 

2) Structure your extension project
https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#structure 

## Resources
### 0.0.1 
`git tag` https://minsone.github.io/git/git-addtion-and-modified-delete-tag

### 0.0.2
- tutorial https://developer.chrome.com/docs/extensions/get-started/tutorial/scripts-on-every-tab

### 0.0.3
- Extension service worker https://developer.chrome.com/docs/extensions/develop/concepts/service-workers
- Scripting API `chrome.scripting` https://developer.chrome.com/docs/extensions/reference/api/scripting
- Badge https://developer.chrome.com/docs/extensions/mv2/reference/browserAction#badge

## Assets used
### 0.0.1
- Stop button icon
https://commons.wikimedia.org/wiki/File:Perspective-Button-Stop-icon.png 

### 0.0.2
- Stop button icons https://github.com/GoogleChrome/chrome-extensions-samples/tree/main/functional-samples/tutorial.reading-time/images

## For later
### 0.0.2 
- Turn string into code `<code translate="no" dir="ltr">TEXT HERE</code>`

### 0.0.3
- The [developer's guide](https://developer.chrome.com/docs/extensions/develop) has dozens of additional links to pieces of documentation relevant to advanced extension creation.
- Extensions have access to powerful APIs beyond what's available on the open web. The [Chrome APIs documentation](https://developer.chrome.com/docs/extensions/reference/api) walks through each API.
- `scripting.executeScript()` https://developer.chrome.com/docs/extensions/reference/api/scripting#injected-code
- The `"activeTab"` permission https://developer.chrome.com/docs/extensions/develop/concepts/activeTab#what-activeTab-allows