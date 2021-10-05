import submitForm from "./agent.js";

const validation = (function () {
  function validateCode(code) {
    return code !== "" && code.length === 6;
  }

  function validatePhone(phone) {
    return phone !== "" && phone.length === 10 && phone.split("").every((char) => Number.isInteger(parseInt(char, 10)));
  }

  return {
    validateCode,
    validatePhone,
  };
})();

const getPhoneNumber = (function () {
  const phone = document.cookie.split("=")[1] || "";
  return phone;
})();

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

    if (!validation.validateCode(code.value)) {
      showError("Invalid code");
    } else if (!validation.validatePhone(phone)) {
      showError("Invalid phone number");
    } else {
      const body = { phone: phone, code: code.value };
      const method = "POST";
      const resource = "user/verification";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      submitForm(resource, method, body)
        .then((response) => {
          if (response.ok) {
            const url = response.url;
            window.location.replace(url);
          } else {
            submitButton.removeAttribute("disabled");
            submitButton.textContent = "Verify phone";
            response
              .json()
              .then((data) => {
                if (data["status"] === "fail") {
                  showError(data["message"]);
                } else {
                  showError(data["message"]);
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
    submitForm(resource, method, body)
      .then((response) => {
        resend.textContent = "Request another here";
        response
          .json()
          .then((data) => {
            if (data["status"] === "fail") {
              showError(data["message"]);
            } else {
              showError(data["message"]);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showError(message) {
    error.textContent = message;
    error.classList.toggle("hide_error");
    setTimeout(function () {
      error.textContent = "";
      error.classList.toggle("hide_error");
    }, 3000);
  }
})();
