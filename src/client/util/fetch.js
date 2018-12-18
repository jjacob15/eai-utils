const api = function(method, path, data, headers = {}) {
  return fetch(`${process.env.API_PATH}${path}`, {
    method: method.toUpperCase(),
    body: JSON.stringify(data), // send it as stringified json
    headers: Object.assign({}, api.headers, headers), // extend the headers
  }).then(res => (res.ok ? res.json() : Promise.reject(res)));
};

api.headers = {
  Accept: 'application/json', // receive json
  'Content-Type': 'application/json', // send json
};

['get', 'post', 'put', 'delete'].forEach(method => {
  api[method] = api.bind(null, method);
});

export default api;
