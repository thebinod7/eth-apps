const { network, artifacts } = require("hardhat");
const path = require("path");

const CONTRACT_NAME = "Wallet";

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
  console.log("Deployer address=>", deployer.address);

  const contract = await ethers.getContractFactory(CONTRACT_NAME);
  const contractData = await contract.deploy();

  saveContractABIs(contractData);
}

function saveContractABIs(contractData) {
  const fs = require("fs");
  const DIR = `build-${CONTRACT_NAME}`;
  console.log("Saving contract artifacts to ", DIR);
  const contractsDir = path.join(__dirname, "..", DIR);

  // 1. Create a directory to store the contract artifacts
  if (!fs.existsSync(contractsDir)) fs.mkdirSync(contractsDir);

  // 2. Save the contract address to a JSON file
  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify(
      { ContractAddress: contractData.runner.address },
      undefined,
      2
    )
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
