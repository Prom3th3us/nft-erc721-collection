import { useContract } from "./context/contract";
import { useMetamask } from "./context/metamask";
import CollectionStatus from "./widgets/CollectionStatus";
import MerkleProofWidget from "./widgets/MerkleProofWidget";
import MintWidget from "./widgets/MintWidget";
import CollectionConfig from "../../../../smart-contract/config/CollectionConfig";
import { useBusContext } from "./context/bus";

export default function App() {
  const bus = useBusContext();

  const {
    metamask,
    network,
    userAddress,
    etherscanUrl,
    connectWallet,
    isWalletConnected,
  } = useMetamask();

  const {
    tokenPrice,
    maxSupply,
    totalSupply,
    maxMintAmountPerTx,
    isPaused,
    isWhitelistMintEnabled,
    isContractReady,
    isSoldOut,
    mintTokens,
    whitelistMintTokens,
  } = useContract();

  const generateOpenSeaUrl: () => string = () => {
    const subdomain = network?.chainId === 1 ? "www" : "testnets";

    return (
      `https://${subdomain}.opensea.io/` +
      (CollectionConfig.openSeaSlug
        ? "collection/" + CollectionConfig.openSeaSlug
        : null)
    );
  };

  const isNotMainnet = (): boolean => {
    return network !== null && network.chainId !== 1;
  };

  return (
    <>
      {isNotMainnet() ? (
        <div className="not-mainnet">
          You are not connected to the main network.
          <span className="small">
            Current network: <strong>{network?.name}</strong>
          </span>
        </div>
      ) : null}

      {isWalletConnected() ? (
        <>
          {isContractReady() ? (
            <>
              <CollectionStatus
                userAddress={userAddress}
                maxSupply={maxSupply}
                totalSupply={totalSupply}
                isPaused={isPaused}
                isWhitelistMintEnabled={isWhitelistMintEnabled}
              />
              {totalSupply < maxSupply ? (
                <MintWidget
                  bus={bus}
                  userAddress={userAddress}
                  maxSupply={maxSupply}
                  totalSupply={totalSupply}
                  tokenPrice={tokenPrice}
                  maxMintAmountPerTx={maxMintAmountPerTx}
                  isPaused={isPaused}
                  isWhitelistMintEnabled={isWhitelistMintEnabled}
                  mintTokens={(mintAmount) => mintTokens(mintAmount)}
                  whitelistMintTokens={(mintAmount, proof) =>
                    whitelistMintTokens(mintAmount, proof)
                  }
                />
              ) : (
                <div className="collection-sold-out">
                  <h2>
                    Tokens have been <strong>sold out</strong>!{" "}
                    <span className="emoji">🥳</span>
                  </h2>
                  You can buy from our beloved holders on{" "}
                  <a
                    href={generateOpenSeaUrl()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    OpenSea
                  </a>
                  .
                </div>
              )}
            </>
          ) : (
            <div className="collection-not-ready">
              <svg
                className="spinner"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading collection data...
            </div>
          )}
        </>
      ) : null}

      {!isWalletConnected() || !isSoldOut() ? (
        <div className="no-wallet">
          {!isWalletConnected() ? (
            <button
              className="primary"
              disabled={metamask === undefined}
              onClick={async () => {
                try {
                  await connectWallet();
                  await bus.publishSuccess("CONNECTED");
                } catch (e) {
                  await bus.publishError(e);
                }
              }}
            >
              Connect Wallet
            </button>
          ) : null}

          <div className="use-etherscan">
            Hey, looking for a <strong>super-safe experience</strong>?{" "}
            <span className="emoji">😃</span>
            <br />
            You can interact with the smart-contract <strong>
              directly
            </strong>{" "}
            through{" "}
            <a href={etherscanUrl} target="_blank" rel="noreferrer">
              Etherscan
            </a>
            , without even connecting your wallet to this DAPP!{" "}
            <span className="emoji">🚀</span>
            <br />
            <br />
            Keep safe! <span className="emoji">❤️</span>
          </div>

          {!isWalletConnected() || isWhitelistMintEnabled ? (
            <MerkleProofWidget
              userAddress={userAddress}
              etherscanUrl={etherscanUrl}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
