document.addEventListener('DOMContentLoaded', () => {
    const movieGrid = document.getElementById('movieGrid');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const modal = document.getElementById('movieModal');
    const closeBtn = document.querySelector('.close-btn');
    const videoPlayer = document.getElementById('videoPlayer');
    const movieTitleElement = document.getElementById('movieTitle');
    const movieDescriptionElement = document.getElementById('movieDescription');

    // Display movies
    function displayMovies(moviesToShow) {
        movieGrid.innerHTML = '';
        moviesToShow.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.thumbnail}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>${movie.description}</p>
                </div>
            `;
            movieCard.addEventListener('click', () => openMovie(movie));
            movieGrid.appendChild(movieCard);
        });
    }

    // Filter movies by category
    function filterMovies(category) {
        if (category === 'all') {
            return movies;
        }
        return movies.filter(movie => movie.category === category);
    }

    // Search movies
    function searchMovies(query) {
        return movies.filter(movie => 
            movie.title.toLowerCase().includes(query.toLowerCase()) ||
            movie.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    // Open movie in modal
    function openMovie(movie) {
        modal.style.display = 'block';
        videoPlayer.src = movie.videoUrl;
        movieTitleElement.textContent = movie.title;
        movieDescriptionElement.textContent = movie.description;
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
        const searchResults = searchMovies(e.target.value);
        displayMovies(searchResults);
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            const filteredMovies = filterMovies(category);
            displayMovies(filteredMovies);
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        videoPlayer.pause();
        videoPlayer.src = '';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            videoPlayer.pause();
            videoPlayer.src = '';
        }
    });

    // Initial display
    displayMovies(movies);
});