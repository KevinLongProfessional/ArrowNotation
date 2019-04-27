// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

//chrome.tabs.onUpdated.addListener(function ()
{

    function replaceNotePadNotation(string) {
        var code = { "1": "\u2199", "2": "\u2193", "3": "\u2198", "4": "\u2190", "5": " ", "6": "\u2192", "7": "\u2196", "8": "\u2191", "9": "\u2197" };
        return Array.from(string, c => code[c] || c).join('');
    }

    //add meta tag to allow unicode. 
    var meta = document.createElement('meta');
    document.getElementsByTagName('head')[0].appendChild(meta);

    var allDivs = document.getElementsByTagName('*');
    for (var divIndex = 0; divIndex < allDivs.length; divIndex++) {
        if (allDivs[divIndex].childNodes === undefined)
            break;

        var currentDiv = allDivs[divIndex];

        for (var childIndex = 0; childIndex < currentDiv.childNodes.length; childIndex++) {
            var currentNode = currentDiv.childNodes[childIndex];

            if (currentNode.nodeType == 3) {
                var notepadRegex = new RegExp(/\d\d*[a-zA-Z]/);
                var notepadNotation = currentNode.nodeValue.match(notepadRegex);
                if (notepadNotation != null)
                    for (var i = 0; i < notepadNotation.length; i++) { //to do: replace i
                        currentNode.nodeValue = currentNode.nodeValue.replace(notepadNotation[i], replaceNotePadNotation(notepadNotation[i]).trim());
                    }
            }
        }
    }
}
