const mongoose = require('mongoose'),
      passportLocalMongoose = require('passport-local-mongoose');

let skySchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String
});

skySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', skySchema);