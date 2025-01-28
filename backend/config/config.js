const mongoose=require('mongoose');
const password=process.env.password;
require('colors');
const connectDb=async ()=>{
      try {
        const url=`mongodb+srv://suryanshusingh56:${password}@cluster0.coz20.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const conn=await mongoose.connect(url,{
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