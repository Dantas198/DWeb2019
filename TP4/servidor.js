var http = require('http')
var url = require('url')
var fs = require('fs')


http.createServer(function (req, res) {
    var partes = req.url.split('/')
    var qstr = partes[partes.length - 1]
    var str = qstr.split('.')

    var contentType = str[partes.length - 1]
    if(contentType == undefined)
        sender(res, 'dataset/arq' + qstr + '.xml', "text/xml");
    else
        if(contentType == "ico" | contentType == "gif")
            sender(res,'dataset/' + qstr, contentType)
        else
            sender(res, qstr, contentType )
}).listen(12345)

console.log('Servidor à escuta na porta 12345.....')

function sender(res, path, type){
    fs.readFile(path, function(err, data){
        if(err) {
            console.log(path);
            erro(res);
        }
        else{
            res.writeHead(200, {'Content-Type': type})
            res.write(data)
            res.end()
            }
        })
}

function erro(res){
    res.writeHead(404, {'Content-Type':'text/text'})
    res.write("Não foi possível encontrar o ficheiro requirido")
    res.end()
}