const { model, Schema, ObjectId} = require("mongoose");

const regionSchema = new Schema({
        _id:{
            type:ObjetId,
            required:true
        },

        name:{
            type:String,
            required:true
        },

        capital:{
            type:String,
            required:true
        },

        leader:{
            type:String,
            required:true
        },

        flag:String,
        parentRegionId:{
            type:ObjectId,
            required:true
        },
        
        landmarks:[String],
        subregions:[Region]
    },
    {timestamps:true}
);

const Region = model('Region', regionSchema);
module.exports=Region;