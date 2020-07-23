import express from 'express';
const router = express.Router();

router.get('/', (req, res) => res.json({msg: "Supplies works"}));

module.exports = router;
