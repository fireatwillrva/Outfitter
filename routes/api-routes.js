// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  console.log("creating routes");

  app.get("/api/clothing_item/:userid/:type", function(req, res) {
 
    db.Clothing_item.findAll({
      where: {
        user_id: req.params.userid,
        type: req.params.type
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // POST route for saving a new Clothing_item
  app.post("/api/clothing_items", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Clothing_item.create({
        user_id: req.body.user_id,
        type: req.body.type,
        name: req.body.name,
        img_url: req.body.img_url,
        // include: [db.Outfit],
    }).then(function(dbClothing_item) {
      console.log(dbClothing_item);
      // We have access to the new Clothing_item as an argument inside of the callback function
      res.json(dbClothing_item);
    });
  });
  app.get("/api/clothing_item/:id", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Clothing_item.findAll({
      where: {
        id: req.params.id
      },
      // include: [db.Clothing_item]
    }).then(function(result) {
      // We have access to the outfit as an argument inside of the callback function
      res.json(result);
    });
  });
  
  app.get("/api/outfits/:user_id", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Outfit.findAll({
      where: {
        user_id: req.params.user_id
      },
      // include: [db.Clothing_item]
    }).then(function(dbOutfit) {
      // We have access to the outfit as an argument inside of the callback function
      res.json(dbOutfit);
    });
  });
  // POST route for saving a new Outfits
  app.post("/api/outfits/", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property
    db.Outfit.create({
      top_id: req.body.top_id,
      bottom_id: req.body.bottom_id,
      shoes_id: req.body.shoes_id,
      bag_id:req.body.bag_id,
      toptwo_id: req.body.toptwo_id,
      hat_id: req.body.hat_id,
      name: req.body.name,
      user_id: req.body.user_id
    }).then(function(dbOutfit) {
      // We have access to the new Outfits as an argument inside of the callback function
      res.json(dbOutfit);
    });
  });
  };