export default function request(resource, method, data = {}) {
  //https://smacku.herokuapp.com
  const BASE_URL = "https://smacku.herokuapp.com";

  const init = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    mode: "same-origin",
    credentials: "same-origin",
    cache: "default",
    redirect: "follow",
    referrer: "smack",
    referrerPolicy: "same-origin",
  };

  if (method !== "GET" && method !== "HEAD") {
    init["body"] = JSON.stringify(data);
  }

  return fetch(`${BASE_URL}/${resource}`, init);
}
