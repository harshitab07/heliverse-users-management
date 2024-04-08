import dotenv from  "dotenv";
import users from "./data/users.js"
import User from "./models/userModel.js"
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {

        const modifiedUsers = users.map(obj => {
            const { id , ...newObj } = obj;
            return newObj;
          });
        await User.insertMany(modifiedUsers);

        console.log('Data Imported'.green.inverse);
        process.exit();
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log('Data Destroyed'.green.inverse);
        process.exit(); 
    }catch(error){
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if(process.argv[2] === '-d'){
    destroyData();
}
else
{
    importData();
}



