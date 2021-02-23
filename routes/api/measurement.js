import express from "express";
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
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    Measurement.findOne({ clientName: req.params.id }).then((item) => {
      if (item) return res.json({ msg: "User already has measurements" });
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
            bodiceCut: req.body.bodiceCut,
            topFullLength: req.body.topFullLength,
            waistCut: req.body.waistCut,

            shortSleeve: req.body.shortSleeve,
            threeQuarterSleeve: req.body.threeQuarterSleeve,
            fullLengthSleeve: req.body.fullLengthSleeve,
            circumferenceSleeve: req.body.circumferenceSleeve,
            capSleeve: req.body.capSleeve,

            shortDressFull: req.body.shortDressFull,
            longDressFull: req.body.longDressFull,
            circumferenceDress: req.body.circumferenceDress,

            shortSkirtFull: req.body.shortSkirtFull,
            longSkirtFull: req.body.longSkirtFull,
            skirtSlitLength: req.body.skirtSlitLength,

            trouserThigh: req.body.trouserThigh,
            trouserFly: req.body.trouserFly,
            trouserLength: req.body.trouserLength,
            trouserBottomWidth: req.body.trouserBottomWidth,
            trouserWaist: req.body.trouserWaist,
            trouserHips: req.body.trouserHips,
          });
          measurement.save().then((data) => {
            res.json({ msg: "Measurements added", data });
          });
        })
        .catch(() => {
          res.json({ msg: "User not found" });
        });
    });
  }
);

// Protected route, Getting all User measurements
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    Measurement.find()
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
    Measurement.findOneAndUpdate(
      { _id: req.params.Id },
      req.body,
      { new: true },
      (err, measurement) => {
        if (err) {
          return res.status(400).json({ msg: "An error has occurred" });
        }
        return res.json(measurement);
      }
    );
  }
);

module.exports = router;
