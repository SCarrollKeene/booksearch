// Elements object to save all document element references
const elements = {
    searchForm: document.querySelector('.book-search'),
    searchInput: document.querySelector('.book-search__input'),
    bookRes: document.querySelector('.book-results'),
    bookResultsList: document.querySelector('.book-results__list'),
    bookResultsGallery: document.querySelector('.book-results__gallery')
}

class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.query}`)
        // transform data into json
        .then(response => response.json())
        .then(data => {
            let books = data.items;
            const markup = books.map(book => {
                // Render results back to user
                return `
                <div class="book-gallery">
                    <img src="${book.volumeInfo.imageLinks.smallThumbnail}" alt="${book.volumeInfo.title}">
                    <h1>Title: ${book.volumeInfo.title}</h1>
                    <h2>Author(s): ${book.volumeInfo.authors}</h2>
                    <h3>Published: ${book.volumeInfo.publishedDate}</h3>
                    <a href="${book.volumeInfo.infoLink}" target='_blank' rel='noopener'>
                        <button class='btn-book-read'>Read More</button>
                    </a>
                </div>
                `;
            })
            elements.bookResultsList.insertAdjacentHTML('beforeend', markup);
        })
        .catch((err) => {
            alert(`Something went wrong with data retrieval. Please try again.\n${err}`);
        });
    }
}

const getInput = () => elements.searchInput.value;

const clearInput = () => {
    elements.searchInput.value = '';
};

const clearResults = () => {
    elements.bookResultsList.innerHTML = '';
    elements.bookResultsGallery.innerHTML = '';
};

// Display current date on page
const currentDate = new Date().toLocaleDateString();
document.getElementById("time-clock").innerHTML = currentDate;

// render all results
const renderResults = () => {

};

// SEARCH CONTROLLER
const searchController = async () => {
    // get query from user search
    const query = getInput();

    if (query) {
        // add new search object
        const search = new Search(query);

        // prepare ui for incoming results
        clearInput();
        clearResults();

        try {
            // search for books
            await search.getResults();

        } catch (err) {
            alert(`Something went wrong, \nerr: "${err}"`);
        }
    }
}

// form event listener
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    searchController();
});

// TODO: ADD PAGINATION & BUTTONS FOR PREV/NEXT PAGES