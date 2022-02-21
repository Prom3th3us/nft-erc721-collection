import "../styles/main.scss";

import ReactDOM from "react-dom";
import ReduxDapp from "./redux/ReduxDapp";
import Dapp from "./react/Dapp";
import store from "./redux/app/store";
import { Provider } from 'react-redux';


document.addEventListener("DOMContentLoaded", async () => {
  ReactDOM.render(
    // <Provider store={store}>
    //   <ReduxDapp />
    // </Provider>,
    <Dapp />,
    document.getElementById("minting-dapp")
  );
});
