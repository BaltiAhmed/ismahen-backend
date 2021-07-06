const mongoose =require("mongoose")
const schema = mongoose.Schema;

const commandeExterneSchema = new schema({

    date:{type:String,required:true},
    prix:{type:String,required:true},
    produits:[{type:mongoose.Types.ObjectId,required:true,ref:'produitExterne'}],
    founisseurId:{type:mongoose.Types.ObjectId,ref:'fournisseur'},
    magasinierId:{type:mongoose.Types.ObjectId,ref:'magasinier'},

    

})



module.exports = mongoose.model('commandeExterne',commandeExterneSchema)