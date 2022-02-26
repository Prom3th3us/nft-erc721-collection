import "../styles/main.scss";

import ReactDOM from "react-dom";
import App from "./react/context/dapp";
// import Dapp from "./react/Dapp";
import { ContractProvider } from "./react/context/contract";
import { MetamaskProvider } from "./react/context/metamask";

document.addEventListener("DOMContentLoaded", async () => {
  ReactDOM.render(
    // <Dapp />,
    <MetamaskProvider>
      <ContractProvider>
        <App />
      </ContractProvider>
      /
    </MetamaskProvider>,
    document.getElementById("minting-dapp")
  );
});
