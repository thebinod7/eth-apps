const hre = require("hardhat");
const path = require("path");

const { network, artifacts } = hre;
const CONTRACT_NAME = "SimpleStorage";

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "WARNING! You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log("Deployer wallet address:", deployer.address);

  const contractData = await ethers.deployContract(CONTRACT_NAME, []);
  await contractData.waitForDeployment();
  const contractAddr = contractData.target;

  saveContractABIs(contractData, contractAddr);
}

function saveContractABIs(contractData, contractAddr) {
  const fs = require("fs");
  const DIR = `build-${CONTRACT_NAME}`;
  console.log("Saving contract artifacts to...", DIR);
  const contractsDir = path.join(__dirname, "..", DIR);

  // 1. Create a directory to store the contract artifacts
  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

  // 2. Save the contract address to a JSON file
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ ContractAddress: contractAddr }, undefined, 2)
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
