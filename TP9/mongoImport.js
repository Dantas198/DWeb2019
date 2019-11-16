var mongoose = require('mongoose');
var jsonfile = require('jsonfile');

mongoImport = function (dataBaseName, collectionName, fileName){
    mongoose.connect('mongodb://127.0.0.1:27017/' + dataBaseName, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            jsonfile.readFile(fileName, (error, data) =>{
                if(error){
                    console.log("Read file error")
                    return
                }
                else{
                    let newSchema = mongoose.Schema({}, {strict:false})
                    let newModel = mongoose.model(collectionName, newSchema)
                    let newObj = new newModel(data)
                    newObj.save()
                        .then(data => {
                            console.log("Success")
                            mongoose.connection.close()})
                        .catch(error => console.log(error.message))
                }
            })
        })
        .catch(error => console.log("Unable to connect: " + error.message))
}
main = function (){
    if(process.argv.length != 5){
        console.log("Number of arguments invalid")
        return
    }
    let dataBaseName = process.argv[2]
    let collectionName = process.argv[3]
    let fileName = process.argv[4]
    mongoImport(dataBaseName, collectionName, fileName)
}

main()
