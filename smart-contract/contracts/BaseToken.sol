// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./LibToken.sol";

// @TODO: replace Ownable for AccessControl if needed
abstract contract BaseToken is ERC721, Ownable, ReentrancyGuard {
  using Counters for Counters.Counter;
  using LibToken for LibToken.Program;

  LibToken.Program private program;

  constructor(
    string memory _tokenName,
    string memory _tokenSymbol,
    uint256 _maxSupply,
    uint256 _cost,
    uint256 _maxMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) ERC721(_tokenName, _tokenSymbol) {
    program = LibToken.initProgram(
      _maxSupply, _cost, _maxMintAmountPerTx, _hiddenMetadataUri
    );
  }

  // @dev: OVERRIDES
  function tokenURI(
    uint256 _tokenId
  ) public view virtual override returns (string memory) {
    require(_exists(_tokenId), "ERC721Metadata: URI query for nonexistent token");
    return program.tokenURI(_tokenId);
  }

  function _baseURI() internal view virtual override returns (string memory) {
    return program.uriPrefix;
  }

  // @dev: PUBLIC VIEWS
  function totalSupply() public view returns (uint256) {
    return program.supply.current();
  }

  function cost() public view returns (uint256) {
    return program.cost;
  }
  
  function maxSupply() public view returns (uint256) {
    return program.maxSupply;
  }

  function paused() public view returns (bool) {
    return program.paused;
  }

  function maxMintAmountPerTx() public view returns (uint256) {
    return program.maxMintAmountPerTx;
  }

  function hiddenMetadataUri() public view returns (string memory) {
    return program.hiddenMetadataUri;
  }

  function whitelistMintEnabled() public view returns (bool) {
    return program.whitelistMintEnabled;
  }

  function revealed() public view returns (bool) {
    return program.revealed;
  }

  function walletOfOwner(address _owner) public view returns (uint256[] memory) {
    uint256 ownerTokenCount = balanceOf(_owner);
    uint256[] memory ownedTokenIds = new uint256[](ownerTokenCount);
    uint256 currentTokenId = 1;
    uint256 ownedTokenIndex = 0;

    while (ownedTokenIndex < ownerTokenCount && currentTokenId <= program.maxSupply) {
      address currentTokenOwner = ownerOf(currentTokenId);
      if (currentTokenOwner == _owner) {
        ownedTokenIds[ownedTokenIndex] = currentTokenId;
        ownedTokenIndex++;
      }
      currentTokenId++;
    }
    return ownedTokenIds;
  }

  // @dev: INTERNAL VIEWS
  function verifyMerkleProof(
    bytes32[] calldata _merkleProof,
    address caller
  ) internal view returns (bool) {
    return program.verifyMerkleProof(_merkleProof, caller);
  }

  // @dev: INTERNAL STATE CHANGES
  function incrementSupply() internal {
    program.supply.increment();
  }

  // @dev: PUBLIC OWNERS
  function setRevealed(bool _state) public onlyOwner {
    program.revealed = _state;
  }

  function setCost(uint256 _cost) public onlyOwner {
    program.cost = _cost;
  }

  function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx) public onlyOwner {
    program.maxMintAmountPerTx = _maxMintAmountPerTx;
  }

  function setHiddenMetadataUri(string memory _hiddenMetadataUri) public onlyOwner {
    program.hiddenMetadataUri = _hiddenMetadataUri;
  }

  function setUriPrefix(string memory _uriPrefix) public onlyOwner {
    program.uriPrefix = _uriPrefix;
  }

  function setUriSuffix(string memory _uriSuffix) public onlyOwner {
    program.uriSuffix = _uriSuffix;
  }

  function setPaused(bool _state) public onlyOwner {
    program.paused = _state;
  }

  function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
    program.merkleRoot = _merkleRoot;
  }

  function setWhitelistMintEnabled(bool _state) public onlyOwner {
    program.whitelistMintEnabled = _state;
  }

  // @TODO: create wallet abstraction
  // @TODO: check _owner.transfer(address(this).balance) OR _owner.sendValue(address(this).balance)
  function withdraw() public onlyOwner nonReentrant {
    // This will pay Prom3theus Lab Team 5% of the initial sale.
    // By leaving the following lines as they are you will contribute to the
    // development of tools like this and many others.
    // =============================================================================
    (bool hs, ) = payable(0x146FB9c3b2C13BA88c6945A759EbFa95127486F4).call{
      value: address(this).balance * 5 / 100
    }("");
    require(hs);
    // =============================================================================

    // This will transfer the remaining contract balance to the owner.
    // Do not remove this otherwise you will not be able to withdraw the funds.
    // =============================================================================
    (bool os, ) = payable(owner()).call{
      value: address(this).balance
    }("");
    require(os);
    // =============================================================================
  }
}
