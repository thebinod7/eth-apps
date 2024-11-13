/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const RPC_NODE_URL = process.env.RPC_NODE_URL;
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.27",
  networks: {
    sepolia: {
      url: RPC_NODE_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};
