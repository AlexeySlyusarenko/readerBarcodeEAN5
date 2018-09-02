export default function showBarcodeEAN5(barcodeElem, widthLineArr, numberBarcodeEAN5) {
    let barcodeImgElem = barcodeElem.querySelector('.barcode__img'),
        barcodeTextElem = barcodeElem.querySelector('.barcode__text'),
        barcodeImgStyle = '1fr 1fr 1fr 2fr ';

    for(let i = 0; i <widthLineArr.length; i++) {
        if (i > 0 && i % 4 === 0) barcodeImgStyle = barcodeImgStyle + '1fr 1fr ';
        barcodeImgStyle = barcodeImgStyle + widthLineArr[i] + 'fr ';
    }

    barcodeImgElem.style.gridTemplateColumns = barcodeImgStyle;
    barcodeTextElem.textContent = numberBarcodeEAN5;

    return true;
}