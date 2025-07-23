const form = document.getElementById("registrationForm");
const message = document.getElementById("message");
const passwordInput = document.getElementById("password");
const strengthMsg = document.getElementById("strengthMsg");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent page reload

  // get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const branch = document.getElementById("branch").value.trim();
  const year = document.getElementById("year").value.trim();
  const password = passwordInput.value;

  // validation
  if (!name || !email || !branch || !year || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    message.style.color = "red";
    message.textContent = "Invalid email address.";
    return;
  }

  if (password.length < 6) {
    message.style.color = "red";
    message.textContent = "Password must be at least 6 characters.";
    return;
  }

  // success
  message.style.color = "green";
  message.textContent = "Registration successful!";
  form.reset();
  strengthMsg.textContent = "";
});

//  Password strength checker
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  if (val.length < 6) {
    strengthMsg.style.color = "red";
    strengthMsg.textContent = "Weak password";
  } else if (val.length < 10) {
    strengthMsg.style.color = "orange";
    strengthMsg.textContent = "Moderate password";
  } else {
    strengthMsg.style.color = "green";
    strengthMsg.textContent = "Strong password";
  }
});