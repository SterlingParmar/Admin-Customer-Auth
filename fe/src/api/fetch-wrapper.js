import { toast } from "react-toastify";

export const fetchWrapper = {
  get,
  post,
};

function get(url) {
  const requestOptions = {
    method: "GET",
    headers: {},
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  const requestOptions = {
    method: "POST",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].includes(response.status || response.code)) {
        toast.error(`${data.message}`);
      }
      const error = (data && data) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
