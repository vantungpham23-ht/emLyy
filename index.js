const giftBox = document.getElementById('giftBox');
const message = document.getElementById('message');
const birthdayText = document.getElementById("birthdayText");
const birthdayMusic = document.getElementById("birthdayMusic");

const texts = [
  "Chúc mừng sinh nhật em Lyy xinh iuu! 🥳🔥",
  "Chúc em tuổi mới thật nhiều niềm vui, sức khoẻ và luôn hạnh phúc bên anh. 😎✨",
  "Cảm ơn em đã đến bên anh và làm cuộc sống này thêm rực rỡ. Yêu em rất nhiều! 💖🎂🎁🎉" 

];

// Function to open the gift
function openGift() {
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

    setTimeout(() => {
        typeWriter(texts, birthdayText);
    }, 3500);
}

// Function to check countdown and auto-open gift when it reaches zero
function checkCountdown() {
    // Check if tickcounter widget exists and has finished
    const tickcounterElement = document.querySelector('.tickcounter');
    if (tickcounterElement) {
        // Check if the countdown has finished (when the widget shows 0 or is hidden)
        const countdownText = tickcounterElement.textContent || tickcounterElement.innerText;
        
        // If countdown shows 0 or contains "finished" or similar
        if (countdownText.includes('0') && countdownText.includes('00:00:00')) {
            openGift();
            return;
        }
        
        // Alternative method: check if the widget is hidden or shows completion
        const widgetStyle = window.getComputedStyle(tickcounterElement);
        if (widgetStyle.display === 'none' || tickcounterElement.style.display === 'none') {
            openGift();
            return;
        }
    }
    
    // Continue checking every second
    setTimeout(checkCountdown, 1000);
}

// Start monitoring the countdown
setTimeout(checkCountdown, 2000); // Start checking after 2 seconds to let widget load

giftBox.addEventListener('click', () => {
    openGift();
});

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
