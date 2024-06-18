const router = require("express").Router();
const controller = require("../controllers/transaction.controller");

router.get("/", controller.initialize);
router.get("/all", controller.fetchAll);
router.get("/stats", controller.getStats);
router.get("/bChart", controller.getBarChartDetails);
router.get("/pChart", controller.getPieChartDetails);
router.get("/figures", controller.getFigures);

module.exports = router;
