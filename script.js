// Select elements
const door = document.getElementById('door');
const room = document.getElementById('room');
const chair = document.getElementById('chair');
const hb = document.getElementById('hb');
const fringe = document.getElementById('fringe');
const leftStrand = document.getElementById('left-strand');
const rightStrand = document.getElementById('right-strand');
const speakerLink = document.getElementById('speaker-link');
const speaker = document.getElementById('speaker');
const popup = document.getElementById('popup');
const hoverAudio = new Audio('speaker.mp3'); // Ensure this file exists in your project
const journal = document.getElementById('journal');
const camera = document.getElementById('camera');
const comic = document.getElementById('comic');
const journalAudio = new Audio('journal.mp3'); // Ensure these files exist
const cameraAudio = new Audio('camera.mp3');
const comicAudio = new Audio('comic.mp3');

// Background breathing animation
const breathingImages = ['b1.png', 'b2.png', 'b3.png'];
let currentFrame = 0;
function animateBackground() {
  room.style.backgroundImage = `url('${breathingImages[currentFrame]}')`;
  currentFrame = (currentFrame + 1) % breathingImages.length;
}
setInterval(animateBackground, 500);

// Fringe animation
const fringeImages = ['hf1.png', 'hf2.png', 'hf3.png', 'hf4.png'];
let currentFringeFrame = 0;
function animateFringe() {
  fringe.src = fringeImages[currentFringeFrame];
  currentFringeFrame = (currentFringeFrame + 1) % fringeImages.length;
}
setInterval(animateFringe, 300);

// Hair strand animation
const leftHairImages = ['hl1.png', 'hl2.png', 'hl3.png', 'hl4.png', 'hl5.png'];
const rightHairImages = ['hr1.png', 'hr2.png', 'hr3.png', 'hr4.png', 'hr5.png', 'hr6.png', 'hr7.png'];
let currentLeftFrame = 0;
let currentRightFrame = 0;

function animateHair() {
  leftStrand.src = leftHairImages[currentLeftFrame];
  rightStrand.src = rightHairImages[currentRightFrame];

  currentLeftFrame = (currentLeftFrame + 1) % leftHairImages.length;
  currentRightFrame = (currentRightFrame + 1) % rightHairImages.length;
}
setInterval(animateHair, 400);

// Door knocking interaction
let clickCount = 0;
door.addEventListener('click', () => {
  clickCount++;
  if (clickCount === 2) {
    door.style.transform = 'translateX(-100%)'; // Slide the door left
    clickCount = 0;
  }
});


// Ensure popup is positioned correctly during hover
speaker.addEventListener('mousemove', () => {
  const rect = speaker.getBoundingClientRect();
  popup.style.top = `${rect.bottom + 5}px`;
  popup.style.left = `${rect.left + rect.width / 2}px`;
});

// Reset speaker size and shadow on mouseout
speaker.addEventListener('mouseout', () => {
  speaker.style.transform = 'scale(1)';
  speaker.style.boxShadow = 'none';
});

// Add click interaction
speaker.addEventListener('click', () => {
  speaker.style.transform = 'scale(1.05)';
  speaker.style.boxShadow = '0 0 15px rgba(0, 0, 255, 0.8)';
  const audio = new Audio('your-audio-file.mp3'); // Replace with your audio file path
  audio.play();
});

// Hover effects for the speaker
speaker.addEventListener('mouseover', () => {
  hoverTimer = setTimeout(() => {
    hoverAudio.play(); // Play sound after 0.5 seconds
  }, 500);
});

speaker.addEventListener('mouseout', () => {
  clearTimeout(hoverTimer); // Clear the timer if hover is stopped
  hoverAudio.pause(); // Pause the audio
  hoverAudio.currentTime = 0; // Reset playback
});

// Common function for hover and click effects
function setupSection(section, audioFile) {
  const audio = new Audio(audioFile);

  section.addEventListener('mouseover', () => {
    hoverTimer = setTimeout(() => {
      audio.play();
    }, 500); // Play sound after 0.5 seconds
  });

  section.addEventListener('mouseout', () => {
    clearTimeout(hoverTimer); // Clear the timer if hover is stopped
    audio.pause(); // Pause the audio
    audio.currentTime = 0; // Reset playback
  });

  section.addEventListener('click', () => {
    section.style.transform = 'scale(1.05)';
    section.style.boxShadow = '0 0 15px rgba(0, 0, 255, 0.8)';
    const clickAudio = new Audio(audioFile); // Separate instance to avoid overlap
    clickAudio.play();
    setTimeout(() => {
      section.style.transform = 'scale(1)'; // Reset scale after a short delay
      section.style.boxShadow = 'none';
    }, 200);
  });
}

// Setup interactions for each section
setupSection(journal, 'journal.mp3');
setupSection(camera, 'camera.mp3');
setupSection(comic, 'comic.mp3');