let bodyWidth = document.documentElement.clientWidth,
    bodyHeight =  document.documentElement.clientHeight,
    bodyBlock = document.querySelector('body'),
    bodyStyleBlock = bodyBlock.querySelector('style');

function setSize() {
    bodyWidth = document.documentElement.clientWidth;
    bodyHeight = document.documentElement.clientHeight;
    bodyStyleBlock.innerHTML = 
        `body {
            --global-window-width: ${bodyWidth}px;
            --global-window-height: ${bodyHeight}px;
        }`;
}

function setHandlers() {
    window.addEventListener('resize', () => {
        setSize();
    });
}

export { setHandlers };
