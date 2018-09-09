import addHandlersButton from '../button/button.js';

function initButtonMessage(messageBlock, addHandlersButton) {
    let buttonMessageElem = messageBlock.querySelector('.message__button');

    if (buttonMessageElem) {
        addHandlersButton();
    }
}

function setHeaderMessage(messageBlock, headerText) {
    let headerMessageElem = messageBlock.querySelector('.message__header');
   
    if (headerMessageElem) {
        headerMessageElem.textContent = headerText;
    }
}

function setImgMessage(messageBlock, imgBlock) {
    let imgMessageElem = messageBlock.querySelector('.message__img');
   
    if (imgMessageElem) {
        imgMessageElem.innerHTML = imgBlock;
    }
}

export { initButtonMessage, setHeaderMessage, setImgMessage };