import request from "./agent.js";
import { validation, showFormError, showError } from "./utils.js";

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
            if (response.redirected) {
              window.location.replace(response.url);
            }
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
            if (response.redirected) {
              window.location.replace(response.url);
            }
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
    document.querySelectorAll(".avatar").forEach((item) => (item.textContent = `${newValue.charAt(0).toUpperCase()}`));
  }

  function onEmailUpdate(newValue) {
    document.querySelectorAll(".user_email").forEach((item) => (item.textContent = newValue));
  }
})();

//update profile image
(function () {
  const uploadInput = document.getElementById("profile_picture");
  const uploadButton = document.getElementById("add_a_photo");
  const imgProfile = document.getElementById("img_profile");
  const id = document.getElementById("user_id");

  uploadButton.addEventListener("click", function (event) {
    event.preventDefault();
    uploadInput.click();
  });
  uploadInput.addEventListener("change", handleUploadImage, false);

  function handleUploadImage(event) {
    event.preventDefault();
    const file = event.target.files[0];
    if (file.size > 3e7) {
      showFormError(imgProfile);
    } else {
      const extension = file["type"].split("/")[1];
      let fileContent = "";
      const reader = new FileReader();
      reader.onload = (event) => {
        imgProfile.src = event.target.result;
        fileContent = event.target.result;
        const resource = "user/update";
        const method = "PATCH";
        const imageURL = `https://smacku.herokuapp.com/private/images/${id.value}.${extension}`;
        const body = { id: id.value, extension: extension, rawImage: fileContent, user_data: { image: imageURL } };
        request(resource, method, body)
          .then((response) => {
            if (response.ok) {
              onImageUpdate(fileContent);
              if (response.redirected) {
                window.location.replace(response.url);
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
      reader.readAsDataURL(file);
    }
  }

  function onImageUpdate(fileContent) {
    document.getElementById("second_image").src = fileContent;
  }
})();

(function () {
  const submitButton = document.getElementById("invite_friend_button");
  const phone = document.getElementById("friend_phone");
  const message = document.getElementById("invite_message");
  const information = document.querySelector(".info");

  submitButton.addEventListener("click", handleFormSubmit);

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!validation().validatePhone(phone.value)) {
      showFormError(phone);
    } else if (message.value === "") {
      showFormError(message);
    } else {
      const body = { phone: phone.value, message: message.value };
      const resource = "user/invite";
      const method = "POST";
      submitButton.setAttribute("disabled", "disabled");
      submitButton.textContent = "Please wait...";
      request(resource, method, body)
        .then((response) => {
          if (response.ok) {
            if (response.redirected) {
              location.replace(response.url);
            } else {
              response
                .json()
                .then((data) => {
                  showError(data, information);
                  phone.value = "";
                  message.value = "";
                  submitButton.removeAttribute("disabled");
                  submitButton.textContent = "Invite Friend";
                })
                .catch((error) => {
                  submitButton.removeAttribute("disabled");
                  submitButton.textContent = "Invite Friend";
                  console.error(error);
                });
            }
          }
        })
        .catch((error) => {
          submitButton.removeAttribute("disabled");
          submitButton.textContent = "Invite Friend";
          console.error(error);
        });
    }
  }
})();
