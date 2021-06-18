import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { apiError } from 'enums';

const request = axios.create();
request.interceptors.response.use(undefined, (error: AxiosError) => {
  const url = error.config.baseURL ?? '' + '' + error.config.url ?? '';
  console.error(error.config);
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    let meta = apiError[error.response?.status ?? 0];
    if (typeof meta === 'undefined') meta = apiError[0];

    notification.open({
      message: error.response.statusText,
      description: meta.description,
      type: 'error',
    });
    const err = `The request (${url}) was made and the server responded with ${error.response.status}`;
    throw Error(err);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    const err = `The request (${url}) was made but no response was received, the request: ${error.request}`;
    throw Error(err);
  } else {
    // Something happened in setting up the request that triggered an Error
    const err = `Something happened in setting up the request (${url}) that triggered an Error`;
    throw Error(err);
  }
});

export { request };
