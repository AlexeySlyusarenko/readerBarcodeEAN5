import * as barcodeEngine from '../logic/barcode_engine.js';

export default function drawBarcodeEAN5(barcodeBlock, numberEAN5) {
    let barcodeAreaElem = barcodeBlock.querySelector('.barcode__area'),
        barcodeTextElem = barcodeBlock.querySelector('.barcode__text'),       
        barcodeAreaElemStyle = '',
        widthLineEAN5 = barcodeEngine.getWidthLineEAN5(numberEAN5);

    for(let i = 0; i < widthLineEAN5.length; i++) {
        barcodeAreaElemStyle = barcodeAreaElemStyle + widthLineEAN5[i] + 'fr ';
    }

    barcodeBlock.classList.add('barcode');

    if (barcodeAreaElem == undefined) {
        barcodeAreaElem = document.createElement('ul');
        barcodeAreaElem.classList.add('barcode__area');

        barcodeBlock.appendChild(barcodeAreaElem);
        for(let i = 0; i < 33; i++) {
            let barcodeLineElem = document.createElement('li');
            barcodeLineElem.classList.add('barcode__line');
            barcodeAreaElem.appendChild(barcodeLineElem);
        }
    }
    barcodeAreaElem.style.gridTemplateColumns = barcodeAreaElemStyle;

    if (barcodeTextElem == undefined) {
        barcodeTextElem = barcodeTextElem = document.createElement('div');
        barcodeTextElem.classList.add('barcode__text');
        barcodeTextElem.classList.add('text--gostb');

        barcodeBlock.appendChild(barcodeTextElem);
    }
    barcodeTextElem.textContent = numberEAN5;
    
    return true;
}