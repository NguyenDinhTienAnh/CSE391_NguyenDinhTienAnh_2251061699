// ==================== KEYBOARD SHORTCUTS & ACCESSIBILITY APP ====================

// Gallery data
const images = [
    { id: 1, src: 'https://placehold.co/800x500/667eea/ffffff?text=Image+1', alt: 'Image 1' },
    { id: 2, src: 'https://placehold.co/800x500/764ba2/ffffff?text=Image+2', alt: 'Image 2' },
    { id: 3, src: 'https://placehold.co/800x500/ff6b6b/ffffff?text=Image+3', alt: 'Image 3' },
    { id: 4, src: 'https://placehold.co/800x500/4caf50/ffffff?text=Image+4', alt: 'Image 4' },
    { id: 5, src: 'https://placehold.co/800x500/ffd93d/ffffff?text=Image+5', alt: 'Image 5' },
    { id: 6, src: 'https://placehold.co/800x500/00bcd4/ffffff?text=Image+6', alt: 'Image 6' }
];

// Gallery commands for command palette
const commands = [
    { id: 'next', title: 'Next Image', description: 'Go to next image in gallery', action: nextImage },
    { id: 'prev', title: 'Previous Image', description: 'Go to previous image in gallery', action: prevImage },
    { id: 'play', title: 'Play Slideshow', description: 'Start automatic slideshow', action: playSlideshow },
    { id: 'pause', title: 'Pause Slideshow', description: 'Stop automatic slideshow', action: pauseSlideshow },
    { id: 'gallery', title: 'Go to Gallery', description: 'Jump to gallery section', action: () => { document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth' }); } }
];

// State
let currentImageIndex = 0;
let isPlaying = false;
let slideshowInterval = null;
let selectedCommandIndex = 0;

// DOM Elements
const galleryImage = document.querySelector('#galleryImage');
const galleryCounter = document.querySelector('#galleryCounter');
const nextBtn = document.querySelector('#nextBtn');
const prevBtn = document.querySelector('#prevBtn');
const playPauseBtn = document.querySelector('#playPauseBtn');
const thumbnailContainer = document.querySelector('#thumbnailContainer');
const commandPalette = document.querySelector('#commandPalette');
const commandInput = document.querySelector('#commandInput');
const commandList = document.querySelector('#commandList');
const helpModal = document.querySelector('#helpModal');
const helpBtn = document.querySelector('#helpBtn');
const focusInfo = document.querySelector('#focusInfo');
const interactiveBtns = document.querySelectorAll('.interactive-btn');

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeGallery();
    attachEventListeners();
    attachKeyboardListeners();
});

// ==================== INITIALIZATION FUNCTIONS ====================
function initializeGallery() {
    updateGalleryDisplay();
    createThumbnails();
}

function createThumbnails() {
    thumbnailContainer.innerHTML = '';
    images.forEach((img, index) => {
        const thumb = document.createElement('button');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.textContent = index + 1;
        thumb.setAttribute('aria-label', `Go to image ${index + 1}`);
        thumb.addEventListener('click', () => {
            currentImageIndex = index;
            updateGalleryDisplay();
        });
        thumbnailContainer.appendChild(thumb);
    });
}

// ==================== EVENT LISTENERS ====================
function attachEventListeners() {
    // Gallery buttons
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);
    playPauseBtn.addEventListener('click', toggleSlideshow);

    // Help button
    helpBtn.addEventListener('click', showHelpModal);
    document.querySelector('.modal-close').addEventListener('click', closeHelpModal);
    document.querySelector('.close-help-btn').addEventListener('click', closeHelpModal);

    // Command palette
    commandInput.addEventListener('input', filterCommands);
    commandInput.addEventListener('keydown', handleCommandPaletteKeydown);
    commandPalette.addEventListener('click', (e) => {
        if (e.target === commandPalette) {
            closeCommandPalette();
        }
    });

    // Interactive buttons - focus tracking
    interactiveBtns.forEach(btn => {
        btn.addEventListener('focus', () => {
            focusInfo.textContent = `Focused: ${btn.getAttribute('aria-label')}`;
            focusInfo.setAttribute('aria-live', 'assertive');
        });
        btn.addEventListener('click', () => {
            focusInfo.textContent = `Clicked: ${btn.getAttribute('aria-label')}`;
        });
    });
}

function attachKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        // Ignore if command palette is open
        if (commandPalette.classList.contains('show')) {
            return;
        }

        // Ctrl+K or Cmd+K - Open command palette
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openCommandPalette();
            return;
        }

        // Arrow keys - Gallery navigation
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevImage();
            return;
        }
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextImage();
            return;
        }

        // Number keys (1-6) - Jump to image
        if (e.key >= '1' && e.key <= '6') {
            const index = parseInt(e.key) - 1;
            if (index < images.length) {
                e.preventDefault();
                currentImageIndex = index;
                updateGalleryDisplay();
                announceChange(`Jumped to image ${index + 1} of ${images.length}`);
            }
            return;
        }

        // Space - Play/Pause slideshow
        if (e.key === ' ' && e.target === document.body) {
            e.preventDefault();
            toggleSlideshow();
            return;
        }

        // Escape - Close modals
        if (e.key === 'Escape') {
            closeCommandPalette();
            closeHelpModal();
        }
    });
}

