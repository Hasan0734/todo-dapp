const { verifyMessage } = require("viem");
const { validateAddress } = require("../utils/helper");
const { parseSiweMessage } = require("viem/siwe");
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

    //prev
    // const SIWEObject = parseSiweMessage(message);

    // const valid = await verifyMessage({
    //   address: req.session.address,
    //   message: message,
    //   signature,
    // });

    // if (SIWEObject.nonce !== req.session.nonce) {
    //   throw new Error("Invalid nonce");
    // }

    // if (!valid) {
    //   throw new Error("Invalid signature");
    // }
    // req.session.siwe = sdfdfs;
    // req.session.save(() => res.status(200).send(req.session.nonce));

    // res.send(`Username: ${username}, Logged In: ${loggedIn} and ${req.session.nonce}`);

    // console.log({
    //   match: recoveredAddress.toLowerCase() !== address.toLowerCase(),
    // });

    // if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
    //   throw new Error("Invalid signature");
    // }

    // // Clear the used nonce
    // delete nonces[address];

    // const token = generateToken(address);
    // console.log({ token });
    // res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    req.session.siwe = null;
    req.session.nonce = null;
    return res.status(500).json({ error: "Internal server error" });
  }
};
