// Year
const y=document.getElementById('y'); if(y) y.textContent=new Date().getFullYear();

// Intro
const intro=document.getElementById('intro'); const enterBtn=document.getElementById('enterBtn');
enterBtn&&enterBtn.addEventListener('click',()=>{ intro.classList.add('hidden'); });

// Sidebar (mobile)
const sidebar=document.getElementById('sidebar'); const openBtn=document.getElementById('openSidebar'); const closeBtn=document.getElementById('closeSidebar');
openBtn&&openBtn.addEventListener('click',()=> sidebar.classList.add('open'));
closeBtn&&closeBtn.addEventListener('click',()=> sidebar.classList.remove('open'));
document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=> sidebar.classList.remove('open')));

// Scroll reveal
const obs=new IntersectionObserver(es=>{ es.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); }); },{threshold:.18});
document.querySelectorAll('.observe').forEach(el=>obs.observe(el));

// Search filter
const q=document.getElementById('q'); const grid=document.getElementById('grid');
q&&q.addEventListener('input',e=>{
  const t=e.target.value.toLowerCase();
  grid.querySelectorAll('.tile').forEach(card=>{
    const v=(card.textContent + ' ' + (card.dataset.tags||'')).toLowerCase();
    card.style.display = v.includes(t) ? '' : 'none';
  });
});

// Tilt / parallax hover
document.querySelectorAll('.tilt').forEach(card=>{
  const img = card.querySelector('.media img');
  let rAF;
  function onMove(e){
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left)/rect.width - 0.5;
    const y = (e.clientY - rect.top)/rect.height - 0.5;
    const rotX = (+y * 6).toFixed(2);
    const rotY = (-x * 6).toFixed(2);
    cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(()=>{
      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if(img) img.style.transform = `translateZ(24px) scale(1.06)`;
    });
  }
  function reset(){
    cancelAnimationFrame(rAF);
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
    if(img) img.style.transform = 'translateZ(0) scale(1.02)';
  }
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', reset);
});

