import express from 'express';
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Order = require("../../models/Order");
const Inventory = require("../../models/Inventory");
const Measurement = require("../../models/Measurement");

router.get('/', (req, res) => res.json({msg: "Orders works"}));

// Protected route, Adding Order
router.post("/:userId", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.json({ msg: "Not admin" });
    Order.findOne({clientName: req.params.userId})
        .then(() => {
            User.findById(req.params.userId)
                .then(() => {
                    Measurement.findOne({clientName: req.params.userId}).then(measurement => {
                    })
                    const order = new Order({
                        clientName: req.params.userId,
                        assignedTailor: req.body.assignedTailor,
                        itemName: req.body.itemName,
                        quantity: req.body.quantity,
                        unitPrice: req.body.unitPrice,
                        paymentMethod: req.body.paymentMethod
                    })
                    console.log(order);
                    // order.save()
                    //     .then(() => {
                    //         // Update Inventory
                    //         Inventory.findOne({itemName: req.body.itemName})
                    //             .then(item=>{
                    //                 if (!item) {
                    //                     const inventory = new Inventory({
                    //                         itemName: req.body.itemName,
                    //                         quantity: req.body.quantity
                    //                     })
                    //                     inventory.save()
                    //                 } else {
                    //                     item.quantity = item.quantity + req.body.quantity
                    //                     item.save()
                    //                 }
                    //             })
                    //         res.json({msg: 'Order added'})
                    //     })
                })
        })
        .catch(() => {
            res.json({msg: 'User not found'})
        })
})

module.exports = router;
