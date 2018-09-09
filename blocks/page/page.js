import { initButtonMessage, setHeaderMessage, setImgMessage } from '../message/message.js';

let pageBlock = document.querySelector('.page'),
    pageMessageElem;

function showPageMessage(pageMessageText) {
    console.log(pageMessageElem.classList.contains('page__message--show'));
    if (pageMessageElem.classList.contains('page__message--show')) {
        hidePageMessage();
        setInterval(() => {
            setPageMessage(pageMessageText);
        }, 500);
    } else {
        setPageMessage(pageMessageText);
    }
}

function setPageMessage(pageMessageText) {
    setHeaderMessage(pageMessageElem, pageMessageText);
    pageMessageElem.classList.add('page__message--show');
}

function hidePageMessage() {
    pageMessageElem.classList.remove('page__message--show');
}

if (pageBlock) {
    pageMessageElem = pageBlock.querySelector('.page__message');
}

export { showPageMessage, hidePageMessage };