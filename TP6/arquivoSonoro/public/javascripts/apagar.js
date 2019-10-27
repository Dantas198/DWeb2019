function apagarMusica(id){
    console.log('Vou tentar apagar o ' + id + '....')
    axios.delete('/musica/' + id)
        .then(response => window.location.assign('/'))
        .catch(error => console.log(error))
}