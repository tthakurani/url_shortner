const router = require('express').Router();
const controller = require("./controller");

router.get("/", controller.getRecords);
router.post("/", controller.createRecord);
router.post("/bulk", controller.bulkCreate);
router.delete("/:shortPath", controller.deleteRecord);
router.get("/:shortPath", controller.getFullPath);
module.exports = router;