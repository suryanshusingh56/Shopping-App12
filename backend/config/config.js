const mongoose=require('mongoose');
require('colors');
const connectDb=async ()=>{
      try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
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