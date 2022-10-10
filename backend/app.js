const express=require('express')
const app= express();
const router= express.Router();
require('dotenv').config({path:'backend/config/.env'})
const cookieparser=require('cookie-parser')
const bodyparser=require('body-parser')





const sequelize=require('./server')
// createTablePost();
sequelize.authenticate().then(() => {
    console.log("Database connected!");}).catch((err) => {
        console.log(err)});

app.listen(process.env.PORT,()=>{console.log(`Server running on port ${process.env.PORT}`)})



const table=require('./routes/table.routes')
app.use('/table',table)

module.exports=app;




