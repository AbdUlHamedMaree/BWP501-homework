type ApiErrors = { [key: number]: { title: string; description: string } };

export const apiError: ApiErrors = {
  0: {
    title: 'Unknown Error',
    description: "Unknown Error happend that we didn't expect",
  },
  400: {
    title: 'Bad Request',
    description: 'Bad request',
  },
  401: {
    title: 'Unauthorized',
    description: 'You need to be authorized',
  },
  402: {
    title: 'Payment Required',
    description: 'Payment required',
  },
  403: {
    title: 'Forbidden',
    description: 'You are not allowed to do this action',
  },
  404: {
    title: 'Not Found',
    description: 'This Route Is Not Found',
  },
  500: {
    title: 'Internal Server Error',
    description: 'Error in The Server',
  },
};
