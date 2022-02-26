import "../styles/main.scss";

import ReactDOM from "react-dom";
import App from "./react/context/dapp";
// import Dapp from "./react/Dapp";
import { ContractProvider } from "./react/context/contract";
import { MetamaskProvider } from "./react/context/metamask";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

document.addEventListener("DOMContentLoaded", async () => {
  ReactDOM.render(
    // <Dapp />,
    <MetamaskProvider>
      <ContractProvider>
          <App />
          <ToastContainer />
      </ContractProvider>
    </MetamaskProvider>,
    document.getElementById("minting-dapp")
  );
});
