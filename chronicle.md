
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

### 0.0.4
- Extensions register their service worker in the manifest, which only takes a single JavaScript file. There's no need to call navigator.serviceWorker.register(), like you would in a web page.
- There are two methods of importing scripts into a service worker: the `import` statement and the `importScripts()` method. Note that import(), often called a dynamic import, is not supported.
- When the service worker has terminated, you will see `"service worker (inactive)"` in the `chrome://extensions` page. Click the "service worker (inactive)" link to inspect it.
- `"permissions": ["storage"]`: Chrome will shut down service workers if they are not needed. We use the `chrome.storage` API to persist state across service worker sessions. For storage access, request permission in the manifest.
- Service workers don't have direct access to the window object and therefore cannot use `window.localStorage` to store values. Also, service workers are short-lived execution environments; they get terminated repeatedly throughout a user's browser session, which makes them incompatible with global variables. Instead, use `chrome.storage.local` which stores data on the local machine.
- All event listeners need to be statically registered in the global scope of the service worker. 
-  In other words, event listeners shouldn't be nested in async functions. This way Chrome can ensure that all event handlers are restored in case of a service worker reboot.
- `chrome.omnibox`: The omnibox API allows you to register a keyword with Google Chrome's address bar, which is also known as the omnibox. When the user enters your extension's keyword, the user starts interacting solely with your extension. Each keystroke is sent to your extension, and you can provide suggestions in response. The suggestions can be richly formatted in a variety of ways. When the user accepts a suggestion, your extension is notified and can take action.
  -  `onInputChanged()` event: takes the current user input.
  - `suggestResult` object: is responsible for populating these suggestions.
  - `onInputEntered()`: After the user selects a suggestion, `onInputEntered()` will open the corresponding Chrome API reference page.
  - `updateHistory()`: takes the omnibox input and saves it to `storage.local`. This way the most recent search term can be used later as an omnibox suggestion.
  - `setTimeout()` or `setInterval()` methods are commonly used to perform delayed or periodic tasks. However, these APIs can fail because the scheduler will cancel the timers when the service worker is terminated. Instead, extensions can use the `chrome.alarms API`.
- `"host permission"`: use this to fetch data from a remote hosted location. 

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

### 0.0.4
- Service worker tutorial https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events
- Import scripts into service workers https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/basics#import-scripts
- Debugging the service worker https://developer.chrome.com/docs/extensions/get-started/tutorial/service-worker-events#step-3

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

### 0.0.4
- Debugging extensions https://developer.chrome.com/docs/extensions/get-started/tutorial/debug#debug_bg
- The extension service worker lifecycle https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle#persist-data
- Persist data rather than using global variables https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle#persist-data
- `chrome.omnibox` API https://developer.chrome.com/docs/extensions/reference/api/omnibox
  - `onInputChanged()` event https://developer.chrome.com/docs/extensions/reference/api/omnibox#event-onInputChanged
  - `SuggestResult` object https://developer.chrome.com/docs/extensions/reference/api/omnibox#type-SuggestResult
- ⭐️ Message passing https://developer.chrome.com/docs/extensions/develop/concepts/messaging
- Popover API https://developer.mozilla.org/en-US/docs/Web/API/Popover_API