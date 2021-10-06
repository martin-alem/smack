import request from "./agent.js";

// logout and delete account
(function () {
  const logout = document.getElementById("logout");
  const deleteAccount = document.getElementById("delete");
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

  deleteAccount.addEventListener("click", function () {
    const resource = "user/remove_account";
    const method = "DELETE";
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
