pragma solidity >=0.5.0 <0.6.0;

import './common/Agent.sol';
import './common/ERC20.sol';

/**
 * @title Oil Token based on ERC20 token
 */
contract OilT is ERC20, Agent {

    string public name;
    string public symbol;

    uint public decimals = 8;

    /** Name and symbol were updated. */
    event UpdatedTokenInformation(string _name, string _symbol);

    constructor(string memory _name, string memory _symbol, uint _emission) public {
        name = _name;
        symbol = _symbol;

        // creating initial tokens
        mint (msg.sender, _emission*uint(10)**decimals);
    }

    /**
    * Minter Agent may issue new tokens
    */
    function mint(address _account, uint256 _amount) public onlyAgent returns (bool) {
        _mint(_account, _amount);
        return true;
    }

    /**
    * @dev Destroys `amount` tokens from the caller.
    */
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }

    /**
     * @dev See `ERC20._burnFrom`.
     */
    function burnFrom(address account, uint256 amount) public {
        _burnFrom(account, amount);
    }

    /**
    * Owner can update token information here.
    */
    function updateTokenInformation(string memory _name, string memory _symbol) public onlyOwner {
        name = _name;
        symbol = _symbol;
        emit UpdatedTokenInformation(_name, _symbol);
    }
}