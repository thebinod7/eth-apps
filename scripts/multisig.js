const { network, artifacts } = require("hardhat");
const path = require("path");

const CONTRACT_NAME = "MultiSigWallet";

const OWNER_1 = "0xEb5D5b54eD994fF77F048322799f45ECf6CC46dF";
const OWNER_2 = "0x284A7f66B87Aa376E150b25e655c2B32c854a7d9";
const CONFIRMATIONS = 2;

async function main() {
  if (network.name === "hardhat") {
    console.warn("WARNING! You are trying to deploy a contract to the Hardhat");
  }

  const contract = await ethers.getContractFactory(CONTRACT_NAME);
  const contractData = await contract.deploy([OWNER_1, OWNER_2], CONFIRMATIONS);
  await contractData.waitForDeployment();
  console.log("Contract deployed to address:", contractData.target);
  saveContractABIs(contractData);
}

function saveContractABIs(contractData) {
  const fs = require("fs");
  const DIR = `build-${CONTRACT_NAME}`;
  const contractsDir = path.join(__dirname, "..", DIR);

  // 1. Create a directory to store the contract artifacts
  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

  // 2. Save the contract address to a JSON file
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ ContractAddress: contractData.target }, undefined, 2)
  );

  const contractArtifacts = artifacts.readArtifactSync(CONTRACT_NAME);

  // 3. Save the contract ABI to a JSON file
  fs.writeFileSync(
    path.join(contractsDir, `${CONTRACT_NAME}.json`),
    JSON.stringify(contractArtifacts, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
