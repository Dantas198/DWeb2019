var express = require('express');
var router = express.Router();
var Filmes = require('../controllers/filmes')

/* GET home page. */
router.get('/', function(req, res, next) {
  Filmes.listar()
    .then(dados => {
      res.render('index', {f : dados, page: page})
    })
    .catch(erro => res.render('error', {error: erro}))
  });

router.get('/addform', function(req, res, next) {
  res.render('addform')
})

router.get('/:idFilme', function(req, res, next) {
  Filmes.consultar(req.params.idFilme)
  .then(dados => res.render('filme', {f: dados}))
  .catch(erro => res.render('error', {error, erro}))
  });

router.get('/editform/:idFilme', function(req, res, next) {
  Filmes.consultar(req.params.idFilme)
    .then(dados => res.render('editform', {f:dados}))
    .catch(erro => res.render('error', {error, erro}))
})

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});


router.post('/', function(req, res, next){
  Filmes.adicionar(req.body)
    .then(dados => res.redirect('/filmes/' + dados._id))
    .catch(erro => res.render('error', {error, erro}))
})

router.post('/*', function(req, res) {
  res.render('error', {error: "O método POST não suporta esse caminho"})
});

router.delete('/:idFilme', function(req, res, next){
  Filmes.apagar(req.params.idFilme)
    .then(res.end('0'))
    .catch(erro => console.log(erro), res.end('1'))
})

router.delete('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

router.put('/:idFilme', function(req, res, next){
  var id = req.params.idFilme
  Filmes.modificar(id, req.body)
    .then(res.end('0'))
    .catch(erro => console.log(erro), res.end('1'))
})

router.put('/*', function(req, res) {
  res.render('error', {error: "O método PUT não suporta esse caminho"})
});

module.exports = router;
