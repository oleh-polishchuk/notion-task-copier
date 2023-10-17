chrome.runtime.sendMessage({
    action: "getSource",
    source: getSource(document)
});

function getSource($document) {
    var id,
        title;

    var idElement = Array.from(document.querySelectorAll(".layout-content [role='row']")).find((elem) => elem.innerText.includes("ID"))
    var titleElement = document.querySelector(".layout h1");

    var idValue = idElement ? idElement.innerText.split("\n")[1] : null;
    var titleValue = titleElement ? titleElement.innerText : null;

    if (idValue && titleValue) {
        id = idValue;
        title = titleValue;
    }

    var html;
    if (id && title) {
        html = '[' + id + '] ' + title;
    } else {
        html = null;
    }

    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(html).then(function() {
                /* clipboard successfully set */
                console.log('Issue name copied to clipboard!');
            }, function() {
                /* clipboard write failed */
                console.log('Issue name coping to clipboard failed!');
            });
        }
    });

    console.log('m:getSource, html:', html);

    return html;
}
