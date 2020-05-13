const router = require("express").Router();
const userRoutes = require("./users")
const gameRoutes = require("./games")
const FbUserRoutes = require("./fbuser")

router.use("/users", userRoutes)
router.use("/games", gameRoutes)
router.use("/fbuser", FbUserRoutes)

module.exports = router;