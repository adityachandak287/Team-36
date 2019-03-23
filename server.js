const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const cors=require("cors")
const morgan=require("morgan")
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.static(__dirname+'/views'));
app.use(cors())
app.use(morgan('combined'))


app.get("/",(req,res)=>{
    res.sendFile("landingpage.html",{root:__dirname+"/views"})
})
app.post("/api",(req,res)=>{
    console.log(req.body);
    res.json(req.body)
})

app.listen(port,(err)=>{
    if(err)
    throw err
    console.log("Connected at port "+port)
}) 