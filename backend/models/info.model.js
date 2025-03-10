import mongoose from "mongoose";

const InfoSchema = new mongoose.Schema(
    {
        user:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        }
    },
    {
        timestamps:true
    }
);

const Info = mongoose.model('usersInfo',InfoSchema);
export default Info;