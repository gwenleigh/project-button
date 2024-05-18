chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
        // Retrieve the action badge to check the extension state ('ON' or 'OFF')
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Switch the next state value to the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if (nextState === "ON") {
            // Insert the css file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id },
            });
        } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id }
            });
        }
    }
});