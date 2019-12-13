chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        chrome.tabs.create({url: "update.html"});
    }
});
