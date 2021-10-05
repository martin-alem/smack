export default function submitForm(resource, method, data) {
  const BASE_URL = "http://localhost:3000";

  const init = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    mode: "same-origin",
    credentials: "same-origin",
    cache: "default",
    redirect: "follow",
    referrer: "smack",
    referrerPolicy: "same-origin",
  };

  return fetch(`${BASE_URL}/${resource}`, init);
}
