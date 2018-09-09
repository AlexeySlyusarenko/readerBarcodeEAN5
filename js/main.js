import getBarcodeEAN5FromImage from './bar_code.js';

import { showVideoStreamTrackFromCamera, stopVideoStreamTracks } from '../blocks/video/video.js';

import { showPageMessage, hidePageMessage } from '../blocks/page/page.js';
// import { initButtonMessage, setHeaderMessage, setImgMessage } from '../blocks/message/message.js';
// import addHandlersButton from '../blocks/button/button.js';

import drawBarcodeEAN5 from '../blocks/barcode/barcode.js';

let idRunScanBarcodeEAN5FromImage;

function runScanBarcodeEAN5FromImage (imgElem) {
    setInterval(hidePageMessage, 2000);

    idRunScanBarcodeEAN5FromImage = setInterval(() => {
        getBarcodeEAN5FromImage(imgElem);
        clearInterval(idRunScanBarcodeEAN5FromImage);
    }, 200);
}

function showErrorMessagePage() {
    showPageMessage('Your browser does not access a camera.');
}

showVideoStreamTrackFromCamera(
    runScanBarcodeEAN5FromImage,
    showErrorMessagePage
);