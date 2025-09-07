const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/RandomAct')
  .then(() => console.log('database Connected'))
  .catch((err)=>console.error(err));
//MONGO_URI=mongodb+srv://aryawaskar0_db_user:Aryawaskar4372@cluster0.jxvhzxj.mongodb.net/RandomAct?retryWrites=true&w=majority&appName=Cluster0