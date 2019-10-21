function apagarVelhas() {
    fetch('/tarefasvelhas', {
      method: 'DELETE',
    })
      .catch(err => console.log(err));
  }