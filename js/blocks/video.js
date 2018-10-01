import * as message from './message.js';

let videoSetting = {},
    aspectRatio;

let videoStreamElem = document.querySelector('.video__stream'),
    videoMessageElem = document.querySelector('.video__message'),
    videoStreamTracks,
    widthVideoStreamElem = parseInt(getComputedStyle(videoStreamElem).width),
    heightVideoStreamElem = parseInt(getComputedStyle(videoStreamElem).height);

aspectRatio = widthVideoStreamElem > heightVideoStreamElem ?
            widthVideoStreamElem / heightVideoStreamElem:
            heightVideoStreamElem / widthVideoStreamElem;
console.log(aspectRatio);
videoSetting = {
        width: { min: 640, ideal: 1280, max: 1920 },
        facingMode: 'environment',
        aspectRatio: 1 //aspectRatio
};

function showVideoStreamTrackFromCamera(funcResolve, funcReject) {
    return navigator.mediaDevices.getUserMedia({ video: videoSetting, audio: false })
        .then(function(stream) {
            videoStreamElem.srcObject = stream;
            videoStreamTracks = stream.getTracks();

            console.log(videoStreamTracks[0].getConstraints());

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
    message.setField(videoMessageElem, 'Your EAN5-code', numberEAN5);
    
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