const toggleComments = document.getElementById('toggleComments');

if (toggleComments) {
    toggleComments.addEventListener('change', function () {
        let isChecked = this.checked;

        chrome.storage.sync.set({hideComments: isChecked});

        chrome.tabs.query(
            {active: true, currentWindow: true},
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {hideComments: isChecked});
            }
        );
    });
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(
        'hideComments',
        function (data) {
            toggleComments.checked = !!data.hideComments;
        }
    );
});