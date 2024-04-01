document.getElementById('toggleComments').addEventListener('change', function() {
    let isChecked = this.checked;
    // Save the state in chrome.storage
    chrome.storage.sync.set({hideComments: isChecked}, function() {
        console.log('Comments visibility preference is set to ' + isChecked);
    });

    // Send message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {hideComments: isChecked});
    });
});

// On popup load, get the state from chrome.storage and update the checkbox
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('hideComments', function(data) {
        document.getElementById('toggleComments').checked = !!data.hideComments;
    });
});