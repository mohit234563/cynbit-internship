let currentPage = 1;
let totalItems = 0;
let limit = 10;
let search = '';

const studentList = document.getElementById('studentList');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const itemsPerPage = document.getElementById('itemsPerPage');

async function fetchStudents() {
  const res = await fetch(`http://localhost:3002/api/students?page=${currentPage}&limit=${limit}&search=${search}`);
  const data = await res.json();
  totalItems = data.totalItems;
  renderStudents(data.students);
  updatePagination();
}

function renderStudents(students) {
  studentList.innerHTML = '';
  students.forEach(student => {
    const li = document.createElement('li');
    li.textContent = `${student.name} (${student.email})`;
    studentList.appendChild(li);
  });
}

function updatePagination() {
  pageInfo.textContent = `Page ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage * limit >= totalItems;
}

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchStudents();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage * limit < totalItems) {
    currentPage++;
    fetchStudents();
  }
});

searchInput.addEventListener('input', () => {
  search = searchInput.value;
  currentPage = 1;
  fetchStudents();
});

itemsPerPage.addEventListener('change', () => {
  limit = parseInt(itemsPerPage.value);
  currentPage = 1;
  fetchStudents();
});

fetchStudents();
