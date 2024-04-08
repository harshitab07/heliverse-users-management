import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   teamMembers: [
        {
            members:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "User",
            },
            first_name:{type: String, required:true},
            last_name:{type: String, required:true},
            gender: {type: String, required:true},
            domain: {type: String, required:true},
            avatar: {type: String, required:true},
            email: {type: String, required:true},
        }
    ],
    objective:{
        type: String,
        required:true,
    },
  
},{
    timestamps: true,
});

const Team = mongoose.model("Team",teamSchema);

export default Team;
