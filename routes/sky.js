const express = require('express'),
      router =  express.Router();
      Sky = require('../models/sky'),
      middleware = require('../middleware');

router.get("/",middleware.isLoggedIn, function(req,res){
    Sky.find({},function(error,allSky){
        if(error){
            console.log("Error");
        }else {
            console.log(allSky);
            res.render("collection",{Sky: allSky});
        }
    })
    
});

router.post("/new",middleware.isLoggedIn, function(req,res){
    let n_name = req.body.name;
    let n_image = req.body.image;
    let n_desc = req.body.desc;
    let n_sky = {name:n_name,image:n_image,desc:n_desc};
    Sky.create(n_sky, function(error,newSky){
        if(error){
            console.log("error");

        }else{
            console.log("New sky added.");
            res.redirect("/index");
        }
    });
   
});

router.get("/new",middleware.isLoggedIn, function(req,res){
    res.render("addnewsky");
});

router.get("/:id",middleware.isLoggedIn, async function(req,res)
{
    const { id } = req.params;
    const product = await Sky.findById(id);
    console.log(product);
    res.render("showdetails",{ Sky : product});
});

module.exports = router;