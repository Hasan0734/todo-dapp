const mongoose = require("mongoose");

// Ethereum address regex (validates basic structure of Ethereum addresses)
const isValidEthereumAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

// Ethereum transaction hash regex (validates structure of transaction hashes)
const isValidTransactionHash = (hash) => /^0x([A-Fa-f0-9]{64})$/.test(hash);

const transactionSchema = new mongoose.Schema({
  hash: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: isValidTransactionHash,
      message: `Is not a valid Ethereum transaction hash.`,
    },
  },
  from: {
    type: String,
    required: true,
    validate: {
      validator: isValidEthereumAddress,
      message: `Is not a valid Ethereum address.`,
    },
  },
  to: {
    type: String,
    required: true,
    validate: {
      validator: isValidEthereumAddress,
      message: `Is not a valid Ethereum address.`,
    },
  },
  // value: {
  //   type: String,
  //   required: true,
  //   validate: {
  //     validator: (value) => {
  //       try {
  //         const bigNumberValue = BigInt(value); // Ensure the value is a valid BigInt (used for WEI)
  //         return bigNumberValue >= 0; // Value should be non-negative
  //       } catch {
  //         return false; // Not a valid number
  //       }
  //     },
  //     message: (props) =>
  //       `${props.value} is not a valid Ethereum transaction value.`,
  //   },
  // },
  gasUsed: {
    type: String,
    validate: {
      validator: (value) => {
        try {
          const gasUsed = BigInt(value); // Validate as BigInt
          return gasUsed >= 0; // Gas used should be non-negative
        } catch {
          return false; // Not a valid number
        }
      },
      message: (props) => `${props.value} is not a valid gas value.`,
    },
  },
  blockNumber: {
    type: Number,
    unique: true,
    required: true,
    min: [0, "Block number must be a non-negative integer."],
  },
  functionName: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
