const { model, Schema, ObjectId} = require("mongoose");

const regionSchema = new Schema({
        _id:{
            type:ObjectId,
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
    },
    {timestamps:true}
);

regionSchema.add({subregions:[regionSchema]});

const Region = model('Region', regionSchema);
module.exports=Region;