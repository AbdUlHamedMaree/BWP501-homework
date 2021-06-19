import { notification } from 'antd';
import axios, { AxiosError } from 'axios';
import { apiError } from 'enums';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Show-Notification': true },
});
request.interceptors.response.use(undefined, (error: AxiosError) => {
  const url = error.config.baseURL ?? '' + '' + error.config.url ?? '';
  console.error(error.config);
  let meta = { title: '', description: '' };
  let err = '';
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    meta = apiError[error.response?.status ?? 0];
    if (typeof meta === 'undefined') meta = apiError[0];
    meta.title = error.response.statusText;
    err = `The request (${url}) was made and the server responded with ${error.response.status}`;
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    meta = {
      title: 'No Network',
      description: 'Check your internet connections and try agin',
    };
    err = `The request (${url}) was made but no response was received, the request: ${error.request}`;
  } else {
    // Something happened in setting up the request that triggered an Error
    meta = apiError[0];
    err = `Something happened in setting up the request (${url}) that triggered an Error`;
  }
  if (error.config.headers['Show-Notification'])
    notification.open({
      message: meta.title,
      description: meta.description,
      type: 'error',
    });

  throw Error(err);
});

export { request };
