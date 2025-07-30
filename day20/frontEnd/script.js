const API_URL = "http://localhost:5002/api/auth";

// Register
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    document.getElementById("registerMsg").innerText = data.message;
});

// Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        document.getElementById("loginMsg").innerText = "Login successful!";
        setTimeout(() => (window.location = "profile.html"), 1000);
    } else {
        document.getElementById("loginMsg").innerText = data.message;
    }
});

// Fetch Profile
// document.getElementById("fetchProfile")?.addEventListener("click", async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API_URL}/profile`, {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     document.getElementById("profileMsg").innerText = JSON.stringify(data);
// });
