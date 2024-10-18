const form = document.querySelector('form');

hud = document.getElementById('hud');

const replaceImages = () =>{

    console.log("gezcx")
 
    var headers = document.querySelectorAll('p');
    console.log(headers.length);
    return headers
}


form.addEventListener('submit', async (event) =>{

    event.preventDefault();

    const [tab] = await chrome.tabs.query({active: true,currentWindow: true});

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        const element = document.getElementById('generator_spacebar-suggestion'); // Replace 'your-selector' with your CSS selector
        return element ? element.innerText : "Element not found"; // Return the element's text or a message
      }
    }).then((results) => {
      for (const { result } of results) {
        hud.innerText = result;
        console.log(result); // Logs the text content of the selected element
      }
    }).catch((error) => {
      console.error("Failed to execute script: " + error);
    });
});

