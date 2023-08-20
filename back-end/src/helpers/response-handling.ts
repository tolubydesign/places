type Response = { status: string, message: string }

type RequestResponseCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 500 | 501 | 502;

const RequestResponseCodes = [
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

type ResponseStatus = { [key in RequestResponseCode] : Response };

const responses: ResponseStatus = {
  200: {
    status: "OK",
    message: "Request completed Successful."
  },
  201: {
    status: "Created",
    message: "The created succeeded."
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

type ResponseCode = keyof typeof responses;

/**
 * Return the relevant response message, bases on `code` number provided.
 * @param code Number denoting the error type.
 * @returns 
 */
export function ReturnResponseMessage(code: ResponseCode): string {
  return responses[code].message
};

/**
 * Get a relevant status, bases on `code` number provided.
 * @param code Number denoting the error type.
 * @returns 
 */
export function ReturnResponseStatus(code: ResponseCode): string {
  return responses[code].status
};

/**
 * Return the relevant request response, bases on `code` number provided.
 * @param code Number denoting the error type.
 * @returns 
 */
export function ReturnResponse(code: ResponseCode): Response {
  return responses[code]
}

type SuccessResponseTitles = "completed" | "successful";
type SuccessResponseContent = {
  code: 200,
  status: Capitalize<SuccessResponseTitles>,
  message: string
};
