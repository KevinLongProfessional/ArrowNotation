'use strict';

let saveButtonDiv = document.getElementById('saveButtonDiv');

var constructOptions = function() {
    let button = document.createElement('button');
    button.innerHTML = "<div>Save</div>";
    chrome.storage.sync.get(['notationCharacters'], function (result) {
        document.getElementById('allowedButtonsTextArea').value = result.notationCharacters || "";
    });
    button.addEventListener('click', function () {
        var allowedButtonsText = document.getElementById('allowedButtonsTextArea').value;

        var parseAllowedCharacterRegex = new RegExp(/[ ,\r\n]*/);
        var matches = allowedButtonsText.match(parseAllowedCharacterRegex);
        for (var i = 0; i < length; i++) {
            allowedButtonsText.replace(matches[i], ',');
        }
        var allowedCharacters = document.getElementById('allowedButtonsTextArea').value.replace(new RegExp(/[ ,\r\n]+/), ",");
        chrome.storage.sync.set({ notationCharacters: allowedCharacters.split(",") }, function () {

        });
    });
    saveButtonDiv.appendChild(button);
}
constructOptions();
