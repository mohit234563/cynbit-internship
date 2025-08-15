const token = localStorage.getItem('token');
if (!token) {
  alert("You must be logged in.");
  window.location.href = "login.html";
}

// Handle Profile Update
document.getElementById('profileForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const branch = document.getElementById('branch').value.trim();
  const year = document.getElementById('year').value.trim();
  const linkedin = document.getElementById('linkedin').value.trim();
  const github = document.getElementById('github').value.trim();

  try {
    const res = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ branch, year, linkedin, github })
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Profile updated successfully.');
    } else {
      alert(data.error || 'Failed to update profile.');
    }
  } catch (err) {
    alert('❌ Server error.');
  }
});

// Handle Skill Submission
document.getElementById('skillsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const skillsInput = document.getElementById('skills').value.trim();
  const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill !== "");

  if (skills.length === 0) {
    alert("Please enter at least one skill.");
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ skills })
    });

    const data = await res.json();
    if (res.ok) {
      alert('✅ Skills added successfully.');
      document.getElementById('skills').value = "";
    } else {
      alert(data.error || 'Failed to add skills.');
    }
  } catch (err) {
    alert('❌ Error adding skills.');
  }
});

function logout() {
  localStorage.removeItem('token');
  window.location.href = "login.html";
}
