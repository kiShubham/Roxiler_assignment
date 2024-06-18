const router = require("express").Router();
const controller = require("../controllers/transaction.controller");

// //initialization phase ;
router.get("/", controller.initialize);
router.get("/all", controller.fetchAll);
router.get("/stats", controller.getStats);
router.get("/bChart", controller.getBarChartDetails);
router.get("/pChart", controller.getPieChartDetails);
router.get("/figures", controller.getFigures);
//page and search are query param
/*
router.get("/statistics", "contoller.statistics");
router.get("/bChart", "contoller.barchart");
router.get("/pChart", "contoller.piechart");
router.get("/figures", "contoller.statics+charts");
 */

module.exports = router;
