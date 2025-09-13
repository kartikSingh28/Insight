const mongoose=require("mongoose");
console.log("connected to");
mongoose.connect("mongodb+srv://kartik:Kartik7500@cluster0.ojkylc8.mongodb.net/INSIGHT-app")
const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const UserSchema=new Schema({
    email:{type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String

});

const adminSchema=new Schema({
    email: {type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String

    
});

const courseSchema=new Schema({
    email: {type:String,unique:true},
    password:String,
    firstName:String,
    lastName:String,
    creatorId:ObjectId
    
});


const purchaseSchema=new Schema({
    userId:ObjectId,
    courseId:ObjectId
    
});



const userModel=mongoose.model("user",UserSchema);
const adminModel=mongoose.model("admin",adminSchema);
const courseModel=mongoose.model("course",courseSchema);
const purchaseModel=mongoose.model("purchase",purchaseSchema);

module.exports= {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}