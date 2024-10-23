const form = document.querySelector('form');

hud = document.getElementById('nome');
cel = document.getElementById('cell');
email = document.getElementById('email');
solicitante = document.getElementById('solicitante');
solicitacao = document.getElementById('solicitacao') ;

suportButton = document.getElementById('suportButton') ;

suportButton.addEventListener("click",scriptHandler);

let history ;

function scriptHandler(){
 const  supsec = document.getElementById('suporteSection');
 if(supsec.style.display === 'none'){
  supsec.style.display = 'block'
  supsec.innerText = "--------ANALISE DA ONU -------\nNivel de sinal:";
 }else{
  supsec.style.display = 'none'
 }
  

}

form.addEventListener('submit', async (event) =>{

    event.preventDefault();
    const aux4 = form.elements['fname'].value
    solicitant = "SOLICITANTE : " + aux4

    solicitaca = "SOLICITAÇÃO : " + form.elements['lname'].value
    
    const [tab] = await chrome.tabs.query({active: true,currentWindow: true});

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      function: () => {
        const element = document.getElementById("id_sc_field_nome");
        const cell = document.getElementById("id_sc_field_telcelular");
        const email = document.getElementById("id_sc_field_email");
        
     
        const data = {
            name : element.value,
            cell : cell.value,
            email : email.value
           
        }
        history =+ data;
        console.log(history)
        return data
      }
    }).then((results) => {
      console.log(results)
      for (let  x  in results) {
        if(results[x].result){
          const aux = "CLIENTE : " + results[x].result.name
          const aux2 = "TELEFONE CADASTRADO : " + results[x].result.cell
          const aux3 = "EMAIL : "+ results[x].result.email
        
          hud.innerText =  aux
          cel.innerText = aux2
          email.innerText = aux3 
          solicitante.innerText = solicitant
          solicitacao.innerText = solicitaca
        }
      }

    }).catch((error) => {
      console.error("Failed to execute script: " + error);
    });
});

