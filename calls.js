const apiBaseURI = `https://r360.successionadvisors.com`;
const publicKey = "exlpGzluuIw4FgkMGFg8kR9ouACJgKvf";

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

window.onload = () => {
  const loginButton = document.getElementById("r360-login-button");

  if (loginButton) {
    const member_id = loginButton.getAttribute("data-memberid");
    const email = loginButton.getAttribute("data-email");
    loginButton.addEventListener("click", () => autoLogin(member_id, email));
  }
};

const autoLogin = (member_id, email) => {
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

const goToSite = (secureKey) => {
  const redirectUrl = getUrlString(secureKey);
  isSafari ? redirectSafari(redirectUrl) : redirectAnyBrowser(redirectUrl);
}

const redirectAnyBrowser = (redirectUrl) => {
  window.open(redirectUrl);
};

const redirectSafari = (redirectUrl) => {
  window.location.assign(redirectUrl);
};

const getUrlString = (secureKey) => {
  return `${apiBaseURI}?secure_key=${secureKey}`;
}
