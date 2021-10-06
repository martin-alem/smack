export default function request(resource, method, data) {
  const BASE_URL = "http://localhost:3000";

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
