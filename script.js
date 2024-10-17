const form = document.querySelector('form');

hud = document.getElementById('hud');

const replaceImages = () =>{

    console.log("gezcx")
 
    return  document.getElementById('search-container')
}


form.addEventListener('submit', async (event) =>{

    event.preventDefault();

    const [tab] = await chrome.tabs.query({active: true,currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id,allFrames: true},
        function: replaceImages,
    }, function(results){
        var result = results[0];
        hud.innerHTML = result
    })
        
});

