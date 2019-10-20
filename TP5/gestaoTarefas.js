var http = require('http')
var url = require('url')
var pug = require('pug')
var fs = require('fs')
var jsonfile = require('jsonfile')

var {parse} = require('querystring') //só exporta o parsing
var myBD = "tarefas.json"

var myServer = http.createServer((req,res) => {
    var purl = url.parse(req.url, true)
    var query = purl.query

    console.log(req.method + ' ' + purl.pathname)

    if(req.method == 'GET'){
        if((purl.pathname == '/') || (purl.pathname == '/gestaoTarefas')){
            jsonfile.readFile(myBD, (erro, tarefas) =>{
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
                if(erro){
                    res.write(pug.renderFile('erro.pug', {e: "Erro na leitura da BD...."}))
                    res.end();
                    console.log("erro no get")
                    return
                }
                res.write(pug.renderFile('front-page.pug', {lista: tarefas}))
                res.end();
                console.log("get com sucesso")
            })
        }
        else if(purl.pathname == '/w3.css'){
                res.writeHead(200, {'Content-Type': 'text/css'})
                fs.readFile('stylesheets/w3.css', (erro, dados) =>{
                    if(erro){
                        res.write(pug.renderFile('erro.pug', {e: "Stylesheet não encontrada...."}))
                        res.end()
                        console.log("erro de styleshet")
                        return
                    }
                    console.log("getting stylesheets")
                    res.write(dados)
                    res.end()
                })   
        }
            else {
                console.log("erro de path")
                res.writeHead(200, {
                    'Content-Type' : 'text/html; charset=utf-8'
                })
                res.write(pug.renderFile('erro.pug', {e: "ERRO: O método " + req.method + " não suporta o caminho " +
                                    purl.pathname}))
                res.end();
                }
    }
    else if(req.method == 'POST'){
            if(purl.pathname == '/tarefa'){
                recuperaInfo(req, resultado => {
                    jsonfile.readFile(myBD, (erro, tarefas) =>{
                        if(!erro){
                            tarefas.push(resultado)
                            jsonfile.writeFile(myBD, tarefas, erro2 => {
                                if(erro2)
                                    console.log(erro) //TODO mandar html e no de baixo tbm (DELETE)
                                else{
                                    console.log("refresh")
                                    res.writeHead(303, {'Location': '/'})
                                    res.end()
                                }
                            })
                        }
                    })
                })
            }
           else{
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('erro.pug', {e: "ERRO: O método " + req.method + " não suporta o caminho " +
                                    purl.pathname}))
            res.end();
           }
        }
    else if(req.method == "DELETE"){
            if(purl.pathname == '/tarefasvelhas'){
                jsonfile.readFile(myBD, (erro, tarefas) =>{
                    if(!erro){
                        tarefasfaziveis = filter(tarefas)
                        jsonfile.writeFile(myBD, tarefas, erro2 =>{
                            if(erro2)
                                console.log(erro)
                            else{
                                res.writeHead(303, {'Location': '/'})
                                res.end()
                            }
                        })
                    }
                })
            }
            else{
                res.writeHead(200, {
                    'Content-Type' : 'text/html; charset=utf-8'
                })
                res.write(pug.renderFile('erro.pug', {e: "ERRO: O método " + req.method + " não suporta o caminho " +
                                        purl.pathname}))
                res.end();
               }
        }
        else{
            console.log("ERRO: " + req.method + " não suportado....")
            res.writeHead(200, {
                'Content-Type' : 'text/html; charset=utf-8'
            })
            res.write(pug.renderFile('erro.pug', {e: "ERRO: " + req.method + " não suportado...."}))
            res.end();
        }
})

myServer.listen(12345, ()=>{
    console.log("Servidor à escuta na porta 12345")
})

function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        //enquanto conseguirmos ler dados do request
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=> {
            callback(parse(body))
        })
    }
}


function filter(tarefas){
    var res = new Array();
    var length = tarefas.length;
    var localDate = new Date();
    console.dir(localDate);
    for(var j = 0; j < length; j++)
    {
        var objDate = Date.parse(tarefas[j].data_limite)
        console.dir(objDate)
        if(localDate <= objDate)
        {   
            console.log("if")
            res.push(tarefas[j])
        }
    }
    console.log(res);
    return res
}