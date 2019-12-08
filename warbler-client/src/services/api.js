import axios from 'axios';

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   } else {
     delete axios.defaults.headers.common["Authorization"];
   }
}

/**
 * Generic function for wrapping Axios calls
 * @param {string} method - The HTTP request method - get, post etc
 * @param {string} path - The URL to get/post to
 * @param {object} data - Any data that the AJAX call requires (eg. username/password...)
 * @return Promise;
 */
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    /*
     * This bracket notation resolves to axois.get or .post etc - and then it's the usual
     * Axois format ( see https://github.com/axios/axios )
     */
    return axios[method](path, data).then(res => {
      // res.data is built into Axios - it's just what is calls it
      // Because apiCall returns a Promise, we need to return a resolve call() not just the data
      return resolve(res.data);
    }).catch((err) => {
      // This response.data.error is built into Axois and 'just is' what it returns on failed promise
      // Because the apiCall returns a promise, need to return a reject() call
      return reject(err.response.data.error);
    });
  });
}
