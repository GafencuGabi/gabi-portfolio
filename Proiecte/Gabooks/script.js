const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsDiv = document.getElementById('results');
const paginationDiv = document.getElementById('pagination');
const modal = document.getElementById('modal');
const homeBtn = document.getElementById('home-btn');
const favoritesBtn = document.getElementById('favorites-btn');
const darkModeBtn = document.getElementById('darkmode-btn');
const navBtns = document.querySelectorAll('.nav-btn');

let currentPage = 1;
let currentQuery = '';
let totalItems = 0;
const booksPerPage = 9;
let currentBooks = [];
let showingFavorites = false;

// Debounce pentru search
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Dark mode
function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    localStorage.setItem('gabooks_darkmode', on ? '1' : '0');
    darkModeBtn.textContent = on ? '☀️' : '🌙';
}
function loadDarkMode() {
    const dark = localStorage.getItem('gabooks_darkmode') === '1';
    setDarkMode(dark);
}
darkModeBtn.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
});
loadDarkMode();

// Favorite helpers
function getFavorites() {
    return JSON.parse(localStorage.getItem('gabooks_favorites') || '[]');
}
function setFavorites(favs) {
    localStorage.setItem('gabooks_favorites', JSON.stringify(favs));
}
function isFavorited(id) {
    return getFavorites().includes(id);
}
function saveFavoriteBook(book) {
    let favBooks = JSON.parse(localStorage.getItem('gabooks_favbooks') || '{}');
    favBooks[book.id] = book;
    localStorage.setItem('gabooks_favbooks', JSON.stringify(favBooks));
}
function getFavoriteBooks() {
    let favBooks = JSON.parse(localStorage.getItem('gabooks_favbooks') || '{}');
    let favs = getFavorites();
    return favs.map(id => favBooks[id]).filter(Boolean);
}
function toggleFavorite(book) {
    let favs = getFavorites();
    if (favs.includes(book.id)) {
        favs = favs.filter(favId => favId !== book.id);
    } else {
        favs.push(book.id);
        saveFavoriteBook(book);
    }
    setFavorites(favs);
    if (showingFavorites) {
        renderBooks(getFavoriteBooks());
    } else {
        renderBooks(currentBooks);
    }
}

// Search events
const debouncedSearch = debounce(() => {
    if (searchInput.value.trim()) {
        currentQuery = searchInput.value.trim();
        currentPage = 1;
        showingFavorites = false;
        setActiveNav('home-btn');
        searchBooks(currentQuery, currentPage);
    }
}, 400);

searchButton.addEventListener('click', debouncedSearch);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') debouncedSearch();
});
searchInput.addEventListener('input', debouncedSearch);

homeBtn.addEventListener('click', () => {
    setActiveNav('home-btn');
    resultsDiv.innerHTML = '<p class="welcome-msg">📚 Explorează lumea cărților!</p>';
    paginationDiv.innerHTML = '';
    searchInput.value = '';
    showingFavorites = false;
});

favoritesBtn.addEventListener('click', () => {
    setActiveNav('favorites-btn');
    showingFavorites = true;
    renderBooks(getFavoriteBooks());
    paginationDiv.innerHTML = '';
});

