const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const CONTRACT_NAME = "Message";
const MY_MESSAGE = "Hello, World!";
const ANOTHER_MESSAGE = "Hello, Hardhat!";

describe("Message storage contract", function () {
  // Use fixture to use fresh setup everytime
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract(CONTRACT_NAME);
    await hardhatToken.waitForDeployment();

    return { hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should store a message", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      await hardhatToken.setMessage(MY_MESSAGE);
      expect(await hardhatToken.getMessage(owner.address)).to.equal(MY_MESSAGE);
    });

    it("should get a message", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      await hardhatToken.setMessage(ANOTHER_MESSAGE);
      expect(await hardhatToken.getMessage(owner.address)).to.equal(
        ANOTHER_MESSAGE
      );
    });
  });
});
