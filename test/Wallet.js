const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

const CONTRACT_NAME = "Wallet";
const DEPOSIT_AMT = 10;

describe.only("Wallet contract", function () {
  // Use fixture to use fresh setup everytime
  async function deployTokenFixture() {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const hardhatToken = await ethers.deployContract(CONTRACT_NAME);
    await hardhatToken.waitForDeployment();

    return { hardhatToken, owner, addr1, addr2 };
  }

  describe("Deployment", function () {
    it("Should be deployed by owner", async function () {
      const { hardhatToken, owner } = await loadFixture(deployTokenFixture);
      expect(await hardhatToken.owner()).to.equal(owner.address);
    });

    it("should deposit an amount", async function () {
      const { hardhatToken, owner, addr1 } = await loadFixture(
        deployTokenFixture
      );
      const connectedContract = hardhatToken.connect(addr1);
      await connectedContract.deposit({ value: DEPOSIT_AMT });

      expect(await connectedContract.balanceOf(owner.address)).to.equal(
        DEPOSIT_AMT
      );
    });

    it("should withdraw balance to given address", async function () {
      const { hardhatToken, addr1, addr2 } = await loadFixture(
        deployTokenFixture
      );
      const connectedContract = hardhatToken.connect(addr1);
      await connectedContract.deposit({ value: DEPOSIT_AMT });

      await hardhatToken.withdraw(addr2.address, DEPOSIT_AMT);
      expect(await hardhatToken.balanceOf(addr2.address)).to.equal(10);
    });

    it("should deposit balance with [Deposit] event", async function () {
      const { hardhatToken, addr1 } = await loadFixture(deployTokenFixture);
      const connectedContract = hardhatToken.connect(addr1);
      await expect(connectedContract.deposit({ value: DEPOSIT_AMT }))
        .to.emit(connectedContract, "Deposit")
        .withArgs(addr1.address, DEPOSIT_AMT);
    });
  });
});
