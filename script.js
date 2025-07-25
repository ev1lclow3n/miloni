const book = document.querySelector('.book');
const cover = document.querySelector('.cover');
const pages = document.querySelectorAll('.page');
const sparkleContainer = document.getElementById('sparkle-container');
const heartsBackground = document.querySelector('.hearts-background');

let currentPage = 0;
let isBookOpen = false;

// --- Background Hearts Creation ---
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('span');
        heart.innerHTML = '💕';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${(Math.random() * 5) + 5}s`; // 5-10s duration
        heartsBackground.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 10000); // Remove heart after 10s
    }, 300);
}

// --- Sparkle Effect on Click ---
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    sparkleContainer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 500); // Matches animation duration
}

// --- Book Logic ---
const openBook = () => {
    if (isBookOpen) return;
    book.classList.add('open');
    isBookOpen = true;
};

const closeBook = (isAtEnd) => {
    if (!isBookOpen) return;
    if (isAtEnd) {
        book.classList.remove('open');
    }
    setTimeout(() => {
        // Reset pages with a slight delay between each
        pages.forEach((page, index) => {
            setTimeout(() => {
                page.classList.remove('flipped');
                page.style.zIndex = pages.length - index;
            }, (pages.length - index) * 75);
        });
        currentPage = 0;
        isBookOpen = false;
    }, 1200);
};

const flipPage = (e) => {
    if (!isBookOpen || currentPage >= pages.length) return;

    // Create a sparkle at click position
    createSparkle(e.clientX, e.clientY);

    const pageToFlip = pages[currentPage];
    pageToFlip.classList.add('flipped');
    pageToFlip.style.zIndex = currentPage + 6; // Bring flipping page to front
    currentPage++;

    if (currentPage >= pages.length) {
        setTimeout(() => closeBook(true), 2500);
    }
};

// --- Event Listeners ---
cover.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
    openBook();
});

pages.forEach(page => {
    page.addEventListener('click', flipPage);
});

// Start the background animations
createFloatingHearts();
