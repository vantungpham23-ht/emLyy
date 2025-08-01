const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

// State management
let countdownFinished = false;
let giftOpened = false;

const texts = [
  "Chúc mừng sinh nhật em Lyy xinh iuu! 🥳🔥",
  "Chúc em tuổi mới thật nhiều niềm vui, sức khoẻ và luôn hạnh phúc bên anh. 😎✨",
  "Cảm ơn em đã đến bên anh và làm cuộc sống này thêm rực rỡ. Yêu em rất nhiều! 💖🎂🎁🎉" 

];

// Function to open the gift
function openGift() {
    if (!countdownFinished) {
        showNotification("⏰ Đợi đếm ngược kết thúc để mở quà!");
        return;
    }
    
    if (giftOpened) {
        showNotification("🎁 Quà đã được mở rồi!");
        return;
    }
    
    giftOpened = true;
    giftBox.classList.add('opened');
    giftBox.classList.remove('unlocked');
    
    giftBox.style.display = 'none';
    setTimeout(() => {
        message.style.display = 'block';
    
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(confetti);
        }
    }, 1000);
    birthdayMusic.play();
    
    message.classList.remove("hidden");
    message.classList.add("show");

    // Show floating images
    showFloatingImages();

    setTimeout(() => {
        typeWriter(texts, birthdayText);
    }, 3500);
}

// Function to check countdown status
function checkCountdownStatus() {
    const tickcounterElement = document.querySelector('.tickcounter');
    if (tickcounterElement) {
        const countdownText = tickcounterElement.textContent || tickcounterElement.innerText;
        
        // Check for various countdown completion indicators
        const isFinished = countdownText.includes('00:00:00') || 
                          countdownText.includes('0 days') ||
                          countdownText.includes('finished') ||
                          countdownText.includes('completed') ||
                          countdownText.includes('0:0:0');
        
        if (isFinished && !countdownFinished) {
            countdownFinished = true;
            giftBox.classList.remove('locked');
            giftBox.classList.add('unlocked');
            
            // Add finished class to countdown container
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.classList.add('finished');
            }
            
            showNotification("🎉 Đếm ngược kết thúc! Bạn có thể mở quà rồi!");
            
            // Auto-open gift after 3 seconds
            setTimeout(() => {
                if (!giftOpened) {
                    openGift();
                }
            }, 3000);
            
            return;
        }
    }
    
    // Continue checking every second
    setTimeout(checkCountdownStatus, 1000);
}

// Initialize countdown monitoring
function initializeCountdownMonitoring() {
    // Add initial locked state
    giftBox.classList.add('locked');
    
    // Show initial notification
    showNotification("⏰ Đợi đếm ngược kết thúc để mở quà!");
    
    // Start monitoring after 2 seconds
    setTimeout(checkCountdownStatus, 2000);
}

// Initialize countdown monitoring
initializeCountdownMonitoring();

// Add click event with validation
giftBox.addEventListener('click', () => {
    if (countdownFinished && !giftOpened) {
        openGift();
    } else if (!countdownFinished) {
        showNotification("⏰ Đợi đếm ngược kết thúc để mở quà!");
    } else if (giftOpened) {
        showNotification("🎁 Quà đã được mở rồi!");
    }
});

// Initialize floating images
initializeFloatingImages();

function showFloatingImages() {
    const floatingImages = document.getElementById('floatingImages');
    const images = document.querySelectorAll('.floating-image');
    
    // Show the container
    floatingImages.classList.remove('hidden');
    
    // Show each image with delay
    images.forEach((image, index) => {
        setTimeout(() => {
            image.classList.add('show');
        }, index * 200); // 200ms delay between each image
    });
}

function initializeFloatingImages() {
    const floatingImages = document.querySelectorAll('.floating-image');
    
    floatingImages.forEach((image, index) => {
        // Add click event
        image.addEventListener('click', function() {
            handleFloatingImageClick(this, index);
        });
        
        // Add hover effects
        image.addEventListener('mouseenter', function() {
            if (this.classList.contains('show')) {
                this.style.transform = 'scale(1.2) rotate(5deg)';
                createImageSparkles(this);
            }
        });
        
        image.addEventListener('mouseleave', function() {
            if (this.classList.contains('show')) {
                this.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Add random movement only when visible
        setInterval(() => {
            if (image.classList.contains('show') && !image.matches(':hover')) {
                const randomX = (Math.random() - 0.5) * 50;
                const randomY = (Math.random() - 0.5) * 50;
                image.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 10 - 5}deg)`;
                
                setTimeout(() => {
                    if (image.classList.contains('show') && !image.matches(':hover')) {
                        image.style.transform = 'translate(0, 0) rotate(0deg)';
                    }
                }, 1500);
            }
        }, 6000 + index * 1000);
    });
}

function handleFloatingImageClick(image, index) {
    // Add click animation
    image.style.transform = 'scale(0.9) rotate(-10deg)';
    setTimeout(() => {
        image.style.transform = 'scale(1.2) rotate(5deg)';
    }, 150);
    
    // Show notification
    const imageNames = ['3.PNG', '4.JPG', '5.JPG', '6.JPG', '6.HEIC', '8.PNG'];
    showNotification(`📸 Bạn đã xem ảnh ${imageNames[index]}!`);
    
    // Create sparkles effect
    createImageSparkles(image);
    
    // Add glow effect
    const glow = image.querySelector('.image-glow');
    if (glow) {
        glow.style.opacity = '1';
        glow.style.transform = 'scale(1.5)';
        setTimeout(() => {
            glow.style.opacity = '0';
            glow.style.transform = 'scale(1)';
        }, 1000);
    }
}

function createImageSparkles(container) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'];
    
    for (let i = 0; i < 12; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            font-size: 10px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 1000;
            animation: imageSparkle 1.5s ease-out forwards;
        `;
        
        container.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1500);
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
        padding: 12px 20px;
        border-radius: 25px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 250px;
        font-size: 14px;
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

function typeWriter(texts, element, textIndex = 0, i = 0) {
    if (textIndex < texts.length) {
        const text = texts[textIndex];
        if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(texts, element, textIndex, i + 1), 40); // Tốc độ gõ
        } else {
        setTimeout(() => {
            element.innerHTML += '<br>'; // Xóa nội dung cũ
            typeWriter(texts, element, textIndex + 1); // Chuyển sang đoạn văn tiếp theo
        }, 2000); // Đợi 2 giây rồi chuyển quan đoạn khác
        }
    } else {
        // Thêm gif
        setTimeout(() => {
        const imgGift = document.createElement('div');
        imgGift.classList.add('img-gift');
        message.appendChild(imgGift);
        }, 1500);
    }
}
