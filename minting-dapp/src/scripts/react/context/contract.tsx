import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  FC,
} from "react";
import { ethers, BigNumber } from "ethers";
import NftContractType from "../../lib/NftContractType";
import CollectionConfig from "../../../../../smart-contract/config/CollectionConfig";
import { useMetamask } from "./metamask";
import Whitelist from "../../lib/Whitelist";
import { Web3Provider } from "@ethersproject/providers";
import { useBusContext } from "./bus";

interface IContractContext {
  contract: NftContractType | null;
  address: string | null;
  totalSupply: number;
  maxSupply: number;
  maxMintAmountPerTx: number;
  tokenPrice: BigNumber;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  isUserInWhitelist: boolean; // @TODO move into whitelist
  isContractReady: () => boolean;
  isSoldOut: () => boolean;
  mintTokens: (amount: number) => Promise<void>;
  whitelistMintTokens: (amount: number) => Promise<void>;
}

const initialState: IContractContext = {
  contract: null,
  address: CollectionConfig.contractAddress,
  totalSupply: 0,
  maxSupply: 0,
  maxMintAmountPerTx: 0,
  tokenPrice: BigNumber.from(0),
  isPaused: true,
  isWhitelistMintEnabled: false,
  isUserInWhitelist: false,
  isContractReady: () => false,
  isSoldOut: () => false,
  mintTokens: async (_) => {},
  whitelistMintTokens: async (_) => {},
};

const ContractContext: React.Context<IContractContext> =
  createContext(initialState);

export const useContract = (): IContractContext => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("`useMetamask` should be used within a `MetaMaskProvider`");
  }

  return context;
};

const ContractAbi =
  require("../../../../../smart-contract/artifacts/contracts/" +
    CollectionConfig.contractName +
    ".sol/" +
    CollectionConfig.contractName +
    ".json").abi;

const useContractContextValue = (): IContractContext => {
  const bus = useBusContext();
  const { metamask, userAddress } = useMetamask();

  const [contract, setContract] = useState(initialState.contract);
  const [address] = useState(initialState.address);
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

  // start-section: api
  const isContractReady = useCallback((): boolean => {
    if (!contract) {
      return false;
    } else {
      return contract !== undefined;
    }
  }, [contract]);

  const isSoldOut = useCallback((): boolean => {
    return maxSupply !== 0 && totalSupply < maxSupply;
  }, [maxSupply, totalSupply]);

  const mintTokens = useCallback(
    async (amount: number): Promise<void> => {
      await contract!.mint(amount, {
        value: tokenPrice.mul(amount),
      });
    },
    [contract, tokenPrice]
  );

  const whitelistMintTokens: (n: number) => Promise<void> = useCallback(
    async (amount) => {
      await contract!.whitelistMint(
        amount,
        Whitelist.getProofForAddress(userAddress!),
        { value: tokenPrice.mul(amount) }
      );
    },
    [contract, userAddress, tokenPrice]
  );
  // end-section: api

  // start-section: effects
  const fetchContractData = useCallback(
    async (contractRef: NftContractType) => {
      setMaxSupply((await contractRef.maxSupply()).toNumber());
      setTotalSupply((await contractRef.totalSupply()).toNumber());
      setMaxMintAmountPerTx(
        (await contractRef.maxMintAmountPerTx()).toNumber()
      );
      setTokenPrice(await contractRef.cost());
      setIsPaused(await contractRef.paused());
      setIsWhitelistMintEnabled(await contractRef.whitelistMintEnabled());
    },
    []
  );

  const connectContract = useCallback(
    async (provider: Web3Provider, contractAddress: string) => {
      const notReacheableContract =
        (await provider.getCode(contractAddress)) === "0x";
      if (notReacheableContract) {
        await bus.publishError(
          "Could not find the contract, are you connected to the right chain?"
        );
        return;
      }

      const contractRef = new ethers.Contract(
        contractAddress,
        ContractAbi,
        provider.getSigner()
      ) as NftContractType;

      setContract(contractRef);
      await fetchContractData(contractRef);
    },
    [bus, fetchContractData]
  );

  useEffect(() => {
    if (metamask && userAddress && address) {
      connectContract(metamask, address);
      setIsUserInWhitelist(Whitelist.contains(userAddress ?? ""));
    }
  }, [metamask, userAddress, address, connectContract]);
  // end-section: effects

  return {
    contract,
    address,
    totalSupply,
    maxSupply,
    maxMintAmountPerTx,
    tokenPrice,
    isPaused,
    isWhitelistMintEnabled,
    isUserInWhitelist,
    isContractReady,
    isSoldOut,
    mintTokens,
    whitelistMintTokens,
  };
};

export const ContractProvider: FC = ({ children }) => {
  const contractContextValue = useContractContextValue();
  return (
    <ContractContext.Provider value={contractContextValue}>
      {children}
    </ContractContext.Provider>
  );
};
