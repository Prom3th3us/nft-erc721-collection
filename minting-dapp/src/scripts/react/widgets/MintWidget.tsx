import { utils, BigNumber } from "ethers";
import React from "react";
import Whitelist from "../../lib/Whitelist";
import { IBusContext } from "../context/bus";

interface Props {
  bus: IBusContext;
  userAddress: string | null;
  maxSupply: number;
  totalSupply: number;
  tokenPrice: BigNumber;
  maxMintAmountPerTx: number;
  isPaused: boolean;
  isWhitelistMintEnabled: boolean;
  mintTokens(mintAmount: number): Promise<void>;
  whitelistMintTokens(mintAmount: number, proof: string[]): Promise<void>;
}

interface State {
  mintAmount: number;
}

const defaultState: State = {
  mintAmount: 1,
};

export default class MintWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private canMint(): boolean {
    return !this.props.isPaused || this.canWhitelistMint();
  }

  private canWhitelistMint(): boolean {
    return this.props.isWhitelistMintEnabled 
      && this.props.userAddress !== null
      && Whitelist.isUserInWhitelist(this.props.userAddress);
  }

  private incrementMintAmount(): void {
    this.setState({
      mintAmount: Math.min(
        this.props.maxMintAmountPerTx,
        this.state.mintAmount + 1
      ),
    });
  }

  private decrementMintAmount(): void {
    this.setState({
      mintAmount: Math.max(1, this.state.mintAmount - 1),
    });
  }

  private async mint(): Promise<void> {
    try {
      if (!this.props.isPaused) {
        await this.props.mintTokens(this.state.mintAmount);
        return;
      }
      const proof = Whitelist.getProofForAddress(this.props.userAddress!);
      await this.props.whitelistMintTokens(this.state.mintAmount, proof);
      // await this.props.bus.publishSuccess("Minting in progress");
    } catch (e) {
      await this.props.bus.publishError(e);
    }
  }

  render() {
    return (
      <>
        {this.canMint() ? (
          <div className="mint-widget">
            <div className="preview">
              <img src="/build/images/preview.png" alt="Collection preview" />
            </div>

            <div className="price">
              <strong>Total price:</strong>{" "}
              {utils.formatEther(
                this.props.tokenPrice.mul(this.state.mintAmount)
              )}{" "}
              ETH
            </div>

            <div className="controls">
              <button
                className="decrease"
                onClick={() => this.decrementMintAmount()}
              >
                -
              </button>
              <span className="mint-amount">{this.state.mintAmount}</span>
              <button
                className="increase"
                onClick={() => this.incrementMintAmount()}
              >
                +
              </button>
              <button className="primary" onClick={() => this.mint()}>
                Mint
              </button>
            </div>
          </div>
        ) : (
          <div className="cannot-mint">
            <span className="emoji">⏳</span>
            {this.props.isWhitelistMintEnabled ? (
              <>
                You are not included in the <strong>whitelist</strong>.
              </>
            ) : (
              <>
                The contract is <strong>paused</strong>.
              </>
            )}
            <br />
            Please come back during the next sale!
          </div>
        )}
      </>
    );
  }
}
