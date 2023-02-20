let express=require('express');
let mongoose=require('mongoose')
let ejs=require('ejs')
let flash=require('connect-flash')
let multer=require('multer')
let path=require('path')
let session=require("express-session")


let app=express();
app.use(express.urlencoded({extended:true}))
app.use(flash())
app.use(session({
    cookie:{maxAge:6000},
    secret:"Arka",
    resave:false,
    saveUninitialized:false
}))

app.use('/upload',express.static(path.join(__dirname,'upload')))

let filestorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }

})

let filefilter=(req,file,cb)=>{
    if(file.mimetype.includes("png") ||
    file.mimetype.includes("jpg") ||
    file.mimetype.includes("jpeg") 
    ){
        cb(null,true)
    }
    else
    {
        cb(null,false)
    }
}
app.use(multer({storage:filestorage,fileFilter:filefilter,limits:{fieldSize:1024*1024*5}}).single('image'))


let webroute=require('./route/web')

app.use(webroute)


app.set("view engine","ejs")
app.set("views","views")

let port=7000;

let dbcon="mongodb+srv://Arka:rkAozOH726ywp06F@cluster0.zjvh01u.mongodb.net/dupcard"
mongoose.connect(dbcon,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>
    app.listen(port,()=>{
    console.log("server started");
})).catch(err=>{
    console.log(err);
})


