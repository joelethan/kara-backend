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
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
        User.findOne({_id: req.params.userId})
            .then(user => {
                if(!user) return res.json({msg: 'User not found'})
                const order = new Order({
                    clientId: user._id,
                    clientName: user.firstName + " " + user.lastName,
                    assignedTailor: req.body.assignedTailor,
                    orderDetails: req.body.orderDetails,
                    orderDescription: req.body.orderDescription,
                    orderDate: req.body.orderDate,
                    dueDate: req.body.dueDate,
                })
                order.save()
                    .then(() => {
                        res.json({order})
                    })
            })
            .catch(() => {
                res.json({msg: 'User not found'})
            })
})

// Protected route, Adding Order
router.put("/express", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
    console.log('object', 'object')
    const order = new Order({
        clientName: req.body.clientName,
        assignedTailor: req.body.assignedTailor,
        orderDetails: req.body.orderDetails,
        orderDescription: req.body.orderDescription,
        amountCleared: req.body.amountCleared,
        orderDate: req.body.orderDate,
        dueDate: req.body.dueDate,
        status: "Completed",
    })
    order.save()
        .then(() => {
            res.json({order})
        })
})

// Protected route, Getting all User Orders
router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
    Order.find()
        .then(item => {
            return res.json(item.reverse())})
        .catch(()=> {
            res.json({msg: 'Not found'})
        })
})

// findOneAndUpdate()
router.put("/:orderId", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
    Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true}, (err, order) => {
        if (err) {
            return res.status(400).json({ msg: "An error has occured" })
        }
        return res.json(order)
    })
})

module.exports = router;
