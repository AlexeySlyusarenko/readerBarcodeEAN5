export default function drawBarcodeEAN5(barcodeBlock, widthLineArr, numberBarcodeEAN5Text) {
    let barcodeAreaElem = document.createElement('ul'),
        barcodeTextElem = document.createElement('div'),       
        barcodeAreaElemStyle = '1fr 1fr 1fr 2fr ';
        
    barcodeBlock.classList.add('barcode');
    barcodeAreaElem.classList.add('barcode__area');
    barcodeTextElem.classList.add('barcode__text');
    barcodeTextElem.classList.add('text--gostb');

    for(let i = 0; i <widthLineArr.length; i++) {
        if (i > 0 && i % 4 === 0) barcodeAreaElemStyle = barcodeAreaElemStyle + '1fr 1fr ';
        barcodeAreaElemStyle = barcodeAreaElemStyle + widthLineArr[i] + 'fr ';
    }

    barcodeAreaElem.style.gridTemplateColumns = barcodeAreaElemStyle;
    barcodeTextElem.textContent = numberBarcodeEAN5Text;
    
    barcodeBlock.appendChild(barcodeAreaElem);
    for(let i = 0; i < 33; i++) {
        let barcodeLineElem = document.createElement('li');
        barcodeLineElem.classList.add('barcode__line');
        barcodeAreaElem.appendChild(barcodeLineElem);
    }
    barcodeBlock.appendChild(barcodeTextElem);

    return true;
}