// Shared JS: header, drawer, reveal, carousel

// Mobile drawer
const drawer = document.getElementById('drawer');
const menuBtn = document.getElementById('menuBtn');
const closeDrawer = document.getElementById('closeDrawer');
if(menuBtn && drawer){
  menuBtn.addEventListener('click', ()=> drawer.classList.add('open'));
  closeDrawer?.addEventListener('click', ()=> drawer.classList.remove('open'));
  document.querySelectorAll('.drawer-link').forEach(a=> a.addEventListener('click', ()=> drawer.classList.remove('open')));
}

// Reveal on scroll
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible') })
},{threshold:.18});
document.querySelectorAll('.section').forEach(el=> obs.observe(el));

// Intro logic (only on index)
const intro = document.getElementById('intro');
const enterBtn = document.getElementById('enterBtn');
if (intro && enterBtn) {
  enterBtn.addEventListener('click', ()=> intro.classList.add('hidden'));
}

// Year
const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();

// Carousel auto-scroll (index only)
const track = document.querySelector('.track');
if (track){
  // Duplicate slides for seamless loop
  const slides = Array.from(track.children);
  slides.forEach(s => track.appendChild(s.cloneNode(true)));

  let pos = 0;
  const speed = 0.6; // px per frame
  function step(){
    pos -= speed;
    const first = track.children[0];
    const fw = first.getBoundingClientRect().width + 16; // slide width + gap
    if (Math.abs(pos) >= fw){
      // move first slide to end and reset position
      track.appendChild(track.children[0]);
      pos += fw;
    }
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);

  // Drag/swipe support
  let startX = 0, dragging = false;
  track.addEventListener('pointerdown', (e)=>{ dragging = true; startX = e.clientX; track.setPointerCapture(e.pointerId); });
  track.addEventListener('pointermove', (e)=>{
    if(!dragging) return;
    const dx = e.clientX - startX;
    startX = e.clientX;
    pos += dx; // move with finger
  });
  ['pointerup','pointercancel','pointerleave'].forEach(ev => track.addEventListener(ev, ()=> dragging=false));
}
