const router = require("express").Router();
const userController = require("../../controllers/index");

router.route("/").get(userController.findAll)

module.exports = router;