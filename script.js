const screens = document.querySelectorAll('.screen');
const backgroundEl = document.querySelector('.background');

const message = `Thittina ani feel avvaku, endhuk ante istam unna vallane thidtham kuda. "Thittukodam is our love language kadha". So entha thidthe antha love unattu😆😆\n\n I'm always proud of you teddy. Endhuk ante eee genz girls chusina prathi sari I feel proud for how good you are. "Nuv ganjayi vanam lo thulasi mokka rah".`;

const typeSpeed = 70; 
let charIndex = 0;
let isFlipped = false; 


function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const size = Math.random() * 20 + 10 + 'px';
    heart.style.width = size;
    heart.style.height = size;
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 10 + 5 + 's';
    
    document.getElementById('floating-hearts-container').appendChild(heart);
    setTimeout(() => { heart.remove(); }, 15000);
}
setInterval(createFloatingHeart, 400);


document.addEventListener('mousemove', function(e) {
    const trail = document.createElement('div');
    trail.classList.add('trail-particle');
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => { trail.remove(); }, 1000);
});


// --- MODIFIED FUNCTION TO PLAY SONG ---
function nextScreen(index) {
    screens.forEach(screen => screen.classList.remove('active'));
    
    if (screens[index]) {
        screens[index].classList.add('active');
        
        // When Screen 2 is activated (See More clicked)
        if (index === 1) {
            backgroundEl.classList.add('black-mode');

            // Find and play the music
            const audio = document.getElementById('bg-music');
            if (audio) {
                audio.volume = 0.8; // Adjust volume here (0.1 to 1.0)
                audio.play().catch(error => {
                    console.log("Audio autoplay prevented:", error);
                });
            }

        } else {
            backgroundEl.classList.remove('black-mode');
        }
    }
}


function createBurst(x, y) {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        const colors = ['#ec4899', '#f43f5e', '#ffffff', '#ffd700'];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * velocity + 'px';
        const ty = Math.sin(angle) * velocity + 'px';
        
        confetti.style.setProperty('--tx', tx);
        confetti.style.setProperty('--ty', ty);
        confetti.style.animation = `confettiDrop 1s ease-out forwards`;
        
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
    }
}

function flipCard(event) {
    if (isFlipped) return; 

    const clientX = event.clientX || window.innerWidth / 2;
    const clientY = event.clientY || window.innerHeight / 2;
    createBurst(clientX, clientY);

    const cardInner = document.querySelector('.card-3d-inner');
    const title = document.querySelector('#screen-2 .section-title');


    cardInner.classList.add('flipped');
    isFlipped = true;

    title.style.opacity = '0';
    title.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
       typeWriter();
    }, 400);
}

function typeWriter() {
    const textElement = document.getElementById("typewriter-text");
    const cursor = document.querySelector(".cursor");
    const btn = document.getElementById("msg-btn");

    if (charIndex < message.length) {
        const char = message.charAt(charIndex);
        if (char === '\n') {
            textElement.innerHTML += '<br>';
        } else {
            textElement.innerHTML += char;
        }
        charIndex++;
        setTimeout(typeWriter, typeSpeed);
    } else {
        cursor.style.display = "none";
        btn.classList.remove("hidden"); 
        btn.style.animation = 'none';
        btn.offsetHeight; 
        btn.style.animation = "fadeUp 0.8s forwards";
    }
}

function revealMessage(element) {
    element.classList.add('revealed');
}