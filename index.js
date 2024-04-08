const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const port=process.env.PORT_FOR_RUNNING
const db=require("./databases/dbconn")
const cors=require("cors")
const clc=require("cli-color")
const authroute=require("./routes/auth")
const CategoryRoute=require("./routes/CategoryRoute")
const productroute=require('./routes/Productroute')
app.use("/images",express.static("uploads/images"))
app.use(cors())
app.use(express.json())
app.use(authroute)
app.use(CategoryRoute)
app.use(productroute)
db().then(
    app.listen(port,()=>{
        console.log(clc.bgMagenta.whiteBright(`server started at ${port}`))
    })
).catch((err)=>{
    console.log(clc.bgRed.whiteBright(err))
})