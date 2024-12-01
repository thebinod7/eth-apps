import "hardhat/console.sol";

pragma solidity ^0.8.0;

contract Message {
    mapping(address => string) public messages;

    function setMessage(string memory _message) public {
        messages[msg.sender] = _message;
    }

    function getMessage(address _user) public view returns (string memory) {
        return messages[_user];
    }
}
