import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract Wallet {
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        owner = msg.sender;
    }

    event Deposit(address indexed from, uint amount);
    event Withdraw(address indexed to, uint amount);

    function deposit() external payable {
        balances[owner] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Send balance from contract to owner address
    function withdraw(address payable recipient, uint amount) external {
        require(msg.sender == owner, "Not owner");
        require(address(this).balance >= amount, "Insufficient balance");
        balances[recipient] += amount;
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Transfer failed");
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
