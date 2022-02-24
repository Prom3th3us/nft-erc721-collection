import { createContext, useCallback, useContext, useEffect, useState, FC } from "react";
import { ethers, BigNumber } from "ethers";
import NftContractType from "../../lib/NftContractType";
import CollectionConfig from "../../../../../smart-contract/config/CollectionConfig";
import { useMetamask } from "./metamask";
import Whitelist from "../../lib/Whitelist";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

interface ContractContext {
  contract: NftContractType | null;
  address: string;
  totalSupply: number;
  maxSupply: number;
  maxMintAmountPerTx: number;
  tokenPrice: BigNumber;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean; // @TODO move into whitelist
}

const initialState: ContractContext = {
  contract: null,
  address: CollectionConfig.contractAddress!,
  totalSupply: 0,
  maxSupply: 0,
  maxMintAmountPerTx: 0,
  tokenPrice: BigNumber.from(0),
  isPaused: true,
  isWhitelistMintEnabled: false,
  isUserInWhitelist: false,
};

const ContractContext: React.Context<ContractContext> =
  createContext(initialState);

export const useContract = () => useContext(ContractContext);

const ContractAbi = require("../../../../../smart-contract/artifacts/contracts/" +
  CollectionConfig.contractName +
  ".sol/" +
  CollectionConfig.contractName +
  ".json").abi;

export const ContractProvider: FC = ({ children }) => {
  const { metamask, userAddress, setErrorMsg } = useMetamask();

  const [contract, setContract] = useState(initialState.contract);
  const [address, setAddress] = useState(initialState.address);
  const [totalSupply, setTotalSupply] = useState(initialState.totalSupply);
  const [maxSupply, setMaxSupply] = useState(initialState.maxSupply);
  const [maxMintAmountPerTx, setMaxMintAmountPerTx] = useState(
    initialState.maxMintAmountPerTx
  );
  const [tokenPrice, setTokenPrice] = useState(initialState.tokenPrice);
  const [isPaused, setIsPaused] = useState(initialState.isPaused);
  const [isWhitelistMintEnabled, setIsWhitelistMintEnabled] = useState(
    initialState.isWhitelistMintEnabled
  );
  const [isUserInWhitelist, setIsUserInWhitelist] = useState(
    initialState.isUserInWhitelist
  );

  const effect = useCallback(async (provider: Web3Provider) => {
    if (
      (await provider.getCode(CollectionConfig.contractAddress!)) === "0x"
    ) {
      setErrorMsg(
        "Could not find the contract, are you connected to the right chain?"
      );
      return;
    }

    const contractRef = new ethers.Contract(
      address,
      ContractAbi,
      provider.getSigner()
    ) as NftContractType;

    setContract(contractRef);

    setMaxSupply((await contractRef.maxSupply()).toNumber());
    setTotalSupply((await contractRef.totalSupply()).toNumber());
    setMaxMintAmountPerTx((await contractRef.maxMintAmountPerTx()).toNumber());
    setTokenPrice(await contractRef.cost());
    setIsPaused(await contractRef.paused());
    setIsWhitelistMintEnabled(await contractRef.whitelistMintEnabled());
    setIsUserInWhitelist(Whitelist.contains(userAddress ?? "")); 
  }, []);

  useEffect(() => {
    if(!metamask) return;
    effect(metamask);
  }, []);

  return (
    <ContractContext.Provider
      value={{
        contract,
        address,
        totalSupply,
        maxSupply,
        maxMintAmountPerTx,
        tokenPrice,
        isPaused,
        isWhitelistMintEnabled,
        isUserInWhitelist,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};
