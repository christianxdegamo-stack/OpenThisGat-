document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Floating Hearts and Flowers Effect Generator ---
  const floatingContainer = document.getElementById('floatingContainer');
  const floatingItems = ['🌸', '💖', '🌷', '✨', '🎀', '🌸', '💕'];

  function createFloatingItem() {
    if (!floatingContainer) return;
    const item = document.createElement('div');
    item.classList.add('floating-item');

    // Pick random symbol & position
    item.innerText = floatingItems[Math.floor(Math.random() * floatingItems.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';

    // Randomize speed and delay
    const duration = Math.random() * 5 + 6; // 6s - 11s
    item.style.animationDuration = duration + 's';

    floatingContainer.appendChild(item);

    // Remove element after animation ends
    setTimeout(() => {
      item.remove();
    }, duration * 1000);
  }

  // Generate floating items continuously
  setInterval(createFloatingItem, 600);


  // --- 2. Smooth Scroll & Intersection Observer Transitions ---
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 80) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger initial check


  // --- 3. Photo Memories Upload Handler ---
  const photoUpload = document.getElementById('photoUpload');
  const memoriesGrid = document.getElementById('memoriesGrid');

  if (photoUpload && memoriesGrid) {
    photoUpload.addEventListener('change', (e) => {
      const files = e.target.files;
      if (!files.length) return;

      Array.from(files).forEach((file, idx) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (event) => {
          const polaroid = document.createElement('div');
          polaroid.classList.add('polaroid');

          polaroid.innerHTML = `
            <div class="photo-frame">
              <img src="${event.target.result}" alt="Angela's Memory" />
            </div>
            <p class="caption">Bestie Memory 💕</p>
          `;

          memoriesGrid.prepend(polaroid);
        };
        reader.readAsDataURL(file);
      });
    });
  }


 

  // --- 5. Secret Message Reveal & Confetti ---
  const revealBtn = document.getElementById('revealBtn');
  const secretMessage = document.getElementById('secretMessage');

  if (revealBtn && secretMessage) {
    revealBtn.addEventListener('click', () => {
      secretMessage.classList.toggle('hidden');
      if (!secretMessage.classList.contains('hidden')) {
        revealBtn.innerText = 'Hide Message 💌';
        triggerConfetti();
      } else {
        revealBtn.innerText = 'Tap to Reveal 💌';
      }
    });
  }

  function triggerConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#ffb3c6', '#fb6f92', '#ffe5ec']
      });
    }
  }


  // --- 6. Ambient Music Audio Synthesizer ---
  const musicBtn = document.getElementById('musicToggle');
  let audioCtx = null;
  let isPlaying = false;
  let timerId = null;

  const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00];

  function playMelody() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    let noteIndex = 0;
    timerId = setInterval(() => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(notes[noteIndex % notes.length], audioCtx.currentTime);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);

      noteIndex++;
    }, 600);
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', () => {
      if (!isPlaying) {
        playMelody();
        musicBtn.style.background = '#ff8fab';
        isPlaying = true;
      } else {
        clearInterval(timerId);
        if (audioCtx) audioCtx.suspend();
        musicBtn.style.background = '#fb6f92';
        isPlaying = false;
      }
    });
  }
});