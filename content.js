chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "searchLeafly") {
        let searchBox = document.querySelector('input[data-testid="search-input"]');
        
        if (searchBox) {
            searchBox.value = message.query;
            searchBox.dispatchEvent(new Event("input", { bubbles: true }));

            let searchButton = document.querySelector('button[data-testid="search-submit-button"]');
            if (searchButton) {
                searchButton.click();
            }
        }
    }
});
