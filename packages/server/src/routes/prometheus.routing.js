const router = require("express").Router();
const { client } = require("../utils/prometheus/metrics");


router.get("/", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

module.exports = router;