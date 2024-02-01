const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

document.getElementById("signupFormLink").addEventListener("click", () => {
  loginForm.style.display = "none";
  signupForm.style.display = "block";
});

document.getElementById("loginFormLink").addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  // Perform login validation here and handle success or error.
  console.log("Login attempt with username:", username, "and password:", password);
});

document.getElementById("signupForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;
  // Perform signup validation here and handle success or error.
  console.log("Signup attempt with username:", username, "and password:", password);
});
