const express=require('express');
const cors=require('cors')
const app=express();
app.use(express.json());
app.use(cors());
// app.get('/',(req,res)=>{
//     try{
//     res.status(200).json({message:"success"});
//     }catch(err){
//         console.log("error",err);
//         res.status(500).json({error:"server error"});
//     }
// })
app.use('/blogs',require('../backend/routes/studentsRoutes'));
const PORT=3001;
app.listen(PORT,()=>{
    console.log("server is running on the port",PORT);
})