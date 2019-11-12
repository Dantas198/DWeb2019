var Obras = require('../models/obras')
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

module.exports.listar = () =>{
    return Obras
                .find()
                .exec()
}

module.exports.listarByAno = (ano) => {
    return Obras
                .find({anoCriacao: ano})
                .exec()
}

module.exports.listarByCompositorDuracao = (comp, dur) => {
    return Obras
                .find({$and : {compositor: comp, duracao: dur}})
                .exec()
}
module.exports.listarByPeriodo = (ano) => {
    return Obras
                .find({perido: {$gt: data}})
                .exec()
}

module.exports.consultar = (id) => {
    return Obras
                .findOne({_id: id})
                .exec()
}

module.exports.listarCompositores = () => {
    return Obras 
                .distinct("compositor")
                .exec()
}
module.exports.listarPeriodos = () => {
    return Obras
                .distinct("periodo")
                .exec()
}