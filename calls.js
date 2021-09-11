const domain = window.location.hostname;
const apiBaseURI = `https://r360.successionadvisors.com`;
const publicKey = "exlpGzluuIw4FgkMGFg8kR9ouACJgKvf";

window.onload = () => {
    const loginButton = document.getElementById("r360-login-button");

    if (loginButton) {
      const member_id = loginButton.getAttribute("data-memberid");
      const email = loginButton.getAttribute("data-email");
      loginButton.addEventListener("click", () => autoLogin(member_id, email));
    }
};

function autoLogin(member_id, email) {
  let formData = new FormData();
  formData.append("auth_key", publicKey);
  formData.append("member_id", member_id);
  formData.append("email", email);

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

function goToSite(secureKey) {
  window.open(`${apiBaseURI}?secure_key=${secureKey}`);
}
