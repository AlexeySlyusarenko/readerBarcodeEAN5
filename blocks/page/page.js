import { setHeaderMessage } from '../message/message.js';

let pageBlock = document.querySelector('.page'),
    pageMessageElem;

function showPageMessage(pageMessageText) {
    if (pageMessageElem.classList.contains('page__message--show')) {
        hidePageMessage();
        setTimeout(() => {
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