// Year
document.getElementById('y')?.append(new Date().getFullYear())

// Sidebar open/close (mobile)
const sidebar = document.getElementById('sidebar')
const openMenu = document.getElementById('openMenu')
const closeMenu = document.getElementById('closeMenu')
openMenu?.addEventListener('click', () => sidebar.classList.add('open'))
closeMenu?.addEventListener('click', () => sidebar.classList.remove('open'))
document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')))

// Scroll reveal
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible') })
}, { threshold:.18 })
document.querySelectorAll('.observe').forEach(el=>obs.observe(el))

// Filters
const chips = document.querySelectorAll('.chip')
const cards = document.querySelectorAll('.card')
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c=>c.classList.remove('active'))
  ch.classList.add('active')
  const f = ch.dataset.filter
  cards.forEach(card => {
    card.style.display = (f === 'all' || card.dataset.cat === f) ? '' : 'none'
  })
}))

// Tilt / parallax on cards
document.querySelectorAll('.tilt').forEach(card=>{
  const img = card.querySelector('.media img');
  let rAF;
  function onMove(e){
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    const rotX = (y * 6).toFixed(2);
    const rotY = (-x * 6).toFixed(2);
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(()=>{
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if(img) img.style.transform = `translateZ(24px) scale(1.06)`;
    });
  }
  function reset(){
    cancelAnimationFrame(rAF);
    card.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
    if(img) img.style.transform = 'translateZ(0) scale(1.02)';
  }
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
})

// Optional: counters in About
function animateCounter(el){
  const target = parseFloat(el.dataset.target);
  const isFloat = !Number.isInteger(target);
  let val = 0;
  const step = target / 60;
  const t = setInterval(()=>{
    val += step;
    if (val >= target){ val = target; clearInterval(t); }
    el.textContent = isFloat ? val.toFixed(1) : Math.floor(val);
  }, 20);
}
document.querySelectorAll('.count').forEach(animateCounter);
