const express = require("express"), 
      bodyParser = require("body-parser"), 
      mongoose = require("mongoose");

      passport = require('passport'),
      passportLocal = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');
      Sky =require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/collection', {useNewUrlParser: true,useUnifiedTopology: true});
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

app.use(require('express-session')({
    secret: 'CSS227',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//  Sky.create(
//      {
//          name : "sky-01",
//          image : "https://www.grandecentrepointpattaya.com/upload/the-sky-32-restaurant/mobile/2-the-sky-32-restaurant.jpg?v=34",
//          desc :"ดาว 1 ดวง"
//      }, function(error, sky){
//          if(error){
//              console.log("Error");

//          } else {
//              console.log("Added");
//              console.log(sky);
//          }
// });
    

// let sky = [
    // {name: "sky-01",
    // image:"https://www.grandecentrepointpattaya.com/upload/the-sky-32-restaurant/mobile/2-the-sky-32-restaurant.jpg?v=34",
    // desc:"ดาว 1 ดวง"},
//     {name: "sky-02",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 2 ดวง"},
//     {name: "sky-03",
//     image:"https://img.fotocommunity.com/graeser-im-sonnenuntergang-b134dd11-effd-4202-80ce-358173079115.jpg?height=1080",
//     desc:"ดาว 3 ดวง"},
//     {name: "sky-04",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 4 ดวง"},
//     {name: "sky-05",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 6 ดวง"},
//     {name: "sky-06",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 5 ดวง"},
//     {name: "sky-07",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 7 ดวง"},
//     {name: "sky-08",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 9 ดวง"},
//     {name: "sky-09",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 8 ดวง"},
//     {name: "sky-10",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 10 ดวง"},
//     {name: "sky-11",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 11 ดวง"},
//     {name: "sky-12",
//     image:"https://img.fotocommunity.com/graeser-bei-sonnenuntergang-65a1c5ab-2205-45c8-8762-394992892610.jpg?height=1080",
//     desc:"ดาว 12 ดวง"}
// ];

app.get("/", function(req,res){
    res.render("landing");
});

app.get("/sky",isLoggedIn, function(req,res){
    Sky.find({},function(error,allSky){
        if(error){
            console.log("Error");
        }else {
            console.log(allSky);
            res.render("collection",{Sky: allSky});
        }
    })
    
});

app.post("/new",isLoggedIn, function(req,res){
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

app.get("/sky/new",isLoggedIn, function(req,res){
    res.render("addnewsky");
});

app.get("/sky/:id",isLoggedIn, async function(req,res)
{
    const { id } = req.params;
    const product = await Sky.findById(id);
    console.log(product);
    res.render("showdetails",{ Sky : product});
});

/*--*/

app.get('/login', function(req,res){
    res.render('login');
});



app.post('/login', passport.authenticate('local', {
    successRedirect: '/sky',
    failureRedirect: '/login'
}), function(req, res){
});

app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

app.get('/signup', function(req,res){
    res.render('signup');
});

app.post('/signup', function(req,res){
    User.register(new User({username: req.body.username}), req.body.password , function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');

        }
        passport.authenticate('local')(req,res,function(){
            res.redirect('/sky');
        });
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function(req,res){
    console.log("My collection is ready!");
});