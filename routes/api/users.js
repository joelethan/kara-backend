import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import { autoPassword } from "../../validation/autoGenPass";
const Measurement = require("../../models/Measurement");
const Supply = require("../../models/Supply");
const passport = require("passport");

dotenv.config();

const router = express.Router();

// Load Input validations
const validateRegisterInput = require("../../validation/register");
const validateClientInput = require("../../validation/client");
const validateSupplierInput = require("../../validation/supplier");
const User = require("../../models/User");

router.get("/", (req, res) => res.json({ msg: "Users works" }));

// User registration
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) return res.status(400).json({ email: "Email already exists" });

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      role: req.body.role,
      gender: req.body.gender,
      active: req.body.active,
      contact: req.body.contact,
      password: req.body.password,
      nextOfKinName: req.body.nextOfKinName,
      nextOfKinContact: req.body.nextOfKinContact,
      nextOfKinAddress: req.body.nextOfKinAddress,
      nextOfKinRelation: req.body.nextOfKinRelation,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    // Check for user
    if (!user) return res.status(404).json({ User: "User not found" });

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // jwt payload
        const payload = {
          id: user.id,
          email: user.email,
        };
        // Generate token
        jwt.sign(
          payload,
          process.env.secret,
          { expiresIn: "1d" },
          (err, token) => {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        );
      } else {
        return res.status(404).json({ User: "User not found" });
      }
    });
  });
});

// Protected route
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      address: req.user.address,
      role: req.user.role,
      contact: req.user.contact,
      date: req.user.date,
    });
  }
);

// Protected route, Adding a Client
router.post(
  "/client",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Not admin" });
    // const { errors, isValid } = validateClientInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }

    let role = "client";

    User.findOne({ email: req.body.email }).then((user) => {
      // if (user) return res.status(400).json({ msg: "Email already exists" });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        role,
        contact: req.body.contact,
        password: autoPassword,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    });
  }
);

// Protected route, Getting a Client
router.get(
  "/client/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Not admin" });
    User.findById(req.params.id)
      .then((user) => {
        Measurement.findOne({ clientName: req.params.id }).then((item) => {
          let output = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            role: user.role,
            contact: user.contact,
            date: user.date,
          };
          if (item) {
            output = {
              ...output,
              top: {
                shoulder: item.shoulder,
                upperBust: item.upperBust,
                shoulder: item.shoulder,
                upperBust: item.upperBust,
                bust: item.bust,
                lowerBust: item.lowerBust,
                waist: item.waist,
                lowerWaist: item.lowerWaist,
                hips: item.hips,
                shoulderToUpperBust: item.shoulderToUpperBust,
                shoulderToBust: item.shoulderToBust,
                shoulderToLowerBust: item.shoulderToLowerBust,
                shoulderToWaist: item.shoulderToWaist,
                shoulderToLowerWaist: item.shoulderToLowerWaist,
                shoulderToHips: item.shoulderToHips,
              },
              sleeves: {
                shortSleeve: item.shortSleeve,
                threeQuarterSleeve: item.threeQuarterSleeve,
                fullLengthSleeve: item.fullLengthSleeve,
                circumferenceSleeve: item.circumferenceSleeve,
              },
              dress: {
                shortDressFull: item.shortDressFull,
                longDressFull: item.longDressFull,
                circumferenceDress: item.circumferenceDress,
              },
              skirt: {
                shortSkirtFull: item.shortSkirtFull,
                longSkirtFull: item.longSkirtFull,
              },
              trouser: {
                trouserThigh: item.trouserThigh,
                trouserFly: item.trouserFly,
                trouserLength: item.trouserLength,
                trouserBottomWidth: item.trouserBottomWidth,
              },
            };
          }
          return res.json(output);
        });
      })
      .catch(() => {
        res.json({ msg: "User not found" });
      });
  }
);

// Protected route, Adding a Supplier
router.post(
  "/supplier",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // const { errors, isValid } = validateSupplierInput(req.body);
    // if (!isValid) {
    //   return res.status(400).json(errors);
    // }
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Not admin" });
    let role = "supplier";

    User.findOne({ email: req.body.email }).then((user) => {
      // if (user) return res.status(400).json({ email: "Email already exists" });

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        role,
        contact: req.body.contact,
        password: autoPassword,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    });
  }
);

// Protected route, Getting a Supplier
router.get(
  "/supplier/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Not admin" });
    User.findById(req.params.id)
      .then((user) => {
        Supply.find({ nameOfSupplier: req.params.id }).then((supply) => {
          res.json({ user, supply });
        });
      })
      .catch(() => {
        res.json({ msg: "User not found" });
      });
  }
);

// Protected route, Getting all Users
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role !== "admin")
      return res.status(400).json({ msg: "Not admin" });
    User.find()
      .then((users) => {
        res.json(users);
      })
      .catch(() => {
        res.json({ msg: "User not found" });
      });
  }
);

// findOneAndUpdate()
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.role == !"admin")
      return res.status(400).json({ msg: "Not admin" });
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true },
      (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "An error has occurred" });
        }
        return res.json(user);
      }
    );
  }
);

module.exports = router;
