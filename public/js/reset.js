import request from "./agent.js";
import { showError } from "./utils.js";
import { validation } from "./utils.js";

(function () {
  const phone = new URLSearchParams(location.search).get("phone") || "";
  const duration = new URLSearchParams(location.search).get("duration") || 0;
  const submitButton = document.getElementById("submit");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm_password");
  const error = document.querySelector(".error");

  submitButton.addEventListener("click", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (password.value === "") {
      showError("Please provide password", error);
    } else if (confirmPassword.value === "") {
      showError("Please provide confirm password", error);
    } else if (!validation().validatePassword(password.value)) {
      showError("Password did not meet criteria", error);
    } else if (confirmPassword.value !== password.value) {
      showError("Password must match", error);
    } else {
      const body = { password: password.value };
      const method = "PUT";
      const resource = `user/reset?phone=${phone}&duration=${duration}`;
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      request(resource, method, body)
        .then((response) => {
          console.log(response);
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Reset password";
          if (response.redirected) {
            const url = response.url;
            window.location.replace(url);
          } else {
            response
              .json()
              .then((data) => {
                if (data["status"] === "fail") {
                  showError(data["message"], error);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Reset password";
          console.error(error);
        });
    }
  }
})();
