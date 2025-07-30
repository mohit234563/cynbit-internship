// Check if token exists
const token = localStorage.getItem("token");
if (!token) {
  alert("Please login first!");
  window.location.href = "login.html";
}

fetch("http://127.0.0.1:5002/api/auth/profile", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => {
    if (res.status === 401 || res.status === 403) {
      alert("Session expired or invalid token! Please login again.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    }
    return res.json();
  })
  .then(data => {
    document.getElementById("userName").textContent = data.name;
    document.getElementById("userEmail").textContent = data.email;
    document.getElementById("userRole").textContent = data.role;
  })
  .catch(err => console.error("Error loading profile:", err));

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "login.html";
});
