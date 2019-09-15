/* Add all the required libraries*/
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'),
    config = require('./config.js');

var toUpdate = {name : 'Phelps Laboratory'};


/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, function(err){
  if (err) throw err;
  console.log('successfully connected');
});


/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
    Listing.find({name : 'Library West'}).exec(function(err, view) {
    if (err) throw err;
    view.forEach(function(element){
      console.log(element);
    });
  });
};


var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({name : 'Course viewed only on cable TV'}, function(err, view) {
    if (err) throw err;
      console.log(view);
  });
  
};


var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */

  Listing.findOne({ name: 'Phelps Laboratory' }, function (err, doc){
    doc.address = '1953 Museum Rd, Gainesville, FL 32603';
    doc.save();
  });

  Listing.find({address : '1953 Museum Rd, Gainesville, FL 32603'}).exec(function(err, view) {
    if (err) throw err;
    view.forEach(function(element){
      console.log(element);
    });
  });
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find().exec(function(err, view) {
    if (err) throw err;
    view.forEach(function(element){
      console.log(element);
    });
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();