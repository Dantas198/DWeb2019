var Filme = require('../models/filme')
const mongoose = require('mongoose')
const ObjectId =  mongoose.Types.ObjectId

const Filmes = module.exports

Filmes.listar  = () =>{
    return Filme
            .find()
            .sort({title:1})
            .exec()
}

Filmes.apagar = id => {
    return Filme
            .findOneAndDelete({_id: ObjectId(id)})
            .exec()
            
}

Filmes.consultar  = id =>{
    return Filme
            .findOne({_id: ObjectId(id)})
            .exec()
}

Filmes.adicionar = dados => {
    var filme = new Filme(dados)
    return filme.save({useFindAndModify : false})
}

Filmes.modificar = (id, dados) => {
    return Filme.findOneAndUpdate({_id: ObjectId(id)}, dados)
                .exec()
                //ver se dá
}

Filmes.contar = () =>{
    return Film.countDocuments().exec()
}

Filmes.listarPagina = (page) => {
    return Filme
        .find({}, {})
        .skip((page)*30)
        .limit(30)
        .sort({title:1})
        .exec()
}
