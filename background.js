// gather turns a tree of bookmark nodes into an array
function gather(node, nodes) {
    if (node.children) {
        node.children.forEach((n) => { gather(n, nodes) });
    } else {
        if (Array.isArray(node)) {
            node.forEach((c) => { gather(c, nodes) });
        } else {
            if (node.url) {
                nodes.push(node);
            }
        }
    }
    return nodes;
}

chrome.action.onClicked.addListener(function () {
    chrome.bookmarks.getTree(function (node) {
        var nodes = [];
        gather(node, nodes);
        chrome.tabs.create({ "url": nodes[Math.floor(Math.random() * nodes.length)].url });
    });
});
