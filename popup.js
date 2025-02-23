document.addEventListener('DOMContentLoaded', () => {
    const urlList = document.getElementById('urlList');
    const copyButton = document.getElementById('copyButton');
    const clearButton = document.getElementById('clearButton');
  
    // Retrieve stored URLs from chrome storage
    const updateUrlList = () => {
      chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
          console.error('Error retrieving data:', chrome.runtime.lastError);
          return;
        }
  
        const urls = Object.values(items).filter(url => url !== null);
        urlList.innerHTML = urls.map(url => `<div>${url}</div>`).join('');
      });
    };
  
    updateUrlList();
  
    // Copy URLs to clipboard
    copyButton.addEventListener('click', () => {
      const urls = Array.from(urlList.querySelectorAll('div')).map(div => div.textContent);
      navigator.clipboard.writeText(urls.join('\n')).then(() => {
        alert('URLs copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy URLs:', err);
      });
    });
  
    // Clear all URLs
    clearButton.addEventListener('click', () => {
      chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
          console.error('Error clearing storage:', chrome.runtime.lastError);
          return;
        }
        urlList.innerHTML = ''; // Clear the list in the popup
        alert('All URLs cleared!');
      });
    });
  });
  