const express=require('express')
const app= express();
const router= express.Router();
require('dotenv').config({path:'backend/config/.env'})
const cookieparser=require('cookie-parser')
const fileupoad = require('express-fileupload')
const bodyParser = require('body-parser')
const cors=require('cors')


app.use(cors({
  origin:'*'
}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const sequelize=require('./server')

sequelize.authenticate().then(() => {
    console.log("Database connected!");}).catch((err) => {
        console.log(err)});

app.listen(process.env.PORT,'192.168.1.30',()=>{console.log(`Server running on port ${process.env.PORT}`)})

app.use(fileupoad({useTempFiles:true}))

const table=require('./routes/table.routes')
const user=require('./routes/user.routes')
const project=require('./routes/project.routes')
const phase=require('./routes/phase.routes')
const task=require('./routes/task.routes')
app.use('/table',table)
app.use('/user',user)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
app.use('/project',project)
app.use('/phase',phase)
app.use('/task',task)



module.exports=app;




