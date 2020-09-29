import express from 'express';
const router = express.Router();
const passport = require("passport");
const Supply = require("../../models/Supply");

router.get('/', (req, res) => res.json({msg: "Supplies works"}));

// Protected route, Adding Supply
router.post("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
    const supply = new Supply({
        nameOfSupplier: req.body.nameOfSupplier,
        supplyDetails: req.body.supplyDetails,
        paymentMethod: req.body.paymentMethod
    })
    supply.save()
        .then(supply=>{
            res.json({msg: 'Supply added',supply})
        })
})

// Protected route, Getting all User Suppliers
router.get("/all", passport.authenticate("jwt", { session: false }), (req, res) => {
    if (req.user.role == !"admin") return res.status(400).json({ msg: "Not admin" });
    Supply.find()
        .then(item => {
            if (item) return res.json(item)})
        .catch(()=> {
            res.json({msg: 'Not found'})
        })
})

module.exports = router;
