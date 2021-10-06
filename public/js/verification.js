import request from "./agent.js";
import { getPhoneNumber, validation, showError } from "./utils.js";

(function () {
  const submitButton = document.getElementById("submit_btn");
  const phone = getPhoneNumber;
  const code = document.getElementById("code");
  const error = document.querySelector(".error");
  const resend = document.querySelector("#resend");

  submitButton.addEventListener("click", handleFormSubmit);
  resend.addEventListener("click", handleResend);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!validation().validateCode(code.value)) {
      showError("Invalid code");
    } else if (!validation().validatePhone(phone)) {
      showError("Invalid phone number");
    } else {
      const body = { phone: phone, code: code.value };
      const method = "POST";
      const resource = "user/verification";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      request(resource, method, body)
        .then((response) => {
          if (response.redirected) {
            const url = response.url;
            window.location.replace(url);
          } else {
            submitButton.removeAttribute("disabled");
            submitButton.textContent = "Verify phone";
            response
              .json()
              .then((data) => {
                if (data["status"] === "fail") {
                  showError(data["message"], error);
                } else {
                  showError(data["message"], error);
                }
              })
              .catch((error) => {
                console.error(error);
              });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleResend(event) {
    event.preventDefault();
    const body = { phone: phone };
    const method = "POST";
    const resource = "user/resend_verification";
    resend.textContent = "Please wait...";
    request(resource, method, body)
      .then((response) => {
        resend.textContent = "Request another here";
        response
          .json()
          .then((data) => {
            if (data["status"] === "fail") {
              showError(data["message"], error);
            } else {
              showError(data["message"], error);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        resend.textContent = "Request another here";
        console.error(error);
      });
  }
})();
