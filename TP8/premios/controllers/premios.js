var Premios = require('../models/premios')
var mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

//Devolve a lista de alunos
module.exports.listar = () =>{
    return Premios
                .find()
                .select({year:1, category:1, _id:0})
                .exec()
}

module.exports.listarC = category =>{
    return Premios
                .find({category: category})
                .exec()
}

module.exports.listarCD = (categoria, data) =>{
    return Premios
                .find({year: {$gt: data}, category: categoria})
                .exec()
}

module.exports.listarLaureados = () =>{
    return Premios
                .aggregate([{$unwind: "$laureates"}, 
                            {$group: 
                                {_id: "$laureates.id", 
                                firstname:{$first: "$laureates.firstname"},
                                surname:{$first: "$laureates.surname"},
                                prize: 
                                        {$push: 
                                            {year:"$year", category:"$category"}
                                        }
                                }
                            },
                            {$project: 
                                {firstname:1, surname:1, prize:1, _id:0}
                            }
                        ])
                .sort({firstname:1, surname:1})
                .exec()
  }
  

module.exports.consultar = id =>{
    return Premios
                .findOne({_id: ObjectId(id)})
                .exec()
}

module.exports.listarCategorias = () =>{
    return Premios.distinct('category').exec()
}

