import request from "./agent.js";
import { showError } from "./utils.js";

(function () {
  const submitButton = document.getElementById("submit");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const error = document.querySelector(".error");
  const remember = document.getElementById("remember");

  submitButton.addEventListener("click", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (phone.value === "") {
      showError("Please provide phone", error);
    } else if (password.value === "") {
      showError("Please provide password", error);
    } else {
      const body = { phone: phone.value, password: password.value };
      const method = "POST";
      const resource = "user/login";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      request(resource, method, body)
        .then((response) => {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Sign in";
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
          submitButton.textContent = "Sign in";
          console.error(error);
        });
    }
  }
})();
