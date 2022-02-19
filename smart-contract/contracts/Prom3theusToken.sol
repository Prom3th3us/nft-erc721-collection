// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "./BaseToken.sol";

contract Prom3theusToken is BaseToken {
  mapping(address => bool) public whitelistClaimed;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _cost,
    uint256 _maxSupply,
    uint256 _maxMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) BaseToken(
    _tokenName, 
    _tokenSymbol,
    _maxSupply, 
    _cost, 
    _maxMintAmountPerTx, 
    _hiddenMetadataUri
  ) {
  }

  modifier mintCompliance(uint256 _mintAmount) {
    require(_mintAmount > 0 && _mintAmount <= maxMintAmountPerTx(), "Invalid mint amount!");
    require(totalSupply() + _mintAmount <= maxSupply(), "Max supply exceeded!");
    _;
  }

  modifier mintPriceCompliance(uint256 _mintAmount) {
    require(msg.value >= cost() * _mintAmount, "Insufficient funds!");
    _;
  }

  // @dev: PUBLICS
  function whitelistMint(
    uint256 _mintAmount,
    bytes32[] calldata _merkleProof
  ) public payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    // Verify whitelist requirements
    require(whitelistMintEnabled(), "The whitelist sale is not enabled!");
    require(!whitelistClaimed[msg.sender], "Address already claimed!");
    require(verifyMerkleProof(_merkleProof, msg.sender), "Invalid proof!");

    whitelistClaimed[msg.sender] = true;
    _mintLoop(msg.sender, _mintAmount);
  }

  function mint(
    uint256 _mintAmount
  ) public payable mintCompliance(_mintAmount) mintPriceCompliance(_mintAmount) {
    require(!paused(), "The contract is paused!");

    _mintLoop(msg.sender, _mintAmount);
  }
  
  function mintForAddress(
    uint256 _mintAmount,
    address _receiver
  ) public mintCompliance(_mintAmount) onlyOwner {
    _mintLoop(_receiver, _mintAmount);
  }

  // @dev: INTERNALS
  function _mintLoop(address _receiver, uint256 _mintAmount) internal {
    for (uint256 i = 0; i < _mintAmount; i++) {
      incrementSupply();
      _safeMint(_receiver, totalSupply());
    }
  }
}
