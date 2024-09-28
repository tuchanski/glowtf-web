// Move para a página destino sem perder os parâmetros
function MoverPagina(destino, extraParam = "", extraParamValue = "") {
    let tempurl = new URLSearchParams(window.location.search);
    
    if (extraParam !== "") {
        tempurl.set(extraParam, extraParamValue);
    }

    const currentPath = window.location.pathname;
    const newPath = currentPath.substring(0, currentPath.lastIndexOf('/') + 1) + destino;

    const newUrl = window.location.origin + newPath + '?' + tempurl.toString();

    window.location.href = newUrl;
}
