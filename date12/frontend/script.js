const API = 'http://localhost:3001/blogs';

document.getElementById('blog-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, content })
  });

  e.target.reset();
  loadBlogs();
});

async function likeBlog(id) {
  await fetch(`${API}/${id}/like`, { method: 'POST' });
  loadBlogs();
}

async function commentBlog(id, text, commenter) {
  if (!text || !commenter) return;
  await fetch(`${API}/${id}/comment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ comment_text: text, commenter })
  });
  loadBlogs();
}

async function loadBlogs() {
  const res = await fetch(API);
  const blogs = await res.json();
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  blogs.forEach(blog => {
    const div = document.createElement('div');
    div.className = 'blog';
    div.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.content}</p>
      <p class="meta">By <strong>${blog.author}</strong> | ${new Date(blog.created_at).toLocaleString()}</p>
      <p><strong>Likes:</strong> ${blog.likes} <button onclick="likeBlog(${blog.id})">👍 Like</button></p>

      <div class="comment-section">
        <input placeholder="Your name" id="name-${blog.id}" />
        <input placeholder="Comment" id="comment-${blog.id}" />
        <button onclick="commentBlog(${blog.id}, document.getElementById('comment-${blog.id}').value, document.getElementById('name-${blog.id}').value)">💬 Comment</button>
      </div>

      <ul class="comments">
        ${blog.comments.map(c => `<li><strong>${c.commenter}:</strong> ${c.comment_text}</li>`).join('')}
      </ul>
    `;
    feed.appendChild(div);
  });
}

loadBlogs();
