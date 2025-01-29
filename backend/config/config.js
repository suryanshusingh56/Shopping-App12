const mongoose=require('mongoose');
const MONGO_URI=process.env.MONGO_URI;
require('colors');
const connectDb=async ()=>{
      try {
        const conn=await mongoose.connect(MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            
        });
        console.log(`Mongodb connected ${conn.connection.host}`.magenta);
      } catch (error) {
        console.log(`Error :${error.message}`.red)
     process.exit(1);
    }

};
module.exports=connectDb;