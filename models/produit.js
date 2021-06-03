const mongoose =require("mongoose")
const schema = mongoose.Schema;

const produitSchema = new schema({
    name:{type:String,required:true},
    categorie:{type:String,required:true},
    poidsNet:{type:String,required:true},
    dateFb:{type:String,required:true},
    quantite:{type:Number,required:true},
    founisseur:{type:String,required:true}

})

module.exports = mongoose.model('produit',produitSchema)