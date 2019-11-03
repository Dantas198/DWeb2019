function apagarFilme(id){
    console.log('Vou tentar apagar o ' + id + '....')
    axios.delete('/filmes/' + id)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}