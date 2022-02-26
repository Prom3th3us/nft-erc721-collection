import React from "react";
import Whitelist from "../../lib/Whitelist";

interface Props {
  userAddress: string | null;
  etherscanUrl: string;
}

interface State {
  merkleProofManualAddress: string;
  merkleProofManualAddressFeedbackMessage: string | JSX.Element | null;
  merkleProofManualAddressInput: HTMLInputElement | null;
}

const defaultState: State = {
  merkleProofManualAddress: "",
  merkleProofManualAddressFeedbackMessage: null,
  merkleProofManualAddressInput: null,
};

export default class MerkleProofWidget extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = defaultState;
  }

  private copyMerkleProofToClipboard(): void {
    const merkleProof = Whitelist.getRawProofForAddress(
      this.props.userAddress ?? this.state.merkleProofManualAddress
    );

    if (merkleProof.length < 1) {
      this.setState({
        merkleProofManualAddressFeedbackMessage:
          "The given address is not in the whitelist, please double-check.",
      });

      return;
    }

    navigator.clipboard.writeText(merkleProof);

    this.setState({
      merkleProofManualAddressFeedbackMessage: (
        <>
          <strong>Congratulations!</strong> <span className="emoji">🎉</span>
          <br />
          Your Merkle Proof <strong>has been copied to the clipboard</strong>.
          You can paste it into{" "}
          <a href={this.props.etherscanUrl} target="_blank" rel="noreferrer">
            Etherscan
          </a>{" "}
          to claim your tokens.
        </>
      ),
    });
  }

  render() {
    return (
      <>
        <div className="merkle-proof-manual-address">
          <h2>Whitelist Proof</h2>
          <p>
            Anyone can generate the proof using any public address in the list,
            but <strong>only the owner of that address</strong> will be able to
            make a successful transaction by using it.
          </p>
          {this.state.merkleProofManualAddressFeedbackMessage ? (
            <div className="feedback-message">
              {this.state.merkleProofManualAddressFeedbackMessage}
            </div>
          ) : null}
          <label htmlFor="merkle-proof-manual-address">Public address:</label>
          <input
            id="merkle-proof-manual-address"
            type="text"
            placeholder="0x000..."
            disabled={this.props.userAddress !== null}
            value={
              this.props.userAddress ?? this.state.merkleProofManualAddress
            }
            ref={(input) => {
              if (!this.state.merkleProofManualAddressInput) {
                this.setState({
                  merkleProofManualAddressInput: input!,
                });
              }
            }}
            onChange={() => {
              this.setState({
                merkleProofManualAddress:
                  this.state.merkleProofManualAddressInput!.value,
              });
            }}
          />{" "}
          <button onClick={() => this.copyMerkleProofToClipboard()}>
            Generate and copy to clipboard
          </button>
        </div>
      </>
    );
  }
}
