const router = require("express").Router();

router.get("/", async(req,res) => {
    res.send("<h1>V Social Media Health</h1>")
});

module.exports = router;