/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  Overrides,
  BigNumberish,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Prom3theusToken,
  Prom3theusTokenInterface,
} from "../Prom3theusToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_tokenName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_tokenSymbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_cost",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSupply",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTx",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_hiddenMetadataUri",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cost",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hiddenMetadataUri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxMintAmountPerTx",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "mintForAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revealed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_cost",
        type: "uint256",
      },
    ],
    name: "setCost",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_hiddenMetadataUri",
        type: "string",
      },
    ],
    name: "setHiddenMetadataUri",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxMintAmountPerTx",
        type: "uint256",
      },
    ],
    name: "setMaxMintAmountPerTx",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_merkleRoot",
        type: "bytes32",
      },
    ],
    name: "setMerkleRoot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setRevealed",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uriPrefix",
        type: "string",
      },
    ],
    name: "setUriPrefix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uriSuffix",
        type: "string",
      },
    ],
    name: "setUriSuffix",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_state",
        type: "bool",
      },
    ],
    name: "setWhitelistMintEnabled",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "walletOfOwner",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "whitelistClaimed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_mintAmount",
        type: "uint256",
      },
      {
        internalType: "bytes32[]",
        name: "_merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "whitelistMint",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "whitelistMintEnabled",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x6080604052601280546001600160a01b03191673de3b22caaad25e65c839c2a3d852d665669edd5c1790553480156200003757600080fd5b5060405162002e9d38038062002e9d8339810160408190526200005a916200046d565b858584868585858581600090805190602001906200007a9291906200028a565b508051620000909060019060208401906200028a565b505050620000ad620000a7620001ae60201b60201c565b620001b2565b6001600781905550620000ce848484846200020460201b620015481760201c565b80516008908155602080830151516009556040830151600a5560608301518051620000fe92600b9201906200028a565b50608082015180516200011c9160048401916020909101906200028a565b5060a082015180516200013a9160058401916020909101906200028a565b5060c0820151600682015560e0820151600782015561010080830151600890920180546101208501516101409095015161ffff1990911693151561ff001916939093179315159091029290921762ff00001916620100009115159190910217905550620005579a5050505050505050505050565b3390565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6200020e62000319565b60006200021a62000234565b958652505060c084019290925260e083015260a082015290565b6200023e62000319565b6200024862000319565b604080516020808201835260008252606084019190915281518083019092526005825264173539b7b760d91b9082015260808201526001610100820152919050565b82805462000298906200051a565b90600052602060002090601f016020900481019282620002bc576000855562000307565b82601f10620002d757805160ff191683800117855562000307565b8280016001018555821562000307579182015b8281111562000307578251825591602001919060010190620002ea565b506200031592915062000389565b5090565b60405180610160016040528060008152602001620003436040518060200160405280600081525090565b8152600060208201819052606060408301819052808301819052608083015260a0820181905260c0820181905260e0820181905261010082018190526101209091015290565b5b808211156200031557600081556001016200038a565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620003c857600080fd5b81516001600160401b0380821115620003e557620003e5620003a0565b604051601f8301601f19908116603f01168101908282118183101715620004105762000410620003a0565b816040528381526020925086838588010111156200042d57600080fd5b600091505b8382101562000451578582018301518183018401529082019062000432565b83821115620004635760008385830101525b9695505050505050565b60008060008060008060c087890312156200048757600080fd5b86516001600160401b03808211156200049f57600080fd5b620004ad8a838b01620003b6565b97506020890151915080821115620004c457600080fd5b620004d28a838b01620003b6565b965060408901519550606089015194506080890151935060a0890151915080821115620004fe57600080fd5b506200050d89828a01620003b6565b9150509295509295509295565b600181811c908216806200052f57607f821691505b602082108114156200055157634e487b7160e01b600052602260045260246000fd5b50919050565b61293680620005676000396000f3fe6080604052600436106102305760003560e01c8063715018a61161012e578063b767a098116100ab578063db4bec441161006f578063db4bec441461063c578063e0a808531461066c578063e985e9c51461068c578063efbd73f4146106ac578063f2fde38b146106cc57600080fd5b8063b767a098146105b4578063b88d4fde146105d4578063c87b56dd146105f4578063d2cab05614610614578063d5abeb011461062757600080fd5b806395d89b41116100f257806395d89b4114610537578063a0712d681461054c578063a22cb4651461055f578063a45ba8e71461057f578063b071401b1461059457600080fd5b8063715018a6146104af5780637cb64759146104c45780637ec4a659146104e45780638da5cb5b1461050457806394354fd01461052257600080fd5b80633ccfd60b116101bc5780635183022711610180578063518302271461041c5780635c975abb1461043a5780636352211e146104525780636caede3d1461047257806370a082311461048f57600080fd5b80633ccfd60b1461037a57806342842e0e1461038f578063438b6300146103af57806344a0d68a146103dc5780634fdd43cb146103fc57600080fd5b806313faede61161020357806313faede6146102e657806316ba10e01461030557806316c38b3c1461032557806318160ddd1461034557806323b872dd1461035a57600080fd5b806301ffc9a71461023557806306fdde031461026a578063081812fc1461028c578063095ea7b3146102c4575b600080fd5b34801561024157600080fd5b506102556102503660046121a6565b6106ec565b60405190151581526020015b60405180910390f35b34801561027657600080fd5b5061027f61073e565b6040516102619190612222565b34801561029857600080fd5b506102ac6102a7366004612235565b6107d0565b6040516001600160a01b039091168152602001610261565b3480156102d057600080fd5b506102e46102df36600461226a565b61086a565b005b3480156102f257600080fd5b50600e545b604051908152602001610261565b34801561031157600080fd5b506102e4610320366004612320565b610980565b34801561033157600080fd5b506102e4610340366004612379565b6109c1565b34801561035157600080fd5b506102f76109fe565b34801561036657600080fd5b506102e4610375366004612394565b610a0e565b34801561038657600080fd5b506102e4610a3f565b34801561039b57600080fd5b506102e46103aa366004612394565b610bb8565b3480156103bb57600080fd5b506103cf6103ca3660046123d0565b610bd3565b60405161026191906123eb565b3480156103e857600080fd5b506102e46103f7366004612235565b610cb4565b34801561040857600080fd5b506102e4610417366004612320565b610ce3565b34801561042857600080fd5b5060105462010000900460ff16610255565b34801561044657600080fd5b5060105460ff16610255565b34801561045e57600080fd5b506102ac61046d366004612235565b610d20565b34801561047e57600080fd5b50601054610100900460ff16610255565b34801561049b57600080fd5b506102f76104aa3660046123d0565b610d97565b3480156104bb57600080fd5b506102e4610e1e565b3480156104d057600080fd5b506102e46104df366004612235565b610e54565b3480156104f057600080fd5b506102e46104ff366004612320565b610e83565b34801561051057600080fd5b506006546001600160a01b03166102ac565b34801561052e57600080fd5b50600f546102f7565b34801561054357600080fd5b5061027f610ec0565b6102e461055a366004612235565b610ecf565b34801561056b57600080fd5b506102e461057a36600461242f565b611064565b34801561058b57600080fd5b5061027f61106f565b3480156105a057600080fd5b506102e46105af366004612235565b611081565b3480156105c057600080fd5b506102e46105cf366004612379565b6110b0565b3480156105e057600080fd5b506102e46105ef366004612462565b6110f4565b34801561060057600080fd5b5061027f61060f366004612235565b611126565b6102e46106223660046124de565b6111b0565b34801561063357600080fd5b506008546102f7565b34801561064857600080fd5b506102556106573660046123d0565b60116020526000908152604090205460ff1681565b34801561067857600080fd5b506102e4610687366004612379565b6113a2565b34801561069857600080fd5b506102556106a736600461255d565b6113e8565b3480156106b857600080fd5b506102e46106c7366004612587565b611416565b3480156106d857600080fd5b506102e46106e73660046123d0565b6114ad565b60006001600160e01b031982166380ac58cd60e01b148061071d57506001600160e01b03198216635b5e139f60e01b145b8061073857506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461074d906125aa565b80601f0160208091040260200160405190810160405280929190818152602001828054610779906125aa565b80156107c65780601f1061079b576101008083540402835291602001916107c6565b820191906000526020600020905b8154815290600101906020018083116107a957829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b031661084e5760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061087582610d20565b9050806001600160a01b0316836001600160a01b031614156108e35760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b6064820152608401610845565b336001600160a01b03821614806108ff57506108ff81336113e8565b6109715760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c00000000000000006064820152608401610845565b61097b838361157e565b505050565b6006546001600160a01b031633146109aa5760405162461bcd60e51b8152600401610845906125e5565b80516109bd90600c906020840190612088565b5050565b6006546001600160a01b031633146109eb5760405162461bcd60e51b8152600401610845906125e5565b6010805460ff1916911515919091179055565b6000610a0960095490565b905090565b610a1833826115ec565b610a345760405162461bcd60e51b81526004016108459061261a565b61097b8383836116bb565b6006546001600160a01b03163314610a695760405162461bcd60e51b8152600401610845906125e5565b60026007541415610abc5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610845565b6002600755600073146fb9c3b2c13ba88c6945a759ebfa95127486f46064610ae5476005612681565b610aef91906126b6565b604051600081818185875af1925050503d8060008114610b2b576040519150601f19603f3d011682016040523d82523d6000602084013e610b30565b606091505b5050905080610b3e57600080fd5b6000610b526006546001600160a01b031690565b6001600160a01b03164760405160006040518083038185875af1925050503d8060008114610b9c576040519150601f19603f3d011682016040523d82523d6000602084013e610ba1565b606091505b5050905080610baf57600080fd5b50506001600755565b61097b838383604051806020016040528060008152506110f4565b60606000610be083610d97565b905060008167ffffffffffffffff811115610bfd57610bfd612294565b604051908082528060200260200182016040528015610c26578160200160208202803683370190505b509050600160005b8381108015610c3f57506008548211155b15610caa576000610c4f83610d20565b9050866001600160a01b0316816001600160a01b03161415610c975782848381518110610c7e57610c7e6126ca565b602090810291909101015281610c93816126e0565b9250505b82610ca1816126e0565b93505050610c2e565b5090949350505050565b6006546001600160a01b03163314610cde5760405162461bcd60e51b8152600401610845906125e5565b600e55565b6006546001600160a01b03163314610d0d5760405162461bcd60e51b8152600401610845906125e5565b80516109bd90600d906020840190612088565b6000818152600260205260408120546001600160a01b0316806107385760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201526832b73a103a37b5b2b760b91b6064820152608401610845565b60006001600160a01b038216610e025760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a65604482015269726f206164647265737360b01b6064820152608401610845565b506001600160a01b031660009081526003602052604090205490565b6006546001600160a01b03163314610e485760405162461bcd60e51b8152600401610845906125e5565b610e526000611857565b565b6006546001600160a01b03163314610e7e5760405162461bcd60e51b8152600401610845906125e5565b600a55565b6006546001600160a01b03163314610ead5760405162461bcd60e51b8152600401610845906125e5565b80516109bd90600b906020840190612088565b60606001805461074d906125aa565b80600081118015610ee25750600f548111155b610efe5760405162461bcd60e51b8152600401610845906126fb565b60085481610f0a6109fe565b610f149190612729565b1115610f325760405162461bcd60e51b815260040161084590612741565b8180610f3d600e5490565b610f479190612681565b341015610f8c5760405162461bcd60e51b8152602060048201526013602482015272496e73756666696369656e742066756e64732160681b6044820152606401610845565b60105460ff1615610fdf5760405162461bcd60e51b815260206004820152601760248201527f54686520636f6e747261637420697320706175736564210000000000000000006044820152606401610845565b610fe933846118a9565b6012546000906001600160a01b03166064611005346005612681565b61100f91906126b6565b604051600081818185875af1925050503d806000811461104b576040519150601f19603f3d011682016040523d82523d6000602084013e611050565b606091505b505090508061105e57600080fd5b50505050565b6109bd3383836118df565b60606008600501805461074d906125aa565b6006546001600160a01b031633146110ab5760405162461bcd60e51b8152600401610845906125e5565b600f55565b6006546001600160a01b031633146110da5760405162461bcd60e51b8152600401610845906125e5565b601080549115156101000261ff0019909216919091179055565b6110fe33836115ec565b61111a5760405162461bcd60e51b81526004016108459061261a565b61105e848484846119ae565b6000818152600260205260409020546060906001600160a01b03166111a55760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201526e3732bc34b9ba32b73a103a37b5b2b760891b6064820152608401610845565b6107386008836119e1565b826000811180156111c35750600f548111155b6111df5760405162461bcd60e51b8152600401610845906126fb565b600854816111eb6109fe565b6111f59190612729565b11156112135760405162461bcd60e51b815260040161084590612741565b838061121e600e5490565b6112289190612681565b34101561126d5760405162461bcd60e51b8152602060048201526013602482015272496e73756666696369656e742066756e64732160681b6044820152606401610845565b601054610100900460ff166112cf5760405162461bcd60e51b815260206004820152602260248201527f5468652077686974656c6973742073616c65206973206e6f7420656e61626c65604482015261642160f01b6064820152608401610845565b3360009081526011602052604090205460ff161561132f5760405162461bcd60e51b815260206004820152601860248201527f4164647265737320616c726561647920636c61696d65642100000000000000006044820152606401610845565b61133a848433611b71565b6113775760405162461bcd60e51b815260206004820152600e60248201526d496e76616c69642070726f6f662160901b6044820152606401610845565b336000818152601160205260409020805460ff1916600117905561139b90866118a9565b5050505050565b6006546001600160a01b031633146113cc5760405162461bcd60e51b8152600401610845906125e5565b60108054911515620100000262ff000019909216919091179055565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b816000811180156114295750600f548111155b6114455760405162461bcd60e51b8152600401610845906126fb565b600854816114516109fe565b61145b9190612729565b11156114795760405162461bcd60e51b815260040161084590612741565b6006546001600160a01b031633146114a35760405162461bcd60e51b8152600401610845906125e5565b61097b82846118a9565b6006546001600160a01b031633146114d75760405162461bcd60e51b8152600401610845906125e5565b6001600160a01b03811661153c5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b6064820152608401610845565b61154581611857565b50565b61155061210c565b600061155a611b80565b86815260c0810186905260e0810185905260a081018490529150505b949350505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b03841690811790915581906115b382610d20565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166116655760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b6064820152608401610845565b600061167083610d20565b9050806001600160a01b0316846001600160a01b031614806116ab5750836001600160a01b03166116a0846107d0565b6001600160a01b0316145b80611576575061157681856113e8565b826001600160a01b03166116ce82610d20565b6001600160a01b0316146117325760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b6064820152608401610845565b6001600160a01b0382166117945760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b6064820152608401610845565b61179f60008261157e565b6001600160a01b03831660009081526003602052604081208054600192906117c890849061276f565b90915550506001600160a01b03821660009081526003602052604081208054600192906117f6908490612729565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b600680546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b60005b8181101561097b576118bc611bd2565b6118cd836118c86109fe565b611be0565b806118d7816126e0565b9150506118ac565b816001600160a01b0316836001600160a01b031614156119415760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c6572000000000000006044820152606401610845565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6119b98484846116bb565b6119c584848484611bfa565b61105e5760405162461bcd60e51b815260040161084590612786565b600882015460609062010000900460ff16611a8a57826005018054611a05906125aa565b80601f0160208091040260200160405190810160405280929190818152602001828054611a31906125aa565b8015611a7e5780601f10611a5357610100808354040283529160200191611a7e565b820191906000526020600020905b815481529060010190602001808311611a6157829003601f168201915b50505050509050610738565b6000836003018054611a9b906125aa565b80601f0160208091040260200160405190810160405280929190818152602001828054611ac7906125aa565b8015611b145780601f10611ae957610100808354040283529160200191611b14565b820191906000526020600020905b815481529060010190602001808311611af757829003601f168201915b505050505090506000815111611b395760405180602001604052806000815250611576565b80611b4384611d04565b85600401604051602001611b59939291906127d8565b60405160208183030381529060405291505092915050565b60006115766008858585611e02565b611b8861210c565b611b9061210c565b604080516020808201835260008252606084019190915281518083019092526005825264173539b7b760d91b9082015260808201526001610100820152919050565b610e52600980546001019055565b6109bd828260405180602001604052806000815250611e89565b60006001600160a01b0384163b15611cfc57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611c3e90339089908890889060040161289c565b602060405180830381600087803b158015611c5857600080fd5b505af1925050508015611c88575060408051601f3d908101601f19168201909252611c85918101906128cf565b60015b611ce2573d808015611cb6576040519150601f19603f3d011682016040523d82523d6000602084013e611cbb565b606091505b508051611cda5760405162461bcd60e51b815260040161084590612786565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050611576565b506001611576565b606081611d285750506040805180820190915260018152600360fc1b602082015290565b8160005b8115611d525780611d3c816126e0565b9150611d4b9050600a836126b6565b9150611d2c565b60008167ffffffffffffffff811115611d6d57611d6d612294565b6040519080825280601f01601f191660200182016040528015611d97576020820181803683370190505b5090505b841561157657611dac60018361276f565b9150611db9600a866128ec565b611dc4906030612729565b60f81b818381518110611dd957611dd96126ca565b60200101906001600160f81b031916908160001a905350611dfb600a866126b6565b9450611d9b565b6040516bffffffffffffffffffffffff19606083901b1660208201526000908190603401604051602081830303815290604052805190602001209050611e7f858580806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250505050600288015483611ebc565b9695505050505050565b611e938383611ed2565b611ea06000848484611bfa565b61097b5760405162461bcd60e51b815260040161084590612786565b600082611ec98584612014565b14949350505050565b6001600160a01b038216611f285760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f20616464726573736044820152606401610845565b6000818152600260205260409020546001600160a01b031615611f8d5760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e746564000000006044820152606401610845565b6001600160a01b0382166000908152600360205260408120805460019290611fb6908490612729565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b600081815b8451811015612080576000858281518110612036576120366126ca565b6020026020010151905080831161205c576000838152602082905260409020925061206d565b600081815260208490526040902092505b5080612078816126e0565b915050612019565b509392505050565b828054612094906125aa565b90600052602060002090601f0160209004810192826120b657600085556120fc565b82601f106120cf57805160ff19168380011785556120fc565b828001600101855582156120fc579182015b828111156120fc5782518255916020019190600101906120e1565b5061210892915061217b565b5090565b604051806101600160405280600081526020016121356040518060200160405280600081525090565b8152600060208201819052606060408301819052808301819052608083015260a0820181905260c0820181905260e0820181905261010082018190526101209091015290565b5b80821115612108576000815560010161217c565b6001600160e01b03198116811461154557600080fd5b6000602082840312156121b857600080fd5b81356121c381612190565b9392505050565b60005b838110156121e55781810151838201526020016121cd565b8381111561105e5750506000910152565b6000815180845261220e8160208601602086016121ca565b601f01601f19169290920160200192915050565b6020815260006121c360208301846121f6565b60006020828403121561224757600080fd5b5035919050565b80356001600160a01b038116811461226557600080fd5b919050565b6000806040838503121561227d57600080fd5b6122868361224e565b946020939093013593505050565b634e487b7160e01b600052604160045260246000fd5b600067ffffffffffffffff808411156122c5576122c5612294565b604051601f8501601f19908116603f011681019082821181831017156122ed576122ed612294565b8160405280935085815286868601111561230657600080fd5b858560208301376000602087830101525050509392505050565b60006020828403121561233257600080fd5b813567ffffffffffffffff81111561234957600080fd5b8201601f8101841361235a57600080fd5b611576848235602084016122aa565b8035801515811461226557600080fd5b60006020828403121561238b57600080fd5b6121c382612369565b6000806000606084860312156123a957600080fd5b6123b28461224e565b92506123c06020850161224e565b9150604084013590509250925092565b6000602082840312156123e257600080fd5b6121c38261224e565b6020808252825182820181905260009190848201906040850190845b8181101561242357835183529284019291840191600101612407565b50909695505050505050565b6000806040838503121561244257600080fd5b61244b8361224e565b915061245960208401612369565b90509250929050565b6000806000806080858703121561247857600080fd5b6124818561224e565b935061248f6020860161224e565b925060408501359150606085013567ffffffffffffffff8111156124b257600080fd5b8501601f810187136124c357600080fd5b6124d2878235602084016122aa565b91505092959194509250565b6000806000604084860312156124f357600080fd5b83359250602084013567ffffffffffffffff8082111561251257600080fd5b818601915086601f83011261252657600080fd5b81358181111561253557600080fd5b8760208260051b850101111561254a57600080fd5b6020830194508093505050509250925092565b6000806040838503121561257057600080fd5b6125798361224e565b91506124596020840161224e565b6000806040838503121561259a57600080fd5b823591506124596020840161224e565b600181811c908216806125be57607f821691505b602082108114156125df57634e487b7160e01b600052602260045260246000fd5b50919050565b6020808252818101527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604082015260600190565b60208082526031908201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f6040820152701ddb995c881b9bdc88185c1c1c9bdd9959607a1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b600081600019048311821515161561269b5761269b61266b565b500290565b634e487b7160e01b600052601260045260246000fd5b6000826126c5576126c56126a0565b500490565b634e487b7160e01b600052603260045260246000fd5b60006000198214156126f4576126f461266b565b5060010190565b602080825260149082015273496e76616c6964206d696e7420616d6f756e742160601b604082015260600190565b6000821982111561273c5761273c61266b565b500190565b6020808252601490820152734d617820737570706c792065786365656465642160601b604082015260600190565b6000828210156127815761278161266b565b500390565b60208082526032908201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560408201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b606082015260800190565b6000845160206127eb8285838a016121ca565b8551918401916127fe8184848a016121ca565b8554920191600090600181811c908083168061281b57607f831692505b85831081141561283957634e487b7160e01b85526022600452602485fd5b80801561284d576001811461285e5761288b565b60ff1985168852838801955061288b565b60008b81526020902060005b858110156128835781548a82015290840190880161286a565b505083880195505b50939b9a5050505050505050505050565b6001600160a01b0385811682528416602082015260408101839052608060608201819052600090611e7f908301846121f6565b6000602082840312156128e157600080fd5b81516121c381612190565b6000826128fb576128fb6126a0565b50069056fea264697066735822122007d086ce69dd1f7583c3685a7454ada979c793578dfbc56fa0ae4e8888f1eb3b64736f6c63430008090033";

type Prom3theusTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Prom3theusTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Prom3theusToken__factory extends ContractFactory {
  constructor(...args: Prom3theusTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Prom3theusToken";
  }

  deploy(
    _tokenName: string,
    _tokenSymbol: string,
    _cost: BigNumberish,
    _maxSupply: BigNumberish,
    _maxMintAmountPerTx: BigNumberish,
    _hiddenMetadataUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Prom3theusToken> {
    return super.deploy(
      _tokenName,
      _tokenSymbol,
      _cost,
      _maxSupply,
      _maxMintAmountPerTx,
      _hiddenMetadataUri,
      overrides || {}
    ) as Promise<Prom3theusToken>;
  }
  getDeployTransaction(
    _tokenName: string,
    _tokenSymbol: string,
    _cost: BigNumberish,
    _maxSupply: BigNumberish,
    _maxMintAmountPerTx: BigNumberish,
    _hiddenMetadataUri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _tokenName,
      _tokenSymbol,
      _cost,
      _maxSupply,
      _maxMintAmountPerTx,
      _hiddenMetadataUri,
      overrides || {}
    );
  }
  attach(address: string): Prom3theusToken {
    return super.attach(address) as Prom3theusToken;
  }
  connect(signer: Signer): Prom3theusToken__factory {
    return super.connect(signer) as Prom3theusToken__factory;
  }
  static readonly contractName: "Prom3theusToken";
  public readonly contractName: "Prom3theusToken";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Prom3theusTokenInterface {
    return new utils.Interface(_abi) as Prom3theusTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Prom3theusToken {
    return new Contract(address, _abi, signerOrProvider) as Prom3theusToken;
  }
}
