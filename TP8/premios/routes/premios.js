var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/:idPremio', function(req, res) {
  let path = 'http://localhost:3000/api/premios/' + req.params.idPremio;
  axios.get(path)
    .then(dados =>{
      res.render('premio', {premio : dados.data})
    })
    .catch(erro =>{
      res.render('error', {error: erro})
      })
})

router.get('/', function(req, res) {
  let path = 'http://localhost:3000/api/premios';
  let l = Object.keys(req.query).length
  let categoria = req.query.categoria
  let data = req.query.data
  if( l != 0){
    if(categoria && data)
    path += '?categoria=' + categoria + '&data=' + data
    else if(categoria)
        path += '?categoria=' + categoria
    else{
        res.render('error', {error: "Argumentos inválidos"})
        return;
      }
    }
    console.log(path)
  axios.get(path)
    .then(dados =>{
      res.render('lista-premios', {lista : dados.data})
    })
    .catch(erro =>{
      res.render('error', {error: erro})
    })
})

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

module.exports = router;