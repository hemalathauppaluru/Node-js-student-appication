const mongoose = require('mongoose')
const  dbUrl = process.env.DB_URL
console.log(dbUrl);
mongoose.connect(dbUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
if(!err){
console.log("DB connection Sucess");
}else{
    console.log("Db connection is fail");
}
})