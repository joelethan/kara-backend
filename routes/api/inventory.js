import express from "express";
import { json } from "body-parser";
import inventory from "../../models/Inventory";
const router = express.Router();
const passport = require("passport");

const Inventory = require("../../models/Inventory");

router.get("/", (req, res) => res.json({ msg: "Inventory works" }));
//check if the user is logged in as an admin

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.json({ msg: "seek previlages to log in as an admin" });

      const inventory = new Inventory ([]);

    Inventory.findOne({item: req.params.id }).then((item) => {
      if (item) return res.json({ msg: "Inventory Item already created" });
      inventory.findById(req.params.id)
        .then(() => {
          
          //declare the fields within the dictionary
          
            inventoryItem.save().then(() => {
            res.json({ msg: "New Inventory Item added" });
          });
        })
        .catch(() => {
          res.json({ msg: "you do not have rights to create a new inventory item" });
        });
    });
  }
);

//update the lnventory list in the database

router.post(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      if (req.user.role == !"admin")
        return res.json({ msg: "seek previlages to log in as an admin" });

      Inventory.findOne({ inventory: req.params.id }).then((item) => {
          
        // if (item) return res.json({ msg: "Inventory Item already created" });
        // User.findById(req.params.id)
        //   .then(() => {
        // //update record of inventory items for numbers  
        
        // });
        //     inventoryItem.save().then(() => {
        //       res.json({ msg: "inventory record list updated" });
        //     });
          })
          .catch(() => {
            res.json({ msg: "you do not have rights to update the record in the inventory" });
          });
      });

  
  

module.exports = router;
