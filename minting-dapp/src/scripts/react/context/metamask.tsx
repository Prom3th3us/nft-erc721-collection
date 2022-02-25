import { createContext, useCallback, useContext, useEffect, useState, FC } from "react";
import { ethers } from "ethers";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import detectEthereumProvider from "@metamask/detect-provider";
import CollectionConfig from "../../../../../smart-contract/config/CollectionConfig";
import { ErrorMsg } from "./commons";

interface MetamaskContext {
  metamask: Web3Provider | null;
  network: ethers.providers.Network | null;
  userAddress: string | null;
  etherscanUrl: string;
  errorMessage: string | JSX.Element | null; // @TODO move to common/global ctx
  setErrorMsg: (s: string | null) => void;
  connectWallet: () => Promise<void>;
}

const initialState: MetamaskContext = {
  metamask: null,
  network: null,
  userAddress: null,
  etherscanUrl: "",
  errorMessage: null,
  setErrorMsg: (_) => {},
  connectWallet: async () => {},
};

const MetamaskContext: React.Context<MetamaskContext> =
  createContext(initialState);

export const useMetamask = () => useContext(MetamaskContext);

export const MetamaskProvider: FC = ({ children }) => {
  const [metamask, setMetamask] = useState(initialState.metamask);
  const [network, setNetwork] = useState(initialState.network);
  const [userAddress, setUserAddress] = useState(initialState.userAddress);
  const [etherscanUrl, setEtherscanUrl] = useState(initialState.etherscanUrl);
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  const setErrorMsgFn: (s: string | null) => void = (s) => setErrorMessage(s);

  const generateEtherscanUrl: () => string = () => {
    return `https://${
      network?.chainId === 1 || !network?.name ? "www" : network.name
    }.etherscan.io/address/${CollectionConfig.contractAddress}`;
  };

  const registerWalletEvents: (e: ExternalProvider, p: Web3Provider) => void = (
    browserProvider, provider
  ) => {
    // @ts-ignore
    browserProvider.on("accountsChanged", () => {
      initWallet(provider);
    });

    // @ts-ignore
    browserProvider.on("chainChanged", () => {
      window.location.reload();
    });
  };

  const initWallet: (p: Web3Provider) => Promise<void> = 
    async (provider: Web3Provider) => {
      try {
        await provider.provider.request!({ method: "eth_requestAccounts" });
        const walletAccounts = await provider.listAccounts();

        if (walletAccounts.length === 0) {
          return;
        }

        setUserAddress(walletAccounts[0]);
        setNetwork(await provider.getNetwork());
        setEtherscanUrl(generateEtherscanUrl());
      } catch(e) {
        setErrorMessage(ErrorMsg(e));
      }
    };

  const connectWalletFn: () => Promise<void> = useCallback(async () => {
    try {
      console.log("connecting wallet");
      initWallet(metamask!);
    } catch (e) {
      setErrorMessage(ErrorMsg(e));
    }
  }, [metamask]);

  const effect = useCallback(async () => {
    // Update the default state with a generic URL before we know the actual network through the connected wallet
    setEtherscanUrl(generateEtherscanUrl());

    const browserProvider =
      (await detectEthereumProvider()) as ExternalProvider;

    if (browserProvider?.isMetaMask !== true) {
      setErrorMessage(
        <>
          We were not able to detect <strong>MetaMask</strong>. We value{" "}
          <strong>privacy and security</strong> a lot so we limit the wallet
          options on the DAPP.
          <br />
          <br />
          But don't worry! <span className="emoji">😃</span> You can always
          interact with the smart-contract through{" "}
          <a href={etherscanUrl} target="_blank">
            Etherscan
          </a>{" "}
          and{" "}
          <strong>
            we do our best to provide you with the best user experience
            possible
          </strong>
          , even from there.
          <br />
          <br />
          You can also get your <strong>Whitelist Proof</strong> manually,
          using the tool below.
        </>
      );
    }

    const provider = new ethers.providers.Web3Provider(browserProvider);
    setMetamask(provider);      
    registerWalletEvents(browserProvider, provider);
    await initWallet(provider);
  }, [metamask]);

  useEffect(() => {
    effect();
  }, []);

  return (
    <MetamaskContext.Provider
      value={{
        metamask: metamask,
        network: network,
        userAddress: userAddress,
        etherscanUrl: etherscanUrl,
        errorMessage: errorMessage,
        setErrorMsg: setErrorMsgFn,
        connectWallet: connectWalletFn
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};
