import express from "express";
import { json } from "body-parser";
const router = express.Router();
const passport = require("passport");
const User = require("../../models/User");
const Measurement = require("../../models/Measurement");

router.get("/", (req, res) => res.json({ msg: "Measurement works" }));

// Protected route, Adding measurements to a User
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin") return res.json({ msg: "seek previlages to log in as an admin" });
    Measurement.findOne({ clientName: req.params.id }).then((item) => {
      if (item) return res.json({ msg: "Customer already has measurements" });
      User.findById(req.params.id)
        .then(() => {
          const measurement = new Measurement({
            clientName: req.params.id,

            shoulder: req.body.shoulder,
            upperBust: req.body.upperBust,
            bust: req.body.bust,
            lowerBust: req.body.lowerBust,
            waist: req.body.waist,
            lowerWaist: req.body.lowerWaist,
            hips: req.body.hips,
            shoulderToUpperBust: req.body.shoulderToUpperBust,
            shoulderToBust: req.body.shoulderToBust,
            shoulderToLowerBust: req.body.shoulderToLowerBust,
            shoulderToWaist: req.body.shoulderToWaist,
            shoulderToLowerWaist: req.body.shoulderToLowerWaist,
            shoulderToHips: req.body.shoulderToHips,

            shortSleeve: req.body.shortSleeve,
            threeQuarterSleeve: req.body.threeQuarterSleeve,
            fullLengthSleeve: req.body.fullLengthSleeve,
            circumferenceSleeve: req.body.circumferenceSleeve,

            shortDressFull: req.body.shortDressFull,
            longDressFull: req.body.longDressFull,
            circumferenceDress: req.body.circumferenceDress,

            shortSkirtFull: req.body.shortSkirtFull,
            longSkirtFull: req.body.longSkirtFull,

            trouserThigh: req.body.trouserThigh,
            trouserFly: req.body.trouserFly,
            trouserLength: req.body.trouserLength,
            trouserBottomWidth: req.body.trouserBottomWidth,
          });
          measurement.save().then(() => {
            res.json({ msg: "New Customer Measurements added" });
          });
        })
        .catch(() => {
          res.json({ msg: "User not found" });
        });
    });
  }
);

module.exports = router;
