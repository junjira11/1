const express = require("express"), 
      bodyParser = require("body-parser"), 
      mongoose = require("mongoose");

      passport = require('passport'),
      passportLocal = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      User = require('./models/user');
      Sky =require('./models/user'),
      skyRoutes = require('./routes/sky');
      indexRoutes = require('./routes/index');

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


app.use('/', indexRoutes);
app.use('/sky', skyRoutes);

app.listen(3000, function(req,res){
    console.log("My collection is ready!");
});

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