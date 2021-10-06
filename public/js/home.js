import request from "./agent.js";
import { validation, showFormError } from "./utils.js";

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

//update profile Information
(function () {
  const updateFirstNameForm = document.getElementById("update_first_name_form");
  const updateEmailForm = document.getElementById("update_email_form");
  const firstName = document.getElementById("update_first_name");
  const lastName = document.getElementById("last_name");
  const email = document.getElementById("update_email");
  const id = document.getElementById("user_id");

  updateFirstNameForm.addEventListener("submit", handleUpdateFirstName);
  updateEmailForm.addEventListener("submit", handleUpdateEmail);

  function handleUpdateFirstName(event) {
    event.preventDefault();
    if (!validation().validateName(firstName.value)) {
      showFormError(firstName);
    } else {
      const resource = "user/update";
      const method = "PATCH";
      const body = { id: id.value, user_data: { firstName: firstName.value } };
      request(resource, method, body)
        .then((response) => {
          if (response.ok) {
            onFirstNameUpdate(firstName.value);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function handleUpdateEmail(event) {
    event.preventDefault();
    if (!validation().validateEmail(email.value)) {
      showFormError(email);
    } else {
      const resource = "user/update";
      const method = "PATCH";
      const body = { id: id.value, user_data: { email: email.value } };
      request(resource, method, body)
        .then((response) => {
          if (response.ok) {
            onEmailUpdate(email.value);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function onFirstNameUpdate(newValue) {
    document.title = `Home | ${newValue} ${lastName.value}`;
    document.querySelectorAll(".user_full_name").forEach((item) => (item.textContent = `${newValue} ${lastName.value}`));
    document.querySelectorAll(".user_first_name").forEach((item) => (item.textContent = newValue));
  }

  function onEmailUpdate(newValue) {
    document.querySelectorAll(".user_email").forEach((item) => (item.textContent = newValue));
  }
})();
