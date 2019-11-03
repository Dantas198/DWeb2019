var jsonfile = require('jsonfile')
var nanoid = require('nanoid')
var myDB = __dirname + '/../../arq.json'

jsonfile.readFile(myDB, (erro, musicas) => {
    if(!erro){
        putIds(musicas)
        jsonfile.writeFile(myDB, musicas, erro =>{
            if(erro){
                console.log("Não foi possivel escrever")
                console.dir(erro);
            }
            else
                console.log("Sucesso")
        })
    }
    else    
        console.log("Erro a abriro ficheiro")})

function putIds(lista){
  for(musica of lista){
    musica.id = nanoid();
  }
}