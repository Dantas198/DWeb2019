var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile')
var nanoid = require('nanoid')

var myDB = 'arq.json'


console.log(myDB);

/* GET home page. */
router.get('/', function(req, res, next) {
  jsonfile.readFile(myDB, (erro, musicas) => {
    if(!erro){
        res.render('index', {lista: musicas})
    }
    else    
        res.render('error', {error, erro})
})
});

router.get('/editar/:id', function(req, res, next) {
  jsonfile.readFile(myDB, (erro, musicas) => {
    if(!erro){
      var musica = musicas.find(m => m.id == req.params.id)
      if(musica != undefined){
        console.log("preencher from")
        res.render('edit', {m :musica})
      }
    }
    else    
        res.render('error', {error, erro})
  })
})

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

router.put('/musica/:id', function(req, res) {
    console.log("pedido de update" + req.params.id)
    jsonfile.readFile(myDB, (erro, musicas) => {
      if(!erro){
        var index = musicas.findIndex(m => m.id == req.params.id)
        if(index > -1){
          musicas[index].tit = req.body.tit
          musicas[index].prov = req.body.prov 
          musicas[index].local = req.body.local 
          musicas[index].musico = req.body.musico
          jsonfile.writeFile(myDB, musicas, (erro) => {
            if(!erro)
              return res.end(0);
            else 
            return res.end(1);
          });
        }
      }
      else 
        return res.end(1);
    })
  })

router.put('/*', function(req, res) {
  res.render('error', {error: "O método PUT não suporta esse caminho"})
});

router.post('/', function(req, res){
  jsonfile.readFile(myDB, (erro, musicas) =>{
      if(!erro){
        //podem haver colisões TODO
          req.body.id = nanoid();
          musicas.push(req.body) 
          // console.dir(alunos)
          jsonfile.writeFile(myDB, musicas, erro => {
              if(erro) console.log(erro)
              else console.log('Registo gravado com sucesso.')
          })
      }
  })
  res.redirect('/')
})

router.post('/*', function(req, res) {
  res.render('error', {error: "O método POST não suporta esse caminho"})
});

router.delete('/musica/:id', function(req,res){
  jsonfile.readFile(myDB, (erro, musicas) =>{
    if(!erro){
      var index = musicas.findIndex(m => m.id == req.params.id)
      if(index > -1){
          musicas.splice(index, 1)
          jsonfile.writeFile(myDB, musicas, erro => {
              if(erro) console.log(erro)
              else console.log('BD atualizada com sucesso.')
          })
          res.end('0')
      }
      else {
          console.log('Erro: não consegui encontrar o elemento a remover...')
          res.end('1')
      }
    }
    else{
      console.log('Erro na leitura da BD...')
      res.end('1')
    }
  })
})

router.delete('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});
module.exports = router;
