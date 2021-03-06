import request from "./agent.js";
import { showError } from "./utils.js";

(function () {
  const submitButton = document.getElementById("submit");
  const phone = document.getElementById("phone");
  const info = document.querySelector(".info");
  const error = document.querySelector(".error");

  submitButton.addEventListener("click", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (phone.value === "") {
      showError("Please provide phone", info);
    } else {
      const body = { phone: phone.value };
      const method = "POST";
      const resource = "user/reset_request";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      request(resource, method, body)
        .then((response) => {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Request reset";
          response
            .json()
            .then((data) => {
              if (data["status"] === "fail") {
                showError(data["message"], error);
              } else {
                showError(data["message"], info);
                setInterval(() => {
                  location.replace("https://smacku.herokuapp.com/login");
                }, 6000);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          submitButton.textContent = "Request reset";
          console.error(error);
        });
    }
  }
})();
