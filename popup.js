document.getElementById("searchBtn").addEventListener("click", async () => {
    let query = document.getElementById("searchInput").value.trim();
    
    if (!query) return;

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab.url.includes("leafly.com")) {
        // Inject search term if already on Leafly
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: searchWebsite,
            args: [query]
        });
    } else {
        // Open Leafly search results in a new tab
        let searchURL = `https://www.leafly.com/search?q=${encodeURIComponent(query)}`;
        chrome.tabs.create({ url: searchURL });
    }
});

function searchWebsite(query) {
    let searchBox = document.querySelector('input[data-testid="search-input"]');
    
    if (searchBox) {
        searchBox.value = query;
        searchBox.dispatchEvent(new Event("input", { bubbles: true }));

        let searchButton = document.querySelector('button[data-testid="search-submit-button"]');
        if (searchButton) {
            searchButton.click();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // Implement your search logic here
            console.log('Searching for:', query);
            // For example, you might want to open a new tab with the search results:
            chrome.tabs.create({ url: `https://www.leafly.com/search?q=${encodeURIComponent(query)}` });
        }
    }

    // Event listener for the search button
    searchBtn.addEventListener('click', performSearch);

    // Event listener for the Enter key in the input field
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
});