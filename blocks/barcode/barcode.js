export default function drawBarcodeEAN5(barcodeBlock, widthLineArr, numberBarcodeEAN5Text) {
    let barcodeImgElem = barcodeBlock.querySelector('.barcode__img'),
        barcodeTextElem = barcodeBlock.querySelector('.barcode__text'),
        barcodeImgElemStyle = '1fr 1fr 1fr 2fr ';

    for(let i = 0; i <widthLineArr.length; i++) {
        if (i > 0 && i % 4 === 0) barcodeImgElemStyle = barcodeImgElemStyle + '1fr 1fr ';
        barcodeImgElemStyle = barcodeImgElemStyle + widthLineArr[i] + 'fr ';
    }

    barcodeImgElem.style.gridTemplateColumns = barcodeImgElemStyle;
    barcodeTextElem.textContent = numberBarcodeEAN5Text;

    return true;
}