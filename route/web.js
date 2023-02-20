let express=require('express')
let route=express.Router();
let controller=require('../controller/user')
let checki=require('../middleware/checkduplicate')
route.get("/",controller.home)
route.get("/add",controller.add)
route.get("/delete/:id",controller.deletee)
route.get("/softdelete/:id",controller.softdeletee)
route.get("/edit/:id",controller.edit)
route.post("/createst",controller.createe)
route.post("/update",controller.update)
module.exports=route;