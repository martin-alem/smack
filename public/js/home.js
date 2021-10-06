import request from "./agent.js";

(function () {
  const logout = document.getElementById("logout");
  logout.addEventListener("click", function () {
    const resource = "user/logout";
    const method = "GET";
    request(resource, method, {})
      .then((response) => {
        if (response.redirected) {
          const url = response.url;
          window.location.replace(url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
})();
