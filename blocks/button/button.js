export default function eventButtonFunction(parentElem, executeFunction, paramExecuteFunction) {
    let buttonElem = parentElem.querySelector('.button');

    buttonElem.addEventListener('click', () => {
        executeFunction(paramExecuteFunction);
    }, true);

    buttonElem.addEventListener('touch', () => {
        executeFunction(paramExecuteFunction);
    }, true);
}