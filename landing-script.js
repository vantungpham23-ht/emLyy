// Birthday Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializePage();
    
    // Add event listeners
    addEventListeners();
    
    // Start animations
    startAnimations();
});

function initializePage() {
    console.log('🎉 Birthday Landing Page Loaded!');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in';
        document.body.style.opacity = '1';
    }, 100);
}

function addEventListeners() {
    // Navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Handle navigation (you can add actual navigation logic here)
            handleNavigation(this.textContent);
        });
    });
    
    // Search icon
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            showSearchModal();
        });
    }
    
    // CTA Button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Open the emLyy birthday page in new tab
            window.open('gift-page.html', '_blank');
            handleCTAClick();
        });
    }
    
    // Browser window controls
    const browserControls = document.querySelectorAll('.control');
    browserControls.forEach(control => {
        control.addEventListener('click', function() {
            handleBrowserControl(this);
        });
    });
    
    // Floating icons
    const floatingIcons = document.querySelectorAll('.icon');
    floatingIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            handleIconClick(this);
        });
    });
    
    // Emoji interactions
    const emoji = document.querySelector('.emoji');
    if (emoji) {
        emoji.addEventListener('click', function() {
            createConfetti();
        });
    }
    
    // Photo interactions
    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
        photoFrame.addEventListener('click', function() {
            handlePhotoClick();
        });
        
        // Add photo hover effects
        photoFrame.addEventListener('mouseenter', function() {
            this.style.transform = 'rotate(0deg) scale(1.05)';
            createPhotoSparkles();
        });
        
        photoFrame.addEventListener('mouseleave', function() {
            this.style.transform = 'rotate(-2deg) scale(1)';
        });
    }
}

function handleNavigation(page) {
    console.log(`Navigating to: ${page}`);
    
    // Add page transition effect
    const main = document.querySelector('.main');
    main.style.opacity = '0.7';
    main.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        main.style.opacity = '1';
        main.style.transform = 'scale(1)';
    }, 300);
    
    // You can add actual navigation logic here
    // For now, just show a message
    showNotification(`Navigating to ${page} page!`);
}

function showSearchModal() {
    // Create search modal
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.innerHTML = `
        <div class="search-modal-content">
            <div class="search-modal-header">
                <h3>Search</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="search-modal-body">
                <input type="text" placeholder="Search for birthday content..." class="search-input">
                <button class="search-btn">Search</button>
            </div>
        </div>
    `;
    
    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = modal.querySelector('.search-modal-content');
    content.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        transform: scale(0.8);
        transition: transform 0.3s ease;
        min-width: 300px;
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    const searchInput = modal.querySelector('.search-input');
    const searchBtn = modal.querySelector('.search-btn');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            showNotification(`Searching for: ${query}`);
            closeModal(modal);
        }
    });
    
    // Focus on input
    setTimeout(() => searchInput.focus(), 100);
}

