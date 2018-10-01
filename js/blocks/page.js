import * as message from './message.js';

let pageBlock = document.querySelector('.page'),
    pageMessageElem;

if (pageBlock) {
    pageMessageElem = pageBlock.querySelector('.page__message');
}

function setField(pageMessageText) {
    message.setField(pageMessageElem, pageMessageText);
    pageMessageElem.classList.add('page__message--show');
}

function showMessage(pageMessageText) {
    if (pageMessageElem.classList.contains('page__message--show')) {
        hideMessage();
        setTimeout(() => {
            setField(pageMessageText);
        }, 500);
    } else {
        setField(pageMessageText);
    }
}

function hideMessage() {
    pageMessageElem.classList.remove('page__message--show');
}

export { showMessage, hideMessage, setField };