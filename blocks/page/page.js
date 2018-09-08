let pageElem = document.querySelector('.page'),
    stylePageElem = document.createElement('style');

stylePageElem.setAttribute('type', 'text/css');

function setWindowSize() {
    let globalWindowHeight = document.documentElement.clientHeight,
        globalWindowWidth = document.documentElement.clientWidth;

    stylePageElem.innerHTML = 
        `body {
            --global-window-width: ${globalWindowWidth}px;
            --global-window-height: ${globalWindowHeight}px;
        }`;
    pageElem.appendChild(stylePageElem);
}

window.addEventListener('resize', setWindowSize);

setWindowSize();

// Disable touchstart scroll in chrome android
window.addEventListener("touchstart", () => {}, {passive: false} );
window.addEventListener("touchmove", (event) => {
    event.preventDefault();
}, {passive: false} );