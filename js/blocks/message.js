import drawBarcodeEAN5 from './barcode.js';

function setField(messageBlock, textMessage, imgMessage) {
    let headerMessageElem = messageBlock.querySelector('.message__header'),
        imgMessageElem = messageBlock.querySelector('.message__img');
   
    if (headerMessageElem) {
        headerMessageElem.textContent = textMessage;
    }

    if (imgMessageElem) {
        drawBarcodeEAN5(imgMessageElem, imgMessage);
    }
}

function setHandlersButton(messageBlock, execFunction, paramExecFunction) {
    let buttonMessageElem = messageBlock.querySelector('.message__button');

    if (buttonMessageElem) {
        buttonMessageElem.addEventListener('click', () => {
            execFunction(paramExecFunction);
        }, true);
    
        buttonMessageElem.addEventListener('touch', () => {
            execFunction(paramExecFunction);
        }, true);
    }
}

export { setField, setHandlersButton };