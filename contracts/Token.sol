//SPDX-License-Identifier: UNLICENSED
import "hardhat/console.sol";

pragma solidity ^0.8.0;


// This is the main building block for smart contracts.
contract Token {
    string public name = "My Hardhat Token";
    string public symbol = "MHT";

    uint256 public totalSupply = 1000000;
    address public owner;

    // A mapping is a key/value map. Here we store each account's balance.
    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

  
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    //  External: Only call from outside the contract
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        console.log(
        "Transferring from %s to %s %s tokens",
        msg.sender,
        to,
        amount);

        balances[msg.sender] -= amount;
        balances[to] += amount;

        // Notify off-chain applications of the transfer.
        emit Transfer(msg.sender, to, amount);
    }

// View only returns data, does not modify the contract state
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}