import * as message from './message.js';

let videoSetting = {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        facingMode: 'environment'
    };

let videoStreamElem = document.querySelector('.video__stream'),
    videoMessageElem = document.querySelector('.video__message'),
    videoStreamTracks;

function showVideoStreamTrackFromCamera(funcResolve, funcReject) {
    return navigator.mediaDevices.getUserMedia({ video: videoSetting, audio: false })
        .then(function(stream) {
            videoStreamElem.srcObject = stream;
            videoStreamTracks = stream.getTracks();

            return videoStreamElem;
        })
        .then(() => {return funcResolve(videoStreamElem)})
        .catch(funcReject);
}

function stopVideoStreamTracks() {
    videoStreamTracks.forEach((track) => {
        track.stop();
    });
}

function showMessage(numberEAN5) {
    message.setField(videoMessageElem, 'Your EAN5-code:', numberEAN5);
    
    videoMessageElem.classList.add('video__message--animate-show');
    if (!videoMessageElem.classList.contains('video__message--animate-hide')) {
        videoMessageElem.classList.add('video__message--animate-hide');
    }
}

function hideMessage() {
    videoMessageElem.classList.remove('video__message--animate-show');
}

function setHandlersMessage(execFunction, paramExecFunction) {
    return message.setHandlersButton(videoMessageElem, execFunction, paramExecFunction);
};

export {
    showVideoStreamTrackFromCamera,
    stopVideoStreamTracks,
    showMessage,
    hideMessage,
    setHandlersMessage
};