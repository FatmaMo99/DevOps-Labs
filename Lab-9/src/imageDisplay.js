function createNodejsImage() {
    const badge = document.createElement('div');
    badge.className = 'project-badge';
    badge.textContent = '🚀 DevOps';
    return badge;
}

function calculateScrollingTextDuration(element) {
    if (element && typeof element.offsetWidth === 'number') {
        return `${Math.max(element.offsetWidth, 1) / 50}s`;
    }
    return '20s'; // fallback duration
}

function init() {
    const imageContainer = document.getElementById('image-container');
    if (imageContainer) {
        imageContainer.appendChild(createNodejsImage());
    }

    const scrollingText = document.querySelector('#scrolling-text p');
    if (scrollingText) {
        scrollingText.style.animationDuration = calculateScrollingTextDuration(scrollingText);
    }
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
}

// Export for testing
if (typeof module !== 'undefined') {
    module.exports = { createNodejsImage, calculateScrollingTextDuration, init };
}
