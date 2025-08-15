async function fetchStats() {
  try {
    const res = await fetch('http://localhost:5001/api/stats');
    const data = await res.json();

    // Total count
    document.getElementById('total-count').textContent =
      `Total Registered Students: ${data.total}`;

    // Branch chart
    const ctx = document.getElementById('branchChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.byBranch.map(b => b.branch),
        datasets: [{
          data: data.byBranch.map(b => b.count),
          backgroundColor: ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa']
        }]
      }
    });

    // Recent registrations table
    const tbody = document.querySelector('#recent-table tbody');
    tbody.innerHTML = '';
    data.recent.forEach(student => {
      const row = `
        <tr>
          <td>${student.name}</td>
          <td>${student.email}</td>
          <td>${student.branch}</td>
          <td>${student.course}</td>
        </tr>`;
      tbody.innerHTML += row;
    });

  } catch (error) {
    console.error('Failed to load stats:', error);
  }
}

function downloadCSV() {
  window.location.href = 'http://localhost:5001/api/stats/export';
}

window.onload = fetchStats;
