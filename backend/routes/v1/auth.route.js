const express = require("express");
const { getNonce, getVerify } = require("../../controllers/auth.controller");
const router = express.Router();

router.post("/nonce", getNonce);
router.post("/verify", getVerify);

router.get("/me", (req, res) => {
  res.send({ address: req.session.siwe?.data.address });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send({ ok: true });
});

module.exports = router;
