const BASE_URL = 'http://localhost:5000/api';


async function register() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const branch = document.getElementById('branch').value;
    const year = document.getElementById('year').value;

    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, branch, year }),
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) window.location.href = 'login.html';
}

async function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });

    const data = await res.json();
    alert(data.message || data.error);
    if (res.ok) window.location.href = 'home.html';
}

async function fetchStudents() {
    const res = await fetch(`${BASE_URL}/students/all`);
    const students = await res.json();

    const container = document.getElementById('students');
    container.innerHTML = '';
    students.forEach(s => {
        container.innerHTML += `
            <div class="student-card">
                <strong>${s.name}</strong><br>
                ${s.email}<br>
                ${s.branch} - ${s.year}
            </div>`;
    });
}