// ==================== GALLERY FUNCTIONS ====================
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGalleryDisplay();
    announceChange(`Image ${currentImageIndex + 1} of ${images.length}`);
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGalleryDisplay();
    announceChange(`Image ${currentImageIndex + 1} of ${images.length}`);
}

function updateGalleryDisplay() {
    const currentImage = images[currentImageIndex];
    
    galleryImage.src = currentImage.src;
    galleryImage.alt = `Gallery image ${currentImageIndex + 1} of ${images.length}`;
    galleryCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    galleryCounter.setAttribute('aria-live', 'polite');

    // Update thumbnail active state
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

function toggleSlideshow() {
    if (isPlaying) {
        pauseSlideshow();
    } else {
        playSlideshow();
    }
}

function playSlideshow() {
    isPlaying = true;
    playPauseBtn.textContent = '⏸ Pause';
    playPauseBtn.setAttribute('aria-label', 'Pause slideshow');
    announceChange('Slideshow started');

    slideshowInterval = setInterval(() => {
        nextImage();
    }, 3000);
}

function pauseSlideshow() {
    isPlaying = false;
    playPauseBtn.textContent = '▶ Play';
    playPauseBtn.setAttribute('aria-label', 'Play slideshow');
    announceChange('Slideshow paused');

    if (slideshowInterval) {
        clearInterval(slideshowInterval);
    }
}

// ==================== COMMAND PALETTE ====================
function openCommandPalette() {
    commandPalette.classList.add('show');
    commandInput.value = '';
    selectedCommandIndex = 0;
    renderCommands(commands);
    commandInput.focus();
}

function closeCommandPalette() {
    commandPalette.classList.remove('show');
    commandInput.value = '';
}

function filterCommands(e) {
    const query = e.target.value.toLowerCase();
    let filtered;

    if (!query) {
        filtered = commands;
    } else {
        filtered = commands.filter(cmd =>
            cmd.title.toLowerCase().includes(query) ||
            cmd.description.toLowerCase().includes(query)
        );
    }

    selectedCommandIndex = 0;
    renderCommands(filtered);
}

function renderCommands(cmds) {
    commandList.innerHTML = '';

    cmds.forEach((cmd, index) => {
        const item = document.createElement('div');
        item.className = `command-item ${index === selectedCommandIndex ? 'selected' : ''}`;
        item.setAttribute('role', 'option');
        item.setAttribute('aria-selected', index === selectedCommandIndex);

        item.innerHTML = `
            <div class="command-item-title">${cmd.title}</div>
            <div class="command-item-desc">${cmd.description}</div>
        `;

        item.addEventListener('click', () => {
            executeCommand(cmd);
        });

        commandList.appendChild(item);
    });
}

function handleCommandPaletteKeydown(e) {
    const items = document.querySelectorAll('.command-item');

    if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex + 1) % items.length;
        updateCommandSelection(items);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCommandIndex = (selectedCommandIndex - 1 + items.length) % items.length;
        updateCommandSelection(items);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedItem = items[selectedCommandIndex];
        if (selectedItem) {
            const cmdTitle = selectedItem.querySelector('.command-item-title').textContent;
            const cmd = commands.find(c => c.title === cmdTitle);
            if (cmd) {
                executeCommand(cmd);
            }
        }
    } else if (e.key === 'Escape') {
        closeCommandPalette();
    }
}

function updateCommandSelection(items) {
    items.forEach((item, index) => {
        item.classList.toggle('selected', index === selectedCommandIndex);
        item.setAttribute('aria-selected', index === selectedCommandIndex);
        if (index === selectedCommandIndex) {
            item.scrollIntoView({ block: 'nearest' });
        }
    });
}

function executeCommand(cmd) {
    cmd.action();
    closeCommandPalette();
    announceChange(`Executed: ${cmd.title}`);
}

// ==================== HELP MODAL ====================
function showHelpModal() {
    helpModal.classList.add('show');
    document.querySelector('.modal-close').focus();
}

function closeHelpModal() {
    helpModal.classList.remove('show');
    helpBtn.focus();
}

// ==================== ACCESSIBILITY ====================
function announceChange(message) {
    // Create a live region for announcement
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ==================== FOCUS MANAGEMENT ====================
// Tab trap in command palette
commandPalette.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && commandPalette.classList.contains('show')) {
        // Allow natural tab behavior but keep focus within palette
        if (e.shiftKey) {
            if (document.activeElement === commandInput) {
                e.preventDefault();
                closeCommandPalette();
            }
        }
    }
});

// Expose pause/play functions for command palette
window.playSlideshow = playSlideshow;
window.pauseSlideshow = pauseSlideshow;
window.nextImage = nextImage;
window.prevImage = prevImage;
