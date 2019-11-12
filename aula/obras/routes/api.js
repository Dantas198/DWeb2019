var express = require('express');
var router = express.Router();
var Obras = require('../controllers/obras')

/* GET home page. */
router.get('/obras', function(req, res, next) {
  let ano = req.query.ano
  let compositor = req.query.compositor
  let duracao = req.query.duracao
  let periodo = req.query.periodo
  
  if (compositor && duracao){
    Obras.listarByCompositorDuracao(compositor, duracao)
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))
  }
  else if(ano){
    Obras.listarByAno(ano)
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))  
  }
  else if (periodo) {
    Obras.listarByPeriodo(periodo)
      .then(dados => res.jsonp(dados))
      .catch(error => res.status(500).jsonp(error))
  }
  else{
    Obras.listar()
    .then(dados => res.jsonp(dados))
    .catch(error => res.status(500).jsonp(error))
  }
});

router.get('/obras/:idObras', function(req, res, next){
  Obras.consultar(req.params.idObras)
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
})

router.get('/compositores', function(req, res, next){
  Obras.listarCompositores()
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
})

router.get('/periodos', function(req, res, next){
  Obras.listarPeriodos()
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
})


module.exports = router;