function setActiveNav(id) {
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// Skeleton loading
function showLoadingSkeleton() {
    resultsDiv.innerHTML = Array(booksPerPage).fill().map(() => `
        <div class="skeleton-card">
            <div class="skeleton-img"></div>
            <div class="skeleton-content">
                <div class="skeleton-line"></div>
                <div class="skeleton-line short"></div>
            </div>
        </div>
    `).join('');
}

// Search books
async function searchBooks(query, page) {
    showLoadingSkeleton();
    paginationDiv.innerHTML = '';
    const startIndex = (page - 1) * booksPerPage;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${booksPerPage}&lang=ro`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        totalItems = data.totalItems || 0;
        currentBooks = (data.items || []).map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || [],
            thumbnail: item.volumeInfo.imageLinks?.thumbnail || 'https://placehold.co/120x180?text=No+Cover',
            description: item.volumeInfo.description || 'Fără descriere.',
            pageCount: item.volumeInfo.pageCount || 'Necunoscut',
            publishedDate: item.volumeInfo.publishedDate || 'Necunoscut',
            categories: item.volumeInfo.categories || [],
            averageRating: item.volumeInfo.averageRating || 'N/A',
            infoLink: item.volumeInfo.infoLink || '#'
        }));
        renderBooks(currentBooks);
        renderPagination();
    } catch (error) {
        resultsDiv.innerHTML = '<p>Eroare la căutare. Încearcă din nou.</p>';
    }
}

// Render books
function renderBooks(books) {
    resultsDiv.innerHTML = '';
    if (!books || books.length === 0) {
        resultsDiv.innerHTML = '<p>Nicio carte găsită.</p>';
        return;
    }
    books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';

        const img = document.createElement('img');
        img.src = book.thumbnail;
        img.alt = book.title;
        img.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'book-info';

        const title = document.createElement('div');
        title.className = 'book-title';
        title.textContent = book.title;

        const author = document.createElement('div');
        author.className = 'book-author';
        author.textContent = book.authors.length ? `de ${book.authors.join(', ')}` : 'Autor necunoscut';

        const meta = document.createElement('div');
        meta.className = 'book-meta';
        meta.textContent = `${book.publishedDate} • ${book.categories[0] || 'Fără categorie'}`;

        info.appendChild(title);
        info.appendChild(author);
        info.appendChild(meta);

        const actions = document.createElement('div');
        actions.className = 'book-actions';

        const detailsBtn = document.createElement('button');
        detailsBtn.className = 'details-btn';
        detailsBtn.textContent = 'Detalii';
        detailsBtn.onclick = () => showDetails(book);

        const favBtn = document.createElement('button');
        favBtn.className = 'fav-btn' + (isFavorited(book.id) ? ' favorited' : '');
        favBtn.textContent = isFavorited(book.id) ? (showingFavorites ? '💚 Favorit' : '💚 Favorite') : '☆ Favorite';
        favBtn.onclick = () => toggleFavorite(book);

        actions.appendChild(detailsBtn);
        actions.appendChild(favBtn);

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(actions);

        resultsDiv.appendChild(card);
    });
}

// Render pagination
function renderPagination() {
    if (showingFavorites) {
        paginationDiv.innerHTML = '';
        return;
    }

    const totalPages = Math.ceil(totalItems / booksPerPage);

    if (totalPages <= 1) {
        paginationDiv.innerHTML = '';
        return;
    }

    paginationDiv.innerHTML = '';

    // Buton "Prima pagină"
    const firstBtn = document.createElement('button');
    firstBtn.textContent = '<< Prima';
    firstBtn.classList.add('page-nav');
    firstBtn.disabled = currentPage === 1;
    firstBtn.onclick = () => {
        currentPage = 1;
        searchBooks(currentQuery, currentPage);
    };
    paginationDiv.appendChild(firstBtn);

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
        end = Math.min(5, totalPages);
    }

    if (currentPage > totalPages - 2) {
        start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        if (i === currentPage) btn.classList.add('active');
        btn.onclick = () => {
            currentPage = i;
            searchBooks(currentQuery, currentPage);
        };
        paginationDiv.appendChild(btn);
    }

    // Buton "Next"
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Următoarea >';
    nextBtn.classList.add('page-nav');
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        searchBooks(currentQuery, currentPage);
    };
    paginationDiv.appendChild(nextBtn);
}

// Modal detalii
function showDetails(book) {
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-btn" title="Închide">&times;</button>
            <h2 style="margin-bottom:0.5rem;">${book.title}</h2>
            <p><strong>Autor:</strong> ${book.authors.length ? book.authors.join(', ') : 'Necunoscut'}</p>
            <p><strong>Categorie:</strong> ${book.categories.length ? book.categories.join(', ') : 'Necunoscut'}</p>
            <p><strong>Publicată:</strong> ${book.publishedDate}</p>
            <p><strong>Pagini:</strong> ${book.pageCount}</p>
            <p><strong>Rating:</strong> ${book.averageRating}</p>
            <img src="${book.thumbnail}" alt="${book.title}" style="margin:1rem 0;max-width:120px;display:block;">
            <div style="max-height:120px;overflow:auto;font-size:0.98rem;color:#444;">${book.description}</div>
            <a href="${book.infoLink}" target="_blank" rel="noopener" style="display:inline-block;margin-top:1rem;color:var(--primary);font-weight:bold;">Vezi pe Google Books</a>
        </div>
    `;
    modal.classList.remove('hidden');
    modal.querySelector('.close-btn').onclick = () => modal.classList.add('hidden');
    modal.onclick = (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    };
}

// Pornim cu pagina de acasă
resultsDiv.innerHTML = '<p class="welcome-msg">📚 Explorează lumea cărților!</p>';