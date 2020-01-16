var Obras = require('../models/obra')

//Devolve a lista de alunos
module.exports.listar = () =>{
    return Obras
                .find()
                .select({id:1, title:1, compositor:1, tipo:1, _id:0})
                .exec()
}

module.exports.consultar = id =>{
    return Obras
                .findOne({id: id})
                .exec()
}


module.exports.listarTipos = () => {
    return Obras
                .distinct('tipo')
                .exec()
}


module.exports.listarFromCompositor = compositor =>{
    return Obras
                .find({compositor: compositor})
                .exec()
}


module.exports.listarObrasInstrumento = instrumento =>{
    return Obras
                .find({"instrumentos.designacao": instrumento})
                .exec()
}


module.exports.listarObrasPartiturasQuantidade = () =>{
    return Obras
                .aggregate([{$unwind : "$instrumentos"},
                            {$group: 
                                {_id : "$id",
                                partituras: {$sum: 1},
                                titulo: {$first: "$titulo"}}},
                        ])
}




