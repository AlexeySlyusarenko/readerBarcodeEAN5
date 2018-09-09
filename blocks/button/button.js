export default function addHandlersButton(buttonBlock, executeFunction, paramExecuteFunction) {
    buttonBlock.addEventListener('click', () => {
        executeFunction(paramExecuteFunction);
    }, true);

    buttonBlock.addEventListener('touch', () => {
        executeFunction(paramExecuteFunction);
    }, true);
}