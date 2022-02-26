import { createContext, useCallback, useContext, useState, FC } from "react";
import { toast } from "react-toastify";

export interface IBusContext {
  infoMessage: string | JSX.Element | null;
  successMessage: string | JSX.Element | null;
  errorMessage: string | JSX.Element | null;
  publishInfo: (s: string | JSX.Element | any) => Promise<void>;
  publishSuccess: (s: string | JSX.Element | any) => Promise<void>;
  publishError: (s: string | JSX.Element | any) => Promise<void>;
}

const initialState: IBusContext = {
  infoMessage: null,
  successMessage: null,
  errorMessage: null,
  publishInfo: async (_: string | JSX.Element | any) => {},
  publishSuccess: async (_: string | JSX.Element | any) => {},
  publishError: async (_: string | JSX.Element | any) => {},
};

const BusContext: React.Context<IBusContext> = createContext(initialState);

export const useBusContext = (): IBusContext => {
  const context = useContext(BusContext);
  if (!context) {
    throw new Error(
      "`useBusContext` should be used within a `BusContextProvider`"
    );
  }

  return context;
};

// static
const ErrorMsg = (error: any): string => {
  let msg;
  if (typeof error === "string") {
    msg = error;
  } else if (typeof error === "object" && error !== null) {
    // Support any type of error from the Web3 Provider...
    if (error?.error?.message !== undefined) {
      msg = error.error.message;
    } else if (error?.data?.message !== undefined) {
      msg = error.data.message;
    } else if (error?.message !== undefined) {
      msg = error.message;
    }
  } else {
    msg = "Unknown error...";
  }
  return "" === msg ? "" : msg.charAt(0).toUpperCase() + msg.slice(1);
};

const useBusContextValue = (): IBusContext => {
  const [infoMessage, setInfoMessage] = useState(initialState.infoMessage);
  const [successMessage, setSuccessMessage] = useState(
    initialState.successMessage
  );
  const [errorMessage, setErrorMessage] = useState(initialState.errorMessage);

  const publishInfo = useCallback(async (msg: string | JSX.Element | any) => {
    setInfoMessage(msg);
    toast.info(msg, { position: toast.POSITION.TOP_RIGHT });
  }, []);

  const publishSuccess = useCallback(
    async (msg: string | JSX.Element | any) => {
      setSuccessMessage(msg);
      toast.success(msg, { position: toast.POSITION.TOP_RIGHT });
    },
    []
  );

  const publishError = useCallback(async (msg: string | JSX.Element | any) => {
    const errorMsg = ErrorMsg(msg);
    setErrorMessage(errorMsg);
    toast.error(errorMsg, { position: toast.POSITION.TOP_RIGHT });
  }, []);

  return {
    infoMessage,
    successMessage,
    errorMessage,
    publishInfo,
    publishSuccess,
    publishError,
  };
};

export const BusContextProvider: FC = ({ children }) => {
  const busContextValue = useBusContextValue();
  return (
    <BusContext.Provider value={busContextValue}>
      {children}
    </BusContext.Provider>
  );
};
