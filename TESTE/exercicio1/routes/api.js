var express = require('express');
var router = express.Router();
var Obras= require('../controllers/obras')


router.get('/obras', function(req, res) {
  let compositor= req.query.compositor
  let instrumento = req.query.instrumento
  //var chaves = req.params.id.split('&')
  if(compositor){
    Obras.listarFromCompositor(compositor)
          .then(dados => res.jsonp(dados))
          .catch(error => res.status(500).jsonp(error))
  }
  else if(instrumento){
    Obras.listarObrasInstrumento(instrumento)
          .then(dados => res.jsonp(dados))
          .catch(error => res.status(500).jsonp(error))
  }
  else{
    Obras.listar()
          .then(dados => res.jsonp(dados))
          .catch(error => res.status(500).jsonp(error))
      }
});

router.get('/obras/:id', function(req, res) {
  //var chaves = req.params.id.split('&')
  Obras.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/tipos', function(req, res) {
  //var chaves = req.params.id.split('&')
  Obras.listarTipos()
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/obrasQuant', function(req, res) {
  //var chaves = req.params.id.split('&')
  Obras.listarObrasPartiturasQuantidade() 
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/*', function(req, res) {
  res.status(500).jsonp();
});

router.post('/*', function(req, res) {
  res.status(500).jsonp();
});

router.put('/*', function(req, res) {
  res.status(500).jsonp();
});

router.delete('/*', function(req, res) {
  res.status(500).json();
});


module.exports = router;
