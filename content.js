// Function to add checkboxes to search results
const addCheckboxes = () => {
    const results = document.querySelectorAll('h3');
    results.forEach((result, index) => {
      // Ensure the checkbox is only added once
      if (!result.previousElementSibling || !result.previousElementSibling.classList.contains('custom-checkbox')) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'custom-checkbox';
  
        // Increase the size of the checkbox and adjust the margin
        checkbox.style.width = '20px'; // Set the width of the checkbox
        checkbox.style.height = '20px'; // Set the height of the checkbox
        checkbox.style.marginRight = '15px'; // Increase the space between checkbox and URL
        checkbox.style.verticalAlign = 'middle'; // Align the checkbox vertically with the text
  
        // Retrieve the URL from the parent <a> tag
        const parentLink = result.parentElement;
        const url = parentLink ? parentLink.href : '';
  
        // Set up the checkbox event listener
        checkbox.addEventListener('change', () => {
          if (checkbox.checked) {
            checkbox.style.backgroundColor = 'red';
            chrome.storage.local.set({ [`url${index}`]: url });
          } else {
            checkbox.style.backgroundColor = '';
            chrome.storage.local.remove(`url${index}`);
          }
        });
  
        // Insert checkbox before the result
        result.parentElement.insertBefore(checkbox, result);
      }
    });
  };
  
  // Run the function to add checkboxes when the content script loads
  addCheckboxes();
  