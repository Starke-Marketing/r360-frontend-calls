const domain = window.location.hostname;
const apiBaseURI = `${window.location.protocol}//r360.successionadvisors.com`;
const publicKey = "exlpGzluuIw4FgkMGFg8kR9ouACJgKvf";

window.onload = (event) => {
    const loginButton = document.querySelector(".login-button");
    const signUpForm = document.querySelector(".signup-form");

    if (loginButton) {
      const identifier = loginButton.getAttribute("data-identifier");
      loginButton.addEventListener("click", (e) => autoLogin(identifier));
    }

    if (signUpForm) {
      const identifier = signUpForm.getAttribute("data-identifier");
      form.addEventListener("submit", (e) => autoSignUp(identifier));
    }
};

function autoLogin(identifier) {
  let formData = new FormData();
  formData.append("auth_key", publicKey);
  formData.append("user_identifier", identifier);

  fetch(`${apiBaseURI}/api/endpoint/user/auth`, {
    method: "post",
    redirect: "follow",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) =>
      data.result ? goToSite(data.secure_key) : console.log("failed")
    )
    .catch((err) => console.log(err));
}

function autoSignUp(identifier) {
  let formData = new FormData();
  formData.append("auth_key", publicKey);
  formData.append("user_identifier", identifier);

  fetch(`${apiBaseURI}/api/endpoint/user/create`, {
    method: "post",
    redirect: "follow",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) =>
      data.result ? goToSite(data.secure_key) : console.log("failed")
    )
    .catch((err) => console.log(err));
}

function goToSite(secureKey) {
    window.open(`${apiBaseURI}?secure_key=${secureKey}`);
}