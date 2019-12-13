$(document).ready(function() {
    var manifest = chrome.runtime.getManifest();
    $("#version").html("v" + manifest.version);
    $("#appname").html(manifest.name);
});

