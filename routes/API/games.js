const router = require("express").Router();
const userController = require("../../controllers/index");

router.route("/").get(userController.getSavedGames).post(userController.postSavedGames);

module.exports = router;