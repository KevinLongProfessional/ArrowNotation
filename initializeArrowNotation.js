chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {

        var allowedCharacters = "L,M,H,S,LP,MP,HP,LK,MK,HK".split(",");
        chrome.storage.sync.set({ notationCharacters: allowedCharacters}, function () {

        });
    }
});