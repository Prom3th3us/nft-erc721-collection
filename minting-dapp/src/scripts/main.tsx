import "../styles/main.scss";

import ReactDOM from "react-dom";
import App from "./react/context/dapp";
import { ContractProvider } from "./react/context/contract";
import { MetamaskProvider } from "./react/context/metamask";
import { BusContextProvider } from "./react/context/bus";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Dapp from "./react/Dapp";

document.addEventListener("DOMContentLoaded", async () => {
  ReactDOM.render(
    // <Dapp />,
    <BusContextProvider>
      <MetamaskProvider>
        <ContractProvider>
          <App />
          <ToastContainer />
        </ContractProvider>
      </MetamaskProvider>
    </BusContextProvider>,
    document.getElementById("minting-dapp")
  );
});
