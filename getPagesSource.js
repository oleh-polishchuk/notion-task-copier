chrome.runtime.sendMessage({
    action: "getSource",
    source: getSource(document)
});

function getSource($document) {
    var id,
        title;

    var idElement = document.querySelector(".layout h1");
    var titleElement = Array.from(document.querySelectorAll(".layout-content [role='row']")).find((elem) => elem.innerText.includes("ID"))

    var $keyFromIssueList = idElement ? idElement.innerText : null;
    var $valFromIssueList = titleElement ? titleElement.innerText.split("\n")[1] : null;

    if ($keyFromIssueList && $valFromIssueList) {
        id = $keyFromIssueList;
        title = $valFromIssueList;
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
