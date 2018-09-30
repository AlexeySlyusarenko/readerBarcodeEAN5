import * as body from './blocks/body.js';
import * as page from './blocks/page.js';
import * as video from './blocks/video.js';

import drawBarcodeEAN5 from './blocks/barcode.js';

import * as barcodeEngine from './logic/barcode_engine.js';

body.setHandlers();

let idRunScanBarcodeEAN5FromImage,
    idVideoHideMessage;

function runScanBarcodeEAN5FromImage (imgElem) {
    idVideoHideMessage = setTimeout(video.hideMessage, 500);
    setTimeout(page.hideMessage, 2000);
    
    idRunScanBarcodeEAN5FromImage = setInterval(() => {
        let numberEAN5 = barcodeEngine.getNumberEAN5FromImage(imgElem);

        if (numberEAN5) {
            clearTimeout(idVideoHideMessage);
            video.showMessage(numberEAN5);
            clearInterval(idRunScanBarcodeEAN5FromImage);
            setTimeout(video.stopVideoStreamTracks, 500);
        }
    }, 200);
}

function showErrorMessagePage() {
    page.showMessage('Your browser does not access a camera.');
}

function runShowVideoStreamTrackFromCamera() {
    video.showVideoStreamTrackFromCamera(
        runScanBarcodeEAN5FromImage,
        showErrorMessagePage,
    );
}

video.setHandlersMessage(runShowVideoStreamTrackFromCamera);

runShowVideoStreamTrackFromCamera();