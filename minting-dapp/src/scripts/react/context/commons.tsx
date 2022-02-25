// @TODO define global context
// @TODO extract error code if any
export function ErrorMsg(error: any): string | null {
  let msg: string = "Unknown error...";
  if (null === error || typeof error === "string") {
    msg = error;
  } else if (typeof error === "object") {
    // Support any type of error from the Web3 Provider...
    if (error?.error?.message !== undefined) {
      msg = error.error.message;
    } else if (error?.data?.message !== undefined) {
      msg = error.data.message;
    } else if (error?.message !== undefined) {
      msg = error.message;
    }
  }
  return null === msg ? null : msg.charAt(0).toUpperCase() + msg.slice(1);
}
