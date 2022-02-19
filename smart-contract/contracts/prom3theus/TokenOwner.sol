// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "./LibToken.sol";

contract TokenOwner is Ownable, ReentrancyGuard {
  LibToken.Program program;

  constructor(
    uint256 _cost,
    uint256 _maxMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) {
    program = LibToken.initProgram(_cost, _maxMintAmountPerTx, _hiddenMetadataUri);
  }

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
