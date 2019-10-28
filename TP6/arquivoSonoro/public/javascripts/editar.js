function editaMusica(id){ 
    console.log('Vou tentar apagar o ' + id + '....')  
    
    file = {
      '@t': document.getElementById('6').value,
      '#text': document.getElementById('7').value
    }
    
    params = {
        id: id,
        tit:  document.getElementById('1').value,
        duracao: document.getElementById('2').value,
        prov: document.getElementById('3').value,
        local: document.getElementById('4').value,
        musico: document.getElementById('5').value,
        file
      }
    axios.put('/musica/' + id, params)
        .then(response =>  window.location.assign('/'))
        .catch(error => console.log(error))
}
