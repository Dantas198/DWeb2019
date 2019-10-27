function editaMusica(id){ 
    console.log('Vou tentar apagar o ' + id + '....')  
    params = {
        id: id,
        tit:  document.getElementById('1').value,
        prov: document.getElementById('2').value,
        local: document.getElementById('3').value,
        musico: document.getElementById('4').value
      }
    axios.put('/musica/' + id, params)
        .then(response =>  window.location.assign('/'))
        .catch(error => console.log(error))
}
