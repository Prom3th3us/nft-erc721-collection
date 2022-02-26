export const ErrorMsg = (error: any): string => {
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
