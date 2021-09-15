
//essa função serve para mostrar o corpo da página através do ajax
function chamarPg(url) { 

    let ajax = new XMLHttpRequest();

    ajax.open('GET', url)

    ajax.onreadystatechange = () => { 
        //console.log(ajax.readyState) 
        if(ajax.readyState == 4 && ajax.status == 200) {
            document.getElementById('conteudo').innerHTML = ajax.responseText
        }

        if(ajax.readyState == 4 && ajax.status == 404) {
            //ERRO
            document.getElementById('conteudo').innerHTML = 'tente novamente mais tarde'
        }
    }

    ajax.send()


}
//função que irá mostrar o conselho na tela
function mostraDados() { 

    let nome = document.getElementById('nome').value
    let url = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes/'+nome

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.open('GET', url)

    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) { 

            //document.getElementById("conselho").innerHTML = xmlHttp.responseText;
            //tá jogando o objeto inteiro lá na div  
            
            //console.log(xmlHttp)

            //console.log(xmlHttp.responseText)
     
            let dadosJSONtext = xmlHttp.responseText
 
            let dadosJSONobj = JSON.parse(dadosJSONtext)

            //console.log(dadosJSONobj)

            gerarTabela(dadosJSONobj)

    
            //console.log(dadosJSONobj[0].res[1].frequencia)       
        }
    }
    xmlHttp.send()
}

function gerarTabela(dadosJson) { 
    console.log(dadosJson);

/*
        <table class="table table-hover">
            <thead>
                <td>Período</td>
                <td>Registros</td>
            </thead>

            <tbody id="table-body">
                
            </tbody>
*/

    let resultado = document.getElementById('resultado')

    resultado.innerText = ""

    let table = document.createElement('table')

    table.className = "table table-hover"

    resultado.appendChild(table)

    let tableHead = document.createElement('thead')
    tableHead.id = 'tabela-cabeca'

    table.appendChild(tableHead)

    let novaLinhaCabeca = tableHead.insertRow()

    novaLinhaCabeca.insertCell(0).innerHTML = "Período"

    novaLinhaCabeca.insertCell(1).innerHTML = "Registros"

    let tableBody = document.createElement('tbody')
    tableBody.id = 'tabela-corpo'

    table.appendChild(tableBody)

    tableBody.innerHTML = ""
    
    //novaLinha.insertCell(0).innerHTML = "55"
    //novaLinha.insertCell(1).innerHTML = "60"

    for(let i = 1; i <= 8; i++) { 

        let periodo = dadosJson[0].res[i].periodo

        let frequencia = dadosJson[0].res[i].frequencia

        periodo = periodo.replace('[', '')
        periodo = periodo.replace('[', '')
        periodo = periodo.replace(',', '-')

        let novaLinha = tableBody.insertRow()

        novaLinha.insertCell(0).innerHTML = periodo

        novaLinha.insertCell(1).innerHTML = frequencia
    }


/*
    tableBody.innerHTML = "ssss"

    let newRow = tableBody.insertRow()
    

    //newRow.insertCell(0).innerHTML = 'sss'
    //newRow.insertCell(1).innerHTML = 'ddd'
    /* Esse código funciona mas quero fazer uma tabela, não escrever no código, vai ficar aqui só de rascunho e debug
    //ano-ano + Registradas
    for(let i = 1; i <= 8; i++) { 

        let periodo = dadosJson[0].res[i].periodo

        let frequencia = dadosJson[0].res[i].frequencia

        periodo = periodo.replace('[', '')
        periodo = periodo.replace('[', '')
        periodo = periodo.replace(',', '-')


        console.log(periodo)
        

        let div = document.createElement('div')
        div.innerHTML = periodo + ' - ' + frequencia

        resultado.appendChild(div)
    }*/
}