function closeModal(modal) {
    const content = modal.querySelector('.search-modal-content');
    modal.style.opacity = '0';
    content.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

function handleCTAClick() {
    console.log('CTA Button clicked!');
    
    // Add button animation
    const button = document.querySelector('.cta-button');
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Show success message
    showNotification('🎉 Thanks for your interest! More birthday content coming soon!');
    
    // Create celebration effect
    createConfetti();
}

function handleBrowserControl(control) {
    const controlType = control.className.split(' ')[1];
    
    // Add click effect
    control.style.transform = 'scale(0.8)';
    setTimeout(() => {
        control.style.transform = 'scale(1)';
    }, 150);
    
    switch (controlType) {
        case 'close':
            showNotification('Browser window closed!');
            break;
        case 'minimize':
            showNotification('Browser window minimized!');
            break;
        case 'maximize':
            showNotification('Browser window maximized!');
            break;
    }
}

function handleIconClick(icon) {
    // Add click animation
    icon.style.transform = 'scale(1.2) rotate(360deg)';
    setTimeout(() => {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
    
    const iconType = icon.classList.contains('icon-star') ? 'star' : 'heart';
    showNotification(`⭐ You clicked the ${iconType} icon!`);
}

function handlePhotoClick() {
    // Add click animation to photo
    const photoFrame = document.querySelector('.photo-frame');
    photoFrame.style.transform = 'rotate(0deg) scale(1.1)';
    setTimeout(() => {
        photoFrame.style.transform = 'rotate(-2deg) scale(1)';
    }, 300);
    
    // Show special message
    showNotification('💖 EmLyy & Bạn - Những khoảnh khắc đẹp! 💖');
    
    // Create extra sparkles
    createPhotoSparkles();
    createConfetti();
}

function createPhotoSparkles() {
    const photoContainer = document.querySelector('.photo-container');
    if (!photoContainer) return;
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 16px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
            animation: photoSparkle 1.5s ease-out forwards;
        `;
        
        photoContainer.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
    }
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: confettiFall 3s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 3000);
    }
}

function showNotification(message) {
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function startAnimations() {
    // Add CSS animation for confetti
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(-10px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .cta-button, .icon, .emoji');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add parallax effect to decorative elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.balloon, .zigzag, .circle');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Add some fun interactive features
function addFunFeatures() {
    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            showNotification('🎮 Konami Code activated! Happy Birthday! 🎉');
            createConfetti();
            konamiCode = [];
        }
    });
    
    // Add birthday countdown
    const birthdayDate = new Date('2024-12-25'); // Change to actual birthday
    const now = new Date();
    const timeLeft = birthdayDate - now;
    
    if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        if (days <= 30) {
            showNotification(`🎂 Only ${days} days until the birthday!`);
        }
    }
}

// Initialize fun features
addFunFeatures();

// Initialize gallery
initializeGallery();

// Initialize birthday cake
initializeBirthdayCake();

// Gallery functionality
let currentSlideIndex = 0;
const galleryItems = document.querySelectorAll('.gallery-item');

function initializeGallery() {
    // Add click events to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            handleGalleryItemClick(this, index);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add video play events
    const videos = document.querySelectorAll('.gallery-video');
    videos.forEach(video => {
        // Handle autoplay
        video.addEventListener('loadedmetadata', function() {
            // Try to autoplay when video is loaded
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('🎥 Video autoplay started successfully');
                }).catch(error => {
                    console.log('Autoplay prevented:', error);
                    // Show play button or notification
                    showNotification('🔇 Click để phát video (autoplay bị tắt)');
                });
            }
        });
        
        video.addEventListener('play', function() {
            showNotification('🎥 Video đang phát!');
        });
        
        video.addEventListener('pause', function() {
            showNotification('⏸️ Video đã tạm dừng');
        });
        
        video.addEventListener('ended', function() {
            showNotification('✅ Video đã kết thúc!');
        });
        
        // Handle loop
        video.addEventListener('ended', function() {
            if (video.loop) {
                setTimeout(() => {
                    video.play();
                }, 1000);
            }
        });
    });
}

function handleGalleryItemClick(item, index) {
    // Add click animation
    item.style.transform = 'scale(0.95)';
    setTimeout(() => {
        item.style.transform = 'scale(1)';
    }, 150);
    
    // Show notification based on media type
    const isVideo = item.querySelector('video');
    const mediaType = isVideo ? 'Video' : 'Ảnh';
    showNotification(`📸 Bạn đã xem ${mediaType} ${index + 1}!`);
    
    // Create sparkles effect
    createGallerySparkles(item);
}

function createGallerySparkles(container) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 14px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
            animation: gallerySparkle 1s ease-out forwards;
        `;
        
        container.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

function changeGallerySlide(direction) {
    const dots = document.querySelectorAll('.dot');
    const totalSlides = galleryItems.length;
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    // Update active dot
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlideIndex);
    });
    
    // Show current slide with animation
    galleryItems.forEach((item, index) => {
        if (index === currentSlideIndex) {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
        } else {
            item.style.opacity = '0.5';
            item.style.transform = 'scale(0.9)';
        }
    });
    
    showNotification(`📸 Đang xem ${currentSlideIndex + 1}/${totalSlides}`);
}

function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex - 1;
    changeGallerySlide(0);
} 

// Birthday Cake functionality
function initializeBirthdayCake() {
    const birthdayCake = document.querySelector('.birthday-cake');
    if (birthdayCake) {
        // Add click event to cake
        birthdayCake.addEventListener('click', function() {
            handleCakeClick();
        });
        
        // Add hover effects
        birthdayCake.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            createCakeSparkles();
        });
        
        birthdayCake.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Start cake animations
        startCakeAnimations();
    }
}

function handleCakeClick() {
    // Add click animation
    const cake = document.querySelector('.birthday-cake');
    cake.style.transform = 'scale(0.95)';
    setTimeout(() => {
        cake.style.transform = 'scale(1)';
    }, 150);
    
    // Show birthday message
    showNotification('🎂 Chúc mừng sinh nhật! Bánh ngon quá! 🎉');
    
    // Create extra sparkles
    createCakeSparkles();
    createConfetti();
    
    // Play birthday sound effect (if available)
    playBirthdaySound();
}

function createCakeSparkles() {
    const cake = document.querySelector('.birthday-cake');
    if (!cake) return;
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 12px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
            animation: cakeSparkle 2s ease-out forwards;
        `;
        
        cake.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 2000);
    }
}

function startCakeAnimations() {
    // Add random flame flicker
    setInterval(() => {
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
            const randomDelay = Math.random() * 0.5;
            setTimeout(() => {
                flame.style.animation = 'none';
                setTimeout(() => {
                    flame.style.animation = 'flameFlicker 0.3s ease-in-out infinite alternate';
                }, 50);
            }, randomDelay * 1000);
        });
    }, 3000);
    
    // Add cake glow effect
    setInterval(() => {
        const cake = document.querySelector('.birthday-cake');
        if (cake) {
            cake.style.filter = 'brightness(1.1)';
            setTimeout(() => {
                cake.style.filter = 'brightness(1)';
            }, 500);
        }
    }, 5000);
}

function playBirthdaySound() {
    // Try to play a birthday sound if available
    const audio = new Audio();
    audio.volume = 0.3;
    
    // You can add a birthday sound file here
    // audio.src = 'birthday-sound.mp3';
    // audio.play().catch(e => console.log('Sound play prevented:', e));
    
    // For now, just show a notification
    showNotification('🎵 Happy Birthday to You! 🎵');
} 