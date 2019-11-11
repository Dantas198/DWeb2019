var express = require('express');
var router = express.Router();
var axios = require('axios')

router.get('/', function(req, res) {
    let path = 'http://localhost:3000/api/laureados';
    axios.get(path)
        .then(dados =>{
        res.render('lista-laureados', {lista : dados.data})
        })
        .catch(erro =>{
        res.render('error', {error: erro})
        })
    })
    
router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

module.exports = router;