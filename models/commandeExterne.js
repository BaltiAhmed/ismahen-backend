const mongoose =require("mongoose")
const schema = mongoose.Schema;

const commandeExterneSchema = new schema({

    date:{type:String,required:true},
    idProduit:{type:String,required:true},
    idFournisseur:{type:String,required:true},
    idMagasinier:{type:String,required:true},

    

})



module.exports = mongoose.model('commandeExterne',commandeExterneSchema)