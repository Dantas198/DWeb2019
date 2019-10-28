const jsonfile = require('jsonfile')
const myDB = 'arq.json'

module.exports = {
    getAllMusics: function(callback){
        jsonfile.readFile(myDB, (erro, musicas) => {
            if(!erro){
                console.log("Read was succesful")
            }
            else{
                console.log("There was an error reading the database")
            } 
            callback(erro, musicas)         
        })
    },

    getMusicById: function(id, callback){
        this.getAllMusics((erro, musicas) => {
            if(!erro){
            var musica = musicas.find(m => m.id == id)
                if(musica != undefined){
                    callback(erro, musica)
                }
                else{
                    console.log("No music was found with that id")
                    var e = new Error ('No music was found with that id')
                    callback(e,undefined)
                }
            }
            else{
                console.log("There was an error reading the database")
                callback(erro, musicas)
            }
        })
    },

    postMusic: function(musica, callback){
        this.getAllMusics((erro, musicas) =>{
            if(!erro){
                musicas.push(musica) 
                jsonfile.writeFile(myDB, musicas, {spaces : 2}, erro => {
                    if(erro) 
                        callback(erro)
                    else {
                        callback()
                        console.log('Registo gravado com sucesso.')
                    }
                })
            }
            else{
                callback(erro)
            }
        })
    },

    deleteMusic: function(id, callback){
        this.getAllMusics((erro, musicas) => {
            if(!erro){
                var index = musicas.findIndex(m => m.id == id)
                if(index > -1){
                    musicas.splice(index, 1)
                    jsonfile.writeFile(myDB, musicas, {space : 2}, erro => {
                        if(erro) 
                            callback(erro)
                        else{ 
                            console.log('Music deleted with success')
                            callback()
                        }
                    })
                }
                else {
                    var e = new Error ('No music was found with that id')
                    callback(e)
                }
            }
            else{
                console.log('Erro na leitura da BD...')
                callback(erro)
            }
        })
    },

    putMusic: function(id, musica, callback){
        this.deleteMusic(id,erro =>{
            if(erro)
                callback(erro)
            else{
                this.postMusic(musica, erro =>{
                    callback(erro)
                })
            }
        })
    }
}