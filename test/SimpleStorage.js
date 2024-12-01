const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const CONTRACT_NAME = "SimpleStorage";
const STORE_VALUE = 50;
const RETRIVE_VALUE = 100;

describe("Simple storage contract", function () {
  // Use fixture to use fresh setup everytime
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract(CONTRACT_NAME);
    await hardhatToken.waitForDeployment();

    return { hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should store a value", async function () {
      const { hardhatToken } = await loadFixture(deployTokenFixture);
      await hardhatToken.store(STORE_VALUE);
      expect(await hardhatToken.data()).to.equal(STORE_VALUE);
    });

    it("should retrieve a value", async function () {
      const { hardhatToken } = await loadFixture(deployTokenFixture);
      await hardhatToken.store(RETRIVE_VALUE);
      expect(await hardhatToken.retrieve()).to.equal(RETRIVE_VALUE);
    });
  });
});
