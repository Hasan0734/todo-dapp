const { isAddress } = require("viem");

exports.validateAddress = (address) => isAddress(address);



