'use strict';

{
    function replaceNotePadNotation(string) {
        var code = { "1": "\u2199", "2": "\u2193", "3": "\u2198", "4": "\u2190", "5": " ", "6": "\u2192", "7": "\u2196", "8": "\u2191", "9": "\u2197" };
        return Array.from(string, c => code[c] || c).join('');
    }

    //add meta tag to allow unicode. 
    var meta = document.createElement('meta');
    document.getElementsByTagName('head')[0].appendChild(meta);

    var allDivs = document.getElementsByTagName('*');

    var allowedCharacterRegex = "";
    chrome.storage.sync.get(['notationCharacters'], function (result) {
        var allowedCharacters = result.notationCharacters;

        allowedCharacterRegex += "(";
        for (var acIndex = 0; acIndex < allowedCharacters.length; acIndex++) {
            allowedCharacterRegex += allowedCharacters[acIndex].toLowerCase() + "|" + allowedCharacters[acIndex].toUpperCase() + "|"
        }
        allowedCharacterRegex = allowedCharacterRegex.substring(0, allowedCharacterRegex.length - 1); //remove last |
        allowedCharacterRegex += ")";

        for (var divIndex = 0; divIndex < allDivs.length; divIndex++) {
            if (allDivs[divIndex].childNodes === undefined)
                break;

            var currentDiv = allDivs[divIndex];

            for (var childIndex = 0; childIndex < currentDiv.childNodes.length; childIndex++) {
                var currentNode = currentDiv.childNodes[childIndex];

                if (currentNode.nodeType == 3) {
                    var notepadRegex = new RegExp("\\d+" + allowedCharacterRegex);
                    var notepadNotation = currentNode.nodeValue.match(notepadRegex);
                    if (notepadNotation != null)
                        for (var npnIndex = 0; npnIndex < notepadNotation.length; npnIndex++) {
                            currentNode.nodeValue = currentNode.nodeValue.replace(notepadNotation[npnIndex], replaceNotePadNotation(notepadNotation[npnIndex]).trim());
                        }
                }
            }
        }
    });
}
