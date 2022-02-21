import CollectionConfigInterface from "../lib/CollectionConfigInterface";
import whitelistAddresses from "./whitelist.json";

// @TODO automate contract address using abi + contract network
const CollectionConfig: CollectionConfigInterface = {
    // The contract name can be updated using the following command:
    // yarn rename-contract NEW_CONTRACT_NAME
    // Please DO NOT change it manually!
    contractName: "Prom3theusToken",
    tokenName: "Prom3theus Token",
    tokenSymbol: "PROM3",
    hiddenMetadataUri: "ipfs://__CID__/hidden.json",
    maxSupply: 10000,
    whitelistSale: {
        price: 0.05,
        maxMintAmountPerTx: 1,
    },
    preSale: {
        price: 0.07,
        maxMintAmountPerTx: 2,
    },
    publicSale: {
        price: 0.09,
        maxMintAmountPerTx: 5,
    },
    contractAddress: "0xb94CfF7fC7E3ff429b4e1cB6a6cF0cc9D9e73901",
    openSeaSlug: "prom3theus-nft-token",
    whitelistAddresses: whitelistAddresses,
};

export default CollectionConfig;
