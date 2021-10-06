import request from "./agent.js";
import { validation, showError } from "./utils.js";

(function () {
  const submitButton = document.getElementById("register");
  const firstName = document.getElementById("first_name");
  const lastName = document.getElementById("last_name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const error = document.querySelector(".error");

  submitButton.addEventListener("click", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();

    if (!validation().validateName(firstName.value)) {
      showError("Invalid first name");
    } else if (!validation().validateName(lastName.value)) {
      showError("Invalid last name");
    } else if (!validation().validatePhone(phone.value)) {
      showError("Invalid phone");
    } else if (!validation().validateEmail(email.value)) {
      showError("Invalid email");
    } else if (!validation().validatePassword(password.value)) {
      showError("Invalid password. must be at least 6 characters");
    } else {
      const body = { firstName: firstName.value, lastName: lastName.value, email: email.value, phone: phone.value, password: password.value };
      const method = "POST";
      const resource = "user/signup";

      request(resource, method, body)
        .then((response) => {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Sign up";
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
          submitButton.textContent = "Sign up";
          console.error(error);
        });
    }
  }
})();
