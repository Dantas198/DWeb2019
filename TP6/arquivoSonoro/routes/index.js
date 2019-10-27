var express = require('express');
var router = express.Router();
var mMethod = require('./musicaMethods')
var nanoid = require('nanoid')

var myDB = 'arq.json'


console.log(myDB);

/* GET home page. */
router.get('/', function(req, res, next) {
  mMethod.getAllMusics((erro, musicas) => {
    if(!erro){
        res.render('index', {lista: musicas})
    }
    else    
        res.render('error', {error, erro})
  })
});

router.get('/editar/:id', function(req, res, next) {
  mMethod.getMusicById(req.params.id, (erro, musica) => {
    if(!erro)
      res.render('edit', {m :musica})  
    else
      res.render('error', {error, erro})
  })
})

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

router.put('/musica/:id', function(req, res) {
  console.log("pedido de update" + req.params.id)
  mMethod.putMusic(req.params.id, req.body, erro => {
    if(!erro)
      return res.end('0');
    else 
      return res.end('1');
  });
})

router.put('/*', function(req, res) {
  res.render('error', {error: "O método PUT não suporta esse caminho"})
});

router.post('/', function(req, res){
  //para não estar sempre a mudar de id coloco-o aqui
  req.body.id = nanoid()
  mMethod.postMusic(req.body, erro =>{
    if(!erro)
      res.redirect('/')
    else
      res.render('error', {error: erro})
  })
})

router.post('/*', function(req, res) {
  res.render('error', {error: "O método POST não suporta esse caminho"})
});

router.delete('/musica/:id', function(req,res){
  mMethod.deleteMusic(req.params.id, erro =>{
    if(!erro)
      res.end('0');
    else{
      res.end('1')
    }
  })
})

router.delete('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});
module.exports = router;
