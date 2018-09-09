import getBarcodeEAN5FromImage from './bar_code.js';
import {
    showVideoStreamTrackFromCamera,
    stopVideoStreamTracks,
    showVideoMessage,
    hideVideoMessage,
    addHandlersMessageVideo
} from '../blocks/video/video.js';
import { showPageMessage, hidePageMessage } from '../blocks/page/page.js';

let idRunScanBarcodeEAN5FromImage;

function runScanBarcodeEAN5FromImage (imgElem) {
    setTimeout(hideVideoMessage, 500);
    setTimeout(hidePageMessage, 2000);
    
    idRunScanBarcodeEAN5FromImage = setInterval(() => {
        let barcodeEAN5Obj = getBarcodeEAN5FromImage(imgElem);

        if (barcodeEAN5Obj.number) {
            showVideoMessage(barcodeEAN5Obj);
            clearInterval(idRunScanBarcodeEAN5FromImage);
            setTimeout(stopVideoStreamTracks, 500);
        }
    }, 200);
}

function showErrorMessagePage() {
    showPageMessage('Your browser does not access a camera.');
}

function runShowVideoStreamTrackFromCamera() {

    showVideoStreamTrackFromCamera(
        runScanBarcodeEAN5FromImage,
        showErrorMessagePage,
    );
}

addHandlersMessageVideo(runShowVideoStreamTrackFromCamera);

runShowVideoStreamTrackFromCamera();