type ErrorDetail = { status: string, message: string }

const ErrorArray = [
  200,
  201,
  202,
  400,
  401,
  403,
  404,
  500,
  501,
  502,
] as const;

type PossibleErrorCodes = typeof ErrorArray[keyof typeof ErrorArray];
type ResponseStatus = Record<typeof ErrorArray[number], ErrorDetail>;

const errors: ResponseStatus = {
  200: {
    status: "OK",
    message: "The request succeeded."
  },
  201: {
    status: "Created",
    message: "The request succeeded."
  },
  202: {
    status: "Accepted",
    message: "The request has been received but not yet acted upon."
  },
  400: {
    status: "Bad Request",
    message: "The server cannot or will not process the request due to something that is perceived to be a client error."
  },
  401: {
    status: "Unauthorized",
    message: "Unauthorised action requested. Please provide a valid authentication."
  },
  403: {
    status: "Forbidden",
    message: "The client does not have access rights to the content.",
  },
  404: {
    status: 'Not Found',
    message: "The server cannot find the requested resource.",
  },
  500: {
    status: "Internal Server Error",
    message: "The server has encountered a situation it does not know how to handle.",
  },
  501: {
    status: "Not Implemented",
    message: "The request method is not supported by the server and cannot be handled."
  },
  502: {
    status: "Bad Gateway",
    message: "Server got an invalid response."
  }
};

type ErrorCode = keyof typeof errors;

/**
 * 
 * @param code Number denoting the error type.
 * @returns 
 */
export function ReturnErrorMessage(code: ErrorCode): string {
  return errors[code].message
};

/**
 * 
 * @param code Number denoting the error type.
 * @returns 
 */
export function ReturnErrorStatus(code: ErrorCode): string {
  return errors[code].status
};
