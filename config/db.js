const mongoose =  require('mongoose');


function connectionDb(){
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log("Conected to Database");
            
        })
}

module.exports = connectionDb