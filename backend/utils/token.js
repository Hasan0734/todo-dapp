const jwt = require("jsonwebtoken");

exports.generateToken = (data) => {
  const payload = {
    address: data,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });
  console.log({ token });
  return token;
};
