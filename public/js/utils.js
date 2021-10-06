export function validation() {
  function validateCode(code) {
    return code !== "" && code.length === 6;
  }

  function validatePhone(phone) {
    return phone !== "" && phone.length === 10 && phone.split("").every((char) => Number.isInteger(parseInt(char, 10)));
  }

  function validateName(name) {
    return name !== "" && name.length >= 2 && name.length <= 20;
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
    validateCode,
  };
}

export function getPhoneNumber() {
  const phone = document.cookie.split("=")[1] || "";
  return phone;
}


export function showError(message, error) {
  error.textContent = message;
  error.classList.toggle("hide_error");
  setTimeout(function () {
    error.textContent = "";
    error.classList.toggle("hide_error");
  }, 3000);
}
