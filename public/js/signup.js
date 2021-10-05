import submitForm from "./agent.js";

const validation = (function () {
  function validateName(name) {
    return name !== "" && name.length >= 2 && name.length <= 20;
  }

  function validatePhone(phone) {
    return phone !== "" && phone.length === 10 && phone.split("").every((char) => Number.isInteger(parseInt(char, 10)));
  }

  function validateEmail(email) {
    return email !== "" && /^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/gim.test(email);
  }

  function validatePassword(password) {
    return password !== "" && password.length >= 6;
  }

  return {
    validateName,
    validatePhone,
    validatePassword,
    validateEmail,
  };
})();

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

    if (!validation.validateName(firstName.value)) {
      showError("Invalid first name");
    } else if (!validation.validateName(lastName.value)) {
      showError("Invalid last name");
    } else if (!validation.validatePhone(phone.value)) {
      showError("Invalid phone");
    } else if (!validation.validateEmail(email.value)) {
      showError("Invalid email");
    } else if (!validation.validatePassword(password.value)) {
      showError("Invalid password. must be at least 6 characters");
    } else {
      const body = { firstName: firstName.value, lastName: lastName.value, email: email.value, phone: phone.value, password: password.value };
      const method = "POST";
      const resource = "user/signup";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      submitForm(resource, method, body)
        .then((response) => {
          if (response.ok) {
            const url = response.url;
            window.location.replace(url);
          } else {
            submitButton.removeAttribute("disabled");
            submitButton.textContent = "Sign up";
            response
              .json()
              .then((data) => {
                if (data["status"] === "fail") {
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

  function showError(message) {
    error.textContent = message;
    error.classList.toggle("hide_error");
    setTimeout(function () {
      error.textContent = "";
      error.classList.toggle("hide_error");
    }, 3000);
  }
})();
