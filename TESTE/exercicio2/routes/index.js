var express = require('express');
var router = express.Router();
var axios = require('axios')

let apikey = "?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzg4NjAwNTQsImV4cCI6MTU4MTQ1MjA1NH0.HIlH4_Ao6504qaLhhbZ2_OtDzaZaG5FeYy-Yc2d9lwQ";

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades' + apikey)
    .then(dados => {
      res.render('lista-entidades', {entidades : dados.data})
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

router.get('/tipologia/:id', function(req, res, next) {
  var id = req.params.id;
  axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+ id + apikey)
    .then(tipologia => {
        axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+ id + '/elementos' + apikey)
          .then(elementos => {
            axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+ id + '/intervencao/dono' + apikey)
              .then(dono => {
                axios.get('http://clav-api.dglab.gov.pt/api/tipologias/'+ id + '/intervencao/participante' + apikey)
                  .then(participante => {
                    res.render('tipologia', {tipologia: tipologia.data, elementos: elementos.data, dono: dono.data, participante: participante.data})
                  })
                  .catch(erro => {res.render('error', {error: erro})})
              }).catch(erro => {res.render('error', {error: erro})})
              .catch(erro => {res.render('error', {error: erro})})  
          }).catch(erro => {res.render('error', {error: erro})
        })
    }).catch(erro => {res.render('error', {error: erro})
    })
});


router.get('/entidade/:id', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + apikey)
  .then(entidade =>{
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono' + apikey)
    .then(dono =>{
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante' + apikey)
      .then(participante =>{
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias' + apikey)
        .then(tipologias =>{
          res.render('entidade', {entidade: entidade.data, dono: dono.data, participante: participante.data, tipologias: tipologias.data})
        }).catch(erro =>{res.render('error', {error: erro})
        })
      }).catch(erro =>{res.render('error', {error: erro})
      })
    }).catch(erro =>{res.render('error', {error: erro})
    })
  }).catch(erro =>{ res.render('error', {error: erro})
  })
});

router.get('/*', function(req, res) {
  res.render('error', {error: "O método GET não suporta esse caminho"})
});

router.post('/*', function(req, res) {
  res.render('error', {error: "O método POST não suporta esse caminho"})
});

router.put('/*', function(req, res) {
  res.render('error', {error: "O método PUT não suporta esse caminho"})
});

router.delete('/*', function(req, res) {
  res.render('error', {error: "O método DELETE não suporta esse caminho"})
});

module.exports = router;
