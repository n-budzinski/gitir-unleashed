// ==UserScript==
// @name         git.ir unleashed
// @namespace    https://github.com/n-budzinski
// @version      0.1
// @description  Is stealing from thieves a theft?
// @author       Norbert Budziński
// @match        https://en.git.ir/*
// @match        https://git.ir/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=git.ir
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
let media_elem = document.getElementsByTagName('video')
if(media_elem){
    let video_elements = document.getElementsByClassName('video-playlist-item')
    let link = document.getElementsByTagName('video')[0]
    for(let element of video_elements){
        let old_element = element
        let new_element = old_element.cloneNode(true);
        let epno = element
                    .firstChild
                    .firstChild
                    .textContent
        let epna = element
                .firstChild
                .lastChild
                .lastChild
                .textContent.match(/[a-zA-Z0-9]+/g).join(" ")
        let vloc = link.player.src.match(/.*\//g) + epno.padStart(3, "0") +"-"+epna+"-git.ir.mp4"
        new_element.addEventListener('click', () => {
            document.getElementsByTagName('video')[0].player.src = vloc
        })
        old_element.parentNode.replaceChild(new_element, old_element);
    }
}

})();
