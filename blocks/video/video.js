let videoSetting = {},
    aspectRatio;

// videoSetting = {width: { min: 1024, ideal: 1280},
//                 height: { min: 700, ideal: 720}};

// aspectRatio = document.documentElement.clientWidth > document.documentElement.clientHeight ?
//                 document.documentElement.clientWidth / document.documentElement.clientHeight:
//                 document.documentElement.clientHeight / document.documentElement.clientWidth;

videoSetting = {facingMode: 'environment', 
                // aspectRatio: aspectRatio
            };

let videoStreamElem = document.querySelector('.video__stream'),
    videoStreamTracks;

function showVideoStreamTrackFromCamera(errorMessage) {
    navigator.mediaDevices.getUserMedia({ video: videoSetting, audio: false })
        .then(function(stream) {
            videoStreamElem.srcObject = stream;
            videoStreamTracks = stream.getTracks();
        })
        .catch(function(error) {
            console.log(error);
            // errorMessage(error);
        });
}

function stopVideoStreamTracks() {
    videoStreamTracks.forEach((track) => {
        track.stop();
    });
}

export {showVideoStreamTrackFromCamera, stopVideoStreamTracks};