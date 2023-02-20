let users=require('../model/usermodel')
let path=require('path')

let home=(req,res)=>{
    users.find((err,data)=>{
        if(!err){
            res.render('home',{
                 userData:data,
                message:req.flash('message'),
                message2:req.flash('message2'),
                message3:req.flash('message3'),
                message4:req.flash('message4'),
            })
           
        }
        
    })
   
}

let add=(req,res)=>{
    
    res.render("add",{
        message:req.flash('message'),
        alert:req.flash("alert")
    })
}

let createe=(req,res)=>{
    const image=req.file
    let userd= new users({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        city:req.body.city,
        user_type:req.body.utype,
        status:req.body.status,
        image:image.path,
    });
    userd.save().then(result=>{
        console.log(result,"data Added");
       req.flash('message',"User added")
        res.redirect('/')
    }).catch(err=>{
        req.flash('message',"user not added")
        res.redirect('/add')
        console.log(err);
    }
    )
}
let deletee=(req,res)=>{
    let useId=req.params.id
    users.deleteOne({_id:useId}).then(result=>{
        console.log("deleted");
        req.flash('message2',"User Deleted")
        res.redirect('/')
    }).catch(err=>{
        req.flash('message',"User not Deleted" )
        console.log(err);
    })
}

let edit=(req,res)=>{
    let uId=req.params.id
    users.findById(uId).then(result=>{
        res.render('edit',{
            editdata:result
        })
    }).catch(err=>{
        console.log(err);
    }
    )
}
let update=(req,res)=>{
    let sid=req.body.ssid
    let nname=req.body.name
    let nemail=req.body.email
    let nphone=req.body.phone
    let ncity=req.body.city
    let nimage=req.file

    users.findById(sid).then(result=>{
        result.name=nname
        result.email=nemail
        result.phone=nphone
        result.city=ncity
        result.image=nimage.path
        return result.save().then(data=>{
            req.flash('message3',"User updated")
            res.redirect('/')
        }).catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        req.flash('message3',"User not deleted")
        res.redirect("/edit/:id")
        console.log(err);
})
}

let softdeletee=(req,res)=>{
    let sfId=req.params.id
    users.findByIdAndUpdate({_id:sfId},{status:0}).then(result=>{
        console.log("soft delete")
        req.flash('message4',"User soft deleted")
        res.redirect('/')
    }).catch(err=>{
        console.log(err);
    })
}

module.exports={home,add,createe,deletee,edit,update,softdeletee}