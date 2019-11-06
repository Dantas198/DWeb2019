var express = require('express');
var router = express.Router();
var Premios= require('../controllers/premios')

/* GET home page. */
router.get('/premios', function(req, res) {
  let l = Object.keys(req.query).length
  let categoria = req.query.categoria
  let data = Number(req.query.data)
  switch(l){
    case 0:
      Premios.listar()
             .then(dados => res.jsonp(dados))
             .catch(error => res.status(500).jsonp(error))
      break;
    case 1:
      Premios.listarC(categoria)
             .then(dados => res.jsonp(dados))
             .catch(error => res.status(500).jsonp(error)) 
      break;
    case 2:
      Premios.listarCD(categoria, data)
             .then(dados => res.jsonp(dados))
             .catch(error => res.status(500).jsonp(error))    
      break;
    default:
      res.status(500)
      break;
  }
});
router.get('/premios/:id', function(req, res) {
  //var chaves = req.params.id.split('&')
  Premios.consultar(req.params.id)
        .then(dados => res.jsonp(dados))
        .catch(error => res.status(500).jsonp(error))
});

router.get('/categorias', function(req, res){
  Premios.listarCategorias()
          .then(dados => res.jsonp(dados))
          .catch(error => res.status(500).jsonp(error))
})

router.get('/laureados', function(req, res){
  Premios.listarLaureados()
         .then(dados => res.jsonp(dados))
         .catch(error => res.status(500).jsonp(error))
})

module.exports = router;
