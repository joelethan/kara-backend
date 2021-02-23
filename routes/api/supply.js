import express from "express";
const router = express.Router();
const passport = require("passport");
const Supply = require("../../models/Supply");

router.get("/", (req, res) => res.json({ msg: "Supplies works" }));

// Protected route, Adding Supply
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    const supply = new Supply({
      nameOfSupplier: req.body.nameOfSupplier,
      email: req.body.email,
      contact: req.body.contact,
      address: req.body.address,
      supplyDetails: req.body.supplyDetails,
      paymentMethod: req.body.paymentMethod,
      date: req.body.date,
    });
    supply.save().then((supply) => {
      res.json({ msg: "Supply added", supply });
    });
  }
);

// Protected route, Getting all User Suppliers
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    Supply.find()
      .then((item) => {
        if (item) return res.json(item);
      })
      .catch(() => {
        res.json({ msg: "Not found" });
      });
  }
);

// findOneAndUpdate()
router.put(
  "/:Id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    Supply.findOneAndUpdate(
      { _id: req.params.Id },
      req.body,
      { new: true },
      (err, order) => {
        if (err) {
          return res.status(400).json({ msg: "An error has occurred" });
        }
        return res.json(order);
      }
    );
  }
);

module.exports = router;
