// ==UserScript==
// @name         git.ir unleashed
// @namespace    https://github.com/n-budzinski
// @version      0.2.1
// @description  Is stealing from thieves a theft?
// @author       Norbert Budziński
// @match        https://en.git.ir/*
// @match        https://git.ir/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=git.ir
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

window.location.hostname==="git.ir"?window.location.hostname="en.git.ir":null

if(typeof play_item_from_url === "undefined"){
    function play_item_from_url(_a, url, _b){
    document.getElementsByTagName('video')[0].player.src = url
    }
}

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

if(document.getElementById('main-video')){
    let video_elements = document.getElementsByClassName('video-playlist-item')
    let link = document.getElementsByTagName('video')[0].player.src.match(/.*\//g)
    let card = document.getElementsByClassName("card-body")[1]
    card.append(htmlToElement(
        `<a class="btn btn-primary btn-link text-light w-100 mb-2" href="` + link + `exercise_files.zip" title="Download" download style="margin-top: 16px"><i class="fa fa-download"></i> Download exercies</a>`
    ))
    card.append(htmlToElement(
        `<a class="btn btn-primary btn-link text-light w-100 mb-2" onclick=show_download_links() title="Download links" download><i class="fa fa-link"></i> Show download links</a>`
    ))
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
        let vloc = link + epno.padStart(3, "0") +"-"+epna+"-git.ir.mp4"
        new_element.addEventListener('click', () => {
            play_item_from_url(undefined,vloc,undefined)
        })
        old_element.parentNode.replaceChild(new_element, old_element);
    }
}

})();
