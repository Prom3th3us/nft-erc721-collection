import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  FC,
} from "react";
import { ethers } from "ethers";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import CollectionConfig from "../../../../../smart-contract/config/CollectionConfig";
import { ErrorMsg } from "./commons";
import { toast } from 'react-toastify'

interface IMetamaskContext {
  metamask: Web3Provider | null;
  network: ethers.providers.Network | null;
  userAddress: string | null;
  etherscanUrl: string;
  errorMessage: string | JSX.Element | null; // @TODO move to common/global ctx
  setErrorMsg: (s: string | JSX.Element | any) => void;
  connectWallet: () => Promise<void>;
  isWalletConnected: () => boolean;
}

const initialState: IMetamaskContext = {
  metamask: null,
  network: null,
  userAddress: null,
  etherscanUrl: "",
  errorMessage: null,
  setErrorMsg: (_) => {},
  connectWallet: async () => {},
  isWalletConnected: () => false
};

const MetamaskContext: React.Context<IMetamaskContext> =
  createContext(initialState);

export const useMetamask = (): IMetamaskContext => {
  const context = useContext(MetamaskContext);
  if (!context) {
    throw new Error("`useMetamask` should be used within a `MetaMaskProvider`");
  }

  return context;
};

const useMetamaskContextValue = (): IMetamaskContext => {
  const [metamask, setMetamask] = useState(initialState.metamask);
  const [network, setNetwork] = useState(initialState.network);
  const [userAddress, setUserAddress] = useState(initialState.userAddress);
  const [etherscanUrl, setEtherscanUrl] = useState(initialState.etherscanUrl);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  // // start-section: helpers
  const generateEtherscanUrl = useCallback((): string => {
    return `https://${
      network?.chainId === 1 || !network?.name ? "www" : network.name
    }.etherscan.io/address/${CollectionConfig.contractAddress}`;
  }, [network]);

  const initWallet = useCallback(async (): Promise<void> => {
    if (metamask && metamask.provider.request) {
      await metamask.provider.request({ method: "eth_requestAccounts" });
      const walletAccounts = await metamask.listAccounts();
      if (walletAccounts.length > 0) {
        setUserAddress(walletAccounts[0]);
        setNetwork(await metamask.getNetwork());
        setEtherscanUrl(generateEtherscanUrl());
      }
    }
  }, [metamask, generateEtherscanUrl]);
  // end-section: helpers

  // start-section: api
  const setErrorMsg = useCallback(
    (s: string | JSX.Element | null | any = null): void => {
      const errorMessage = ErrorMsg(s);
      toast.error(errorMessage, { position: toast.POSITION.TOP_RIGHT })
      setErrorMessage(errorMessage)
    }, []
  );

  const connectWallet = useCallback(async (): Promise<void> => {
    try {
      await initWallet();
      toast.success("CONNECTED", { position: toast.POSITION.TOP_RIGHT });
    } catch (e) {
      setErrorMsg(e);
    }
  }, [initWallet, setErrorMsg]);

  //@WIP
  const isWalletConnected = useCallback((): boolean => {
    return userAddress !== null;
  }, [userAddress]);
  // end-section: api

  // start-section: effects
  const registerOnAccountsChanged = useCallback(
    (provider: Web3Provider): (() => void) => {
      const onAccountsChanged = (accounts: string[]) => {
        initWallet();
      };
      // @ts-ignore
      provider.provider.on("accountsChanged", onAccountsChanged);
      return () => {
        // @ts-ignore
        provider.provider.removeListener("accountsChanged", onAccountsChanged);
      };
    },
    [initWallet]
  );

  useEffect(() => {
    if (metamask) {
      return registerOnAccountsChanged(metamask);
    } else {
      return () => {};
    }
  }, [metamask, registerOnAccountsChanged]);

  const registerOnChainChanged = useCallback(
    (provider: Web3Provider): (() => void) => {
      const onChainChanged = (chainId: string) => {
        window.location.reload();
      };
      // @ts-ignore
      provider.provider.on("chainChanged", onChainChanged);
      return () => {
        // @ts-ignore
        provider.provider.removeListener("chainChanged", onChainChanged);
      };
    },
    []
  );

  useEffect(() => {
    if (metamask) {
      return registerOnChainChanged(metamask);
    } else {
      return () => {};
    }
  }, [metamask, registerOnChainChanged]);

  const registerOnConnect = useCallback(
    (provider: Web3Provider): (() => void) => {
      const onConnect = (chainId: string) => {
        console.log("METAMASK ALREADY CONNECTED");
        // initWallet(); // @TODO add if we want to autologin on page refresh
      };
      // @ts-ignore
      provider.provider.on("connect", onConnect);
      return () => {
        // @ts-ignore
        provider.provider.removeListener("connect", onConnect);
      };
    },
    []
  );

  useEffect(() => {
    if (metamask) {
      return registerOnConnect(metamask);
    } else {
      return () => {};
    }
  }, [metamask, registerOnConnect]);

  const registerOnDisconnect = useCallback(
    (provider: Web3Provider): (() => void) => {
      const onDisconnect = (error: any) => {
        console.error("METAMASK DISCONNECTED: ", error);
        setErrorMsg(error);
      };
      // @ts-ignore
      provider.provider.on("disconnect", onDisconnect);
      return () => {
        // @ts-ignore
        provider.provider.removeListener("disconnect", onDisconnect);
      };
    },
    [setErrorMsg]
  );

  useEffect(() => {
    if (metamask) {
      return registerOnDisconnect(metamask);
    } else {
      return () => {};
    }
  }, [metamask, registerOnDisconnect]);

  const connectMetamask = useCallback(async () => {
    // Update the default state with a generic URL before we know the actual network through the connected wallet
    setEtherscanUrl(generateEtherscanUrl());

    const _browserProvider =
      (await detectEthereumProvider()) as ExternalProvider;

    if (_browserProvider?.isMetaMask !== true) {
      setErrorMsg(
        <>
          We were not able to detect <strong>MetaMask</strong>. We value{" "}
          <strong>privacy and security</strong> a lot so we limit the wallet
          options on the DAPP.
          <br />
          <br />
          But don't worry! <span className="emoji">😃</span> You can always
          interact with the smart-contract through{" "}
          <a href={etherscanUrl} target="_blank" rel="noreferrer">
            Etherscan
          </a>{" "}
          and{" "}
          <strong>
            we do our best to provide you with the best user experience possible
          </strong>
          , even from there.
          <br />
          <br />
          You can also get your <strong>Whitelist Proof</strong> manually, using
          the tool below.
        </>
      );
    }
    const provider = new ethers.providers.Web3Provider(_browserProvider);
    setMetamask(provider);
  }, [etherscanUrl, setErrorMsg, generateEtherscanUrl]);

  useEffect(() => {
    connectMetamask();
  }, [connectMetamask]);
  // end-section: effects

  return {
    metamask,
    network,
    userAddress,
    etherscanUrl,
    errorMessage,
    setErrorMsg,
    connectWallet,
    isWalletConnected
  };
};

export const MetamaskProvider: FC = ({ children }) => {
  const metamaskContextValue = useMetamaskContextValue();
  return (
    <MetamaskContext.Provider value={metamaskContextValue}>
      {children}
    </MetamaskContext.Provider>
  );
};
