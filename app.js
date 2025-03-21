document.addEventListener("DOMContentLoaded", () => {
    const bookModal = new bootstrap.Modal(document.getElementById("bookModal"));
    const bookList = document.getElementById("book-list");
    const modalContent = document.getElementById("modalContent");
    const themeToggle = document.getElementById("theme-toggle");

    if (typeof books === "undefined") {
        console.error("❌ books array is not defined. Ensure data.js is loaded before app.js.");
        return;
    }

    function renderBooks() {
        bookList.innerHTML = ""; 

        books.forEach((book, index) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("col");

            bookCard.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <div class="image-container">
                        <img src="${book.imageLink}" class="card-img-top book-img" alt="${book.title}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text"><strong>Author:</strong> ${book.author}</p>
                        <p class="card-text"><strong>Year:</strong> ${book.year}</p>
                        <button class="btn btn-primary" onclick="openModal(${index})">More Info</button>
                    </div>
                </div>
            `;

            bookList.appendChild(bookCard);
        });

        updateCardTitles();
    }

    window.openModal = function (index) {
        const book = books[index];

        modalContent.innerHTML = `
            <img src="${book.imageLink}" class="img-fluid mb-3 modal-img" alt="${book.title}">
            <h5 class="modal-title">${book.title}</h5>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Year:</strong> ${book.year}</p>
            <p><strong>Language:</strong> ${book.language}</p>
            <p><strong>Country:</strong> ${book.country}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <a href="${book.link}" target="_blank" class="btn btn-success">Read More</a>
        `;

        updateModalTheme(); 
        bookModal.show();
    };

    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");

        updateModalTheme();
        updateCardTitles();
        updateThemeToggleText();
    }

    function updateModalTheme() {
        const modal = document.querySelector(".modal-content");
        const modalTitle = document.querySelector(".modal-title");

        if (!modal) return;

        if (document.body.classList.contains("dark-mode")) {
            modal.classList.add("dark-mode");
            modal.classList.remove("light-mode");
            if (modalTitle) modalTitle.style.color = "#FFD700"; 
        } else {
            modal.classList.add("light-mode");
            modal.classList.remove("dark-mode");
            if (modalTitle) modalTitle.style.color = "#d4af37"; 
        }
    }

    function updateCardTitles() {
        const cardTitles = document.querySelectorAll(".card-title");
        cardTitles.forEach(title => {
            title.style.color = document.body.classList.contains("dark-mode") ? "#FFD700" : "#d4af37"; 
        });
    }

    function updateThemeToggleText() {
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeToggleText();
    }

    themeToggle.addEventListener("click", toggleTheme);

    document.getElementById("bookModal").addEventListener("show.bs.modal", updateModalTheme);

    renderBooks();
});
