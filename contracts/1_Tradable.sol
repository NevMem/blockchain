// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Tradable is ERC20 {

    uint256 public _wei_rate;
    address public _owner_address;

    constructor(
        string memory full_name,
        string memory symbol,
        uint256 wei_rate_,
        uint256 initial_supply
    ) ERC20(full_name, symbol) {
        _wei_rate = wei_rate_;
        _owner_address = msg.sender;

        _mint(_owner_address, initial_supply);
        _approve(_owner_address, _owner_address, balanceOf(_owner_address));
    }

    function wei_rate() public view returns (uint256) {
        return _wei_rate;
    }

    function owner_address() public view returns (address) {
        return _owner_address;
    }

    function emitMoreTokens(uint256 amount) public returns (bool) {
        require(msg.sender == _owner_address, "Only owner can emit new tokens");
        _mint(_owner_address, amount);
        _approve(_owner_address, _owner_address, balanceOf(_owner_address));
        return true;
    }

    function buyTokens(uint256 amount) public payable {
        require(msg.value >= _wei_rate * amount, "Not enough Ether to buy tokens");

        (bool sent, ) = payable(_owner_address).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        bool success = transferFrom(_owner_address, msg.sender, amount);
        require(success, "Failed to send Tokens");
    }
}
