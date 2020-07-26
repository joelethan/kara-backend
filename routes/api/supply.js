import express from 'express';
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Supply = require("../../models/Supply");
const Inventory = require("../../models/Inventory");

router.get('/', (req, res) => res.json({msg: "Supplies works"}));

// Protected route, Adding Supply
router.post("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.json({ msg: "Not admin" });
    Supply.findOne({nameOfSupplier: req.params.id})
        .then(() => {
            User.findById(req.params.id)
                .then(() => {
                    const supply = new Supply({
                        nameOfSupplier: req.params.id,
                        itemCategory: req.body.itemCategory,
                        itemName: req.body.itemName,
                        quantity: req.body.quantity,
                        unitPrice: req.body.unitPrice,
                        paymentMethod: req.body.paymentMethod
                    })
                    supply.save()
                        .then(()=>{
                            // Update Inventory
                            Inventory.findOne({itemName: req.body.itemName})
                                .then(item=>{
                                    if (!item) {
                                        const inventory = new Inventory({
                                            itemName: req.body.itemName,
                                            quantity: req.body.quantity
                                        })
                                        inventory.save()
                                    } else {
                                        item.quantity = item.quantity + req.body.quantity
                                        item.save()
                                    }
                                })
                            res.json({msg: 'Supply added'})
                        })
                })
        })
        .catch(()=> {
            res.json({msg: 'User not found'})
        })
})

module.exports = router;
