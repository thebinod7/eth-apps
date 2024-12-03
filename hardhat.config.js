/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const BASE_RPC_URL = process.env.BASE_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.27",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
    base: {
      url: BASE_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
