// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22;

import "./1_Tradable.sol";

contract TokenFactory {
    mapping(string => uint) all_tokens_indices_by_symbol;
    ERC20Tradable[] all_tokens;
    uint OFFSET = 1;

    function createNewToken(
        string memory full_name,
        string memory symbol,
        uint256 rate,
        uint256 initial_supply
    ) public {
        require(all_tokens_indices_by_symbol[symbol] == 0, "Token with this symbol already exists");

        ERC20Tradable newToken = new ERC20Tradable(full_name, symbol, rate, initial_supply);
        all_tokens[all_tokens.length + OFFSET] = newToken;
        all_tokens_indices_by_symbol[symbol] = all_tokens.length;
    }

    function getTokensCount() public view returns (uint) {
        return all_tokens.length - OFFSET;
    }

    function getTokenInfo(ERC20Tradable token)
        public view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            address
        ) {
        uint256 owner_balance = token.balanceOf(token.owner_address);
        return (
            token.name(),
            token.symbol(),
            token.wei_rate,
            owner_balance,
            token.owner_address
        );
    }

    function getTokenInfoByIndex(uint256 index)
        public view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            address
        ) {
        require(index < all_tokens.length, "Invalid index");
        return getTokenInfo(all_tokens[index + OFFSET]);
    }

    function getTokenInfoBySymbol(string memory symbol)
        public view
        returns (
            string memory,
            string memory,
            uint256,
            uint256,
            address
        ) {
        uint token_index = all_tokens_indices_by_symbol[symbol];
        require(token_index != 0, "Token with this symbol does not exists");
        return getTokenInfoByIndex(token_index);
    }

    function emitMoreTokensForSymbol(string memory symbol, uint256 amount)
        public returns (bool) {
        
        uint token_index = all_tokens_indices_by_symbol[symbol];
        require(token_index != 0, "Token with this symbol does not exists");

        return all_tokens[token_index].emitMoreTokens(amount);
    }

    function buyTokensBySymbol(string memory symbol, uint256 amount) public payable {
        
        uint token_index = all_tokens_indices_by_symbol[symbol];
        require(token_index != 0, "Token with this symbol does not exists");

        all_tokens[token_index].buyTokens(amount);
    }
}