// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/utils/Strings.sol";

pragma solidity >=0.8.9 <0.9.0;

library LibToken {
  using Strings for uint256;

  struct Program {
    // proof
    bytes32 merkleRoot;
    // metadata
    string uriPrefix;
    string uriSuffix;
    string hiddenMetadataUri;
    // price
    uint256 cost;
    uint256 maxMintAmountPerTx;
    // flags
    bool paused;
    bool whitelistMintEnabled;
    bool revealed;
  }
  
  function defaultProgram() pure  internal returns (Program memory) {
    Program memory program;
    program.uriPrefix = "";
    program.uriSuffix = ".json";
    program.paused = true;
    return program;
  }
  
  function initProgram(
    uint256 _cost,
    uint256 _maxMintAmountPerTx,
    string memory _hiddenMetadataUri
  ) internal pure returns (Program memory) {
    Program memory program;
    program.cost = _cost;
    program.maxMintAmountPerTx = _maxMintAmountPerTx;
    program.hiddenMetadataUri = _hiddenMetadataUri;
    return program;
  }

  function tokenURI(
    Program storage program,
    uint256 _tokenId
  ) internal view returns (string memory) {
    if (program.revealed == false) {
      return program.hiddenMetadataUri;
    }

    string memory currentBaseURI = program.uriPrefix;
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, _tokenId.toString(), program.uriSuffix))
        : "";
  }
}