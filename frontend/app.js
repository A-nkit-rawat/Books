const API_BASE = "http://localhost:3000/api";

const state = {
  page: 1,
  limit: 10,
  total: 0,
  books: [],
  editingId: null,
};

const elements = {
  list: document.getElementById("books-list"),
  pageInfo: document.getElementById("page-info"),
  prevPage: document.getElementById("prev-page"),
  nextPage: document.getElementById("next-page"),
  searchInput: document.getElementById("search-input"),
  ratingFilter: document.getElementById("rating-filter"),
  limitSelect: document.getElementById("limit-select"),
  form: document.getElementById("book-form"),
  cancelEdit: document.getElementById("cancel-edit"),
  formStatus: document.getElementById("form-status"),
  addButton: document.getElementById("add-button"),
  suggestButton: document.getElementById("suggest-button"),
  detailTitle: document.getElementById("detail-title"),
  detailAuthor: document.getElementById("detail-author"),
  detailDescription: document.getElementById("detail-description"),
  detailRating: document.getElementById("detail-rating"),
};

const showStatus = (message) => {
  elements.formStatus.textContent = message;
};

const updateDetailCard = (book) => {
  if (!book) {
    elements.detailTitle.textContent = "No book selected";
    elements.detailAuthor.textContent = "";
    elements.detailDescription.textContent = "";
    elements.detailRating.textContent = "";
    return;
  }

  elements.detailTitle.textContent = book.title;
  elements.detailAuthor.textContent = `by ${book.author}`;
  elements.detailDescription.textContent =
    book.description || "No description provided.";
  elements.detailRating.textContent = `Rating: ${book.rating ?? "N/A"}`;
};

const fetchBooks = async () => {
  const response = await fetch(
    `${API_BASE}?limit=${state.limit}&page=${state.page}`
  );
  if (!response.ok) {
    throw new Error("Failed to load books");
  }
  const payload = await response.json();
  state.books = payload.data.items;
  state.total = payload.data.total;
  render();
};

const render = () => {
  const filtered = filterBooks(state.books);
  elements.list.innerHTML = "";

  if (filtered.length === 0) {
    elements.list.innerHTML =
      '<div class="detail-card">No books match your filters.</div>';
  } else {
    filtered.forEach((book) => {
      const row = document.createElement("div");
      row.className = "book-row";
      row.innerHTML = `
        <div class="book-row__meta">
          <h4>${book.title}</h4>
          <p>${book.author} · Rating ${book.rating ?? "N/A"}</p>
        </div>
        <div class="book-row__actions">
          <button class="btn btn--ghost" data-action="edit">Update</button>
          <button class="btn btn--ghost" data-action="delete">Delete</button>
        </div>
      `;

      row.querySelector('[data-action="edit"]').addEventListener("click", () => {
        startEdit(book);
      });
      row
        .querySelector('[data-action="delete"]')
        .addEventListener("click", () => handleDelete(book));
      row.addEventListener("click", (event) => {
        if (event.target.closest("button")) {
          return;
        }
        updateDetailCard(book);
      });
      elements.list.appendChild(row);
    });
  }

  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));
  elements.pageInfo.textContent = `Page ${state.page} of ${totalPages}`;
  elements.prevPage.disabled = state.page <= 1;
  elements.nextPage.disabled = state.page >= totalPages;
};

const filterBooks = (books) => {
  const query = elements.searchInput.value.trim().toLowerCase();
  const rating = elements.ratingFilter.value;
  return books.filter((book) => {
    const matchesQuery =
      !query ||
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    const matchesRating = !rating || String(book.rating) === rating;
    return matchesQuery && matchesRating;
  });
};

const startEdit = (book) => {
  state.editingId = book.id;
  elements.form.title.value = book.title;
  elements.form.author.value = book.author;
  elements.form.description.value = book.description || "";
  elements.form.rating.value = book.rating ?? "1";
  elements.cancelEdit.disabled = false;
  showStatus(`Editing #${book.id}`);
  updateDetailCard(book);
};

const resetForm = () => {
  state.editingId = null;
  elements.form.reset();
  elements.form.rating.value = "1";
  elements.cancelEdit.disabled = true;
  showStatus("New");
};

const handleDelete = async (book) => {
  if (!window.confirm(`Delete "${book.title}"?`)) {
    return;
  }
  const response = await fetch(`${API_BASE}/${book.id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    alert("Failed to delete book.");
    return;
  }
  await fetchBooks();
  resetForm();
  updateDetailCard(null);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(elements.form);
  const payload = {
    title: formData.get("title").trim(),
    author: formData.get("author").trim(),
    description: formData.get("description").trim() || null,
    rating: Number(formData.get("rating")),
  };

  if (!payload.title || !payload.author) {
    alert("Title and author are required.");
    return;
  }

  const isEdit = Boolean(state.editingId);
  const endpoint = isEdit ? `${API_BASE}/${state.editingId}` : API_BASE;
  const method = isEdit ? "PUT" : "POST";

  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    alert("Failed to save book.");
    return;
  }

  await fetchBooks();
  resetForm();
};

const handleSuggestion = async () => {
  if (!state.total) {
    await fetchBooks();
  }
  const totalPages = Math.max(1, Math.ceil(state.total / state.limit));
  const randomPage = Math.floor(Math.random() * totalPages) + 1;
  const response = await fetch(
    `${API_BASE}/?limit=1&page=${randomPage}`
  );
  if (!response.ok) {
    alert("Failed to fetch suggestion.");
    return;
  }
  const payload = await response.json();
  const suggestion = payload.data.items[0];
  if (suggestion) {
    updateDetailCard(suggestion);
  }
};

const init = () => {
  elements.prevPage.addEventListener("click", () => {
    state.page -= 1;
    fetchBooks();
  });

  elements.nextPage.addEventListener("click", () => {
    state.page += 1;
    fetchBooks();
  });

  elements.limitSelect.addEventListener("change", () => {
    state.limit = Number(elements.limitSelect.value);
    state.page = 1;
    fetchBooks();
  });

  elements.searchInput.addEventListener("input", render);
  elements.ratingFilter.addEventListener("change", render);

  elements.form.addEventListener("submit", handleSubmit);
  elements.cancelEdit.addEventListener("click", () => {
    resetForm();
    updateDetailCard(null);
  });

  elements.addButton.addEventListener("click", () => {
    resetForm();
    elements.form.title.focus();
  });

  elements.suggestButton.addEventListener("click", handleSuggestion);

  fetchBooks().catch(() => {
    elements.list.innerHTML =
      '<div class="detail-card">Unable to reach the API. Check the server and refresh.</div>';
  });
};

init();
