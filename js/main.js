import getBarcodeEAN5FromImage from './bar_code.js';
import showBarcodeEAN5 from '../blocks/barcode/barcode.js';

let videoSetting = {};


// videoSetting = {width: { min: 1024, ideal: 1280},
//                 height: { min: 700, ideal: 720}};

videoSetting = {facingMode: 'environment', 
                width: document.documentElement.clientWidth, 
                height: document.documentElement.clientHeight
            };

let videoElem = document.querySelector('.video__stream'),
    messageElem = document.querySelector('.barcode-message'),
    textMessageElem = document.querySelector('.barcode-message__text'),
    buttonMessageElem = document.querySelector('.barcode-message__button'),
    errorElem = document.querySelector('.error-message'),
    infoElem = document.querySelector('.info-message'),
    videoStreamTracks,
    idSetInterval,
    infoMessangeShow = 1;

function showBarcodeMessage(message) {
    textMessageElem.textContent = message;
    messageElem.classList.add('barcode-message--show');
    clearInterval(idSetInterval);
    setTimeout(videoStreamTracksStop, 500);
}

function hideWindowMessage() {
    messageElem.classList.remove('barcode-message--show');
    getPermisionToCamera();
}

function clickButtonMessage() {
    buttonMessageElem.classList.add('barcode-message__button--click');
    setTimeout(() => {
        buttonMessageElem.classList.remove('barcode-message__button--click');
    }, 500);
}

function showErrorMessage() {
    errorElem.classList.add('error-message--show');
}

function hideInfoMessage() {
    infoMessangeShow = 0;
    infoElem.classList.remove('info-message--show');
}

function barcodeEAN5FromImage() {
    let barcodeEAN5 = getBarcodeEAN5FromImage(videoElem);
    if (barcodeEAN5) showBarcodeMessage(barcodeEAN5);
}

function videoStreamTracksStop() {
    videoStreamTracks.forEach((track) => {
        track.stop()});
}

function getPermisionToCamera() {
    navigator.mediaDevices.getUserMedia({ video: videoSetting, audio: false })
        .then(function(stream) {
            // if (infoMessangeShow) hideInfoMessage();
            videoElem.srcObject = stream;
            // videoElem.play()
            //     .then(() => {
            //         console.log('Video play');                })
            //     .catch((error) => {
            //         // An error ocurred or the user agent prevented playback.
            //         console.log('Error: ' + error);
            //     });
            videoStreamTracks = stream.getTracks();
        })
        .catch(function(err) {
            hideInfoMessage();
            showErrorMessage();
        });

    // idSetInterval = setInterval(barcodeEAN5FromImage, 200);
}

// buttonMessageElem.addEventListener('click', () => {
//     clickButtonMessage();
//     hideWindowMessage();
// }, true);
// buttonMessageElem.addEventListener('touch', () => {
//     clickButtonMessage();
//     hideWindowMessage();
// }, true);

getPermisionToCamera();