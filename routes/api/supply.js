import express from 'express';
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Supply = require("../../models/Supply");

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
                            res.json({msg: 'Supply added'})
                        })
                })
        })
        .catch(()=> {
            res.json({msg: 'User not found'})
        })
})

module.exports = router;
