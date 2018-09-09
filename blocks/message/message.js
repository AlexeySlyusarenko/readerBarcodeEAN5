import addHandlersButton from '../button/button.js';
import drawBarcodeEAN5 from '../barcode/barcode.js';

function setHeaderMessage(messageBlock, headerText) {
    let headerMessageElem = messageBlock.querySelector('.message__header');
   
    if (headerMessageElem) {
        headerMessageElem.textContent = headerText;
    }
}

function setImgMessage(messageBlock, imgMessageObj) {
    let imgMessageElem = messageBlock.querySelector('.message__img');

    if (imgMessageElem) {
        drawBarcodeEAN5(imgMessageElem, imgMessageObj.widthLineEAN5Arr, imgMessageObj.number);
    }
}

function clearImgMessage(messageBlock) {
    let imgMessageElem = messageBlock.querySelector('.message__img');

    imgMessageElem.innerHTML = '';
}

function addHandlersButtonMessage(messageBlock, executeFunction, paramExecuteFunction) {
    let buttonMessageElem = messageBlock.querySelector('.message__button');
    
    return addHandlersButton(buttonMessageElem, executeFunction, paramExecuteFunction);
}

export { 
    setHeaderMessage,
    setImgMessage,
    clearImgMessage,
    addHandlersButtonMessage
};