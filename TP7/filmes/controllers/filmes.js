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
            .findOneAndDelete({_id: ObjectId(id)}, {useFindAndModify : false})
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
    return Filme.findOneAndUpdate({_id: ObjectId(id)}, dados, {useFindAndModify : false})
                .exec()
                //ver se dá
}
/*
Filmes.contar = () =>{
    return Film.countDocuments().exec()
}


Filmes.projetar  = () =>{
    return Filme
            .find({},campos)
            .exec()
}

Filmes.agregar = campo=>{
    return Filme.aggregate([{$group: {_id: "$" + campo, contador: {$sum:1}}}, {$sort: {contador:-1}}]).exec()
}*/