const router = require("express").Router();
const userController = require("../../controllers/index");

router.route("/").get(userController.findAll)

router
    .route("/:id")
    .get(userController.findById)
    .put(userController.update)
    .delete(userController.remove)
    

module.exports = router;