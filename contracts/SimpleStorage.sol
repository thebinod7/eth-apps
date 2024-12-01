//SPDX-License-Identifier: UNLICENSED
import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract SimpleStorage {
    uint256 public data;

    function store(uint256 _data) public {
        data = _data;
        console.log("Data stored", data);
    }

    function retrieve() public view returns (uint256) {
        return data;
    }
}
