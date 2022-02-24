import "../styles/main.scss";

import ReactDOM from "react-dom";
import App from "./react/context/dapp";
import Dapp from "./react/Dapp";

document.addEventListener("DOMContentLoaded", async () => {
  ReactDOM.render(
    // <Dapp />,
    <App />,
    document.getElementById("minting-dapp")
  );
});
