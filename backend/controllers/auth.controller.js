const { validateAddress } = require("../utils/helper");
const { generateNonce, SiweMessage } = require("siwe");

exports.getNonce = async (req, res) => {
  const { address } = req.body;

  if (!validateAddress(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }
  req.session.nonce = generateNonce();
  await req.session.save();
  res.setHeader("Content-Type", "text/plain");
  res.send(req.session.nonce);
};

exports.getVerify = async (req, res) => {
  const { address, signature, message } = req.body;

  if (!validateAddress(address)) {
    return res.status(400).json({ error: "Invalid address" });
  }
  try {
    if (!message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    const siweMessage = new SiweMessage(message);
    const fields = await siweMessage.verify({ signature });

    if (fields.data.nonce !== req.session.nonce)
      return res.status(422).json({ message: "Invalid nonce." });

    req.session.siwe = fields;
    await req.session.save();
    res.json({ ok: true });
  } catch (e) {
    console.log(e);
    req.session.siwe = null;
    req.session.nonce = null;
    return res.status(500).json({ error: "Internal server error" });
  }
};
