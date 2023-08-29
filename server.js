const express = require('express');

const cors = require('cors')
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const Mail = require('./model/mailsend');
dotenv.config();


const app = express();
app.use(express.json());

app.use(cors());

const DB = process.env.DB_URI

const getConnection = async ()=>{
  try{
    await mongoose.connect(DB)
    console.log('Connection to Database Successful')
  }catch(err){
    console.log(err)
  }
}
getConnection()

app.get('/',(req,res)=>{
  res.status(200).json({
    message:'you hit this route'
  })
})
// Handle email sending
app.post('/emails', async (req, res) => {
  try{
    const { sender, subject, text } = req.body;
    const mailData = {...req.body}
    const newMail = await Mail.create(mailData)
    res.status(201).json({
      status:'Success',
      message:newMail
    })

  }catch(error){
    res.status(400).json({
      status:'failed',
      message:'Something went wrong'
    })
  }


 
  


});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
