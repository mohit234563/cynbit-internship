const token = localStorage.getItem('token');
if (!token) {
  alert("You must be logged in.");
  window.location.href = "login.html";
}

async function fetchStudents() {
  const searchQuery = document.getElementById('searchInput').value.trim();
  let url = 'http://localhost:5000/api/students';

  if (searchQuery) {
    url = `http://localhost:5000/api/students?skill=${encodeURIComponent(searchQuery)}`;
  }

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });

    const data = await res.json();
    const studentsDiv = document.getElementById('studentsList');
    studentsDiv.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
      studentsDiv.innerHTML = `<p class="text-center">No students found.</p>`;
      return;
    }

    data.forEach(student => {
      const skillsBadges = student.skills.map(skill =>
        `<span class="badge bg-info text-dark me-1">${skill}</span>`
      ).join(" ");

      const card = `
        <div class="col-md-4 mb-4">
          <div class="card shadow-sm">
            <div class="card-body">
              <h5 class="card-title">${student.name}</h5>
              <p><strong>Branch:</strong> ${student.branch || "N/A"}</p>
              <p><strong>Year:</strong> ${student.year || "N/A"}</p>
              <p><strong>Skills:</strong><br>${skillsBadges}</p>
              <div class="d-flex justify-content-start gap-2">
                ${student.linkedin ? `<a href="${student.linkedin}" target="_blank" class="btn btn-sm btn-outline-primary">LinkedIn</a>` : ""}
                ${student.github ? `<a href="${student.github}" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      `;
      studentsDiv.innerHTML += card;
    });

  } catch (err) {
    console.error(err);
    alert("Error fetching students.");
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = "login.html";
}

// Fetch all students by default
window.onload = fetchStudents;
