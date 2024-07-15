const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const port = 3000

//middleware
app.use(bodyparser.json())
app.use(express.Router())
app.use(express.json())


//require files
require('./model/index')
const userRouter =  require('./router/user')

app.get('/',(req,res)=>{
    res.send("welcome home page")
})

app.use('/api',userRouter)

app.listen(port,()=>{console.log(`server started on port${port}`);})
