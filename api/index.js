const router = require('express').Router();
const recordRoutes = require("./record/route");
router.use('/r', recordRoutes);
module.exports = router;
